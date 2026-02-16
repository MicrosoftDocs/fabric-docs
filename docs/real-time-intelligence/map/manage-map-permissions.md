---
title: Manage Map permissions in Microsoft Fabric
description: Learn how to grant, modify, and revoke access to map items in Microsoft Fabric Maps.
ms.reviewer: smunk
author: deniseatmicrosoft
ms.author: limingchen
ms.date: 02/16/2025
ms.topic: how-to
ms.service: fabric
ms.subservice: rti-core
ms.search.form: Map permissions
---

# Manage map permissions in Fabric Maps (preview)

This article describes how to grant, modify, and revoke access to individual map items in Fabric Maps. It focuses on map‑level permissions only. For a conceptual overview of how workspace roles, map permissions, and data permissions interact, see [Permissions in Fabric Maps](about-map-permissions.md).

> [!IMPORTANT]
> Fabric Maps is currently in [preview](../../fundamentals/preview.md). Features and functionality may change.

## Prerequisites

Before you manage map permissions, ensure that you have:

- Access to the workspace that contains the map
- One of the following workspace roles:
  - **Admin**
  - **Member**

Users with the **Contributor** or **Viewer** role can't manage map permissions.

For more information, see:

- [Roles in workspaces in Microsoft Fabric](../../fundamentals/roles-workspaces.md)
- [Permission model – Microsoft Fabric](../../security/permission-model.md)

> [!IMPORTANT]
> Managing map permissions controls access to the **map item only**.  It does **not** grant access to the underlying data sources used by the map.
>
> For a conceptual overview of how workspace roles, map permissions, and data permissions interact, see [Permissions in Fabric Maps](about-map-permissions.md).

## Managing Map Permissions

To manage Map permissions

1. In your workspace, locate the map item.
1. Select the **More options** (**…**) menu next to the map.
1. Select **Manage permissions**.

  :::image type="content" source="media/manage-map-permissions/manage-permissions.png" lightbox="media/manage-map-permissions/manage-permissions.png" alt-text="Screenshot of a map item context menu appearing over a workspace list in Microsoft Fabric showing options including Open, Delete, Settings, Favorite, View workspace lineage, View item lineage, View details, Move to, Manage permissions, and Share.":::

The **Direct access** panel opens and shows all users and groups that currently have access to the map.

:::image type="content" source="media/manage-map-permissions/direct-access-before.png" lightbox="media/manage-map-permissions/direct-access-before.png" alt-text="Screenshot showing the direct access panel for the WorkordersMap item in Microsoft Fabric showing a table with four users and their permissions. Column headers are People and groups with access, Email Address, Role, and Permissions. The panel includes an Add user button and Filter by keyword search box at the top.":::

When you add new users to a map you grant them read access and can also specify more permissions such as the ability to edit and share the map.

> [!NOTE]
> Map permissions are evaluated together with the user's workspace role. Some permissions require specific workspace roles to take effect.

### Direct access

In the **Direct access** panel, you can:

- View current recipients and their permissions.
- Grant access to a map by adding new users and specifying roles.
- Revoke or modify access of current recipients.

## Grant access to a map using direct access

To add a new user:

1. In the **Manage permissions** panel **Direct access** tab, select **+ Add user**.

      :::image type="content" source="media/manage-map-permissions/add-user.png" lightbox="media/manage-map-permissions/add-user.png" alt-text="Screenshot of the Manage permissions panel for a map item in Microsoft Fabric. The Direct access tab is selected showing a table with columns for People and groups with access, Email Address, Role, and Permissions.":::

1. Enter one or more users or groups.
1. Choose the permission level to assign:
   - **Share** – Allows sharing the map. Requires the **Member** or **Administrator** workspace role.
   - **Edit** – Allows users with write-capable workspace roles (**Administrator**, **Member**, or **Contributor**) to modify and save changes to the map.

   > [!NOTE]
   > When granted access, all users are automatically given **Read** privileges to the map, available with all workspace roles.

1. Select **Grant**.

    :::image type="content" source="media/manage-map-permissions/grant-people-access.png" alt-text="Screenshot of the Grant people access dialog for WorkordersMap in Microsoft Fabric. The dialog shows a recipient field with Paige Turner added, Additional permissions section with Share checkbox selected and Edit checkbox unselected, Notification Options section with Notify recipients by email checkbox selected, an optional message text box, and an information note stating Share the KQL database and Lakehouse before sharing the Map. Grant and Back buttons appear at the bottom right.":::

Those added can now access the map with the permissions granted.

:::image type="content" source="media/manage-map-permissions/direct-access-after.png" lightbox="media/manage-map-permissions/direct-access-after.png" alt-text="A screenshot of the direct access panel for WorkordersMap showing the new user with permissions Read, Reshare.":::

