---
title: "Microsoft Fabric Decision Guide: Choose a dataflow strategy"
description: "Identify the best strategy for your Microsoft Fabric data transformation."
ms.reviewer: krirukm
ms.date: 6/2/2026
ms.topic: concept-article
ai-usage: ai-assisted
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

Most scenarios in this guide use the [**New York City Taxi & Limousine Commission (TLC) Trip Data – TLC Trip Record Data**](/azure/open-datasets/dataset-taxi-yellow?tabs=azureml-opendatasets) dataset: billions of taxi trip records stored as Parquet files in ADLS Gen2, covering 2021–2025 (up to August). Scenario 4 uses a 2017 taxi trip source. The destination is a Fabric lakehouse or warehouse, depending on the scenario.

The following table summarizes the benchmark results across all scenarios. Each scenario also includes a Dataflow Gen1 baseline for comparison.

| Scenario | What it does | Capability enabled | Gen2 execution time | Speedup vs. Gen1 baseline |
|----------|--------------|--------------------|---------------------|---------------------------|
| [Scenario 1: Copy data](#scenario-1-copy-data) | Bulk-load 5 consolidated Parquet files from ADLS Gen2 into a lakehouse with no transformations. | Fast Copy | 00:07:43 | 13× faster |
| [Scenario 2: Heavy data shaping](#scenario-2-heavy-data-shaping) | Apply non-foldable transformations (filters, derivations, cleansing) to a single large Parquet file loaded into a lakehouse. | Modern Evaluator | 00:46:15 | 1.6× faster |
| [Scenario 3: Combine files](#scenario-3-combine-files) | Combine and transform 56 partitioned Parquet files in parallel and load into a warehouse. | Partitioned Compute | 00:04:48 | 21× faster |
| [Scenario 4: ELT patterns](#scenario-4-elt-patterns) | Stage 2017 taxi trip data once from ADLS Gen2, then run a referenced query that adds analytical columns and writes to a lakehouse table. This benchmark uses High-Scale Compute output and V-Order. | Staging + High-Scale Compute output | 00:06:34 | ~25× faster |

:::image type="content" source="media/decision-guide-data-transformation/scenario-comparison-chart.png" alt-text="Comparison chart showing the execution time and relative speedup for the four benchmark scenarios in the summary table." lightbox="media/decision-guide-data-transformation/scenario-comparison-chart.png":::

For step-by-step details, dataset configurations, and design patterns for each capability, see the scenario sections that follow.

> [!NOTE]
> All scenarios in this article implicitly use the **Modern Evaluator** and **V-Order** disabled unless explicitly stated otherwise.

## Scenario 1: Copy data

The NYC Taxi analytics team needs to load millions of raw Parquet trip records from ADLS Gen2 into a Fabric Lakehouse. The team doesn't need any transformations, only a direct copy to support downstream analytics.

### Challenges

- Move large volumes of Parquet data quickly into the Lakehouse.  
- Reduce ingestion time for daily refreshes.  
- Minimize compute cost for simple extract-load (EL) workloads.

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
- Best suited for **extract-load (EL)** workflows with minimal transformations.

### Results

With Fast Copy enabled, Dataflow Gen2 ingests this dataset **about 13× faster than the Dataflow Gen1 baseline** (00:07:43 vs 01:42:18) while reducing compute usage. Without Fast Copy, Dataflow Gen2 is already about 2.9× faster than Gen1 on the same workload.

The following table also includes a Dataflow Gen1 baseline for comparison. Dataflow Gen1 uses a fundamentally different architecture than Dataflow Gen2; it doesn't support capabilities like Fast Copy, and it can only load data as CSV files, whereas Dataflow Gen2 loads data as Parquet files in these scenarios. The same M script was used across both Gen1 and Gen2 runs.

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

### Design

:::image type="content" source="media/decision-guide-data-transformation/modern-evaluator-design.png" alt-text="Screenshot of dataflow design for Modern Evaluator showcasing Query settings." lightbox="media/decision-guide-data-transformation/modern-evaluator-design.png":::

This query ingests data from a consolidated Parquet file, filters the `trip_distance` and `fare_amount` columns to keep values above 0, replaces nulls in `passenger_count` with 1, and creates a new `payment_method` column by mapping the payment types before loading the data into the lakehouse.

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

### Design

:::image type="content" source="media/decision-guide-data-transformation/partitioned-compute-design.png" alt-text="Screenshot of dataflow design for Partitioned Compute showcasing Query settings." lightbox="media/decision-guide-data-transformation/partitioned-compute-design.png":::

This query combines 56 Parquet files and creates a new custom column for tip percentage "Tip Pctg" on the "Transform Sample file" before loading the data into the warehouse.

#### Partitioned Compute considerations

- Use it when the source doesn't support folding.  
- Provides the best performance when loading data to staging or the warehouse.  
- Use **Sample transform file** from Combine Files to ensure consistent transformation logic.  
- Supports a subset of transformations; performance varies.

### Results

Partitioned Compute delivers **about 21× faster performance than the Dataflow Gen1 baseline** (00:04:48 vs 01:40:57) on large, partitioned, multi-file datasets.

The following table also includes a Dataflow Gen1 baseline for comparison. Dataflow Gen1 uses a fundamentally different architecture than Dataflow Gen2; it doesn't support capabilities like Partitioned Compute, and it can only load data as CSV files, whereas Dataflow Gen2 loads data as Parquet files in these scenarios. The same M script was used across both Gen1 and Gen2 runs.

| Configuration                     | Execution Time (hh:mm:ss) | Comparison against Gen1 |
|-----------------------------------------|---------------------------|-------------------------|
| **Dataflow Gen1 baseline**               | 01:40:57 | — |
| **Dataflow Gen2 with Partitioned Compute**             | 00:04:48 | 21× faster |

### Key takeaways

- Partitioned Compute delivered a 21× speedup over the Dataflow Gen1 baseline and finished in under five minutes.
- The gain comes from processing each partition in parallel and merging the results, so it's most effective on multi-file or partitioned sources where folding isn't available and sequential evaluation is the bottleneck.
- Use the **Sample transform file** pattern from Combine Files so transformation logic is applied consistently per partition. Partitioned Compute supports a subset of transformations, so validate that your shaping steps are compatible before relying on it.
- For high-volume, partitioned ingestion to staging or a warehouse, make Partitioned Compute the default and combine it with Modern Evaluator whenever possible.

## Scenario 4: ELT patterns

When ingestion and transformation run in the same query, they compete for the same resources and large datasets slow down both phases. ELT patterns separate the two: load raw data into staging first, then transform it from there.

### The core concept: stage-and-reference

Every ELT pattern in Dataflow Gen2 builds on the same foundation: **stage once, reference many**. A source query is marked as **staged** so its output is materialized to internal staging storage, and downstream queries **reference** that staged query instead of rereading the source. Fast Copy is an optional accelerator that makes the staged query populate faster — it isn't what defines the pattern.

### Common use cases

These are the patterns typically layered on top of a staged source query.

| Use case | Description |
|---|---|
| **Star-schema shaping (facts and dimensions)** | Referenced queries shape staged data into analytics-ready fact and dimension tables (deduplication, group by, key generation). |
| **Aggregate or analytical outputs** | Referenced queries compute summaries, rollups, or KPIs to avoid expensive runtime aggregation. |
| **Data quality or audit branch** | Referenced queries validate or inspect staged data (null checks, constraint validation, row counts). |
| **Multiple destinations (fan-out load)** | Multiple referenced queries each load a different destination from the same staged source. |
| **Combine multiple staged sources (stage-then-merge)** | Each source is staged in its own query; a downstream referenced query merges or joins the staged results, folding against the staging SQL endpoint. |

### Dataset

NYC yellow taxi trip data for 2017 in Azure Data Lake Storage Gen2, using `2017_Yellow_Taxi_Trip_Data.csv`.

### Solution

Read the source once into a staged query, then run a referenced query that adds derived columns and writes to a lakehouse table. This applies the *stage-and-reference* foundation with the *Aggregate or analytical outputs* use case layered on top.

#### Design

The dataflow is built as two queries:

- **`NycTaxi2017`** — the source query. **Enable staging** is on. The mashup includes `[StagingDefinition = [Kind = "FastCopy"]]`, which indicates Fast Copy is used for staged ingestion. The query reads `2017_Yellow_Taxi_Trip_Data.csv` from ADLS Gen2 and applies data types before staging.
- **`NycTaxi2017_AddedCols`** — a referenced query built on `NycTaxi2017` that adds two derived columns: `tpep_pickup_month` (`Date.StartOfMonth`) and `total_tax_surcharge_amount` (`mta_tax + improvement_surcharge`). This query writes to the lakehouse destination with **V-Order** enabled. When **High-Scale Compute output** is enabled, this staging-to-lakehouse phase scales significantly.

The source is read once; adding more analytical outputs is just adding more referenced queries against `NycTaxi2017`.

#### ELT pattern considerations

- Marking the source query as staged is what makes the pattern work: its output is reused by every referenced query.
- Fast Copy is optional but typically essential for large or file-based sources — it removes the ingestion bottleneck.
- **High-Scale Compute output** scales the downstream transformation phase. It requires **Enable staging** on the referenced query and a lakehouse destination.

### Results

| Configuration | Execution time (hh:mm:ss) | Comparison against Gen1 |
|---|---|---|
| **Dataflow Gen1 baseline** | 02:42:44 | — |
| **Dataflow Gen2 with staging + Fast Copy + V-Order** (no High-Scale Compute output) | 01:05:57 | 2.5× faster |
| **Dataflow Gen2 with staging + Fast Copy + High-Scale Compute output + V-Order** | 00:06:34 | ~25× faster |

### Key takeaways

- With staging + Fast Copy + V-Order alone, runtime dropped from 02:42:44 to 01:05:57.
- Enabling **High-Scale Compute output** reduced the same workload further to 00:06:34, an approximately 10x improvement over the non-high-scale Gen2 run and ~25x faster than the Dataflow Gen1 baseline.
- This scenario explicitly uses **V-Order** on the destination output.
- Use this pattern when ingestion and transformation in a single pass cause contention, or when one staged dataset needs to feed multiple downstream shapes.