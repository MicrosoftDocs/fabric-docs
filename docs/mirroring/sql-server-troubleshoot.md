---
title: "Troubleshoot Fabric Mirrored Databases From SQL Server"
description: Troubleshooting mirrored databases From SQL Server in Microsoft Fabric.
author: WilliamDAssafMSFT
ms.author: wiassaf
ms.reviewer: ajayj, anagha-todalbagi
ms.date: 11/14/2025
ms.topic: troubleshooting
---

# Troubleshoot Fabric mirrored databases from SQL Server

This article covers troubleshooting steps for mirroring a database in a SQL Server instance.

## Changes to Fabric capacity or workspace

Learn more from [Changes to Fabric capacity](troubleshooting.md#changes-to-fabric-capacity). 

In addition, note the following causes for SQL Server specifically:

| Cause    | Result | Recommended resolution     |
|:--|:--|:--|
| Workspace deleted | Mirroring stops automatically and disables the change feed in SQL Server | In case mirroring is still active on the SQL Server, execute the following stored procedure on your SQL Server: `exec sp_change_feed_disable_db;`. |
| Any other resource errors | Mirroring is disabled | To ensure your compute resources are not impacted and to minimize impact on the SQL Server, mirroring is disabled on any persistent resource errors. |
| "Users can access data stored in OneLake with apps external to Fabric" setting disabled | "Replicator - Tables Cannot Reach Replicating Status" | Enable the Tenant setting [Users can access data stored in OneLake with apps external to Fabric](../admin/tenant-settings-index.md#onelake-settings).|

## Troubleshooting queries and common solutions

The troubleshooting steps and diagnostic queries can be different in SQL Server 2025 and versions before SQL Server 2025.

## [SQL Server 2025](#tab/sql2025)

## Troubleshooting Fabric Mirroring in SQL Server 2025

### Queries for troubleshooting in SQL Server 2025

If you're experiencing mirroring problems in SQL Server 2025, perform the following database level checks using Dynamic Management Views (DMVs) and stored procedures to validate configuration.

1. Execute the following query to check if the changes properly flow:

    ```sql
    SELECT * FROM sys.dm_change_feed_log_scan_sessions;
    ```

1. If the `sys.dm_change_feed_log_scan_sessions` DMV doesn't show any progress on processing incremental changes, execute the following T-SQL query to check if there are any problems reported:

    ```sql
    SELECT * FROM sys.dm_change_feed_errors;
    ```

1. If there aren't any issues reported, execute the following stored procedure to review the current configuration of the mirrored SQL Server. Confirm it was properly enabled.

    ```sql
    EXEC sp_help_change_feed;
    ```

    The key columns to look for here are the `table_name` and `state`. Any value besides `4` indicates a potential problem.

1. Review [Troubleshoot Fabric mirrored databases](../mirroring/troubleshooting.md).
1. [Contact support](/power-bi/support/service-support-options) if troubleshooting is required.

### Extended events session

The following extended events session can be used to troubleshoot Fabric Mirroring on your SQL Server 2025 instance. It is recommended only to create this session for troubleshooting or support purposes.

```sql
CREATE EVENT SESSION [sqlmirroringxesession] ON SERVER  
ADD EVENT sqlserver.synapse_link_addfilesnapshotendentry,  
ADD EVENT sqlserver.synapse_link_db_enable,  
ADD EVENT sqlserver.synapse_link_end_data_snapshot,  
ADD EVENT sqlserver.synapse_link_error,  
ADD EVENT sqlserver.synapse_link_info,  
ADD EVENT sqlserver.synapse_link_library,  
ADD EVENT sqlserver.synapse_link_perf,  
ADD EVENT sqlserver.synapse_link_scheduler,  
ADD EVENT sqlserver.synapse_link_start_data_snapshot,  
ADD EVENT sqlserver.synapse_link_totalsnapshotcount,  
ADD EVENT sqlserver.synapse_link_trace  
WITH (MAX_MEMORY=4096 KB,EVENT_RETENTION_MODE=ALLOW_SINGLE_EVENT_LOSS,MAX_DISPATCH_LATENCY=30 SECONDS,MAX_EVENT_SIZE=0 KB,MEMORY_PARTITION_MODE=NONE,TRACK_CAUSALITY=OFF,STARTUP_STATE=ON)  
GO
 
ALTER EVENT SESSION [sqlmirroringxesession] ON SERVER
STATE = start;
GO
```

### Transaction log is full due to REPLICATION log reuse wait

If the Fabric Mirroring source SQL Server database transaction log is full due to the `REPLICATION` log reuse wait, consider [enabling the autoreseed functionality](sql-server-configure-automatic-reseed.md).

### Performance impact on source mirrored database in SQL Server

In SQL Server 2025, you can create a resource governor pool to manage and cap the workload of Fabric mirroring on your SQL Server. You can use resource governor to manage Database Engine resource consumption and enforce policies for user workloads. Resource governor lets you reserve or limit various server resources, including the amount of CPU, memory, and physical I/O that user query workloads can use. In this way, you can protect your primary business workloads from pressure from Fabric Mirroring's change feed data collection. 

- To get started, see [Optimize performance of mirrored databases from SQL Server](sql-server-performance.md#resource-governor-for-sql-server-mirroring).
- For more information, see [Resource governor](/sql/relational-databases/resource-governor/resource-governor?view=sql-server-ver17&preserve-view=true).

## [SQL Server 2016-2022](#tab/sql201622)

## Troubleshooting Fabric Mirroring in SQL Server 2016-2022

### Queries for troubleshooting in SQL Server 2016-2022

Change Data Capture (CDC) is used for Fabric Mirroring in versions SQL Server 2025.

1. Review [Known issues and errors in CDC](/sql/relational-databases/track-changes/known-issues-and-errors-change-data-capture?view=sql-server-ver16&preserve-view=true#troubleshooting-errors) for common error resolutions.
1. Review [Administer and monitor CDC](/sql/relational-databases/track-changes/administer-and-monitor-change-data-capture-sql-server?view=sql-server-ver16&preserve-view=true) for diagnostic queries.
1. Review [Troubleshoot Fabric mirrored databases](../mirroring/troubleshooting.md).
1. [Contact support](/power-bi/support/service-support-options) if troubleshooting is required.

### Troubleshoot CDC error messages

For SQL Server versions 2016-2022, mirroring uses CDC.

#### Error message: Microsoft SQL: Change data capture has not been enabled for source table \<schema.table\> Specify the name of a table enabled for Change Data Capture. To report on the tables enabled for Change Data Capture, query the \<schema_table\> column in the \<schema.table\> catalog view.  

This error occurs if CDC is not already enabled or mirroring does not have sufficient permissions to enable CDC. 

1. Check if CDC is enabled in the database.
1. Follow steps in [Enable and disable CDC](/sql/relational-databases/track-changes/enable-and-disable-change-data-capture-sql-server?view=sql-server-ver16&preserve-view=true) to enable CDC for the table you want to mirror.

#### Error message: Microsoft SQL: The database \<dbName\> is not enabled for Change Data Capture. Ensure that the correct database \<dbName\> is set and retry the operation. To report on the databases enabled for Change Data Capture, query the \<schema_table\> column in the \<schema.table\> catalog view.

This error occurs if CDC is not already enabled, or mirroring does not have sufficient permissions to enable CDC. See [Enable and disable CDC](/sql/relational-databases/track-changes/enable-and-disable-change-data-capture-sql-server?view=sql-server-ver16&preserve-view=true) to enable CDC for the database you want to mirror.

#### Error message: Microsoft SQL: The parameter @supports_net_changes is set to \<num\>, but the source table does not have a primary key defined and no alternate unique index has been specified.    

[Fabric Mirroring requires primary key for a table](sql-server-limitations.md#table-level) to be mirrored. Ensure that the table being mirrored has a primary key.

### Troubleshoot common error messages

#### Error message: Gateway is unreachable. ErrorCode: InputValidationError ArtifactId: \<ID\> 

Fabric cannot connect to the on-premises data gateway (OPDG) endpoint due to a gateway connectivity issue. To troubleshoot, see [Service gateway troubleshooting](/data-integration/gateway/service-gateway-tshoot).

#### Error message: Challenge w/EvaluationResponse as detail Kind=   

The credentials specified in the connection failed to authenticate in SQL Server. User logins can fail for many reasons, such as invalid credentials, password expiration, or insufficient permissions.

1. Check if the login or password is correct.
1. Ensure that the login specified has permissions in the database being mirrored.

#### Error message: Challenge Kind=SQL

The credentials specified in the connection failed to authenticate in SQL Server. User logins can fail for many reasons, such as invalid credentials, password expiration, or insufficient permissions. 

1. Check if the login or password is correct.
1. Ensure that the login specified has permissions in the database being mirrored.

#### Error message: Microsoft SQL: A network-related or instance-specific error occurred while establishing a connection to SQL Server. The server was not found or was not accessible. Verify that the instance name is correct and that SQL Server is configured to allow remote connections. (Provider: Named Pipes Provider, error: \<num\> - Could not open a connection to SQL Server) 

This error occurs if on-premises data gateway (OPDG) cannot connect to the SQL Server instance. Follow the steps in [A network-related or instance-specific error occurred while establishing a connection to SQL Server](/troubleshoot/sql/database-engine/connect/network-related-or-instance-specific-error-occurred-while-establishing-connection) to troubleshoot and resolve the SQL Server connectivity issue.

#### Error message: SQL server agent is probably stopped, hence watermark in the db is null

For SQL Server 2016-20222, Fabric Mirroring uses SQL Server Agent CDC jobs to track changes in the source tables. This error occurs if SQL Server Agent is not running, resulting in the changes on the sources exceeding the default retention interval. Ensure the SQL Server Agent is running and set to automatically start when the server is restarted.

#### Error message: Table \<schema.table\> definition has changed since CDC was enabled. Please re-enable CDC (EXEC ...)

This error occurs if source schema for the mirrored table was changed after CDC was enabled. This results in the mirrored table schema not matching the source table schema. Disable and re-enable CDC on the impacted tables. See [Enable and disable CDC](/sql/relational-databases/track-changes/enable-and-disable-change-data-capture-sql-server?view=sql-server-ver16&preserve-view=true).

---

## Related content

- [Troubleshoot Fabric mirrored databases](../mirroring/troubleshooting.md)
- [Frequently asked questions for Mirroring SQL Server in Microsoft Fabric](../mirroring/sql-server-faq.yml)
