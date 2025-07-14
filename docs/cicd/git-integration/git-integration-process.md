---
title: Git integration process
description: Understand how Microsoft Fabric interacts with Git on Azure Repos or GitHub, what permissions are needed, and how to sync.
author: billmath
ms.author: billmath
ms.reviewer: NimrodShalit
ms.service: fabric
ms.subservice: cicd
ms.topic: concept-article
ms.date: 03/02/2025
ms.custom:
#customer intent: As a developer I want to learn about the Git integration feature in Fabric so that my team can collaborate more effectively.
---

# Basic concepts in Git integration

This article explains basic Git concepts and the process of integrating Git with your Microsoft Fabric workspace.

## Permissions

- Your organization's administrator must [enable Git integration](../../admin/git-integration-admin-settings.md).
- The tenant admin must [enable cross-geo export](../../admin/git-integration-admin-settings.md#users-can-export-items-to-git-repositories-in-other-geographical-locations) if the workspace and *Azure* repo are in two different regions. This restriction doesn't apply to GitHub.
- The permissions you have in both the workspace and Git, as listed in the next sections, determine the actions you can take.

### Required Git permissions for popular actions

The following list shows what different workspace roles can do depending on their permissions in their Git repo:

- **Admin**: Can perform any operation on the workspace, limited only by their Git role.
- **Member/Contributor**: Once they connect to a workspace, a member/contributor can commit and update changes, depending on their Git role. For actions related to the workspace connection (for example, connect, disconnect, or switch branches) seek help from an Admin.
- **Viewer**: Can't perform any actions. The viewer can't see any Git related information in the workspace.

### Required Fabric permissions for popular actions

#### Workspace roles

The following table describes the permissions needed in the Fabric workspace to perform various common operations:

| **Operation**                                                        | **Workspace role**                                                                        |
|----------------------------------------------------------------------|-------------------------------------------------------------------------------------------|
| Connect workspace to Git repo                                        | Admin                                                                                     |
| Sync workspace with Git repo                                         | Admin                                                                                     |
| Disconnect workspace from Git repo                                   | Admin                                                                                     |
| Switch branch in the workspace (or any change in connection setting) | Admin                                                                                     |
| View Git connection details                                          | Admin, Member, Contributor                                                                |
| See workspace 'Git status'                                           | Admin, Member, Contributor                                                                |
| Update from Git                                                      | All of the following roles:<br/><br/> Contributor in the workspace (WRITE permission on all items)<br/><br/>Owner of the item (if the tenant switch blocks updates for nonowners)<br/><br/>BUILD on external dependencies (where applicable)   |
| Commit workspace changes to Git                                      | All of the following roles:<br/><br/> Contributor in the workspace (WRITE permission on all items)<br/><br/>Owner of the item (if the tenant switch blocks updates for nonowners)<br/><br/>BUILD on external dependencies (where applicable)   |
| Create new Git branch from within Fabric                             | Admin                                                                                     |
| Branch out to another workspace                                      | Admin, Member, Contributor                                                                |

#### Git roles

The following table describes the Git permissions needed to perform various common operations:

##### [Azure Repos](#tab/Azure)

| **Operation**                                                        | **Git permissions**                           |
|----------------------------------------------------------------------|-----------------------------------------------|
| Connect workspace to Git repo                                        | Read=Allow                                    |
| Sync workspace with Git repo                                         | Read=Allow                                    |
| Disconnect workspace from Git repo                                   | No permissions are needed                     |
| Switch branch in the workspace (or any change in connection setting) | Read=Allow  (in target repo/directory/branch) |
| View Git connection details                                          | Read or None                                  |
| See workspace 'Git status'                                           | Read=Allow                                    |
| Update from Git                                                      | Read=Allow   |
| Commit workspace changes to Git                                      | Read=Allow<br/>Contribute=Allow<br/>branch policy should allow direct commit  |
| Create new Git branch from within Fabric                             | Role=Write<br/>Create branch=Allow            |
| Branch out to another workspace                                      | Read=Allow<br/>Create branch=Allow            |
                                    

##### [GitHub Repos](#tab/GitHub)

- If you're using a fine-grained access token, the following permissions are needed for common operations:

  | **Operation**                                                        | **Git permissions**                           |
  |----------------------------------------------------------------------|-----------------------------------------------|
  | Connect workspace to Git repo                                        | Contents= Access: Read                        |
  | Sync workspace with Git repo                                         | Contents= Access: Read                        |
  | Disconnect workspace from Git repo                                   | No permissions are needed                     |
  | Switch branch in the workspace (or any change in connection setting) | Contents= Access: Read (in target repo/directory/branch) |
  | View Git connection details                                          | Contents= Access: Read or None                |
  | See workspace 'Git status'                                           | Contents= Access: Read                        |
  | Update from Git                                                      | Contents= Access: Read                        |
  | Commit workspace changes to Git                                      | Contents= Access: Read and write<br/>branch policy should allow direct commit  |
  | Create new Git branch from within Fabric                             | Contents= Access: Read and write              |
  | Branch out to another workspace                                      | Content=Read and write                        |

- If you're using classic access token, the repo scope must be enabled:

  :::image type="content" source="./media/git-integration-process/classic-token.png" alt-text="Screenshot of classic token generation with repo scope enabled.":::

---

## Connect and sync

Only a workspace admin can connect a workspace to a Git Repos, but once connected, anyone with permissions can work in the workspace. If you're not an admin, ask your admin for help with connecting.

When you [connect a workspace to Git](./git-get-started.md#connect-a-workspace-to-a-git-repo), Fabric syncs between the two locations so they have the same content. During this initial sync, if either the workspace or Git branch is empty while the other has content, the content is copied from the nonempty location to the empty one.
If both the workspace and Git branch have content, you have to decide which direction the sync should go.

- If you commit your workspace to the Git branch, all supported workspace content is exported to Git and overwrites the current Git content.
- If you update the workspace with the Git content, the workspace content is overwritten, and you lose your workspace content. Since a Git branch can always be restored to a previous stage while a workspace can’t, if you choose this option, you're asked to confirm.

:::image type="content" source="./media/git-integration-process/git-sync-direction.png" alt-text="Screenshot of dialog asking which direction to sync if both Git and the workspace have content.":::

If you don’t select which content to sync, you can’t continue to work.

:::image type="content" source="./media/git-integration-process/sync-direction-continue.png" alt-text="Screenshot notification that you can't continue working until workspace is synced.":::

### Folders

When connected and synced, the workspace structure is mirrored in the Git repository, including folders structure. Workspace items in folders are exported to folders with the same name in the Git repo. Conversely, items in Git folders are imported to folders with the same name in the workspace.

> [!NOTE]
> Since folder structure is retained, if your workspace has folders and the connected Git folder doesn't yet have subfolders, they're considered to be different. You get an *uncommitted changes* status in the source control panel and you need to commit the changes to Git before updating the workspace. If you update first, the Git folder structure **overwrites the workspace** folder structure. For more information, see [Handling folder changes safely](#handling-folder-changes-safely).

:::image type="content" source="./media/git-integration-process/git-subfolders.png" alt-text="Screenshot of workspace and corresponding Git branch with subfolders.":::

- Empty folders aren't copied to Git. When you create or move items to a folder, the folder is created in Git.
- Empty folders in Git are deleted automatically.
- Empty folders in the workspace aren't deleted automatically even if all items are moved to different folders.
- Folder structure is retained up to 10 levels deep.

#### Handling folder changes safely

If your workspace has folders and the connected Git folder doesn't yet have subfolders, they're considered to be different because the folder structure is different. When you connect a workspace that has folders to Git, you get an *uncommitted changes* status in the source control panel and you need to commit the changes to Git before updating the workspace.

If you can't make changes to the connected branch directly, due to branch policy or permissions, we recommend using the *Checkout Branch* option:

1. [Checkout a New Branch](./conflict-resolution.md#resolve-conflict-in-git): Use the checkout branch feature to create a branch with the updated state of your Fabric workspace.
1. Commit Folder Changes: Any workspace folder changes can then be committed to this new branch.
1. Merge Changes: Use your regular pull request (PR) and merge processes to integrate these updates back into the original branch.

### Connect to a shared workspace

If you try connecting to a workspace that's already [connected to Git](./manage-branches.md), you might get the following message:

:::image type="content" source="./media/git-integration-process/sign-into-git.png" alt-text="Screenshot of error message telling you to sign in to a Git account.":::

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
- :::image type="icon" source="./media/git-integration-process/warning.png"::: same-changes

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

  - [*Branch out to another workspace*](./manage-branches.md#scenario-2---develop-using-another-workspace) (contributor and above): Creates a new workspace, or switches to an existing workspace based on the last commit to the current workspace. It then connects to the target workspace and branch.
  - [*Checkout new branch*](./conflict-resolution.md#resolve-conflict-in-git) (must be workspace admin): Creates a new branch based on the last synced commit in the workspace and changes the Git connection in the current workspace. It doesn't change the workspace content.
  - [*Switch branch*](./manage-branches.md#switch-branches) (must be workspace admin): Syncs the workspace with another new or existing branch and overrides all items in the workspace with the content of the selected branch.

  :::image type="content" source="./media/git-integration-process/branch-out.png" alt-text="Screenshot of the branch out tab in the source control panel.":::

- **Related branches**.  
   The *Branches* tab also has a list of related workspaces you can select and switch to. A related workspace is one with the same connection properties as the current branch, such as the same organization, project, repository, and git folder.  
   This feature allows you to navigate to workspaces connected to other branches related to the context of your current work, without having to look for them in your list of Fabric workspaces.  
   To open the relevant workspace, select item in the list.

  :::image type="content" source="./media/git-integration-process/related-branches.png" alt-text="Screenshot showing a list of related branches that the user can switch to.":::

For more information, see [Branching out limitations](#branching-out-limitations).

### Account details

The Account details tab shows details of the GitHub account that the user is connected to. It has two sections. The top section shows the Git provider and the account name. The bottom section shows the repository and branch that the workspace is connected to. Currently, this tab is only available for workspaces connected to GitHub.

<!---
#### [Azure DevOps account details](#tab/Azure)

Azure DevOps account details include:

- Repository
- Branch

#### [GitHub account details](#tab/GitHub)
--->

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

[!INCLUDE [limitations](../includes/git-limitations.md)]

## Related content

- [Manage branches](./manage-branches.md)
- [Resolve errors and conflicts](./conflict-resolution.md)
