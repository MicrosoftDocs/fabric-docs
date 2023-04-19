---
title: Query data in the KQL Queryset in Real-time Analytics
description: Learn how to use the KQL Queryset to query your data explorer data.
ms.reviewer: tzgitlin
author: YaelSchuster
ms.author: yaschust
ms.topic: how-to
ms.date: 04/18/2023
ms.search.form: product-kusto
---
# Query data in the KQL Queryset

In this article, you'll learn how to create and use a new KQL Queryset.

The KQL Queryset is the item used to run queries, and view and manipulate query results on data from your Data Explorer database. The KQL Queryset allows you to save queries for future use, or export and share queries with others.

The KQL Queryset uses the Kusto Query language for query creation, and also supports some SQL functions. For more information about the query language, see [Kusto Query Language overview](/azure/data-explorer/kusto/query/). <!-- Add link to contextual item -->

## Prerequisites

* [Power BI Premium](/power-bi/enterprise/service-admin-premium-purchase) enabled workspace
* A [KQL Database](create-database.md) with a populated data table

## Create a new query set

A query set exists within the context of a workspace. A new KQL Queryset is associated with the workspace that is open at the time of creation.

1. Browse to the desired workspace.
1. Select **+New** > **KQL Queryset**

    :::image type="content" source="media/kusto-query-set/create-query-set.png" alt-text="Screenshot of creating new query set.":::

1. Enter a unique name. You can use alphanumeric characters, underscores, periods, and hyphens. Special characters aren't supported.

> [!NOTE]
> You can create multiple KQL Querysets in a single workspace.

### Open an existing query set

To access an existing query set, browse to your workspace and select the desired query set from the list of items. You can also find recent items in the **Quick access** section of the **Home** page.

:::image type="content" source="media/kusto-query-set/open-existing-query-set.png" alt-text="Screenshot of opening an existing query set.":::

## Connect to a database

Queries run in the context of a database. To connect to a database or switch the database associated with any tab in the KQL Queryset, select a database from the dropdown.

:::image type="content" source="media/kusto-query-set/connect-database.png" alt-text="Screenshot of connecting to a database.":::

A list of tables associated with this database will appear below the database name.

## Manage tabs

:::image type="content" source="media/kusto-query-set/manage-tabs.png" alt-text="Screenshot of the options for editing tabs in the KQL Queryset.":::

* **Rename a tab**: Select the **pencil icon** next to the tab name.
* **Add a new tab**: Select the plus **+** to the right of the existing tabs. Different tabs can be connected to different databases.
* **Change the existing database connection**: In the **Database** dropdown, select a different database.

## Write a query

Now that you're connected to your data source, you can run queries on this data. The KQL Queryset uses the Kusto Query Language (KQL) to query data from your workspace. To learn more about KQL, see [Kusto Query Language overview](/azure/data-explorer/kusto/query/).

