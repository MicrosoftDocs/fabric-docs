---
title: Explore, Organize and Summarize Data in PowerTable Sheet
description: Learn how to search and sort records, reorder, show or hide, and pin columns, and use column insights and column profiles to organize, analyze, and clean up data in PowerTable.
ms.date: 07/15/2026
ms.topic: how-to
#customer intent: As a PowerTable user, I want to search, sort, organize, and analyze data in PowerTable so that I can quickly find information and work with my data more efficiently.
---

# Explore, organize, and summarize data in PowerTable

PowerTable provides several options to help you search, organize, analyze, and clean up data in a table.

This article explains how to organize and analyze data in PowerTable. You learn how to search and sort records, reorder, show or hide, and pin columns, view column insights and column profiles, and clean up data.

## Search records

Use the **Search** box to quickly locate records by entering text, numbers, or phrases.

To search for records:

1. Select the **Search** box on the toolbar.

   :::image type="content" source="media/powertable-how-to-explore-organize-data/search-box.png" alt-text="Screenshot of the search box on the toolbar." lightbox="media/powertable-how-to-explore-organize-data/search-box.png":::

1. Enter the text, number, or phrase that you want to find.

PowerTable sheet filters the table and shows matching records as you type. It returns search results across all pages of the table.

:::image type="content" source="media/powertable-how-to-explore-organize-data/search-results.png" alt-text="Screenshot of the table with search results." lightbox="media/powertable-how-to-explore-organize-data/search-results.png":::

## Sort records

PowerTable provides standard sorting options to organize records in ascending or descending order based on the values in a selected column. You can sort numeric and non-numeric columns, including numbers, text, dates, and single-select fields.

To sort records:

1. Hover over the required column header and select the three-dot menu.

   :::image type="content" source="media/powertable-how-to-explore-organize-data/three-dot-menu.png" alt-text="Screenshot of the three dot menu in the column header.":::

1. Select **Sort Ascending** or **Sort Descending**.

   :::image type="content" source="media/powertable-how-to-explore-organize-data/sort-asc-des.png" alt-text="Screenshot of the sort options." lightbox="media/powertable-how-to-explore-organize-data/sort-asc-des.png":::

The following example shows the *ProductSKU* column sorted in ascending order.

:::image type="content" source="media/powertable-how-to-explore-organize-data/sorted-column.png" alt-text="Screenshot of the table with a column sorted in ascending order." lightbox="media/powertable-how-to-explore-organize-data/sorted-column.png":::

To remove sorting, select **Remove Sort** from the same menu.

:::image type="content" source="media/powertable-how-to-explore-organize-data/remove-sort.png" alt-text="Screenshot of the Remove Sort option." :::

## Reorder columns

Reorder columns to customize the table layout.

To move a column, drag the column header and drop it where you want.

In the following example, the *ProductSKU* column appears next to the *ProductName* column.

:::image type="content" source="media/powertable-how-to-explore-organize-data/reorder-columns.png" alt-text="Screenshot of reordering the columns." lightbox="media/powertable-how-to-explore-organize-data/reorder-columns.png":::

## Show or hide columns

Hide columns that you don't need for your view and show them again when needed.  

To hide a column:

1. Hover over the column header.
1. Select the three-dot menu and then select **Hide**.

   :::image type="content" source="media/powertable-how-to-explore-organize-data/hide.png" alt-text="Screenshot of the Hide option." :::

The table view no longer shows the *ProductDescription* column.

:::image type="content" source="media/powertable-how-to-explore-organize-data/hidden-column.png" alt-text="Screenshot of the table after hiding a column." lightbox="media/powertable-how-to-explore-organize-data/hidden-column.png":::

To show all hidden columns, select **Show All Columns** from the menu on any column header.

:::image type="content" source="media/powertable-how-to-explore-organize-data/show-all-columns.png" alt-text="Screenshot of the Show All Columns option.":::

## Pin columns

Pinning keeps important columns visible on the left while you scroll horizontally through the table.

To pin a column:

1. Hover over the column header.
1. Select the three-dot menu, and then select **Pin**.

   :::image type="content" source="media/powertable-how-to-explore-organize-data/pin.png" alt-text="Screenshot of the Pin option." :::

