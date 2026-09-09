---
title: "How to: Create scalar user-defined functions"
description: Learn how to create scalar user-defined functions, make functions inlineable, and rewrite calling queries for scalar UDF inlining in Microsoft Fabric Data Warehouse.
ms.reviewer: srdjanmatin
ms.date: 09/08/2026
ms.topic: how-to
# customer intent: Learn how to create scalar user-defined functions, make functions inlineable, and rewrite calling queries for scalar UDF inlining in Microsoft Fabric Data Warehouse.
---
# How to create scalar user-defined functions in Fabric Data Warehouse (preview)

**Applies to:** [!INCLUDE [fabric-se-and-dw](includes/applies-to-version/fabric-se-and-dw.md)]

Fabric Data Warehouse uses two inlining techniques to run scalar user-defined functions (UDFs) as part of distributed queries:

- ExprBlock inlining supports computation-based scalar UDFs that don't reference data in their function bodies, and it supports a wide variety of calling-query shapes.
- [Scalar UDF inlining in Fabric Data Warehouse (preview)](/sql/relational-databases/user-defined-functions/scalar-udf-inlining?view=fabric&preserve-view=true) has strict requirements for both the function definition and the calling query. For more information about the two techniques and their requirements, see [CREATE FUNCTION](/sql/t-sql/statements/create-function-sql-data-warehouse?view=fabric&preserve-view=true). 

> [!NOTE]
> Scalar UDFs are currently a preview feature in Fabric Data Warehouse.

In this article, learn how to convert a non-inlineable UDF into an inlinable function or create a non-inlineable UDF.

## Make a non-inlineable scalar UDF inlineable

The T-SQL code changes required to make a scalar UDF inlineable depend on which construct makes its definition non-inlineable.

The following examples show how to rewrite multiple `RETURN` statements, `@@ROWCOUNT`, and a time-dependent function in a data-access UDF.

### Replace multiple RETURN statements

The following function reads the customer type from a table and contains multiple `RETURN` statements. Because the function accesses table data, scalar UDF inlining requirements apply. Multiple `RETURN` statements make this definition non-inlineable.

Specify `WITH INLINE = AUTO` to create the function while you prepare to rewrite it:

```sql
CREATE OR ALTER FUNCTION dbo.GetDiscount (@CustomerID INT)
RETURNS DECIMAL(5, 2)
WITH INLINE = AUTO
AS
BEGIN
    DECLARE @CustomerType VARCHAR(20);

    SELECT @CustomerType = CustomerType
    FROM dbo.Customer
    WHERE CustomerID = @CustomerID;

    IF @CustomerType = 'Regular' RETURN 0.05;
    IF @CustomerType = 'Premium' RETURN 0.10;
    IF @CustomerType = 'VIP' RETURN 0.15;
    RETURN 0.01;
END;
GO
```

### Check whether the function is inlineable

The `sys.sql_modules` catalog view exposes two properties that describe scalar UDF inlineability:

