---
title: "Create an external data share"
description: "This article describes how to create an external data share to share data in a OneLake storage account with a user in another tenant."
author: paulinbar
ms.author: painbar
ms.topic: how-to
ms.date: 04/16/2024

#customer intent: As a data owner, I want to share data in my tenant's OneLake storage with an user in another Fabric tenant.
---

# Create an external data share (preview)

This article shows how you can share data from your Fabric tenant's OneLake storage with users in other Fabric tenants.

Before sharing data with a user in another tenant via external data sharing, be sure to review the [external data sharing security considerations](./external-data-sharing-overview.md#security-considerations).

## Prerequisites

* A lakehouse or KQL database with at least one folder or table.
* Standard Fabric read and reshare permissions on the item you're sharing.

## Create an external data share

1. In a workspace or in the OneLake data hub, find the Fabric item that contains the data you want to share. See the list of [supported Fabric item types](./external-data-sharing-overview.md#supported-fabric-item-types).

1. Open the context menu of the selected item and choose **External data share (preview)**.

    :::image type="content" source="./media/external-data-sharing-create/external-data-share-option.png" alt-text="Screenshot showing the external data share option in an item's options menu.":::

1. In the **New external data share** dialog that opens, choose the folder or table to be shared and select **Save and continue**.

    :::image type="content" source="./media/external-data-sharing-create/new-external-data-share-dialog.png" alt-text="Screenshot showing the New external data share dialog.":::
 
1. Enter the email address of the user you want to share the data with and select **Send**. An email will be sent to the user inviting them to accept the invitation to share. Alternatively, you can select **Copy link** and then paste it into an email that you yourself compose.

    :::image type="content" source="./media/external-data-sharing-create/create-send-link-dialog.png" alt-text="Screenshot of the external data share create and send link dialog.":::
 
    The person you invited will now be able to accept the share and access the data from within their tenant. They have 90 days to accept the invitation, after which the invitation expires.

You can revoke the external share at any time, although doing so can have serious implications for the consuming tenant. For information see [Manage external data shares](./external-data-sharing-manage.md#revoke-external-data-shares).

## Related content

* [External data sharing overview](./external-data-sharing-overview.md)
* [Accept an external data share](./external-data-sharing-accept.md)
* [Manage external data shares](./external-data-sharing-manage.md)
* [Fabric admins: Enable external data sharing](./external-data-sharing-enable.md)