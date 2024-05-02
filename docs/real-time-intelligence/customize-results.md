---
title: Customize results in the KQL Queryset results grid
description: Learn how to customize results in the KQL Queryset results grid in Real-Time Intelligence.
ms.reviewer: tzgitlin
author: YaelSchuster
ms.author: yaschust
ms.topic: how-to
ms.custom:
  - build-2023
  - ignite-2023
ms.date: 04/21/2024
ms.search.form: KQL Queryset
---
# Customize results in the KQL Queryset results grid

Use the results grid in the KQL Queryset to customize results and perform further analysis on your data. This article describes actions that can be done in the results grid after a query has been run.

## Prerequisites

* A [workspace](../get-started/create-workspaces.md) with a Microsoft Fabric-enabled [capacity](../enterprise/licenses.md#capacity)
* A [KQL Database](create-database.md) with editing permissions and data
* A [KQL Queryset](kusto-query-set.md)

## Expand a cell

Expanding cells are useful to view long strings or dynamic fields such as JSON.

1. Double-click a cell to open an expanded view. This view allows you to read long strings, and provides a JSON formatting for dynamic data.

    :::image type="content" source="media/kusto-query-set/expand-cell.png" alt-text="Screenshot of the KQL Queryset showing the results of a query with an expanded cell to show long strings. The expanded cell is highlighted."  lightbox="media/kusto-query-set/expand-cell.png":::

1. Select on the icon on the top right of the result grid to switch reading pane modes. Choose between the following reading pane modes for expanded view: inline, below pane, and right pane.

    :::image type="content" source="media/kusto-query-set/expanded-view-icon.png" alt-text="Screenshot of the KQL Queryset results pane showing the option to change the view mode of the query results pane."  lightbox="media/kusto-query-set/expanded-view-icon.png":::

## Expand a row

When working with a table with many columns, expand the entire row to be able to easily see an overview of the different columns and their content.

1. Click on the arrow **>** to the left of the row you want to expand.

    :::image type="content" source="media/kusto-query-set/expand-row.png" alt-text="Screenshot of the KQL Queryset results pane showing an expanded row."  lightbox="media/kusto-query-set/expand-row.png":::

1. Within the expanded row, some columns are expanded (arrow pointing down), and some columns are collapsed (arrow pointing right). Click on these arrows to toggle between these two modes.

## Group column by results

Within the results, you can group results by any column.

1. Run the following query:

    ```kusto
    StormEvents
    | sort by StartTime desc
    | take 10
    ```

1. Hover over the **State** column, select the menu, and select **Group by State**.

    :::image type="content" source="media/kusto-query-set/group-by.png" alt-text="Screenshot of the KQL Queryset result pane showing the menu of the column titled State. The menu option to group by state is highlighted."  lightbox="media/kusto-query-set/group-by.png":::

1. In the grid, double-click on **California** to expand and see records for that state. This type of grouping can be helpful when doing exploratory analysis.

    :::image type="content" source="media/kusto-query-set/group-expanded.png" alt-text="Screenshot of a query results grid with California group expanded in the KQL Queryset."  lightbox="media/kusto-query-set/group-expanded.png":::

1. Hover over the **Group** column, then select **Reset columns**/**Ungroup by \<column name>**. This setting returns the grid to its original state.

    :::image type="content" source="media/kusto-query-set/reset-columns.png" alt-text="Screenshot of the reset columns setting highlighted in the column dropdown.":::

## Hide empty columns

You can hide/show empty columns by toggling the **eye** icon on the results grid menu.

:::image type="content" source="media/kusto-query-set/hide-empty-columns.png" alt-text="Screenshot of the KQL Queryset result pane. The eye icon to hide and show empty columns in the results pane is highlighted."  lightbox="media/kusto-query-set/hide-empty-columns.png":::

## Filter columns

You can use one or more operators to filter the results of a column.

1. To filter a specific column, select the menu for that column.
1. Select the filter icon.
1. In the filter builder, select the desired operator.
1. Type in the expression you wish to filter the column on. Results are filtered as you type.

    > [!NOTE]
    > The filter isn't case sensitive.

1. To create a multi-condition filter, select a boolean operator to add another condition
1. To remove the filter, delete the text from your first filter condition.

## Run cell statistics

1. Run the following query.

    ```kusto
    StormEvents
    | sort by StartTime desc
    | where DamageProperty > 5000
    | project StartTime, State, EventType, DamageProperty, Source
    | take 10
    ```

1. In the results pane, select a few of the numerical cells. The table grid allows you to select multiple rows, columns, and cells and calculate aggregations on them. The following functions are supported for numeric values: **Average**, **Count**, **Min**, **Max**, and **Sum**.

    :::image type="content" source="media/kusto-query-set/select-stats.png" alt-text="Screenshot of the KQL query results pane showing a few numerical cells that are selected. The outcome of the selection shows a calculated aggregation of those cells."  lightbox="media/kusto-query-set/select-stats.png":::

## Filter to query from grid

Another easy way to filter the grid is to add a filter operator to the query directly from the grid.

1. Select a cell with content you wish to create a query filter for.

1. Right-click to open the cell actions menu. Select **Add selection as filter**.

    :::image type="content" source="media/kusto-query-set/add-selection-filter.png" alt-text="Screenshot of a dropdown with the Add selection as filter option to query directly from the grid.":::

1. A query clause will be added to your query in the query editor:

    :::image type="content" source="media/kusto-query-set/add-query-from-filter.png" alt-text="Screenshot of the query editor showing query clause added from filtering on the grid in the KQL Queryset.":::

## Pivot

The pivot mode feature is similar to Excel's pivot table, enabling you to do advanced analysis in the grid itself.

Pivoting allows you to take a column's value and turn them into columns. For example, you can pivot on *State* to make columns for Florida, Missouri, Alabama, and so on.

1. On the right side of the grid, select **Columns** to see the table tool panel.

    :::image type="content" source="media/kusto-query-set/tool-panel.png" alt-text="Screenshot showing how to access the pivot mode feature.":::

1. Select **Pivot Mode**, then drag columns as follows: **EventType** to **Row groups**; **DamageProperty** to **Values**; and **State** to **Column labels**.

    :::image type="content" source="media/kusto-query-set/pivot-mode.png" alt-text="Screenshot highlighting selected column names to create the pivot table.":::

    The result should look like the following pivot table:

    :::image type="content" source="media/kusto-query-set/pivot-table.png" alt-text="Screenshot of results in a pivot table."  lightbox="media/kusto-query-set/pivot-table.png":::

## Search in the results grid

You can look for a specific expression within a result table.

1. Run the following query:

    ```Kusto
    StormEvents
    | where DamageProperty > 5000
    | take 1000
    ```

1. Select the **Search** button on the right and type in *"Wabash"*

    :::image type="content" source="media/kusto-query-set/search.png" alt-text="Screenshot of query result pane highlighting the search option in the table."  lightbox="media/kusto-query-set/search.png":::

1. All mentions of your searched expression are now highlighted in the table. You can navigate between them by clicking **Enter** to go forward or **Shift+Enter** to go backward, or you can use the **up** and **down** buttons next to the search box.

    :::image type="content" source="media/kusto-query-set/search-results.png" alt-text="Screenshot of a table containing highlighted expressions from search results."  lightbox="media/kusto-query-set/search-results.png":::

## Related content

* [Visualize data in a Power BI report](create-powerbi-report.md)
* [Kusto Query Language overview](/azure/data-explorer/kusto/query/index?context=/fabric/context/context)
