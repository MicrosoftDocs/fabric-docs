---
title: How to Use Git Integration for Fabric Data Warehouse Development and Deployment
description: Learn how to work with Fabric Data Warehouse in a git integrated workspace.
ms.reviewer: pvenkat, randolphwest
ms.date: 07/30/2026
ms.topic: how-to
---

# How to use Git integration for warehouse development and deployment

**Applies to**: [!INCLUDE [fabric-dw](includes/applies-to-version/fabric-dw.md)]

This article describes how to work with [Fabric Git integration and Fabric Data Warehouse](git-integration.md).

[!INCLUDE [feature-preview-note](../includes/feature-preview-note.md)]

It covers common development workflows including creating branches, updating Git repositories, syncing changes back to the Fabric workspace, and committing warehouse changes to Git. These workflows help enable version control, collaboration, and controlled deployment of warehouse schema changes.

## Git Workflow for Fabric Data Warehouse

From the **Workspace settings** page, you can easily set up a connection to your git provider. To set up the connection, see [Get started with Git integration](../cicd/git-integration/git-get-started.md). Follow instructions to **Connect to a Git repo** to either Azure DevOps or GitHub as a Git provider.

## Create or checkout/switch branch

You can manage Git branches for your Fabric Data Warehouse workspace. You can create a new branch, switch between branches, or branch out to a separate workspace.

:::image type="content" source="media/how-to-git-integration/source-control-current-branch.png" alt-text="Screenshot from the Fabric portal of the Current Branch window and drop down list." lightbox="media/how-to-git-integration/source-control-current-branch.png":::

- **Checkout new branch:** Create a new branch for this work. Always work in a new working branch, not `main`. To connect the current workspace to a new branch while keeping the existing workspace status, select **Checkout new branch**.

- **Branch out to another workspace:** For more information on creating or attaching workspaces to branches, see [Develop using another workspace](../cicd/git-integration/branched-workspace.md).

- **Switch between existing branches:** When you switch branches, the workspace syncs with the new branch and all items in the workspace are overridden. For more information, see [Switch branches](../cicd/git-integration/branched-workspace.md#switch-branches).

When you branch workflows, each warehouse analyzes its dependencies with other warehouses to determine the sequencing of item synchronization to ensure the branching workflows work as expected.

Learn more about checking out a new branch at [Resolve conflicts in Git](../cicd/git-integration/conflict-resolution.md#resolve-conflict-in-git).

## Develop locally by using a database project

You can perform **local development** by working with the warehouse database project from your Git repository. You can even develop against the warehouse's database project offline.

1. Clone the Git repository that contains the warehouse database project.
1. Open the database project locally, for example, in [Visual Studio Code](https://code.visualstudio.com/docs) with the [SQL database project extension](https://marketplace.visualstudio.com/items?itemName=ms-mssql.sql-database-projects-vscode).
1. Make schema updates or script changes directly in the database project.
1. Validate changes locally by building the database project for any errors.
1. When development is complete, commit and push your changes to the remote Git branch. Once pushed, the updated project definitions can be synchronized back to the Fabric workspace through Git integration workflows.

## Sync changes from Git back to the workspace

After completing development in a feature or working branch (not in `main`), you can synchronize the updated database project definitions from Git back to the Fabric workspace so that the warehouse reflects the latest approved changes.

1. If you created a feature branch earlier (for example, during branch creation or checkout), first create a **pull request** to review and merge your changes into the target branch. A pull request is simply a request to merge changes from one branch into another branch.
1. After the pull request is merged in Git, go to **Source Control** in the Fabric workspace.
1. Update or sync the workspace from the Git repository to apply the latest changes to the warehouse.

   :::image type="content" source="media/how-to-git-integration/source-control-sync-changes-update-all.png" alt-text="Screenshot from the Fabric portal showing the Update all button in the source control window, and a pending change waiting to be applied to the warehouse.":::

1. If conflicts occur while syncing changes between Git and the Fabric workspace, follow the [conflict resolution](../cicd/git-integration/conflict-resolution.md) guidance and resolve conflicts.

## Make changes and commit warehouse updates to Git

If you need to make changes directly to the live warehouse, you can still update source control from the live warehouse definition. 

> [!TIP]
> To manage schema changes in a structured, version-controlled format, work with warehouse schema files in database projects. You can plan schema changes to the warehouse, as described in [Develop locally by using a database project](#develop-locally-by-using-a-database-project), rather than making changes incrementally directly to the live warehouse state as described in this section. 

To review and commit your changes to a Git repository:

1. To create or modify warehouse objects, run **T-SQL statements** in the [Fabric portal SQL query editor](sql-query-editor.md), [SQL Server Management Studio (SSMS)](/sql/ssms/download-sql-server-management-studio-ssms), [MSSQL extension](https://aka.ms/mssql-marketplace) for [Visual Studio Code](https://code.visualstudio.com/docs), or other query tools. These changes update the **live warehouse schema**.
1. Go to **Source Control** in the Fabric workspace.
1. The modified warehouse appears as a **pending change item** in the changes list.
1. During branch-out or workspace-to-Git synchronization workflows, the system performs schema extraction by using **DacFx-based incremental extraction**. Schema extraction captures only relevant schema changes. Review the detected changes:
   - Compare the warehouse item definition with the current branch version.  
   - Validate schema differences for individual items or multiple items.
1. Select the warehouse items you want to commit.
1. Add a commit message and **commit the changes to the Git repository**.

   :::image type="content" source="media/how-to-git-integration/source-control-commit.png" alt-text="Screenshot of the source control menu in the Fabric portal, showing the commit dialogue and the optional commit message.":::

1. After committing:
   - Go to the Git repository.  
   - Verify the changes through the commit history and updated database project item.
   
   For example, a commit that removed the `Address` column from `dbo.Customers`:

     :::image type="content" source="media/how-to-git-integration/commit-difference.png" alt-text="Screenshot from the Fabric portal showing the difference in the two commits." lightbox="media/how-to-git-integration/commit-difference.png":::

## Related content

- [Understand git integration](../cicd/git-integration/git-integration-process.md)
- [Automate git integration using APIs](../cicd/git-integration/git-automation.md)
- [Troubleshoot Git integration for Fabric warehouse development](troubleshoot-git-integration.md)