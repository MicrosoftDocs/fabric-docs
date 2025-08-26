---
title: Manage Map permissions in Microsoft Fabric
description: "Learn to manage permissions for reading, writing, and sharing Map items"
author: sinnypan
ms.author: sipa
ms.date: 09/03/2025
ms.topic: how-to
ms.service: azure-maps
ms.subservice:
ms.custom:
ms.search.form: Map permissions 
---

# Manage Map permissions

Permissions for reading, writing, and sharing Map items follow the standard Fabric workspace roles, ensuring a consistent and secure access model across all Fabric artifacts.

## Workspace roles for Map items

The following table shows the default permissions assigned to each Fabric workspace role for Map items.

| Permissions                     | Administrator | Member | Contributor | Viewer |
|---------------------------------|:-------------:|:------:|:-----------:|:------:|
| View and read Map Item content  | ✔️            | ✔️    | ✔️          | ✔️    |
| Create, edit, and delete Map     | ✔️            | ✔️    | ✔️          | ❌    |
| Share Map                       | ✔️            | ✔️    | ❌          | ❌    |

## Managing Map Permissions

To manage Map permissions

1. In your workspace, SELECT the ellipsis (...) next to the Map name.
2. Select **Manage permissions**.
3. In the **Direct access** panel, you can:
   - View current recipients and their permissions.
   - Revoke or modify access.
   - Add new users and specify roles.

## Permissions required for related artifacts

Map items depend on other Fabric artifacts, such as Lakehouse or KQL Database. To build and use a Map, you must also have the appropriate permissions on these related artifacts.

| Magellan Use Case  | Related Artifacts           | Related artifact permissions  required      |
|--------------------|-----------------------------|---------------------------------------------|
| Builder and Viewer roles access the full GeoJSON data for tile generation. | Lakehouse  | Read |
| Builder uploads PM Tiles to Lakehouse                                      | Lakehouse  | Write|
| Builder access KQL DB and query set and read the result.  | KQL Database, KQL Queryset  | KQL DB - Read and ReadData <br/>KQL Queryset - Read  |
| Users view the content in the Map item    | KQL Queryset  | Read and ReadData                  |

> [!NOTE]
>
> If a user lacks permission to the Lakehouse or KQL Database, the Map may display errors or incomplete data. Map access is governed by underlying data permissions—shared Maps only reveal data the user is authorized to view.
