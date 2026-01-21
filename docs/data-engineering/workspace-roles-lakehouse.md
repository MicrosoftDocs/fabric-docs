---
title: Workspace roles and permissions in lakehouse
description: Learn how workspace roles and permissions work in your Microsoft Fabric lakehouse, including what roles are available.
ms.reviewer: tvilutis
ms.author: eur
author: eric-urban
ms.topic: concept-article
ms.custom:
ms.date: 09/22/2025
ms.search.form: Lakehouse Workspace roles Permissions
---

# Workspace roles in Lakehouse

Workspace roles define what users can do with Microsoft Fabric items. Roles can be assigned to individuals or security groups from workspace view. For more information about how to manage workspace roles, see [Give users access to workspaces](../fundamentals/give-access-workspaces.md).

## Lakehouse workspace roles and item-specific functions

A user can be assigned to the following roles:

* Admin
* Member
* Contributor
* Viewer

In a lakehouse, the users with *Admin*, *Member*, and *Contributor* roles can perform all CRUD (create, read, update, and delete) operations on all data. A user with the *Viewer* role can only read data stored in tables using the [SQL analytics endpoint](lakehouse-sql-analytics-endpoint.md).

> [!IMPORTANT]
> When accessing data using the SQL analytics endpoint with *Viewer* role, make sure the SQL access policy is granted to read required tables.

The following matrix shows which actions each workspace role can perform on lakehouse items:

| Role        | Create | Read | Update | Delete |
|-------------|:------:|:----:|:------:|:------:|
| Admin       |   ✔    |  ✔   |   ✔    |   ✔    |
| Member      |   ✔    |  ✔   |   ✔    |   ✔    |
| Contributor |   ✔    |  ✔   |   ✔    |   ✔    |
| Viewer      |        |  ✔<sup>1</sup>  |        |        |

<sup>1</sup> Viewer can only read data stored in tables using the SQL analytics endpoint provided SQL access policy is granted.

## Related content

- [Roles in workspaces](../fundamentals/roles-workspaces.md)
- [OneLake data access permissions](../onelake/security/get-started-onelake-security.md)
- [Fabric and OneLake Security](../onelake/security/fabric-onelake-security.md)
