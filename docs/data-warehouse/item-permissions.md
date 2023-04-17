---
title: Item permissions
description: Learn about the permissions that can be assigned to Synapse Data Warehouse and the SQL Endpoint in Microsoft Fabric.
ms.reviewer: wiassaf
ms.author: kedodd
author: kedodd
ms.topic: how-to
ms.date: 04/13/2023
ms.search.form: Warehouse item permissions, Workspace permissions
---

# Manage item permissions in Microsoft Fabric

**Applies to:** [!INCLUDE[fabric-se-and-dw](includes/applies-to-version/fabric-se-and-dw.md)]

[!INCLUDE [preview-note](../includes/preview-note.md)]

This article explains how to manage individual item permissions in [!INCLUDE [product-name](../includes/product-name.md)].

For [!INCLUDE [fabric-se](includes/fabric-se.md)] and [!INCLUDE [fabric-dw](includes/fabric-dw.md)], the following permisions can be assigned.
   
| Item permission   |  Description |
|---|---|
|**Read**|Allows the user to connect to the Synapse data warehouse's SQL connection string.|
|**ReadData**|Allows the user to read data from any table/view within the warehouse. Equivalent of the db_datareader database role or SELECT on all tables/views in SQL Server.|   
|**ReadAll**|Allows user to read data the raw parquet files in OneLake that can be consumed by Spark.|

Notes:

- All users will be granted at least the Read permission
- By assigning a user the Read permission only, all of their SQL access will be determined by the permissions granted to them within SQL
- ReadData is the same permission that Workspace Viewers receive for each warehouse in the workspace
- ReadAll does not impact the user's permissions within SQL

## Assigning item permissions
Permissions can be granted to users through the item sharing flow or through **Manage permissions**.

### Manage permissions in the Fabric portal

The Manage permissions page shows the list of users who have been given access by being assigned to Workspace roles or through being assigned specific item permissions.

1. Select **Manage Permissions** from the context menu.

:::image type="content" source="media\item-permissions\manage-permissions-context-menu.png" alt-text="Screenshot of the Manage permissions context menu." lightbox="media\item-permissions\manage-permissions-context-menu.png":::

2. Select **Add User**.
3. Enter the user information and select the additional permissions to provide the user.

:::image type="content" source="media\item-permissions\manage-permissions-add-user.png" alt-text="Screenshot of the Manage permissions Add user dialog." lightbox="media\item-permissions\manage-permissions-add-user.png":::

4. The user will now be displayed, along with their permissions, in the list of users.

:::image type="content" source="media\item-permissions\manage-permissions-page-direct-access.png" alt-text="Screenshot of manage permissions page for Direct access." lightbox="media\item-permissions\manage-permissions-page-direct-access.png":::

5. Permissions or access can be removed by selecting the context menu for the user.

:::image type="content" source="media\item-permissions\manage-permissions-remove-access.png" alt-text="Screenshot of Manage permissions page Remove user permissions context menu." lightbox="media\item-permissions\manage-permissions-remove-access.png":::

## Next steps

- [Security for data warehousing in Microsoft Fabric](security.md)
- [SQL granular permissions](sql-granular-permissions.md)