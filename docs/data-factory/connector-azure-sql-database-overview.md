---
title: Azure SQL Database connector overview
description: This article explains the overview of using Azure SQL Database.
author: jianleishen
ms.author: jianleishen
ms.topic: how-to
ms.date: 04/20/2023
ms.custom: template-how-to 
---

# Azure SQL Database Connector Overview

> [!IMPORTANT]
> [!INCLUDE [product-name](../includes/product-name.md)] is currently in PREVIEW.
> This information relates to a prerelease product that may be substantially modified before it's released. Microsoft makes no warranties, expressed or implied, with respect to the information provided here. Refer to [Azure Data Factory documentation](/azure/data-factory/) for the service in Azure.

This Azure SQL Database connector is supported in Data Factory for [!INCLUDE [product-name](../includes/product-name.md)] with the following capabilities.

## Supported capabilities

| Supported capabilities | Gateway | Authentication |
| --- | --- | --- |
| **Copy activity (Source/Destination)** | None | Basic<br>OAuth2<br>Service principal |
| **Lookup activity** | None | Basic<br>OAuth2<br>Service principal |
| **GetMetadata activity** | None | Basic<br>OAuth2<br>Service principal |
| **Script activity** | None | Basic<br>OAuth2<br>Service principal |
| **Stored procedure activity** | None | Basic<br>OAuth2<br>Service principal |
| **Dataflow Gen2 (Source/Destination)** |  | |

## Next Steps

[How to create Azure SQL Database connection](connector-azure-sql-database.md)

[How to configure Azure SQL Database in copy activity](connector-azure-sql-database-copy-activity.md)


