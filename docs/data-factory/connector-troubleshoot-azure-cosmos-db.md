---
title: Troubleshoot the Azure Cosmos DB connector
description: Learn how to troubleshoot issues with the Azure Cosmos DB connector in Data Factory in Microsoft Fabric.
ms.reviewer: jburchel
ms.author: xupzhou
author: pennyzhou-msft
ms.topic: troubleshooting
ms.custom:
  - build-2023
  - ignite-2023
  - ignite-2024
ms.date: 10/23/2024
---

# Troubleshoot the Azure Cosmos DB connector in Data Factory in Microsoft Fabric

This article provides suggestions to troubleshoot common problems with the Azure Cosmos DB connector in Data Factory in Microsoft Fabric.

## Error message: Request size is too large

- **Message**: `Request size is too large.`

- **Cause**: Azure Cosmos DB limits the size of a single request to 2 MB. The formula is request size = single document size * write batch size. If your document size is large, the default behavior will result in a request size that's too large.

- **Recommendation**: You can tune the write batch size. In the copy activity sink, reduce the *write batch size* value (the default value is 10000).

  If reducing the *write batch size* value to 1 still doesn't work, change your Cosmos DB authentication type to use service principal or system-assigned managed identity or user-assigned managed identity. This authentication enables the connection to use Azure Cosmos DB SQL API V3, which supports larger request sizes.

## Related content

For more troubleshooting help, try these resources:

- [Data Factory blog](https://blog.fabric.microsoft.com/en-us/blog/category/data-factory)
- [Data Factory community](https://community.fabric.microsoft.com/t5/Data-Factory-preview-Community/ct-p/datafactory)
- [Data Factory feature requests ideas](https://ideas.fabric.microsoft.com/)
