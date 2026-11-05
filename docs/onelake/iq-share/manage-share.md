---
title: Manage a Share with IQ Sharing
description: Learn how data producers review recipients and configurations and manage the lifecycle of a Share through IQ Sharing.
ms.reviewer: shivnarayanan
ms.topic: how-to
ms.date: 10/28/2026
ai-usage: ai-assisted
#customer intent: As a data producer, I want to manage a Share through IQ Sharing so that I can control recipients and access to shared data.
---

# Manage a Share with IQ Sharing (preview)

As a data producer, manage the **Share** you created with IQ Sharing. Use it to review shared items, manage recipients, and check acceptance status and expiration.

> [!NOTE]
> IQ Sharing is currently in preview. This preview is provided without a service-level agreement and isn't recommended for production workloads. Certain features might not be supported or might have constrained capabilities. For more information, see [Supplemental Terms of Use for Microsoft Azure Previews](https://azure.microsoft.com/support/legal/preview-supplemental-terms/).

## View a Share

You can also find your Shares in the OneLake catalog.

1. Open the workspace that contains the Share.

1. Open the Share.

1. On **Items**, review the shared item, permission, sensitivity, status, and last-modified information.

1. Select **Recipients** to review the intended recipients and their acceptance status.

1. Select **Configurations** to review the Share expiration.

   :::image type="content" source="media/manage-share/created-share.png" alt-text="Screenshot of a Share showing the Items, Recipients, and configuration areas, Share URL, acceptance status, and expiration." lightbox="media/manage-share/created-share.png":::

## Add a recipient

1. Open the Share.

1. Select **Recipients**.

1. Add one or more users or service principals to the Share.

## Revoke a recipient

1. Open the Share.

1. Select **Recipients**.

1. Revoke the user or service principal.

The recipient immediately loses access to the shared data. When the recipient refreshes the Share Subscription, Fabric deletes the corresponding shared items from the consumer workspace. As a result, downstream items that depend on the shared data, such as data agents and semantic models, might become unusable.

## Share expiration

Every Share requires an expiration date. The expiration configuration defines when access ends. After the expiration date, data consumers lose permission to the shared data. An expired Share can't be extended.

## Add items

Open the Share and add the items that you want to share. The items are added to the recipient's Share Subscription when the recipient refreshes the Share Subscription.

## Remove items

Open the Share and remove the items that you no longer want to share. The removed items no longer appear to the recipient after the recipient refreshes the Share Subscription.

## Delete a Share

> [!WARNING]
> Deleting a Share removes access to its shared content for all data consumers. Before you delete it, confirm the affected recipients.

## Related content

- [IQ Sharing overview](onelake-share-overview.md)
- [Create a Share with IQ Sharing](create-share.md)
- [Manage a Share Subscription in IQ Sharing](manage-share-subscription.md)
