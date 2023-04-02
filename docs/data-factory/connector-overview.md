---
title: Connector overview
description: Learn about data connectors.
ms.reviewer: DougKlopfenstein
ms.author: jianleishen
author: jianleishen
ms.topic: overview 
ms.date: 03/09/2023
---

# Connector overview

> [!IMPORTANT]
> [!INCLUDE [product-name](../includes/product-name.md)] is currently in PREVIEW.
> This information relates to a prerelease product that may be substantially modified before it's released. Microsoft makes no warranties, expressed or implied, with respect to the information provided here. Refer to [Azure Data Factory documentation](/azure/data-factory/) for the service in Azure.

[!INCLUDE [product-name](../includes/product-name.md)] Project - Data Factory offers a rich set of connectors that allow you to connect to different types of data stores. You can take advantage of those connectors to transform data in dataflows or move a PB-level of dataset with high-scale in a data pipeline.

## Supported data connectors in dataflows

Dataflows provide data ingestion and transformation capabilities over a wide range of data sources. These data sources include various types of files, databases, online, cloud, and on-premises data sources. There are greater than 135 different data connectors, which are accessible from the dataflows authoring experience within the get data experience.

:::image type="content" source="media/connector-overview/choose-data-source.png" alt-text="Screenshot of the Choose data source screen." lightbox="media/connector-overview/choose-data-source.png":::

You can find a comprehensive list of all connectors supported through our [public Power Query connectors reference](/power-query/connectors/). Supported connectors match the ones marked as supported in the "Power BI (Dataflows)" column in this reference table.

## Supported data stores in data pipeline

[!INCLUDE [product-name](../includes/product-name.md)] Project - Data Factory supports the following data stores in a data pipeline via Copy, Lookup, Get Metadata, and Delete Data activities. Go to each data store to learn the supported capabilities and the corresponding configurations in detail.

| **Category** | **Data store** | **Copy activity (source/destination)** | **Lookup activity** | **Get Metadata activity** | **Delete activity** | **Script activity** | **Stored Procedure activity** |
|---|---|---|---|---|---|---|---|
| **Workspace** | Lakehouse | ✓/✓ | - | - | ✓ | - | - |
|  | Data Warehouse | ✓/✓ | ✓ | ✓ | - | ✓ | ✓ |
| **Azure** | Azure Blob Storage | ✓/✓ | ✓ | ✓ | ✓ | - | - |
|  | Azure Cosmos DB (SQL API) | ✓/✓ | ✓ | ✓ | ✓ | - | - |
|  | Azure Data Lake Storage Gen1 | ✓/✓ | ✓ | ✓ | ✓ | - | - |
|  | Azure Data Lake Storage Gen2 | ✓/✓ | ✓ | ✓ | ✓ | - | - |
|  | Azure SQL Database | ✓/✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
|  | Azure SQL Managed Instance | ✓/✓ | ✓ | ✓ | - | ✓ | ✓ |
|  | Azure SQL Explorer | ✓/✓ | ✓ | - | - | - | - |
|  | Azure Database for PostgreSQL  | ✓/✓ | ✓ | - | - | - | - |
|  | Azure Synapse Analytics | ✓/✓ | ✓ | ✓ | - | ✓ | ✓ |
|  | Azure Table Storage | ✓/✓ | ✓ | - | - | - | - |
| **Database** | Amazon Redshift | ✓/-  | ✓ | - | - | - | - |
|  | Apache Impala | ✓/-  | ✓ | - | - | - | - |
|  | Hive  | ✓/-  | ✓ | - | - | - | - |
|  | PostgreSQL | ✓/-  | ✓ | - | - | - | - |
|  | Spark | ✓/-  | ✓ | - | - | - | - |
|  | SQL Server | ✓/✓ | ✓ | ✓ | - | ✓ | ✓ |
| **File** | Amazon S3 | ✓/-  | ✓ | ✓ | ✓ | - | - |
|  | Google Cloud Storage | ✓/-  | ✓ | ✓ | ✓ | - | - |
|  | HTTP | ✓/-  | ✓ | - | - | - | - |
| **Generic** | OData | ✓/-  | ✓ | - | - | - | - |
|  | REST | ✓/✓ | - | - | - | - | - |
| **Services and apps** | Snowflake | ✓/✓ | ✓ | - | - | ✓ | - |
|  | Dataverse | ✓/✓ | ✓ | - | - | - | - |

## Next steps

- [How to copy data using copy activity](copy-data-activity.md)
- [Data source management](data-source-management.md)
