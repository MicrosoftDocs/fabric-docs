---
title: Apply sensitivity labels to Fabric items
description: Learn how to manually apply sensitivity labels to Fabric items.
author: paulinbar
ms.author: painbar
ms.topic: how-to
ms.custom:
  - build-2023
  - ignite-2023
ms.date: 05/23/2023
---

# Apply sensitivity labels to Fabric items

Sensitivity labels from Microsoft Purview Information Protection on items can guard your sensitive content against unauthorized data access and leakage. They're a key component in helping your organization meet its governance and compliance requirements. Labeling your data correctly with sensitivity labels ensures that only authorized people can access your data. This article shows you how to apply sensitivity labels to your Microsoft Fabric items.

> [!NOTE]
> For information about applying sensitivity labels in Power BI Desktop, see [Apply sensitivity labels in Power BI Desktop](/power-bi/enterprise/service-security-apply-data-sensitivity-labels#apply-sensitivity-labels-in-power-bi-desktop).

## Prerequisites

Requirements needed to apply sensitivity labels to Fabric items:

* Power BI Pro or Premium Per User (PPU) license
* Edit permissions on the item you wish to label.

> [!NOTE]
> If you can't apply a sensitivity label, or if the sensitivity label is greyed out in the sensitivity label menu, you may not have permissions to use the label. Contact your organization's tech support.

## Apply a label

There are two common ways of applying a sensitivity label to an item: from the flyout menu in the item header, and in the item settings.

* From the flyout menu - select the sensitivity indication in the header to display the flyout menu:

    :::image type="content" source="./media/apply-sensitivity-labels/apply-sensitivity-label-flyout.png" alt-text="Screenshot of the sensitivity label flyout for items in Fabric.":::

* In items settings - open the item's settings, find the sensitivity section, and then choose the desired label:

    :::image type="content" source="./media/apply-sensitivity-labels/apply-sensitivity-label-side-pane.png" alt-text="Screenshot of the sensitivity label side pane for items in Fabric.":::

## Related content

* [Sensitivity label overview](/power-bi/enterprise/service-security-sensitivity-label-overview)
