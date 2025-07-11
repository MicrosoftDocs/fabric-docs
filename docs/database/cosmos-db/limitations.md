---
title: Cosmos DB Database Limitations (Preview)
titleSuffix: Microsoft Fabric
description: Learn about the current limitations and restrictions when using Cosmos DB databases in Microsoft Fabric during the preview phase.
author: seesharprun
ms.author: sidandrews
ms.topic: concept-article
ms.date: 07/10/2025
ms.search.form: Databases Limitations
appliesto:
- ✅ Cosmos DB in Fabric
---

# Limitations in Cosmos DB in Microsoft Fabric (preview)

[!INCLUDE[Feature preview note](../../includes/feature-preview-note.md)]

This article lists current limitations for Cosmos DB in Fabric.

**The content in this article changes regularly. For the latest limitations, revisit this article periodically.**

## Quotas and limits

- Databases support a maximum of **25** containers.
- Databases support an autoscale maximum of 10,000 RU/s per container.

## Regional availability

- The following regions aren't* supported as **capacity** regions during the preview. These regions can be selected as your **home** region, but the paired **capacity** region must be selected from a supported region not included in this list:

  - West US 3
  - Central US
  - South Central US
  - Switzerland North

## Data

- JSON strings greater than **8 kB** are truncated when queried from the mirrored SQL analytics endpoint. The query editor includes the following error message:

  ```output
  JSON text is not properly formatted. Unexpected character '"' is found at position  
  ```

  - This limitation is related to a similar limitation of the data warehouse feature. The current workaround is to create a shortcut of the mirrored database in Fabric Lakehouse and utilize a Spark notebook to query your data.

## Vector search

- `quantizedFlat` and `diskANN` indexes require at least 1,000 vectors to be indexed to ensure that the quantization is accurate. If fewer than 1,000 vectors are indexed, then a full-scan is used instead and RU charges may be higher. 
- Vectors indexed with the `flat` index type can be at most 505 dimensions. Vectors indexed with the `quantizedFlat` or `DiskANN` index type can be at most 4,096 dimensions.
- The rate of vector insertions should be limited. Very large ingestion (in excess of 5M vectors) may require additional index build time. 
- The vector search feature is not currently supported on the existing containers. To use it, a new container must be created, and the container-level vector embedding policy must be specified.
- Shared throughput databases are unsupported.
- At this time, vector indexing and search is not supported on accounts with Analytical Store (and Synapse Link) and Shared Throughput.
- Once vector indexing and search is enabled on a container, it cannot be disabled.


## Related content

- [Learn about Cosmos DB in Microsoft Fabric](overview.md)
- [Frequently asked questions about Cosmos DB in Microsoft Fabric](faq.yml)
