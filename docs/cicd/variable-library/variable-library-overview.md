---
title: Fabric Application lifecycle management variable library
description: Learn how to use the Fabric Application lifecycle management (ALM) variable library tool to customize your stages.
author: mberdugo
ms.author: monaberdugo
ms.service: fabric
ms.subservice: cicd
ms.topic: overview
ms.date: 08/15/2024
#customer intent: As a developer, I want to learn how to use the Fabric Application lifecycle management (ALM) variable library tool to customize my stages so that I can manage my content lifecycle.
---

# What is a variable library?

The Variable Library presents a unified approach for customers to efficiently manage item configurations within a workspace, ensuring scalability and consistency across different lifecycle stages. It functions as an item within the fabric that contains a list of variables, along with their respective values for each stage of the release pipeline.

The variable library:

* Is compatible with CI/CD processes, allowing integration with Git and deployment through Deployment pipelines.
* Supports automation via public APIs.

> [!NOTE]
> The variable library item is currently in **preview**.

Variable libraries enable customers to:

* [Customize configurations](#customized-configurations)
* [Share configurations](#share-configurations) 

## Customized configurations

A variable value can be configured based on the release pipeline stage. The user configures the variable library one time for each stage of the pipeline. The correct value is automatically used based on the pipeline stage. The user can configure values for Data pipeline, Notebook, shortcut for Lakehouse, semantic model etc.

## Share configurations

Variable libraries provide a centralized way to manage configurations across the workspace items. For example, Lakehouses in the workspace using the same shortcut can share the same configuration across the workspace.

## Related content

* [Related article title](link.md)
* [Related article title](link.md)
* [Related article title](link.md)
