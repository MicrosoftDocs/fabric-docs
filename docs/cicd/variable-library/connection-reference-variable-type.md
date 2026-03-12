---
title: Variable library connection reference
description: Learn how to use a Microsoft Fabric connection reference variables with variable libraries.
author: billmath
ms.author: billmath
ms.service: fabric
ms.subservice: cicd
ms.topic: overview
ms.date: 02/18/2026

#customer intent: As a developer, I want to learn how to use a Fabric application lifecycle management (ALM) variable library to customize my release stages, so that I can manage my content lifecycle.
---


# Connection reference variable type (preview)
A connection reference variable is a workspace variable that stores the ID of an [external data connection (For example, Snowflake, Azure SQL)](../../data-factory/data-source-management.md), allowing items to reference external resources without embedding credentials or connection strings. 

## How to use
A connection reference variable can be used just like other variables in a variable library.

1. Sign in to Microsoft Fabric
2. Navigate to your workspace and variable library
3. At the top, select **+ New Variable**
4. Provide a name for the variable, select **connection reference** for the type, and then click the **...** to select a value
 
 :::image type="content" source="media/connection-reference/connection-2.png" alt-text="Screenshot of the items available for the connection reference." lightbox="media/connection-reference/connection-2.png":::
5. Once selected, your connection reference should be ready to use.
 
  :::image type="content" source="media/connection-reference/connection-1.png" alt-text="Screenshot of the connection reference." lightbox="media/connection-reference/connection-1.png":::

If you need to edit a connection reference or need to double-check the value, you can right-click on the value to bring up a pop-up with information about the connection reference.

 :::image type="content" source="media/connection-reference/connection-3.png" alt-text="Screenshot of the connection reference pop-up." lightbox="media/connection-reference/connection-3.png":::

## How it works
A connection reference variable's value is a static pointer to a connection object identified by its connection ID. The value is stored as a string corresponding to the target connection’s ID. For example:

 ConnectionID = aaaaaaaa-0000-1111-2222-bbbbbbbbbbbb

 This ID uniquely identifies the referenced connection. The static reference doesn't automatically adjust to different deployment environments. It requires the target connection to exist at the time of selection and remains pointed to that specific connection unless manually changed.

Keep in mind the following when working with connection references:

- Stores a pre-defined connection identifier at the tenant level.
- Connection references don't auto-bind during deployment. Their values remain fixed across environments.
- Supports CI/CD and automation by parameterizing external connections for different environments (dev, test, prod).
- Enables dynamic configuration of external relationships (For example, switching data sources or credentials per environment).
- Values are chosen via a UI dialog, not free text, ensuring only authorized connections are selectable.
- Only connections with at least read permissions are available for selection.

## Representation in Git and APIs
A Connection reference is an advanced variable type whose value schema stores the connectionId (and the platform resolves/display metadata). The authoring payload includes:

- name: the displayName of the connection reference variable
- type: "connectionReference" (advanced type)
- value: per value‑set, each value stores { "connectionId": "&lt;GUID/ID string&gt;" }


Example:

```json

  {
   "name": "PrimaryDb",
   "note": "",
   "type": "connectionReference",
   "value": { "connectionId": "aaaaaaaa-0000-1111-2222-bbbbbbbbbbbb" }
  }
 ```

 

## Permissions Required to Create/Use Connection References
Using connection reference variables involves two layers of permissions:

- **Create and Edit a connection reference variable**: Users with Contributor or above roles in the workspace can create and edit variables in the library, while Viewers are read-only.
- **Accessing the connection reference variable**: In addition to rights on the Variable Library, **you must have at least Read permission on the connection reference variable** you intend to reference.

For more information on permissions and permission validation, see [Variable library permissions](variable-library-permissions.md#connection-reference-variable-type-preview)


## Supported items
The following is a list of items that support connection reference variables:

- Notebook, through [NotebookUtils](../../data-engineering/notebook-utilities.md#variable-library-utilities)
- [User data functions](../../data-engineering/user-data-functions/connect-to-data-sources.md)

### Python code example
The following code example shows how to use a connection reference in a python script.

```python
var_ref = "$(/**/VarLibItem/ConnectionReference)"
var_obj = notebookutils.variableLibrary.get(var_ref)
connection_id = var_obj.get("connectionId").value()
print(connection_id)
```
This code does the following:

- Resolves a Connection Reference variable from a Fabric Variable Library
- Retrieves the connection metadata object
- Extracts the connectionId
- Prints the ID so it can be used in code or API calls.

## Limitations
The following limitations apply to connection reference variables:

- Built-in Connections in Notebooks are not supported since the connection_id for the Notebook connection isn't the same one.


## Related content

- [Variable library overview](variable-library-overview.md)
- [Variable types](variable-types.md)
- [Value sets](value-sets.md)
- [Variable library permissions](./variable-library-permissions.md)
