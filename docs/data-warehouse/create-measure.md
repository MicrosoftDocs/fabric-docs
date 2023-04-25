---
title: Create a measure in Power BI datasets
description: Learn about measures and how to create them in Power BI datasets in Microsoft Fabric.
author: chuckles22
ms.author: chweb
ms.reviewer: wiassaf
ms.date: 05/23/2023
ms.topic: how-to
---

# Create a measure in Power BI datasets in Microsoft Fabric

**Applies to:** [!INCLUDE[fabric-se-and-dw](includes/applies-to-version/fabric-se-and-dw.md)]

[!INCLUDE [preview-note](../includes/preview-note.md)]

A [measure](/power-bi/transform-model/desktop-measures) is a collection of standardized metrics. Similar to Power BI Desktop, the DAX editing experience in warehouse presents a rich editor complete with auto-complete for formulas (IntelliSense). The DAX editor enables you to easily develop measures right in warehouse, making it a more effective single source for business logic, semantics, and business critical calculations.

## How to create a measure

1. To create a measure, select the table in the **Table Explorer** and select the **New Measure** button in the ribbon, as shown in the following image.

    :::image type="content" source="media\create-measure\table-explorer-ribbon.png" alt-text="Screenshot showing the table explorer and where the new measure button appears on the ribbon." lightbox="media\create-measure\table-explorer-ribbon.png":::

1. Enter the measure into the formula bar and specify the table and the column to which it applies. The formula bar lets you enter your measure.

1. You can expand the table to find the measure in the table.

## Next steps

- [Hide elements from downstream reporting](hide-elements-downstream-reporting.md)
- [Data modeling in the default Power BI dataset in Microsoft Fabric](model-default-power-bi-dataset.md)
- [Create reports in the Power BI service in Microsoft Fabric](reports-power-bi-service.md)