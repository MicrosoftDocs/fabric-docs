---
title: Tutorial- Real-time Analytics tutorial
description: Learn how to get data from Event Hubs, query data, and create a Power BI report.
ms.reviewer: tzgitlin
ms.author: yaschust
author: YaelSchuster
ms.topic: Tutorial
ms.date: 02/08/2023

---

# Tutorial: Real-time Analytics

Real-time Analytics is a portfolio of capabilities that provides an end-to-end analytics solution across Trident experiences. It supplies high velocity, low latency data analysis, and is optimized for time-series data, including automatic partitioning and indexing of any data format and structure,such as structured data, semi-structured data (JSON), and free text.

Real-time Analytics delivers with high performance when it comes to your increasing data. It accommodates datasets both as small as a few gigabytes or as large as a number of petabytes, and allows you to explore data from different sources and a variety of data formats.

You can use Real-time Analytics for a range of solutions, such as IoT analytics and log analytics, and in a number of scenarios including manufacturing operations, oil and gas, automotive, and more. In this tutorial, you'll stream data from the [Wide World Importers (WWI) sample database](/sql/samples/wide-world-importers-what-is?view=sql-server-ver16). Then you'll use the advanced data analysis capabilities of Kusto Query language to query the telemetry data and find out [TODO - add based on scenario]. Finally, these insights will be displayed in a Power BI report for communicating with others.

In this tutorial, you learn how to:

> [!div class="checklist"]
>
> * Create a KQL Database
> * Create a [!INCLUDE [product-name](../includes/product-name.md)] platform-based cloud connection to a specific event hub instance
> * Get data from Azure Event Hubs
> * Query data in a Quick query
> * Save query as a KQL Queryset
> * Create a Power BI report
> * Create a OneLake shortcut

## Prerequisites

* Power BI Premium subscription. For more information, see [How to purchase Power BI Premium](/power-bi/enterprise/service-admin-premium-purchase).
* Workspace

## Create a new database

1. Open the app switchers on the bottom of the navigation pane and select **Real-time Analytics**.

    :::image type="content" source="media/realtime-analytics-tutorial/app-switcher-kusto.png" alt-text="Screenshot of app switcher showing available apps. The app titled Kusto is highlighted. ":::

1. Select **KQL Database**.

   :::image type="content" source="media/realtime-analytics-tutorial/create-database.png" alt-text="Screenshot of the Real-time Analytics homepage that shows the items that can be created. The item titled KQL Database is highlighted.":::

1. Enter your database name, then select **Create**.

    :::image type="content" source="media/realtime-analytics-tutorial/new-database.png" alt-text="alt text Screenshot of New Database window showing the database name. The Create button is highlighted. ":::

The KQL database has now been created within the context of the selected workspace. Next, you'll get create a cloud connection in [!INCLUDE [product-name](../includes/product-name.md)].

## Create cloud connection

Before you can create a cloud connection in [!INCLUDE [product-name](../includes/product-name.md)], you'll need to set a shared access policy (SAS) on the event hub and collect some information to be used later in setting up the data connection. For more information on authorizing access to Event Hubs resources, see [Shared Access Signatures](/azure/event-hubs/authorize-access-shared-access-signature).

### Set a shared access policy on your event hub

