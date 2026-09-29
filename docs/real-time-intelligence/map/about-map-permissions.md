---
title: About map permissions in Microsoft Fabric
description: Learn about permissions for reading, writing, and sharing map items
ms.reviewer: smunk
author: deniseatmicrosoft
ms.author: limingchen
ms.date: 09/13/2026
ms.topic: article
ms.service: fabric
ms.subservice: rti-core
ms.search.form: map permissions
---

# Permissions in Fabric Maps

This article explains how permissions work in Fabric Maps, including how workspace roles, map‑level permissions, and permissions on underlying data sources—such as eventhouses, KQL databases, and lakehouses—interact. Understanding this permission model helps you determine who can view, edit, and share maps. It also explains why missing permissions can result in non‑rendering layers, incomplete results, or access errors. For step‑by‑step instructions on managing access to individual map items, see [Manage map permissions](manage-map-permissions.md).

## How Fabric Maps permissions work

**Three layers of permissions** determine access to a map in Fabric Maps:

- [Workspace permissions](#workspace-permissions)
- [Data permissions on underlying sources](#data-permissions-and-map-visibility)
- [Map item permissions](#map-item-permissions)

All three layers must allow access for a user to fully interact with a map.

Fabric Maps doesn't define its own security model. Instead, it relies on the standard Microsoft Fabric permission framework. For more information, see [Permission model](../../security/permission-model.md).

### Workspace permissions

Maps are Fabric items that live in a workspace. Workspace roles determine whether a user can:

- View map content
- Create or edit maps
- Share maps with others

Fabric workspace roles apply to all items in the workspace, including map items. The available roles are:

- **Admin**
- **Member**
- **Contributor**
- **Viewer**

For example, Contributors can create and edit maps but can't share them, while Viewers can only view map content. For more information, see [Roles in workspaces in Microsoft Fabric](../../fundamentals/roles-workspaces.md).

#### Workspace role capabilities for map items

The following table shows the default permissions assigned to each Fabric workspace role for map items.

| Permissions                     | Administrator | Member | Contributor | Viewer |
|---------------------------------|:-------------:|:------:|:-----------:|:------:|
| View and read map item content  | ✔️            | ✔️    | ✔️          | ✔️    |
| Create, edit, and delete map    | ✔️            | ✔️    | ✔️          | ❌    |
| Share map                       | ✔️            | ✔️    | ❌          | ❌    |

### Data permissions and map visibility

Fabric Maps doesn't control data-level security.

What users see in a map depends entirely on their permissions for the **underlying data sources**, such as:

- Lakehouse files (for example, GeoJSON or tilesets)
- KQL databases and querysets
- Eventhouses used for real-time layers

Another user can create cloud connections for external layers and share them with the map builder. After the map uses the connection to display an external layer, viewers can see the layer without separate access to the connection or its credentials.

Data permissions determine:

- **Which layers render**  
  If a user can't read a data source, the corresponding map layer doesn't render or shows errors.

- **Which features appear**  
  Maps only display records returned by queries or files the user is authorized to read.

- **Which attributes are available**  
  The map includes only columns and properties accessible through the underlying data source.

Fabric Maps never grants access to data a user isn't permitted to read. For more information, see [Permission model](../../security/permission-model.md).

For an external feature service layer, Fabric Maps retrieves credentials stored in the cloud connection. Viewers don't need the connection shared with them separately. If the credentials expire or Fabric Maps can't reach the service, the map displays an error indicating that the service couldn't be reached.

#### Permissions required to build or edit a map

This table summarizes the minimum permissions required on workspace roles, map items, and underlying data sources to create or modify a map and its layers.

| Scenario       | Related item | Minimum permissions required      |
|----------------|--------------|-----------------------------------|
| Create, edit, or delete a map | Workspace | Contributor or higher |
| Add GeoJSON or tileset layers | Lakehouse | Read                  |
| Upload PMTiles for tilesets   | Lakehouse | Write                 |
| Add KQL-based layers          | KQL database | Read               |
| Save changes to the map       | map item | Edit                   |

#### Permissions required to view or interact with a map

This table summarizes the read-level permissions required on map items and underlying data sources for users to view maps and see all available layers and data.

| Scenario       | Related item | Minimum permissions required      |
|----------------|--------------|-----------------------------------|
| Open and view a map           | Map item     | Read               |
| View GeoJSON or tileset layers| Lakehouse    | Read               |
| View KQL query results        | KQL database | Read               |
| View real-time layers         | Eventhouse   | Read               |

> [!Important]
>
> Sharing a map doesn't grant access to the lakehouse, KQL database, or eventhouse that supplies its data. When users lack permission to access the lakehouse or KQL database, the map displays errors or incomplete data.

### Map item permissions

You can grant users **Read**, **Edit**, and **Share** permissions to a map.

The following sections provide more details on these permissions.

#### Read permissions

All Fabric workspace roles can view and read map items.

Viewing the map item is necessary but not always sufficient:

- Users must also have read access to the underlying data sources, such as a lakehouse or KQL database.
- If data permissions are missing, the map might open but show errors, empty layers, or incomplete data.

#### Edit permissions

The **Edit** permission grants a user the ability to modify the map item itself. For example, they can:

- Change layers, styles, filters, and map settings
- Add or remove data layers
- Save changes to the map

This permission isn't standalone. A user can only edit a map if their workspace role allows write access to map items.

In practice, this condition means:

- Users with **Administrator**, **Member**, or **Contributor** roles can edit maps.
- Users with the **Viewer** role can't edit maps, even if the map is shared with them.

Editing the map doesn't override data permissions. The user must still have the required permissions on underlying data sources, such as a lakehouse or KQL database, or the map might show errors or missing data. For more information, see [Data permissions and map visibility](#data-permissions-and-map-visibility) in the previous section.

For information on granting map permissions, see [Manage map permissions](manage-map-permissions.md#managing-map-permissions).

#### Share a map

In addition to workspace roles, you can share individual map items directly with users or groups. For more information on sharing maps, see [Sharing Microsoft Fabric Maps](sharing-maps.md).

When you share a map item:

- The recipient gets access only to that map.
- Sharing a map doesn't grant access to the workspace or to underlying data sources.

Map item permissions follow the same item‑level sharing model used across Fabric. For more information, see [Permission model](../../security/permission-model.md).

For more information on sharing maps, see [Sharing Microsoft Fabric Maps](sharing-maps.md).

## Permissions in real-time intelligence scenarios

When a map uses real-time data, it might require extra permissions:

- Read access to eventhouses
- Write or read access to KQL databases and querysets
- Read access to lakehouse files used for tiles or static layers

If a user doesn't have permissions for any required data source, the map might load with missing layers or incomplete results.

For more information, see:

- [Permission model](../../security/permission-model.md)
- [Manage map permissions in Fabric Maps](manage-map-permissions.md)

## Summary

- Fabric Maps uses the standard Microsoft Fabric permission model.
- Workspace roles control who can create, edit, and share maps.
- Map item permissions control access to individual maps.
- Data permissions control which layers, features, and attributes are visible.
- Fabric Maps never elevates or overrides data access.

To grant full access to a map, ensure users have the required permissions at **all three layers**.

## Next steps

> [!div class="nextstepaction"]
> [Manage map permissions in Fabric Maps](manage-map-permissions.md)
