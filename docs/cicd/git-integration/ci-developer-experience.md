---
title: Git integration workspaces
description: Learn how to develop an app using Git branches to work in your own isolated workspace environment and improve collaboration with your team.
author: billmath
ms.author: billmath
ms.reviewer: NimrodShalit
ms.service: fabric
ms.subservice: cicd
ms.topic: concept-article
ms.date: 12/15/2025
ms.custom:
#customer intent: As a developer, I want to learn how to use Git branches in Fabric so that I can work in my own isolated environment.
---

# Continous Integration Developer Experience

The goal of this article is to present Fabric developers with different options for building CI/CD processes in Fabric, based on common customer scenarios. This article focuses more on the *continuous integration (CI)* part of the CI/CD process. For a discussion of the continuous delivery (CD) part, see [manage deployment pipelines](../manage-deployment.md).

This article outlines a few distinct integration options, but many organizations use a combination of them.  

## Prerequisites

[!INCLUDE [prerequisites](../includes/github-prereqs.md)]

## Development process

The Fabric workspace is a shared environment that accesses live items. Any changes made directly in the workspace override and affect all other workspace users. Therefore, Git best practice is for developers to work in isolation outside of the shared workspaces. There are two ways for a developer to work in their own protected workspace.

- [Develop using client tools](tutorial-develop-using-client-tools.md), such as [Power BI Desktop](https://powerbi.microsoft.com/desktop/) for reports and semantic models, or [VS Code](https://code.visualstudio.com/) for Notebooks.
- [Develop in a separate Fabric workspace](tutorial-develop-seperate-workspace.md). Each developer has their own workspace where they connect their own separate branch, sync the content into that workspace, and then commit back to the branch.


In Microsoft Fabric, a branch represents a Git branch connected to a workspace, allowing developers to commit workspace changes into a dedicated branch or update the workspace with changes applied directly in Git. To work with branches using Git integration, first connect the shared development team’s workspace to a single shared branch. For example, if your team uses one shared workspace, connect it to the *main* branch in your team’s repository, and sync between the workspace and the repo. If your team’s workflow has multiple shared branches like *Dev/Test/Prod* branches, each branch can be connected to a different workspace.

Then, each developer can choose the isolated environment in which to work.

## Release process

The release process begins once new updates complete a Pull Request process and merge into the team’s shared branch (such as *Main*, *Dev*, etc.). From this point, There are different options to build a release process in Fabric. To read about different options to consider when designing your workflow, see [release process](../manage-deployment.md#release-process).

## Switch branches

If your workspace is connected to a Git branch and you want to switch to another branch, you can do so quickly from the **Source control** pane without disconnecting and reconnecting.  
When you switch branches, the workspace syncs with the new branch and all items in the workspace are overridden. If there are different versions of the same item in each branch, the item is replaced. If an item is in the old branch, but not the new one, it gets deleted.

>[!IMPORTANT]
>When switching branches, if the workspace contains an item in the old branch but not the new one, the item is deleted.

To switch between branches, follow these steps:

1. From the *Branches* tab of the **Source control** menu, select **Switch branch**.

    :::image type="content" source="media/manage-branches/check-out-new-branch.png" alt-text="Screenshot of source control check out a new branch option.":::

1. Specify the branch you want to connect to or create a new branch. This branch must contain the same directory as the current branch.

1. Place a check in **I understand workspace items may be deleted and can't be restored.** and select **Switch branch**.
    
    :::image type="content" source="media/manage-branches/switch-branch-component.png" alt-text="Screenshot of switching branches.":::

You can't switch branches if you have any uncommitted changes in the workspace. Select **Cancel** to go back and commit your changes before switching branches.

To connect the current workspace to a new branch while keeping the existing workspace status, select **Checkout new branch**. Learn more about checking out a new branch at [Resolve conflicts in Git](./conflict-resolution.md#resolve-conflict-in-git).

## Related content

- [Branch out](./branch-out.md)
- [Tutorial - Develop using client tools](./tutorial-develop-using-client-tools.md)
- [Tutorial - Develop in a seperate workspace](./tutorial-develop-seperate-workspace.md)
- [Resolve errors and conflicts](./conflict-resolution.md)
- [Git integration best practices](../best-practices-cicd.md)
