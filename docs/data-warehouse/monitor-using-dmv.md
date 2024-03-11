---
title: Monitor connections, sessions, and requests using DMVs
description: Learn about monitoring with the available Dynamic Management Views.
author: jacindaeng
ms.author: jacindaeng
ms.reviewer: wiassaf
ms.date: 11/15/2023
ms.topic: conceptual
ms.custom:
  - build-2023
  - ignite-2023
ms.search.form: Monitoring # This article's title should not change. If so, contact engineering.
---
# Monitor connections, sessions, and requests using DMVs

**Applies to:** [!INCLUDE[fabric-se-and-dw](includes/applies-to-version/fabric-se-and-dw.md)]

You can use existing dynamic management views (DMVs) to monitor connection, session, and request status in [!INCLUDE [product-name](../includes/product-name.md)]. For more information about the tools and methods of executing T-SQL queries, see [Query the Warehouse](query-warehouse.md).

## How to monitor connections, sessions, and requests using query lifecycle DMVs

For the current version, there are three dynamic management views (DMVs) provided for you to receive live SQL query lifecycle insights.

- [sys.dm_exec_connections](/sql/relational-databases/system-dynamic-management-views/sys-dm-exec-connections-transact-sql?view=fabric&preserve-view=true)
    - Returns information about each connection established between the warehouse and the engine.
- [sys.dm_exec_sessions](/sql/relational-databases/system-dynamic-management-views/sys-dm-exec-sessions-transact-sql?view=fabric&preserve-view=true)
    - Returns information about each session authenticated between the item and engine.
- [sys.dm_exec_requests](/sql/relational-databases/system-dynamic-management-views/sys-dm-exec-requests-transact-sql?view=fabric&preserve-view=true)
    - Returns information about each active request in a session.

These three DMVs provide detailed insight on the following scenarios:

- Who is the user running the session?
- When was the session started by the user?
- What's the ID of the connection to the data [!INCLUDE [fabric-dw](includes/fabric-dw.md)] and the session that is running the request?
- How many queries are actively running?
- Which queries are long running?

In this tutorial, learn how to monitor your running SQL queries using dynamic management views (DMVs).

### Example DMV queries

The following example queries `sys.dm_exec_sessions` to find all sessions that are currently executing.

```sql
SELECT * 
FROM sys.dm_exec_sessions;
```
:::image type="content" source="media\monitor-using-dmv\exec-sessions-results.png" alt-text="Screenshot showing the results of sys.dm_exec_sessions." lightbox="media\monitor-using-dmv\exec-sessions-results.png":::

### Find the relationship between connections and sessions

The following example joins `sys.dm_exec_connections` and `sys.dm_exec_sessions` to the relationship between the active session in a specific connection.

```sql
SELECT connections.connection_id,
 connections.connect_time,
 sessions.session_id, sessions.login_name, sessions.login_time, sessions.status
FROM sys.dm_exec_connections AS connections
INNER JOIN sys.dm_exec_sessions AS sessions
ON connections.session_id=sessions.session_id;
```

### Identify and KILL a long-running query

This first query identifies the list of long-running queries in the order of which query has taken the longest since it has arrived.

```sql
SELECT request_id, session_id, start_time, total_elapsed_time
FROM sys.dm_exec_requests
WHERE status = 'running'
ORDER BY total_elapsed_time DESC;
```

This second query shows which user ran the session that has the long-running query.

```sql
SELECT login_name
FROM sys.dm_exec_sessions
WHERE 'session_id' = 'SESSION_ID WITH LONG-RUNNING QUERY';
```

This third query shows how to use the KILL command on the `session_id` with the long-running query.

```sql
KILL 'SESSION_ID WITH LONG-RUNNING QUERY'
```

For example

```sql
KILL '101'
```

## Permissions

- An Admin has permissions to execute all three DMVs (`sys.dm_exec_connections`, `sys.dm_exec_sessions`, `sys.dm_exec_requests`) to see their own and others' information within a workspace.
- A Member, Contributor, and Viewer can execute `sys.dm_exec_sessions` and `sys.dm_exec_requests` and see their own results within the warehouse, but does not have permission to execute `sys.dm_exec_connections`. 
- Only an Admin has permission to run the `KILL` command.

## Related content

- [Query using the SQL Query editor](sql-query-editor.md)
- [Query the [!INCLUDE [fabric-dw](includes/fabric-dw.md)] and [!INCLUDE [fabric-se](includes/fabric-se.md)] in Microsoft Fabric](query-warehouse.md)
- [Query insights in the [!INCLUDE [fabric-dw](includes/fabric-dw.md)] and [!INCLUDE [fabric-se](includes/fabric-se.md)] in Microsoft Fabric](query-insights.md)
