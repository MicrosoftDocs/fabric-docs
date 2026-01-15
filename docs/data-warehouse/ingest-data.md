---
title: Ingest Data into the Warehouse
description: Learn about the features and methods to ingest data into your warehouse in Microsoft Fabric.
author: WilliamDAssafMSFT
ms.author: wiassaf
ms.reviewer: procha, fresantos
ms.date: 12/02/2025
ms.topic: concept-article
ms.search.form: Ingesting data # This article's title should not change. If so, contact engineering.
---
# Ingest data into the Warehouse

**Applies to:** [!INCLUDE [fabric-dw](includes/applies-to-version/fabric-dw.md)]

 [!INCLUDE [fabric-dw](includes/fabric-dw.md)] in [!INCLUDE [product-name](../includes/product-name.md)] offers built-in data ingestion tools that allow users to ingest data into warehouses at scale using code-free or code-rich experiences.

### Decide which data ingestion tool to use

To decide which data ingestion option to use, you can use the following criteria: 

- Use the **COPY (Transact-SQL)** statement for code-rich data ingestion operations, for the highest data ingestion throughput possible, or when you need to add data ingestion as part of a Transact-SQL logic. 
    - To get started, see [Ingest data using the COPY statement](ingest-data-copy.md)
    - The [!INCLUDE [fabric-dw](includes/fabric-dw.md)] also supports traditional `BULK INSERT` statement that is synonym for `COPY INTO` with classic loading options.
    - The `COPY` statement in [!INCLUDE [fabric-dw](includes/fabric-dw.md)] supports data sources from Azure storage accounts and OneLake lakehouse folders. OneLake sources are currently a preview feature.
- Use **pipelines** for code-free or low-code, robust data ingestion workflows that run repeatedly, at a schedule, or that involves large volumes of data. 
    - To get started, see [Ingest data into your Warehouse using pipelines](ingest-data-pipelines.md).
    - Using pipelines, you can orchestrate robust workflows for a full Extract, Transform, Load (ETL) experience that includes activities to help prepare the destination environment, run custom Transact-SQL statements, perform lookups, or copy data from a source to a destination. 
