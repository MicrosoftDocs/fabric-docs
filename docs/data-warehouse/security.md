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

## Warehouse access model

[!INCLUDE [product-name](../includes/product-name.md)] permissions and granular SQL permissions work together to govern Warehouse access and the user permissions once connected. 
- Warehouse connectivity is dependent on being granted the [!INCLUDE [product-name](../includes/product-name.md)] Read permission, at a minimum, for the Warehouse.
- [!INCLUDE [product-name](../includes/product-name.md)] artifact permissions enable the ability to provide a user with SQL permissions, without needing to explicity grant those permissions within SQL.
-  [!INCLUDE [product-name](../includes/product-name.md)] workspace roles provide [!INCLUDE [product-name](../includes/product-name.md)] permissions for all warehouses within a workspace.
-  Granular user permissions can be further managed via T-SQL.

## Workspace roles

Workspace roles are used for dev team collaboration within a workspace. Role assignment determines the actions available to the user and applies to all artifacts within the workspace.
- For an overview of [!INCLUDE [product-name](../includes/product-name.md)] workspace roles, see [Roles in workspaces](../../roles-workspaces.md).
- For instructions on assigning workspace roles, see [Give Workspace Access](../../get-started/give-access-workspaces.md).

For [!INCLUDE [fabric-se](includes/fabric-se.md)] and [!INCLUDE [fabric-dw](includes/fabric-dw.md)], the workspace roles provide the following capabilities within SQL.

| Workspace role   |  Description |
|---|---|
|Admin|Grants the user CONTROL access for each Warehouse within the workspace, providing them with full read/write permissions and the ability to manage granular user SQL permissions.<br/><br/>Allows the user to see workspace-scoped session, connection and request DMV information and KILL sessions.|
|Member|Grants the user CONTROL access for each Warehouse within the workspace, providing them with full read/write permissions and the ability to manage granular user SQL permissions.|
|Contributor|Grants the user CONTROL access for each Warehouse within the workspace, providing them with full read/write permissions and the ability to manage granular user SQL permissions.|
|Viewer|Grants the user SELECT permission for each Warehouse within the workspace, allowing them to read data from any table/view.|



<Additional Viewer restrictions>

<get rid of this?>
Workspace permissions are best accomplished by membership in Azure role-based access control (RBAC) roles. For more information, see [Workspace roles](workspace-roles.md).

Through the workspace, you can add members to, and remove them from, workspace roles. For a tutorial, see [Manage user access](manage-user-access.md).


## Artifact permissions

In contrast to workspace roles, which apply to all artifacts within a workspace, artifact permissions can be assigned directly to individual artifacts. The user will receive the assigned permission on that single Warehouse. The primary purpose is for sharing for downstream consumption of the Warehouses.
   
There are two ways that the artifact permissions can be assigned:
- Sharing - <note: need to link to sharing page>
- Manage permissions - <note: need to link to manage permissions page>

 
For [!INCLUDE [fabric-se](includes/fabric-se.md)] and [!INCLUDE [fabric-dw](includes/fabric-dw.md)], the following permisions can be assigned.
   
| Artifact permission   |  Description |
|---|---|
|Read|Allows the user to connect to the Warehouse SQL endpoint|
|ReadData|Allows the user to read data from any table/view within the Warehouse. Equivalent of SQL db_datareader or SELECT on all tables/views.|   
|ReadAll|Allows user to read data the raw parquet files in One Lake that can be consumed by Spark|


## Object-level security

Workspace roles and artifact permissions provide an easy way to assign coarse permissions to a user for the entire warehouse. However, in some casees, more granular permissions are needed for a user. To achieve this, standard T-SQL constructs can be used to provide specific permissions to users.

- Granular object-level-security can be managed using GRANT, REVOKE & DENY syntax.
- Users can also be assigned to SQL roles, both custom and built-in database roles. 

Limitations:
- Row-level security is currently not supported
- Dynamic data masking is currently not supported

## Next steps

- [Synapse Data Warehouse in Microsoft Fabric](warehouse.md)
- [Connectivity](connectivity.md)
