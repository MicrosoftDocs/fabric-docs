---
title: Data ingestion options in Microsoft Fabric
description: Learn how Microsoft Fabric simplifies data ingestion with connectors, APIs, and tools for real-time and batch processing. Discover the best strategy for your needs.
#customer intent: As a data engineer, I want to understand how to use Eventstreams in Microsoft Fabric so that I can process and route real-time data efficiently.
author: SnehaGunda
ms.author: sngun
ms.reviewer: fabragaMS
ms.date: 02/11/2026
ms.topic: concept-article
ai-usage: ai-assisted
---

# Get data into Microsoft Fabric

Microsoft Fabric provides multiple options for ingesting data from disparate sources through connectors, APIs, and configuration-based tools.

## Real-time data ingestion

Real-Time Intelligence, Eventstreams, and Eventhouses serve complementary roles for handling streaming data. Eventstreams are the ingestion and processing pipelines for real-time events, while Eventhouses are the storage and query engines (built on Azure Data Explorer's Kusto technology) for analyzing those events at scale. You typically use an Eventstream to capture and route data into an Eventhouse, but you can use them independently depending on your needs.

:::image type="content" source="./media/get-data/real-time-event-stream.png" alt-text="Diagram of real-time datasets flowing to Eventstream or Eventhouse.":::

### Ingest and route events with Eventstream

[Eventstream](../real-time-intelligence/event-streams/overview.md) provides a no-code way to bring events into Fabric, perform in-stream transformations, and route the data to various destinations.

An Eventstream is a stream ingestion pipeline. You create an Eventstream and add one or more sources (connectors) to it. Fabric supports a wide range of [streaming sources](../real-time-intelligence/event-streams/add-manage-eventstream-sources.md), including Fabric-internal events like [Fabric workspace events](../real-time-intelligence/event-streams/add-source-fabric-workspace.md), [OneLake file events](../real-time-intelligence/event-streams/add-source-fabric-onelake.md), and [pipeline job events](../real-time-intelligence/event-streams/add-source-fabric-job.md).

After events start flowing, you can apply optional real-time [transformations through a drag-and-drop editor](../real-time-intelligence/event-streams/process-events-using-event-processor-editor.md). For example, you can filter events, compute aggregates over time windows, join multiple streams, or reshape fields—all without writing code.

You can deliver the processed stream concurrently to one or multiple [supported destinations](../real-time-intelligence/event-streams/add-manage-eventstream-destinations.md). You can also expose an Eventstream through a Kafka-compatible endpoint, so external producers and consumers can push or read Fabric event data by using Kafka protocols.

Eventstreams are transient conduits—they don't permanently store data. Instead, they stream data through memory and push it to the configured destinations. This architecture makes them ideal for real-time ETL (extract-transform-load) on incoming data or for forking streaming data to multiple targets. For example, you can use an Eventstream to ingest telemetry from IoT sensors, filter and aggregate it in real time, send the refined stream into an Eventhouse for analytics, and simultaneously route certain anomaly events directly to an Activator for alerting.

### Ingest data directly into Eventhouse

The [Eventhouse](../real-time-intelligence/eventhouse/overview.md) can ingest data directly from various sources without requiring you to build an Eventstream or Data Factory pipeline.

Fabric provides an integrated **Get Data** wizard on the Eventhouse that supports connecting to sources like [local files](../real-time-intelligence/get-data-local-file.md), [Azure Storage](../real-time-intelligence/get-data-azure-storage.md), [Amazon S3](../real-time-intelligence/get-data-amazon-s3.md), [Azure Event Hubs](../real-time-intelligence/get-data-event-hub.md), [OneLake](../real-time-intelligence/get-data-onelake.md), and more. You can feed data into a KQL database table in real time or batch with just a few configuration steps, all within the Eventhouse UI.

You can also select an existing [Fabric Eventstream as a source](../real-time-intelligence/get-data-eventstream.md). If you already have an Eventstream running (for example, ingesting from IoT Hub or Kafka), select that stream and pipe its output into a KQL database table without additional wiring.

## Batch data ingestion

The Data Factory experience is the hub for traditional ETL/ELT pipelines and integrates a rich library of connectors. Fabric Data Factory includes a [list of native connectors](../data-factory/connector-overview.md) to on-premises and cloud data stores (databases, SaaS applications, files, and more) that allow you to connect to virtually any source system.

### Orchestrate data movement with pipelines

:::image type="content" source="./media/get-data/batch-pipeline.png" alt-text="Diagram of batch datasets flowing through a pipeline.":::

You can build [Pipelines](../data-factory/pipeline-overview.md) that use these connectors to copy or transfer data into Fabric's OneLake or its analytical stores. This pattern has support for unstructured datasets (images, video, audio, and more), semi-structured datasets (JSON, CSV, XML), or structured datasets from supported relational database systems.

In a pipeline, you can combine multiple data orchestration components, including [data movement activities](../data-factory/activity-overview.md#data-movement-activities) (Copy data, Copy job), [data transformation activities](../data-factory/activity-overview.md#data-transformation-activities) (Dataflow Gen2, Delete data, Fabric Notebook, SQL script, and more), and [control flow activities](../data-factory/activity-overview.md#control-flow-activities) (ForEach loops, Lookup, Set Variable, Webhook activity, and more).

You can run a pipeline [on-demand](../data-factory/pipeline-runs.md#on-demand-pipeline-run), on a specified [schedule](../data-factory/pipeline-runs.md#scheduled-pipeline-runs) (for example, every two hours during weekdays), or in response to specific [events](../data-factory/pipeline-runs.md#event-based-pipeline-runs) (for example, when a new file is created in OneLake).

### Simplify data movement with Copy job

:::image type="content" source="./media/get-data/batch-copy-job.png" alt-text="Diagram of batch datasets using a Copy job.":::

[Copy job](../data-factory/what-is-copy-job.md) provides native support for multiple delivery styles, including bulk copy, incremental copy, and change data capture (CDC) replication. With Copy job, you use a simple interface to move data from a source to OneLake without building pipelines, while still having access to many advanced options. It supports many sources and destinations and provides more control than Mirroring but less complexity than managing pipelines with Copy activity.

## Replicate data with Fabric Mirroring

:::image type="content" source="./media/get-data/data-replication-mirroring.png" alt-text="Diagram of database mirroring data replication architecture.":::

With [Fabric Mirroring](../mirroring/overview.md), you can replicate external systems into Fabric in near real time through automated configuration. Connect to an external system (such as an Azure SQL Database, a SQL Server, Oracle, SAP, or Snowflake), and Fabric continuously replicates data (or just metadata) into OneLake. Three types of Mirroring are available:

* **Database mirroring**: Replicates entire databases and tables, so you can bring data from various systems together into OneLake.
* **Metadata mirroring**: Synchronizes metadata (such as catalog names, schemas, and tables) instead of physically moving the data. This approach uses shortcuts, ensuring the data remains in its source while still being accessible within Fabric.
* **Open mirroring**: Extends mirroring based on the open Delta Lake table format. This capability enables developers to write their application's change data directly into a mirrored database item in OneLake by using the open mirroring approach and public APIs.

Fabric listens for changes in the source system (through change data capture or similar mechanisms) and applies those changes in near real time to the mirrored copy. The result is a live, queryable dataset that stays in sync with the source with very low latency, without the need to build a complex ETL pipeline.

Mirroring currently [supports a variety of sources](../mirroring/overview.md#types-of-mirroring), including Azure SQL Database and Managed Instance, Azure Cosmos DB, Azure PostgreSQL, Google BigQuery, Oracle, SAP, Snowflake, and SQL Server (as well as data sources supported by [partner solutions that have implemented the Open Mirroring API](../mirroring/open-mirroring-partners-ecosystem.md)). Mirrored data from these sources is replicated into OneLake as up-to-date Delta tables. Because Fabric keeps these mirrored tables current, you can use them for real-time analytics or join them with other data in Fabric. This capability enables HTAP (hybrid transactional/analytical processing) scenarios where your operational data continuously flows into your analytical platform.

Mirroring removes the need to manually engineer incremental load pipelines. From a [Mirroring cost](../mirroring/overview.md#cost-of-mirroring) perspective, the compute operations to keep the mirrored database in sync don't consume Capacity Units (CUs) from your Fabric capacity, and the storage of mirrored data in OneLake is free of charge (up to the number of terabytes set by your Fabric SKU—for example, F64 gives you 64 TB of free storage for mirrored databases).

## Access external data with shortcuts

:::image type="content" source="./media/get-data/external-storage-shortcut.png" alt-text="Diagram of external storage shortcuts architecture.":::

Fabric offers [shortcuts](../onelake/onelake-shortcuts.md) for data virtualization. A shortcut in OneLake is a pointer to data that lives in an external storage system (for example, an Azure Data Lake Gen2 container, an Amazon S3 bucket, or a SharePoint library). Instead of physically copying the data, OneLake shortcuts virtually include external files as part of OneLake. For example, if you have a large data lake on AWS S3, you can create a shortcut in Fabric that references those S3 folders. Fabric then treats that external data as if it were in OneLake, enabling you to query or join it with local data—all without an initial bulk migration. This "no-copy ingestion" addresses scenarios where data residency or duplication is a concern and enables Fabric's architecture of one logical data lake.

OneLake can detect what type of data is connected through external shortcuts and apply either [file transformations](../onelake/shortcuts-file-transformations/transformations.md) or [AI transformations](../onelake/shortcuts-ai-transformations/ai-transformations.md) without creating a pipeline or writing any code. OneLake automatically keeps the output Delta table in sync with the source. For example, you can convert .csv files into Delta tables or apply AI-powered sentiment analysis to .txt files in a folder.

Combined with Data Mirroring, shortcuts provide flexible data access patterns. You can either [leave data in place (shortcut)](../onelake/onelake-overview.md#one-copy-of-data) or replicate it (Mirror) as needed. In both cases, the data becomes readily available to all Fabric analytics tools without complex ETL.

## Decision guide: Choose a data movement strategy

Microsoft Fabric provides several ways to bring data into Fabric based on your needs. You can use Eventstreams for real-time data, Mirroring, Copy activities in pipelines, Copy job, or shortcuts. Each option offers a different level of control and complexity, so you can pick what fits your scenario best. For more information, see [Microsoft Fabric decision guide: Choose a data movement strategy](../data-factory/decision-guide-data-movement.md).

## Related content

* [End-to-end data lifecycle in Microsoft Fabric](data-lifecycle.md)
* [Store data in Microsoft Fabric](store-data.md)
* [Prepare and transform data](prepare-data.md)
* [Analyze and train data in Microsoft Fabric](analyze-train-data.md)
* [Track and visualize data](track-visualize-data.md)
* [External integration and platform connectivity](external-integration.md)
