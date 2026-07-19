---
title: Monitor Connections, Sessions, and Requests Using DMVs
description: Learn how to use dynamic management views (DMVs) to monitor connections, sessions, and requests in Fabric Data Warehouse.
ai-usage: ai-assisted
ms.reviewer: rakrish75
ms.date: 06/25/2026
ms.topic: how-to
ms.search.form: Monitoring # This article's title should not change. If so, contact engineering.
---
# Monitor connections, sessions, and requests by using DMVs

**Applies to:** [!INCLUDE [fabric-se-and-dw](includes/applies-to-version/fabric-se-and-dw.md)]

Use existing dynamic management views (DMVs) to monitor connection, session, and request status in [!INCLUDE [product-name](../includes/product-name.md)]. For more information about the tools and methods of executing T-SQL queries, see [Query a warehouse](query-warehouse.md).

In this tutorial, you learn how to monitor your running SQL queries by using dynamic management views (DMVs).

## How to monitor connections, sessions, and requests by using query lifecycle DMVs

Three DMVs provide live SQL query lifecycle insights:

- [sys.dm_exec_connections](/sql/relational-databases/system-dynamic-management-views/sys-dm-exec-connections-transact-sql?view=fabric&preserve-view=true) returns information about each connection established between the warehouse and the engine.
- [sys.dm_exec_sessions](/sql/relational-databases/system-dynamic-management-views/sys-dm-exec-sessions-transact-sql?view=fabric&preserve-view=true) returns information about each session authenticated between the item and the engine.
- [sys.dm_exec_requests](/sql/relational-databases/system-dynamic-management-views/sys-dm-exec-requests-transact-sql?view=fabric&preserve-view=true) returns information about each active request in a session.

Together, these DMVs help you answer questions like:

- Who is running a session?
- When did the session start?
- What's the ID of the connection to the [!INCLUDE [fabric-dw](includes/fabric-dw.md)] and the session that is running the request?
- How many queries are actively running?
- Which queries are long-running?

## Prerequisites

- A workspace with an active Fabric capacity.
- An existing [!INCLUDE [fabric-dw](includes/fabric-dw.md)] or [!INCLUDE [fabric-se](includes/fabric-se.md)].
- A T-SQL query tool, such as the [SQL query editor](sql-query-editor.md) or SQL Server Management Studio (SSMS).
- Permissions to query DMVs and manage sessions.

### Required permissions to query DMVs and manage sessions

- A workspace **Admin** can execute all three DMVs (`sys.dm_exec_connections`, `sys.dm_exec_sessions`, and `sys.dm_exec_requests`) and see session, connection, and request information for all users within the workspace.
- A workspace **Member**, **Contributor**, or **Viewer** can execute `sys.dm_exec_sessions` and `sys.dm_exec_requests` and see only their own sessions and requests within the warehouse. These roles can't execute `sys.dm_exec_connections`.
- Only a workspace **Admin** can run the `KILL` command to stop a session.

## Find warehouse connections and sessions

Join `sys.dm_exec_connections` and `sys.dm_exec_sessions` to view the session for each connection to the warehouse:

```sql
SELECT connections.connection_id,
    connections.connect_time,
    sessions.session_id, sessions.login_name, sessions.login_time, sessions.status
FROM sys.dm_exec_connections AS connections
INNER JOIN sys.dm_exec_sessions AS sessions
    ON connections.session_id = sessions.session_id;
```

## Identify and KILL a long-running query

Use the following steps to find a long-running query in the warehouse, identify the user who started it, and if desired, stop the session that's running it.

1. List active warehouse requests, ordered by how long each has been running since it arrived:

   ```sql
   SELECT request_id, session_id, start_time, total_elapsed_time
   FROM sys.dm_exec_requests
   WHERE status = 'running'
   ORDER BY total_elapsed_time DESC;
   ```

1. Find the user who started the session that contains the long-running query. Replace `<session_id>` with the `session_id` value from the previous step:

   ```sql
   SELECT login_name
   FROM sys.dm_exec_sessions
   WHERE session_id = <session_id>;
   ```

1. If desired, cancel and roll back the session by running the `KILL` command with the `session_id`:

   ```sql
   KILL <session_id>;
   ```

   For example, to stop session `101`:

   ```sql
   KILL 101;
   ```

For a step-by-step guide to diagnosing and resolving query blocking, see [Troubleshoot query blocking in Fabric Data Warehouse](troubleshoot-query-blocking.md).

## Related content

- [Query using the SQL query editor](sql-query-editor.md)
- [Query the [!INCLUDE [fabric-dw](includes/fabric-dw.md)] and [!INCLUDE [fabric-se](includes/fabric-se.md)] in Microsoft Fabric](query-warehouse.md)
- [Query insights in the [!INCLUDE [fabric-dw](includes/fabric-dw.md)] and [!INCLUDE [fabric-se](includes/fabric-se.md)] in Microsoft Fabric](query-insights.md)
