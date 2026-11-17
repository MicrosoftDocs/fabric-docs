---
title: Configure Git integration for your Fabric app
description: Learn how to configure Git integration for a Fabric app, understand the files stored in the repository, and sync changes between Git and your workspace.
ms.reviewer: mksuni
ms.topic: how-to
ms.date: 11/06/2026
ai-usage: ai-generated
ms.search.form: Fabric Apps source control, Fabric Apps Git integration
---

# Configure Git integration for your Fabric app

Git integration helps you keep your Fabric app's deployable definition in source control. Connect the workspace that contains your app to a repository branch. Then, commit workspace changes to Git or apply changes from Git to the workspace.

This article shows you how to configure the connection, understand the app files written to the repository, and keep the workspace and Git in sync.

## Prerequisites

Before you begin, ensure you have:

- A workspace on Fabric capacity that contains a [deployed Fabric app](deploy-app.md).
- The workspace Admin role. Git integration is a workspace-level setting, and only a workspace admin can connect it to a repository.
- Git integration enabled for your organization. Review the [Fabric and Git prerequisites](../cicd/git-integration/git-get-started.md#prerequisites).
- An Azure DevOps organization, project, and repository, with permission to create a branch and commit changes.

The steps in this article use Azure DevOps. GitHub is also supported. For GitHub connection instructions, see [Get started with Git integration](../cicd/git-integration/git-get-started.md).

## Connect your workspace to Git

Set up Git integration for the entire workspace, not for an individual app. The connection includes other [supported items](../cicd/git-integration/intro-to-git-integration.md#supported-items) in the workspace.

1. Open the workspace that contains your app, and select **Workspace settings**.
1. In the left pane, select **Git integration**.
1. Choose **Azure DevOps** as the Git provider.
1. Select an existing account, or select **Add account** and authorize access. Select **Connect**.
1. Configure the repository connection:

   | Setting | What to select |
   | --- | --- |
   | **Organization** | The Azure DevOps organization that contains your repository. |
   | **Project** | The project that contains your repository. |
   | **Git repository** | The repository where you want to store the app definition. |
   | **Branch** | Select **+ New Branch** to isolate your work, or select an existing branch. |
   | **Folder** | Enter a folder name to use an existing folder or create one. Leave this blank to store items in the repository root. |

1. Select **Connect and sync**.

If the connected Git folder is empty, the initial sync commits the supported workspace items, including your app definition, to Git. After the sync finishes, the workspace shows the connected branch and a **Git status** column. Your app's status is **Synced** when the workspace definition matches the connected Git version. Open the repository in Azure DevOps to see the generated app directory and files.

## Fabric app structure in Git

The following example shows the files in an exported app definition. The Fabric item type is `AppBackend`. The export includes files for optional services only when you configure those services and deploy or apply their content.

```text
<ItemName>.<ItemType>\
    connectors\
        <connectorName>\
            dab-config.json
    data\
        dab-config.json
    frontend\
        static-app.zip
    functions\
        functions-app.zip
        deploymetadata.json
    storage\
        storage-config.json
    .fabric-app-metadata.json
    .platform
    rayfin.yml
```

| File or folder | What it contains | How to manage it |
| --- | --- | --- |
| `connectors\<connectorName>\dab-config.json` | Data API configuration for a connector's exposed entities. | Keep the connector name aligned with its declaration, and review referenced workspace and item IDs for the target environment. |
| `data\dab-config.json` | Data API configuration and database schema for user-defined entities. | Preserve generated schema extensions, and review schema changes before deploying. |
| `frontend\static-app.zip` | The built frontend assets, not the frontend source project. | Rebuild from source. Include this bundle when importing a definition with static hosting enabled. |
| `functions\functions-app.zip` | The function application deployment bundle. | Rebuild from source, and include it together with `deploymetadata.json`. |
| `functions\deploymetadata.json` | The generated function deployment manifest. | Preserve this file and keep it paired with `functions-app.zip`. |
| `storage\storage-config.json` | Storage folder definitions and access rules. | Preserve generated rules and field definitions. Uploaded objects aren't included. |
| `.fabric-app-metadata.json` | App-generated package version information, when recorded. This file isn't required for import. | Preserve this file when updating an exported definition. |
| `.platform` | Fabric item metadata and the logical ID used by Git integration. | Preserve the generated metadata and logical ID. |
| `rayfin.yml` | Runtime service configuration, connector declarations, and secret names, without secret values. | For configuration details, see [Fabric Apps project structure](project-structure.md#rayfinrayfinyml). |

Keep the generated item directory name when you edit the app configuration, and don't change the logical ID in `.platform`. Fabric uses that ID to associate the definition in Git with the workspace item. For more information, see [Git integration source code format](../cicd/git-integration/source-code-format.md).

> [!NOTE]
> The exported `rayfin.yml` represents runtime configuration, not a copy of the local project's `rayfin/rayfin.yml`. Exporting doesn't reconstruct local paths, build commands, and development settings. For the local configuration, see [Fabric Apps project structure](project-structure.md#rayfinrayfinyml).

### Data and connector configuration

The `data\dab-config.json` file describes your app's entities, API permissions, and database schema. It excludes the source environment's data connection settings and platform-managed entities such as `Users`. The target provisions its own data service; database rows aren't copied.

Each configured GraphQL-backed connector can have its own `connectors\<connectorName>\dab-config.json` file, where `<connectorName>` is its friendly name, such as `adventureWorksSql`. A connector declaration without persisted entity configuration might not have this file. Apply the connector configuration on the source before exporting if you expect configured entities. For connector setup, see [Connect Fabric Apps to Fabric data](connectors.md).

> [!CAUTION]
> Import applies database schema changes to the target. Removing or changing entities or fields can be destructive. Review changes before deploying; the definition isn't a database backup.

### Storage configuration

The `storage\storage-config.json` file defines storage folders and their access rules, not the objects uploaded to them. Both the data and storage services must be enabled to apply this configuration.

### Frontend and function packages

The ZIP files contain deployable builds, not loose source files. Keep the original application source under version control so you can review code changes and rebuild the packages.

Frontend export excludes environment-specific `rayfin.config.json` and `config.json` files. Import regenerates runtime configuration for the target. If static hosting is enabled but the source has no frontend bundle, deploy the frontend before exporting.

Function export removes `local.settings.json` files. Supply `functions-app.zip` and `deploymetadata.json` together when importing, and preserve the generated manifest. If no function application has been provisioned on the source, both files can be absent.

Review configuration files and packaged content before you commit. Don't include credentials or other secrets.

> [!IMPORTANT]
> The definition doesn't transfer database rows, uploaded storage objects, user accounts, or secret values. It isn't a backup of your app's data.

## Sync changes between Fabric and Git

Changes in the workspace and changes in Git don't sync automatically after the initial connection. Use **Source control** to commit workspace changes or apply incoming Git changes.

> [!IMPORTANT]
> Git stores secret names, not values. After importing an app or new secret names from Git, [set the values](manage-function-secrets.md) in the target app. Existing target secret values are retained.

### Commit workspace changes to Git

1. Update and deploy your app to the connected workspace, for example by using the [Rayfin CLI](deploy-app.md).
1. In the workspace, check the **Git status** column. The app shows uncommitted changes when its definition changes.
1. Open **Source control**, and select **Changes**.
1. Review and select the app and any other items you intend to commit.
1. Enter a commit message, and select **Commit**.

After the commit succeeds, the selected items show **Synced**.

## Use with deployment pipelines

Git integration versions your app definition. To promote that definition between development, test, and production workspaces, use [deployment pipelines](../cicd/deployment-pipelines/get-started-with-deployment-pipelines.md). Review environment-specific connector settings before deployment, and verify the app in the target workspace afterward.

> [!IMPORTANT]
> Deployment pipelines copy secret names, not values. [Set the values](manage-function-secrets.md) in each target stage after the first deployment and whenever you deploy newly added secrets.

Existing secret values in the target app are retained. Also review connector workspace and item IDs and any absolute authentication redirect URIs for the target environment; copying a definition doesn't guarantee that external dependencies are remapped.

## Automate with public APIs

For scripted workflows, use [Get Item Definition](/rest/api/fabric/core/items/get-item-definition) to export the app definition, [Create Item](/rest/api/fabric/core/items/create-item) with type `AppBackend` to create an app from a definition, or [Update Item Definition](/rest/api/fabric/core/items/update-item-definition) to apply a definition to an existing app item.

In API requests, definition parts use `InlineBase64` payloads. Encode YAML and JSON as UTF-8 before Base64 encoding, and encode ZIP files from their binary bytes.

These APIs operate on the item definition. They don't create Git commits, sync a branch, or run a deployment pipeline. Review each API's request format, permissions, and long-running operation handling before using it in automation.

## Related content

- [Introduction to CI/CD in Microsoft Fabric](../cicd/cicd-overview.md)
- [Get started with Git integration](../cicd/git-integration/git-get-started.md)
- [Fabric Apps project structure](project-structure.md)
- [Deploy a Fabric app to Fabric](deploy-app.md)
- [Manage dev and prod environments with the Rayfin CLI](dev-prod-workflow.md)
- [Deploy using GitHub Actions](deploy-github-actions.md)
