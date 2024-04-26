---
title: Ingest data into your Warehouse using the COPY statement
description: Follow steps to ingest data into a Warehouse with the COPY statement in Microsoft Fabric.
author: WilliamDAssafMSFT
ms.author: wiassaf
ms.reviewer: procha
ms.date: 04/24/2024
ms.service: fabric
ms.subservice: data-warehouse
ms.topic: how-to
ms.custom:
  - build-2023
  - ignite-2023
ms.search.form: Ingesting data
---

# Ingest data into your Warehouse using the COPY statement

**Applies to:** [!INCLUDE [fabric-dw](includes/applies-to-version/fabric-dw.md)]

The COPY statement is the primary way to ingest data into [!INCLUDE [fabric-dw](includes/fabric-dw.md)] tables. COPY performs high high-throughput data ingestion from an external Azure storage account, with the flexibility to configure source file format options, a location to store rejected rows, skipping header rows, and other options. 

This tutorial shows data ingestion examples for a [!INCLUDE [fabric-dw](includes/fabric-dw.md)] table using the T-SQL COPY statement. It uses the Bing COVID-19 sample data from the Azure Open Datasets. For details about this data, including its schema and usage rights, see [Bing COVID-19](/azure/open-datasets/dataset-bing-covid-19?tabs=azure-storage).

> [!NOTE]
> To learn more about the T-SQL COPY statement including more examples and the full syntax, see [COPY (Transact-SQL)](/sql/t-sql/statements/copy-into-transact-sql?view=fabric&preserve-view=true).

## Create a table

Before you use the COPY statement, the destination table needs to be created. To create the destination table for this sample, use the following steps: 

1. In your [!INCLUDE [product-name](../includes/product-name.md)] workspace, find and open your warehouse.

1. Switch to the **Home** tab and select **New SQL query**.

    :::image type="content" source="media/ingest-data-copy/new-sql-query.png" alt-text="Screenshot of the top section of the user's workspace showing the New SQL query button." lightbox="media/ingest-data-copy/new-sql-query.png":::

1. To create the table used as the destination in this tutorial, run the following code:
    
    ```sql
    CREATE TABLE [dbo].[bing_covid-19_data]
    (
        [id] [int] NULL,
        [updated] [date] NULL,
        [confirmed] [int] NULL,
        [confirmed_change] [int] NULL,
        [deaths] [int] NULL,
        [deaths_change] [int] NULL,
        [recovered] [int] NULL,
        [recovered_change] [int] NULL,
        [latitude] [float] NULL,
        [longitude] [float] NULL,
        [iso2] [varchar](8000) NULL,
        [iso3] [varchar](8000) NULL,
        [country_region] [varchar](8000) NULL,
        [admin_region_1] [varchar](8000) NULL,
        [iso_subdivision] [varchar](8000) NULL,
        [admin_region_2] [varchar](8000) NULL,
        [load_time] [datetime2](6) NULL
    );
    ```

## Ingest Parquet data using the COPY statement

In the first example, we load data using a Parquet source. Since this data is publicly available and doesn't require authentication, you can easily copy this data by specifying the source and the destination. No authentication details are needed. You'll only need to specify the `FILE_TYPE` argument.

Use the following code to run the COPY statement with a Parquet source:

```sql
COPY INTO [dbo].[bing_covid-19_data]
FROM 'https://pandemicdatalake.blob.core.windows.net/public/curated/covid-19/bing_covid-19_data/latest/bing_covid-19_data.parquet'
WITH (
    FILE_TYPE = 'PARQUET'
);
```

## Ingest CSV data using the COPY statement and skipping a header row

It's common for comma-separated value (CSV) files to have a header row that provides the column names representing the table in a CSV file. The COPY statement can copy data from CSV files and skip one or more rows from the source file header.

If you ran the previous example to load data from Parquet, consider deleting all data from your table: 

```sql 
DELETE FROM [dbo].[bing_covid-19_data];
```

To load data from a CSV file skipping a header row, use the following code:

```sql
COPY INTO [dbo].[bing_covid-19_data]
FROM 'https://pandemicdatalake.blob.core.windows.net/public/curated/covid-19/bing_covid-19_data/latest/bing_covid-19_data.csv'
WITH (
    FILE_TYPE = 'CSV', 
    FIRSTROW = 2
);
```

## <a id="checking-the-results"></a> Check the results

The COPY statement completes by ingesting 4,766,736 rows into your new table. You can confirm the operation ran successfully by running a query that returns the total number of rows in your table:

```sql
SELECT COUNT(*) FROM [dbo].[bing_covid-19_data];
```

If you ran both examples without deleting the rows in between runs, you'll see the result of this query with twice as many rows. While that works for data ingestion in this case, consider deleting all rows and ingesting data only once if you're going to further experiment with this data. 

## Related content

- [Ingest data using Data pipelines](ingest-data-pipelines.md)
- [Ingest data into your Warehouse using Transact-SQL](ingest-data-tsql.md)
- [Ingesting data into the Warehouse](ingest-data.md)
