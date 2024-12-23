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
* [Does your data need transformations?](#data-transformation)

The following schematic shows sample ingestion architectures for ingesting data in Eventhouse:

:::image type="content" source="media/eventhouse-ingestion-overview/schematic-ingestion-methods.png" alt-text="Schematic image showing all possible ingestion methods and their paths to Eventhouse." lightbox="media/eventhouse-ingestion-overview/schematic-ingestion-methods.png":::

## Location of data

The location of your data determines available methods for ingesting data into Eventhouse. Data from some sources can be directly loaded into an Eventhouse in the "Get data" experience. You can also use [connectors](data-connectors/data-connectors.md) to ingest data directly into Eventhouse. A variety of connectors are available through [Eventstreams](get-data-eventstream.md). Data can also be [ingested from OneLake](get-data-onelake.md) or directly consumed from a [OneLake shortcut](onelake-shortcuts.md) (with or without [acceleration](query-acceleration-overview.md)) as an external table.

For a complete list of sources organized by category, see:

* [Eventstream sources](event-streams/add-manage-eventstream-sources.md)
* [Connectors sources](data-connectors/data-connectors.md)
* [Get data sources](get-data-overview.md)

> [!NOTE]
> In some cases, there are multiple methods to ingest data from the same source. The following section can help you decide which method to use.

### Apache Kafka

TODO: add content

### Azure Event Hubs

TODO: add content

### OneLake

TODO: add content

## Low-latency or real-time ingestion  

What latency do you require for your data? The answer to this question will help you decide which ingestion method to use. 

If you want to do analytics on raw data without preprocessing, you should directly ingest into Eventhouse using [Get data sources](get-data-overview.md) or [connectors](data-connectors/data-connectors.md). If you can tolerate slightly more latency and want to transform data before it lands in the Eventhouse, you can use [Eventstreams](get-data-eventstream.md) to preprocess data. If you need to alert on data in real-time, you can use [Activator rules](data-activator/activator-rules-overview.md) in Eventstreams.

TODO: is there a benchmark on latency for each method?

## Data transformation

There are several ways to transform data that will eventually land in Eventhouse. If you're using Eventstreams, you can [transform data in Eventstreams](#transform-data-in-eventstreams). If you're ingesting data with any method including Eventstreams, you can [transform data with update policies](#transform-data-with-update-policies) after it lands in the Eventhouse.

### Transform data in Eventstreams

Eventstreams provides a built-in processor that can perform transformations on the data before it lands in Eventhouse.

Eventstreams processors are a good option if:

* You want to share the data stream with others in your organization.
* You want to transform data in a managed environment.
* You want to route data to multiple destinations based on transformation logic.
* You want to set [Activator rules](data-activator/activator-rules-overview.md) on the data stream.
* The available transformations satisfy your needs.

For more information on these processing options, see [Process event data with event processor editor](event-streams/process-events-using-event-processor-editor.md).

### Transform data with update policies

[Update policies](/kusto/management/update-policy?view=microsoft-fabric&preserve-view=true) are automation mechanisms triggered when new data is written to a table. Update policies on tables provide an efficient way to apply rapid transformations.

Update policies are a good option if:

* Your data source isn't supported in Eventstreams.
* The transformations available in Eventstreams aren't sufficient for your needs.
* You want to have more control.
* You want to lower costs associated with your data management.

To use update policies, first land data in Eventhouse in one of the available methods, and then apply the transformation logic in the update policy. For more information, see [Implement medallion architecture in Real-Time Intelligence](architecture-medallion.md).

## Related content

* [Eventstream sources](event-streams/add-manage-eventstream-sources.md)
* [Connectors sources](data-connectors/data-connectors.md)
* [Get data sources](get-data-overview.md)
