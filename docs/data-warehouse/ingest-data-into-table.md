---
title: Ingest Data in the Warehouse
description: Learn how to insert data in your Warehouse in Microsoft Fabric.
author: WilliamDAssafMSFT
ms.author: wiassaf
ms.reviewer: jovanpop, procha, salilkanade
ms.date: 01/09/2026
ms.topic: how-to
ms.search.form: Warehouse design and development # This article's title should not change. If so, contact engineering.
---
# Ingest data in the warehouse

**Applies to:** [!INCLUDE [fabric-dw](includes/applies-to-version/fabric-dw.md)]

In this article, you'll insert sample data into the table from an external data file, using the [COPY INTO (Transact-SQL)](/sql/t-sql/statements/copy-into-transact-sql?view=fabric&preserve-view=true) command.

The `COPY INTO` statement can load data into either an empty table or into a table that already contains data. For more information, see [Create tables in the warehouse](create-table.md).

## Prerequisites

- Use the [warehouse](create-warehouse.md) you created in previous steps.
- Choose your preferred query tool. This tutorial uses the [SQL query editor](sql-query-editor.md) in the Fabric portal, but you can [connect](how-to-connect.md) with any T‑SQL tool.

For more information on connecting to your [!INCLUDE [fabric-dw](includes/fabric-dw.md)] in the [!INCLUDE [product-name](../includes/product-name.md)], see the [Connectivity](connectivity.md).

## Ingest data from a Parquet file using the SQL query editor

You can copy data from a parquet file into `dbo.bing_covid` using the `COPY INTO` T-SQL command.

In the query editor, paste and run the following T‑SQL code:

```sql
COPY INTO dbo.bing_covid
FROM 'https://pandemicdatalake.blob.core.windows.net/public/curated/covid-19/bing_covid-19_data/latest/bing_covid-19_data.parquet'
WITH ( FILE_TYPE = 'PARQUET' );
```

Once executed, this statement will load the contents of the Parquet file into the table.

## Ingest data from a CSV file using the SQL query editor

You can copy data from a CSV file into the empty table `dbo.bing_covid` using the `COPY INTO` T-SQL command.

In the query editor, paste and run the following T‑SQL code:

```sql
COPY INTO dbo.bing_covid
FROM 'https://pandemicdatalake.blob.core.windows.net/public/curated/covid-19/bing_covid-19_data/latest/bing_covid-19_data.csv'
WITH ( FILE_TYPE = 'CSV', FIRSTROW=2);
```
    
Once executed, this statement will load the contents of the CSV file into the table.

Since the CSV file in this example includes a header row, we need to skip it by specifying the `FIRSTROW = 2` option.

## Next step

> [!div class="nextstepaction"]
> [Query data in your Warehouse](query-warehouse.md)

## Related content

- [Ingest data into the Warehouse](ingest-data.md)
