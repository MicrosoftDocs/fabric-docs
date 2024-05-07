---
title: Explore data in Real-Time Dashboard tiles (preview)
description: Learn how to explore data in Real-Time Analytics tiles for more insights about the information rendered in the visual.
ms.reviewer: mibar
author: shsagir
ms.author: shsagir
ms.topic: how-to
ms.date: 05/23/2024
---
# Explore data in Real-Time Dashboard tiles (preview)

The explore data feature enables you to delve deeper into the data presented in any Real-Time Dashboard. If the information you're seeking isn't readily available on the dashboard, this feature allows you to extend your exploration beyond the data displayed in the tiles, potentially uncovering new insights.

Even if a dashboard is shared with you and you only have viewer permissions, you can still explore it. The exploration process begins with viewing the data and its corresponding visualization as they appear on the tile. From there, you can further explore the data by adding or removing filters and aggregations, and viewing your results using different visualizations, all without needing any knowledge of the Kusto Query Language.

This exploration can provide additional insights into your data, enhancing your understanding and decision-making capabilities.

## Prerequisites

* A [workspace](../get-started/create-workspaces.md) with a Microsoft Fabric-enabled [capacity](../enterprise/licenses.md#capacity)
* A dashboard with visuals. For more information, see [Create a Real-Time Dashboard](dashboard-real-time-create.md)

## Start your data exploration

1. Within your workspace, select a Real-Time Dashboard.

1. On the tile that you'd like to explore, select the **More menu [...]** > **Explore data**.

    // **TODO: ADD IMAGE OF TILE SHOWING HOW TO OPEN THE EXPLORE DATA WINDOW**

## Explore data

When you open the explore data window, you start with the same visualization as shown in the tile.

// **TODO: ADD IMAGE OF EXPLORE DATA WINDOW SHOWING PIE CHART**

In the explore data window, you see the following areas:

A. **Filters bar**: Shows filters and aggregations from the original query, added filters and aggregations, and the refresh data button.

B. **Chart pane**: Shows the visualization of the query data.

C. **Results pane**: Show the tabular results of the query data and the query in the **Results** and **KQL** tabs respectively.

D. **Columns pane**: Shows the query columns and their metadata, value distributions, and sample values depending on their data type.

You can then explore your data without affecting the visualization shown in the tile in the following ways:

* In the filters bar, you can remove, add, and modify filters and aggregations from the query.

    // **TODO: ADD IMAGE OF FILTERS BAR SHOWING ORIGINAL AND ADDED FILTER/AGGREGATIONS**

    Filters that came from the original tile query can't be modified and can only be removed in reverse order. You can add your own filters and aggregations, which you can later modify or remove as you explore.

    To add a filter:

    1. Select **+ Add**.

    1. Find and select the column you'd like to filer.

    // **TODO: ADD IMAGE OF ADD FILTER COLUMN SELECTION**

    1. Select the filter **Operator** and **Value**, and then select **Apply**. The visual, results, and KQL query update to reflect the new filter.

    // **TODO: ADD IMAGE OF DEFINE FILTER POPUP**

    To add an aggregation:

    1. Select **+ Add** > **Aggregation**.

    // **TODO: ADD IMAGE OF ADD AGGREGATION SELECTION**

    1. Select the filter **Operator** and **Display Name**, optionally add up to two columns to group by, and then select **Apply**. The visual, results, and KQL query update to reflect the new filter.

    // **TODO: ADD IMAGE OF DEFINE AGGREGATION POPUP**

* From the **Visual type** dropdown, select other chart types to visualize your data in different ways.

    // **TODO: ADD IMAGE OF BAR CHART**

* Select the **Results** and **KQL** tabs to view the tabular query results and the underlying query respectively. As you explore, you see the changes you make updated in these tabs.

    // **TODO: ADD IMAGE OF KQL TAB**

* In the **Columns** pane, you can browse the table schema by looking at the columns or finding a particular column. You can also choose columns to see their top values, value distributions, and sample values depending on their data type, as follows:

    // **TODO: ADD IMAGE OF COLUMNS PANE**

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
