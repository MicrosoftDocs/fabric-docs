---
title: Include file for Git integration limitations
description: Include file for the Git integration limitations. This file is referenced in this repo and also in an article in the Power BI repo.
author: billmath
ms.author: billmath
ms.topic: include
ms.custom: 
ms.date: 02/26/2025
---

### General Git integration limitations

- The [authentication method](/entra/identity/authentication/concept-authentication-methods-manage#authentication-methods-policy) in Fabric must be at least as strong as the authentication method for Git. For example, if Git requires multifactor authentication, Fabric needs to require multifactor authentication as well.
- Power BI Datasets connected to Analysis Services aren't supported at this time.
- If you use a workspace identity in one artifact and commit it to Git, it can be updated (back to a fabric workspace) only in a workspace connected to the same identity. Be careful, as this also affects features like branch out.
- Submodules aren't supported.
- Sovereign clouds aren't supported.

#### [Azure DevOps limitations](#tab/azure-devops)

- Azure DevOps isn't supported if [Enable IP Conditional Access policy validation](/azure/devops/organizations/accounts/change-application-access-policies#cap-support-on-azure-devops) is enabled.
- If the workspace and Git repo are in two different geographical regions, the tenant admin must enable [cross-geo exports](/fabric/admin/git-integration-admin-settings#users-can-export-items-to-git-repositories-in-other-geographical-locations-preview).
- If your organization configured [conditional access](/appcenter/general/configuring-aad-conditional-access), make sure the **Power BI Service** has the same [conditions set](/fabric/security/security-conditional-access) for authentication to function as expected.
- The commit size is limited to 125 MB.

#### [GitHub limitations](#tab/github)

- Only cloud versions of GitHub are supported. On-premises isn't supported.
- GitHub can't enforce [cross-geo validations](/fabric/admin/git-integration-admin-settings#users-can-export-items-to-git-repositories-in-other-geographical-locations-preview).
- The total combined size of files to commit at once is limited to 50 MB. Therefore, if you have several items to commit, it might sometimes be necessary to separate them into a few separate commits. For more information about committing files, see our [troubleshooting guide](/fabric/cicd/troubleshoot-cicd#maximum-commit-size-exceeded).

---

### GitHub Enterprise limitations

Some GitHub Enterprise versions and settings aren't supported. For example:

- GitHub Enterprise Cloud with data residency (ghe.com)
- GitHub Enterprise Server with a custom domain is not supported, even if the instance is publicly accessible
- Github Enterprise Server hosted on a private network
- IP allowlist

### Workspace limitations

- Only the workspace admin can manage the connections to the [Git Repo](/azure/devops/repos/get-started) such as connecting, disconnecting, or adding a branch.  
  Once connected, anyone with [permission](/fabric/cicd/git-integration/git-integration-process#permissions) can work in the workspace.
- Workspaces with template apps installed can't be connected to Git.
- [MyWorkspace](../../admin/portal-workspaces.md#govern-my-workspaces) can't connect to a Git provider.

### Branch and folder limitations

- Maximum length of branch name is 244 characters.
- Maximum length of full path for file names is 250 characters. Longer names fail.
- Maximum file size is 25 MB.
- Folder structure is maintained up to 10 levels deep.
- Downloading a report/dataset as *.pbix* from the service after deploying them with Git integration is not recommended, as the results are unreliable. We recommend using PowerBI Desktop to download reports/datasets as *.pbix*.
- If the item’s display name has any of these characteristics, The Git folder is renamed to the logical ID (Guid) and type:
  - Has more than 256 characters
  - Ends with a <kbd>.</kbd> or a space
  - Contains any forbidden characters as described in [directory name limitations](#directory-name-limitations)
- When you connect a workspace that has folders to Git, you need to commit changes to the Git repo if that [folder structure](../git-integration/git-integration-process.md#folders) is different.

### Directory name limitations

- The name of the directory that connects to the Git repository has the following naming restrictions:

  - The directory name can't begin or end with a space or tab.
  - The directory name can't contain any of the following characters: <kbd>"</kbd><kbd>/</kbd><kbd>:</kbd> <kbd><</kbd><kbd>></kbd><kbd>\\</kbd><kbd>*</kbd><kbd>?</kbd><kbd>|</kbd>

- The item folder (the folder that contains the item files) can't contain any of the following characters: <kbd>"</kbd><kbd>:</kbd><kbd><</kbd><kbd>></kbd><kbd>\\</kbd><kbd>*</kbd><kbd>?</kbd><kbd>|</kbd>. If you rename the folder to something that includes one of these characters, Git can't connect or sync with the workspace and an error occurs.

### Branching out limitations

- Branch out requires permissions listed in [permissions table](/fabric/cicd/git-integration/git-integration-process#fabric-permissions-needed-for-common-operations).
- There must be an available capacity for this action.
- All [workspace](#workspace-limitations) and [branch naming limitations](#branch-and-folder-limitations) apply when branching out to a new workspace.
- Only [Git supported items](/fabric/cicd/git-integration/intro-to-git-integration#supported-items) are available in the new workspace.
- The related branches list only shows branches and workspaces you have permission to view.
- [Git integration](/fabric/admin/git-integration-admin-settings) must be enabled.
- When branching out, a new branch is created and the settings from the original branch aren't copied. Adjust any settings or definitions to ensure that the new meets your organization's policies.
- When branching out to an existing workspace:
  - The target workspace must support a Git connection.
  - The user must be an admin of the target workspace.
  - The target workspace must have capacity.
  - The workspace can't have template apps.
- **Note that when you branch out to a workspace, any items that aren't saved to Git can get lost. We recommend that you [commit](/fabric/cicd/git-integration/git-integration-process#commit-to-git) any items you want to keep before branching out.**

### Sync and commit limitations

- You can only sync in one direction at a time. You can’t commit and update at the same time.
- Sensitivity labels aren't supported and exporting items with sensitivity labels might be disabled. To commit items that have sensitivity labels without the sensitivity label, [ask your administrator](/fabric/admin/git-integration-admin-settings#users-can-export-workspace-items-with-applied-sensitivity-labels-to-git-repositories-preview) for help.
- Works with [limited items](/fabric/cicd/git-integration/intro-to-git-integration#supported-items). Unsupported items in the folder are ignored.
- Duplicating names isn't allowed. Even if Power BI allows name duplication, the update, commit, or undo action fails.
- B2B isn’t supported.
- [Conflict resolution](/fabric/cicd/git-integration/conflict-resolution) is partially done in Git.
- During the *Commit to Git* process, the Fabric service deletes files *inside the item folder* that aren't part of the item definition. Unrelated files not in an item folder aren't deleted.
- After you commit changes, you might notice some unexpected changes to the item that you didn't make. These changes are semantically insignificant and can happen for several reasons. For example:
  - Manually changing the item definition file. These changes are valid, but might be different than if done through the editors. For example, if you rename a semantic model column in Git and import this change to the workspace, the next time you commit changes to the semantic model, the *bim* file will register as changed and the modified column pushed to the back of the `columns` array. This is because the AS engine that generates the *bim* files pushes renamed columns to the end of the array. This change doesn't affect the way the item operates.
  - Committing a file that uses *CRLF* line breaks. The service uses *LF* (line feed) line breaks. If you had item files in the Git repo with *CRLF* line breaks, when you commit from the service these files are changed to *LF*. For example, if you open a report in desktop, save the project file (*.pbip*) and upload it to Git using *CRLF*.
- Refreshing a semantic model using the [Enhanced refresh API](/power-bi/connect-data/asynchronous-refresh) causes a Git diff after each refresh.
