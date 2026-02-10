---
title: Use Fabric variable libraries in Dataflow Gen2 (Preview)
description: Overview on how to use Fabric variable libraries inside of a Dataflow Gen2 with CI/CD.
ms.reviewer: miescobar
ms.topic: concept-article
ms.date: 10/20/2025
ms.custom: dataflows
---

# Use Fabric variable libraries in Dataflow Gen2 (Preview)

> [!NOTE]
> This feature is currently in preview and only available for Dataflow Gen2 with CI/CD.
> For more information on how to leverage this capability in continous integration / continous deployment (CI/CD) scenarios, be sure to read the article on [CI/CD and ALM solution architectures for Dataflow Gen2](dataflow-gen2-cicd-alm-solution-architecture.md) and the end-to-end tutorial on [Variable references in a Dataflow](dataflow-gen2-variable-references.md).

[Fabric variable libraries](/fabric/cicd/variable-library/variable-library-overview) offer a centralized way to manage configuration values across Microsoft Fabric workloads. With the new integration in Dataflow Gen2 (Preview), you can reference these variables directly in your dataflow, enabling dynamic behavior across environments and simplifying CI/CD workflows.

## Prerequisites

To use Fabric variable libraries in Dataflow Gen2, ensure the following:

- You have permission to [create and manage Fabric variable libraries](/fabric/cicd/variable-library/get-started-variable-libraries).

- You're working with [Dataflow Gen2 with CI/CD](dataflow-gen2-cicd-and-git-integration.md).

## How to use Fabric variable libraries in Dataflow Gen2

Inside your Dataflow Gen2, you can reference a variable using either one of the following functions:

- [Variable.ValueOrDefault](/powerquery-m/variable-valueordefault)

- [Variable.Value](/powerquery-m/variable-value)

The expected identifier that must be passed to either of these two functions must follow the format of:

```
$(/**/LibraryName/VariableName)
```

The following examples for both functions in the scenario where you have a variable library named **My Library** and a variable of the type string named **My Variable**:

```M code
Variable.ValueOrDefault("$(/**/My Library/My Variable)", "Sample")
```

```M code
Variable.Value("$(/**/My Library/My Variable)")
```

Applying this function to a query script, let's take the following example query that connects to a table named **Table1** from a specific LakehouseId and WorkspaceId using the [Fabric Lakehouse connector](connector-lakehouse-overview.md).

```M code
let
  Source = Lakehouse.Contents([]),
  #"Navigation 1" = Source{[workspaceId = "cfafbeb1-8037-4d0c-896e-a46fb27ff229"]}[Data],
  #"Navigation 2" = #"Navigation 1"{[lakehouseId = "5b218778-e7a5-4d73-8187-f10824047715"]}[Data],
  #"Navigation 3" = #"Navigation 2"{[Id = "Table1", ItemKind = "Table"]}[Data]
in
  #"Navigation 3"
```

You plan to replace the values passed for the `workspaceId` and `lakehouseId` so that in CI/CD scenarios it dynamically points to the right item in the right stage.

To that end, in the same workspace where your Dataflow is located, you also have a variable library named **My Library** that contains the following variables that you plan to reference in your dataflow:

| Variable name | Variable type | Default value set |
|---------------|---------------|-------------------|
| Workspace ID  | String        | a8a1bffa-7eea-49dc-a1d2-6281c1d031f1 |
| Lakehouse ID  | String        | 37dc8a41-dea9-465d-b528-3e95043b2356 |

With this information, you can modify your query script to replace the values that result in the next script:

```M code
let
  Source = Lakehouse.Contents([]),
  #"Navigation 1" = Source{[workspaceId = Variable.ValueOrDefault("$(/**/My Library/Workspace ID)",  "cfafbeb1-8037-4d0c-896e-a46fb27ff229")]}[Data],
  #"Navigation 2" = #"Navigation 1"{[lakehouseId =  Variable.ValueOrDefault("$(/**/My Library/Lakehouse ID)","5b218778-e7a5-4d73-8187-f10824047715")]}[Data],
  #"Navigation 3" = #"Navigation 2"{[Id = "Table1", ItemKind = "Table"]}[Data]
in
  #"Navigation 3"
```

When you run the Dataflow with the modified script, it resolves to the value from the variable, and the correct data type defined by the variable. This points to a different Workspace and Lakehouse depending on the values available at the time of running your Dataflow.

> [!CAUTION]
> The Power Query editor doesn't currently support the evaluation of variables. We recommend using the **Variable.ValueOrDefault** function to ensure that your authoring experience uses the default value for prototyping.
>
> Using a default value through Variable.ValueOrDefault ensures that your formula resolves even when you copy or move your solution to another environment that doesn't have the reference variable library.
> At runtime, the variable is resolved to the correct value.

## Considerations and limitations

The following list outlines important constraints and behaviors to keep in mind when using Fabric variable libraries with Dataflow Gen2. These limitations affect how variables are referenced, evaluated, and applied during design and runtime.

- **Workspace Scope**: Variable libraries must reside in the same workspace as the Dataflow Gen2 with CI/CD.

- **Reference Location**: Variables can only be used inside the [mashup.pq file of a Dataflow Gen2 with CI/CD](/rest/api/fabric/articles/item-management/definitions/dataflow-definition).

- **Runtime behavior**: Variables values are retrieved at the start of a run operation and persisted throughout the operation. Changes that happen to a library during a Dataflow run don't halt or impact its run.

- **Power Query editor support**: No current support to resolve or evaluate variables within the Power Query editor.

- **Using a default value**: When using a default value through the function *Variable.ValueOrDefault*, make sure that the data type of the default value matches the data type of the referenced variable.

- **Supported Types**: Only variables of basic types are supported (`boolean`, `datetime`, `guid`, `integer`, `number`, and `string`).

- **Fixed connections**: Variables can't alter connection information. Connections remain fixed to the authored resource path configurations.

- **Override risk**: Users with access to modify variable libraries can override variable values, potentially affecting dataflow output.

- **Schema mapping**: Variables can't modify destination schema mappings; mappings follow the authored setup.

- **Lineage visibility**: Lineage views don't show links between Dataflow Gen2 and the variable libraries it references.

- **Variable limit**: Dataflows can only retrieve a maximum of 50 variables.

- **SPN support**: Dataflows can only successfully refresh if the refresh is not using an SPN for authentication.

