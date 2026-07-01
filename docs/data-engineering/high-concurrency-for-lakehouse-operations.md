---
title: High concurrency mode for Lakehouse operations in Microsoft Fabric
description: Learn how high concurrency mode reuses Spark sessions for Lakehouse load and preview operations to improve start time, throughput, and capacity efficiency in Microsoft Fabric.
ms.reviewer: saravi
ms.topic: concept-article
ms.date: 03/01/2026
ai-usage: ai-assisted
---

# High concurrency mode for Lakehouse operations in Microsoft Fabric

High concurrency mode is Spark session sharing for Lakehouse operations. Instead of starting a separate Spark session for each operation, Fabric runs multiple compatible operations in one shared session. This approach is most relevant when operations execute on Spark, such as when you load files into a table or preview table data.

Without high concurrency mode (session sharing), a preview operation can hold a Spark session for up to 20 minutes (for example, when the SQL endpoint isn't available). On smaller capacities, this limitation reduces concurrency and increases wait time for other operations. By using high concurrency mode, compatible operations share one Spark session.

This behavior is especially noticeable in workspaces that use Managed Virtual Networks, where initial Spark startup can take longer. In those cases, a first table load might take three to five minutes to start, but subsequent loads or preview operations can start in about five seconds when they run under the same user and workspace.

## Benefits

High concurrency mode improves performance and efficiency for Lakehouse operations:

| Benefit | Description |
|----------|--------------|
| **Optimized compute usage** | Up to five Lakehouse operations can run in one shared Spark session, which lowers capacity pressure. |
| **Faster start times** | Session reuse reduces Spark startup latency, especially in workspaces with network security features such as private links. |
| **Improved price-performance** | Only the initiating Spark session is billed. Subsequent operations that share that session aren't billed separately. |
| **Higher concurrency** | More Lakehouse operations can run at the same time without blocking other workloads, which is especially helpful on smaller capacities. |

## How high concurrency mode works

In high concurrency mode, a single Spark session can host up to five independent Lakehouse jobs concurrently. Each job runs in an isolated REPL core within the Spark application, ensuring variable and execution isolation across operations.

This approach reuses existing Spark sessions for new Lakehouse jobs without creating extra sessions, which improves startup time, throughput, and overall compute utilization.

> [!NOTE]
> For Lakehouse load and preview operations, high concurrency mode is automatic when the operation runs on Spark - there's no per-operation toggle in the Fabric portal. By contrast, workspace settings and notebooks configure high concurrency for notebooks and pipelines. For details, see [Configure high concurrency mode for Fabric notebooks](configure-high-concurrency-session-notebooks.md).

## When high concurrency mode shares sessions

For high concurrency mode to apply, the following conditions must be met:

- The same user triggers the operations.
- The operations run in the same workspace.

Session sharing scopes to the **user and workspace** - not to an individual Lakehouse. Load and preview operations that the same user runs in the same workspace can reuse a single shared Spark session even when they target different Lakehouses or are started from different items.

> [!NOTE]
> Sessions aren't shared across schema-enabled and non-schema Lakehouses. Because of catalog differences between these Lakehouse types, their operations run in separate shared sessions even when the user and workspace are the same.

When these conditions are satisfied, the Lakehouse operations automatically group and execute under a shared Spark session.

## Example flow

The following example shows how session sharing works. You perform a load-to-table operation on a Lakehouse table, which starts a Spark session in high concurrency mode. While that session is active, you preview another table or load another file. These subsequent operations reuse the same Spark session and run concurrently in separate REPLs within the Spark application, while Fabric continues to monitor session sharing and resource allocation.

In this example, Spark resources are reused efficiently, allowing multiple Lakehouse jobs to complete faster and at a lower cost.

## Considerations and limitations

Because a single Spark session is shared across a user's Lakehouse operations in a workspace, keep the following behaviors in mind:

- **Deleting an item can cancel operations that belong to other items.** The shared session associates with the item that first started it. If you delete that item while the session is active, the session is canceled. Any Load table or preview operations from *other* items that share the same session are canceled at the same time. This behavior is an expected consequence of sharing one session per user and workspace.
- **A canceled operation might be left incomplete.** If a Load table operation is canceled before it finishes, the target table might not reflect the full load. Load table writes use Delta's atomic commits, so a canceled load doesn't corrupt data that's already in the table. However, the load isn't guaranteed to have completed. Rerun the operation to bring the table to the intended state.
- **Rerun to recover.** Rerun the Load table operation against the same source and target is the recommended recovery path after an unexpected session cancellation.

## Monitor shared sessions

You can track high concurrency sessions in the **Monitoring hub**. When a Lakehouse operation (such as table load or preview) uses a high concurrency Spark session, the activity appears with this naming pattern: `HC_<lakehouse_name>_<operation_id>`.

This naming convention helps you quickly identify which activities run in High Concurrency mode.

:::image type="content" source="./media/high-concurrency-lakehouse-overview/high-concurrency-for-lakehouse-monitoring.png" alt-text="Screenshot of the Monitoring hub showing a High Concurrency Lakehouse activity." lightbox="./media/high-concurrency-lakehouse-overview/high-concurrency-for-lakehouse-monitoring.png":::

To view the specific operations running in the shared session, select the activity name (for example, `HC_lakehouse_Etc`) in the Monitoring hub, and then open the detail view.

In the detail view, you can see the individual jobs executing in the high concurrency session. This list shows table-level operations, such as "Load table," confirming that multiple jobs share one Spark application context.

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

