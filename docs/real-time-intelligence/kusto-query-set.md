---
title: Query data in a KQL queryset
description: Learn how to use the KQL queryset to query the data in your KQL database in Real-Time Intelligence.
ms.reviewer: tzgitlin
author: shsagir
ms.author: shsagir
ms.topic: how-to
ms.custom:
ms.date: 04/14/2025
ms.search.form: KQL Queryset
---
# Query data in a KQL queryset

In this article, you learn how to use a KQL queryset. The KQL queryset is the item used to run queries, view, and customize query results on data from different data sources, such as Eventhouse, KQL database, and more.

You can also use a KQL queryset to perform cross-service queries with data from an Azure Monitor [Log Analytics workspace](/azure/azure-monitor/logs/data-platform-logs) or from an [Application Insights resource](/azure/azure-monitor/app/app-insights-overview).

The KQL Queryset uses the Kusto Query Language for creating queries, and also supports many SQL functions. For more information about the query language, see [Kusto Query Language overview](/azure/data-explorer/kusto/query/index?context=/fabric/context/context).

## Prerequisites

* A [workspace](../fundamentals/create-workspaces.md) with a Microsoft Fabric-enabled [capacity](../enterprise/licenses.md#capacity)
* A [KQL database](create-database.md) with editing permissions and data, or an Azure Data Explorer [cluster and database](/azure/data-explorer/create-cluster-and-database) with [AllDatabaseAdmin](/azure/data-explorer/manage-cluster-permissions#cluster-level-permissions) permissions.

## Select a data source

Queries run in the context of a data source. You can change the associated data source at any point, and retain the queries saved in the query editor. You can associate your KQL queryset with multiple data sources of different types, including a KQL database, Azure Data Explorer cluster, or Azure Monitor.

Select the tab that corresponds with your desired data source type.

## [Eventhouse / KQL Database](#tab/kql-database)

1. [Open your KQL queryset](create-query-set.md#open-an-existing-kql-queryset).
1. In the **Explorer** pane, under the search bar, open the database switcher :::image type="icon" source="media/kusto-query-set/database-switcher.png" border="false":::, and select **Add data source** > **Eventhouse / KQL Database**.

    :::image type="content" source="media/kusto-query-set/expand-database-menu-1.png" alt-text="Screenshot of the data source menu showing a list of connected data sources.":::

1. In the **OneLake catalog** window that appears, select a KQL database to connect to your KQL queryset, and then select **Connect**. Alternatively, close the **OneLake data hub** window and use the **+ Add data source** menu to connect to a different data source.

## [Azure Data Explorer](#tab/azure-data-explorer-cluster)

1. [Open your KQL queryset](create-query-set.md#open-an-existing-kql-queryset).
1. In the **Explorer** pane, under the search bar, open the database switcher :::image type="icon" source="media/kusto-query-set/database-switcher.png" border="false":::, and select **Add data source** > **Azure Data Explorer**.

    :::image type="content" source="media/kusto-query-set/expand-database-menu-2.png" alt-text="Screenshot of the data source menu showing a list of connected databases.":::

1. Under **Connection URI**, enter the cluster URI.

    To find the connection URI, go to your cluster resource in the [Azure portal](https://portal.azure.com/#home). The connection URI is the URI found in the Overview. To add a free sample cluster, specify "help" as the **Connection URI**.

    :::image type="content" source="media/kusto-query-set/connect-to-cluster.png" alt-text="Screenshot of the connection window showing an Azure Data Explorer cluster URI. The Connect cluster button is highlighted.":::

1. Under **Database**, expand the list and select a data source.
1. Select **Connect**.

## [Azure Monitor](#tab/azure-monitor)

1. [Open your KQL queryset](create-query-set.md#open-an-existing-kql-queryset).
1. In the **Explorer** pane, under the search bar, open the database switcher :::image type="icon" source="media/kusto-query-set/database-switcher.png" border="false":::, and select **Add data source** > **Azure Monitor** > **Application Insights** or **Log Analytics**.

    :::image type="content" source="media/kusto-query-set/expand-database-menu-3.png" alt-text="Screenshot of the data source menu showing a list of connected data sources.":::

1. Enter your connection details.

    :::image type="content" source="media/kusto-query-set/connect-to-monitor.png" alt-text="Screenshot of the connection window showing an Azure Monitor URI. The Connect cluster button is highlighted.":::

    | In the following descriptions, replace \<SubscriptionID\>, \<WorkspaceName\> and \<ResourceGroupName\> with your own values.

    | **Setting** | **Field description** |
    |--|--|
    | Connection URI | the URL of the Log Analytics (LA) workspace or Application Insights (AI) resource:</br> - For Log Analytics workspace: `https://ade.loganalytics.io/subscriptions/<SubscriptionID>/resourcegroups/<ResourceGroupName>/providers/microsoft.operationalinsights/workspaces/<WorkspaceName>`</br> - for Application Insights resource: `https://ade.applicationinsights.io/subscriptions/<SubscriptionID>/resourcegroups/<ResourceGroupName>/providers/microsoft.insights/components/<AIAppName>`</br> - to see all data sources in the LA or AI subscription: `<https://ade.applicationinsights.io/subscriptions/<SubscriptionID>` |
    | Database | expand the list and select a data source|

1. Select **Connect**.

----

 A list of tables associated with this data source appears below the data source name.

## Write a query

Now that you're connected to your data source, you can run queries on this data. The KQL Queryset uses the Kusto Query Language (KQL) to query data from any of the data sources you have access to. To learn more about KQL, see [Kusto Query Language overview](/azure/data-explorer/kusto/query/index?context=/fabric/context/context).

The following examples use data that is publicly available at [https://kustosamples.blob.core.windows.net/samplefiles/StormEvents.csv](https://kustosamples.blob.core.windows.net/samplefiles/StormEvents.csv).

1. Write or copy a query in the top pane of the KQL queryset.
1. Select the **Run** button, or press **Shift**+**Enter** to run the query.

    The resulting query output is displayed in the results grid, which appears below the query pane. Notice the green check indicating that the query completed successfully, and the time used to compute the query results.

    :::image type="content" source="media/kusto-query-set/query-window.png" alt-text="Screenshot of the KQL Queryset showing the results of a query. Both the query and the results pane are highlighted."  lightbox="media/kusto-query-set/query-window.png":::

## Interact with data sources

The data source explorer allows you to switch between the data sources connected to the queryset tab that you are in.

At the top of the data source explorer pane, under **Explorer** you can use the search bar to search for a specific data source. You can also use the database switcher below the search bar to expand the data source connections menu. Select the data source you want to use. If the tab name wasn't edited previously, it's automatically named after the data source.

:::image type="content" source="media/kusto-query-set/explorer-pane-switch-db.png" alt-text="Screenshot showing how to switch between data sources using the search bar and Database switcher in the Explorer pane." lightbox="media/kusto-query-set/explorer-pane-switch-db.png":::

The data source explorer pane has two sections. The upper section lists all the items in the data source, and the lower section shows all available data sources in the queryset.

### Items in the data source

The upper section of the data source explorer shows all the items that are included in the data source you're using.

* Tables
* Materialized View
* Shortcuts
* Functions

Select the arrow **>** to the left of the item you want to expand. You can drill down to show more details by selecting the arrow **>** to the left of items in subsequent list levels. For example, under **Tables**, select the arrow **>** to the left of a table to show the list of the columns in that table.

To open the action menu, hover over an item in the expanded list and select the **More menu** [**...**]. The menu shows the following options:

* Refresh database
* View data profile
* Explore data
* Insert: to create and copy a script
* Get data: to add a new data source
* Create a dashboard
* Delete table

Different actions are available for different item types.

:::image type="content" source="media/kusto-query-set/explorer-pane-more-actions.png" alt-text="Screenshot showing the explorer pane, how to expand the list of items in your data source and where to find the More actions menu." lightbox="media/kusto-query-set/explorer-pane-more-actions.png":::

### Available data sources

The lower section of the data source explorer shows all the available data sources that were added to the queryset.

To open the action menu, hover over the data source name and select the **More menu** [**...**]. The menu shows the following options:

* Refresh database
* Use this database: switch to use this data source in the current tab
* Query in a new tab: open this data source in a new tab in the queryset
* Remove source: removes all the databases in that data source
* Remove database: removes the selected database only
* Open in KQL database: opens this data source in a KQL database.

:::image type="content" source="media/kusto-query-set/explorer-pane-lower-section.png" alt-text="Screenshot showing the lower section of the Explorer pane where all data sources that were added to your queryset are listed." lightbox="media/kusto-query-set/explorer-pane-lower-section.png":::

## Manage queryset tabs

Within a KQL queryset, you can create multiple tabs. Each tab can be associated with a different KQL database, and lets you save queries for later use or share with others to collaborate on data exploration. You can also change the KQL database associated with any tab, allowing you to run the same query on data in different databases.

You can manage your tabs in the following ways:

* **Change the existing data source connection**: Under **Explorer** and the search bar, use the database switcher to expand the data source connections menu.
* **Rename a tab**: Next to the tab name, select the **pencil icon**.
* **Add a new tab**: On the right of the existing tabs in the command bar, select the plus **+**. Different tabs can be connected to different data sources.
* **More actions**: On the right side of the command bar, there's a tab menu with more actions to manage the multiple tabs in your queryset.
* **Change tab positions**: Use drag and drop gestures.

:::image type="content" source="media/kusto-query-set/multiple-tabs-menu-1.png" alt-text="Screenshot of the multiple tabs menu for managing multiple tabs in the KQL Queryset." lightbox="media/kusto-query-set/multiple-tabs-menu-1.png":::

## Delete KQL queryset

To delete your KQL queryset:

1. Select the workspace in which your KQL queryset is located.
1. Hover over the KQL queryset you wish to delete. Select **More [...]**, then select **Delete**.

    :::image type="content" source="media/kusto-query-set/clean-up-query-set.png" alt-text="Screenshot of Microsoft Fabric workspace showing how to delete a KQL queryset."  lightbox="media/kusto-query-set/clean-up-query-set.png":::

## Next step

> [!div class="nextstepaction"]
> [Customize results in the KQL Queryset results grid](customize-results.md)
