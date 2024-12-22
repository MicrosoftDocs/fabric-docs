---
title: Eventhouse ingestion overview
description: Learn how to make a decision about which ingestion method to use to get data into an Eventhouse in Real-Time Intelligence.
ms.reviewer: tzgitlin
ms.author: shsagir
author: shsagir
ms.topic: concept-article
ms.date: 12/19/2024
# customer intent: As a user, I want to learn about the available ingestion methods for Eventhouse in Real-Time Intelligence so that I can make an informed decision about which method to use.
---
# Eventhouse ingestion overview

Data ingestion in an [Eventhouse](eventhouse.md) is the process of loading data. During this process, data undergoes schema matching, organization, indexing, encoding, and compression. Once ingested, data is available for query.

This article outlines the various methods for ingesting data into an Eventhouse and helps you decide which is the most suitable method for your scenario.

## Ingestion methods

The right solution for you depends significantly on these main factors:

* [Where is your data stored?](#location-of-data)
* [Do you require low-latency or real-time ingestion?](#low-latency-or-real-time-ingestion)
* [Does your data need preprocess or transformation?](#preprocess-or-transformation)

The following schematic shows sample ingestion architectures for ingesting data in Eventhouse:

:::image type="content" source="media/eventhouse-ingestion-overview/schematic-ingestion-methods.png" alt-text="Schematic image showing all possible ingestion methods and their paths to Eventhouse." lightbox="media/eventhouse-ingestion-overview/schematic-ingestion-methods.png":::

### Location of data

The location of your data will determine the best method for ingesting data into Eventhouse. Some sources have direct connectors to Eventhouse. Other connectors are available through Eventstreams. If your data is not in a supported source, you can use programmatic connectors to ingest data into Eventhouse.

| Data source                               | Ingestion method                       | Considerations | Links                                                    |
| ----------------------------------------- | -------------------------------------- | -------------- | -------------------------------------------------------- |
| SQL Server VM DB CDC                      | Eventstreams                           |                |                                                          |
| PostgreSQL Database CDC                   | Eventstreams                           |                |                                                          |
| MySQL Database CDC                        | Eventstreams                           |                |                                                          |
| Google Cloud Pub/Sub                      | Eventstreams                           |                |                                                          |
| Fabric Workspace Item events              | Eventstreams                           |                |                                                          |
| Fabric OneLake events                     | Eventstreams                           |                |                                                          |
| Fabric Job events                         | Eventstreams                           |                |                                                          |
| Custom endpoint                           | Eventstreams                           |                |                                                          |
| Confluent Cloud Kafka                     | Eventstreams                           |                |                                                          |
| Azure Service Bus                         | Eventstreams                           |                |                                                          |
| Azure SQL Managed Instance CDC            | Eventstreams                           |                |                                                          |
| Azure SQL Database CDC                    | Eventstreams                           |                |                                                          |
| Azure IoT Hub                             | Eventstreams                           |                |                                                          |
| Azure Event Hubs (push)                   | Eventstreams                           |                |                                                          |
| Azure Cosmos DB CDC                       | Eventstreams                           |                |                                                          |
| Azure Blob Storage events                 | Eventstreams                           |                |                                                          |
| Apache Kafka (push)                       | Eventstreams                           |                |                                                          |
| Amazon Managed Streaming for Apache Kafka | Eventstreams                           |                |                                                          |
| Amazon Kinesis Data Streams               | Eventstreams                           |                |                                                          |
| Apache Flink                              | Programmatic connector - streaming     |                |                                                          |
| Apache Kafka (pull)                       | Programmatic connector - streaming     |                |                                                          |
| Apache Log4J 2                            | Programmatic connector - streaming     |                |                                                          |
| Azure Event Hubs                          | Programmatic connector - streaming     |                |                                                          |
| Azure Stream Analytics                    | Programmatic connector - streaming     |                |                                                          |
| Cribl Stream                              | Programmatic connector - streaming     |                |                                                          |
| Fluent Bit                                | Programmatic connector - streaming     |                |                                                          |
| NLog                                      | Programmatic connector - streaming     |                |                                                          |
| Open Telemetry                            | Programmatic connector - streaming     |                |                                                          |
| Serilog                                   | Programmatic connector - streaming     |                |                                                          |
| Telegraf                                  | Programmatic connector - streaming     |                |                                                          |
| Apache Spark                              | Programmatic connector - non streaming |                |                                                          |
| Azure Data Factory                        | Programmatic connector - non streaming |                |                                                          |
| Azure Functions                           | Programmatic connector - non streaming |                |                                                          |
| Logstash                                  | Programmatic connector - non streaming |                |                                                          |
| Power Automate                            | Programmatic connector - non streaming |                |                                                          |
| Splunk                                    | Programmatic connector - non streaming |                |                                                          |
| Splunk Universal Forwarder                | Programmatic connector - non streaming |                |                                                          |
| Amazon S3                                 | Get data in Eventhouse                 |                | [Get data from Amazon S3](get-data-amazon-s3.md)         |
| Azure Event Hubs                          | Get data in Eventhouse                 |                | [Get data from Azure Event Hubs](get-data-event-hub.md)  |
| Azure Storage                             | Get data in Eventhouse                 |                |                                                          |
| Data pipeline                             | Get data in Eventhouse                 |                |                                                          |
| Dataflows                                 | Get data in Eventhouse                 |                | [Get data from Azure storage](get-data-azure-storage.md) |
| Local file                                | Get data in Eventhouse                 |                | [Get data from local file](get-data-local-file.md)       |
| OneLake (ingestion)                       | Get data in Eventhouse                 |                | [Get data from OneLake](get-data-onelake.md)             |
| OneLake (shortcut)                        | Get data in Eventhouse                 |                |                                                          |

### Low-latency or real-time ingestion  

Based on your requirements, you can choose from the following options for low-latency or real-time ingestion:

TODO: add information about the different options and when to use each.


### Preprocess or transformation

There are several ways to transform data that will eventually land in Eventhouse. The best method for you depends on your specific requirements and constraints. Here are some considerations to help you decide:

#### Transform data in Eventstreams

Eventstreams provides a built-in processor that can perform transformations on the data before it lands in Eventhouse. This is a good option if you want to transform data in a managed environment, if you want to route data to multiple destinations based on transformation logic, and if the available transformations satisfy your needs.

Available transformations include:

* Aggregate
* Expand
* Filter
* Union
* Group by
* Manage fields

For more information on these processing options, see [Process event data with event processor editor](event-streams/process-events-using-event-processor-editor.md).

#### Transform data with update policies

If the transformations available in Eventstreams are not sufficient for your needs, you want to have more control, or want to lower costs associated with your data management, you can use update policies in Eventhouse to transform data. [Update policies](/kusto/management/update-policy?view=microsoft-fabric&preserve-view=true) are automation mechanisms triggered when new data is written to a table. Update policies on tables provide an efficient way to apply rapid transformations and are compatible with the [medallion lakehouse architecture](../onelake/onelake-medallion-lakehouse-architecture.md).

To use update policies, first land data in Eventhouse in one of the available methods, and then apply the transformation logic in the update policy.

### Eventstreams

The [eventstreams](event-streams/overview.md) experience lets you bring real-time events into Fabric, transform them, and then route them to various destinations without writing any code (no-code). You create an eventstream, which is an instance of the Eventstream item in Fabric, add event data sources to the stream, optionally add transformations to transform the event data, and then route the data to supported destinations. 

For a list of supported sources, see [Eventstreams supported sources](event-streams/add-manage-eventstream-sources.md#supported-sources).

### Programmatic connectors

For data in sources that are not supported by Eventstreams, you can use programmatic connectors to ingest data into Eventhouse. Some programmatic connectors support streaming data, while others are blob-based.

For a full list of connectors, functionality, and use cases, see [Data connectors overview](data-connectors/data-connectors.md).

### Get data experience

The following list summarizes the various options to get data in to Eventhouse using the Get data wizard in Real-Time Intelligence. To learn more about each source, go to the documentation linked in the source name.

* [Get data from Azure storage](get-data-azure-storage.md)
* [Get data from Amazon S3](get-data-amazon-s3.md)
* [Get data from Azure Event Hubs](get-data-event-hub.md)
* [Get data from OneLake](get-data-onelake.md)
* [Get data from Eventstream](get-data-eventstream.md)
* [Get data from Real-Time hub](get-data-real-time-hub.md)
* [Get data from local file](get-data-local-file.md)

### OneLake

Data from Onelake can be used in Eventhouses in several ways:

* Get data from [OneLake](get-data-onelake.md)
* [Onelake shortcuts](onelake-shortcuts.md)

