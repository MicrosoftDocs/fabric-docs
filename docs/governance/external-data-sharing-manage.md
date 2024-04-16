---
title: "Create an external data share"
description: "This article describes how to create an external data share to share data in a OneLake storage account with a user in another tenant."
author: paulinbar
ms.author: painbar
ms.topic: how-to
ms.date: 04/16/2024

#customer intent: As a data owner, I want to share data in my tenant's OneLake storage with an user in another Fabric tenant.
---

# Manage external data shares

This article explains what you see on the external data share manage permissions tab, and shows how to revoke external data shares.

## Prerequisites

* A lakehouse or KQL database with at least one folder or table.
* Fabric write permissions on the item you're sharing.

To view and manage existing external data shares, navigate to the shared lakehouse or KQL database in the workspace or in the OneLake data hub, open the options menu, and select **Manage permissions**.

:::image type="content" source="./media/external-data-sharing-create/manage-permissions-option.png" alt-text="Screenshot showing the manage permissions option.":::

You'll see a list of all the external shares for this item.

:::image type="content" source="./media/external-data-sharing-create/manage-external-data-share-revoke-share.png" alt-text="Screenshot showing how to revoke an external data share.":::

The following table describes the columns.

| Column | Description |
|:-------|:------------|
|**Share ID** | A guid that is assignnd to the external data share when it is created. |
|**Status** | Share status.<br>Pending: Share invitation sent but not yet accepted.<br>Active: Shared accepted.<br>Expired: Share sent but not excepted within the permitted time window.<br>Revoked: Share revoked. Data no longer accessible via this share.|
|**Shared with** |The user to whom the external data invitation was sent to. |
|**Location** |URL to the shared data.|
|**Created** | Creation date of the external data share.|
|**Created by** |The user who created the external data share.|
|**Permissions** |Permissions granted by the external share.|

## Revoke an external share

External data shares can be revoked at any time. You can revoke the external data shares of any item you have write permissions on.

To revoke a share, hover over its Share ID and select the Revoke share icon that appears.

:::image type="content" source="./media/external-data-sharing-create/manage-external-data-share-revoke-share.png" alt-text="Screenshot showing how to revoke an external data share.":::

> [!Warning]
> Revoking an external data share might have serious repercussions for the receiving tenant, and should be considered carefully and in consultation with the receiving tenant. For more information, see [Revoking external data shares](./external-data-sharing-overview.md#revoking-external-data-shares).

## Related content

* [External data sharing overview](./external-data-sharing-overview.md)
* [Accept an external data share](./external-data-sharing-accept.md)
* [Fabric admins: Enable external data sharing](./external-data-sharing-enable.md)
