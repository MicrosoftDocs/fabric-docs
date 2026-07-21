---
title: Use the Round transformation in Infobridge
description: Learn how to use the Round transformation in Infobridge to round numeric measures with the Round, Round Up, and Round Down transformations.
ms.date: 07/03/2026
ms.topic: how-to
#customer intent: As a user, I want to round numeric values using different rounding methods so that my reports are easier to read and follow reporting standards.
---

# Use the Round transformation in Infobridge

Use the **Round** transformation to simplify numeric values by reducing the number of decimal places displayed in a measure. This transformation improves report readability while preserving the underlying data for analysis.

The **Round** transformation provides three rounding methods:

- **Round** rounds values to the nearest value based on the specified precision.
- **Round Up** rounds values by using the **Round Up** method.
- **Round Down** rounds values by using the **Round Down** method.

You can find the **Round** transformation on the **Transform** tab.

[!INCLUDE [Fabric feature-preview-note](../../../includes/feature-preview-note.md)]

## Round numeric measures

The following example demonstrates how to apply a rounding transformation to the **Actuals - ZAVA** measure.

- On the **Transform** tab, select **Rounding**.

    :::image type="content" source="../media/infobridge-transformations/infobridge-how-to-round/infobridge-query-created.png" alt-text="Screenshot highlighting the Rounding command on the Transform tab." lightbox="../media/infobridge-transformations/infobridge-how-to-round/infobridge-query-created.png":::

The following image shows the **Rounding** dialog, including the **Round**, **Round Up**, and **Round Down** methods.

:::image type="content" source="../media/infobridge-transformations/infobridge-how-to-round/rounding-options.png" alt-text="Screenshot showing the Rounding dialog with the Round, Round Up, and Round Down options." lightbox="../media/infobridge-transformations/infobridge-how-to-round/rounding-options.png":::

The following sections demonstrate each rounding method by applying it to the **Actuals - ZAVA** measure.

:::image type="content" source="../media/infobridge-transformations/infobridge-how-to-round/actuals-measure-before-rounding.png" alt-text="Screenshot showing the Actuals - ZAVA measure before applying a rounding transformation." lightbox="../media/infobridge-transformations/infobridge-how-to-round/actuals-measure-before-rounding.png":::

## Apply the Round transformation

Use the **Round** option to round values to the nearest value based on the specified precision.

1. On the **Transform** tab, select **Rounding**.
1. In the **Rounding** dialog:
   1. Select **Actuals - ZAVA** as the **Measure**.
   1. Select **Round** as the **Type**.
   1. Specify the required value for **Number of Characters**.
1. Select **Apply**.

    :::image type="content" source="../media/infobridge-transformations/infobridge-how-to-round/round-dialog.png" alt-text="Screenshot showing the Rounding dialog configured to apply the Round transformation to the Actuals - ZAVA measure." lightbox="../media/infobridge-transformations/infobridge-how-to-round/round-dialog.png":::

The selected measure is rounded according to the specified precision.

:::image type="content" source="../media/infobridge-transformations/infobridge-how-to-round/actuals-measure-after-round.png" alt-text="Screenshot showing the Actuals - ZAVA measure after applying the Round transformation." lightbox="../media/infobridge-transformations/infobridge-how-to-round/actuals-measure-after-round.png":::

## Apply the Round Up transformation

**Round Up** rounds values by using the **Round Up** method.

1. On the **Transform** tab, select **Rounding**.
1. In the **Rounding** dialog:
   1. Select **Actuals - ZAVA** as the **Measure**.
   1. Select **Round Up** as the **Type**.
1. Select **Apply**.

:::image type="content" source="../media/infobridge-transformations/infobridge-how-to-round/round-up-dialog.png" alt-text="Screenshot showing the Rounding dialog configured to apply the Round Up transformation." lightbox="../media/infobridge-transformations/infobridge-how-to-round/round-up-dialog.png":::

The selected measure is rounded by using the **Round Up** transformation. All of the values in the **Actuals - ZAVA** column are rounded up to the nearest whole number.

:::image type="content" source="../media/infobridge-transformations/infobridge-how-to-round/actuals-measure-after-round-up.png" alt-text="Screenshot showing the Actuals - ZAVA measure after applying the Round Up transformation." lightbox="../media/infobridge-transformations/infobridge-how-to-round/actuals-measure-after-round-up.png":::

## Apply the Round Down transformation

**Round Down** rounds values by using the **Round Down** method.

1. On the **Transform** tab, select **Rounding**.
1. In the **Rounding** dialog:
   1. Select **Actuals - ZAVA** as the **Measure**.
   1. Select **Round Down** as the **Type**.
1. Select **Apply**.

:::image type="content" source="../media/infobridge-transformations/infobridge-how-to-round/round-down-dialog.png" alt-text="Screenshot showing the Rounding dialog configured to apply the Round Down transformation." lightbox="../media/infobridge-transformations/infobridge-how-to-round/round-down-dialog.png":::

The selected measure is rounded by using the **Round Down** transformation. All of the values in the **Actuals - ZAVA** column are rounded down to the nearest whole number.

:::image type="content" source="../media/infobridge-transformations/infobridge-how-to-round/actuals-measure-after-round-down.png" alt-text="Screenshot showing the Actuals - ZAVA measure after applying the Round Down transformation." lightbox="../media/infobridge-transformations/infobridge-how-to-round/actuals-measure-after-round-down.png":::

After applying a rounding method, you can continue transforming the query or write the results to a destination.
