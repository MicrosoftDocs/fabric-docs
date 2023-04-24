---
title: Git integration branches
description: Learn how to use git branches to work in your own isolated environment.
author: mberdugo
ms.author: monaberdugo
ms.service: powerbi
ms.topic: concept-article
ms.date: 05/23/2023
ms.custom: 
---

# Manage branches in Microsoft Fabric workspaces

The Fabric workspace is a shared environment that accesses live items. Any changes made directly in the workspace override and affect all other workspace users. Therefore, git best practice is for developers to work in isolation outside of the shared workspaces. There are two ways for a developer to work in their own protected workspace.

- [Develop using client tools](#develop-using-client-tools), such as Power BI Desktop for reports and datasets, or VS Code for Notebooks.
- [Develop in a separate workspace](#develop-using-another-workspace). Each developer has another workspace where they connect their own separate branch, sync the content into that workspace and then commit back to the branch.

To work with branches using git integration, first connect the shared development team’s workspace to a single shared branch. For example, if your team uses one shared workspace, connect it to the *main* branch in your team’s repository, and sync between the workspace and the repo. If your team’s workflow has multiple shared branches like *Dev/Test/Prod* branches, each branch can be connected to a different workspace.

Then, each developer can choose the isolated environment in which to work.

## Develop using client tools

The workflow for developers using a client tool like Power BI Desktop should look something like this:

1. Clone the repo into a local machine. (You only need to so this step once)
1. Use the local copy of the *PBIProj* to open the project in Power BI Desktop.
1. Make changes and save the updated files locally. Commits to the local repo.
1. When ready, push the branch and commits to the remote repo.
1. To test the changes against other items or more data, connect the new branch to a separate workspace, and upload the dataset and reports using the *update all* button in the source control pane. Do any tests or configuration changes there before merging into the *main* branch.

   If no tests are required in the workspace, the developer can create a PR to merge changes directly into the *main* branch, without the need for another workspace.

1. Once the changes are merged, the shared team’s workspace is prompted to accept the new commit. The changes are updated into the shared workspace and everyone can see the changes to those datasets and reports.

:::image type="content" source="./media/git-branches/branches-using-client-tools.png" alt-text="Diagram showing the workflow of pushing changes from a remote git repo to the Fabric workspace.":::

For a specific guidance on how to use the new Power BI Desktop file format in git, read more here.

## Develop using another workspace

:::image type="content" source="./media/git-branches/branches-using-another-workspace.png" alt-text="Diagram showing the workflow from a remote git repo to a feature branch and private workspace.":::

For a developer who works in the web, the flow would be as follows:

1. Create a new workspace (or use an existing one you already use).
1. Assign that workspace a Premium license.
1. Go to [**Git integration**](./git-get-started.md#connect-a-workspace-to-an-azure-repo) in workspace settings, and specify the repo details.
1. Under **Branch** drop down, choose **Create a new branch**, and branch it from the *main* branch.
1. In **Git folder**, enter the name of the folder you want to sync to in your repo.

   The workspace syncs with your feature branch, and becomes a copy of the Dev team's workspace, as illustrated. You can now work in this new isolated environment.

   :::image type="content" source="./media/git-branches/branches-update-commit.png" alt-text="Diagram showing the workflow of commits.":::

1. Save your changes and [commit](./git-get-started.md#commit-changes-to-git) them into the feature branch.
1. When ready, create a PR to the *main* branch. The review and merge processes are done through Azure Repos based on the configuration your team defined for that repo.

Once the review and merge are complete, a new commit is created to the *main* branch. This commit prompts the user to update the content in the Dev team's workspace with the merged changes.

## Next steps

[Get started with git integration](./git-get-started.md)
