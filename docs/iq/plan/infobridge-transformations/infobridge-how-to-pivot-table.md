---
title: Pivot Data in a Planning Sheet
description: Learn how to pivot dimensions and measures, configure aggregations, and concatenate text values in a planning sheet.
ms.date: 06/16/2026
ms.topic: how-to
#customer intent: As a user, I want to reorganize dimensions and measures and configure aggregations to analyze data in different layouts.
---

# Pivot data in a planning sheet

Use *Pivot Table* to reorganize dimensions and measures and configure aggregations for totals and subtotals.

:::image type="content" source="../media/infobridge-transformations/infobridge-how-to-pivot-table/pivot-table-interface.png" alt-text="Screenshot of the Pivot Table interface." lightbox="../media/infobridge-transformations/infobridge-how-to-pivot-table/pivot-table-interface.png":::

[!INCLUDE [Fabric feature-preview-note](../../../includes/feature-preview-note.md)]

## Convert row dimensions and column dimensions

Move dimensions between the **Rows** and **Columns** buckets to change how data is displayed.

For example, convert the **Region** column dimension into a row dimension.

:::image type="content" source="../media/infobridge-transformations/infobridge-how-to-pivot-table/region-column-dimension.png" alt-text="Screenshot of the Region dimension in the Columns bucket." lightbox="../media/infobridge-transformations/infobridge-how-to-pivot-table/region-column-dimension.png":::

1. Open **Pivot Table**.
1. Drag **Region** from **Columns** to **Rows**.

The dimension is displayed as a row dimension instead of a column dimension.

:::image type="content" source="../media/infobridge-transformations/infobridge-how-to-pivot-table/column-to-row-conversion.png" alt-text="Screenshot of the Region dimension moved from Columns to Rows." lightbox="../media/infobridge-transformations/infobridge-how-to-pivot-table/column-to-row-conversion.png":::

## Configure measure aggregations

Configure aggregations for numeric measures when totals and subtotals are enabled.

Supported aggregation types include:

- Sum
- Average
- Minimum
- Maximum

:::image type="content" source="../media/infobridge-transformations/infobridge-how-to-pivot-table/aggregation-type.png" alt-text="Screenshot of aggregation type options." lightbox="../media/infobridge-transformations/infobridge-how-to-pivot-table/aggregation-type.png":::

1. Enable totals or subtotals.
1. Select the measure to aggregate.
1. Select an aggregation type.

For example, apply **Sum** to the **Profit** measure and **Average** to the **Sales** measure.

:::image type="content" source="../media/infobridge-transformations/infobridge-how-to-pivot-table/aggregated-measures.png" alt-text="Screenshot of measures with different aggregation types applied." lightbox="../media/infobridge-transformations/infobridge-how-to-pivot-table/aggregated-measures.png":::

## Convert dimensions into measures

Convert a text dimension into a measure by moving it to the **Values** bucket.

1. Open **Pivot Table**.
1. Drag the dimension to **Values**.

:::image type="content" source="../media/infobridge-transformations/infobridge-how-to-pivot-table/convert-dimensions-into-measures.png" alt-text="Screenshot of converting a text dimension into a measure by moving it to the values bucket." lightbox="../media/infobridge-transformations/infobridge-how-to-pivot-table/convert-dimensions-into-measures.png":::

The dimension is converted into a measure and can be aggregated with other values.

## Concatenate text values

Use **Concat** to combine text values from multiple rows into a single value by using a delimiter.

For example, concatenate all accounts within a segment while retaining the underlying information.

:::image type="content" source="../media/infobridge-transformations/infobridge-how-to-pivot-table/concatenating-text-measures.png" alt-text="Screenshot of concatenating text values by using a delimiter." lightbox="../media/infobridge-transformations/infobridge-how-to-pivot-table/concatenating-text-measures.png":::

1. Drag the text field to the **Values** bucket.
1. Select **Concat** as the aggregation type.
1. Specify a delimiter.

The resulting value provides a summarized view of the underlying records and can be used in downstream visuals.

:::image type="content" source="../media/infobridge-transformations/infobridge-how-to-pivot-table/aggregated-text-measure.png" alt-text="Screenshot of concatenated text values displayed in the pivot table." lightbox="../media/infobridge-transformations/infobridge-how-to-pivot-table/aggregated-text-measure.png":::
