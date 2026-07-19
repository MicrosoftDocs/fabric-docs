---
title: Query data in a KQL queryset
description: Learn how to use the KQL queryset to query the data in your KQL database in Real-Time Intelligence.
ms.reviewer: tzgitlin
ms.topic: how-to
ai-usage: ai-assisted
ms.date: 06/09/2026
ms.subservice: rti-kql-query
ms.search.form: KQL Queryset

#customer intent: As a Fabric user, I want to query data using a KQL queryset so that I can analyze data from different sources like Eventhouse, Azure Data Explorer, and Azure Monitor.

---
# Query data in a KQL queryset

In this article, you learn how to use a KQL queryset. A KQL queryset lets you run queries, view results, and customize query results for data from different sources, such as an eventhouse or a KQL database.

You can also use a KQL queryset to run cross-service queries against an Azure Monitor [Log Analytics workspace](/azure/azure-monitor/logs/data-platform-logs) or an [Application Insights resource](/azure/azure-monitor/app/app-insights-overview).

KQL queryset uses Kusto Query Language (KQL) to create queries and also supports many SQL functions. For more information about the query language, see [Kusto Query Language overview](/azure/data-explorer/kusto/query/index?context=/fabric/context/context).

## Prerequisites

* A [workspace](../fundamentals/create-workspaces.md) with a Microsoft Fabric-enabled [capacity](../enterprise/licenses.md#capacity).
* A [KQL database](create-database.md) with editing permissions and data, or an Azure Data Explorer [cluster and database](/azure/data-explorer/create-cluster-and-database) with [AllDatabaseAdmin](/azure/data-explorer/manage-cluster-permissions#cluster-level-permissions) permissions.

## Select a data source

Queries run in the context of a data source. You can change the associated data source at any time and keep the queries saved in the query editor. You can associate your KQL queryset with multiple data source types, including a KQL database, an Azure Data Explorer cluster, or Azure Monitor.

Select the tab for your data source type.

## [Eventhouse / KQL Database](#tab/kql-database)

1. [Open your KQL queryset](create-query-set.md#open-an-existing-kql-queryset).

1. In the **Explorer** pane, under the search bar, open the database switcher :::image type="icon" source="media/kusto-query-set/database-switcher.png" border="false"::: and select **Add data source** > **Eventhouse / KQL Database**.

    :::image type="content" source="media/kusto-query-set/expand-database-menu-kql.png" alt-text="Screenshot of the data source menu showing a list of connected data sources.":::

1. In the **OneLake catalog** window, select a KQL database to connect to your KQL queryset, and then select **Connect**.

    Alternatively, close the **OneLake catalog** window and use the **+ Add data source** menu to connect to a different data source.

## [Azure Data Explorer](#tab/azure-data-explorer-cluster)

1. [Open your KQL queryset](create-query-set.md#open-an-existing-kql-queryset).

1. In the **Explorer** pane, under the search bar, open the database switcher :::image type="icon" source="media/kusto-query-set/database-switcher.png" border="false"::: and select **Add data source** > **Azure Data Explorer**.

    :::image type="content" source="media/kusto-query-set/expand-database-menu-adx.png" alt-text="Screenshot of the data source menu showing a list of connected databases.":::

1. Under **Connection URI**, enter the cluster URI.

    To find the connection URI, go to your cluster resource in the [Azure portal](https://portal.azure.com/#home). The connection URI is listed on the **Overview** page.

    :::image type="content" source="media/kusto-query-set/connect-to-cluster.png" alt-text="Screenshot of the connection window showing an Azure Data Explorer cluster URI. The Connect button is highlighted.":::

    To add a free sample cluster, specify "help" as the **Connection URI**.

    :::image type="content" source="media/kusto-query-set/connect-to-help.png" alt-text="Screenshot of the connection window showing help as the connection URI. The Connect button is highlighted.":::

1. Under **Database**, expand the list and select a data source.

1. Select **Connect**.

## [Azure Monitor](#tab/azure-monitor)

1. [Open your KQL queryset](create-query-set.md#open-an-existing-kql-queryset).

1. In the **Explorer** pane, under the search bar, open the database switcher :::image type="icon" source="media/kusto-query-set/database-switcher.png" border="false"::: and select **Add data source** > **Azure Monitor** > **Application Insights** or **Log Analytics**.

    :::image type="content" source="media/kusto-query-set/expand-database-menu-azure-monitor.png" alt-text="Screenshot of the data source menu showing a list of connected data sources.":::

1. Enter your connection parameters or a full connection URI:

    :::image type="content" source="media/kusto-query-set/connect-to-monitor.png" alt-text="Screenshot of the connection window showing an Azure Monitor URI. The Connect cluster button is highlighted.":::

    **To enter your connection parameters**:

    1. Enter your **Subscription ID**. Find it in the Azure portal by selecting **Subscriptions** > your subscription name, and then copy the subscription ID from the resource **Overview** page.

    1. Select the **Resource Group** from the drop-down list. Select the resource group that contains your Application Insights or Log Analytics resource.

    1. Enter the Log Analytics **Workspace Name** or the **Application Insights resource name**. Find the name in the Azure portal by opening the resource.

    1. Select the **Application Insights** or **Log Analytics** resource from the drop-down list. This list is populated with the resources in the selected resource group.

    **To enter a full connection URI**:

    1. Select **Connection URI** and enter your connection URI in one of these formats:

    > [!NOTE]
    > Replace `<subscription-id>`, `<resource-group-name>`, and `<ai-app-name>` with your own values.

    For Log Analytics: `https://ade.loganalytics.io/subscriptions/<subscription-id>/resourcegroups/<resource-group-name>/providers/microsoft.operationalinsights/workspaces/<workspace-name>`

    For Application Insights: `https://ade.applicationinsights.io/subscriptions/<subscription-id>/resourcegroups/<resource-group-name>/providers/microsoft.insights/components/<ai-app-name>`

1. Select a **Database**. Expand the list and select a database.

1. Select **Connect**.

---

A list of tables associated with this data source appears below the data source name.

## Write a query

Now that you're connected to a data source, you can run queries against it. KQL queryset uses Kusto Query Language (KQL) to query data from any connected data source that you can access. To learn more about KQL, see [Kusto Query Language overview](/azure/data-explorer/kusto/query/index?context=/fabric/context/context).

The following examples use the public [StormEvents.csv sample file](https://kustosamples.blob.core.windows.net/samplefiles/StormEvents.csv).

1. Write or copy a query in the top pane of the KQL queryset.

1. Select the **Run** button, or press <kbd>Shift</kbd>+<kbd>Enter</kbd> to run the query.

    The query results appear in the results grid below the query pane. Notice the green check indicating that the query completed successfully, and the time used to compute the query results.

    :::image type="content" source="media/kusto-query-set/query-window.png" alt-text="Screenshot of the KQL queryset showing the results of a query. Both the query and the results pane are highlighted."  lightbox="media/kusto-query-set/query-window.png":::

> [!NOTE]
> You can also use Copilot to help you write queries. For more information, see [Copilot for writing queries in KQL queryset](copilot-writing-queries.md).

## Interact with data sources

The data source explorer lets you switch between the data sources connected to the current queryset tab.

At the top of the data source explorer pane, under **Explorer**, you can use the search bar to search for a specific data source. You can also use the database switcher below the search bar to expand the data source connections menu. Select the data source that you want to use. If you didn't rename the tab earlier, it's automatically named after the data source.

:::image type="content" source="media/kusto-query-set/explorer-pane-switch-db.png" alt-text="Screenshot showing how to switch between data sources using the search bar and Database switcher in the Explorer pane." lightbox="media/kusto-query-set/explorer-pane-switch-db.png":::

The data source explorer pane has two sections. The upper section lists all items in the data source, and the lower section shows all available data sources in the queryset.

### View items in the data source

The upper section of the data source explorer shows all items in the data source that you're using.

* Tables
* Materialized Views
* Shortcuts
* Functions

Select the arrow **>** to the left of the item that you want to expand. You can drill down to show more details by selecting the arrow **>** to the left of items in subsequent list levels. For example, under **Tables**, select the arrow **>** to the left of a table to show the list of columns in that table.

To open the action menu, hover over an item in the expanded list and select the **More menu** [**...**]. The menu includes the following options:

* Refresh database
* View data profile
* Explore data
* Insert: to create and copy a script
* Get data: to add a new data source
* Create a dashboard
* Delete table

Different actions are available for different item types.

:::image type="content" source="media/kusto-query-set/explorer-pane-more-actions.png" alt-text="Screenshot showing the explorer pane, how to expand the list of items in your data source and where to find the More actions menu." lightbox="media/kusto-query-set/explorer-pane-more-actions.png":::

### Browse available data sources

The lower section of the data source explorer shows all the available data sources that you add to the queryset.

To open the action menu, hover over the data source name and select the **More menu** [**...**]. The menu includes the following options:

* Refresh database
* Use this database: switch to use this data source in the current tab
* Query in a new tab: open this data source in a new tab in the queryset
* Remove source: removes all the databases in that data source
* Remove database: removes the selected database only
* Open in KQL database: opens this data source in a KQL database.

:::image type="content" source="media/kusto-query-set/explorer-pane-lower-section.png" alt-text="Screenshot showing the lower section of the Explorer pane where all data sources that were added to your queryset are listed." lightbox="media/kusto-query-set/explorer-pane-lower-section.png":::

## Manage queryset tabs

Within a KQL queryset, you can create multiple tabs. Each tab can be associated with a different KQL database. This setup lets you save queries for later use or share them with others to collaborate on data exploration. You can also change the KQL database associated with any tab, which lets you run the same query on data in different databases.

You can manage your tabs in the following ways:

* **Change the existing data source connection**: Under **Explorer** and the search bar, use the database switcher to expand the data source connections menu.
* **Rename a tab**: Next to the tab name, select the **pencil icon**.
* **Add a new tab**: On the right of the existing tabs in the command bar, select the plus **+**. Different tabs can be connected to different data sources.
* **More actions**: On the right side of the command bar, use the tab menu to manage multiple tabs in your queryset.
* **Change tab positions**: Use drag and drop gestures.

:::image type="content" source="media/kusto-query-set/multiple-tabs-menu-1.png" alt-text="Screenshot of the multiple tabs menu for managing multiple tabs in the KQL queryset." lightbox="media/kusto-query-set/multiple-tabs-menu-1.png":::

## Delete a KQL queryset

To delete your KQL queryset:

1. Select the workspace that contains your KQL queryset.
1. Hover over the KQL queryset that you want to delete. Select **More** [**...**], and then select **Delete**.

    :::image type="content" source="media/kusto-query-set/clean-up-query-set.png" alt-text="Screenshot of Microsoft Fabric workspace showing how to delete a KQL queryset."  lightbox="media/kusto-query-set/clean-up-query-set.png":::

## Next step

> [!div class="nextstepaction"]
> [Customize results in the KQL queryset results grid](customize-results.md)
