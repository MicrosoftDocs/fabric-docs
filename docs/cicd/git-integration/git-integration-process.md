---
title: Git integration process
description: Understand how Microsoft Fabric interacts with git on Azure Repos
author: mberdugo
ms.author: monaberdugo
ms.topic: conceptual 
ms.date: 01/17/2023
ms.custom: 
---

# Basic concepts in git integration

This article explains basic git concepts and the process of integrating git with your Microsoft Fabric workspace.

## Permissions

The actions you can take on a workspace depend on the permissions you have in both the workspace and Azure DevOps. 

### Azure DevOps permissions

The following list shows what different workspace roles can do depending on their Azure DevOps permissions:

- **Admin**: Can perform any operation on the workspace, limited only by their Azure DevOps role.
- **Member/Contributor**: Once connected to a workspace, a member/contributor can commit and update changes, depending on their Azure DevOps role. For actions related to the workspace connection (for example, connect, disconnect, or switch branches) seek help from an Admin.
- **Viewer**: Can't perform any actions. The viewer can't see any git related information in the workspace.

### Permissions needed for common operations

The following table describes the permissions needed to perform various common operations:

| **Operations**                                                       | **Workspace role**                                                                        | **GitHub permissions**                       | **Azure DevOps permissions**                  |
|----------------------------------------------------------------------|-------------------------------------------------------------------------------------------|----------------------------------------------|-----------------------------------------------|
| Connect workspace to Git repo                                        | Admin                                                                                     | Role=Read                                    | Read=Allow                                    |
| Disconnect workspace from Git repo                                   | Admin                                                                                     | No permissions are needed                    | No permissions are needed                     |
| Switch branch in the workspace (or any change in connection setting) | Admin                                                                                     | Role=Read  (in target repo/directory/branch) | Read=Allow (in target repo/directory/branch)  |
| View Git connection details                                          | Admin, Member, Contributor                                                                | Read or None                                 | Read or None                                  |
| See workspace 'git status'                                           | Contributor                                                                               | Role=Read                                    | Read=Allow                                    |
| Update from Git                                                      | All of the following:<br/><br/> Contributor in the workspace (WRITE permission on all items)<br/><br/>Owner of the item (if the tenant switch blocks updates for nonowners)<br/><br/>BUILD on external dependencies (where applicable)   | Role=Read   | Read=Allow  |

## Connect and sync

Only a workspace admin can connect a workspace to Azure Repos, but once connected, anyone with permissions can work in the workspace. If you're not an admin, ask your admin for help with connecting.

When you [connect a workspace to git](./git-get-started.md#connect-a-workspace-to-an-azure-repo), Fabric will sync between the two locations so they have the same content. During this initial sync, if either the workspace or git branch is empty while the other has content, the content is copied from the non-empty location to the empty one.
If both the workspace and git branch have content, you have to decide which direction the sync should go.

- If you commit your workspace to the git branch, all the workspace content is exported to git and overwrites the current git content.
- If you update the workspace with the git content, the workspace content is overwritten, and you will lose your workspace content. Since a git branch can always be restored to a previous stage while a workspace can’t, if you choose this option, you’ll be asked to confirm.

:::image type="content" source="./media/git-integration-process/git-sync-direction.png" alt-text="Screenshot of dialog asking which direction to sync if both Git and the workspace have content.":::

If you don’t select which content to sync, you can’t continue to work until you do so:

:::image type="content" source="./media/git-integration-process/sync-direction-continue.png" alt-text="Screenshot notification that you can't continue working until workspace is synced.":::

### Git status

After you connect, the workspace displays information about source control that allows you to view the connected branch and the status of each item in the branch.

:::image type="content" source="./media/git-integration-process/git-status.png" alt-text="Screenshot if items in a workspace with their git status outlined.":::

Each item has one of the following statuses:

- **Synced** :::image type="icon" source="./media/git-integration-process/synced-icon.png":::
- **Conflict** :::image type="icon" source="./media/git-integration-process/conflict-icon.png":::
- **Unsupported** :::image type="icon" source="./media/git-integration-process/unsupported-icon.png":::
- **Uncommitted** :::image type="icon" source="./media/git-integration-process/uncommitted-icon.png":::
- **Update required** :::image type="icon" source="./media/git-integration-process/update-required-icon.png":::

### Sync information

As long as you’re connected, the following information appears at the bottom of your screen:

- Connected branch
- Time of last sync
- Link to the last commit that the workspace is synced to

:::image type="content" source="./media/git-integration-process/sync-info.png" alt-text="Screenshot of sync information that appears on the bottom of the screen when connected to git.":::

## Commits and updates

### Source control pane

On top of the screen is the Source control icon. When the workspace is synced with the git branch, it displays a *0*.

:::image type="content" source="./media/git-integration-process/source-control-zero.png" alt-text="Screenshot of the source control icon showing zero items changed.":::

When changes are made either to the workspace or the git branch, the source control icon shows the number of items that are different. Select the source control icon to open the Source control pane.
In the Source control pane, the **Changes** tab shows the number of items that were changed in the workspace, and the **Updates** tab shows the number of items that were modified in the git branch and need to be updated to the workspace.

In each tab, the changed items are listed with an icon indicating the status:

- new :::image type="icon" source="./media/git-integration-process/new-icon.png":::
- modified :::image type="icon" source="./media/git-integration-process/modified-icon.png":::
- deleted ⛔
- in conflict :::image type="icon" source="./media/git-integration-process/conflict-icon.png":::

:::image type="content" source="./media/git-integration-process/source-control-panel-items.png" alt-text="Screenshot of the source control panel showing the status of the changed items.":::

### Commit

- When there is more than one item to commit, you can select which items to commit to the git branch.
- If there were changes made to the git branch commits are disabled until you update your workspace, to prevent conflicts.

Read more about how to [commit](./git-get-started.md#commit-changes-to-git) and [update](./git-get-started.md#update-workspace-from-git). Read more about the update process and how to [resolve conflicts](./conflict-resolution.md).

## Next steps

[Get started with git integration](./git-get-started.md)
