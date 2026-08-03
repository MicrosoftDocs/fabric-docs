---
title: Upgrade Fabric Data Warehouse System File Version in a Git Integrated Fabric workspace
description: Learn how to upgrade warehouse items to the latest system file version in git integrated Fabric workspaces.
ms.reviewer: pvenkat
ms.date: 07/29/2026
ms.topic: how-to
---

# Upgrade the system file version of a warehouse in a Git integrated Fabric workspace

**Applies to**: [!INCLUDE [fabric-dw](includes/applies-to-version/fabric-dw.md)]

This article describes how to upgrade warehouse items to the latest system file version in a [Git integrated](git-integration.md) Fabric workspace.

[!INCLUDE [feature-preview-note](../includes/feature-preview-note.md)]

Microsoft Fabric periodically updates the underlying item definition for item types, including the warehouse. When this item definition changes, the `config.version` value in the item's `.platform` file is bumped, for example from `1.0` to `2.0`. To avoid breaking your existing warehouse changes, Fabric doesn't apply this update automatically. Instead, Fabric shows a **System update available** notice in **Source control** and lets you choose when to apply the update for a specific item type, such as warehouse.

:::image type="content" source="media/upgrade-warehouse/system-update-available.png" alt-text="Screenshot from the Fabric portal of the System update available banner in the Source control pane." lightbox="media/upgrade-warehouse/system-update-available.png":::

## Prerequisites

- A [workspace connected to a Git repository](../cicd/git-integration/git-get-started.md) that contains one or more warehouses.
- [Contributor or higher role](../fundamentals/roles-workspaces.md) in the workspace.

## Identify that a system file update is available

The `config.version` value and the `$schema` URL contain the current system file version for a warehouse.

1. Go to your Git-connected workspace, and select **Source control**.
1. If a system update is available for the warehouse item type, Fabric shows a **System update available** banner at the top of the **Source control** pane.

   You can also confirm the current system file version for a warehouse by inspecting the `config.version` property in the item's `.platform` file in your Git repository. For example, the following `.platform` file for a warehouse named `dw` shows a system file version of `2.0`:

   ```json
   {
       "$schema": "https://developer.microsoft.com/json-schemas/fabric/gitIntegration/platformProperties/2.0.0/schema.json",
       "metadata": {
           "type": "Warehouse",
           "displayName": "dw"
       },
       "config": {
           "version": "2.0",
           "logicalId": "5e477a9e-0e1a-bf9b-4eb8-33420d62f352"
       }
   }
   ```

For more information about the `.platform` file, see [Automatically generated system files](../cicd/git-integration/source-code-format.md#automatically-generated-system-files).

## Commit existing changes before you apply system file updates

Before you select **Apply system updates**, commit any pending changes in your workspace.

If you apply system updates and commit your own warehouse changes together, it becomes harder to separate the two sets of changes later. If you commit your existing changes first, the system file update appears as its own, isolated commit. This separation makes it easier to review, and if needed, revert the system update without affecting your own changes.

1. Go to **Source control** in the Fabric workspace.
1. Review the pending changes in the **Changes** list.
1. Select the items you want to commit, add a commit message, and commit the changes to the Git repository.

For more information about committing changes, see [Make changes and commit warehouse updates to Git](how-to-git-integration.md#make-changes-and-commit-warehouse-updates-to-git).

## Apply system updates

After you commit your existing changes, apply the system update.

1. In **Source control**, select **Apply system updates**.

   :::image type="content" source="media/upgrade-warehouse/apply-system-updates.png" alt-text="Screenshot from the Fabric portal showing the Applying system updates progress notification." lightbox="media/upgrade-warehouse/apply-system-updates.png":::

1. Fabric applies the system update to every warehouse of that item type in the workspace. If you have multiple warehouses, all of them are updated at the same time. You can't select individual warehouses to update.
1. Wait for the **Applying system updates** notification to complete.

## Review and commit the system update

When the system update finishes applying, review the differences before you commit them.

1. In **Source control**, go to the **Changes** list. Each updated warehouse appears as a pending change.
1. Select a warehouse, and then select **Review and commit changes** to compare the latest item definition with your current version. You can compare the `.sqlproj` file and other system files to see exactly what changed, such as an updated `Sdk` version.

   :::image type="content" source="media/upgrade-warehouse/review-commit-system-updates.png" alt-text="Screenshot from the Fabric portal of the Review and commit changes dialog comparing the current workspace version with the last synced version." lightbox="media/upgrade-warehouse/review-commit-system-updates.png":::

1. After you confirm the changes are expected, select the warehouse items, add a commit message, and select **Commit** to commit the system update to the Git repository.

If you have multiple warehouses in the workspace, all of them show the same system update. Review and commit each warehouse the same way, either individually or together, to make sure every warehouse is upgraded to the latest version.

## Warehouse system update history

For a history and release notes of the system file version history, see [Release notes for Fabric Data Warehouse system file](warehouse-system-file-version-history.md).

## Related content

- [How to use Git integration for warehouse development and deployment](how-to-git-integration.md)
- [Git Integration for Fabric Warehouse Development](git-integration.md)
- [Automatically generated system files](../cicd/git-integration/source-code-format.md)
- [Resolve conflicts in Git](../cicd/git-integration/conflict-resolution.md)

