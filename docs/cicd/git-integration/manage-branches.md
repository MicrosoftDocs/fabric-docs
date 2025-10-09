---
title: Git integration workspaces
description: Learn how to develop an app using Git branches to work in your own isolated workspace environment and improve collaboration with your team.
author: billmath
ms.author: billmath
ms.reviewer: NimrodShalit
ms.service: fabric
ms.subservice: cicd
ms.topic: concept-article
ms.date: 10/27/2024
ms.custom:
#customer intent: As a developer, I want to learn how to use Git branches in Fabric so that I can work in my own isolated environment.
---

# Manage branches in Microsoft Fabric workspaces

The goal of this article is to present Fabric developers with different options for building CI/CD processes in Fabric, based on common customer scenarios. This article focuses more on the *continuous integration (CI)* part of the CI/CD process. For a discussion of the continuous delivery (CD) part, see [manage deployment pipelines](../manage-deployment.md).

This article outlines a few distinct integration options, but many organizations use a combination of them.  

## Prerequisites

[!INCLUDE [prerequisites](../includes/github-prereqs.md)]

## Development process

The Fabric workspace is a shared environment that accesses live items. Any changes made directly in the workspace override and affect all other workspace users. Therefore, Git best practice is for developers to work in isolation outside of the shared workspaces. There are two ways for a developer to work in their own protected workspace.

- [Develop using client tools](#scenario-1---develop-using-client-tools), such as [Power BI Desktop](https://powerbi.microsoft.com/desktop/) for reports and semantic models, or [VS Code](https://code.visualstudio.com/) for Notebooks.
- [Develop in a separate Fabric workspace](#scenario-2---develop-using-another-workspace). Each developer has their own workspace where they connect their own separate branch, sync the content into that workspace, and then commit back to the branch.

To work with branches using Git integration, first connect the shared development team’s workspace to a single shared branch. For example, if your team uses one shared workspace, connect it to the *main* branch in your team’s repository, and sync between the workspace and the repo. If your team’s workflow has multiple shared branches like *Dev/Test/Prod* branches, each branch can be connected to a different workspace.

Then, each developer can choose the isolated environment in which to work.

### Scenario 1 - Develop using client tools

If the items you're developing are available in other tools, you can work on those items directly in the client tool. Not all items are available in every tool. Items that are only available in Fabric need to be developed in Fabric.

The workflow for developers using a client tool like Power BI Desktop should look something like this:

1. [Clone](/azure/devops/repos/git/clone?) the repo onto a local machine. (You only need to do this step once.)
1. Open the project in Power BI Desktop using the local copy of the *PBIProj*.
1. Make changes and save the updated files locally. [Commit](/azure/devops/repos/git/gitquickstart#commit-your-work) to the local repo.
1. When ready, [push](/azure/devops/repos/git/pushing) the branch and commits to the remote repo.
1. Test the changes against other items or against more data. To test the changes, connect the new branch to a separate workspace, and upload the semantic model and reports using the *update all* button in the source control panel. Do any tests or configuration changes there before merging into the *main* branch.

   If no tests are required in the workspace, the developer can merge changes directly into the *main* branch, without the need for another workspace.

1. Once the changes are merged, the shared team’s workspace is prompted to accept the new commit. The changes are updated into the shared workspace and everyone can see the changes to those semantic models and reports.

:::image type="content" source="./media/manage-branches/branches-using-client-tools.png" alt-text="Diagram showing the workflow of pushing changes from a remote Git repo to the Fabric workspace.":::

For a specific guidance on how to use the new Power BI Desktop file format in git, see [Source code format](./source-code-format.md).

### Scenario 2 - Develop using another workspace

For a developer who works in the web, the flow would be as follows:

1. From the *Branches* tab of the **Source control** menu, select **Branch out to another workspace**.

    :::image type="content" source="./media/manage-branches/branch-out.png" alt-text="Screenshot of source control branch out option.":::

1. Specify if you want to create a new workspace or switch to an existing one. Specify the names of the new branch and workspace, or select the existing workspace from the dropdown list. You will see the following screenshot when creating a new workspace.

>[!NOTE]
>When you branch out to a workspace, any items that aren't saved to Git can get lost. We recommend that you commit any items you want to keep before branching out.
   
   :::image type="content" source="./media/manage-branches/branch-out-details.png" alt-text="Screenshot of branch out specifying the name of the new branch and workspace.":::

>[!IMPORTANT]
>When you branch out to an exisiting workspace some items may be deleted.

For an existing workspace, you will see the screenshot below which warns that connecting to an existing workspace may result in some items being deleted.
   
   :::image type="content" source="./media/manage-branches/branch-out-existing-workspace.png" alt-text="Screenshot of branch out specifying existing branch and workspace.":::

1. Select **Branch out**.

   Fabric creates the new workspace and branch. You're automatically taken to the new workspace.

   The workspace syncs with your feature branch, and becomes an isolated environment to work in, as illustrated. You can now work in this new isolated environment. The sync might take a few minutes. For more information on branching out, see [troubleshooting tips](../troubleshoot-cicd.md#branching-out-i-dont-see-the-branch-i-want-to-connect-to).

   :::image type="content" source="./media/manage-branches/branches-update-commit.png" alt-text="Diagram showing the workflow of commits.":::

1. Save your changes and [commit](./git-get-started.md#commit-changes-to-git) them into the feature branch.
1. When ready, create a PR to the *main* branch. The review and merge processes are done through Azure Repos based on the configuration your team defined for that repo.

Once the review and merge are complete, a new commit is created to the *main* branch. This commit prompts the user to update the content in the Dev team's workspace with the merged changes.

For more information, see [branching out limitations](./git-integration-process.md#branching-out-limitations).

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

- [Resolve errors and conflicts](./conflict-resolution.md)
- [Git integration best practices](../best-practices-cicd.md)
