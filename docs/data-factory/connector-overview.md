---
title: Connector overview
description: Learn about data connectors.
ms.reviewer: DougKlopfenstein
ms.author: jianleishen
author: jianleishen
ms.topic: overview 
ms.date: 01/27/2023
---

# Connector overview

> [!IMPORTANT]
> [!INCLUDE [product-name](../includes/product-name.md)] is currently in PREVIEW.
> This information relates to a prerelease product that may be substantially modified before it's released. Microsoft makes no warranties, expressed or implied, with respect to the information provided here.

[!INCLUDE [product-name](../includes/product-name.md)] Project - Data Factory offers a rich set of connectors that allow you to connect to different types of data stores. You can take advantage of those connectors to transform data in dataflows or move a PB-level of dataset with high-scale in a data pipeline.

## Supported data connectors in dataflows

Dataflows provide data ingestion and transformation capabilities over a wide range of data sources. These data sources include various types of files, databases, online, cloud, and on-premises data sources. There are greater than 135 different data connectors, which are accessible from the dataflows authoring experience within the get data experience.

:::image type="content" source="media/connector-overview/choose-data-source.png" alt-text="Screenshot of the Choose data source screen." lightbox="media/connector-overview/choose-data-source.png":::

You can find a comprehensive list of all connectors supported through our [public Power Query connectors reference](/power-query/connectors/). Supported connectors match the ones marked as supported in the "Power BI (Dataflows)" column in this reference table.

## Supported data stores in data pipeline

[!INCLUDE [product-name](../includes/product-name.md)] Project - Data Factory supports the following data stores in a data pipeline. The support for various activities in a data pipeline, such as copy, look up, get metadata, delete, script, and store procedures, is slightly different. Go to each data store to learn the supported capabilities and the corresponding configurations in detail.

| **Category** | **Data store** | **Copy activity (source/destination)** | **Lookup activity** | **Get metadata activity** | **Delete activity** | **Script activity** | **Stored procedure activity** |
|---|---|---|---|---|---|---|---|
| **Azure** | Azure Blob Storage | ✓/✓ | ✓ | ✓ | ✓ | - | - |
|  | Azure Cosmos DB (SQL API) | ✓/✓ | ✓ | ✓ | ✓ | - | - |
|  | Azure Data Lake Storage Gen2 | ✓/✓ | ✓ | ✓ | ✓ | - | - |
|  | Azure SQL Database | ✓/✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
|  | Azure SQL Managed Instance | ✓/✓ | ✓ | ✓ | ✓ | ✓ | ✓ |

## Next steps

- [How to copy data using copy activity](copy-data-activity.md)
- [Data source management](data-source-management.md)
