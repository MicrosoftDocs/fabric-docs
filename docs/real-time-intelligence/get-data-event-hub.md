---
title:  Get data from Azure Event Hubs
description: Learn how to create a connection to Event Hubs and get data into your KQL database in Real-Time Analytics.
ms.reviewer: guregini
ms.author: yaschust
author: YaelSchuster
ms.topic: how-to
ms.custom:
  - build-2023
  - ignite-2023
ms.date: 11/16/2023
ms.search.form: Get data in a KQL Database, Data connection
---
# Get data from Azure Event Hubs

In this article, you learn how to get data from Event Hubs into your KQL database in Microsoft Fabric. [Azure Event Hubs](/azure/event-hubs/event-hubs-about?context=/fabric/context/context) is a big data streaming platform and event ingestion service that can process and direct millions of events per second.

To stream data from Event Hubs into Real-Time Analytics, you go through two main steps. The first step is performed in the Azure portal, where you define the shared access policy on your event hub instance and capture the details needed to later connect via this policy.

The second step takes place in Real-Time Analytics in Fabric, where you connect a KQL database to the event hub and configure the schema for incoming data. This step creates two connections. The first connection, called a "cloud connection," connects Microsoft Fabric to the event hub instance. The second connection connects the "cloud connection" to your KQL database. Once you finish configuring the event data and schema, the streamed data is available to query using a [KQL Queryset](kusto-query-set.md).

## Prerequisites

