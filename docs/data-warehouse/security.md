---
title: Security for data warehousing
description: Learn more about securing the SQL Endpoint and Synapse Data Warehouse in Microsoft Fabric.
author: cynotebo
ms.author: cynotebo
ms.reviewer: wiassaf
ms.date: 04/12/2023
ms.topic: overview
---

# Security for data warehousing in Microsoft Fabric

**Applies to:** [!INCLUDE[fabric-se-dw](includes/applies-to-version/fabric-se-and-dw.md)]

[!INCLUDE [preview-note](../includes/preview-note.md)]

For information on [!INCLUDE [product-name](../includes/product-name.md)] security, see [Security in Microsoft Fabric](../security/security-overview.md).

For information on connecting to the [!INCLUDE [fabric-se](includes/fabric-se.md)] and [!INCLUDE [fabric-dw](includes/fabric-dw.md)], see [Connectivity](connectivity.md).

## Warehouse access model

[!INCLUDE [product-name](../includes/product-name.md)] permissions and granular SQL permissions work together to govern Warehouse access and the user permissions once connected. 
- Warehouse connectivity is dependent on being granted the [!INCLUDE [product-name](../includes/product-name.md)] Read permission, at a minimum, for the Warehouse.
- [!INCLUDE [product-name](../includes/product-name.md)] item permissions enable the ability to provide a user with SQL permissions, without needing to explicity grant those permissions within SQL.
-  [!INCLUDE [product-name](../includes/product-name.md)] workspace roles provide [!INCLUDE [product-name](../includes/product-name.md)] permissions for all warehouses within a workspace.
-  Granular user permissions can be further managed via T-SQL.

### Workspace roles

Workspace roles are used for development team collaboration within a workspace. Role assignment determines the actions available to the user and applies to all items within the workspace.
- For an overview of [!INCLUDE [product-name](../includes/product-name.md)] workspace roles, see [Roles in workspaces](../get-started/roles-workspaces.md).
- For instructions on assigning workspace roles, see [Give Workspace Access](../get-started/give-access-workspaces.md).

See [Workspace roles in Fabric data warehousing](workspace-roles.md) for details on the specific Warehouse capabilities provided through Workspace roles.


### Item permissions

In contrast to workspace roles, which apply to all items within a workspace, item permissions can be assigned directly to individual Warehouses. The user will receive the assigned permission on that single Warehouse. The primary purpose for these permissions is to enable sharing for downstream consumption of the Warehouse.

See [Item permissions](item-permissions.md) for details on the specific permissions provided for Warehouses.


### Object-level security

Workspace roles and item permissions provide an easy way to assign coarse permissions to a user for the entire warehouse. However, in some casees, more granular permissions are needed for a user. To achieve this, standard T-SQL constructs can be used to provide specific permissions to users.

See [SQL granular permissions](sql-granular-permissions.md) for details on the managing granular permissions in SQL.

## Next steps

- [Synapse Data Warehouse in Microsoft Fabric](warehouse.md)
- [Connectivity](connectivity.md)
