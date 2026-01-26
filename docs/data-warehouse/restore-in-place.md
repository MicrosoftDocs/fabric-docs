---
title: Restore In-Place of a Warehouse from a Restore Point
description: Learn about how to perform a restore in-place of a warehouse in Microsoft Fabric.
author: WilliamDAssafMSFT
ms.author: wiassaf
ms.reviewer: ajagadish, sosivara
ms.date: 04/06/2025
ms.topic: concept-article
ms.search.form: Warehouse Restore # This article's title should not change. If so, contact engineering.
---
# Restore in-place of a warehouse in Microsoft Fabric

**Applies to:** [!INCLUDE [fabric-dw](includes/applies-to-version/fabric-dw.md)]

[!INCLUDE [product-name](../includes/product-name.md)] offers the capability to restore a warehouse to a prior point-in-time, from a restore point.

- Restore in-place can be used to restore the warehouse to a known good state in the event of accidental corruption, minimizing downtime and data loss.
- Restore in-place can be helpful to reset the warehouse to a known good state for development and testing purposes.
- Restore in-place helps to quickly roll back the changes to prior state, due failed database release or migration.

Restore in-place is an essential part of data recovery that allows restoration of the warehouse to a prior known good state. A restore overwrites the existing warehouse, using restore points from the existing warehouse.

You can also query data in a warehouse as it appeared in the past, using the T-SQL `OPTION` syntax. For more information, see [Query data as it existed in the past](time-travel.md).

## What are restore points?

Restore points are recovery points of the warehouse created by copying only the metadata, while referencing the data files in OneLake. The metadata is copied while the underlying data of the warehouse stored as parquet files aren't copied. These restore points can be used to recover the warehouse as of prior point in time.

To view all restore points for your warehouse, in the Fabric portal go to **Settings** -> **Restore points**.

### System-created restore points

The creation of the system-created restore points is a built-in feature in [!INCLUDE [fabric-dw](includes/fabric-dw.md)]. However, the warehouse should be in an **Active** state for automatic system-created restore point creation.

System-generated restore points are created throughout the day, and are available for thirty days. System-generated restore points are created automatically every eight hours. A system-created restore point might not be available immediately for a new warehouse. If one is not yet available, [create a user-defined restore point](restore-in-place-portal.md).

There can be up to 180 system-generated restore points at any given point in time.

[!INCLUDE [fabric-dw](includes/fabric-dw.md)] supports an eight-hour recovery point objective (RPO).

If the warehouse is paused, system-created restore points can't be created unless and until the warehouse is resumed. You should create a [user-defined restore point](#user-defined-restore-points) before pausing the warehouse. Before a warehouse is dropped, a system-created restore point isn't automatically created.

System-created restore points can't be deleted, as the restore points are used to maintain service level agreements (SLAs) for recovery.

### User-defined restore points

[!INCLUDE [fabric-dw](includes/fabric-dw.md)] enables the workspace administrators to manually create restore points before and after large modifications made to the warehouse. This ensures that the restore points are logically consistent, providing data protection and quick recovery time in case of any workload interruptions or user errors.

Any number of user-defined restore points aligned with your specific business or organizational recovery strategy can be created. User-defined restore points are available for thirty calendar days and are automatically deleted on your behalf after the expiry of the retention period.

For more information about creating and managing restore points, see [Restore in-place in the Fabric portal](restore-in-place-portal.md).

### Restore point retention

Details for restore point retention periods:

- [!INCLUDE [fabric-dw](includes/fabric-dw.md)] deletes both the system-created and user-defined restore point at the expiry of the 30 calendar day retention period.
- The age of a restore point is measured by the absolute calendar days from the time the restore point is taken, including when the [!INCLUDE [product-name](../includes/product-name.md)] capacity is paused.
- System-created and user-generated restore points can't be created when the [!INCLUDE [product-name](../includes/product-name.md)] capacity is paused. The creation of a restore point fails when the fabric capacity gets paused while the restore point creation is in progress.
- If a restore point is generated and then the capacity remains paused for more than 30 days before being resumed, the restore point remains in existence until a total of 180 system-created restore points are reached.
- At any point in time, [!INCLUDE [fabric-dw](includes/fabric-dw.md)] is guaranteed to be able to store up to 180 system-generated restore points as long as these restore points haven't reached the thirty day retention period.
- All the user-defined restore points that are created for the warehouse are guaranteed to be stored until the default retention period of 30 calendar days.

## Recovery point and restore costs

### Storage billing

The creation of both system-created and user-defined restore points consume storage. The storage cost of restore points in OneLake includes the data files stored in parquet format. There are no storage charges incurred during the process of restore.

### Compute billing

Compute charges are incurred during the creation and restore of restore points, and consume the [!INCLUDE [product-name](../includes/product-name.md)] capacity.

## Restore in-place of a warehouse

Use [the Fabric portal to restore a warehouse in-place](restore-in-place-portal.md).

When you restore, the current warehouse is *replaced* with the restored warehouse. The name of the warehouse remains the same, and the old warehouse is overwritten. All components, including objects in the **Explorer**, modeling, Query Insights, and semantic models are restored as they existed when the restore point was created.

Each restore point references a UTC timestamp when the restore point was created.

If you encounter Error 5064 after requesting a restore, resubmit the restore again.

### Security

- Any member of the Admin, Member, or Contributor [workspace roles](workspace-roles.md) can create, delete, or rename the user-defined restore points.

- Any user that has the [workspace roles](workspace-roles.md) of a Workspace Administrator, Member, Contributor, or Viewer can see the list of system-created and user-defined restore points.

- A data warehouse can be restored only by user that has [workspace roles](workspace-roles.md) of a Workspace Administrator, from a system-created or user-defined restore point.

## Limitations

- A recovery point can't be restored to create a new warehouse with a different name, either within or across the [!INCLUDE [product-name](../includes/product-name.md)] workspaces.
- Restore points can't be retained beyond the default thirty calendar day retention period. This retention period isn't currently configurable.

## Next step

> [!div class="nextstepaction"]
> [Restore in-place in the Fabric portal](restore-in-place-portal.md)

## Related content

- [Restore in-place in the Fabric portal](restore-in-place-portal.md)
- [Clone table in Microsoft Fabric](clone-table.md)
- [Query data as it existed in the past](time-travel.md)
- [Microsoft Fabric disaster recovery guide](../security/disaster-recovery-guide.md)
