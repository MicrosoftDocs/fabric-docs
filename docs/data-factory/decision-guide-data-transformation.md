---
title: "Microsoft Fabric Decision Guide: Choose a dataflow strategy"
description: "Identify the best strategy for your Microsoft Fabric data transformation."
ms.reviewer: krirukm
ms.date: 11/18/2025
ms.topic: concept-article
ms.custom:
---

# Microsoft Fabric decision guide: Choose a dataflow strategy

Microsoft Fabric Dataflows Gen2 offers multiple ways to ingest, transform, and load data efficiently. These methods help you balance **performance**, **scalability**, and **cost**.

Depending on your transformation needs, choose from three powerful capabilities:

- [**Fast copy in Dataflow Gen2**](dataflows-gen2-fast-copy.md) – Accelerate bulk data movement with minimal transformation.  
- [**Modern Evaluator for Dataflow Gen2**](dataflow-gen2-modern-evaluator.md)  – Optimize complex transformation performance for non-foldable queries.  
- [**Use partitioned compute in Dataflow Gen2**](dataflow-gen2-partitioned-compute.md) – Scale transformations across large and partitioned datasets.

This guide explains **when and why** to use each feature. It includes real-world examples and benchmarking results.

## Choose the right strategy

| Your goal | Recommended capability |
|-----------|------------------------|
| Copy large datasets quickly with no transformations | [**Fast Copy**](#use-fast-copy-when) |
| Run complex transformations efficiently | [**Modern Evaluator**](#use-modern-evaluator-when) |
| Process large, partitioned datasets with complex transformations | [**Partitioned Compute**](#use-partitioned-compute-when) |
| Optimize both transformation and load performance | **Modern Evaluator + Partitioned Compute** |

### Use fast copy when

- Your dataflow performs a direct copy from supported sources.  
- You need high-throughput ingestion for large datasets.  
- You want faster loads at lower compute cost.

For a benchmark example, see [Scenario 1: Accelerate bulk ingestion by using fast copy](#scenario-1-accelerate-bulk-ingestion-by-using-fast-copy).

### Use modern evaluator when

- You're working with non-foldable or partially foldable connectors.  
- You're applying filters, column derivations, or data cleansing.  
- You want faster, more efficient execution without changing logic.

For a benchmark example, see [Scenario 2: Improve transformation speed by using modern evaluator](#scenario-2-improve-transformation-speed-by-using-modern-evaluator).

### Use partitioned compute when

- You're working with large, partitioned, or mult-file datasets.  
- You can parallelize transformations (aggregations, joins, filters).  
- You need high-performance, scalable data preparation pipelines.  
- You can combine it with Modern Evaluator when supported.

For a benchmark example, see [Scenario 3: Scale transformations with partitioned compute](#scenario-3-scale-transformations-with-partitioned-compute).

## Capability comparison

| Capability          | Flagship scenario                                    | Ideal workload                                      | Supported sources | Typical benefits |
|--------------------|------------------------------------------------------|------------------------------------------------------|-------------------|------------------|
| **Fast Copy**       | Copy data directly from source to destination        | Straight copy or ingestion workloads with minimal transformations | ADLS Gen2, Blob storage, Azure SQL DB, Lakehouse, PostgreSQL, On-premises SQL Server, Warehouse, Oracle, Snowflake, Fabric SQL DB | High-throughput data movement, lower cost |
| **Modern Evaluator** | Transforming data from connectors that don’t fold   | Complex transformations                              | Azure Blob Storage, ADLS Gen2, Lakehouse, Warehouse, OData, Power Platform Dataflows, SharePoint Online List, SharePoint folder, Web | Faster data movement and improved query performance |
| **Partitioned Compute** | Partitioned datasets                             | High-volume transformations across multi-file sources | ADLS Gen2, Azure Blob Storage, Lakehouse files, Local folders | Parallelized execution and faster processing |

> [!NOTE]
> For more information on query evaluation and query folding, see this [Power Query article](/power-query/query-folding-basics). It provides a framework that can help you understand the concepts discussed here.

## Scenario benchmark dataset

All scenarios in this guide use the [**New York City Taxi & Limousine Commission (TLC) Trip Data – TLC Trip Record Data**](/azure/open-datasets/dataset-taxi-yellow?tabs=azureml-opendatasets) dataset, which contains billions of records detailing taxi trips across NYC.

- **Data format:** Parquet files stored in ADLS Gen2  
- **Data size:** Multi-gigabyte datasets for years 2021–2025 (up to August)  
- **Destination:** Fabric Lakehouse and Warehouse  
- **Goal:** Demonstrate execution time improvements using Dataflow Gen2 capabilities  

This consistent dataset provides a fair and controlled environment to compare Fast Copy, Modern Evaluator, and Partitioned Compute strategies.

## Scenario 1: Accelerate bulk ingestion by using fast copy

The NYC Taxi analytics team needs to load millions of raw Parquet trip records from ADLS Gen2 into a Fabric Lakehouse. The team doesn't need any transformations, only a direct copy to support downstream analytics.

### Challenges

- Move large volumes of Parquet data quickly into the Lakehouse.  
- Reduce ingestion time for daily refreshes.  
- Minimize compute cost for simple EL workloads.

### Dataset

Year-wise merged NYC Yellow Taxi Parquet files, five consolidated partitions (2021–Aug 2025).

### Solution

The team enables **Fast Copy** in Dataflows Gen2. Fast Copy optimizes data movement paths and parallelizes writes for supported connectors.

### Design

:::image type="content" source="media/decision-guide-data-transformation/fast-copy-design.png" alt-text="Screenshot of dataflow design for Fast Copy showcasing Query settings." lightbox="media/decision-guide-data-transformation/fast-copy-design.png":::

This query combines the five year-wise Parquet files and loads the result into the lakehouse.

#### Fast copy considerations

- Supports **.csv** and **.parquet** file formats.  
- Supports up to **1M rows per table per run** for Azure SQL Database.  
- Best suited for **extract–load** workflows with minimal transformations.

### Results

Fast Copy provides **up to about nine times faster ingestion** while reducing compute usage.

| Dataflow Capability | Execution Time (hh:mm:ss) |
|---------------------|---------------------------|
| **Without Fast Copy** | 01:09:21 |
| **With Fast Copy**    | 00:07:43 |

#### Without fast copy

:::image type="content" source="media/decision-guide-data-transformation/results-without-fast-copy.png" alt-text="Screenshot of Recent runs results without Fast Copy." lightbox="media/decision-guide-data-transformation/results-without-fast-copy.png":::

This run took an hour and nine minutes to copy the data without fast copy enabled.

#### With fast copy

:::image type="content" source="media/decision-guide-data-transformation/results-with-fast-copy.png" alt-text="Screenshot of Recent runs results with Fast Copy." lightbox="media/decision-guide-data-transformation/results-with-fast-copy.png":::

This run took seven minutes to copy the data with fast copy enabled.

## Scenario 2: Improve transformation speed by using modern evaluator

After ingestion, the team applies filtering, null replacement, and code mapping before loading data into the Warehouse. These transformations don't fully fold back to Parquet and are slow in memory.

### Challenges

- Improve transformation speed for semi-foldable or non-foldable queries.  
- Maintain no-code Power Query authoring.  
- Reduce overall refresh time and cost.

### Dataset

All Parquet files for 2021–Aug 2025 merged into one consolidated file.

### Solution

The team enables **Modern Evaluator**, a high-performance execution engine designed for efficient transformation especially for connectors like ADLS Gen2 and SharePoint.

#### Design

:::image type="content" source="media/decision-guide-data-transformation/modern-evaluator-design.png" alt-text="Screenshot of dataflow design for Modern Evaluator showcasing Query settings." lightbox="media/decision-guide-data-transformation/modern-evaluator-design.png":::

This query ingests data from a consolidated parquet file, filters the trip_distance and fare_amount columns to keep values above 0, replaces nulls in passenger_count with 1, and creates a new payment_method column by mapping the payment types before loading the data into the warehouse.

#### Modern evaluator considerations

- Expected refresh times could be **significantly faster** (varies by dataset and transformations).  
- Optimized for large volumes (millions of rows).  
- Beneficial for non-foldable queries.  
- Faster writes to destinations like Lakehouse (CSV).  

### Results

Modern Evaluator improves transformation speed by **about 1.6×** while preserving the no-code Power Query experience.

| Dataflow Capability | Execution Time (hh:mm:ss) |
|---------------------|---------------------------|
| **Without Modern Evaluator** | 01:34:55 |
| **With Modern Evaluator**    | 01:00:58 |

#### Without modern evaluator

:::image type="content" source="media/decision-guide-data-transformation/results-without-modern-evaluator.png" alt-text="Screenshot of Recent runs results without Modern Evaluator." lightbox="media/decision-guide-data-transformation/results-without-modern-evaluator.png":::

This transformation took an hour and 34 minutes without the modern evaluator.

#### With modern evaluator

:::image type="content" source="media/decision-guide-data-transformation/results-with-modern-evaluator.png" alt-text="Screenshot of Recent runs results with Modern Evaluator." lightbox="media/decision-guide-data-transformation/results-with-modern-evaluator.png":::

This transformation took an hour and one minute with the modern evaluator.

## Scenario 3: Scale transformations with partitioned compute

The team must now aggregate and enrich trip data across hundreds of Parquet files (monthly partitions). Transformations include computing tip percentages across the dataset.

### Challenges

- You must process hundreds of large files.  
- Transformations require grouping, aggregation, and enrichment across partitions.  
- Sequential execution becomes a bottleneck.

### Dataset

Fifty-six parquet files (2021–Aug 2025).

### Solution

The team enables **Partitioned Compute**, which parallelizes processing across partitions and merges results efficiently.

#### Partitioned compute considerations

- Use it when the source doesn't support folding.  
- Provides the best performance when loading data to staging or the warehouse.  
- Use **Sample transform file** from Combine Files to ensure consistent transformation logic.  
- Supports a subset of transformations; performance varies.

#### Design

:::image type="content" source="media/decision-guide-data-transformation/partitioned-compute-design.png" alt-text="Screenshot of dataflow design for Partitioned Compute showcasing Query settings." lightbox="media/decision-guide-data-transformation/partitioned-compute-design.png":::

This query combines 56 parquet files and creates a new custom column for tip percentage "Tip Pctg" on the "Transform Sample file" before loading the data into the warehouse.

### Results

Partitioned Compute delivers **15× faster performance**, and when combined with Modern Evaluator, **22× faster processing** for large, partitioned datasets.

| Dataflow Capability                     | Execution Time (hh:mm:ss) |
|-----------------------------------------|---------------------------|
| **Without Partitioned Compute**          | 01:44:56 |
| **With Partitioned Compute**             | 00:06:51 |
| **With Partitioned Compute + Modern Evaluator** | 00:04:48 |

#### Without partitioned compute

:::image type="content" source="media/decision-guide-data-transformation/results-without-partitioned-compute.png" alt-text="Screenshot of Recent runs results without Partitioned Compute." lightbox="media/decision-guide-data-transformation/results-without-partitioned-compute.png":::

This transformation took an hour and 44 minutes without partitioned compute.

#### With partitioned compute

:::image type="content" source="media/decision-guide-data-transformation/results-with-partitioned-compute.png" alt-text="Screenshot of Recent runs results with Partitioned Compute." lightbox="media/decision-guide-data-transformation/results-with-partitioned-compute.png":::

This transformation took six minutes and 51 seconds with partitioned compute.

#### With partitioned compute + modern evaluator

:::image type="content" source="media/decision-guide-data-transformation/results-with-partitioned-compute-and-modern-evaluator.png" alt-text="Screenshot of Recent runs results with Partitioned Compute + Modern Evaluator." lightbox="media/decision-guide-data-transformation/results-with-partitioned-compute-and-modern-evaluator.png":::

This transformation took four minutes and 48 seconds with partitioned compute and modern evaluator.
