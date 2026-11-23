---
title: Development Process in Microsoft Fabric
description: Learn how to develop an app using Git branches to work in your own isolated workspace environment and improve collaboration with your team.
ms.reviewer: NimrodShalit
ms.topic: concept-article
ms.date: 10/18/2026
ai-usage: ai-assisted
#customer intent: As a developer, I want to learn how to use Git branches in Fabric so that I can work in my own isolated environment.
---

# Development process in Microsoft Fabric

This article presents developers with different development processes in Fabric, based on common customer scenarios. It focuses more on the *continuous integration (CI)* part of the CI/CD process. For a discussion of the continuous delivery (CD) part, see [Fabric deployment options](../manage-deployment.md).

This article outlines a few distinct integration options, but many organizations use a combination of them.  

## Development process
The Fabric workspace is a *shared runtime environment* for all items, and each workspace can thus be connected to a **single branch**. Any changes made directly in the workspace override and affect all other workspace users. Therefore, Git best practice is for developers to have a *seperate runtime environment* - **a different workspace**. There are two ways for a developer to work in their own protected workspace.

- [Develop using branched workspace](./branched-workspace.md). Each developer has their own workspace where they connect their own separate branch, sync the content into that workspace, and then commit back to the branch.
- [Develop using client tools](./client-tool.md), such as [Power BI Desktop](https://powerbi.microsoft.com/desktop/) for reports and semantic models, or [VS Code](https://code.visualstudio.com/) for Notebooks.

The following diagram illustrates the branched-workspace development process,
including bidirectional Git sync and a PR that merges feature changes into Dev.

:::image type="content" source="../media/manage-deployment/development-process.png" alt-text="Diagram showing feature and dev workspaces with bidirectional Git sync to their branches, branch-out with an optional deployment plan, and a feature-to-dev PR." lightbox="../media/manage-deployment/development-process.png":::

## Related content
- [Fabric deployment options](../manage-deployment.md)
- [Resolve errors and conflicts](./conflict-resolution.md)
