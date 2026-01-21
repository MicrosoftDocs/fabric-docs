---
title: High concurrency mode for Lakehouse operations in Microsoft Fabric
description: Learn how High Concurrency (HC) mode optimizes Spark session utilization for Lakehouse operations like Load to Delta and Preview, improving price-performance and concurrency efficiency in Microsoft Fabric.
ms.reviewer: saravi
ms.author: eur
author: eric-urban
ms.topic: concept-article
ms.custom:
ms.date: 12/04/2025
---

# High concurrency mode for Lakehouse operations in Microsoft Fabric

High concurrency mode for Lakehouse operations in Microsoft Fabric is designed to optimize Spark resource utilization and improve concurrency for workloads that fall back to Spark execution — such as **Load to Table** and **Preview** operations.

When a Lakehouse table preview operation runs in Spark (for example, when the SQL endpoint isn’t available), it can hold a Spark session for up to 20 minutes. On smaller capacities, this behavior can lead to session blocking and reduced concurrency. The new **High Concurrency mode** addresses this by allowing multiple Lakehouse operations to share a single Spark session, maximizing efficiency and reducing compute overhead.

 Also in the cases where Managed Virtual Networks are enabled, given that Starer Pools are not supported, each table load operation could take 3 to 5 minutes to start, but with the high concurrency mode the subsequent table loads or the preview is going to be within 5 seconds if the operation is within the same Lakehouse, user and workspace boundary.

## How it works

In High Concurrency mode, a single Spark session can host up to **five independent Lakehouse jobs** concurrently. Each job runs in an isolated REPL core within the Spark application, ensuring variable and execution isolation across operations.

This approach enables Fabric to reuse existing Spark sessions for new Lakehouse jobs without creating additional sessions — resulting in faster start times, improved throughput, and better utilization of compute resources.

> [!NOTE]
> High Concurrency mode is automatically used when Lakehouse **Load** or **Preview** operations use Spark.


### Session sharing conditions

For High Concurrency mode to apply, the following conditions must be met:

- The operations must be triggered by the same user.
- The session must run under the same Lakehouse and workspace.

When these conditions are satisfied, the Lakehouse operations are automatically grouped and executed under a shared Spark session.

## Benefits for customers

High Concurrency mode provides **significant improvements in performance, efficiency, and cost optimization** for Lakehouse operations:

| Benefit | Description |
|----------|--------------|
| **Optimized Compute Usage** | Up to five Lakehouse operations can run in a shared Spark session, reducing capacity usage and preventing resource exhaustion. |
| **Faster Start Times** | Session reuse minimizes Spark startup latency, especially when workspaces are enabled with network security features like private links |
| **Improved Price-Performance** | Only the initiating Spark session is billed — subsequent shared operations are not billed separately, leading to compute costs savings. |
| **Higher Concurrency** | Enables more users or workflows to execute Lakehouse operations simultaneously without blocking other workloads which allow users with smaller capacities to run more jobs |

## Example scenario

Consider the following example:

1. A user performs a **Load to Table** operation on a Lakehouse table. This triggers a Spark session in High Concurrency mode.
2. While the session is active, the user performs **Preview** or **Load** operations on another table or file.
3. These subsequent operations reuse the same Spark session — running concurrently in separate REPLs within the Spark application.
4. Fabric monitors session sharing and resource allocation automatically to ensure balanced execution.

In this example, Spark resources are reused efficiently, allowing multiple Lakehouse jobs to complete faster and at a lower cost.

## Monitoring and observability

You can track High Concurrency sessions in the **Monitoring hub**. When a Lakehouse operation (such as a table load or preview) utilizes a High Concurrency Spark session, it appears in the activity list with a specific naming convention: `HC_<lakehouse_name>_<operation_id>`.

This naming convention helps you quickly identify which activities are running in High Concurrency mode.

:::image type="content" source="./media/high-concurrency-lakehouse-overview/high-concurrency-for-lakehouse-monitoring.png" alt-text="Screenshot of the Monitoring hub showing a High Concurrency Lakehouse activity." lightbox="./media/high-concurrency-lakehouse-overview/high-concurrency-for-lakehouse-monitoring.png":::

To view the specific operations running within the session:

1. Select the activity name (for example, `HC_lakehouse_Etc`) in the Monitoring hub.
2. Navigate to the detail view.

In the detail view, you can see the list of individual jobs that are being executed in the High Concurrency session. This list displays the table-specific operations, such as "Load table," confirming that multiple jobs are sharing the single Spark application context.

:::image type="content" source="./media/high-concurrency-lakehouse-overview/high-concurrency-for-lakehouse-monitoring-detail.png" alt-text="Screenshot of the detailed job view showing multiple Load table operations within a single session." lightbox="./media/high-concurrency-lakehouse-overview/high-concurrency-for-lakehouse-monitoring-detail.png":::




## Billing and capacity impact

High Concurrency sessions provide measurable **price-performance gains**:

- **Only the initiating Spark session** that starts the shared application is billed.  
- Subsequent Lakehouse operations sharing that session **do not incur additional billing**.  
- Capacity metrics will reflect usage against the initiating job only, reducing total compute consumption.

This model ensures Lakehouse users achieve better price performance per capacity unit, especially in workloads with frequent **Load** or **Preview** operations.

## Related content
* To learn more about high concurrency mode in Microsoft Fabric, see [High concurrency mode in Apache Spark for Fabric](high-concurrency-overview.md).
* To get started with high concurrency mode for notebooks, see [Configure high concurrency mode for Fabric notebooks](configure-high-concurrency-session-notebooks.md).
