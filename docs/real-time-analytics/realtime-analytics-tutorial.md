---
title: Tutorial- Real-time Analytics tutorial
description: Learn how to get data from Event Hubs, query data, and create a Power BI report.
ms.reviewer: tzgitlin
ms.author: yaschust
author: YaelSchuster
ms.topic: Tutorial
ms.date: 02/12/2023

---

# Tutorial: Real-time Analytics

> [!NOTE]
> In this tutorial we use Event Hubs to demonstrate the capabilities of Real-time Analytics in [!INCLUDE [product-name](../includes/product-name.md)]. Due to the limited number of subscriptions to Event Hubs, the method used will be changed to a pipeline in the next version of this tutorial.

Real-time Analytics is a portfolio of capabilities that provides an end-to-end analytics streaming solution across [!INCLUDE [product-name](../includes/product-name.md)] experiences. It supplies high velocity, low latency data analysis, and is optimized for time-series data, including automatic partitioning and indexing of any data format and structure, such as structured data, semi-structured (JSON), and free text.

Real-time Analytics delivers high performance when it comes to your increasing volume of data. It accommodates datasets as small as a few gigabytes or as large as several petabytes, and allows you to explore data from different sources and a variety of data formats.

You can use Real-time Analytics for a range of solutions, such as IoT analytics and log analytics, and in a number of scenarios including manufacturing operations, oil and gas, automotive, and more.

In this tutorial, you learn how to:

> [!div class="checklist"]
>
> * Create a KQL Database
> * Create a [!INCLUDE [product-name](../includes/product-name.md)] platform-based cloud connection to a specific event hub instance
> * Get data from Azure Event Hubs
> * Check your data with sample queries
> * Save queries as a KQL Queryset
> * Create a Power BI report
> * Create a OneLake shortcut

## Prerequisites

* Power BI Premium subscription. For more information, see [How to purchase Power BI Premium](/power-bi/enterprise/service-admin-premium-purchase).
* An Event Hubs cloud connection
* Workspace

## Create a new database

1. Open the app switchers on the bottom of the navigation pane and select **Real-time Analytics**.

    :::image type="content" source="media/realtime-analytics-tutorial/experience-switcher-rta.png" alt-text="Screenshot of app switcher showing available apps. The Real time Analytics experience is highlighted.":::

1. Select **KQL Database**.

   :::image type="content" source="media/realtime-analytics-tutorial/create-database.png" alt-text="Screenshot of the Real-time Analytics homepage that shows the items that can be created. The item titled KQL Database is highlighted.":::

1. Under **Database name**, enter *rta-tutorial-db*, then select **Create**.

    :::image type="content" source="media/realtime-analytics-tutorial/new-database.png" alt-text="alt text Screenshot of New Database window showing the database name. The Create button is highlighted.":::

The KQL database has now been created within the context of the selected workspace. Next, you'll create a cloud connection in [!INCLUDE [product-name](../includes/product-name.md)].

## Connect the cloud connection to your Real-time Analytics database

In the following step, you'll create a data connection in your database. This connects a table in your database to the Event Hubs cloud connection that you created. The connection allows you to use your event hub and stream data from the [Wide World Importers (WWI) sample database](/sql/samples/wide-world-importers-what-is?view=sql-server-ver16) into the target table using a specified data mapping.

### Get data from Event Hubs

1. Navigate to your KQL Database.

    :::image type="content" source="media/realtime-analytics-tutorial/database-empty-state.png" alt-text="Screenshot of the Database landing page showing the empty state without data.":::

1. Select **Get Data** > **Event Hubs**.

    :::image type="content" source="media/realtime-analytics-tutorial/get-data-eh.png" alt-text="Screenshot of the Get data dropdown. The option titled Event Hubs is highlighted.":::

### Destination tab

In the **Destination** tab, **Database** is auto-populated with the name of the selected database.

1. Under **Table**, make sure that **New table** is selected, and enter *Telemetry* as your table name. You can use alphanumeric characters and underscores. Spaces, special characters, and hyphens aren't supported.

    :::image type="content" source="media/realtime-analytics-tutorial/table-name.png" alt-text="Screenshot of Destination window showing the table name.":::

