---
title: Development process using Branch-Out experience
description: Learn how to developer can leverage Fabric branch-out experience into their development process
ms.reviewer: PrigalYaron
ms.topic: concept-article
ms.date: 03/21/2026
---

# Development process using branched workspace
*Branched workspace* is a workspace that is linked to a source workspace. It lets developers work on changes in an isolated environment, understand how their work relates to other workspaces, and promote changes back to the main workspace with confidence.

The relationship (link) between a *Branched workspace* and its source workspace is established when the user performs branch-out. For Fabric developers, branch-out creates a new Git branch from the latest commit of the source workspace’s currently connected branch. The user can then either create a new workspace connected to that new branch, or use an existing workspace by switching its Git connection to the newly created branch.

## Branched Workspace
The *Branched workspace* relationship has several visual representations in the Fabric UI:
- Workspace tree: Represents the source workspace as the parent of the branched workspace

   :::image type="content" source="media/branch-out/branch-6.png" alt-text="Workspace tree hierarchy with branched workspaces." lightbox="media/branch-out/branch-6.png":::

- Workspace breadcrumbs: Navigation option from branched workspace to source workspace 

   :::image type="content" source="media/branch-out/branch-7.png" alt-text="Branched workspace breadcrumbs." lightbox="media/branch-out/branch-7.png":::

