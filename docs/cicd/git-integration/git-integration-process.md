---
title: Git integration process
description: Understand how Microsoft Fabric interacts with Git on Azure Repos or GitHub, what permissions are needed, and how to sync.
author: mberdugo
ms.author: monaberdugo
ms.reviewer: NimrodShalit
ms.service: fabric
ms.subservice: cicd
ms.topic: concept-article
ms.date: 06/18/2024
ms.custom:
  - build-2023
  - ignite-2023
#customer intent: As a developer I want to learn about the Git integration feature in Fabric so that my team can collaborate more effectively.
---

# Basic concepts in Git integration

This article explains basic Git concepts and the process of integrating Git with your Microsoft Fabric workspace.

## Permissions

- In order to use Git integration, your organization's administrator must [enable it](../../admin/git-integration-admin-settings.md) by your organization's administrator.
- If the workspace and *Azure* repo are in two different regions, the tenant admin must [enable cross-geo export](../../admin/git-integration-admin-settings.md#users-can-export-items-to-git-repositories-in-other-geographical-locations-preview). This restriction doesn't apply to GitHub.
- The actions you can take on a workspace depend on the permissions you have in both the workspace and Git, as listed in the next sections.

### Git permissions

The following list shows what different workspace roles can do depending on their permissions in their Git repo:

- **Admin**: Can perform any operation on the workspace, limited only by their Git role.
- **Member/Contributor**: Once they connect to a workspace, a member/contributor can commit and update changes, depending on their Git role. For actions related to the workspace connection (for example, connect, disconnect, or switch branches) seek help from an Admin.
- **Viewer**: Can't perform any actions. The viewer can't see any Git related information in the workspace.

### Fabric permissions needed for common operations

The following table describes the permissions needed to perform various common operations:

| **Operation**                                                        | **Workspace role**                                                                        | **Git permissions**                          |
|----------------------------------------------------------------------|-------------------------------------------------------------------------------------------|----------------------------------------------|
| Connect workspace to Git repo                                        | Admin                                                                                     | Read=Allow                                    |
| Sync workspace with Git repo                                         | Admin                                                                                     | Read=Allow                                    |
| Disconnect workspace from Git repo                                   | Admin                                                                                     | No permissions are needed                    |
| Switch branch in the workspace (or any change in connection setting) | Admin                                                                                     | Read=Allow  (in target repo/directory/branch) |
| View Git connection details                                          | Admin, Member, Contributor                                                                | Read or None                                 |
| See workspace 'Git status'                                           | Admin, Member, Contributor                                                                | Read=Allow                                    |
| Update from Git                                                      | All of the following:<br/><br/> Contributor in the workspace (WRITE permission on all items)<br/><br/>Owner of the item (if the tenant switch blocks updates for nonowners)<br/><br/>BUILD on external dependencies (where applicable)   | Read=Allow   |
| Commit workspace changes to Git                                      | All of the following:<br/><br/> Contributor in the workspace (WRITE permission on all items)<br/><br/>Owner of the item (if the tenant switch blocks updates for nonowners)<br/><br/>BUILD on external dependencies (where applicable)   | Read=Allow<br/>Contribute=Allow<br/>branch policy should allow direct commit  |
| Create new Git branch from within Fabric                             | Admin                                                                                     | Role=Write<br/>Create branch=Allow            |
| Branch out to a new workspace                                            | Admin, Member, Contributor                                                                | Read=Allow<br/>Create branch=Allow            |

## Connect and sync

Only a workspace admin can connect a workspace to a Git Repos, but once connected, anyone with permissions can work in the workspace. If you're not an admin, ask your admin for help with connecting.

When you [connect a workspace to Git](./git-get-started.md#connect-a-workspace-to-a-git-repo), Fabric syncs between the two locations so they have the same content. During this initial sync, if either the workspace or Git branch is empty while the other has content, the content is copied from the nonempty location to the empty one.
If both the workspace and Git branch have content, you have to decide which direction the sync should go.

- If you commit your workspace to the Git branch, all supported workspace content is exported to Git and overwrites the current Git content.
- If you update the workspace with the Git content, the workspace content is overwritten, and you lose your workspace content. Since a Git branch can always be restored to a previous stage while a workspace can’t, if you choose this option, you're asked to confirm.

:::image type="content" source="./media/git-integration-process/git-sync-direction.png" alt-text="Screenshot of dialog asking which direction to sync if both Git and the workspace have content.":::

If you don’t select which content to sync, you can’t continue to work.

:::image type="content" source="./media/git-integration-process/sync-direction-continue.png" alt-text="Screenshot notification that you can't continue working until workspace is synced.":::

### Connect to a shared workspace

If you try connecting to a workspace that's already [connected to Git](./manage-branches.md), you might get the following message:

:::image type="content" source="./media/git-integration-process/sign-into-git.png" alt-text="Screenshot of error message telling yo to sign in to a Git account.":::

Go to the **Accounts** tab on the right side of the Source control panel, choose an account, and connect to it.

:::image type="content" source="./media/git-integration-process/connect.png" alt-text="Screenshot of Accounts tab with user connecting to a GitHub account.":::

### Git status

After you connect, the workspace displays a *Git status* column that indicates the sync state of each item in the workspace in relation to the items in the remote branch.

:::image type="content" source="./media/git-integration-process/git-status.png" alt-text="Screenshot if items in a workspace with their Git status outlined.":::

Each item has one of the following statuses:

- :::image type="icon" source="./media/git-integration-process/synced-icon.png"::: Synced (the item is the same in the workspace and Git branch)
- :::image type="icon" source="./media/git-integration-process/conflict-icon.png"::: Conflict (the item was changed in both the workspace and Git branch)
- :::image type="icon" source="./media/git-integration-process/unsupported-icon.png"::: Unsupported item
- :::image type="icon" source="./media/git-integration-process/uncommitted-icon.png"::: Uncommitted changes in the workspace
- :::image type="icon" source="./media/git-integration-process/update-required-icon.png"::: Update required from Git
- :::image type="icon" source="./media/git-integration-process/warning.png"::: Item is identical in both places but needs to be updated to the last commit

### Sync information

As long as you’re connected, the following information appears at the bottom of your screen:

- Connected branch
- Time of last sync
- Link to the last commit that the workspace is synced to

:::image type="content" source="./media/git-integration-process/sync-info.png" alt-text="Screenshot of sync information that appears on the bottom of the screen when connected to Git.":::

## Source control pane

On top of the screen is the **Source control** icon. It shows the number of items that are different in the workspace and Git branch. When changes are made either to the workspace or the Git branch, the number is updated. When the workspace is synced with the Git branch, the Source control icon displays a *0*.

:::image type="content" source="./media/git-integration-process/source-control-zero.png" alt-text="Screenshot of the source control icon showing zero items changed.":::

Select the Source control icon to open the **Source control** panel.

The source control pane has three tabs on the side:

- [Commits and updates](#commits-and-updates)
- [Branches](#branches)
- [Account details](#account-details)

### Commits and updates

When changes are made either to the workspace or the Git branch, the source control icon shows the number of items that are different. Select the source control icon to open the Source control panel.

The **Commit and update** panel has two sections.

**Changes** shows the number of items that were changed in the workspace and need to be committed to Git.  
**Updates** shows the number of items that were modified in the Git branch and need to be updated to the workspace.  

In each section, the changed items are listed with an icon indicating the status:

- :::image type="icon" source="./media/git-integration-process/new-icon.png"::: new
- :::image type="icon" source="./media/git-integration-process/modified-icon.png"::: modified
- :::image type="icon" source="./media/git-integration-process/deleted-icon.png" ::: deleted
- :::image type="icon" source="./media/git-integration-process/conflict-icon.png"::: conflict

The Refresh button :::image type="icon" source="./media/git-integration-process/refresh-icon.png"::: on top of the panel updates the list of changes and updates.

:::image type="content" source="./media/git-integration-process/source-control-panel-items.png" alt-text="Screenshot of the source control panel showing the status of the changed items.":::

#### Commit

- Items in the workspace that were changed are listed in the *Changes* section. When there's more than one changed item, you can select which items to commit to the Git branch.
- If there were updates made to the Git branch, commits are disabled until you update your workspace.

#### Update

- Unlike *commit* and *undo*, the *Update* command always updates the entire branch and syncs to the most recent commit. You can’t select specific items to update.
- If changes were made in the workspace and in the Git branch *on the same item*, updates are disabled until the [conflict is resolved](./conflict-resolution.md).

Read more about how to [commit](./git-get-started.md#commit-changes-to-git) and [update](./git-get-started.md#update-workspace-from-git).
Read more about the update process and how to [resolve conflicts](./conflict-resolution.md).

### Branches

The *Branches* tab of the Source control panel enables you to manage your branches and perform branch related actions. It has two main sections:

- **Actions you can take on the current branch**:

  - [*Branch out to new workspace*](./manage-branches.md#develop-using-another-workspace) (any role): Creates a new workspace and new branch based on the last commit of the branch connected to the current workspace. It connects to the new workspace and new branch.
  - *Checkout a new branch* (must be workspace admin): Creates a new branch based on the last synced commit in the workspace and changes the Git connection in the current workspace. It doesn't change the workspace content.

  :::image type="content" source="./media/git-integration-process/branch-out.png" alt-text="Screenshot of the branch out tab in the source control panel.":::

- **Related branches**.  
   The *Branches* tab also has a list of related workspaces you can select and switch to. A related workspace is one with the same connection properties as the current branch, such as the same organization, project, repository, and git folder.  
   This allows you to navigate to workspaces connected to other branches related to the context of your current work, without having to look for them in your list of Fabric workspaces.  
   Click on an item in the list to open the relevant workspace.

  :::image type="content" source="./media/git-integration-process/related-branches.png" alt-text="Screenshot showing a list of related branches that the user can switch to.":::

See [Branching out limitations](#branching-out-limitations) for more information.

### Account details

The Account details tab shows details of the GitHub account that the user is connected to. It has two sections. The top section shows the Git provider and the account name. The bottom section shows the repository and branch that the workspace is connected to. Currently, this tab is only available for GitHub accounts.

<!---
#### [Azure DevOps account details](#tab/Azure)

Azure DevOps account details include:

- Repository
- Branch

--->
#### [GitHub account details](#tab/GitHub)

GitHub account details include:

- Git account details

  - Provider
  - Account name

- Git repository
- Branch

:::image type="content" source="./media/git-integration-process/github-account-details.png" alt-text="Screenshot of accounts tab in Source control panel showing the Git details and repository and branch names.":::

<!---
---
--->
## Considerations and limitations

[!INCLUDE [limitations](../../includes/git-limitations.md)]

## Related content

- [Manage branches](./manage-branches.md)
- [Resolve errors and conflicts](./conflict-resolution.md)
