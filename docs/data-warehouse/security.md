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

## Workspace permissions

Workspace permissions are best accomplished by membership in Azure role-based access control (RBAC) roles. For more information, see [Workspace roles](workspace-roles.md).

Through the workspace, you can add members to, and remove them from, workspace roles. For a tutorial, see [Manage user access](manage-user-access.md).

## Object-level security in Synapse Data Warehouse

Permissions for objects in the [!INCLUDE [fabric-dw](includes/fabric-dw.md)] can be assigned to SQL principals. 

   - By default, the user who created the Lakehouse will have "dbo" permissions, everyone else is limited to read-only SELECT permission.

   - GRANT, REVOKE, DENY commands are currently not supported.

## Row-level security in Synapse Data Warehouse

Permissions for rows in the [!INCLUDE [fabric-dw](includes/fabric-dw.md)] aren't currently available.

## Next steps

- [Synapse Data Warehouse in Microsoft Fabric](warehouse.md)
- [Connectivity](connectivity.md)