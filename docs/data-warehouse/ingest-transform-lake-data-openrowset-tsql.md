---
title: Ingest and Transform Lake Data with OPENROWSET and T-SQL
description: Ingest and transform Parquet, CSV, and JSONL files into Fabric Data Warehouse by using OPENROWSET and Transact-SQL.
ms.reviewer: jovanpop
ms.date: 09/30/2026
ms.topic: how-to
ms.search.form: Ingesting data # This article's title should not change. If so, contact engineering.
ai-usage: ai-assisted
---

# Ingest and transform lake data with OPENROWSET and T-SQL

**Applies to:** [!INCLUDE [fabric-dw](includes/applies-to-version/fabric-dw.md)]

By using the [OPENROWSET function](/sql/t-sql/functions/openrowset-bulk-transact-sql?view=fabric&preserve-view=true), you can expose Parquet, CSV, or JSONL files as a relational source for T-SQL ingestion statements. The files can be in OneLake, Azure Data Lake Storage, or Azure Blob Storage. 
The following example retrieves the contents of a Parquet file by using its absolute ADLS URL:

```sql
SELECT *
FROM OPENROWSET(
    BULK 'https://<storage-account>.dfs.core.windows.net/<container>/<folder>/<file-name>.parquet'
) AS source;
```

Because `OPENROWSET` returns data as a rowset, you can use it as the source of any supported T-SQL ingestion statement, including:
- `CREATE TABLE AS SELECT` (CTAS) or `SELECT ... INTO` to create a new warehouse table from one or more referenced files.
- `INSERT ... SELECT` to append file contents to an existing table.
- `MERGE` to insert new rows, update existing rows, or both, based on data in the referenced files.

In addition to ingestion, you can apply arbitrary T-SQL transformations before loading the data into a table. For example, you can convert data types, derive new column values, filter rows, join file data with existing tables, and perform aggregations as part of the ingestion process.

## Prerequisites

- A Fabric warehouse and permission to create or modify the destination tables.
- Read access to the source files used in a warehouse query.

## Create a table with CTAS

The following CTAS statement reads a yearly Parquet partition and creates a fact table. In addition to physical source columns, it derives a business measure and stores the originating file path for lineage:

```sql
CREATE TABLE dbo.FactOnlineSales
AS
SELECT
    source.SalesOrderID, source.ProductID, CAST(source.OrderDateTime AS date) AS OrderDate,
    source.Quantity, CAST(source.Quantity * source.UnitPrice AS decimal(18, 2)) AS SalesAmount, CAST(source.filepath() AS varchar(1024)) AS SourceFilePath
FROM OPENROWSET(
    BULK 'https://<storage-account>.dfs.core.windows.net/<container>/sales/year=2026/*.parquet'
) WITH (
    SalesOrderID bigint,
    ProductID int,
    OrderDateTime datetime2(6),
    Quantity int,
    UnitPrice decimal(18, 2)
) AS source
WHERE source.Quantity > 0;
```

`OrderDate` and `SalesAmount` are calculated while the rows are loaded, and the quantity predicate excludes invalid transactions. `filepath()` adds the complete source URI to each destination row, which helps trace a fact back to the file that supplied it.

## Create a table with SELECT INTO

The following statement creates a customer import table from multiple CSV files. It cleans a source value and adds both source-file and load-time metadata:

```sql
SELECT
    source.CustomerID, TRIM(source.CustomerName) AS CustomerName, source.Region, CAST(source.filepath() AS varchar(1024)) AS SourceFilePath,
    CAST(GETDATE() AS datetime2(6)) AS IngestionTime
INTO dbo.CustomerImport
FROM OPENROWSET(
    BULK 'https://<storage-account>.blob.core.windows.net/<container>/customers/*.csv',
    HEADER_ROW = TRUE
) AS source
WHERE source.CustomerID IS NOT NULL;
```

The wildcard combines all matching CSV files into one relational source. `HEADER_ROW = TRUE` reads column names from the first row of each file. `TRIM` standardizes customer names, `filepath()` records row lineage, and `GETDATE()` records when the warehouse ingested the row. The null-key predicate prevents unusable customer records from entering the new table.

## Append an incremental batch with INSERT ... SELECT

The following example loads selected JSONL partitions into an existing table. Besides the physical order properties, it ingests the year and month encoded in the folder path and captures file lineage and ingestion time:

```sql
INSERT INTO dbo.Sales
    (OrderID, CustomerID, OrderDate, Region, TotalAmount,
     OrderYear, OrderMonth, SourceFilePath, IngestionTime)
SELECT
    source.OrderID, source.CustomerID, source.OrderDate, source.Region, source.TotalAmount,
    CAST(source.filepath(1) AS smallint), CAST(source.filepath(2) AS smallint), source.filepath(), GETDATE()
FROM OPENROWSET(
    BULK 'https://<storage-account>.dfs.core.windows.net/<container>/orders/year=*/month=*/*.jsonl'
) AS source
WHERE source.filepath(1) = '2026'
  AND source.filepath(2) IN ('07', '08', '09');
```

