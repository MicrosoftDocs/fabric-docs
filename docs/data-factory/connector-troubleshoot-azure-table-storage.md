---
title: Troubleshoot the Azure Table Storage connector
description: Learn how to troubleshoot issues with the Azure Table Storage connector in Data Factory in Microsoft Fabric.
ms.reviewer: whhender
ms.author: xupzhou
author: pennyzhou-msft
ms.topic: troubleshooting
ms.date: 11/15/2023
ms.custom: connectors
---

# Troubleshoot the Azure Table Storage connector in Data Factory in Microsoft Fabric

This article provides suggestions to troubleshoot common problems with the Azure Table Storage connector in Data Factory in Microsoft Fabric.

## Error code: AzureTableDuplicateColumnsFromSource

- **Message**: `Duplicate columns with same name '%name;' are detected from source. This is NOT supported by Azure Table Storage destination.`

- **Cause**: Duplicated source columns might occur if you're using the database as a source and applied table joins, or if you have unstructured CSV files with duplicated column names in the header row.

- **Recommendation**:  Double-check and fix the source columns, as necessary.

## Related content

For more troubleshooting help, try these resources:

- [Data Factory blog](https://blog.fabric.microsoft.com/en-us/blog/category/data-factory)
- [Data Factory community](https://community.fabric.microsoft.com/t5/Data-Factory-preview-Community/ct-p/datafactory)
- [Data Factory feature requests ideas](https://ideas.fabric.microsoft.com/)
