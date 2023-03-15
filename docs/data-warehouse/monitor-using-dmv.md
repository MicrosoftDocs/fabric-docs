---
title: Monitoring connections, sessions, and requests using DMVs
description: Learn about monitoring with the available Dynamic Management Views.
ms.reviewer: wiassaf
ms.author: jacindaeng
author: jacindaeng
ms.topic: conceptual
ms.date: 03/15/2023
---

# Monitoring connections, sessions, and requests using DMVs

[!INCLUDE [preview-note](../includes/preview-note.md)]

**Applies to:** Warehouse and SQL Endpoint

For the current version, there are three Dynamic Management Views (DMVs) provided for you to receive live SQL query lifecycle insights.

- Sys.dm_exec_connections
- Sys.dm_exec_sessions
- Sys.dm_exec_requests

These three DMVs provide detailed insight on the following scenarios:

- Who is the user running the session?
- When was the session started by the user?
- What’s the ID of the connection to the data warehouse item and the session that is running the request?
- How many queries are actively running?
- Which queries are long running?

## Sys.dm_exec_connections (Transact-SQL)

Returns information about each connection established between the warehouse and the engine.

> [!NOTE]
> Only information about active connections will be surfaced in the DMV.

| **Column name** | **Data type** | **Description** |
|---|---|---|
| **session_id** | **int** | Identifies the session associated with this connection. Is nullable. |
| **most_recent_session_id** | **int** | Represents the session ID for the most recent request associated with this connection. (SOAP connections can be reused by another session.) Is nullable. |
| **connect_time** | **datetime** | Timestamp when connection was established. Isn't nullable. |
| **net_transport** | **nvarchar(40)** | When MARS is used, returns **Session** for each additional connection associated with a MARS logical session.<br><br>**Note:** Describes the physical transport protocol that is used by this connection. Isn't nullable. |
| **protocol_type** | **nvarchar(40)** | Specifies the protocol type of the payload. It currently distinguishes between TDS ("TSQL"), "SOAP", and "Database Mirroring". Is nullable. |
| **protocol_version** | **int** | Version of the data access protocol associated with this connection. Is nullable. |
| **endpoint_id** | **int** | An identifier that describes what type of connection it is. This `endpoint_id` can be used to query the `sys.endpoints` view. Is nullable. |
| **encrypt_option** | **nvarchar(40)** | Boolean value to describe whether encryption is enabled for this connection. Isn't nullable. |
| **auth_scheme** | **nvarchar(40)** | Specifies SQL Server/Windows Authentication scheme used with this connection. Isn't nullable. |
| **node_affinity** | **smallint** | Identifies the memory node to which this connection has affinity. Isn't nullable. |
| **num_reads** | **int** | Number of byte reads that have occurred over this connection. Is nullable. |
| **num_writes** | **int** | Number of byte writes that have occurred over this connection. Is nullable. |
| **last_read** | **datetime** | Timestamp when last read occurred over this connection. Is nullable. |
| **last_write** | **datetime** | Timestamp when last write occurred over this connection. Not Is nullable. |
| **net_packet_size** | **int** | Network packet size used for information and data transfer. Is nullable. |
| **client_net_address** | **varchar(48)** | Host address of the client connecting to this server. Is nullable. |
| **client_tcp_port** | **int** | Port number on the client computer that is associated with this connection. Is nullable.<br><br>In Azure SQL Database, this column always returns NULL. |
| **local_net_address** | **varchar(48)** | Represents the IP address on the server that this connection targeted. Available only for connections using the TCP transport provider. Is nullable.<br><br>In Azure SQL Database, this column always returns NULL. |
| **local_tcp_port** | **int** | Represents the server TCP port that this connection targeted if it were a connection using the TCP transport. Is nullable.<br><br>In Azure SQL Database, this column always returns NULL. |
| **connection_id** | **uniqueidentifier** | Identifies each connection uniquely. Isn't nullable. |
| **parent_connection_id** | **uniqueidentifier** | Identifies the primary connection that the MARS session is using. Is nullable. |
| **most_recent_sql_handle** | **varbinary(64)** | The SQL handle of the last request executed on this connection. The `most_recent_sql_handle` column is always in sync with the `most_recent_session_id` column. Is nullable. |

