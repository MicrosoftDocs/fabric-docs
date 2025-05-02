---
title: Tags in Microsoft Fabric
description: "Learn about tags in Microsoft Fabric."
author: paulinbar
ms.author: painbar
ms.service: fabric
ms.subservice: governance
ms.custom:
ms.topic: conceptual #Don't change
ms.date: 04/24/2025
#customer intent: As a Fabric admin, domain admin, data creator, or data consumer, I want to learn about tags in Microsoft Fabric.
---

# Tags in Microsoft Fabric

Tags is a Microsoft Fabric feature that gives organizations the ability to apply additional metadata to items in Fabric to facilitate and enhance data categorization, organization, and discoverability. Tags are configurable text labels, such as *Sales – FR 2023*, *HR – Summer Event*, or *FY 2024*, that Fabric administrators can define according to their organization's needs. Data and content owners can then apply these tags to their Fabric items, and users in the organization can use the tags to help them find the data and content they need.

Like [Domains](./domains.md), tags are an important component of Fabric's data mesh architecture. They provide increased flexibility and granularity in data categorization by allowing additional details to be added at the item level, across workspaces and domains.

## How tags work

1. Fabric admins [create an open set of tags](./tags-define.md) for use across the organization. For example *Financial*, *North America*, or *Q1 2025*. Up to 10,000 tags can be created in a tenant.

1. Data owners, who best know how to categorize their own data, [apply tags to items](./tags-apply.md). An item can have up to 10 tags applied to it.

1. Once tags are applied to items, users in the organization can use them to [filter or search for the most relevant content](#how-tags-enhance-data-discoverability).

## How tags enhance data discoverability

Once an item has tags applied, a tag icon appears next to the item name in supported views. You can hover over the icon to see what tags are applied to the item.

:::image type="content" source="./media/tags-overview/tags-icon.png" alt-text="Screenshot showing the tag icon and hover card for a tagged item.":::

You can also filter the workspace items list by tag.

:::image type="content" source="./media/tags-overview/tags-filter.png" alt-text="Screenshot showing the tags filter.":::

In addition, you can see the applied tags in an item's details, in the item's flyout card, and in lineage view.

* **Item details**

    :::image type="content" source="./media/tags-overview/tag-indication-item-details.png" alt-text="Screenshot showing the tag indication in item details.":::

* **Flyout card**

    :::image type="content" source="./media/tags-overview/tag-indication-item-flyout.png" alt-text="Screenshot showing the tag indication in an item's flyout card.":::

* **Lineage view**

    :::image type="content" source="./media/tags-overview/tags-indication-lineage-view.png" alt-text="Screenshot showing the tag indication in lineage view.":::

You can also use the global search to search by tags and see all the relevant results, accompanied by other metadata, such as item owner and location.

:::image type="content" source="./media/tags-overview/tags-global-search.png" alt-text="Screenshot showing tags used as a search term in the global search.":::

## Microsoft Fabric REST Admin APIs for tags

Some of the actions related to creating and managing tags in the UI are available through the Fabric REST Admin APIs for tags. For more information, see [Fabric REST Admin APIs for tags](/rest/api/fabric/admin/tags).

## Considerations and limitations

* A maximum of 10,000 tags can be created in a tenant.
* An item can have a maximum of 10 tags applied to it at any one time.
* Tag icons next to item names are currently supported only in the workspace items list.
* After a tag has been applied to an item, it might be several hours before the icon shows up next to the tag name, and before it's possible to find the item in the global search using the tag name as the search term.
* Filtering by tag is currently available only in workspaces.

## Related content

- [Create and manage a set of tags](tags-define.md)
- [Apply tags](tags-apply.md)
- [Microsoft Fabric REST Admin APIs for tags](/rest/api/fabric/admin/tags)
