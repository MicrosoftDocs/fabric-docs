---
title: 
description: 
ms.reviewer: 
ms.topic: how-to
ms.date: 12/14/2022
---
## Query data in the KQL queryset

The KQL queryset is the item you'll use to run queries, and view and manipulate query results. Use the KQL queryset to save, export, and share queries with others.

In this article, you'll learn how to create and use a new KQL queryset.

For more information about the query language you'll use in the query set, see [Kusto Query Language overview](/azure/data-explorer/kusto/query/).

## Prerequisites

* Power BI premium subscription
* Workspace
* Kusto table with data

## Create a new query set

A query set exists within the context of a workspace. A new KQL queryset is associated with whichever workspace is open at the time of creation.

1. Browse to the workspace you'll use as context for the query set.
1. Select **+New** > **KQL queryset**

    :::image type="content" source="media/kusto-query-set/create-query-set.png" alt-text="Screenshot of creating new query set.":::

1. Enter a unique name.

> [!NOTE]
> There is no limit to the number of KQL querysets that can be created in a given workspace.

### Open an existing query set

To access an existing query set, browse to your workspace and select the desired query set from the list of items. You can also find recent items in the **Quick access** section of the **Home** page.

:::image type="content" source="media/kusto-query-set/open-existing-query-set.png" alt-text="Screenshot of opening an existing query set.":::

## Connect to a database

Queries run in the context of a database. To connect to a database, select a database from the dropdown menu or search for your database in the search window.

:::image type="content" source="media/kusto-query-set/connect-database.png" alt-text="Screenshot of connecting to a database.":::

A list of tables contained within a particular database will appear below the name of the database.

## Write a query

Now that you're connected to your data source, you can run queries on this data. The KQL queryset uses the Kusto Query Language (KQL) to query data from your workspace. To learn more about KQL, see [Kusto Query Language overview](/azure/data-explorer/kusto/query/).

1. Write or copy a query in the top pane of the KQL queryset. 
1. Select the **Run** button, or press **Shift**+**Enter** to run the query.

    The resulting query output is displayed in the results grid, which appears below the query pane. Notice the green check indicating that the query has finished successfully, and time used to compute the query results.

    :::image type="content" source="media/kusto-query-set/query-window.png" alt-text="Screenshot of the query window with a query in it.":::

### Manipulate results in the results grid

The results grid can be used to customize results and do further analysis. For more information, see [work with the results grid](/azure/data-explorer/web-query-data#work-with-the-results-grid).

## Copy query

You may want to copy or share the queries you create.

1. At the top of the query window, select **Manage**.
1. Select **Copy**

    :::image type="content" source="media/kusto-query-set/copy-query-results.png" alt-text="Screenshot to copy query results.":::

1. You can either select **Query** to copy the text of the most recent query, or select **Results** to copy the output table.
1. You can now paste this information into any editor, such as Microsoft Word.

## Export query data

Instead of simply copy-pasting the query output, you can also export the query results.

### Export as CSV

This is a one-time method to export a CSV file containing the query results.
1. At the top of the query window, select **Manage**.

    :::image type="content" source="media/kusto-query-set/export-csv.png" alt-text="Screenshot of export to CSV.":::

1. Select **Export results to CSV**.
1. Save the CSV file locally.

## Delete query set

1. Select the workspace to which your query set is associated.
1. Hover over the query set you wish to delete. Select **More [...]**, then select **Delete**.

:::image type="content" source="media/kusto-query-set/clean-up-query-set.png" alt-text="Screenshot of how to delete a query set.":::

## Next steps

* TODO Link to KQL overview
* TODO Link to KQL quick reference
