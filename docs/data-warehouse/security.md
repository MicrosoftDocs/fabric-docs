---
title: Secure Your Fabric Data Warehouse
description: Learn more about securing your warehouse in Microsoft Fabric.
author: WilliamDAssafMSFT
ms.author: wiassaf
ms.reviewer: chweb, fresantos
ms.date: 10/15/2025
ms.topic: concept-article
ms.search.form: Warehouse roles and permissions # This article's title should not change. If so, contact engineering.
---

# Secure your Fabric Data Warehouse

**Applies to:** [!INCLUDE [fabric-dw](includes/applies-to-version/fabric-dw.md)]

Fabric Data Warehouse provides an enterprise data warehousing solution, managed entirely and fully integrated within [!INCLUDE [product-name](../includes/product-name.md)]. When storing sensitive and business-critical data, however, you must take steps to maximize the security of your warehouses and the data stored in them.

This article provides guidance on how to best secure your warehouse in [!INCLUDE [product-name](../includes/product-name.md)].

<a id="share-a-warehouse"></a>

## Warehouse access model

[!INCLUDE [product-name](../includes/product-name.md)] permissions and granular SQL permissions work together to govern warehouse access and the user permissions once connected.

- Warehouse connectivity is dependent on being granted the [!INCLUDE [product-name](../includes/product-name.md)] Read permission, at a minimum, for the Warehouse.
- [!INCLUDE [product-name](../includes/product-name.md)] item permissions enable the ability to provide a user with SQL permissions, without needing to grant those permissions within SQL.
- [!INCLUDE [product-name](../includes/product-name.md)] workspace roles provide [!INCLUDE [product-name](../includes/product-name.md)] permissions for all warehouses within a workspace.
- Granular user permissions can be further managed via T-SQL.

### Workspace roles

Workspace roles are used for development team collaboration within a workspace. Role assignment determines the actions available to the user and applies to all items within the workspace.

- For an overview of [!INCLUDE [product-name](../includes/product-name.md)] workspace roles, see [Roles in workspaces in Microsoft Fabric](../fundamentals/roles-workspaces.md).
- For instructions on assigning workspace roles, see [Give users access to workspaces](../fundamentals/give-access-workspaces.md).

For details on the specific Warehouse capabilities provided through workspace roles, see [Workspace roles in Fabric Data Warehouse](workspace-roles.md).

### Item permissions

In contrast to workspace roles, which apply to all items within a workspace, item permissions can be assigned directly to individual warehouses. 

Always follow the principal of least privilege when granting permissions and role memberships. When evaluating the permissions to assign to a user, consider the following guidance:

- If they primarily require read only access, assign them to the Viewer role and grant read access on specific objects through T-SQL. For more information, see [Manage SQL granular permissions](sql-granular-permissions.md).
- Only team members who are currently collaborating on the solution should be assigned to workspace roles Admin, Member, and Contributor, as they provide access to all items within the workspace.
- If they are higher privileged users, assign them to Admin, Member, or Contributor roles. The appropriate role is dependent on the other actions that they need to perform.  
- Other users, who only need access to an individual warehouse or require access to only specific SQL objects, should be given Fabric Item permissions and granted access through SQL to the specific objects.
- You can manage permissions on Microsoft Entra ID groups, as well, rather than adding each specific member. For more information, see [Microsoft Entra authentication as an alternative to SQL authentication in Microsoft Fabric](entra-id-authentication.md).
- Audit user activity in your warehouse with [User audit logs](#user-audit-logs).

For more information on sharing, see [Share your data and manage permissions](share-warehouse-manage-permissions.md).

### Granular security

Workspace roles and item permissions provide an easy way to assign coarse permissions to a user for the entire warehouse. However, in some cases, more granular permissions are needed for a user. To achieve this, standard T-SQL constructs can be used to provide specific permissions to users.

Microsoft Fabric data warehousing supports several data protection technologies that administrators can use to protect sensitive data from unauthorized access. By securing or obfuscating data from unauthorized users or roles, these security features can provide data protection in both a [!INCLUDE [fabric-dw](includes/fabric-dw.md)] and [!INCLUDE [fabric-se](includes/fabric-se.md)] without application changes.

- [Object-level security](#object-level-security) controls access to specific database objects.
- [Column-level security](#column-level-security) prevents unauthorized viewing of columns in tables.
- [Row-level security](#row-level-security) prevents unauthorized viewing of rows in tables, using familiar `WHERE` clause filter predicates.
- [Dynamic data masking](#dynamic-data-masking) prevents unauthorized viewing of sensitive data by using masks to prevent access to complete, such as email addresses or numbers.

#### Object-level security

Object-level security is a security mechanism that controls access to specific database objects, such as tables, views, or procedures, based on user privileges or roles. It ensures that users or roles can only interact with and manipulate the objects they have been granted permissions for, protecting the integrity and confidentiality of the database schema and its associated resources.

For details on the managing granular permissions in SQL, see [SQL granular permissions in Microsoft Fabric](sql-granular-permissions.md).

#### Row-level security

Row-level security is a database security feature that restricts access to individual rows or records within a database table based on specified criteria, such as user roles or attributes. It ensures that users can only view or manipulate data that is explicitly authorized for their access, enhancing data privacy and control.

For details on row-level security, see [Row-level security in Fabric data warehousing](row-level-security.md).

#### Column-level security

Column-level security is a database security measure that limits access to specific columns or fields within a database table, allowing users to see and interact with only the authorized columns while concealing sensitive or restricted information. It offers fine-grained control over data access, safeguarding confidential data within a database.

For details on column-level security, see [Column-level security in Fabric data warehousing](column-level-security.md).

#### Dynamic data masking

Dynamic data masking helps prevent unauthorized viewing of sensitive data by enabling administrators to specify how much sensitive data to reveal, with minimal effect on the application layer. Dynamic data masking can be configured on designated database fields to hide sensitive data in the result sets of queries. With dynamic data masking, the data in the database isn't changed, so it can be used with existing applications since masking rules are applied to query results. Many applications can mask sensitive data without modifying existing queries.

For details on dynamic data masking, see [Dynamic data masking in Fabric data warehousing](dynamic-data-masking.md).

## User audit logs

To track user activity in warehouse and SQL analytics endpoint for meeting regulatory compliance and records managements requirements, a set of audit activities are accessible via Microsoft Purview and PowerShell. 

- You can use user audit logs to identify who is taking what action on your Fabric items. 
- To get started, learn [how to configure SQL audit logs in Fabric Data Warehouse (Preview)](configure-sql-audit-logs.md). 
- You can [track user activities across Microsoft Fabric](../admin/track-user-activities.md). For more information, see the [Operation list](../admin/operation-list.md).

## SQL analytics endpoint security

For more about security in the SQL analytics endpoint, see [OneLake security for SQL analytics endpoints](../onelake/sql-analytics-endpoint-onelake-security.md).

## Customer-managed key (CMK) encryption

You can enhance your security posture by using customer-managed keys (CMK), giving you direct control over the encryption keys that protect your data and metadata. When you enable CMK for a workspace that contains a Fabric Data Warehouse, both OneLake data and warehouse metadata are protected using your Azure Key Vault-hosted encryption keys. For more information, see [Data Encryption in Fabric Data Warehouse](encryption.md).

## Related content

- [Warehouse connectivity in Microsoft Fabric](connectivity.md)
- [Workspace roles in Fabric Data Warehouse](workspace-roles.md)
- [SQL granular permissions in Microsoft Fabric](sql-granular-permissions.md)
