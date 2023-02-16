---
title: Azure Blob Storage connector overview
description: This article explains the overview of using Azure Blob Storage.
author: jianleishen
ms.author: jianleishen
ms.topic: how-to
ms.date: 12/27/2022
ms.custom: template-how-to 
---

# Azure Blob Storage connector overview

> [!IMPORTANT]
> [!INCLUDE [product-name](../includes/product-name.md)] is currently in PREVIEW.
> This information relates to a prerelease product that may be substantially modified before it's released. Microsoft makes no warranties, expressed or implied, with respect to the information provided here.

This Azure Blob Storage connector is supported in [!INCLUDE [product-name](../includes/product-name.md)] Project – Data Factory with the following capabilities. 


## Supported capabilities

<table>
                <tr><td><td><b>Supported capabilities</b></td><td><b>Gateway</b></td><td><b>Authentication</b></td></tr>
                <tr><td><b>Copy Activity (Source/Destination)</b></td><td>Yes</td><td rowspan=3>None</td><td rowspan=3>- Anonymous<br>- Key<br>- OAuth2<br>- Service principal<br>- Shared Access Signature (SAS)</td></tr>
                <tr><td><b>Lookup activity</b></td><td>Yes</td></tr>
                <tr><td><b>GetMetadata activity</b></td><td>Yes</td></tr>
                <tr><td><b>Dataflow Gen2 (Source/Destination)</b></td><td>Yes</td><td>On premises data gateway <br> Virtual network data gateway </td><td>- Anonymous<br>- Key<br>- Shared Access Signature (SAS)<br>- Organizational account</td></tr>
</table>


## Next steps

[How to create Azure Blob connection](connector-azure-blob-storage.md)

[Copy data in Azure Blob Storage](connector-azure-blob-storage-copy-activity.md)

