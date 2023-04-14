---
title: Hide elements from downstream reporting
description: Follow steps to hide warehouse elements from downstream reporting in Microsoft Fabric.
author: salilkanade
ms.author: salilkanade
ms.reviewer: wiassaf
ms.date: 04/12/2023
ms.topic: how-to
---

# Hide elements from downstream reporting in Microsoft Fabric

**Applies to:** [!INCLUDE[fabric-se-and-dw](includes/applies-to-version/fabric-se-and-dw.md)]

[!INCLUDE [preview-note](../includes/preview-note.md)]

This article reviews methods to hide elements in your data model from downstream reporting. You may want to do this to simplify the set of items available to end users for reporting.

## Options to hide elements

You can hide elements of your warehouse from downstream reporting by selecting **Data view** and right-clicking on the column or table you want to hide. 

Select **Hide** in **Report view** from the menu that appears to hide the item from downstream reporting.

:::image type="content" source="media\hide-elements-downstream-reporting\hide-report-view-menu.png" alt-text="Screenshot showing where to find the hide option in the context menu." lightbox="media\hide-elements-downstream-reporting\hide-report-view-menu.png":::

You can also hide the entire table and individual columns by using the **Model view** canvas options, as shown in the following image.

:::image type="content" source="media\hide-elements-downstream-reporting\model-view-canvas.png" alt-text="Screenshot showing the model view canvas options." lightbox="media\hide-elements-downstream-reporting\model-view-canvas.png":::

## Next steps

- [Data modeling in the default Power BI dataset](model-default-power-bi-dataset.md)
- [Define relationships in data models](data-modeling-defining-relationships.md)
- [Create reports](create-reports.md)
- [Create reports in the Power BI service](reports-power-bi-service.md)