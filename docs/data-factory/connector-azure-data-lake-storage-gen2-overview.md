---
title: Azure Data Lake Storage Gen2 connector overview
description: This article provides an overview of the Azure Data Lake Storage Gen2 connector in Data Factory in Microsoft Fabric.
ms.reviewer: jianleishen
ms.topic: how-to
ms.date: 07/09/2025
ms.custom:
  - template-how-to
  - connectors
---

# Azure Data Lake Storage Gen2 connector overview

The Azure Data Lake Storage Gen2 connector is supported in Data Factory for [!INCLUDE [product-name](../includes/product-name.md)] with the following capabilities.

## Supported capabilities

| Supported capabilities                                                                 | Gateway                        | Authentication                                                                                                 |
|----------------------------------------------------------------------------------------|--------------------------------|----------------------------------------------------------------------------------------------------------------|
| **Dataflow Gen2** (source/destination)                                                 | None<br> On-premises<br> Virtual network | Account key<br> Organizational account<br> Shared Access Signature (SAS)                                       |
| **Pipeline** <br>- [Copy activity](connector-azure-data-lake-storage-gen2-copy-activity.md) (source/destination)<br>- Lookup activity<br>- GetMetadata activity<br>- Delete activity | None<br> On-premises<br> Virtual network | Account key<br> Organizational account<br> Shared Access Signature (SAS)<br> Service principal<br>Workspace identity|
| **Copy job** (source/destination) <br>- Full load<br>- Incremental load<br>- Append<br>- Override | None<br> On-premises<br> Virtual network | Account key<br> Organizational account<br> Shared Access Signature (SAS)<br> Service principal<br>Workspace identity |

## Related content

To learn about how to connect to Azure Data Lake Storage Gen2, go to [Set up your Azure Data Lake Storage Gen2 connection](connector-azure-data-lake-storage-gen2.md).

To learn about the copy activity configuration for Azure Data Lake Storage Gen2 in a pipeline, go to [Configure Azure Data Lake Storage Gen2 in a copy activity](connector-azure-data-lake-storage-gen2-copy-activity.md).
