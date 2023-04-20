---
title: Lakehouse SQL Endpoint
description: Learn more about Lakehouse SQL Endpoint in Microsoft Fabric that provides analytical capabilities over the Lake data.
author: cynotebo
ms.author: cynotebo
ms.reviewer: wiassaf
ms.date: 04/12/2023
ms.topic: conceptual
ms.search.form: SQL Endpoint overview, Warehouse in workspace overview
---

# Lakehouse SQL Endpoint in Microsoft Fabric

**Applies to:** [!INCLUDE[fabric-se](includes/applies-to-version/fabric-se.md)]

[!INCLUDE [preview-note](../includes/preview-note.md)]

[!INCLUDE [product-name](../includes/product-name.md)] provides the SQL-based experience for every [Lakehouse](../data-engineering/lakehouse-overview.md) artifact in the workspace. This SQL-based experience is called the **[!INCLUDE [fabric-se](includes/fabric-se.md)]**. 

The [!INCLUDE [fabric-se](includes/fabric-se.md)] enables you to analyze data in the [Lakehouse](../data-engineering/lakehouse-overview.md) using T-SQL language and TDS endpoint.

When you create a [!INCLUDE [product-name](../includes/product-name.md)] [Lakehouse](../data-engineering/lakehouse-overview.md) and create Delta tables in the [Lakehouse](../data-engineering/lakehouse-overview.md), the [!INCLUDE [fabric-se](includes/fabric-se.md)] exposes the [Lakehouse](../data-engineering/lakehouse-overview.md) data as the set tables that reference your Delta Lake data. The tables enable you to query your data in the Lake using the T-SQL language. 

Each workspace can have more than one Lakehouse and every Lakehouse is getting its own [!INCLUDE [fabric-se](includes/fabric-se.md)].

Every delta table in a Lakehouse is represented as one table in the [!INCLUDE [fabric-se](includes/fabric-se.md)].

You can create your own T-SQL views, functions, and procedures on top of the tables that reference your Delta Lake data.

:::image type="content" source="media\lakehouse-sql-endpoint\lakehouse-delta-tables.png" alt-text="Diagram showing the relationship between the Lakehouse item, data warehouses, and delta tables." lightbox="media\lakehouse-sql-endpoint\lakehouse-delta-tables.png":::

> [!IMPORTANT]
> The distinction between the [!INCLUDE [fabric-se](includes/fabric-se.md)] and [Synapse Data Warehouse](warehouse.md) is an important one as T-SQL statements that write data or modify tables fail if you attempt to run them against the [!INCLUDE [fabric-se](includes/fabric-se.md)]. The [!INCLUDE [fabric-se](includes/fabric-se.md)] provides analytical/reporting capabilities over your lake data, but not the data management functionalities. In [Synapse Data Warehouse](warehouse.md) you can use T-SQL language to manage tables and update data, while in the [!INCLUDE [fabric-se](includes/fabric-se.md)] you are using Notebooks and Pipelines to update the underlying tables in the [Lakehouse](../data-engineering/lakehouse-overview.md). Throughout our documentation, we've called out specific features and functionality to align with the differing functionality.

## Automatically generated schema

For every Delta table in your [Lakehouse](../data-engineering/lakehouse-overview.md), the [!INCLUDE [fabric-se](includes/fabric-se.md)] is automatically generating one table. The column types in the [!INCLUDE [fabric-se](includes/fabric-se.md)] are derived from the source Delta types.

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
| **CHAR(n)** | varchar(n) with `Latin1_General_100_BIN2_UTF8` collation. |
| **STRING &#124; VARCHAR(n)** | varchar(n) with `Latin1_General_100_BIN2_UTF8` collation. STRING/VARCHAR(MAX) is mapped to varchar(8000). |
| **BINARY** | varbinary(n). |
| **DECIMAL &#124; DEC &#124; NUMERIC** | decimal(p,s) |

The columns that have the types that aren't listed in the table aren't represented as the table columns in the [!INCLUDE [fabric-se](includes/fabric-se.md)].

In the [!INCLUDE [product-name](../includes/product-name.md)] portal, the [!INCLUDE [fabric-se](includes/fabric-se.md)] is visualized with a data warehouse icon and under the **Type** column you see it listed as **[!INCLUDE [fabric-se](includes/fabric-se.md)]**. An important distinction for this [!INCLUDE [fabric-se](includes/fabric-se.md)] is that it's a read-only experience and support the T-SQL surface area needed for analytics and reporting.

## Customization of schema

The [!INCLUDE [fabric-se](includes/fabric-se.md)] manages the automatically generated tables so the workspace users can't modify them. The workspace users can enrich the database model by adding their own SQL schemas, views, procedures, and other database objects.
The tools that are accessing lake data can directly query the automatically generated tables or the views created on top of these tables.

