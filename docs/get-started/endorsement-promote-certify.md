---
title: Promote or certify Fabric items
description: Learn how to promote or certify items in Fabric.
author: paulinbar
ms.author: painbar
ms.topic: how-to
ms.custom:
  - build-2023
  - ignite-2023
ms.date: 06/15/2023
---

# Promote or certify items

Fabric provides two ways you can endorse your valuable, high-quality items to increase their visibility: **promotion** and **certification**.

* **Promotion**: Promotion is a way to highlight items you think are valuable and worthwhile for others to use. It encourages the collaborative use and spread of content within an organization.

    Any item owner, as well as anyone with write permissions on the item, can promote the item when they think it's good enough for sharing.

* **Certification**: Certification means that the item meets the organization's quality standards and can be regarded as reliable, authoritative, and ready for use across the organization.

    Only [authorized reviewers (defined by the Fabric administrator)](../admin/endorsement-setup.md) can certify items. Item owners who wish to see their item certified and aren't authorized to certify it themselves need to follow their organization's guidelines about getting items certified.

Currently it's possible to endorse all Fabric items except Power BI dashboards.

This article describes how to [promote items](#promote-items), how to [certify items](#certify-items) if you're an authorized reviewer, and how to [request certification](#request-item-certification) if you're not.

See the [endorsement overview](../governance/endorsement-overview.md) to learn more about endorsement.

## Promote items

To promote an item, you must have write permissions on the item you want to promote.

1. Go to the settings of the content you want to promote.

1. Expand the endorsement section and select **Promoted**.

    If you're promoting a Power BI semantic model and see a **Make discoverable** checkbox, it means you can make it possible for users who don't have access to the semantic model to find it. See [semantic model discovery](/power-bi/collaborate-share/service-discovery) for more detail.

    :::image type="content" source="./media/endorsement-promote-certify/promote-item.png" alt-text="Screenshot of promoting an item.":::

1. Select **Apply**.

## Certify items

Item certification is a significant responsibility, and only authorized users can certify items. Other users can [request item certification](#request-item-certification). This section describes how to certify an item.

1. Get write permissions on the item you want to certify. You can request these permissions from the item owner or from anyone who as an admin role in workspace where the item is located.

1. Carefully review the item and determine whether it meets your organization's certification standards.

1. If you decide to certify the item, go to the workspace where it resides, and open the settings of the item you want to certify.

1. Expand the endorsement section and select **Certified**.

    If you're certifying a Power BI semantic model and see a **Make discoverable** checkbox, it means you can make it possible for users who don't have access to the semantic model to find it. See [semantic model discovery](/power-bi/collaborate-share/service-discovery) for more detail.

    :::image type="content" source="./media/endorsement-promote-certify/certify-item.png" alt-text="Screenshot of certifying an item.":::

1. Select **Apply**.

## Request item certification

If you would like to certify your item but aren't authorized to do so, follow the steps below.

1. Go to the workspace where the item you want to be certified is located, and then open the settings of that item.

1. Expand the endorsement section. The **Certified** button is greyed out since you aren't authorized to certify content. Select the link about how to get your item certified.

    :::image type="content" source="./media/endorsement-promote-certify/request-item-certification.png" alt-text="Screenshot of how to request certification link.":::
    <a name="no-info-redirect"></a>
    >[!NOTE]
    >If you clicked the link above but got redirected back to this note, it means that your Fabric admin has not made any information available. In this case, contact the Fabric admin directly.

## Related content

* [Read more about endorsement](../governance/endorsement-overview.md)
* [Enable content certification](../admin/endorsement-setup.md) (Fabric admins)
* [Read more about semantic model discoverability](/power-bi/collaborate-share/service-discovery)
