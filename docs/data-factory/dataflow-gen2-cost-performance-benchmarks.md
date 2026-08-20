---
title: "Dataflow Gen2 cost and performance: capability benchmarks and CU costs"
description: "Microsoft Fabric Dataflow Gen2 performance and cost benchmarks: run time and CU consumption for Fast Copy, Modern Evaluator, and Optimized copy to Lakehouse, compared with Dataflow Gen1."
ms.reviewer: krirukm
ms.date: 8/19/2026
ms.topic: concept-article
ms.custom:
  - dataflows
ai-usage: ai-assisted
---

# Dataflow Gen2 cost and performance: capability benchmarks and CU costs

Microsoft Fabric Dataflow Gen2 offers multiple ways to ingest, transform, and load data efficiently. These methods help you balance **performance**, **scalability**, and **cost**.

**This article is the performance and cost reference for Dataflow Gen2.** It benchmarks four common workloads - bulk copy, heavy data shaping, optimized writes to a lakehouse, and combining partitioned files - and reports the run time and the capacity units (CUs) that each one consumed, measured from capacity telemetry. Use it to estimate what your own refreshes cost, and to choose the capability that fits each workload.

**At scale, Dataflow Gen2 substantially outperforms Dataflow Gen1 on both speed and cost - and the larger the workload, the wider the gap.** Running the same M script, against the same data, on the same Fabric capacity, Dataflow Gen2 finished every benchmark in this article **1.7× to 21× faster** than the Dataflow Gen1 baseline. In every scenario where both generations' capacity consumption was measured, Dataflow Gen2 did that faster work while consuming **82% to 95% fewer capacity units** - so the speedup doesn't come at the cost of extra capacity. You get both gains together, without rewriting a single query.

How much you gain depends on your workload, and the biggest factor is how long your queries run. Standard Compute bills the first 10 minutes of each query at 12 CU for every second, then only 1.5 CU for every additional second, so the longer a query runs, the lower its average cost per second becomes. A short dataflow finishes inside that first tier and never reaches the cheaper rate, so the difference between the two generations is small. The gains grow with data volume and run time, which is why the benchmarks in this article use large, high-volume datasets and long-running refreshes.

Dataflow Gen2 also keeps getting cheaper on its own terms: current pricing and capabilities cut CU consumption by an estimated 14% to 84%, depending on the workload, compared with what the same workload would have consumed before 2026.

> [!NOTE]
> Throughout this article, cost and capacity are measured in Fabric Capacity Units (CUs). For how Dataflow Gen2 consumes CUs and how that maps to billing, see [Dataflow Gen2 pricing](pricing-dataflows-gen2.md). These benchmarks and CU figures reflect the current Dataflow Gen2 pricing model and capabilities, including tiered Standard Compute pricing, Fast Copy, and Modern Evaluator. Because Dataflow Gen2 performance and cost efficiency have improved over time, figures published before 2026 might not reflect current behavior.

The following capabilities help you optimize your dataflows:

