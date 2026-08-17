---
title: Consolidate data between sheets
description: Learn how to combine rows from multiple planning sheets into a single planning sheet by using an appended query in Infobridge.
ms.topic: how-to
ms.date: 08/14/2026
---

# Consolidate data between sheets

Use Infobridge to consolidate plans, budgets, and forecasts from multiple planning sheets into a single, unified plan. For example, you can combine regional sales plans into a consolidated sales plan.

In this article, you learn how to combine rows from multiple planning sheets by using **Append Query**.

## Combine rows in a bridge

Consider a scenario where you want to consolidate regional sales plans.

1. Create a bridge and add the individual regional plans.

   :::image type="content" source="media/infobridge-how-to-consolidate-data-between-sheets/create-bridge.png" alt-text="Screenshot of a bridge with Central Sales, East Sales, South Sales, and West Sales queries." lightbox="media/infobridge-how-to-consolidate-data-between-sheets/create-bridge.png":::

2. On the **Home** ribbon, select **Append Query**. Then select the queries you want to combine.

   :::image type="content" source="media/infobridge-how-to-consolidate-data-between-sheets/append-query.png" alt-text="Screenshot of the Append Query menu with Central Sales, East Sales, and South Sales selected." lightbox="media/infobridge-how-to-consolidate-data-between-sheets/append-query.png":::

   A new query is created after the rows from the selected queries are combined.

   :::image type="content" source="media/infobridge-how-to-consolidate-data-between-sheets/appended-query.png" alt-text="Screenshot showing the new appended query in the Queries list." lightbox="media/infobridge-how-to-consolidate-data-between-sheets/appended-query.png":::
   
## Map the appended query to a planning sheet

1. Create a new planning sheet. In the **Data** pane, under **Queries**, expand the appended query and select the row dimensions you want to use.

   For example, select **Region**, **Category**, and **Sub-Category** to add them to **Rows**.

   :::image type="content" source="media/infobridge-how-to-consolidate-data-between-sheets/map-row-dimensions.png" alt-text="Screenshot of a planning sheet with Region, Category, and Sub-Category mapped to Rows from the appended query." lightbox="media/infobridge-how-to-consolidate-data-between-sheets/map-row-dimensions.png":::
