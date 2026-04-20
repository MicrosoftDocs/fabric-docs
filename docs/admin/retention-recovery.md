---
title: Retention and recovery in Fabric
description: Learn how retention and recovery work for deleted workspaces and items in Fabric, including retention periods and what gets restored.
author: dknappettmsft
ms.author: daknappe
ms.reviewer: yuturchi, arthii
ms.custom: admin-portal
ms.topic: concept-article
ms.date: 03/06/2026
ai-usage: ai-assisted
---

# Retention and recovery in Fabric

Fabric has retention and recovery capabilities at both the workspace and item levels. When you delete workspaces or items, they enter a retention period during which you can restore them. These capabilities help protect against accidental deletions by giving you an opportunity to recover deleted content before it's permanently removed.

This article explains how retention and recovery work at both the workspace and item levels, so you can choose the right protection strategy for your Fabric content.

## Workspace retention vs. item retention

The following table compares workspace retention and item-level soft-delete and recovery:

| Feature | Collaborative workspace retention | My workspace retention | Item retention (preview) |
| --- | --- | --- | --- |
| **Applies when** | User deletes a collaborative workspace | User deletes a My workspace | User deletes a [supported item](#supported-item-types) |
| **Default retention state** | Enabled | Enabled | Disabled |
| **Can an admin disable retention?** | No | No | Yes |
| **Minimum retention period** | 7 days | 30 days (fixed) | 7 days (when enabled) |
| **Maximum retention period** | 90 days | 30 days (fixed) | 90 days |

> [!NOTE]
> Personal workspaces (*My workspaces*) have a fixed 30-day retention period. You can't disable or change this retention period.

## Workspace retention

When you delete a workspace, Fabric doesn't permanently remove it immediately. Instead, it enters a configurable retention period during which you can restore it. At the end of the retention period, Fabric permanently removes the workspace and irreversibly deletes its contents.

The retention period for personal workspaces (*My workspaces*) is fixed at 30 days.

The default retention period for collaborative workspaces is seven days. You can change the retention period (from 7 to 90 days) by using the **Define workspace retention period** tenant setting in the admin portal.

During the retention period, you can restore a deleted workspace or permanently delete it before the retention period expires. For step-by-step instructions, see [Set up and manage workspace retention](workspace-retention.md).

## Item soft-delete and recovery (preview)

> [!IMPORTANT]
> Item-level soft-delete and recovery is currently in PREVIEW.
> This information relates to a prerelease product that might be substantially modified before it's released. Microsoft makes no warranties, expressed or implied, with respect to the information provided here.

Fabric supports soft-delete and recovery for individual items within workspaces. When you delete a supported item, it enters a retention period during which workspace contributors, members, and admins can recover it. This feature provides an additional layer of data protection at the item level.

By default, item recovery is turned off. You can turn on item recovery and set up the retention period (from 7 to 90 days) by using the **Fabric Item Recovery** tenant setting in the admin portal.

For step-by-step instructions on setting up item recovery and restoring or permanently deleting items, see [Recover or permanently delete items](item-recovery.md).

## Supported item types

The following item types support soft-delete and recovery:

- API for GraphQL
- Copy job
- Cosmos database
- Data agent *(preview)*
- Data pipeline
- Environment
- Graph index *(preview)*
- Graph queryset *(preview)*
- Healthcare data solutions
- KQL queryset
- Lakehouse
- Map *(preview)*
- Mirrored Azure Databricks catalog
- Mirrored database
- Mirrored Snowflake
- ML experiment
- ML model
- Notebook
- Ontology *(preview)*
- Operational agent *(preview)*
- Real-time dashboard
- Spark job definition
- SQL database *(preview)*
- User data function
- Variable library
- Warehouse
- Warehouse snapshot

For supported item types only, when you turn on the [Item Recovery setting](item-recovery.md#set-up-the-retention-period-for-deleted-items) and someone deletes an item in a workspace through the Fabric UI or API, Fabric moves the item to a soft-deleted state. You can't recover unsupported item types because Fabric irreversibly deletes them.

Fabric plans to add support for more item types.

## Permissions for item recovery and deletion

The following table shows the permissions required to recover or permanently delete items:

| Action | Workspace Viewer | Workspace Contributor | Workspace Member | Workspace Admin |
| --- | --- | --- | --- | --- |
| Recover a deleted item | No | Yes | Yes | Yes |
| Permanently delete a recoverable item | No | No | No | Yes |

> [!NOTE]
> Different item types have different permissions for the delete operation. To learn more about the permissions for each item, see [Item permissions](../security/permission-model.md#item-permissions).

## What is restored when an item is recovered

When you recover an item, Fabric restores it to its original state before deletion. The recovery process preserves all properties, configurations, and relationships except shared item permissions.

### OneLake Catalog

Soft-deleted items don't appear in the catalog. After recovery, items reappear in the catalog with full functionality. The actions menu, edit capabilities, and hover cards work normally. Fabric restores Data Loss Prevention icons and policy tips. Favorite status and parent-child relationships are preserved. For more information, see [OneLake Catalog overview](../governance/onelake-catalog-overview.md).

### Lineage and relations

Soft-deleted items don't appear in lineage views. After recovery, Fabric restores full lineage relations. For more information, see [Lineage](../governance/lineage.md).

### Governance and administration

When you soft-delete or recover items, Fabric also disables or restores governance and administration features:

- **Endorsement and tags** - Fabric restores endorsement status after recovery. Tags are fully restored in all views, including the workspace list and workspace lineage. Fabric also restores tag-based filtering and all tag associations. For more information, see [Endorsement overview](../governance/endorsement-overview.md).

- **Information protection** - Fabric reapplies Data Loss Prevention (DLP) policies after recovery and restores role-based access controls. Protection policies remain intact, sensitivity labels are preserved on recovered items, and last modified user information (UPN) is maintained. For more information, see [Data loss prevention for Fabric](../governance/data-loss-prevention-configure.md) and [Sensitivity labels in Fabric](../governance/sensitivity-label-default-label-policy.md).

- **Metadata scanning** - Metadata scanning doesn't return soft-deleted items. After recovery, scan results include the recovered items with all properties. For more information, see [Metadata scanning](../governance/governance-compliance-overview.md#metadata-scanning).

### Item share permissions

Fabric restores shared data after recovery, but it doesn't restore share permissions. After recovery, you need to re-share the item to make the shared data accessible again. For more information about sharing data warehouses, see [Share your data and manage permissions](../data-warehouse/share-warehouse-manage-permissions.md).

### Warehouse-specific recovery

When you recover a warehouse, Fabric restores all the metadata and data, but Fabric doesn't support snapshot restore. If you delete a warehouse, Fabric also deletes all the snapshots, and you can't recover them as part of the warehouse recovery process.

## Billing during the retention period

During the retention period, soft-deleted items continue to incur OneLake storage costs, which are billed at the same rate as active data. In addition, soft-deleted items might consume small amounts of Capacity Units (CUs) from workload background maintenance activity.

To stop incurring costs for a soft-deleted item, permanently delete it before the retention period expires. For more information, see [Recover or permanently delete items](item-recovery.md).

## Limitations of soft-delete and recovery

- Only specific item types support soft-delete and recovery. See [Supported item types](#supported-item-types) for details.
- Shared item permissions aren't restored after soft-delete and recovery. You need to re-share the item to restore access for other users.
- You can't delete [workspace folders](../fundamentals/workspaces-folders.md) that have soft-deleted items until you permanently delete all items in the folder.
- Only [tenant admins](roles.md) can set up item retention settings. Workspace admins can't change these settings at the workspace level.
- When item recovery is enabled, admin insights on the [Govern tab in the OneLake catalog](../governance/onelake-catalog-govern.md) reflect deleted items only after they're permanently deleted. Soft-deleted items that are still in the retention period don't appear as deleted in the insights.
- When item recovery is enabled, [Fabric workspace item events](../real-time-hub/create-streams-fabric-workspace-item-events.md) such as `Microsoft.Fabric.ItemDeleteSucceeded` are generated when items are permanently deleted. Soft-deleting an item doesn't generate a delete event.

## Known issues

- If you use [Git integration](../cicd/git-integration/intro-to-git-integration.md) or [deployment pipelines](../cicd/deployment-pipelines/intro-to-deployment-pipelines.md), a Git sync or pipeline deployment might re-create an item that was previously soft-deleted. The version created by Git contains only the item definition and doesn't include data. If you need to restore the item's data, recover the soft-deleted item from the recycle bin, delete the copy created by Git, and then re-sync with Git to reconcile the workspace state.

## Related content

- [Set up and manage workspace retention](workspace-retention.md)
- [Recover or permanently delete items](item-recovery.md)
- [Manage workspaces](portal-workspaces.md)
- [Admin portal overview](admin-center.md)
