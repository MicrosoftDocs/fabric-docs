---
title: Security for data warehousing
description: Learn more about securing the SQL analytics endpoint and Warehouse in Microsoft Fabric.
author: WilliamDAssafMSFT
ms.author: wiassaf
ms.reviewer: cynotebo
ms.date: 04/24/2024
ms.service: fabric
ms.subservice: data-warehouse
ms.topic: overview
ms.custom:
  - build-2023
  - ignite-2023
ms.search.form: Warehouse roles and permissions # This article's title should not change. If so, contact engineering.
---

# Security for data warehousing in Microsoft Fabric

**Applies to:** [!INCLUDE [fabric-se-dw](includes/applies-to-version/fabric-se-and-dw.md)]

This article covers security topics for securing the [!INCLUDE [fabric-se](includes/fabric-se.md)] of the lakehouse and the [!INCLUDE [fabric-dw](includes/fabric-dw.md)] in [!INCLUDE [product-name](../includes/product-name.md)].

For information on [!INCLUDE [product-name](../includes/product-name.md)] security, see [Security in Microsoft Fabric](../security/security-overview.md).

For information on connecting to the [!INCLUDE [fabric-se](includes/fabric-se.md)] and [!INCLUDE [fabric-dw](includes/fabric-dw.md)], see [Connectivity](connectivity.md).

## Warehouse access model

[!INCLUDE [product-name](../includes/product-name.md)] permissions and granular SQL permissions work together to govern Warehouse access and the user permissions once connected.

- Warehouse connectivity is dependent on being granted the [!INCLUDE [product-name](../includes/product-name.md)] Read permission, at a minimum, for the Warehouse.
- [!INCLUDE [product-name](../includes/product-name.md)] item permissions enable the ability to provide a user with SQL permissions, without needing to grant those permissions within SQL.
- [!INCLUDE [product-name](../includes/product-name.md)] workspace roles provide [!INCLUDE [product-name](../includes/product-name.md)] permissions for all warehouses within a workspace.
- Granular user permissions can be further managed via T-SQL.

### Workspace roles

Workspace roles are used for development team collaboration within a workspace. Role assignment determines the actions available to the user and applies to all items within the workspace.

- For an overview of [!INCLUDE [product-name](../includes/product-name.md)] workspace roles, see [Roles in workspaces](../get-started/roles-workspaces.md).
- For instructions on assigning workspace roles, see [Give workspace access](../get-started/give-access-workspaces.md).

For details on the specific Warehouse capabilities provided through workspace roles, see [Workspace roles in Fabric data warehousing](workspace-roles.md).

### Item permissions

In contrast to workspace roles, which apply to all items within a workspace, item permissions can be assigned directly to individual Warehouses. The user will receive the assigned permission on that single Warehouse. The primary purpose for these permissions is to enable sharing for downstream consumption of the Warehouse.

For details on the specific permissions provided for warehouses, see [Share your warehouse and manage permissions](share-warehouse-manage-permissions.md).

### Granular security

Workspace roles and item permissions provide an easy way to assign coarse permissions to a user for the entire warehouse. However, in some cases, more granular permissions are needed for a user. To achieve this, standard T-SQL constructs can be used to provide specific permissions to users.

Microsoft Fabric data warehousing supports several data protection technologies that administrators can use to protect sensitive data from unauthorized access. By securing or obfuscating data from unauthorized users or roles, these security features can provide data protection in both a [!INCLUDE [fabric-dw](includes/fabric-dw.md)] and [!INCLUDE [fabric-se](includes/fabric-se.md)] without application changes.

- [Object-level security](#object-level-security) controls access to specific database objects.
- [Column-level security](#column-level-security) prevents unauthorized viewing of columns in tables.
- [Row-level security](#row-level-security) prevents unauthorized viewing of rows in tables, using familiar `WHERE` clause filter predicates.
- [Dynamic data masking](#dynamic-data-masking) prevents unauthorized viewing of sensitive data by using masks to prevent access to complete, such as email addresses or numbers.

#### Object-level security

Object-level security is a security mechanism that controls access to specific database objects, such as tables, views, or procedures, based on user privileges or roles. It ensures that users or roles can only interact with and manipulate the objects they have been granted permissions for, protecting the integrity and confidentiality of the database schema and its associated resources.

For details on the managing granular permissions in SQL, see [SQL granular permissions](sql-granular-permissions.md).

#### Row-level security

Row-level security is a database security feature that restricts access to individual rows or records within a database table based on specified criteria, such as user roles or attributes. It ensures that users can only view or manipulate data that is explicitly authorized for their access, enhancing data privacy and control.

For details on row-level security, see [Row-level security in Fabric data warehousing](row-level-security.md).

#### Column-level security

Column-level security is a database security measure that limits access to specific columns or fields within a database table, allowing users to see and interact with only the authorized columns while concealing sensitive or restricted information. It offers fine-grained control over data access, safeguarding confidential data within a database.

For details on column-level security, see [Column-level security in Fabric data warehousing](column-level-security.md).

#### Dynamic data masking

Dynamic data masking helps prevent unauthorized viewing of sensitive data by enabling administrators to specify how much sensitive data to reveal, with minimal effect on the application layer. Dynamic data masking can be configured on designated database fields to hide sensitive data in the result sets of queries. With dynamic data masking, the data in the database isn't changed, so it can be used with existing applications since masking rules are applied to query results. Many applications can mask sensitive data without modifying existing queries.

For details on dynamic data masking, see [Dynamic data masking in Fabric data warehousing](dynamic-data-masking.md).

## Share a warehouse

Sharing is a convenient way to provide users read access to your [!INCLUDE [fabric-dw](includes/fabric-dw.md)] for downstream consumption. Sharing allows downstream users in your organization to consume a [!INCLUDE [fabric-dw](includes/fabric-dw.md)] using SQL, Spark, or Power BI. You can customize the level of permissions that the shared recipient is granted to provide the appropriate level of access.

For more information on sharing, see [How to share your warehouse and manage permissions](share-warehouse-manage-permissions.md).

## Guidance on user access

When evaluating the permissions to assign to a user, consider the following guidance:

- Only team members who are currently collaborating on the solution should be assigned to Workspace roles (Admin, Member, Contributor), as this provides them access to all Items within the workspace.
- If they primarily require read only access, assign them to the Viewer role and grant read access on specific objects through T-SQL.  For more information, see [Manage SQL granular permissions](sql-granular-permissions.md).
- If they are higher privileged users, assign them to Admin, Member or Contributor roles. The appropriate role is dependent on the other actions that they will need to perform.  
- Other users, who only need access to an individual warehouse or require access to only specific SQL objects, should be given Fabric Item permissions and granted access through SQL to the specific objects.
- You can manage permissions on Microsoft Entra ID (formerly Azure Active Directory) groups, as well, rather than adding each specific member.

## Related content

- [Connectivity](connectivity.md)
- [SQL granular permissions in Microsoft Fabric](sql-granular-permissions.md)
- [How to share your warehouse and manage permissions](share-warehouse-manage-permissions.md)
