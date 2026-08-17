---
title: "Dataflow Gen2 cost and performance: capability benchmarks and CU costs"
description: "Current Microsoft Fabric Dataflow Gen2 cost and performance benchmarks: CU consumption, tiered pricing, and Fast Copy and Modern Evaluator results to estimate and optimize dataflow cost."
ms.reviewer: krirukm
ms.date: 8/13/2026
ms.topic: concept-article
ms.custom:
  - dataflows
ai-usage: ai-assisted
---

# Dataflow Gen2 cost and performance: capability benchmarks and CU costs

Microsoft Fabric Dataflow Gen2 offers multiple ways to ingest, transform, and load data efficiently. These methods help you balance **performance**, **scalability**, and **cost**.

In the following benchmarks, Dataflow Gen2 finishes the same workloads 1.6× to 21× faster than the Dataflow Gen1 baseline. Current pricing and capabilities cut capacity unit (CU) consumption by up to 84% compared with equivalent runs before 2026 - with no changes to your queries.

> [!NOTE]
> Throughout this article, cost and capacity are measured in Fabric Capacity Units (CUs). For how Dataflow Gen2 consumes CUs and how that maps to billing, see [Dataflow Gen2 pricing](pricing-dataflows-gen2.md). These benchmarks and CU figures reflect the current Dataflow Gen2 pricing model and capabilities, including tiered Standard Compute pricing, Fast Copy, and Modern Evaluator. Because Dataflow Gen2 performance and cost efficiency have improved over time, figures published before 2026 might not reflect current behavior.

The following capabilities help you optimize your dataflows:

