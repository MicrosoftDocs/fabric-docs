---
title: Ingesting data into the warehouse
description: Learn about the features that allow you to ingest data into your warehouse.
author: WilliamDAssafMSFT
ms.author: wiassaf
ms.reviewer: procha
ms.date: 05/01/2024
ms.service: fabric
ms.subservice: data-warehouse
ms.topic: conceptual
ms.custom:
  - build-2023
  - ignite-2023
ms.search.form: Ingesting data # This article's title should not change. If so, contact engineering.
---
# Ingest data into the Warehouse

**Applies to:** [!INCLUDE [fabric-dw](includes/applies-to-version/fabric-dw.md)]

 [!INCLUDE [fabric-dw](includes/fabric-dw.md)] in [!INCLUDE [product-name](../includes/product-name.md)] offers built-in data ingestion tools that allow users to ingest data into warehouses at scale using code-free or code-rich experiences.

## Data ingestion options

You can ingest data into a [!INCLUDE [fabric-dw](includes/fabric-dw.md)] using one of the following options:

- **COPY (Transact-SQL)**: the COPY statement offers flexible, high-throughput data ingestion from an external Azure storage account. You can use the COPY statement as part of your existing ETL/ELT logic in Transact-SQL code. 
- **Data pipelines**: pipelines offer a code-free or low-code experience for data ingestion. Using pipelines, you can orchestrate robust workflows for a full Extract, Transform, Load (ETL) experience that includes activities to help prepare the destination environment, run custom Transact-SQL statements, perform lookups, or copy data from a source to a destination. 
- **Dataflows**: an alternative to pipelines, dataflows enable easy data preparation, cleaning, and transformation using a code-free experience. 
- **Cross-warehouse ingestion**: data ingestion from workspace sources is also possible. This scenario might be required when there's the need to create a new table with a subset of a different table, or as a result of joining different tables in the warehouse and in the lakehouse. For cross-warehouse ingestion, in addition to the options mentioned, Transact-SQL features such as **INSERT...SELECT**, **SELECT INTO**, or **CREATE TABLE AS SELECT (CTAS)** work cross-warehouse within the same workspace.

### Decide which data ingestion tool to use

To decide which data ingestion option to use, you can use the following criteria: 

