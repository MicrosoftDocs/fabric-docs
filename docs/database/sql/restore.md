---
title: "Restore a database from a backup"
description: Learn how to restore a database from a backup to a point-in-time in SQL database in Microsoft Fabric
author: WilliamDAssafMSFT
ms.author: wiassaf
ms.reviewer: strrodic, dinethi
ms.date: 07/12/2025
ms.topic: how-to
ms.search.form: Backup and Restore
ms.custom: sfi-image-nochange
---
# Restore from a backup in SQL database in Microsoft Fabric

**Applies to:** [!INCLUDE [fabric-sqldb](../includes/applies-to-version/fabric-sqldb.md)]

This article provides steps to restore any database from a backup in SQL database in Microsoft Fabric.

[!INCLUDE [feature-preview-note](../../includes/feature-preview-note.md)]

## Point-in-time restore

[Automated database backups](backup.md) help protect your databases from user and application errors, accidental database deletion, and prolonged outages. This is a built-in capability that SQL database in Fabric provides to protect your data from unwanted modifications. Point-in-time restore (PITR) is a capability to recover database into a specific point in time within the retention period. With a database restore, you create a new SQL database in the same Workspace, from backups.

### Restore time

Several factors affect the time to restore a database through automated database backups:

- Database size
- Number of transaction logs involved
- Amount of activity that needs to be replayed to recover to the restore point
- Number of concurrent restore requests that are processed in the targeted region

For a large or very active database, the restore might take several hours. When there are many concurrent restore requests in the targeted region, the recovery time for individual databases can increase.

### Cost

In the current preview, there's no cost or consumption of CPU resources associated with restoring a database.

Initiating a point-in-time restore can bring the database from a paused state to online state and could incur consumption units.

### Permissions

To restore a database using a point-in-time restore capability, you must have one of the following roles on your Fabric Workspace:

- Admin
- Contributor
- Member

For more information, see [Microsoft Fabric roles](../../fundamentals/roles-workspaces.md).

### How to restore a SQL database in Microsoft Fabric

You can restore any database to an earlier point in time within its retention period. By performing this operation, you're actually creating a new SQL database in Fabric. When the restore is complete, Fabric creates a new database in the same workspace as the original database.

> [!NOTE]
> You can't overwrite an existing database with a restore.

The core use case of point-in-time restore is to recover from human accident by restoring a SQL database to an earlier point in time. You can treat the restored database as a replacement for the original database, or use it as a data source to update the original database.

1. In your workspace, right-click on the SQL database, or the `...` context menu. Select **Restore database**.

   :::image type="content" source="media/restore/restore-database.png" alt-text="Screenshot from the Fabric portal of the items in a workspace. The context menu for a database is expanded and the Restore database dialogue option is highlighted." lightbox="media/restore/restore-database.png":::

1. The **Restore database** popup opens. Provide a name of a new database that will be created from the backups of the source/original database. 
1. Choose a point-in-time. You can see the earliest restore point available, the latest restore point, or any point in time between. Times are listed in your local time zone, not in UTC. The time dropdown list is also editable – you can select time by your choice.

1. Select **Create**.
1. The database restore progress starts in the background. You'll also be able to see notifications about database restore being in progress in the notification center. When the restore operation is finished, you can open the new database.

   :::image type="content" source="media/restore/restore-database-notifications-progress.png" alt-text="Screenshot of the Notifications tab of the Fabric portal, showing database restore progress.":::

## View SQL database restore points in Microsoft Fabric

You can see earliest (oldest) and latest (newest) restore point in the properties that you can access through the database view of the Fabric portal. 

You can restore a database into any point in time between these two restore points showed.

1. Open your database in the Fabric portal. Select the Settings icon in the ribbon or right-click and select **Settings**.
1. Select **Restore Points**. Times are listed in your local time zone.

   :::image type="content" source="media/restore/restore-points.png" alt-text="Screenshot from the Fabric portal showing restore points for a SQL database.":::

## Limitations

Current limitations when restoring a SQL database in Microsoft Fabric:

- Retention of backups is seven days for a live database.
- Restoring backups from dropped databases isn't currently possible after the retention period of seven days.
- Cross-workspace restore isn't supported.
- Cross-region restore isn't supported.
- If you delete the database during the restore, the restore operation is canceled. You can't recover the data from deleted database.

## Related content

- [Automatic backups in SQL database in Microsoft Fabric](backup.md)
