---
title: Manage Map permissions in Microsoft Fabric
description: "Learn to manage permissions for reading, writing, and sharing Map items"
author: deniseatmicrosoft
ms.author: limingchen
ms.date: 09/15/2025
ms.topic: how-to
ms.service: fabric
ms.subservice: rti-core
ms.search.form: Map permissions 
---

# Manage Map permissions

Permissions for reading, writing, and sharing Map items follow the standard Fabric workspace roles, ensuring a consistent and secure access model across all Fabric items.

## Workspace roles for Map items

The following table shows the default permissions assigned to each Fabric workspace role for Map items.

| Permissions                     | Administrator | Member | Contributor | Viewer |
|---------------------------------|:-------------:|:------:|:-----------:|:------:|
| View and read Map Item content  | ✔️            | ✔️    | ✔️          | ✔️    |
| Create, edit, and delete Map    | ✔️            | ✔️    | ✔️          | ❌    |
| Share Map                       | ✔️            | ✔️    | ❌          | ❌    |

## Managing Map Permissions

To manage Map permissions

1. In your workspace, select the ellipsis (...) next to the Map name.
2. Select **Manage permissions**.
3. In the **Direct access** panel, you can:
   - View current recipients and their permissions.
   - Revoke or modify access.
   - Add new users and specify roles.

## Permissions required for related items

Map items depend on other Fabric items, such as Lakehouse or KQL Database. To build and use a Map, you must also have the appropriate permissions on these related items.

| Use Case           | Related items           | Related item permissions required               |
|--------------------|-------------------------|-------------------------------------------------|
| Builder and Viewer roles access the full GeoJSON data for tile generation. | Lakehouse  | Read |
| Builder uploads PM Tiles to Lakehouse                                      | Lakehouse  | Write|
| Builder access KQL DB and query set and read the result. | KQL Database, KQL Queryset  | KQL DB - Read and ReadData<br>KQL Queryset - Read |
| Users view the content in the Map item    | KQL Queryset | Read and ReadData                   |

> [!NOTE]
>
> If a user does not have permission to access the Lakehouse or KQL Database, the Map may display errors or incomplete data. Access to Maps is controlled by the permissions of the underlying data. Shared Maps will only show information that the user is authorized to view.
