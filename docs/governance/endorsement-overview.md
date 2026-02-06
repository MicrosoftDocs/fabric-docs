---
title: Endorsement overview
description: Learn how to make quality content easier to find through promotion or certification.
author: msmimart
ms.author: mimart
ms.topic: concept-article
ms.custom:
ms.date: 07/11/2024
---

# Endorsement overview

Endorsement is a Fabric and Power BI feature that makes it easier for users in an organization to find high-quality, trust-worthy content and data. Endorsed items are clearly labeled in the UI with a badge, and in some lists they are given precedence and are listed first.

Items can receive one of three endorsement badges - **Promoted**, **Certified**, or **Master data**:

* **Promoted**: When an item has the **Promoted** badge, it means that the item creators think the item is ready for sharing and reuse. Any Fabric or Power BI item except Power BI dashboards can be promoted. Any user with write permissions on an item can promote it.

    Learn how to [promote items](../fundamentals/endorsement-promote-certify.md#promote-items).

* **Certified**: When an item has the **Certified** badge, it means that an organization-authorized reviewer has certified that the item meets the organization's quality standards, can be regarded as reliable and authoritative, and is ready for use across the organization. Any Fabric or Power BI item except Power BI dashboards can be certified. Any user can request certification for an item, but only users specified by a Fabric administrator can actually certify items.

    Learn how to [certify items](../fundamentals/endorsement-promote-certify.md#certify-items) or [request certification](../fundamentals/../fundamentals/endorsement-promote-certify.md#request-certification-or-master-data-designation).

* **Master data**: When an item has the **Master data** badge, it means the data in the item is a core source of organizational data. The master data designation is often used to indicate that a data item is to be regarded as the authoritative, single source of truth for certain kinds of organizational or business data, such as product codes or customer lists. The master data label can only be applied to items that contain data, such as lakehouses, and semantic models. Only users specified by the Fabric administrator can label data items as master data.

    Learn how to [label data items as master data](../fundamentals/endorsement-promote-certify.md#label-data-items-as-master-data) or [request master data designation](../fundamentals/../fundamentals/endorsement-promote-certify.md#request-certification-or-master-data-designation).

> [!NOTE]
> Certification and master data endorsement are available only if a Fabric administrator has enabled them for your organization. Fabric admins should see [Enable item certification](../admin/endorsement-certification-enable.md) and [Enable master data endorsement](../admin/endorsement-master-data-enable.md).
> 
> Certification enablement can be delegated to domain administrators, making it possible to specify a different set of reviewers for each domain. For more information, see [Enable item certification](../admin/endorsement-certification-enable.md).

## How endorsed items appear in Fabric and Power BI

The following image illustrates how promoted, certified, and master data items are clearly identified when you're searching for an item.

:::image type="content" source="./media/endorsement-overview/endorsement-badges.png" alt-text="Screenshot showing how endorsed items appear in the product." lightbox="./media/endorsement-overview/endorsement-badges.png" border="false":::

## Types of items that can be endorsed

* All Fabric items and Power BI items except Power BI dashboards can be promoted or certified.

* All Fabric and Power BI items that contain data can be labeled as master data.

## Related content

* [Promote or certify Fabric content](../fundamentals/endorsement-promote-certify.md)
* [Enable item certification](../admin/endorsement-certification-enable.md) (Fabric admins)
* [Enable master data endorsement](../admin/endorsement-master-data-enable.md) (Fabric admins)