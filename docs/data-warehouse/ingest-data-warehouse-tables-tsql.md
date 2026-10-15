---
title: Ingest from Warehouse Tables and Mirrored Databases with T-SQL
description: Ingest and transform data from warehouse tables and mirrored databases by using Transact-SQL in Microsoft Fabric Data Warehouse.
ms.reviewer: jovanpop
ms.date: 09/30/2026
ms.topic: how-to
ms.search.form: Ingesting data # This article's title should not change. If so, contact engineering.
ai-usage: ai-assisted
---

# Ingest from warehouse tables and mirrored databases with T-SQL

**Applies to:** [!INCLUDE [fabric-dw](includes/applies-to-version/fabric-dw.md)]

Use a T-SQL query to ingest and transform data from tables in the current warehouse, mirrored databases, or other supported items in the same workspace.
The statement-selection guidance is centralized in [T-SQL data ingestion in Fabric Data Warehouse](ingest-data-tsql.md). For table sources:
- Use CTAS or `SELECT ... INTO` to create a table from query results.
- Use `INSERT ... SELECT` to append an incremental batch.
- Use `MERGE` to insert new rows and update changed rows.

The CTAS and `SELECT ... INTO` examples create a new table and fail if it already exists. Drop the destination first only when you intend to replace the complete table and its data.

## Ingest from tables in the current warehouse

Reference a source table in the current warehouse by using the two-part name `<schema>.<table>`. The following examples move data between Bronze, Silver, and Gold tables in the current warehouse.
These examples use a medallion layout. If the schemas don't exist, create them once before running the examples:

```sql
CREATE SCHEMA bronze;
GO
CREATE SCHEMA silver;
GO
CREATE SCHEMA gold;
GO
```

`bronze.Invoices` and `bronze.InvoiceLines` represent raw tables already loaded into the current warehouse.

### Create a table with CTAS

The following example creates a Silver sales table by joining invoice headers with invoice lines from the current warehouse. It selects the grain-defining keys, converts the invoice timestamp to a date, and rejects incomplete or invalid rows:

```sql
CREATE TABLE silver.Sales
AS
SELECT
    invoice.InvoiceID, line.InvoiceLineID, invoice.CustomerID, line.StockItemID AS ProductID,
    CAST(invoice.InvoiceDate AS date) AS SaleDate, line.Quantity, line.UnitPrice, line.ExtendedPrice, line.TaxAmount, line.LineProfit
FROM bronze.Invoices AS invoice
INNER JOIN bronze.InvoiceLines AS line
    ON invoice.InvoiceID = line.InvoiceID
WHERE invoice.CustomerID IS NOT NULL
  AND line.StockItemID IS NOT NULL
  AND line.Quantity > 0
  AND line.UnitPrice >= 0;
```

The new `silver.Sales` table contains one row per invoice line. The join adds customer and sale-date attributes from the invoice header, while the predicates prevent rows with missing keys, nonpositive quantities, or negative prices from entering the validated layer.

### Create a table with SELECT INTO

The following example creates a Gold customer table from Silver sales. It retains only customers whose accumulated revenue meets the reporting threshold:

```sql
SELECT
    CustomerID, COUNT(DISTINCT InvoiceID) AS InvoiceCount, SUM(ExtendedPrice) AS LifetimeRevenue,
    SUM(LineProfit) AS LifetimeProfit
INTO gold.HighValueCustomers
FROM silver.Sales
GROUP BY CustomerID
HAVING SUM(ExtendedPrice) >= 100000;
```

The query creates one row per customer and materializes invoice count, lifetime revenue, and lifetime profit. The `HAVING` predicate is evaluated after aggregation, so customers below the threshold aren't created in `gold.HighValueCustomers`.

### Append an incremental batch with INSERT ... SELECT

The append and synchronization examples load an existing fact table:

