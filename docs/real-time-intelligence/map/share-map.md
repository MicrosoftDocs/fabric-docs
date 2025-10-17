---
title: How to share a Map 
description: Learn how to share a Map in Microsoft Fabric Real-Time Intelligence.
ms.reviewer: smunk
author: sinnypan
ms.author: sipa
ms.topic: how-to
ms.custom:
ms.date: 09/15/2025
ms.search.form: Map
---

# How to share a Map (preview)

When you share a Map item in Microsoft Fabric, you grant users or groups permission to view or edit the map created in Map Builder. The map typically references backend data sources such as Lakehouse or KQL Database (Eventhouse) to render real-time or historical spatial insights.

Sharing a Map through [Direct Access](#direct-access) automatically enforces permission checks for both the Map and its underlying data sources. This ensures secure, role-based access without requiring full workspace-level permissions.

> [!IMPORTANT]
< This feature is in [preview](../../fundamentals/preview).

## Accessing Shared Maps

You can find Maps that others shared with you by selecting **Browse > Shared with me** in the Fabric navigation pane. Shared Maps can be explored, filtered, and interacted with depending on your assigned permission level.

:::image type="content" source="media/share-map/share-with-me.png" alt-text="A screenshot showing the 'share with me' button in the browse folder.":::

## Share a Map

You can share Map items in Microsoft Fabric through two methods:

1. [**Share Link**](#share-link). A quick way to grant view or edit access to specific people.

2. [**Direct Access**](#direct-access) allows individuals or groups to be explicitly granted permissions, giving them clear control over what they can view or modify.

### Share Link

1. Navigate to your workspace and locate the Map item.
1. Select the **Share** icon next to the Map name.
  :::image type="content" source="media/share-map/share-icon.png" alt-text="A screenshot showing the share icon.":::
1. In the **Create and send link** pane:
    - Enter user or group email addresses, or select specific people can view and share, then select **Send**
      :::image type="content" source="media/share-map/create-send-link.png" alt-text="A screenshot showing the create and send link screen.":::
    - In the **Select permissions** dialog, you can optionally enable **Share** and/or **Edit** to allow recipients to modify or redistribute the Map. Once enabled, select **Apply**.
      :::image type="content" source="media/share-map/select-permissions.png" alt-text="A screenshot showing the select permissions screen.":::

### Direct Access

1. From the workspace, select the ellipsis (...) next to the map name.
   :::image type="content" source="media/share-map/select-manage-permissions.png" lightbox="media/share-map/select-manage-permissions.png"  alt-text="A screenshot highlighting the ellipsis to select to bring up the 'manage permissions' screen.":::
1. Select **Manage Permissions.**
1. Enter user or group email addresses, or select specific people can view and share, then select **Send**
  :::image type="content" source="media/share-map/create-send-link.png" alt-text="A screenshot showing the create and send link view.":::
1. In the **Select permissions** dialog, you can optionally enable **Share** and/or **Edit** to allow recipients to modify or redistribute the Map. Once enabled, select **Apply**.
  :::image type="content" source="media/share-map/select-permissions.png" alt-text="A screenshot showing select permissions.":::
1. Enable **email notification** if desired.
1. Select **Grant**.

## Sharing and Permissions

When a Map is shared using a share link or through direct access, the recipient automatically receives Read permission on the Map item. More permissions depend on the selected options during sharing:

- **Read** permission is always granted to allow viewing the Map.
- **Share** permission is granted if the Share option is selected, enabling the recipient to reshare the Map.
- **Write** permission is granted if the Edit option is selected, allowing the recipient to modify the Map.

To ensure the Map functions correctly, recipients must also have appropriate permissions on the underlying data sources such as Lakehouse and KQL Database.

:::image type="content" source="media/share-map/grant-direct-access.png" alt-text="A screenshot showing the Grant people access pane.":::

> [!IMPORTANT]
>
> Users must have permission to access the Lakehouse or KQL Database. They can only view data they're authorized to see, so appropriate permissions on the underlying data are essential for the Map to render and function correctly.
