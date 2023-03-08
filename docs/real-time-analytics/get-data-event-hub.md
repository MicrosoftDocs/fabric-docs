---
title: Use an event hub connection to stream data to your KQL Database in Real-time Analytics
description: Learn how to create a connection to Event Hubs and get data into your KQL Database.
ms.reviewer: guregini
ms.author: yaschust
author: YaelSchuster
ms.topic: how-to
ms.date: 01/10/2023
ms.search.form: product-kusto
---
# Get data from Azure Event Hubs

In this article, you'll learn how to get data from event hub into your Kusto database in [!INCLUDE [product-name](../includes/product-name.md)]. [Azure Event Hubs](/azure/event-hubs/event-hubs-about) is a big data streaming platform and event ingestion service that can process and direct millions of events per second.

To stream data from Azure Event Hubs into Kusto, you'll go through two main steps. The first step is to create a [!INCLUDE [product-name](../includes/product-name.md)] platform-based cloud connection to a specific event hub instance. This data connection can be used across all [!INCLUDE [product-name](../includes/product-name.md)] workspaces and is managed centrally.

In the second step, you'll connect this [!INCLUDE [product-name](../includes/product-name.md)]-based cloud connection to a Kusto database. This process creates a database-specific Kusto Event Hub Data Connection. The connection will stream data into the table you specified during setup, and the data will then be available to query using the KQL queryset.

## Prerequisites

