---
title: Add Columns in Infobridge
description: Learn how to create measures, dimensions, split columns, and conditional columns in Infobridge.
ms.date: 06/17/2026
ms.topic: how-to
#customer intent: As a user, I want to create calculated measures, dimensions, and conditional columns to enrich data in Infobridge without modifying the source report.
---

# Add columns in Infobridge

Use transformation commands on the **Transform** ribbon to create calculated measures, dimensions, split columns, and conditional columns. These transformations enrich bridge data without modifying the source report and cascade to downstream reports.

[!INCLUDE [Fabric feature-preview-note](../../../includes/feature-preview-note.md)]

## Open transformation commands

After creating a bridge, open the **Transform** tab to access data transformation options.

The Transform ribbon provides these commands:

- Add Measure
- Add Dimension
- Split Column
- Conditional Column

:::image type="content" source="../media/infobridge-transformations/infobridge-how-to-add-column/add-column-interface.png" alt-text="Screenshot showing the Add Measure, Add Dimension, Split Column, and Conditional Column commands in the Transform ribbon." lightbox="../media/infobridge-transformations/infobridge-how-to-add-column/add-column-interface.png":::

## Add a measure

Use **Add Measure** to create calculated measures with expressions and built-in functions.

The following example creates a measure named **Gross Profit Margin (%)** that calculates profit as a percentage of sales.

1. On the **Transform** ribbon, select **Add Measure**.
1. Enter **Gross Profit Margin (%)** as the measure name.
1. Select **Formula**.
1. Enter the following expression:

    ```text
    ("Sum of Profit" / "Sum of Sales") * 100
    ```

1. Select **Apply**.

:::image type="content" source="../media/infobridge-transformations/infobridge-how-to-add-column/add-measure-configuration.png" alt-text="Screenshot showing the Add Measure dialog with a Gross Profit Margin percentage calculation." lightbox="../media/infobridge-transformations/infobridge-how-to-add-column/add-measure-configuration.png":::

The new measure appears in the bridge and is available for reporting and other transformations.

:::image type="content" source="../media/infobridge-transformations/infobridge-how-to-add-column/add-measure-results.png" alt-text="Screenshot showing the Gross Profit Margin percentage measure added to the bridge." lightbox="../media/infobridge-transformations/infobridge-how-to-add-column/add-measure-results.png":::

## Add a dimension

Use **Add Dimension** to create new dimensions with expressions and conditional logic.

The following example creates a **Profit Rating** dimension that categorizes records based on profit values.

1. On the **Transform** ribbon, select **Add Dimension**.
1. Enter **Profit Rating** as the dimension name.
1. Create a CASE expression that evaluates profit ranges and returns a category.
1. Select **Apply**.

Example logic:

```sql
CASE
WHEN "Sum of Profit" < 1000 THEN 'Decommission'
WHEN "Sum of Profit" > 1000 AND "Sum of Profit" < 5000 THEN 'Break even'
WHEN "Sum of Profit" > 5000 AND "Sum of Profit" < 10000 THEN 'Average Sales'
WHEN "Sum of Profit" > 10000 THEN 'Target achieved'
ELSE 'N/A'
END
```

:::image type="content" source="../media/infobridge-transformations/infobridge-how-to-add-column/add-dimension-configuration.png" alt-text="Screenshot showing the Add Dimension dialog used to create a Profit Rating dimension." lightbox="../media/infobridge-transformations/infobridge-how-to-add-column/add-dimension-configuration.png":::

The new dimension appears in the bridge.

:::image type="content" source="../media/infobridge-transformations/infobridge-how-to-add-column/add-dimension-results.png" alt-text="Screenshot showing the Profit Rating dimension added to the bridge." lightbox="../media/infobridge-transformations/infobridge-how-to-add-column/add-dimension-results.png":::

## Split a column

Use **Split Column** to divide a dimension into multiple dimensions with a delimiter or character position.

The following example splits the comma-separated values in the **Market & Geography** column into separate columns.

1. On the **Transform** ribbon, select **Split Column**.
1. Select **Market & Geography** as the target column.
1. Select **By delimiter** as the split type.
1. Enter a comma (`,`) as the delimiter.
1. Select **Apply**.

:::image type="content" source="../media/infobridge-transformations/infobridge-how-to-add-column/split-column-configuration.png" alt-text="Screenshot showing the Split Column dialog configured to split the Market and Geography column by a comma delimiter." lightbox="../media/infobridge-transformations/infobridge-how-to-add-column/split-column-configuration.png":::

The transformation creates separate columns for each value segment.

:::image type="content" source="../media/infobridge-transformations/infobridge-how-to-add-column/split-column-results.png" alt-text="Screenshot showing Market and Geography values split into separate columns." lightbox="../media/infobridge-transformations/infobridge-how-to-add-column/split-column-results.png":::

## Add a conditional column

Use **Conditional Column** to create values based on business rules and conditions.

For example, a conditional column can categorize records into risk levels, regions, business segments, or other classifications.

### Example: Categorize debt-to-equity ratios

The following example categorizes debt-to-equity ratios into risk levels.

| Debt-to-Equity Ratio | Risk Level |
|---|---|
| 2.5 | Moderate Risk |
| 1.8 | Low Risk |
| 3.0 | High Risk |

### Example: Assign tax and shipping rates

The following example assigns tax rates and shipping rates based on region.

| Region | Tax Rate | Shipping Rate ($) |
|---|---|---|
| North America | 20% | 50 |
| Europe | 15% | 70 |
| Asia | 12% | 60 |
| Africa | 8% | 40 |

### Create a conditional column

Use conditional logic to create a **Global Market** column based on country values.

| Country | Global Market |
|---|---|
| Canada | NAMER |
| France | EMEA |
| Germany | EMEA |
| Mexico | LATAM |
| United States of America | DOMESTIC |

1. On the **Transform** ribbon, select **Conditional Column**.
1. Enter **Global Market** as the column name.
1. Configure the required conditions and output values.
1. Optionally define a default value in the **Else** section.
1. Select **Apply**.

:::image type="content" source="../media/infobridge-transformations/infobridge-how-to-add-column/conditional-column-configuration.png" alt-text="Screenshot showing a Global Market conditional column configured using country-based rules." lightbox="../media/infobridge-transformations/infobridge-how-to-add-column/conditional-column-configuration.png":::

The new conditional column appears in the bridge.

:::image type="content" source="../media/infobridge-transformations/infobridge-how-to-add-column/conditional-column-results.png" alt-text="Screenshot showing the Global Market column added to the bridge after applying conditional logic." lightbox="../media/infobridge-transformations/infobridge-how-to-add-column/conditional-column-results.png":::
