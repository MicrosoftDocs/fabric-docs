---
title: "Create scalar user-defined functions"
description: Learn how to create scalar user-defined functions, make functions inlineable, and rewrite calling queries for scalar UDF inlining in Microsoft Fabric Data Warehouse.
ms.reviewer: srdjanmatin
ms.date: 11/10/2026
ms.topic: how-to
ai-usage: ai-assisted
# customer intent: Learn how to create scalar user-defined functions, make functions inlineable, and rewrite calling queries for scalar UDF inlining in Microsoft Fabric Data Warehouse.
---
# Create scalar user-defined functions

**Applies to:** [!INCLUDE [fabric-se-and-dw](includes/applies-to-version/fabric-se-and-dw.md)]

Microsoft Fabric Data Warehouse uses Expression Block inlining and Scalar UDF inlining to run scalar user-defined functions (UDFs) as part of distributed queries. Eligible functions are inlined automatically during query compilation.

For supported function constructs and calling-query requirements, see [Inlining of scalar UDF](/sql/t-sql/statements/create-function-sql-data-warehouse?view=fabric&preserve-view=true#inlining-of-scalar-udf).

## Create an inlineable scalar UDF

Use `CREATE FUNCTION` to define a function, or `CREATE OR ALTER FUNCTION` to create or update it. By default, the definition must be eligible for at least one inlining technique. If it isn't, the statement returns an error explaining why the definition doesn't meet the inlining requirements.

The following function checks whether a number is prime. A prime number is a whole number greater than 1 that divides evenly only by 1 and itself. The function uses a loop to try possible divisors and returns `1` for prime numbers or `0` otherwise.

```sql
CREATE OR ALTER FUNCTION dbo.IsPrime (@Number INT)
RETURNS BIT
AS
BEGIN
    IF @Number IS NULL OR @Number < 2
        RETURN 0;

    DECLARE @Divisor INT = 2;

    WHILE @Divisor <= @Number / @Divisor
    BEGIN
        IF @Number % @Divisor = 0
            RETURN 0;

        SET @Divisor = @Divisor + 1;
    END;

    RETURN 1;
END;
GO
```

Use `GENERATE_SERIES` to call the function for each number from 1 through 20:

```sql
SELECT
    Series.value AS Number,
    dbo.IsPrime(Series.value) AS IsPrime
FROM GENERATE_SERIES(1, 20) AS Series
ORDER BY Series.value;
GO
```

The result contains 20 rows. `IsPrime` is `1` for 2, 3, 5, 7, 11, 13, 17, and 19, and `0` for the other numbers.

Check which inlining technique supports this function:

```sql
SELECT is_inlineable, inline_eligibility_mask
FROM sys.sql_modules
WHERE object_id = OBJECT_ID('dbo.IsPrime');
GO
```

For `dbo.IsPrime`, the expected values are `is_inlineable = 1` and `inline_eligibility_mask = 2`.

The function is eligible for Expression Block inlining. Its `WHILE` loop rules out Scalar UDF inlining.

<a id="make-a-non-inlineable-scalar-udf-inlineable"></a>

## Adapt a function for Scalar UDF inlining

The previous example uses Expression Block inlining. The following examples read table data and require Scalar UDF inlining for distributed queries. The rewrites in this section address that technique's requirements.

### Set up sample data

In a warehouse, run the following script to create and populate `dbo.Customer` for the remaining examples.

On a SQL analytics endpoint, use an existing table with the columns shown in the following example.

```sql
CREATE TABLE dbo.Customer
(
    CustomerID INT NOT NULL,
    CustomerName VARCHAR(100) NOT NULL,
    CustomerType VARCHAR(20) NOT NULL,
    MemberSince DATE NOT NULL,
    YearToDateRevenue DECIMAL(18, 2) NOT NULL
);
GO

INSERT INTO dbo.Customer
(
    CustomerID,
    CustomerName,
    CustomerType,
    MemberSince,
    YearToDateRevenue
)
VALUES
    (1, 'Customer 1', 'Regular', '2020-01-15', 12000.00),
    (2, 'Customer 2', 'Premium', '2022-06-01', 24000.00),
    (3, 'Customer 3', 'VIP',     '2024-03-10', 36000.00);
GO
```

### Replace multiple RETURN statements

The following function reads the customer type from a table and contains multiple `RETURN` statements. Multiple `RETURN` statements make this definition non-inlineable.

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

#### Check whether the function is inlineable

The `sys.sql_modules` catalog view provides two properties that describe scalar UDF inlineability:

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
    AND o.object_id = OBJECT_ID('dbo.GetDiscount');
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

The revised function has one `RETURN` statement and meets the Scalar UDF inlining requirements. Run the metadata query again to verify that `is_inlineable` is `1`.

> [!NOTE]
> Expression Block inlining supports multiple `RETURN` statements. Scalar UDF inlining requires a single `RETURN` statement.

<a id="replace-rowcount-with-an-initial-value"></a>

### Replace @@ROWCOUNT with EXISTS

The following data-access UDF uses `@@ROWCOUNT` to determine whether its query found a customer. Scalar UDF inlining doesn't support `@@ROWCOUNT`, so the definition is non-inlineable:

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

Use `EXISTS` to check for a matching customer and set the result to `1` when found. Otherwise, the initialized value remains `0`:

```sql
CREATE OR ALTER FUNCTION dbo.CustomerExists (@CustomerID INT)
RETURNS BIT
AS
BEGIN
    DECLARE @CustomerExists BIT = 0;

    IF EXISTS
    (
        SELECT 1
        FROM dbo.Customer
        WHERE CustomerID = @CustomerID
    )
        SET @CustomerExists = 1;

    RETURN @CustomerExists;
END;
GO
```

Run the metadata query from the previous example with `CustomerExists` as the function name. The initial definition has `is_inlineable = 0`, and the revised definition has `is_inlineable = 1`.

### Pass a time-dependent value into a data-access UDF

The following function combines table access with `GETUTCDATE()`. Scalar UDF inlining doesn't support `GETUTCDATE()` in the function body, so this definition is non-inlineable:

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

<a id="make-a-query-inlineable"></a>

## Adapt a calling query for Scalar UDF inlining

The query shape requirements in this section apply when at least one UDF in a query relies on Scalar UDF inlining. When every UDF in a query is handled by Expression Block inlining, these query shapes work without the rewrites shown here.

The following examples use the inlineable, data-access version of `dbo.GetDiscount` from the previous section.

### Replace a common table expression

Scalar UDF inlining doesn't support common table expressions (CTEs) in the calling query. The following query isn't supported:

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

In Warehouse, materialize the result in a temporary table, and then query it. Run all batches in this example in the same SQL session.

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

Calling a UDF directly in `GROUP BY` isn't supported by Scalar UDF inlining:

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

For Scalar UDF inlining, project the UDF result in the `SELECT` list and order by its column alias or column ordinal number:

```sql
SELECT
    CustomerID,
    CustomerName,
    dbo.GetDiscount(CustomerID) AS DiscountRate
FROM dbo.Customer
ORDER BY DiscountRate;
GO
```

<a id="create-a-non-inlineable-scalar-udf"></a>

## Create a function for standalone execution with INLINE = AUTO

You might need a function for a standalone calculation even when its definition can't be inlined. For example, an application or report might call a UDF once to calculate a business metric.

The following function reads year-to-date revenue from the customer table, then uses a `WHILE` loop to add the average monthly revenue for each remaining month. Table access rules out Expression Block inlining. `WHILE` rules out Scalar UDF inlining. The definition is therefore non-inlineable, but you can create it for supported standalone execution.

Use `WITH INLINE = AUTO` to allow the function to be created even though its definition isn't inlineable:

```sql
CREATE OR ALTER FUNCTION dbo.GetProjectedAnnualRevenue (@MonthsElapsed INT)
RETURNS DECIMAL(18, 2)
WITH INLINE = AUTO
AS
BEGIN
    DECLARE @YearToDateRevenue DECIMAL(38, 6);
    DECLARE @ProjectedRevenue DECIMAL(38, 6);

    IF @MonthsElapsed BETWEEN 1 AND 12
    BEGIN
        DECLARE @MonthNumber INT = @MonthsElapsed + 1;

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
