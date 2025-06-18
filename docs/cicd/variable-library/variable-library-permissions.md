---
title: The Microsoft Fabric Variable library permissions
description: Understand who can access Variable libraries and their values.
author: billmath
ms.author: billmath
ms.reviewer: Lee
ms.service: fabric
ms.subservice: cicd
ms.topic: concept-article
ms.custom:
ms.date: 08/15/2024
ms.search.form: Introduction to Variable libraries, Manage Variable libraries, Variable library permissions, variable types
#customer intent: As a developer, I want to learn how to use the Variable library item and who has permission to view and edit them.
---

# Variable library permissions (preview)

This article explains who can access Variable libraries and their values.

## Variable library item permissions

The Microsoft Fabric Variable library permissions are aligned with the Fabric workspace model. Permissions are according to your workspace role, or the Variable library can be shared directly.

Workspace role | Permissions
---------------|------------
Viewer | Can view the Variable library item.
Contributor | Can view, add, edit, and delete the Variable library item.
Member | Can view, add, edit, delete, and reshare the Variable library item.
Admin | Can view, add, edit, delete, and reshare the Variable library item.

To share a Variable library item, go to the item menu in the workspace, and select **Share**. If the user you share the item with doesn't have permission to the workspace, but they have permission to one of the variable's consumer items (for example, a Data pipeline), the Variable library isn't visible or available for use in that Data pipeline.

To set an item as a variable value in a Variable library, you need to have at least read permission for that item. For example, if you want to set the value of a variable to be a lakehouse, you read permission for the lakehouse.

For more information about workspace roles, see [Roles in workspaces in Microsoft Fabric](../../get-started/roles-workspaces.md).

## Variable permissions

There's no permission management at the variable level. Permission for each variable is the same as the permissions for the entire item.
