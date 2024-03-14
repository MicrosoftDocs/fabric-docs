---
title: Create and manage external data shares
description: Learn about sharing data with external users.
author: paulinbar
ms.author: painbar
ms.topic: conceptual
ms.custom:
ms.date: 03/19/2024
---

# Create and manage external data shares

## Prerequisites

Before you can get started with creating or accepting shares, the private preview must be enabled in your tenant. To enable the private preview, you will need:

1. Microsoft tenant with at least one [Fabric enabled capacity](../admin/fabric-switch.md). 
1. Fabric admin with permission to enable tenant switch.
1. Lakehouse or KQL Database with at least one folder or table.

## Share data with a user in another Fabric tenant

1. In a workspace or in the OneLake data hub, find the supported Fabric item that contains the data that you want to share.

1. Open the context menu of the selected item and choose **External data share (preview)**.

    :::image type="content" source="./media/external-data-sharing-create/image4.png" alt-text="Illustration of a cross-tenant OneLake data share.":::

1. In the **New external data share** dialog that opens, choose the folder or table to be shared and select **Save and continue**.

    :::image type="content" source="./media/external-data-sharing-create/image5.png" alt-text="Illustration of a cross-tenant OneLake data share.":::
 
1. Enter the email address of the user you want to share the data with and select Send. An email will be sent to the user inviting them to accept the invitation to share. Alternatively, you can select Copy link and then paste it into an email that you yourself compose.

:::image type="content" source="./media/external-data-sharing-create/image6.png" alt-text="Illustration of a cross-tenant OneLake data share.":::
 
The consumer will now be able to accept the share and access the data within their tenant.

## Manage Shares

To view existing shares, navigate to the shared Lakehouse or KQL Database within the workspace view or the OneLake data hub, click on the context menu, and then click “Manage permissions”

:::image type="content" source="./media/external-data-sharing-create/image9.png" alt-text="Illustration of a cross-tenant OneLake data share.":::

Navigate to the “External data shares” tab to view a list of external shares for this item. Hover over the share id, to view the revoke icon. Shares may be revoked at any time.

:::image type="content" source="./media/external-data-sharing-create/image10.png" alt-text="Illustration of a cross-tenant OneLake data share.":::

## Considerations and limitations

See [Security considerations](./external-data-sharing-overview.md#security-considerations)

## Related content

* [External data sharing overview](./external-data-sharing-overview.md)
* [Accept an external data share](./external-data-sharing-accept.md)