- [**Fast Copy**](dataflows-gen2-fast-copy.md) – Accelerate bulk data movement before transformation.  
- [**Modern Evaluator**](dataflow-gen2-modern-evaluator.md) – Speed up heavy data shaping on non-foldable queries.  
- [**Staging queries**](dataflow-gen2-data-destinations-and-managed-settings.md#using-staging-before-loading-to-a-destination) – Land data in an intermediate layer before applying transformations, enabling ELT patterns.  
- [**Optimized copy to Lakehouse**](dataflow-gen2-staged-data-options.md) – Speed up writing staged data to a lakehouse destination in ELT workloads.  
- [**Partitioned Compute**](dataflow-gen2-partitioned-compute.md) – Scale transformations across large and partitioned datasets.

This guide covers common use cases, real-world examples, and benchmarking results to help you choose the right feature for your workload.

Dataflow Gen2 bills each engine separately, at these current rates:

- **Standard Compute** (mashup engine queries) - 12 CU per second for the first 10 minutes of each query, then 1.5 CU per second.
- **Fast Copy** (data movement) - 1.5 CU per second of copy activity, measured across all cores used.

For the complete rate model, see [Dataflow Gen2 pricing](pricing-dataflows-gen2.md).

## Quick reference

Match your workload to the right Dataflow Gen2 capability. For a benchmark example of each, see the linked scenario.

| Capability | Use it when… | Key benefit | Benchmark |
|---|---|---|---|
| **Fast Copy** | You need a direct, high-throughput copy from a supported source with no transformations. | Faster ingestion at lower compute cost. | [Scenario 1: Copy data](#scenario-1-copy-data) |
| **Modern Evaluator** | You're shaping data from non-foldable or partially foldable connectors (filters, derivations, cleansing). | Faster execution without changing logic. | [Scenario 2: Heavy data shaping](#scenario-2-heavy-data-shaping) |
| **Optimized copy to Lakehouse** | You enabled staging on a query that writes to a lakehouse destination. | Maximizes throughput when writing staged data to the lakehouse. | [Scenario 3: Optimized copy to Lakehouse](#scenario-3-optimized-copy-to-lakehouse) |
| **Partitioned Compute** | You're transforming large, partitioned, or multi-file datasets that can run in parallel. Combine with Modern Evaluator when supported. | Parallelized execution across partitions. | [Scenario 4: Combine files](#scenario-4-combine-files) |

> [!NOTE]
> For background on query evaluation and query folding, see [Query folding basics](/power-query/query-folding-basics).

## Benchmark results summary

Most scenarios in this guide use the [**New York City Taxi & Limousine Commission (TLC) Trip Data – TLC Trip Record Data**](/azure/open-datasets/dataset-taxi-yellow?tabs=azureml-opendatasets) dataset: billions of taxi trip records stored as Parquet files in ADLS Gen2, covering 2021–2025 (up to August). Scenario 3 uses a Fabric lakehouse table of about 113 million NYC taxi trip records spanning 2017 through mid-2018. The destination is a Fabric lakehouse or warehouse, depending on the scenario.

The following table summarizes the benchmark results across all scenarios. Each scenario also includes a Dataflow Gen1 baseline for comparison.

| Scenario | What it does | Capability enabled | Gen2 execution time | Speedup vs. Gen1 baseline |
|----------|--------------|--------------------|---------------------|---------------------------|
| [Scenario 1: Copy data](#scenario-1-copy-data) | Bulk-load five consolidated Parquet files from ADLS Gen2 into a lakehouse with no transformations. | Fast Copy | 00:09:08 | 11× faster |
| [Scenario 2: Heavy data shaping](#scenario-2-heavy-data-shaping) | Apply non-foldable transformations (filters, derivations, cleansing) to a single large Parquet file loaded into a lakehouse. | Modern Evaluator | 00:46:49 | 1.6× faster |
| [Scenario 3: Optimized copy to Lakehouse](#scenario-3-optimized-copy-to-lakehouse) | Transform a 113-million-row NYC taxi table from a Fabric lakehouse and write the result to a lakehouse table on an accelerated copy path. This benchmark uses Optimized copy to Lakehouse and V-Order. | Optimized copy to Lakehouse | 00:03:34 | 15× faster |
| [Scenario 4: Combine files](#scenario-4-combine-files) | Combine and transform 56 partitioned Parquet files in parallel and load into a warehouse. | Partitioned Compute | 00:04:48 | 21× faster |

:::image type="content" source="media/decision-guide-data-transformation/scenario-comparison-chart.png" alt-text="Comparison chart showing the execution time and relative speedup for the four benchmark scenarios in the summary table." lightbox="media/decision-guide-data-transformation/scenario-comparison-chart.png":::

For step-by-step details, dataset configurations, and design patterns for each capability, see the scenario sections that follow.

> [!NOTE]
> All scenarios in this article have **Modern Evaluator** enabled and **V-Order** disabled unless explicitly stated otherwise.
> The **CU consumed** column reports the Capacity Unit seconds recorded for each scenario in our own test environment. These figures apply only to these specific recorded tests and might differ from what you observe with your own data, capacity, and configuration.

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

When you enable Fast Copy, Dataflow Gen2 ingests this dataset **about 11× faster than the Dataflow Gen1 baseline** (00:09:08 vs. 01:42:18) while reducing compute usage. Without Fast Copy, Dataflow Gen2 is already about 2.9× faster than Gen1 on the same workload.

The following table also includes a Dataflow Gen1 baseline for comparison. Dataflow Gen1 uses a fundamentally different architecture than Dataflow Gen2; it doesn't support capabilities like Fast Copy, and it can only load data as CSV files, whereas Dataflow Gen2 loads data as Parquet files in these scenarios. The same M script was used across both Gen1 and Gen2 runs.

| Configuration | Execution time (hh:mm:ss) | Comparison against Gen1 |
|---------------------|---------------------------|-------------------------|
| **Dataflow Gen1 baseline** | 01:42:18 | — |
| **Dataflow Gen2 without Fast Copy** | 00:35:25 | 2.9× faster |
| **Dataflow Gen2 with Fast Copy**    | 00:09:08 | 11× faster |

When you enable Fast Copy - the most optimal Dataflow Gen2 configuration for this scenario - Scenario 1's Fast Copy ingestion of five consolidated Parquet files into a lakehouse consumes 14,593 CU seconds. The following table breaks down that total by operation:

| Operation | Engine (meter) | CU seconds |
|---|---|---|
| Data movement | Fast Copy | 8,280 |
| Run queries | Standard Compute | 6,313 |
| **Total** | | **14,593** |

Fast Copy data movement is billed at 1.5 CU for every second of copy activity, measured as the total time across all the cores the copy runs on. Dataflow Gen2 automatically balances how many cores each Fast Copy scenario uses, so a copy that finishes quickly in wall-clock time can still span many core-seconds. Any remaining query time is billed on Standard Compute (12 CU per second up to 10 minutes, then 1.5 CU per second). For the full rate model, see [Dataflow Gen2 pricing](pricing-dataflows-gen2.md).

### Key takeaways

- Enabling Fast Copy collapsed an hour-long ingestion into roughly nine minutes, an order-of-magnitude improvement on the same dataset and M script.
- The speedup comes from native, parallelized data movement that bypasses the mashup engine, so it only applies to extract-load steps that meet the [Fast Copy prerequisites](/fabric/data-factory/dataflows-gen2-fast-copy). Any transformation that breaks folding falls back to the standard engine and forfeits the gains.
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

When you enable Modern Evaluator, Dataflow Gen2 runs this shaping workload **about 1.6× faster than the Dataflow Gen1 baseline** (00:46:49 vs. 01:13:44) while preserving the no-code Power Query experience. Without Modern Evaluator, the same workload is roughly on par with Gen1 (01:08:37 vs. 01:13:44).

The following table also includes a Dataflow Gen1 baseline for comparison. Dataflow Gen1 uses a fundamentally different architecture than Dataflow Gen2. It doesn't support capabilities like Modern Evaluator, and it can only load data as CSV files, whereas Dataflow Gen2 loads data as Parquet files in these scenarios. The same M script was used across both Gen1 and Gen2 runs.

| Configuration | Execution time (hh:mm:ss) | Comparison against Gen1 |
|---------------------|---------------------------|-------------------------|
| **Dataflow Gen1 baseline** | 01:13:44 | — |
| **Dataflow Gen2 without Modern Evaluator** | 01:08:37 | Roughly on par with Gen1 |
| **Dataflow Gen2 with Modern Evaluator**    | 00:46:49 | 1.6× faster |

When you enable Modern Evaluator - the most optimal Dataflow Gen2 configuration for this scenario - Scenario 2's Modern Evaluator shaping of a single large Parquet file into a lakehouse consumes 10,392 CU seconds. The following table breaks down that total by operation:

| Operation | Engine (meter) | CU seconds |
|---|---|---|
| Run queries | Standard Compute | 10,392 |
| **Total** | | **10,392** |

The work runs entirely on Standard Compute, which is billed on two tiers: 12 CU per second for the first 10 minutes, then 1.5 CU per second after that. The following table shows how the total splits across those tiers:

| Billing tier | Rate | CU seconds |
|---|---|---|
| First 10 minutes | 12 CU per second | 7,200 |
| Beyond 10 minutes | 1.5 CU per second | 3,192 |
| **Total** | | **10,392** |

The first 10 minutes account for 7,200 CU seconds, while everything past the 10-minute mark - the bulk of a long shaping run - is billed at the much lower 1.5 CU per second rate. Modern Evaluator lowers the bill further by shortening the billed duration itself, not by changing the rate. For the full rate model, see [Dataflow Gen2 pricing](pricing-dataflows-gen2.md).

### Key takeaways

- Without Modern Evaluator, Dataflow Gen2 performed roughly on par with the Dataflow Gen1 baseline on this shaping workload. Enabling Modern Evaluator improved performance to about 1.6× faster than Gen1, on identical M script and dataset.
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

| Configuration | Execution time (hh:mm:ss) | Comparison against Gen1 |
|---|---|---|
| **Dataflow Gen1 baseline** | 00:53:20 | — |
| **Dataflow Gen2 with staging + V-Order** (no Optimized copy to Lakehouse) | 00:14:45 | 3.6× faster |
| **Dataflow Gen2 with staging + Optimized copy to Lakehouse + V-Order** | 00:03:34 | 15× faster |

When you enable staging, Optimized copy to Lakehouse, and V-Order - the most optimal Dataflow Gen2 configuration for this scenario - Scenario 3's refresh of the 113-million-row NYC taxi table into a lakehouse table completes in 00:03:34 and consumes 2,391 CU seconds. The following table breaks down that total by operation:

| Operation | Engine (meter) | CU seconds |
|---|---|---|
| Run queries | Standard Compute | 2,391 |
| **Total** | | **2,391** |

The work is billed entirely on Standard Compute (12 CU per second up to 10 minutes, then 1.5 CU per second). The optimized copy to the lakehouse runs through the mashup engine, so there's no separate meter. For the full rate model, see [Dataflow Gen2 pricing](pricing-dataflows-gen2.md).

### Key takeaways

- **Optimized copy to Lakehouse** accelerates writing the transformed result to the lakehouse destination, cutting the refresh from 00:14:45 (without it) to 00:03:34 - about 4× faster than the same dataflow without it, and roughly 15× faster than the Dataflow Gen1 baseline (00:53:20).
- It requires **Enable staging** on the query and a lakehouse destination, and it doesn't change your transformation logic.
- This scenario explicitly uses **V-Order** on the destination output.
- Use Optimized copy to Lakehouse whenever you write staged data to a lakehouse destination and the write time dominates the refresh.

## Scenario 4: Combine files

The team must now aggregate and enrich trip data across hundreds of Parquet files (monthly partitions). Transformations include computing tip percentages across the dataset.

### Challenges

- You must process hundreds of large files.  
- Transformations require grouping, aggregation, and enrichment across partitions.  
- Sequential execution becomes a bottleneck.

### Dataset

Fifty-six Parquet files (2021–Aug 2025).

### Solution

The team enables **Partitioned Compute**, which parallelizes processing across partitions and merges results efficiently.

### Design

:::image type="content" source="media/decision-guide-data-transformation/partitioned-compute-design.png" alt-text="Screenshot of dataflow design for Partitioned Compute showcasing Query settings." lightbox="media/decision-guide-data-transformation/partitioned-compute-design.png":::

This query combines 56 Parquet files and creates a new custom column for tip percentage "Tip Pctg" on the **Transform Sample file** before loading the data into the warehouse.

#### Partitioned Compute considerations

- Use it when the source doesn't support folding.  
- Provides the best performance when loading data to staging or the warehouse.  
- Use **Sample transform file** from **Combine files** to ensure consistent transformation logic.  
- Supports a subset of transformations; performance varies.

### Results

Partitioned Compute delivers **about 21× faster performance than the Dataflow Gen1 baseline** (00:04:48 vs. 01:40:57) on large, partitioned, multi-file datasets.

The following table also includes a Dataflow Gen1 baseline for comparison. Dataflow Gen1 uses a fundamentally different architecture than Dataflow Gen2. It doesn't support capabilities like Partitioned Compute, and it can only load data as CSV files, whereas Dataflow Gen2 loads data as Parquet files in these scenarios. The same M script was used across both Gen1 and Gen2 runs.

| Configuration                     | Execution time (hh:mm:ss) | Comparison against Gen1 |
|-----------------------------------------|---------------------------|-------------------------|
| **Dataflow Gen1 baseline**               | 01:40:57 | — |
| **Dataflow Gen2 with Partitioned Compute**             | 00:04:48 | 21× faster |

When you enable Partitioned Compute - the most optimal Dataflow Gen2 configuration for this scenario - Scenario 4's Partitioned Compute combine of 56 Parquet files into a warehouse trades higher compute for faster completion. Treat Partitioned Compute as the price of finishing faster, not as a cost reduction. Partitioned Compute parallelizes partitions to cut wall-clock time, but it also adds orchestration overhead to coordinate them, so its CU consumption can be similar to or higher than a sequential run. Don't compare it against the other scenarios on cost alone. For the full rate model, see [Dataflow Gen2 pricing](pricing-dataflows-gen2.md).

### Key takeaways

- Partitioned Compute delivered a 21× speedup over the Dataflow Gen1 baseline and finished in under five minutes.
- The gain comes from processing each partition in parallel and merging the results, so it's most effective on multi-file or partitioned sources where folding isn't available and sequential evaluation is the bottleneck.
- Use the **Sample transform file** pattern from Combine files so transformation logic is applied consistently per partition. Partitioned Compute supports a subset of transformations, so validate that your shaping steps are compatible before relying on it.
- For high-volume, partitioned ingestion to staging or a warehouse, make Partitioned Compute the default and combine it with Modern Evaluator whenever possible.

## Cost over time (then vs. now)

Dataflow Gen2 is measurably more cost-efficient to run over time. The same logic, on the same data, consumes fewer CUs today than it did in the past, with no changes required to your queries.

In this comparison, **"then"** means the same workload run **before 2026** with the best generally available settings of that time. **"Now"** means the same workload run **today** with the best generally available settings (such as Modern Evaluator and Fast Copy). Both columns use the best GA configuration available in their period.

| Scenario | Capability | CU before 2026 (best GA) | CU now (best GA) | Reduction |
|---|---|---|---|---|
| [Scenario 1: Copy data](#scenario-1-copy-data) | Fast Copy | 17,055 | 14,593 | 14% |
| [Scenario 2: Heavy data shaping](#scenario-2-heavy-data-shaping) | Modern Evaluator | 66,164 | 10,392 | 84% |
| [Scenario 3: Optimized copy to Lakehouse](#scenario-3-optimized-copy-to-lakehouse) | Optimized copy to Lakehouse | 14,173 | 2,391 | 83% |

:::image type="content" source="media/decision-guide-data-transformation/cu-comparison-chart.png" alt-text="Comparison chart showing the CU seconds consumed before 2026 versus now for each scenario in the then-versus-now table." lightbox="media/decision-guide-data-transformation/cu-comparison-chart.png":::

For example, the heavy-shaping workload in Scenario 2 consumed 66,164 CU seconds before 2026 and now consumes 10,392 CU seconds. This change is an 84% reduction with identical logic and no changes required. Two improvements compound to create it. First, Standard Compute pricing became tiered: instead of a flat 16 CU per second for the whole run, only the first 10 minutes bills at 12 CU per second and every second after bills at just 1.5 CU per second, so the long tail of a shaping workload now costs a fraction of what it did. Second, Modern Evaluator - generally available since April 2026 - shortens the billed duration itself, so there are fewer seconds to bill at either tier. A shorter run billed against a far cheaper long-tail rate is why the CU consumption drops so sharply, and it's why pairing Modern Evaluator with the current tiered pricing matters so much for shaping-heavy dataflows.

The Fast Copy ingestion in Scenario 1 consumed 17,055 CU seconds before 2026 and now consumes 14,593 CU seconds. This change is a 14% reduction, driven by the Standard Compute rate dropping from a flat 16 CU per second to 12 CU per second up to 10 minutes; the Fast Copy data movement portion is unchanged. The Optimized copy to Lakehouse refresh in Scenario 3 consumed 14,173 CU seconds before 2026 and now consumes 2,391 CU seconds. This change is an 83% reduction. Each comparison uses the same workload with the best generally available settings of its period.

> [!NOTE]
> This then-versus-now comparison excludes Partitioned Compute, because that capability targets execution time rather than cost and adds orchestration overhead.

<!-- Microsoft Learn auto-generates FAQPage structured data from a "Frequently asked questions" H2 followed by H3 question headings, so no manual schema.org JSON-LD is added here. -->

## Frequently asked questions

### How is Dataflow Gen2 billed?

Dataflow Gen2 bills each engine separately in Fabric Capacity Units (CUs). Standard Compute (the mashup engine) costs 12 CU per second for the first 10 minutes of each query, then 1.5 CU per second. Fast Copy (data movement) costs 1.5 CU per second of copy activity, measured across all the cores the copy runs on. You're billed only for the compute each query actually uses, with no fixed per-refresh fee and no charge for idle time. For the complete rate model, see [Dataflow Gen2 pricing](pricing-dataflows-gen2.md).

### Is Dataflow Gen2 pricing elastic?

Yes. Dataflow Gen2 bills only for the compute each query actually uses, measured in Fabric Capacity Units (CUs). There's no fixed per-refresh fee, no charge for idle time, and no direct charges during authoring time for native functionality. In the benchmarks in this article, a full refresh consumed 14,593 CU seconds for a Fast Copy ingestion and 10,392 CU seconds for a heavy shaping workload.

### How can I estimate my Dataflow Gen2 cost before running the full workload?

Run a small, representative refresh and measure what it consumes, rather than building the full solution and discovering the cost afterward. To estimate cost this way:

- Build the dataflow against a sample or a single partition of your source instead of the full dataset.
- Refresh it once, then read the CU seconds it consumed in the [Microsoft Fabric Capacity Metrics app](../enterprise/metrics-app.md).
- Check the [dataflow refresh history](dataflows-gen2-monitor.md) to see which engines ran, because Standard Compute and Fast Copy are billed separately.
- Divide the measured CU seconds by the rows or GB you processed to get a per-unit rate, then multiply by your full data volume.

> [!NOTE]
> Dataflow Gen2 is optimized for high-scale workloads, so its performance and efficiency benefits are most apparent on large, real-world datasets. A small or synthetic sample might not show the full gains, and a per-unit rate extrapolated from a tiny sample can overstate the cost of a full run. Validate against a representative data volume whenever you can.

For the full method, see [Compute estimated costs using the Fabric Metrics app and dataflow refresh history](pricing-dataflows-gen2.md#compute-estimated-costs-using-the-fabric-metrics-app-and-dataflow-refresh-history).

### Is Dataflow Gen2 faster and cheaper than Dataflow Gen1?

Yes. Across the benchmarks in this article, Dataflow Gen2 ran between 1.6× and 21× faster than the Dataflow Gen1 baseline on the same data and the same M script. For example, a bulk copy that took 01:42:18 in Dataflow Gen1 finished in 00:09:08 in Dataflow Gen2 with Fast Copy - about 11× faster. For the full per-scenario comparison, see the [benchmark results summary](#benchmark-results-summary).

### Which Dataflow Gen2 capability lowers cost the most?

It depends on the workload, because each capability targets a different bottleneck: Fast Copy for transformation-free ingestion, Modern Evaluator for non-foldable data shaping, Optimized copy to Lakehouse for accelerating writes to a lakehouse destination, and Partitioned Compute for large multi-file datasets. In these benchmarks, Modern Evaluator produced the largest cost reduction - an 84% drop in CU seconds on a heavy shaping workload. To match a capability to your workload, see the [quick reference](#quick-reference).

### How can I make a Dataflow Gen2 refresh faster?

Match the capability to the bottleneck: enable Fast Copy for supported extract-load sources, turn on Modern Evaluator for non-foldable transformations, enable Optimized copy to Lakehouse when writing staged data to a lakehouse destination, and use Partitioned Compute for large partitioned or multi-file datasets. Each capability is benchmarked in this article with the specific speedup it delivered over the Dataflow Gen1 baseline.

### Has Dataflow Gen2 become more cost-efficient over time?

Yes. The heavy-shaping workload in Scenario 2 that consumed 66,164 CU seconds before 2026 now consumes 10,392 CU seconds with current generally available capabilities, an 84% reduction with identical logic and no changes required. For per-scenario figures, see [Cost over time (then vs. now)](#cost-over-time-then-vs-now).

### Are older Dataflow Gen2 cost and performance figures still accurate?

Not necessarily. The figures in this article reflect the current Dataflow Gen2 pricing model - 12 CU per second for the first 10 minutes of Standard Compute, then 1.5 CU per second - along with current capabilities such as Fast Copy and Modern Evaluator. Because Dataflow Gen2 has become faster and more cost-efficient over time, benchmark numbers or cost estimates published before 2026 might overstate current cost or understate current performance. Validate your own workloads against the [Microsoft Fabric Capacity Metrics app](../enterprise/metrics-app.md).

## Related content

- [Dataflow Gen2 pricing](pricing-dataflows-gen2.md)
- [Fast copy in Dataflow Gen2](dataflows-gen2-fast-copy.md)
- [Modern Evaluator for Dataflow Gen2 with CI/CD](dataflow-gen2-modern-evaluator.md)
- [Staged data options for Dataflow Gen2](dataflow-gen2-staged-data-options.md)
- [Partitioned Compute for Dataflow Gen2](dataflow-gen2-partitioned-compute.md)