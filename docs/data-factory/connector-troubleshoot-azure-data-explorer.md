---
title: Troubleshoot the Azure Data Explorer connector
description: Learn how to troubleshoot issues with the Azure Data Explorer connector in Data Factory in Microsoft Fabric.
ms.reviewer: xupzhou
ms.topic: troubleshooting
ms.date: 11/15/2023
ms.custom: connectors
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

- [Fabric blog](https://community.fabric.microsoft.com/category/fabricupdatesblogs/blog/fbc_fabricupdatesblogs)
- [Data Factory forums | Microsoft Fabric Community](https://community.fabric.microsoft.com/category/datafactory)
- [Data Factory feature requests ideas](https://ideas.fabric.microsoft.com/)
