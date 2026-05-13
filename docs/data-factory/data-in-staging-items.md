---
title: Data in Dataflow Gen2 staging 
description: Learn what staging items are in Dataflow Gen2, the ELT patterns they enable, and how to manage staged data.
ms.reviewer: jeluitwi
ms.topic: concept-article
ms.date: 05/01/2026
ms.custom: dataflows
---

# Data in Dataflow Gen2 staging items

To improve performance and reliability, Dataflow Gen2 uses staging items to store intermediate data during data transformation. This article describes what staging items are, the ELT patterns they unlock through the **stage once, reference many** model, and how to manage the data they hold.

## What are staging items?

Staging items are intermediate data storage locations used by Dataflow Gen2 to store data during data transformation. These items go by the "DataflowsStagingLakehouse" and "DataflowsStagingWarehouse" names. The staging items are used to store intermediate data during data transformation to improve performance. These items are created automatically when you create your first dataflow and are managed by Dataflow Gen2. These items are hidden from the user in the workspace, but might be visible in other experiences like Get Data or the Lakehouse explorer. We strongly advise not to access or modify the data in the staging items directly as it might lead to unexpected behavior. Also storing data yourself in the staging items isn't supported and might result in data loss.

## ELT patterns: stage once, reference many

Beyond providing intermediate storage, staging unlocks a set of ELT patterns built on a single foundation: **stage once, reference many**. A source query is marked as staged so its output is materialized to internal staging storage. Downstream queries then reference that staged query instead of rereading the source. Fast Copy is an optional accelerator that makes the staged query populate faster, but it isn't what defines the pattern.

The pattern matters because once data is staged, downstream queries can:

- Run against an indexed, queryable copy without hitting the source again.
- Fold filters, joins, and aggregations back to the staging SQL endpoint instead of executing in the mashup engine.
- Branch into multiple parallel transformations or destinations from a single materialized result.

### Common use cases

The following patterns are typically layered on top of a staged source query.

| Use case | Description |
|---|---|
| **Shape staged data into analytics models** | Referenced queries shape staged data into fact and dimension tables, summaries, rollups, or KPIs through deduplication, group-by, and key generation. |
| **Fold-down compute pushdown** | Referenced queries written against staged data fold their joins, filters, and group-by operations to the staging SQL endpoint, pushing compute to the warehouse engine instead of the mashup engine. This is often the single biggest performance win staging enables. |
| **Data quality and audit branch** | Referenced queries validate or inspect staged data (null checks, constraint validation, row counts) without rereading the source. |
| **Fan-out to multiple destinations** | Multiple referenced queries each load a different destination from the same staged source (for example, one Lakehouse and one Warehouse). |
| **Stage-then-merge** | Each source is staged in its own query, then a downstream referenced query merges or joins the staged results, folding the join back to the staging SQL endpoint. |

### When staging isn't the right fit

Staging adds storage cost and an extra write before downstream queries run. Consider skipping it when:

- Your transformation already folds end-to-end to the source system, with no compute in the mashup engine.
- The dataflow has a single output and no downstream branching, validation, or fan-out.
- Source latency is the bottleneck and the source can't be parallelized through staging.

For more guidance on when to enable or disable staging, see [Best practices for getting the best performance with Dataflow Gen2](dataflow-gen2-performance-best-practices.md).

## Data in staging items

Staging items aren't designed for direct access by users. Dataflow Gen2 manages the data in the staging items and ensures that the data is in a consistent state. Accessing data in staging items directly isn't supported as it can't be guaranteed that the data is in a consistent state. If you need to access data in staging items, you can use the dataflow connector in Power BI, Excel, or other dataflows.

> [!IMPORTANT]
> The internal API that serves staged data to downstream consumers (such as semantic models or other dataflows using the Dataflows connector) can experience intermittent timeouts.
> These timeouts may cause refresh failures in consuming items, often surfacing as the error "The key didn't match any rows in the table."
> This error doesn't indicate a data issue. It means the backend could not retrieve the staged results in time.
>
> **Recommended workaround:** Configure an [data destination](dataflow-gen2-data-destinations-and-managed-settings.md) (Lakehouse or Warehouse) for your dataflow, and update downstream items to read from that destination directly using the Lakehouse or Warehouse connector. This bypasses the internal staging API and improves refresh reliability.
>
> For more information, see [Data Factory limitations](data-factory-limitations.md#data-factory-dataflow-gen2-limitations).

Removing data from the staging items can be forced by one of the following actions:

- Disable staging in the dataflow and refresh (after 30 days we garbage collect the data).
- Delete the dataflow (directly removes the data).
- Delete the workspace (directly deletes the StagingLakehouse and StagingWarehouse).

## Cost implications of staging

The staging Lakehouse and staging Warehouse store intermediate data as part of your dataflow processing. The storage consumed by these staging items is billed as part of your OneLake storage. This means that the data stored in the staging items counts toward your overall OneLake storage consumption and associated costs.

To manage storage costs effectively:

- **Monitor staging storage usage**: Be aware that staging data accumulates with each dataflow refresh until it's garbage collected or explicitly removed.
- **Disable staging when not needed**: If your transformations fold to the source system, you might not need staging enabled. Disabling staging reduces storage consumption.
- **Clean up unused dataflows**: Deleting dataflows that are no longer needed immediately removes their associated staging data.
- **Consider refresh frequency**: Frequent refreshes with staging enabled can lead to higher storage consumption. Balance performance benefits against storage costs.

For more information about OneLake storage pricing, see [Microsoft Fabric pricing](https://azure.microsoft.com/pricing/details/microsoft-fabric/).

## Related content

- [Best practices for getting the best performance with Dataflow Gen2](dataflow-gen2-performance-best-practices.md)
- [Dataflow Gen2 data destinations and managed settings](dataflow-gen2-data-destinations-and-managed-settings.md)
- [Differences between Dataflow Gen1 and Gen2](dataflows-gen2-overview.md)
- [Build your first data integration](transform-data.md)
