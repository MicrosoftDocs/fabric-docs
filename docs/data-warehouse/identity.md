---
title: IDENTITY Columns in Fabric Data Warehouse
description: Learn how to use IDENTITY columns in Fabric Data Warehouse.
ms.reviewer: procha
ms.date: 08/18/2026
ms.topic: concept-article
ai-usage: ai-assisted
---

# IDENTITY columns in Fabric Data Warehouse

**Applies to:** [!INCLUDE [fabric-dw](includes/applies-to-version/fabric-dw.md)]

In Fabric Data Warehouse, `IDENTITY` columns automatically generate new numeric values when you insert new rows into a table.

Surrogate keys are identifiers used in data warehousing to uniquely distinguish rows, independent of their natural keys. This article explains how to create and manage surrogate keys using `IDENTITY`, including inserting explicit values and reseeding.

## Why use an IDENTITY column?

`IDENTITY` columns eliminate manual key assignment, reducing the risk of errors and simplifying data ingestion. System-managed unique values are ideal as surrogate keys and primary keys. Compared with manual approaches, `IDENTITY` columns offer better performance because unique keys are generated automatically without extra query logic.

The **bigint** data type, required for `IDENTITY` columns, can store up to 9,223,372,036,854,775,807 positive integer values. This range ensures that each row receives a unique value in its `IDENTITY` column throughout the table's lifetime.

For a plan to migrate data with surrogate keys from other database platforms, see [Migrate IDENTITY columns to Fabric Data Warehouse](migrate-identity-columns.md).

## Syntax

To define an `IDENTITY` column in Fabric Data Warehouse, use the `IDENTITY` property in the column definition:

```syntaxsql
CREATE TABLE { warehouse_name.schema_name.table_name | schema_name.table_name | table_name } (
    [ column_name ] BIGINT IDENTITY ,
    [ ,...n ]
    -- Other columns here
);
```

The identity column doesn't need to be the first column in the table definition.

## How IDENTITY columns work

In Fabric Data Warehouse, you can't specify a custom starting value or increment. The system manages values internally to ensure uniqueness. `IDENTITY` columns always produce positive integer values. Each new row receives a new value, and uniqueness is guaranteed for as long as the table exists. Once a value is used, `IDENTITY` doesn't use that same value again. Gaps can appear in the values that the `IDENTITY` column produces.

### Allocation of values

Because of the distributed architecture of the warehouse engine, the `IDENTITY` property doesn't guarantee the order in which surrogate values are allocated. The property scales out across compute nodes to maximize parallelism without affecting load performance. As a result, value ranges from different ingestion tasks might not be sequential.

The following example illustrates this behavior:

```sql
-- Create a table with an IDENTITY column
CREATE TABLE dbo.Table1(
    Column1 BIGINT IDENTITY,
    Column2 VARCHAR(30) NULL
)

-- Ingestion task A
INSERT INTO dbo.Table1
VALUES (NULL), (NULL), (NULL), (NULL);

-- Ingestion task B
INSERT INTO dbo.Table1
VALUES (NULL), (NULL), (NULL), (NULL);

-- Review the data
SELECT * FROM dbo.Table1;
```

Sample result:

:::image type="content" source="media/identity-overview/allocation-of-values.png" alt-text="Screenshot of the result set of a query of a table with two columns labeled Column1 and Column2, showing eight rows of data. Column1 contains large numeric values, Column2 contains the text." lightbox="media/identity-overview/allocation-of-values.png" :::

In this example, `Ingestion task A` and `Ingestion task B` run sequentially as independent tasks. Although the tasks run consecutively, the first and last four rows have different identity key ranges in `dbo.Table1.Column1`. Gaps between the ranges assigned to task A and task B can also occur.

`IDENTITY` in Fabric Data Warehouse guarantees that all values in an `IDENTITY` column are unique as long as `IDENTITY_INSERT` isn't used, but gaps can occur in the ranges produced for an ingestion task.

## System metadata objects

The following system metadata objects are available and useful when designing and working with identity values in Fabric Data Warehouse.

