---
title: End-to-end data lifecycle in Microsoft Fabric
description: Learn how Microsoft Fabric's architecture unifies data ingestion, storage, preparation, analytics, and visualization into a single cohesive system.
#customer intent: As a data professional, I want to understand the end-to-end data lifecycle in Microsoft Fabric so that I can effectively use its integrated capabilities.
author: SnehaGunda
ms.author: sngun
ms.reviewer: fabragaMS
ms.date: 02/10/2026
ms.topic: concept-article
ai-usage: ai-assisted
---

# End-to-end data lifecycle in Microsoft Fabric

Organizations typically rely on multiple disconnected services to ingest, store, transform, analyze, and visualize data. This fragmentation creates data silos, increases integration overhead, and slows time to insight. Microsoft Fabric addresses these challenges by unifying every stage of the data lifecycle into a single platform built on a shared foundation.

At the center of this architecture is [OneLake](../onelake/onelake-overview.md), a single organizational data lake that stores all data in open Delta Parquet format. OneLake is provisioned automatically with every Fabric tenant. Because every Fabric workload reads from and writes to OneLake, data doesn't move between engines. A dataset ingested through a pipeline, refined in a notebook, and visualized in a Power BI report stays in one place throughout its journey.

The data lifecycle consists of six stages, and Fabric provides purpose-built tools for each:

- **Get data**: Bring data into OneLake from hundreds of sources in real time, on a schedule, through continuous database replication, or by referencing external storage in place.

- **Store data**: Persist data in storage formats optimized for your workload, whether that's flexible big data analytics, structured SQL queries, real-time event analysis, transactional processing, or governed business reporting.

- **Prepare and transform**: Clean, reshape, and enrich data using low-code visual transformations or code-first notebooks and reusable functions, without moving data out of OneLake.

- **Analyze and train**: Build and operationalize machine learning models, run advanced analytics, query data programmatically, and explore insights through natural-language AI agents.

- **Track and visualize**: Surface insights through interactive reports, monitor live data streams on real-time dashboards, and trigger automated actions when conditions are met.

- **External integration**: Securely connect to external services for automation, collaboration, governance, developer tooling, and CI/CD.

The following diagram shows how these stages connect and which Fabric items participate at each stage. Each stage is covered in depth in a dedicated article. Use the links in each section to explore the capabilities and tools available at that stage.

:::image type="content" source="./media/data-lifecycle/fabric-data-lifecycle.png" alt-text="Diagram showing the end-to-end data lifecycle in Microsoft Fabric, from data ingestion through storage, preparation, analytics, and visualization." lightbox="./media/data-lifecycle/fabric-data-lifecycle.png":::

## Get data

Different types of datasets come from a wide variety of data sources across different data scenarios, including data replication, external storage references, batch datasets, and real-time data streams. You ingest and transform these datasets through Fabric's integration tools. The data lands in [OneLake](../onelake/onelake-overview.md), the centralized data storage for all of Fabric. Key ingestion methods include:

- **Eventstreams** for real-time event ingestion and routing.
- **Data pipelines** for batch and scheduled data movement with more than 200 connectors.
- **Mirroring** for continuous replication from operational databases without building ETL pipelines.
- **Shortcuts** for no-copy data virtualization from external storage like Azure Data Lake, Amazon S3, or Google Cloud Storage. Shortcuts can also reference data shared from other Fabric workspaces or tenants.
- **OneLake data sharing** for cross-tenant access to live, governed datasets without copying data across organizational boundaries.

For more information, see [Get data into Microsoft Fabric](get-data.md).

## Store data

Once ingested, all data lands in OneLake in open Delta Parquet format. OneLake provides a single data lake for your entire organization with no separate provisioning needed. Because OneLake maintains a single copy of the data, you can share governed datasets across tenants by using OneLake data sharing without duplicating storage. Fabric offers several storage items optimized for different workloads:

