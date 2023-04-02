---
title: SQL Endpoint
description: Learn more about SQL Endpoint.
ms.reviewer: wiassaf
ms.author: cynotebo
author: cynotebo
ms.topic: conceptual
ms.date: 03/15/2023
ms.search.form: SQL Endpoint overview, Warehouse in workspace overview
---

# SQL Endpoint

[!INCLUDE [preview-note](../includes/preview-note.md)]

When you load data into a [!INCLUDE [product-name](../includes/product-name.md)] Lakehouse workspace as Delta tables, a SQL-based experience containing tables that reference your Delta Lake data is automatically created in that workspace for you, called the SQL Endpoint. Every Delta Lake table from a Lakehouse is represented as one table.

Every Lakehouse has one SQL Endpoint and each workspace can have more than one Lakehouse.

:::image type="content" source="media\sql-endpoint\lakehouse-delta-tables.png" alt-text="Diagram showing the relationship between the Lakehouse item, data warehouses, and Delta Lake tables." lightbox="media\sql-endpoint\lakehouse-delta-tables.png":::

> [!IMPORTANT]
> The distinction between the SQL Endpoint and [Warehouse](warehouse.md) is an important one as T-SQL statements that write data or modify schema fail if you attempt to run them against the SQL Endpoint. Throughout our documentation, we've called out specific features and functionality to align with the differing functionality.

## Automatically generated schema

The table columns in automatically generated warehouses are derived from the source Delta types.

| **Delta Data Type** | **SQL Data** **Type (Mapped)** |
|---|---|
| **Long &#124;** **BIGINT** | bigint |
| **BOOLEAN &#124;** **BOOL** | bit |
| **INT &#124; INTEGER** | int |
| **TINYINT &#124; BYTE &#124;** **SMALLINT &#124; SHORT** | smallint |
| **DOUBLE** | float |
| **FLOAT &#124; REAL** | real |
| **DATE** | date |
| **TIMESTAMP** | datetime2 |
| **CHAR(n)** | char(n) with `Latin1_General_100_BIN2_UTF8` collation. |
| **STRING &#124; VARCHAR(n)** | varchar(n), (MAX) with `Latin1_General_100_BIN2_UTF8` collation. STRING/VARCHAR(MAX) is mapped to varbinary(8000). |
| **BINARY** | varbinary(n). |
| **DECIMAL &#124; DEC &#124; NUMERIC** | decimal(p,s) |

The columns that have the types that aren't listed in the table aren't represented as the table columns in the default warehouse.

In the [!INCLUDE [product-name](../includes/product-name.md)] portal, this auto-generated warehouse is visualized with a data warehouse icon and under the **Type** column you see it listed as **SQL Endpoint**. An important distinction for this default warehouse is that it's a read-only experience and doesn't support the full T-SQL surface area of a transactional data warehouse.

:::image type="content" source="media\sql-endpoint\warehouse-default-list.png" alt-text="Screenshot showing a Warehouse(default) in a portal list." lightbox="media\sql-endpoint\warehouse-default-list.png":::

## Connectivity

For the current version, you'll primarily be using a TDS end point and SSMS or ADS to connect to and query your SQL Endpoint. There's a limited user experience available in [!INCLUDE [product-name](../includes/product-name.md)] portal at this time, which is described in greater detail later, but we generally expect that the majority of the testing and interaction for your SQL Endpoint will be via a tool such as [SQL Server Management Studio (SSMS)](https://aka.ms/ssms) or [Azure Data Studio (ADS)](https://aka.ms/azuredatastudio).

## How to delete a SQL Endpoint

The SQL Endpoint is linked to its parent Lakehouse when it's automatically created and can't be directly deleted. If you need to delete the SQL Endpoint, you must delete the parent Lakehouse.

Once deleted, you can't recover a deleted Lakehouse; you have to recreate it.

## Known issues and limitations in the SQL Endpoint

1. Lakehouse tables in the SQL Endpoint are created with a delay.

   Once you create or update Delta Lake folder/table in the lake, the warehouse table that references the lake data won't be immediately created/refreshed. The changes will be applied in the warehouse after 5-10 seconds.

## Limitations

1. Non-delta tables (Parquet, CSV, AVRO) aren't supported.

   If you don't see a Lakehouse table in the SQL Endpoint, check the data format. Only the tables in Delta Lake format are available in the SQL Endpoint. Parquet, CSV, and other formats can't be queried using the SQL Endpoint. If you don't see your table, convert it to Delta Lake format.

1. You shouldn't manually create/drop tables in the warehouse(default).

   DDLs like CREATE TABLE and DROP TABLE aren't blocked in the warehouse. You can create your own tables, or even drop the tables that referencing Delta Lake data. Don't use CREATE/ALTER/DROP TABLE statements.

   Workaround: If you've created your own table - drop it immediately. The user-defined tables aren't supported in the warehouse(default). If you dropped the auto-generated tables, DO NOT try to manually create them. Make some change in the lake using Apache Spark notebook to force warehouse to create the table.

1. Tables with renamed columns aren't supported.

   Don't rename the columns in the lake because the renamed columns won't be available in the warehouse.

   If you rename the columns, you need to recreate the table in the lake.

1. Delta tables created outside of the tables folder aren't available.

   If you don't see a Lakehouse table in the warehouse, check the location of the table. Only the tables that are referencing data in the `/tables` folder are available in the warehouse. The tables that reference data in a files folder in the lake won't appear in the warehouse. As a workaround, move your data to the `/tables` folder.

1. Missing columns in the tables

   Some columns that exist in the Spark Delta tables might not be available in the tables in the warehouse. Only the columns with the following types are available in the warehouse tables: boolean, short, small, int, long, date, timestamp, float, double, decimal, varchar/char(truncated to 8 KB), binary (limited to 8 KB). The columns of the other types won't be exposed in the warehouse tables. Unsupported data types should be converted. For example, the following types aren't available:

   - Complex types (arrays, struct, maps)
   - Binary/BSON
   - Long string (longer than 8 KB). All strings are limited to varchar(8000).

## Next steps

- [Default datasets](datasets.md)
