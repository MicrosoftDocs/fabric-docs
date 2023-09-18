---
title: Connector overview
description: Learn about data connectors.
ms.reviewer: DougKlopfenstein
ms.author: jianleishen
author: jianleishen
ms.topic: overview 
ms.custom: build-2023
ms.date: 05/23/2023
ms.search.form: product-data-factory
---

# Connector overview

Data Factory in [!INCLUDE [product-name](../includes/product-name.md)] offers a rich set of connectors that allow you to connect to different types of data stores. You can take advantage of those connectors to transform data in dataflows or move a PB-level of dataset with high-scale in a data pipeline.

[!INCLUDE [df-preview-warning](includes/data-factory-preview-warning.md)]

## Supported data connectors in dataflows

Dataflows provide data ingestion and transformation capabilities over a wide range of data sources. These data sources include various types of files, databases, online, cloud, and on-premises data sources. There are greater than 135 different data connectors, which are accessible from the dataflows authoring experience within the get data experience.

:::image type="content" source="media/connector-overview/choose-data-source.png" alt-text="Screenshot of the Choose data source screen." lightbox="media/connector-overview/choose-data-source.png":::

You can find a comprehensive list of all connectors supported through our [public Power Query connectors reference](/power-query/connectors/). Supported connectors are located in the **Fabric (Dataflow Gen2)** column in the Power Query reference table.

The following connectors are currently available for output destinations in Dataflow Gen2:

- Azure Data Explorer
- Azure SQL
- Data Warehouse
- Lakehouse

## Supported data stores in data pipeline

Data Factory in [!INCLUDE [product-name](../includes/product-name.md)] supports the following data stores in a data pipeline via Copy, Lookup, Get Metadata, and Delete Data activities. Go to each data store to learn the supported capabilities and the corresponding configurations in detail.

| **Category** | **Data store** | **Copy activity (source/destination)** | **Lookup activity** | **Get Metadata activity** | **Delete activity** | **Script activity** | **Stored Procedure activity** |
|---|---|---|---|---|---|---|---|
| **Workspace** | Data Warehouse | ✓/✓ | ✓ | ✓ | - | ✓ | ✓ |
|  | KQL Database | ✓/✓ | ✓ | - | - | - | - |
|  | Lakehouse | ✓/✓ | - | - | ✓ | - | - |
| **Azure** | Azure Blob Storage | ✓/✓ | ✓ | ✓ | ✓ | - | - |
|  | Azure Cosmos DB for NoSQL | ✓/✓ | ✓ | ✓ | ✓ | - | - |
|  | Azure Data Lake Storage Gen1 | ✓/✓ | ✓ | ✓ | ✓ | - | - |
|  | Azure Data Lake Storage Gen2 | ✓/✓ | ✓ | ✓ | ✓ | - | - |
|  | Azure Database for PostgreSQL  | ✓/✓ | ✓ | - | - | - | - |
|  | Azure SQL Database | ✓/✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
|  | Azure SQL Database Managed Instance | ✓/✓ | ✓ | ✓ | - | ✓ | ✓ |
|  | Azure SQL Explorer | ✓/✓ | ✓ | - | - | - | - |
|  | Azure Synapse Analytics | ✓/✓ | ✓ | ✓ | - | ✓ | ✓ |
|  | Azure Table Storage | ✓/✓ | ✓ | - | - | - | - |
| **Database** | Amazon Redshift | ✓/-  | ✓ | - | - | - | - |
|  | Amazon RDS for SQL Server | ✓/-  | ✓ | ✓ | ✓ | - | - |
|  | Apache Impala | ✓/-  | ✓ | - | - | - | - |
|  | Hive  | ✓/-  | ✓ | - | - | - | - |
|  | PostgreSQL | ✓/-  | ✓ | - | - | - | - |
|  | Spark | ✓/-  | ✓ | - | - | - | - |
|  | SQL Server | ✓/✓ | ✓ | ✓ | - | ✓ | ✓ |
| **File** | Amazon S3 | ✓/-  | ✓ | ✓ | ✓ | - | - |
|  | Amazon S3 Compatible | ✓/-  | ✓ | ✓ | ✓ | - | - |
|  | Google Cloud Storage | ✓/-  | ✓ | ✓ | ✓ | - | - |
| **Generic** | HTTP | ✓/-  | ✓ | - | - | - | - |
|  | OData | ✓/-  | ✓ | - | - | - | - |
|  | REST | ✓/✓ | - | - | - | - | - |
| **Services and apps** | Dataverse | ✓/✓ | ✓ | - | - | - | - |
|  | Dynamics CRM | ✓/✓ | ✓ | - | - | - | - |
|  | Microsoft 365 | ✓/- | - | - | - | - | - |
|  | SharePoint Online List | ✓/- | ✓ | - | - | - | - |
|  | Snowflake | ✓/✓ | ✓ | - | - | ✓ | - |

> [!NOTE]
> Currently, a pipeline on managed VNet and on-premises data access with a gateway aren't supported in Data Factory for Microsoft Fabric.

## Next steps

- [How to copy data using copy activity](copy-data-activity.md)
- [Data source management](data-source-management.md)
