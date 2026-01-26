---
title: Troubleshoot the Lakehouse connector
description: Learn how to troubleshoot issues with the Lakehouse connector in Data Factory in Microsoft Fabric.
ms.reviewer: whhender
ms.author: jianleishen
author: jianleishen
ms.topic: troubleshooting
ms.date: 01/09/2026
ms.custom: connectors
---

# Troubleshoot the Lakehouse connector in Data Factory in Microsoft Fabric

This article provides suggestions to troubleshoot common problems with the Lakehouse connector in Data Factory in Microsoft Fabric.

## Error code: LakehouseForbiddenError

- **Message**: `ErrorCode=LakehouseForbiddenError,'Type=Microsoft.DataTransfer.Common.Shared.HybridDeliveryException,Message=Lakehouse failed for forbidden which may be caused by user account or service principal doesn't have enough permission to access Lakehouse. Workspace: '4137113f-8f02-4c59-9a33-ec9d6f0f1468'. Path: '606c4b64-92ad-4621-b116-a9a871ac099d/Tables/dbo'. ErrorCode: 'Forbidden'. Message: 'Forbidden'. TimeStamp: 'Tue, 04 Nov 2025 11:57:11 GMT'.`

- **Cause**: The organizational account doesn't have sufficient permission to access Lakehouse.

- **Recommendation**: Grant the organizational account at least Contributor role in the workspace with the Lakehouse.

## Related content

For more troubleshooting help, try these resources:

- [Data Factory blog](https://blog.fabric.microsoft.com/blog/category/data-factory)
- [Data Factory community](https://community.fabric.microsoft.com/t5/Data-Factory-preview-Community/ct-p/datafactory)
- [Data Factory feature requests ideas](https://ideas.fabric.microsoft.com/)