---
title: Warehouses and warehouse mode
description: Learn more about warehouses and warehouse mode.
ms.reviewer: WilliamDAssafMSFT
ms.author: cynotebo
author: cynotebo
ms.topic: conceptual
ms.date: 03/15/2023
---

# Warehouses and warehouse mode

> [!IMPORTANT]
> [!INCLUDE [product-name](../includes/product-name.md)] is currently in PREVIEW. This information relates to a prerelease product that may be substantially modified before it's released. Microsoft makes no warranties, expressed or implied, with respect to the information provided here.

This article describes warehouse and default warehouse functionality in [!INCLUDE [product-name](../includes/product-name.md)].

## Warehouse

The Warehouse functionality is a ‘traditional’ data warehouse and supports the full transactional T-SQL capabilities you would expect from an enterprise data warehouse. This warehouse is displayed in the [!INCLUDE [product-name](../includes/product-name.md)] portal with a warehouse icon, however under the Type column, you'll see the type listed as **Warehouse**. Where data is automatically loaded into the warehouse (default), you're fully in control of creating tables, loading, transforming and querying your data in the data warehouse using either the [!INCLUDE [product-name](../includes/product-name.md)] portal or T-SQL commands.

:::image type="content" source="media\warehouses-warehouse-mode\multiple-warehouse-list.png" alt-text="Screenshot of a warehouse list that shows distinction between warehouse and warehouse (default)." lightbox="media\warehouses-warehouse-mode\multiple-warehouse-list.png":::

> [!IMPORTANT]
> The distinction between Warehouse (default) and Warehouse is an important one as transactional T-SQL statements fail if you attempt to run them against the Warehouse (default) item. Throughout this document, we've called out specific features and functionality to align with the differing functionality of these two artifacts.

> [!NOTE]
> When you create a Lakehouse or a warehouse, a default Power BI dataset is created. This is represented with the (default) suffix. For more information, see Concept: Dataset (default)

### Known limitations with Warehouse

Model view layouts aren't currently saved.

## Default warehouse

When you load data into a [!INCLUDE [product-name](../includes/product-name.md)] Lakehouse workspace as Delta tables, a SQL based warehouse containing tables that reference your Delta Lake data is automatically created in that workspace for you. Every Delta Lake table from a Lakehouse is represented as one table in this automatically generated warehouse.

:::image type="content" source="media\warehouses-warehouse-mode\lakehouse-delta-tables.png" alt-text="Diagram showing the relationship between the Lakehouse artifact, data warehouses, and Delta Lake tables." lightbox="media\warehouses-warehouse-mode\lakehouse-delta-tables.png":::

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
| **CHAR(n)** | char(n) with Latin1_General_100_BIN2_UTF8 collation. |
| **STRING &#124; VARCHAR(n)** | varchar(n), (MAX) with Latin1_General_100_BIN2_UTF8 collation. STRING/VARCHAR(MAX) is mapped to varbinary(8000). |
| **BINARY** | varbinary(n). |
| **DECIMAL &#124; DEC &#124; NUMERIC** | decimal(p,s) |

The columns that have the types that aren't listed in the table won't be represented as the table columns in the default warehouse.

In the [!INCLUDE [product-name](../includes/product-name.md)] portal, this auto-generated warehouse is visualized with a data warehouse icon and under the Type column you see it listed as **Warehouse (default).** An important distinction for this default warehouse is that it's a read-only experience and doesn't support the full T-SQL surface area of a transactional data warehouse.

:::image type="content" source="media\warehouses-warehouse-mode\warehouse-default-list.png" alt-text="Screenshot showing a Warehouse(default) in a portal list." lightbox="media\warehouses-warehouse-mode\warehouse-default-list.png":::

For the current version, you'll primarily be using a TDS end point and SSMS or ADS to connect to and query your warehouse (default). There's a limited user experience available in [!INCLUDE [product-name](../includes/product-name.md)] portal at this time, which is described in greater detail later in this document, but we generally expect that the majority of the testing and interaction for warehouse (default) will be via SQL end-point connection to a tool such as SQL Server Management Studio (SSMS) or Azure Data Studio (ADS).

### Known issues and limitations in the default warehouse

1. Lakehouse tables in the warehouse (default) are created with a delay.

   Once you create or update Delta Lake folder/table in the lake, the warehouse table that references the lake data won't be immediately created/refreshed. The changes will be applied in the warehouse after 5-10 seconds.

1. Non-delta tables (Parquet, CSV, AVRO) aren't supported.

   If you don’t see a Lakehouse table in the warehouse (default), check the data format. Only the tables in Delta Lake format are available in the warehouse (default). Parquet, CSV, and other formats can't be queried using the warehouse (default).

   > [!IMPORTANT]
   > Workaround: Convert your tables to Delta Lake format.

1. You shouldn't manually create/drop tables in the warehouse(default).

   DDLs like CREATE TABLE and DROP TABLE aren't blocked in the warehouse. You can create your own tables, or even drop the tables that referencing Delta Lake data. Don't use CREATE/ALTER/DROP TABLE statements.

   Workaround: If you've created your own table - drop it immediately. The user-defined tables aren't supported in the warehouse(default). If you dropped the auto-generated tables, DO NOT try to manually create them. Make some change in the lake using Apache Spark notebook to force warehouse to create the table.

1. Tables with renamed columns aren't supported.

   Don’t rename the columns in the lake because the renamed columns won't be available in the warehouse.

   > [!IMPORTANT]
   > Workaround: Not applicable. If you rename the columns, you need to recreate the table in the lake.

1. Delta tables created outside of the tables folder aren't available.

   If you don’t see a Lakehouse table in the warehouse, check the location of the table. Only the tables that are referencing data in the /tables folder are available in the warehouse. The tables that reference data in a files folder in the lake won't appear in the warehouse.

   > [!IMPORTANT]
   > Workaround: Move your data to the /tables folder.

1. Missing columns in the tables

   Some columns that exist in the Spark Delta tables might not be available in the tables in the warehouse. Only the columns with the following types are available in the warehouse tables: boolean, short, small, int, long, date, timestamp, float, double, decimal, varchar/char(truncated to 8 KB), binary (limited to 8 KB). The columns of the other types won't be exposed in the warehouse tables. For example, the following types aren't available:

   - Complex types (arrays, struct, maps)
   - Binary/BSON
   - Long string (longer than 8 KB). All strings are limited to varchar(8000).

   > [!IMPORTANT]
   > Workaround: Convert unsupported data types.

## How to delete a default warehouse

> [!TIP]
> Applies to Warehouse (default)

The Warehouse (default) artifact is linked to its parent Lakehouse when it's automatically created and can't be directly deleted. If you need to delete the warehouse (default) artifact, you'll need to delete the parent Lakehouse.

### Known limitations

Once deleted, you can't recover a deleted Lakehouse, you'll have to recreate.

## What is warehouse mode

Warehouse mode in the Lakehouse allows a user to transition from the “Lake” view of the Lakehouse (which supports data engineering and Apache Spark) to the “SQL” experiences that a data warehouse would provide, supporting T-SQL. In warehouse mode the user has a subset of SQL commands that can define and query data objects but not manipulate the data. You can perform the following actions in your warehouse(default):

- Query the tables that reference data in your Delta Lake folders in the lake.
- Create views, inline TVFs, and procedures to encapsulate your semantics and business logic in T-SQL.
- Manage permissions on the objects.

Warehouse mode is primarily oriented towards designing your warehouse and BI needs and serving data.

## Next steps

- [Datasets](datasets.md)
