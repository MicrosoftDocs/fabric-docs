---
title: The Microsoft Fabric Variable library permissions
description: Understand who can access Variable libraries and their values.
author: mberdugo
ms.author: monaberdugo
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

The Microsoft Fabric Variable library permissions are aligned with the Fabric workspace model. This article explains who can access Variable libraries and their values.

## Variable library item permissions

Permissions are aligned with the fabric permission model:

Workspace permissions: Viewer, contributor, member, and admin permissions are supported.

Anyone who is a contributor or above can add,edit, and delete. For more information about workspace roles, see [Roles in workspaces in Microsoft Fabric](../../get-started/roles-workspaces.md).

## Variable permissions

There's no permission management in an item level or a variable level. Permission for each variable is the same as the permissions for the entire item.
