---
title: How to secure data in OneLake for data warehousing
description: Get started with securing your data in OneLake with this overview of the concepts and capabilities.
ms.reviewer: eloldag
ms.author: aamerril
author: aamerril
ms.topic: conceptual
ms.custom:
  - ignite-2023
ms.date: 11/15/2023
---

# How-to secure a lakehouse for Data Warehousing teams

## Introduction

In this article, we provide an overview of how to configure security for a lakehouse in Fabric for use with SQL users. These users could be business analysts consuming data through SQL, report builders, or data engineers creating new tables and views.

## Security features

Microsoft Fabric uses a multi-layer security model with different controls available at different levels in order to provide only the minimum needed permissions. For more information on the different security features available in Fabric, see this [document.](../security/data-access-control-model.md)

The SQL Warehouse and SQL Endpoint also allow for the defining of native SQL security. SQL security uses the full library of T-SQL security constructs to allow for granular access control of tables, views, rows, and columns within an item. For more information on SQL security, see [here.](../../data-warehouse/sql-granular-permissions.md)

The SQL permissions that are configured in the SQL warehouse and endpoint only apply to queries that are executed against the SQL warehouse or endpoint. The underlying data lives in OneLake, but access to OneLake data is controlled separately through [OneLake data access roles.](./get-started-data-access-roles.md) To ensure users with SQL specific permissions don't see data they don't have SQL access to, don't include those users in a OneLake data access role.

## Secure by use case

Security in Microsoft Fabric is optimized around securing data for specific use cases. A use case is a set of users needing specific access and accessing data through a given engine. For SQL scenarios, some common use cases are:

- SQL writers: Users that need to create new tables, view, or write data to existing tables.
- SQL readers: Users that need to read data using SQL queries. They could be accessing the SQL connection directly or through another service like Power BI.

We can then align each use case with the necessary permissions in Fabric.

### SQL Write access

There are two ways for a user to have write access to a SQL warehouse or SQL endpoint. The first is through [Fabric workspace roles.](../security/get-started-security.md/#workspace-permissions) There are three workspace roles that grant write permissions, and each role automatically translates to a corresponding role in SQL that grants equivalent write access. The second way is through read access to the SQL engine but having custom SQL permissions that grant write access to some or all the data.

If a user needs write access to all the SQL warehouses and SQL endpoints in a workspace, assign them to a workspace role. Unless a user needs to assign other users to workspace roles, the Contributor role should be used.

If a user only needs to write to specific SQL warehouses and endpoints, grant them direct access through SQL permissions.

### Read access

There are two ways for a user to have write access to a SQL warehouse or SQL endpoint. The first is through the ReadData permission granted as part of the [Fabric workspace roles.](../security/get-started-security.md/#workspace-permissions). All four workspace roles grant the ReadData permission. The second way is through read access to the SQL engine but having custom SQL permissions that grant read access to some or all the data.

If a user is a member of a Fabric workspace role, they're given the ReadData permission. The ReadData permission maps the user to a SQL role that gives SELECT permissions on all tables in the warehouse or lakehouse. This permission is helpful if a user needs to see all or most of the data in the lakehouse or warehouse. Any SQL deny permissions set on a particular lakehouse or warehouse still apply and limit access to tables. Additionally, row and column level security can be set on tables to restrict access at a granular level.

If a user only needs access to a specific lakehouse or warehouse, the share feature provides access to only the shared item. During the share, users can choose to give only Read permission or Read + ReadData. Giving Read allows the user to connect to the SQL warehouse or endpoint but gives no table access. Granting users the ReadData permissions gives them full read access to all tables in the SQL warehouse or endpoint. In both cases, additional SQL security can be configured to grant or deny access to specific tables. This SQL security can include granular access control such as row or column level security.

### Use with shortcuts

Shortcuts are a OneLake feature that allow for data to be referenced from one location without physically copying the data. Shortcuts are a powerful tool that allow for data from one lakehouse to be easily reused in other locations without making duplicate copies of data.

Warehouses in Fabric don't support shortcuts. However, there is special behavior for how the SQL endpoint for a lakehouse interacts with shortcuts.

All shortcuts in a lakehouse are accessed in a delegated mode when querying through the SQL endpoint. The delegated identity is the Fabric user that owns the lakehouse. By default the owner is the user that created the lakehouse and SQL endpoint. The owner can be changed in select cases and the current owner is displayed in the **Owner** column in Fabric when viewing the item in the workspace item list. The delegated behavior means that a querying user is able to read from shortcut tables if the owner has access to the underlying data, not the user executing the query. The querying user only needs access to select from the shortcut table.

> [!NOTE]
> For example, UserA is the owner of a lakehouse and UserB is running a query on a table that is a shortcut. UserB must first have read access on the table, whether through ReadData or through SQL permissions. In order to see data, the query then checks if UserA has access to the shortcut. If UserA has access, UserB will see the query results. If UserA does not have access, the query will fail.

For lakehouses using the [OneLake data access roles](./get-started-data-access-roles.md) feature, access to a shortcut is determined by whether the SQL endpoint owner has access to see the target lakehouse and read the table through a OneLake data access role.

For lakehouses that are not yet using the [OneLake data access roles](./get-started-data-access-roles.md) feature, shortcut access is determined by whether the SQL endpoint owner has the Read and ReadAll permission on the target path.

## Related content

- [OneLake data access roles (preview)](/security/get-started-data-access-roles.md)
- [OneLake data access control model](../security/data-access-control-model.md)
- [Workspace roles](../get-started/roles-workspaces.md)
- [How to secure data in OneLake for data science](../security/how-to-secure-data-in-onelake-for-data-science.md)
- [Share items](../get-started/share-items.md)
