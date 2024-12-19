---
title: The Microsoft Fabric Variable library variable types
description: Understand how to use Variable libraries and what variable types are allowed.
author: mberdugo
ms.author: monaberdugo
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

- Name
- Note (optional)
- Type
- Default value set
- Alternative value sets value – A pointer to the default value, unless it was changed to be a static/fixed value.

## Naming conventions

### Variable library name

The name of Variable library item itself must follow these conventions:

- Isn't empty.
- Doesn't have leading or trailing spaces.
- Starts with a letter.
- Can include letters, numbers, underscores, hyphens, and spaces.
- Doesn't exceed 256 characters in length.

The Variable library name is *not* case sensitive.

### Name of a variable in the Variable library

The name of a variable inside the Variable library must follow these conventions:

- Isn't empty.
- Doesn't have leading or trailing spaces.
- Starts with a letter or an underscore.
- Can include letters, numbers, underscores, and hyphens.
- Doesn't exceed 256 characters in length.

The variable name is *not* case sensitive.

## Variable types

The variables in the Variable library can be any of the following basic types:

- String: (default) Any char. Can be null or empty.
- Boolean: Gets *true* or *false*.
- DateTime: The date and time are represented using ISO 8601 standard, yyyy-MM-ddTHH:mm:ssZ, where:
  - *yyyy-MM-dd* is the four-digit year, followed by the two-digit month, and two-digit day
  - *T* separates the date and the time
  - *HH:mm:ss* is the two-digit hour in 24-hour format, followed by the two-digit minute, and two-digit second
  - *Z* indicates that the time is in Coordinated Universal Time (UTC)
  For example, 2024-10-14T04:53:54Z.
- Double: A number with decimal points.
- Integer: A whole number that can be positive, negative, or zero
