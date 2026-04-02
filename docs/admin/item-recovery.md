---
title: Recover or permanently delete items (preview)
description: Learn how to set up item retention, recover deleted items, and permanently delete items by using the REST API as an administrator.
author: dknappettmsft
ms.author: daknappe
ms.reviewer: yuturchi, arthii
ms.custom: admin-portal
ms.topic: how-to
ms.date: 03/06/2026
ai-usage: ai-assisted
---

# Recover or permanently delete items (preview)

Fabric supports soft delete and recovery for individual items within workspaces. When you delete a [supported item](retention-recovery.md#supported-item-types), it enters a retention period during which workspace contributors, members, and admins can recover it. This protection helps prevent accidental data loss by giving you an opportunity to restore items before they're permanently removed.

In this article, you learn how to set up item retention, recover deleted items, and permanently delete items before the retention period expires.

For an overview of how retention works for workspaces and items, see [Retention and recovery in Fabric](retention-recovery.md).

> [!IMPORTANT]
> Item-level soft delete and recovery is currently in PREVIEW.
> This information relates to a prerelease product that might be substantially modified before it's released. Microsoft makes no warranties, expressed or implied, with respect to the information provided here.

## Prerequisites

- To set up item retention settings, you need a [tenant admin](microsoft-fabric-admin.md) role.
- To recover deleted items, you need at least **Workspace Contributor** permissions. See [Permissions](retention-recovery.md#permissions-for-item-recovery-and-deletion) for the full permissions matrix.
- To permanently delete recoverable items, you need **Workspace Admin** permissions.

## Set up the retention period for deleted items

By default, when you turn on item recovery in tenant settings, Fabric retains deleted items for seven days. You can change the retention period (from 7 to 90 days) by using the **Item Recovery** tenant setting.

1. In the admin portal, go to **Tenant settings** > **Item Recovery**.
1. Turn on the setting and enter the number of days for the retention period (7 to 90 days).
1. Select **Apply**.

> [!NOTE]
> When the **Item Recovery** setting is off, Fabric doesn't retain deleted items when you delete an individual item.
>
> The Item Recovery setting doesn't affect the retention period of workspaces. See [Retention and recovery in Fabric](retention-recovery.md#workspace-retention) for details about workspace retention.

## Restore a deleted item

While a deleted item is in a retention period, workspace contributors, members, and admins can restore it and its properties.

### Use the workspace recycle bin to restore an item

The workspace recycle bin is a dedicated view within each workspace where you can browse, restore, or permanently delete soft-deleted items.

1. Open the workspace that contained the deleted item.
1. Select **Recycle bin** from the workspace navigation.
1. Find the item you want to recover. You can use the filter and search options to locate specific items.
1. Select the item, then choose **Restore** from the toolbar.

The restored item reappears in its original workspace with its properties, configurations, and relationships intact.

### Use the REST API to restore an item

Use the REST API to programmatically recover deleted items.

**Request:**

```http
POST https://api.fabric.microsoft.com/v1/workspaces/{workspaceId}/recoverableItems/{itemId}/recover
```

**Parameters:**

- `workspaceId` - The unique identifier of the workspace containing the deleted item.
- `itemId` - The unique identifier of the item to recover.

**Example:**

```bash
curl --request POST \
  --url https://api.fabric.microsoft.com/v1/workspaces/aaaabbbb-0000-cccc-1111-dddd2222eeee/recoverableItems/b1b1b1b1-cccc-dddd-eeee-f2f2f2f2f2f2/recover \
  --header 'Authorization: Bearer {token}'
```

**Response:**

- **200 OK** - Item successfully recovered.
- **404 Not Found** - Item not found or no longer in recovery period.
- **403 Forbidden** - User doesn't have permission to recover the item.

> [!NOTE]
> Recovered items retain their original properties, settings, and permissions. If the item depends on other deleted items, you might need to restore those dependencies first.

> [!IMPORTANT]
> If a new item with the same name as the soft-deleted item exists in the same workspace, the recovery fails until you rename the existing item. To recover the deleted item, rename the new item, then retry the recovery operation.

## Permanently delete a recoverable item

While a deleted item is in its retention period, you can permanently delete it if you have workspace admin permissions.

### Use the Workspace recycle bin to permanently delete an item

1. Open the workspace that contained the deleted item.
1. Select **Recycle bin** from the workspace navigation.
1. Find the item you want to permanently delete.
1. Select the item, then choose **Delete permanently** from the toolbar.

You're asked to confirm the permanent deletion. After you confirm, the item and its contents are no longer recoverable.

### Use the REST API to permanently delete an item

Use the REST API to programmatically delete items during the retention period.

**Request:**

```http
DELETE https://api.fabric.microsoft.com/v1/workspaces/{workspaceId}/recoverableItems/{itemId}
```

**Parameters:**

- `workspaceId` - The unique identifier of the workspace containing the deleted item.
- `itemId` - The unique identifier of the item to permanently delete.

**Example:**

```bash
curl --request DELETE \
  --url https://api.fabric.microsoft.com/v1/workspaces/aaaabbbb-0000-cccc-1111-dddd2222eeee/recoverableItems/b1b1b1b1-cccc-dddd-eeee-f2f2f2f2f2f2 \
  --header 'Authorization: Bearer {token}'
```

> [!WARNING]
> You can't undo a permanent deletion.

## Related content

- [Retention and recovery in Fabric](retention-recovery.md)
- [Set up and manage workspace retention](workspace-retention.md)
- [Manage workspaces](portal-workspaces.md)
- [Admin portal overview](admin-center.md)
