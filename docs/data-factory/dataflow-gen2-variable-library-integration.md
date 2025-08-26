---
title: Use Fabric Variable Libraries in Dataflow Gen2 (Preview)
description: Overview on how to use Fabric variable libraries inside of a Dataflow Gen2 with CI/CD.
author: ptyx507x
ms.author: miescobar
ms.reviewer: whhender
ms.topic: conceptual
ms.date: 09/15/2025
ms.custom: dataflows
---
# Use Fabric Variable Libraries in Dataflow Gen2 (Preview)

>[!NOTE]
>This feature is currently in public preview and only available for Dataflow Gen2 with CI/CD.

[Fabric variable libraries](/cicd/variable-library/variable-library-overview.md) offer a centralized way to manage configuration values across Microsoft Fabric workloads. With the new integration in Dataflow Gen2 (Preview), you can reference these variables directly in your dataflow, enabling dynamic behavior across environments and simplifying CI/CD workflows.

## How to Use Variable Libraries in Dataflow Gen2

Inside your Dataflow Gen2, you can reference a variable using either one of the following functions:
* [Variable.ValueOrDefault](/powerquery-m/variable-valueordefault)
* [Variable.Value](/powerquery-m/variable-value)

The expected identifier that must be passed to either of these two functions must follow the following format:
```
$(/**/LibraryName/VariableName)
```

The following examples for both functions in the scenario where you have a variable library named **My Library** and a variable of the type string named **My Variable**:

```M code 
Variable.ValueOrDefault("$(/**/My Library/My Variable)", "Sample")
```

```M code
Variable.Value("$(/**//My Library/My Variable)")
```

>[!NOTE]
>The Power Query editor doesn't currently support the evaluation of variables. We recommend using the **Variable.ValueOrDefault** function to ensure that your authoring experience uses the default value for prototyping.
> 
>Using a default value through **Variable.ValueOrDefault** ensures that your formula resolves even when you move or copy your solution to another environment that doesn't have the reference variable library.
>At runtime, the variable is resolved to the correct value.

Applying this function to a query script, take the following example query that connects to a table named **Table1** from a specific LakehouseId and WorkspaceId using the [Fabric Lakehouse connector](connector-lakehouse-overview.md). 

```M code
let
  Source = Lakehouse.Contents([]),
  #"Navigation 1" = Source{[workspaceId = "cfafbeb1-8037-4d0c-896e-a46fb27ff229"]}[Data],
  #"Navigation 2" = #"Navigation 1"{[lakehouseId = "5b218778-e7a5-4d73-8187-f10824047715"]}[Data],
  #"Navigation 3" = #"Navigation 2"{[Id = "Table1", ItemKind = "Table"]}[Data]
in
  #"Navigation 3" 
```
In the scenario where y

## Considerations and limitations

The following list outlines important constraints and behaviors to keep in mind when using Fabric variable libraries with Dataflow Gen2. These limitations affect how variables are referenced, evaluated, and applied during design and runtime.

* **Workspace Scope**: Variable libraries must reside in the same workspace as the Dataflow Gen2 with CI/CD.
* **Reference Location**: Variables can only be used inside the [mashup.pq file of a Dataflow Gen2 with CI/CD](rest/api/fabric/articles/item-management/definitions/dataflow-definition#mashup-contentdetails-example).
* **Runtime Only**: Variables are evaluated only during run operations—not within the Power Query editor.
* **Using a default value**: When using a default value, make sure that the data type of the default value matches the data type of the referenced variable.
* **Supported Types**: Only variables of basic types are supported (`boolean`, `datetime`, `guid`, `integer`, `number`, and `string`).
* **Fixed paths**: Variables can't alter source or destination paths. Connections remain fixed to the authored configuration.
* **Override risk**: Users with access to modify variable libraries can override variable values, potentially affecting dataflow output.
* **Schema mapping**: Variables can't modify destination schema mappings; mappings follow the authored setup.
* **Lineage visibility**: Lineage views don't show links between Dataflow Gen2 and the variable libraries it references.
* **Gateway support**: Dataflows that rely on a gateway can't resolve variable libraries.