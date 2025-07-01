---
title: Endorse Fabric and Power BI items
description: Learn how to promote or certify Fabric items, or designate them as master data.
author: msmimart
ms.author: mimart
ms.topic: how-to
ms.custom:
ms.date: 07/11/2024
---

# Endorse Fabric and Power BI items

Fabric provides three ways to endorse valuable, high-quality items to increase their visibility: **promotion** and **certification** and designating them as **master data**.

* **Promotion**: Promotion is a way to highlight items you think are valuable and worthwhile for others to use. It encourages the collaborative use and spread of content within an organization.

    Any item owner, as well as anyone with write permissions on the item, can promote the item when they think it's good enough for sharing.

* **Certification**: Certification means that the item meets the organization's quality standards and can be regarded as reliable, authoritative, and ready for use across the organization.

    Only [authorized reviewers (defined by the Fabric administrator)](../admin/endorsement-certification-enable.md) can certify items. Item owners who wish to see their item certified and aren't authorized to certify it themselves need to follow their organization's guidelines about getting items certified.

* **Master data**: Being labeled as master data means that the data item is regarded by the organization as being core, single-source-of-truth data, such as customer lists or product codes.

    Only [authorized reviewers (defined by the Fabric administrator)](../admin/endorsement-master-data-enable.md) can label data items as master data. Item owners who wish to see their item endorsed as master data and aren't authorized to apply the **Master data** badge themselves need to follow their organization's guidelines about getting items labeled as master data.

Currently it's possible to promote or certify all Fabric and Power BI items except Power BI dashboards.

Master data badges can only be applied to items that contain data, such as lakehouses and semantic models.

This article describes:

* How to [promote items](#promote-items).
* How to [certify items](#certify-items) if you're an authorized reviewer, or [request certification](#request-certification-or-master-data-designation) if you're not.
* How to [apply the **Master data** badge to a data item](#label-data-items-as-master-data) if you are authorized to do so, or [request master data designation](#request-certification-or-master-data-designation) if you're not.

See the [endorsement overview](../governance/endorsement-overview.md) to learn more about endorsement.

## Promote items

To promote an item, you must have write permissions on the item you want to promote.

1. Go to the settings of the item you want to promote.

1. Expand the endorsement section and select **Promoted**.

    If you're promoting a Power BI semantic model and see a **Make discoverable** checkbox, it means you can make it possible for users who don't have access to the semantic model to find it. See [semantic model discovery](/power-bi/collaborate-share/service-discovery) for more detail.

1. Select **Apply**.

## Certify items

Item certification is a significant responsibility, and you should only certify an item if you feel qualified to do so and have reviewed the item.

To certify an item:

* You must be [authorized by the Fabric administrator](../admin/endorsement-certification-enable.md).

    > [!NOTE]
    > If you aren't authorized to certify an item yourself, you can [request item certification](#request-certification-or-master-data-designation).

* You must have write permissions on the item you want to apply the **Certified** badge to.

1. Carefully review the item and determine whether it meets your organization's certification standards.

1. If you decide to certify the item, go to the workspace where it resides, and open the settings of the item you want to certify.

1. Expand the endorsement section and select **Certified**.

    If you're certifying a Power BI semantic model and see a **Make discoverable** checkbox, it means you can make it possible for users who don't have access to the semantic model to find it. See [semantic model discovery](/power-bi/collaborate-share/service-discovery) for more detail.

1. Select **Apply**.

## Label data items as master data

Labeling data items as master data is a significant responsibility, and you should perform this task only if you feel you are qualified to do so.

To label a data item as master data:

* You must be [authorized by the Fabric administrator](../admin/endorsement-master-data-enable.md).

    > [!NOTE]
    > If you aren't authorized to designate a data item as master data yourself, you can [request the master data designation](#request-certification-or-master-data-designation).

* You must have write permissions on the item you want to apply the **Master data** badge to.

1. Carefully review the data item and determine whether it is truly core, single-source-of-truth data that your organization wants users to find and use for the kind of data it contains.

1. If you decide to label the item as master data, go to the workspace where it located, and open the settings of the item's settings..

1. Expand the endorsement section and select **Master data**.

1. Select **Apply**.

## Request certification or master data designation

If you would like to certify your item or get it labeled as master data but aren't authorized to do so, follow the steps below.

1. Go to the workspace where the item you want endorsed as certified or master data is located, and then open the settings of that item.

1. Expand the endorsement section. The **Certified** or **Master data** button will be greyed if you're not authorized to endorse items as certified or as master data.

1. Select relevant link, **How do I get content certified** or  **How do I get content endorsed as Master data** to find out how to get your item endorsed the way you want it to be:

    :::image type="content" source="./media/endorsement-promote-certify/request-item-endorsement.png" alt-text="Screenshot of how to request certification link.":::
    <a name="no-info-redirect"></a>

    > [!NOTE]
    > If you clicked one of the links but got redirected back to this note, it means that your Fabric admin has not made any information available. In this case, contact the Fabric admin directly.

## Related content

* [Read more about endorsement](../governance/endorsement-overview.md)
* [Enable item certification](../admin/endorsement-certification-enable.md) (Fabric admins)
* [Enable master data endorsement](../admin/endorsement-master-data-enable.md) (Fabric admins)
* [Read more about semantic model discoverability](/power-bi/collaborate-share/service-discovery)
