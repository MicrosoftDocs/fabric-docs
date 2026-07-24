---
title: Sort Data in Infobridge
description: Learn how to sort data in a query in Infobridge to control the order of dimensions and measures for analysis and reporting.
ms.date: 06/24/2026
ms.topic: how-to
#customer intent: As a user, I want to sort data in a query so that dimensions and measures appear in the order required for analysis and reporting.
---

# Sort data in Infobridge

Use the **Sort** transformation to arrange dimensions and measures in ascending or descending order.

Sorting data helps improve readability and ensures that query results appear in the order required for analysis and reporting.

[!INCLUDE [Fabric feature-preview-note](../../../includes/feature-preview-note.md)]

## Sort data

The following example sorts the **Market & Geography** column in ascending order.

1. On the **Transform** tab, select **Sort Ascending** in the **Sort** group.

    :::image type="content" source="../media/infobridge-transformations/infobridge-how-to-sort/sort-data-source.png" alt-text="Screenshot of query results before sorting. The Market & Geography column contains unsorted values." lightbox="../media/infobridge-transformations/infobridge-how-to-sort/sort-data-source.png":::

    The **Sort By Ascending** dialog opens.

1. In **Column Name**, select **Market & Geography**.
1. In **Order**, select **Ascending**.
1. Select **Apply**.

    :::image type="content" source="../media/infobridge-transformations/infobridge-how-to-sort/sort-data-configuration.png" alt-text="Screenshot of the Sort By Ascending dialog configured to sort the Market & Geography column in ascending order." lightbox="../media/infobridge-transformations/infobridge-how-to-sort/sort-data-configuration.png":::

After you apply the sort, the column appears in the order you specified.

In this example, the **Market & Geography** column appears in ascending order.

:::image type="content" source="../media/infobridge-transformations/infobridge-how-to-sort/sort-data-results.png" alt-text="Screenshot of query results showing the Market & Geography column in ascending order." lightbox="../media/infobridge-transformations/infobridge-how-to-sort/sort-data-results.png":::

The applied sort appears in **Performed Steps** and applies to subsequent transformations, calculations, and reporting scenarios.

## Sort data from the column menu

You can also sort data directly from a column menu without opening the **Sort** dialog.

1. Open the menu for the column to sort.
1. Select **Sort ascending** or **Sort descending**.

    :::image type="content" source="../media/infobridge-transformations/infobridge-how-to-sort/sort-data-column-menu.png" alt-text="Screenshot of the column menu showing the Sort ascending and Sort descending options." lightbox="../media/infobridge-transformations/infobridge-how-to-sort/sort-data-column-menu.png":::

The column sorts immediately based on your selection.
