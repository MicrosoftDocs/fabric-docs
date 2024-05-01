---
title: Introduction to Microsoft Fabric Real-Time hub
description: This article describes what Real-Time hub in Microsoft Fabric is and how it can be used in near-realtime scenarios. 
author: ajetasin
ms.author: ajetasi
ms.topic: overview
ms.date: 05/21/2024
---

# Introduction to Fabric Real-Time hub (preview)
Real-Time hub is the single estate for all data-in-motion across your entire organization. Every Microsoft Fabric tenant is automatically provisioned with the hub. There are no extra steps needed to set up or manage it. Several key features of the hub are:

- Single place for data-in-motion for the entire organization
- Abundant connectors for simplified data ingestion
- Real-Time hub is never empty
- Single copy of events/streams for use with multiple real-time analytics engines

[!INCLUDE [preview-note](./includes/preview-note.md)]

## Single data-in-motion estate for the entire organization 
Real-Time hub is to data-in-motion, what [OneLake](../onelake/onelake-overview.md) is for data-at-rest; a single, tenant-wide, unified, logical place for streaming data-in-motion.   

The Real-Time hub enables users to easily discover, ingest, manage, and consume data-in-motion from a wide variety of sources. It lists all the streams and Kusto Query Language (KQL) tables that customers can directly act on. It also gives easy access to ingest streaming data from Microsoft products and from Fabric events.  

Each user in the tenant can view and edit all the events/streams that they have access to. Real-Time hub makes it so easy to collaborate and develop streaming applications within one place.  

:::image type="content" source="./media/real-time-hub-overview/hub-data-streams-tab.png" alt-text="Screenshot that shows the Real-Time hub page with the Data Streams tab selected." lightbox="./media/real-time-hub-overview/hub-data-streams-tab.png" :::

## Numerous connectors to simplify data ingestion from anywhere  
Real-Time hub has numerous out-of-box connectors that make it easy for you to ingest data into Microsoft Fabric from a wide variety of sources. To start with, the following connectors are supported: 

| &nbsp; | &nbsp; |
| ------ | ------- |
| Streaming data from other clouds | <ul><li>Google Pub/Sub</li><li>Amazon Kinesis Data Streams</li> |
| Kafka Clusters | <ul><li>Confluent, On-premises, or in the cloud</li></ul> |
| Database Change Data Capture (CDC) feeds | <ul><li>Azure SQL Database CDC</li><li>PostgreSQL Database CDC</li><li>Azure Cosmos DB CDC</li><li>MySQL Database CDC</li> |
| Microsoft streaming sources | <ul><li>Azure Event Hubs</li><li>IoT hubs</li></ul> |
| Fabric events | <ul><li>Azure storage account events</li><li>Fabric workspace item events <br/>(automatically generated)</li></ul> |

A unified Get Events experience makes it effortless to connect from these sources into components in Real-Time hub like eventstream, KQL database, and Data Activator.  

## Real-Time hub is never empty 
In the world of data, Real-Time hub is never empty. The following sections explain how it's never empty. 

### Streams and tables
For customers who have running eventstreams and KQL databases, all the stream outputs from eventstreams and tables from KQL databases automatically show up in Real-Time hub. 

### Microsoft Product Integration
Many customers use multiple Microsoft products. Real-Time hub ensures that it’s never empty by listing all streaming resources from Microsoft products. Whether it’s Azure Event Hubs, Azure IoT Hub, or other services, users can seamlessly ingest data into Real-Time hub. 

### Fabric events as the nervous system
When customers take CRUD (Create, Read, Update, Delete) actions on artifacts, these events are emitted as Fabric events within Real-Time hub. Much like a human nervous system, these events provide vital feedback. Customers can gauge whether their entire project is functioning correctly based on these events. Even when a user visits Real-Time hub for the first time, they encounter these events. They can subscribe to them, gaining insights into the health and performance of their data ecosystem. 

### Single copy of events/streams for use with multiple real-time analytics engines 
As data flows into Real-Time hub, you can create a stream out of it. Once the stream is created, the data is stored in a canonical format. This format is universally accessible to all processing engines. No need for redundant copies of data. Real-Time hub ensures efficiency and consistency.

## Related content

- [Create streams for supported sources](supported-sources.md)
- [Azure blob storage events](get-azure-blob-storage-events.md)
- [Fabric Workspace item events ](create-streams-fabric-workspace-item-events.md)