The following examples use data that is publicly available at [https://kustosamples.blob.core.windows.net/samplefiles/StormEvents.csv](https://kustosamples.blob.core.windows.net/samplefiles/StormEvents.csv).

1. Write or copy a query in the top pane of the KQL Queryset. 
1. Select the **Run** button, or press **Shift**+**Enter** to run the query.

    The resulting query output is displayed in the results grid, which appears below the query pane. Notice the green check indicating that the query has finished successfully, and time used to compute the query results.

    :::image type="content" source="media/kusto-query-set/query-window.png" alt-text="Screenshot of the query window with a query in it.":::

### Manipulate results in the results grid

You can use the results grid to customize results and do further analysis.

#### Expand a cell

Expanding cells are useful to view long strings or dynamic fields such as JSON.

1. Double-click a cell to open an expanded view. This view allows you to read long strings, and provides a JSON formatting for dynamic data.

    :::image type="content" source="media/kusto-query-set/expand-cell.png" alt-text="Screenshot of the Azure Data Explorer web UI expanded cell to show long strings.":::

1. Select on the icon on the top right of the result grid to switch reading pane modes. Choose between the following reading pane modes for expanded view: inline, below pane, and right pane.

    :::image type="content" source="media/kusto-query-set/expanded-view-icon.png" alt-text="Screenshot highlighting the icon to change the reading pane to expanded view mode in the Azure Data Explorer web UI query results.":::

#### Expand a row

When working with a table with dozens of columns, expand the entire row to be able to easily see an overview of the different columns and their content.

1. Click on the arrow **>** to the left of the row you want to expand.

    :::image type="content" source="media/kusto-query-set/expand-row.png" alt-text="Screenshot of an expanded row in the Azure Data Explorer web UI.":::

1. Within the expanded row, some columns are expanded (arrow pointing down), and some columns are collapsed (arrow pointing right). Click on these arrows to toggle between these two modes.

#### Group column by results

Within the results, you can group results by any column.

1. Run the following query:

    ```kusto
    StormEvents
    | sort by StartTime desc
    | take 10
    ```

1. Mouse-over the **State** column, select the menu, and select **Group by State**.

    :::image type="content" source="media/kusto-query-set/group-by.png" alt-text="Screenshot of a table with query results grouped by state.":::

1. In the grid, double-click on **California** to expand and see records for that state. This type of grouping can be helpful when doing exploratory analysis.

    :::image type="content" source="media/kusto-query-set/group-expanded.png" alt-text="Screenshot of a query results grid with California group expanded in the Azure Data Explorer web UI." border="false":::

1. Mouse-over the **Group** column, then select **Reset columns**. This setting returns the grid to its original state.

    :::image type="content" source="media/kusto-query-set/reset-columns.png" alt-text="Screenshot of the reset columns setting highlighted in the column dropdown.":::

##### Use value aggregation

After you've grouped by a column, you can then use the value aggregation function to calculate simple statistics per group.

1. Select the menu for the column you want to evaluate.
1. Select **Value Aggregation**, and then select the type of function you want to do on this column.

    :::image type="content" source="media/kusto-query-set/aggregate.png" alt-text="Screenshot of aggregate results when grouping column by results in the Azure Data Explorer web UI. ":::

#### Hide empty columns

You can hide/unhide empty columns by toggling the **eye** icon on the results grid menu.

:::image type="content" source="media/kusto-query-set/hide-empty-columns.png" alt-text="Screenshot of eye icon to hide results grid in the Azure Data Explorer web UI.":::

#### Filter columns

You can use one or more operators to filter the results of a column.

1. To filter a specific column, select the menu for that column.
1. Select the filter icon.
1. In the filter builder, select the desired operator.
1. Type in the expression you wish to filter the column on. Results are filtered as you type.

    > [!NOTE]
    > The filter isn't case sensitive.

1. To create a multi-condition filter, select a boolean operator to add another condition
1. To remove the filter, delete the text from your first filter condition.

    :::image type="content" source="media/kusto-query-set/filter-column.gif" alt-text="GIF showing how to filter on a column in the Azure Data Explorer web UI.":::

#### Run cell statistics

1. Run the following query.

    ```kusto
    StormEvents
    | sort by StartTime desc
    | where DamageProperty > 5000
    | project StartTime, State, EventType, DamageProperty, Source
    | take 10
    ```

1. In the results grid, select a few of the numerical cells. The table grid allows you to select multiple rows, columns, and cells and calculate aggregations on them. The following functions are supported for numeric values: **Average**, **Count**, **Min**, **Max**, and **Sum**.

    :::image type="content" source="media/kusto-query-set/select-stats.png" alt-text="Screenshot of a table with selected functions.":::

### Filter to query from grid

Another easy way to filter the grid is to add a filter operator to the query directly from the grid.

1. Select a cell with content you wish to create a query filter for.

1. Right-click to open the cell actions menu. Select **Add selection as filter**.

    :::image type="content" source="media/kusto-query-set/add-selection-filter.png" alt-text="Screenshot of a dropdown with the Add selection as filter option to query directly from the grid.":::

1. A query clause will be added to your query in the query editor:

    :::image type="content" source="media/kusto-query-set/add-query-from-filter.png" alt-text="Screenshot of the query editor showing query clause added from filtering on the grid in Azure Data Explorer web UI.":::

### Pivot

The pivot mode feature is similar to Excel’s pivot table, enabling you to do advanced analysis in the grid itself.

Pivoting allows you to take a columns value and turn them into columns. For example, you can pivot on *State* to make columns for Florida, Missouri, Alabama, and so on.

1. On the right side of the grid, select **Columns** to see the table tool panel.

    :::image type="content" source="media/kusto-query-set/tool-panel.png" alt-text="Screenshot showing how to access the pivot mode feature.":::

1. Select **Pivot Mode**, then drag columns as follows: **EventType** to **Row groups**; **DamageProperty** to **Values**; and **State** to **Column labels**.  

    :::image type="content" source="media/kusto-query-set/pivot-mode.png" alt-text="Screenshot highlighting selected column names to create the pivot table.":::

    The result should look like the following pivot table:

    :::image type="content" source="media/kusto-query-set/pivot-table.png" alt-text="Screenshot of results in a pivot table.":::

#### Search in the results grid

You can look for a specific expression within a result table.

1. Run the following query:

    ```Kusto
    StormEvents
    | where DamageProperty > 5000
    | take 1000
    ```

1. Click on the **Search** button on the right and type in *"Wabash"*

    :::image type="content" source="media/kusto-query-set/search.png" alt-text="Screenshot highlighting the search bar in the table.":::

1. All mentions of your searched expression are now highlighted in the table. You can navigate between them by clicking *Enter* to go forward or *Shift+Enter* to go backward, or you can use the *up* and *down* buttons next to the search box.

    :::image type="content" source="media/kusto-query-set/search-results.png" alt-text="Screenshot of a table containing highlighted expressions from search results.":::

## Copy query

You may want to copy or share the queries you create.

1. At the top of the query window, select **Manage**.
1. Select **Copy**

    :::image type="content" source="media/kusto-query-set/copy-query-results.png" alt-text="Screenshot to copy query results.":::

1. You can either select **Query** to copy the text of the most recent query, or select **Results** to copy the output table.
1. You can now paste this information into any editor, such as Microsoft Word.

## Export query data as CSV

Instead of simply copy-pasting the query output, you can also export the query results.

This is a one-time method to export a CSV file containing the query results.
1. At the top of the query window, select **Manage**.

    :::image type="content" source="media/kusto-query-set/export-csv.png" alt-text="Screenshot of export to CSV.":::

1. Select **Export results to CSV**.
1. Save the CSV file locally.

## Delete query set

1. Select the workspace to which your query set is associated.
1. Hover over the query set you wish to delete. Select **More [...]**, then select **Delete**.

:::image type="content" source="media/kusto-query-set/clean-up-query-set.png" alt-text="Screenshot of how to delete a query set.":::

<!---
## Next steps

* TODO Link to KQL overview
* TODO Link to KQL quick reference
-->
