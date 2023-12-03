---
title: Query data in a KQL queryset
description: Learn how to use the KQL queryset to query the data in your KQL database in Real-Time Analytics.
ms.reviewer: tzgitlin
author: YaelSchuster
ms.author: yaschust
ms.topic: how-to
ms.custom:
  - build-2023
  - build-2023-dataai
  - build-2023-fabric
  - ignite-2023
ms.date: 12/03/2023
ms.search.form: KQL Queryset
---
# Query data in a KQL queryset

In this article, you learn how to create and use a new KQL queryset.

The KQL Queryset is the item used to run queries, view, and customize query results on data from a KQL database.  Each tab in the KQL queryset can be associated with a different KQL database, and lets your save queries for later use or share with others to collaborate on data exploration. You can also change the KQL database associated with any tab, allowing you to run the same query on data in different states.

The KQL Queryset uses the Kusto Query language for creating queries, and also supports many SQL functions. For more information about the query language, see [Kusto Query Language overview](/azure/data-explorer/kusto/query/index?context=/fabric/context/context).

## Prerequisites

* A [workspace](../get-started/create-workspaces.md) with a Microsoft Fabric-enabled [capacity](../enterprise/licenses.md#capacity)
* A [KQL database](create-database.md) with editing permissions and data

## Write a query

Now that you're connected to your data source, you can run queries on this data. The KQL Queryset uses the Kusto Query Language (KQL) to query data from any of the databases you have access to. To learn more about KQL, see [Kusto Query Language overview](/azure/data-explorer/kusto/query/).

The following examples use data that is publicly available at [https://kustosamples.blob.core.windows.net/samplefiles/StormEvents.csv](https://kustosamples.blob.core.windows.net/samplefiles/StormEvents.csv).

1. Write or copy a query in the top pane of the KQL Queryset.
1. Select the **Run** button, or press **Shift**+**Enter** to run the query.

    The resulting query output is displayed in the results grid, which appears below the query pane. Notice the green check indicating that the query has finished successfully, and time used to compute the query results.

    :::image type="content" source="media/kusto-query-set/query-window.png" alt-text="Screenshot of the KQL Queryset showing the results of a query. Both the query and the results pane are highlighted."  lightbox="media/kusto-query-set/query-window.png":::

## Copy query

You might want to copy or share the queries you create.

1. At the top of the query window, select the **Manage** tab.
1. Select **Copy**

    :::image type="content" source="media/kusto-query-set/copy-query-results.png" alt-text="Screenshot of the Manage tab of the KQL Queryset showing the dropdown of the copy query or query results option.":::

1. You can either select **Query** to copy the text of the most recent query, or select **Results** to copy the output table.
1. You can now paste this information into any editor, such as Microsoft Word.

## Export query data as CSV

Instead of simply copy-pasting the query output, you can also export the query results.

This is a one-time method to export a CSV file containing the query results.

1. At the top of the query window, select the **Manage** tab.

    :::image type="content" source="media/kusto-query-set/export-csv.png" alt-text="Screenshot of the Manage tab of the KQL Queryset showing the highlighted option to export results to CSV.":::

1. Select **Export results to CSV**.
1. Save the CSV file locally.

## Delete KQL queryset

1. Select the workspace to which your KQL queryset is associated.
1. Hover over the KQL queryset you wish to delete. Select **More [...]**, then select **Delete**.

:::image type="content" source="media/kusto-query-set/clean-up-query-set.png" alt-text="Screenshot of Microsoft Fabric workspace showing how to delete a KQL Queryset."  lightbox="media/kusto-query-set/clean-up-query-set.png":::

## Next step

> [!div class="nextstepaction"]
> [Customize results in the KQL Queryset results grid](customize-results.md)
