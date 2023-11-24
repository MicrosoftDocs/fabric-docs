---
title: Azure SQL Database Managed Instance connector overview
description: This article provides the overview of connecting to and using Azure SQL Database Managed Instance data in Data Factory.
author: jianleishen
ms.author: jianleishen
ms.topic: how-to
ms.date: 11/15/2023
ms.custom: template-how-to, build-2023
---

# Azure SQL Database Managed Instance connector overview

The Azure SQL Database Managed Instance connector is supported in Data Factory for [!INCLUDE [product-name](../includes/product-name.md)] with the following capabilities.

## Support in Data pipeline

The Azure SQL Database Managed Instance connector supports the following capabilities in Data pipeline:

| Supported capabilities | Gateway | Authentication |
| --- | --- | --- |
| **Copy activity (source/destination)** | None | Basic<br>Organizational account<br>Service principal |
| **Lookup activity** | None | Basic<br>Organizational account<br>Service principal |
| **GetMetadata activity** | None | Basic<br>Organizational account<br>Service principal |
| **Script activity** | None | Basic<br>Organizational account<br>Service principal |
| **Stored procedure activity** | None | Basic<br>Organizational account<br>Service principal |

To learn more about the copy activity configuration for Azure SQL Database Managed Instance in Data pipeline, go to [Configure in a data pipeline copy activity](connector-azure-sql-database-managed-instance-copy-activity.md).
