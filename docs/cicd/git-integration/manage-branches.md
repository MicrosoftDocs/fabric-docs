---
title: Git integration branches
description: Learn how to use Git branches to work in your own isolated environment.
author: mberdugo
ms.author: monaberdugo
ms.reviewer: NimrodShalit
ms.service: fabric
ms.subservice: cicd
ms.topic: conceptual
ms.date: 06/23/2023
ms.custom:
  - build-2023
  - ignite-2023
---

# Manage branches in Microsoft Fabric workspaces

The Fabric workspace is a shared environment that accesses live items. Any changes made directly in the workspace override and affect all other workspace users. Therefore, Git best practice is for developers to work in isolation outside of the shared workspaces. There are two ways for a developer to work in their own protected workspace.

- [Develop using client tools](#develop-using-client-tools), such as [Power BI Desktop](https://powerbi.microsoft.com/desktop/) for reports and semantic models, or [VS Code](https://code.visualstudio.com/) for Notebooks.
- [Develop in a separate workspace](#develop-using-another-workspace). Each developer has their own workspace where they connect their own separate branch, sync the content into that workspace, and then commit back to the branch.

[!INCLUDE [preview-note](../../includes/feature-preview-note.md)]

To work with branches using Git integration, first connect the shared development team’s workspace to a single shared branch. For example, if your team uses one shared workspace, connect it to the *main* branch in your team’s repository, and sync between the workspace and the repo. If your team’s workflow has multiple shared branches like *Dev/Test/Prod* branches, each branch can be connected to a different workspace.

Then, each developer can choose the isolated environment in which to work.

## Develop using client tools

The workflow for developers using a client tool like Power BI Desktop should look something like this:

1. [Clone](/azure/devops/repos/git/clone?) the repo into a local machine. (You only need to do this step once.)
1. Open the project in Power BI Desktop using the local copy of the *PBIProj*.
1. Make changes and save the updated files locally. [Commit](/azure/devops/repos/git/gitquickstart#commit-your-work) to the local repo.
1. When ready, [push](/azure/devops/repos/git/pushing) the branch and commits to the remote repo.
1. Test the changes against other items or more data by connecting the new branch to a separate workspace, and uploading the semantic model and reports using the *update all* button in the source control pane. Do any tests or configuration changes there before merging into the *main* branch.

   If no tests are required in the workspace, the developer can merge changes directly into the *main* branch, without the need for another workspace.

1. Once the changes are merged, the shared team’s workspace is prompted to accept the new commit. The changes are updated into the shared workspace and everyone can see the changes to those semantic models and reports.

:::image type="content" source="./media/manage-branches/branches-using-client-tools.png" alt-text="Diagram showing the workflow of pushing changes from a remote Git repo to the Fabric workspace.":::

For a specific guidance on how to use the new Power BI Desktop file format in git, see [Source code format](./source-code-format.md).

## Develop using another workspace

For a developer who works in the web, the flow would be as follows:

1. Create a new workspace (or use an existing one you already use).
1. Assign that workspace a Premium license.
1. Go to [**Git integration**](./git-get-started.md#connect-a-workspace-to-an-azure-repo) in workspace settings, and specify the repo details.
1. Under **Branch** drop-down, choose **Create a new branch**, and branch it from the *main* branch.
1. In **Git folder**, enter the name of the folder you want to sync to in your repo.

   The workspace syncs with your feature branch, and becomes a copy of the Dev team's workspace, as illustrated. You can now work in this new isolated environment.

   :::image type="content" source="./media/manage-branches/branches-update-commit.png" alt-text="Diagram showing the workflow of commits.":::

1. Save your changes and [commit](./git-get-started.md#commit-changes-to-git) them into the feature branch.
1. When ready, create a PR to the *main* branch. The review and merge processes are done through Azure Repos based on the configuration your team defined for that repo.

Once the review and merge are complete, a new commit is created to the *main* branch. This commit prompts the user to update the content in the Dev team's workspace with the merged changes.

## Switch branches

If your workspace is connected to a Git branch and you want to switch to another branch, you can do so quickly from the workspace settings without disconnecting and reconnecting.  
When you switch branches, the workspace syncs with the new branch and all items in the workspace are overridden. If there are different versions of the same item in each branch, the item is replaced. If an item is in the old branch, but not the new one, it gets deleted.
To switch between branches, follow these steps:

1. Make sure the current branch is synced and all changes are committed.
1. From **Workspace settings**, select **Git integration**
1. From the dropdown menu, specify the branch you want to connect to. This branch must contain the same directory as the current branch.
1. Select **Connect and sync**.

    :::image type="content" source="media/manage-branches/switch-branch-connect-sync.png" alt-text="Screenshot of workspace settings screen with switch branch option.":::

1. Select **Switch and sync** again to confirm. If you have any unsaved changes in the workspace, they will be lost if you switch branches without saving them first. Select **Cancel** to go back and save your changes before switching branches.

    :::image type="content" source="media/manage-branches/switch-branch-confirm.png" alt-text="Screenshot of workspace settings screen asking if you're sure you want to switch branches.":::

## Related content

- [Resolve errors and conflicts](./conflict-resolution.md)
- [Git integration best practices](../best-practices-cicd.md)
