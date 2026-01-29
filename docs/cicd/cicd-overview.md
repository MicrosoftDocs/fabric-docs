---
title: Introduction to CI/CD in Microsoft Fabric
description: An overview of the CI/CD continuous integration, continuous deployment as part of the Application lifecycle management (ALM) cycle process in Microsoft Fabric.
author: billmath
ms.author: billmath
ms.reviewer: NimrodShalit
ms.custom:
ms.topic: concept-article
ms.service: fabric
ms.subservice: cicd
ms.date: 12/15/2025
#customer intent: As a developer, I want to understand the CI/CD process in Microsoft Fabric so that I can efficiently manage the lifecycle of my applications.
---

# What is application lifecycle management in Microsoft Fabric?

Microsoft Fabric's application lifecycle management tools provide a standardized system for communication and collaboration between all members of the development team throughout the life of the product. Lifecycle management facilitates an effective process for releasing products quickly by continuously delivering updated content into production and ensuring an ongoing flow of new features and bug fixes using the most efficient delivery method. There are two main components of lifecycle management in Fabric:

## Git integration

:::image type="content" source="./media/cicd-overview/git-flow.png" alt-text="Flowchart showing the connection between the remote Git branch and the live workspace.":::

With Fabric's [Git integration](./git-integration/intro-to-git-integration.md) process, incremental workspace updates can be made frequently and reliably by multiple developers. By applying Git advantages and best practices, developers can collaborate and ensure that content changes get to the workspace quickly and reliably. When ready, the delivery process can then deliver the content to deployment pipelines for testing and distribution.

> [!NOTE]
> Some of the items for CI/CD are in preview. See the list of supported item for the [Git integration](./git-integration/intro-to-git-integration.md#supported-items) and [deployment pipeline](./deployment-pipelines/intro-to-deployment-pipelines.md#supported-items) features.

## Delivery through deployment pipelines

:::image type="content" source="./media/cicd-overview/pipeline-flow.png" alt-text="Illustration showing the flow of data in a deployment pipeline from data to app." lightbox="media/cicd-overview/pipeline-flow.png":::

Fabric's [deployment pipelines](./deployment-pipelines/intro-to-deployment-pipelines.md) [automates the delivery](./deployment-pipelines/pipeline-automation.md) of modified content to environments like testing and production. It allows teams to produce updates in short cycles with high speed, frequency, and reliability. Content can be released at any time with a simple, repeatable deployment process.

For the most efficient lifecycle management experience in Fabric, connect your developer workspace to Git, and deploy from the connected workspace using deployment pipelines.

## Variable library

With [Variable libraries](./variable-library/variable-library-overview.md), customers can:

* Define and manage variables (user-defined variables) in a unified way for all workspace items.
* Use the variables in different places in the product: In item definitions (such as queries), as reference to other items (Lakehouse ID), and more.
* Reuse variables across fabric workloads and items (for example, several items in the workspace can refer to the same variable).
* CI/CD - Use variables to adjust values based on the release pipeline stage.

## Related content

* [End to end lifecycle management tutorial](./cicd-tutorial.md)
* [Deployment pipelines](./deployment-pipelines/intro-to-deployment-pipelines.md)
* [Git integration](./git-integration/intro-to-git-integration.md)
