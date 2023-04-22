---
title: Manage a workspace with git
description: Learn how to connect a workspace to a git repo and branch, commit changes and sync.
author: mberdugo
ms.author: monaberdugo
ms.topic: how-to
ms.date: 05/23/2023
ms.custom: 
---

# Manage a workspace with git

This article explains how to perform the following tasks:

- [Connect to a git repo](#connect-a-workspace-to-an-azure-repo)
- [Commit changes](#commit-changes-to-git)
- [Update from git](#update-workspace-from-git)
- [Disconnect from git](#disconnect-a-workspace-from-git)

## Prerequisites

To integrate git with your Microsoft Fabric workspace, you need to set up the following in both Azure DevOps and Fabric.

### Azure DevOps prerequisites

- An active Azure DevOps account registered to the same user that is using the Fabric workspace. [Create a free account](https://azure.microsoft.com/products/devops/).
- Access to an existing repository

### Fabric prerequisites

You can access the git integration feature if one of the following conditions is met:

- You have a Premium license
- You have access to a Premium capacity workspace

## Connect a workspace to an Azure repo

Only a workspace admin can connect a workspace to an Azure Repo, but once connected, anyone with [permission](#permissions) can work in the workspace. If you're not an admin, ask your admin for help with connecting. To connect a workspace to an Azure Repo, follow these steps:

1. Sign into Power BI and navigate to the workspace you want to connect with.

1. Go to **Workspace settings**

    :::image type="content" source="./media/git-get-started/workspace-settings-new.png" alt-text="Screenshot of workspace with workspace settings icon displayed on top.":::

    > [!NOTE]
    > If you don't see the Workspace settings icon, select the ellipsis (three dots) the then workspace settings.
    > :::image type="content" source="./media/git-get-started/workspace-settings-link.png" alt-text="Screenshot of workspace with workspace settings link displayed from ellipsis.":::

1. Select Git integration. You’re automatically signed into the Azure Repos account registered to the Azure AD user signed into the workspace.

    :::image type="content" source="./media/git-get-started/workspace-settings.png" alt-text="Screenshot of workspace settings window with git integration selected.":::

1. From the dropdown menu, specify the following details about the branch you want to connect to:

    > [!NOTE]
    > You can only connect a workspace to one branch and folder at a time.

    - [Organization](/azure/devops/user-guide/plan-your-azure-devops-org-structure)
    - [Project](/azure/devops/user-guide/plan-your-azure-devops-org-structure#how-many-projects-do-you-need)
    - [Git repository](/azure/devops/user-guide/plan-your-azure-devops-org-structure#structure-repos-and-version-control-within-a-project)
    - Branch (Select an existing branch using the drop-down menu, or select **+ New Branch** to create a new branch)
    - Folder (Select an existing folder in that branch. If you don't select a folder, content will be created in the root folder.)

1. Select **Connect and sync**.

During the initial sync, if either the workspace or git branch is empty, content is copied from the nonempty location to the empty one. If both the workspace and git branch have content, you’re asked which direction the sync should go. For more information on this initial sync, see [Connect and sync](git-integration-process.md#connect-and-sync).

After you connect, the workspace will display information about source control that allows you to view the connected branch, the status of each item in the branch, and a **Source control** Pane where you can take actions related to git.

:::image type="content" source="./media/git-get-started/source-control-panel.png" alt-text="Screenshot of source control icon and other git information.":::

To keep your workspace synced with the git branch, [commit any changes](#commit-changes-to-git) you make in the workspace to the git branch, and [update your workspace](#update-workspace-from-git) whenever anyone creates new commits to the git branch.

## Commit changes to git

Once you successfully connect to a git folder, edit your workspace as usual. Any changes you save are saved in the workspace only. When you’re ready, you can commit your changes to the git branch, or you can undo the changes and revert to the previous status. 

### [Commit to git](#tab/commit-to-git)

To commit your changes to the git branch, follow these steps:

1. Go to the workspace.
1. Select the **Source control** button. This button also shows the number of uncommitted changes.
    :::image type="content" source="./media/git-get-started/source-control-number.png" alt-text="Screenshot of source control icon with the number 2 indicating that there are two changes to commit.":::
1. Select the **Changes** tab of the **Source control** pane.
   A list appears with all the items you changed, and an icon indicating if the changed item is *new* :::image type="icon" source="./media/git-get-started/new-commit-icon.png":::, *modified* :::image type="icon" source="./media/git-get-started/modified-commit-icon.png":::, or *deleted* :::image type="icon" source="./media/git-get-started/deleted-commit-icon.png":::.
1. Select the changes you want to commit.
1. Add a comment in the box. If you don't add a comment, a default message is added automatically.
1. Select **Commit**.

   :::image type="content" source="./media/git-get-started/commit-changes.png" alt-text="Screenshot of source control window with two changes selected to commit.":::

After the changes are committed, the content items that were committed are removed, and the workspace will point to the new commit that it's synced to.

:::image type="content" source="./media/git-get-started/no-changes.png" alt-text="Screenshot of source control window stating that there are no changes to commit.":::

### [Undo saved change](#tab/undo-save)

If, after you saved changes to the workspace, you decide that you don’t want to commit those changes to git, you can undo the changes and revert to the previous (unsaved) status. To undo your changes, follow these steps:

1. Go to the workspace.
1. Select the **Source control** button. This button also shows the number of uncommitted changes.
    :::image type="content" source="./media/git-get-started/source-control-number.png" alt-text="Screenshot of source control icon with the number 2 indicating that there are two changes to commit.":::
1. Select the **Changes** tab of the **Source control** pane.
   A list appears with all the items you changed, and an icon indicating if the changed item is *new* :::image type="icon" source="./media/git-get-started/new-commit-icon.png":::, *modified* :::image type="icon" source="./media/git-get-started/modified-commit-icon.png":::, or *deleted* :::image type="icon" source="./media/git-get-started/deleted-commit-icon.png":::.
1. Select the changes you want to undo.
1. Add a comment in the box. If you don't add a comment, a default message is added automatically.
1. Select **Undo**.

   :::image type="content" source="./media/git-get-started/undo-changes.png" alt-text="Screenshot of source control window with two changes selected to undo.":::
1. Select **Undo** again to confirm.

   :::image type="content" source="./media/git-get-started/undo-confirm.png" alt-text="Screenshot of source control window asking if you're sure you want to undo changes.":::

Your workspace reverts to how it was before you saved the changes.

:::image type="content" source="./media/git-get-started/no-changes.png" alt-text="Screenshot of source control window stating that there are no changes to commit.":::

## Update workspace from git

Whenever anyone commits a new change to the connected git branch, a notification appears in the relevant workspace. Pull latest changes, merges or reverts into the workspace and update live items through the **Source control** pane.

1. Go to the workspace.
1. Select the **Source control** icon.
1. Select the **Updates** tab of the **Source control** pane. A list appears with all the changed items in the branch since the last update.
1. Select **Update all**.

:::image type="content" source="./media/git-get-started/source-control-update.png" alt-text="Screenshot of source control pane with the update tab open and the updating all button selected.":::

After it updates successfully, the list of items is removed, and the workspace will point to the new commit that it's synced to.

:::image type="content" source="./media/git-get-started/no-updates.png" alt-text="Screenshot of source control window stating that you successfully updated the workspace.":::

## Disconnect a workspace from git

Only a workspace admin can disconnect a workspace from an Azure Repo. If you’re not an admin, ask your admin for help disconnecting. If you’re an admin and want to disconnect your repo, follow these steps:

1. Go to Workspace settings
1. Select Git integration
1. Select **Disconnect workspace**

    :::image type="content" source="media/git-get-started/disconnect-workspace.png" alt-text="Screenshot of workspace settings screen with disconnect workspace option.":::

## Permissions

The actions you can take on a workspace depend on the permissions you have in both the workspace and Azure DevOps. For a more detailed discussion of permissions, see [Permissions](./git-integration-process.md#permissions).

## Considerations and limitations

- The Azure AD user you’re using in Fabric is the same user you need to use in Azure Repos. There’s no way to edit or change users in Fabric.
- You can only sync in one direction at a time. You can’t do both commit and update at the same time.
- You need write permission to the workspace to update it.
- Only workspaces assigned to a Premium license can connect to Azure Repos.
- Maximum length of branch name is 244 characters.
- Maximum length of full path for file names is 250 characters. Longer names will fail
- If a branch contains only sub-directories without artifact directories, the connection will fail.
- Duplicating names is not allowed – even if Power BI allows it, the update will fail.
- B2B isn’t supported
- Item folder name is created once, but doesn’t the display name of an item in the workspace. To rename, change the relevant ‘Display name’ in the ‘Item.metadata.json’ file.
