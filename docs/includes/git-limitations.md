---
title: Include file for Git integration limitations
description: Include file for the Git integration limitations. This include file is referenced in this repo and also in an article in the Power BI repo.
author: mberdugo
ms.author: monaberdugo
ms.topic: include
ms.custom: 
ms.date: 07/04/2024
---

### General Git integration limitations

- The [authentication method](/entra/identity/authentication/concept-authentication-methods-manage#authentication-methods-policy) in Fabric must be at least as strong as the authentication method for Git. For example, if Git requires multifactor authentication, Fabric needs to require multifactor authentication as well.
- Power BI Datasets connected to Analysis Services aren't supported at this time.
- Sovereign clouds aren't supported.

#### [Azure DevOps limitations](#tab/azure-devops)

- The Azure DevOps account must be registered to the same user that is using the Fabric workspace.
- If the workspace and Git repo are in two different geographical regions, the tenant admin must enable [cross-geo exports](/fabric/admin/git-integration-admin-settings#users-can-export-items-to-git-repositories-in-other-geographical-locations-preview).
- The commit size is limited to 125 MB.

#### [GitHub limitations](#tab/github)

- GitHub can't enforce [cross-geo validations](/fabric/admin/git-integration-admin-settings#users-can-export-items-to-git-repositories-in-other-geographical-locations-preview).
- The number of non-text files per commit is limited. Therefore, if you have several items to commit, it might sometimes be necessary to separate them into a few separate commits. For more information see our [troubleshooting guide](/fabric/cicd/troubleshoot-cicd#maximum-commit-size-exceeded).
- The commit size is limited to 100 MB per file.

---

### GitHub Enterprise limitations

Some GitHub Enterprise settings aren't supported. For example:

- IP allow list
- Private networking

### Workspace limitations

- Only the workspace admin can manage the connections to the [Git Repo](/azure/devops/repos/get-started) such as connecting, disconnecting, or adding a branch.  
Once connected, anyone with [permission](/fabric/cicd/git-integration/git-integration-process#permissions) can work in the workspace.  
- The workspace folder structure isn't reflected in the Git repository. Workspace items in folders are exported to the root directory.

### Branch and folder limitations

- Maximum length of branch name is 244 characters.
- Maximum length of full path for file names is 250 characters. Longer names fail.
- Maximum file size is 25 MB.
- You can’t download a report/dataset as *.pbix* from the service after deploying them with Git integration.
- When naming a folder in Git, the logical ID (Guid) is added as a prefix before the type if the item’s display name:
  - Has more than 256 characters
  - Ends with <kbd>.</kbd> or a space
  - Contains any of the following characters: <kbd>"</kbd>, <kbd>/</kbd>, <kbd>:</kbd>, <kbd><</kbd>,<kbd>></kbd>,<kbd>\\</kbd>,<kbd>*</kbd>, <kbd>?</kbd>, <kbd>|</kbd>

### Branching out limitations

- Branch out requires permissions listed in [permissions table](/fabric/cicd/git-integration/git-integration-process#fabric-permissions-needed-for-common-operations).
- There must be an available capacity for this action.
- All [workspace](#workspace-limitations) and [branch naming limitations](#branch-and-folder-limitations) apply when branching out to a new workspace.
- When branching out, a new workspace is created and the settings from the original workspace aren't copied. Adjust any settings or definitions to ensure that the new workspace meets your organization's policies.
- Only [Git supported items](/fabric/cicd/git-integration/intro-to-git-integration#supported-items) are available in the new workspace.
- The related branches list only shows branches and workspaces you have permission to view.
- [Git integration](/fabric/admin/git-integration-admin-settings) must be enabled.

### Sync and commit limitations

- You can only sync in one direction at a time. You can’t commit and update at the same time.
- Sensitivity labels aren't supported and exporting items with sensitivity labels might be disabled. To commit items that have sensitivity labels without the sensitivity label, [ask your administrator](/fabric/admin/git-integration-admin-settings#users-can-export-workspace-items-with-applied-sensitivity-labels-to-git-repositories-preview) for help.
- Works with [limited items](/fabric/cicd/git-integration/intro-to-git-integration#supported-items). If unsupported items are in the folder, they're ignored.
- Duplicating names isn't allowed. Even if Power BI allows name duplication, the update, commit, or undo action fails.
- B2B isn’t supported.
- [Conflict resolution](/fabric/cicd/git-integration/conflict-resolution) is partially done in Git.
- During the *Commit to Git* process, the Fabric service deletes files *inside the item folder* that aren't part of the item definition. Unrelated files not in an item folder aren't deleted.
- After you commit changes, you might notice some unexpected changes to the item that you didn't make. These changes are semantically insignificant and can happen for several reasons. For example:
  - Manually changing the item definition file. These changes are valid, but might be different than if done through the editors. For example, if you rename a semantic model column in Git and import this change to the workspace, the next time you commit changes to the semantic model, the *bim* file will register as changed and the modified column pushed to the back of the `columns` array. This is because the AS engine that generates the *bim* files pushes renamed columns to the end of the array. This change doesn't affect the way the item operates.
  - Committing a file that uses *CRLF* line breaks. The service uses *LF* (line feed) line breaks. If you had item files in the Git repo with *CRLF* line breaks, when you commit from the service these files are changed to *LF*. For example, if you open a report in desktop, save the *.pbip* project and upload it to Git using *CRLF*.
- Refreshing a semantic model using the [Enhanced refresh API](/power-bi/connect-data/asynchronous-refresh) causes a Git diff after each refresh.
