---
title:  Get data from Azure Event Hubs in Real-Time Analytics
description: Learn how to create a connection to Event Hubs and get data into your KQL database.
ms.reviewer: guregini
ms.author: yaschust
author: YaelSchuster
ms.topic: how-to
ms.custom: build-2023
ms.date: 07/25/2023
ms.search.form: product-kusto
---
# Get data from Azure Event Hubs

[!INCLUDE [preview-note](../includes/preview-note.md)]

In this article, you learn how to get data from Event Hubs into your KQL database in Microsoft Fabric. [Azure Event Hubs](/azure/event-hubs/event-hubs-about?context=/fabric/context/context) is a big data streaming platform and event ingestion service that can process and direct millions of events per second.

To stream data from Event Hubs into Real-Time-Analytics, you go through two main steps. The first step is performed in the Azure portal, where you define the shared access policy on your event hub and capture the details needed to later connect via this policy.

The second step takes place in Real-Time Analytics in Fabric, where you connect a KQL database to the event hub and configure the schema for incoming data. This step creates two connections. The first connection, called a "cloud connection", connects Microsoft Fabric to the event hub instance. The second connection connects the "cloud connection" to your KQL database. Once you finish configuring the event data and schema, the streamed data is available to query using a [KQL Queryset](kusto-query-set.md).

## Prerequisites

