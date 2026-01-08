---
title: Use SQL database as the Target of a Reverse ETL Workload
description: Learn how to use SQL database in Fabric as a reverse ETL target in Microsoft Fabric.
author: WilliamDAssafMSFT
ms.author: wiassaf
ms.reviewer: pamela, imotiwala, antho
ms.date: 01/07/2026
ms.topic: solution-overview
---
# Use SQL database in reverse ETL 

**Applies to:** [!INCLUDE [fabric-sqldb](../includes/applies-to-version/fabric-sqldb.md)]

This article describes how to use SQL database in Fabric as a **reverse ETL** target within a Fabric-based data estate. It provides architectural guidance, operational patterns, and implementation considerations for moving curated data from analytical sources (such as Microsoft Fabric Data Warehouse or Fabric Lakehouse) into SQL database in Fabric for operational consumption by applications, APIs, and real-time experiences.

## What is reverse ETL in Fabric?

Many customers have invested significant time and effort in creating **extract, transform, load (ETL)** processes to transform raw operational data into more refined analytical data that can be used for business reporting. The end result of an ETL process is typically an analytical store such as a warehouse or lakehouse that a reporting layer like Power BI accesses. This architecture serves business users well, but reporting is relatively static and insights can only be derived by human intervention. By using **reverse ETL**, you can feed the transformed data back into operational systems so that applications and agents can gain insights from this analyzed data in real time. **Reverse ETL** pushes data from facts and dimensions in analytical stores into a serving layer where it can be accessed via endpoints such as **GraphQL** or directly through **TDS (Tabular Data Stream)** queries.

While you can connect operational applications directly to a warehouse or lakehouse, these data stores are designed for analytical workloads. Operational data stores, like SQL database in Fabric, are designed to support transactional queries, and they provide better performance and scalability for operational workloads. Operational databases also give you the option to further enrich data with vector embeddings and additional metadata to facilitate vector and hybrid search as well as **retrieval-augmented generation (RAG)**.

- In this pattern, the **warehouse** or **lakehouse** remains the analytical system of record.
- **SQL database in Fabric** serves as an operational store that offers low latency, refined indexing, strict data and relationship constraints, and the SLAs expected by application teams.

### Common reverse ETL targets

Common reverse ETL targets typically represent curated, high-value data slices that operational systems can consume with **minimal transformation**. These targets are designed to deliver low-latency access to trusted data while preserving business logic applied in the analytical layer. Examples include:

- **Customer and User data** (for example, engagement metrics like session activity, feature usage, and interactions)
- **Sales and Marketing data** (for example, scoring metrics like propensity to buy, engagement scores, likelihood to convert)
- **Operational and Transactional data** (for example, order and inventory data like stock levels, order status, and delivery timings)
- **AI/ML Derived data** (for example, personalized product recommendations, predictive scores like churn risk or upsell propensity, or sentiment analysis)

## Data movement mechanisms

The process starts by defining your source data, setting the destination, and then selecting a data movement mechanism. Choose one or more of the following mechanisms to move data from your analytical store into SQL database in Fabric.

> [!TIP] 
> As a general rule, use:
> - **Pipelines** for simple copy and scheduled loads.
> - **Dataflows Gen2** for low-code transformations.
> - **Spark** for complex and large-scale processing (including machine learning).
> - **Cross-item T-SQL** where available to keep operations SQL-centric, for example, joining a table in SQL database to a table in a warehouse or SQL analytics endpoint.

| **Mechanism** | **Use when** | **Strengths** | **Considerations** |
|---|---|---|---|
| **Fabric Data Pipelines** | You need managed, repeatable loads (batch or micro-batch) of data copy operations | First-class integration; supports watermarking and stored procedures | Concurrency; scale SQL database during loads |
| **Dataflow Gen2** | You need low-code data transformations and enhanced process logic | Business-friendly; supports column shaping and cleansing | Lower throughput for large volumes; plan partitioning |
| **Spark (notebooks/jobs)** | You need complex code-based transforms and large-scale reshaping | Full code control; efficient Delta reads; JDBC write support | Authentication and batching; avoid large transactions |
| **Cross-item T-SQL queries** | You need in-database SQL movement between Fabric items | Minimal plumbing; SQL-native; easy to schedule | |

## Reference architecture: reverse ETL to SQL database in Fabric

