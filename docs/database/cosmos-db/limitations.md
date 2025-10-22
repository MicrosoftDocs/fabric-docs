---
title: Cosmos DB Database Limitations
titleSuffix: Microsoft Fabric
description: Learn about the current limitations and restrictions when using Cosmos DB databases in Microsoft Fabric during the preview phase.
author: seesharprun
ms.author: sidandrews
ms.topic: concept-article
ms.date: 07/16/2025
ms.search.form: Databases Limitations
ms.custom: references_regions
appliesto:
- ✅ Cosmos DB in Fabric
---

# Limitations in Cosmos DB in Microsoft Fabric

This article lists current limitations for Cosmos DB in Fabric.

**The content in this article changes regularly. For the latest limitations, revisit this article periodically.**

## Quotas and limits

- Containers support a maximum autoscale throughput of **10,000** request units per second (RU/s). 

- Containers created in the Fabric portal are automatically allocated **5,000** RU/s. Containers created using a software development kit (SDK) can be set up to the maximum allowed autoscale throughput.

- Container throughput can't be changed once the container is created.

## Regional availability

- The following regions aren't supported as Cosmos DB in Fabric regions. These regions can be your **home** region, but can't contain Fabric capacity used for Cosmos DB in Fabric:

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

- `quantizedFlat` and `diskANN` indexes require at least 1,000 vectors to be indexed to ensure that the quantization is accurate. If fewer than 1,000 vectors are indexed, then a full-scan is used instead and RU charges might be higher.

- Vectors indexed with the `flat` index type can be at most 505 dimensions. Vectors indexed with the `quantizedFlat` or `DiskANN` index type can be at most 4,096 dimensions.

- The rate of vector insertions should be limited. Large ingestion, in excess of 5,000,000 vectors, could require extra index build time.

- The vector search feature isn't currently supported on the existing containers. To use it, a new container must be created, and the container-level vector embedding policy must be specified.

- Shared throughput databases are unsupported.

- At this time, vector indexing and vector search aren't supported on accounts with Analytical Store, Azure Synapse Link, or shared throughput.

- Once vector indexing and vector search are enabled on a container, they can't be disabled.

- Customer managed key (CMK) encryption can't be enabled after vector search is enabled in a workspace. If your intent is to use CMK in your workspace with Cosmos DB for Fabric vector search, enable CMK first, then apply vector search. You can enable vector search after creating a new Cosmos DB artifact by selecting "Sample vector data" in the explorer, or by enabling the feature in the workspace's settings.

## Full text indexing

- Multi-language support is only supported with the following languages:

  - `en-US` (English)
  
  - `de-DE` (German)
  
  - `es-ES` (Spanish)
  
  - `fr-FR` (French)

## Authorization

- Setting Fabric [item permissions](../../security/permission-model.md#item-permissions) is currently not supported.

## Programmability

- Stored procedures, triggers, or user-defined functions aren't supported.

## Related content

- [Learn about Cosmos DB in Microsoft Fabric](overview.md)
- [Frequently asked questions about Cosmos DB in Microsoft Fabric](faq.yml)
