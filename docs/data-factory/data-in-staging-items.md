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

Removing data from the staging items can be forced by one of the following actions:

- Disable staging in the dataflow and refresh (after 30 days we garbage collect the data).
- Delete the dataflow (directly removes the data).
- Delete the workspace (directly deletes the StagingLakehouse and StagingWarehouse).

## Related content

- [Differences between Dataflow Gen1 and Gen2](dataflows-gen2-overview.md)
- [Build your first data integration](transform-data.md)
