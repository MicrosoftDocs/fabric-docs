---
title: Introduction to Microsoft Fabric Real-Time hub
description: This article describes what Real-Time hub in Microsoft Fabric is and how it can be used in near-realtime scenarios.
author: ajetasin
ms.author: ajetasi
ms.topic: overview
ms.custom:
  - build-2024
ms.date: 05/21/2024
---

# Introduction to Fabric Real-Time hub (preview)
Real-Time hub is the single place for all data-in-motion across your entire organization. Every Microsoft Fabric tenant is automatically provisioned with the hub. There are no extra steps needed to set up or manage it. It also provides abundant connectors for simplified data ingestion into Fabric. This article explains these features in detail. 

[!INCLUDE [preview-note](./includes/preview-note.md)]


## Single place for data-in-motion across your organization 
Real-Time hub is single, tenant-wide, unified, logical place for streaming data-in-motion. It enables you to easily discover, ingest, manage, and consume data-in-motion from a wide variety of sources. It lists all the streams and Kusto Query Language (KQL) tables that you can directly act on. It also gives you an easy way to ingest streaming data from Microsoft products and Fabric events.  

Each user in the tenant can view and edit all the events or streams that they have access to. Real-Time hub makes it so easy to collaborate and develop streaming applications within one place.  

:::image type="content" source="./media/real-time-hub-overview/hub-data-streams-tab.png" alt-text="Screenshot that shows the Real-Time hub page with the Data Streams tab selected." lightbox="./media/real-time-hub-overview/hub-data-streams-tab.png" :::

## Numerous connectors to ingest data from a wide variety of sources
Real-Time hub has numerous out-of-box connectors that make it easy for you to ingest data into Microsoft Fabric from a wide variety of sources. Currently, the following connectors are supported: 

| &nbsp; | &nbsp; |
| ------ | ------- |
| Streaming data from other clouds | <ul><li>Google Cloud Pub/Sub</li><li>Amazon Kinesis Data Streams</li> |
| Kafka Clusters | <ul><li>Confluent Cloud Kafka</li></ul> |
| Database Change Data Capture (CDC) feeds | <ul><li>Azure SQL Database CDC</li><li>PostgreSQL Database CDC</li><li>Azure Cosmos DB CDC</li><li>MySQL Database CDC</li> |
| Microsoft streaming sources | <ul><li>Azure Event Hubs</li><li>IoT hubs</li></ul> |
| Fabric events | <ul><li>Azure storage account events</li><li>Fabric workspace item events <br/>(automatically generated)</li></ul> |

A unified **Get Events** experience makes it effortless to connect these sources to components in Real-Time hub like eventstream, KQL database, and Data Activator.  

## Data integrations

- **Streams and tables**

    For your running eventstreams and KQL databases, all the stream outputs from eventstreams and tables from KQL databases automatically show up in Real-Time hub. 

- **Integration with Microsoft sources**

    Real-Time hub lists all streaming resources from Microsoft services. Whether it’s Azure Event Hubs, Azure IoT Hub, or other services, you can seamlessly ingest data into Real-Time hub. 

- **Fabric events**

    Events that are generated via Fabric artifacts and external sources, are made available in Fabric to support event-driven scenarios like real-time alerting and triggering downstream actions. You can monitor and react to events including Fabric workspace item events and Azure Blob Storage events. These events can be used to trigger other actions or workflows, such as invoking a data pipeline or sending a notification via email. Users can also send these events to other destinations via Fabric Event Streams. 

## Process, analyze, and act on data streams
Real-Time hub allows you to create streams for the supported sources. After you create the streams, you can process them, analyze them, and set alerts on them.

- To **process** a stream, you open the parent eventstream in an editor, add transformations such as Aggregate, Expand, Filter, Group by, Manage fields, and Union, to transform or process the data that's streaming into Fabric, and then send the output data from transformations into supported destinations.
- To **analyze** a stream, you open the eventstream associated with the data stream, add a KQL Database destination to send the data to a KQL table, and then open KQL database and run queries against the KQL table. To analyze a table in  Real-Time hub, you open the parent KQL database and run queries against the KQL table.
- To **act** on streams or Fabric events, you set alerts based on conditions and specify actions to take when the conditions are met. 

    :::image type="content" source="./media/real-time-hub-overview/real-time-hub.png" alt-text="Screenshot that shows the conceptual image of Real-Time hub architecture." lightbox="./media/real-time-hub-overview/real-time-hub.png" :::


## Related content

See [Get started with Real-Time hub.](get-started-real-time-hub.md)
