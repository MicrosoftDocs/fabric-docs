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

Value resolution in the consumer item isn't necessarily tied to its deployment. Rather, each consumer item resolves the value based on its own context.

The experience of a variable library differs based on the variable type, but all variable libraries allow you to define and manage variables that other items can use.

A Fabric variable library:

* Is compatible with continuous integration and continuous delivery (CI/CD) processes. This compatibility allows [integration with Git](../git-integration/intro-to-git-integration.md#supported-items) and deployment through [deployment pipelines](../deployment-pipelines/intro-to-deployment-pipelines.md#supported-items).
* Supports automation via Fabric public APIs.

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

Variable libraries contain one or more variables. Each variable has a name, type, and default value. You can also add a note to each variable to describe its purpose or how to use it.

:::image type="content" source="./media/variable-library-overview/define-values.png" alt-text="Screenshot of a variable library with several variables and their core components.":::

### Default value

The default value is the value that's used unless you specifically define a different value.  

All variables must have a default value. If the variable type is *string*, the default value can be `null`.

### Alternative value sets

Value sets define the values of each variable in the variable library. A variable library typically contains multiple value sets. The active (or effective) value set contains the value that the consumer item receives for that workspace.

In each workspace, you select a value set to be active. The active value set of a workspace doesn't change during a deployment or update from Git.

:::image type="content" source="./media/variable-library-overview/alternative-values.png" alt-text="Screenshot of a variable library with several alternative value sets.":::

When you create an alternative value set, the new value set is created with pointers to the default value for each variable. You can then change the value for each variable in the new value set.

## Supported items

The following items support the variable library:

- [Pipeline ](../../data-factory/variable-library-integration-with-data-pipelines.md)
- [Shortcut for a lakehouse ](../../onelake/assign-variables-to-shortcuts.md)
- Notebook, through [NotebookUtils](../../data-engineering/notebook-utilities.md#variable-library-utilities) and [`%%configure`](../../data-engineering/author-execute-notebook.md#spark-session-configuration-magic-command)
- [Dataflow Gen 2](../../data-factory/dataflow-gen2-variable-library-integration.md)
- [Copy job](../../data-factory/cicd-copy-job.md)
- [User data functions](../../data-engineering/user-data-functions/python-programming-model.md#get-variables-from-fabric-variable-libraries)

## Considerations and limitations

[!INCLUDE [limitations](../includes/variable-library-limitations.md)]

## Related content

* [Variable library permissions](./variable-library-permissions.md)
* [Create and manage variable libraries](./get-started-variable-libraries.md)