- **Lakehouse** for flexible big data storage that combines files and managed Delta tables with an automatic SQL endpoint.
- **Warehouse** for structured, relational analytics with full T-SQL support, stored procedures, and ACID transactions.
- **Eventhouse** for real-time analytics on streaming and telemetry data by using Kusto Query Language (KQL).
- **SQL Database** for transactional workloads and operational analytics.
- **Semantic models** for curated business logic, measures, and hierarchies that power reports and AI.

For more information, see [Store data in Microsoft Fabric](store-data.md).

## Prepare and transform data

Once in OneLake, you can further transform the data by using either code-first engines or low-code tools, all within Fabric with no data movement between engines:

- **Dataflow Gen2** provides a low-code Power Query interface for data cleansing, transformation, and enrichment.
- **Notebooks** offer a Jupyter-like environment for Python, T-SQL, and Scala-based data engineering.
- **User Data Functions** allow you to embed reusable custom Python logic that can be invoked from pipelines, notebooks, and Activator rules.

For more information, see [Prepare and transform data](prepare-transform-data.md).

## Analyze data and train models

Use the prepared data to train ML models and perform advanced analytics. Fabric's Data Science workload provides an environment for building, training, and operationalizing ML models:

- **MLflow experiments** track model training runs with automatic logging of hyperparameters, metrics, and items.
- **ML models** are registered in an MLflow-powered registry for versioning, metadata tracking, and reproducibility.
- **Data agents** and **operations agents** let you interact with data by using natural language and act on conditions and patterns found.
- **GraphQL APIs** provide a flexible data-access layer for developers to query multiple Fabric data sources through a single endpoint.
- **Copilot for Power BI** uses generative AI for ad-hoc analysis, DAX generation, and natural-language data exploration.

For more information, see [Analyze and train data in Microsoft Fabric](analyze-train-data.md).

## Track and visualize data

Use the prepared and modeled data to create reports, dashboards, and real-time alerts:

- **Power BI reports** provide interactive data visualization built on semantic models, with distribution across Microsoft 365 apps like Teams, SharePoint, PowerPoint, and Excel.
- **Translytical taskflows** enable users to take action directly from Power BI reports by calling user data functions.
- **Real-Time Intelligence dashboards** monitor streaming data with sub-second latency by using KQL queries and visual authoring.
- **Activator** detects conditions in streaming data and triggers automated actions such as Teams alerts, emails, or Power Automate flows.
- **Fabric IQ** maps enterprise data to a shared business ontology and enables AI agents to reason over your data with full business context.

For more information, see [Track and visualize data](track-visualize-data.md).

## External integration

Fabric integrates with external systems for both data ingestion and insights delivery:

- **Power Automate** and **Data Activator** enable real-time workflow automation based on data conditions.
- **Microsoft 365** integration surfaces insights in Teams, SharePoint, PowerPoint, and Excel.
- **REST APIs** and **client libraries** provide programmatic access to Fabric resources.
- **Microsoft Entra ID** handles authentication, conditional access, and service principal support.
- **Git integration** with Azure DevOps and GitHub enables version control and CI/CD for Fabric items.
- **Microsoft Purview** provides unified data governance, cataloging, and compliance across the Fabric data estate, including data shared across tenants through OneLake data sharing.

For more information, see [External integration and platform connectivity](external-integration.md).

## Natural language and AI support

Natural language support comes in the form of Power BI Copilot, Data Agents, and Operations Agents, which can reason over enterprise data in OneLake and produce answers based on the data items that users can access. You can integrate Data Agents into Microsoft 365 Copilot, Microsoft Foundry, and Copilot Studio so users can get insights from OneLake within their existing workflows across different applications.

## Related content

- [Get data into Microsoft Fabric](get-data.md)
- [Store data in Microsoft Fabric](store-data.md)
- [Prepare and transform data](prepare-transform-data.md)
- [Analyze and train data in Microsoft Fabric](analyze-train-data.md)
- [Track and visualize data](track-visualize-data.md)
- [External integration and platform connectivity](external-integration.md)