---
title: Use Dimension Level in Infobridge
description: Learn how dimension level in a row model changes the measures available to Infobridge queries and how to reset the configuration.
ms.topic: how-to
ms.date: 08/18/2026
---

# Use dimension level in Infobridge

The dimension level is a list of dimensions that are part of the report. When you select a particular dimension from the dimension level list, Infobridge displays it as a measure in a query. In simple terms, any row category you select under the Dimension level list converts to a measure in Infobridge.

Use **Dimension level** in a row model to control which dimension items appear as measures in an Infobridge query. For example, when you select `ProductName` as the dimension level, the ProductName items are available as measures when you create an Infobridge query. The existing measures, such as Units, Unit Price, and Revenue, then appear as rows in the query.

When you change **Dimension level** back to `None`, the existing query no longer has a dimension level to determine which items to use as measures. Edit the query source and select the required measures to restore the query.

## Set a dimension level

1. In the report, go to **Model** and select **Row Model**.

   :::image type="content" source="media/planning-infobridge-dimension-level/select-row-model.png" alt-text="Screenshot of the Model tab with Row Model selected." lightbox="media/planning-infobridge-dimension-level/select-row-model.png":::

1. In the **Model Builder** pop-up, select **Enable**.

   :::image type="content" source="media/planning-infobridge-dimension-level/enable-model-builder.png" alt-text="Screenshot of the Model Builder prompt with Enable selected." lightbox="media/planning-infobridge-dimension-level/enable-model-builder.png":::

1. In the **Row Model** screen, select the dimension you want under the **Dimension Level** list.

   This setting uses the ProductName dimension in an Infobridge query.

   :::image type="content" source="media/planning-infobridge-dimension-level/select-productname-dimension-level.png" alt-text="Screenshot of the Dimension Level menu with ProductName selected." lightbox="media/planning-infobridge-dimension-level/select-productname-dimension-level.png":::

1. Save the report.

1. Go to **Infobridge** and select **Create Query**.

   :::image type="content" source="media/planning-infobridge-dimension-level/create-infobridge-query.png" alt-text="Screenshot of the Infobridge Create Query window showing the available measures." lightbox="media/planning-infobridge-dimension-level/create-infobridge-query.png":::

1. Create the query.

   Since `ProductName` is selected as the dimension level in the row model, the ProductName items are used as measures in the query. The original measures, such as Units, Unit Price, and Revenue, are displayed as rows.

   :::image type="content" source="media/planning-infobridge-dimension-level/dimension-level-query-results.png" alt-text="Screenshot of an Infobridge query showing ProductName items as measures and Units, Unit Price, and Revenue as rows." lightbox="media/planning-infobridge-dimension-level/dimension-level-query-results.png":::

## Reset the dimension level

To reset the report to the original state, follow these steps:

1. In the report, go to **Model** and open **Row Model**.

1. Select **Dimension Level**, and then select `None`.

   :::image type="content" source="media/planning-infobridge-dimension-level/reset-dimension-level.png" alt-text="Screenshot of the Dimension Level menu with None selected." lightbox="media/planning-infobridge-dimension-level/reset-dimension-level.png":::

1. Save the report and return to **Infobridge**.

   When you set the dimension level to `None`, the query no longer has a dimension level to determine which measures to display.

1. In **Manage Queries**, select the pencil icon for the query to edit its source.

   :::image type="content" source="media/planning-infobridge-dimension-level/edit-infobridge-query-source.png" alt-text="Screenshot of Manage Queries with the edit icon for an Infobridge query." lightbox="media/planning-infobridge-dimension-level/edit-infobridge-query-source.png":::

1. In **Manage Source**, select the measures that you want the query to display, such as `Units`, `Unit Price`, and `Revenue`, and then select **Update**.

   :::image type="content" source="media/planning-infobridge-dimension-level/select-query-measures.png" alt-text="Screenshot of Manage Source with Units, Unit Price, and Revenue selected." lightbox="media/planning-infobridge-dimension-level/select-query-measures.png":::

1. Verify the query.

   The query is restored to its previous measure-based layout, with Units, Unit Price, and Revenue available as measures.

   :::image type="content" source="media/planning-infobridge-dimension-level/query-restored.png" alt-text="Screenshot of the Infobridge query restored to its original measure-based layout." lightbox="media/planning-infobridge-dimension-level/query-restored.png":::
