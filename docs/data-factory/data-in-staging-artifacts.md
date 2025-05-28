---
title: Data in Dataflow Gen2 staging 
description: This article provides information about what staging artifacts are.
author: Luitwieler
ms.author: jeluitwi
ms.topic: concept-article
ms.date: 08/05/2024
ms.custom: dataflows
---

# Data in Dataflow Gen2 staging artifacts

To improve performance and reliability, Dataflow Gen2 uses staging items to store intermediate data during data transformation. This article provides information about what staging items are and how to handle data within them.

## What are staging artifacts?

Staging artifacts are intermediate data storage locations used by Dataflow Gen2 to store data during data transformation. These artifacts go by the "DataflowsStagingLakehouse" and "DataflowsStagingWarehouse" names. The staging artifacts are used to store intermediate data during data transformation to improve performance. These artifacts are created automatically when you create your first dataflow and are managed by Dataflow Gen2. These artifacts are hidden from the user in the workspace, but might be visible in other experiences like Get Data or the Lakehouse explorer. We strongly advise not to access or modify the data in the staging artifacts directly as it may lead to unexpected behavior. Also storing data yourself in the staging artifacts isn't supported and might result in data loss.

## Data in staging artifacts

Staging artifacts aren't designed for direct access by users. Dataflow Gen2 manages the data in the staging artifacts and ensures that the data is in a consistent state. Accessing data in staging artifacts directly isn't supported as it can't be guaranteed that the data is in a consistent state. If you need to access data in staging artifacts, you can use the dataflow connector in Power BI, Excel, or other dataflows.

Removing data from the staging artifacts can be forced by one of the following actions:

- Disable staging in the dataflow and refresh (after 30 days we garbage collect the data).
- Delete the dataflow (directly removes the data).
- Delete the workspace (directly deletes the StagingLakehouse and StagingWarehouse).

## Related content

- [Differences between Dataflow Gen1 and Gen2](dataflows-gen2-overview.md)
- [Build your first data integration](transform-data.md)
