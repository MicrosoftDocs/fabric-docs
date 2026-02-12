---
title: How to share a map using Direct access and share link
description: Learn how to share a map using Direct access and share link in Microsoft Fabric Real-Time Intelligence.
ms.reviewer: smunk
author: sinnypan
ms.author: sipa
ms.topic: how-to
ms.custom:
ms.date: 12/05/2025
ms.search.form: Map
---

# Share Fabric Maps: Direct access and share link (preview)

Sharing a map through direct access grants permissions on the map item only. It doesn't provide access to underlying data sources (like Lakehouse or KQL database), so recipients must have those permissions for the map to load and function.

Sharing a map through [direct access](#direct-access) automatically enforces permission checks for both the map and its underlying data sources. This ensures secure, role-based access without requiring full workspace-level permissions.

<!------------------------------------------------------------------------------------
> [!NOTE]
> To share a Microsoft Fabric map using Fabric Org Apps, see [How to share a map using Org Apps](share-map-org-apps.md)
------------------------------------------------------------------------------------>

> [!IMPORTANT]
> Fabric Maps is currently in [preview](../../fundamentals/preview.md). Features and functionality may change.

## Accessing shared maps

You can find maps that others shared with you by selecting **Browse > Shared with me** in the Fabric navigation pane. Shared maps can be explored, filtered, and interacted with depending on your assigned permission level.

:::image type="content" source="media/share-map/direct/share-with-me.png" alt-text="A screenshot showing the 'share with me' button in the browse folder.":::

## Share a map

You can share map items in Microsoft Fabric through two methods:

1. [**Share link**](#share-link). A quick way to grant view or edit access to specific people.

2. Grant [**direct access**](#direct-access) to individuals or groups by assigning permissions that define what they can view or edit.

### Sharing and permissions

When you share a map by sharing a link or granting direct access, recipients automatically get read access to view the map. Extra permissions depend on the options you select:

- **Read**—Always granted for viewing the map.
- **Share**—Only granted if you select **Share** when granting access, allowing recipients to reshare the map.
- **Write**—Only granted if you select **Edit** when granting access, allowing recipients to modify the map.

Recipients also need appropriate permissions on underlying data sources (such as lakehouse or KQL database) for the map to function correctly.

:::image type="content" source="media/share-map/direct/grant-direct-access.png" alt-text="A screenshot showing the Grant people access pane.":::

> [!IMPORTANT]
>
> Users must have permission to access the lakehouse or KQL database. They can only view data they're authorized to see, so appropriate permissions on the underlying data are essential for the map to render and function correctly.

### Share link

1. Navigate to your workspace and locate the map item.
1. Select the **Share** icon next to the map name.
  :::image type="content" source="media/share-map/direct/share-icon.png" alt-text="A screenshot showing the share icon.":::
1. In the **Create and send link** pane:
    - Enter user or group email addresses, or select specific people can view and share, then select **Send**
      :::image type="content" source="media/share-map/direct/create-send-link.png" alt-text="A screenshot showing the create and send link screen.":::
    - In the **Select permissions** dialog, you can optionally enable **Share** and/or **Edit** to allow recipients to modify or redistribute the map. Once enabled, select **Apply**.
      :::image type="content" source="media/share-map/direct/select-permissions.png" alt-text="A screenshot showing the select permissions screen.":::

### Direct access

1. From the workspace, select the ellipsis (...) next to the map name.
   :::image type="content" source="media/share-map/direct/select-manage-permissions.png" lightbox="media/share-map/direct/select-manage-permissions.png"  alt-text="A screenshot highlighting the ellipsis to select to bring up the 'manage permissions' screen.":::
1. Select **Manage Permissions.**
1. Enter user or group email addresses, or select specific people can view and share, then select **Send**
  :::image type="content" source="media/share-map/direct/create-send-link.png" alt-text="A screenshot showing the create and send link view.":::
1. In the **Select permissions** dialog, you can optionally enable **Share** and/or **Edit** to allow recipients to modify or redistribute the map. Once enabled, select **Apply**.
  :::image type="content" source="media/share-map/direct/select-permissions.png" alt-text="A screenshot showing select permissions.":::
1. Enable **email notification** if desired.
1. Select **Share**.

## Next steps

To learn more, please see:

> [!div class="nextstepaction"]
> [How to share a map using org apps](share-map-org-apps.md)
