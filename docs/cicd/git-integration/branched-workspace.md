---
title: Development process using branch workspace
description: Learn how developers can use the Fabric branch-out experience in their development process.
ms.reviewer: PrigalYaron
ms.topic: concept-article
ms.date: 09/01/2026
ai-usage: ai-assisted
---

# Development process using branch workspace
Branch workspace is a workspace that is linked to a source workspace. It lets developers work on changes in an isolated environment, understand how their work relates to other workspaces, and promote changes back to the main workspace with confidence.

The relationship (link) between a branch workspace and its source workspace is established when the user performs branch-out. For Fabric developers, branch-out creates a new Git branch from the source workspace connected branch. The user can choose either to create a new workspace connected to new created branch, or use an existing workspace by switching its Git branch to the newly created one.

> [!NOTE]
> If you set up an automation flow that performs the same actions as branch-out, use the
> preview [Create Workspace Relation API](/rest/api/fabric/core/git/create-workspace-relation)
> to create the branch workspace relationship. Call this API after the flow prepares the
> branch workspace, creates the Git branch, and configures the workspace's Git connection.

## Branch workspace
The branch workspace relationship has several visual representations in the Fabric UI:
- Workspace tree: Represents the source workspace as the parent of the branch workspace

   :::image type="content" source="media/branch-out/branch-6.png" alt-text="Screenshot of workspace tree hierarchy with branch workspaces." lightbox="media/branch-out/branch-6.png":::

- Workspace breadcrumbs: Navigation option from branch workspace to source workspace 

   :::image type="content" source="media/branch-out/branch-7.png" alt-text="Screenshot of branch workspace breadcrumbs." lightbox="media/branch-out/branch-7.png":::

