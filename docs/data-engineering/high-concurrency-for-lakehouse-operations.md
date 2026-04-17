---
title: High concurrency mode for Lakehouse operations in Microsoft Fabric
description: Learn how high concurrency mode reuses Spark sessions for Lakehouse load and preview operations to improve start time, throughput, and capacity efficiency in Microsoft Fabric.
ms.reviewer: saravi
ms.topic: concept-article
ms.date: 03/01/2026
ai-usage: ai-assisted
---

# High concurrency mode for Lakehouse operations in Microsoft Fabric

High concurrency mode is Spark session sharing for Lakehouse operations. Instead of starting a separate Spark session for each operation, Fabric can run multiple compatible operations in one shared session. This is most relevant when operations execute on Spark, such as when you load files into a table or preview table data.

Without high concurrency mode (session sharing), a preview operation can hold a Spark session for up to 20 minutes (for example, when the SQL endpoint isn't available). On smaller capacities, this can reduce concurrency and increase wait time for other operations. With high concurrency mode, compatible operations share one Spark session.

This is especially noticeable in workspaces that use Managed Virtual Networks, where initial Spark startup can take longer. In those cases, a first table load might take 3 to 5 minutes to start, but subsequent loads or preview operations can start in about 5 seconds when they run under the same user, Lakehouse, and workspace.

## Benefits

High concurrency mode improves performance and efficiency for Lakehouse operations:

| Benefit | Description |
|----------|--------------|
| **Optimized compute usage** | Up to five Lakehouse operations can run in one shared Spark session, which lowers capacity pressure. |
| **Faster start times** | Session reuse reduces Spark startup latency, especially in workspaces with network security features such as private links. |
| **Improved price-performance** | Only the initiating Spark session is billed. Subsequent operations that share that session aren't billed separately. |
| **Higher concurrency** | More Lakehouse operations can run at the same time without blocking other workloads, which is especially helpful on smaller capacities. |

## How high concurrency mode works

In High Concurrency mode, a single Spark session can host up to 5 independent Lakehouse jobs concurrently. Each job runs in an isolated REPL core within the Spark application, ensuring variable and execution isolation across operations.

This approach reuses existing Spark sessions for new Lakehouse jobs without creating extra sessions, which improves startup time, throughput, and overall compute utilization.

> [!NOTE]
> For Lakehouse load and preview operations, high concurrency mode is automatic when the operation runs on Spark—there's no per-operation toggle in the Fabric portal. By contrast, high concurrency for notebooks and pipelines is configured in workspace settings and notebooks. For details, see [Configure high concurrency mode for Fabric notebooks](configure-high-concurrency-session-notebooks.md).

## When high concurrency mode shares sessions

For High Concurrency mode to apply, the following conditions must be met:

- The operations must be triggered by the same user.
- The operations must run in the same Lakehouse and workspace.

When these conditions are satisfied, the Lakehouse operations are automatically grouped and executed under a shared Spark session.

## Example flow

The following example shows how session sharing works. You perform a load-to-table operation on a Lakehouse table, which starts a Spark session in high concurrency mode. While that session is active, you preview another table or load another file. These subsequent operations reuse the same Spark session and run concurrently in separate REPLs within the Spark application, while Fabric continues to monitor session sharing and resource allocation.

In this example, Spark resources are reused efficiently, allowing multiple Lakehouse jobs to complete faster and at a lower cost.

## Monitor shared sessions

You can track high concurrency sessions in the **Monitoring hub**. When a Lakehouse operation (such as table load or preview) uses a high concurrency Spark session, the activity appears with this naming pattern: `HC_<lakehouse_name>_<operation_id>`.

This naming convention helps you quickly identify which activities are running in High Concurrency mode.

:::image type="content" source="./media/high-concurrency-lakehouse-overview/high-concurrency-for-lakehouse-monitoring.png" alt-text="Screenshot of the Monitoring hub showing a High Concurrency Lakehouse activity." lightbox="./media/high-concurrency-lakehouse-overview/high-concurrency-for-lakehouse-monitoring.png":::

To view the specific operations running in the shared session, select the activity name (for example, `HC_lakehouse_Etc`) in the Monitoring hub, and then open the detail view.

In the detail view, you can see the individual jobs executing in the high concurrency session. This list shows table-level operations, such as "Load table," confirming that multiple jobs are sharing one Spark application context.

:::image type="content" source="./media/high-concurrency-lakehouse-overview/high-concurrency-for-lakehouse-monitoring-detail.png" alt-text="Screenshot of the detailed job view showing multiple Load table operations within a single session." lightbox="./media/high-concurrency-lakehouse-overview/high-concurrency-for-lakehouse-monitoring-detail.png":::

## Billing and capacity impact

High concurrency sessions provide measurable price-performance gains:

- Only the initiating Spark session that starts the shared application is billed.
- Subsequent Lakehouse operations that share that session don't incur additional billing.
- Capacity metrics reflect usage against the initiating job, reducing total compute consumption.

This model improves price performance per capacity unit, especially for workloads with frequent load or preview operations.

## Related content

- To learn more about high concurrency mode in Microsoft Fabric, see [High concurrency mode in Apache Spark for Fabric](high-concurrency-overview.md).
- To get started with high concurrency mode for notebooks, see [Configure high concurrency mode for Fabric notebooks](configure-high-concurrency-session-notebooks.md).