```sql
CREATE TABLE gold.FactSales (
    InvoiceID bigint NOT NULL,
    InvoiceLineID bigint NOT NULL,
    CustomerID bigint NOT NULL,
    ProductID int NOT NULL,
    SaleDate date NOT NULL,
    Quantity int NOT NULL,
    UnitPrice decimal(18, 2) NOT NULL,
    ExtendedPrice decimal(18, 2) NOT NULL,
    TaxAmount decimal(18, 2) NOT NULL,
    LineProfit decimal(18, 2) NOT NULL
);
```

`InvoiceLineID` is the logical grain used by both the duplicate check and `MERGE`. Create the table once before loading it.

The following example appends one daily batch from the Silver table. The literal `@LoadDate` represents the date supplied by a scheduler or pipeline for the current run:

```sql
DECLARE @LoadDate date = '2026-09-30';

INSERT INTO gold.FactSales
    (InvoiceID, InvoiceLineID, CustomerID, ProductID, SaleDate,
     Quantity, UnitPrice, ExtendedPrice, TaxAmount, LineProfit)
SELECT
    source.InvoiceID, source.InvoiceLineID, source.CustomerID, source.ProductID, source.SaleDate,
    source.Quantity, source.UnitPrice, source.ExtendedPrice, source.TaxAmount, source.LineProfit
FROM silver.Sales AS source
WHERE source.SaleDate = @LoadDate;
```

The `@LoadDate` predicate isolates the batch and the explicit column lists preserve the source-to-destination mapping. Use this append pattern when existing destination rows don't change. Use `MERGE` when source rows can be corrected.

### Synchronize rows with MERGE

The following example reloads an affected date range when invoice lines can arrive late or be corrected. The literal `@ReloadFromDate` represents the beginning of the correction window. It matches rows at invoice-line grain and carries every mutable measure through the update:

```sql
DECLARE @ReloadFromDate date = '2026-09-28';

MERGE gold.FactSales AS target
USING (
    SELECT
        InvoiceID, InvoiceLineID, CustomerID, ProductID, SaleDate,
        Quantity, UnitPrice, ExtendedPrice, TaxAmount, LineProfit
    FROM silver.Sales
    WHERE SaleDate >= @ReloadFromDate
) AS source
ON target.InvoiceLineID = source.InvoiceLineID
WHEN MATCHED THEN
    UPDATE SET InvoiceID = source.InvoiceID, CustomerID = source.CustomerID, ProductID = source.ProductID, SaleDate = source.SaleDate,
        Quantity = source.Quantity, UnitPrice = source.UnitPrice, ExtendedPrice = source.ExtendedPrice, TaxAmount = source.TaxAmount, LineProfit = source.LineProfit
WHEN NOT MATCHED BY TARGET THEN
    INSERT (
        InvoiceID, InvoiceLineID, CustomerID, ProductID, SaleDate,
        Quantity, UnitPrice, ExtendedPrice, TaxAmount, LineProfit
    )
    VALUES (
        source.InvoiceID, source.InvoiceLineID, source.CustomerID, source.ProductID, source.SaleDate,
        source.Quantity, source.UnitPrice, source.ExtendedPrice, source.TaxAmount, source.LineProfit
    );
```

Existing invoice lines receive the latest dimensions and measures, while new `InvoiceLineID` values are inserted. Unlike the append example, which processes one day, this query reprocesses every sale on or after `@ReloadFromDate`; choose a window wide enough to cover expected late arrivals and corrections. Because the source has no modification timestamp, every matched row is rewritten. If one is available, add a newer-than condition to `WHEN MATCHED` to skip unchanged rows. Ensure that the source returns no more than one row for each destination key. Use `WHEN NOT MATCHED BY SOURCE THEN DELETE` only with a complete authoritative source set, not this filtered incremental batch.

## Ingest from mirrored databases and other workspace items

Add a mirrored database, another warehouse, SQL analytics endpoint, or other supported item from the same workspace to **Explorer**. Once added, you can reference source tables by using the three-part name `<item>.<schema>.<table>`.
This approach lets you query and join data from other warehouses, SQL analytics endpoints, mirrored databases, and supported workspace items without moving or copying the data into the current warehouse.

