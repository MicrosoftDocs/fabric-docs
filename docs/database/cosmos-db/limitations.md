---
title: Cosmos DB Database Limitations
description: Learn about the current limitations and restrictions when using Cosmos DB databases in Microsoft Fabric phase.
ms.reviewer: mjbrown
ms.topic: concept-article
ms.date: 10/29/2025
ms.search.form: Databases Limitations
ms.custom: references_regions
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

## Customer managed keys

- Customer managed key (CMK) encryption is not currently available in Cosmos DB in Microsoft Fabric.

## Artifact renaming

- Artifact renaming is not currently supported.

## Private Link support

- Private Link is not currently supported.

## Authorization

- Setting Fabric [item permissions](../../security/permission-model.md#item-permissions) is currently  supported. However, they will be applied to all Cosmos DB artifacts within the workspace.

## Localization and accessibility

- Cosmos Data Explorer in Microsoft Fabric is currently only available in `en-us` and currently lacks the accessibility features of the Fabric portal.

## Regional availability

- Microsoft Fabric is available in specific Azure regions. For the complete list of regions where Fabric capacity is available, see [Fabric regional availability](../../admin/region-availability.md).

  Cosmos DB in Fabric is currently not supported in the following regions:
  - India West
  - Qatar Central
  - UAE Central
  - Austria East
  - Chile Central
  - South Central US

## Data

- JSON strings greater than **8 kB** are truncated when queried from the mirrored SQL analytics endpoint. The query editor includes the following error message:

  ```output
  JSON text is not properly formatted. Unexpected character '"' is found at position  
  ```

  - This limitation is related to a similar limitation of the data warehouse feature. The current workaround is to create a shortcut of the mirrored database in Fabric Lakehouse and utilize a Spark notebook to query your data.

## Vector and full-text indexing and search

- For limitations on vector indexing and search see, [Cosmos DB vector limitations](/azure/cosmos-db/nosql/vector-search#current-limitations)
- For limitations on full-text indexing and search see, [Cosmos DB full-text limitations](/azure/cosmos-db/gen-ai/full-text-search-faq#limitations)

## Programmability

- Cosmos DB stored procedures, triggers, and user-defined functions aren't supported.

## Fabric limitations for Azure workloads

### Support for `run-as` using workspace identity

Currently Microsoft Fabric does not support `run-as` functionality with Workspace Identity. Operations execute with the identity of the user that created them, not the user executing them. For example, when any user runs a notebook within a workspace, it will always execute in the context of the user who originally created that notebook.

## Related content

- [Learn about Cosmos DB in Microsoft Fabric](overview.md)
- [Frequently asked questions about Cosmos DB in Microsoft Fabric](faq.yml)

