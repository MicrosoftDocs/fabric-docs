---
title: Ingest Delta Lake Tables with T-SQL
description: Ingest and transform Delta tables from a lakehouse into Fabric Data Warehouse by using Transact-SQL.
ms.reviewer: procha, jovanpop
ms.date: 09/30/2026
ms.topic: how-to
ms.search.form: Ingesting data # This article's title should not change. If so, contact engineering.
ai-usage: ai-assisted
---

# Ingest Delta Lake tables with T-SQL

**Applies to:** [!INCLUDE [fabric-dw](includes/applies-to-version/fabric-dw.md)]

A warehouse can't directly access Delta Lake files stored in a lakehouse. However, the lakehouse exposes Delta tables in the `/Tables` area through its SQL analytics endpoint. From a warehouse in the same workspace, you can access these tables through the SQL analytics endpoint by using the three-part name `<lakehouse>.<schema>.<table>`.

For general statement-selection guidance, see [T-SQL data ingestion in Fabric Data Warehouse](ingest-data-tsql.md). For Delta tables, use **CTAS** or `SELECT ... INTO` to create a new warehouse table, `INSERT ... SELECT` to append data, or `MERGE` to synchronize changes.

CTAS and `SELECT ... INTO` require the destination table not to exist. Drop an existing destination only when you intend to replace the entire table and its data.

The examples use `SalesLakehouse.dbo` as the lakehouse SQL analytics endpoint and schema.

## Query a Delta table

To query the `Products` Delta Lake table in the `SalesLakehouse` lakehouse, use a three-part name through the SQL analytics endpoint:

```sql
SELECT ProductID, ProductName, Category, ModifiedDate
FROM SalesLakehouse.dbo.Products;
```

The three-part name identifies the lakehouse item, default `dbo` schema, and Delta table. The SQL analytics endpoint presents the physical Delta data as a relational source, so the query doesn't need to read transaction-log or Parquet files directly.

## Create a table with CTAS

The following example creates a warehouse dimension from active lakehouse products. It renames the business key and normalizes text and missing category values while loading the Delta rows:

```sql
CREATE TABLE dbo.DimProduct
AS
SELECT ProductID AS ProductKey, TRIM(ProductName) AS ProductName,
    COALESCE(Category, 'Uncategorized') AS Category, ModifiedDate
FROM SalesLakehouse.dbo.Products
WHERE IsActive = 1;
```

The resulting `dbo.DimProduct` table contains only active products. `TRIM` removes surrounding whitespace, `COALESCE` supplies a reporting value for missing categories, and `ModifiedDate` is retained for later incremental comparisons.

## Create a table with SELECT INTO

The following example creates a daily product aggregate instead of copying transaction-level rows. It derives the calendar date from the source timestamp and materializes commonly used measures:

```sql
SELECT
    CAST(OrderDateTime AS date) AS OrderDate, ProductID, COUNT_BIG(*) AS OrderCount, SUM(Quantity) AS QuantitySold,
    SUM(SalesAmount) AS SalesAmount
INTO dbo.DailyProductSales
FROM SalesLakehouse.dbo.Sales
GROUP BY
    CAST(OrderDateTime AS date),
    ProductID;
```

`dbo.DailyProductSales` contains one row for each date and product combination. The query stores order count, quantity, and sales totals so downstream reports don't need to repeatedly scan and aggregate the full Delta sales table.

## Append an incremental batch with INSERT ... SELECT

Use `INSERT ... SELECT` to append new rows from a Delta table to an existing warehouse table.
The following example assumes that `dbo.FactSales` already exists and uses `SalesOrderID` as its logical row key.
Use a watermark to read only recently modified Delta rows, and compare the source business key with the destination to make the append-only load safe to rerun. The literal watermark represents the previous successful load; in production, retrieve this value from a control table or pipeline parameter.

```sql
DECLARE @LastSuccessfulLoad datetime2 = '2026-09-01T00:00:00';

INSERT INTO dbo.FactSales
    (SalesOrderID, ProductID, CustomerID, OrderDate, Quantity, SalesAmount, ModifiedDate)
SELECT
    source.SalesOrderID, source.ProductID, source.CustomerID, CAST(source.OrderDateTime AS date),
    source.Quantity, source.SalesAmount, source.ModifiedDate
FROM SalesLakehouse.dbo.Sales AS source
WHERE source.ModifiedDate >= @LastSuccessfulLoad
  AND NOT EXISTS (
      SELECT 1
      FROM dbo.FactSales AS target
      WHERE target.SalesOrderID = source.SalesOrderID
  );
```

The `ModifiedDate` predicate limits the source scan to the current load window.

## Synchronize Delta rows with MERGE

The following example uses the same watermark for a source where rows can change. It standardizes the Delta values before matching them to the warehouse dimension:

```sql
DECLARE @LastSuccessfulLoad datetime2 = '2026-09-01T00:00:00';

MERGE dbo.DimProduct AS target
USING (
    SELECT
        ProductID, TRIM(ProductName) AS ProductName,
        COALESCE(Category, 'Uncategorized') AS Category, ModifiedDate
    FROM SalesLakehouse.dbo.Products
    WHERE ModifiedDate >= @LastSuccessfulLoad
      AND IsActive = 1
) AS source
ON target.ProductKey = source.ProductID
WHEN MATCHED AND source.ModifiedDate > target.ModifiedDate THEN
    UPDATE SET ProductName = source.ProductName, Category = source.Category,
        ModifiedDate = source.ModifiedDate
WHEN NOT MATCHED BY TARGET THEN
    INSERT (ProductKey, ProductName, Category, ModifiedDate)
    VALUES (source.ProductID, source.ProductName, source.Category, source.ModifiedDate);
```

Rows with a newer `ModifiedDate` update the existing dimension record, and previously unseen `ProductID` values are inserted. The source repeats the active-product filter used when `dbo.DimProduct` was created, so inactive products aren't newly added. A product that becomes inactive isn't automatically removed; implement a separate soft-delete or full-snapshot synchronization if the destination must reflect deactivations. Ensure that the source returns no more than one row for each destination key. Don't add `WHEN NOT MATCHED BY SOURCE THEN DELETE` to this incremental query, because rows outside the current watermark window are absent by design.

## Monitor ingestion

Delta-to-warehouse loads appear in the [warehouse query history/activity](monitor.md). Use [query insights](query-insights.md) to inspect the CTAS, `SELECT ... INTO`, `INSERT ... SELECT`, or `MERGE` request.

## Related content

- [T-SQL data ingestion in Fabric Data Warehouse](ingest-data-tsql.md)
- [Ingest and transform lake data with OPENROWSET and T-SQL](ingest-transform-lake-data-openrowset-tsql.md)
- [Ingest from warehouse tables and mirrored databases with T-SQL](ingest-data-warehouse-tables-tsql.md)
- [Query the warehouse or SQL analytics endpoint](query-warehouse.md)
