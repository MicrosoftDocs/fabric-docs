---
title: Use an event hub connection to stream data to your Kusto database
description: Learn how to create a connection to Event Hubs and get data into your Kusto database in Trident.
ms.reviewer: guregini
ms.author: yaschust
author: YaelSchuster
ms.prod: analytics
ms.technology: data-explorer 
ms.topic: how-to
ms.date: 11/30/2022
---
# Get data from Azure Event Hubs

In this article, you'll learn how to get data from event hub into your Kusto database in Trident. [Azure Event Hubs](/azure/event-hubs/event-hubs-about) is a big data streaming platform and event ingestion service that can process and direct millions of events per second.

To stream data from Azure Event Hubs into Kusto, you'll go through two main steps. The first step is to create a Trident platform-based data connection to a specific event hub instance. This data connection can be used across all Trident workspaces and is managed centrally.

In the second step, you'll connect this Trident-based data connection to a Kusto database. This process creates a database-specific Kusto EventHubDataConnection. The connection will stream data into the table you specified during setup, and the data will then be available to query using the KQL queryset.

## Prerequisites

* An Azure subscription. [Create a free Azure account](https://azure.microsoft.com/free/).
* [An Event hub](/azure/event-hubs/event-hubs-create)
* A PowerBI/Trident premium subscription (???)

## Create data connection in Trident

In Trident: 

:::image type="content" source="media/get-data-event-hub/sas-policy-portal.png" alt-text="Screenshot of creating an SAS policy in the Azure portal.":::

:::image type="content" source="media/get-data-event-hub/fill-out-connection.png" alt-text="Screenshot showing how to fill out connection with data from Azure portal.":::


:::image type="content" source="media/get-data-event-hub/manage-connections.png" alt-text="Screenshot of adding a new connection.":::

:::image type="content" source="media/get-data-event-hub/fill-out-connection-portal.png" alt-text="Screenshot of filling out event hub information in the Azure portal.":::

For more information on authorizing access to Event Hubs resources, see [Shared Access Signatures](/azure/event-hubs/authorize-access-shared-access-signature).

:::image type="content" source="media/get-data-event-hub/get-data.png" alt-text="Screenshot of getting data from Database.":::

### Destination tab

TO-DO Database autoselected. 

1. Select an existing table or create a new table. You can use alphanumeric characters and underscores. Spaces, special characters, and hyphens aren't supported.
1. Select **Next: Source**

    :::image type="content" source="media/get-data-event-hub/destination-tab.png" alt-text="Screenshot of destination table tab.":::

### Source tab

TODO add steps

:::image type="content" source="media/get-data-event-hub/source-tab.png" alt-text="Screenshot of source tab.":::

|**Setting** | **Suggested value** | **Field description**
|---|---|---|
| Data connection | *TestDataConnection*  | The name that identifies your data connection.
| event hub data source |  | The name that identifies your namespace. |
| Data connection name |  | This defines the name of the database-specific Kusto EventHubDataConnection. The default is \<tablename>\<EventHubname>. |
| Consumer group | **Add consumer group** | The consumer group defined in your event hub. Consumer groups enable multiple consuming applications to each have a separate view of the event stream.
| Compression | | Data compression: None (default), or GZip compression.
| Event system properties | Select relevant properties. | For more information, see [event hub system properties](/azure/service-bus-messaging/service-bus-amqp-protocol-guide#message-annotations). If there are multiple records per event message, the system properties will be added to the first one. See [Event system properties](#event-system-properties).|

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

1. Data batching latency TO-DO
1. Data format TO-DO
1. If you select Ignore data format errors, the data will be ingested in JSON format. If you leave this check box unselected, the data will be ingested in multijson format. 
1. When you select JSON, you must also select **Nested levels**, from 1 to 100. The levels determine the table column data division.
    
1. In the **Mapping name** field, enter a mapping name. You can use alphanumeric characters and underscores. Spaces, special characters, and hyphens aren't supported.
1. If the data you see in the preview window isn't complete, you may need more data to create a table with all necessary data fields. Use the following commands to fetch new data from your Event hub:

    * **Discard and fetch new data**: discards the data presented and searches for new events.
    * **Fetch more data**: Searches for more events in addition to the events already found.
1. Select **Next: Summary**.

### Summary tab

:::image type="content" source="media/get-data-event-hub/summary-tab.png" alt-text="Screenshot of summary tab.":::

### View new Kusto EventHubDataConnection

:::image type="content" source="media/get-data-event-hub/view-kusto-event-hub-data-connection.png" alt-text="Screenshot of workspace with new data connection.":::

### Verify incoming data in the KQL queryset

1. Navigate to or create a new KQL queryset.
1. In the left pane, from the **Database** dropdown, select the database into which you are streaming data.
1. 
    :::image type="content" source="media/get-data-event-hub/test-data-query-set.png" alt-text="Screenshot of queryset for testing incoming data.":::

## Next steps

* Link to KQL queryset
* Link to KQL docs?