---
title: Security for data warehousing in Microsoft Fabric
description: Learn more about securing the SQL Endpoint and Synapse Data Warehouse in Microsoft Fabric.
ms.reviewer: wiassaf
ms.author: cynotebo
author: cynotebo
ms.topic: overview
ms.date: 04/05/2023
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

## Row-level security in Synapse Data Warehouse

Permissions for rows in the [!INCLUDE [fabric-dw](includes/fabric-dw.md)] aren't currently available.

## Next steps

- [Synapse Data Warehouse in Microsoft Fabric](warehouse.md)
- [Connectivity](connectivity.md)