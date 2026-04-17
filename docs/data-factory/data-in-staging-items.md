---
title: Data in Dataflow Gen2 staging 
description: This article provides information about what staging items are.
ms.reviewer: jeluitwi
ms.topic: concept-article
ms.date: 11/14/2025
ms.custom: dataflows
---

# Data in Dataflow Gen2 staging items

To improve performance and reliability, Dataflow Gen2 uses staging items to store intermediate data during data transformation. This article provides information about what staging items are and how to handle data within them.

## What are staging items?

Staging items are intermediate data storage locations used by Dataflow Gen2 to store data during data transformation. These items go by the "DataflowsStagingLakehouse" and "DataflowsStagingWarehouse" names. The staging items are used to store intermediate data during data transformation to improve performance. These items are created automatically when you create your first dataflow and are managed by Dataflow Gen2. These items are hidden from the user in the workspace, but might be visible in other experiences like Get Data or the Lakehouse explorer. We strongly advise not to access or modify the data in the staging items directly as it might lead to unexpected behavior. Also storing data yourself in the staging items isn't supported and might result in data loss.

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

- [Differences between Dataflow Gen1 and Gen2](dataflows-gen2-overview.md)
- [Build your first data integration](transform-data.md)
