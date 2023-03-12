---
title: Assign a workspace to a Power BI Application lifecycle management (ALM) deployment pipeline 
description: Learn how to assign and unassign a workspace to a deployment pipeline, the Power BI Application lifecycle management (ALM) tool.
author: mberdugo
ms.author: monaberdugo
ms.service: fabric
ms.subservice: cicd
ms.topic: conceptual
ms.date: 01/05/2023
---

# What is CI/CD in Microsoft Fabric?

CI/CD, or continuous integration and continuous deployment allows organizations to maintain software quickly and efficiently. CI/CD facilitates an effective process for getting products out quickly by continuously delivering updated code into production and ensuring an ongoing flow of new features and bug fixes using the most efficient delivery method.

## Continuous integration

With Microsoft Fabric's [Git integration](./git-integration/git-integration-overview.md) process, incremental code changes can be made frequently and reliably by multiple developers working in the same workspace. Automated build-and-test steps triggered by CI ensure that the code changes merged into the repository are reliable. The CD process can then deliver the code quickly and seamlessly.

## Continuous deployment

Microsoft Fabric's [deployment pipelines](./deployment-pipelines/deployment-pipelines-overview.md) automates delivery of completed code to environments like testing and production. CD provides an automated and consistent way for code to be delivered to these environments.

## Next steps

* [Deployment pipelines](./deployment-pipelines/deployment-pipelines-overview.md)
* [Git integration](./git-integration/git-integration-overview.md)
