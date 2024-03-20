---
title: Azure SQL Database connector overview
description: This article explains the overview of using Azure SQL Database.
author: jianleishen
ms.author: jianleishen
ms.topic: how-to
ms.date: 11/15/2023
ms.custom:
  - template-how-to
  - build-2023
  - ignite-2023
---

# Azure SQL Database connector overview

This Azure SQL Database connector is supported in Data Factory for [!INCLUDE [product-name](../includes/product-name.md)] with the following capabilities.

## Support in Dataflow Gen2

To learn about how to connect to Azure SQL Database in Dataflow Gen2, go to [Set up your connection in Dataflow Gen2](connector-azure-sql-database.md#set-up-your-connection-in-dataflow-gen2).

## Support in data pipelines

The Azure SQL Database connector supports the following capabilities in data pipelines:

| Supported capabilities | Gateway | Authentication |
| --- | --- | --- |
| **Copy activity (Source/Destination)** | None | Basic<br>OAuth2<br>Service principal |
| **Lookup activity** | None | Basic<br>OAuth2<br>Service principal |
| **GetMetadata activity** | None | Basic<br>OAuth2<br>Service principal |
| **Script activity** | None | Basic<br>OAuth2<br>Service principal |
| **Stored procedure activity** | None | Basic<br>OAuth2<br>Service principal |

To learn about how to connect to Azure SQL Database in data pipelines, go to [Set up your Azure SQL Database connection](connector-azure-sql-database.md#set-up-your-connection-in-a-data-pipeline).

To learn about the copy activity configuration for Azure SQL Database in data pipelines, go to [Configure Azure SQL Database in a copy activity](connector-azure-sql-database-copy-activity.md).
