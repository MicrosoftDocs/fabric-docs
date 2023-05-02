---
title: Azure SQL Database connector overview
description: This article explains the overview of using Azure SQL Database.
author: jianleishen
ms.author: jianleishen
ms.topic: how-to
ms.date: 05/23/2023
ms.custom: template-how-to 
---

# Azure SQL Database Connector Overview

This Azure SQL Database connector is supported in Data Factory for [!INCLUDE [product-name](../includes/product-name.md)] with the following capabilities.

[!INCLUDE [df-preview-warning](includes/data-factory-preview-warning.md)]

## Supported capabilities

| Supported capabilities | Gateway | Authentication |
| --- | --- | --- |
| **Copy activity (Source/Destination)** | None | Basic<br>OAuth2<br>Service principal |
| **Lookup activity** | None | Basic<br>OAuth2<br>Service principal |
| **GetMetadata activity** | None | Basic<br>OAuth2<br>Service principal |
| **Script activity** | None | Basic<br>OAuth2<br>Service principal |
| **Stored procedure activity** | None | Basic<br>OAuth2<br>Service principal |

## Next Steps

- [How to create Azure SQL Database connection](connector-azure-sql-database.md)
- [How to configure Azure SQL Database in copy activity](connector-azure-sql-database-copy-activity.md)
- [Connect to an Azure SQL database in dataflows](connector-azure-sql-database-dataflow.md)