### List identity columns with the sys.identity_columns system view

Use the [sys.identity_columns](/sql/relational-databases/system-catalog-views/sys-identity-columns-transact-sql?view=fabric&preserve-view=true) catalog view to list all identity columns in a warehouse. The following example lists all tables that contain an `IDENTITY` column, including the schema, table, and identity column names:

```sql
SELECT
    s.name AS SchemaName,
    t.name AS TableName,
    c.name AS IdentityColumnName
FROM
    sys.identity_columns AS ic
INNER JOIN
    sys.columns AS c ON ic.[object_id] = c.[object_id]
    AND ic.column_id = c.column_id
INNER JOIN
    sys.tables AS t ON ic.[object_id] = t.[object_id]
INNER JOIN
    sys.schemas AS s ON t.[schema_id] = s.[schema_id]
ORDER BY
    s.name, t.name;
```

In Fabric Data Warehouse, the `seed_value` and `increment_value` columns of `sys.identity_columns` return `NULL` and aren't updated after the identity column is created. The `last_value` column returns `NULL` by default, but switches permanently to `-1` after the first identity insert operation on the table.

### Insert values with IDENTITY_INSERT

By default, you can't insert values into an `IDENTITY` column. However, you might need to insert specific values during data migration, disaster recovery, or when you populate sentinel values, such as `-1` for "Unknown" in dimension tables.

Use [SET IDENTITY_INSERT](/sql/t-sql/statements/set-identity-insert-transact-sql?view=fabric&preserve-view=true) to temporarily allow explicit inserts into an identity column:

```sql
SET IDENTITY_INSERT dbo.DimCustomer ON;

INSERT INTO dbo.DimCustomer (CustomerKey, CustomerName, Email)
VALUES (-1, 'John Doe', 'john@contoso.com');

SET IDENTITY_INSERT dbo.DimCustomer OFF;
```

When `IDENTITY_INSERT` is `ON`:

- A column list is required with the `INSERT` statement.
- Only one table per session can have `IDENTITY_INSERT` set to `ON` at a time.