- Use the **COPY (Transact-SQL)** statement for code-rich data ingestion operations, for the highest data ingestion throughput possible, or when you need to add data ingestion as part of a Transact-SQL logic. For syntax, see [COPY INTO (Transact-SQL)](/sql/t-sql/statements/copy-into-transact-sql?view=fabric&preserve-view=true).
- Use **data pipelines** for code-free or low-code, robust data ingestion workflows that run repeatedly, at a schedule, or that involves large volumes of data. For more information, see [Ingest data using Data pipelines](ingest-data-pipelines.md).
- Use **dataflows** for a code-free experience that allow custom transformations to source data before it's ingested. These transformations include (but aren't limited to) changing data types, adding or removing columns, or using functions to produce calculated columns. For more information, see [Dataflows](../data-factory/dataflows-gen2-overview.md).
- Use **cross-warehouse ingestion** for code-rich experiences to create new tables with source data within the same workspace. For more information, see [Ingest data using Transact-SQL](ingest-data-tsql.md) and [Write a cross-database query](query-warehouse.md#write-a-cross-database-query).

> [!NOTE]
> The COPY statement in [!INCLUDE [fabric-dw](includes/fabric-dw.md)] supports only data sources on Azure storage accounts, OneLake sources are currently not supported.
## Supported data formats and sources
Data ingestion for [!INCLUDE [fabric-dw](includes/fabric-dw.md)] in [!INCLUDE [product-name](../includes/product-name.md)] offers a vast number of data formats and sources you can use. Each of the options outlined includes its own list of supported data connector types and data formats. 

For **cross-warehouse ingestion**, data sources must be within the same [!INCLUDE [product-name](../includes/product-name.md)] workspace. Queries can be performed using three-part naming for the source data. 

As an example, suppose there's two warehouses named Inventory and Sales in a workspace. A query such as the following one creates a new table in the Inventory warehouse with the content of a table in the Inventory warehouse, joined with a table in the Sales warehouse:

```sql
CREATE TABLE Inventory.dbo.RegionalSalesOrders
AS
SELECT s.SalesOrders, i.ProductName
FROM Sales.dbo.SalesOrders s
JOIN Inventory.dbo.Products i
WHERE s.ProductID = i.ProductID
    AND s.Region = 'West region'
```

The [COPY (Transact-SQL)](/sql/t-sql/statements/copy-into-transact-sql?view=fabric&preserve-view=true) statement currently supports the PARQUET and CSV file formats. For data sources, currently Azure Data Lake Storage (ADLS) Gen2 and Azure Blob Storage are supported.

**Data pipelines** and **dataflows** support a wide variety of data sources and data formats. For more information, see [Data pipelines](ingest-data-pipelines.md) and [Dataflows](../data-factory/dataflows-gen2-overview.md).

## Best practices

The COPY command feature in [!INCLUDE [fabric-dw](includes/fabric-dw.md)] in [!INCLUDE [product-name](../includes/product-name.md)] uses a simple, flexible, and fast interface for high-throughput data ingestion for SQL workloads. In the current version, we support loading data from external storage accounts only.

You can also use TSQL to create a new table and then insert into it, and then update and delete rows of data. Data can be inserted from any database within the [!INCLUDE [product-name](../includes/product-name.md)] workspace using cross-database queries. If you want to ingest data from a Lakehouse to a warehouse, you can do this with a cross database query. For example:

```sql
INSERT INTO MyWarehouseTable
SELECT * FROM MyLakehouse.dbo.MyLakehouseTable;
```

- Avoid ingesting data using singleton **INSERT** statements, as this causes poor performance on queries and updates. If singleton **INSERT** statements were used for data ingestion consecutively, we recommend creating a new table by using **CREATE TABLE AS SELECT (CTAS)** or **INSERT...SELECT** patterns, dropping the original table, and then creating your table again from the table you created using **CREATE TABLE AS SELECT (CTAS)**.
  - Dropping your existing table impacts your semantic model, including any custom measures or customizations you may have made to the semantic model.
- When working with external data on files, we recommend that files are at least 4 MB in size.
- For large compressed CSV files, consider splitting your file into multiple files.
- Azure Data Lake Storage (ADLS) Gen2 offers better performance than Azure Blob Storage (legacy). Consider using an ADLS Gen2 account whenever possible. 
- For pipelines that run frequently, consider isolating your Azure storage account from other services that could access the same files at the same time.
- Explicit transactions allow you to group multiple data changes together so that they're only visible when reading one or more tables when the transaction is fully committed. You also have the ability to roll back the transaction if any of the changes fail.
- If a SELECT is within a transaction, and was preceded by data insertions, the [automatically generated statistics](statistics.md) can be inaccurate after a rollback. Inaccurate statistics can lead to unoptimized query plans and execution times. If you roll back a transaction with SELECTs after a large INSERT, [update statistics](/sql/t-sql/statements/update-statistics-transact-sql?view=fabric&preserve-view=true) for the columns mentioned in your SELECT.

> [!NOTE]
> Regardless of how you ingest data into warehouses, the parquet files produced by the data ingestion task will be optimized using V-Order write optimization. V-Order optimizes parquet files to enable lightning-fast reads under the Microsoft Fabric compute engines such as Power BI, SQL, Spark and others. Warehouse queries in general benefit from faster read times for queries with this optimization, still ensuring the parquet files are 100% compliant to its open-source specification. [Unlike in Fabric Data Engineering](../data-engineering/delta-optimization-and-v-order.md), V-Order is a global setting in Synapse Data Warehouse that cannot be disabled.

## Related content

- [Ingest data using Data pipelines](ingest-data-pipelines.md)
- [Ingest data using the COPY statement](ingest-data-copy.md)
- [Ingest data using Transact-SQL](ingest-data-tsql.md)
- [Create your first dataflow to get and transform data](../data-factory/create-first-dataflow-gen2.md)
- [COPY (Transact-SQL)](/sql/t-sql/statements/copy-into-transact-sql?view=fabric&preserve-view=true)
- [CREATE TABLE AS SELECT (Transact-SQL)](/sql/t-sql/statements/create-table-as-select-azure-sql-data-warehouse?view=fabric&preserve-view=true)
- [INSERT (Transact-SQL)](/sql/t-sql/statements/insert-transact-sql?view=fabric&preserve-view=true)
