---
title: Use Fabric variable libraries in Dataflow Gen2
description: Overview on how to use Fabric variable libraries inside of a Dataflow Gen2 with CI/CD.
ai-usage: ai-assisted
ms.reviewer: miescobar
ms.topic: concept-article
ms.date: 3/15/2026
ms.custom: dataflows
---

# Use Fabric variable libraries in Dataflow Gen2

> [!NOTE]
> For more information on how to leverage this capability in continuous integration / continuous deployment (CI/CD) scenarios, be sure to read the article on [CI/CD and ALM solution architectures for Dataflow Gen2](dataflow-gen2-cicd-alm-solution-architecture.md) and the end-to-end tutorial on [Variable references in a Dataflow](dataflow-gen2-variable-references.md).

[Fabric variable libraries](/fabric/cicd/variable-library/variable-library-overview) offer a centralized way to manage configuration values across Microsoft Fabric workloads. With the new integration in Dataflow Gen2, you can reference these variables directly in your dataflow, enabling dynamic behavior across environments and simplifying CI/CD workflows.

## Prerequisites

To use Fabric variable libraries in Dataflow Gen2, ensure the following:

- You have permission to [create and manage Fabric variable libraries](/fabric/cicd/variable-library/get-started-variable-libraries).

- You're working with [Dataflow Gen2 with CI/CD](dataflow-gen2-cicd-and-git-integration.md).

## Reference variables using input widgets

Dataflow Gen2 dialogs include an input widget that lets you choose how to enter a field value. In supported dialogs, you can select variables by using this widget.

<image of input widget>

> [!NOTE]
> To use the input widget, on the **View** tab in the ribbon, in the **Parameters** group, select **Always allow**.
> <image of the option to enable>

Some dialogs support the input widget experience and Fabric variable libraries, including:

- [Filter rows by value](/power-query/filter-values)
- [Filter rows by position](/power-query/filter-row-position)
- [Replace values](/power-query/replace-values)
- Text column transformations (for example, Extract first N characters)
- Number column transformations (for example, Divide by)

When you select the variable option in the input widget, the variable picker dialog appears. In this dialog, you can browse your variable libraries and the variables they contain.

<image of the variable picker>

After you select a variable, the dialog displays the library and variable name so you can confirm your selection before you commit.

<image of variable selected>

> [!NOTE]
> Not all Dataflow experiences support the input widget. For unsupported experiences or custom scenarios, use the variable functions manually.

## Variable functions

Inside your Dataflow Gen2, you can reference a variable by using either of the following functions:

- [Variable.ValueOrDefault](/powerquery-m/variable-valueordefault)
- [Variable.Value](/powerquery-m/variable-value)

The identifier you pass to either function must use the following format:

```text
$(/**/LibraryName/VariableName)
```

The following examples assume a variable library named **My Library** and a string variable named **My Variable**:

```M code
Variable.ValueOrDefault("$(/**/My Library/My Variable)", "Sample")
```

```M code
Variable.Value("$(/**/My Library/My Variable)")
```

Using a default value through `Variable.ValueOrDefault` helps ensure that your formula resolves even when you copy or move your solution to another environment that doesn't have the referenced variable library.

> [!TIP]
> Store each variable as a separate query that doesn't require staging. This approach lets you use these values in dialogs that support the **query** input and helps keep an organized view of variables in your dataflow.

## Considerations and limitations

The following list outlines important constraints and behaviors to keep in mind when using Fabric variable libraries with Dataflow Gen2. These limitations affect how variables are referenced, evaluated, and applied during design and runtime.

- **Workspace Scope**: Variable libraries must reside in the same workspace as the Dataflow Gen2 with CI/CD.

- **Reference Location**: Variables can only be used inside the [mashup.pq file of a Dataflow Gen2 with CI/CD](/rest/api/fabric/articles/item-management/definitions/dataflow-definition).

- **Runtime behavior**: Variable values are retrieved at the start of a run operation and persisted throughout the operation. Changes to a library during a Dataflow run don't halt or affect that run.

- **Using a default value**: When using a default value through the function *Variable.ValueOrDefault*, make sure that the data type of the default value matches the data type of the referenced variable.

- **Supported Types**: Only variables of basic types are supported (`boolean`, `datetime`, `guid`, `integer`, `number`, and `string`).

- **Fixed connections**: Variables can't alter connection information. Connections remain fixed to the authored resource path configurations.

- **Override risk**: Users with access to modify variable libraries can override variable values, potentially affecting dataflow output.

- **Schema mapping**: Variables can't modify destination schema mappings; mappings follow the authored setup.

- **Lineage visibility**: Lineage views don't show links between Dataflow Gen2 and the variable libraries it references.
