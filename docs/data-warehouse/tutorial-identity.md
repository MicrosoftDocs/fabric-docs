---
title: "How to: Use IDENTITY columns in Fabric Data Warehouse"
description: Learn how to use IDENTITY columns in Fabric Data Warehouse to create and manage surrogate keys.
ms.reviewer: procha
ms.date: 08/18/2026
ms.topic: how-to
ai-usage: ai-assisted
---

# Use IDENTITY columns in Fabric Data Warehouse

**Applies to:** [!INCLUDE [fabric-dw](includes/applies-to-version/fabric-dw.md)]

This tutorial explains how to use [IDENTITY columns in Fabric Data Warehouse](identity.md) to create and manage surrogate keys. You learn how to create tables with identity columns, insert data, insert explicit values with `IDENTITY_INSERT`, and reseed the identity range with `DBCC CHECKIDENT`.

## Prerequisites

- Access to a [!INCLUDE [fabric-dw](includes/fabric-dw.md)] item in a workspace with Contributor or higher permissions.
- A query tool. This tutorial uses the [SQL query editor in the [!INCLUDE [product-name](../includes/product-name.md)] portal](sql-query-editor.md), but you can use any T-SQL querying tool.
- A basic understanding of T-SQL.

## What is an IDENTITY column?

An `IDENTITY` column is a numeric column that automatically generates unique values for new rows. This behavior makes it ideal for implementing surrogate keys because each row gets a unique identifier without manual input.

## Create an IDENTITY column

To define an `IDENTITY` column, specify the `IDENTITY` keyword in the column definition of the `CREATE TABLE` T-SQL syntax:

```sql
CREATE TABLE { warehouse_name.schema_name.table_name | schema_name.table_name | table_name } (
    [column_name] BIGINT IDENTITY,
    [ ,... n ],
    -- Other columns here
);
```

## Create a table with an IDENTITY column

In this tutorial, you create a simpler version of the `Trip` table from the [NY Taxi open dataset](/azure/open-datasets/dataset-taxi-yellow?tabs=azureml-opendatasets) and add a `TripID` `IDENTITY` column. Each new row gets a `TripID` value that's unique in the table.

1. Define a table with an `IDENTITY` column:

   ```sql
    CREATE TABLE dbo.Trip
    (
        TripID               bigint IDENTITY,
        tpepPickupDateTime   datetime2(6),
        tpepDropoffDateTime  datetime2(6),
        passengerCount       int,
        tripDistance         float,
        fareAmount           float,
        totalAmount          float
    );
   ```

1. Use `COPY INTO` to ingest data into the table. When you use `COPY INTO` with an `IDENTITY` column, provide the column list and map it to columns in the source data.

   ```sql
    COPY INTO dbo.Trip (tpepPickupDateTime, tpepDropoffDateTime, passengerCount, tripDistance, fareAmount, totalAmount)
    FROM 'https://azureopendatastorage.blob.core.windows.net/nyctlc/yellow/puYear=2013/puMonth=1/*.parquet'
    WITH( FILE_TYPE = 'PARQUET');
   ```

1. Preview the data and the values assigned to the `IDENTITY` column:

   ```sql
   SELECT TOP 10 *
   FROM Trip;
   ```

   The output includes the automatically generated `TripID` value for each row.

   :::image type="content" source="media/tutorial-using-identity/results-copy-into-select.png" alt-text="Screenshot of the query results showing a table with the first 10 rows of a taxi trip dataset." lightbox="media/tutorial-using-identity/results-copy-into-select.png":::

   > [!IMPORTANT]
   > Your values might differ from the values in this article. `IDENTITY` columns produce values that are guaranteed unique, but the values aren't necessarily sequential or ordered, and gaps can occur.

1. Use `INSERT INTO` to ingest new rows:

   ```sql
    INSERT INTO dbo.Trip
    VALUES ('2026-01-01T00:00:00', '2013-01-01T00:12:00', 1, 2.4, 10.5, 13.0);
   ```

