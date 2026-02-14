---
title: About Map permissions in Microsoft Fabric
description: Learn about permissions for reading, writing, and sharing Map items
ms.reviewer: smunk
author: deniseatmicrosoft
ms.author: limingchen
ms.date: 02/16/2025
ms.topic: article
ms.service: fabric
ms.subservice: rti-core
ms.search.form: Map permissions 
---

# Permissions in Fabric Maps

This article explains how permissions work in Fabric Maps, including how workspace roles, map‑level permissions, and permissions on underlying data sources—such as Eventhouses, KQL databases, and Lakehouses—interact. Understanding this permission model helps you determine who can view, edit, and share maps, and explains why missing permissions can result in non‑rendering layers, incomplete results, or access errors. For step‑by‑step instructions on managing access to individual map items, see [Manage map permissions](manage-map-permissions.md).

> [!IMPORTANT]
> Fabric Maps is currently in [preview](../../fundamentals/preview.md). Features and functionality may change.

## How Fabric Maps permissions work

Access to a map in Fabric Maps is determined by **three layers of permissions**:

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

The following table shows the default permissions assigned to each Fabric workspace role for Map items.

| Permissions                     | Administrator | Member | Contributor | Viewer |
|---------------------------------|:-------------:|:------:|:-----------:|:------:|
| View and read Map Item content  | ✔️            | ✔️    | ✔️          | ✔️    |
| Create, edit, and delete Map    | ✔️            | ✔️    | ✔️          | ❌    |
| Share Map                       | ✔️            | ✔️    | ❌          | ❌    |

### Data permissions and map visibility

Fabric Maps does **not** control data‑level security.

What users see in a map is entirely determined by their permissions on the **underlying data sources**, such as:

- Lakehouse files (for example, GeoJSON or tilesets)
- KQL databases and querysets
- Eventhouses used for real‑time layers

Data permissions determine:

- **Which layers render**  
  If a user can't read a data source, the corresponding map layer won't render or will show errors.

- **Which features appear**  
  Maps only display records returned by queries or files the user is authorized to read.

- **Which attributes are available**  
  Only columns and properties accessible through the underlying data source are included in the map.

Fabric Maps never grants access to data a user isn't permitted to read. For more information, see [Permission model](../../security/permission-model.md).

#### Permissions required to build or edit a map

This table summarizes the minimum permissions required on workspace roles, map items, and underlying data sources to create or modify a map and its layers.

| Scenario       | Related item | Minimum permissions required      |
|----------------|--------------|-----------------------------------|
| Create, edit, or delete a map | Workspace | Contributor or higher |
| Add GeoJSON or tileset layers | Lakehouse | Read                  |
| Upload PMTiles for tilesets   | Lakehouse | Write                 |
| Add KQL-based layers          | KQL database | Write              |
| Save changes to the map       | Map item | Edit                   |

#### Permissions required to view or interact with a map

This table summarizes the read‑level permissions required on map items and underlying data sources for users to view maps and see all available layers and data.

| Scenario       | Related item | Minimum permissions required      |
|----------------|--------------|-----------------------------------|
| Open and view a map           | Map item     | Read               |
| View GeoJSON or tileset layers| Lakehouse    | Read               |
| View KQL query results        | KQL database | Read               |
| View real-time layers         | Eventhouse   | Read               |

> [!Important]
>
> Sharing a map does not grant access to the Lakehouse, KQL database, or Eventhouse that supplies its data. When users lack permission to access the Lakehouse or KQL Database, the map displays errors or incomplete data.

### Map item permissions

You can grant users **Read**, **Edit** and **Share** permissions to a map.

The following sections provide additional details on these permissions.

#### Read permissions

All Fabric workspace roles can view and read map items.

Viewing the map item is necessary but not always sufficient:

- Users must also have read access to the underlying data sources (for example, Lakehouse or KQL Database).
- If data permissions are missing, the map may open but show errors, empty layers, or incomplete data.

#### Edit permissions

Edit grants a user the ability to modify the map item itself, for example:

- Change layers, styles, filters, and map settings
- Add or remove data layers
- Save changes to the map

It is important to note that this permission is not standalone. A user can only edit a map if their workspace role allows write access to Map items.

In practice, this means:

- Users with **Administrator**, **Member**, or **Contributor** roles can edit maps.
- Users with the **Viewer** role cannot edit maps, even if the map is shared with them.

Editing the map also does not override data permissions. The user must still have the required permissions on underlying data sources (such as a Lakehouse or KQL database), or the map may show errors or missing data. For more information, see [Data permissions and map visibility](#data-permissions-and-map-visibility) in the previous section.

For information on granting map permissions, see [Managing Map Permissions](manage-map-permissions.md#managing-map-permissions).

#### Share a map

In addition to workspace roles, individual map items can be shared directly with users or groups. For more information on sharing maps, see [Sharing Microsoft Fabric Maps](sharing-maps.md).

When you share a map item:

- The recipient gets access only to that map.
- Sharing a map does **not** grant access to the workspace or to underlying data sources.

Map item permissions follow the same item‑level sharing model used across Fabric. For more information, see [Permission model](../../security/permission-model.md).

For more information on sharing maps, see [Sharing Microsoft Fabric Maps](sharing-maps.md)

## Permissions in Real‑Time Intelligence scenarios

When a map uses real‑time data, additional permissions may be required:

- Read access to Eventhouses
- Write or read access to KQL databases and querysets
- Read access to Lakehouse files used for tiles or static layers

If a user lacks permissions on any required data source, the map may load with missing layers or incomplete results.

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
