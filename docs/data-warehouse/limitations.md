---
title: Limitations and known issues
description: This article contains a list of current limitations and known issues in Microsoft Fabric.
author: cynotebo
ms.author: cynotebo
ms.reviewer: wiassaf
ms.date: 05/23/2023
ms.topic: conceptual
---

# Limitations and known issues in Microsoft Fabric

**Applies to:** [!INCLUDE[fabric-se-dw](includes/applies-to-version/fabric-se-and-dw.md)]

[!INCLUDE [preview-note](../includes/preview-note.md)]

This article details the current limitations and known issues in [!INCLUDE [product-name](../includes/product-name.md)].

## Limitations

- At this time, there's limited T-SQL functionality. See [T-SQL surface area](tsql-surface-area.md) for a list of T-SQL commands that are currently not available.

For more limitations information in specific areas, see:

- [Data types in Microsoft Fabric](data-types.md)
- [Datasets](datasets.md#limitations)
- [Delta lake logs](query-delta-lake-logs.md#limitations)
- [Statistics](statistics.md#limitations)
- [Transactions](transactions.md#limitations)
- [The Visual Query editor](visual-query-editor.md#limitations-with-visual-query-editor)

## Known issues

- Model view layouts aren't currently saved.

## Limitations and known issues of the SQL Endpoint of the Lakehouse

The following limitations apply to [!INCLUDE [fabric-se](includes/fabric-se.md)] automatic schema generation and metadata discovery.

- You can't query tables with renamed columns.

- You can't load case sensitive tables to data warehouse (for example, "Cat", "cat", and "CAT" are all read as the same table name by SQL). Duplicate table names can cause the data warehouse to fail. Use unique table and file names for all items in a warehouse.

- Non-delta tables (Parquet, CSV, AVRO) aren't supported in the Lakehouse. Data should be in delta format. [Delta Lake is an open-source storage framework](https://delta.io/) that enables building Lakehouse architecture.

   If you don't see a Lakehouse table in the [!INCLUDE [fabric-se](includes/fabric-se.md)], check the data format. Only the tables in Delta Lake format are available in the [!INCLUDE [fabric-se](includes/fabric-se.md)]. Parquet, CSV, and other formats can't be queried using the [!INCLUDE [fabric-se](includes/fabric-se.md)]. If you don't see your table, convert it to Delta Lake format. 

- Tables with renamed columns aren't supported in the [!INCLUDE [fabric-se](includes/fabric-se.md)]. Don't rename the columns in the lake because the renamed columns aren't available. If you rename the columns, you need to recreate the table in the lake.

- Delta tables created outside of the `/tables` folder aren't available in the [!INCLUDE [fabric-se](includes/fabric-se.md)].

   If you don't see a Lakehouse table in the warehouse, check the location of the table. Only the tables that are referencing data in the `/tables` folder are available in the warehouse. The tables that reference data in the `/files` folder in the lake aren't exposed in the [!INCLUDE [fabric-se](includes/fabric-se.md)]. As a workaround, move your data to the `/tables` folder.

- Some columns that exist in the Spark Delta tables might not be available in the tables in the [!INCLUDE [fabric-se](includes/fabric-se.md)]. Only the columns with the following types are available in the warehouse tables: boolean, short, small, int, long, date, timestamp, float, double, decimal, varchar/char(truncated to 8 KB), binary (limited to 8 KB). The columns of the other types aren't be exposed in the warehouse tables. Unsupported data types should be converted. For example, the following types aren't available:

   - Complex types (arrays, struct, maps)
   - Binary/BSON
   - Long string (longer than 8 KB). All strings are limited to varchar(8000).

## Next steps

- [T-SQL Surface Area in Microsoft Fabric](tsql-surface-area.md)