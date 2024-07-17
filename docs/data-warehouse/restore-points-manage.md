---
title: Manage restore points for a warehouse with the Fabric portal
description: Learn about how to manage a restore points of a warehouse in the Fabric portal.
author: WilliamDAssafMSFT
ms.author: wiassaf
ms.reviewer: sosivara
ms.date: 07/17/2024
ms.service: fabric
ms.subservice: data-warehouse
ms.topic: how-to
ms.search.form: Warehouse Restore # This article's title should not change. If so, contact engineering.
---
# Manage restore points in the Fabric portal

**Applies to:** [!INCLUDE [fabric-dw](includes/applies-to-version/fabric-dw.md)]

Restore points enable the [Restore in-place](restore-in-place.md) feature of a warehouse, which can be used to restore to a prior known good state. This tutorial covers how to create, rename, manage, and view restore points for a warehouse.

For a tutorial to restore a warehouse to a previous restore point, see [Restore in-place in the Fabric portal](restore-in-place-portal.md).

## Prerequisites

- Review the [workspace roles](workspace-roles.md) membership required for the following steps. For more information, see [Restore in place Security](restore-in-place.md#security).

## Create user-defined restore point

From the moment a warehouse is created and used, [Fabric automatically creates system-created restore points](restore-in-place.md#system-created-restore-points) at least every eight hours. Workspace administrators, members, and contributors can also manually create restore points, for example, before and after large modifications made to the warehouse.

1. Go to Warehouse **Settings** -> **Restore points**.
1. Select **Add a restore point**.

    :::image type="content" source="media/restore-points-manage/add-setting.png" alt-text="Screenshot from the Fabric portal of the setting to add a restore point." lightbox="media/restore-points-manage/add-setting.png":::

1. Provide a **Name** and **Description**.

    :::image type="content" source="media/restore-points-manage/create-restore-point.png" alt-text="Screenshot from the Fabric portal of the setting to create a user-defined restore point.":::

1. A notification appears on successful creation of restore point.

    :::image type="content" source="media/restore-points-manage/create-notification.png" alt-text="Screenshot from the Fabric portal of a Success notification for restore point creation.":::

### Rename restore point

1. To rename a user-defined or system-created restore point, go to context menu action of the restore point, select **Rename**.

    :::image type="content" source="media/restore-points-manage/rename-setting.png" alt-text="Screenshot from the Fabric portal of the setting to rename a restore point.":::
1. Provide a new name and select **Rename**.
1. A notification appears on a successful rename.

### Delete user-defined restore point

System-created restore points cannot be deleted. For more information, see [Restore point retention](restore-in-place.md#restore-point-retention).

1. To delete a user-defined restore point, either go to context menu action of the restore point, or select **Delete**.

    :::image type="content" source="media/restore-points-manage/delete-setting.png" alt-text="Screenshot from the Fabric portal of the setting to delete a restore point.":::
1. To confirm, select **Delete**.
1. A notification appears on successful deletion of restore point.

### View system-created and user-defined restore points

1. Go to Warehouse **Settings** -> **Restore points** to view all restore points.
1. A unique restore point is identified by **Time(UTC)** value. Sort this column to identify the latest restore points.
1. If your warehouse has been restored, select **Details** for more information. The **Details of last restoration** popup provides details on latest restoration, including who performed the restore, when it was performed, and which restore point was restored.
    - If the restore point is over 30 days old and was deleted, the details of the banner will show as N/A.

    :::image type="content" source="media/restore-points-manage/viewer.png" alt-text="Screenshot from the Fabric portal showing Restore points." lightbox="media/restore-points-manage/viewer.png":::

## Next step

> [!div class="nextstepaction"]
> [Restore in-place in the Fabric portal](restore-in-place-portal.md)

## Related content

- [Restore in-place of a warehouse in Microsoft Fabric](restore-in-place.md)
- [Microsoft Fabric terminology](../get-started/fabric-terminology.md)