The pinned *ProductName* column moves to the left side of the table and stays visible during horizontal scrolling.

:::image type="content" source="media/powertable-how-to-explore-organize-data/pinned-column.png" alt-text="Screenshot of the table with a pinned column." lightbox="media/powertable-how-to-explore-organize-data/pinned-column.png":::

Pin multiple columns if needed.

To remove a pinned column, select **Unpin** from the same menu. To remove all pinned columns, select **Unpin All**.

:::image type="content" source="media/powertable-how-to-explore-organize-data/un-pin.png" alt-text="Screenshot of the Un-pin and Un-pin All options." lightbox="media/powertable-how-to-explore-organize-data/un-pin.png":::

## View column insights

Use **Insights** to view summary statistics and key information about a column. Column insights help you understand data distribution, completeness, and trends without creating extra calculations.

To view column insights:

1. Hover over the column header.
1. Select the three-dot menu, and then select **Insights**.

   :::image type="content" source="media/powertable-how-to-explore-organize-data/insights.png" alt-text="Screenshot of the available options in Insights." lightbox="media/powertable-how-to-explore-organize-data/insights.png":::

Depending on the column data type, you see the following insights:

* Sum
* Average
* Median
* Minimum value
* Maximum value
* Range
* Standard deviation
* Number and percentage of empty values
* Number and percentage of populated values
* Number and percentage of unique values
* Earliest date
* Latest date
* Date range

Use these insights to identify patterns, validate data quality, and make informed decisions. The following example shows column insights for a few columns.

:::image type="content" source="media/powertable-how-to-explore-organize-data/enabled-insights.png" alt-text="Screenshot of the table with insights enabled for few columns." lightbox="media/powertable-how-to-explore-organize-data/enabled-insights.png":::

To view all available insights for the selected column, select **Show All** in the **Insights** dropdown.

:::image type="content" source="media/powertable-how-to-explore-organize-data/all-insights.png" alt-text="Screenshot of the Insights window after selecting Show All." lightbox="media/powertable-how-to-explore-organize-data/all-insights.png":::

The toolbar also provides the **Sort**, **Hide**, **Pin**, and **Insights** options after you select a column.

:::image type="content" source="media/powertable-how-to-explore-organize-data/toolbar-options.png" alt-text="Screenshot of the sort, hide, pin and insights options on the toolbar." lightbox="media/powertable-how-to-explore-organize-data/toolbar-options.png":::

## View column profile

The **Column Profile** option provides a quick summary of the data in each column. It shows the number of **Filled**, **Empty**, **Unique**, and **Distinct** values, so you can assess data completeness and identify potential data quality issues.

To view the column profile:

1. Select **Format** > **Column Profile** on the toolbar.

    :::image type="content" source="media/powertable-how-to-explore-organize-data/column-profile.png" alt-text="Screenshot of PowerTable Format tab with Column Profile option highlighted on the toolbar.":::

1. PowerTable shows a profile row below the column headers. The profile includes:

   * **Filled** and **Empty** values, as both a count and a percentage.
   * **Unique** and **Distinct** values, as counts.

    :::image type="content" source="media/powertable-how-to-explore-organize-data/display-column-profile-row.png" alt-text="Screenshot of PowerTable sheet showing the column profile row with Filled, Empty, Unique, and Distinct value counts below column headers." lightbox="media/powertable-how-to-explore-organize-data/display-column-profile-row.png":::

1. To hide the column profile and return to the default view, select **Column Profile** again.

## Clean up data

The **Data Cleanup** option improves data quality by removing duplicate and empty values from a selected column.

To clean up data:

1. Hover over the required column header, and then select the **three-dot** menu.
1. Select **Data Cleanup**.
1. Select one of the following options:

   * **Remove Duplicates**: Removes duplicate values from the selected column.
   * **Remove Empty**: Removes rows that contain empty values in the selected column.

    :::image type="content" source="media/powertable-how-to-explore-organize-data/clean-up-data.jpg" alt-text="Screenshot of column header three-dot menu with Data Cleanup showing Remove Duplicates and Remove Empty options." lightbox="media/powertable-how-to-explore-organize-data/clean-up-data.jpg":::
