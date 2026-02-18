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

To enhance flexibility and scalability, we're introducing complex variables alongside the existing basic variable types. These advanced variables are designed to meet key requirements such as parameterizing external and internal connections (For example, Snowflake, AWS, OneLake), managing secrets through secure methods like Azure Key Vault integration or native secured strings, and configuring item-specific settings with support for variable-to-variable references. 

A connection reference variable is a workspace variable that stores the ID of an external data connection (For example, Snowflake, Azure SQL), allowing items to reference external resources without embedding credentials or connection strings. Unlike item reference variables, connection references don't auto-bind during deployment. Their values remain fixed across environments, so e

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
- Supports CI/CD and automation by parameterizing external connections for different environments (dev, test, prod).
- Enables dynamic configuration of external relationships (For example, switching data sources or credentials per environment).
- Supports secure management of sensitive connection details without hard-coding them in consumer items.
- Values are chosen via a UI dialog, not free text, ensuring only authorized connections are selectable.
- Only connections with at least read permissions are available for selection and attempts to save changes without proper permissions fail.
- You can swap the active value‑set (For example, Dev → Prod) to rebind an entire workspace’s items to stage‑appropriate connections without code changes
- Git or API actions that update the Variable Library definition or set the active value‑set are the supported mechanisms


## Supported items
The following is a list of items that are currently supported using connection reference:

- Notebook, through [NotebookUtils](../../data-engineering/notebook-utilities.md#variable-library-utilities)
- [User data functions](../../data-engineering/user-data-functions/connect-to-data-sources.md#get-variables-from-fabric-variable-libraries)

### Permissions Required to Create/Use Connection References
Using connection reference variables involves two layers of permissions:

- **Editing the Variable Library**: Users with Contributor or above roles in the workspace can create and edit variables in the library, while Viewers are read-only.
- **Accessing the Referenced Connection**: In addition to rights on the Variable Library, **you must have at least Read permission on the connection** you intend to reference.

#### Permission validation
Permission validation is triggered by two different use-case categories, each has a different validation scope: 

 1. In the UI, to insert a value for a "connection reference" variable, or for editing an existing one, the user is required to do so through a dedicated dialog. Once this dialog is opened, users see only items that they have at lease READ permission to. This way it is guaranteed that the value is an item the user has permission to.  This applies to any value, the default active value set or other value-sets. 

 2. During Update API, Import through Git, or Deployment pipelines, and saving a variable library item, a permission of the user who executes the above action is validated for all "connection reference" variables in the variable library. The validation would be for the effective value only in the active value-set. 

So what this means is:

- When the connection reference is first created and a value for the connection referenced is selected, the user performing this action, needs at least read permissions to the item or connection being referenced. 

- Attempting to edit an existing connection reference in the active value set, the user performing this action, needs at least read permissions to the item or connection being referenced. 
		- If you don't have at least read permissions to the item you wish to update, that item isn't available for selection.
		- If you don't have Contributor or above, attempting to edit the item errors.

- Attempting to change the current active value set, the user performing this action, needs at least read permissions to the connection being referenced. 
		- If you don't have at least read permissions to the connection referenced, you'll get an error if you attempt to change the current active value set.


## Value-Set Scenarios
Value-sets allow you to define stage-specific configurations for connection references, supporting CI/CD best practices.

### [Scenario 1: Environment-Specific Connections](#tab/scenario1)
Suppose you have different external databases for Dev, Test, and Prod environments. You can create a connection reference variable with multiple value-sets:

|Value-Set Name|Connection ID|Description|
|-----|-----|-----|
|Dev|aaaaaaaa-0000-1111-2222-bbbbbbbbbbbb|Dev Database|
|Test|00aa00aa-bb11-cc22-dd33-44ee44ee44ee|Test Database|
|Prod|aaaabbbb-0000-1111-2222-aaaaaabbbbbb|Production Database|

**Usage**:

During deployment, activate the appropriate value-set for the target environment.
Pipelines and APIs can switch the active value-set to update the connection used by consumer items.

### [Scenario 2: Switching Cloud Providers](#tab/scenario2)
You may need to switch between different cloud storage providers based on business requirements:

|Value-Set Name|Connection ID|Provider|
|-----|-----|-----|
|Cloud1|aaaaaaaa-0000-1111-2222-bbbbbbbbbbbb|Cloud provider number 1.|
|Cloud2|00aa00aa-bb11-cc22-dd33-44ee44ee44ee|Cloud provider number 2.|
|Cloud3|aaaabbbb-0000-1111-2222-aaaaaabbbbbb|Cloud provider number 3.|

**Usage**:

Select the value-set corresponding to the required provider.
Consumer items (pipelines, notebooks) use the selected connection for their operations.

### [Scenario 3: A/B Testing External Connections](#tab/scenario3)
For A/B testing, you can create value-sets that point to different external endpoints:

|Value-Set Name|Connection ID|Test Group|
|-----|-----|-----|
|Group A|aaaaaaaa-0000-1111-2222-bbbbbbbbbbbb|Endpoint A|
|Group B|00aa00aa-bb11-cc22-dd33-44ee44ee44ee|Endpoint B|

**Usage**:

Switch active value-set to test performance or reliability of different endpoints.

---

### Representation in Git and APIs
A Connection Reference is an advanced variable type whose value schema stores the connectionId (and the platform resolves/display metadata). The authoring payload includes:

- type: "connectionReference" (advanced type)
- values: per value‑set, each value stores { "connectionId": "&lt;GUID/ID string&gt;" }
- Optional descriptive metadata (display name, description)

Example:

```json
{
 "name": "AppConnections",
 "description": "Stage-aware external connections",
 "variables": [
  {
   "name": "PrimaryDb",
   "note": "",
   "type": "connectionReference",
   "description": "Main transactional DB connection (stage-specific)",
   "valueSets": [
    {
     "name": "Dev",
     "values": { "connectionId": "aaaaaaaa-0000-1111-2222-bbbbbbbbbbbb" }
    },
    {
     "name": "Test",
     "values": { "connectionId": "00aa00aa-bb11-cc22-dd33-44ee44ee44ee" }
    },
    {
     "name": "Prod",
     "values": { "connectionId": "aaaabbbb-0000-1111-2222-aaaaaabbbbbb" }
    }
   ],
   "defaultValueSet": "Dev"
  }
 ]

 ```


## Related content

- [Variable library overview](variable-library-overview.md)
- [Variable types](variable-types.md)
- [Value sets](value-sets.md)
- [Variable library permissions](./variable-library-permissions.md)
