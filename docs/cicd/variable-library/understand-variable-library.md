---
title: The Microsoft Fabric variable library
description: Understand how variable libraries are used in the Fabric Application lifecycle management (ALM) tool.
author: mberdugo
ms.author: monaberdugo
ms.reviewer: Lee
ms.service: fabric
ms.subservice: cicd
ms.topic: concept-article
ms.custom:
ms.date: 08/15/2024
ms.search.form: Introduction to Deployment pipelines, Manage access in Deployment pipelines, Deployment pipelines operations
#customer intent: As a developer, I want to learn how to use the variable library item in the Microsoft Fabric Application lifecycle management (ALM) tool, so that I can manage my content lifecycle.
---

# Understanding variable libraries in Microsoft Fabric (preview)

This article describes important concepts and features of the variable library in the Fabric Application lifecycle management (ALM) tool.

## Variable library structure

A variable library item contains a list of variables and their default values. It can also contain other value sets holding alternative values.

Each variable is defined as follows:

- Name
- Note (optional)
- Type
- Default value set
- Alternative value sets value – A pointer to the default value, unless it was changed to be a static/fixed value.

### Naming conventions

#### Variable library name

The name of Variable library item itself must follow these conventions:

- Isn't empty.
- Doesn't have leading or trailing spaces.
- Starts with a letter.
- Can include letters, numbers, underscores, hyphens, and spaces.
- Doesn't exceed 256 characters in length.

The variable library name is *not* case sensitive.

#### Name of a variable in the variable library

The name of a variable inside the variable library must follow these conventions:

- Isn't empty.
- Doesn't have leading or trailing spaces.
- Starts with a letter or an underscore.
- Can include letters, numbers, underscores, and hyphens.
- Doesn't exceed 256 characters in length.

The variable name is *not* case sensitive.

### Variable types

The variables in the variable library can be any of the following basic types:

- String: (default) Any char. Can be null or empty.
- Boolean: Gets *true* or *false*.
- DateTime: The date and time are represented using ISO 8601 standard, yyyy-MM-ddTHH:mm:ssZ, where:
  - *yyyy* is the four-digit year, *MM* is the two-digit month, *dd* is the two-digit day
  - *T* separates the date and the time
  - *HH* is the two-digit hour in 24-hour format, mm is the two-digit minute, ss is the two-digit second
  - *Z* indicates that the time is in Coordinated Universal Time (UTC)
  For example, 2024-10-14T04:53:54Z.
- Double: A number with decimal points.
- Integer: A whole number that can be positive, negative, or zero
- Array: An array of type string in this format [value1, value2, …]. Can be empty or null.

## Permissions

### Variable library item permissions

Permissions are aligned with the fabric permission model:

- Workspace permissions
- Viewer permissions: Someone with viewer permissions can Add/Edit/Delete, but not save their changes. Viewer can also see available variables for reference on a consumer item with all their details and referred variables values.
- Contributor/Member/Admin permissions: In general, CRUD permissions. See [workspace roles](../../get-started/roles-workspaces.md) for more information.

### Variable permissions

There's no permission management in an item level or a variable level. Permission for each variable is the same as the permissions for the entire item.

## Supported items

The following items support the variable library:

- Lakehouse
- Data pipeline
- Notebook

## Related content

- [End to end lifecycle management tutorial](../cicd-tutorial.md)
- [Learn to use the variable library](./get-started-with-variable-libraries.md)
