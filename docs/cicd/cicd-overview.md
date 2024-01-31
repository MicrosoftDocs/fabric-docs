---
title: Introduction to the CI/CD process as part of the ALM cycle in Microsoft Fabric
description: An overview of the CI/CD continuous integration, continuous deployment as part of the ALM cycle process in Microsoft Fabric.
author: mberdugo
ms.author: monaberdugo
ms.reviewer: NimrodShalit
ms.custom:
  - build-2023
  - ignite-2023
ms.topic: conceptual
ms.date: 08/10/2023
---

# What is lifecycle management in Microsoft Fabric?

[!INCLUDE [preview-note](../includes/feature-preview-note.md)]

Microsoft Fabric's lifecycle management tools provide a standardized system for communication and collaboration between all members of the development team throughout the life of the product. Lifecycle management facilitates an effective process for releasing products quickly by continuously delivering updated content into production and ensuring an ongoing flow of new features and bug fixes using the most efficient delivery method. There are two main components of lifecycle management in Fabric:

## Git integration

:::image type="content" source="./media/cicd-overview/git-flow.png" alt-text="Flowchart showing the connection between the remote Git branch and the live workspace.":::

With Fabric's [Git integration](./git-integration/intro-to-git-integration.md) process, incremental workspace updates can be made frequently and reliably by multiple developers. By leveraging Git advantages and best practices, developers can collaborate and ensure that content changes get to the workspace quickly and reliably. When ready, the delivery process can then deliver the content to deployment pipelines for testing and distribution.

## Delivery through deployment pipelines

:::image type="content" source="./media/cicd-overview/pipeline-flow.png" alt-text="Illustration showing the flow of data in a deployment pipeline from data to app." lightbox="media/cicd-overview/pipeline-flow.png":::

Fabric's [deployment pipelines](./deployment-pipelines/intro-to-deployment-pipelines.md) [automates the delivery](./deployment-pipelines/pipeline-automation.md) of modified content to environments like testing and production. It allows teams to produce updates in short cycles with high speed, frequency, and reliability. Content can be released at any time with a simple, repeatable deployment process.

For the most efficient lifecycle management experience in Fabric, connect your developer workspace to Git, and deploy from there using deployment pipelines.

## Related content

* [End to end lifecycle management tutorial](./cicd-tutorial.md)
* [Deployment pipelines](./deployment-pipelines/intro-to-deployment-pipelines.md)
* [Git integration](./git-integration/intro-to-git-integration.md)