* An Azure subscription. [Create a free Azure account](https://azure.microsoft.com/free/)
* An [event hub](/azure/event-hubs/event-hubs-create?context=/fabric/context/context)
* A [workspace](../get-started/create-workspaces.md) with a Microsoft Fabric-enabled [capacity](../enterprise/licenses.md#capacity)
* A [KQL database](create-database.md) with editing permissions

> [!WARNING]
> Your event hub can't be behind a firewall.

## Set a shared access policy on your event hub

Before you can create a connection to your Event Hubs data, you need to set a shared access policy (SAS) on the event hub and collect some information to be used later in setting up the connection. For more information on authorizing access to Event Hubs resources, see [Shared Access Signatures](/azure/event-hubs/authorize-access-shared-access-signature?context=/fabric/context/context).

1. In the [Azure portal](https://ms.portal.azure.com/), browse to the event hubs instance you want to connect.
1. Under **Settings**, select **Shared access policies**
1. Select **+Add** to add a new SAS policy, or select an existing policy with *Manage* permissions.

    :::image type="content" source="media/get-data-event-hub/sas-policy-portal.png" alt-text="Screenshot of creating an SAS policy in the Azure portal." lightbox="media/get-data-event-hub/sas-policy-portal.png":::

1. Enter a **Policy name**.
1. Select **Manage**, and then **Create**.

## Gather information for the cloud connection

Within the SAS policy pane, take note of the following four fields. You might want to copy these fields and paste it somewhere, like a notepad, to use in a later step.

:::image type="content" source="media/get-data-event-hub/fill-out-connection.png" alt-text="Screenshot showing how to fill out connection with data from Azure portal." lightbox="media/get-data-event-hub/fill-out-connection.png":::

| Field reference | Field | Description | Example |
|---|---|---|---|
| a | **Event Hubs instance** | The name of the event hub instance. | *iotdata*
| b |  **SAS Policy** | The SAS policy name created in the previous step | *DocsTest*
| c | **Primary key** | The key associated with the SAS policy | In this example, starts with *PGGIISb009*...
| d | **Connection string-primary key** | In this field you only want to copy the event hub namespace, which can be found as part of the connection string. | *eventhubpm15910.servicebus.windows.net*

## Source

1. On the lower ribbon of your KQL database, select **Get Data**.

    In the **Get data** window, the **Source** tab is selected.

1. Select the data source from the available list. In this example, you're ingesting data from **Event Hubs**.

    :::image type="content" source="media/get-data-event-hub/select-data-source.png" alt-text="Screenshot of get data window with source tab selected." lightbox="media/get-data-event-hub/select-data-source.png":::

## Configure

1. Select a target table. If you want to ingest data into a new table, select **+ New table** and enter a table name.

    > [!NOTE]
    > Table names can be up to 1024 characters including spaces, alphanumeric, hyphens, and underscores. Special characters aren't supported.

1. Either select **Create new connection**, or select **Existing connection** and jump ahead to the [next step](#connect-the-cloud-connection-to-your-kql-database).

### Create new connection

1. Fill out the **Connection settings** according to the following table:

    :::image type="content" source="media/get-data-event-hub/source.png" alt-text="Screenshot of source tab."  lightbox="media/get-data-event-hub/source.png":::

    |**Setting** | **Description** | **Example value**
    |---|---|---|
    | Event hub namespace | Field *d* from the [table above](#gather-information-for-the-cloud-connection). | *eventhubpm15910.servicebus.windows.net*
    | Event hub | Field *a* from the [table above](#gather-information-for-the-cloud-connection). The name of the event hub instance. | *iotdata*
    | Connection | To use an existing cloud connection between Fabric and Event Hubs, select the name of this connection. Otherwise, select **Create new connection**. | *Create new connection*
    | Connection name | The name of your new cloud connection. This name is autogenerated, but can be overwritten. Must be unique within the Fabric tenant. | *Connection*
    | Authentication kind | Autopopulated. Currently only Shared Access Key is supported. | *Shared Access Key*
    | Shared Access Key Name | Field *b* from the [table above](#gather-information-for-the-cloud-connection). The name you gave to the shared access policy.  | *DocsTest*
    | Shared Access Key |  Field *c* from the [table above](#gather-information-for-the-cloud-connection). The primary key of the SAS policy.

1. Select **Save**. A new cloud data connection between Fabric and Event Hubs is created.

### Connect the cloud connection to your KQL database

Whether you have created a new cloud connection, or you're using an existing one, you need to define the consumer group. You can optionally set parameters that further define aspects of the connection between the KQL database and the cloud connection.

1. Fill out the following fields according to the table:

    :::image type="content" source="media/get-data-event-hub/database-connection.png" alt-text="Screenshot of creating database connection.":::

    |**Setting** | **Description** | **Example value**|
    |---|---|---|
    | Consumer group | The relevant consumer group defined in your event hub. For more information, see [consumer groups](/azure/event-hubs/event-hubs-features#consumer-groups?context=/fabric/context/context). After adding a new consumer group, you'll then need to select this group from the drop-down.|  *NewConsumer*
    | **More parameters** |
    | Compression | Data compression of the events, as coming from the event hub. Options are None (default), or Gzip compression. | *None*
    | Event system properties |  For more information, see [event hub system properties](/azure/service-bus-messaging/service-bus-amqp-protocol-guide#message-annotations?context=/fabric/context/context). If there are multiple records per event message, the system properties are added to the first one. See [event system properties](#event-system-properties).|
    | Event retrieval start date| The data connection retrieves existing event hub events created since the Event retrieval start date. It can only retrieve events retained by the event hub, based on its retention period. The time zone is UTC. If no time is specified, the default time is the time at which the data connection is created. |

1. Select **Next** to continue to the [Inspect tab](#inspect).

### Event system properties

System properties store properties that are set by the Event Hubs service at the time the event is enqueued. The data connection to the event hub can embed a selected set of system properties into the data ingested into a table based on a given mapping.

|        Property       | Data Type |      Description       |
|---|---|---|
|  x-opt-enqueued-time  |  datetime |  UTC time when the event was enqueued.   |
| x-opt-sequence-number |    long   |   The logical sequence number of the event within the partition stream of the event hub.                          |
|      x-opt-offset     |   string  | The offset of the event from the event hub partition stream. The offset identifier is unique within a partition of the event hub stream. |
|    x-opt-publisher    |   string  | The publisher name, if the message was sent to a publisher endpoint.     |
|  x-opt-partition-key  |   string  |  The partition key of the corresponding partition that stored the event. |

## Inspect

To complete the ingestion process, select **Finish**.

:::image type="content" source="media/get-data-event-hub/inspect-data.png" alt-text="Screenshot of the inspect tab." lightbox="media/get-data-azure-storage/inspect-data.png":::

Optionally:

* Select **Command viewer** to view and copy the automatic commands generated from your inputs.
* Change the automatically inferred data format by selecting the desired format from the dropdown. Data is read from the event hub in form of [EventData](/dotnet/api/microsoft.servicebus.messaging.eventdata?context=/fabric/context/context) objects. Supported formats are CSV, JSON, PSV, SCsv, SOHsv TSV, TXT, and TSVE.
* [Edit columns](#edit-columns).
* Explore [Advanced options based on data type](#advanced-options-based-on-data-type).
* If the data you see in the preview window isn't complete, you might need more data to create a table with all necessary data fields. Use the following commands to fetch new data from your event hub:

  * **Discard and fetch new data**: discards the data presented and searches for new events.
  * **Fetch more data**: Searches for more events in addition to the events already found.

[!INCLUDE [get-data-edit-columns](includes/get-data-edit-columns.md)]

:::image type="content" source="media/get-data-event-hub/edit-columns.png" alt-text="Screenshot of columns open for editing." lightbox="media/get-data-azure-storage/edit-columns.png":::

[!INCLUDE [mapping-transformations](includes/mapping-transformations.md)]

### Schema mapping for Event Hubs Capture Avro files

One way to consume Event Hubs data is to [capture events through Azure Event Hubs in Azure Blob Storage or Azure Data Lake Storage](/azure/event-hubs/event-hubs-capture-overview?context=/fabric/context/context). You can then ingest the capture files as they are written using an [Event Grid Data Connection](/azure/data-explorer/ingest-data-event-grid-overview?context=/fabric/context/context).

The schema of the capture files is different from the schema of the original event sent to Event Hubs. You should design the destination table schema with this difference in mind. Specifically, the event payload is represented in the capture file as a byte array, and this array isn't automatically decoded by the Event Grid Azure Data Explorer data connection. For more specific information on the file schema for Event Hubs Avro capture data, see [Exploring captured Avro files in Azure Event Hubs](/azure/event-hubs/explore-captured-avro-files).

To correctly decode the event payload:

1. Map the `Body` field of the captured event to a column of type `dynamic` in the destination table.
1. Apply an [update policy](/azure/data-explorer/kusto/management/updatepolicy?context=/fabric/context/context) that converts the byte array into a readable string using the [unicode_codepoints_to_string()](/azure/data-explorer/kusto/query/unicode-codepoints-to-string-function?context=/fabric/context/context) function.

### Advanced options based on data type

**Tabular (CSV, TSV, PSV)**:

* If you're ingesting tabular formats in an *existing table*, you can select **Advanced** > **Keep table schema**. Tabular data doesn't necessarily include the column names that are used to map source data to the existing columns. When this option is checked, mapping is done by-order, and the table schema remains the same. If this option is unchecked, new columns are created for incoming data, regardless of data structure.
* To use the first row as column names, select  **Advanced** > **First row is column header**.

    :::image type="content" source="media/get-data-event-hub/advanced-csv.png" alt-text="Screenshot of advanced CSV options.":::

**JSON**:

* To determine column division of JSON data, select **Advanced** > **Nested levels**, from 1 to 100.
* If you select **Advanced** > **Skip JSON lines with errors**, the data is ingested in JSON format. If you leave this check box unselected, the data is ingested in multijson format.

    :::image type="content" source="media/get-data-event-hub/advanced-json.png" alt-text="Screenshot of advanced JSON options.":::

## Summary

In the **Data preparation** window, all three steps are marked with green check marks when data ingestion finishes successfully. You can select a card to query, drop the ingested data, or see a dashboard of your ingestion summary.

:::image type="content" source="media/get-data-event-hub/summary.png" alt-text="Screenshot of summary page with successful ingestion completed." lightbox="media/get-data-event-hub/summary.png":::

## Related content

* [Query data in a KQL queryset](kusto-query-set.md)
* [Visualize data in a Power BI report](create-powerbi-report.md)
* [One logical copy](one-logical-copy.md)
