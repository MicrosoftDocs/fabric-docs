---
title: Troubleshoot the Oracle connector
titleSuffix: Azure Data Factory & Azure Synapse
description: Learn how to troubleshoot issues with the Oracle connector in Azure Data Factory and Azure Synapse Analytics.
ms.subservice: data-movement
ms.topic: troubleshooting
ms.date: 11/07/2024
ms.reviewer: jianleishen
ms.custom: has-adal-ref, synapse, connectors
---

# Troubleshoot the Oracle connector in Azure Data Factory and Azure Synapse

This article provides suggestions to troubleshoot common problems with the Oracle connector in Azure Data Factory and Azure Synapse.

## Error code: ArgumentOutOfRangeException

- **Message**: `Hour, Minute, and Second parameters describe an un-representable DateTime.`

- **Cause**: In Azure Data Factory and Synapse pipelines, DateTime values are supported in the range from 0001-01-01 00:00:00 to 9999-12-31 23:59:59. However, Oracle supports a wider range of DateTime values, such as the BC century or min/sec>59, which leads to failure.

- **Recommendation**: 

    To see whether the value in Oracle is in the supported range of dates, run `select dump(<column name>)`. 

    To learn the byte sequence in the result, see [How are dates stored in Oracle?](https://stackoverflow.com/questions/13568193/how-are-dates-stored-in-oracle).

## Related content

For more troubleshooting help, try these resources:
- [Data Factory blog](https://blog.fabric.microsoft.com/blog/category/data-factory)
- [Data Factory community](https://community.fabric.microsoft.com/t5/Data-Factory-preview-Community/ct-p/datafactory)
- [Data Factory feature requests](https://ideas.fabric.microsoft.com/)