- `is_inlineable` indicates whether the function definition is inlineable. A value of `1` means inlineable, and `0` means non-inlineable.
- `inline_eligibility_mask` identifies which inlining technique can process the function definition. For more information about the values, see [Check whether a scalar UDF can be inlined](/sql/t-sql/statements/create-function-sql-data-warehouse?view=fabric&preserve-view=true#check-whether-a-scalar-udf-can-be-inlined).

Use the following query to inspect `dbo.GetDiscount`:

```sql
SELECT
    SCHEMA_NAME(o.schema_id) AS function_schema,
    o.name AS function_name,
    m.is_inlineable,
    m.inline_eligibility_mask
FROM sys.sql_modules AS m
INNER JOIN sys.objects AS o
    ON m.object_id = o.object_id
WHERE o.type = 'FN'
    AND SCHEMA_NAME(o.schema_id) = 'dbo'
    AND o.name = 'GetDiscount';
GO
```

The metadata describes the function definition. For the initial definition of `dbo.GetDiscount`, `is_inlineable` is `0`.

Rewrite the function to assign the result to a local variable and use one final `RETURN` statement:

```sql
CREATE OR ALTER FUNCTION dbo.GetDiscount (@CustomerID INT)
RETURNS DECIMAL(5, 2)
AS
BEGIN
    DECLARE @Discount DECIMAL(5, 2) = 0.01;

    SELECT @Discount =
        CASE CustomerType
            WHEN 'Regular' THEN 0.05
            WHEN 'Premium' THEN 0.10
            WHEN 'VIP' THEN 0.15
            ELSE 0.01
        END
    FROM dbo.Customer
    WHERE CustomerID = @CustomerID;

    RETURN @Discount;
END;
GO
```

The revised function has one `RETURN` statement and meets the scalar UDF inlining requirements. Run the metadata query again to verify that `is_inlineable` is `1`.

> [!NOTE]
> ExprBlock inlining supports multiple `RETURN` statements. This example reads table data and therefore uses scalar UDF inlining, which requires a single `RETURN` statement.

### Replace @@ROWCOUNT with an initial value

The following data-access UDF uses `@@ROWCOUNT` to determine whether its query found a customer. `@@ROWCOUNT` isn't supported by scalar UDF inlining, so the definition is non-inlineable:

```sql
CREATE OR ALTER FUNCTION dbo.CustomerExists (@CustomerID INT)
RETURNS BIT
WITH INLINE = AUTO
AS
BEGIN
    DECLARE @CustomerExists BIT = 1;

    SELECT @CustomerExists = 1
    FROM dbo.Customer
    WHERE CustomerID = @CustomerID;

    IF @@ROWCOUNT = 0 SET @CustomerExists = 0;

    RETURN @CustomerExists;
END;
GO
```

Initialize the variable to the result for no matching row. The `SELECT` changes the value only when a row is found, which removes the need to inspect `@@ROWCOUNT`:

```sql
CREATE OR ALTER FUNCTION dbo.CustomerExists (@CustomerID INT)
RETURNS BIT
AS
BEGIN
    DECLARE @CustomerExists BIT = 0;

    SELECT @CustomerExists = 1
    FROM dbo.Customer
    WHERE CustomerID = @CustomerID;

    RETURN @CustomerExists;
END;
GO
```

Run the metadata query from the previous example with `CustomerExists` as the function name. The initial definition has `is_inlineable = 0`, and the revised definition has `is_inlineable = 1`.

### Pass a time-dependent value into a data-access UDF

The following function combines table access with `GETUTCDATE()`. Table access requires scalar UDF inlining, where a time-dependent function in the UDF body makes the definition non-inlineable:

```sql
CREATE OR ALTER FUNCTION dbo.GetCustomerTenureDays (@CustomerID INT)
RETURNS INT
WITH INLINE = AUTO
AS
BEGIN
    DECLARE @MemberSince DATE;

    SELECT @MemberSince = MemberSince
    FROM dbo.Customer
    WHERE CustomerID = @CustomerID;

    RETURN DATEDIFF(DAY, @MemberSince, GETUTCDATE());
END;
GO
```

Pass the current date and time into the function as a parameter instead:

```sql
CREATE OR ALTER FUNCTION dbo.GetCustomerTenureDays
(
    @CustomerID INT,
    @AsOfDate DATETIME2(6)
)
RETURNS INT
AS
BEGIN
    DECLARE @MemberSince DATE;

    SELECT @MemberSince = MemberSince
    FROM dbo.Customer
    WHERE CustomerID = @CustomerID;

    RETURN DATEDIFF(DAY, @MemberSince, @AsOfDate);
END;
GO
```

Evaluate `GETUTCDATE()` in the calling query and pass its value to the UDF:

```sql
SELECT
    CustomerID,
    CustomerName,
    dbo.GetCustomerTenureDays(CustomerID, GETUTCDATE()) AS TenureDays
FROM dbo.Customer
ORDER BY CustomerID;
GO
```

## Make a query inlineable

The query-shape requirements in this section apply when at least one UDF in a query relies on scalar UDF inlining. When every UDF in a query is handled by ExprBlock inlining, these query shapes work without the rewrites shown here.

The following examples use the inlineable, data-access version of `dbo.GetDiscount` from the previous section.

### Replace a common table expression

A query that uses a common table expression (CTE) can't inline a function that depends on scalar UDF inlining. The following query isn't supported:

```sql
WITH CustomerDiscounts AS
(
    SELECT
        CustomerID,
        CustomerName,
        dbo.GetDiscount(CustomerID) AS DiscountRate
    FROM dbo.Customer
)
SELECT CustomerID, CustomerName, DiscountRate
FROM CustomerDiscounts;
GO
```

Materialize the result in a temporary table, and then query the temporary table:

```sql
DROP TABLE IF EXISTS #CustomerDiscounts;
GO

CREATE TABLE #CustomerDiscounts
(
    CustomerID INT NOT NULL,
    CustomerName VARCHAR(100) NOT NULL,
    DiscountRate DECIMAL(5, 2) NOT NULL
)
WITH (DISTRIBUTION = ROUND_ROBIN);
GO

INSERT INTO #CustomerDiscounts
(
    CustomerID,
    CustomerName,
    DiscountRate
)
SELECT
    CustomerID,
    CustomerName,
    dbo.GetDiscount(CustomerID)
FROM dbo.Customer;
GO

SELECT CustomerID, CustomerName, DiscountRate
FROM #CustomerDiscounts;
GO
```

### Move a UDF call out of GROUP BY

The following query calls the UDF directly in the `GROUP BY` clause and isn't supported for a function that depends on scalar UDF inlining:

```sql
SELECT
    dbo.GetDiscount(CustomerID) AS DiscountRate,
    COUNT(*) AS CustomerCount
FROM dbo.Customer
GROUP BY dbo.GetDiscount(CustomerID);
GO
```

Calculate the UDF result in a derived table, and then group the result in the outer query:

```sql
SELECT
    DiscountRate,
    COUNT(*) AS CustomerCount
FROM
(
    SELECT dbo.GetDiscount(CustomerID) AS DiscountRate
    FROM dbo.Customer
) AS CustomerDiscounts
GROUP BY DiscountRate;
GO
```

### Use a column alias in ORDER BY

Avoid calling a UDF that depends on scalar UDF inlining directly in the `ORDER BY` clause. Project the result once and order by its column alias or column ordinal number:

```sql
SELECT
    CustomerID,
    CustomerName,
    dbo.GetDiscount(CustomerID) AS DiscountRate
FROM dbo.Customer
ORDER BY DiscountRate;
GO
```

## Create a non-inlineable scalar UDF

You might need a function for a standalone calculation even when its definition can't be inlined. For example, an application or report might call a UDF once to calculate a business metric.

The following function reads year-to-date revenue from the customer table, then uses a `WHILE` loop to add the average monthly revenue for each remaining month. Because the function accesses table data, it relies on scalar UDF inlining, which doesn't support `WHILE`. The function definition is therefore non-inlineable.

Use `WITH INLINE = AUTO` to allow the function to be created even though its definition isn't inlineable:

```sql
CREATE OR ALTER FUNCTION dbo.GetProjectedAnnualRevenue (@MonthsElapsed INT)
RETURNS DECIMAL(18, 2)
WITH INLINE = AUTO
AS
BEGIN
    DECLARE @YearToDateRevenue DECIMAL(38, 6);
    DECLARE @ProjectedRevenue DECIMAL(38, 6);
    DECLARE @MonthNumber INT = @MonthsElapsed + 1;

    IF @MonthsElapsed BETWEEN 1 AND 12
    BEGIN
        SELECT @YearToDateRevenue = SUM(YearToDateRevenue)
        FROM dbo.Customer;

        SET @ProjectedRevenue = @YearToDateRevenue;

        WHILE @MonthNumber <= 12
        BEGIN
            SET @ProjectedRevenue =
                @ProjectedRevenue + (@YearToDateRevenue / @MonthsElapsed);
            SET @MonthNumber = @MonthNumber + 1;
        END;
    END;

    RETURN @ProjectedRevenue;
END;
GO
```

Use a standalone call to calculate the metric once for the dashboard:

```sql
DECLARE @ProjectedAnnualRevenue DECIMAL(18, 2);

SET @ProjectedAnnualRevenue =
    dbo.GetProjectedAnnualRevenue(MONTH(GETUTCDATE()));

SELECT @ProjectedAnnualRevenue AS ProjectedAnnualRevenue;
GO
```

The query returns projected annual revenue based on average monthly revenue through the current UTC month.

`INLINE = AUTO` allows the function to be created, but it doesn't make a non-inlineable function eligible for use in a distributed query. For example, `dbo.GetProjectedAnnualRevenue` can't be used in a `SELECT ... FROM dbo.Customer` query.


## Related content

- [CREATE FUNCTION (Microsoft Fabric)](/sql/t-sql/statements/create-function-sql-data-warehouse?view=fabric&preserve-view=true)
- [Scalar UDF inlining](/sql/relational-databases/user-defined-functions/scalar-udf-inlining?view=fabric&preserve-view=true)
- [Temp tables in Fabric Data Warehouse](temp-tables.md)
