---
title: Azure Data Lake Gen2 Storage connector overview
description: This article explains the overview of using Azure Data Lake Gen2 Storage.
author: jianleishen
ms.author: jianleishen
ms.topic: how-to
ms.date: 12/27/2022
ms.custom: template-how-to 
---

# Azure Blob Storage Connector Overview

This Azure Data Lake Gen2 Storage connector is supported in Trident Project  – Data Factory with the following capabilities.

## Supported capabilities

<table>
                <tr><td><b>Supported capabilities</b></td><td><b>Gateway</b></td><td><b>Authentication</b></td></tr>
                <tr><td><b>Copy Activity (Source/Destination)</b></td><td rowspan=3>Yes</td><td rowspan=3>- Key<br>- OAuth2<br>- Service principal<br>- Shared Access Signature (SAS)</td></tr>
                <tr><td><b>Lookup activity</b></td></tr>Yes</td></tr>
                <tr><td><b>GetMetadata activity</b></td></tr>Yes</td></tr>
                <tr><td><b>Dataflow Gen2 (Source/Destination)</b></td><td>Yes</td><td>None</td><td>- Key<br>- Shared Access Signature (SAS)<br>- Organizational account</td></tr></table>

## Next Steps

[How to copy data using Copy activity in Data pipeline](howto-copy-activity.md)

[How to create Azure Data Lake Gen2 Storage connection](connector-azure-data-lake-gen2-storage.md)

[Copy data in Azure Data Lake Gen2 Storage](connector-azure-data-lake-gen2-storage-copy-activity.md)