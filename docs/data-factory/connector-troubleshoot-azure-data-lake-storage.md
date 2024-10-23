---
title: Troubleshoot the Azure Data Lake Storage connector
description: Learn how to troubleshoot issues with the Azure Data Lake Storage connector in Data Factory in Microsoft Fabric.
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

# Troubleshoot the Azure Data Lake Storage connector in Data Factory in Microsoft Fabric

This article provides suggestions to troubleshoot common problems with the Azure Data Lake Storage connector in Data Factory in Microsoft Fabric.

## Error code: UserErrorFailedFileOperation

- **Message**: `The underlying connection was closed: Could not establish trust relationship for the SSL/TLS secure channel.`

- **Cause**: The certificate validation failed during the TLS handshake.

- **Resolution**: As a workaround, use the staged copy to skip the Transport Layer Security (TLS) validation for Azure Data Lake Storage Gen1. You need to reproduce this issue and gather the network monitor (netmon) trace, and then engage your network team to check the local network configuration.

## Related content

For more troubleshooting help, try these resources:

- [Data Factory blog](https://blog.fabric.microsoft.com/en-us/blog/category/data-factory)
- [Data Factory community](https://community.fabric.microsoft.com/t5/Data-Factory-preview-Community/ct-p/datafactory)
- [Data Factory feature requests ideas](https://ideas.fabric.microsoft.com/)
