---
title: Eventhouse ingestion overview
description: Learn how to make a decision about which ingestion method to use to get data into an Eventhouse in Real-Time Intelligence.
ms.reviewer: tzgitlin
ms.author: yaschust
author: YaelSchuster
ms.topic: concept-article
ms.date: 12/11/2024
# customer intent: As a user, I want to learn about the available ingestion methods for Eventhouse in Real-Time Intelligence so that I can make an informed decision about which method to use.
---
# Eventhouse ingestion overview

Data ingestion in an [Eventhouse](eventhouse.md) is the process of loading data. During this process, data undergoes schema matching, organization, indexing, encoding, and compression. Once ingested, data is available for query.

This article outlines the various methods for ingesting data into an Eventhouse and helps you decide which is the most suitable method for your scenario.

## Ingestion methods


The following schematic shows possible ingestion architectures and transformations that can be applied to data before or after it lands in Eventhouse:

:::image type="content" source="media/eventhouse-ingestion-overview/schematic-ingestion-methods.png" alt-text="Schematic image showing all possible ingestion methods and their paths to Eventhouse." lightbox="media/eventhouse-ingestion-overview/schematic-ingestion-methods.png":::

### Eventstreams

The [eventstreams](event-streams/overview.md) experience lets you bring real-time events into Fabric, transform them, and then route them to various destinations without writing any code (no-code). You create an eventstream, which is an instance of the Eventstream item in Fabric, add event data sources to the stream, optionally add transformations to transform the event data, and then route the data to supported destinations. 

For a list of supported sources, see [Supported sources](event-streams/add-manage-eventstream-sources.md#supported-sources).

### Programmatic connectors

For data in sources that are not supported by Eventstreams, you can use programmatic connectors to ingest data into Eventhouse. Some programmatic connectors support streaming data, while others are blob-based.

For a full list of connectors, functionality, and use cases, see [Data connectors overview](data-connectors/data-connectors.md).

### Get data experience

### OneLake

## Where should transform my data?

There are several ways to transform data that will eventually land in Eventhouse. The best method for you depends on your specific requirements and constraints. Here are some considerations to help you decide:

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

If the transformations available in Eventstreams are not sufficient for your needs, you want to have more control, or lower costs associated with your data management, you can use update policies in Eventhouse to transform data. [Update policies](/kusto/management/update-policy?view=microsoft-fabric&preserve-view=true) are automation mechanisms triggered when new data is written to a table. Update policies on tables provide an efficient way to apply rapid transformations and are compatible with the [medallion lakehouse architecture](../onelake/onelake-medallion-lakehouse-architecture.md).

To use update policies, first land data in Eventhouse in one of the available methods, and then apply the transformation logic in the update policy.