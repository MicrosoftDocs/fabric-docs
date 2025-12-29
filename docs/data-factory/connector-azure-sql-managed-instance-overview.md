---
title: Azure SQL Managed Instance connector overview
description: This article provides the overview of connecting to and using Azure SQL Managed Instance data in Data Factory.
author: jianleishen
ms.author: jianleishen
ms.topic: how-to
ms.date: 11/15/2023
ms.custom:
  - template-how-to
  - connectors
---

# Azure SQL Managed Instance connector overview

The Azure SQL Managed Instance connector is supported in Data Factory for [!INCLUDE [product-name](../includes/product-name.md)] with the following capabilities.

## Supported capabilities

| Supported capabilities| Gateway | Authentication|
|---------| --------| --------|
| **Pipeline**<br>- [Copy activity](connector-azure-sql-managed-instance-copy-activity.md) (source/destination) <br>- Lookup activity<br>- Get Metadata activity <br>- Script activity<br>- Stored procedure activity |None<br> On-premises<br> Virtual network |Basic<br> Organizational account<br> Service principal |
| **Copy job** (source/destination) <br>- Full load<br>- Incremental load<br>- CDC<br>- Append<br>- Override<br>- Upsert <br>- CDC Merge |None<br> On-premises<br> Virtual network |Basic<br> Organizational account<br> Service principal |

## Related content

To learn more about the copy activity configuration for Azure SQL Managed Instance in a pipeline, go to [Configure in a pipeline copy activity](connector-azure-sql-managed-instance-copy-activity.md).
