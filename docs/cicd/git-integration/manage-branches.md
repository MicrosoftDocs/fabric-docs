---
title: Development Process in Microsoft Fabric
description: Learn how to develop an app using Git branches to work in your own isolated workspace environment and improve collaboration with your team.
ms.reviewer: NimrodShalit
ms.topic: concept-article
ms.date: 12/15/2025
#customer intent: As a developer, I want to learn how to use Git branches in Fabric so that I can work in my own isolated environment.
---

# Development process in Microsoft Fabric

The goal of this article is to present developers with different developement process in Microsoft Fabric, based on common customer scenarios. This article focuses more on the *continuous integration (CI)* part of the CI/CD process. For a discussion of the continuous delivery (CD) part, see [Fabric deployment options](../manage-deployment.md).

This article outlines a few distinct integration options, but many organizations use a combination of them.  

## Development process
The Fabric workspace is a *shared runtime environment* for all items, and each workspace can thus be connected to a **single branch**. Any changes made directly in the workspace override and affect all other workspace users. Therefore, Git best practice is for developers to have a *seperate runtime environment* - **a different workspace**. There are two ways for a developer to work in their own protected workspace.

- [Branch out to a separate Fabric workspace](./branched-workspace.md). Each developer has their own workspace where they connect their own separate branch, sync the content into that workspace, and then commit back to the branch.
- [Develop using client tools](./client-tool.md), such as [Power BI Desktop](https://powerbi.microsoft.com/desktop/) for reports and semantic models, or [VS Code](https://code.visualstudio.com/) for Notebooks.

## Related content
- [Fabric deployment options](../manage-deployment.md)
- [Resolve errors and conflicts](./conflict-resolution.md)
- [Git integration best practices](../best-practices-cicd.md)
