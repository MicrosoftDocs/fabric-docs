---
title: Validate and Clean Up Data in the Warehouse
description: Learn how to validate and clean up data in your warehouse tables in Microsoft Fabric.
ms.reviewer: jovanpop
ms.date: 09/10/2026
ms.topic: how-to
ms.search.form: Warehouse design and development # This article's title should not change. If so, contact engineering.
---
# Validate and clean up data in the warehouse

**Applies to:** [!INCLUDE [fabric-dw](includes/applies-to-version/fabric-dw.md)]

After you [create a table](create-table.md) and [load data into it](ingest-data.md), validate the data for completeness and correctness before using it for reporting or downstream processing.
This article provides simple, realistic examples of validation and cleanup queries that you can run against the `dbo.fact_sale` table created in [Create tables in the warehouse](create-table.md).

## Prerequisites

To get started, complete the following prerequisites:

- Have access to a [!INCLUDE [fabric-dw](includes/fabric-dw.md)] item within a [Premium capacity](/power-bi/enterprise/service-premium-what-is) workspace with contributor or higher permissions.
    - Be sure to connect to your warehouse item. You can't run queries directly in the SQL analytics endpoint of a warehouse.
- Choose your query tool. This tutorial features the [SQL query editor](sql-query-editor.md) in the [!INCLUDE [product-name](../includes/product-name.md)] portal, but you can use any T-SQL querying tool.
- Have a `dbo.fact_sale` table populated with data, as shown in [Create tables in the warehouse](create-table.md).

Validation queries can range from very simple predicates (for example, checking for `NULL` values) to more sophisticated checks that use built-in [AI functions](ai-functions.md) to evaluate the meaning or quality of the data. Pick the level of validation that matches the risk and importance of the data you're checking.

Treat rows returned by these queries as candidates for review, not automatic errors. Confirm the business rule with the data or source-system owner before you correct or delete rows, and prefer fixing the source or transformation over updating fact rows in place.

## Find rows with missing values in a column

Use a simple `WHERE` clause to find rows that are missing values in required columns. This check is one of the fastest and most common checks to run after loading data into a table.

```sql
SELECT SaleKey, CustomerKey, StockItemKey, Quantity, UnitPrice
FROM dbo.fact_sale
WHERE CustomerKey IS NULL
   OR StockItemKey IS NULL
   OR Quantity IS NULL
   OR UnitPrice IS NULL;
```

## Validate calculations

Compare stored totals against their expected values to catch data quality issues introduced during ingestion or transformation. For example, `TotalIncludingTax` should always equal `TotalExcludingTax` plus `TaxAmount`. Because SQL comparisons involving `NULL` never evaluate to true, also check for missing amounts explicitly so those rows aren't silently excluded.

```sql
SELECT SaleKey, TotalExcludingTax, TaxAmount, TotalIncludingTax,
       (TotalExcludingTax + TaxAmount) AS ExpectedTotalIncludingTax
FROM dbo.fact_sale
WHERE TotalExcludingTax IS NULL
   OR TaxAmount IS NULL
   OR TotalIncludingTax IS NULL
   OR TotalIncludingTax <> (TotalExcludingTax + TaxAmount);
```

## Find duplicate rows

Check the combination of business columns that should be unique together. If your invoice model allows at most one row per stock item on an invoice, the combination of `WWIInvoiceID` and `StockItemKey` should be unique.

```sql
SELECT WWIInvoiceID, StockItemKey, COUNT(*) AS NumberOfRows
FROM dbo.fact_sale
WHERE WWIInvoiceID IS NOT NULL
  AND StockItemKey IS NOT NULL
GROUP BY WWIInvoiceID, StockItemKey
HAVING COUNT(*) > 1;
```

You can also check for duplicates using a different combination of business columns, as a heuristic rather than a strict rule. It's unusual for the same salesperson to sell the same stock item to the same customer more than once on the same day, so more than one row for the combination of `CustomerKey`, `StockItemKey`, `InvoiceDateKey`, and `SalespersonKey` is worth reviewing as a possible duplicate. Confirm against the source system before treating a match as confirmed, since a legitimate repeat order on the same day is possible.

```sql
SELECT CustomerKey, StockItemKey, InvoiceDateKey, SalespersonKey, COUNT(*) AS NumberOfRows
FROM dbo.fact_sale
WHERE CustomerKey IS NOT NULL
  AND StockItemKey IS NOT NULL
  AND InvoiceDateKey IS NOT NULL
  AND SalespersonKey IS NOT NULL
GROUP BY CustomerKey, StockItemKey, InvoiceDateKey, SalespersonKey
HAVING COUNT(*) > 1;
```

## Validate content

Check that values fall within an expected set or range. For example, `Quantity` and `UnitPrice` should always be positive numbers.

```sql
SELECT SaleKey, Quantity, UnitPrice
FROM dbo.fact_sale
WHERE Quantity <= 0
   OR UnitPrice <= 0;
```

## Validate data with AI functions

For checks that are hard to express as simple predicates, use [AI functions](ai-functions.md) to reason about the content of a column in natural language. In `dbo.fact_sale`, `Description` often mentions whether a product is fresh, frozen, or chilled, so you can use `AI_GENERATE_RESPONSE` to check whether it's consistent with that row's `TotalDryItems` and `TotalChillerItems` counts. Define the instructions once as a `@prompt` variable, and pass the row-specific values as a separate data argument.

```sql
DECLARE @prompt nvarchar(max) = N'A product description that mentions frozen or chilled items should usually have a nonzero chiller item count, and a description that mentions only dry or ambient items should usually have a nonzero dry item count. Based on the description, dry item count, and chiller item count below, respond with OK if the values look consistent, or a short phrase describing what might be worth reviewing.';

DECLARE @InvoiceDate date = '2013-01-01';

SELECT SaleKey, Description, TotalDryItems, TotalChillerItems,
       AI_GENERATE_RESPONSE(
           @prompt,
           CONCAT(
               'Description: ', Description,
               '. Dry item count: ', TotalDryItems,
               '. Chiller item count: ', TotalChillerItems
           )
       ) AS ReviewNote
FROM dbo.fact_sale
WHERE InvoiceDateKey = @InvoiceDate;
```

Review possible inconsistencies with the source-system owner before correcting the source data.

## Next step

> [!div class="nextstepaction"]
> [Query data in your Warehouse](query-warehouse.md)

## Related content

- [Create tables in the warehouse](create-table.md)
- [Ingest data into your Warehouse](ingest-data-into-table.md)
- [AI functions in Fabric Data Warehouse](ai-functions.md)
