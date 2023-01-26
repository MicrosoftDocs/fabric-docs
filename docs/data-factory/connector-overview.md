---
title: Connectors
description: Learn about data connectors.
ms.reviewer: DougKlopfenstein
ms.author: jianleishen
author: jianleishen
ms.topic: overview 
ms.date: 01/27/2023
---

# Connector Overview

[!INCLUDE [product-name](../includes/product-name.md)] Project - Data Factory offers a rich set of connectors that allow you to connect to different types of data stores. You can leverage those connectors to transform data in Dataflow Gen2 or move PB-level of dataset with high-scale in Data pipeline.

## Supported data connectors in Dataflows

Dataflows provide data ingestion & transformation capabilities over a wide range of data sources, including various types of files, databases, Online, Cloud and on-premises data sources.

At the time of [!INCLUDE [product-name](../includes/product-name.md)] Private Preview launch, this includes 135+ different data connectors, which are accessible from the Dataflows authoring experience within the Get Data experience.

:::image type="content" source="media/connector-overview/choose-data-source-1.png" alt-text="Screenshot of the Choose data source screen.":::

You can find a comprehensive list of all connectors supported via our [public Power Query connectors reference](/power-query/connectors/) (supported connectors within [!INCLUDE [product-name](../includes/product-name.md)] Private Preview match the ones marked as supported in the “Power BI (Dataflows)” column in this reference table).

## Supported data stores in Data Pipeline

[!INCLUDE [product-name](../includes/product-name.md)] Project - Data Factory supports the following data stores in Data Pipeline. The support to various activities in Data pipeline such as Copy, Lookup, Get Metadata, Delete, Script, and Store procedure is slightly different. Go to each data store to learn the supported capabilities and the corresponding configurations in detail.

| **Category** | **Data store** | **Copy activity (source/destination)** | **Lookup activity** | **Get Metadata activity** | **Delete activity** | **Script activity** | **Stored Procedure activity** |
|---|---|---|---|---|---|---|---|
| **Azure** | Azure Blob Storage | ✓/✓ | ✓ | ✓ | ✓ | - | - |
|  | Azure Cosmos DB (SQL API) | ✓/✓ | ✓ | ✓ | ✓ | - | - |
|  | Azure Data Lake Storage Gen2 | ✓/✓ | ✓ | ✓ | ✓ | - | - |
|  | Azure SQL Database | ✓/✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
|  | Azure SQL Database Managed Instance | ✓/✓ | ✓ | ✓ | ✓ | ✓ | ✓ |

## Next steps

- How to copy data using Copy activity (Preview)
- [Data Source Management](data-source-managment.md)
