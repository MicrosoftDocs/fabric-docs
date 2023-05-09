---
title: Introduction to the CI/CD process as part of the ALM cycle in Microsoft Fabric 
description: An overview of the CI/CD continuous integration, continuous deployment as part of the ALM cycle process in Microsoft Fabric.
author: mberdugo
ms.author: monaberdugo
ms.service: powerbi
ms.topic: conceptual
ms.date: 05/23/2023
---

# What is lifecycle management in Microsoft Fabric?

[!INCLUDE [preview-note](../includes/preview-note.md)]

Microsoft Fabric's lifecycle management tools provide a standardized system for communication and collaboration between all members of the development team throughout the life of the product. Lifecycle management facilitates an effective process for releasing products quickly by continuously delivering updated content into production and ensuring an ongoing flow of new features and bug fixes using the most efficient delivery method. There are two basic components of lifecycle management:

## Git integration

:::image type="content" source="./media/cicd-overview/git-flow.png" alt-text="Flowchart showing the connection between the remote git branch and the live workspace.":::

With Fabric's [Git integration](./git-integration/intro-to-git-integration.md) process, incremental workspace updates can be made frequently and reliably by multiple developers. Build-and-test steps triggered by the git integration process ensure that any changes to the workspace merged into the repository are reliable. The delivery process can then deliver the code quickly and efficiently.

## Delivery through deployment pipelines

:::image type="content" source="./media/cicd-overview/pipeline-flow.png" alt-text="Illustration showing the flow of data in a deployment pipeline from data to app." lightbox="media/cicd-overview/pipeline-flow.png":::

Fabric's [deployment pipelines](./deployment-pipelines/intro-to-deployment-pipelines.md) [automates the delivery](./deployment-pipelines/pipeline-automation.md) of completed apps to environments like testing and production. It allows teams to produce updates in short cycles with high speed, frequency, and reliability. Content can be released at any time with a simple, repeatable deployment process.

For the most seamless lifecycle management experience in Fabric, connect your developer workspace to git, and deploy from there using deployment pipelines.

## Sample lifecycle management workflow

The typical lifecycle management of an app might look something like this:

1. [Create a new git branch](/azure/devops/repos/git/create-branch) for developing your app and share it with other developers
1. Each developer [pushes](/azure/devops/repos/git/pushing) their own code changes in git
1. Automated build and test
1. [Merge](./git-integration/git-get-started.md) new code updates
1. Upload updated version to a [deployment pipeline](./deployment-pipelines/get-started-with-deployment-pipelines.md)
1. Test new version
1. [Deploy](./deployment-pipelines/deploy-content.md) new version of the app

This cycle, or parts of it, repeat over again for the lifetime of the app.

## Next steps

* [Deployment pipelines](./deployment-pipelines/intro-to-deployment-pipelines.md)
* [Git integration](./git-integration/intro-to-git-integration.md)
