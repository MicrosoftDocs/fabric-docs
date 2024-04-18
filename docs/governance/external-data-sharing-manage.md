---
title: "Manage external data shares"
description: "This article describes how to manage external data shares."
author: paulinbar
ms.author: painbar
ms.topic: how-to
ms.date: 04/16/2024

#customer intent: As a data owner, I want to manage the external data shares on an item.
---

# Manage external data shares

This article explains what you see on the external data share manage permissions tab, and shows how to revoke external data shares.

## Prerequisites

* Fabric read and reshare permissions on the item whose external data shares you want to manage.

## View an item's external data shares

To view and manage existing external data shares, navigate to the shared lakehouse or KQL database in the workspace or in the OneLake data hub, open the options menu, and select **Manage permissions**.

:::image type="content" source="./media/external-data-sharing-manage/manage-permissions-option.png" alt-text="Screenshot showing the manage permissions option.":::

You'll see a list of all the external shares for this item.

:::image type="content" source="./media/external-data-sharing-manage/manage-external-data-share-share-list.png" alt-text="Screenshot showing how to revoke an external data share." lightbox="./media/external-data-sharing-manage/manage-external-data-share-share-list.png":::

The following table describes the columns.

| Column | Description |
|:-------|:------------|
|**Share ID** | A guid that is assignnd to the external data share when it is created. |
|**Status** | Share status.<br>- Pending: Share invitation sent but not yet accepted.<br>- Active: Share accepted.<br>- Expired: Share sent but not accepted within 90 days of it being created.<br>- Revoked: Share revoked. Data no longer accessible via this share.|
|**Shared with** |The user to whom the external data invitation was sent. |
|**Location** |URL to the shared data.|
|**Created** | Creation date of the external data share.|
|**Created by** |The user who created the external data share.|
|**Permissions** |Permissions granted by the external share.|

## Revoke external data shares

External data shares can be revoked at any time. You can revoke the external data shares of any item you have read and reshare permissions on.

To revoke a share, hover over its Share ID and select the **Revoke share** icon that appears.

:::image type="content" source="./media/external-data-sharing-manage/manage-external-data-share-revoke-share.png" alt-text="Screenshot showing how to revoke an external data share.":::

> [!Warning]
> Revoking an external data share is a serious matter that should be considered carefully and in consultation with the receiving tenant. It completely and irreversibly severs all access from the receiving tenant to the shared data. This means that any and all data artifacts built in the receiving tenant on the basis of the shared data will cease to function. A revoked external data share can't be restored. A new external data share can be created, but all work done in the receiving tenant based on the revoked share will have to be rebuilt from scratch..

## Related content

* [External data sharing overview](./external-data-sharing-overview.md)
* [Create an external data share](./external-data-sharing-create.md)
* [Accept an external data share](./external-data-sharing-accept.md)
* [Fabric admins: Enable external data sharing](./external-data-sharing-enable.md)
