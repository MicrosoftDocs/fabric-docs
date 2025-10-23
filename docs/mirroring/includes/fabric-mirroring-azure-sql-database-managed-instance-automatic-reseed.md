---
author: WilliamDAssafMSFT
ms.author: wiassaf
ms.date: 10/20/2025
ms.topic: include
# For docs\mirroring\azure-sql-database-automatic-reseed.md and docs\mirroring\azure-sql-managed-instance-automatic-reseed.md
---

Under certain conditions if there is a delay in mirroring to Fabric, increased transaction log file usage can result. The transaction log cannot be truncated until after committed changes are replicated to the mirrored database. Once the transaction log size reaches its maximum defined limit, writes to the database fail. To safeguard operational databases from write failures for critical OLTP transactions, you can set up an autoreseed mechanism that allows the transaction log to be truncated and reinitializes the database mirroring to Fabric.

The autoreseed feature is enabled and cannot be managed or disabled in Azure SQL Database and Azure SQL Managed Instance.

A reseed stops flow of transactions to Microsoft Fabric from the mirrored database and reinitializes the mirroring at the present state. A reseed involves generating a new initial snapshot of the tables configured for mirroring, and replicating that to Microsoft Fabric. After the snapshot, incremental changes are replicated. 

In Azure SQL Database and Azure SQL Managed Instance, reseed can occur at the database level or at the table level.

- **Database level reseed:** Ongoing mirroring of data is stopped for all tables in the database that are enabled for mirroring, the transaction log is truncated, and mirroring is reinitialized for the database by republishing the initial snapshot of all tables enabled for mirroring. Then, incremental changes resume continuously replicating.

- **Table level reseed:** Ongoing mirroring of data is stopped only for tables that require reseed. The mirroring is reinitialized for those impacted tables by republishing the initial snapshot. Then, incremental changes resume continuously replicating.

## Causes of database-level automatic reseed

A reseed at the database level protects database write availability by ensuring that transaction log does not grow to max size. The maximum transaction log size is based on the database Service Level Objective of the Azure SQL Database or Azure SQL Managed Instance. Transaction log usage for a database enabled for Fabric mirroring can continue to grow and hold up log truncation. Once the transaction log size reaches the max defined limit, writes to the database fail.  

- Prevented log truncation due to mirroring can happen for multiple reasons: 

    - Latency in mirroring data from the source to the mirrored database prevent transactions pending replication from being truncated from the transaction log.
    - Long running replicated transactions pending replication cannot be truncated, holding onto transaction log space. 
    - Persistent errors writing to the landing zone in OneLake prevent replication.
        - For example, due to lack of sufficient permissions. Mirroring to Fabric uses System Assigned Managed Identity to write to landing zone in One Lake. If this is not configured properly, replication of transactions can repeatedly fail. 
    
    To safeguard from this, mirroring triggers automatic reseed of the whole database when the log space used has passed a certain threshold of total configured log space. 
    
- If the Fabric capacity is paused and resumed, the mirrored database status remains **Paused**. As a result, changes made in the source aren't replicated to OneLake. To resume mirroring, go to the mirrored database in the Fabric portal, select **Resume replication**. Mirroring continues from where it was paused. 

   If the Fabric capacity remains paused for a long time, mirroring might not resume from its stopping point and will reseed data from the beginning. This is because pausing mirroring for a long time can cause the source database transaction log usage to grow and hold up log truncation. When mirroring is resumed, if the transaction log file space used is close to full, a reseed of the database will be initiated to release the held up log space.

## Causes of table-level automatic reseed

When schema changes occur on the source tables that are enabled for mirroring, the schema for those mirrored tables in Fabric no longer matches the source. This could happen due to following `ALTER TABLE` data definition language (DDL) T-SQL statements on the source: 

- Add/drop/alter/rename column
- Truncate/rename table
- Add nonclustered primary key

Reseed is only triggered for the impacted tables.

## Diagnose

To identify if Fabric mirroring is preventing log truncation for a mirrored database, check the `log_reuse_wait_desc` column in the `sys.databases` system catalog view to see if the reason is `REPLICATION`. For more information on the log reuse wait types, see [Factors that delay transaction log truncation](/sql/relational-databases/logs/the-transaction-log-sql-server#FactorsThatDelayTruncation). For example:

```sql
SELECT [name], log_reuse_wait_desc 
FROM sys.databases 
WHERE is_data_lake_replication_enabled = 1;
```

If the query shows `REPLICATION` log reuse wait type, then due to Fabric mirroring the transaction log cannot empty out committed transactions and will continue to fill. For additional troubleshooting of log usage in Azure SQL Database, see [Troubleshoot transaction log errors with Azure SQL Database](/azure/azure-sql/database/troubleshoot-transaction-log-errors-issues?view=azuresql-db&preserve-view=true).

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

## During reseed

During reseed, the mirrored database item in Microsoft Fabric is available but will not receive incremental changes until the reseed is completed. The `reseed_state` column in `sys.sp_help_change_feed_settings` indicates the reseed state.

In Fabric Mirroring, the source SQL database transaction log is monitored. An autoreseed will only trigger when the following three conditions are true:

- The transaction log is more than `@autoreseedthreshold` percent full, for example, `70`.
- The log reuse reason is `REPLICATION`.
- Because the `REPLICATION` log reuse wait can be raised for other features such as transactional replication or CDC, autoreseed only occurs when `sys.databases.is_data_lake_replication_enabled` = 1. This value is configured by Fabric Mirroring.

### Check if a database-level reseed has been triggered

If the entire database is being reseeded, look for the following conditions.

- The `reseed_state` column in the system stored procedure `sys.sp_help_change_feed_settings` on the source SQL database indicates its current reseed state. 

   - `0` = Normal.
   - `1` = The database has started the process of reinitializing to Fabric. Transitionary state.
   - `2` = The database is being reinitialized to Fabric and waiting for replication to restart. Transitionary state. When replication is established, reseed state moves to `0`.
    
   For more information, see [sys.sp_help_change_feed_settings](/sql/relational-databases/system-stored-procedures/sp-help-change-feed-settings?view=azuresqldb-current&preserve-view=true).
    
- All tables enabled for mirroring in the database will have a value of `7` for the `state` column in `sys.sp_help_change_feed_table`.

   For more information, see [sys.sp_help_change_feed_table](/sql/relational-databases/system-stored-procedures/sp-help-change-feed-table?view=azuresqldb-current&preserve-view=true).

### Check if a table-level reseed has been triggered

- For any table being reseeded, look for a value of `7` for the `state` column in `sys.sp_help_change_feed_table`.

   For more information, see [sys.sp_help_change_feed_table](/sql/relational-databases/system-stored-procedures/sp-help-change-feed-table?view=azuresqldb-current&preserve-view=true).