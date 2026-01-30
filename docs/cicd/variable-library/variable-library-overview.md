---
title: Fabric Application Lifecycle Management Variable Library
description: Learn how to use a Microsoft Fabric application lifecycle management (ALM) variable library to customize your release stages.
author: billmath
ms.author: billmath
ms.service: fabric
ms.subservice: cicd
ms.topic: overview
ms.date: 12/15/2025
ms.search.form: Variable library overview
#customer intent: As a developer, I want to learn how to use a Fabric application lifecycle management (ALM) variable library to customize my release stages, so that I can manage my content lifecycle.
---

# What is a variable library?

A Microsoft Fabric variable library is a bucket of variables that other items in the workspace can consume as part of application lifecycle management (ALM). It functions as an item within the workspace that contains a list of variables, along with their respective values for each stage of the release pipeline. It presents a unified approach for efficient management of item configurations within a workspace, to help ensure scalability and consistency across lifecycle stages.

For example, a variable library can contain variables that hold values for:

* An integer to be used in a wait activity in a pipeline.
* A lakehouse reference to be the source in a *copy data* activity. Each value is used in a different pipeline, based on the release stage of the pipeline.
* A lakehouse reference to be configured as a notebook default lakehouse. Each value is used in a different pipeline, based on the release stage of the notebook.

A Fabric variable library:

* Is compatible with continuous integration and continuous delivery (CI/CD) processes. This compatibility allows [integration with Git](../git-integration/intro-to-git-integration.md#supported-items) and deployment through [deployment pipelines](../deployment-pipelines/intro-to-deployment-pipelines.md#supported-items).
* Supports automation via Fabric public APIs.
- Value resolution in the consumer item isn't necessarily tied to its deployment. Rather, each consumer item resolves the value based on its own context.
- The experience of a variable library differs based on the variable type, but all variable libraries allow you to define and manage variables that other items can use.

## Benefits

Variable libraries enable customers to customize and share configurations.

### Customize configurations

You can configure a variable value based on the release pipeline stage. You can configure the variable library with sets of values: one value for each stage of the release pipeline. Then, after one-time settings of the active value set for each stage, the correct value is automatically used in the pipeline stage. Examples include:

* Changing an item's connection based on the stage.
* Switching to a different cloud data source based on the stage.
* Adjusting data quantity in a query based on the stage.

### Share configurations

Variable libraries provide a centralized way to manage configurations across the workspace items. For example, if you have several lakehouses in the workspace and each one has a shortcut that uses the same data source, you can create a variable library with that data source as one of the variables. That way, if you want to change the data source, you have to change it only once in the variable library. You don't need to change it in each lakehouse separately.

## Variable library structure

The Variable Library in Fabric is a structured system designed to manage configuration parameters across workspaces and deployment stages. At its core are user-defined [variables](variable-types.md), which can be basic types (like string, integer, boolean) or complex types such as [item references](item-reference-variable-type.md). These variables are grouped within a Variable Library item and can be referenced by consumer items within the same workspace. 

To support dynamic configuration, each variable can have multiple [value-sets](value-sets.md) or alternative sets of values tailored for different environments (e.g., dev, test, prod). One value-set is designated as "active" per workspace, determining which values are used during runtime. 

Users can create, edit, and manage variables and value-sets through the Fabric UI or APIs, with built-in validation and permission checks. The system supports CI/CD workflows, allowing variables to be managed as code, integrated with Git, and deployed via pipelines. This structure ensures scalable, automated, and governed configuration management across complex data systems.

:::image type="content" source="./media/variable-library-overview/define-values.png" alt-text="Screenshot of a variable library with several variables and their core components.":::


## Supported items

The following items support the variable library:

- [Pipeline ](../../data-factory/variable-library-integration-with-data-pipelines.md)
- [Shortcut for a lakehouse ](../../onelake/assign-variables-to-shortcuts.md)
- Notebook, through [NotebookUtils](../../data-engineering/notebook-utilities.md#variable-library-utilities) and [`%%configure`](../../data-engineering/author-execute-notebook.md#spark-session-configuration-magic-command)
- [Dataflow Gen 2](../../data-factory/dataflow-gen2-variable-library-integration.md)
- [Copy job](../../data-factory/cicd-copy-job.md)
- [User data functions](../../data-engineering/user-data-functions/python-programming-model.md#get-variables-from-fabric-variable-libraries)

## Naming conventions
The name of variable library item itself must follow these conventions:

- Isn't empty
- Doesn't have leading or trailing spaces
- Starts with a letter
- Can include letters, numbers, underscores, hyphens, and spaces
- Doesn't exceed 256 characters in length

The variable library name is *not* case sensitive.


## Considerations and limitations

[!INCLUDE [limitations](../includes/variable-library-limitations.md)]

## Related content

* [Variable library permissions](./variable-library-permissions.md)
* [Create and manage variable libraries](./get-started-variable-libraries.md)
