---
title: "Optimize Performance of Mirrored Databases from SQL Server"
description: Learn how to optimize performance of the source database and mirrored database from SQL Server in Microsoft Fabric.
ms.reviewer: ajayj, anagha-todalbagi
ms.date: 08/19/2025
ms.topic: troubleshooting
ms.custom:
  - references_regions
---
# Optimize performance for mirrored databases from SQL Server

This article includes important steps to optimize performance of the source database and mirrored database from SQL Server in Microsoft Fabric.

## Control scan performance

When mirroring is enabled on tables in a database, a scan process periodically captures changes by harvesting the transaction log. This process begins at the LSN of the oldest unreplicated committed transaction and scans the next N-1 replicated transactions, where N represents the number of transactions specified using the `@maxtrans` parameter in `sys.sp_change_feed_configure_parameters`. The `maxtrans` parameter value indicates the maximum number of transactions to process in each scan cycle.

In situations where scan latency is very high, using a higher `maxtrans` value can be advantageous, whereas in cases involving sparsely replicated or relatively large transactions, a lower `maxtrans` setting might be preferable. The dynamic maximum transactions feature streamlines this process by automatically determining the optimal `maxtrans` value during each scan based on other factors like the log usage, scan latency, and the workload. When the `dynamicmaxtrans` change feed setting is enabled, Fabric dynamically adjusts the maxtrans parameter, ensuring optimal scan performance. 

Verify the setting of the dynamic maximum transactions feature with [sys.sp_help_change_feed_settings](/sql/relational-databases/system-stored-procedures/sp-help-change-feed-settings?view=fabric&preserve-view=true), or use `repl_logscan_dynamic_maxtrans` extended event to monitor the runtime values for each scan.

To enable the dynamic maximum transactions feature, set `@dynamicmaxtrans` to `1`. For example:

```sql
USE <Mirrored database name>
GO
EXECUTE sys.sp_change_feed_configure_parameters
  @dynamicmaxtrans=1;
```

To modify the maximum and lower bounds for the dynamic maximum transactions feature, use `@maxtrans` and `@dynamicmaxtranslowerbound` respectively. For example:

```sql
USE <Mirrored database name>
GO
EXECUTE sys.sp_change_feed_configure_parameters
  @dynamicmaxtrans=1
, @dynamicmaxtranslowerbound=5
, @maxtrans=5000;
```

### Considerations for the dynamic maximum transactions setting

The dynamic maximum transactions feature is enabled by default in SQL Server 2025. The dynamic maximum transactions feature is enabled and cannot be managed or disabled in Azure SQL Database and Azure SQL Managed Instance.

When dynamic maxtrans is enabled, mirroring processes up to 10,000 transactions (by default) or the configured maximum transactions value during the log scan phase. To prevent this phase from running too long, a three-minute timeout is enforced. Any transactions processed before the timeout expires are published to the mirrored database, and remaining transactions will be captured during the next scan.

The optimal values for the dynamic maximum transactions feature vary by workload, latency, and other factors. Consider turning on the dynamic maxtrans feature when latency is higher than desired and `transaction_count` in each batch is greater than the lower bound setting (200, by default). This can be monitored using the `latency` column in `sys.dm_change_feed_log_scan_sessions` or by using the extended event `repl_logscan_dynamic_maxtrans` to see if the `current_maxtrans` is reaching the `maxtrans` set. If latency is still high, consider increasing the `maxtrans` upper limit using [sys.sp_help_change_feed_settings](/sql/relational-databases/system-stored-procedures/sp-help-change-feed-settings?view=fabric&preserve-view=true).

Use the extended event `repl_logscan_dynamic_maxtrans` to monitor if timeouts are happening frequently. The field `prev_phase2_scan_termination_reason` will have a value `LogScanTerminationReason_MaxScanDurationReached` when a timeout from the scan happens. Consider lowering `maxtrans` or disabling dynamic maxtrans using [sys.sp_help_change_feed_settings](/sql/relational-databases/system-stored-procedures/sp-help-change-feed-settings?view=fabric&preserve-view=true) if you notice frequent timeouts.

## Resource governor for SQL Server mirroring

In SQL Server 2025, you can create a resource governor pool to manage and cap the workload of Fabric mirroring on your SQL Server. You can use resource governor to manage Database Engine resource consumption and enforce policies for user workloads. Resource governor lets you reserve or limit various server resources, including the amount of CPU, memory, and physical I/O that user query workloads can use. In this way, you can protect your primary business workloads from pressure from Fabric Mirroring's change feed data collection. For more information, see [Resource governor](/sql/relational-databases/resource-governor/resource-governor?view=sql-server-ver17&preserve-view=true).

To get started configure workload groups in SQL Server 2025 for Fabric mirroring, use the following sample script and instructions.

- You can choose any name for the `RESOURCE POOL`. 
- This sample script configures a cap for a desired percentage of CPU to allow for Fabric mirroring. The following sample uses `50` for 50 percent. This value is the maximum average CPU bandwidth that all requests in the resource pool can receive when there's CPU contention. Use a lower value to further throttle Fabric mirroring. 
- The `WORKLOAD GROUP` names must match the values in the example script. Each workload group is for a specific phase of mirroring. Each workload group can be in the same or a different pool depending on how you plan your resource governor pools and workloads.
- Before configuring the resource governor for the first time on your SQL Server instance, carefully review the [Resource governor documentation, examples, and best practices](/sql/relational-databases/resource-governor/resource-governor-walkthrough?view=sql-server-ver17&preserve-view=true).

```sql
--Create resource pool for Fabric mirroring
CREATE RESOURCE POOL [ChangeFeedPool] WITH (MAX_CPU_PERCENT = 50);

--Create workload groups for Fabric mirroring. Do not modify.
CREATE WORKLOAD GROUP [x_ms_reserved_changefeed_snapshot_group] USING [ChangeFeedPool];
CREATE WORKLOAD GROUP [x_ms_reserved_changefeed_capture_group] USING [ChangeFeedPool];
CREATE WORKLOAD GROUP [x_ms_reserved_changefeed_publish_group] USING [ChangeFeedPool];
CREATE WORKLOAD GROUP [x_ms_reserved_changefeed_commit_group] USING [ChangeFeedPool];
CREATE WORKLOAD GROUP [x_ms_reserved_changefeed_notification_group] USING [ChangeFeedPool];
```

To apply the changes and enable the resource governor, as usual:

```sql
ALTER RESOURCE GOVERNOR RECONFIGURE
```

## Related content

- [Configure automatic reseed for Fabric mirrored databases from SQL Server](sql-server-configure-automatic-reseed.md)
