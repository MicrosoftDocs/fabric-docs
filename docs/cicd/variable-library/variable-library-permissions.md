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

## Variable library item permissions

Permissions are aligned with the fabric permission model:

- Workspace permissions
- Viewer permissions: Someone with viewer permissions can Add/Edit/Delete, but not save their changes. Viewer can also see available variables for reference on a consumer item with all their details and referred variables values.
- Contributor/Member/Admin permissions: In general, CRUD permissions. See [workspace roles](../../get-started/roles-workspaces.md) for more information.

## Variable permissions

There's no permission management in an item level or a variable level. Permission for each variable is the same as the permissions for the entire item.
