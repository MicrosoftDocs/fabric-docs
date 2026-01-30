---
title: Microsoft Fabric Data Ingestion Options Explained
description: Learn how Microsoft Fabric simplifies data ingestion with connectors, APIs, and tools for real-time and batch processing. Discover the best strategy for your needs.
#customer intent: As a data engineer, I want to understand how to use Eventstreams in Microsoft Fabric so that I can process and route real-time data efficiently.
author: SnehaGunda
ms.author: sngun
ms.reviewer: fabragaMS
ms.date: 01/19/2026
ms.topic: concept-article
---

# Get data

A converged platform must ingest data from many disparate sources, and Microsoft Fabric provides multiple options to do so through connectors, APIs, and configuration-based tools.

### Real-time datasets

Microsoft Fabric's Real-Time Intelligence, Eventstreams and Eventhouses serve complementary roles for handling streaming data. Eventstreams are the ingestion and processing pipelines for real-time events, while Eventhouses are the storage and query engines (built on Azure Data Explorer's Kusto technology) for analyzing those events at scale. In practice, you often use an Eventstream to capture and route data into an Eventhouse, but they can be used independently depending on your needs.

:::image type="content" source="./media/get-data/realtime-eventstream.png" alt-text="Screenshot of real-time datasets flowing to Eventstream or Eventhouse.":::

#### Eventstream

[Eventstream](/fabric/real-time-intelligence/event-streams/overview) provides a no-code way to bring events into Fabric, perform in-stream transformations, and route the data to various destinations. 

Architecturally, an Eventstream is a stream ingestion pipeline: you create an Eventstream and add one or more sources (connectors) to it. Fabric supports a wide range of [streaming sources](/fabric/real-time-intelligence/event-streams/add-manage-eventstream-sources), including Fabric-internal events (like [Fabric workspace events](/fabric/real-time-intelligence/event-streams/add-source-fabric-workspace), [OneLake file events](/fabric/real-time-intelligence/event-streams/add-source-fabric-onelake), [pipeline job events](/fabric/real-time-intelligence/event-streams/add-source-fabric-job)) as sources. 

Once events are flowing, Eventstreams allow optional real-time [transformations via a drag-and-drop editor](/fabric/real-time-intelligence/event-streams/process-events-using-event-processor-editor). For example, you can filter events, compute aggregates over time windows, join multiple streams, or reshape fields, all without writing code. 

This processed stream can then be delivered to one or multiple [supported destinations](/fabric/real-time-intelligence/event-streams/add-manage-eventstream-destinations) concurrently. You can even expose an Eventstream itself via a Kafka-compatible endpoint, so external producers/consumers can push or read Fabric event data using Kafka protocols. 

Importantly, Eventstreams are transient conduits and thus they do not permanently store data by themselves. Instead, they stream data through memory and push it to the configured destinations. This makes them ideal for scenarios where you need to perform real-time ETL (extract-transform-load) on incoming data or fork the streaming data to multiple targets. For example, you might use an Eventstream to ingest telemetry from IoT sensors, filter and aggregate it in real time, send the refined stream into an Eventhouse for analytics, and simultaneously send certain anomaly events directly to an Activator for alerting.

#### Eventhouse

Microsoft Fabric's [Eventhouse](/fabric/real-time-intelligence/eventhouse) can ingest data directly from various sources without requiring you to build an Eventstream or Data Factory pipeline manually. 

Instead, Fabric provides an integrated Get Data wizard on the Eventhouse, which supports connecting to sources like [local files](/fabric/real-time-intelligence/get-data-local-file), [Azure Storage](/fabric/real-time-intelligence/get-data-azure-storage) , [Amazon S3](/fabric/real-time-intelligence/get-data-amazon-s3), [Azure Event Hubs](/fabric/real-time-intelligence/get-data-event-hub), [OneLake](/fabric/real-time-intelligence/get-data-onelake), and more. This means you can feed data into a KQL database table in real-time or batch with just a few configuration steps, all within the Eventhouse UI.

You can also pick an existing [Fabric Eventstream as a source](/fabric/real-time-intelligence/get-data-eventstream). This is used if you already have an Eventstream running (perhaps ingesting from IoT Hub or Kafka); you can select that stream and pipe its output into a KQL database table without additional wiring.

### Batch datasets

Fabric's Data Factory experience is the hub for traditional ETL/ELT pipelines and integrates a rich library of connectors. In fact, Fabric Data Factory includes a long [list of native connectors](/fabric/data-factory/connector-overview) to on-premises and cloud data stores (databases, SaaS applications, files, etc.) which allows you to connect to virtually any source system. These are the Fabric artifacts related to data ingestion:

#### Pipeline

:::image type="content" source="./media/get-data/batch-pipeline.png" alt-text="Screenshot of batch datasets flowing through a pipeline.":::

You can build [Pipelines](/fabric/data-factory/pipeline-overview) that use these connectors to copy or transfer data into Fabric's OneLake or its analytical stores. This pattern has support for unstructured datasets(images, video, audio, etc.), semi-structured datasets (JSON, CSV, XML) or structured datasets from supported relational database systems.

