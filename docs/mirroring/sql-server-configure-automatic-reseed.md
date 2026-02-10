---
title: "Configure automatic reseed for Fabric Mirrored Databases from SQL Server"
description: Configure automatic reseed for Fabric mirrored databases from SQL Server.
ms.reviewer: ajayj, anagha-todalbagi, wiassaf
ms.date: 10/15/2025
ms.topic: troubleshooting
ms.custom:
  - references_regions
---
# Configure automatic reseed for Fabric mirrored databases from SQL Server

This article covers automatic reseeding for mirroring a database from a SQL Server instance.

There are certain situations where delays in mirroring to Fabric can lead to increased transaction log file usage. This is because the transaction log cannot be truncated until after committed changes have been replicated to the mirrored database. Once the transaction log size reaches its maximum defined limit, writes to the database fail. To safeguard operational databases from write failures for critical OLTP transactions, you can set up an autoreseed mechanism that allows the transaction log to be truncated and reinitializes the database mirroring to Fabric.

A reseed stops flow of transactions to Microsoft Fabric from the mirrored database and reinitializes the mirroring at the present state. This involves generating a new initial snapshot of the tables configured for mirroring, and replicating that to Microsoft Fabric. After the snapshot, incremental changes are replicated. 

During reseed, the mirrored database item in Microsoft Fabric is available but will not receive incremental changes until the reseed is completed. The `reseed_state` column in `sys.sp_help_change_feed_settings` indicates the reseed state.

The autoreseed feature is disabled by default in SQL Server 2025, to enable see [Enable autoreseed](#enable-autoreseed). The autoreseed feature is enabled and cannot be managed or disabled in Azure SQL Database and Azure SQL Managed Instance.

In Fabric Mirroring, the source SQL database transaction log is monitored. An autoreseed will only trigger when the following three conditions are true:

- The transaction log is more than `@autoreseedthreshold` percent full, for example, `70`. On SQL Server, configure this value when you enable the feature, with [sys.sp_change_feed_configure_parameters](/sql/relational-databases/system-stored-procedures/sp-change-feed-configure-parameters). 
- The log reuse reason is `REPLICATION`.
- Because the `REPLICATION` log reuse wait can be raised for other features such as transactional replication or CDC, autoreseed only occurs when `sys.databases.is_data_lake_replication_enabled` = 1. This value is configured by Fabric Mirroring.

## Diagnose

To identify if Fabric mirroring is preventing log truncation for a mirrored database, check the `log_reuse_wait_desc` column in the `sys.databases` system catalog view to see if the reason is `REPLICATION`. For more information on the log reuse wait types, see [Factors that delay transaction log truncation](/sql/relational-databases/logs/the-transaction-log-sql-server#FactorsThatDelayTruncation). For example:

```sql
SELECT [name], log_reuse_wait_desc 
FROM sys.databases 
WHERE is_data_lake_replication_enabled = 1;
```

If the query shows `REPLICATION` log reuse wait type, then due to Fabric mirroring the transaction log cannot empty out committed transactions and will continue to fill.

Use the following T-SQL script to check total log space, and current log usage and available space:

```sql

USE <Mirrored database name>
GO 
--initialize variables
DECLARE @total_log_size bigint = 0; 
DECLARE @used_log_size bigint = 0;
DECLARE @size int;
DECLARE @max_size int;
DECLARE @growth int;

--retrieve total log space based on number of log files and growth settings for the database
DECLARE sdf CURSOR
FOR
SELECT SIZE*1.0*8192/1024/1024 AS [size in MB],
            max_size*1.0*8192/1024/1024 AS [max size in MB],
            growth
FROM sys.database_files
WHERE TYPE = 1 
OPEN sdf 
FETCH NEXT FROM sdf INTO @size,
                @max_size,
                @growth 
WHILE @@FETCH_STATUS = 0 
BEGIN
SELECT @total_log_size = @total_log_size + 
CASE @growth
        WHEN 0 THEN @size
        ELSE @max_size
END 
FETCH NEXT FROM sdf INTO @size,
              @max_size,
              @growth 
END 
CLOSE sdf;
DEALLOCATE sdf;

--current log space usage
SELECT @used_log_size = used_log_space_in_bytes*1.0/1024/1024
FROM sys.dm_db_log_space_usage;

-- log space used in percent
SELECT @used_log_size AS [used log space in MB],
       @total_log_size AS [total log space in MB],
       @used_log_size/@total_log_size AS [used log space in percentage];
```

## Enable autoreseed

If the log usage returned by the previous T-SQL script is close to being full (for example, greater than 70%), consider enabling the mirrored database for automatic reseeding using the `sys.sp_change_feed_configure_parameters` system stored procedure. For example, to enable the autoreseed behavior: 

```sql
USE <Mirrored database name>
GO
EXECUTE sys.sp_change_feed_configure_parameters 
  @autoreseed = 1
, @autoreseedthreshold = 70; 
```

For more information, see [sys.sp_change_feed_configure_parameters](/sql/relational-databases/system-stored-procedures/sp-change-feed-configure-parameters?view=sql-server-ver17&preserve-view=true).

In the source database, the reseed should release the transaction log space held up by mirroring. Issue a manual `CHECKPOINT` on the source SQL Server database to force the release of log space if the holdup reason is still `REPLICATION` due to mirroring. For more information, see [CHECKPOINT (Transact-SQL)](/sql/t-sql/language-elements/checkpoint-transact-sql?view=sql-server-ver17&preserve-view=true).

## Manual reseed

As a best practice, you can test manual reseed for a specific database using the following stored procedure to understand the impact before turning on the automatic reseed functionality.

```sql
USE <Mirrored database name>
GO
EXECUTE sp_change_feed_reseed_db_init @is_init_needed = 1;
```

For more information, see [sys.sp_change_feed_reseed_db_init](/sql/relational-databases/system-stored-procedures/sp-change-feed-reseed-db-init?view=sql-server-ver17&preserve-view=true).

## Check if a reseed has been triggered

- The `reseed_state` column in the system stored procedure `sys.sp_help_change_feed_settings` on the source SQL database indicates its current reseed state. 

   - `0` = Normal.
   - `1` = The database has started the process of reinitializing to Fabric. Transitionary state.
   - `2` = The database is being reinitialized to Fabric and waiting for replication to restart. Transitionary state. When replication is established, reseed state moves to `0`.
    
   For more information, see [sys.sp_help_change_feed_settings](/sql/relational-databases/system-stored-procedures/sp-help-change-feed-settings?view=azuresqldb-current&preserve-view=true).
    
- All tables enabled for mirroring in the database will have a value of `7` for the `state` column in `sys.sp_help_change_feed_table`.

   For more information, see [sys.sp_help_change_feed_table](/sql/relational-databases/system-stored-procedures/sp-help-change-feed-table?view=azuresqldb-current&preserve-view=true).

## Related content

- [Troubleshoot Fabric mirrored databases from SQL Server](sql-server-troubleshoot.md)
- [Optimize performance for mirrored databases from SQL Server](sql-server-performance.md)
