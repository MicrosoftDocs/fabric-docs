---
title: Explore data in Real-Time Dashboard tiles
description: Learn how to explore data in Real-Time Intelligence tiles for more insights about the information rendered in the visual.
ms.reviewer: mibar
author: spelluru
ms.author: spelluru
ms.topic: how-to
ms.custom:
ms.date: 11/19/2024
---
# Explore data in Real-Time Dashboard tiles

The explore data feature enables you to delve deeper into the data presented in any Real-Time Dashboard. If the information you're seeking isn't readily available on the dashboard, this feature allows you to extend your exploration beyond the data displayed in the tiles, potentially uncovering new insights.

Even if a dashboard is shared with you and you only have viewer permissions, you can still explore it. The exploration process begins with viewing the data and its corresponding visualization as they appear on the tile. From there, you can further explore the data by adding or removing filters and aggregations, and viewing your results using different visualizations, all without needing any knowledge of the Kusto Query Language.

This exploration can provide additional insights into your data, enhancing your understanding and decision-making capabilities.

## Prerequisites

* A [workspace](../fundamentals/create-workspaces.md) with a Microsoft Fabric-enabled [capacity](../enterprise/licenses.md#capacity)
* A dashboard with visuals. For more information, see [Create a Real-Time Dashboard](dashboard-real-time-create.md)

## Start your data exploration

1. Within your workspace, select a Real-Time Dashboard.

1. On the tile that you'd like to explore, select the **Explore data** icon.

    :::image type="content" source="media/dashboard-explore-data/select-explore-data-icon.png" alt-text="Screenshot of a Real-Time Dashboard tile showing the explore data icon highlighted.":::

## Explore data

When you open the explore data window, you start with the same visualization as shown in the tile.

:::image type="content" source="media/dashboard-explore-data/explore-data-areas.png" alt-text="Screenshot of a Real-Time Dashboard explore data window with the different areas highlighted." lightbox="media/dashboard-explore-data/explore-data-areas.png":::

In the explore data window, you see the following areas:

A. **Filter and aggregations bar**: Shows filters and aggregations from the original query, added filters and aggregations, and the refresh data button.

B. **Visual pane**: Shows the visualization of the query data.

C. **Results pane**: Show the tabular results of the query data and the query in the **Results** and **KQL** tabs respectively.

D. **Columns pane**: Shows the query columns and their metadata, value distributions, and sample values depending on their data type.

You can then explore your data without affecting the visualization shown in the tile in the following ways:

* In the filters bar, you can remove, add, and modify filters and aggregations from the query.

    Filters that came from the original tile query can't be modified and can only be removed in reverse order. You can add your own filters and aggregations, which you can later modify or remove as you explore.

    To add a filter:

    1. Select **+ Add**.

    1. Find and select the column you'd like to filter.

        :::image type="content" source="media/dashboard-explore-data/add-filter-select-column.png" alt-text="Screenshot of the filter dialog box showing how to select a column.":::

    1. Select the filter **Operator** and **Value**, and then select **Apply**. The visual, results, and KQL query update to reflect the new filter.

        :::image type="content" source="media/dashboard-explore-data/add-filter-select-operator-and-value.png" alt-text="Screenshot of the filter dialog box showing how to select an operator and a value.":::

    To add an aggregation:

    1. Select **+ Add** > **Aggregation**.

        :::image type="content" source="media/dashboard-explore-data/add-aggregation-select-type.png" alt-text="Screenshot of the aggregation dialog box showing how to select an aggregation type.":::

    1. Select the filter **Operator** and **Display Name**, optionally add up to two columns to group by, and then select **Apply**. The visual, results, and KQL query update to reflect the new filter.

        :::image type="content" source="media/dashboard-explore-data/add-aggregation-select-options.png" alt-text="Screenshot of the aggregation dialog box showing how to select aggregation options.":::

* From the **Visual type** dropdown, select other visual types to visualize your data in different ways.

    :::image type="content" source="media/dashboard-explore-data/select-visual-type.png" alt-text="Screenshot of the visual pane, showing the dropdown selector options.":::

* Select the **Results** and **KQL** tabs to view the tabular query results and the underlying query respectively. As you explore, you see the changes you make updated in these tabs.

    :::image type="content" source="media/dashboard-explore-data/query-pane.png" alt-text="Schreenshot of the query pane, showing the query for the visual.":::

* In the **Columns** pane, you can browse the table schema by looking at the columns or finding a particular column. You can also choose columns to see their top values, value distributions, and sample values depending on their data type, as follows:

    :::image type="content" source="media/dashboard-explore-data/columns-pane.png" alt-text="Screenshot of the Columns pane, showing the columns with their metadata.":::

    <!-- // **QUESTION: @MICHAL, @GABI -- TOOK A GUESS HERE THAT IT'S LIKE DATA PROFILE, PLEASE CONFIRM**

    |Type|Statistic|On selection|
    |--|--|--|
    |string|Count of unique values| Top 10 values|
    |numeric|Minimum and maximum values| Top 10 values|
    |datetime|Date range| Top 10 values|
    |dynamic|No specific statistic|Random sampled value|
    |bool|No specific statistic|Count of true and false| -->

## Related content

* [Create a Real-Time Dashboard](dashboard-real-time-create.md)
* [Customize Real-Time Dashboard visuals](dashboard-visuals-customize.md)
* [Apply conditional formatting in Real-Time Dashboard visuals](dashboard-conditional-formatting.md)
* [Use parameters in Real-Time Dashboards](dashboard-parameters.md)
* [Real-Time Dashboard-specific visuals](dashboard-visuals.md)
