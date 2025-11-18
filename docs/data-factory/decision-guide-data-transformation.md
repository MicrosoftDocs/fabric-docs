---
title: "Microsoft Fabric Decision Guide: Choose a data transformation strategy"
description: "Identify the best strategy for your Microsoft Fabric data transformation."
author: KrishnakumarRukmangathan
ms.author: krirukm
ms.date: 11/18/2025
ms.topic: concept-article
ms.custom:
---

# Microsoft Fabric decision guide: Choose a data transformation strategy

> **Note**  
> To get the most out of this article, we recommend reviewing [**Query Folding Basics**](/power-query/query-folding-basics), which provides essential background that will help you understand the concepts discussed here.



Microsoft Fabric Dataflows Gen2 offers multiple ways to ingest, transform, and load data efficiently, helping you balance **performance**, **scalability**, and **cost**.

Depending on your transformation needs, you can choose from three powerful capabilities:

- **Fast Copy** – Accelerate bulk data movement with minimal transformation.  
- **Modern Evaluator** – Optimize complex transformation performance for non-foldable queries.  
- **Partitioned Compute** – Scale transformations across large and partitioned datasets.

This guide explains **when and why** to use each feature, supported by real-world examples and benchmarking results.


### When to use each capability

| Capability          | Flagship scenario                                    | Ideal workload                                      | Supported sources | Typical benefits |
|--------------------|------------------------------------------------------|------------------------------------------------------|-------------------|------------------|
| **Fast Copy**       | Copy data directly from source to destination        | Straight copy or ingestion workloads with minimal transformations | ADLS Gen2, Blob storage, Azure SQL DB, Lakehouse, PostgreSQL, On-premises SQL Server, Warehouse, Oracle, Snowflake, Fabric SQL DB | High-throughput data movement, lower cost |
| **Modern Evaluator** | Transforming data from connectors that don’t fold   | Complex transformations                              | Azure Blob Storage, ADLS Gen2, Lakehouse, Warehouse, OData, Power Platform Dataflows, SharePoint Online List, SharePoint folder, Web | Faster data movement and improved query performance |
| **Partitioned Compute** | Partitioned datasets                             | High-volume transformations across multi-file sources | ADLS Gen2, Azure Blob Storage, Lakehouse files, Local folders | Parallelized execution and faster processing |


### Benchmark dataset

