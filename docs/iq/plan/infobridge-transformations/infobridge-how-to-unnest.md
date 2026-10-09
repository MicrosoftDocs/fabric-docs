---
title: Use the Unnest Transformation in Infobridge
description: Learn how to use the unnest transformation in Infobridge to split delimited text values into separate rows for data preparation and analysis.
ms.date: 07/03/2026
ms.topic: how-to
#customer intent: As a user, I want to split delimited text values into separate rows so that I can prepare my data for analysis and reporting.
---

# Use the unnest transformation in Infobridge

Use the **Unnest** transformation to split delimited text values into separate rows. This transformation is useful when a column contains multiple values separated by a delimiter and you want each value to appear in its own row.

You can find the **Unnest** transformation on the **Transform** tab.

## Flatten delimited values into separate rows

The following example shows order data where the **Order Tags** column contains multiple comma-separated values.

| Order ID | Customer name | Order Tags |
|----------|---------------|------------|
| 1 | Skylar Bennett | Express Delivery, Gift Wrap |
| 2 | Lisa Taylor | Installation Service, Insurance, Extended Warranty |
| 3 | Adrian King | Gift Wrap, Extended Warranty |
| 4 | Eric Solomon | Express Delivery, Installation Service |
| 5 | Nicole Wagner | Insurance, Extended Warranty, Gift Wrap |
| 6 | Oscar Ward | Express Delivery |
| 7 | Victoria Burke | Gift Wrap, Installation Service |
| 8 | Avery Howard | Insurance, Extended Warranty |
| 9 | Anne Patel | Express Delivery, Gift Wrap, Insurance |
| 10 | Liam Davis | Installation Service, Extended Warranty |

After the **Order Tags** column is unnested, each tag appears in a separate row while the remaining column values are duplicated.

| Order ID | Customer name | Order Tags |
|----------|---------------|------------|
| 1 | Skylar Bennett | Express Delivery |
| 1 | Skylar Bennett | Gift Wrap |
| 2 | Lisa Taylor | Installation Service |
| 2 | Lisa Taylor | Insurance |
| 2 | Lisa Taylor | Extended Warranty |
| 3 | Adrian King | Gift Wrap |
| 3 | Adrian King | Extended Warranty |
| 4 | Eric Solomon | Express Delivery |
| 4 | Eric Solomon | Installation Service |
| 5 | Nicole Wagner | Insurance |
| 5 | Nicole Wagner | Extended Warranty |
| 5 | Nicole Wagner | Gift Wrap |
| 6 | Oscar Ward | Express Delivery |
| 7 | Victoria Burke | Gift Wrap |
| 7 | Victoria Burke | Installation Service |
| 8 | Avery Howard | Insurance |
| 8 | Avery Howard | Extended Warranty |
| 9 | Anne Patel | Express Delivery |
| 9 | Anne Patel | Gift Wrap |
| 9 | Anne Patel | Insurance |
| 10 | Liam Davis | Installation Service |
| 10 | Liam Davis | Extended Warranty |

The following example uses the **Order Tags** calculated column, which contains multiple comma-separated values.

:::image type="content" source="../media/infobridge-transformations/infobridge-how-to-unnest/unnest-source-order-tags.png" alt-text="Screenshot of a query showing the Order Tags calculated column before applying the Unnest transformation." lightbox="../media/infobridge-transformations/infobridge-how-to-unnest/unnest-source-order-tags.png":::

After importing the report into Infobridge, apply the **Unnest** transformation.

1. Open the query that contains the **Order Tags** column.

1. On the **Transform** tab, select **Unnest**.

   :::image type="content" source="../media/infobridge-transformations/infobridge-how-to-unnest/unnest-result-order-tags.png" alt-text="Screenshot of the Transform tab highlighting the Unnest transformation." lightbox="../media/infobridge-transformations/infobridge-how-to-unnest/unnest-result-order-tags.png":::

1. In the **Unnest** dialog:
   1. Select **Order Tags** as the **Target column**.
   1. In **Delimiter**, enter a comma (`,`).

:::image type="content" source="../media/infobridge-transformations/infobridge-how-to-unnest/unnest-dialog-order-tags.png" alt-text="Screenshot of the Unnest dialog configured to split the Order Tags column using a comma delimiter." lightbox="../media/infobridge-transformations/infobridge-how-to-unnest/unnest-dialog-order-tags.png":::

1. Select **Apply**.

The **Order Tags** column expands so that each value appears in its own row while the remaining column values are duplicated.

:::image type="content" source="../media/infobridge-transformations/infobridge-how-to-unnest/unnest-output-order-tags.png" alt-text="Screenshot of query results showing the Order Tags values expanded into separate rows after applying the Unnest transformation." lightbox="../media/infobridge-transformations/infobridge-how-to-unnest/unnest-output-order-tags.png":::

You can continue transforming the flattened data or write the results to a destination.
