---
title: Migrate IDENTITY columns to Fabric Data Warehouse
description: Learn how to migrate IDENTITY columns to Fabric Data Warehouse.
ms.reviewer: procha
ms.date: 08/18/2026
ms.topic: how-to
ai-usage: ai-assisted
---

# Migrate IDENTITY columns to Fabric Data Warehouse

**Applies to:** [!INCLUDE [fabric-dw](includes/applies-to-version/fabric-dw.md)]

This article describes how to use [SET IDENTITY_INSERT](/sql/t-sql/statements/set-identity-insert-transact-sql?view=fabric&preserve-view=true) and [DBCC CHECKIDENT](/sql/t-sql/database-console-commands/dbcc-checkident-transact-sql?view=fabric&preserve-view=true) to preserve existing identity values during migration from SQL Server, Azure SQL Database, or Azure Synapse Analytics, and ensure referential integrity.

## Key differences from other platforms

Before migrating, understand these differences in the `IDENTITY` implementation in Fabric Data Warehouse:

- `IDENTITY` columns support only the **bigint** data type.
- `SEED` and `INCREMENT` parameters aren't supported. The system manages values internally.
- Values are guaranteed unique but not necessarily sequential. Gaps can occur because of the distributed compute architecture.
- Fabric Data Warehouse doesn't enforce key constraints.

## Migration strategy

By using `IDENTITY_INSERT` support, you can migrate identity values directly into Fabric Data Warehouse tables that use `IDENTITY` columns:

1. Create destination tables in Fabric Data Warehouse with `IDENTITY` columns.
1. Use `SET IDENTITY_INSERT ON` to insert historical data with the original identity values preserved.
1. Run `DBCC CHECKIDENT` with `RESEED` to realign the identity range after migration.
1. Update foreign key references if needed.

This approach preserves the original identity values, maintains referential integrity across tables, and allows Fabric Data Warehouse to resume generating unique values after migration.

## Example: Migrate tables with IDENTITY columns

The following example migrates an `Orders` table from a source platform to Fabric Data Warehouse while preserving identity values.

### Step 1: Create a destination table with an IDENTITY column

Create the destination table in Fabric Data Warehouse. The primary key column uses `IDENTITY`:

```sql
CREATE TABLE dbo.Orders (
    OrderID BIGINT IDENTITY,
    OrderDate DATE,
    CustomerID BIGINT,
    TotalAmount DECIMAL(18, 2)
);
```

### Step 2: Migrate data with IDENTITY_INSERT

Use `SET IDENTITY_INSERT` to insert historical data with the original identity values. This method preserves existing IDs so relationships between tables remain intact.

```sql
-- Migrate Orders with original IDs
SET IDENTITY_INSERT dbo.Orders ON;

INSERT INTO dbo.Orders (OrderID, OrderDate, CustomerID, TotalAmount)
VALUES (101, '2025-01-15', 1, 5000.00),
       (102, '2025-02-20', 2, 3200.00),
       (103, '2025-03-10', 1, 7800.00),
       (104, '2025-04-05', 3, 1500.00);

SET IDENTITY_INSERT dbo.Orders OFF;
```

For larger datasets, you can use `COPY INTO` with `IDENTITY_INSERT`:

```sql
COPY INTO dbo.Orders (OrderID 1, OrderDate 2, CustomerID 3, TotalAmount 4)
FROM 'https://storage.blob.core.windows.net/migration/orders.csv'
WITH (
    FILE_TYPE = 'CSV',
    IDENTITY_INSERT = 'ON'
);
```

### Step 3: Reseed identity columns

After migrating data, run `DBCC CHECKIDENT` with `RESEED` on each table. This operation scans all used identity ranges and adjusts the next value to avoid collisions with migrated data:

```sql
DBCC CHECKIDENT('dbo.Orders', RESEED);
```

### Step 4: Verify the migration and test new inserts

Confirm that the migrated data is intact and that new inserts receive automatically generated values that don't overlap with migrated values:

```sql
-- Verify migrated data
SELECT * FROM dbo.Orders ORDER BY OrderID;

-- Insert a row that receives an automatically generated ID
INSERT INTO dbo.Orders (OrderDate, CustomerID, TotalAmount)
VALUES ('2025-05-01', 1, 2500.00);

-- Verify that new IDs don't overlap with migrated data
SELECT * FROM dbo.Orders ORDER BY OrderID;
```

## Best practices

- **Always reseed after migration.** Run `DBCC CHECKIDENT('table_name', RESEED)` after every table migration to prevent identity value collisions.
- **Use COPY INTO for large datasets.** For bulk migration of large tables, `COPY INTO` with `IDENTITY_INSERT ON` provides better performance than row-by-row `INSERT` statements.
- **Validate referential integrity.** After migration, verify that foreign key values in child tables reference valid rows in parent tables.

## Related content

- [IDENTITY columns in Fabric Data Warehouse](identity.md)
- [SET IDENTITY_INSERT (Transact-SQL)](/sql/t-sql/statements/set-identity-insert-transact-sql?view=fabric&preserve-view=true)
- [DBCC CHECKIDENT (Transact-SQL)](/sql/t-sql/database-console-commands/dbcc-checkident-transact-sql?view=fabric&preserve-view=true)
- [Tutorial: Use IDENTITY columns in Fabric Data Warehouse](tutorial-identity.md)