- Source control - [related branches](./git-integration-process.md#branches) tab

   :::image type="content" source="media/branch-out/branch-8.png" alt-text="Screenshot of branch workspace related branches." lightbox="media/branch-out/branch-8.png":::

## Branch-out operation

By default, when a branch‑out operation completes, all items from the source branch are included in the target workspace. This behavior can be changed by selecting **Select items individually** during the branch‑out setup, allowing only chosen items to be included in the target workspace to allow faster time to code experience.

As a Fabric developer, the branch-out flow would be as follows:

1. In the **Source control** pane, select **Branch out**.

    :::image type="content" source="./media/manage-branches/branch-out.png" alt-text="Screenshot of source control branch out option.":::

2. Specify if you want to create a new workspace or branch-out into an existing one. Enter the names of the new branch and workspace, or select the existing workspace from the dropdown list. If you choose to branch-out to new workspace, you might be able to toggle on/off the **Use branch workspace admin profile (Preview)**

> [!NOTE]
> The branch workspace admin profile (Preview) option is available only when a workspace admin
> has configured a profile. When you branch out from an existing branch workspace, this option is
> available only if the parent workspace has a branch workspace admin profile configured. For more
> information, see
> [Configure branch workspace admin profiles (Preview)](./branch-workspace-admin-profile.md).
>
> Before branch-out begins, Fabric validates whether your identity can complete the operation.
> If validation fails, Fabric displays an error and prevents the operation from starting. You
> might need to use the configured admin profile to continue, or branch out to an existing
> workspace instead. This early validation prevents an operation that would otherwise fail.

3. Check the **Select items individually** in case you would like to work only on subset of the items in the branch workspace. You will see the following screenshot when creating a new workspace with selective branching.

> [!IMPORTANT]
> When you branch out to an existing workspace, items that aren't saved to Git might be
> deleted. Commit any items you want to keep before continuing. You must confirm that you
> understand this risk before starting the branch-out operation.
   
   :::image type="content" source="media/branch-out/branch-2.png" alt-text="Screenshot of select items individually." lightbox="media/branch-out/branch-2.png":::

4. Click the **Branch out** button (steps 5-9 apply only when **Select items individually** is selected)
5. This action brings up a dialog to **Select items for your workspace**.
6. Select the items that you want for this workspace.
7. Click **Create branch**.

   :::image type="content" source="media/branch-out/branch-4.png" alt-text="Screenshot of create branch." lightbox="media/branch-out/branch-4.png":::
8. When you perform selective branching, all the item's dependencies are required. You can use the **select related items** button for that purpose. If you don't select one of the dependencies, you see the following:
  :::image type="content" source="media/branch-out/branch-3.png" alt-text="Screenshot of dependency error." lightbox="media/branch-out/branch-3.png":::

   > [!NOTE]
   > You can select items and start branch-out while Fabric calculates their dependencies in the
   > background. However, proceeding before all related items are loaded might cause the operation
   > to fail.

9. Once the branch is created, you can verify that you are in a selective branch by the icon in the bottom status bar (lower left corner). It says selective branch.
:::image type="content" source="media/branch-out/branch-5.png" alt-text="Screenshot of selective branch icon." lightbox="media/branch-out/branch-5.png":::
10. Fabric creates the new branch workspace. You're automatically taken to the new workspace. It contains all items or only the items that you selected in case of selective branching.

   The workspace syncs with your feature branch, and becomes an isolated environment to work in, as illustrated below. You can now work in this new branch workspace. The sync might take a few minutes. For more information on branching out, see [troubleshooting tips](../troubleshoot-cicd.md#branching-out-i-dont-see-the-branch-i-want-to-connect-to).

   :::image type="content" source="./media/manage-branches/branches-update-commit.png" alt-text="Diagram showing the workflow of commits.":::

11. Save your changes and [commit](./git-get-started.md#commit-changes-to-git) them into the feature branch.
12. When ready, create a PR to the *main* branch. The review and merge processes are done through related Git provider based on the configuration your team defined for that repo.

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

Performing switch branch doesn't affect the relationship (link) between a branch workspace and its source workspace. Branch switching is a Git state change. Thus, switching branches doesn't create or modify workspace relationships. If a workspace already has a relationship, then it is preserved.

By default, switching a connected workspace's Git branch (or checking out a new branch) is restricted to workspace Admins. However, a workspace Admin can enable the per-workspace setting **Allow users with at least Contributor role to change Git branch** to allow branch switching capabilities to Members/Contributors. This setting is configured per-workspace and requires an active Git connection. For the full permissions matrix, see [Permissions](./git-integration-process.md#permissions).

>[!NOTE]
>When switching branches, if the workspace contains an item in the old branch but not the new one, the item is deleted. Additionally, in a workspace with selective branching, performing a switch operation resets the item selection, and all items from the switched branch are synchronized to the workspace.

To switch between branches, follow these steps:

1. In the **Source control** pane, select **More options** (...), and then select **Switch branch**.

   :::image type="content" source="media/manage-branches/check-out-new-branch.png" alt-text="Screenshot of source control check out a new branch option.":::

1. Specify the branch you want to connect to or create a new branch. This branch must contain the same directory as the current branch.

1. Place a check in **I understand workspace items may be deleted and can't be restored.** and select **Switch branch**.
    
   :::image type="content" source="media/manage-branches/switch-branch-component.png" alt-text="Screenshot of switching branches.":::

You can't switch branches if you have any uncommitted changes in the workspace. Select **Cancel** to go back and commit your changes before switching branches.

To connect the current workspace to a new branch while keeping the existing workspace status, select **Checkout new branch**. Learn more about checking out a new branch at [Resolve conflicts in Git](./conflict-resolution.md#resolve-conflict-in-git).


### Branching out limitations
- Branch workspace admin profile is in Preview.
- Branch out requires permissions listed in [permissions table](./git-integration-process.md#permissions).
- There must be an available capacity for this action.
- All [workspace](./git-integration-process.md#workspace-limitations) and [branch naming limitations](./git-integration-process.md#branch-and-folder-limitations) apply when branching out to a new workspace.
- Only [Git supported items](./intro-to-git-integration.md#supported-items) are available in the new workspace.
- The related branches list only shows branches and workspaces you have permission to view.
- [Git integration](../../admin/git-integration-admin-settings.md) must be enabled.
- When branching out, a new branch is created and the settings from the original branch aren't copied. Adjust any settings or definitions to ensure that the new workspace meets your organization's policies.
- When disconnecting a branch workspace from Git, its relationship to the source workspace is removed as well.
- When disconnecting a Git-connected workspace that has related branch workspaces, all branch workspace relationships are removed as well.
- When deleting a workspace that has related branch workspaces, all branch workspace relationships are removed, and the branch workspaces become regular workspaces.
- When branching out to an existing workspace:
  - The target workspace must support a Git connection.
  - The user must be an admin of the target workspace or Member/Contributor on target workspace with the **Allow users with at least Contributor role to change Git branch** setting enabled.
  - The target workspace must have capacity.
  - The workspace can't have template apps.
  - The target workspace can't have any related branch workspaces.
  - When you branch out to an existing workspace, any items that aren't saved to Git can get lost. We recommend that you [commit](./git-integration-process.md#commits-and-updates) any items you want to keep before branching out.



## Related content

- [Development process in Microsoft Fabric](manage-branches.md)
- [Configure a branch worksapce admin profile](branch-workspace-admin-profile.md)
- [Basic concepts in Git integration](git-integration-process.md)
- [Git integration tenant settings](../../admin/git-integration-admin-settings.md)
- [About tenant settings](../../admin/about-tenant-settings.md)
- [Roles in workspaces in Microsoft Fabric](../../fundamentals/roles-workspaces.md)
