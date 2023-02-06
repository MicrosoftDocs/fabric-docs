---
title: Tutorial- Query data from Event Hubs 
description: Learn how to ingest data from Event Hubs and query it using a KQL Queryset.
ms.reviewer: tzgitlin
ms.author: yaschust
author: YaelSchuster
ms.topic: Tutorial
ms.date: 02/05/2023

---

# Tutorial: Query data from Event Hubs

Real-time Analytics is a fully managed, high-performance, big data analytics platform that makes it easy to analyze high volumes of data in near real time. The Real-time Analytics toolbox gives you an end-to-end solution for data ingestion, query, visualization, and management.
By analyzing structured, semi-structured, and unstructured data across time series, and by using Machine Learning, Real-time Analytics makes it simple to extract key insights, spot patterns and trends, and create forecasting models. Real-time Analytics is scalable, secure, robust, and enterprise-ready, and is useful for log analytics, time series analytics, IoT, and general-purpose exploratory analytics.

In this tutorial, you learn how to:

> [!div class="checklist"]
>
> * Create a KQL Database.
> * Create a [!INCLUDE [product-name](../includes/product-name.md)] platform-based cloud connection to a specific event hub instance.
> * Get data from Azure Event Hubs.
> * Query data in a Quick query.
> * Save query in a KQL Queryset.

## Prerequisites

* Power BI Premium subscription. For more information, see [How to purchase Power BI Premium](/power-bi/enterprise/service-admin-premium-purchase).
* Workspace

### Create a new database

1. Open the app switchers on the bottom of the navigation pane and select **Real-time Analytics**.

    :::image type="content" source="media/realtime-analytics-tutorial/app-switcher-kusto.png" alt-text="Screenshot of app switcher showing available apps. The app titled Kusto is highlighted. ":::

1. Select **New** > **Kusto Database**.

   :::image type="content" source="media/realtime-analytics-tutorial/create-database.png" alt-text="Screenshot of Kusto workspace that shows the dropdown menu of the ribbon button titled New. Both the entry titled KQL Database are highlighted.":::

1. Enter your database name, then select **Create**.

:::image type="content" source="media/realtime-analytics-tutorial/new-database.png" alt-text="alt text Screenshot of New Database window showing the database name. The Create button is highlighted. ":::

The KQL database has now been created within the context of the selected workspace. Next, you'll get data from Azure Event Hubs.

## Get data from Azure Event Hubs

To get data from Event Hubs, you'll need to create a cloud connection.

### Destination tab

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

:::image type="content" source="media/realtime-analytics-tutorial/schema-tab.png" alt-text="Screensht of Schema tab showing the sshema mapping. The Data format, Nested levels, and a column titled ActiveTags are highlighted.":::

1. In **Data format**, select **JSON**. This will automatically refresh the **Partial data preview**.
1. Under **Nested levels**, raise the level from 1 to 2 to expand the levels of nested data in dynamic type columns into separate columns.
1. In **Partial data preview**, find the column titled **telemetry_ActiveTags** then select **V** > **Update column**.
1. In **Column name**, change the name to **ActiveTags** and select **Update**. The change will be reflected in the **Partial data preview** and the **Table mapping**.
1. Select **Next: Summary**.

### Summary tab

In the **Continuous ingestion from Event Hub established** window, all steps will be marked with green check marks when data ingestion finishes successfully.

Now that you've ingested your data, you're going to learn how to query it using the Quick query tool in your database editor.

:::image type="content" source="media/realtime-analytics-tutorial/summary-tab.png" alt-text="Screenshot of the Summary tab.":::

## Query data

Let's say you want to create a timechart of the average temperature over time for one of the devices.

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

1. To save your query as a KQL Queryset, select **Save as Query Set**.

## Clean up resources

Clean up the items created by navigating to the workspace in which they were created.

1. In your workspace, hover over the data connection you want to delete, select the **More menu** > **Delete**.

   :::image type="content" source="media/realtime-analytics-tutorial/cleanup-resources.png" alt-text="Screenshot of workspace showing the dropdown menu of the Event Hub connection. The option titled Delete is highlighted.":::

1. Select **Delete**. You can't recover the connection once you delete it. You'll have to reestablish the connection.

## See also

[Visualize data in a Power BI report](create-powerbi-report.md)
