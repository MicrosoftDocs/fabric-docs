---
title: Fabric Application lifecycle management Variable library
description: Learn how to use the Fabric Application lifecycle management (ALM) Variable library tool to customize your stages.
author: billmath
ms.author: billmath
ms.service: fabric
ms.subservice: cicd
ms.topic: overview
ms.date: 01/22/2025
ms.search.form: Variable library overview
#customer intent: As a developer, I want to learn how to use the Fabric Application lifecycle management (ALM) Variable library tool to customize my stages so that I can manage my content lifecycle.
---

# What is a Variable library? (preview)

A Microsoft Fabric Variable library can be thought of as a bucket of variables that can be consumed by other items in the workspace. It functions as an item within the workspace that contains a list of variables, along with their respective values for each stage of the release pipeline. It presents a unified approach for customers to efficiently manage item configurations within a workspace, ensuring scalability and consistency across different lifecycle stages.

For example, a Variable library can contain variables that hold different values for:

* An integer to be used in a wait activity in a pipeline.
* A lakehouse reference to be the source in *Copy data* activity. Each value is used in a different pipeline based on the release stage the pipeline is in.
* A lakehouse reference to be configured as a Notebook default lakehouse. Each value is used in a different pipeline based on the release stage the notebook is in.

Value resolution in the consumer item isn't necessarily tied to its deployment. Rather, each consumer item resolves the value based on its own context.

The Variable library experience differs based on the variable type, but the core concept remains the same: it allows you to define and manage variables that can be used in other items.

The Fabric Variable library:

* Is compatible with CI/CD processes, allowing [integration with Git](../git-integration/intro-to-git-integration.md#supported-items) and deployment through [Deployment pipelines](../deployment-pipelines/intro-to-deployment-pipelines.md#supported-items).
* Supports automation via Microsoft Fabric public APIs.

> [!NOTE]
> The Microsoft Fabric Variable library item is currently in **preview**.

Variable libraries enable customers to:

* Customize configurations:

  A variable value can be configured based on the release pipeline stage. The user can configure the Variable library with different sets of value, one for each stage of the release pipeline. Then, after one-time settings of the active value-set for each stage, the correct value is automatically used in the pipeline stage. Some examples include:

  * Changing items connection based on the stage
  * Switching to a different cloud data source based on the stage
  * Adjusting data quantity in a query based on the stage

* Share configurations

  Variable libraries provide a centralized way to manage configurations across the workspace items. For example, if you have several Lakehouses in the workspace and each one has a shortcut that uses the same datasource, you can create a Variable library with that datasource as one of the variables. That way, if you want to change the data source, only have to change it one in the Variable library instead of changing it in each Lakehouse separately.

## Variable library structure

### Core components

Variable libraries contain one or more variables. Each variable has a name, type, and [default value](#default-value). You can also add a note to each variable to describe its purpose or how to use it.

:::image type="content" source="./media/variable-library-overview/define-values.png" alt-text="Screenshot of variable library with several variables and their core components.":::

### Default value

The default value is the value that is used unless you specifically define a [different value to use](#alternative-value-sets).  
All variables must have a default value. If the variable type is *String*, the default value can be null.

### Alternative value sets

Value sets define the values of each variable in the Variable library. A Variable library typically contains multiple value sets. The active (or effective) value set contains the value the consumer items receives for that workspace. In each workspace, you select a value set to be active. The active value set of a workspace doesn't change during deployment or update from Git.

:::image type="content" source="./media/variable-library-overview/alternative-values.png" alt-text="Screenshot of variable library with several alternative value sets.":::

When you create an alternative value set, the new value set is created with pointers to the default value for each variable. You can then change the value for each variable in the new value set.

## Supported items

The following items support the Variable library:

* [Data pipeline (preview)](../../data-factory/variable-library-integration-with-data-pipelines.md)
* [Shortcut for Lakehouse (preview)](../../onelake/assign-variables-to-shortcuts.md)
* [Notebook - NotebookUtils](../../data-engineering/notebook-utilities.md#variable-library-utilities) and [%%configure](../../data-engineering/author-execute-notebook.md#spark-session-configuration-magic-command)

## Considerations and limitations

 [!INCLUDE [limitations](../includes/variable-library-limitations.md)]

## Related content

* [Variable library permissions](./variable-library-permissions.md)
* [Get started with Variable libraries](./get-started-variable-libraries.md)