The reference architecture for reverse ETL in Fabric brings together the essential building blocks required to operationalize curated analytical data. It shows how data flows from trusted analytical sources through transformation layers into a structured SQL database. The operational database serves as the interface for downstream systems. This pattern ensures that applications, APIs, and reporting tools can access low-latency, high-quality data without compromising the integrity of the analytical system of record. 

The core components of this flow include:

- **Source**: Curated datasets from a **Fabric Data Warehouse** or **Lakehouse (Delta)**.
- **Transforms**: Reverse ETL transformations applied using **Pipelines**, **Dataflow Gen2**, **Spark**, or **cross-item T-SQL**.
- **Target**: **SQL database in Fabric** with defined landing, history (optional), quarantine, and serving schemas.
- **Consumers**: Applications via **GraphQL** or **TDS**, APIs, and **Power BI** for real-time dashboards and reporting.

:::image type="content" source="media/use-case-reverse-etl/use-case-reverse-etl.svg" alt-text="Diagram of a reverse ETL reference architecture involving SQL database in Fabric." lightbox="media/use-case-reverse-etl/use-case-reverse-etl.png":::

### Components

The following components are involved in the general flow for using SQL database in Fabric as a reverse ETL target. 

#### Serving and landing schemas

- Map source data to appropriate landing schemas in SQL database in Fabric.
- Optionally maintain a `history` schema for auditability.
- Use a `quarantine` schema for rejects (data quality issues).
- Define a `serving` schema for downstream consumption with appropriate constraints and indexing.

#### Orchestration

- Schedule transfers in Fabric by using **Pipelines**, **Dataflows**, or **Spark Jobs**.
- Use built-in scheduling to configure cadence, start time, and time zone.
- Schedule **Spark Notebooks** via the Fabric portal or API.
- Monitor end-to-end runs in the **Fabric Monitoring hub**.

#### Consumption

- Expose data through **GraphQL** endpoints or **T-SQL** via **TDS** by using client libraries such as **ADO.NET** (and others).
- Build **Power BI** dashboards and visualizations directly over SQL database in Fabric.

#### Governance and security

- Use **Microsoft Entra ID** for authentication and authorization.
- Combine **Fabric workspace roles permissions** and **SQL permissions** for granular control.
- Optionally, configure **customer-managed keys** for encryption of data at rest.
- Audit access and secure data in transit by using **Private Link**.

## Application serving

Once you curate and refresh data in the SQL database, shift focus to enabling fast, reliable access for operational consumers. In this context, **application serving** means exposing trusted datasets through low-latency interfaces that align with modern application patterns.

After data is landed and refreshed in SQL database in Fabric:

- To serve operational workloads, expose data via **GraphQL** endpoints or the **TDS** protocol, to be consumed through **ADO.NET** and other client libraries. For example, provide product information, supply chain, or customer service use cases.
- Pair the dataset with **Power BI** to deliver real-time dashboards and self-service analytics.

## Fabric-specific considerations

SQL database in Fabric uses the same SQL Database Engine as **Azure SQL Database** and is controlled, secured, billed, and operated through the **Fabric portal**. It also offers built-in mirroring into **Delta/Parquet** files stored in **Microsoft OneLake**, accessed via a **SQL analytics endpoint**. Since it is in the Microsoft Fabric environment, there are a few considerations to consider as you create your design:

- **Feature parity**: SQL database in Fabric is converging with Azure SQL Database. Validate specific [features](limitations.md#features-of-azure-sql-database-and-fabric-sql-database) you require to ensure fit-for-purpose, and monitor [roadmap updates](https://roadmap.fabric.microsoft.com/?product=sqldatabase).
- **Security model**: SQL database in Fabric uses **Microsoft Entra ID** authentication only. Plan identities for Pipelines, Dataflows, and Spark jobs accordingly.
- **Replication**: SQL database in Fabric automatically replicates read-only data to **OneLake**. This synchronization is useful for reporting and analysis needs, while the database remains available for read/write operational workloads.

## Related content 

- [Use SQL database as an operational data store](use-case-operational-data-store.md)
- [Use SQL database as the source for translytical applications](use-case-translytical-applications.md)
- [Intelligent applications and AI](/sql/sql-server/ai/artificial-intelligence-intelligent-applications?toc=/fabric/database/toc.json&bc=/fabric/breadcrumb/toc.json&view=fabric-sqldb&preserve-view=true)