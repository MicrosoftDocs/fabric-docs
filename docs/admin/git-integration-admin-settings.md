---
title: Git integration admin settings
description: This article explains what the feature switches affecting git integration do and how to use them.
author: mberdugo
ms.author: monaberdugo
ms.topic: how-to
ms.custom: build-2023
ms.date: 07/30/2023
---

# Tenant admin settings for git integration

[!INCLUDE [preview-note](../includes/preview-note.md)]

The git integration tenant admin settings are configured in the tenant settings section of the Admin portal. For information about how to get to and use tenant settings, see [About tenant settings](/power-bi/admin/service-admin-portal-about-tenant-settings).

:::image type="content" source="./media/git-integration-admin-settings/workspace-settings.png" alt-text="Screenshot of the Admin portal with the workspace settings shown." lightbox="./media/git-integration-admin-settings/workspace-settings.png":::

> [!IMPORTANT]
> The switches that control git integration are part of Microsoft Fabric and will only work if the [Fabric admin switch](./fabric-switch.md) is turned on. If Fabric is disabled, git integration can't work regardless of the status of these switches.

These settings are only visible to the tenant admin.  
There are three settings relating to git integration:

* [Enable the git integration feature](#enable-git-integration-feature)
* [Enable git actions on workspaces residing in other geographical locations](#enable-git-actions-on-workspaces-residing-in-other-geographical-locations)
* [Enable export of items that have sensitivity labels](#enable-export-of-items-that-have-sensitivity-labels)

## Enable git integration feature

Enable this setting to allow users to synchronize a workspace with a git repository, edit their workspace, and update their git repos using the git integration tool. You can enable git integration for the entire organization, or for a specific group.

:::image type="content" source="./media/git-integration-admin-settings/enable-git-integration-switch.png" alt-text="Screenshot of the Admin portal tenant switch that enables git integration." lightbox="./media/git-integration-admin-settings/enable-git-integration-switch.png":::

Learn more about [git integration](../CICD/git-integration/git-get-started.md).

## Enable git actions on workspaces residing in other geographical locations

If a workspace capacity is in one geographic location (for example, Central US) while the Azure DevOps repo is in another location (for example, West Europe), the Fabric admin can decide whether to allow users to commit metadata (or perform other git actions) to another geographical location. Only the metadata of the item is exported. Item data and user related information are not exported.  
Enable this setting to allow all users, or a specific group or users, to export metadata to other geographical locations.

:::image type="content" source="./media/git-integration-admin-settings/multi-geo-switch.png" alt-text="Screenshot of the Admin portal tenant switch that enables exporting items to other geographical locations." lightbox="./media/git-integration-admin-settings/multi-geo-switch.png":::

## Enable export of items that have sensitivity labels

Sensitivity labels aren't included when exporting an item. Therefore, the Fabric admin can choose whether to block the export of items that have sensitivity labels, or to allow it even though the sensitivity label won't be included.  
Enable this setting to allow all users, or a specific group of users, to export items without their sensitivity labels.

:::image type="content" source="./media/git-integration-admin-settings/git-integration-sensitivity-labels-switch.png" alt-text="Screenshot of the Admin portal tenant switch that enables exporting sensitivity labels.":::

Learn more about [sensitivity labels](../get-started/apply-sensitivity-labels.md).

## Next steps

* [About tenant settings](/power-bi/admin/service-admin-portal-about-tenant-settings)

* [About git integration](../CICD/git-integration/intro-to-git-integration.md)
