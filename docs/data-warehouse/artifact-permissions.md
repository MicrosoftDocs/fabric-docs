---
title: Artifact permissions
description: Learn about the permissions that can be assigned to warehouse artifacts.
ms.reviewer: wiassaf
ms.author: kedodd
author: kedodd
ms.topic: conceptual
ms.date: 04/13/2023
ms.search.form: Warehouse artifact permissions, Workspace permissions
---

# Artifact permissions

**Applies to:** [!INCLUDE[fabric-se-and-dw](includes/applies-to-version/fabric-se-and-dw.md)]

[!INCLUDE [preview-note](../includes/preview-note.md)]

 
For [!INCLUDE [fabric-se](includes/fabric-se.md)] and [!INCLUDE [fabric-dw](includes/fabric-dw.md)], the following permisions can be assigned.
   
| Artifact permission   |  Description |
|---|---|
|Read|Allows the user to connect to the Warehouse SQL endpoint|
|ReadData|Allows the user to read data from any table/view within the Warehouse. Equivalent of SQL db_datareader or SELECT on all tables/views.|   
|ReadAll|Allows user to read data the raw parquet files in One Lake that can be consumed by Spark|

Notes:
- All users will be granted at least the Read permission
- By assigning a user the Read permission only, all of their SQL access will be determined by the permissions granted to them within SQL
- ReadData is the same permission that Workspace Viewers receive for each warehouse in the workspace
- ReadAll does not impact the user's permissions within SQL

**--Screenshot showing the permissions**

## Assigning artifact permissions
There are two ways that these artifact permissions can be assigned:
- Sharing - <note: need to link to sharing page>
- Manage permissions - <note: need to link to platform manage permissions page>

