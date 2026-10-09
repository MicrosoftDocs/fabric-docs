---
title: Troubleshoot Query Blocking in Fabric Data Warehouse
description: Learn how to identify and resolve query blocking caused by locks in a warehouse in Microsoft Fabric.
ms.reviewer: twcyril
ms.date: 06/12/2026
ms.topic: troubleshooting-general
ms.search.form: Warehouse design and development
---

# Troubleshoot query blocking in Fabric Data Warehouse

**Applies to:** [!INCLUDE [fabric-dw](includes/applies-to-version/fabric-dw.md)]

If your queries in [!INCLUDE [fabric-dw](includes/fabric-dw.md)] take unusually long to run or seem stuck, one possible cause is locking. Locking occurs when a session holds a lock that prevents other queries from proceeding.

This article shows you how to determine whether locking is affecting your workload and what actions you can take.

> [!TIP]
> [!INCLUDE [fabric-dw](includes/fabric-dw.md)] uses **table-level locking**. Any DML operation acquires a lock on the entire table, regardless of how many rows are affected. This behavior is different from SQL Server, which supports row-level and page-level locks.

## Prerequisites

- A [!INCLUDE [fabric-dw](includes/fabric-dw.md)] with active workloads.
- Membership in the Viewer workspace role is the minimum permission to query the dynamic management views (DMVs) in this article. 
    - For more information on troubleshooting with DMVs, see [Monitor connections, sessions, and requests using DMVs](monitor-using-dmv.md).

## Step 1: Check if queries are waiting on locks

Start by checking whether any queries are currently waiting on locks.

Run the following query:

```sql
SELECT
    request_session_id,
    resource_type,
    resource_description,
    request_mode,
    request_status
FROM sys.dm_tran_locks
WHERE request_status = 'WAIT';
```

If the query returns rows, some sessions are waiting on resources held by other sessions. Each row indicates a lock request that can't currently be granted.

> [!TIP]
> The `sys.dm_tran_locks` view can return a large number of rows for granted locks. Filtering by `request_status = 'WAIT'` focuses on the sessions that are blocked.

## Step 2: Identify blocked queries

Next, check which queries are blocked and what session is blocking them.

```sql
SELECT
    session_id,
    status,
    blocking_session_id,
    wait_type,
    total_elapsed_time,
    open_transaction_count
FROM sys.dm_exec_requests
WHERE blocking_session_id <> 0;
```

This query returns:

- The session running the blocked query (`session_id`)
- The session currently blocking it (`blocking_session_id`)
- How long it's been waiting (`total_elapsed_time`, in milliseconds)
- Whether the blocking session has an open transaction (`open_transaction_count`)

If a query shows `blocking_session_id` is nonzero and `open_transaction_count > 0`, it's waiting on another session that's holding a lock.

## Step 3: Find the blocking session

To understand what resource is locked, inspect locks currently held by the blocking session. Substitute a `session_id` you identified earlier for the `<blocking_session_id>` in the following sample query:

```sql
SELECT
    request_session_id,
    resource_type,
    resource_associated_entity_id,
    request_mode,
    request_status
FROM sys.dm_tran_locks
WHERE
    request_status = 'GRANT'
    AND request_session_id = <blocking_session_id>;
```

Use this query to determine:

- Which resources the blocking session currently holds locks on. For example, you can use `sys.objects` to identify the `resource_associated_entity_id` where the `resource_type = OBJECT`. 
- The lock mode (for example, Exclusive (`X`), Schema-Modification (`Sch-M`))
- Whether the lock is related to a DDL operation or statistics update (`UPDSTATS`)

> [!NOTE]
> Statistics-related locks (such as those from `UPDSTATS`) also appear in `sys.dm_tran_locks`. Schema-Modification (`Sch-M`) and Exclusive (`X`) locks are the most common blockers, but any lock type can block a conflicting request (for example, Sch-S blocks `Sch-M`).

## Step 4: Find the blocking transaction owner

