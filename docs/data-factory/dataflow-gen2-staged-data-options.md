---
title: Staged data options for Dataflow Gen2 (Preview)
description: Tune how Dataflow Gen2 writes intermediate (staged) data and copies that data to Fabric Lakehouse destinations using the Staged Data options on the Scale tab.
ms.reviewer: jeluitwi
ms.topic: how-to
ms.date: 5/13/2026
ms.custom: dataflows
---

# Staged data options for Dataflow Gen2

> [!NOTE]
> The staged data options described in this article are currently in preview.

When you enable [staging](dataflow-gen2-data-destinations-and-managed-settings.md#using-staging-before-loading-to-a-destination) on a query, Dataflow Gen2 writes intermediate results to an internal staging Lakehouse so the engine can use Fabric compute for transformations or to land data in a destination.

The **Staged Data** section in the dataflow Scale settings lets you tune two aspects of that pipeline:

- **Optimized copy to Lakehouse (Preview)** — Use a faster path to write staged data to a Fabric Lakehouse data destination.
- **Enable V-Order compression (Preview)** — Apply V-Order compression to data written to the staging Lakehouse.

Both options apply at the dataflow level and only take effect in Dataflow Gen2.

## Where to find the settings

1. Open your dataflow in the Power Query editor.
1. Select **Options** from the menu.
1. Go to the **Scale** tab.
1. The two settings are listed under **Staged Data**.

:::image type="content" source="media/dataflow-gen2-staged-data-options/staged-data-options.png" alt-text="Screenshot of the Options dialog with the Scale tab selected and the Staged Data section highlighted." lightbox="media/dataflow-gen2-staged-data-options/staged-data-options.png":::

## Optimized copy to Lakehouse (Preview)

When this option is on, Dataflow Gen2 uses an optimized data movement path for queries that:

- Have **staging enabled**, and
- Write to a **Fabric Lakehouse** data destination.

In the default path, data flows from the staging Warehouse to the Lakehouse with extra serialization and network hops. The optimized path reduces those hops, which can substantially shorten refresh time for staging-heavy dataflows that land in a Lakehouse.

### When to use it

Turn this on when you stage queries that ultimately land in a Fabric Lakehouse data destination. Staging is most useful when:

- Your query contains transformations that don't fold to the source.
- You want to rely on Fabric staging compute (Lakehouse or Warehouse) to run heavy operations such as joins, group-by, or filters before writing to the destination.

For more on when staging helps, see [Best practices for getting the best performance with Dataflow Gen2](dataflow-gen2-performance-best-practices.md).

### Default behavior

The option is **off by default**. For most dataflows that stage data and write to a Fabric Lakehouse, turning this option on is beneficial.

### Considerations

- The option only takes effect on queries that have staging enabled and that write to a Fabric Lakehouse data destination. For queries that write to other destinations (Fabric Warehouse, Fabric SQL database, Azure SQL, Snowflake, KQL, Azure Data Lake Storage Gen2, file destinations), the option has no effect.
- If you turn off staging for a query, the optimized copy path doesn't apply to that query.
- The option applies to all qualifying queries in the dataflow. There's no per-query override today.

## Enable V-Order compression (Preview)

V-Order is a write-time optimization for the Parquet file format that improves read performance for downstream Fabric engines, at the cost of additional CPU during the write. For background and cross-engine guidance, see [Delta Lake table optimization and V-Order](../data-engineering/delta-optimization-and-v-order.md) and [Cross-workload table maintenance and optimization](../fundamentals/table-maintenance-optimization.md).

When this option is on, Dataflow Gen2 applies V-Order compression to data written to the **staging Lakehouse**. When it's off, staged data is written without V-Order.

### When to turn V-Order on or off for staging

The staging Lakehouse holds intermediate data that's used only by Dataflow Gen2 itself: the dataflow re-reads staged data during the same refresh to apply further transformations or to write to a destination, and the Dataflow connector reads from the staged data when other items query the dataflow's output. End-user query engines (Power BI Direct Lake, Fabric Warehouse, SQL analytics endpoint, Spark) don't read the staging Lakehouse directly. Those scenarios apply to your **Lakehouse data destination** instead. For destination guidance, see [Enable V-Order compression on a Lakehouse destination](dataflow-gen2-data-destinations-and-managed-settings.md#enable-v-order-compression-on-a-lakehouse-destination).

Because staged data is typically read a small number of times within the same refresh, **turning V-Order off** for staging is a good choice for most dataflows. Skipping V-Order reduces write-time CPU and shortens refresh duration, especially for large staging writes. Consider turning V-Order **on** for staging if the dataflow's staged output is consumed many times through the Dataflow connector and you want to favor read performance for those downstream queries over staging write cost.

### Default behavior

The option is **on by default**. Use the guidance above to decide what's right for your dataflow.

### Where else V-Order applies

In addition to the dataflow-level setting that controls the staging Lakehouse, V-Order can also be controlled on the Lakehouse data destination connection itself, through the **Enable use of V-Order compression** advanced option. That setting controls whether data written to the destination Lakehouse is V-Order compressed. The destination is the surface read by Direct Lake, Fabric Warehouse, the SQL analytics endpoint, and Spark, so destination-level guidance is scenario based.

For details on the destination-level option, see [Enable V-Order compression on a Lakehouse destination](dataflow-gen2-data-destinations-and-managed-settings.md#enable-v-order-compression-on-a-lakehouse-destination).

## Related content

- [Best practices for getting the best performance with Dataflow Gen2](dataflow-gen2-performance-best-practices.md)
- [Dataflow Gen2 data destinations and managed settings](dataflow-gen2-data-destinations-and-managed-settings.md)
- [Delta Lake table optimization and V-Order](../data-engineering/delta-optimization-and-v-order.md)
- [Cross-workload table maintenance and optimization](../fundamentals/table-maintenance-optimization.md)
- [Modern Evaluator for Dataflow Gen2 with CI/CD](dataflow-gen2-modern-evaluator.md)
- [Use partitioned compute in Dataflow Gen2 (Preview)](dataflow-gen2-partitioned-compute.md)