1. Select **Next: Source**.

### Source tab

In the **Source** tab, **Source type** is auto-populated with **Event Hubs**.

:::image type="content" source="media/realtime-analytics-tutorial/source-tab.png" alt-text="Screenshot of the source tab showing the source details.":::

1. Fill out the remaining fields according to the following table:
  
    |**Setting** | **Suggested value** | **Field description**|
    |---|---|---|
    | Event hub data source | *daily-mh-eh-data-connection* | The name that identifies your Event Hubs cloud connection. |
    | Data connection name | *rta-tutorial-db-daily-mh-eh-data-con* | This defines the name of the database-specific Real-time Analytics Event Hubs Data Connection.|
    | Consumer group | *hptutorial* | The consumer group defined in your event hub. For more information, see [consumer groups](/azure/event-hubs/event-hubs-features#consumer-groups)
    | Compression | *None* | Data compression of the events, as coming from the event hub. Options are None (default), or GZip compression.
    | Event system properties |Leave blank | For more information, see [event hub system properties](/azure/service-bus-messaging/service-bus-amqp-protocol-guide#message-annotations). If there are multiple records per event message, the system properties will be added to the first one. See [event system properties](#event-system-properties).|
    |Event retrieval start date| Leave blank | The data connection retrieves existing Event hub events created since the Event retrieval start date. It can only retrieve events retained by the Event hub, based on its retention period. Note that the time zone is UTC. If no time is specified, the default time is the time at which the data connection is created. |

1. Select **Next: Schema**.

### Schema tab

The tool automatically infers the schema based on your data.
:::image type="content" source="media/realtime-analytics-tutorial/schema-tab.png" alt-text="Screenshot of Schema tab showing the schema mapping. The data format, nested levels, and a column titled active tags are highlighted.":::

1. Your data format and compression are automatically identified in the left-hand pane. In **Data format**, select **JSON**. This will automatically refresh the partial data preview.
1. Under **Nested levels**, change the level from 1 to 2. If your data format is of type JSON, you must also expand the levels of nested data to determine the table column data division.
1. Under **Partial data preview**, search for the column titled **telemetry_ActiveTags**, and from the dropdown menu select **Update column** to edit the column name.
1. In **Column name**, change the name to **ActiveTags** and select **Update**. The change is reflected in the partial data preview and the table mapping.

    > [!NOTE]
    > If the data you see in the preview window isn't complete, you may need more data to create a table with all necessary data fields. Use the following commands to fetch new data from your event hub:
    >
    > * **Discard and fetch new data**: discards the data presented and searches for new events.
    > * **Fetch more data**: Searches for more events in addition to the events already found.

1. Select **Next: Summary**.

### Summary tab

In the **Continuous ingestion from Event Hubs established** window, all steps will be marked with green check marks when the data connection is successfully created. The data from Event Hubs will begin streaming automatically into your table.

Now that you've got data in your database, you're going to check your data with sample queries.

:::image type="content" source="media/realtime-analytics-tutorial/summary-tab.png" alt-text="Screenshot of the Summary tab.":::

## Query data

 In the following step, you'll use the advanced data analysis capabilities of Kusto Query language to query your telemetry data and find out [TODO - add based on scenario].

<!--TODO- based on scenario- Now we're going to use queries to do xyz which will show us abc.
Recall that in our scenario that  blah blah blah. you're going to use a series of queries to find out XX

Let's say you're an importer working for WWI who wants to sell a variety of edible novelties such as chilly chocolates. The company previously didn't have to handle chilled items. Now, to meet food handling requirements, they must monitor the temperature in their chiller room and any of their trucks that have chiller sections.-->

<!-- Let's say you want to create a timechart of the average temperature over time for one of the devices. -->

1. Select **Check your data** on the right-hand side of your database-editor.

    :::image type="content" source="media/realtime-analytics-tutorial/check-data.png" alt-text="Screenshot of the Check your data button.":::

    [TODO based on scenario.]
<!-- Recall that in our scenario, you've come across a new dataset that contains information about xyz. Let's take a look at the data itself. 
1. Run the following query to count the number of records in your data.
    ```kusto
    Telemetry 
    | count
    ```
1. To find a device ID that starts with "x", paste the following query in your query editor and select **Run**.  

    ```kusto
    Telemetry
    | where deviceId startswith "x"
    | summarize count () by deviceId
    ```

1. Copy a device ID from the results and run it in the following query:

    ```kusto
    Telemetry 
    | where deviceId == "<specify deviceId from your data>" 
    | summarize avg(telemetry_Temp) by bin(enqueuedTime, 10m) 
    | render timechart 

    ```

    The rendering of your chart depends on the device ID that you select. For 'xp161da8', the chart will be rendered as follows:

    :::image type="content" source="media/realtime-analytics-tutorial/timechart-render.png" alt-text="Screenshot of Quick query window showing the results of the query.":::

1. Write a query to detect anomalies in the temperature reported by a certain device over the last 7 days.

    ```kusto
    Telemetry 
    | where enqueuedTime >= ago(7d) 
    | where deviceId == "e19jdw3l" 
    | where telemetry_TransportationMode == "Air" 
    | make-series avg_temperature = avg(telemetry_Temp) on enqueuedTime from datetime(2023-02-02) to now() step 5m by telemetry_TransportationMode 
    | extend anomalies = series_decompose_anomalies(avg_temperature) 
    | render anomalychart with (anomalycolumns=anomalies)

    ```

    The red dots in the chart indicate anomalies in the reported temperature.

    > [!NOTE]
    > The pictured chart might render differently than yours. -->

1. Select **Save as Queryset**.
1. Under **KQL Queryset name**, enter *rtaQS*, then select **Create**.

    :::image type="content" source="media/realtime-analytics-tutorial/rta-qs.png" alt-text="Screenshot of Save as Queryset window showing the Queryset name.":::

    This will automatically open your **KQL Queryset** with the queries that you wrote in the query editor.

Now that you've created your Queryset, you can proceed to build a Power BI report and visualize your data.

## Build Power BI report

A Power BI report is a multi-perspective view into a dataset, with visuals that represent findings and insights from that dataset.

1. In your Queryset, select the query you want to build into a Power BI report. The output of this query will be used as the dataset for building the Power BI report.
1. Select **Build Power BI report**.

    :::image type="content" source="media/realtime-analytics-tutorial/build-pbi-report-qs.png" alt-text="Screenshot of the KQL Queryset showing the saved query. The Home tab option titled Build Power BI report is highlighted.":::

    In the report's preview, you'll see a summary of your query, and query results visualized in tiles on your canvas. You can manipulate the visualizations in the **Your data** pane on the right. For more information, see [Power BI visualizations](/power-bi/visuals/power-bi-report-visualizations).

    >[!NOTE]
    > When you build a report, a dataset is created and saved in your workspace. You can create multiple reports from a single dataset.
    >
    > If you delete the dataset, your reports will also be removed.

1. Review the visualizations, then select **Save**.
1. Under **Name your file in Power BI**, enter *rta-pbi-report*.
1. Select the workspace in which you want to save this report. The report can be saved to a different workspace than the one you started in.
1. Select the sensitivity label to apply to the report. For more information, see [sensitivity labels](/power-bi/enterprise/service-security-apply-data-sensitivity-labels).
1. Select **Continue**.

    :::image type="content" source="media/realtime-analytics-tutorial/report-details.png" alt-text="Screenshot of report details showing the report's details. The button titled Continue is highlighted.":::

1. Select **Open the file in Power BI to view, edit, and get a shareable link** to view and edit your report.

    :::image type="content" source="media/realtime-analytics-tutorial/open-report.png" alt-text="Screenshot of report preview showing that the report has been saved. The link to open the report in Power BI is highlighted.":::

## Create OneLake shortcut

Now that you've finished exploring your data, you may want to access the underlying data from other [!INCLUDE [product-name](../includes/product-name.md)] experiences.

OneLake is a single, unified, logical data lake for [!INCLUDE [product-name](../includes/product-name.md)] to store lakehouses, warehouses and other items. Shortcuts are embedded references within OneLake that point to other files’ store locations.  The embedded reference makes it appear as though the files and folders are stored locally but in reality; they exist in another storage location. Once you create a shortcut, you can access your data in all of [!INCLUDE [product-name](../includes/product-name.md)]'s experiences. Shortcuts can be updated or removed from your items, but these changes won't affect the original data and its source.

1. Select **Create** in the **Navigation pane**.

    :::image type="content" source="media/realtime-analytics-tutorial/navigation-pane.png" alt-text="Screenshot of the Navigation pane. The option titled Create is highlighted.":::

1. Under **Data engineering**, select **Lakehouse**.

    :::image type="content" source="media/realtime-analytics-tutorial/create-lakehouse.png" alt-text="Screenshot of Data engineering items. The item titled Lakehouse is highlighted.":::

1. Enter *rtatutorial* as your Lakehouse name, then select **Create**.

:::image type="content" source="media/realtime-analytics-tutorial/lakehouse-name.png" alt-text="Screenshot of new Lakehouse window showing the Lakehouse name.":::

1. Select **New Shortcut** on the right-hand side of the Lakehouse.

:::image type="content" source="media/realtime-analytics-tutorial/load-lakehouse.png" alt-text="Screenshot of empty Lakehouse. The option titled New shortcut is highlighted.":::

1. Under **Internal sources**, select **OneLake**.

    :::image type="content" source="media/realtime-analytics-tutorial/new-shortcut.png" alt-text="Screenshot of New Shortcut window. The option under Internal sources titled OneLake is highlighted.":::

1. In **Select a data source type**, select *rta-tutorial-db*, then select **Next** to connect the data to your shortcut.

    :::image type="content" source="media/realtime-analytics-tutorial/onelake-shortcut-data-source.png" alt-text="Screenshot of data source type window showing all of the data sources in your workspace.":::

1. To connect the table with the data from Event Hubs, select **>** to expand the tables in the left-hand pane, then select the table titled **Telemetry**.

    :::image type="content" source="media/realtime-analytics-tutorial/shortcut-data-connection.png" alt-text="Screenshot of New shortcut window showing the tables in the selected database. The table titled Telemetry is highlighted.":::

1. Select **Create** to create the shortcut. The Lakehouse will automatically refresh.

The Lakehouse shortcut has been created. You now have one logical copy of your data that you can use in other [!INCLUDE [product-name](../includes/product-name.md)] experiences without additional management.

## Clean up resources

Clean up the items you created in this tutorial by navigating to the workspace in which they were created.

Hover over the following items individually, then select the **More menu** > **Delete**. You can't recover deleted items.

:::image type="content" source="media/realtime-analytics-tutorial/cleanup-resources.png" alt-text="Screenshot of workspace showing the dropdown menu of the Event Hubs connection. The option titled Delete is highlighted.":::

|**Item**  |**Name** |**Description**  |
|---------|---------|---------|
|Real-time Analytics Event Hubs cloud connection| *rta-tutorial-db-daily-mh-eh-data-con*|  The data in your table will also be deleted. To get data from this Event Hubs,, you'll need to [reconnect the Event Hubs cloud connection to your Real-time Analytics database](#connect-the-cloud-connection-to-your-real-time-analytics-database) |
|KQL Database| *rta-tutorial-db* | Deleting the database will remove the cloud connection    |
|KQL Queryset| *rtaQS* | The queries you saved will be removed. Deleting the KQL Queryset won't delete the data from your database |
|Power BI report|*rta-pbi-report* | The dataset that was consequentially created with your report will also be deleted  |
|Lakehouse | *rtatutorial* | Deleting the Lakehouse deletes the OneLake shortcut, and also the warehouse and dataset that were created consequentially |

## See also

[Create reports and dashboards in Power BI](/power-bi/create-reports/).