1. A column list is optional with `INSERT INTO`. When you provide one, specify the names of all columns for which you provide input data, except the `IDENTITY` column:

   ```sql
    INSERT INTO dbo.Trip (tpepPickupDateTime, tpepDropoffDateTime, passengerCount, tripDistance, fareAmount, totalAmount)
    VALUES ('2026-01-01T08:15:00', '2013-01-01T08:42:00', 2, 6.8, 24.5, 30.0);
   ```

1. Review the inserted rows:

   ```sql
    SELECT *
    FROM dbo.Trip
    WHERE CAST(tpepPickupDateTime AS date) = '2026-01-01';    
   ```

   Observe the values assigned to the new rows:

   :::image type="content" source="media/tutorial-using-identity/results-insert-into-select.png" alt-text="Screenshot of a table with two rows and six columns showing taxi trip data." lightbox="media/tutorial-using-identity/results-insert-into-select.png":::

## Insert explicit values with IDENTITY_INSERT

You might need to insert specific values into an identity column during data migration, when populating sentinel values, or when restoring data from a backup. Use [SET IDENTITY_INSERT](/sql/t-sql/statements/set-identity-insert-transact-sql?view=fabric&preserve-view=true) to enable these inserts.

In this section, you create a dimension table and use `IDENTITY_INSERT` to add sentinel rows with well-known key values.

1. Create a dimension table with an `IDENTITY` column:

   ```sql
   CREATE TABLE dbo.DimCustomer
   (
       CustomerKey BIGINT IDENTITY,
       CustomerName VARCHAR(100),
       CustomerType VARCHAR(20)
   );
   ```

1. Insert regular rows. The identity values are generated automatically:

   ```sql
   INSERT INTO dbo.DimCustomer (CustomerName, CustomerType)
   VALUES ('Contoso Ltd', 'Enterprise'),
          ('Fabrikam Inc', 'SMB'),
          ('Northwind Traders', 'Enterprise');
   ```

1. Enable `IDENTITY_INSERT` to add sentinel values. When `IDENTITY_INSERT` is `ON`, provide a column list that includes the identity column:

   ```sql
   SET IDENTITY_INSERT dbo.DimCustomer ON;

   INSERT INTO dbo.DimCustomer (CustomerKey, CustomerName, CustomerType)
   VALUES (-1, 'Unknown', 'Sentinel'),
          (-2, 'Not Applicable', 'Sentinel');

   SET IDENTITY_INSERT dbo.DimCustomer OFF;
   ```

1. After inserting explicit values, reseed the identity column with `DBCC CHECKIDENT` to ensure that future automatically generated values don't collide with inserted values:

   ```sql
   DBCC CHECKIDENT('dbo.DimCustomer', RESEED);
   ```

1. Verify that the sentinel rows appear alongside automatically generated rows:

   ```sql
   SELECT *
   FROM dbo.DimCustomer
   ORDER BY CustomerKey;
   ```

1. Insert a row and confirm that the automatically generated value doesn't conflict:

   ```sql
   INSERT INTO dbo.DimCustomer (CustomerName, CustomerType)
   VALUES ('Adventure Works', 'Enterprise');

   SELECT *
   FROM dbo.DimCustomer
   ORDER BY CustomerKey;
   ```

## Clean up tutorial resources

Optionally, drop the tables created during this tutorial:

```sql
DROP TABLE IF EXISTS dbo.Trip;
DROP TABLE IF EXISTS dbo.DimCustomer;
DROP TABLE IF EXISTS dbo.DimProduct;
```

## Related content

- [IDENTITY columns in Fabric Data Warehouse](identity.md)
- [SET IDENTITY_INSERT (Transact-SQL)](/sql/t-sql/statements/set-identity-insert-transact-sql?view=fabric&preserve-view=true)
- [DBCC CHECKIDENT (Transact-SQL)](/sql/t-sql/database-console-commands/dbcc-checkident-transact-sql?view=fabric&preserve-view=true)
- [Create tables in the Warehouse in Microsoft Fabric](create-table.md)
- [Migrate IDENTITY columns to Fabric Data Warehouse](migrate-identity-columns.md)
