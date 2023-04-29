---
title: Ingest data into your Synapse Data Warehouse using the COPY statement
description: Follow steps to ingest data into a Synapse Data Warehouse with the COPY statement in Microsoft Fabric.
author: periclesrocha
ms.author: procha
ms.reviewer: wiassaf
ms.date: 05/23/2023
ms.topic: how-to
ms.search.form: Ingesting data
---

# Ingest data into your Synapse Data Warehouse using the COPY statement

**Applies to:** [!INCLUDE[fabric-dw](includes/applies-to-version/fabric-dw.md)]

[!INCLUDE [preview-note](../includes/preview-note.md)]

The COPY statement is the primary way to ingest data into [!INCLUDE [product-name](../includes/product-name.md)] warehouse tables. It performs high high-throughput data ingestion from an external Azure storage account, with the flexibility to configure source file format options, a location to store rejected rows, skipping header rows, and other options. 

This tutorial shows data ingestion examples for a [!INCLUDE [product-name](../includes/product-name.md)] warehouse table using the T-SQL COPY statement. It uses the Bing COVID-19 sample data from the Azure Open Datasets. For details about this dataset, including its schema and usage rights, see [Bing COVID-19](https://learn.microsoft.com/azure/open-datasets/dataset-bing-covid-19?tabs=azure-storage).

> [!NOTE]
> To learn more about the T-SQL COPY statement including more examples and the full syntax, see [COPY (Transact-SQL)](/sql/t-sql/statements/copy-into-transact-sql?view=fabric&preserve-view=true).

## Create a table

Before you use the COPY statement, the destination table needs to be created. To create the destination table for this sample, use the following steps: 

1. In your [!INCLUDE [product-name](../includes/product-name.md)] workspace, find and open your warehouse.

1. Switch to the **Home** tab and select **New SQL query**.
    :::image type="content" source="media\ingest-data-copy\new-sql-query.png" alt-text="Screenshot of the top section of the user's workspace showing the New SQL query button" lightbox="media\ingest-data-copy\new-sql-query.png":::

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
)
```
## Ingesting Parquet data using the COPY statement

In the first example, we'll load data using a Parquet source. Since this is a publicly available dataset that doesn't require authentication, you can easily copy this data just by specifying the source and the destination and no authentication details are needed. You'll only need to specify the `FILE_TYPE` argument.

Use the following code to run the COPY statement with a Parquet source:

```sql
COPY INTO [dbo].[bing_covid-19_data]
FROM 'https://pandemicdatalake.blob.core.windows.net/public/curated/covid-19/bing_covid-19_data/latest/bing_covid-19_data.parquet'
WITH (
    FILE_TYPE = 'PARQUET'
)
```

## Ingesting CSV data using the COPY statement and skipping a header row

It's common for comma-separated value (CSV) files to have a header row that provides the column names representing the table in a CSV file. The COPY statement can copy data from CSV files and skip one or more rows from the source file header.

If you ran the previous example to load data from Parquet, consider deleting all data from your table: 

```sql 
DELETE FROM [dbo].[bing_covid-19_data]
```

To load data from a CSV file skipping a header row, use the following code:

```sql
COPY INTO [dbo].[bing_covid-19_data]
FROM 'https://pandemicdatalake.blob.core.windows.net/public/curated/covid-19/bing_covid-19_data/latest/bing_covid-19_data.csv'
WITH (
    FILE_TYPE = 'CSV', 
    FIRSTROW = 2
)
```

## Checking the results

The COPY statement completes by ingesting 4,766,736 rows into your new table. You can confirm the operation ran successfully by running a query that returns the total number of rows in your table:

```sql
SELECT COUNT(*) FROM [dbo].[bing_covid-19_data]
```

If you ran both examples without deleting the rows in between runs, you'll see the result of this query with twice as many rows. While that works for data ingestion in this case, consider deleting all rows and ingesting data only once if you're going to further experiment with this data. 

## Next steps

- [Ingest data using Data pipelines](ingest-data-pipelines.md)
- [Ingest data into your Synapse Data Warehouse using Transact-SQL](ingest-data-tsql.md)
- [Ingesting data into the Synapse Data Warehouse](ingest-data.md)