- [**Fast Copy**](dataflows-gen2-fast-copy.md) – Accelerate bulk data movement before transformation.  
- [**Modern Evaluator**](dataflow-gen2-modern-evaluator.md) – Speed up heavy data shaping on non-foldable queries.  
- [**Staging queries**](dataflow-gen2-data-destinations-and-managed-settings.md#using-staging-before-loading-to-a-destination) – Land data in an intermediate layer before applying transformations, enabling ELT patterns.  
- [**Optimized copy to Lakehouse**](dataflow-gen2-staged-data-options.md) – Speed up writing staged data to a lakehouse destination in ELT workloads.  
- [**Partitioned Compute**](dataflow-gen2-partitioned-compute.md) (Preview) – Scale transformations across large and partitioned datasets.

This article covers common use cases, real-world examples, and benchmarking results to help you choose the right capability for your workload.

Dataflow Gen2 bills each engine separately, at these current rates:

- **Standard Compute** (mashup engine queries) - 12 CU for every second up to 10 minutes of each query, then 1.5 CU for every additional second.
- **Fast Copy** (data movement) - 1.5 CU for every second of copy activity, measured across all cores used.

For the complete rate model, see [Dataflow Gen2 pricing](pricing-dataflows-gen2.md).

## Quick reference

Match your workload to the right Dataflow Gen2 capability. For a benchmark example of each, see the linked scenario.

| Capability | Use it when… | Key benefit | Benchmark |
|---|---|---|---|
| **Fast Copy** | You need a direct, high-throughput copy from a supported source with no transformations. | Faster ingestion at lower compute cost. | [Scenario 1: Copy data](#scenario-1-copy-data) |
| **Modern Evaluator** | You're shaping data from non-foldable or partially foldable connectors (filters, derivations, cleansing). | Faster execution without changing logic. | [Scenario 2: Heavy data shaping](#scenario-2-heavy-data-shaping) |
| **Optimized copy to Lakehouse** | You enabled staging on a query that writes to a lakehouse destination. | Maximizes throughput when writing staged data to the lakehouse. | [Scenario 3: Optimized copy to Lakehouse](#scenario-3-optimized-copy-to-lakehouse) |
| **Partitioned Compute** (Preview) | You're transforming large, partitioned, or multi-file datasets that can run in parallel. Combine with Modern Evaluator when supported. | Parallelized execution across partitions. | [Scenario 4: Combine files](#scenario-4-combine-files) |

> [!NOTE]
> For background on query evaluation and query folding, see [Query folding basics](/power-query/query-folding-basics).

## Benchmark results summary

Most scenarios in this article use the [**New York City Taxi & Limousine Commission (TLC) Trip Data – TLC Trip Record Data**](/azure/open-datasets/dataset-taxi-yellow?tabs=azureml-opendatasets) dataset: billions of taxi trip records stored as Parquet files in ADLS Gen2, covering 2021–2025 (up to August). Scenario 3 uses a Fabric lakehouse table of about 113 million NYC taxi trip records spanning 2017 through mid-2018. The destination is a Fabric lakehouse or warehouse, depending on the scenario.

The following table summarizes the benchmark results across all scenarios. Each scenario also includes a Dataflow Gen1 baseline for comparison.

| Scenario | What it does | Capability enabled | Gen2 execution time | Speedup vs. Gen1 baseline | Gen1 CU | Gen2 CU | CU reduction on Gen2 |
|----------|--------------|--------------------|---------------------|---------------------------|---------|---------|-------------------------|
| [Scenario 1: Copy data](#scenario-1-copy-data) | Bulk-load five consolidated Parquet files from ADLS Gen2 into a lakehouse with no transformations. | Fast Copy | 00:09:08 | **11× faster** | 84,411 | 14,593 | **83%** |
| [Scenario 2: Heavy data shaping](#scenario-2-heavy-data-shaping) | Apply non-foldable transformations (filters, derivations, cleansing) to a single large Parquet file loaded into a lakehouse. | Modern Evaluator | 00:46:29 | **1.7× faster** | 56,855 | 10,485 | **82%** |
| [Scenario 3: Optimized copy to Lakehouse](#scenario-3-optimized-copy-to-lakehouse) | Transform a 113-million-row NYC taxi table from a Fabric lakehouse and write the result to a lakehouse table on an accelerated copy path. This benchmark uses Optimized copy to Lakehouse and V-Order. | Optimized copy to Lakehouse | 00:03:34 | **15× faster** | 50,788 | 2,391 | **95%** |
| [Scenario 4: Combine files](#scenario-4-combine-files) | Combine and transform 56 partitioned Parquet files in parallel and load into a warehouse. | Partitioned Compute (Preview) | 00:04:48 | **21× faster** | Not measured | Not measured | Not measured |

:::image type="content" source="media/decision-guide-data-transformation/scenario-comparison-chart.png" alt-text="Comparison chart showing the execution time and relative speedup for the four benchmark scenarios in the summary table." lightbox="media/decision-guide-data-transformation/scenario-comparison-chart.png":::

The following chart compares the same scenarios by capacity consumption instead of execution time.

:::image type="content" source="media/decision-guide-data-transformation/cu-gen1-vs-gen2-chart.png" alt-text="Comparison chart showing the CU seconds consumed by the Dataflow Gen1 baseline versus the best Dataflow Gen2 configuration for each benchmark scenario." lightbox="media/decision-guide-data-transformation/cu-gen1-vs-gen2-chart.png":::

For step-by-step details, dataset configurations, and design patterns for each capability, see the scenario sections that follow.

> [!NOTE]
> All scenarios in this article have **Modern Evaluator** enabled and **V-Order** disabled unless explicitly stated otherwise.
> The **Gen1 CU** and **Gen2 CU** columns report Capacity Unit seconds. The **CU reduction on Gen2** column is the drop in CU seconds from the Dataflow Gen1 baseline to the best Dataflow Gen2 configuration, calculated as (Gen1 CU − Gen2 CU) ÷ Gen1 CU.

## How we measured these benchmarks

Each scenario runs the same M script twice: once on Dataflow Gen1 to establish a baseline, and once on Dataflow Gen2 with the capability under test enabled.

Every run in this article shares the same test conditions:

- All scenarios and both generations ran on the **same Fabric capacity**, so no result reflects a different capacity size or SKU.
- **No data gateway** was involved. Every connection went directly from the Fabric service to a cloud data source.
- Each scenario used the same source data and the same M script for both its Dataflow Gen1 and Dataflow Gen2 runs.

The reported figures mean the following:

- **Run time** is the total refresh duration reported for the dataflow run.
- **CU consumed** is the Capacity Unit seconds that the run billed to the capacity, read from the [Microsoft Fabric Capacity Metrics app](../enterprise/metrics-app.md). Because Dataflow Gen2 bills each engine separately, a scenario's total is the sum of every engine that ran during the refresh, and CU figures are rounded to the nearest whole CU second. For the complete rate model, see [Dataflow Gen2 pricing](pricing-dataflows-gen2.md).

When you compare the two generations, keep these architectural differences in mind:

- Dataflow Gen1 uses a fundamentally different architecture than Dataflow Gen2, and it doesn't support capabilities such as Fast Copy, Modern Evaluator, Optimized copy to Lakehouse, or Partitioned Compute.
- Dataflow Gen1 can only load data as CSV files, whereas Dataflow Gen2 loads data as Parquet files in these scenarios.

> [!NOTE]
> These figures were recorded in our own test environment in August 2026 and apply only to these specific runs. Your own results vary with data volume, capacity size, and configuration. To measure your own workloads, see [Compute estimated costs using the Fabric Metrics app and dataflow refresh history](pricing-dataflows-gen2.md#compute-estimated-costs-using-the-fabric-metrics-app-and-dataflow-refresh-history).

## Scenario 1: Copy data

The NYC Taxi analytics team needs to load millions of raw Parquet trip records from ADLS Gen2 into a Fabric lakehouse. The team doesn't need any transformations, only a direct copy to support downstream analytics.

### Challenges

- Move large volumes of Parquet data quickly into the lakehouse.  
- Reduce ingestion time for daily refreshes.  
- Minimize compute cost for simple extract-load (EL) workloads.

### Dataset

Year-wise merged NYC Yellow Taxi Parquet files, five consolidated partitions (2021–Aug 2025).

### Solution

The team enables **Fast Copy** in Dataflow Gen2. Fast Copy optimizes data movement paths and parallelizes writes for supported connectors.

### Design

:::image type="content" source="media/decision-guide-data-transformation/fast-copy-design.png" alt-text="Screenshot of dataflow design for Fast Copy showcasing Query settings." lightbox="media/decision-guide-data-transformation/fast-copy-design.png":::

This query combines the five year-wise Parquet files and loads the result into the lakehouse.

#### Fast Copy considerations

- Supports **.csv** and **.parquet** file formats.  
- Supports up to **1M rows per table per run** for Azure SQL Database.  
- Best suited for **extract-load (EL)** workflows prior to transformations.

### Results

:::image type="content" source="media/decision-guide-data-transformation/scenario-1-copy-data-comparison.png" alt-text="Chart comparing the Dataflow Gen1 baseline with the best Dataflow Gen2 configuration for Scenario 1, showing run time and CU consumption as a percentage of the Gen1 baseline." lightbox="media/decision-guide-data-transformation/scenario-1-copy-data-comparison.png":::

When you enable Fast Copy, Dataflow Gen2 ingests this dataset **about 11× faster than the Dataflow Gen1 baseline** (00:09:08 vs. 01:38:59) while reducing compute usage. Without Fast Copy, Dataflow Gen2 is already about 2.8× faster than Gen1 on the same workload.

| Configuration | Execution time (hh:mm:ss) | Comparison against Gen1 | CU consumed |
|---------------------|---------------------------|-------------------------|-------------|
| **Dataflow Gen1 baseline** | 01:38:59 | — | 84,411 |
| **Dataflow Gen2 without Fast Copy** | 00:35:25 | 2.8× faster | Not measured |
| **Dataflow Gen2 with Fast Copy**    | 00:09:08 | 11× faster | 14,593 |

When you enable Fast Copy - the most optimal Dataflow Gen2 configuration for this scenario - Scenario 1's Fast Copy ingestion of five consolidated Parquet files into a lakehouse consumes 14,593 CU seconds. The following table breaks down that total by operation:

| Operation | Engine (meter) | CU seconds |
|---|---|---|
| Data movement | Fast Copy | 8,280 |
| Run queries | Standard Compute | 6,313 |
| **Total** | | **14,593** |

Fast Copy data movement is billed at the rate of 1.5 CU for every second of copy activity, measured as the total time across all the cores the copy runs on. Dataflow Gen2 automatically balances how many cores each Fast Copy scenario uses, so a copy that finishes quickly in wall-clock time can still span many core-seconds. Any remaining query time is billed on Standard Compute (12 CU for every second up to 10 minutes, then 1.5 CU for every additional second). For the full rate model, see [Dataflow Gen2 pricing](pricing-dataflows-gen2.md).

### Key takeaways

- Enabling Fast Copy collapsed a 99-minute ingestion into roughly nine minutes, an order-of-magnitude improvement on the same dataset and M script.
- Dataflow Gen2 also used **83% less capacity** than Dataflow Gen1 for the same work (14,593 versus 84,411 CU seconds), so the speedup didn't come at the cost of extra compute.
- The speedup comes from native, parallelized data movement that bypasses the mashup engine, so it only applies to extract-load steps that meet the [Fast Copy prerequisites](dataflows-gen2-fast-copy.md). Any transformation that breaks folding falls back to the standard engine and forfeits the gains.
- For supported sources, treat Fast Copy as the default for ingestion and reserve heavier transformation engines (covered in the next scenarios) for steps that actually reshape the data.

## Scenario 2: Heavy data shaping

After ingestion, the team applies filtering, null replacement, and code mapping before loading data into the lakehouse. These transformations don't fully fold back to Parquet and are slow in memory.

### Challenges

- Improve transformation speed for semi-foldable or non-foldable queries.  
- Maintain no-code Power Query authoring.  
- Reduce overall refresh time and cost.

### Dataset

All Parquet files for 2021–August 2025 merged into one consolidated file.

### Solution

The team enables **Modern Evaluator**, a high-performance execution engine designed for efficient transformation especially for connectors like ADLS Gen2 and SharePoint.

### Design

:::image type="content" source="media/decision-guide-data-transformation/modern-evaluator-design.png" alt-text="Screenshot of dataflow design for Modern Evaluator showcasing Query settings." lightbox="media/decision-guide-data-transformation/modern-evaluator-design.png":::

This query ingests data from a consolidated Parquet file, filters the `trip_distance` and `fare_amount` columns to keep values above 0, replaces nulls in `passenger_count` with 1, and creates a new `payment_method` column by mapping the payment types before loading the data into the lakehouse.

#### Modern Evaluator considerations

- Expected refresh times could be **significantly faster** (varies by dataset and transformations).  
- Optimized for large volumes (millions of rows).  
- Beneficial for non-foldable queries.  
- Faster writes to destinations like a lakehouse.  

### Results

:::image type="content" source="media/decision-guide-data-transformation/scenario-2-heavy-data-shaping-comparison.png" alt-text="Chart comparing the Dataflow Gen1 baseline with the best Dataflow Gen2 configuration for Scenario 2, showing run time and CU consumption as a percentage of the Gen1 baseline." lightbox="media/decision-guide-data-transformation/scenario-2-heavy-data-shaping-comparison.png":::

When you enable Modern Evaluator, Dataflow Gen2 runs this shaping workload **about 1.7× faster than the Dataflow Gen1 baseline** (00:46:29 vs. 01:19:56) while preserving the no-code Power Query experience. Without Modern Evaluator, the same workload is only about 1.2× faster than Gen1 (01:08:37 vs. 01:19:56).

| Configuration | Execution time (hh:mm:ss) | Comparison against Gen1 | CU consumed |
|---------------------|---------------------------|-------------------------|-------------|
| **Dataflow Gen1 baseline** | 01:19:56 | — | 56,855 |
| **Dataflow Gen2 without Modern Evaluator** | 01:08:37 | 1.2× faster | Not measured |
| **Dataflow Gen2 with Modern Evaluator**    | 00:46:29 | 1.7× faster | 10,485 |

When you enable Modern Evaluator - the most optimal Dataflow Gen2 configuration for this scenario - Scenario 2's Modern Evaluator shaping of a single large Parquet file into a lakehouse consumes 10,485 CU seconds. The following table breaks down that total by operation:

| Operation | Engine (meter) | CU seconds |
|---|---|---|
| Run queries | Standard Compute | 10,485 |
| **Total** | | **10,485** |

The work runs entirely on Standard Compute, which is billed on two tiers: 12 CU for every second up to 10 minutes, then 1.5 CU for every additional second. The following table shows how the billed duration and the CU total split across those tiers:

| Billing tier | Billed duration | Rate | CU seconds |
|---|---|---|---|
| First 10 minutes | 00:10:00 (600 seconds) | 12 CU for every second | 7,200 |
| Beyond 10 minutes | 00:36:29 (2,189.8 seconds) | 1.5 CU for every second | 3,284.7 |
| **Total** | **00:46:29 (2,789.8 seconds)** | | **10,484.7** |

This table shows the measured total to one decimal place so the tiers add up exactly; the rest of the article rounds it to 10,485 CU seconds.

The split shows how much the first tier dominates the bill: the first 10 minutes are only about 22% of the run but account for roughly 69% of the CU seconds, because every one of those seconds costs eight times more than a second in the second tier. Everything past the 10-minute mark - the bulk of a long shaping run - is billed at the much lower 1.5 CU rate. Modern Evaluator lowers the bill further by shortening the billed duration itself, not by changing the rate. For the full rate model, see [Dataflow Gen2 pricing](pricing-dataflows-gen2.md).

### Key takeaways

- Without Modern Evaluator, Dataflow Gen2 was only about 1.2× faster than the Dataflow Gen1 baseline on this shaping workload. Enabling Modern Evaluator improved performance to about 1.7× faster than Gen1, on identical M script and dataset.
- The capacity saving is larger than the time saving: Dataflow Gen2 finished 1.7× faster while consuming **82% less capacity** than Dataflow Gen1 (10,485 versus 56,855 CU seconds).
- This performance boost comes from a more efficient execution path for non-foldable and semi-foldable queries. Power Query traditionally spends the most time on these queries, especially when you use connectors like ADLS Gen2 and SharePoint. Gains scale with row volume and shaping complexity.
- Use Modern Evaluator as the default for shaping-heavy flows where queries don't fully fold back to the source. The bigger the dataset and the more transformations you apply in-engine, the more impact you should expect.

## Scenario 3: Optimized copy to Lakehouse

The NYC Taxi analytics team transforms a large table and writes the result to a Fabric lakehouse. Writing that volume to the destination is the slowest part of the refresh, so the team wants to speed up the write without changing the transformation logic.

### Challenges

- Write a large transformed result to a lakehouse destination quickly.  
- Keep the destination write from becoming the refresh bottleneck.  
- Preserve the no-code Power Query experience and the existing transformation logic.

### Dataset

A Fabric lakehouse table of about 113 million NYC taxi trip records spanning 2017 through mid-2018.

### Solution

The team turns on **Enable staging** and enables **Optimized copy to Lakehouse** on a single query that writes to a lakehouse destination. Optimized copy to Lakehouse moves the staged result to the lakehouse on an accelerated path.

### Design

The benchmark dataflow uses a single query with **Enable staging** turned on and a **lakehouse** destination that uses **V-Order**. The query reads the roughly 113-million-row NYC taxi table from a Fabric lakehouse, sorts the rows by pickup date and time, and adds two derived columns - the start of the pickup month, and the sum of the MTA tax and improvement surcharge. Because staging is on, **Optimized copy to Lakehouse** writes the transformed result to the lakehouse destination on an accelerated path, which drives the fast run time.

#### Optimized copy to Lakehouse considerations

- It requires **Enable staging** on the query and a lakehouse destination. For more information, see [Staged data options for Dataflow Gen2](dataflow-gen2-staged-data-options.md).  
- It accelerates the write to the lakehouse without changing the transformation logic.  
- Combine it with **V-Order** on the destination to optimize the output for downstream analytics.

### Results

:::image type="content" source="media/decision-guide-data-transformation/scenario-3-optimized-copy-comparison.png" alt-text="Chart comparing the Dataflow Gen1 baseline with the best Dataflow Gen2 configuration for Scenario 3, showing run time and CU consumption as a percentage of the Gen1 baseline." lightbox="media/decision-guide-data-transformation/scenario-3-optimized-copy-comparison.png":::

When you enable Optimized copy to Lakehouse, Dataflow Gen2 completes this refresh **about 15× faster than the Dataflow Gen1 baseline** (00:03:34 vs. 00:53:20) without changing the transformation logic. Without it, the same staged dataflow is about 3.6× faster than Gen1.

| Configuration | Execution time (hh:mm:ss) | Comparison against Gen1 | CU consumed |
|---|---|---|---|
| **Dataflow Gen1 baseline** | 00:53:20 | — | 50,788 |
| **Dataflow Gen2 with staging + V-Order** (no Optimized copy to Lakehouse) | 00:14:45 | 3.6× faster | Not measured |
| **Dataflow Gen2 with staging + Optimized copy to Lakehouse + V-Order** | 00:03:34 | 15× faster | 2,391 |

When you enable staging, Optimized copy to Lakehouse, and V-Order - the most optimal Dataflow Gen2 configuration for this scenario - Scenario 3's refresh of the 113-million-row NYC taxi table into a lakehouse table completes in 00:03:34 and consumes 2,391 CU seconds. The following table breaks down that total by operation:

| Operation | Engine (meter) | CU seconds |
|---|---|---|
| Run queries | Standard Compute | 2,391 |
| **Total** | | **2,391** |

The work is billed entirely on Standard Compute (12 CU for every second up to 10 minutes, then 1.5 CU for every additional second). The optimized copy to the lakehouse runs through the mashup engine, so there's no separate meter. For the full rate model, see [Dataflow Gen2 pricing](pricing-dataflows-gen2.md).

### Key takeaways

- **Optimized copy to Lakehouse** accelerates writing the transformed result to the lakehouse destination, cutting the refresh from 00:14:45 (without it) to 00:03:34 - about 4× faster than the same dataflow without it, and roughly 15× faster than the Dataflow Gen1 baseline (00:53:20).
- This scenario delivered the largest capacity saving against Dataflow Gen1 in this article: Dataflow Gen2 consumed **95% less capacity** than Dataflow Gen1 (2,391 versus 50,788 CU seconds).
- It requires **Enable staging** on the query and a lakehouse destination, and it doesn't change your transformation logic.
- This scenario explicitly uses **V-Order** on the destination output.
- Use Optimized copy to Lakehouse whenever you write staged data to a lakehouse destination and the write time dominates the refresh.

## Scenario 4: Combine files

> [!NOTE]
> Partitioned Compute is currently in **preview** and only available in Dataflow Gen2 with CI/CD. The capability is still receiving improvements, so its behavior, supported transformations, and performance can change before general availability. Treat the results in this scenario as a point-in-time snapshot of the preview.

The team must now aggregate and enrich trip data across hundreds of Parquet files (monthly partitions). Transformations include computing tip percentages across the dataset.

### Challenges

- You must process hundreds of large files.  
- Transformations require grouping, aggregation, and enrichment across partitions.  
- Sequential execution becomes a bottleneck.

### Dataset

Fifty-six Parquet files (2021–Aug 2025).

### Solution

The team enables **Partitioned Compute** (Preview), which parallelizes processing across partitions and merges results efficiently.

### Design

:::image type="content" source="media/decision-guide-data-transformation/partitioned-compute-design.png" alt-text="Screenshot of dataflow design for Partitioned Compute showcasing Query settings." lightbox="media/decision-guide-data-transformation/partitioned-compute-design.png":::

This query combines 56 Parquet files and creates a new custom column for tip percentage "Tip Pctg" on the **Transform Sample file** before loading the data into the warehouse.

#### Partitioned Compute considerations

- Currently in **preview** and only available in Dataflow Gen2 with CI/CD; the capability is still receiving improvements.  
- Use it when the source doesn't support folding.  
- Provides the best performance when loading data to staging or the warehouse.  
- Use **Sample transform file** from **Combine files** to ensure consistent transformation logic.  
- Supports a subset of transformations; performance varies.

### Results

:::image type="content" source="media/decision-guide-data-transformation/scenario-4-combine-files-comparison.png" alt-text="Chart comparing the Dataflow Gen1 baseline with the best Dataflow Gen2 configuration for Scenario 4, showing run time as a percentage of the Gen1 baseline." lightbox="media/decision-guide-data-transformation/scenario-4-combine-files-comparison.png":::

Partitioned Compute delivers **about 21× faster performance than the Dataflow Gen1 baseline** (00:04:48 vs. 01:40:57) on large, partitioned, multi-file datasets.

| Configuration                     | Execution time (hh:mm:ss) | Comparison against Gen1 | CU consumed |
|-----------------------------------------|---------------------------|-------------------------|-------------|
| **Dataflow Gen1 baseline**               | 01:40:57 | — | Not measured |
| **Dataflow Gen2 with Partitioned Compute**             | 00:04:48 | 21× faster | Not measured |

Partitioned Compute targets wall-clock time rather than cost. It runs partitions in parallel so the refresh finishes sooner, but that parallelism spreads the work across more compute instead of reducing it, so the cost is typically similar to or higher than the same workload without the feature. CU consumption wasn't measured for this scenario, so this article reports run time only.

### Key takeaways

- Partitioned Compute delivered a 21× speedup over the Dataflow Gen1 baseline and finished in under five minutes. Because the capability is in preview and still receiving improvements, expect these numbers to evolve.
- Treat Partitioned Compute as a way to finish sooner, not to spend less. Parallelism shortens wall-clock time by running partitions at the same time, so the cost is typically similar to or higher than the same workload without it.
- The gain comes from processing each partition in parallel and merging the results, so it's most effective on multi-file or partitioned sources where folding isn't available and sequential evaluation is the bottleneck.
- Use the **Sample transform file** pattern from Combine files so transformation logic is applied consistently per partition. Partitioned Compute currently supports a subset of transformations, so validate that your shaping steps are compatible before relying on it, and recheck as the preview evolves.
- For high-volume, partitioned ingestion to staging or a warehouse, make Partitioned Compute the default and combine it with Modern Evaluator whenever possible. Because it's still in preview, validate it against your own workload before adopting it for production refreshes.

## Cost over time (then vs. now)

Dataflow Gen2 has become more cost-efficient to run over time. The same logic, on the same data, consumes fewer CUs today than it did in the past, with no changes required to your queries.

In this comparison, **then** means the same workload under the pricing and capabilities generally available **before 2026**. **Now** means the same workload run **today** with the best generally available settings (such as Modern Evaluator and Fast Copy). Both columns use the best generally available configuration of their period. The **now** figures are measured from capacity telemetry. The **then** figures are estimates of what the same workload would have consumed at the time, because the earlier service conditions can't be reproduced today.

| Scenario | Capability | Estimated CU before 2026 (best GA) | CU now (best GA) | Estimated reduction |
|---|---|---|---|---|
| [Scenario 1: Copy data](#scenario-1-copy-data) | Fast Copy | 17,055 | 14,593 | **14%** |
| [Scenario 2: Heavy data shaping](#scenario-2-heavy-data-shaping) | Modern Evaluator | 66,164 | 10,485 | **84%** |
| [Scenario 3: Optimized copy to Lakehouse](#scenario-3-optimized-copy-to-lakehouse) | Optimized copy to Lakehouse | 14,173 | 2,391 | **83%** |

:::image type="content" source="media/decision-guide-data-transformation/cu-comparison-chart.png" alt-text="Comparison chart showing the estimated CU seconds before 2026 versus the measured CU seconds now for each scenario in the then-versus-now table." lightbox="media/decision-guide-data-transformation/cu-comparison-chart.png":::

For example, the heavy-shaping workload in Scenario 2 would have consumed an estimated 66,164 CU seconds before 2026, and now consumes 10,485 CU seconds. This change is an 84% reduction with identical logic and no changes required. Two improvements compound to create it. First, Standard Compute pricing became tiered: instead of a flat 16 CU for every second of the whole run, only the first 10 minutes bills at 12 CU for every second and every second after bills at just 1.5 CU, so the long tail of a shaping workload now costs a fraction of what it did. Second, Modern Evaluator - generally available since April 2026 - shortens the billed duration itself, so there are fewer seconds to bill at either tier. A shorter run billed against a far cheaper long-tail rate is why the CU consumption drops so sharply, and it's why pairing Modern Evaluator with the current tiered pricing matters so much for shaping-heavy dataflows.

The Fast Copy ingestion in Scenario 1 would have consumed an estimated 17,055 CU seconds before 2026, and now consumes 14,593 CU seconds. This change is a 14% reduction, driven by the Standard Compute rate dropping from a flat 16 CU for every second to 12 CU for every second up to 10 minutes; the Fast Copy data movement portion is unchanged. The Optimized copy to Lakehouse refresh in Scenario 3 would have consumed an estimated 14,173 CU seconds before 2026, and now consumes 2,391 CU seconds. This change is an 83% reduction. Each comparison uses the same workload with the best generally available settings of its period.

> [!NOTE]
> This then-versus-now comparison excludes Partitioned Compute, because CU consumption wasn't measured for that scenario and the capability is still in preview.

<!-- Microsoft Learn auto-generates FAQPage structured data from a "Frequently asked questions" H2 followed by H3 question headings, so no manual schema.org JSON-LD is added here. -->

## Frequently asked questions

### How is Dataflow Gen2 billed?

Dataflow Gen2 bills each engine separately in Fabric Capacity Units (CUs). Standard Compute (the mashup engine) bills 12 CU for every second up to 10 minutes of each query, then 1.5 CU for every additional second. Fast Copy (data movement) bills 1.5 CU for every second of copy activity, measured across all the cores the copy runs on. You're billed only for the compute each query actually uses, with no fixed per-refresh fee and no charge for idle time. For the complete rate model, see [Dataflow Gen2 pricing](pricing-dataflows-gen2.md).

### Is Dataflow Gen2 pricing elastic?

Yes. Dataflow Gen2 bills only for the compute each query actually uses, measured in Fabric Capacity Units (CUs). There's no fixed per-refresh fee, no charge for idle time, and no direct charges during authoring time for native functionality. In the benchmarks in this article, a full refresh consumed 14,593 CU seconds for a Fast Copy ingestion and 10,485 CU seconds for a heavy shaping workload.

### How can I estimate my Dataflow Gen2 cost before running the full workload?

Run a small, representative refresh and measure what it consumes, rather than building the full solution and discovering the cost afterward. To estimate cost this way:

- Build the dataflow against a sample or a single partition of your source instead of the full dataset.
- Refresh it once, then read the CU seconds it consumed in the [Microsoft Fabric Capacity Metrics app](../enterprise/metrics-app.md).
- Check the [dataflow refresh history](dataflows-gen2-monitor.md) to see which engines ran, because Standard Compute and Fast Copy are billed separately.
- Divide the measured CU seconds by the rows or GB you processed to get a per-unit rate, then multiply by your full data volume.

> [!NOTE]
> Dataflow Gen2 is optimized for high-scale workloads, so its performance and efficiency benefits are most apparent on large, real-world datasets. A small or synthetic sample might not show the full gains, and a per-unit rate extrapolated from a tiny sample can overstate the cost of a full run. Validate against a representative data volume whenever you can.

For the full method, see [Compute estimated costs using the Fabric Metrics app and dataflow refresh history](pricing-dataflows-gen2.md#compute-estimated-costs-using-the-fabric-metrics-app-and-dataflow-refresh-history).

### How long does a Dataflow Gen2 refresh take?

It depends on data volume and on the transformations you apply. In the benchmarks in this article, Dataflow Gen2 refreshes ranged from 00:03:34 for an optimized copy of a 113-million-row table into a lakehouse, up to 00:46:29 for a heavy shaping workload over a large consolidated Parquet file. A bulk copy of five consolidated Parquet files finished in 00:09:08 with Fast Copy, and a combine of 56 partitioned files finished in 00:04:48 with Partitioned Compute (Preview). For the full per-scenario times, see the [benchmark results summary](#benchmark-results-summary).

### Which Dataflow Gen2 capability lowers cost the most?

It depends on the workload, because each capability targets a different bottleneck: Fast Copy for transformation-free ingestion, Modern Evaluator for non-foldable data shaping, Optimized copy to Lakehouse for accelerating writes to a lakehouse destination, and Partitioned Compute (Preview) for large multi-file datasets. Measured against the Dataflow Gen1 baseline, Optimized copy to Lakehouse produced the largest saving in these benchmarks, at 95% fewer CU seconds. Compared with equivalent Dataflow Gen2 runs before 2026, Modern Evaluator produced the largest estimated reduction, at 84% fewer CU seconds on a heavy shaping workload. To match a capability to your workload, see the [quick reference](#quick-reference).

### How can I make a Dataflow Gen2 refresh faster?

Match the capability to the bottleneck: enable Fast Copy for supported extract-load sources, turn on Modern Evaluator for non-foldable transformations, enable Optimized copy to Lakehouse when writing staged data to a lakehouse destination, and use Partitioned Compute (Preview) for large partitioned or multi-file datasets. Each capability is benchmarked in this article with the specific speedup it delivered over the Dataflow Gen1 baseline.

### Do I need to change my queries to get these improvements?

No. Every benchmark in this article ran the same M script across both generations and every configuration. Fast Copy, Modern Evaluator, and Optimized copy to Lakehouse are settings you turn on, and they change how the engine runs your queries rather than the queries themselves. One caveat: Fast Copy only applies to steps that meet its prerequisites, so a transformation that breaks query folding falls back to the standard engine and forfeits the gain. For those prerequisites, see [Fast copy in Dataflow Gen2](dataflows-gen2-fast-copy.md).

### Is Dataflow Gen2 faster and cheaper than Dataflow Gen1?

For high-volume workloads like the ones benchmarked in this article, yes on both counts. Dataflow Gen2 ran between 1.7× and 21× faster than the Dataflow Gen1 baseline on the same data and the same M script, and it consumed 82% to 95% fewer capacity units in the scenarios where both generations were measured. For example, a bulk copy that took 01:38:59 in Dataflow Gen1 finished in 00:09:08 in Dataflow Gen2 with Fast Copy - about 11× faster. The difference is smaller for short-running dataflows, because a query that completes within the first 10 minutes never reaches the cheaper 1.5 CU tier, so the gains grow with data volume and run time. For the full per-scenario comparison, see the [benchmark results summary](#benchmark-results-summary).

### How much capacity does Dataflow Gen1 consume compared to Dataflow Gen2?

In the scenarios where both generations were measured, Dataflow Gen1 consumed several times more capacity than Dataflow Gen2 for the same high-volume work. The Fast Copy ingestion consumed 84,411 CU seconds on Dataflow Gen1 versus 14,593 CU seconds on Dataflow Gen2, an 83% reduction. The heavy data shaping workload consumed 56,855 CU seconds on Dataflow Gen1 versus 10,485 CU seconds on Dataflow Gen2, an 82% reduction. The Optimized copy to Lakehouse workload consumed 50,788 CU seconds on Dataflow Gen1 versus 2,391 CU seconds on Dataflow Gen2, a 95% reduction. All three of these refreshes run well past 10 minutes, so most of their Dataflow Gen2 duration bills at the lower 1.5 CU rate. For the per-scenario figures, see the [benchmark results summary](#benchmark-results-summary).

### Should I move my Dataflow Gen1 dataflows to Dataflow Gen2?

Yes. Dataflow Gen2 is the current generation of dataflows in Microsoft Fabric, so plan to move any Dataflow Gen1 dataflows to it. Across the benchmarks in this article, Dataflow Gen2 finished the same M script 1.7× to 21× faster while consuming 82% to 95% fewer capacity units than Dataflow Gen1 - the same logic, running faster and using less of your capacity. The capabilities that deliver those gains - Fast Copy, Modern Evaluator, Optimized copy to Lakehouse, and Partitioned Compute - are available only in Dataflow Gen2, so the gap keeps widening as those capabilities improve. Expect the largest gains on high-volume, long-running refreshes. As you migrate, test a representative workload to confirm the gains on your own data and capacity. To get started, see [Dataflow Gen2 overview](dataflows-gen2-overview.md).

### Has Dataflow Gen2 become more cost-efficient over time?

Yes. The heavy-shaping workload in Scenario 2 would have consumed an estimated 66,164 CU seconds before 2026 and now consumes 10,485 CU seconds with current generally available capabilities, an estimated 84% reduction with identical logic and no changes required. For per-scenario figures, see [Cost over time (then vs. now)](#cost-over-time-then-vs-now).

### Are older Dataflow Gen2 cost and performance figures still accurate?

Not necessarily. The figures in this article reflect the current Dataflow Gen2 pricing model - 12 CU for every second up to 10 minutes of Standard Compute, then 1.5 CU for every additional second - along with current capabilities such as Fast Copy and Modern Evaluator. Because Dataflow Gen2 has become faster and more cost-efficient over time, benchmark numbers or cost estimates published before 2026 might overstate current cost or understate current performance. Validate your own workloads against the [Microsoft Fabric Capacity Metrics app](../enterprise/metrics-app.md).

## Related content

- [Dataflow Gen2 pricing](pricing-dataflows-gen2.md)
- [Fast copy in Dataflow Gen2](dataflows-gen2-fast-copy.md)
- [Modern Evaluator for Dataflow Gen2 with CI/CD](dataflow-gen2-modern-evaluator.md)
- [Staged data options for Dataflow Gen2](dataflow-gen2-staged-data-options.md)
- [Partitioned Compute for Dataflow Gen2 (Preview)](dataflow-gen2-partitioned-compute.md)
