---
title: Apply tags to items in Fabric
description: "Learn how to apply tags to items in Microsoft Fabric."
author: msmimart
ms.author: mimart
ms.service: fabric
ms.subservice: governance
ms.topic: how-to #Don't change
ms.date: 05/05/2025

#customer intent: As a data creator, I want to apply tags to my items so as to facilitate data management and discovery.

---

# Apply tags to items in Fabric

This article describes how to apply tags to items in Microsoft Fabric. The intended audience is users who want to apply tags to Fabric items.

For more information about tags, see [Tags in Microsoft Fabric](./tags-overview.md).

## Prerequisites

You must have write permissions on an item to be able to apply tags to it or remove tags from it.

## Apply tags to an item

1. Open the item's settings and go the **Tags** tab.

1. Select the **Select tags to apply** drop-down to display the list of available tags. Choose the tags that are relevant for your item. You can select more than one tag. An item can have up to 10 tags. Tags already applied to the item are listed under **Applied tags**.

    :::image type="content" source="./media/tags-apply/choose-tags.png" alt-text="Screenshot showing how to choose tags to apply to an item.":::

    > [!NOTE]
    > If the **Select tags to apply** drop down is disabled, it means you do not have permissions to apply tags to the item.

1. When done, close the settings pane. For Power BI items, select **Save** or **Apply**.

## Remove tags from an item

1. Open the item's settings and go the **Tags** tab.

    All the tags applied to the item appear under **Applied tags**.

    :::image type="content" source="./media/tags-apply/remove-tags.png" alt-text="Screenshot showing how to remove tags from an item.":::

1. Select the **X** next to the names of the tags you wish to remove from the item.

1. When done, close the settings pane. For Power BI items, select **Save** or **Apply**.

## Apply or remove tags programmatically using APIs

Tags can applied to or removed from items programmatically using APIs. For more information, see [Fabric REST Admin APIs for tags](/rest/api/fabric/admin/tags).

## Related content

* [Tags overview](tags-overview.md).md)
* [Create and manage a set of tags](tags-define.md)
* [Fabric REST Admin APIs for tags](/rest/api/fabric/admin/tags)