---
title: "Microsoft Fabric Decision Guide: Choose a dataflow strategy"
description: "Identify the best strategy for your Microsoft Fabric data transformation."
ms.reviewer: krirukm
ms.date: 4/16/2026
ms.topic: concept-article
---

# Microsoft Fabric decision guide: Choose a dataflow strategy

Microsoft Fabric Dataflows Gen2 offers multiple ways to ingest, transform, and load data efficiently. These methods help you balance **performance**, **scalability**, and **cost**.

The following capabilities help you optimize your dataflows:

- **Staging queries** – Land data in an intermediate layer before applying transformations, enabling ELT patterns.  
- **V-Ordering** – Optimize the physical layout of Parquet files during writes for faster write and read performance.  
- **High-Scale Compute output** – Scale transformation processing after ingestion for high-throughput ELT workloads.  
- [**Fast copy**](dataflows-gen2-fast-copy.md) – Accelerate bulk data movement with minimal transformation.  
- [**Modern Evaluator**](dataflow-gen2-modern-evaluator.md) – Optimize complex transformation performance for non-foldable queries.  
- [**Partitioned compute**](dataflow-gen2-partitioned-compute.md) – Scale transformations across large and partitioned datasets.  
- **Incremental refresh** – Refresh only new or changed data to reduce processing time and compute cost.

This guide covers common use cases, real-world examples, and benchmarking results to help you choose the right feature for your workload.

## Quick reference

Use the following table to match your workload to the right Dataflow Gen2 capability.

