---
title: Create and manage external data shares
description: Learn how to create and manage external data shares.
author: paulinbar
ms.author: painbar
ms.topic: how-to
ms.custom:
ms.date: 03/19/2024
---

# Create and manage external data shares

This article shows how you can share data from your Fabric tenant's OneLake storage with users in other Fabric tenants.

## Prerequisites

To use external data sharing, you need:

* A lakehouse or KQL database with at least one folder or table.

* Standard Fabric write and reshare permissions on the item you're sharing.

## Create an external data share

1. In a workspace or in the OneLake data hub, find the Fabric item that contains the data you want to share. See the list of [supported Fabric item types](./external-data-sharing-overview.md#supported-fabric-item-types).

1. Open the context menu of the selected item and choose **External data share (preview)**.

    :::image type="content" source="./media/external-data-sharing-create/external-data-share-option.png" alt-text="Screenshot showing the external data share option in an item's options menu.":::

1. In the **New external data share** dialog that opens, choose the folder or table to be shared and select **Save and continue**.

    :::image type="content" source="./media/external-data-sharing-create/new-external-data-share-dialog.png" alt-text="Screenshot showing the New external data share dialog.":::
 
1. Enter the email address of the user you want to share the data with and select **Send**. An email will be sent to the user inviting them to accept the invitation to share. Alternatively, you can select **Copy link** and then paste it into an email that you yourself compose.

    :::image type="content" source="./media/external-data-sharing-create/create-send-link-dialog.png" alt-text="Screenshot of the external data share create and send link dialog.":::
 
    The consumer will now be able to accept the share and access the data within their tenant.

## Manage external data shares

To view and manage existing external data shares, navigate to the shared lakehouse or KQL database in the workspace or in the OneLake data hub, open the options menu, and select **Manage permissions**.

:::image type="content" source="./media/external-data-sharing-create/manage-permissions-option.png" alt-text="Screenshot showing the manage permissions option.":::

You'll see a list of all the external shares for this item. To revoke a share, hover over the Share ID and select the Revoke share that appears. Shares may be revoked at any time.

:::image type="content" source="./media/external-data-sharing-create/manage-external-data-share-revoke-share.png" alt-text="Screenshot showing how to revoke an external data share.":::

## Considerations and limitations

Sharing data with users in other Fabric tenants has important implications for data security and privacy. See [Security considerations](./external-data-sharing-overview.md#security-considerations) for detail.

## Related content

* [External data sharing overview](./external-data-sharing-overview.md)
* [Accept an external data share](./external-data-sharing-accept.md)
* [Fabric admins: Enable external data sharing](./external-data-sharing-enable.md)
