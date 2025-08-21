---
title: "Troubleshoot Fabric Mirrored Databases From SQL Server"
description: Troubleshooting mirrored databases From SQL Server in Microsoft Fabric.
author: WilliamDAssafMSFT
ms.author: wiassaf
ms.reviewer: ajayj, anagha-todalbagi
ms.date: 08/18/2025
ms.topic: troubleshooting
ms.custom:
  - references_regions
---
# Troubleshoot Fabric mirrored databases from SQL Server

This article covers troubleshooting steps for mirroring a database in a SQL Server instance.

[!INCLUDE [preview-note](../includes/feature-preview-note.md)]

## Changes to Fabric capacity or workspace

Learn more from [Changes to Fabric capacity](troubleshooting.md#changes-to-fabric-capacity). 

In addition, note the following causes for SQL Server specifically:

| Cause    | Result | Recommended resolution     |
|:--|:--|:--|
| Workspace deleted | Mirroring stops automatically and disables the change feed in SQL Server | In case mirroring is still active on the SQL Server, execute the following stored procedure on your SQL Server: `exec sp_change_feed_disable_db;`. |
| Any other resource errors | Mirroring is disabled | To ensure your compute resources are not impacted and to minimize impact on the SQL Server, mirroring is disabled on any persistent resource errors. |
| "Users can access data stored in OneLake with apps external to Fabric" setting disabled | "Replicator - Tables Cannot Reach Replicating Status" | Enable the Tenant setting [Users can access data stored in OneLake with apps external to Fabric](../../admin/tenant-settings-index.md#onelake-settings).|

## Queries for troubleshooting in SQL Server 2025

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

## Queries for troubleshooting in SQL Server 2016-2022

Change Data Capture (CDC) is used for Fabric Mirroring in versions SQL Server 2025.

1. Review [Known issues and errors in CDC](/sql/relational-databases/track-changes/known-issues-and-errors-change-data-capture?view=sql-server-ver16&preserve-view=true#troubleshooting-errors) for common error resolutions.
1. Review [Administer and monitor CDC](/sql/relational-databases/track-changes/administer-and-monitor-change-data-capture-sql-server?view=sql-server-ver16&preserve-view=true) for diagnostic queries.
1. Review [Troubleshoot Fabric mirrored databases](../mirroring/troubleshooting.md).
1. [Contact support](/power-bi/support/service-support-options) if troubleshooting is required.

## Transaction log is full due to REPLICATION log reuse wait

If the Fabric Mirroring source SQL Server database transaction log is full due to the `REPLICATION` log reuse wait, consider [enabling the autoreseed functionality](sql-server-configure-automatic-reseed.md).

## Performance impact on source mirrored database in SQL Server

In SQL Server 2025 (Preview), you can create a resource governor pool to manage and cap the workload of Fabric mirroring on your SQL Server. You can use resource governor to manage Database Engine resource consumption and enforce policies for user workloads. Resource governor lets you reserve or limit various server resources, including the amount of CPU, memory, and physical I/O that user query workloads can use. In this way, you can protect your primary business workloads from pressure from Fabric Mirroring's change feed data collection. 

- To get started, see [Optimize performance of mirrored databases from SQL Server](sql-server-performance.md#resource-governor-for-sql-server-mirroring).
- For more information, see [Resource governor](/sql/relational-databases/resource-governor/resource-governor?view=sql-server-ver17&preserve-view=true).

## Related content

- [Troubleshoot Fabric mirrored databases](../mirroring/troubleshooting.md)
- [Frequently asked questions for Mirroring SQL Server in Microsoft Fabric](../mirroring/sql-server-faq.yml)
