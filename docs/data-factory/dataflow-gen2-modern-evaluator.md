---
title: Modern Evaluator for Dataflow Gen2 with CI/CD
description: Boost Dataflow Gen2 with CI/CD performance with the Modern Evaluator—faster query execution, scalable workflows, and support for all functions and most data sources.
ms.reviewer: miescobar
ms.topic: how-to
ms.date: 9/9/2026
ms.custom: dataflows
ai-usage: ai-assisted
---

# Modern Evaluator for Dataflow Gen2 with CI/CD

The Modern Query Evaluation Engine (also known as the "Modern Evaluator") provides a new query execution engine running on .NET core version 8, which can significantly improve the performance of dataflow runs in some scenarios.

The modern evaluator supports all Power Query functions and most data sources available in Dataflow Gen2 (CI/CD).

> [!NOTE]
> Requests that use the IBM Db2 database, Informix, or MQ connectors temporarily route to the standard (legacy) evaluation engine, even when the modern evaluator is enabled. The modern evaluator doesn't currently support these connectors.

Dataflows running the modern evaluator could potentially see some of these key benefits:

- **Faster dataflow execution**: The modern engine can substantially reduce query evaluation time. Many dataflows run noticeably faster, enabling you to refresh data more frequently or meet tight refresh windows.

- **More efficient processing**: The engine is optimized for efficiency, using improved algorithms and a modern runtime. This means it can handle complex transformations with less overhead, which helps maintain performance as your data volume grows.

- **Scalability and reliability**: By speeding up execution and reducing bottlenecks, the Modern Evaluator helps dataflows scale to larger volumes with greater stability. Customers can expect more consistent refresh durations and fewer timeout issues on large dataflows when using the new engine.

## How to enable or disable the Modern Evaluator

> [!NOTE]
> The Modern Evaluator is enabled by default in new Dataflow Gen2 (CI/CD) items.
> If you encounter any issues, you can disable the option to fall back to the standard evaluation engine.

Follow these steps to turn on the Modern Query Evaluation Engine for a dataflow:

1. **Open your dataflow for editing**: In Fabric Data Factory, navigate to your Dataflow Gen2 (CI/CD) item and open it in the Power Query editor.

1. **Go to Options (Scale settings)**: In the dataflow editor, select the Options menu. In the Options dialog, select the Scale tab.

1. **Enable the Modern Evaluator**: Find the setting for Modern query evaluation engine. Verify this option is enabled.

    :::image type="content" source="media/dataflow-gen2-modern-evaluator/modern-evaluator-option.png" alt-text="Screenshot of the options dialog in a Dataflow Gen2 with CI/CD displaying the modern query evaluator setting." lightbox="media/dataflow-gen2-modern-evaluator/modern-evaluator-option.png":::

1. **Save and run**: Save the dataflow settings. The next time you run the dataflow, it uses the modern evaluator, except for requests that use the IBM Db2 database, Informix, or MQ connectors, which are temporarily routed to the standard evaluation engine.

## Performance considerations

When using modern evaluation engine, you should observe faster refresh times especially for data-intensive flows. For example, data transformations that previously took an hour might complete in roughly half the time with the Modern Evaluator enabled (actual results vary based on your scenarios). This performance boost helps in scenarios such as:

- **Large data volumes**: When dealing with millions of rows or large files, the new engine’s optimizations can shorten processing time and reduce memory usage.

- **Complex transformations**: Dataflows with many transformation steps or heavy operations (like joins across large tables) benefit from the engine’s improved execution plan, leading to smoother and faster completion.

- **Frequent run schedules**: If your dataflows run multiple times a day, the time savings per refresh accumulate, allowing you to deliver up-to-date data to users more quickly.

## Benchmarks

This section uses a large, real‑world dataset to illustrate how architectural changes across Dataflow generations and the introduction of the Modern Query Evaluation Engine affect execution time.

>[!NOTE]
>Results are provided for comparison purposes only and may vary depending on data source, transformations, and execution environment.

### Cross‑product comparison

This benchmark compares Dataflow Gen1, Dataflow Gen2, and Dataflow Gen2 (CI/CD) using an identical ingestion and transformation scenario.

**Scenario**

- **Source**: NYC Taxi dataset stored in Azure Blob Storage  
- **Data volume**: ~110 million rows  
- **Transformation**: Row‑by‑row transformation during ingestion  
- **Destination**:
  - **Gen1**: CSV
  - **Gen2 / Gen2 (CI/CD)**: Lakehouse (default output)

**Results**

| Product | Default output | Execution time |
|--------|----------------|----------------|
| Dataflow Gen1 | CSV | ~60 minutes |
| Dataflow Gen2 | Lakehouse | ~57 minutes |
| Dataflow Gen2 (CI/CD) with Modern Evaluator | Lakehouse | ~33 minutes |

**Observations**

- Dataflow Gen1 and Dataflow Gen2 show comparable execution times for this row‑by‑row transformation scenario.
- Dataflow Gen2 (CI/CD) completes the same workload in approximately half the time.
- The performance improvement is driven by the Modern Query Evaluation Engine, which reduces per‑row processing overhead and optimizes execution for large ingestion workloads.

### Legacy vs. Modern evaluator

This benchmark compares the legacy evaluation engine and the Modern Query Evaluation Engine within Dataflow Gen2 (CI/CD) under two common query patterns.

**Scenario**

- **Data source**: NYC Taxi dataset stored in SQL
- **Data volume**: ~110 million rows
- **Destination**: Fabric Lakehouse

**Results**

| Scenario | Legacy evaluator | Modern evaluator |
|--------|------------------|------------------|
| Query folds to SQL | ~20 minutes | ~13 minutes |
| Query does not fold to SQL (Split by Delimiter) | ~28 minutes | ~16 minutes |

**Observations**

The Modern Query Evaluation Engine provides significant performance improvements due to a more efficient runtime and reduced execution overhead regardless of whether the query folds or not.

## Related content

- [Dataflow Gen2 cost and performance benchmarks](dataflow-gen2-cost-performance-benchmarks.md)
- [Dataflow Gen2 pricing](pricing-dataflows-gen2.md)