All scenarios in this guide use the [**New York City Taxi & Limousine Commission (TLC) Trip Data – TLC Trip Record Data**](https://www.nyc.gov/site/tlc/about/tlc-trip-record-data.page) dataset, which contains billions of records detailing taxi trips across NYC.

- **Data format:** Parquet files stored in ADLS Gen2  
- **Data size:** Multi-gigabyte datasets for years 2021–2025 (up to August)  
- **Destination:** Fabric Lakehouse and Warehouse  
- **Goal:** Demonstrate execution time improvements using Dataflow Gen2 capabilities  

This consistent dataset provides a fair and controlled environment to compare Fast Copy, Modern Evaluator, and Partitioned Compute strategies.



## Scenario 1: Accelerating bulk ingestion with Fast Copy

### Background
The NYC Taxi analytics team needs to load millions of raw Parquet trip records from ADLS Gen2 into a Fabric Lakehouse. No transformations are required, only a direct copy to support downstream analytics.

### Challenges
- Move large volumes of Parquet data quickly into the Lakehouse.  
- Reduce ingestion time for daily refreshes.  
- Minimize compute cost for simple EL workloads.

### Solution
The team enables **Fast Copy** in Dataflows Gen2. Fast Copy optimizes data movement paths and parallelizes writes for supported connectors.

#### Fast Copy considerations
- Supports **.csv** and **.parquet** file formats.  
- Supports up to **1M rows per table per run** for Azure SQL Database.  
- Best suited for **extract–load** workflows with minimal transformations.

#### Dataset
Year-wise merged NYC Yellow Taxi Parquet files, five consolidated partitions (2021–Aug 2025).


#### Design
:::image type="content" source="media/decision-guide-data-transformation/fast-copy-design.png" alt-text="Screenshot of dataflow design for Fast Copy showcasing Query settings" lightbox="media/decision-guide-data-transformation/fast-copy-design.png":::

#### Results

##### Without Fast Copy
:::image type="content" source="media/decision-guide-data-transformation/results-without-fast-copy.png" alt-text="Screenshot of Recent runs results without Fast Copy" lightbox="media/decision-guide-data-transformation/results-without-fast-copy.png":::

##### With Fast Copy
:::image type="content" source="media/decision-guide-data-transformation/results-with-fast-copy.png" alt-text="Screenshot of Recent runs results with Fast Copy" lightbox="media/decision-guide-data-transformation/results-with-fast-copy.png":::

| Dataflow Capability | Execution Time (hh:mm:ss) |
|---------------------|---------------------------|
| **Without Fast Copy** | 01:09:21 |
| **With Fast Copy**    | 00:07:43 |

### Outcome
Fast Copy achieves **up to ~9× faster ingestion** while reducing compute usage.

#### Use Fast Copy when:
- Your dataflow performs a direct copy from supported sources.  
- You need high-throughput ingestion for large datasets.  
- You want faster loads at lower compute cost.



## Scenario 2: Improving transformation speed with Modern Evaluator

### Background
After ingestion, the team applies filtering, null replacement, and code mapping before loading data into the Warehouse. These transformations don’t fully fold back to Parquet and are slow in memory.

### Challenges
- Improve transformation speed for semi-foldable or non-foldable queries.  
- Maintain no-code Power Query authoring.  
- Reduce overall refresh time and cost.

### Solution
The team enables **Modern Evaluator**, a high-performance execution engine designed for efficient transformation especially for connectors like ADLS Gen2 and SharePoint.

#### Modern Evaluator considerations
- Expected refresh times may be **significantly faster** (varies by dataset and transformations).  
- Optimized for large volumes (millions of rows).  
- Particularly beneficial for non-foldable queries.  
- Faster writes to destinations like Lakehouse (CSV).  

#### Dataset
All Parquet files for 2021–Aug 2025 merged into one consolidated file.

#### Design
:::image type="content" source="media/decision-guide-data-transformation/modern-evaluator-design.png" alt-text="Screenshot of dataflow design for Modern Evaluator showcasing Query settings" lightbox="media/decision-guide-data-transformation/modern-evaluator-design.png":::

#### Results

##### Without Modern Evaluator
:::image type="content" source="media/decision-guide-data-transformation/results-without-modern-evaluator.png" alt-text="Screenshot of Recent runs results without Modern Evaluator" lightbox="media/decision-guide-data-transformation/results-without-modern-evaluator.png":::

##### With Modern Evaluator
:::image type="content" source="media/decision-guide-data-transformation/results-with-modern-evaluator.png" alt-text="Screenshot of Recent runs results with Modern Evaluator" lightbox="media/decision-guide-data-transformation/results-with-modern-evaluator.png":::

| Dataflow Capability | Execution Time (hh:mm:ss) |
|---------------------|---------------------------|
| **Without Modern Evaluator** | 01:34:55 |
| **With Modern Evaluator**    | 01:00:58 |

### Outcome
Modern Evaluator improves transformation speed by **~1.6×** while preserving the no-code Power Query experience.

#### Use Modern Evaluator when:
- Working with non-foldable or partially foldable connectors.  
- Applying filters, column derivations, or data cleansing.  
- You want faster, more efficient execution without changing logic.



## Scenario 3: Scaling transformations with Partitioned Compute

### Background
The team must now aggregate and enrich trip data across hundreds of Parquet files (monthly partitions). Transformations include computing tip percentages across the dataset.

### Challenges
- Hundreds of large files must be processed.  
- Transformations require grouping, aggregation, and enrichment across partitions.  
- Sequential execution becomes a bottleneck.

### Solution
The team enables **Partitioned Compute**, which parallelizes processing across partitions and merges results efficiently.

#### Partitioned Compute considerations
- Recommended when the source doesn’t support folding.  
- Best performance when loading to staging or Warehouse.  
- Use **Sample transform file** from Combine Files to ensure consistent transformation logic.  
- Supports a subset of transformations; performance varies.

#### Dataset
56 Parquet files (2021–Aug 2025).

#### Design
:::image type="content" source="media/decision-guide-data-transformation/partitioned-compute-design.png" alt-text="Screenshot of dataflow design for Partitioned Compute showcasing Query settings" lightbox="media/decision-guide-data-transformation/partitioned-compute-design.png":::

#### Results
##### Without Partitioned Compute
:::image type="content" source="media/decision-guide-data-transformation/results-without-partitioned-compute.png" alt-text="Screenshot of Recent runs results without Partitioned Compute" lightbox="media/decision-guide-data-transformation/results-without-partitioned-compute.png":::

##### With Partitioned Compute
:::image type="content" source="media/decision-guide-data-transformation/results-with-partitioned-compute.png" alt-text="Screenshot of Recent runs results with Partitioned Compute" lightbox="media/decision-guide-data-transformation/results-with-partitioned-compute.png":::

##### With Partitioned Compute + Modern Evaluator:
:::image type="content" source="media/decision-guide-data-transformation/results-with-partitioned-compute-and-modern-evaluator.png" alt-text="Screenshot of Recent runs results with Partitioned Compute + Modern Evaluator" lightbox="media/decision-guide-data-transformation/results-with-partitioned-compute-and-modern-evaluator.png":::

| Dataflow Capability                     | Execution Time (hh:mm:ss) |
|-----------------------------------------|---------------------------|
| **Without Partitioned Compute**          | 01:44:56 |
| **With Partitioned Compute**             | 00:06:51 |
| **With Partitioned Compute + Modern Evaluator** | 00:04:48 |

### Outcome
Partitioned Compute delivers **15× faster performance**, and when combined with Modern Evaluator, **22× faster processing** for large, partitioned datasets.

#### Use Partitioned Compute when:
- Working with large, partitioned, or multi-file datasets.  
- Transformations can be parallelized (aggregations, joins, filters).  
- You need high-performance, scalable data preparation pipelines.  
- Combine with Modern Evaluator when supported.



## Choosing the right strategy

| Your goal | Recommended capability |
|-----------|------------------------|
| Copy large datasets quickly with no transformations | **Fast Copy** |
| Run complex transformations efficiently | **Modern Evaluator** |
| Process large, partitioned datasets with complex transformations | **Partitioned Compute** |
| Optimize both transformation and load performance | **Modern Evaluator + Partitioned Compute** |



## Summary

By aligning your Dataflow Gen2 transformation strategy with workload characteristics, you can achieve:

- **Fast Copy** → Accelerated data ingestion  
- **Modern Evaluator** → Faster transformation execution  
- **Partitioned Compute** → Scalable, parallelized processing  

Together, these capabilities empower you to build **performant, scalable, and cost-efficient** data pipelines in Microsoft Fabric.
