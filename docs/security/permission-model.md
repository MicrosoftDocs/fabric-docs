---
title: Permission model
description: Learn how permissions work in Microsoft Fabric.
author: KesemSharabi
ms.author: kesharab
ms.topic: overview
ms.date: 03/11/2024
---

# Permission model

Microsoft Fabric has a flexible permission model that allows you to control access to data in your organization. This article explains the different types of permissions in Fabric and how they work together to control access to data in your organization.

A workspace is a logical entity for grouping items in Fabric. Workspace roles define access permissions for workspaces. Although items are stored in one workspace, they can be shared with other users across Fabric. When you share Fabric items, you can decide which permissions to grant the user you're sharing the item with. Certain items such as Power BI reports, allow even more granular control of data. Reports can be set up so that depending on their permissions, users who view them only see a portion of the data they hold.

## Workspace roles

Workspace roles are used to control access to workspaces and the content within them. A Fabric administrator can assign workspace roles to individual users or groups. Workspace roles are confined to a specific workspace and don't apply to other workspaces, the capacity the workspace is in, or the tenant.

There are four Workspace roles and they apply to all items within the workspace. Users that don't have any of these roles, can't access the workspace. The roles are:

* **Viewer** - Can view all content in the workspace, but can't modify it.

* **Contributor** - Can view and modify all content in the workspace.

* **Member** - Can view, modify, and share all content in the workspace.

* **Admin** - Can view, modify, share, and manage all content in the workspace, including managing permissions.

This table shows a small set of the capabilities each role has. For a full and more detailed list, see [Microsoft Fabric workspace roles](../get-started/roles-workspaces.md#roles-in-workspaces-in-microsoft-fabric).

| Capability   | Admin   | Member   | Contributor | Viewer   |
|--------------|---------|----------|-------------|----------|
| Add admins   | &#9989; | &#10060; | &#10060;    | &#10060; |
| Add members  | &#9989; | &#9989;  | &#10060;    | &#10060; |
| Write data   | &#9989; | &#9989;  | &#9989;     | &#10060; |
| Create items | &#9989; | &#9989;  | &#9989;     | &#10060; |
| Read data    | &#9989; | &#9989;  | &#9989;     | &#9989;  |

## Item permissions

Item permissions are used to control access to individual Fabric items within a workspace. Item permissions are confined to a specific item and don't apply to other items. Use item permissions to control who can view, modify, and manage individual items in a workspace. You can use item permissions to give a user access to a single item in a workspace that they don't have access to.

When you're sharing the item with a user or group, you can configure item permissions. Sharing an item grants the user the read permission for that item by default. Read permissions allow users to see the metadata for that item and view any reports associated with it. However, read permissions don't allow users to access underlying data in SQL or OneLake.

Different Fabric items have different permissions. To learn more about the permissions for each item, see:

* [Semantic model](/power-bi/connect-data/service-datasets-permissions)

* [warehouse](../data-warehouse/share-warehouse-manage-permissions.md)

* [Data Factory](../data-factory/concepts-roles-permissions.md)

* [lakehouse](../data-engineering/lakehouse-sharing.md)

* [Data science](../data-science/models-experiments-rbac.md)

* [Real-Time Analytics](/azure/data-explorer/kusto/management/security-roles)

## Compute permissions

Permissions can also be set within a specific compute engine in Fabric, specifically through the SQL endpoint or in a semantic model. Compute engine permissions enable a more granular data access control, such as table and row level security.

* **SQL endpoint** - The SQL endpoint provides direct SQL access to tables in OneLake, and can have security configured natively through SQL commands. These permissions only apply to queries made through SQL.

* **Semantic model** - Semantic models allow for security to be defined using DAX. Restrictions defined using DAX apply to users querying through the semantic model or Power BI reports built on the semantic model.  

You can find more information in these articles:

* [Row-level security in Fabric data warehousing](../data-warehouse/row-level-security.md)

* [Row-level security (RLS) with Power BI](/power-bi/enterprise/service-admin-rls)

* [Object level security (OLS)](/power-bi/enterprise/service-admin-ols)

## Example

Wingtip Toys is set up with one tenant for the entire organization, and three capacities. Each capacity represents a different region. Wingtip Toys operates in the United States, Europe, and Asia. Each capacity has a workspace for each department in the organization, including the sales department.

The sales department has a manager, a sales team lead, and sales team members. Wingtip Toys also employs one analyst for the entire organization.

The following table shows the requirements for each role in the sales department and how permissions are set up to enable them.

| Role              | Requirement | Setup  |
|-------------------|-------------|--------|
| Manager           | View and modify all content in the sales department in the entire organization | A *member* role for all the sales workspaces in the organization |
| Team lead         | View and modify all content in the sales department in a specific region       | A *member* role for the sales workspace in the region |
| Sales team member | <li>View stats of other sale members in the region</li><li>View and modify his own sales report</li> | <li>*No roles* for any of the sales workspaces</li><li>Access to a specific report that lists the member's sale figures</li> |
| Analyst     | View all content in the sales department in the entire organization       | A *viewer* role for all the sale workspaces in the organization |

Wingtip also has a quarterly report that lists its sales income per sales member. This report is stored in a finance workspace. Using row-level security, the report is set up so that each sales member can only see their own sale figures. Team leads can see the sales figures of all the sale members in their region, and the sales manager can see sale figures of all the sale members in the organization.

## Related content

* [Security fundamentals](../security/security-fundamentals.md)

* [Microsoft Fabric licenses](../enterprise/licenses.md)