The first and second wildcards match the `year` and `month` folder values. `filepath(1)` and `filepath(2)` expose those partition values as character data, so the query casts them to `smallint` before storing them as `OrderYear` and `OrderMonth`. `filepath()` without an argument stores the complete source path. The wildcards keep the query reusable, while the predicates select the current batch and allow `OPENROWSET` to skip nonmatching folders.

## Synchronize a file batch with MERGE

Use `MERGE` when a file batch can contain both new and changed rows. The following example reads the current product files, standardizes descriptive values, and carries a source modification timestamp into the match:

```sql
MERGE dbo.DimProductFromFiles AS target
USING (
    SELECT
        source.ProductID, TRIM(source.ProductName) AS ProductName,
        source.Category, source.ModifiedDate
    FROM OPENROWSET(
        BULK 'https://<storage-account>.dfs.core.windows.net/<container>/products/current/*.parquet'
    ) AS source
) AS source
ON target.ProductKey = source.ProductID
WHEN MATCHED AND source.ModifiedDate > target.ModifiedDate THEN
    UPDATE SET ProductName = source.ProductName, Category = source.Category,
        ModifiedDate = source.ModifiedDate
WHEN NOT MATCHED BY TARGET THEN
    INSERT (ProductKey, ProductName, Category, ModifiedDate)
    VALUES (source.ProductID, source.ProductName, source.Category, source.ModifiedDate);
```

The query updates a product only when the file contains a newer version and inserts product IDs that aren't in the dimension. Ensure that the file set returns no more than one row for each `ProductID`. Add `WHEN NOT MATCHED BY SOURCE THEN DELETE` only when the path represents a complete authoritative snapshot, not an incremental batch.

## Read files from OneLake

Use the complete OneLake URL for occasional queries. This example loads a yearly partition and stores the OneLake URI with each taxi trip:

```sql
INSERT INTO dbo.TaxiTrips
    (TripID, PickupDateTime, TripDistance, TotalAmount, SourceFilePath)
SELECT
    source.TripID, source.PickupDateTime, source.TripDistance,
    source.TotalAmount, source.filepath()
FROM OPENROWSET(
    BULK 'https://onelake.dfs.fabric.microsoft.com/<workspace-id>/<lakehouse-id>/Files/year=2026/month=*/*.parquet'
) AS source;
```

The URL identifies the workspace, lakehouse, `/Files` area, and partitioned folder. The month wildcard reads all monthly files for 2026, while `filepath()` preserves the exact OneLake file that produced each destination row. 
For reusable queries, define an external data source at the lakehouse root so workspace and lakehouse identifiers are maintained in one object:

```sql
CREATE EXTERNAL DATA SOURCE SalesFilesRoot
WITH (
    LOCATION = 'https://onelake.dfs.fabric.microsoft.com/<workspace-id>/<lakehouse-id>'
);
```

`SalesFilesRoot` is a persisted object in the current warehouse and requires permission to create external data sources. It becomes a reusable name for the OneLake root, so a location change can be made once instead of in every ingestion query.

You can then use a relative path while retaining the same wildcard and partition behavior:

```sql
CREATE TABLE dbo.TaxiTrips AS
SELECT *
FROM OPENROWSET(
    BULK '/Files/year=2026/month=*/*.parquet',
    DATA_SOURCE = 'SalesFilesRoot'
) AS source;
```

`DATA_SOURCE` combines the stored OneLake root with the relative `/Files` path. This keeps ingestion queries focused on folders, partitions, and transformation logic instead of repeating location identifiers.

## Choose OPENROWSET or COPY

Use `OPENROWSET` with a T-SQL ingestion statement when the load includes filtering, joins, calculations, schema shaping, or synchronization. For a direct source-to-destination bulk load without transformations, use the [COPY statement](ingest-data-copy.md).

## Monitor ingestion

File ingestion statements appear with other T-SQL requests in the [warehouse query history/activity](monitor.md). Use [query insights](query-insights.md) to inspect their execution details.

## Related content

- [T-SQL data ingestion in Fabric Data Warehouse](ingest-data-tsql.md)
- [Ingest Delta Lake tables with T-SQL](ingest-delta-lake-tsql.md)
- [Ingest from warehouse tables and mirrored databases with T-SQL](ingest-data-warehouse-tables-tsql.md)
- [Query external data lake files](query-external-data-lake-files.md)
- [Ingest data with the COPY statement](ingest-data-copy.md)
- [OPENROWSET(BULK) (Transact-SQL)](/sql/t-sql/functions/openrowset-bulk-transact-sql?view=fabric&preserve-view=true)
- [Troubleshoot ingestion errors](troubleshoot-ingestion-errors.md)
