---
title: "How To: Query Using Time Travel at the Statement Level"
description: Learn from samples and examples of querying a warehouse using time travel at the statement level.
author: WilliamDAssafMSFT
ms.author: wiassaf
ms.reviewer: ajagadish # Microsoft alias
ms.date: 06/20/2025
ms.topic: how-to
---
# How to: Query using time travel at the statement level

In Microsoft Fabric, the capability to [time travel](time-travel.md) unlocks the ability to query the prior versions of data without the need to generate multiple data copies, saving on storage costs. This article describes how to query warehouse tables using time travel at the statement level, using the T-SQL [OPTION clause](/sql/t-sql/queries/option-clause-transact-sql?view=fabric&preserve-view=true) and the [FOR TIMESTAMP AS OF](/sql/t-sql/queries/hints-transact-sql-query?view=fabric&preserve-view=true#for-timestamp) syntax.

Warehouse tables can be queried up to a retention period of thirty calendar days using the `OPTION` clause, providing the date format `yyyy-MM-ddTHH:mm:ss[.fff]`.

The following examples can be executed in the [SQL Query Editor](sql-query-editor.md), [SQL Server Management Studio (SSMS)](/sql/ssms/download-sql-server-management-studio-ssms), [the mssql extension with Visual Studio Code](/sql/tools/visual-studio-code/mssql-extensions?view=fabric&preserve-view=true), or any T-SQL query editor.

> [!NOTE]
> Currently, only the Coordinated Universal Time (UTC) time zone is used for time travel.

## Time travel on a warehouse table

This example shows how to time travel on an individual table in warehouse.

The [OPTION T-SQL clause](/sql/t-sql/queries/option-clause-transact-sql?view=fabric&preserve-view=true) specifies the point-in-time to return the data.

```sql
/* Time travel using a SELECT statement */
SELECT *
FROM [dbo].[dimension_customer]
OPTION (FOR TIMESTAMP AS OF '2024-05-02T20:44:13.700');
```

## Time travel on multiple warehouse tables

The [OPTION Clause](/sql/t-sql/queries/option-clause-transact-sql?view=fabric&preserve-view=true) is declared once per query, and the results of the query will reflect the state of the data at the timestamp specified in the query for all tables.

```sql
SELECT Sales.StockItemKey, 
Sales.Description, 
CAST (Sales.Quantity AS int)) AS SoldQuantity, 
c.Customer
FROM [dbo].[fact_sale] AS Sales INNER JOIN [dbo].[dimension_customer] AS c
ON Sales.CustomerKey = c.CustomerKey
GROUP BY Sales.StockItemKey, Sales.Description, Sales.Quantity, c.Customer
ORDER BY Sales.StockItemKey
OPTION (FOR TIMESTAMP AS OF '2024-05-02T20:44:13.700');
```

### Time travel in a stored procedure

Stored procedures are a set of SQL statements that are precompiled and stored so that it can be used repeatedly. The [OPTION clause](/sql/t-sql/queries/option-clause-transact-sql?view=fabric&preserve-view=true) can be declared once in the stored procedure, and the result set reflects the state of all tables at the timestamp specified.

The `FOR TIMESTAMP AS OF` clause cannot directly accept a variable, as values in this `OPTION` clause must be deterministic. You can use [sp_executesql](/sql/relational-databases/system-stored-procedures/sp-executesql-transact-sql?view=fabric&preserve-view=true) to pass a strongly typed **datetime** value to the stored procedure. This simple example passes a variable and converts the **datetime** parameter to the necessary format with [date style 126](/sql/t-sql/functions/cast-and-convert-transact-sql?view=fabric&preserve-view=true#date-and-time-styles).

```sql
CREATE PROCEDURE [dbo].[sales_by_city] (@pointInTime DATETIME)
AS
BEGIN
DECLARE @selectForTimestampStatement NVARCHAR(4000);
DECLARE @pointInTimeLiteral VARCHAR(33);

SET @pointInTimeLiteral = CONVERT(VARCHAR(33), @pointInTime, 126);
SET @selectForTimestampStatement = '
SELECT *
    FROM [dbo].[fact_sale] 
    OPTION (FOR TIMESTAMP AS OF ''' + @pointInTimeLiteral + ''')';
 
    EXEC sp_executesql @selectForTimestampStatement
END
```

Then, you can call the stored procedure and pass in a variable as a strongly typed parameter. For example:

```sql
--Execute the stored procedure
DECLARE @pointInTime DATETIME;
SET @pointInTime = '2024-05-10T22:56:15.457';
EXEC dbo.sales_by_city @pointInTime;
```

Or, for example:

```sql
--Execute the stored procedure
DECLARE @pointInTime DATETIME;
SET @pointInTime = DATEADD(dd, -7, GETDATE())
EXEC dbo.sales_by_city @pointInTime;
```

### Time travel in a view

Views represent a saved query that dynamically retrieves data from one or more tables whenever the view is queried. The [OPTION clause](/sql/t-sql/queries/option-clause-transact-sql?view=fabric&preserve-view=true) can be used to query the views so that the results reflect the state of data at the timestamp specified in the query.

```sql
--Create View
CREATE VIEW Top10CustomersView
AS
SELECT TOP (10) 
    FS.[CustomerKey], 
    DC.[Customer], 
    SUM(FS.TotalIncludingTax) AS TotalSalesAmount
FROM 
    [dbo].[dimension_customer] AS DC
INNER JOIN 
    [dbo].[fact_sale] AS FS ON DC.[CustomerKey] = FS.[CustomerKey]
GROUP BY 
    FS.[CustomerKey], 
    DC.[Customer]
ORDER BY 
    TotalSalesAmount DESC;

/*View of Top10 Customers as of a point in time*/
SELECT *
FROM [Timetravel].[dbo].[Top10CustomersView]
OPTION (FOR TIMESTAMP AS OF '2024-05-01T21:55:27.513'); 
```

- The historical data from tables in a view can only be queried for time travel beginning from the time the view was created.
- After a view is altered, time travel queries are only valid after it was altered.
- If an underlying table of a view is altered without changing the view, time travel queries on the view can return the data from before the table change, as expected.
- When the underlying table of a view is dropped and recreated without modifying the view, data for time travel queries is only available from the time after the table was recreated.

### Time travel for DML operations

Data Manipulation Language (DML) is used to insert, create and populate the tables by manipulating and transforming the existing data. The [OPTION clause](/sql/t-sql/queries/option-clause-transact-sql?view=fabric&preserve-view=true) and `OPTION (FOR TIMESTAMP AS OF ... ` can be used along with DML operations such as `INSERT INTO ... SELECT`, `CREATE TABLE AS SELECT` (CTAS), and `SELECT INTO`.

```sql
/*Time travel for INSERT INTO...SELECT*/
INSERT INTO dbo.Fact_Sale_History 
(SalesKey, StockItemKey, Quantity, Description, UnitPrice, InvoiceDateKey)
SELECT 
    SaleKey AS SalesKey,
    StockItemKey,
    Quantity,
    Description,
    UnitPrice,
    InvoiceDateKey
FROM dbo.[Fact_Sale]
OPTION (FOR TIMESTAMP AS OF '2025-06-18T19:55:13.853');
```

```sql
/*Time travel for CREATE TABLE AS SELECT*/
CREATE TABLE dbo.SalesHistory AS 
SELECT * FROM dbo.fact_sale 
OPTION (FOR TIMESTAMP AS OF '2025-06-18T19:55:13.853');
```

```sql
/*Time travel for SELECT INTO*/
SELECT * INTO dbo.SalesHistory1 
FROM dbo.fact_sale 
OPTION (FOR TIMESTAMP AS OF '2025-06-18T19:55:13.853');
```

## Limitations

For more information on time travel at the statement level limitations with `FOR TIMESTAMP AS OF`, see [Time travel Limitations](time-travel.md#limitations).

## Related content

- [Query data as it existed in the past](time-travel.md)

