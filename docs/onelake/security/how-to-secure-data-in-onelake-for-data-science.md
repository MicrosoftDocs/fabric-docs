---
title: How to secure data in OneLake for data science
description: How to secure OneLake data for use with Spark and data science tools in Microsoft Fabric
ms.reviewer: eloldag
ms.author: aamerril
author: aamerril
ms.topic: conceptual
ms.custom:
  - ignite-2023
ms.date: 11/15/2023
---

# How-to secure a lakehouse for Data Science teams

## Introduction

In this article, we'll provide an overview of how to configure security for a lakehouse in Fabric for use with data science teams and workloads.

## Security features

Microsoft Fabric uses a multi-layer security model with different controls available at different levels in order to provide only the minimum needed permissions. For more information on the different security features available in Fabric, see this [document.](../security/data-access-control-model.md)

## Secure by use case

Security in Microsoft Fabric is optimized around securing data for specific use cases. A use case is a set of users needing specific access and accessing data through a given engine. For data science scenarios, some example use cases are:

- Spark writers: Users that need to write data to a lakehouse using Spark notebooks.
- Spark readers: Users that need to read data using Spark notebooks.
- Pipeline readers: Users that need to read data from a lakehouse using pipelines.
- Shortcut creators: Users that need to create shortcuts to data in a lakehouse.

We can then align each use case with the necessary permissions in Fabric.

### Write access

For users that need to write data in Fabric, access is controlled via the [Fabric workspace roles.](/get-started-security.md/#workspace-permissions) There are three workspace roles that grant write permissions: Admin, Member, and Contributor. Choose the required role and grant users access to it.

Users with write access aren't restricted by [OneLake data access roles (preview).](/get-started-security.md) Write users can have their access restricted to data through the SQL Analytics endpoint data, but retain full access to the data in OneLake. To restrict access to data for write users, a separate workspace needs to be created for that data.

### Read access

For users that need to read data using pipelines or Spark notebooks, permissions are governed by the Fabric item permissions together with the [OneLake data access roles (preview).](../security/get-started-security.md) The Fabric item permissions govern what items a user can see and how they can access that item. The OneLake data access roles govern what data the user can access through experiences that connect to OneLake. For lakehouses without the OneLake data access roles preview enabled, instead access is governed by the ReadAll item permission and access to OneLake data is granted for the entire lakehouse.

In order to read data, a user first needs access to the lakehouse where that data lives. Granting access to a lakehouse can be done by selecting the **Share** button on a lakehouse either from the workspace page or from within the lakehouse UI. Enter the email addresses or security group for those users and select **Share**. (Leave the Additional permissions boxes unchecked. For lakehouses without the OneLake data access roles preview enabled, check the **Read all OneLake data (ReadAll)**) box.

Next, navigate to the lakehouse and select the **Manage OneLake data access (preview)** button. Using this experience you can create roles that grant users access to see and read from specific folders in the lakehouse. Access to folders is disallowed by default. Users that are added to a role are granted access to the folders covered by that role. For more information, see [OneLake data access roles (preview).](../security/get-started-data-access-roles.md) Create roles as needed to grant users access to read the folders through pipelines, shortcuts, or Spark notebooks.

> [!IMPORTANT]
> All lakehouses using the OneLake data access roles preview have a DefaultReader role that grants access to the lakehouse data. If a user has the ReadAll permission, they will not be restricted by other data access roles. Make sure that any users that are included in a data access role are not also part of the DefaultReader role or remove the DefaultReader role.

### Use with shortcuts

Shortcuts are a OneLake feature that allow for data to be referenced from one location without physically copying the data. For more information on shortcuts, see the document [here.](../onelake-shortcuts.md)

You can secure data for use with shortcuts just like any other folder in OneLake. After configuring the data access roles, users from other lakehouses will only be able to create shortcuts to folders they have access to. This can be used to give users in other workspaces access to only select data in a lakehouse.

> [!IMPORTANT]
> SQL Analytics Endpoint uses a fixed identity for accessing shortcuts. When a user queries a shortcut table through SQL Analytics Endpoint, the identity of the lakehouse owner is checked for access to the shortcut. This means that when creating shortcuts for use with SQL queries, the lakehouse creator also needs to be part of any OneLake data access roles that are restricting access to only selected folders.

## Related content

- [OneLake data access roles (preview)](/get-started-data-access-roles.md)
- [OneLake data access control model](../security/data-access-control-model.md)
- [Workspace roles](/get-started/roles-workspaces.md)
- [Share items](../../get-started/share-items.md)