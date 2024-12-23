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

## Location of data

The location of your data determines available methods for ingesting data into Eventhouse. Data from some sources can be directly loaded into an Eventhouse in the "Get data" experience. You can also use [programmatic connectors](data-connectors/data-connectors.md) to ingest data directly into Eventhouse. A variety of connectors are available through [Eventstreams](get-data-eventstream.md). Data can also be [ingested from OneLake](get-data-onelake.md) or directly consumed from a [OneLake shortcut](onelake-shortcuts.md) (with or without [acceleration](query-acceleration-overview.md)) as an external table.

| Data source                               | Ingestion method                       | Considerations | Links                                                    |
| ----------------------------------------- | -------------------------------------- | -------------- | -------------------------------------------------------- |
| Amazon Kinesis Data Streams               | Eventstreams                           |                |                                                          |
| Amazon Managed Streaming for Apache Kafka | Eventstreams                           |                |                                                          |
| Amazon S3                                 | Get data in Eventhouse                 |                | [Get data from Amazon S3](get-data-amazon-s3.md)         |
| Apache Flink                              | Programmatic connector - streaming     |                |   [Get data from Apache Flink](get-data-flink.md)                            |
| Apache Kafka (pull)                       | Programmatic connector - streaming     | TODO: Add comparison between methods               |   [Get data from Kafka](get-data-kafka.md)         |
| Apache Kafka (push)                       | Eventstreams                           |                |                                                          |
| Apache Log4J 2                            | Programmatic connector - streaming     |                |  [Get data with the Apache log4J 2 connector](get-data-log4j2.md)                                 |
| Apache Spark                              | Programmatic connector - non streaming |                |    [Get data from Apache Spark](get-data-spark.md)                                                      |
| Azure Blob Storage events                 | Eventstreams                           |                |                                                          |
| Azure Cosmos DB CDC                       | Eventstreams                           |                |                                                          |
| Azure Data Factory                        | Programmatic connector - non streaming |                |                                                          |
| Azure Event Hubs                          | Programmatic connector - streaming     |     TODO: Add comparison between methods            |                                                          |
| Azure Event Hubs                          | Get data in Eventhouse                 |                | [Get data from Azure Event Hubs](get-data-event-hub.md)  |
| Azure Event Hubs (push)                   | Eventstreams                           |                | [Add Azure Event Hubs source to an eventstream](event-streams/add-source-azure-event-hubs.md)                                                         |
| Azure Functions                           | Programmatic connector - non streaming |                |                                                          |
| Azure IoT Hub                             | Eventstreams                           |                |     [Add Azure IoT Hub source to an eventstream](event-streams/add-source-azure-iot-hub.md)                                                     |
| Azure Service Bus                         | Eventstreams                           |                |     [Add Azure Service Bus source to an eventstream (preview)](event-streams/add-source-azure-service-bus.md)                                                     |
| Azure SQL Database CDC                    | Eventstreams                           |                |                                                          |
| Azure SQL Managed Instance CDC            | Eventstreams                           |                |                                                          |
| Azure Storage                             | Get data in Eventhouse                 |                |   [Get data from Azure storage](get-data-azure-storage.md)                                                       |
| Azure Stream Analytics                    | Programmatic connector - streaming     |                | [Ingest data from Azure Stream Analytics](/azure/data-explorer/stream-analytics-connector?context=%2Ffabric%2Fcontext%2Fcontext-rti&pivots=fabric&tabs=portal)                                                         |
| Confluent Cloud Kafka                     | Eventstreams                           |                |         [Add Confluent Kafka source to an eventstream](event-streams/add-source-confluent-kafka.md)                                                 |
| Cribl Stream                              | Programmatic connector - streaming     |                |   [Get data from Cribl Stream](get-data-cribl-stream.md)                                                      |
| Custom endpoint                           | Eventstreams                           |                |     [Add a custom endpoint or custom app source to an eventstream](event-streams/add-source-custom-app.md)                                                     |
| Data pipeline                             | Get data in Eventhouse                 |                |                                                          |
| Dataflows                                 | Get data in Eventhouse                 |                |  |
| Fabric Job events                         | Eventstreams                           |                |        [Get Job events in Real-Time hub (preview)](../real-time-hub/create-streams-fabric-job-events.md)                                                  |
| Fabric OneLake events                     | Eventstreams                           |                |                                                          |
| Fabric Workspace Item events              | Eventstreams                           |                |                                                          |
| Fluent Bit                                | Programmatic connector - streaming     |                |     [Get data with Fluent Bit](get-data-fluent.md)                                                     |
| Google Cloud Pub/Sub                      | Eventstreams                           |                |                                                          |
| Local file                                | Get data in Eventhouse                 |                | [Get data from local file](get-data-local-file.md)       |
| Logstash                                  | Programmatic connector - non streaming |                |                                                          |
| MySQL Database CDC                        | Eventstreams                           |                |                                                          |
| NLog                                      | Programmatic connector - streaming     |                |    [Ingest data with the NLog sink](/azure/data-explorer/nlog-sink?context=%2Ffabric%2Fcontext%2Fcontext-rti&pivots=fabric&tabs=windows)                                                      |
| OneLake (ingestion)                       | Get data in Eventhouse                 |   TODO: Add comparison between methods             | [Get data from OneLake](get-data-onelake.md)             |
| OneLake (shortcut)                        | Get data in Eventhouse                 |                | [Onelake shortcuts](onelake-shortcuts.md)   [Query acceleration for OneLake shortcuts - overview (preview)](query-acceleration-overview.md)             |
| Open Telemetry                            | Programmatic connector - streaming     |                |                                                          |
| PostgreSQL Database CDC                   | Eventstreams                           |                |  [Add PostgreSQL Database CDC source to an eventstream](event-streams/add-source-postgresql-database-change-data-capture.md)                                                        |
| Power Automate                            | Programmatic connector - non streaming |                |                                                          |
| Serilog                                   | Programmatic connector - streaming     |                |     [Get data from Serilog](get-data-serilog.md)                                                     |
| Splunk                                    | Programmatic connector - non streaming |                |                                                          |
| Splunk Universal Forwarder                | Programmatic connector - non streaming |                |                                                          |
| SQL Server VM DB CDC                      | Eventstreams                           |                |    [Add SQL Server on VM DB (CDC) source to an eventstream](event-streams/add-source-sql-server-change-data-capture.md)                                                      |
| Telegraf                                  | Programmatic connector - streaming     |                |                                                          |

