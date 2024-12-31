---
title: Fabric Application lifecycle management Variable library
description: Learn how to use the Fabric Application lifecycle management (ALM) Variable library tool to customize your stages.
author: mberdugo
ms.author: monaberdugo
ms.service: fabric
ms.subservice: cicd
ms.topic: overview
ms.date: 12/16/2024
#customer intent: As a developer, I want to learn how to use the Fabric Application lifecycle management (ALM) Variable library tool to customize my stages so that I can manage my content lifecycle.
---

# What is a Fabric Variable library? (preview)

The Microsoft Fabric Variable Library presents a unified approach for customers to efficiently manage item configurations within a workspace, ensuring scalability and consistency across different lifecycle stages. It functions as an item within the fabric that contains a list of variables, along with their respective values for each stage of the release pipeline.

The Fabric Variable library:

* Is compatible with CI/CD processes, allowing integration with Git and deployment through Deployment pipelines.
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

  Variable libraries provide a centralized way to manage configurations across the workspace items. For example, Lakehouses in the workspace using the same shortcut can share the same configuration across the workspace.

## Variable library structure

### Core components

Variable libraries contain one or more variables. Each variable has a name, type, and [default value](#default-value). You can also add a note to each variable to describe its purpose or how to use it.

:::image type="content" source="./media/variable-library-overview/define-values.png" alt-text="Screenshot of variable library with several variables and their core components.":::

## Default value

The default value is the value that is used by default unless you specifically define a [different value to use](#value-sets-optional).

When you create a new value set, the new value set is created with pointers to the default value for each variable.

### Value sets (optional)

Value sets are sets of values for the Variable library item. A value set consists value for each variable in the library. You can have multiple value sets for each Variable library item, and choose which one to use in each stage of the deployment pipeline. For each stage, you can choose to use the active value set for that stage.

:::image type="content" source="./media/variable-library-overview/alternative-values.png" alt-text="Screenshot of variable library with several alternative value sets.":::

## Supported items

The following items support the Variable library:

* Data pipeline
<!--- * [Lakehouse](../../data-engineering/lakehouse-overview.md)
* Notebook --->

## Related content

* [Related article title](link.md)
* [Related article title](link.md)
* [Related article title](link.md)