## Datasets

When you create a [Lakehouse](../data-engineering/lakehouse-overview.md), a default Power BI dataset is created with the [!INCLUDE [fabric-se](includes/fabric-se.md)]. The default dataset is represented with the *(default)* suffix. For more information, see [Default datasets](datasets.md).

## Connectivity

For the current version, you'll primarily be using a TDS end point and SSMS or ADS to connect to and query your [!INCLUDE [fabric-se](includes/fabric-se.md)]. There's a limited user experience available in [!INCLUDE [product-name](../includes/product-name.md)] portal at this time, which is described in greater detail later, but we generally expect that most of the testing and interaction for your [!INCLUDE [fabric-se](includes/fabric-se.md)] will be via a tool such as [SQL Server Management Studio (SSMS)](https://aka.ms/ssms) or [Azure Data Studio (ADS)](https://aka.ms/azuredatastudio).

## How to delete a [!INCLUDE [fabric-se](includes/fabric-se.md)]

The [!INCLUDE [fabric-se](includes/fabric-se.md)] is automatically linked to its parent Lakehouse when it's created and can't be directly deleted. If you need to delete the [!INCLUDE [fabric-se](includes/fabric-se.md)], you must delete the parent Lakehouse.

Once the Lakehouse is deleted, you can't recover it or the custom SQL objects in the [!INCLUDE [fabric-se](includes/fabric-se.md)]; you have to recreate it.

## Known issues and limitations in the [!INCLUDE [fabric-se](includes/fabric-se.md)]

1. Tables in the [!INCLUDE [fabric-se](includes/fabric-se.md)] are created with a delay.

   Once you create or update Delta Lake folder/table in the lake, the warehouse table that references the lake data won't be immediately created/refreshed. The changes will be applied in the warehouse after 5-10 seconds.

## Limitations

- Currently, `Latin1_General_100_BIN2_UTF8` is the default and only supported collation for metadata and data in the [!INCLUDE [fabric-se](includes/fabric-se.md)].

- Non-delta tables (Parquet, CSV, AVRO) aren't supported. Data should be in delta format. [Delta Lake is an open-source storage framework](https://delta.io/) that enables building Lakehouse architecture.

   If you don't see a Lakehouse table in the [!INCLUDE [fabric-se](includes/fabric-se.md)], check the data format. Only the tables in Delta Lake format are available in the [!INCLUDE [fabric-se](includes/fabric-se.md)]. Parquet, CSV, and other formats can't be queried using the [!INCLUDE [fabric-se](includes/fabric-se.md)]. If you don't see your table, convert it to Delta Lake format. 

- You shouldn't manually create/drop tables in the [!INCLUDE [fabric-se](includes/fabric-se.md)].

   Don't use CREATE/ALTER/DROP TABLE statements. DDLs like CREATE TABLE and DROP TABLE aren't blocked in the [!INCLUDE [fabric-dw](includes/fabric-dw.md)]. You can create your own tables, or even drop the tables that reference Delta Lake data. 

   Workaround: If you've created your own table - drop it immediately. The user-defined tables aren't supported in the [!INCLUDE [fabric-se](includes/fabric-se.md)]. If you dropped the autogenerated tables, DO NOT try to manually create them. Make some change in the lake using Apache Spark notebook to force warehouse to recreate the table in the [!INCLUDE [fabric-se](includes/fabric-se.md)].

- Tables with renamed columns aren't supported.

   Don't rename the columns in the lake because the renamed columns aren't available in the [!INCLUDE [fabric-se](includes/fabric-se.md)].

   If you rename the columns, you need to recreate the table in the lake.

- Delta tables created outside of the `/tables` folder aren't available.

   If you don't see a Lakehouse table in the warehouse, check the location of the table. Only the tables that are referencing data in the `/tables` folder are available in the warehouse. The tables that reference data in the `/files` folder in the lake aren't exposed in the [!INCLUDE [fabric-se](includes/fabric-se.md)]. As a workaround, move your data to the `/tables` folder.

- Missing columns in the tables

   Some columns that exist in the Spark Delta tables might not be available in the tables in the warehouse. Only the columns with the following types are available in the warehouse tables: boolean, short, small, int, long, date, timestamp, float, double, decimal, varchar/char(truncated to 8 KB), binary (limited to 8 KB). The columns of the other types aren't be exposed in the warehouse tables. Unsupported data types should be converted. For example, the following types aren't available:

   - Complex types (arrays, struct, maps)
   - Binary/BSON
   - Long string (longer than 8 KB). All strings are limited to varchar(8000).

## Next steps

- [Default Power BI datasets](datasets.md)
- [Lakehouse](../data-engineering/lakehouse-overview.md)