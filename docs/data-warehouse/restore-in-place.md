---
title: Restore In-Place of a Warehouse from a Restore Point
description: Learn about how to perform a restore in-place of a warehouse in Microsoft Fabric.
ms.reviewer: ajagadish, sosivara
ms.date: 04/30/2026
ms.topic: concept-article
ms.search.form: Warehouse Restore # This article's title should not change. If so, contact engineering.
---
# Restore in-place of a warehouse in Microsoft Fabric

**Applies to:** [!INCLUDE [fabric-dw](includes/applies-to-version/fabric-dw.md)]

[!INCLUDE [product-name](../includes/product-name.md)] provides the capability to restore a warehouse to a prior point in time from a restore point. Learn more about restore points and restore in-place operations in this article.

A restore in-place operation overwrites the existing warehouse by using restore points from the existing warehouse.

- Restore in-place operation restores the warehouse to a known good state in the event of accidental corruption, minimizing downtime and data loss.
- Restore in-place can reset the warehouse to a known good state for development and testing purposes.
- Restore in-place helps quickly roll back the changes to a prior state due to a failed database release or migration.

You can also query data in a warehouse as it appeared in the past by using the T-SQL `OPTION` syntax. For more information, see [Query data as it existed in the past](time-travel.md).

## What are restore points?

Restore points are recovery points of the warehouse created by copying only the metadata while referencing the data files in OneLake. The restore process copies the metadata but doesn't copy the underlying data of the warehouse stored as parquet files.

[Fabric automatically creates warehouse restore points](#system-created-restore-points), and you can create [user-defined restore points](#user-defined-restore-points). To view all restore points for your warehouse, in the Fabric portal go to **Settings** > **Restore points**.

### System-created restore points

Fabric automatically creates system-created restore points. However, the warehouse must be in an **Active** state for Fabric to create system-created restore points automatically.  

The system-created restore points are created automatically every eight hours when the warehouse is active and the capacity is not paused. [!INCLUDE [fabric-dw](includes/fabric-dw.md)] supports an eight-hour recovery point objective (RPO). 

A system-created restore point might not be available immediately for a new warehouse. If one isn't available, [create a user-defined restore point](restore-in-place-portal.md).

If you pause the warehouse, the system can't create restore points until you resume the warehouse. You should create a [user-defined restore point](#user-defined-restore-points) before pausing the warehouse. Before you drop a warehouse, the system doesn't automatically create a restore point.

System-created restore points can't be deleted, as the restore points are used to maintain service level agreements (SLAs) for recovery.

### User-defined restore points

[!INCLUDE [fabric-dw](includes/fabric-dw.md)] enables workspace administrators to manually create restore points before and after large modifications made to the warehouse. This process ensures that the restore points are logically consistent, providing data protection and quick recovery time in case of any workload interruptions or user errors.

You can create any number of user-defined restore points aligned with your recovery strategy. User-defined restore points are available for the configured retention period and are automatically deleted after the expiry of the retention period.

For more information about creating and managing restore points, see [Restore in-place in the Fabric portal](restore-in-place-portal.md).

### Restore point retention

Details for restore point retention periods:

Fabric maintains a minimum number of warehouse restore points to ensure that sufficient restore points are always available.

- Fabric deletes both system-created and user-defined warehouse restore points at the expiry of the [configured retention period](data-retention.md). The default retention period is 30 calendar days, and by default Fabric retains a minimum of 20 system-created or user-defined restore points.
- The age of a restore point is measured by the absolute calendar days from the time the restore point is taken, including when the [!INCLUDE [product-name](../includes/product-name.md)] capacity is paused.
- You can't create system-created and user-generated restore points when the [!INCLUDE [product-name](../includes/product-name.md)] capacity is paused. The creation of a restore point fails when the Fabric capacity gets paused while the restore point creation is in progress.
- If you generate a restore point and then pause the capacity for more than the configured retention period before resuming it, the restore point remains.

#### Configurable retention

The restore point retention period defaults to 30 days and is configurable. For more information, see [Data retention in Fabric Data Warehouse](data-retention.md).

- With the default retention period of 30 days, the warehouse guarantees a minimum of 20 restore points, even if some system-created restore points fall outside the configured retention period. You can configure the data retention period to be 1 to 120 days.
- Fabric stores all the user-defined restore points that you create until the configured retention period.

#### Minimum restore point retention

If your warehouse is inactive or capacity is paused, restore points are not actively generated. However, Fabric Data Warehouse still guarantees a minimum of 20 restore points — even if all of them fall outside the configured retention window. Even after months of inactivity, you always have at least 20 restore points available to recover from.

The minimum number of restore points is 20 for the default retention period of 30 days, or for custom retention periods longer than 30 days. The minimum number of restore points is lower than 20 for customer retention periods under 30. For example:

| Retention (Days) | Minimum restore points |
|:--|:--|
| **1** | 1 |
| **7** | 5 |
| **20** | 14 |
| **30+** | 20 |

### Restore point cleanup

When the minimum restore point threshold is met, the garbage collection process automatically removes restore points that fall outside the retention period. 

The minimum restore point guarantee ensures recoverability even when workload patterns prevent the system from generating new restore points at regular intervals.

## Recovery point and restore costs

### Storage billing

Both system-generated and user-defined restore points consume storage. The storage cost of restore points in OneLake includes the metadata files. The restore process doesn't incur any storage charges.

### Compute billing

Compute charges occur during the creation and restoration of restore points, and they consume the [!INCLUDE [product-name](../includes/product-name.md)] capacity.

## Restore in-place of a warehouse

Use [the Fabric portal to restore a warehouse in-place](restore-in-place-portal.md).

When you restore, you *replace* the current warehouse with the restored warehouse. The warehouse name stays the same, and the old warehouse is overwritten. All components, including objects in the **Explorer**, modeling, Query Insights, and semantic models are restored exactly as they were when the restore point was created.

Each restore point references a UTC timestamp when the restore point was created.

If you encounter Error 5064 after requesting a restore, resubmit the restore again.

### Security

- Any member of the Admin, Member, or Contributor [workspace roles](workspace-roles.md) can create, delete, or rename the user-defined restore points.

- Any user that has the [workspace roles](workspace-roles.md) of a Workspace Administrator, Member, Contributor, or Viewer can see the list of system-created and user-defined restore points.

- Members of the Workspace Administrator [workspace role](workspace-roles.md) can restore a warehouse from a system-created or user-defined restore point.

## Limitations

- You can't restore a recovery point to create a new warehouse with a different name, either within or across the [!INCLUDE [product-name](../includes/product-name.md)] workspaces.
- You can't retain restore points beyond the configured retention period. For more information, see [Configurable data retention](data-retention.md).

## Next step

> [!div class="nextstepaction"]
> [Restore in-place in the Fabric portal](restore-in-place-portal.md)

## Related content

- [Restore in-place in the Fabric portal](restore-in-place-portal.md)
- [Clone table in Microsoft Fabric](clone-table.md)
- [Query data as it existed in the past](time-travel.md)
- [Configurable data retention](data-retention.md)
- [Microsoft Fabric disaster recovery guide](../security/disaster-recovery-guide.md)
