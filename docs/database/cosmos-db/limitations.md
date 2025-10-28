---
title: Cosmos DB Database Limitations
titleSuffix: Microsoft Fabric
description: Learn about the current limitations and restrictions when using Cosmos DB databases in Microsoft Fabric phase.
author: markjbrown
ms.author: mjbrown
ms.topic: concept-article
ms.date: 10/27/2025
ms.search.form: Databases Limitations
ms.custom: references_regions
appliesto:
- ✅ Cosmos DB in Fabric
---

# Limitations in Cosmos DB in Microsoft Fabric

This article lists current limitations for Cosmos DB in Microsoft Fabric.

**The content in this article changes regularly. For the latest limitations, revisit this article periodically.**

## Quotas and limits

- Databases support a maximum of 25 containers.
- Containers support a maximum autoscale throughput of **50,000** request units per second (RU/s).
- Containers created in the Fabric portal are automatically allocated **5,000** RU/s maximum autoscale throughput.
- Containers created using a software development kit (SDK) can be set with a minimum of **1,000** RU/s up to the maximum allowed autoscale throughput.
- Containers created through an SDK must have throughput set to autoscale during container creation or an error will be thrown.
  
    > [!TIP]
    > Maximum throughput more than 50,000 RU/s can be increased with a support ticket.
    > Maximum containers more than 25 can be increased with a support ticket.

## Customer managed keys (preview)

- Customer managed key (CMK) encryption is available in preview and must be enabled before creating any Cosmos DB artifacts. CMK also cannot be disabled once a Cosmos DB artifact exists within the workspace. For more information see, [Customer managed keys for Cosmos DB in Microsoft Fabric (preview)](customer-managed-keys.md)

## Artifact renaming

- Artifact renaming is not currently supported.

## Private Link support

- Private Link is not currently supported.

## Authorization

- Setting Fabric [item permissions](../../security/permission-model.md#item-permissions) is currently not supported.

## Localization and accessibility

- Cosmos Data Explorer in Microsoft Fabric is currently only available in `en-us` and currently lacks the accessibility features of the Fabric portal.

## Regional availability

- Fabric is not yet available in every region within Azure. Please review the list of regions where Fabric capacity is available and can support Cosmos DB in Fabric. [Fabric regional availability](../../admin/region-availability.md)

## Data

- JSON strings greater than **8 kB** are truncated when queried from the mirrored SQL analytics endpoint. The query editor includes the following error message:

  ```output
  JSON text is not properly formatted. Unexpected character '"' is found at position  
  ```

  - This limitation is related to a similar limitation of the data warehouse feature. The current workaround is to create a shortcut of the mirrored database in Fabric Lakehouse and utilize a Spark notebook to query your data.

## Vector and full-text indexing and search

- For limitations on vector indexing and search see, [Cosmos DB vector limitations](/azure/cosmos-db/nosql/vector-search#current-limitations)
- For limitations on full-text indexing and search see, [Cosmos DB ful-text limitations](/azure/cosmos-db/gen-ai/full-text-search-faq#limitations)

## Programmability

- Cosmos DB stored procedures, triggers, and user-defined functions aren't supported.

## Related content

- [Learn about Cosmos DB in Microsoft Fabric](overview.md)
- [Frequently asked questions about Cosmos DB in Microsoft Fabric](faq.yml)