* An Azure subscription. [Create a free Azure account](https://azure.microsoft.com/free/)
* [An Event Hubs instance](/azure/event-hubs/event-hubs-create)
* A Power BI premium subscription
* A [!INCLUDE [product-name](../includes/product-name.md)] workspace and [Kusto database](create-database.md)

## Set a shared access policy on your event hub

Before you can create a cloud connection in [!INCLUDE [product-name](../includes/product-name.md)], you'll need to set a shared access policy (SAS) on the event hub and collect some information to be used later in setting up the data connection. For more information on authorizing access to Event Hubs resources, see [Shared Access Signatures](/azure/event-hubs/authorize-access-shared-access-signature).

1. In the [Azure portal](https://ms.portal.azure.com/), browse to the specific Event Hubs instance you want to connect.
1. Under **Settings**, select **Shared access policies**
1. Select **+Add** to add a new SAS policy, or select an existing policy with *Manage* permissions.

    :::image type="content" source="media/get-data-event-hub/sas-policy-portal.png" alt-text="Screenshot of creating an SAS policy in the Azure portal.":::

1. Enter a **Policy name**.
1. Select **Manage**, and then **Create**.

## Gather information for the data connection

Within the SAS policy pane, take note of the following four fields. You may want to copy/paste these fields to a note pad for later use.

:::image type="content" source="media/get-data-event-hub/fill-out-connection.png" alt-text="Screenshot showing how to fill out connection with data from Azure portal.":::

| Field reference | Field | Description |Example |
|---|---|---|---|
| a | **Event Hubs instance** | The name of the specific Event Hubs instance | *iotdata*
| b |  **SAS Policy** | The SAS policy name created in the previous step | *DocsTest*
| c |**Primary key** | The key associated with the SAS policy | Starts with *PGGIISb009*...
| d | **Connection string-primary key** | In this field you only want to copy the event hub namespace, which can be found as part of the connection string. | *eventhubpm15910.servicebus.windows.net*

## Create a data connection

Now that your SAS policy is set up, you can configure a connection to this event hub.

1. On the menu bar, select the settings icon > **Manage connections and gateways**.

    :::image type="content" source="media/get-data-event-hub/manage-connections.png" alt-text="Screenshot of adding a new connection.":::

    The **New connection** pane opens.

1. Fill out the fields according to the following table:
   
    | Field | Description | Suggested value |
    |---|---|---|
    | Icon | Type of connection | Cloud
    | Connection name | User-defined name for this connection
    | Connection type | Type of resource to connect to | EventHub
    | Event Hub namespace | Field reference **d** from the above [table](#gather-information-for-the-data-connection). | *eventhubpm15910.servicebus.windows.net*
    | Event Hub | Field reference **a** from the above [table](#gather-information-for-the-data-connection). | *iotdata*
    | Consumer Group | User-defined name for the unique stream view. Use a name of an existing consumer group. If the event hub doesn't have a consumer group, use "$Default", which is the Event Hub's default consumer group. For more information, see [consumer groups](/azure/event-hubs/event-hubs-features#consumer-groups). 
    | Authentication method | Type of authentication | Basic
    | Username | Field reference **b** from the above [table](#gather-information-for-the-data-connection).  <br><br> The SAS policy name | *DocsTest*
    | Password | Field reference **c** from the above [table](#gather-information-for-the-data-connection). <br><br> The SAS primary key.
    | Privacy level | Kusto doesn't use the Privacy level. You can use Organizational as a default value. | Organizational

    :::image type="content" source="media/get-data-event-hub/fill-out-connection-portal.png" alt-text="Screenshot of filling out event hub information in the Azure portal.":::

1. Select **Create**.

## Create a Kusto-specific connection to your data connection

In the following step, you'll create a data connection in your Kusto database, which connects a table in your database to the Event Hubs cloud connection that you created. This connection will allow you to use your Event Hubs instance and get data into the specified table using specified data mapping.

1. Navigate to your Kusto database. 
1. Select **Get data** > **Get data from Event Hub**.

    :::image type="content" source="media/get-data-event-hub/get-data.png" alt-text="Screenshot of getting data from Database.":::

A wizard opens with the **Destination** tab selected.

### Destination tab

Your selected database is autopopulated in the **Database** field.

1. Select an existing table or create a new table. You can use alphanumeric characters and underscores. Spaces, special characters, and hyphens aren't supported.
1. Select **Next: Source**

    :::image type="content" source="media/get-data-event-hub/destination-tab.png" alt-text="Screenshot of destination table tab.":::

### Source tab

In the source tab, the **Source type** is autopopulated with **Event Hub**

1. Fill out the remaining fields according to the following table:

    :::image type="content" source="media/get-data-event-hub/source-tab.png" alt-text="Screenshot of source tab.":::

    |**Setting** | **Suggested value** | **Field description**
    |---|---|---|
    | Data connection | *TestDataConnection*  | The name that identifies your data connection.
    | Event hub data source |  | The name that identifies your event hub cloud connection. |
    | Data connection name |  | This defines the name of the database-specific Kusto event hub Data Connection. The default is \<tablename>\<EventHubname>. |
    | Consumer group | **Add consumer group** | The consumer group defined in your event hub. For more information, see [consumer groups](/azure/event-hubs/event-hubs-features#consumer-groups)
    | Compression | | Data compression of the events, as coming from the event hub. Options are None (default), or GZip compression.
    | Event system properties | Select relevant properties. | For more information, see [event hub system properties](/azure/service-bus-messaging/service-bus-amqp-protocol-guide#message-annotations). If there are multiple records per event message, the system properties will be added to the first one. See [event system properties](#event-system-properties).|

1. Select **Next: Schema** to continue to the [Schema tab](#schema-tab).

#### Event system properties

System properties store properties that are set by the Event Hubs service, at the time the event is enqueued. The data connection to the event hub can embed a selected set of system properties into the data ingested into a table based on a given mapping.

|        Property       | Data Type |      Description       |
|---|---|---|
|  x-opt-enqueued-time  |  datetime |  UTC time when the event was enqueued.   |
| x-opt-sequence-number |    long   |   The logical sequence number of the event within the partition stream of the event hub.                          |
|      x-opt-offset     |   string  | The offset of the event from the event hub partition stream. The offset identifier is unique within a partition of the event hub stream. |
|    x-opt-publisher    |   string  | The publisher name, if the message was sent to a publisher endpoint.     |
|  x-opt-partition-key  |   string  |  The partition key of the corresponding partition that stored the event. |

### Schema tab

Data is read from the event hub in form of [EventData](/dotnet/api/microsoft.servicebus.messaging.eventdata) objects. Supported formats are CSV, JSON, PSV, SCsv, SOHsv TSV, TXT, and TSVE.

:::image type="content" source="media/get-data-event-hub/schema-tab.png" alt-text="Screenshot of schema tab.":::

1. The data format is automatically inferred from the incoming data. If this format is incorrect, select the correct format.
1. If you select Ignore data format errors, the data will be ingested in JSON format. If you leave this check box unselected, the data will be ingested in multijson format. 
1. When you select JSON, you must also select **Nested levels**, from 1 to 100. The levels determine the table column data division.
1. In the **Mapping name** field, enter a mapping name. You can use alphanumeric characters and underscores. Spaces, special characters, and hyphens aren't supported.
1. If the data you see in the preview window isn't complete, you may need more data to create a table with all necessary data fields. Use the following commands to fetch new data from your Event hub:

    * **Discard and fetch new data**: discards the data presented and searches for new events.
    * **Fetch more data**: Searches for more events in addition to the events already found.
1. Select **Next: Summary**.


<!-- ## TODO: ADD TAB ABOUT MODIFYING THE AUTOMATICALLY CREATED SCHEMA WITHIN THE PREVIEW WINDOW -->

### Summary tab

In the **Continuous ingestion from Event Hub established** window, all steps will be marked with green check marks when data ingestion finishes successfully.

:::image type="content" source="media/get-data-event-hub/summary-tab.png" alt-text="Screenshot of summary tab.":::

Note the name of the data connection that was created. This connection will be visible in your workspace as a new item, and is specific to the chosen table and data connection.

:::image type="content" source="media/get-data-event-hub/view-kusto-event-hub-data-connection.png" alt-text="Screenshot of workspace with new data connection.":::

## Next steps

* [Query data in the KQL queryset](kusto-query-set.md)