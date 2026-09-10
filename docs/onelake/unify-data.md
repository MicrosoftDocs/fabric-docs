---
title: Unify data with OneLake shortcuts and mirroring
description: Learn how shortcuts and mirroring make data across your estate available through OneLake, and how to choose between them.
ms.reviewer: mideboer
ms.topic: overview
ms.date: 07/15/2026
ai-usage: ai-assisted
#customer intent: As a data professional, I want to understand how shortcuts and mirroring unify data in OneLake so that I can choose the right approach for my scenario.
---

# Unify data with OneLake shortcuts and mirroring

[OneLake](onelake-overview.md) gives you one view of data across clouds, domains, and accounts. Unifying data in OneLake doesn't require storing all of that data in one place. The data can stay at its source or be replicated into OneLake, where Fabric workloads access it through a shared namespace.

Shortcuts and mirroring are complementary OneLake capabilities for creating this unified view without building and operating data movement pipelines. Shortcuts add selected data to the OneLake namespace. Mirroring adds an external database or catalog and determines whether its data can be accessed in place or must be replicated. This article explains how each capability works and when to use them. For the broader set of ways to ingest, transform, or move data in Fabric, see [Get data into Microsoft Fabric](../fundamentals/get-data.md) or [Choose a data movement strategy](../data-factory/decision-guide-data-movement.md).

## Shortcuts and mirroring at a glance

Shortcuts and mirroring operate at different levels of granularity and support different source formats.

| Capability | What it does | Source formats | Typical scenario |
| --- | --- | --- | --- |
| [Shortcuts](onelake-shortcuts.md) | Add a reference to selected tables, folders, or files in OneLake or external storage. The data stays at its source. | Open formats only | Bring a single table, folder, or schema into a lakehouse, or enable data mesh patterns across workspaces or tenants. |
| [Mirroring](../mirroring/overview.md) | Add an external database or catalog to Fabric. Depending on the source, mirroring accesses the data in place or continuously replicates it into OneLake. | Open and proprietary formats | Bring in an entire external database or catalog, such as Snowflake, Azure Databricks, or Azure SQL Database. |

If your source stores data in a proprietary format, mirroring is your only option.

## When to use shortcuts

Use shortcuts when you want to include specific data in your unified OneLake view without copying it. Choose shortcuts when you:

- Share a single table, folder, or file across workspaces or tenants.
- Combine data from multiple lakes or cloud accounts into one unified view.
- Build data mesh patterns where each domain owns its data and other domains discover it through OneLake.
- Make data in open formats, such as Delta or Iceberg, available from Azure Data Lake Storage, Amazon S3, Google Cloud Storage, or Dataverse.

Shortcuts work at the table, folder, or file level. You decide which data to make available and where it appears in OneLake. For more information, see [OneLake shortcuts](onelake-shortcuts.md).

### Transform data as you unify it

Shortcut transformations convert the data behind a shortcut into a queryable Delta table that stays in sync with the source, without building an ETL pipeline. Use them to make your data analytics-ready:

- **File transformations** convert structured files, such as CSV, Parquet, JSON, or Excel, into Delta tables. For more information, see [Shortcut transformations (file)](shortcuts/transformations.md).
- **AI-powered transformations** apply language processing to `.txt` files to summarize content, detect sentiment, translate languages, redact personally identifiable information (PII), or extract named entities. For more information, see [Shortcut transformations (AI-powered)](shortcuts/transformations-ai.md).

## When to use mirroring

Use mirroring when you want to include an external database or catalog, and the data behind it, in Fabric as a unit. Mirroring is the right choice when you:

- Make an entire external database or catalog available in Fabric without designing a separate ingestion process.
- Keep an analytics-ready copy of an operational database (such as Azure SQL Database, PostgreSQL, or Cosmos DB) in OneLake that stays in sync with the source.
- Surface an external lakehouse or warehouse (such as Databricks Unity Catalog or Snowflake) in Fabric so you can query it alongside your Fabric data.

Mirroring always adds the catalog metadata, such as databases, schemas, and tables, to Fabric. How Fabric accesses the data depends on the source, as the next section describes.

### How mirroring makes data available in OneLake

Mirroring uses two underlying mechanisms to include external data in the unified OneLake view. The right combination depends on how the source stores its data.

