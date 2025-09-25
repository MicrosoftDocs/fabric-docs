---
title: "Automatic backups in SQL database"
description: Learn about automatic backups for SQL database in Microsoft Fabric.
author: WilliamDAssafMSFT
ms.author: wiassaf
ms.reviewer: strrodic, dnethi
ms.date: 09/25/2025
ms.topic: concept-article
ms.search.form: Backup and Restore
---
# Automatic backups in SQL database in Microsoft Fabric

**Applies to:** [!INCLUDE [fabric-sqldb](../includes/applies-to-version/fabric-sqldb.md)]

Backups are an automatic feature for SQL database in Microsoft Fabric. 

To restore a backup, see [Restore from a backup in SQL database in Microsoft Fabric](restore.md).

## What is a database backup?

Database backups are an essential part of any business continuity and disaster recovery strategy, because they help protect your data from accident, corruption, or deletion.  

All new and restored SQL databases in Fabric retain sufficient backups to allow a point-in-time restore (PITR) within the last seven days by default. The service takes regular full, differential, and transaction log backups to ensure that databases are restorable to any point in time within the retention period.

If you delete a database, the system keeps backups in the same way for an online database, until the retention period expires.  

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

ZRS is currently available in only certain regions. When ZRS-based Azure storage isn't available, backups are being stored on locally redundant storage (LRS). With LRS, backups are copied synchronously three times within a single physical location in the primary region.  

### Backup storage retention

The default retention period for the backups in a backup chain is 7 days, but this can be extended up to 35 days (as a preview feature).

SQL database in Microsoft Fabric schedules one full backup every week. To provide PITR within the entire retention period, the system stores a complete set of full, differential, and transaction log backups for up to a week longer than the configured retention period.

Backups that are no longer needed to provide PITR functionality are automatically deleted. Because differential backups and log backups require an earlier full backup to be restorable, all three backup types are purged together in weekly sets.

For all databases, full and differential backups are compressed to reduce backup storage compression. Average backup compression ratio is 3 to 4 times.

A longer retention duration of SQL database backups increases the storage used for backups in your Fabric capacity. 

#### Change backup storage retention policy

> [!NOTE]
> The ability to change the retention period from the default of 7 days is currently a preview feature.

To change the backup storage retention from the default 7 days to up to 35 days:

1. In the Fabric portal, navigate to the **Settings** of your database.
1. Select **Backup retention policy**.
1. Under **Retention period**, provide the desired retention policy, from 1 to 35 days.
1. Select **Save**.

   :::image type="content" source="media/backup/retention-policy.png" alt-text="Screenshot from the Fabric portal showing how to change the backup retention policy in database Settings.":::

## Backup history

You can view the list of backups using simple T-SQL command through the dynamic management view (DMV) [sys.dm_database_backups](/sql/relational-databases/system-dynamic-management-views/sys-dm-database-backups-azure-sql-database?view=fabric&preserve-view=true), which operates similarly to Azure SQL Database. This DMV contains metadata information on all the present backups that are needed for enabling point-in-time restore. The `backup_type` column indicates the type of backup: Full (D) or Differential (I) or Transaction log (L).

To query backup history catalog, [run this T-SQL query in the Fabric portal](query-editor.md) or query tool of your choice:

```sql
SELECT *
FROM sys.dm_database_backups
WHERE in_retention = 1
ORDER BY backup_finish_date DESC;
```

For example, 

:::image type="content" source="media/backup/sys-dm-database-backups.png" alt-text="Screenshot of the query results of sys.dm_database_backups." lightbox="media/backup/sys-dm-database-backups.png":::

## Frequently asked questions about backups for SQL database in Fabric

#### Can I access my backups?

No, backups are isolated from Microsoft Fabric platform and these are inaccessible by end-users. The only way for customer to interact with backup files is through [point-in-time restore (PITR) capability](restore.md).

#### Are my backups encrypted?

All files stored on Azure storage, including backups of SQL database in Microsoft Fabric, are automatically encrypted when the data is persisted to the cloud. For more information, see [Azure Storage encryption for data at rest](/azure/storage/common/storage-service-encryption).

## Limitations

Current limitations for backups for SQL database:

- You cannot control the frequency of backups in SQL database in Fabric.
- You can only restore database backups from the live SQL databases.
- You can only restore database backups within the same workspace. Cross-workspace PITR is not supported.
- If you delete a workspace, all databases on that workspace are also deleted and can't be recovered.
- All backups are stored in a single region replicated across different Azure availability zones. There are no geo-replicated backups.
- Only short-term retention backups are supported. No long-term retention backups support.
- Backups can be restored only through Fabric portal. Currently, there's no REST API, Azure PowerShell, or Command Line Interface (CLI) commands enabled.

## Related content

- [Restore from a backup in SQL database in Microsoft Fabric](restore.md)
- [Microsoft Fabric Capacity Metrics app](../../enterprise/metrics-app.md)