## Low-latency or real-time ingestion  

TODO: add information about how this affects the ingestion method decision.

## Preprocess or transformation

There are several ways to transform data that will eventually land in Eventhouse. If you're using Eventstreams, you can [transform data in Eventstreams](#transform-data-in-eventstreams). If you're ingesting data with any method including Eventstreams, you can [transform data with update policies](#transform-data-with-update-policies) after it lands in the Eventhouse.

### Transform data in Eventstreams

Eventstreams provides a built-in processor that can perform transformations on the data before it lands in Eventhouse. This is a good option if you want to transform data in a managed environment, if you want to route data to multiple destinations based on transformation logic, and if the available transformations satisfy your needs.

Available transformations include:

* Aggregate
* Expand
* Filter
* Union
* Group by
* Manage fields

For more information on these processing options, see [Process event data with event processor editor](event-streams/process-events-using-event-processor-editor.md).

### Transform data with update policies

Update policies are a good option if:

* Your data source isn't supported in Eventstreams.
* The transformations available in Eventstreams aren't sufficient for your needs.
* You want to have more control.
* You want to lower costs associated with your data management.

[Update policies](/kusto/management/update-policy?view=microsoft-fabric&preserve-view=true) are automation mechanisms triggered when new data is written to a table. Update policies on tables provide an efficient way to apply rapid transformations and are compatible with the [medallion lakehouse architecture](../onelake/onelake-medallion-lakehouse-architecture.md).

To use update policies, first land data in Eventhouse in one of the available methods, and then apply the transformation logic in the update policy. For more information, see [Implement medallion architecture in Real-Time Intelligence](architecture-medallion.md).

## Related content
