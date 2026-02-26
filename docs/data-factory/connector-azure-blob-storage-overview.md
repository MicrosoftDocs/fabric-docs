---
title: Azure Blob Storage connector overview
description: This article explains the overview of using Azure Blob Storage.
ms.reviewer: jianleishen
ms.topic: how-to
ms.date: 07/09/2025
ms.custom:
  - template-how-to
  - connectors
---

# Azure Blob Storage connector overview

The Azure Blob Storage connector is supported in Data Factory for [!INCLUDE [product-name](../includes/product-name.md)] with the following capabilities.

## Supported capabilities

| Supported capabilities                                                                 | Gateway                        | Authentication                                                                                                 |
|----------------------------------------------------------------------------------------|--------------------------------|----------------------------------------------------------------------------------------------------------------|
| **Dataflow Gen2** (source/-)                                                 | None<br> On-premises<br> Virtual network | Account key<br> Anonymous<br> Organizational account<br> Service principal<br> Shared Access Signature (SAS)|
| **Pipeline** <br>- [Copy activity](connector-azure-blob-storage-copy-activity.md) (source/destination)<br>- Lookup activity<br>- Get Metadata activity<br>- Delete activity| None<br> On-premises<br> Virtual network | Account key<br> Anonymous<br> Organizational account<br> Service principal<br> Shared Access Signature (SAS) <br>Workspace identity|
| **Copy job** (source/destination) <br>- Full load<br>- Incremental load <br>- Append<br>- Override | None<br> On-premises<br> Virtual network | Account key<br> Anonymous<br> Organizational account<br> Service principal<br> Shared Access Signature (SAS) <br>Workspace identity|


## Related content

To learn about how to connect to Azure Blob Storage, go to [Set up your Azure Blob Storage connection](connector-azure-blob-storage.md).

To learn about the copy activity configuration for Azure Blob Storage in pipelines, go to [Configure Azure Blob Storage in a copy activity](connector-azure-blob-storage-copy-activity.md).
