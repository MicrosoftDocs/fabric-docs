---
title: Manage Environment artifact with Visual Studio Code
description: Learn about the VS Code extension for Synapse, which supports manage the environment artifacts in Fabric.
ms.reviewer: sngun
ms.author: qixwang
author: qixwang
ms.topic: overview
ms.date: 07/29/2024
ms.search.form: VSCodeExtension
---

# Explore and inspect environment artifacts with Visual Studio Code

Microsoft Fabric environments is a consolidated item for all your hardware and software settings. In an environment, you can select different Spark runtimes, configure your compute resources, install libraries from public repositories or local directory and more. Please check the detail information in [Create, configure, and use an environment in Fabric](create-and-use-environment.md).

Once the environment is created, you can explore and inspect the environment artifacts in Visual Studio Code (VS Code) with the Synapse extension. A new node called **Environments** is added to the Synapse extension in VS Code. By expanding the **Environments** node, you can see all the environments in your workspace.

:::image type="content" source="media\vscode\list-env.png" alt-text="Screenshot showing environment artifact list":::

For the environment which has been set as the default workspace environment , you can see the **workspace default** text beside the environment name. To change the default workspace environment, move the cursor to the environment and click the **Set Default Workspace Environment** button.

:::image type="content" source="media\vscode\set-default-env.png" alt-text="Screenshot showing change workspace default environment":::

## Inspect details of an environment artifact with Visual Studio Code 

Environment artifacts define the hardware and software settings for your Spark jobs and notebooks. You can inspect the details of an environment artifact in Visual Studio Code. Move the cursor to the environment and click the **Inspect** button. The environment details will be displayed in the right panel with JSON format.

:::image type="content" source="media\vscode\inspect-env-detail.png" alt-text="Screenshot showing inspect environment artifact":::

## Check the association between an environment artifact and code artifacts

You can check the association between an environment artifact and code artifact such as Notebook in Visual Studio Code. To check the association, move the cursor to the name of the Notebook, and from the pop-up panel, you can see the associated environment name.

:::image type="content" source="media\vscode\check-env-association.png" alt-text="Screenshot showing check environment association"::: 

## Related content

- [Create and manage Apache Spark job definitions in Visual Studio Code](author-sjd-with-vs-code.md)
- [Explore Microsoft Fabric lakehouses in Visual Studio Code](explore-lakehouse-with-vs-code.md)
