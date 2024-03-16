---
title: Accept an external data share
description: Learn how to accept an external data share.
author: paulinbar
ms.author: painbar
ms.topic: how-to
ms.custom:
ms.date: 03/19/2024
---

# Accept an external data share

When someone creates an external data share and invites you to share OneLake data from their organization, you receive a link that you can use to accept the invitation and to create a shortcut to the shared data a in Fabric item of your choosing.

## Prerequisites

To be able to accept and use an external data share, you need standard Fabric write and reshare permissions on the lakehouse or KQL database item where you want to create the shortcut to the shared data. That item must have at least one folder or table.

## Accept a share

To accept a share:

1. Select the share link or paste the URL in a browser. This navigates you to a dialog that displays the name of the share and the data provider's tenant details.

:::image type="content" source="./media/external-data-sharing-accept/review-accept-dialog.png" alt-text="Screenshot showing external data share review and accept dialog.":::

Select **Accept and select a location**. This opens the OneLake data hub. Select a lakehouse, select **Next**, select the table or folder location in which to create the incoming share shortcut, and then select **Apply**.

:::image type="content" source="./media/external-data-sharing-accept/select-share-destination-dialog.png" alt-text="Screenshot showing the dialog for choosing the location where the external data share shortcut will be created.":::

The share has now been created in your OneLake location. The data within this share location can be consumed using any Fabric workload in your tenant.

## Security considerations

Using data shared from another tenant has important implications for data security and privacy. See [Security considerations](./external-data-sharing-overview.md#security-considerations) for detail.

## Related content

* [External data sharing overview](./external-data-sharing-overview.md)
* [Create and manage external data shares](./external-data-sharing-create.md)
* [Fabric admins: Enable external data sharing](./external-data-sharing-create.md)
