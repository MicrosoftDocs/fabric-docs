---
title: Restore in-place of a warehouse from a restore point with the Fabric portal
description: Learn about how to perform a restore in-place of a warehouse in the Fabric portal.
author: WilliamDAssafMSFT
ms.author: wiassaf
ms.reviewer: sosivara
ms.date: 07/17/2024
ms.service: fabric
ms.subservice: data-warehouse
ms.topic: how-to
ms.search.form: Warehouse Restore # This article's title should not change. If so, contact engineering.
---
# Restore in-place in the Fabric portal

**Applies to:** [!INCLUDE [fabric-dw](includes/applies-to-version/fabric-dw.md)]

[Restore in-place](restore-in-place.md) is an essential part of data recovery that allows restoration of the warehouse to a prior known good state. A restore overwrites the existing warehouse, using restore points from the existing warehouse. This tutorial guides you through creating restore points and performing a restore in-place in Warehouse in Microsoft Fabric, using the warehouse settings with a no-code experience.

## Prerequisites

- Review the [workspace roles](workspace-roles.md) membership required for the following steps. For more information, see [Restore in place Security](restore-in-place.md#security).
- An existing user-defined or system-created restore point.
    - A [system-created restore point](restore-in-place.md#system-created-restore-points) may not be available immediately for a new warehouse. If one is not yet available, [create a user-defined restore point](restore-points-manage.md).

### Restore the data warehouse using the restore point

1. To restore a user-defined or system-created restore point, go to context menu action of the restore point and select **Restore**.

    :::image type="content" source="media/restore-in-place-portal/restore-setting.png" alt-text="Screenshot from the Fabric portal of the setting to restore a warehouse.":::

1. Review and confirm the dialogue. Select the checkbox followed by **Restore**.

    :::image type="content" source="media/restore-in-place-portal/restore-dialog.png" alt-text="Screenshot from the Fabric portal of the confirmation dialog to restore a warehouse.":::

1. A notification appears showing restore progress, followed by success notification. Restore in-place is a metadata operation, so it can take a while depending on the size of the metadata that is being restored.

    > [!IMPORTANT]
    > When a [restore in-place](restore-in-place.md) is initiated, users inside the warehouse are not alerted that a restore is ongoing. Once the restore operation is completed, users should refresh the Object Explorer.

1. Refresh your reports to reflect the restored state of the data.

## Next step

> [!div class="nextstepaction"]
> [Manage restore points in the Fabric portal](restore-points-manage.md)

## Related content

- [Restore in-place of a warehouse in Microsoft Fabric](restore-in-place.md)
- [Microsoft Fabric terminology](../get-started/fabric-terminology.md)