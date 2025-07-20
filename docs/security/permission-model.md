---
title: Permission model
description: Learn how permissions work in Microsoft Fabric.
author: msmimart
ms.author: mimart
ms.topic: overview
ms.custom:
ms.date: 05/22/2025
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

This table shows a small set of the capabilities each role has. For a full and more detailed list, see [Microsoft Fabric workspace roles](../fundamentals/roles-workspaces.md#roles-in-workspaces-in-microsoft-fabric).

| Capability           | Admin   | Member   | Contributor | Viewer   |
|----------------------|---------|----------|-------------|----------|
| Delete the workspace | &#9989; | &#10060; | &#10060;    | &#10060; |
| Add admins           | &#9989; | &#10060; | &#10060;    | &#10060; |
| Add members          | &#9989; | &#9989;  | &#10060;    | &#10060; |
| Write data           | &#9989; | &#9989;  | &#9989;     | &#10060; |
| Create items         | &#9989; | &#9989;  | &#9989;     | &#10060; |
| Read data            | &#9989; | &#9989;  | &#9989;     | &#9989;  |

## Item permissions

Item permissions are used to control access to individual Fabric items within a workspace. Item permissions are confined to a specific item and don't apply to other items. Use item permissions to control who can view, modify, and manage individual items in a workspace. You can use item permissions to give a user access to a single item in a workspace that they don't have access to.

When you're sharing the item with a user or group, you can configure item permissions. Sharing an item grants the user the read permission for that item by default. Read permissions allow users to see the metadata for that item and view any reports associated with it. However, read permissions don't allow users to access underlying data in SQL or OneLake.

Different Fabric items have different permissions. To learn more about the permissions for each item, see:

* [Semantic model](/power-bi/connect-data/service-datasets-permissions)

* [Warehouse](../data-warehouse/share-warehouse-manage-permissions.md)

* [SQL database](../database/sql/security-overview.md)

* [Data Factory](../data-factory/data-factory-overview.md)

* [Lakehouse](../data-engineering/lakehouse-sharing.md)

* [Data science](../data-science/models-experiments-rbac.md)

* [Real-Time Intelligence](/azure/data-explorer/kusto/management/security-roles)

## Compute permissions

Permissions can also be set within a specific compute engine in Fabric, specifically through the SQL analytics endpoint or in a semantic model. Compute engine permissions enable a more granular data access control, such as table and row level security.

* **SQL analytics endpoint** - The SQL analytics endpoint provides direct SQL access to tables in OneLake, and can have security configured natively through SQL commands. These permissions only apply to queries made through SQL.

* **Semantic model** - Semantic models allow for security to be defined using DAX. Restrictions defined using DAX apply to users querying through the semantic model or Power BI reports built on the semantic model.  

You can find more information in these articles:

* [Row-level security in Fabric data warehousing](../data-warehouse/row-level-security.md)

* [Row-level security (RLS) with Power BI](service-admin-row-level-security.md)

* [Object-level security (OLS)](service-admin-object-level-security.md)

## OneLake permissions (data access roles)

OneLake has its own permissions for governing access to files and folders in OneLake through [OneLake data access roles.](../onelake/security/get-started-data-access-roles.md) OneLake data access roles allow users to create custom roles within a lakehouse and to grant read permissions only to the specified folders when accessing OneLake. For each OneLake role, users can assign users, security groups or grant an automatic assignment based on the workspace role.

Learn more about [OneLake Data Access Control Model](../onelake/security/data-access-control-model.md) and view the how-to guides.

* [How to secure a lakehouse for Data Science teams](../onelake/security/how-to-secure-data-onelake-for-data-science.md)

* [How to secure a lakehouse for Data Warehousing teams](../onelake/security/how-to-secure-data-onelake-for-data-warehousing.md)

* [How to secure data for common data architectures](../onelake/security/how-to-common-data-architectures.md)

## Order of operation

Fabric has three different security levels. A user must have access at each level in order to access the data. Each level evaluates sequentially to determine if a user has access. Security rules such as [Microsoft Information Protection policies](../fundamentals/apply-sensitivity-labels.md) evaluate at a given level to allow or disallow access. The order of operation when evaluating Fabric security is:

1. Entra authentication: Checks if the user is able to authenticate to the Microsoft Entra tenant.
2. Fabric access: Checks if the user can access Microsoft Fabric.
3. Data security: Checks if the user can perform the requested action on a table or file.

## Examples

This section provides two examples of how permissions can be set up in Fabric.

### Example 1: Setting up team permissions

Wingtip Toys is set up with one tenant for the entire organization, and three capacities. Each capacity represents a different region. Wingtip Toys operates in the United States, Europe, and Asia. Each capacity has a workspace for each department in the organization, including the sales department.

The sales department has a manager, a sales team lead, and sales team members. Wingtip Toys also employs one analyst for the entire organization.

The following table shows the requirements for each role in the sales department and how permissions are set up to enable them.

| Role              | Requirement | Setup  |
|-------------------|-------------|--------|
| Manager           | View and modify all content in the sales department in the entire organization | A *member* role for all the sales workspaces in the organization |
| Team lead         | View and modify all content in the sales department in a specific region       | A *member* role for the sales workspace in the region |
| Sales team member | <li>View stats of other sale members in the region</li><li>View and modify his own sales report</li> | <li>*No roles* for any of the sales workspaces</li><li>Access to a specific report that lists the member's sale figures</li> |
| Analyst     | View all content in the sales department in the entire organization       | A *viewer* role for all the sale workspaces in the organization |

Wingtip also has a quarterly report that lists its sales income per sales member. This report is stored in a finance workspace. By using row-level security, the report is set up so that each sales member can only see their own sale figures. Team leads can see the sales figures of all the sale members in their region, and the sales manager can see sale figures of all the sale members in the organization.

### Example 2: Workspace and item permissions

When you share an item, or change its permissions, workspace roles don't change. The example in this section shows how workspace and item permissions interact.

Veronica and Marta work together. Veronica is the owner of a report she wants to share with Marta. If Veronica shares the report with Marta, Marta will be able to access it regardless of the workspace role she has.

Let's say that Marta has a viewer role in the workspace where the report is stored. If Veronica decides to remove Marta's item permissions from the report, Marta will still be able to view the report in the workspace. Marta will also be able to open the report from the workspace and view its content. This is because Marta has view permissions to the workspace.

If Veronica doesn't want Marta to view the report, removing Marta's item permissions from the report isn't enough. Veronica also needs to remove Marta's viewer permissions from the workspace. Without the workspace viewer permissions, Marta won't be able to see that the report exists because she won't be able to access the workspace. Marta will also not be able to use the link to the report, because she doesn't have access to the report.

Now that Marta doesn't have a workspace viewer role, if Veronica decides to share the report with her again, Marta will be able to view it using the link Veronica shares with her, without having access to the workspace.

### Example 3: Power BI App permissions

When sharing Power BI reports, you often want your recipients to only have access to the reports and not to items in the workspace. For this you can use [Power BI apps](/power-bi/consumer/end-user-apps) or share reports directly with users.

Furthermore you can limit viewer access to data using [Row-level security (RLS)](/power-bi/enterprise/service-admin-rls), with RLS you can create roles that have access to certain portions of your data, and limit results returning only what the user's identity can access.

This works fine when using import models as the data is imported in the semantic model and the recipients have access to this as part of the app. With DirectLake the report reads the data directly from the Lakehouse and the report recipient needs to have access to these files in the lake. You can do this in several ways:

* Give `ReadData` [permission on the Lakehouse directly.](../data-engineering/lakehouse-sharing.md)
* [Switch the data source credential](/power-bi/enterprise/directlake-fixed-identity) from Single Sign On (SSO) to a fixed identity that has access to the files in the lake.

Because RLS is defined in the Semantic Model the data will be read first and then the rows will be filtered.

If any security is defined in the SQL analytics endpoint that the report is built on, the queries automatically fall back to DirectQuery mode. If you do not want this default fallback behavior, you can create a new Lakehouse using shortcuts to the tables in the original Lakehouse and not define RLS or OLS in SQL on the new Lakehouse.

## Related content

* [Security fundamentals](../security/security-fundamentals.md)

* [Microsoft Fabric licenses](../enterprise/licenses.md)