## Sys.dm_exec_sessions (Transact-SQL)

Returns information about each session authenticated between the item and engine.

> [!NOTE]
> Only information about active sessions will be surfaced in the DMV.

| **Column name** | **Data type** | **Description and version-specific information** |
|---|---|---|
| **session_id** | **smallint** | Identifies the session associated with each active primary connection. Not nullable. |
| **login_time** | **datetime** | Time when session was established. Not nullable. Sessions that haven't completed logging in, at the time this DMV is queried, are shown with a login time of `1900-01-01`. |
| **host_name** | **nvarchar(128)** | Name of the client workstation that is specific to a session. The value is NULL for internal sessions. Is nullable.<br><br>**Security Note:** The client application provides the workstation name and can provide inaccurate data. Don't rely on HOST_NAME as a security feature. |
| **program_name** | **nvarchar(128)** | Name of client program that initiated the session. The value is NULL for internal sessions. Is nullable. |
| **host_process_id** | **int** | Process ID of the client program that initiated the session. The value is NULL for internal sessions. Is nullable. |
| **client_version** | **int** | TDS protocol version of the interface that is used by the client to connect to the server. The value is NULL for internal sessions. Is nullable. |
| **client_interface_name** | **nvarchar(32)** | Name of library/driver being used by the client to communicate with the server. The value is NULL for internal sessions. Is nullable. |
| **security_id** | **varbinary(85)** | Microsoft Windows security ID associated with the login. Not nullable. |
| **login_name** | **nvarchar(128)** | SQL Server login name under which the session is currently executing. For the original login name that created the session, see original_login_name. Can be a SQL Server authenticated login name or a Windows authenticated domain user name. Not nullable. |
| **nt_domain** | **nvarchar(128)** | **Applies to**: SQL Server 2008 (10.0.x) and later versions<br><br>Windows domain for the client if the session is using Windows Authentication or a trusted connection. This value is NULL for internal sessions and non-domain users. Is nullable. |
| **nt_user_name** | **nvarchar(128)** | **Applies to**: SQL Server 2008 (10.0.x) and later versions<br><br>Windows user name for the client if the session is using Windows Authentication or a trusted connection. This value is NULL for internal sessions and non-domain users. Is nullable. |
| **status** | **nvarchar(30)** | Status of the session. Possible values:<br><br>**Running** - Currently running one or more requests<br><br>**Sleeping** - Currently running no requests<br><br>**Dormant** - Session has been reset because of connection pooling and is now in prelogin state.<br><br>**Preconnect** - Session is in the Resource Governor classifier.<br><br>Not nullable. |
| **context_info** | **varbinary(128)** | CONTEXT_INFO value for the session. The user sets the context information by using the [SET CONTEXT_INFO](/sql/t-sql/statements/set-context-info-transact-sql?view=sql-server-ver16&preserve-view=true) statement. Is nullable. |
| **cpu_time** | **int** | CPU time, in milliseconds, used by this session. Not nullable. |
| **memory_usage** | **int** | Number of 8-KB pages of memory used by this session. Not nullable. |
| **total_scheduled_time** | **int** | Total time, in milliseconds, for which the session (requests within) were scheduled for execution. Not nullable. |
| **total_elapsed_time** | **int** | Time, in milliseconds, since the session was established. Not nullable. |
| **endpoint_id** | **int** | ID of the Endpoint associated with the session. Not nullable. |
| **last_request_start_time** | **datetime** | Time at which the last request on the session began. This includes the currently executing request. Not nullable. |
| **last_request_end_time** | **datetime** | Time of the last completion of a request on the session. Is nullable. |
| **reads** | **bigint** | Number of reads performed, by requests in this session, during this session. Not nullable. |
| **writes** | **bigint** | Number of writes performed, by requests in this session, during this session. Not nullable. |
| **logical_reads** | **bigint** | Number of logical reads performed, by requests in this session, during this session. Not nullable. |
| **is_user_process** | **bit** | 0 if the session is a system session. Otherwise, it's 1. Not nullable. |
| **text_size** | **int** | TEXTSIZE setting for the session. Not nullable. |
| **language** | **nvarchar(128)** | LANGUAGE setting for the session. Is nullable. |
| **date_format** | **nvarchar(3)** | DATEFORMAT setting for the session. Is nullable. |
| **date_first** | **smallint** | DATEFIRST setting for the session. Not nullable. |
| **quoted_identifier** | **bit** | QUOTED_IDENTIFIER setting for the session. Not nullable. |
| **arithabort** | **bit** | ARITHABORT setting for the session. Not nullable. |
| **ansi_null_dflt_on** | **bit** | ANSI_NULL_DFLT_ON setting for the session. Not nullable. |
| **ansi_defaults** | **bit** | ANSI_DEFAULTS setting for the session. Not nullable. |
| **ansi_warnings** | **bit** | ANSI_WARNINGS setting for the session. Not nullable. |
| **ansi_padding** | **bit** | ANSI_PADDING setting for the session. Not nullable. |
| **ansi_nulls** | **bit** | ANSI_NULLS setting for the session. Not nullable. |
| **concat_null_yields_null** | **bit** | CONCAT_NULL_YIELDS_NULL setting for the session. Not nullable. |
| **transaction_isolation_level** | **smallint** | Transaction isolation level of the session.<br><br>0 = Unspecified<br><br>1 = ReadUncommitted<br><br>2 = ReadCommitted<br><br>3 = RepeatableRead<br><br>4 = Serializable<br><br>5 = Snapshot<br><br>Not nullable. |
| **lock_timeout** | **int** | LOCK_TIMEOUT setting for the session. The value is in milliseconds. Not nullable. |
| **deadlock_priority** | **int** | DEADLOCK_PRIORITY setting for the session. Not nullable. |
| **row_count** | **bigint** | Number of rows returned on the session up to this point. Not nullable. |
| **prev_error** | **int** | ID of the last error returned on the session. Not nullable. |
| **original_security_id** | **varbinary(85)** | Microsoft Windows security ID that is associated with the original_login_name. Not nullable. |
| **original_login_name** | **nvarchar(128)** | SQL Server login name that the client used to create this session. Can be a SQL Server authenticated login name, a Windows authenticated domain user name, or a contained database user. The session could have gone through many implicit or explicit context switches after the initial connection. For example, if [EXECUTE AS](/sql/t-sql/statements/execute-as-transact-sql?view=sql-server-ver16&preserve-view=true) is used. Not nullable. |
| **last_successful_logon** | **datetime** | **Applies to**: SQL Server 2008 (10.0.x) and later versions<br><br>Time of the last successful logon for the original_login_name before the current session started. |
| **last_unsuccessful_logon** | **datetime** | **Applies to**: SQL Server 2008 (10.0.x) and later versions<br><br>Time of the last unsuccessful logon attempt for the original_login_name before the current session started. |
| **unsuccessful_logons** | **bigint** | **Applies to**: SQL Server 2008 (10.0.x) and later versions<br><br>Number of unsuccessful logon attempts for the original_login_name between the last_successful_logon and login_time. |
| **group_id** | **int** | ID of the workload group to which this session belongs. Not nullable. |
| **database_id** | **smallint** | **Applies to**: SQL Server 2012 (11.x) and later versions<br><br>ID of the current database for each session. |
| **authenticating_database_id** | **int** | **Applies to**: SQL Server 2012 (11.x) and later versions<br><br>ID of the database authenticating the principal. For Logins, the value is 0. For contained database users, the value is the database ID of the contained database. |
| **open_transaction_count** | **int** | **Applies to**: SQL Server 2012 (11.x) and later versions<br><br>Number of open transactions per session. |
| **page_server_reads** | **bigint** | **Applies to**: Azure SQL Database Hyperscale<br><br>Number of page server reads performed, by requests in this session, during this session. Not nullable. |

