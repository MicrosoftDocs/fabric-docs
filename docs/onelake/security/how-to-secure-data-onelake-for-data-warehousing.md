---
title: How to secure data in OneLake for data warehousing
description: Learn how to secure OneLake data in a lakehouse to query with data warehousing T-SQL queries.
author: aamerril
ms.author: aamerril
ms.reviewer: eloldag, wiassaf
ms.date: 06/05/2024
ms.topic: concept-article
ms.custom:
#customer intent: As a data engineer, I want to understand how to secure a lakehouse in Fabric for data warehousing so that I can ensure the data is protected and accessible only to authorized users.
---

# How to secure a lakehouse for Data Warehousing teams

## Introduction

In this article, we provide an overview of how to configure security for a lakehouse in Fabric for use with SQL users with T-SQL queries. These users could be business analysts consuming data through SQL, report builders, or data engineers creating new tables and views.

## Security features

Microsoft Fabric uses a multi-layer security model with different controls available at different levels in order to provide only the minimum needed permissions. For more information on the different security features available in Fabric, see [Data Access Control Model in OneLake](./data-access-control-model.md).

In the Fabric Data Warehouse workload, the warehouse and SQL analytics endpoint items also allow for the defining of native SQL security. SQL security uses the full library of T-SQL security constructs to allow for granular access control of tables, views, rows, and columns within an item. For more information on SQL security, see [SQL granular permissions](../../data-warehouse/sql-granular-permissions.md).

The SQL permissions that are configured in the warehouse or SQL analytics endpoint only apply to queries that are executed against the warehouse or SQL analytics endpoint. The underlying data lives in OneLake, but access to OneLake data is controlled separately through [OneLake data access roles](./get-started-onelake-security.md). To ensure users with SQL specific permissions don't see data they don't have SQL access to, don't include those users in a OneLake data access role.

## Secure by use case

Security in Microsoft Fabric is optimized around securing data for specific use cases. A use case is a set of users needing specific access and accessing data through a given engine. For SQL scenarios, some common use cases are:

- SQL writers: Users that need to create new tables, view, or write data to existing tables.
- SQL readers: Users that need to read data using SQL queries. They could be accessing the SQL connection directly or through another service like Power BI.

We can then align each use case with the necessary permissions in Fabric.

### SQL write access

There are two ways for a user to be granted write access to a warehouse or SQL analytics endpoint:

- Through [Fabric workspace roles](./get-started-security.md#workspace-permissions), you can grant membership to three workspace roles that grant write permissions. Each role automatically translates to a corresponding role in SQL that grants equivalent write access.
- Grant read access to the SQL engine, and grant custom SQL permissions to write to some or all the data.

If a user needs write access to all the warehouses or SQL analytics endpoints in a workspace, assign them to a workspace role. Unless a user needs to assign other users to workspace roles, the Contributor role should be used.

If a user only needs to write to specific warehouses or SQL analytics, grant them direct access through SQL permissions.

<a id="read-access"></a>

### SQL read access

There are two ways for a user to be granted read access to a warehouse or SQL analytics endpoint:

- Grant read access through the ReadData permission, granted as part of the [Fabric workspace roles](./get-started-security.md#workspace-permissions). All four workspace roles grant the ReadData permission.
- Grant read access to the SQL engine, and grant custom SQL permissions to read to some or all the data.

If a user is a member of a Fabric workspace role, they're given the ReadData permission. The ReadData permission maps the user to a SQL role that gives SELECT permissions on all tables in the warehouse or lakehouse. This permission is helpful if a user needs to see all or most of the data in the lakehouse or warehouse. Any SQL DENY permissions set on a particular lakehouse or warehouse still apply and limit access to tables. Additionally, row and column level security can be set on tables to restrict access at a granular level.

If a user only needs access to a specific lakehouse or warehouse, the share feature provides access to only the shared item. During the share, users can choose to give only Read permission or Read + ReadData. Granting Read permission allows the user to connect to the warehouse or SQL analytics endpoint but gives no table access. Granting users the ReadData permissions gives them full read access to all tables in the warehouse or SQL analytics endpoint. In both cases, additional SQL security can be configured to grant or deny access to specific tables. This SQL security can include granular access control such as row or column level security.

### Use with shortcuts

Shortcuts are a OneLake feature that allows for data to be referenced from one location without physically copying the data. Shortcuts are a powerful tool that allows for data from one lakehouse to be easily reused in other locations without making duplicate copies of data.

Warehouses in Fabric don't support shortcuts. However, there is special behavior for how the SQL analytics endpoint for a lakehouse interacts with shortcuts.

All shortcuts in a lakehouse are accessed in a delegated mode when querying through the SQL analytics endpoint. The delegated identity is the Fabric user that owns the lakehouse. By default the owner is the user that created the lakehouse and SQL analytics endpoint. The owner can be changed in select cases and the current owner is displayed in the **Owner** column in Fabric when viewing the item in the workspace item list. The delegated behavior means that a querying user is able to read from shortcut tables if the owner has access to the underlying data, not the user executing the query. The querying user only needs access to select from the shortcut table.

> [!NOTE]
> For example, UserA is the owner of a lakehouse and UserB is running a query on a table that is a shortcut. UserB must first have read access on the table, whether through ReadData or through SQL permissions. In order to see data, the query then checks if UserA has access to the shortcut. If UserA has access, UserB will see the query results. If UserA does not have access, the query will fail.

For lakehouses using the [OneLake data access roles](./get-started-onelake-security.md) feature, access to a shortcut is determined by whether the SQL analytics endpoint owner has access to see the target lakehouse and read the table through a OneLake data access role.

For lakehouses that are not yet using the [OneLake data access roles](./get-started-onelake-security.md) feature, shortcut access is determined by whether the SQL analytics endpoint owner has the Read and ReadAll permission on the target path.

## Related content

- [OneLake data access roles (preview)](./get-started-onelake-security.md)
- [OneLake data access control model](./data-access-control-model.md)
- [Workspace roles](../../fundamentals/roles-workspaces.md)
- [How to secure data in OneLake for data science](./how-to-secure-data-onelake-for-data-science.md)
- [Share items](../../fundamentals/share-items.md)
- [Security for data warehousing in Microsoft Fabric](../../data-warehouse/security.md)
