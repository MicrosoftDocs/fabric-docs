---
title: "How To: IDENTITY Columns in Fabric Data Warehouse"
description: Learn how to use IDENTITY columns in Fabric Data Warehouse to create and manage surrogate keys efficiently.
author: WilliamDAssafMSFT
ms.author: wiassaf
ms.reviewer: procha
ms.date: 11/04/2025
ms.topic: how-to
---

# Use IDENTITY columns to create surrogate keys in Fabric Data Warehouse

**Applies to:** [!INCLUDE [fabric-dw](includes/applies-to-version/fabric-dw.md)]

This tutorial explains how to use `IDENTITY` columns in Fabric Data Warehouse to create and manage surrogate keys efficiently.

[!INCLUDE [feature-preview-note](../includes/feature-preview-note.md)]

## Prerequisites

- Have access to a [!INCLUDE [fabric-dw](includes/fabric-dw.md)] item in a workspace, with Contributor or higher permissions.
- Choose your query tool. This tutorial features the SQL query editor in the [!INCLUDE [product-name](../includes/product-name.md)] portal, but you can use any T-SQL querying tool.
    - Use the [SQL query editor in the [!INCLUDE [product-name](../includes/product-name.md)] portal](sql-query-editor.md).
- Basic understanding of T-SQL.

## What is an IDENTITY column?

An `IDENTITY` column is a numeric column that automatically generates unique values for new rows. This makes it ideal for implementing surrogate keys, as it ensures each row receives a unique identifier without manual input.

## Create an IDENTITY column

To define an `IDENTITY` column, specify the keyword `IDENTITY` in the column definition of the `CREATE TABLE` T-SQL syntax:

```sql
CREATE TABLE { warehouse_name.schema_name.table_name | schema_name.table_name | table_name } (
    [column_name] BIGINT IDENTITY,
    [ ,... n ],
    -- Other columns here
);
```

> [!NOTE]
> In Fabric Data Warehouse, **bigint** is the only supported data type for `IDENTITY` columns. Additionally, the `seed` and `increment` properties of T-SQL `IDENTITY` aren't supported. For more information, see [IDENTITY columns](identity.md) and [IDENTITY (Transact-SQL)](/sql/t-sql/statements/create-table-transact-sql-identity-property?view=fabric&preserve-view=true). For more information on creating tables, see [Create tables in the Warehouse in Microsoft Fabric](create-table.md).

## Create a table with an IDENTITY column

In this tutorial, we'll create a simpler version of the `Trip` table from the [NY Taxi open dataset](/azure/open-datasets/dataset-taxi-yellow?tabs=azureml-opendatasets), and add a new `TripID` `IDENTITY` column to it. Each time a new row is inserted, `TripID` is assigned with a new value that's unique in the table.

1. Define a table with an `IDENTITY` column:

    ```sql
     CREATE TABLE dbo.Trip
     (
         TripID BIGINT IDENTITY,
         DateID int,
         MedallionID int,
         HackneyLicenseID int,
         PickupTimeID int,
         DropoffTimeID int
     );
    ```

1. Next, we use `COPY INTO` to ingest some data into this table. When using `COPY INTO` with an `IDENTITY` columns you must provide the column list, mapping to columns in the source data.
    
    ```sql
    COPY INTO Trip (DateID 1, MedallionID 2, HackneyLicenseID 3, PickupTimeID 4, DropoffTimeID 5)
    FROM 'https://nytaxiblob.blob.core.windows.net/2013/Trip2013'
    WITH
    (
        FILE_TYPE = 'CSV',
        FIELDTERMINATOR = '|',
        COMPRESSION = 'GZIP'
    );
    ```

1. We can preview the data and the values assigned to the `IDENTITY` column with a simple query:

    ```sql
    SELECT TOP 10 * 
    FROM Trip;
    ```
    
    The output includes the automatically generated value for the `TripID` column for each row.
    
    :::image type="content" source="media/tutorial-using-identity/results-copy-into-select.png" alt-text="Screenshot of the query results showing a table with the first 10 rows of a taxi trip dataset." lightbox="media/tutorial-using-identity/results-copy-into-select.png":::
    
    > [!IMPORTANT]
    > Your values might be different from the ones observed in this article. `IDENTITY` columns produce random values that are guaranteed to be unique, but there can be gaps in the sequences, and values might not be in order.

1. You can also use `INSERT INTO` to ingest new rows in your table.

    ```sql
    INSERT INTO dbo.Trip
    VALUES (20251104, 3524, 28804, 51931, 52252);
    ```

1. The column list can be provided with `INSERT INTO`, but it isn't required. When providing a column list, specify the name of all columns that you're providing input data for, except for the `IDENTITY` column:

    ```sql
    INSERT INTO dbo.Trip (DateID, MedallionID, HackneyLicenseID, PickupTimeID, DropoffTimeID)
    VALUES (20251104, 8410, 24939, 74609, 49583);
    ```

1. We can review the rows inserted with a simple query:

    ```sql
    SELECT *
    FROM dbo.Trip
    WHERE DateID = 20251104;
    ```

Observe the values assigned to the new rows:

:::image type="content" source="media/tutorial-using-identity/results-insert-into-select.png" alt-text="A table with two rows and six columns showing taxi trip data." lightbox="media/tutorial-using-identity/results-insert-into-select.png":::

## Related content

- [IDENTITY columns in Fabric Data Warehouse](identity.md)
- [Create tables in the Warehouse in Microsoft Fabric](create-table.md)
- [Migrate IDENTITY columns to Fabric Data Warehouse](migrate-identity-columns.md)