> [!IMPORTANT]
> After turning `IDENTITY_INSERT` off, [reseed identity values with DBCC CHECKIDENT](#reseed-identity-values-with-dbcc-checkident).

### Reseed identity values with DBCC CHECKIDENT

After you insert explicit values with `IDENTITY_INSERT`, use [DBCC CHECKIDENT](/sql/t-sql/database-console-commands/dbcc-checkident-transact-sql?view=fabric&preserve-view=true) to reseed the identity column. The `RESEED` operation scans all used and reserved identity ranges across distributed compute nodes to determine the correct next values, ensuring uniqueness and preventing key collisions.

```sql
DBCC CHECKIDENT('dbo.DimProduct', RESEED);
```

In Fabric Data Warehouse, `DBCC CHECKIDENT` supports only the `RESEED` option. The warehouse automatically determines the correct next value ranges, and you can't specify a custom reseed value. For more information, see [DBCC CHECKIDENT](/sql/t-sql/database-console-commands/dbcc-checkident-transact-sql?view=fabric&preserve-view=true).

## Limitations

For more information, see [IDENTITY columns](identity.md), [IDENTITY (Transact-SQL)](/sql/t-sql/statements/create-table-transact-sql-identity-property?view=fabric&preserve-view=true), and [Create tables in the Warehouse in Microsoft Fabric](create-table.md).

- Only the **bigint** data type is supported for `IDENTITY` columns in Fabric Data Warehouse. Other data types result in an error.
- Defining a seed and increment isn't supported. The system manages values internally.
- Adding an `IDENTITY` column to an existing table with `ALTER TABLE` isn't supported. Consider using [CREATE TABLE AS SELECT (CTAS)](/sql/t-sql/statements/create-table-as-select-azure-sql-data-warehouse?view=fabric&preserve-view=true) or [SELECT...INTO](/sql/t-sql/queries/select-into-clause-transact-sql?view=fabric&preserve-view=true) to create a copy of an existing table and add an `IDENTITY` column.
- Limitations apply to how `IDENTITY` columns are preserved when you create a table by selecting from another table with CTAS or `SELECT...INTO`. For more information, see the [Data types section of SELECT - INTO Clause (Transact-SQL)](/sql/t-sql/queries/select-into-clause-transact-sql?view=fabric&preserve-view=true#data-types).
- `DBCC CHECKIDENT` supports only the `RESEED` option. Specifying a custom reseed value or using `NORESEED` isn't supported.
- `IDENTITY` columns produce values that are guaranteed unique, but the values aren't necessarily sequential or ordered, and gaps can occur.

## Examples

### A. Create a table with an IDENTITY column

```sql
CREATE TABLE Employees (
    EmployeeID BIGINT IDENTITY,
    FirstName VARCHAR(50),
    LastName VARCHAR(50)
);
```

This statement creates an `Employees` table where every new row automatically receives a unique `EmployeeID` as a **bigint** value.

### B. Insert rows into a table with an identity column

When you provide values for every nonidentity column in their defined order, you don't need to specify a column list:

```sql
INSERT INTO Employees VALUES ('Quarantino', 'Esposito');
```

You can also provide a column list that omits the identity column:

```sql
INSERT INTO Employees (FirstName, LastName)
VALUES ('Ensi', 'Vasala');
```

### C. Insert explicit values with IDENTITY_INSERT

```sql
SET IDENTITY_INSERT dbo.Employees ON;

INSERT INTO dbo.Employees (EmployeeID, FirstName, LastName)
VALUES (100, 'Sentinel', 'Row');

SET IDENTITY_INSERT dbo.Employees OFF;
```

### D. Insert explicit values with COPY INTO

The `COPY INTO` statement supports the `IDENTITY_INSERT` option to ingest explicit values within the command. `COPY INTO` options override any session-level setting for `IDENTITY_INSERT`.

```sql
COPY INTO dbo.Employees (EmployeeID 1, FirstName 2, LastName 3)
FROM 'https://myaccount.blob.core.windows.net/myblobcontainer/folder1/'
WITH (
    FILE_TYPE = 'CSV',
    IDENTITY_INSERT = 'ON'
);
```

### E. Reseed a table after explicit inserts

```sql
DBCC CHECKIDENT('dbo.Employees', RESEED);
```

### F. Create a table with CREATE TABLE AS SELECT

Use CTAS to create a copy of a table and persist the `IDENTITY` property in the target table:

```sql
CREATE TABLE RetiredEmployees
AS SELECT * FROM Employees;
```

The column in the target table inherits the `IDENTITY` property from the source table. For limitations, see the [Data types section of SELECT - INTO Clause](/sql/t-sql/queries/select-into-clause-transact-sql?view=fabric&preserve-view=true#data-types).

### G. Create a table with SELECT...INTO

Use `SELECT...INTO` to create a copy of a table and persist the `IDENTITY` property in the target table:

```sql
SELECT *
INTO dbo.RetiredEmployees
FROM dbo.Employees
WHERE LastName = 'Esposito';
```

The column in the target table inherits the `IDENTITY` property from the source table. For limitations, see the [Data types section of SELECT - INTO Clause](/sql/t-sql/queries/select-into-clause-transact-sql?view=fabric&preserve-view=true#data-types).

## Next step

> [!div class="nextstepaction"]
> [Use IDENTITY columns in Fabric Data Warehouse](tutorial-identity.md)

## Related content

- [SET IDENTITY_INSERT (Transact-SQL)](/sql/t-sql/statements/set-identity-insert-transact-sql?view=fabric&preserve-view=true)
- [DBCC CHECKIDENT (Transact-SQL)](/sql/t-sql/database-console-commands/dbcc-checkident-transact-sql?view=fabric&preserve-view=true)
- [Create tables in the warehouse](create-table.md)
- [Migrate IDENTITY columns to Fabric Data Warehouse](migrate-identity-columns.md)