### Sys.dm_exec_requests (Transact-SQL)

Returns information about each active request in a session.

> [!NOTE]
> Only information about active sessions will be surfaced in the DMV.

| **Column name** | **Data type** | **Description** |
|---|---|---|
| **session_id** | **smallint** | ID of the session to which this request is related. Isn't nullable. |
| **request_id** | **int** | ID of the request. Unique in the context of the session. Isn't nullable. |
| **start_time** | **datetime** | Timestamp when the request arrived. Isn't nullable. |
| **status** | **nvarchar(30)** | Status of the request. Can be one of the following values:<br><br>Background<br>Running<br>Runnable<br>Sleeping<br>Suspended<br><br>Isn't nullable. |
| **Command** | **nvarchar(32)** | Identifies the current type of command that is being processed. Common command types include the following values:<br><br>SELECT<br>INSERT<br>UPDATE<br>DELETE<br>BACKUP LOG<br>BACKUP DATABASE<br>DBCC<br>FOR<br><br>The text of the request can be retrieved by using sys.dm_exec_sql_text with the corresponding sql_handle for the request. Internal system processes set the command based on the type of task they perform. Tasks can include the following values:<br><br>LOCK MONITOR<br>CHECKPOINTLAZY<br>WRITER<br><br>Isn't nullable. |
| **sql_handle** | **varbinary(64)** | Is a token that uniquely identifies the batch or stored procedure that the query is part of. Is nullable. |
| **statement_start_offset** | **int** | Indicates, in bytes, beginning with 0, the starting position of the currently executing statement for the currently executing batch or persisted object. Can be used together with the `sql_handle`, the `statement_end_offset`, and the `sys.dm_exec_sql_text` dynamic management function to retrieve the currently executing statement for the request. Is nullable. |
| **statement_end_offset** | **int** | Indicates, in bytes, starting with 0, the ending position of the currently executing statement for the currently executing batch or persisted object. Can be used together with the `sql_handle`, the `statement_start_offset`, and the `sys.dm_exec_sql_text` dynamic management function to retrieve the currently executing statement for the request. Is nullable. |
| **plan_handle** | **varbinary(64)** | Is a token that uniquely identifies a query execution plan for a batch that is currently executing. Is nullable. |
| **database_id** | **smallint** | ID of the database the request is executing against. Isn't nullable. |
| **user_id** | **int** | ID of the user who submitted the request. Isn't nullable. |
| **connection_id** | **uniqueidentifier** | ID of the connection on which the request arrived. Is nullable. |
| **blocking_session_id** | **smallint** | ID of the session that is blocking the request. If this column is NULL or equal to 0, the request isn't blocked, or the session information of the blocking session isn't available (or can't be identified). For more information, see [Understand and resolve SQL Server blocking problems](/troubleshoot/sql/performance/understand-resolve-blocking).<br><br>-2 = The blocking resource is owned by an orphaned distributed transaction.<br><br>-3 = The blocking resource is owned by a deferred recovery transaction.<br><br>-4 = Session ID of the blocking latch owner couldn't be determined at this time because of internal latch state transitions.<br><br>-5 = Session ID of the blocking latch owner couldn't be determined because it isn't tracked for this latch type (for example, for an SH latch).<br><br>By itself, blocking_session_id -5 doesn't indicate a performance problem. -5 is an indication that the session is waiting on an asynchronous action to complete. Before -5 was introduced, the same session would have shown blocking_session_id 0, even though it was still in a wait state.<br><br>Depending on workload, observing -5 as blocking_session_id may be a common occurrence. |
| **wait_type** | **nvarchar(60)** | If the request is currently blocked, this column returns the type of wait. Is nullable.<br><br>For information about types of waits, see [sys.dm_os_wait_stats (Transact-SQL)](/sql/relational-databases/system-dynamic-management-views/sys-dm-os-wait-stats-transact-sql?view=azure-sqldw-latest&preserve-view=true). |
| **wait_time** | **int** | If the request is currently blocked, this column returns the duration in milliseconds, of the current wait. Isn't nullable. |
| **last_wait_type** | **nvarchar(60)** | If this request has previously been blocked, this column returns the type of the last wait. Isn't nullable. |
| **wait_resource** | **nvarchar(256)** | If the request is currently blocked, this column returns the resource for which the request is currently waiting. Isn't nullable. |
| **open_transaction_count** | **int** | Number of transactions that are open for this request. Isn't nullable. |
| **open_resultset_count** | **int** | Number of result sets that are open for this request. Isn't nullable. |
| **transaction_id** | **bigint** | ID of the transaction in which this request executes. Isn't nullable. |
| **context_info** | **varbinary(128)** | CONTEXT_INFO value of the session. Is nullable. |
| **percent_complete** | **real** | Percentage of work completed for the following commands:<br><br>ALTER INDEX REORGANIZE<br>AUTO_SHRINK option with ALTER DATABASE<br>BACKUP DATABASE<br>DBCC CHECKDB<br>DBCC CHECKFILEGROUP<br>DBCC CHECKTABLE<br>DBCC INDEXDEFRAG<br>DBCC SHRINKDATABASE<br>DBCC SHRINKFILE<br>RECOVERY<br>RESTORE DATABASE<br>ROLLBACK<br>TDE ENCRYPTION<br><br>Isn't nullable. |
| **estimated_completion_time** | **bigint** | Internal only. Isn't nullable. |
| **cpu_time** | **int** | CPU time in milliseconds that is used by the request. Isn't nullable. |
| **total_elapsed_time** | **int** | Total time elapsed in milliseconds since the request arrived. Isn't nullable. |
| **scheduler_id** | **int** | ID of the scheduler that is scheduling this request. Isn't nullable. |
| **task_address** | **varbinary(8)** | Memory address allocated to the task that is associated with this request. Is nullable. |
| **reads** | **bigint** | Number of reads performed by this request. Isn't nullable. |
| **writes** | **bigint** | Number of writes performed by this request. Isn't nullable. |
| **logical_reads** | **bigint** | Number of logical reads that have been performed by the request. Isn't nullable. |
| **text_size** | **int** | TEXTSIZE setting for this request. Isn't nullable. |
| **language** | **nvarchar(128)** | Language setting for the request. Is nullable. |
| **date_format** | **nvarchar(3)** | DATEFORMAT setting for the request. Is nullable. |
| **date_first** | **smallint** | DATEFIRST setting for the request. Isn't nullable. |
| **quoted_identifier** | **bit** | 1 = QUOTED_IDENTIFIER is ON for the request. Otherwise, it's 0.<br><br>Isn't nullable. |
| **arithabort** | **bit** | 1 = ARITHABORT setting is ON for the request. Otherwise, it's 0.<br><br>Isn't nullable. |
| **ansi_null_dflt_on** | **bit** | 1 = ANSI_NULL_DFLT_ON setting is ON for the request. Otherwise, it's 0.<br><br>Isn't nullable. |
| **ansi_defaults** | **bit** | 1 = ANSI_DEFAULTS setting is ON for the request. Otherwise, it's 0.<br><br>Isn't nullable. |
| **ansi_warnings** | **bit** | 1 = ANSI_WARNINGS setting is ON for the request. Otherwise, it's 0.<br><br>Isn't nullable. |
| **ansi_padding** | **bit** | 1 = ANSI_PADDING setting is ON for the request.<br><br>Otherwise, it's 0.<br><br>Isn't nullable. |
| **ansi_nulls** | **bit** | 1 = ANSI_NULLS setting is ON for the request. Otherwise, it's 0.<br><br>Isn't nullable. |
| **concat_null_yields_null** | **bit** | 1 = CONCAT_NULL_YIELDS_NULL setting is ON for the request. Otherwise, it's 0.<br><br>Isn't nullable. |
| **transaction_isolation_level** | **smallint** | Isolation level with which the transaction for this request is created. Isn't nullable.<br>0 = Unspecified<br>1 = ReadUncomitted<br>2 = ReadCommitted<br>3 = Repeatable<br>4 = Serializable<br>5 = Snapshot |
| **lock_timeout** | **int** | Lock time-out period in milliseconds for this request. Isn't nullable. |
| **deadlock_priority** | **int** | DEADLOCK_PRIORITY setting for the request. Isn't nullable. |
| **row_count** | **bigint** | Number of rows that have been returned to the client by this request. Isn't nullable. |
| **prev_error** | **int** | Last error that occurred during the execution of the request. Isn't nullable. |
| **nest_level** | **int** | Current nesting level of code that is executing on the request. Isn't nullable. |
| **granted_query_memory** | **int** | Number of pages allocated to the execution of a query on the request. Isn't nullable. |
| **executing_managed_code** | **bit** | Indicates whether a specific request is currently executing common language runtime objects, such as routines, types, and triggers. It's set for the full time a common language runtime object is on the stack, even while running Transact-SQL from within common language runtime. Isn't nullable. |
| **group_id** | **int** | ID of the workload group to which this query belongs. Isn't nullable. |
| **query_hash** | **binary(8)** | Binary hash value calculated on the query and used to identify queries with similar logic. You can use the query hash to determine the aggregate resource usage for queries that differ only by literal values. |
| **query_plan_hash** | **binary(8)** | Binary hash value calculated on the query execution plan and used to identify similar query execution plans. You can use query plan hash to find the cumulative cost of queries with similar execution plans. |
| **statement_sql_handle** | **varbinary(64)** | SQL handle of the individual query.<br><br>This column is NULL if Query Store isn't enabled for the database. |
| **statement_context_id** | **bigint** | The optional foreign key to sys.query_context_settings.<br><br>This column is NULL if Query Store isn't enabled for the database. |
| **dop** | **int** | The degree of parallelism of the query. |
| **parallel_worker_count** | **int** | The number of reserved parallel workers if this is a parallel query. |
| **external_script_request_id** | **uniqueidentifier** | The external script request ID associated with the current request. |
| **is_resumable** | **bit** | Indicates whether the request is a resumable index operation. |
| **page_resource** | **binary(8)** | An 8-byte hexadecimal representation of the page resource if the `wait_resource` column contains a page. For more information, see [sys.fn_PageResCracker](/sql/relational-databases/system-functions/sys-fn-pagerescracker-transact-sql?view=azure-sqldw-latest&preserve-view=true). |
| **page_server_reads** | **Bigint** | Number of page server reads performed by this request. isn't nullable. |
| **dist_statement_id** | uniqueid | ID for the statement. |
| **\*label** | **nvarchar(255)** | Optional label string associated with some SELECT query statements. |

## How to monitor connections, sessions, and requests using Query Lifecycle DMVs

In this tutorial, learn how to monitor your running SQL queries using Dynamic Management Views (DMVs).

### Example DMV queries

The following example queries sys.dm_exec_sessions to find all sessions that are currently executing.

```
SELECT * 
FROM sys.dm_exec_sessions;
```

### Find the relationship between connections and sessions

The following example joins sys.dm_exec_connections and sys.dm_exec_sessions to the relationship between the active session in a specific connection.

```
SELECT connections.connection_id,
 connections.connect_time,
 sessions.session_id, sessions.login_name, sessions.login_time, sessions.status
FROM sys.dm_exec_connections connections
JOIN sys.dm_exec_sessions sessions
ON connections.session_id=sessions.session_id
```

### Identify and KILL a long-running query

This first query identifies the list of long-running queries in the order of which query has taken the longest since it has arrived.

```
 SELECT request_id, session_id, start_time, total_elapsed_time,
FROM sys.dm_exec_requests
WHERE status = ‘running’
ORDER BY total_elapsed_time DESC
```

This second query shows which user ran the session that has the long-running query.

```
SELECT login_name,
FROM sys.dm_exec_sessions
WHERE ‘session_id’ = ‘[SESSION_ID WITH LONG-RUNNING QUERY]’
```

This third query shows how to use the KILL command on the session with the long-running query.

```
KILL ‘[SESSION_ID WITH LONG-RUNNING QUERY]’
```

## Next steps

- [Create a table with SSMS](create-table-ssms.md)