* An Azure subscription. [Create a free Azure account](https://azure.microsoft.com/free/)
* An [event hub](/azure/event-hubs/event-hubs-create?context=/fabric/context/context)
* A [workspace](../get-started/create-workspaces.md) with a Microsoft Fabric-enabled [capacity](../enterprise/licenses.md#capacity)
* A [KQL database](create-database.md)

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

Within the SAS policy pane, take note of the following four fields. You may want to copy these fields and paste it somewhere, like a notepad, to use in a later step.

:::image type="content" source="media/get-data-event-hub/fill-out-connection.png" alt-text="Screenshot showing how to fill out connection with data from Azure portal." lightbox="media/get-data-event-hub/fill-out-connection.png":::

| Field reference | Field | Description | Example |
|---|---|---|---|
| a | **Event Hubs instance** | The name of the event hub instance. | *iotdata*
| b |  **SAS Policy** | The SAS policy name created in the previous step | *DocsTest*
| c | **Primary key** | The key associated with the SAS policy | In this example, starts with *PGGIISb009*...
| d | **Connection string-primary key** | In this field you only want to copy the event hub namespace, which can be found as part of the connection string. | *eventhubpm15910.servicebus.windows.net*

## Get data

In the following steps, you create a table, and create a data connection to Event Hubs. Data connections to Event Hubs can be used for more than one database.

1. Browse to your KQL database.
1. Select **Get data** > **Get data from Event Hubs**.

    :::image type="content" source="media/get-data-event-hub/get-data.png" alt-text="Screenshot of a KQL database showing the Get Data dropdown. The dropdown option titled Event Hubs is highlighted."  lightbox="media/get-data-event-hub/get-data-extended.png":::

A wizard opens with the **Destination** tab selected.

### Destination tab

1. Select an existing table or create a new table.

    > [!NOTE]
    > You can use alphanumeric characters and underscores. Spaces, special characters, and hyphens aren't supported.

1. Select **Next: Source**

### Source tab

#### Create the cloud connection

1. In the source tab, select **Create new connection**.  

1. Fill out the **Connection settings** according to the following table:

    :::image type="content" source="media/get-data-event-hub/source.png" alt-text="Screenshot of source tab."  lightbox="media/get-data-event-hub/source.png":::

    |**Setting** | **Description** | **Example value**
    |---|---|---|
    | Event Hub namespace | Field *d* from the [table above](#gather-information-for-the-cloud-connection). | *eventhubpm15910.servicebus.windows.net*
    | Event Hub | Field *a* from the [table above](#gather-information-for-the-cloud-connection). The name of the event hub instance. | *iotdata*
    | Connection | To use an existing cloud connection between Fabric and Event Hubs, select the name of this connection. Otherwise, select **Create new connection**. | *Create new connection*
    | Connection name | The name of your new cloud connection. This name is autogenerated, but can be overwritten. Must be unique within the Fabric tenant. | *Connection*
    | Authentication kind | Autopopulated. Currently only Shared Access Key is supported. | *Shared Access Key*
    | Shared Access Key Name | Field *b* from the [table above](#gather-information-for-the-cloud-connection). The name you gave to the shared access policy.  | *DocsTest*
    | Shared Access Key |  Field *c* from the [table above](#gather-information-for-the-cloud-connection). The primary key of the SAS policy.

1. Select **Save**. A new cloud data connection between Fabric and Event Hubs is created.

#### Connect the cloud connection to your KQL database

1. You now connect the cloud connection to the KQL database. Fill out the following fields according to the table:

    :::image type="content" source="media/get-data-event-hub/database-connection.png" alt-text="Screenshot of creating database connection.":::

    |**Setting** | **Description** | **Example value**
    |---|---|---|
    | Data connection name |   This defines the name of the database-specific event hub data connection. The default is \<DatabaseName>\<EventHubsCloudConnectionName> but can be over-written. | *ConnectionToRTA*
    | Consumer group | The relevant consumer group defined in your event hub. For more information, see [consumer groups](/azure/event-hubs/event-hubs-features#consumer-groups?context=/fabric/context/context). After adding a new consumer group, you'll then need to select this group from the drop-down.|  *NewConsumer*
    | **More parameters** |
    | Compression | Data compression of the events, as coming from the event hub. Options are None (default), or GZip compression. | *None*
    | Event system properties |  For more information, see [event hub system properties](/azure/service-bus-messaging/service-bus-amqp-protocol-guide#message-annotations?context=/fabric/context/context). If there are multiple records per event message, the system properties are added to the first one. See [event system properties](#event-system-properties).|
    | Event retrieval start date|   The data connection retrieves existing event hub events created since the Event retrieval start date. It can only retrieve events retained by the event hub, based on its retention period. The time zone is UTC. If no time is specified, the default time is the time at which the data connection is created. |

1. Select **Next: Schema** to continue to the [Schema tab](#schema-tab).

#### Event system properties

System properties store properties that are set by the Event Hubs service at the time the event is enqueued. The data connection to the event hub can embed a selected set of system properties into the data ingested into a table based on a given mapping.

|        Property       | Data Type |      Description       |
|---|---|---|
|  x-opt-enqueued-time  |  datetime |  UTC time when the event was enqueued.   |
| x-opt-sequence-number |    long   |   The logical sequence number of the event within the partition stream of the event hub.                          |
|      x-opt-offset     |   string  | The offset of the event from the event hub partition stream. The offset identifier is unique within a partition of the event hub stream. |
|    x-opt-publisher    |   string  | The publisher name, if the message was sent to a publisher endpoint.     |
|  x-opt-partition-key  |   string  |  The partition key of the corresponding partition that stored the event. |

### Schema tab

Data is read from the event hub in form of [EventData](/dotnet/api/microsoft.servicebus.messaging.eventdata?context=/fabric/context/context) objects. Supported formats are CSV, JSON, PSV, SCsv, SOHsv TSV, TXT, and TSVE.

:::image type="content" source="media/get-data-event-hub/schema-tab.png" alt-text="Screenshot of schema tab."  lightbox="media/get-data-event-hub/schema-tab.png":::

1. The data format is automatically inferred from the incoming data. If this format is incorrect, select the correct format. 

    > [!NOTE]
    > If you select Ignore data format errors, the data is ingested in JSON format. If you leave this check box unselected, the data is ingested in multijson format. When you select JSON, you must also select **Nested levels**, from 1 to 100. The levels determine the table column data division.

1. If the data you see in the preview window isn't complete, you may need more data to create a table with all necessary data fields. Use the following commands to fetch new data from your Event hub:

    * **Discard and fetch new data**: discards the data presented and searches for new events.
    * **Fetch more data**: Searches for more events in addition to the events already found.

1. In the **Mapping name** field, enter a mapping name. You can use alphanumeric characters and underscores. Spaces, special characters, and hyphens aren't supported.

    > [!NOTE]
    > The tool automatically infers the schema based on your data. If you want to change the schema to add and edit columns, you can do so under [Partial data preview](#partial-data-preview).
    >
    > You can optionally use the [Command viewer](#command-viewer) to view and copy the automatic commands generated from your inputs.

1. Select **Next: Summary**.

### Command viewer

:::image type="content" source="media/get-data-event-hub/command-view.png" alt-text="Screenshot of the command editor in the schema tab."  lightbox="media/get-data-event-hub/command-view.png":::

The command viewer shows the commands for creating tables, mapping, and ingesting data in tables.

To open the command viewer, select the v button on the right side of the command viewer. In the command viewer, you can view and copy the automatic commands generated from your inputs.

### Partial data preview

The partial data preview is automatically inferred based on your data. You can change the data preview by editing and adding new columns.

To add a new column, select the + button on the right-hand column under Partial data preview.

:::image type="content" source="media/get-data-event-hub/partial-preview.png" alt-text="Screenshot of the Partial data preview in the schema tab."  lightbox="media/get-data-event-hub/partial-preview.png":::

* The column name should start with a letter, and may contain numbers, periods, hyphens, or underscores.
* The default column type is string but can be altered in the drop-down menu of the Column type field.
* Source: for table formats (CSV, TSV, etc.), each column can be linked to only one source column. For other formats (such as JSON, Parquet, etc.), multiple columns can use the same source.

### Summary tab

In the **Continuous ingestion from Event Hubs established** window, all steps are marked with green check marks when data ingestion finishes successfully.

:::image type="content" source="media/get-data-event-hub/summary-tab.png" alt-text="Screenshot of Event Hubs data ingestion summary tab."  lightbox="media/get-data-event-hub/summary-tab.png":::

Note the name of the data connection that was created. This connection is visible in your workspace as a new item, and is specific to the chosen table and data connection.

## Next steps

* [Query data in a KQL queryset](kusto-query-set.md)
