---
title: Manage a workspace with git
description: Learn how to connect a workspace to a git repo and branch, commit changes and sync.
author: mberdugo
ms.author: monaberdugo
ms.topic: how-to
ms.date: 01/17/2023
ms.custom: 
---

# Manage a workspace with git

This article explains how to perform the following tasks:

- [Connect to a git repo](#connect-a-workspace-to-an-azure-repo)
- [Commit changes](#commit-changes-to-git)
- [Update from git](#update-workspace-from-git)
- [Disconnect from git](#disconnect-a-workspace-from-git)

## Prerequisites

To integrate git hub with your [!INCLUDE[Trident](../../includes/product-name.md)] workspace, you need to set up the following in both Azure DevOps and [!INCLUDE[Trident](../../includes/product-name.md)].

### Azure DevOps prerequisites

- An active Azure DevOps account registered to the same user that is using the [!INCLUDE[Trident](../../includes/product-name.md)] workspace. [Create a free account](https://azure.microsoft.com/products/devops/).
- Access to an existing repository

### [!INCLUDE[Trident](../../includes/product-name.md)] prerequisites

- Premium license
- Premium capacity workspace

## Connect a workspace to an Azure repo

Only a workspace admin can connect a workspace to Azure Repos, but once connected, anyone with permissions can work in the workspace. If you're not an admin, ask your admin for help with connecting. To connect a workspace to Azure Repos, follow these steps:

1. Sign into Power BI and navigate to the workspace you want to connect with.

1. Go to Workspace settings

    :::image type="content" source="./media/git-get-started/workspace-settings-new.png" alt-text="Screenshot of workspace with workspace settings icon displayed on top.":::

    > [!NOTE]
    > If you don't see the Workspace settings icon, select the ellipsis (three dots) the then workspace settings.
    > :::image type="content" source="./media/git-get-started/workspace-settings-link.png" alt-text="Screenshot of workspace with workspace settings link displayed from ellipsis.":::

1. Select Git integration

    :::image type="content" source="./media/git-get-started/workspace-settings.png" alt-text="Screenshot of workspace settings window with git integration selected.":::

1. From the dropdown menu, specify the following details about the branch you want to connect to:

    - Organization
    - Project
    - Git repository
    - Branch (Select an existing branch using the drop-down menu, or select **+ New Branch** to create a new branch)
    - Folder (Select an existing folder in that branch. If you don't select a folder, content will be created in the root folder.)

1. Select **Connect and sync**.

During the initial sync, if either the workspace or git branch is empty, content will be copied from the non-empty location to the empty one. If both the workspace and git branch have content, you’ll be asked which direction the sync should go. For more information on this initial sync, see [Connect and sync](git-integration-process.md#connect-and-sync).

After you connect, the workspace will have new information specific to source control that will allow you to view the connected branch, the status of each artifact and a **Source control** Pane to take actions related to git.

:::image type="content" source="./media/git-get-started/source-control-panel.png" alt-text="Screenshot of source control icon and other git information.":::

To keep your workspace synced with the git branch, [commit any changes](#commit-changes-to-git) you make in the workspace to the git branch, and [update your workspace](#update-workspace-from-git) whenever changes are made to the git branch.

## Commit changes to git

Once you successfully connect to a git folder, edit your workspace as usual. When you're ready to commit your changes to the git branch, follow these steps:

1. Go to the workspace.
1. Select the **Source control** button. This button also indicates the number of uncommitted changes.
    :::image type="content" source="./media/git-get-started/source-control-number.png" alt-text="Screenshot of source control icon with the number 2 indicating that there are two changes to commit.":::
1. Select the **Changes** tab of the **Source control** pane.
   You'll see a list of all the items you changed, with an icon indicating if the changed item is *new* :::image type="icon" source="./media/git-get-started/new-commit-icon.png":::, *modified* :::image type="icon" source="./media/git-get-started/modified-commit-icon.png":::, or *deleted* :::image type="icon" source="./media/git-get-started/deleted-commit-icon.png":::.
1. Select the changes you want to commit.
1. Add a comment in the box. If you don't add a comment, a default message is added automatically.
1. Select **Commit**.

   :::image type="content" source="./media/git-get-started/save-changes.png" alt-text="Screenshot of source control window with two changes selected to commit.":::

To revert to previous status, select **Undo**.

## Update workspace from git

Whenever a new commit is made to the connected git branch, a notification appears on the relevant workspace. Pull latest changes, merges or reverts into the workspace and update live artifacts through the **Source control** pane.

1. Go to the workspace.
1. Select the **Source control** icon.
1. Select the **Updates** tab of the **Source control** pane. You’ll see a list of all the items that were changed in the branch since the last update.
1. Select **Update all**.

:::image type="content" source="./media/git-get-started/source-control-update.png" alt-text="Screenshot of source control pane with the update tab open and the updating all button selected.":::

## Disconnect a workspace from git

1. Go to Workspace settings
1. Select Git integration
1. Select **Disconnect workspace**

    :::image type="content" source="media/git-get-started/disconnect-workspace.png" alt-text="Screenshot of workspace settings screen with disconnect workspace option.":::

## Permissions

The actions you can take on a workspace depend on the permissions you have in both the workspace and Azure DevOps. For a more detailed discussion of permissions, see [Permissions](./git-integration-process.md#permissions).

## Considerations and limitations

- You can only sync in one direction at a time. You can't do both commit and update at the same time.
- You need write permission to the workspace to update it.
