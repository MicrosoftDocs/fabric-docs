---
title: Restore In-Place of a Warehouse from a Restore Point with the Fabric Portal
description: Learn about how to perform a restore in-place of a warehouse in the Fabric portal.
author: WilliamDAssafMSFT
ms.author: wiassaf
ms.reviewer: sosivara
ms.date: 07/17/2024
ms.topic: how-to
ms.search.form: Warehouse Restore # This article's title should not change. If so, contact engineering.
---
# Restore in-place in the Fabric portal

**Applies to:** [!INCLUDE [fabric-dw](includes/applies-to-version/fabric-dw.md)]

[Restore in-place](restore-in-place.md) is an essential part of data recovery that allows restoration of the warehouse to a prior known good state. A restore overwrites the existing warehouse, using restore points from the existing warehouse in Microsoft Fabric.  

 - This tutorial guides you through how to create restore points and performing a restore in-place in a warehouse, as well as how to rename, manage, and view restore points.

## Prerequisites

- Review the [workspace roles](workspace-roles.md) membership required for the following steps. For more information, see [Restore in place Security](restore-in-place.md#security).
- An existing user-defined or system-created restore point.
    - A [system-created restore point](restore-in-place.md#system-created-restore-points) might not be available immediately for a new warehouse. If one is not yet available, [create a user-defined restore point](#create-user-defined-restore-point).

## Restore the warehouse using the restore point

1. To restore a user-defined or system-created restore point, go to context menu action of the restore point and select **Restore**.

    :::image type="content" source="media/restore-in-place-portal/restore-setting.png" alt-text="Screenshot from the Fabric portal of the setting to restore a warehouse.":::

1. Review and confirm the dialogue. Select the checkbox followed by **Restore**.

    :::image type="content" source="media/restore-in-place-portal/restore-dialog.png" alt-text="Screenshot from the Fabric portal of the confirmation dialog to restore a warehouse.":::

1. A notification appears showing restore progress, followed by success notification. Restore in-place is a metadata operation, so it can take a while depending on the size of the metadata that is being restored.

    > [!IMPORTANT]
    > When a [restore in-place](restore-in-place.md) is initiated, users inside the warehouse are not alerted that a restore is ongoing. Once the restore operation is completed, users should refresh the Object Explorer.

1. Refresh your reports to reflect the restored state of the data.

## Create user-defined restore point

[Fabric automatically creates system-created restore points](restore-in-place.md#system-created-restore-points) at least every eight hours. Workspace administrators, members, and contributors can also manually create restore points, for example, before and after large modifications made to the warehouse.

1. Go to Warehouse **Settings** -> **Restore points**.
1. Select **Add a restore point**.

    :::image type="content" source="media/restore-in-place-portal/add-setting.png" alt-text="Screenshot from the Fabric portal of the setting to add a restore point." lightbox="media/restore-in-place-portal/add-setting.png":::

1. Provide a **Name** and **Description**.

    :::image type="content" source="media/restore-in-place-portal/create-restore-point.png" alt-text="Screenshot from the Fabric portal of the setting to create a user-defined restore point.":::

1. A notification appears on successful creation of restore point.

    :::image type="content" source="media/restore-in-place-portal/create-notification.png" alt-text="Screenshot from the Fabric portal of a Success notification for restore point creation.":::

## Rename restore point

1. To rename a user-defined or system-created restore point, go to context menu action of the restore point, select **Rename**.

    :::image type="content" source="media/restore-in-place-portal/rename-setting.png" alt-text="Screenshot from the Fabric portal of the setting to rename a restore point.":::
1. Provide a new name and select **Rename**.
1. A notification appears on a successful rename.

## Delete user-defined restore point

You can delete user-defined restore points, but system-created restore points cannot be deleted.

For more information, see [Restore point retention](restore-in-place.md#restore-point-retention).

1. To delete a user-defined restore point, either go to context menu action of the restore point, or select **Delete**.

    :::image type="content" source="media/restore-in-place-portal/delete-setting.png" alt-text="Screenshot from the Fabric portal of the setting to delete a restore point.":::
1. To confirm, select **Delete**.
1. A notification appears on successful deletion of restore point.

## View system-created and user-defined restore points

1. Go to Warehouse **Settings** -> **Restore points** to view all restore points.
1. A unique restore point is identified by **Time(UTC)** value. Sort this column to identify the latest restore points.
1. If your warehouse has been restored, select **Details** for more information. The **Details of last restoration** popup provides details on latest restoration, including who performed the restore, when it was performed, and which restore point was restored.
    - If the restore point is over 30 days old and was deleted, the details of the banner will show as `N/A`.

    :::image type="content" source="media/restore-in-place-portal/viewer.png" alt-text="Screenshot from the Fabric portal showing restore points." lightbox="media/restore-in-place-portal/viewer.png":::

## Related content

- [Restore in-place of a warehouse in Microsoft Fabric](restore-in-place.md)
- [Microsoft Fabric terminology](../fundamentals/fabric-terminology.md)