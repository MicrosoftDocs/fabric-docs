---
title: "Microsoft Fabric Decision Guide: Choose a dataflow strategy"
description: "Identify the best strategy for your Microsoft Fabric data transformation."
ms.reviewer: krirukm
ms.date: 6/4/2026
ms.topic: concept-article
---

# Microsoft Fabric decision guide: Choose a dataflow strategy

Microsoft Fabric Dataflows Gen2 offers multiple ways to ingest, transform, and load data efficiently. These methods help you balance **performance**, **scalability**, and **cost**.

The following capabilities help you optimize your dataflows:

- [**Staging queries**](dataflow-gen2-data-destinations-and-managed-settings.md#using-staging-before-loading-to-a-destination) – Land data in an intermediate layer before applying transformations, enabling ELT patterns.  
- **High-Scale Compute output** – Scale transformation processing after ingestion for high-throughput ELT workloads.  
- [**Fast copy**](dataflows-gen2-fast-copy.md) – Accelerate bulk data movement with minimal transformation.  
- [**Modern Evaluator**](dataflow-gen2-modern-evaluator.md) – Speed up heavy data shaping on non-foldable queries.  
- [**Partitioned compute**](dataflow-gen2-partitioned-compute.md) – Scale transformations across large and partitioned datasets.

This guide covers common use cases, real-world examples, and benchmarking results to help you choose the right feature for your workload.

## Quick reference

Match your workload to the right Dataflow Gen2 capability. For a benchmark example of each, see the linked scenario.

| Capability | Use it when… | Key benefit | Benchmark |
|---|---|---|---|
| **Fast Copy** | You need a direct, high-throughput copy from a supported source with no transformations. | Faster ingestion at lower compute cost. | [Scenario 1: Copy data](#scenario-1-copy-data) |
| **Modern Evaluator** | You're shaping data from non-foldable or partially foldable connectors (filters, derivations, cleansing). | Faster execution without changing logic. | [Scenario 2: Heavy data shaping](#scenario-2-heavy-data-shaping) |
| **Partitioned Compute** | You're transforming large, partitioned, or multi-file datasets that can run in parallel. Combine with Modern Evaluator when supported. | Parallelized execution across partitions. | [Scenario 3: Combine files](#scenario-3-combine-files) |
| **Staging** | You want to land raw data first, then transform (ELT) to avoid contention in a single pass. | Separates ingestion from transformation. | [Scenario 4: ELT patterns](#scenario-4-elt-patterns) |
| **High-Scale Compute** | You're already using staging, referencing the staged query downstream, and writing to a lakehouse destination. | Maximizes throughput from the staging warehouse to the lakehouse. | [Scenario 4: ELT patterns](#scenario-4-elt-patterns) |

> [!NOTE]
> For background on query evaluation and query folding, see [Query folding basics](/power-query/query-folding-basics).

## Benchmark results summary

All scenarios in this guide use the [**New York City Taxi & Limousine Commission (TLC) Trip Data – TLC Trip Record Data**](/azure/open-datasets/dataset-taxi-yellow?tabs=azureml-opendatasets) dataset: billions of taxi trip records stored as Parquet files in ADLS Gen2, covering 2021–2025 (up to August). The destination is a Fabric lakehouse or warehouse, depending on the scenario.

The following table summarizes the benchmark results across all scenarios. Each scenario also includes a Dataflow Gen1 baseline for comparison.

| Scenario | What it does | Capability enabled | Gen2 execution time | Speedup vs. Gen1 baseline |
|----------|--------------|--------------------|---------------------|---------------------------|
| [Scenario 1: Copy data](#scenario-1-copy-data) | Bulk-load 5 consolidated Parquet files from ADLS Gen2 into a lakehouse with no transformations. | Fast Copy | 00:07:43 | 13× faster |
| [Scenario 2: Heavy data shaping](#scenario-2-heavy-data-shaping) | Apply non-foldable transformations (filters, derivations, cleansing) to a single large Parquet file loaded into a lakehouse. | Modern Evaluator | 00:46:15 | 1.6× faster |
| [Scenario 3: Combine files](#scenario-3-combine-files) | Combine and transform 56 partitioned Parquet files in parallel and load into a warehouse. | Partitioned Compute | 00:04:48 | 21× faster |
| [Scenario 4: ELT patterns](#scenario-4-elt-patterns) | Stage raw data first, then transform downstream and write to a lakehouse. | Fast Copy + Staging + High-Scale Compute | TBD | TBD |

For step-by-step details, dataset configurations, and design patterns for each capability, see the scenario sections that follow.

> [!NOTE]
> All scenarios in this article implicitly use the **Modern Evaluator** and **V-order** disabled unless explicitly stated otherwise.

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

With Fast Copy enabled, Dataflow Gen2 ingests this dataset **about 13× faster than the Dataflow Gen1 baseline** (00:07:43 vs 01:42:18) while reducing compute usage. Without Fast Copy, Dataflow Gen2 is already about 2.9× faster than Gen1 on the same workload.

The following table also includes a Dataflow Gen1 baseline for comparison. Dataflow Gen1 uses a fundamentally different architecture than Dataflow Gen2, it doesn't support capabilities like fast copy, and it can only load data as CSV files, whereas Dataflow Gen2 loads data as Parquet files in these scenarios. The same M script was used across both Gen1 and Gen2 runs.

| Configuration | Execution Time (hh:mm:ss) | Comparison against Gen1 |
|---------------------|---------------------------|-------------------------|
| **Dataflow Gen1 baseline** | 01:42:18 | — |
| **Dataflow Gen2 without Fast Copy** | 00:35:25 | 2.9× faster |
| **Dataflow Gen2 with Fast Copy**    | 00:07:43 | 13× faster |

### Key takeaways

- Enabling Fast Copy collapsed an hour-long ingestion into roughly seven minutes, an order-of-magnitude improvement on the same dataset and M script.
- The speedup comes from native, parallelized data movement that bypasses the mashup engine, so it only applies to extract–load steps that meet the [Fast Copy prerequisites](/fabric/data-factory/dataflows-gen2-fast-copy). Any transformation that breaks folding falls back to the standard engine and forfeits the gains.
- For supported sources, treat Fast Copy as the default for ingestion and reserve heavier transformation engines (covered in the next scenarios) for steps that actually reshape the data.

## Scenario 2: Heavy data shaping

After ingestion, the team applies filtering, null replacement, and code mapping before loading data into the Lakehouse. These transformations don't fully fold back to Parquet and are slow in memory.

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

This query ingests data from a consolidated parquet file, filters the trip_distance and fare_amount columns to keep values above 0, replaces nulls in passenger_count with 1, and creates a new payment_method column by mapping the payment types before loading the data into the lakehouse.

#### Modern evaluator considerations

- Expected refresh times could be **significantly faster** (varies by dataset and transformations).  
- Optimized for large volumes (millions of rows).  
- Beneficial for non-foldable queries.  
- Faster writes to destinations like Lakehouse.  

### Results

With Modern Evaluator enabled, Dataflow Gen2 runs this shaping workload **about 1.6× faster than the Dataflow Gen1 baseline** (00:46:15 vs 01:13:44) while preserving the no-code Power Query experience. Without Modern Evaluator, the same workload is roughly on par with Gen1 (01:14:28 vs 01:13:44).

The following table also includes a Dataflow Gen1 baseline for comparison. Dataflow Gen1 uses a fundamentally different architecture than Dataflow Gen2, it doesn't support capabilities like modern evaluator, and it can only load data as CSV files, whereas Dataflow Gen2 loads data as Parquet files in these scenarios. The same M script was used across both Gen1 and Gen2 runs.

| Configuration | Execution Time (hh:mm:ss) | Comparison against Gen1 |
|---------------------|---------------------------|-------------------------|
| **Dataflow Gen1 baseline** | 01:13:44 | — |
| **Dataflow Gen2 without Modern Evaluator** | 01:14:28 | Roughly on par with Gen1 |
| **Dataflow Gen2 with Modern Evaluator**    | 00:46:15 | 1.6× faster |

### Key takeaways

- Without Modern Evaluator, Dataflow Gen2 was roughly on par with the Dataflow Gen1 baseline on this shaping workload; enabling Modern Evaluator improved performance to ~1.6× faster than Gen1, on identical M script and dataset.
- The lift comes from a more efficient execution path for non-foldable and semi-foldable queries, which is where Power Query traditionally spends the most time, especially against connectors like ADLS Gen2 and SharePoint. Gains scale with row volume and shaping complexity.
- Treat Modern Evaluator as the default for shaping-heavy flows where queries don't fully fold back to the source. The bigger the dataset and the more transformations applied in-engine, the more impact you should expect.

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

Partitioned Compute delivers **about 15× faster performance than the Dataflow Gen1 baseline** (00:06:51 vs 01:40:57) on large, partitioned datasets, and stacking it with Modern Evaluator pushes the speedup further (updated benchmark row pending).

The following table also includes a Dataflow Gen1 baseline for comparison. Dataflow Gen1 uses a fundamentally different architecture than Dataflow Gen2, it doesn't support capabilities like partitioned compute, and it can only load data as CSV files, whereas Dataflow Gen2 loads data as Parquet files in these scenarios. The same M script was used across both Gen1 and Gen2 runs.

| Configuration                     | Execution Time (hh:mm:ss) | Comparison against Gen1 |
|-----------------------------------------|---------------------------|-------------------------|
| **Dataflow Gen1 baseline**               | 01:40:57 | — |
| **Dataflow Gen2 with Partitioned Compute**             | 00:06:51 | 15× faster |

### Key takeaways

- Partitioned Compute alone delivered a 15× speedup and finished in under seven minutes.
- The gain comes from processing each partition in parallel and merging the results, so it's most effective on multi-file or partitioned sources where folding isn't available and sequential evaluation is the bottleneck.
- Use the **Sample transform file** pattern from Combine Files so transformation logic is applied consistently per partition. Partitioned Compute supports a subset of transformations, so validate that your shaping steps are compatible before relying on it.
- For high-volume, partitioned ingestion to staging or a warehouse, make Partitioned Compute the default and combine it with Modern Evaluator whenever possible.

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

### Key takeaways

- The ELT pattern decouples ingestion from transformation: Fast Copy handles bulk movement into a staging layer, then downstream reference queries reshape the staged data without re-reading the source.
- Enabling **High-Scale Compute output** on the downstream queries scales transformation throughput when writing from staging to a lakehouse destination, which is the typical bottleneck once ingestion is offloaded to Fast Copy.
- Use this pattern when a single dataflow tries to ingest and transform large volumes in one pass and resource contention slows both phases. Benchmark numbers for this scenario are pending and will be added once available.