In many cases, you might prefer to ask the owner of the blocking transaction to `COMMIT` or `ROLLBACK` their work instead of terminating the session. Consider using `TRY` `CATCH` structures for error handling with `COMMIT` or `ROLLBACK`. For more information, see [TRY...CATCH](/sql/t-sql/language-elements/try-catch-transact-sql?view=fabric&preserve-view=true).

You can identify the owner and query associated with the blocking session. Substitute a `session_id` you identified earlier for the `<blocking_session_id>` in the following sample query:

```sql
SELECT
    r.session_id,
    s.login_name,
    s.program_name,
    r.status,
    r.blocking_session_id,
    r.command,
    r.total_elapsed_time,
    s.last_request_start_time,
    s.last_request_end_time
FROM sys.dm_exec_requests r
JOIN sys.dm_exec_sessions s
    ON r.session_id = s.session_id
WHERE r.session_id = <blocking_session_id>;
```

- `login_name` is the owner of the blocking session.
- `program_name` is the application that initiated the session. The `DMS_user` value indicates the Fabric portal query editor.
- `command` is the command currently running.

You can then contact the owner of the transaction to commit or roll it back if appropriate.

## Step 5: Check if the blocking session is idle or not progressing

A blocking session might appear active but isn't actually making progress.

Indicators of an idle or stalled session include:

- `status = 'sleeping'` indicates no active query running.
- Look for a `last_request_start_time` that is significantly earlier than the current time, indicating a long-lived open request.
- Look for a `total_elapsed_time` that isn't increasing between checks, indicating a stalled session.

```sql
SELECT
    session_id,
    status,
    last_request_start_time,
    last_request_end_time,
    open_transaction_count
FROM sys.dm_exec_sessions
WHERE session_id = <blocking_session_id>;
```

- If the session status is `sleeping` and `open_transaction_count > 0`, the session has an open transaction with no active query - it holds a lock without doing work.
- If the session appears in `sys.dm_exec_requests` and `total_elapsed_time` continues to increase between checks, the session is actively progressing. It might be preferable to wait for the transaction to complete rather than terminating it and forcing a rollback.

## Step 6: Take action to resolve blocking

> [!NOTE]
> Blocking situations often resolve on their own once the blocking session completes its transaction. If your workload can tolerate the delay, waiting is the safest option.

If you need to unblock downstream queries, consider if a blocking session has the following characteristics:

- Has an open transaction
- Appears idle or not progressing
- Is holding a blocking lock (for example, Exclusive (`X`) or `Sch-M`)

If so, a member of the Admin workspace role can terminate a session by using:

```sql
KILL <session_id>;
```

The `KILL` command will:

- End the session
- Roll back all work done in that session's active transaction
- Release the lock
- Allow downstream queries to proceed

> [!CAUTION]
> Killing a session rolls back all uncommitted work performed by that session. This action might undo data changes made by the user or application. Use this option only when you're certain that terminating the transaction doesn't negatively affect your workload.

## Step 7: Prevent future locking issues

To help prevent similar problems:

- Avoid leaving explicit transactions open (`BEGIN TRANSACTION` without a corresponding `COMMIT` or `ROLLBACK`).
- Keep transactions short-lived. Perform only the necessary operations within the transaction.
- Always `COMMIT` or `ROLLBACK` transactions when complete.
- Schedule DDL operations (such as `ALTER TABLE`) during low-traffic windows.

Proactively monitor open transactions by using:

```sql
SELECT
    session_id,
    login_name,
    open_transaction_count,
    program_name,
    status,
    blocking_session_id,
    last_request_start_time
FROM sys.dm_exec_sessions
WHERE open_transaction_count > 0;
```

Regularly monitoring open transactions and intervening when appropriate helps reduce the likelihood of blocking chains forming.

## Related content

- [Monitor connections, sessions, and requests using DMVs](monitor-using-dmv.md)
- [Transactions in Fabric Data Warehouse](transactions.md)
- [Troubleshoot the Warehouse](troubleshoot-fabric-data-warehouse.md)
- [Query Insights in Fabric Data Warehouse](query-insights.md)