- **Replication.** Mirroring copies data from the source into OneLake in an analytics-ready Delta format. Mirroring uses replication when the source stores data in a proprietary format.
- **Shortcuts.** Mirroring references data in place through OneLake shortcuts. Mirroring uses shortcuts when the source stores data in an open format that OneLake can read directly.

Different sources use these mechanisms differently, as shown in the following table.

| Source pattern | Examples | What mirroring does |
| --- | --- | --- |
| Database mirroring (replication) | Azure Cosmos DB, Azure Database for PostgreSQL, Azure Database for MySQL (preview), Azure SQL Database, SQL Server, Oracle, SAP | Mirroring copies the catalog metadata and continuously replicates the data into OneLake as Delta tables. |
| Metadata mirroring (shortcuts) | Azure Databricks, Snowflake, Dremio (preview) | Mirroring adds the catalog metadata to Fabric and uses shortcuts to reach the underlying data in place. |

In every case, mirroring adds the catalog metadata to Fabric. Whether it also copies the data depends on the source.

## Use shortcuts and mirroring together

Shortcuts and mirroring aren't mutually exclusive. You can use them together in many scenarios. For example, use mirroring to add a source system to Fabric once, and then create shortcuts to make selected data from that system available across workspaces, domains, or tenants. If mirroring replicates the source data into OneLake, shortcuts to that data don't create another copy or add storage cost.

Common patterns that combine the two capabilities include:

- **Mirror once, consume everywhere.** A central workspace mirrors an external database or catalog, such as an Azure SQL Database or a Snowflake account. Other workspaces in the same tenant have shortcuts to the mirrored tables instead of mirroring the same source again. One mirrored item represents the source, and every consumer reads the same up-to-date data.
- **Domain mirroring with mesh consumption.** Domain teams mirror their own source systems into their domain workspaces. Downstream lakehouses and warehouses in consumer workspaces use shortcuts to access only the tables they need from the mirrored database. Each domain owns its connection to the source, and consumers stay decoupled from the source system.
- **One lakehouse, multiple data locations.** A single lakehouse can contain shortcuts to mirrored tables alongside shortcuts to open-format data in Azure Data Lake Storage, Amazon S3, or another OneLake location. Reports and notebooks query the lakehouse as one unified store, whether the underlying data remains at its source or is replicated into OneLake.
- **Cross-tenant or cross-cloud access.** One tenant mirrors a source into its own OneLake. A partner tenant creates a shortcut to the mirrored data instead of being granted direct access to the source system. The source system's credentials never leave the producing tenant.

A few things to know when you combine them:

- Shortcuts to mirrored tables inherit the security model of the mirrored item. Permissions on the mirrored database, schema, or table flow through to anyone reading through the shortcut. For more information, see [OneLake shortcut security](onelake-shortcut-security.md).
- Shortcuts to mirrored tables are read-only. To change the data, change the source system and let mirroring propagate the update.
- If the mirrored source is paused, deleted, or runs into a replication error, every shortcut that points to it shows the same state. Plan ownership and monitoring of the mirrored item accordingly.

## When to use data movement instead

Shortcuts and mirroring unify data by making it available through OneLake, and shortcut transformations can convert that data into analytics-ready Delta tables. They aren't replacements for Fabric's full set of ingestion and data movement tools. Choose a pipeline, dataflow, copy job, or eventstream when you need to:

- Apply complex or multi-source transformation logic (for example, joining sources, applying business rules, or reshaping schemas) that goes beyond what shortcut transformations do.
- Schedule, orchestrate, or trigger movement on your own cadence.
- Move data into a destination outside OneLake.
- Stream events into Fabric for real-time processing.

These scenarios require Fabric's data movement and integration tools rather than OneLake unification alone.

- For an end-to-end view of every way to bring data into Fabric, see [Get data into Microsoft Fabric](../fundamentals/get-data.md).
- For a direct comparison of pipelines, copy jobs, mirroring, and eventstreams, see the [Choose a data movement strategy](../data-factory/decision-guide-data-movement.md) decision guide.

## Related content

- [Shortcuts in OneLake](onelake-shortcuts.md)
- [What is mirroring in Fabric?](../mirroring/overview.md)
- [Get data into Microsoft Fabric](../fundamentals/get-data.md)
- [Choose a data movement strategy](../data-factory/decision-guide-data-movement.md)
