---
title: Introduction to Microsoft Fabric Real-Time hub
description: This article describes what Real-Time hub in Microsoft Fabric is and how it can be used in near-realtime scenarios. 
author: ajetasin
ms.author: ajetasi
ms.topic: overview
ms.date: 04/03/2024
---

# Introduction to Fabric Real-Time hub (preview)
Real-Time hub is the single estate for all data-in-motion across your entire organization. Every Microsoft Fabric tenant is automatically provisioned with Real-Time hub, with no extra steps needed to set up or manages it. Real-Time hub has several key features including the following ones:

- Single place for data-in-motion for the entire organization
- Abundant connectors for simplified data ingestion 
- Real-Time hub is never dry 
- Single copy of events or streams for use with multiple real-time analytics engines 

[!INCLUDE [preview-note](./includes/preview-note.md)]

## Single data-in-motion estate for the entire organization 
Real-Time hub is to data-in-motion, what [OneLake](../onelake/onelake-overview.md) is for data-at-rest; a single, tenant-wide, unified, logical place for streaming data-in-motion.   

The Real-Time hub enables users to easily discover, ingest, manage, and consume data-in-motion from a wide variety of sources. It lists all the streams and Kusto Query Language (KQL) tables that customers can directly act on. It also gives easy access to ingest streaming data from Microsoft products and from system events.  

Each user in the tenant can view and edit all the events/streams that they have access to. Real-Time hub makes it so easy to collaborate and develop streaming applications within one place.  

## Numerous connectors to simplify data ingestion from anywhere  
Real-Time hub has numerous out-of-box connectors that make it easy for you to ingest data into Microsoft Fabric from a wide variety of sources. To start with, the following connectors are supported: 

- **Streaming data from other clouds**: Google Pub/Sub, Amazon Kinesis Data Streams
- **Kafka Clusters**: Confluent, On-premises, or in the cloud 
- **Database Change Data Capture (CDC) feeds**: Azure SQL CDC, Postgres CDC, Cosmos DB CDC 
- **Microsoft streaming sources**: Azure Event Hubs, IoT hubs, Azure Monitor, Dynamic 365 logs, Microsoft 365 logs, Microsoft Sentinel 
- **System events**: both Azure system events (like Azure storage account events) and Fabric system events are automatically generated into Real-Time hub 

A unified Get Events experience makes it effortless to connect from these sources into components in Real-Time hub like eventstream, KQL database, and Data activator.  

## Real-Time hub is never dry 
In the world of data, Real-Time hub is never dry. Here’s why: 

- **System Events as the nervous system**: When customers take CRUD (Create, Read, Update, Delete) actions on artifacts, these events are emitted as system events within Real-Time hub. Much like a human nervous system, these events provide vital feedback. Customers can gauge whether their entire project is functioning correctly based on these system events. Even when a user visits Real-Time hub for the first time, they encounter these system events. They can subscribe to them, gaining insights into the health and performance of their data ecosystem. 
- **Microsoft Product Integration**: Many customers use multiple Microsoft products. Real-Time hub ensures that it’s never dry by listing all streaming resources from Microsoft products. Whether it’s Azure Event Hubs, Azure IoT Hub, or other services, users can seamlessly ingest data into Real-Time hub. 
- **Streams/tables**: for customers who have running eventstreams and KQL databases, all the streams from eventstreams and tables from KQL databases automatically show up in Real-Time hub.  

## Single copy of events/streams for use with multiple real-time analytics engines 
As data flows into Real-Time hub, you can create a stream out of it. Once the stream is created, the data is stored in a canonical format. This format is universally accessible to all processing engines. No need for redundant copies of data. Real-Time hub ensures efficiency and consistency.

## Related content

- [Get events from Microsoft sources](get-events-microsoft-sources.md)
- [Get events from external sources](get-events-external-sources.md)
- [Get Azure blob storage events](get-azure-blob-storage-events.md)
