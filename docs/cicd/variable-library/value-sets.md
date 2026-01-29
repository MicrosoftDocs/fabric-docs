---
title: Microsoft Fabric Variable Library Value Sets
description: Understand how to use variable libraries value sets and what variable types are allowed.
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

# Value-sets in variable libraries 

Value-sets in a variable library provide alternative sets of values for the defined variables, supporting scenarios such as environment-specific configurations (For example, dev, test, prod), A/B testing, or data source switching within the same workspace. 

Each value-set is created as a collection of pointers to the default variables value, which can be overridden as needed. Only one value-set can be active at a time for a given workspace, and users can easily switch the active set via the UI or [API](/rest/api/fabric/variablelibrary/items/update-variable-library?tabs=HTTP#update-a-variablelibrary-example). 

Value-sets are uniquely named within the library and can be renamed, reordered (only through git or the [update with definition API](/rest/api/fabric/core/items/update-item-definition?tabs=HTTP)), or deleted (with safeguards to prevent deletion of the active set without reassignment). The system tracks changes and enforces size limits to ensure performance, and any modification to value-sets is validated before saving. This structure enables robust configuration management, allowing developers to automate deployments and maintain consistency across multiple environments and stages. 

## Structure and Implementation of Value Sets
The Variable Library item’s definition is structured to support multiple value sets. In the item’s schema (its JSON definition), all variables and their default values are listed in a primary section (often called the "Default values" file in Git). Each additional value set is stored as a separate entity (or file) containing only the variables that differ from the default. In other words, if a variable’s value in a given value set is the same as the default, it isn’t explicitly repeated in that value set’s definition. 

- **Default Value Set:** Always present and contains every variable’s baseline value (along with metadata like name and type). The default values file enumerates all variables with their default (primary) values.

- **Alternate Value Set**: For each additional value set (For example, a "Test" or "Prod" value set), the definition lists only those variables where the value overrides the default. If a variable isn’t listed in a particular value set file, it implicitly uses the default value for that set.

Example: If you have a variable ConnectionString with default value "dev-server", and you create a "Production" value set overriding this to "prod-server", the Default definition will have ConnectionString = "dev-server", and the "Production" value set’s file will contain ConnectionString = "prod-server" (and nothing for variables that remain unchanged). This approach keeps value set definitions lean and highlights only the differences.

### Source Control Representation 
In Fabric’s Git integration, the above schema translates to multiple files under the Variable Library’s folder. By design, each value set is serialized to its own JSON file (named after the value set) containing its overrides, separate from the default values file. For example, a VL item "MyVars" might have:

MyVars_Default.json – all variables’ default values.
MyVars_Prod.json – only variables with values differing for "Prod" stage.
MyVars_Test.json – only variables with values differing for "Test" stage.

This clear separation means you can track changes to each environment’s configuration independently in source control. 

Importantly, the active value set selection isn't part of these definition files – it's stored as item state (a workspace-level setting) so that deploying or importing the item doesn’t overwrite which value set is currently active in a given workspace. (More on active value sets below.)

### Schema and Data Types
Value sets don’t introduce new data types; they hold values of the same types defined by each [variable](variable-types.md). The item definition records each variable’s name, type, default value, and optional note. Complex variable types like [Item reference](item-reference-variable-type.md) have structured schemas (storing IDs), but those values to are represented in each value set using a consistent JSON structure (For example, an item reference stores workspace ID + item ID for that stage’s item). All value set files follow the same schema structure as the default: essentially a mapping of variable names to that set’s values (only including those that diverge from default).



## Naming conventions for value sets

The name of a value set inside a variable library must follow these conventions:

- Isn't empty
- Doesn't have leading or trailing spaces
- Starts with a letter or an underscore
- Can include letters, numbers, underscores, and hyphens
- Doesn't exceed 256 characters in length


After a variable has a defined value, if you try to change its type, a consent dialog appears. The dialog alerts you that all the variable values will be reset and that this change could be a breaking change on the consumer item side.

## Considerations and limitations

[!INCLUDE [limitations](../includes/value-sets-limitations.md)]