- Source control - [related branches](./git-integration-process.md#branches) tab

   :::image type="content" source="media/branch-out/branch-8.png" alt-text="Branched workspace related branches." lightbox="media/branch-out/branch-8.png":::

## Branch-Out Operation

By default, when a branch‑out operation completes, all items from the source branch are included in the target workspace. This behavior can be changed by selecting **Select items individually (Preview)** during the branch‑out setup, allowing only chosen items to be included in the target workspace to allow faster time to code experience.

As a Fabric developer, the branch-out flow would be as follows:

1. From the *Branches* tab of the **Source control** menu, select **Branch out to another workspace**.

    :::image type="content" source="./media/manage-branches/branch-out.png" alt-text="Screenshot of source control branch out option.":::

2. Specify if you want to create a new workspace or branch-out into an existing one. Specify the names of the new branch and workspace, or select the existing workspace from the dropdown list. Check the **Select items individually (Preview)** in case you would like to work only on subset of the items in the branched workspace. You will see the following screenshot when creating a new workspace with selective branching.

 >[!NOTE]
 >When you branch out to a workspace, any items that aren't saved to Git can get lost. We recommend that you commit any items you want to keep before branching out.
   
   :::image type="content" source="media/branch-out/branch-2.png" alt-text="Screenshot of select items individually." lightbox="media/branch-out/branch-2.png":::

 >[!IMPORTANT]
 >When branching out to an existing workspace, some items may be deleted. You must confirm that you understand this risk before proceeding with the operation

3. Click the **Branch out** button (steps 4-8 apply only when **Select items individually (Preview)** is selected)
4. This action brings up a dialog to **Select items for your workspace**.

 >[!NOTE]
 >If the Git branch contains a large number of items, the Select items dialog may take some time to load.

5. Select the items that you want for this workspace.
6. Click **Create branch**.
 :::image type="content" source="media/branch-out/branch-4.png" alt-text="Screenshot of create branch." lightbox="media/branch-out/branch-4.png":::
7. When you perform selective branching, all the item’s dependencies are required. You can use the **select related items** button for that purpose. If you don't select one of the dependencies, you see the following:
  :::image type="content" source="media/branch-out/branch-3.png" alt-text="Screenshot of dependency error." lightbox="media/branch-out/branch-3.png":::
8. Once the branch is created, you can verify that you are in a selective branch by the icon in the bottom status bar (lower left corner). It says selective branch.
:::image type="content" source="media/branch-out/branch-5.png" alt-text="Screenshot of selective branch icon." lightbox="media/branch-out/branch-5.png":::
9. Fabric creates the new branched workspace. You're automatically taken to the new workspace. It contains all items or only the items that you selected in case of selective branching.

   The workspace syncs with your feature branch, and becomes an isolated environment to work in, as illustrated. You can now work in this new branched workspace. The sync might take a few minutes. For more information on branching out, see [troubleshooting tips](../troubleshoot-cicd.md#branching-out-i-dont-see-the-branch-i-want-to-connect-to).

   :::image type="content" source="./media/manage-branches/branches-update-commit.png" alt-text="Diagram showing the workflow of commits.":::

10. Save your changes and [commit](./git-get-started.md#commit-changes-to-git) them into the feature branch.
11. When ready, create a PR to the *main* branch. The review and merge processes are done through related Git provider based on the configuration your team defined for that repo.

Once the review and merge are complete, a new commit is created to the *main* branch. This commit prompts the user to update the content in the Dev team's workspace with the merged changes.

For more information, see [branching out limitations](#branching-out-limitations).

### How to add additional items to a workspace with selective branching
When a Fabric developer needs to add items that were not selected during the branch‑out operation, the steps below describe how to add additional items to the workspace:
1. Go to the required Fabric workspace, and select **Source control** at the top.
2. On the right, select the **branch out** symbol.
3. Use the drop-down and select **Select additional items**.
4. This action brings up a dialog to **Select items for your workspace**. The select items dialog shows **only** items from the git branch that weren't previously selected.
5. Select the additional items you want to add to the workspace.
6. Click **Add**. The selected items are added to the pending updates in the source control pane.
7. Click **Update all**. This operation performs an update from git and creates the items in the workspace.

### Switch branches
If your workspace is connected to a Git branch and you want to switch to another branch, you can do so quickly from the **Source control** pane without disconnecting and reconnecting.  

When you switch branches, the workspace syncs with the new branch and all items in the workspace are overridden. If there are different versions of the same item in each branch, the item is replaced.

Be aware that folder relations are created or deleted only by explicit structural operations (Branch‑out, disconnect, delete) — not by Git state changes. Branch switching is a Git state change. Thus, switching branches doesn't create or modify workspace folder relations. If a workspace already has a relation, the relation is preserved.

>[!NOTE]
>When switching branches, if the workspace contains an item in the old branch but not the new one, the item is deleted. Additionally, in a workspace with selective branching, performing a switch operation resets the item selection, and all items from the switched branch are synchronized to the workspace.

To switch between branches, follow these steps:

1. From the *Branches* tab of the **Source control** menu, select **Switch branch**.

    :::image type="content" source="media/manage-branches/check-out-new-branch.png" alt-text="Screenshot of source control check out a new branch option.":::

1. Specify the branch you want to connect to or create a new branch. This branch must contain the same directory as the current branch.

1. Place a check in **I understand workspace items may be deleted and can't be restored.** and select **Switch branch**.
    
    :::image type="content" source="media/manage-branches/switch-branch-component.png" alt-text="Screenshot of switching branches.":::

You can't switch branches if you have any uncommitted changes in the workspace. Select **Cancel** to go back and commit your changes before switching branches.

To connect the current workspace to a new branch while keeping the existing workspace status, select **Checkout new branch**. Learn more about checking out a new branch at [Resolve conflicts in Git](./conflict-resolution.md#resolve-conflict-in-git).

### Branching out limitations

- Branch out requires permissions listed in [permissions table](./git-integration-process.md#permissions).
- There must be an available capacity for this action.
- All [workspace](./git-integration-process.md#workspace-limitations) and [branch naming limitations](./git-integration-process.md#branch-and-folder-limitations) apply when branching out to a new workspace.
- Only [Git supported items](./intro-to-git-integration.md#supported-items) are available in the new workspace.
- The related branches list only shows branches and workspaces you have permission to view.
- [Git integration](../../admin/git-integration-admin-settings.md) must be enabled.
- When branching out, a new branch is created and the settings from the original branch aren't copied. Adjust any settings or definitions to ensure that the new meets your organization's policies.
- When disconnecting a *branched workspace* from Git, its relationship to the source workspace is removed as well.
- When disconnecting a Git-connected workspace that has related *branched workspaces*, all branched workspace relationships are removed as well.
- When deleting a workspace that has related *branched workspaces*, all branched workspace relationships are removed, and the branched workspaces become regular workspaces.
- When branching out to an existing workspace:
  - The target workspace must support a Git connection.
  - The user must be an admin of the target workspace.
  - The target workspace must have capacity.
  - The workspace can't have template apps.
  - The target workspace can’t have any related *branched workspaces*.

- **Note that when you branch out to a workspace, any items that aren't saved to Git can get lost. We recommend that you [commit](./git-integration-process.md#commits-and-updates) any items you want to keep before branching out.**