- Use **dataflows** for a code-free experience that allow custom transformations to source data before it's ingested. 
    - To get started, see [Ingest data using a dataflow](../data-factory/create-first-dataflow-gen2.md).
    - These transformations include (but aren't limited to) changing data types, adding or removing columns, or using functions to produce calculated columns.
- Use **T-SQL ingestion** for code-rich experiences to create new tables or update existing ones with source data within the same workspace or external storage. 
    - To get started, see [Ingest data into your Warehouse using Transact-SQL](ingest-data-tsql.md).
    - You can use Transact-SQL features such as `INSERT...SELECT`, `SELECT INTO`, or `CREATE TABLE AS SELECT (CTAS)` to read data from table referencing other warehouses, lakehouses, or mirrored databases within the same workspace, or to read data from `OPENROWSET` function that references files in the external Azure storage accounts.
    - You can also [write a cross-database queries](query-warehouse.md#write-a-cross-database-query) between different warehouses in your Fabric workspace.

## Supported data formats and sources

Data ingestion for [!INCLUDE [fabric-dw](includes/fabric-dw.md)] in [!INCLUDE [product-name](../includes/product-name.md)] offers a vast number of data formats and sources you can use. Each of the options outlined includes its own list of supported data connector types and data formats. 

For **T-SQL ingestion**, table data sources must be within the same [!INCLUDE [product-name](../includes/product-name.md)] workspace and file data sources must be in Azure Data Lake or Azure Blob storage. Queries can be performed using three-part naming or OPENROWSET function for the source data. Table data sources can reference Delta Lake data sets, while OPENROWSET() can reference Parquet, CSV, or JSONL files in Azure Data Lake or Azure Blob storage.

As an example, suppose there's two warehouses named Inventory and Sales in a workspace. A query such as the following one creates a new table in the Inventory warehouse with the content of a table in the Inventory warehouse, joined with a table in the Sales warehouse, and with external files containing customer information:

```sql
CREATE TABLE Inventory.dbo.RegionalSalesOrders
AS
SELECT 
    s.SalesOrders,
    i.ProductName,
    c.CustomerName
FROM Sales.dbo.SalesOrders s
JOIN Inventory.dbo.Products i
    ON s.ProductID = i.ProductID
JOIN OPENROWSET( BULK 'abfss://<container>@<storage>.dfs.core.windows.net/<customer-file>.csv' ) AS c
    ON s.CustomerID = c.CustomerID
WHERE s.Region = 'West region';
```

> [!NOTE]
> Reading data using `OPENROWSET` can be slower than querying data from a table. If you plan to access the same external data repeatedly, consider ingesting it into a dedicated table to improve performance and query efficiency.

The [COPY (Transact-SQL)](/sql/t-sql/statements/copy-into-transact-sql?view=fabric&preserve-view=true) statement currently supports the PARQUET and CSV file formats. For data sources, currently Azure Data Lake Storage (ADLS) Gen2 and Azure Blob Storage are supported.

**Pipelines** and **dataflows** support a wide variety of data sources and data formats. For more information, see [Pipelines](ingest-data-pipelines.md) and [Dataflows](../data-factory/dataflows-gen2-overview.md).

## Best practices

The COPY command feature in [!INCLUDE [fabric-dw](includes/fabric-dw.md)] in [!INCLUDE [product-name](../includes/product-name.md)] uses a simple, flexible, and fast interface for high-throughput data ingestion for SQL workloads. In the current version, we support loading data from external storage accounts only.

You can also use T-SQL language to create a new table and then insert into it, and then update and delete rows of data. Data can be inserted from any database within the [!INCLUDE [product-name](../includes/product-name.md)] workspace using cross-database queries. If you want to ingest data from a Lakehouse to a warehouse, you can do this with a cross database query. For example:

```sql
INSERT INTO MyWarehouseTable
SELECT * FROM MyLakehouse.dbo.MyLakehouseTable;
```

- Avoid ingesting data using singleton `INSERT` statements, as this causes poor performance on queries and updates. If singleton `INSERT` statements were used for data ingestion consecutively, we recommend creating a new table by using `CREATE TABLE AS SELECT (CTAS)` or `INSERT...SELECT` patterns, dropping the original table, and then creating your table again from the table you created using `CREATE TABLE AS SELECT (CTAS)`.
  - Dropping your existing table impacts your semantic model, including any custom measures or customizations you might have made to the semantic model.
- When working with external data on files, we recommend that files are at least 4 MB in size.
- For large compressed CSV files, consider splitting your file into multiple files.
- Azure Data Lake Storage (ADLS) Gen2 offers better performance than Azure Blob Storage (legacy). Consider using an ADLS Gen2 account whenever possible. 
- For pipelines that run frequently, consider isolating your Azure storage account from other services that could access the same files at the same time.
- Explicit transactions allow you to group multiple data changes together so that they're only visible when reading one or more tables when the transaction is fully committed. You also have the ability to roll back the transaction if any of the changes fail.
- If a SELECT is within a transaction, and was preceded by data insertions, the [automatically generated statistics](statistics.md) can be inaccurate after a rollback. Inaccurate statistics can lead to unoptimized query plans and execution times. If you roll back a transaction with SELECTs after a large INSERT, [update statistics](/sql/t-sql/statements/update-statistics-transact-sql?view=fabric&preserve-view=true) for the columns mentioned in your SELECT.

> [!NOTE]
> Regardless of how you ingest data into warehouses, the parquet files produced by the data ingestion task will be optimized using V-Order write optimization. V-Order optimizes parquet files to enable lightning-fast reads under the Microsoft Fabric compute engines such as Power BI, SQL, Spark, and others. Warehouse queries in general benefit from faster read times for queries with this optimization, still ensuring the parquet files are 100% compliant to its open-source specification. It isn't recommended to disable V-Order as it might affect read performance. For more information on V-Order, see [Understand and manage V-Order for Warehouse](v-order.md).

## Related content

- [COPY (Transact-SQL)](/sql/t-sql/statements/copy-into-transact-sql?view=fabric&preserve-view=true)
- [CREATE TABLE AS SELECT (Transact-SQL)](/sql/t-sql/statements/create-table-as-select-azure-sql-data-warehouse?view=fabric&preserve-view=true)
- [INSERT (Transact-SQL)](/sql/t-sql/statements/insert-transact-sql?view=fabric&preserve-view=true)