| Your goal | Recommended capability |
|-----------|------------------------|
| Copy large datasets quickly with no transformations | [**Fast Copy**](#use-fast-copy-when) |
| Run complex transformations efficiently | [**Modern Evaluator**](#use-modern-evaluator-when) |
| Process large, partitioned datasets with complex transformations | [**Partitioned Compute**](#use-partitioned-compute-when) |
| Stage data before applying transformations | [**Staging**](#use-staging-when) |
| Scale transformation output for large datasets | [**High-Scale Compute**](#use-high-scale-compute-when) |
| Refresh only new or changed data incrementally | [**Incremental Refresh**](#use-incremental-refresh-when) |
| Optimize write performance to Fabric destinations | [**V-Ordering**](#use-v-ordering-when) |

### Use fast copy when

- Your dataflow performs a direct copy from supported sources.  
- You need high-throughput ingestion for large datasets.  
- You want faster loads at lower compute cost.

For a benchmark example, see [Scenario 1: Copy data](#scenario-1-copy-data).

### Use modern evaluator when

- You're working with non-foldable or partially foldable connectors.  
- You're applying filters, column derivations, or data cleansing.  
- You want faster, more efficient execution without changing logic.

For a benchmark example, see [Scenario 2: Complex transformations](#scenario-2-complex-transformations).

### Use partitioned compute when

- You're working with large, partitioned, or multi-file datasets.  
- You can parallelize transformations (aggregations, joins, filters).  
- You need high-performance, scalable data preparation pipelines.  
- You can combine it with Modern Evaluator when supported.

For a benchmark example, see [Scenario 3: Combine files](#scenario-3-combine-files).

### Use staging when

- You want to separate ingestion from transformation for better performance.
- You need to land raw data before applying transformations.
- You're working with large datasets where a copy-then-transform (ELT) approach is more efficient.

For a benchmark example, see [Scenario 4: ELT patterns](#scenario-4-elt-patterns).

### Use High-Scale Compute when

- TBD
- TBD
- TBD

For a benchmark example, see [Scenario 4: ELT patterns](#scenario-4-elt-patterns).

### Use incremental refresh when

- Your dataset grows over time and you only need to refresh new or changed data.  
- You want to reduce refresh duration by avoiding full reloads.  
- Your source supports date-based or key-based filtering for incremental detection.

For a benchmark example, see [Scenario 5: Incremental refresh](#scenario-5-incremental-refresh).

### Use V-Ordering when

- You're loading data into Fabric destinations like lakehouses or warehouses.  
- You want to optimize write performance and downstream read performance.  
- You're working with Parquet-based destinations that benefit from columnar ordering.

For a benchmark example, see [Scenario 6: Write-time optimization](#scenario-6-write-time-optimization).

### Capability comparison

The following table compares each capability in more detail, including supported sources and typical benefits.

| Capability          | Flagship scenario                                    | Ideal workload                                      | Supported sources | Typical benefits |
|--------------------|------------------------------------------------------|------------------------------------------------------|-------------------|------------------|
| **Fast Copy**       | Copy data directly from source to destination        | Straight copy or ingestion workloads with minimal transformations | ADLS Gen2, Blob storage, Azure SQL DB, Lakehouse, PostgreSQL, On-premises SQL Server, Warehouse, Oracle, Snowflake, Fabric SQL DB | High-throughput data movement, lower cost |
| **Modern Evaluator** | Transforming data from connectors that don’t fold   | Complex transformations                              | Azure Blob Storage, ADLS Gen2, Lakehouse, Warehouse, OData, Power Platform Dataflows, SharePoint Online List, SharePoint folder, Web | Faster data movement and improved query performance |
| **Partitioned Compute** | Partitioned datasets                             | High-volume transformations across multi-file sources | ADLS Gen2, Azure Blob Storage, Lakehouse files, Local folders | Parallelized execution and faster processing |
| **Staging** | Stage raw data before applying transformations | Large-scale ingestion followed by transformation | ADLS Gen2, Blob storage, Azure SQL DB, Lakehouse, PostgreSQL, On-premises SQL Server, Warehouse, Oracle, Snowflake, Fabric SQL DB | Separates ingestion from transformation for better performance |
| **High-Scale Compute** | TBD | TBD | Fabric Lakehouse | Maximized throughput during output stage |
| **Incremental Refresh** | Incremental data loads | Growing datasets where only new or changed data needs processing | Sources that support date-based or key-based filtering | Reduced refresh times, lower compute cost |
| **V-Ordering** | Write-time optimization to Fabric sources | Workloads loading into Fabric lakehouses or warehouses | Fabric Lakehouse, Fabric Warehouse | Faster writes, optimized Parquet layout for reads |

> [!NOTE]
> For more information on query evaluation and query folding, see this [Power Query article](/power-query/query-folding-basics). It provides a framework that can help you understand the concepts discussed here.

## Benchmark results summary

All scenarios in this guide use the [**New York City Taxi & Limousine Commission (TLC) Trip Data – TLC Trip Record Data**](/azure/open-datasets/dataset-taxi-yellow?tabs=azureml-opendatasets) dataset: billions of taxi trip records stored as Parquet files in ADLS Gen2, covering 2021–2025 (up to August). The destination is a Fabric lakehouse or warehouse, depending on the scenario.

The following table summarizes the benchmark results across all scenarios. Each scenario also includes a Dataflow Gen1 baseline for comparison.

| Scenario | Capability enabled | Gen2 execution time | Speedup vs. Gen1 baseline |
|----------|-------------------|---------------------|---------------------------|
| Bulk ingestion (5 files → lakehouse) | Fast Copy | 00:07:43 | 13× faster |
| Complex transforms (1 file → warehouse) | Modern Evaluator | 01:00:58 | 1.2× faster |
| Partitioned transforms (56 files → warehouse) | Partitioned Compute | 00:04:48 | 21× faster |
| ELT patterns (staging + transform) | Fast Copy + Staging + High-Scale Compute | TBD | TBD |
| Incremental refresh | Incremental Refresh | TBD | TBD |
| Write-time optimization | V-Ordering | TBD | TBD |

For step-by-step details, dataset configurations, and design patterns for each capability, see the scenario sections that follow.

> [!NOTE]
> All scenarios in this article implicitly use the **Modern Evaluator** unless explicitly stated otherwise.

## Scenario 1: Copy data

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

The following table also includes a Dataflow Gen1 baseline for comparison. Dataflow Gen1 uses a fundamentally different architecture than Dataflow Gen2, it doesn't support capabilities like fast copy, and it can only load data as CSV files, whereas Dataflow Gen2 loads data as Parquet files in these scenarios. The same M script was used across both Gen1 and Gen2 runs.

| Configuration | Execution Time (hh:mm:ss) | Comparison against Gen1 |
|---------------------|---------------------------|-------------------------|
| **Dataflow Gen1 baseline** | 01:42:18 | — |
| **Dataflow Gen2 without Fast Copy** | 01:09:21 | 1.5× faster |
| **Dataflow Gen2 with Fast Copy**    | 00:07:43 | 13× faster |

#### Without fast copy

:::image type="content" source="media/decision-guide-data-transformation/results-without-fast-copy.png" alt-text="Screenshot of Recent runs results without Fast Copy." lightbox="media/decision-guide-data-transformation/results-without-fast-copy.png":::

This run took an hour and nine minutes to copy the data without fast copy enabled.

#### With fast copy

:::image type="content" source="media/decision-guide-data-transformation/results-with-fast-copy.png" alt-text="Screenshot of Recent runs results with Fast Copy." lightbox="media/decision-guide-data-transformation/results-with-fast-copy.png":::

This run took seven minutes to copy the data with fast copy enabled.

## Scenario 2: Complex transformations

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

The following table also includes a Dataflow Gen1 baseline for comparison. Dataflow Gen1 uses a fundamentally different architecture than Dataflow Gen2, it doesn't support capabilities like modern evaluator, and it can only load data as CSV files, whereas Dataflow Gen2 loads data as Parquet files in these scenarios. The same M script was used across both Gen1 and Gen2 runs.

| Configuration | Execution Time (hh:mm:ss) | Comparison against Gen1 |
|---------------------|---------------------------|-------------------------|
| **Dataflow Gen1 baseline** | 01:13:44 | — |
| **Dataflow Gen2 without Modern Evaluator** | 01:34:55 | 1.3× slower |
| **Dataflow Gen2 with Modern Evaluator**    | 01:00:58 | 1.2× faster |

#### Without modern evaluator

:::image type="content" source="media/decision-guide-data-transformation/results-without-modern-evaluator.png" alt-text="Screenshot of Recent runs results without Modern Evaluator." lightbox="media/decision-guide-data-transformation/results-without-modern-evaluator.png":::

This transformation took an hour and 34 minutes without the modern evaluator.

#### With modern evaluator

:::image type="content" source="media/decision-guide-data-transformation/results-with-modern-evaluator.png" alt-text="Screenshot of Recent runs results with Modern Evaluator." lightbox="media/decision-guide-data-transformation/results-with-modern-evaluator.png":::

This transformation took an hour and one minute with the modern evaluator.

## Scenario 3: Combine files

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

The following table also includes a Dataflow Gen1 baseline for comparison. Dataflow Gen1 uses a fundamentally different architecture than Dataflow Gen2, it doesn't support capabilities like partitioned compute, and it can only load data as CSV files, whereas Dataflow Gen2 loads data as Parquet files in these scenarios. The same M script was used across both Gen1 and Gen2 runs.

| Configuration                     | Execution Time (hh:mm:ss) | Comparison against Gen1 |
|-----------------------------------------|---------------------------|-------------------------|
| **Dataflow Gen1 baseline**               | 01:40:57 | — |
| **Dataflow Gen2 without Partitioned Compute**          | 01:44:56 | 1.04× slower |
| **Dataflow Gen2 with Partitioned Compute + Modern evaluator**             | 00:06:51 | 15× faster |

#### Without partitioned compute

:::image type="content" source="media/decision-guide-data-transformation/results-without-partitioned-compute.png" alt-text="Screenshot of Recent runs results without Partitioned Compute." lightbox="media/decision-guide-data-transformation/results-without-partitioned-compute.png":::

This transformation took an hour and 44 minutes without partitioned compute.

#### With partitioned compute + modern evaluator

:::image type="content" source="media/decision-guide-data-transformation/results-with-partitioned-compute-and-modern-evaluator.png" alt-text="Screenshot of Recent runs results with Partitioned Compute + Modern Evaluator." lightbox="media/decision-guide-data-transformation/results-with-partitioned-compute-and-modern-evaluator.png":::

This transformation took four minutes and 48 seconds with partitioned compute and modern evaluator.

## Scenario 4: ELT patterns

The team needs to ingest large volumes of raw trip data into staging first, then apply transformations separately. This extract-load-transform (ELT) approach decouples ingestion from transformation, enabling higher throughput and more scalable pipelines.

### Challenges

- Ingestion and transformation compete for the same resources when run together.  
- Large datasets slow down when transformations are applied during the copy phase.  
- The team needs a scalable pattern that separates data movement from data processing.

### Dataset

One parquet file.

### Solution

The team combines **Fast Copy** for high-throughput ingestion, **staging queries** to land data in an intermediate layer, and **High-Scale Compute output** to apply transformations at scale after ingestion.

#### Design

:::image type="content" source="media/decision-guide-data-transformation/elt-patterns-design.png" alt-text="Screenshot of dataflow design for ELT patterns showcasing Query settings." lightbox="media/decision-guide-data-transformation/elt-patterns-design.png":::

A query loads a single parquet file into staging using fast copy. Multiple reference queries are created against the initial staged query to transform the data into multiple dimensions that are later loaded to a Lakehouse as separate tables.

#### ELT pattern considerations

- Fast Copy handles the initial data movement into staging.  
- Staging queries land data in an intermediate layer before transformations.  
- High-Scale Compute output processes transformations at scale after ingestion.  
- Best suited for workloads where separating ingestion from transformation improves throughput.

### Results

TBD

<!--
| Configuration | Execution Time (hh:mm:ss) | Comparison against Gen1 |
|---------------------|---------------------------|-------------------------|
| **Dataflow Gen1 baseline** | TBD | — |
| **Dataflow Gen2 without ELT pattern** | TBD | TBD |
| **Dataflow Gen2 with Fast Copy + Staging + High-Scale Compute** | TBD | TBD |
-->

## Scenario 5: Incremental refresh

As the taxi dataset grows daily, the team can't afford to reload the entire dataset on every refresh. They need a strategy that processes only new or changed records.

### Challenges

- Full dataset refreshes become slower and more expensive as data grows.  
- The team needs to process only the delta (new or changed records) on each run.  
- Refresh windows are limited, so efficiency is critical.

### Dataset

TBD

### Solution

The team enables **incremental refresh** in Dataflows Gen2. Incremental refresh detects and processes only new or changed data based on date or key filters, reducing refresh time and compute cost.

#### Design

TBD

<!-- :::image type="content" source="media/decision-guide-data-transformation/incremental-refresh-design.png" alt-text="Screenshot of dataflow design for Incremental Refresh showcasing Query settings." lightbox="media/decision-guide-data-transformation/incremental-refresh-design.png"::: -->

#### Incremental refresh considerations

- Requires a date or key column to detect new or changed data.  
- Reduces refresh duration by avoiding full reloads.  
- Works best with growing datasets that have a clear incremental boundary.

### Results

TBD

<!--
| Configuration | Execution Time (hh:mm:ss) | Comparison against Gen1 |
|---------------------|---------------------------|-------------------------|
| **Dataflow Gen1 baseline** | TBD | — |
| **Dataflow Gen2 without Incremental Refresh** | TBD | TBD |
| **Dataflow Gen2 with Incremental Refresh** | TBD | TBD |
-->

## Scenario 6: Write-time optimization

The team loads processed trip data into a Fabric lakehouse. They want to compare how enabling V-Ordering might affect their load times when writing to a table.

### Challenges

- The team doesn't know whether V-Ordering adds overhead to their write operations.  
- It's unclear if this optimization should be applied during the dataflow write or handled as a post-load maintenance task on the table at a regular cadence.  
- They need to measure load times with and without V-Ordering using the same dataset and configuration.

### Dataset

TBD

### Solution

The team runs the same dataflow twice—once with **V-Ordering** disabled and once with it enabled—to compare load times. V-Ordering optimizes the physical layout of Parquet files during write operations by applying columnar sorting and compression techniques.

#### Design

TBD

<!-- :::image type="content" source="media/decision-guide-data-transformation/v-ordering-design.png" alt-text="Screenshot of dataflow design for V-Ordering showcasing Query settings." lightbox="media/decision-guide-data-transformation/v-ordering-design.png"::: -->

#### V-Ordering considerations

- V-Ordering is enabled at the destination level and also applies to staging queries—no changes to transformation logic are required.  
- Optimized specifically for Fabric destinations like lakehouses and warehouses.  
- Might add slight overhead during write operations, but can improve downstream read performance.  
- Decide whether V-Ordering should run as part of the dataflow write or as a separate maintenance task on the Fabric item at a regular cadence—without adding execution time to your dataflow.

### Results

TBD

<!--
| Configuration | Execution Time (hh:mm:ss) | Comparison against Gen1 |
|---------------------|---------------------------|-------------------------|
| **Dataflow Gen1 baseline** | TBD | — |
| **Dataflow Gen2 without V-Ordering** | TBD | TBD |
| **Dataflow Gen2 with V-Ordering** | TBD | TBD |
-->
