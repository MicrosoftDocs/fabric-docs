---
title: The Microsoft Fabric Variable library variable types
description: Understand how to use Variable libraries and what variable types are allowed.
author: billmath
ms.author: billmath
ms.reviewer: Lee
ms.service: fabric
ms.subservice: cicd
ms.topic: concept-article
ms.custom:
ms.date: 08/15/2024
ms.search.form: Introduction to Variable libraries, Variable library types, variable types
#customer intent: As a developer, I want to learn how to use the Variable library item and which variable types exist, so that I can manage my content lifecycle.
---

# Variable names and types (preview)

A Variable library item in Microsoft Fabric contains a list of variables and their default values. It can also contain other value sets holding alternative values.

Each variable in the Variable library has the following properties:

- [Name](#naming-conventions)
- Note (optional) Up to 2,048 characters
- [Type](#variable-types)
- Default value set
- Alternative value sets (optional)

## Naming conventions

### Variable library item name

The name of Variable library item itself must follow these conventions:

- Isn't empty.
- Doesn't have leading or trailing spaces.
- Starts with a letter.
- Can include letters, numbers, underscores, hyphens, and spaces.
- Doesn't exceed 256 characters in length.

The Variable library name is *not* case sensitive.

### Variable name

The name of a variable inside the Variable library must follow these conventions:

- Isn't empty.
- Doesn't have leading or trailing spaces.
- Starts with a letter or an underscore.
- Can include letters, numbers, underscores, and hyphens.
- Doesn't exceed 256 characters in length.

The variable name is *not* case sensitive.

### Value set name

The value set names have the same restrictions as [variable names](#variable-name).

## Variable types

Before you can add a value to a variable, you must define the variable type.
The variables in the Variable library can be any of the following types:

- String: Any character Can be null or empty.
- Boolean: *True* or *False*.
- DateTime: The date and time are represented using **ISO 8601 standard**, yyyy-MM-ddTHH:mm:ss.xxxZ, where:
  - *yyyy-MM-dd* is the four-digit year, followed by the two-digit month, and two-digit day
  - *T* separates the date and the time
  - *HH:mm:ss.xxx* is the two-digit hour in 24-hour format, followed by the two-digit minute, two-digit second, and three-digit millisecond
  - *Z* indicates that the time is in Coordinated Universal Time (UTC)
  For example, 2025-01-14T16:15:20.123Z.
- Number: Any number.
- GUID: Use this type to represent GUIDs.
- Integer: A whole number that can be positive, negative, or zero.

Once a variable has a defined value, if you try to change its type, a consent dialog pops up alerting the user that all the variable values will be reset and that this change could be a breaking change on the consumer item side.

## Alternative value sets

When you create a new value set in a Variable library, the new values are set as pointers to the default values. You can change them to be a fixed value.
If you change the value of a variable in the alternative value set, the alternative value is saved in the value-sets JSON file.
You can change the order the value sets are displayed or change the value of a variable in the alternative value set in this JSON file in Git.

## Considerations and limitations

 [!INCLUDE [limitations](../includes/variable-library-limitations.md)]
