---
title: Manage Spark environments with Visual Studio Code
description: Use the VS Code extension for Synapse and explore Fabric Spark environments with Visual Studio Code.
ms.reviewer: qixwang
ms.author: eur
author: eric-urban
ms.topic: overview
ms.date: 07/29/2024
ms.search.form: VSCodeExtension
ms.custom: sfi-image-nochange
---

# Explore and inspect Spark environments with Visual Studio Code

Microsoft Fabric environments is a consolidated item for all your hardware and software settings. In an environment, you can select different Spark runtimes, configure your compute resources, install libraries from public repositories or local directory and more. To learn more, see [Create, configure, and use an environment in Fabric](create-and-use-environment.md).

Once an environment is created, you can explore and inspect it in Visual Studio (VS) Code with the Fabric Data Engineering VS Code extension. A new node called **Environment** is available in VS Code. Expand the **Environments** node to see all the environments in your workspace.

:::image type="content" source="media\vscode\list-env.png" alt-text="Screenshot showing environment artifact list." lightbox="media/vscode/list-env.png":::

The environment currently set as the default workspace has the label **workspace default** next to its name. To change this default, hover over the environment and select the **Set Default Workspace Environment** button.

:::image type="content" source="media\vscode\set-default-env.png" alt-text="Screenshot showing change workspace default environment." lightbox="media\vscode\set-default-env-expanded.png":::

## Inspect the details of an environment

Environments define the hardware and software settings for your Spark jobs and notebooks. You can inspect the details of an environment in Visual Studio Code. Hover over the environment and select the **Inspect** button. The environment details are displayed in the right panel in JSON format.

:::image type="content" source="media\vscode\inspect-env-detail.png" alt-text="Screenshot showing inspect environment artifact." lightbox="media\vscode\inspect-env-detail.png":::

## Check the association between an environment and code

You can check the association between an environment and a code item such as notebook. To check the association, hover over the notebook name, from the pop-up panel, you can see the associated environment name and its item ID.

:::image type="content" source="media\vscode\check-env-association.png" alt-text="Screenshot showing check environment association." lightbox="media/vscode/check-env-association.png":::

## Related content

- [Create and manage Apache Spark job definitions in Visual Studio Code](author-sjd-with-vs-code.md)
- [Explore Microsoft Fabric lakehouses in Visual Studio Code](explore-lakehouse-with-vs-code.md)
