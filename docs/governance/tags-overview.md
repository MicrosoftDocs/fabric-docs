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

## How do tags differ from domains

Like [domains](./domains.md), tags are component of Fabric's data mesh architecture. They complement [domains](./domains.md) by providing additional flexibility and granularity:

* Tags are applied per item, whereas domains are applied per workspace.
* Tags allow additional details to be added at the item level, across workspaces and domains.
* An item can have multiple tags, whereas it can only belong to one domain.

Tags are a crucial element for implementing data mesh architecture, allowing additional details to be added at the item level, across workspaces and domains. This assists data consumers in effortlessly discovering the content they require.

## What benefits do tags provide

* By monitoring and analyzing tag use and distribution, admins can use tags to help them manage and govern their organizations data.

* Users can see tags in the UI and use filters to help them find the content they're looking for.

## Use cases

## Requirements

## Considerations and limitations

## Related content

- [Create and manage a set of tags](tags-define.md)
- [Apply tags](tags-apply.md)
- [Monitor tag use](tags-monitor.md)