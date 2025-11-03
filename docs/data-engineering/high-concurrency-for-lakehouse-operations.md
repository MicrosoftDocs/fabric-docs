---
title: High concurrency mode for Lakehouse operations in Microsoft Fabric
description: Learn how High Concurrency (HC) mode optimizes Spark session utilization for Lakehouse operations like Load to Delta and Preview, improving price-performance and concurrency efficiency in Microsoft Fabric.
ms.reviewer: saravi
ms.author: eur
author: eric-urban
ms.topic: conceptual
ms.custom:
ms.date: 10/31/2025
---

# High concurrency mode for Lakehouse operations in Microsoft Fabric

High concurrency (HC) mode for Lakehouse operations in Microsoft Fabric is designed to optimize Spark resource utilization and improve concurrency for workloads that fall back to Spark execution — such as **Load to Delta** and **Preview** operations.

When a Lakehouse operation runs in Spark (for example, when the TDS endpoint isn’t available), it can hold a Spark session for up to 20 minutes. On smaller capacities, this behavior can lead to session blocking and reduced concurrency. The new **High Concurrency mode** addresses this by allowing multiple Lakehouse operations to share a single Spark session, maximizing efficiency and reducing compute overhead.


## How it works

In High Concurrency mode, a single Spark session can host up to **five independent Lakehouse jobs** concurrently. Each job runs in an isolated REPL core within the Spark application, ensuring variable and execution isolation across operations.

This approach enables Fabric to reuse existing Spark sessions for new Lakehouse jobs without creating additional sessions — resulting in faster start times, improved throughput, and better utilization of compute resources.

> [!NOTE]
> High Concurrency mode is automatically used when Lakehouse **Load** or **Preview** operations fall back to Spark execution.

### Session sharing conditions

For High Concurrency mode to apply, the following conditions must be met:

- The operations must be triggered by the same user.
- The Lakehouse must share the same Spark compute configuration.
- The session must run under the same capacity and workspace.

When these conditions are satisfied, the Lakehouse operations are automatically grouped and executed under a shared Spark session.

## Benefits for customers

High Concurrency mode provides **significant improvements in performance, efficiency, and cost optimization** for Lakehouse operations:

| Benefit | Description |
|----------|--------------|
| **Optimized Compute Usage** | Up to five Lakehouse operations can run in a shared Spark session, reducing capacity usage and preventing resource exhaustion. |
| **Faster Start Times** | Session reuse minimizes Spark startup latency, especially in smaller SKUs or burst scenarios. |
| **Improved Price-Performance** | Only the initiating Spark session is billed — subsequent shared operations are not billed separately, leading to reduced compute costs. |
| **Higher Concurrency** | Enables more users or workflows to execute Lakehouse operations simultaneously without blocking other workloads which alows users with smaller capacities to run more jobs |
| **Seamless Integration** | Works automatically for both schema and non-schema Lakehouses with no configuration required. |

## Example scenario

Consider the following example:

1. A user performs a **Load to Delta** operation on a Lakehouse table. This triggers a Spark session in High Concurrency mode.
2. While the session is active, the user (or another Lakehouse item under the same workspace) performs **Preview** or **Load** operations.
3. These subsequent operations reuse the same Spark session — running concurrently in separate REPL cores.
4. Fabric monitors session sharing and resource allocation automatically to ensure balanced execution.

In this example, Spark resources are reused efficiently, allowing multiple Lakehouse jobs to complete faster and at a lower cost.

## Monitoring and observability

You can track High Concurrency sessions in the **Monitoring hub**. Shared Lakehouse operations will appear under the same session ID, with job counts and durations indicating concurrent usage.

Key indicators include:

- Session reuse across operations.
- Reduced number of concurrent Spark sessions.
- Aggregate Spark metrics (CPU, memory, and job duration).

> [!TIP]
> To validate session reuse, compare Spark session IDs across multiple Lakehouse jobs — identical session IDs indicate High Concurrency mode is active.

## Billing and capacity impact

High Concurrency sessions provide measurable **price-performance gains**:

- **Only the initiating Spark session** that starts the shared application is billed.  
- Subsequent Lakehouse operations sharing that session **do not incur additional billing**.  
- Capacity metrics will reflect usage against the initiating job only, reducing total compute consumption.

This model ensures Lakehouse users achieve better performance per capacity unit, especially in workloads with frequent **Load** or **Preview** operations.

## Related content
* To learn more about high concurrency mode in Microsoft Fabric, see [High concurrency mode in Apache Spark for Fabric](high-concurrency-overview.md).
* To get started with high concurrency mode for notebooks, see [Configure high concurrency mode for Fabric notebooks](configure-high-concurrency-session-notebooks.md).
