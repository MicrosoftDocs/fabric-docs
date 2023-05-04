---
title: Workspace roles and permissions in lakehouse
description: Learn how workspace roles and permissions work in lakehouse.
ms.reviewer: snehagunda
ms.author: tvilutis
author: tedvilutis
ms.topic: conceptual
ms.date: 05/23/2023
ms.search.form: Lakehouse Workspace roles Permissions
---

# Workspace roles in Lakehouse
Workspace roles define what user can do with Microsoft Fabric items. Roles can be assigned to individuals or security groups from workspace view. See, [Give users access to workspaces](../get-started/give-access-workspaces.md).

The user can be assigned to the following roles:
- Admin
- Member
- Contributor
- Viewer

In a lakehouse the users with Admin, Member, and Contributor roles can perform all CRUD operations on all data. A user with Viewer role can only read data stored in Tables using [SQL endpoint](lakehouse-sql-endpoint.md).

> [!IMPORTANT]
> When accessing data using SQL endpoint with Viewer role, **make sure SQL access policy is granted to read required tables**. 

## Next steps
- [Roles in workspaces](../get-started/roles-workspaces.md)