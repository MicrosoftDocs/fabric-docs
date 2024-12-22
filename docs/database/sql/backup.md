---
title: "Automatic backups in SQL database"
description: Learn about automatic backups for SQL database in Microsoft Fabric.
author: WilliamDAssafMSFT
ms.author: wiassaf
ms.reviewer: strrodic
ms.date: 12/18/2024
ms.topic: how-to
ms.custom:
  - ignite-2024
---
# Automatic backups in SQL database in Microsoft Fabric

**Applies to:** [!INCLUDE [fabric-sqldb](../includes/applies-to-version/fabric-sqldb.md)]

This article describes the automated backups feature for SQL database in Microsoft Fabric. To restore a backup, see [Restore from a backup in SQL database in Microsoft Fabric](restore.md).

## What is a database backup?

Database backups are an essential part of any business continuity and disaster recovery strategy, because they help protect your data from corruption or deletion.  

All new and restored SQL databases in Fabric retain sufficient backups to allow a point-in-time restore (PITR) within the last seven days by default. The service takes regular full, differential, and log backups to ensure that databases are restorable to any point in time within the retention period for the database.

If you delete a database, the system keeps backups in the same way for an online database, until the retention period of seven days expires.  

## How frequently are backups taken on a SQL database in Fabric?

SQL database in Fabric has automatic backups capability enabled from the moment of database creation:

- Full backups every week
- Differential backups every 12 hours
- Transaction log backups approximately every 10 minutes

The exact frequency of transaction log backups is based on the compute size and the amount of database activity. When you restore a database, the service automatically determines which full, differential, and transaction log backups need to be restored.

The first full backup is scheduled immediately after a new database is created or restored. This backup usually finishes within 30 minutes, but it can take longer when the database is large. 

After the first full backup, all further backups are scheduled and managed automatically. The exact timing of all database backups is determined by the SQL database service as it balances the overall system workload. You can't change the schedule of backup jobs, or disable them.

For a new, restored, or copied database, point-in-time restore capability becomes available when the initial transaction log backup is created, which follow the initial full backup.

## Where are my SQL database backups stored?

All backups in SQL database in Fabric are stored on zone-redundant storage (ZRS) Azure storage accounts. With ZRS, backups are copied synchronously across three Azure availability zones in the primary region.

ZRS is currently available in only certain regions. When ZRS-based Azure storage is not available, backups are being stored on locally redundant storage (LRS). With LRS, backups are copied synchronously three times within a single physical location in the primary region.  

### Backup storage retention

SQL database in Microsoft Fabric schedules one full backup every week. To provide PITR within the entire retention period, the system must store additional full, differential, and transaction log backups for up to a week longer than the configured retention period.

Backups that are no longer needed to provide PITR functionality are automatically deleted. Because differential backups and log backups require an earlier full backup to be restorable, all three backup types are purged together in weekly sets.

For all databases, full and differential backups are compressed to reduce backup storage compression. Average backup compression ratio is 3 to 4 times.

## Backup history

You can view the list of backups using simple T-SQL command through a Dynamic Management View (DMV) called `sys.dm_database_backups`, which operates similarly to Azure SQL Database. This DMV contains metadata information on all the present backups that are needed for enabling point-in-time restore.

To query backup history catalog, simply run [T-SQL script through Fabric portal](query-editor.md) (or other client tool of your choice):

```sql
SELECT *
FROM sys.dm_database_backups
WHERE in_retention = 1
ORDER BY backup_finish_date DESC;
```

## Frequently asked questions about backups for SQL database in Fabric

#### Can I access my backups?

No, backups are isolated from Microsoft Fabric platform and these are inaccessible by end-users. The only way for customer to interact with backup files is through point-in-time restore (PITR) capability.

#### Are my backups encrypted?

All files stored on Azure storage, including backups of SQL database in Microsoft Fabric, are automatically encrypted when the data is persisted to the cloud. For more information, see [Azure Storage encryption for data at rest](/azure/storage/common/storage-service-encryption).

## Limitations

Current limitations for backups for SQL database:

- You cannot control the frequency of backups in SQL database in Fabric.
- You can't change the backup retention period for a SQL database in Microsoft Fabric. Default retention period is seven days.
- You can only restore database backups from the live SQL databases.
- You can only restore database backups within the same workspace. Cross-workspace PITR is not supported.
- If you delete a workspace, all databases on that workspace are also deleted and can't be recovered.
- All backups are stored in a single region replicated across different Azure availability zones. There are no geo-replicated backups.
- Only short-term retention backups are supported. No long-term retention backups support.
- Backups can be restored only through Fabric portal. Currently, there's no REST API, Azure PowerShell, or Command Line Interface (CLI) commands enabled.

## Related content

- [Restore from a backup in SQL database in Microsoft Fabric](restore.md)
- [Microsoft Fabric Capacity Metrics app](../../enterprise/metrics-app.md)