> [!NOTE]
> Three-part naming is supported only for workspace items that you add to Explorer and that reside in the same workspace. Direct cross-workspace table access isn't supported.
> As a workaround, you can use a lakehouse shortcut to reference data located in another workspace. Once you create the shortcut, you can access the data through the lakehouse and use it with supported workspace items.

### Ingest from another warehouse

The following example creates a Silver table in the current warehouse from Bronze tables in `LandingWarehouse`. The three-part source names identify the remote warehouse, schema, and table:

```sql
CREATE TABLE silver.SalesFromLanding
AS
SELECT
    invoice.InvoiceID, line.InvoiceLineID, invoice.CustomerID, line.StockItemID AS ProductID,
    CAST(invoice.InvoiceDate AS date) AS SaleDate, line.Quantity, line.UnitPrice, line.ExtendedPrice
FROM LandingWarehouse.bronze.Invoices AS invoice
INNER JOIN LandingWarehouse.bronze.InvoiceLines AS line
    ON invoice.InvoiceID = line.InvoiceID;
```

Only the source references are three-part names; you create the two-part `silver.SalesFromLanding` destination in the current warehouse. The query joins and reshapes the remote tables during ingestion, so you don't need a separate copy step.

### Ingest from a mirrored database

The following example loads a separate dimension for mirrored customer data:

```sql
CREATE TABLE dbo.DimCustomerFromMirror (
    CustomerID bigint NOT NULL,
    CustomerName varchar(200) NOT NULL,
    City varchar(100) NULL,
    CountryRegion varchar(100) NULL,
    ModifiedDate datetime2(6) NOT NULL
);
```

Create the destination once before loading it. The source query uses `@LastSuccessfulLoad` as a watermark and limits processing to customers modified since the previous successful load. In production, retrieve the watermark from a control table or pipeline parameter:

```sql
DECLARE @LastSuccessfulLoad datetime2 = '2026-09-01T00:00:00';

MERGE dbo.DimCustomerFromMirror AS target
USING (
    SELECT
        CustomerID, CONCAT(FirstName, ' ', LastName) AS CustomerName,
        City, CountryRegion, ModifiedDate
    FROM SalesOperationsMirror.dbo.Customers
    WHERE ModifiedDate >= @LastSuccessfulLoad
) AS source
ON target.CustomerID = source.CustomerID
WHEN MATCHED AND source.ModifiedDate > target.ModifiedDate THEN
    UPDATE SET CustomerName = source.CustomerName, City = source.City,
        CountryRegion = source.CountryRegion, ModifiedDate = source.ModifiedDate
WHEN NOT MATCHED BY TARGET THEN
    INSERT (CustomerID, CustomerName, City, CountryRegion, ModifiedDate)
    VALUES (source.CustomerID, source.CustomerName, source.City, source.CountryRegion, source.ModifiedDate);
```

The three-part source name reads the mirrored table without copying it to an intermediate staging table. The query combines first and last name during ingestion, updates customers only when the mirrored row is newer, and inserts previously unseen customer IDs. The query doesn't delete rows because the watermark query isn't a complete source snapshot. Mirrored data replicates continuously, so use an overlapping watermark window and rely on `MERGE` to handle repeated rows rather than risking that an in-flight change is skipped.

For more information, see [Write a cross-database SQL query](query-warehouse.md#write-a-cross-database-query).

## Monitor ingestion

Ingestion from warehouse tables and mirrored databases appears in the [warehouse query history/activity](monitor.md). Use [query insights](query-insights.md) to review request duration, status, and execution details.

## Related content

- [T-SQL data ingestion in Fabric Data Warehouse](ingest-data-tsql.md)
- [Ingest and transform lake data with OPENROWSET and T-SQL](ingest-transform-lake-data-openrowset-tsql.md)
- [Ingest Delta Lake tables with T-SQL](ingest-delta-lake-tsql.md)
- [Write a cross-database SQL query](query-warehouse.md#write-a-cross-database-query)
- [MERGE (Transact-SQL)](/sql/t-sql/statements/merge-transact-sql?view=fabric&preserve-view=true)
