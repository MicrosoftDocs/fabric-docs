---
title: Query data in a KQL queryset in Real-Time Analytics
description: Learn how to use the KQL Queryset to query the data in your KQL database.
ms.reviewer: tzgitlin
author: YaelSchuster
ms.author: yaschust
ms.topic: how-to
ms.date: 05/23/2023
ms.search.form: product-kusto
---
# Query data in a KQL queryset

[!INCLUDE [preview-note](../includes/preview-note.md)]

In this article, you learn how to create and use a new KQL queryset.

The KQL Queryset is the item used to run queries, view and manipulate query results on data from your KQL database. The KQL Queryset allows you to save queries for future use, export and share queries with others, and includes the option to generate a Power BI report.

The KQL Queryset uses the Kusto Query language for creating queries, and also supports some SQL functions. For more information about the query language, see [Kusto Query Language overview](/azure/data-explorer/kusto/query/index?context=/fabric/context/context).

## Prerequisites

* A [workspace](../get-started/create-workspaces.md) with a Microsoft Fabric-enabled [capacity](../enterprise/licenses.md#capacity)
* [KQL Database](create-database.md) with data

## Create a KQL queryset

A KQL queryset exists within the context of a workspace. A new KQL queryset is always associated with the workspace you're using when you create it, but it can also be associated with a specific KQL database in that workspace.

1. Browse to the desired workspace.
1. Select **+New** > **KQL Queryset**
1. Enter a unique name. You can use alphanumeric characters, underscores, periods, and hyphens. Special characters aren't supported.

> [!NOTE]
> You can create multiple KQL Querysets in a single workspace.

### Open an existing queryset

To access an existing queryset, browse to your workspace and select the desired KQL queryset from the list of items.

:::image type="content" source="media/kusto-query-set/open-existing-query-set.png" alt-text="Screenshot of Microsoft Fabric workspace showing KQL Querysets.":::

## Connect to a database

Queries run in the context of a database. You can change the associated database at any point, and retain the queries saved in the query editor.

1. To connect your KQL queryset to a database, select **Select database**, and then select a database from the data hub that appears.

:::image type="content" source="media/kusto-query-set/select-database.png" alt-text="Screenshot of the KQL queryset database selection pane. The option titled Select  database is highlighted.":::

A list of tables associated with this database will appear below the database name.

## Manage tabs

:::image type="content" source="media/kusto-query-set/manage-tabs.png" alt-text="Screenshot of the options for editing tabs in the KQL Queryset.":::

* **Rename a tab**: Select the **pencil icon** next to the tab name.
* **Add a new tab**: Select the plus **+** to the right of the existing tabs. Different tabs can be connected to different databases.
* **Change the existing database connection**: Under **Database**, select the existing database connection to open the data hub.

## Write a query

Now that you're connected to your data source, you can run queries on this data. The KQL Queryset uses the Kusto Query Language (KQL) to query data from your workspace. To learn more about KQL, see [Kusto Query Language overview](/azure/data-explorer/kusto/query/).

The following examples use data that is publicly available at [https://kustosamples.blob.core.windows.net/samplefiles/StormEvents.csv](https://kustosamples.blob.core.windows.net/samplefiles/StormEvents.csv).

1. Paste the following query in the top pane of the KQL Queryset.

    ```kusto
    StormEvents
    | top-nested 2 of State by sum(BeginLat), top-nested 3 of Source by sum(BeginLat), top-nested 1 of EndLocation by sum(BeginLat)
    ```

1. Select the **Run** button, or press **Shift**+**Enter** to run the query.

    The resulting query output is displayed in the results grid, which appears below the query pane. Notice the green check indicating that the query has finished successfully, and time used to compute the query results.

    :::image type="content" source="media/kusto-query-set/query-window.png" alt-text="Screenshot of the KQL queryset showing the results of a query. Both the query and the results pane are highlighted."  lightbox="media/kusto-query-set/query-window.png":::

### Manipulate results in the results grid

You can use the results grid to customize results and do further analysis.

#### Expand a cell

Expanding cells are useful to view long strings or dynamic fields such as JSON.

1. Double-click a cell to open an expanded view. This view allows you to read long strings, and provides a JSON formatting for dynamic data.

    :::image type="content" source="media/kusto-query-set/expand-cell.png" alt-text="Screenshot of the KQL queryset showing the results of a query with an expanded cell to show long strings. The expanded cell is highlighted."  lightbox="media/kusto-query-set/expand-cell.png":::

1. Select on the icon on the top right of the result grid to switch reading pane modes. Choose between the following reading pane modes for expanded view: inline, below pane, and right pane.

    :::image type="content" source="media/kusto-query-set/expanded-view-icon.png" alt-text="Screenshot of the KQL queryset results pane showing the option to change the view mode of the query results pane.":::

#### Expand a row

When working with a table with many columns, expand the entire row to be able to easily see an overview of the different columns and their content.

1. Click on the arrow **>** to the left of the row you want to expand.

    :::image type="content" source="media/kusto-query-set/expand-row.png" alt-text="Screenshot of the KQL queryset results pane showing an expanded row."  lightbox="media/kusto-query-set/expand-row.png":::

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

    :::image type="content" source="media/kusto-query-set/group-by.png" alt-text="Screenshot of the KQL queryset result pane showing the menu of the column titled State. The menu option to group by state is highlighted.":::

1. In the grid, double-click on **California** to expand and see records for that state. This type of grouping can be helpful when doing exploratory analysis.

    :::image type="content" source="media/kusto-query-set/group-expanded.png" alt-text="Screenshot of a query results grid with California group expanded in the KQL queryset."  lightbox="media/kusto-query-set/group-expanded.png":::

1. Mouse-over the **Group** column, then select **Reset columns**. This setting returns the grid to its original state.

    :::image type="content" source="media/kusto-query-set/reset-columns.png" alt-text="Screenshot of the reset columns setting highlighted in the column dropdown.":::

#### Hide empty columns

You can hide/show empty columns by toggling the **eye** icon on the results grid menu.

:::image type="content" source="media/kusto-query-set/hide-empty-columns.png" alt-text="Screenshot of the KQL queryset result pane. The eye icon to hide and show empty columns in the results pane is highlighted.":::

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

#### Run cell statistics

1. Run the following query.

    ```kusto
    StormEvents
    | sort by StartTime desc
    | where DamageProperty > 5000
    | project StartTime, State, EventType, DamageProperty, Source
    | take 10
    ```

1. In the results pane, select a few of the numerical cells. The table grid allows you to select multiple rows, columns, and cells and calculate aggregations on them. The following functions are supported for numeric values: **Average**, **Count**, **Min**, **Max**, and **Sum**.

    :::image type="content" source="media/kusto-query-set/select-stats.png" alt-text="Screenshot of the KQL query results pane showing a few numerical cells that are selected. The outcome of the selection shows an calculated aggregation of those cells..":::

### Filter to query from grid

Another easy way to filter the grid is to add a filter operator to the query directly from the grid.

1. Select a cell with content you wish to create a query filter for.

1. Right-click to open the cell actions menu. Select **Add selection as filter**.

    :::image type="content" source="media/kusto-query-set/add-selection-filter.png" alt-text="Screenshot of a dropdown with the Add selection as filter option to query directly from the grid.":::

1. A query clause will be added to your query in the query editor:

    :::image type="content" source="media/kusto-query-set/add-query-from-filter.png" alt-text="Screenshot of the query editor showing query clause added from filtering on the grid in the KQL queryset.":::

### Pivot

The pivot mode feature is similar to Excel’s pivot table, enabling you to do advanced analysis in the grid itself.

Pivoting allows you to take a column's value and turn them into columns. For example, you can pivot on *State* to make columns for Florida, Missouri, Alabama, and so on.

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

    :::image type="content" source="media/kusto-query-set/search.png" alt-text="Screenshot of query result pane highlighting the search option in the table."  lightbox="media/kusto-query-set/search.png":::

1. All mentions of your searched expression are now highlighted in the table. You can navigate between them by clicking **Enter** to go forward or **Shift+Enter** to go backward, or you can use the **up** and **down** buttons next to the search box.

    :::image type="content" source="media/kusto-query-set/search-results.png" alt-text="Screenshot of a table containing highlighted expressions from search results."  lightbox="media/kusto-query-set/search-results.png":::

## Copy query

You may want to copy or share the queries you create.

1. At the top of the query window, select the **Manage** tab.
1. Select **Copy**

    :::image type="content" source="media/kusto-query-set/copy-query-results.png" alt-text="Screenshot of the Manage tab of the KQL queryset showing the dropdown of the copy query or query results option.":::

1. You can either select **Query** to copy the text of the most recent query, or select **Results** to copy the output table.
1. You can now paste this information into any editor, such as Microsoft Word.

## Export query data as CSV

Instead of simply copy-pasting the query output, you can also export the query results.

This is a one-time method to export a CSV file containing the query results.

1. At the top of the query window, select the **Manage** tab.

    :::image type="content" source="media/kusto-query-set/export-csv.png" alt-text="Screenshot of the Manage tab of the KQL queryset showing the highlighted option to export results to CSV.":::

1. Select **Export results to CSV**.
1. Save the CSV file locally.

## Delete query set

1. Select the workspace to which your query set is associated.
1. Hover over the query set you wish to delete. Select **More [...]**, then select **Delete**.

:::image type="content" source="media/kusto-query-set/clean-up-query-set.png" alt-text="Screenshot of Microsoft Fabric workspace showing how to delete a KQL queryset."  lightbox="media/kusto-query-set/clean-up-query-set.png":::

## Next steps

* [What is Real-Time Analytics in Fabric?](overview.md)
* [Use sample queries to query your table](query-table.md)