### Links

In addition to **Direct access**, you can grant access to a map by using the **Links** tab in the **Manage permissions** panel.

The **Links** tab lets you create and manage sharing links for the map item.

In the **Links** tab, you can:

- reate a sharing link for the map.
- Control who can use the link (for example, specific people or your organization).
- Specify the permission level granted by the link.
- View and delete existing sharing links.

## Grant access to a map using Links

To add a new user:

1. In the **Manage permissions** panel **Links** tab, select **+ Add link**.

    :::image type="content" source="media/manage-map-permissions/add-link.png" lightbox="media/manage-map-permissions/add-link.png" alt-text="Screenshot of the Manage permissions panel in Fabric Maps showing the Links tab selected. The panel displays an Add link button in the upper left corner. The center of the panel shows an empty state with a folder icon and the message Links you share with others appear here.":::

1. The **Create and send link** dialog appears.

    :::image type="content" source="media/manage-map-permissions/create-send-link.png" alt-text="Screenshot of the Create and send link dialog for WorkordersMap in Microsoft Fabric. A briefcase icon appears next to People in your organization can view with a right-pointing chevron. Below are two input fields: Enter a name or email address and Add a message optional. A Send button appears on the right. At the bottom, four sharing method icons are displayed: Copy link, by Email, by Teams, and by PowerPoint. The dialog header shows a search icon and close X button.":::

1. Select **People in your organization can view** to open the select permissions dialog.

    :::image type="content" source="media/manage-map-permissions/select-additional-permissions.png" alt-text="A screenshot of the Fabric Maps create and send link dialog. The dialog shows a briefcase icon with the text People in your organization can view and a chevron arrow. Below are two input fields labeled Enter a name or email address and Add a message optional. A Send button appears on the right side. At the bottom are four sharing options displayed as icons with labels: Copy link, by Email, by Teams, and by PowerPoint. The dialog includes a search icon and close X button in the header.":::

1. The **Select permissions** dialog appears with three options for **People who can view this map**. With the desired option selected, select the **Apply** button.
      - **People in your organization**: This option shares the map with people in your organization who already have permission to access the workspace. The link grants view-only access and doesn't allow editing or resharing.
      - **People with existing access**: Shares the map only with users who already have permission to access it in the workspace.
      - **Specific people**: Allows you to grant **Share** or **Edit** permissions to selected users or groups. Only the people you specify receive the permissions assigned by the link.

1. Once back in the **Create and send link** dialog you can send the link to those specified using the **Send** button or any of the options along the bottom including **Copy link**, **By Email**, **by Teams** or **by PowerPoint**.

> [!NOTE]
> Granting access to a map doesn't grant access to its underlying data.  
> Users must also have permission to read any Lakehouse, Eventhouse, or KQL database used by the map.

## Modify permissions or remove access

To change existing permissions or remove access altogether:

1. Open the **Manage permissions** panel.
2. Locate the user or group.
3. Choose one of the following actions:
   - **Add** or **Remove** individual permissions
   - **Remove access**

    :::image type="content" source="media/manage-map-permissions/add-remove-access.png" lightbox="media/manage-map-permissions/add-remove-access.png" alt-text="Screenshot of the Direct access panel for WorkordersMap in Microsoft Fabric showing a context menu expanded. The menu displays four options: Remove write, Add reshare, Remove execute, and Remove access. The panel shows four users with columns for People and groups with access, Email Address, Role, and Permissions. Marsha Mellow has Read, Write, Execute permissions. ":::

Changes take effect immediately.

## Verify data access for map users

If users can open a map but see missing layers or errors, verify that they have read access to the following underlying data sources:

- Lakehouse files (GeoJSON or tilesets)
- Eventhouses
- KQL databases or KQL querysets

For more information, see [Data permissions and map visibility](about-map-permissions.md#data-permissions-and-map-visibility).

## Troubleshooting

| Issue | Possible cause |
|------|----------------|
| Map opens but layers don't render | User lacks permission on the underlying data source |
| User can't edit or share a map | Workspace role doesn't allow editing or sharing |
| Map loads with incomplete data | Data permissions restrict query results |

Fabric Maps never elevates data access.  
Maps display only the data that a user is authorized to read.

## Next steps

> [!div class="nextstepaction"]
> [Permissions in Fabric Maps](about-map-permissions.md)

> [!div class="nextstepaction"]
> [Permission model – Microsoft Fabric](../../security/permission-model.md)

> [!div class="nextstepaction"]
> [Create a map](create-map.md)

> [!div class="nextstepaction"]
> [Share a map](sharing-maps.md)
