---
title: Git integration admin settings
description: Learn about what the feature switches affecting Git integration do and how to use them.
author: billmath
ms.author: billmath
ms.topic: how-to
ms.custom:
ms.date: 07/02/2024
---

# Git integration tenant settings

The Git integration tenant admin settings are configured in the tenant settings section of the admin portal.  
The tenant admin can choose to delegate control of these switches to the workspace admin or capacity admin. If the tenant admin enables delegation, the capacity admin can override the tenant admin's decision to enable or disable the switch. The workspace admin can override the tenant and the capacity settings.

For information about how to get to and use tenant settings, see [About tenant settings](tenant-settings-index.md).

:::image type="content" source="./media/git-integration-admin-settings/workspace-settings.png" alt-text="Screenshot of workspace settings.":::

> [!IMPORTANT]
> The switches that control Git integration are part of Microsoft Fabric and only work if the [Fabric admin switch](fabric-switch.md) is turned on. If Fabric is disabled, Git integration doesn't work regardless of the status of these switches.

## Users can synchronize workspace items with their Git repositories 

Users can synchronize a workspace with an Azure Git repository, edit their workspace, and update their Git repos using the Git integration tool. You can enable Git integration for the entire organization, or for a specific group.  
This switch is **enabled** by default. Disable it to prevent users from syncing workspace items with their Git repositories.

:::image type="content" source="./media/git-integration-admin-settings/enable-git-integration-switch.png" alt-text="Screenshot of the Git integration switch.":::

To learn more, see [Introduction to Git integration](../cicd/git-integration/intro-to-git-integration.md).

To get started with Git integration, see [Manage a workspace with Git](../cicd/git-integration/git-get-started.md).

## Users can export items to Git repositories in other geographical locations

If a workspace capacity is in one geographic location (for example, Central US) while the *Azure DevOps* repo is in another location (for example, West Europe), the Fabric admin can decide whether to allow users to commit metadata (or perform other Git actions) to another geographical location. Only the metadata of the item is exported. Item data and user related information are not exported.  
Enable this setting to allow all users, or a specific group or users, to export metadata to other geographical locations.

:::image type="content" source="./media/git-integration-admin-settings/multi-geo-switch.png" alt-text="Screenshot of the multi geo switch enabled.":::

> [!NOTE]
> GitHub doesn't support enforcement of this switch.

## Users can export workspace items with applied sensitivity labels to Git repositories

Sensitivity labels aren't included when exporting an item. Therefore, the Fabric admin can choose whether to block the export of items that have sensitivity labels, or to allow it even though the sensitivity label won't be included.

Enable this setting to allow all users, or a specific group of users, to export items without their sensitivity labels.

:::image type="content" source="./media/git-integration-admin-settings/git-integration-sensitivity-labels-switch.png" alt-text="Screenshot of sensitivity labels switch.":::

Learn more about [sensitivity labels](../fundamentals/apply-sensitivity-labels.md).

## Users can sync workspace items with GitHub repositories

Users can synchronize a workspace with their GitHub repository, edit their workspace, and update their GitHub repos using the Git integration tool. You can enable Git integration for the entire organization, or for a specific group.  
This switch is **disabled** by default. Enable it to allow users to sync workspace items with their Git repositories.

:::image type="content" source="./media/git-integration-admin-settings/enable-github-integration-switch.png" alt-text="Screenshot of the GitHub integration switch.":::

To learn more, see [Introduction to Git integration](../cicd/git-integration/intro-to-git-integration.md).

To get started with Git integration, see [Manage a workspace with Git](../cicd/git-integration/git-get-started.md).

## Related content

- [About tenant settings](tenant-settings-index.md)