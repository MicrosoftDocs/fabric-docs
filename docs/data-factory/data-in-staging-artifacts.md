---
title: Data in Dataflows gen2 staging artifacts
description: This article provides information about what staging artifacts are and how to access data wihtin them.
author: Luitwieler
ms.author: jeluitwi
ms.topic: FAQ
ms.date: 05/16/2024
---

# Data in Dataflows gen2 staging artifacts

To improve performance and reliability, Dataflows Gen2 uses staging artifacts to store intermediate data during data transformation. This article provides information about what staging artifacts are and how to access data within them.

# What are staging artifacts?

Staging artifacts are intermediate data storage locations used by Dataflows Gen2 to store data during data transformation. These artifacts are going by the name of "DataflowsStagingLakehouse" and "DataflowsStagingWarehouse". The staging artifacts are used to store intermediate data during data transformation to improve performance. These artifacts are created automatically when you create your first dataflow and are managed by Dataflows Gen2. These artifacts are by default hidden from the user in the workspace, but may be visible in other experiences like Get Data or the Lakehouse explorer. 

# Accessing data in staging artifacts for GDPR compliance

Accessing data in staging artifacts is not recommended as it cannot be gueranteed that the data is in a consistent state. Dataflows Gen2 is designed to use and modify the data in the staging artifacts in a way that is not intended for direct access. If you need to access data in staging artifacts for GDPR compliance, you can use the following steps:

- To access the data in the staging lakehouse you can leverage 

## Related content

- [Differences between Dataflow Gen1 Gen2](dataflows-gen2-overview.md)
- [Build your first data integration](transform-data.md)
