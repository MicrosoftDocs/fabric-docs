---
title: Microsoft Fabric Variable Library variable types
description: Understand how to use variable librarie's variables and what variable types are allowed.
author: billmath
ms.author: billmath
ms.reviewer: Lee
ms.service: fabric
ms.subservice: cicd
ms.topic: concept-article
ms.custom:
ms.date: 08/15/2024
ms.search.form: Introduction to variable libraries, variable library types, variable types
#customer intent: As a developer, I want to learn how to use variable libraries and which variable types exist, so that I can manage my content lifecycle.
---

# Variable types in variable libraries

A variable library in Microsoft Fabric is a specialized item that centralizes the definition and management of variables, enabling scalable and automated configuration across workspaces and items. 

Variables within a variable library can be a basic or advanced types, and each variable is uniquely identified by its name within the library item.

- **Basic** variable types in the Variable Library include simple, data types such as Boolean, DateTime (in ISO 8601 UTC format), Guid, Integer, Number, and String. These are straightforward values that can be directly assigned and used across different stages and environments. 
- **Advanced** variable types are designed for more sophisticated use cases, such as referencing internal Fabric items or external connections. These include "item reference" types which store workspace and item IDs to point to specific Fabric items.

## Supported types in variable libraries

Variables within a variable library have the following supported variable types

|TypeType|Category|Description|
|-----|-----|-----|
|Boolean|Basic|Represents true/false values.|
|Integer|Basic|Whole numbers without decimals.|
|Number|Basic|Numeric values, including decimals.|
|String|Basic|Text values or sequences of characters.|
|DateTime|Basic|Date and time represented as the ISO 8601 standard *yyyy-MM-ddTHH:mm:ss.xxxZ*, where:</br></li> *yyyy-MM-dd* is the four-digit year, followed by the two-digit month and two-digit day.</br></li>*T* separates the date and the time. </br></li>*HH:mm:ss.xxx* is the two-digit hour in 24-hour format, followed by the two-digit minute, two-digit second, and three-digit millisecond.</br></li>*Z* indicates that the time is in Coordinated Universal Time (UTC).|
|Guid|Basic|Globally unique identifier used for distinct object identification.|
|[Item reference](item-reference-variable-type.md)|Advanced|Used within the Fabric Variable Library to hold a reference to an existing Fabric item—such as a lakehouse, notebook, or data pipeline, by storing its workspace ID and item ID.|


### Variable properties
Each variable in the variable library has the following properties:

|Property|Description|
|-----|-----|
|Name|The unique identifier for the variable. Used to reference the variable in scripts or workflows.|
|Note (optional)|A descriptive comment or annotation about the variable. Can include context, usage notes, or special instructions. Maximum length: 2,048 characters.|
|Type|Defines the data type of the variable (e.g., string, integer, boolean, array). Determines how the value is interpreted and validated.|
|Default value set|The initial value assigned to the variable when no other value is provided. Ensures consistent behavior in workflows. The default value set cannot be renamed.|
|[Alternative value sets (optional)](value-sets.md)|Additional predefined sets of values that can be applied under specific conditions or scenarios. Useful for environment-specific configurations or fallback options.|

## Naming conventions

### Variable name

The name of a variable inside the variable library must follow these conventions:

- Isn't empty
- Doesn't have leading or trailing spaces
- Starts with a letter or an underscore
- Can include letters, numbers, underscores, and hyphens
- Doesn't exceed 256 characters in length

The variable name is *not* case sensitive.


After a variable has a defined value, if you try to change its type, a consent dialog appears. The dialog alerts you that all the variable values will be reset and that this change could be a breaking change on the consumer item side.

## Considerations and limitations

[!INCLUDE [limitations](../includes/variables-limitations.md)]
