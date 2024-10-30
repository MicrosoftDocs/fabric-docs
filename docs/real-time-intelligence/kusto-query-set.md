---
title: Query data in a KQL queryset
description: Learn how to use the KQL queryset to query the data in your KQL database in Real-Time Intelligence.
ms.reviewer: tzgitlin
author: YaelSchuster
ms.author: yaschust
ms.topic: how-to
ms.custom:
  - build-2023
  - build-2023-dataai
  - build-2023-fabric
  - ignite-2023
ms.date: 10/29/2024
ms.search.form: KQL Queryset
---
# Query data in a KQL queryset

In this article, you learn how to use a KQL queryset. The KQL Queryset is the item used to run queries, view, and customize query results on data from different data sources, such as Eventhouse, KQL database, and more.

The KQL Queryset uses the Kusto Query Language for creating queries, and also supports many SQL functions. For more information about the query language, see [Kusto Query Language overview](/azure/data-explorer/kusto/query/index?context=/fabric/context/context).

## Prerequisites

* A [workspace](../get-started/create-workspaces.md) with a Microsoft Fabric-enabled [capacity](../enterprise/licenses.md#capacity)
* A [KQL database](create-database.md) with editing permissions and data, or an Azure Data Explorer [cluster and database](/azure/data-explorer/create-cluster-and-database) with [AllDatabaseAdmin](/azure/data-explorer/manage-cluster-permissions#cluster-level-permissions) permissions.

## Select a database

Queries run in the context of a database. You can change the associated database at any point, and retain the queries saved in the query editor. You can associate your KQL queryset with multiple data sources of different types, including a KQL database or a database from an Azure Data Explorer cluster.

Select the tab that corresponds with your desired database type.

## [KQL Database](#tab/kql-database)

1. [Open your KQL queryset](create-query-set.md#open-an-existing-kql-queryset).
1. In the connection pane on the left-hand side of the query page, under **Explorer**, select **V** to expand the database connections menu.

    :::image type="content" source="media/kusto-query-set/expand-database-menu.png" alt-text="Screenshot of the database menu showing a list of connected databases.":::

1. Under **Connect source**, select **OneLake data hub**.
1. In the **OneLake data hub** window that appears, select a KQL database to connect to your KQL queryset, and then select **Connect**. Alternatively, close the**OneLake data hub** window and use the **+Add data source** menu to connect to a different data source.

## [Azure Data Explorer cluster](#tab/azure-data-explorer-cluster)

1. [Open your KQL queryset](create-query-set.md#open-an-existing-kql-queryset).
1. In the connection pane on the left-hand side of the query page, under **Explorer**, select **V** to expand the database connections menu.

    :::image type="content" source="media/kusto-query-set/expand-database-menu.png" alt-text="Screenshot of the database menu showing a list of connected databases.":::

1. Under **Connect source**, select **Azure Data Explorer**.
1. Under **Connection URI**, enter the cluster URI.

    To find the connection URI, go to your cluster resource in the [Azure portal](https://portal.azure.com/#home). The connection URI is the URI found in the Overview. To add a free sample cluster, specify "help" as the **Connection URI**.

    :::image type="content" source="media/kusto-query-set/connect-to-cluster.png" alt-text="Screenshot of the connection window showing an Azure Data Explorer cluster URI. The Connect cluster button is highlighted.":::

1. Under **Database**, select the dropdown menu to expand the list of databases in your cluster, and then select a database.
1. Select **Connect**.

----

 A list of tables associated with this database appears below the database name in the connection pane.

## Interact with databases using the connection pane

The connection pane allows you to browse and switch between the databases connected to the queryset. In the connection pane, under **Database**, select **V** to expand the database connections menu. Select the database you want to explore. The connection pane shows a breakdown of the following items that are included in the selected database:

* **Tables**
* **Materialized View**
* **Shortcuts**
* **Functions**

In the connection pane, you can explore what items are included in each section. To open the action menu, hover over the item and select the **More menu** [...]. The menu gives options to:

* **Refresh data**
* **View data profile**
* **Insert** to create a script and paste it in to the query editor
* **Delete**

Different actions are available for different types of items.

## Write a query

Now that you're connected to your data source, you can run queries on this data. The KQL Queryset uses the Kusto Query Language (KQL) to query data from any of the databases you have access to. To learn more about KQL, see [Kusto Query Language overview](/azure/data-explorer/kusto/query/index?context=/fabric/context/context).

The following examples use data that is publicly available at [https://kustosamples.blob.core.windows.net/samplefiles/StormEvents.csv](https://kustosamples.blob.core.windows.net/samplefiles/StormEvents.csv).

1. Write or copy a query in the top pane of the KQL Queryset.
1. Select the **Run** button, or press **Shift**+**Enter** to run the query.

    The resulting query output is displayed in the results grid, which appears below the query pane. Notice the green check indicating that the query completed successfully, and the time used to compute the query results.

    :::image type="content" source="media/kusto-query-set/query-window.png" alt-text="Screenshot of the KQL Queryset showing the results of a query. Both the query and the results pane are highlighted."  lightbox="media/kusto-query-set/query-window.png":::

## Manage queryset tabs

Within a KQL queryset, you can create multiple tabs. Each tab can be associated with a different KQL database, and lets you save queries for later use or share with others to collaborate on data exploration. You can also change the KQL database associated with any tab, allowing you to run the same query on data in different states.

:::image type="content" source="media/kusto-query-set/manage-tabs.png" alt-text="Screenshot of the options for editing tabs in the KQL Queryset.":::

* **Add a new tab**: Select the plus **+** to the right of the existing tabs. Different tabs can be connected to different databases.
* **Rename a tab**: Select the **pencil icon** next to the tab name.
* **Change tab positions**: Change tab positions using drag and drop gestures.
* **Change the existing database connection**: Under **Explorer**, select the existing database connection to open the data hub.

On the right side of the command bar, there is a menu with additional actions to manage the multiple tabs in your queryset.

:::image type="content" source="media/kusto-query-set/multiple-tabs-menu1.png" alt-text="Screenshot of the multiple tabs menu for managing multiple tabs in the KQL Queryset.":::

## Copy query

You might want to copy and share the queries you create.

1. At the top of the query window, select the **Home** tab.
1. In the query pane, select **Copy query**.

    :::image type="content" source="media/kusto-query-set/copy-query-results.png" alt-text="Screenshot of the Manage tab of the KQL Queryset showing the dropdown of the copy query or query results option.":::

    The following table outlines the many options for how to copy a query.

    |Action|Description|
    |--|--|
    |Copy query | Copy the query text.|
    |Link to clipboard|Copy a deep link that can be used to run the query.|
    |Link and query to clipboard|Copy a link that can be used to run the query and the text of the query.|
    |Link, query and results to clipboard|Copy a link that can be used to run the query, the text of the query, and the results of the query.|
    |Copy results|Copy the results of the query.|

1. Select the desired action from the above table.
1. Paste this information to edit or share it, for example in Microsoft Word, Microsoft Teams or Outlook.

    > [!IMPORTANT]
    > The user who is receiving the query link must have viewing permissions to the underlying data to execute the query and view results.

## Export query data as CSV

Instead of simply copy-pasting the query output, you can also export the query results.

This is a one-time method to export a CSV file containing the query results.

1. At the top of the query window, select the **Home** tab.

    :::image type="content" source="media/kusto-query-set/export-csv.png" alt-text="Screenshot of the Home tab of the KQL Queryset showing the highlighted option to export results to CSV.":::

1. In the query pane, select **Export to CSV**.
1. Save the CSV file locally.

## Delete KQL queryset

To delete your KQL queryset:

1. Select the workspace in which your KQL queryset is located.
1. Hover over the KQL queryset you wish to delete. Select **More [...]**, then select **Delete**.

    :::image type="content" source="media/kusto-query-set/clean-up-query-set.png" alt-text="Screenshot of Microsoft Fabric workspace showing how to delete a KQL queryset."  lightbox="media/kusto-query-set/clean-up-query-set.png":::

## Next step

> [!div class="nextstepaction"]
> [Customize results in the KQL Queryset results grid](customize-results.md)
