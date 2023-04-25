---
title: Workspace roles
description: Learn about the roles you can use to manage user access within a workspace.
author: kedodd
ms.author: kedodd
ms.reviewer: wiassaf
ms.date: 05/23/2023
ms.topic: conceptual
ms.search.form: Warehouse roles and permissions, Workspace roles and permissions
---

# Workspace roles in Fabric data warehousing

**Applies to:** [!INCLUDE[fabric-se-and-dw](includes/applies-to-version/fabric-se-and-dw.md)]

[!INCLUDE [preview-note](../includes/preview-note.md)]

Workspace roles allow you to manage user access within the workspace. For more information on Workspace roles, see Workspace roles in [!INCLUDE [product-name](../includes/product-name.md)]. 

There are four roles within [!INCLUDE [product-name](../includes/product-name.md)] workspaces: **Admin**, **Member**, **Contributor**, and **Viewer**. Adding users to these workspace roles provides the user with different intrinsic permissions when connected to a warehouse. 

The **Admin**, **Member**, and **Contributor** workspace roles all receive db_owner role permissions, within the warehouse, while a viewer receives read-only access.

| **Workspace role** | **SQL permissions** | **Equivalent SQL role** |
|---|---|---|
| **Admin** | All permissions | db_owner |
| **Member** | All permissions | db_owner |
| **Contributor** | All permissions | db_owner |
| **Viewer** | Read only | db_datareader |

> [!NOTE]
> The mapping of these roles to SQL permissions will be further refined as we continue to build out the warehouse security experience. In addition, beyond the intrinsic permissions granted based on Workspace roles, permissions will be able to be further configured within SQL, using the standard SQL security model.

## Next steps

- [Manage user access](manage-user-access.md)