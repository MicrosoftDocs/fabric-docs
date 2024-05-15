---
title: Restore in-place of a warehouse from a restore point
description: Learn about how to perform a restore in-place of a warehouse in Microsoft Fabric.
author: WilliamDAssafMSFT
ms.author: wiassaf
ms.reviewer: ajagadish
ms.date: 05/03/2024
ms.service: fabric
ms.subservice: data-warehouse
ms.topic: conceptual
ms.search.form: Warehouse Restore # This article's title should not change. If so, contact engineering.
---
# Restore in-place of a warehouse in Microsoft Fabric

**Applies to:** [!INCLUDE [fabric-dw](includes/applies-to-version/fabric-dw.md)]

[!INCLUDE [product-name](../includes/product-name.md)] offers the capability to restore a warehouse to a prior point-in-time, from a restore point.

- Restore in-place can be used to restore the warehouse to a known good state in the event of accidental corruption, minimizing downtime and data loss.
- Restore in-place can be helpful to reset the warehouse to a known good state for development and testing purposes.
- Restore in-place helps to quickly roll back the changes to prior state, due failed database release or migration.

Restore in-place is an essential part of data recovery that allows restoration of the warehouse to a prior known good state. A restore overwrites the existing warehouse, using restore points from the existing warehouse.

> [!NOTE]
> The restore points and restore in place features are currently in preview.

## What are restore points?

Restore points are recovery points of the warehouse created by copying only the metadata, while referencing the data files in OneLake. The metadata is copied while the underlying data of the warehouse stored as parquet files aren't copied. These restore points can be used to recover the warehouse as of prior point in time.

### System-generated restore points

The creation of the system-generated restore points is a built-in feature in [!INCLUDE [fabric-dw](includes/fabric-dw.md)]. However, the warehouse should be in an **Active** state for automatic system-generated restore point creation.

System-generated restore points are created throughout the day, and are available for seven days. From the moment the warehouse is created, the system-generated restore points are created automatically every eight hours. There can be up to 42 system-generated restore points at any given point in time.

[!INCLUDE [fabric-dw](includes/fabric-dw.md)] supports an eight-hour recovery point objective (RPO).

<!-- To see when the last restore point started, execute the following query on your warehouse via the [Fabric portal SQL query editor](sql-query-editor.md). Refer to the top (most recent) row. -->

If the warehouse is paused, system-generated restore points can't be created unless and until the warehouse is resumed. You should create a [user-defined restore point](#user-defined-restore-points) before pausing the warehouse. Before a warehouse is dropped, a system-generated restore point isn't automatically created.

System-generated restore points can't be deleted, as the restore points are used to maintain service level agreements (SLAs) for recovery.

### User-defined restore points

[!INCLUDE [fabric-dw](includes/fabric-dw.md)] enables the workspace administrators to manually create restore points before and after large modifications made to the warehouse. This ensures that the restore points are logically consistent, providing data protection and quick recovery time in case of any workload interruptions or user errors.

Any number of user-defined restore points aligned with your specific business or organizational recovery strategy can be created. User-defined restore points are available for seven calendar days and are automatically deleted on your behalf after the expiry of the retention period.

Currently, you can trigger the user-defined restore point creation through any of publicly available REST API tools. <!-- For an example, see the tutorial [Create user-defined restore points](tutorial-restore-in-place-warehouse.md#create-user-defined-restore-points). --> For an example, you can [use the non-Microsoft POSTMAN tool with steps detailed in this Fabric blog](https://blog.fabric.microsoft.com/blog/the-art-of-data-warehouse-recovery-within-microsoft-fabric/).

### Restore point retention

Details for restore point retention periods:

- [!INCLUDE [fabric-dw](includes/fabric-dw.md)] deletes both the system-generated and user-defined restore point at the expiry of the seven calendar day retention period.
- The age of a restore point is measured by the absolute calendar days from the time the restore point is taken, including when the [!INCLUDE [product-name](../includes/product-name.md)] capacity is paused.
- System-generated and user-generated restore points can't be created when the [!INCLUDE [product-name](../includes/product-name.md)] capacity is paused. The creation of a restore point fails when the fabric capacity gets paused while the restore point creation is in progress.
- If a restore point is generated and then the capacity remains paused for more than seven days before being resumed, the restore point remains in existence until a total of 42 system-generated restore points are reached.
- At any point in time, [!INCLUDE [fabric-dw](includes/fabric-dw.md)] is guaranteed to be able to store up to 42 system-generated restore points as long as these restore points haven't reached the seven day retention period.
- All the user-defined restore points that are created for the warehouse is guaranteed to be stored until the default retention period of seven calendar days.
- System- and user-generated restore points reside within OneLake, and aren't visible to the users. It can be listed through the publicly available REST API tools.

## Recovery point and restore costs

### Storage billing

The creation of both system-generated and user-defined restore points consume storage. The storage cost of restore points in OneLake includes the data files stored in parquet format. There are no storage charges incurred during the process of restore.

### Compute billing

Compute charges are incurred during the creation and restore of restore points, and consume the [!INCLUDE [product-name](../includes/product-name.md)] capacity.

## Restore in-place of a warehouse

When you restore, the current warehouse is *replaced* with the restored warehouse. The name of the warehouse remains the same, and the old warehouse is overwritten. All components, including objects in the **Explorer**, modeling, Query Insights, and semantic models are restored as they existed when the restore point was created.

Each restore point references a UTC timestamp when the restore point was created.

To restore a warehouse in-place, choose a restore point and issue a restore command. If you encounter Error 5064 after requesting a restore, resubmit the restore again. For an example, you can [use the non-Microsoft POSTMAN tool with steps detailed in this Fabric blog](https://blog.fabric.microsoft.com/blog/the-art-of-data-warehouse-recovery-within-microsoft-fabric/). 

### Security

- Any member of the Admin, Member, or Contributor [workspace roles](workspace-roles.md) can create, delete, or rename the user-defined restore points.
- Only a member of the Admin [workspace role](workspace-roles.md) can perform a restore from a system-generated or user-defined restore point.

## Limitations

- A recovery point can't be restored to create a new warehouse with a different name, either within or across the [!INCLUDE [product-name](../includes/product-name.md)] workspaces.
- Restore points can't be retained beyond the default seven day retention period. This retention period isn't currently configurable.
- The ability to perform restore in-place either through UX or through T-SQL is currently not supported, currently only supported via API call. <!-- For an example, see [Tutorial: Restore a Warehouse using REST API in Microsoft Fabric](tutorial-restore-in-place-warehouse.md). --> For an example, you can [use the non-Microsoft POSTMAN tool with steps detailed in this Fabric blog](https://blog.fabric.microsoft.com/blog/the-art-of-data-warehouse-recovery-within-microsoft-fabric/).
    - Currently, only the publicly available REST APIs provide the following functionalities of a restore in-place.
        - Creation of user-defined restore points
        - List of the system-generated and user-defined restore points
        - Deletion of user-defined restore points
        - Perform restore in-place of the warehouse

## Related content

- [Clone table in Microsoft Fabric](clone-table.md)
- [Microsoft Fabric disaster recovery guide](../security/disaster-recovery-guide.md)
