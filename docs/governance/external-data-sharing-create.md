---
title: Create and manage external data shares
description: Learn about sharing data from your organization's OneLake storage locations with external users.
author: paulinbar
ms.author: painbar
ms.topic: conceptual
ms.custom:
ms.date: 03/19/2024
---

# Create and manage external data shares

## Prerequisites

To use external data sharing, you need a lakehouse or KQL database with at least one folder or table.

## Share data with a user in another Fabric tenant

1. In a workspace or in the OneLake data hub, find the [supported Fabric item](./external-data-sharing-overview.md#supported-fabric-item-types) that contains the data that you want to share.

1. Open the context menu of the selected item and choose **External data share (preview)**.

    :::image type="content" source="./media/external-data-sharing-create/image4.png" alt-text="Illustration of a cross-tenant OneLake data share.":::

1. In the **New external data share** dialog that opens, choose the folder or table to be shared and select **Save and continue**.

    :::image type="content" source="./media/external-data-sharing-create/image5.png" alt-text="Illustration of a cross-tenant OneLake data share.":::
 
1. Enter the email address of the user you want to share the data with and select **Send**. An email will be sent to the user inviting them to accept the invitation to share. Alternatively, you can select **Copy link** and then paste it into an email that you yourself compose.

    :::image type="content" source="./media/external-data-sharing-create/image6.png" alt-text="Illustration of a cross-tenant OneLake data share.":::
 
    The consumer will now be able to accept the share and access the data within their tenant.

## Manage external data shares

To view and manage existing external data shares, navigate to the shared lakehouse or KQL database in the workspace or in the OneLake data hub, open the options menu, and select **Manage permissions**.

:::image type="content" source="./media/external-data-sharing-create/image9.png" alt-text="Illustration of a cross-tenant OneLake data share.":::

You'll see a list of all the external shares for this item. To revoke a share, hover over the Share ID and select the Revoke share that appears. Shares may be revoked at any time.

:::image type="content" source="./media/external-data-sharing-create/image10.png" alt-text="Illustration of a cross-tenant OneLake data share.":::

## Considerations and limitations

See [Security considerations](./external-data-sharing-overview.md#security-considerations)

## Related content

* [External data sharing overview](./external-data-sharing-overview.md)
* [Accept an external data share](./external-data-sharing-accept.md)
* [Fabric admins: Enable external data sharing](./external-data-sharing-enable.md)
