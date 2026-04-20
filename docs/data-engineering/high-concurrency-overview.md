---
title: High concurrency mode in Apache Spark compute for Fabric
description: Learn about sharing Spark sessions using high concurrency mode in Microsoft Fabric for data engineering and data science workloads.
ms.reviewer: saravi
ms.topic: concept-article
ms.date: 03/05/2026
ai-usage: ai-assisted
---

# High concurrency mode in Apache Spark for Fabric

High concurrency mode lets compatible Spark workloads share one running Spark session instead of starting a separate session for each workload. This mode is commonly used for notebook and pipeline scenarios in Fabric.

This article helps you understand:

- What high concurrency mode is, and when to use it.
- Requirements for session sharing.
- How billing works for shared sessions.

In standard mode, each notebook or pipeline activity starts its own Spark session. In high concurrency mode, one Spark application hosts multiple workloads by assigning each workload its own read-eval-print loop (REPL) core. Each REPL core isolates execution state, so local variables in one workload don't overwrite variables in another workload.

Because the shared session is already running, subsequent workloads can start much faster.

> [!NOTE]
> For custom pools with high concurrency mode, session start can be up to 36x faster than a standard Spark session.

## Key capabilities

The diagram highlights three core characteristics of high concurrency mode:

- **Security**: Session sharing stays within a single-user boundary.
- **Multitasking**: You can switch between notebooks and continue work without waiting for a new Spark session to be created or initialized.
- **Cost efficiency**: Shared sessions improve resource utilization and reduce compute cost for data engineering and data science workloads.

:::image type="content" source="media/high-concurrency-mode-for-notebooks/high-concurrency-mode-security-multitask-overview.png" alt-text="Diagram showing the working of high concurrency mode in Fabric." lightbox="media/high-concurrency-mode-for-notebooks/high-concurrency-mode-security-multitask-overview.png":::

## Session sharing requirements

Session sharing applies when these conditions are met:

- Sessions are within a single-user boundary.
- Sessions use the same default Lakehouse configuration.
- Sessions use the same Spark compute settings.

If any requirement differs, Fabric starts a separate Spark session.

During session initialization, Fabric creates a REPL core. As new workloads join the shared session, executors are allocated using FAIR scheduling across those REPL cores to reduce starvation risk.

## Billing behavior

When you use high concurrency mode, only the initiating notebook or pipeline activity that starts the shared Spark application is billed. Subsequent sessions that share the same Spark session don't incur separate billing.

### Example

- A user starts **Notebook 1**, which initiates a Spark session in high concurrency mode.
- The same session is then shared by **Notebook 2**, **Notebook 3**, **Notebook 4**, and **Notebook 5**.
- In this case, only **Notebook 1** is billed for Spark compute.
- Shared notebooks (2 to 5) aren't billed individually.

This behavior is also reflected in **Capacity Metrics**, where usage is reported against the initiating notebook.

> [!NOTE]
> The same billing behavior applies to pipeline activities. Only the notebook or activity that initiates the Spark session is charged.

## Dynamic session sharing limit
 
By default, a high concurrency session supports up to five notebooks sharing the same Spark session. For workloads that require higher notebook density—such as large-scale parallel pipelines or enterprise analytics at peak load—you can increase this limit to up to 50 notebooks per session.
 
> [!NOTE]
> This update doesn't change the default limit of five. You must explicitly set `spark.highConcurrency.max` to increase it.
 
### Configure the session sharing limit
 
Set the session sharing limit in the **Environment** item that your notebooks or pipeline-triggered notebooks use.
 
1. Go to your workspace and open **Environments**.
1. Select the Environment attached to your notebook or pipeline.
1. Open **Spark Properties**.
1. Add the following property and set a value between **2** and **50**:
 
   ```
   spark.highConcurrency.max = <value>
   ```
 
   For example, to allow up to 20 notebooks per session:
 
   ```
   spark.highConcurrency.max = 20
   ```
 
1. Save and publish the Environment.
 
All notebooks and pipeline activities that use this Environment inherit the updated limit automatically.
 
### When to increase the session sharing limit
 
| Scenario | Recommended action |
|---|---|
| Large-scale parallel pipelines with many notebook activities | Increase `spark.highConcurrency.max` to reduce session fragmentation |
| Peak-load interactive workloads with many concurrent users | Increase the limit to improve session acquisition times |
| Cost-sensitive workloads where dense packing reduces compute spend | Tune the limit to match your concurrency requirements |
| Workloads with strict isolation requirements | Keep the default limit of 5 or lower |
 
Increasing the session sharing limit enables:
 
- **Faster session acquisition** during peak load by reducing wait time for a new session.
- **Higher notebook density** without fragmenting into many separate sessions.
- **Dynamic tuning** aligned to workload intensity, cost, and price-performance goals.
- **Better price-performance efficiency** while preserving isolation and fairness across jobs.

## Related content

- [Apache Spark compute in Microsoft Fabric](spark-compute.md)
- To get started with high concurrency mode in notebooks, see [Configure high concurrency mode for Fabric notebooks](configure-high-concurrency-session-notebooks.md).
- For Lakehouse load and preview behavior, see [High concurrency mode for Lakehouse operations in Microsoft Fabric](high-concurrency-for-lakehouse-operations.md).
