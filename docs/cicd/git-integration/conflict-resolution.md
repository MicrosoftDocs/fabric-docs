---
title: Resolve conflicts with Git integration
description: Learn how to resolve conflicts when using Fabric's git integration tools.
author: mberdugo
ms.author: monaberdugo
ms.service: powerbi
ms.topic: how-to
ms.date: 05/23/2023
ms.custom: 
---

# Conflict resolution

A conflict occurs when changes are made *to the same item* in both the workspace and the remote git repository. When a conflict occurs, the git status says **Conflict** and both **Commit** and **Update** are disabled until the conflict is resolved.

:::image type="content" source="./media/conflict-resolution/conflict-status-workspace.png" alt-text="Screenshot of a report with a git status that says conflict.":::

You have two options:

- Revert either the workspace or the git repository to a previous synced state or
- Resolve the conflict in git.

## Revert to a previous synced state

You can revert either the workspace or the git branch to last synced state. If you revert the git branch to a previous commit, you can still see the changes made to the unsynced branch. If you revert the workspace, the changes are lost completely.

To revert to the prior synced state, do *one* of the following steps:

- Use the [Undo](./git-get-started.md#commit-changes-to-git) command to return all items in the workspace to their last synced state.
- Revert to the last synced state in git using the `git revert` command in Azure DevOps.

 You can also revert to a previous state by disconnecting and reconnecting the workspace. When you reconnect, [select the direction](./git-integration-process.md#connect-and-sync) you want to sync.

## Resolve conflict in git

If you made numerous changes and don’t want to revert to a previous state, you can try resolving the conflict in the git repo by creating a new branch and syncing it with the current one. **Only a workspace admin can create a new branch**:

1. From the **Source control** pane, check out a new branch using the last synced branch ID shown on bottom of screen

   :::image type="content" source="./media/conflict-resolution/checkout-new-branch.png" alt-text="Screenshot showing how to check out a new branch from the source control pane by selecting the down arrow.":::

   This step creates a new branch from the conflicted branch using the last synced git state, before changes were made that conflict with your changes. You can see your changes in the **Source control** pane, but there is nothing to update from the git branch.

1. Commit your changes into the new branch. This new branch now has the changes you made to the items connected to an earlier version of the git branch that doesn't conflict with your changes.
1. In git, resolve the conflicts between the original branch and the new branch.
1. In git, merge the new branch into the original branch
1. In Fabric, disconnect and reconnect your workspace to the original branch.

## Next steps

- [Manual update](./partial-update.md)
- [Deployment pipelines](../deployment-pipelines/intro-to-deployment-pipelines.md)