1. In the [Azure portal](https://ms.portal.azure.com/), browse to the specific Event Hubs instance you want to connect.
1. Under **Settings**, select **Shared access policies**
1. Select **+Add** to add a new SAS policy, or select an existing policy with *Manage* permissions.

    :::image type="content" source="media/get-data-event-hub/sas-policy-portal.png" alt-text="Screenshot of creating an SAS policy in the Azure portal.":::

1. Enter a **Policy name**.
1. Select **Manage**, and then **Create**.

### Gather information for the data connection

Within the SAS policy pane, take note of the following four fields. You may want to copy/paste these fields to a note pad for later use.

:::image type="content" source="media/get-data-event-hub/fill-out-connection.png" alt-text="Screenshot showing how to fill out connection with data from Azure portal.":::

| Field reference | Field | Description |Example |
|---|---|---|---|
| a | **Event Hubs instance** | The name of the specific Event Hubs instance | *iotdata*
| b |  **SAS Policy** | The SAS policy name created in the previous step | *DocsTest*
| c |**Primary key** | The key associated with the SAS policy | Starts with *PGGIISb009*...
| d | **Connection string-primary key** | In this field you only want to copy the event hub namespace, which can be found as part of the connection string. | *eventhubpm15910.servicebus.windows.net*

### Create cloud connection

Now that your SAS policy is set up, you can configure a connection to this event hub.

1. On the menu bar, select the settings icon > **Manage connections and gateways**.

    :::image type="content" source="media/get-data-event-hub/manage-connections.png" alt-text="Screenshot of adding a new connection.":::

    The **New connection** pane opens.

1. Fill out the fields according to the following table:
   
    | Field | Description | Suggested value |
    |---|---|---|
    | Icon | Type of connection | Cloud
    | Connection name | rta-tutorial-eh-data-connection
    | Connection type | Type of resource to connect to | EventHub
    | Event Hub namespace | Field reference **d** from the above [table](#gather-information-for-the-data-connection). | *eventhubpm15910.servicebus.windows.net*
    | Event Hub | Field reference **a** from the above [table](#gather-information-for-the-data-connection). | *iotdata*
    | Consumer Group | User-defined name for the unique stream view. Use a name of an existing consumer group. If the event hub doesn't have a consumer group, use "$Default", which is the Event Hub's default consumer group. For more information, see [consumer groups](/azure/event-hubs/event-hubs-features#consumer-groups).
    | Authentication method | Type of authentication | Basic
    | Username | Field reference **b** from the above [table](#gather-information-for-the-data-connection).  <br><br> The SAS policy name | *DocsTest*
    | Password | Field reference **c** from the above [table](#gather-information-for-the-data-connection). <br><br> The SAS primary key.
    | Privacy level | Privacy levels aren't used in this item. You can use Organizational as a default value. | Organizational

    <!--- :::image type="content" source="media/get-data-event-hub/fill-out-connection-portal.png" alt-text="Screenshot of filling out event hub information in the Azure portal."::: --->

1. Select **Create**.

## Connect the cloud connection to your Real-time Analytics database

In the following step, you'll create a data connection in your  database, which connects a table in your database to the Event Hubs cloud connection that you created. This connection will allow you to use your Event Hubs instance and get data into the specified table using specified data mapping.

### Destination tab

1. Navigate to your KQL Database.

    :::image type="content" source="media/realtime-analytics-tutorial/database-empty-state.png" alt-text="Screenshot of the Database landing page showing the empty state without data.":::

1. Select **Get Data** > **Event Hub**.

    :::image type="content" source="media/realtime-analytics-tutorial/get-data-eh.png" alt-text="Screenshot of the Get data dropdown. The option titled Event Hub is highlighted.":::

1. In **Table**, enter a name for your table. ou can use alphanumeric characters and underscores. Spaces, special characters, and hyphens aren't supported.

    :::image type="content" source="media/realtime-analytics-tutorial/table-name.png" alt-text="Screenshot of Destination window showing the table name.":::

    > [!NOTE]
    > Your selected database is auto-populated in the **Database** field.

1. Select **Next: Source**.

### Source tab

In the source tab, the **Source type** is autopopulated with **Event Hub**

1. Fill out the remaining fields according to the following table:
  
    |**Setting** | **Suggested value** | **Field description**
    |---|---|---|
    | Event hub data source | *rta-tutorial-eh-data-connection* | The name that identifies your event hub cloud connection. |
    | Data connection name | *rta-tutorial-db-rta-tutorial-eh-data-con* | This defines the name of the database-specific Real-time Analytics event hub Data Connection. The default is \<tablename>\<EventHubname>. |
    | Consumer group | **Add consumer group** | The consumer group defined in your event hub. For more information, see [consumer groups](/azure/event-hubs/event-hubs-features#consumer-groups)
    | Compression | *None* | Data compression of the events, as coming from the event hub. Options are None (default), or GZip compression.
    | Event system properties | don't fill | For more information, see [event hub system properties](/azure/service-bus-messaging/service-bus-amqp-protocol-guide#message-annotations). If there are multiple records per event message, the system properties will be added to the first one. See [event system properties](#event-system-properties).|
    |Event retrieval start dat| don't fil | The data connection retrieves existing Event hub events created since the Event retrieval start date. It can only retrieve events retained by the Event hub, based on its retention period. Note that the time zone is UTC. If no time is specified, the default time is the time at which the data connection is created. |

1. Select **Next: Schema**.

### Schema tab

:::image type="content" source="media/realtime-analytics-tutorial/schema-tab.png" alt-text="Screenshot of Schema tab showing the schema mapping. The Data format, Nested levels, and a column titled ActiveTags are highlighted.":::

1. Your data format and compression are automatically identified in the left-hand pane. In **Data format**, select **JSON**. This will automatically refresh the **Partial data preview**.
1. If your data format is JSON, you must also select JSON levels to determine the table column data division. Under **Nested levels**, raise the level from 1 to 2 to expand the levels of nested data in dynamic type columns into separate columns.
1. The tool automatically infers the schema based on your data. You can change the schema to add and edit columns in **Partial data preview**. Find the column titled **telemetry_ActiveTags** and select **V**. Then select **Update column**.
1. In **Column name**, change the name to **ActiveTags** and select **Update**. The change will be reflected in the **Partial data preview** and the **Table mapping**.

    > [!NOTE]
    > If the data you see in the preview window isn't complete, you may need more data to create a table with all necessary data fields. Use the following commands to fetch new data from your Event hub:
    >
    > * **Discard and fetch new data**: discards the data presented and searches for new events.
    > * **Fetch more data**: Searches for more events in addition to the events already found.

1. Select **Next: Summary**.

### Summary tab

In the **Continuous ingestion from Event Hub established** window, all steps will be marked with green check marks when the data connection is successfully created. The data from Event Hub will begin streaming automatically into your table.

Now that you've got data in your database, you're going to learn how to query it using the **Quick query** tool in your database editor.

:::image type="content" source="media/realtime-analytics-tutorial/summary-tab.png" alt-text="Screenshot of the Summary tab.":::

## Query data

TODO- based on scenario- Now we're going to use queries to do xyz which will show us abc.
Recall that in our scenario that  blah blah blah. you're going to use a series of queries to find out XX

Let's say you're an importer working for WWI who wants to sell a variety of edible novelties such as chilly chocolates. The company previously didn't have to handle chilled items. Now, to meet food handling requirements, they must monitor the temperature in their chiller room and any of their trucks that have chiller sections.

<!-- Let's say you want to create a timechart of the average temperature over time for one of the devices. -->

1. Select **Quick query** on the right-hand side of your database-editor.

    :::image type="content" source="media/realtime-analytics-tutorial/quick-query.png" alt-text="Screenshot of the Quick query button.":::

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

1. To save your query as a KQL Queryset, select **Save as Query Set**. This will automatically open your **KQL Queryset** with the queries that you wrote in the query editor.

Now that you've created your Queryset, you can proceed to build a Power BI report.

## Build Power BI report

TODO: Info about PBI report.

1. Select the query you want to build into a Power BI report. The output of this query will be used as the dataset for building the Power BI report.
1. Select **Build Power BI report**.

    :::image type="content" source="media/realtime-analytics-tutorial/build-pbi-report-qs.png" alt-text="Screenshot of the KQL Queryset showing the saved query. The Home tab option titled Build Power BI report is highlighted.":::

    >[!NOTE]
    > When you build a report, a dataset is created and saved in your workspace. You can create multiple reports from a single dataset.
    >
    > If you delete the dataset, your reports will also be removed.

### Report preview

In the report's preview, you'll see a summary of your query, and query results visualized in tiles on your canvas. You can manipulate the visualizations in the **Your data** pane on the right. For more information, see [Power BI visualizations](/power-bi/visuals/power-bi-report-visualizations).

When you're satisfied with the visualizations, select **Save** to name and save your report in a workspace.

### Report details

1. In **Name your file in Power BI**, give your file a name.
1. Select the workspace in which to save this report. The report can be a different workspace than the one you started in.

    :::image type="content" source="media/realtime-analytics-tutorial/report-details.png" alt-text="Screenshot of report details showing the report's name and the workspace it will be saved in. The button titled Continue is highlighted.":::
1. Select the sensitivity label to apply to the report. For more information, see [sensitivity labels](/power-bi/enterprise/service-security-apply-data-sensitivity-labels).
1. Select **Continue**.

### Manage report

To view and edit your report, select **Open the file in Power BI to view, edit, and get a shareable link**.

:::image type="content" source="media/realtime-analytics-tutorial/open-report.png" alt-text="Screenshort of report preview showing that the report has been saved. The link to open the report in Power BI is highlighted.":::

## Create OneLake shortcut

You can use shortcuts to quickly pull data from internal and external locations into your Lakehouse, Warehouse, or datasets. Shortcuts can be updated or removed from your item, but these changes will not affect the original data and its source.

1. Select the **Create** button in the **Navigation pane**.

    :::image type="content" source="media/realtime-analytics-tutorial/navigation-pane.png" alt-text="Screenshot of the Navigation pane. The option titled Create is highlighted.":::

1. Under **Data engineering**, select **Lakehouse**.

    :::image type="content" source="media/realtime-analytics-tutorial/create-lakehouse.png" alt-text="Screenshot of Data engineering items. The item titled Lakehouse is highlighted.":::

1. Enter your Lakehouse name, then select **Create**.
1. Select **New Shortcut** on the right-hand side of the Lakehouse.
1. Under **Internal sources**, select OneLake.

    :::image type="content" source="media/realtime-analytics-tutorial/new-shortcut.png" alt-text="Screenshot of New Shortcut window. The option under Internal sources titled OneLake is highlighted.":::

1. In **Select a data source type**, select the KQL Database with the Event Hub data source type you created earlier.

    :::image type="content" source="media/realtime-analytics-tutorial/onelake-shortcut-data-source.png" alt-text="Screenshot of data source type window showing all of the data sources in your workspace.":::

1. Select **Next** to find the data you want to use with your shortcut.
1. To connect the table with the data from Event Hub, select **>** to expand the tables in the left-hand pane, then select the table titled **Telemetry**.

    :::image type="content" source="media/realtime-analytics-tutorial/shortcut-data-connection.png" alt-text="Screenshot of New shortcut window showing the tables in the selected database. The table titled Telemetry is highlighted.":::
1. Select **Create** to create the shortcut. The Lakehouse will automatically refresh.

    The Lakehouse shortcut has been created. You can now use this data in other environments without returning to Real-time Analytics.

## Clean up resources

Clean up the items created by navigating to the workspace in which they were created.

1. In your workspace, hover over the item you want to delete, select the **More menu** > **Delete**.

   :::image type="content" source="media/realtime-analytics-tutorial/cleanup-resources.png" alt-text="Screenshot of workspace showing the dropdown menu of the Event Hub connection. The option titled Delete is highlighted.":::

1. Select **Delete**. You can't recover the item once you delete it.

## See also

[Create reports and dashboards in Power BI](/power-bi/create-reports/).
