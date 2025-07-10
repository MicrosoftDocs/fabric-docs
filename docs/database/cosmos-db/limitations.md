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
- &#x2705; Cosmos DB in Fabric
---

# Limitations in Cosmos DB in Microsoft Fabric (preview)

[!INCLUDE[Feature preview note](../../includes/feature-preview-note.md)]

This article lists current limitations for Cosmos DB in Fabric.

**The content in this article changes regularly. For the latest limitations, revisit this article periodically.**

## Quotas and limits

- Databases support a maximum of **25** containers.

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

## Related content

- [Learn about Cosmos DB in Microsoft Fabric](overview.md)
- [Frequently asked questions about Cosmos DB in Microsoft Fabric](faq.yml)
