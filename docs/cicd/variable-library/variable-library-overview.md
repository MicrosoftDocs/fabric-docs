---
title: Fabric Application lifecycle management Variable library
description: Learn how to use the Fabric Application lifecycle management (ALM) Variable library tool to customize your stages.
author: mberdugo
ms.author: monaberdugo
ms.service: fabric
ms.subservice: cicd
ms.topic: overview
ms.date: 08/15/2024
#customer intent: As a developer, I want to learn how to use the Fabric Application lifecycle management (ALM) Variable library tool to customize my stages so that I can manage my content lifecycle.
---

# What is a Fabric Variable library? (preview)

The Microsoft Fabric Variable Library presents a unified approach for customers to efficiently manage item configurations within a workspace, ensuring scalability and consistency across different lifecycle stages. It functions as an item within the fabric that contains a list of variables, along with their respective values for each stage of the release pipeline.

The Fabric Variable library:

* Is compatible with CI/CD processes, allowing integration with Git and deployment through Deployment pipelines.
* Supports automation via public APIs.

> [!NOTE]
> The Fabric Variable library item is currently in **preview**.

Variable libraries enable customers to:

* [Customize configurations](#customize-configurations)
* [Share configurations](#share-configurations)

## Customize configurations

A variable value can be configured based on the release pipeline stage. The user can configure the Variable library with different sets of value, one for each stage of the release pipeline. Then, after one-time settings of the active value-set for each stage, the correct value is automatically used in the pipeline stage. Some examples include:

* Changing items connection based on the stage
* Switching to a different cloud data source based on the stage
* Adjusting data quantity in a query based on the stage

## Share configurations

Variable libraries provide a centralized way to manage configurations across the workspace items. For example, Lakehouses in the workspace using the same shortcut can share the same configuration across the workspace.

## Supported items

The following items support the Variable library:

* Lakehouse
* Data pipeline
* Notebook

## Related content

* [Related article title](link.md)
* [Related article title](link.md)
* [Related article title](link.md)