In a Pipeline you can combine multiple data orchestration components such as [Data Movement activities](/fabric/data-factory/activity-overview#data-movement-activities) (Copy data, Copy job), [Data Transformation activities](/fabric/data-factory/activity-overview#data-transformation-activities) (Dataflow Gen2, Delete data, Fabric Notebook, SQL script, etc.) and [Control flow activities](/fabric/data-factory/activity-overview#control-flow-activities) (ForEach loops, Lookup, Set Variable, Webhook activity, etc.).

The execution of a Pipeline can be started [on-demand](/fabric/data-factory/pipeline-runs#on-demand-pipeline-run), or it can be scheduled to happen based on a specified [schedule](/fabric/data-factory/pipeline-runs#scheduled-pipeline-runs) (for example, every 2 hours during week days) or in response to specific [events](/fabric/data-factory/pipeline-runs#event-based-pipeline-runs) (for example, when a new file is created in OneLake).

#### Copy job

:::image type="content" source="./media/get-data/batch-copyjob.png" alt-text="Screenshot of batch datasets using a copy job.":::

The [Copy Job](/fabric/data-factory/what-is-copy-job) provides native support for multiple delivery styles, including bulk copy, incremental copy, and change data capture (CDC) replication. With a Copy job you can use a simple interface to move data from a data source to OneLake without the need to build pipelines, while still giving you access to many advanced options. It supports many sources and destinations, and provides more control than Mirroring but less complexity than managing pipelines with Copy activity.

### Data replication

:::image type="content" source="./media/get-data/datareplication-mirroring.png" alt-text="Screenshot of database mirroring data replication architecture.":::

[Fabric Mirroring](/fabric/mirroring/overview) enables near real-time replication of external systems into Fabric through automated configuration. With Mirroring, you establish a connection to an external system (for example, an Azure SQL Database, a SQL Server, Oracle, SAP, or even Snowflake) and Fabric will continuously replicate data (or just metadata) into OneLake. There are three different types of Mirroring:

* **Database mirroring**: Database mirroring allows replication of entire databases and tables, allowing you to bring data from various systems together into OneLake.
* **Metadata mirroring**: Metadata mirroring synchronizes metadata (such as catalog names, schemas, and tables) instead of physically moving the data. This approach leverages shortcuts, ensuring the data remains in its source while still being accessible within Fabric.
* **Open mirroring**: Open mirroring is designed to extend mirroring based on open Delta Lake table format. This capability enables developers to write their application's change data directly into a mirrored database item in OneLake, based on the open mirroring approach and public APIs.

Under the hood, Fabric listens for changes in the source system (via change data capture or similar mechanisms) and applies those changes in near real-time to the mirrored copy in Fabric. The result is a live, queryable dataset that stays in sync with the source with very low latency, without the user having to build a complex ETL pipeline. 

Mirroring currently [supports a variety of sources](/fabric/mirroring/overview#types-of-mirroring), including Azure SQL Database and Managed Instance, Azure Cosmos DB, Azure PostgreSQL, Google BigQuery, Oracle, SAP, Snowflake, and SQL Server (as well as data sources supported by [partner solutions that have implemented the Open Mirroring API](/fabric/mirroring/open-mirroring-partners-ecosystem)). Mirrored data from these sources are replicated into OneLake as up-to-date Delta tables. Because Fabric keeps these mirrored tables current, you can use them for real-time analytics or join them with other data in Fabric, essentially enabling HTAP (hybrid transactional/analytical processing) scenarios where your operational data is continuously flowing into your analytical platform. 

Mirroring removes the need to manually engineer incremental load pipelines. From a [Mirroring cost](/fabric/mirroring/overview#cost-of-mirroring) perspective, the compute operations to keep the mirrored database in sync do not consume Capacity Units (CUs) from your Fabric capacity and the storage of mirrored data in OneLake is free of charge (up to the limit of the number of Terabytes set by your Fabric SKU. For example, F64 gives you 64Tb of free storage for mirrored databases).

### External storage

:::image type="content" source="./media/get-data/externalstorage-shortcut.png" alt-text="Screenshot of external storage shortcuts architecture.":::

Fabric offers [Shortcuts](/fabric/onelake/onelake-shortcuts) for data virtualization. A Shortcut in OneLake is essentially a pointer or symbolic link to data that lives in an external storage system (for example, an Azure Data Lake Gen2 container, an Amazon S3 bucket, or a SharePoint library). Instead of physically copying the data, OneLake Shortcuts allow Fabric to virtually include external files as part of OneLake. For instance, if you have a large data lake on AWS S3, you can create a shortcut in Fabric that references those S3 folders; Fabric will then treat that external data as if it were in OneLake, enabling you to query or even join it with local data - all without an initial bulk migration. This "no-copy ingestion" addresses scenarios where data residency or duplication is a concern, and it enables Fabric's architecture of one logical data lake.

OneLake can detect what type of data is being connected via external Shortcuts and apply either [file transformations](/fabric/onelake/shortcuts-file-transformations/transformations) or [AI transformations](/fabric/onelake/shortcuts-ai-transformations/ai-transformations) without the need to create a Pipeline or to write any code. The output Delta table is kept in sync with the source by OneLake automatically. For example, you can convert .csv files into Delta tables or apply AI-powered sentiment analysis to .txt files sitting in a folder.

Combined with Data Mirroring, Shortcuts provide flexible data access patterns: you can either [leave data in place (Shortcut)](/fabric/onelake/onelake-overview#one-copy-of-data) or replicate it (Mirror) as needed, and in both cases, the data becomes readily available to all Fabric analytics tools without complex ETL.

### Decision guide: choose a data movement strategy

Microsoft Fabric gives you several ways to bring data into Fabric based on what you need. You can use Eventstreams for real-time data, Mirroring, Copy activities in Pipelines, Copy job, or Shortcuts. Each option offers a different level of control and complexity, so you can pick what fits your scenario best. Check out the [Microsoft Fabric decision guide: Choose a data movement strategy](/fabric/data-factory/decision-guide-data-movement) for further details that can help you choose the best strategy for your needs.

:::image type="content" source="./media/get-data/decision-guide-data-movement.svg" alt-text="Screenshot of decision guide for choosing a data movement strategy.":::