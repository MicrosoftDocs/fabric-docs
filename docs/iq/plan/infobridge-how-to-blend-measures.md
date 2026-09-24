---
title: Blend Measures Using Infobridge
description: Combine measures from planning sheets and Infobridge queries to create calculations across connected planning data.
ms.topic: how-to
ms.date: 08/21/2026
---

# Blend measures by using Infobridge

Blend measures to combine measures maintained in different planning sheets or available from Infobridge queries. You can use a measure from another planning sheet directly or use an Infobridge query to make a measure available to another planning sheet.

A blend measure can combine values from multiple sources while keeping each source measure connected to its planning data.

## Prerequisites

Before you begin, ensure you have:

- A Unit Price planning sheet with a `Forecast UnitPrice` measure.
- A Sales Plan planning sheet with a `Forecast Quantity` measure.
- A COGS Plan planning sheet with a `Forecast UnitCost` measure.
- Common dimensions that allow the measures to be evaluated at the required planning level, such as Account, ProductCategory, ProductID, ProductName, and Date.

> [!NOTE]
> You can blend measures from one planning sheet with measures from another planning sheet when both sheets have the same dimensions. The common dimensions allow the measures to be evaluated at the same planning level.

## Create the source measures

Create or verify the measures that you want to use in the blend calculation.

1. Go to the **Unit Price** planning sheet and verify that the `Forecast UnitPrice` measure is available.

    :::image type="content" source="media/infobridge-how-to-blend-measures/unit-price-forecast-unitprice.png" alt-text="Screenshot of the Unit Price planning sheet with the Forecast UnitPrice measure." lightbox="media/infobridge-how-to-blend-measures/unit-price-forecast-unitprice.png":::

2. Go to the **Sales Plan** planning sheet and verify that the `Forecast Quantity` measure contains the values that you want to use.

    :::image type="content" source="media/infobridge-how-to-blend-measures/sales-plan-forecast-quantity.png" alt-text="Screenshot of the Sales Plan planning sheet with forecast quantity values." lightbox="media/infobridge-how-to-blend-measures/sales-plan-forecast-quantity.png":::

## Add a measure from another planning sheet

Use **From Sheets** to add a measure that's maintained in another planning sheet.

1. In the **Sales Plan** sheet, in the **Data** pane, expand **From Sheets**.
2. Expand **Unit Price**, and add `Forecast UnitPrice` to **Values**.

The measure is available in the **Sales Plan** sheet and you can use it with the existing measures.

:::image type="content" source="media/infobridge-how-to-blend-measures/sales-plan-forecast-unitprice-from-sheet.png" alt-text="Screenshot of the Sales Plan planning sheet with Forecast UnitPrice added from the Unit Price sheet to Values." lightbox="media/infobridge-how-to-blend-measures/sales-plan-forecast-unitprice-from-sheet.png":::

## Create a query for a measure

Use **Queries** to add a measure from an Infobridge query to another planning sheet. You can use the query to prepare and transform the data before using the measure in a planning sheet.

To create a query that contains `Forecast Quantity`:

1. In the **Infobridge** ribbon, select **Create Query**.
2. In **Create Query**, select `Forecast Quantity`.
3. Select **Create**.

    :::image type="content" source="media/infobridge-how-to-blend-measures/create-query-forecast-quantity.png" alt-text="Screenshot of the Create Query pane with Forecast Quantity selected." lightbox="media/infobridge-how-to-blend-measures/create-query-forecast-quantity.png":::

    When you create the query, Infobridge opens so you can join, append, merge, pivot, and transform the data.

    :::image type="content" source="media/infobridge-how-to-blend-measures/sales-plan-infobridge-bridge.png" alt-text="Screenshot of the Infobridge bridge created from the Sales Plan sheet." lightbox="media/infobridge-how-to-blend-measures/sales-plan-infobridge-bridge.png":::

4. Review the query results to verify that the required dimensions and `Forecast Quantity` are available.
5. Select **Close** to return to the planning sheet.

## Add the query measure to a planning sheet

Use the query measure in the COGS Plan sheet.

1. Go to the **COGS Plan** planning sheet and verify that `UnitCost` and `Forecast UnitCost` are available.

    :::image type="content" source="media/infobridge-how-to-blend-measures/cogs-plan-unitcost-forecast-unitcost.png" alt-text="Screenshot of the COGS Plan planning sheet with UnitCost and Forecast UnitCost measures." lightbox="media/infobridge-how-to-blend-measures/cogs-plan-unitcost-forecast-unitcost.png":::

2. In the **Data** pane, expand **Queries**.
3. Expand **Query 1 - Sales Plan**.
4. Add `Forecast Quantity` to **Values**.

    The COGS Plan sheet now has Forecast Quantity from the Infobridge query and Forecast UnitCost from the COGS Plan sheet.

    :::image type="content" source="media/infobridge-how-to-blend-measures/cogs-plan-forecast-quantity-from-query.png" alt-text="Screenshot of the COGS Plan planning sheet with Forecast Quantity added from the Sales Plan query." lightbox="media/infobridge-how-to-blend-measures/cogs-plan-forecast-quantity-from-query.png":::

## Create a blend measure

Create a visual measure that combines forecast quantity with forecast unit cost.

1. In the **Planning** ribbon, select **Formula**.
2. In **Title**, enter `Forecast COGS`.
3. For **Insert as**, select **Visual Measure**.
4. For **Data type**, select **Number**.
5. In **Formula**, enter:

   ```text
   [Sum of Forecast Quantity]*[Forecast UnitCost]
   ```

6. For **Column aggregation type**, select **Sum**.
7. For **Row aggregation type**, select **Formula**.
8. Select **Create**.

    :::image type="content" source="media/infobridge-how-to-blend-measures/create-forecast-cogs-measure.png" alt-text="Screenshot of the Formula Measure pane configured to create the Forecast COGS measure." lightbox="media/infobridge-how-to-blend-measures/create-forecast-cogs-measure.png":::

    The `Forecast COGS` measure combines `Forecast Quantity` from the Infobridge query with `Forecast UnitCost` maintained in the COGS Plan sheet.

    :::image type="content" source="media/infobridge-how-to-blend-measures/cogs-plan-forecast-cogs-measure.png" alt-text="Screenshot of the COGS Plan planning sheet displaying the Forecast COGS measure." lightbox="media/infobridge-how-to-blend-measures/cogs-plan-forecast-cogs-measure.png":::

Use this approach when a calculation depends on measures maintained in different planning processes. The source measures remain connected to their respective planning data, and the blend measure uses those values in the calculation.
