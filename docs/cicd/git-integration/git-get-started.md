---
title: Get started with Git integration
description: Learn how to connect a workspace to a Git repository and branch, commit changes to the repo or workspace and sync.
author: billmath
ms.author: billmath
ms.reviewer: NimrodShalit
ms.service: fabric
ms.subservice: cicd
ms.topic: quickstart
ms.date: 03/05/2025
ms.custom:
ms.search.form: Connect to a Git repo, Update from Git, Commit changes to Git, Introduction to Git integration
#customer intent: As a developer, I want to connect my workspace to a Git repo so that I can collaborate with others and leverage source control.
---

# Get started with Git integration

This article walks you through the following basic tasks in Microsoft Fabric’s Git integration tool:

- [Connect to a Git repo](#connect-a-workspace-to-a-git-repo)
- [Commit changes](#commit-changes-to-git)
- [Update from Git](#update-workspace-from-git)
- [Disconnect from Git](#disconnect-a-workspace-from-git)

We recommend reading the [overview of Git integration](./intro-to-git-integration.md) before you begin.

## Prerequisites

[!INCLUDE [github-prereqs](../includes/github-prereqs.md)]

## Connect a workspace to a Git repo

### Connect to a Git repo

Only a workspace admin can connect a workspace to a repository, but once connected, anyone with [permission](./git-integration-process.md#permissions) can work in the workspace. If you're not an admin, ask your admin for help with connecting. To connect a workspace to an Azure or GitHub Repo, follow these steps:

1. Sign into Fabric and navigate to the workspace you want to connect with.

1. Go to **Workspace settings**

    :::image type="content" source="./media/git-get-started/workspace-settings-new.png" alt-text="Screenshot of workspace with workspace settings icon displayed on top.":::

1. Select **Git integration**.

1. Select your Git provider. Currently, Azure DevOps and GitHub are supported.

#### [Azure DevOps Connect](#tab/Azure)

If you select Azure DevOps, select **Connect** to automatically sign into the Azure Repos account registered to the Microsoft Entra user signed into Fabric.

If you have already signed in to Azure from Fabric using a different account, select your account from the list and select **Connect**.

If it's your first time signing in from Fabric, or you want to add a new account, select **Add account**.

If it's the first time connecting, you need to Authorize your user. Provide the following information:

- *Display name* - must be unique for each user
- *Azure DevOps URL* - URL of the Azure DevOps repository. URL must be in the format `https://dev.azure.com/{organization}/{project}/_git/{repository}` or `https://{organization}.visualstudio.com/{project}/_git/{repo}`.
- *Authentication* - You can authenticate either with *OAuth2* or a *Service Principal*.  For more information see [Azure DevOps - Git Integration with service principal (preview)](git-integration-with-service-principal.md)

:::image type="content" source="./media/git-get-started/devops-add-account.png" alt-text="Screenshot of GitHub integration UI to add an account.":::

After you sign in, select **Connect** to allow Fabric to access your account

#### [GitHub Connect](#tab/GitHub)

If you select GitHub, you need to sign in to your GitHub account.
If you have already signed in to GitHub, select your account from the list and select **Connect**.

If it's your first time signing in from Fabric, or you want to add a new account, select **Add account**.

:::image type="content" source="./media/git-get-started/github-first-connect.png" alt-text="Screenshot of GitHub integration window without any existing accounts to select.":::

If it's the first time connecting, you need to <a href="https://docs.github.com/authentication/keeping-your-account-and-data-secure/about-authentication-to-github" target="_blank">Authorize</a> your GitHub user. Provide the following information:

- *Display name* - must be unique for each GitHub user
- *Personal access token* - <a href="https://docs.github.com/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens" target="_blank">your classic or fine-grained personal access token</a>
- *Repository URL* (optional) - If you don't enter a URL, you can connect to any repo you have access to. If you enter a URL, you can only connect to this repository.

:::image type="content" source="./media/git-get-started/github-add-account.png" alt-text="Screenshot of GitHub integration UI to add an account.":::

After you sign in, select **Connect** to allow Fabric to access your GitHub account.

---

### Connect to a workspace

If the workspace is already connected to Azure DevOps/GitHub, follow the instructions for [Connecting to a shared workspace](./git-integration-process.md#connect-to-a-shared-workspace).

#### [Azure DevOps branch connect](#tab/Azure)

1. From the dropdown menu, specify the following details about the branch you want to connect to:

    - [Organization](/azure/devops/user-guide/plan-your-azure-devops-org-structure)
    - [Project](/azure/devops/user-guide/plan-your-azure-devops-org-structure#how-many-projects-do-you-need)
    - [Git repository](/azure/devops/user-guide/plan-your-azure-devops-org-structure#structure-repos-and-version-control-within-a-project).
    - Branch (Select an existing branch using the drop-down menu, or select **+ New Branch** to create a new branch. You can only connect to one branch at a time.)
    - Folder (Type in the name of an existing folder or enter a name to create a new folder. If you leave the folder name blank, content is created in the root folder. You can only connect to one folder at a time.)

 :::image type="content" source="media/git-get-started/devops-connect-4.png" alt-text="Screenshot to Azure connection." lightbox="media/git-get-started/devops-connect-4.png":::


#### [GitHub branch connect](#tab/GitHub)

1. From the dropdown menu, specify the following details about the branch you want to connect to:

    - [Repository URL](/azure/devops/user-guide/plan-your-azure-devops-org-structure#structure-repos-and-version-control-within-a-project). If you connected to GitHub using a scoped token, the URL is automatically filled in and you can only connect to that repository.
    - Branch (Select an existing branch using the drop-down menu, or select **+ New Branch** to create a new branch. You can only connect to one branch at a time.)
    - Folder (Type in the name of an existing folder or enter a name to create a new folder. If you leave the folder name blank, content is created in the root folder. You can only connect to one folder at a time.)

:::image type="content" source="./media/git-get-started/github-connect-branch.png" alt-text="Screenshot to GitHub connection.":::

---

Select **Connect and sync**.

During the initial sync, if either the workspace or Git branch is empty, content is copied from the nonempty location to the empty one. If both the workspace and Git branch have content, you’re asked which direction the sync should go. For more information on this initial sync, see [Connect and sync](git-integration-process.md#connect-and-sync).

After you connect, the Workspace displays information about source control that allows the user to view the connected branch, the status of each item in the branch and the time of the last sync.

:::image type="content" source="./media/git-get-started/git-sync-information.png" alt-text="Screenshot of source control icon and other Git information.":::

To keep your workspace synced with the Git branch, [commit any changes](#commit-changes-to-git) you make in the workspace to the Git branch, and [update your workspace](#update-workspace-from-git) whenever anyone creates new commits to the Git branch.

## Commit changes to git

Once you successfully connect to a Git folder, edit your workspace as usual. Any changes you save are saved in the workspace only. When you’re ready, you can commit your changes to the Git branch, or you can undo the changes and revert to the previous status.  
<!----
If any items in the workspace are in folders, the folder structure is preserved in the Git repository when you commit changes. Empty folders are ignored.  --->
Read more about [commits](git-integration-process.md#commit).

### [Commit to Git](#tab/commit-to-git)

To commit your changes to the Git branch, follow these steps:

1. Go to the workspace.
1. Select the **Source control** icon. This icon shows the number of uncommitted changes.
    :::image type="content" source="./media/git-get-started/source-control-number.png" alt-text="Screenshot of source control icon with the number 2 indicating that there are two changes to commit.":::
1. Select the **Changes** from the **Source control** panel.
   A list appears with all the items you changed, and an icon indicating if the item is *new* :::image type="icon" source="./media/git-get-started/new-commit-icon.png":::, *modified* :::image type="icon" source="./media/git-get-started/modified-commit-icon.png":::, *conflict* :::image type="icon" source="./media/git-get-started/conflict-icon.png":::, *same change* :::image type="icon" source="./media/git-get-started/warning.png":::, or *deleted* :::image type="icon" source="./media/git-get-started/deleted-commit-icon.png":::.
1. Select the items you want to commit. To select all items, check the top box.
1. Add a comment in the box. If you don't add a comment, a default message is added automatically.
1. Select **Commit**.

   :::image type="content" source="./media/git-get-started/commit-changes.png" alt-text="Screenshot of source control window with two changes selected to commit.":::

After the changes are committed, the items that were committed are removed from the list, and the workspace points to the new commit that it synced to.

:::image type="content" source="./media/git-get-started/no-changes.png" alt-text="Screenshot of source control window stating that there are no changes to commit.":::

After the commit is completed successfully, the status of the selected items changes from **Uncommitted** to **Synced**.

### [Undo saved change](#tab/undo-save)

After saving changes to the workspace, if you decide that you don’t want to commit those changes to git, you can undo the changes and revert those items to their previous status. To undo your changes, follow these steps:

1. Go to the workspace.
1. Select the **Source control** button. This button also shows the number of uncommitted changes.
    :::image type="content" source="./media/git-get-started/source-control-number.png" alt-text="Screenshot of source control icon with the number 2 indicating that there are two changes to commit.":::
1. Select **Changes** from the **Source control** panel.
   A list appears with all the items you changed, and an icon indicating if the changed item is *new* :::image type="icon" source="./media/git-get-started/new-commit-icon.png":::, *modified* :::image type="icon" source="./media/git-get-started/modified-commit-icon.png":::, *conflict* :::image type="icon" source="./media/git-get-started/conflict-icon.png":::, or *deleted* :::image type="icon" source="./media/git-get-started/deleted-commit-icon.png":::.
1. Select the changes you want to undo.
1. Place a check in the **I understand that workspace items may be deleted and can't be restored** box and select **Undo**.

   :::image type="content" source="./media/git-get-started/undo-changes.png" alt-text="Screenshot of source control window with two changes selected to undo.":::
1. Select **Undo** again to confirm. The dialog you see may vary depending on whether or not items that will be deleted are detected.  The first screenshot shows no deletes.  The second, if deletes are detected.

   :::image type="content" source="./media/git-get-started/undo-confirm-2.png" alt-text="Screenshot of source control window asking if you're sure you want to undo changes.":::

      :::image type="content" source="./media/git-get-started/undo-confirm-3.png" alt-text="Screenshot of source control window asking if you're sure you want to undo changes when items that will be deleted are detected.":::

The selected items in your workspace revert to how they were when the workspace was last synced.

> [!IMPORTANT]
> If you delete an item and then undo the changes, the item is created anew and some of the metadata might be lost. For example, the sensitivity labels aren’t kept and should be reset, and the owner of the item is set to the current user.

---

## Update workspace from Git

Whenever anyone commits a new change to the connected Git branch, a notification appears in the relevant workspace. Use the **Source control** panel to pull the latest changes, merges, or reverts into the workspace and update live items. Changes to folders are also updated. Read more about [updating](git-integration-process.md#update).

To update a workspace, follow these steps:

1. Go to the workspace.
1. Select the **Source control** icon.
1. Select **Updates** from the Source control panel. A list appears with all the items that were changed in the branch since the last update.
1. Select **Update all**.

 :::image type="content" source="./media/git-get-started/update-1.png" alt-text="Screenshot of source control panel with the update tab open and the updating all button selected.":::

5. On the confirmation diaglog, select **Update**.

 :::image type="content" source="./media/git-get-started/update-2.png" alt-text="Screenshot of confirmation diaglog.":::

After it updates successfully, the list of items is removed, and the workspace points to the new workspace that it's synced to.

:::image type="content" source="./media/git-get-started/no-updates.png" alt-text="Screenshot of source control window stating that you successfully updated the workspace.":::

After the update is completed successfully, the status of the items changes to **Synced**.

## Disconnect a workspace from Git

Only a workspace admin can disconnect a workspace from a Git Repo. If you’re not an admin, ask your admin for help with disconnecting. If you’re an admin and want to disconnect your repo, follow these steps:

1. Go to **Workspace settings**
1. Select **Git integration**
1. Select **Disconnect workspace**
1. Select **Disconnect** again to confirm.

## Permissions

The actions you can take on a workspace depend on the permissions you have in both the workspace and the Git repo. For a more detailed discussion of permissions, see [Permissions](./git-integration-process.md#permissions).

## Considerations and limitations

 [!INCLUDE [limitations](../includes/git-limitations.md)]

## Related content

- [Understand the Git integration process](./git-integration-process.md)
- [Manage Git branches](./manage-branches.md)
- [Git integration best practices](../best-practices-cicd.md)
