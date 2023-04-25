---
title: Introduction to the CI/CD process as part of the ALM cycle in Microsoft Fabric 
description: An overview of the CI/CD continuous integration, continuous deployment as part of the ALM cycle process in Microsoft Fabric.
author: mberdugo
ms.author: monaberdugo
ms.service: powerbi
ms.topic: conceptual
ms.date: 05/23/2023
---

# What is CI/CD in Microsoft Fabric?

Continuous integration (CI) and continuous delivery (CD) are integral parts of the application lifecycle management (ALM) in Microsoft Fabric. ALM tools provide a standardized system for communication and collaboration between software development teams and related departments, such as test and operations. CI/CD facilitates an effective process for releasing products quickly by continuously delivering updated code into production and ensuring an ongoing flow of new features and bug fixes using the most efficient delivery method.

## Continuous integration

With Microsoft Fabric's [Git integration](./git-integration/intro-to-git-integration.md) process, incremental code changes can be made frequently and reliably by multiple developers. Build-and-test steps triggered by CI ensure that the code changes merged into the repository are reliable. The CD process can then deliver the code quickly and seamlessly.

## Continuous delivery

Microsoft Fabric's [deployment pipelines](./deployment-pipelines/intro-to-deployment-pipelines.md) [automates the delivery](./deployment-pipelines/pipeline-automation.md) of completed code to environments like testing and production. It allows teams to produce software in short cycles with high speed, frequency, and reliability. Software can be released at any time with a simple, repeatable deployment process.

For the most seamless CI/CD experience in Fabric, connect your developer workspace to git, and deploy from there using deployment pipelines.

## Sample CI/CD workflow

A typical application of ALM might look something like this:

1. Create a new git branch for developing your app and share it with other developers
1. Each developer pushes their own code changes in git
1. Automated build and test
1. Merge new code updates
1. Upload updated version to pipeline
1. Test new version
1. Deploy new version of the app

This cycle, or parts of it, repeat over again for the lifetime of the app.

## Sample CI/CD workflow

A typical application of ALM might look something like this:

1. Create a new git branch for developing your app and share it with other developers
1. Each developer pushes their own code changes in git
1. Automated build and test
1. Merge new code updates
1. Upload updated version to pipeline
1. Test new version
1. Deploy new version of the app

This cycle, or parts of it, repeat themselves over again for the lifetime of the app.

## Next steps

* [Deployment pipelines](./deployment-pipelines/intro-to-deployment-pipelines.md)
* [Git integration](./git-integration/intro-to-git-integration.md)
