---
title: Troubleshoot the Azure Data Explorer connector
description: Learn how to troubleshoot issues with the Azure Data Explorer connector in Data Factory in Microsoft Fabric.
ms.reviewer: jburchel
ms.author: xupzhou
author: pennyzhou-msft
ms.topic: troubleshooting
ms.custom:
  - build-2023
  - ignite-2023
ms.date: 11/15/2023
---

# Troubleshoot the Azure Data Explorer connector in Data Factory in Microsoft Fabric

This article provides suggestions to troubleshoot common problems with the Azure Data Explorer connector in Data Factory in Microsoft Fabric.

## Error code: KustoMappingReferenceHasWrongKind

- **Message**: `Mapping reference should be of kind 'Csv'. Mapping reference: '%reference;'. Kind '%kind;'.`

- **Cause**: The ingestion mapping reference is not CSV type.

- **Recommendation**: Create a CSV ingestion mapping reference.

## Error code: KustoWriteFailed

- **Message**: `Write to Kusto failed with following error: '%message;'.`

- **Cause**: Wrong configuration or transient errors when the destination reads data from the source.

- **Recommendation**: For transient failures, set retries for the activity. For permanent failures, check your configuration and contact support.

## Related content

For more troubleshooting help, try these resources:

- [Data Factory blog](https://blog.fabric.microsoft.com/en-us/blog/category/data-factory)
- [Data Factory community](https://community.fabric.microsoft.com/t5/Data-Factory-preview-Community/ct-p/datafactory)
- [Data Factory feature requests ideas](https://ideas.fabric.microsoft.com/)
