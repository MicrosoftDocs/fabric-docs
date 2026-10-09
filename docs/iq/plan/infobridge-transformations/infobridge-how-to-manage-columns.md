---
title: Manage Columns in Infobridge
description: Learn how to rename columns and remove unnecessary columns in Infobridge to improve query readability and focus on the data you need for analysis and reporting.
ms.date: 06/24/2026
ms.topic: how-to
#customer intent: As a user, I want to manage columns in Infobridge by renaming columns and removing unnecessary columns so that my query results are easier to understand and maintain.
---

# Manage columns in Infobridge

Use column management actions to update column names and remove columns you don't need.

Managing columns helps improve query readability, maintain consistent business terminology, and focus analysis on the most relevant data.

## Rename columns

Use the **Rename Column** transformation to replace existing column names with names that better align with your business terminology and reporting requirements.

Renaming columns makes measures and dimensions easier to understand and can improve consistency across reports and planning sheets.

The following example shows how to rename the **Value** column from an [unpivot transformation](infobridge-how-to-pivot-column.md) to **Sales**.

1. On the **Transform** tab, select **Rename Column**.
1. In **Column**, select **Value**.
1. In **New Column Name**, enter **Sales**.
1. Select **Apply**.

:::image type="content" source="../media/infobridge-transformations/infobridge-how-to-manage-columns/rename-column-configuration.png" alt-text="Screenshot of the Rename Column dialog. The Column dropdown shows Value, and the New Column Name box contains Sales." lightbox="../media/infobridge-transformations/infobridge-how-to-manage-columns/rename-column-configuration.png":::

After you apply the transformation, the column displays the updated name.

:::image type="content" source="../media/infobridge-transformations/infobridge-how-to-manage-columns/renamed-sales-column.png" alt-text="Screenshot of query results showing the renamed Sales column after you apply the Rename Column transformation." lightbox="../media/infobridge-transformations/infobridge-how-to-manage-columns/renamed-sales-column.png":::

## Remove columns

Use the **Remove Column** transformation to remove columns that you don't need for analysis or reporting.

Removing unnecessary columns simplifies query results and reduces visual clutter.

The following example removes the **Sum of Sales** column from a query.

1. On the **Transform** tab, select **Remove Column**.
1. In **Column**, select the column to remove.
1. Select **Remove**.

:::image type="content" source="../media/infobridge-transformations/infobridge-how-to-manage-columns/remove-column-configuration.png" alt-text="Screenshot of the Remove Column dialog. The Column list shows Sum of Sales selected." lightbox="../media/infobridge-transformations/infobridge-how-to-manage-columns/remove-column-configuration.png":::

After you remove the column, it no longer appears in the query results.

This example removes the **Sum of Sales** column.

:::image type="content" source="../media/infobridge-transformations/infobridge-how-to-manage-columns/remove-column-results.png" alt-text="Screenshot of query results showing that the Sum of Sales column no longer appears." lightbox="../media/infobridge-transformations/infobridge-how-to-manage-columns/remove-column-results.png":::

Subsequent transformations, calculations, and reporting scenarios don't include the removed column.
