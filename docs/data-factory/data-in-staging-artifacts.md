---
title: Data in Dataflows gen2 staging 
description: This article provides information about what staging artifacts are and how to access data wihtin them.
author: Luitwieler
ms.author: jeluitwi
ms.topic: FAQ
ms.date: 07/22/2024
---

# Data in Dataflows gen2 staging artifacts

To improve performance and reliability, Dataflows Gen2 uses staging items to store intermediate data during data transformation. This article provides information about what staging items are and how to handle data within them.

# What are staging artifacts?

Staging artifacts are intermediate data storage locations used by Dataflows Gen2 to store data during data transformation. These artifacts are going by the name of "DataflowsStagingLakehouse" and "DataflowsStagingWarehouse". The staging artifacts are used to store intermediate data during data transformation to improve performance. These artifacts are created automatically when you create your first dataflow and are managed by Dataflows Gen2. These artifacts are by default hidden from the user in the workspace, but may be visible in other experiences like Get Data or the Lakehouse explorer. We strongly advise not to access or modify the data in the staging artifacts directly as it may lead to unexpected behavior. Also storing data yourself in the staging artifacts is not supported and may result in dataloss.

# Data in staging artifacts

Staging artifacts are not designed for direct access by users. Dataflows Gen2 manages the data in the staging artifacts and ensures that the data is in a consistent state. Accessing data in staging artifacts directly is not recommended as it cannot be gueranteed that the data is in a consistent state. If you need to access data in staging artifacts for GDPR compliance or other reasons, you can use the dataflow connector in Power BI, Excel or other Dataflows.

Removing data from the staging artifacts can be forced by one of the following actions:

- Disable staging in the dataflow and refresh (after 30 days we garbage collect the data)
- Delete the dataflow (directly removes the data)
- Delete the workspace (directly deletes the StagingLakehouse and StagingWarehouse)

## Related content

- [Differences between Dataflow Gen1 Gen2](dataflows-gen2-overview.md)
- [Build your first data integration](transform-data.md)
