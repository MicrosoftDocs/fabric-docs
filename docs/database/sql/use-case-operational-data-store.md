---
title: Use SQL database as an Operational Data Store
description: This article outlines how to implement an operational data store (ODS) using SQL database in Microsoft Fabric.
author: WilliamDAssafMSFT
ms.author: wiassaf
ms.reviewer: pamela, imotiwala, antho
ms.date: 01/07/2026
ms.topic: solution-overview
---
# Use SQL database as an operational data store

**Applies to:** [!INCLUDE [fabric-sqldb](../includes/applies-to-version/fabric-sqldb.md)]

This article outlines how to implement an **operational data store (ODS)** using SQL database in Fabric. It provides architectural guidance, design patterns, workload characteristics, and Fabric specific considerations for building a secure, performant, and governed ODS.

:::image type="content" source="media/use-case-operational-data-store/use-case-operational-data-store.svg" alt-text="Diagram of the use case for SQL database in Fabric as an operational data store (ODS)." lightbox="media/use-case-operational-data-store/use-case-operational-data-store.png":::

## What is an ODS?

An **operational data store (ODS)** is a subject-oriented, integrated, and near real-time store that consolidates data from multiple operational systems into a lightly curated, normalized model - typically in normalized schemas. It supports operational reporting, lightweight analytics, API serving, and downstream propagation to analytical layers such as the **Fabric Warehouse** or **Fabric Lakehouse**.

An ODS is **not** a source online transaction processing (OLTP) system or a dimensional warehouse.

Instead, it serves as the "hot, harmonized truth" for the last _N_ minutes, hours, or days, sitting between source systems and analytical platforms.

## Key characteristics of an ODS

An operational data store (ODS) in Microsoft Fabric is designed to deliver a near real-time view of operational data with strong governance and performance guarantees. 

- It ingests data from multiple source systems, with low latency. 
- The schema is typically normalized in third normal form (3NF), to support flexibility and traceability. 
- Data quality is enforced through deduplication, identity resolution, and handling of late-arriving or soft-deleted records, creating a reliable foundation for operational reporting and downstream analytics. 
- Serving patterns include SQL-based queries, operational dashboards, alerts, and APIs, while Fabric governance features ensure compliance and security across the data lifecycle. 

SQL database in Fabric serves as a secure and efficient conduit between operational data and analytical platforms. 

## Components

The following components are involved in using SQL database in Fabric as an operational data store:

- **Constraints and keys**: Enforce business logic and referential integrity (natural keys, surrogate keys, foreign keys).
- **Identity resolution**: Deduplicate across sources; apply survivorship rules.
- **Serving**: Expose GraphQL endpoints and/or build Power BI dashboards.

## Ingestion and workload best practices

Building an ODS on SQL database in Fabric requires ingestion strategies that balance freshness, reliability, and performance.

- Batch and incremental loads are typically orchestrated through Fabric Data Pipelines using change data capture-enabled connectors, with watermarking and retry logic to ensure consistency. 
    - Tune pipeline concurrency to allow the SQL database to scale during peak loads while meeting service-level objectives for data freshness. 
    - Watermarking is an important concept in incremental copy processes. It helps you easily identify where an incremental load last stopped.
- Perform heavy transformations upstream in Dataflow Gen2 or Spark Notebooks. Reserve the SQL layer for final `MERGE` operations that enforce constraints and maintain OLTP-like performance.  
- Use idempotent design patterns that combine change detection, watermarking, T-SQL MERGE, and control tables for safe restarts and operational resilience.

## Engine and environment

SQL database in Fabric is based on the same SQL Database Engine as Azure SQL Database, delivering a familiar T-SQL experience with full compatibility for standard client tools. 

By using SQL database in Microsoft Fabric, you can create end-to-end workflows from ingestion to analytics by using other features in Microsoft Fabric:

- Data Pipelines
- Dataflow Gen2
- Notebooks
- Real-Time Intelligence
- Power BI
- All with streamlined DevOps by using Git-based CI/CD

## Related content

- [Use SQL database in reverse ETL](use-case-reverse-etl.md)
- [Use SQL database as the source for translytical applications](use-case-translytical-applications.md)
- [Intelligent applications and AI](/sql/sql-server/ai/artificial-intelligence-intelligent-applications?toc=/fabric/database/toc.json&bc=/fabric/breadcrumb/toc.json&view=fabric-sqldb&preserve-view=true)