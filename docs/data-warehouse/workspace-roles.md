---
title: Workspace roles
description: Learn about the roles you can use to manage user access within a workspace.
ms.reviewer: wiassaf
ms.author: kedodd
author: kedodd
ms.topic: conceptual
ms.date: 03/15/2023
ms.search.form: Warehouse roles and permissions, Workspace roles and permissions
---

# Workspace roles

[!INCLUDE [preview-note](../includes/preview-note.md)]

**Applies to:** Warehouse and SQL Endpoint

Workspace roles allow you to manage user access within the workspace. For more information on Workspace roles, see Workspace roles in [!INCLUDE [product-name](../includes/product-name.md)]. There are four roles within [!INCLUDE [product-name](../includes/product-name.md)] workspaces: Admin, Member, Contributor, and Viewer. Adding users to these workspace roles provides the user with different intrinsic permissions when connected to a warehouse. For the current version, the Admin, Member and Contributor workspace roles all receive db_owner role permissions, within the warehouse, while a viewer receives read-only access (as shown in the following table).

| **Workspace role** | **SQL permissions** | **Equivalent SQL role** |
|---|---|---|
| **Admin** | All permissions | db_owner |
| **Member** | All permissions | db_owner |
| **Contributor** | All permissions | db_owner |
| **Viewer** | Read only | db_datareader |

> [!NOTE]
> The mapping of these roles to SQL permissions will be further refined as we continue to build out the warehouse security experience. In addition, beyond the intrinsic permissions granted based on Workspace roles, permissions will be able to be further configured within SQL, using the standard SQL security model.

## Prerequisites

To get started, you must complete the following:

- If not already done, create a workspace with a premium per capacity workspace settings

## Next steps

- [Manage user access](manage-user-access.md)
