---
title: Microsoft Fabric Variable Library Permissions
description: Understand who can access variable libraries and their values.
author: billmath
ms.author: billmath
ms.reviewer: Lee
ms.service: fabric
ms.subservice: cicd
ms.topic: concept-article
ms.custom:
ms.date: 08/15/2024
ms.search.form: Introduction to variable libraries, manage variable libraries, variable library permissions, variable types
#customer intent: As a developer, I want to learn how to use variable libraries and who has permission to view and edit them.
---

# Variable library permissions 

This article explains who can access variable libraries and their values.

> [!NOTE]
> The Fabric variable library item is currently in preview.

## Permissions for a variable library item

The Microsoft Fabric variable library permissions are aligned with the Fabric workspace model. Permissions are according to your workspace role, or the variable library can be shared directly.

Workspace role | Permissions
---------------|------------
Viewer | Can view the variable library item
Contributor | Can view, add, edit, and delete the variable library item
Member | Can view, add, edit, delete, and reshare the variable library item
Admin | Can view, add, edit, delete, and reshare the variable library item

To share a variable library item, go to the item menu in the workspace, and then select **Share**. If the user that you share the item with doesn't have permission to the workspace, but has permission to one of the variable's consumer items (for example, a data pipeline), the variable library isn't visible or available for use in that data pipeline.

To set an item as a variable value in a variable library, you need to have at least read permission for that item. For example, if you want to set the value of a variable to be a lakehouse, you need read permission for the lakehouse.

For more information about workspace roles, see [Roles in workspaces in Microsoft Fabric](../../get-started/roles-workspaces.md).

## Variable permissions

There's no permission management at the variable level. Permission for each variable is the same as the permissions for the entire item.
