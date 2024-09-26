---
title: Tags in Microsoft Fabric
description: "Learn about tags in Microsoft Fabric."
author: paulinbar
ms.author: painbar
ms.service: fabric
ms.subservice: governance
ms.topic: conceptual #Don't change
ms.date: 08/06/2024

#customer intent: As a Fabric admin, domain admin, data creator, or data consumer, I want to learn about tags in Microsoft Fabric.

---

# Tags in Microsoft Fabric

Tags is a Microsoft Fabric feature that gives organizations the ability to apply additional metadata to items in Fabric to help admins govern data and to enhance data discoverability. Tags are simply labels, such as XXX or XXX, that admins can define according to their organization’s needs. Data and content owners can then apply these tags to their Fabric items, admins can use the tags applied to items to help monitor and manage their organization's data, and users in the organization can use the tags to help them find the data and content they need.

## How tags work

1. Admins [create an open list of tags](./tags-define.md) for use across the organization. For example "Financial", "North America", or "Q1 2025".

1. Data owners, who best know how to categorize their own data, [apply tags to items](./tags-apply.md).

1. Once tags are applied, any user in the org can use them to filter or search for the most relevant content.

## How do tags complement domains

Like [domains](./domains.md), tags are an important component of Fabric's data mesh architecture. They complement [domains](./domains.md) by providing additional flexibility and granularity:

* Tags are applied at the item level, and hence can be leveraged across workspaces and domains.
* An item can have multiple tags, whereas it can only belong to one domain.

## What benefits do tags provide

* **Data governance**: By monitoring and analyzing tag use and distribution, admins can use tags to help them manage and govern their organizations data.

* **Data discoverability**: Users can see tags in the UI and use filters to help them find the content they're looking for.

## Discoverability

Once the item has tags applied, an icon will be shown next to the item name.

:::image type="content" source="{source}" alt-text="{alt-text}":::

You can filter by tags in the workspace list and in OneLake data hub.

:::image type="content" source="{source}" alt-text="{alt-text}":::

In addition, you can see the applied tags in an item's details, in the item's flyout card, and in lineage view.

You can also search by tags and see all the relevant results, accompanied by additional metadata (item owner and item location).

## Considerations and limitations

10000 tags per tenant.
10 tags per item

## Related content

- [Create and manage a set of tags](tags-define.md)
- [Apply tags](tags-apply.md)
- [Monitor tag use](tags-monitor.md)