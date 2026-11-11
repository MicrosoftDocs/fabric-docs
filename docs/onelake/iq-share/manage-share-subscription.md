---
title: Manage a Share Subscription in IQ Sharing
description: Learn how data consumers review and delete a Share Subscription created through IQ Sharing.
ms.reviewer: shivnarayanan
ms.topic: how-to
ms.date: 10/28/2026
ai-usage: ai-assisted
#customer intent: As a data consumer, I want to manage a Share Subscription so that I can understand and navigate the shared data available to me.
---

# Manage a Share Subscription in IQ Sharing (preview)

As a data consumer, use the **Share Subscription** created when you accepted an IQ Sharing invitation to review the Share's status, expiration, and shared items.

> [!NOTE]
> IQ Sharing is currently in preview. This preview is provided without a service-level agreement and isn't recommended for production workloads. Certain features might not be supported or might have constrained capabilities. For more information, see [Supplemental Terms of Use for Microsoft Azure Previews](https://azure.microsoft.com/support/legal/preview-supplemental-terms/).

## View Share information

You can also find your Share Subscriptions in the OneLake catalog.

1. Open the workspace where you accepted the Share.

1. Open the Share Subscription.

1. Review the Share name and **Shared with you** label.

1. Review the **Shared items** and **Configuration** cards. The configuration card displays the required expiration date.

   :::image type="content" source="media/manage-share-subscription/share-subscription.png" alt-text="Screenshot of a Share Subscription showing its shared-item count, expiration configuration, OneLake Mirrored Items, permissions, and status." lightbox="media/manage-share-subscription/share-subscription.png":::

## View the items included in the Share

1. In the Share Subscription, select **Items**.

1. Review each entry under **Shared data**. The list shows the item name, type, permission, sensitivity, status, and last-modified information.

Each supported shared item is represented in the consumer workspace by a OneLake Mirrored Item.

## Delete or unsubscribe

Delete the Share Subscription to unsubscribe from the Share. Fabric removes all shared data and related items from the data consumer's workspace. The data producer isn't notified that the consumer deleted the data or unsubscribed.

## Related content

- [IQ Sharing overview](onelake-share-overview.md)
- [Accept an IQ Sharing invitation](accept-share.md)
- [Manage a Share with IQ Sharing](manage-share.md)
