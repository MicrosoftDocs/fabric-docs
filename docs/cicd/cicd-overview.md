---
title: Introduction to the CI/CD process in Microsoft Fabric 
description: An overview of the CI/CD continuous integration, continuous deployment process in Microsoft Fabric.
author: mberdugo
ms.author: monaberdugo
ms.service: powerbi
ms.topic: conceptual
ms.date: 01/05/2023
---

# What is CI/CD in Microsoft Fabric?

Continuous integration (CI) and continuous delivery (CD) allow organizations to maintain software quickly and efficiently. CI/CD facilitates an effective process for releasing products quickly by continuously delivering updated code into production and ensuring an ongoing flow of new features and bug fixes using the most efficient delivery method.

## Continuous integration

With Microsoft Fabric's [Git integration](./git-integration/git-integration-overview.md) process, incremental code changes can be made frequently and reliably by multiple developers working in the same workspace. Automated build-and-test steps triggered by CI ensure that the code changes merged into the repository are reliable. The CD process can then deliver the code quickly and seamlessly.

## Continuous deployment

Microsoft Fabric's [deployment pipelines](./deployment-pipelines/deployment-pipelines-overview.md) automates the delivery of completed code to environments like testing and production. It allows teams to produce software in short cycles with high speed, frequency, and reliability. Software can be released at any time with a simple, repeatable deployment process.

## Next steps

* [Deployment pipelines](./deployment-pipelines/deployment-pipelines-overview.md)
* [Git integration](./git-integration/git-integration-overview.md)
