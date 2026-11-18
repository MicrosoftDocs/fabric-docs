---
title: Recover or permanently delete items
description: Learn how to set up item retention, recover deleted items, and permanently delete items by using the REST API as an administrator.
author: dknappettmsft
ms.author: daknappe
ms.reviewer: yuturchi, arthii
ms.custom: admin-portal
ms.topic: how-to
ms.date: 11/09/2026
ai-usage: ai-assisted
---

# Recover or permanently delete items

Fabric supports soft delete and recovery for individual items within workspaces. When you delete a [supported item](retention-recovery.md#supported-item-types), it enters a retention period during which workspace contributors, members, and admins can recover it. This protection helps prevent accidental data loss by giving you an opportunity to restore items before they're permanently removed.

In this article, you learn how to set up item retention, recover deleted items, and permanently delete items before the retention period expires.

For an overview of how retention works for workspaces and items, see [Retention and recovery in Fabric](retention-recovery.md).

## Prerequisites

- To set up item retention settings, you need a [tenant admin](admin-overview.md#administrative-roles) role.
- To recover deleted items, you need at least **Workspace Contributor** permissions. See [Permissions](retention-recovery.md#permissions-for-item-recovery-and-deletion) for the full permissions matrix.
- To permanently delete recoverable items, you need **Workspace Admin** permissions.

## Set up the retention period for deleted items

> [!NOTE]
> Item recovery is now enabled by default, with a retention period of three days. The default applies to tenants that never explicitly configured the **Item Recovery** setting and to newly created tenants. Fabric preserves settings that an admin explicitly configured: if you already turned on item recovery, your current retention value stays the same, and if you explicitly turned it off, it stays off.

You can change the retention period (from 3 to 90 days) or turn item recovery off by using the **Item Recovery** tenant setting.

1. Sign in to [Fabric](https://app.fabric.microsoft.com) using your admin account credentials. Open the **OneLake catalog**, and then select the **Govern** tab > **Configurations** > **Tenant settings** > **Item Recovery**.
1. Turn on the setting and enter the number of days for the retention period (3 to 90 days).
1. Select **Apply**.

> [!NOTE]
> When the **Item Recovery** setting is off, Fabric doesn't retain deleted items when you delete an individual item.
>
> The **Item Recovery** setting doesn't affect the retention period of workspaces. See
> [Retention and recovery in Fabric](retention-recovery.md#workspace-retention)
> for details about workspace retention.

## Restore a deleted item

While a deleted item is in a retention period, workspace contributors, members, and admins can restore it and its properties.

### Use the workspace recycle bin to restore an item

The workspace recycle bin is a dedicated view within each workspace where you can browse, restore, or permanently delete soft-deleted items.

1. Open the workspace that contained the deleted item.
1. Select **Recycle bin** from the workspace navigation.
1. Find the item you want to recover. Use the filter and search options as needed.
1. Select the item, and then choose **Restore** from the toolbar.

The restored item reappears in its original workspace with its properties, configurations, and relationships intact.

If the item's name conflicts with an active item in the workspace, the restore still succeeds.
Fabric automatically renames the restored item by appending an underscore and a generated numeric
suffix, such as `Sales notebook_1787195281`. You can rename the item after you restore it.

Naming constraints depend on the item type. For example, restoring a notebook named `Sales`
isn't affected by an active lakehouse named `Sales`. However, warehouse snapshot names must
also differ from warehouse and SQL analytics endpoint names. See
[Warehouse snapshots](../data-warehouse/warehouse-snapshot.md#manage-snapshots).

> [!IMPORTANT]
> The recycle bin automatically renames items when names conflict; the public REST API doesn't.
> See [Use the REST API to restore an item](#use-the-rest-api-to-restore-an-item).

### Use the REST API to restore an item

Use the [Recover Item](/rest/api/fabric/core/recoverable-items/recover-item) REST API operation to programmatically recover deleted items.

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
- **202 Accepted** - Recovery is in progress. The operation is a [long running operation](/rest/api/fabric/articles/long-running-operation), and the response includes `Location`, `x-ms-operation-id`, and `Retry-After` headers that you use to poll for the result.
- **404 Not Found** - Item not found or no longer in recovery period.
- **403 Forbidden** - User doesn't have permission to recover the item.
- **409 Conflict** - The item's name conflicts with an active item in the workspace. The error code is `ItemDisplayNameAlreadyInUse`.

> [!NOTE]
> Recovered items retain their original properties, settings, and permissions. If the item depends on other deleted items, you might need to restore those dependencies first.

> [!IMPORTANT]
> Unlike the recycle bin, the REST API doesn't automatically rename a recovered item when a name conflict exists. The operation fails with `409 Conflict` and the error code `ItemDisplayNameAlreadyInUse`.
>
> To recover an item that has a name conflict, either restore it from the [workspace recycle bin](#use-the-workspace-recycle-bin-to-restore-an-item), or rename the conflicting active item and then retry the recovery operation.

## Permanently delete a recoverable item

While a deleted item is in its retention period, you can permanently delete it if you have workspace admin permissions.

### Use the workspace recycle bin to permanently delete an item

1. Open the workspace that contained the deleted item.
1. Select **Recycle bin** from the workspace navigation.
1. Find the item you want to permanently delete.
1. Select the item, and then choose **Delete permanently** from the toolbar.

You're asked to confirm the permanent deletion.

> [!CAUTION]
> After you confirm permanent deletion, the item and its contents are no longer recoverable.
>
> After you permanently delete an item, OneLake retains the data for an additional seven days. You can't restore data during this period. The deletion is final and can't be reversed.

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

> [!CAUTION]
> After you confirm permanent deletion, the item and its contents are no longer recoverable.
>
> After you permanently delete an item, OneLake retains the data for an additional seven days. You can't restore data during this period. The deletion is final and can't be reversed.

## Related content

- [Retention and recovery in Fabric](retention-recovery.md)
- [Set up and manage workspace retention](workspace-retention.md)
- [Manage workspaces](portal-workspaces.md)
- [Fabric administration overview](admin-overview.md)
