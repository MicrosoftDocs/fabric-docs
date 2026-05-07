---
title: Ingest Data into Your Warehouse Using the COPY Statement
description: Follow steps to ingest data into a Warehouse with the COPY statement in Microsoft Fabric.
ms.reviewer: procha, jovanpop-msft
ms.date: 03/13/2026
ms.topic: how-to
ms.search.form: Ingesting data
---

# Ingest data into your Warehouse using the COPY statement

**Applies to:** [!INCLUDE [fabric-dw](includes/applies-to-version/fabric-dw.md)]

The COPY statement is the primary way to ingest data into [!INCLUDE [fabric-dw](includes/fabric-dw.md)] tables. COPY performs high high-throughput data ingestion from an external Azure storage account, with the flexibility to configure source file format options, a location to store rejected rows, skipping header rows, and other options. 

This tutorial shows data ingestion examples for a [!INCLUDE [fabric-dw](includes/fabric-dw.md)] table using the T-SQL `COPY` statement. It uses the Bing COVID-19 sample data from the Azure Open Datasets. For details about this data, including its schema and usage rights, see [Bing COVID-19](/azure/open-datasets/dataset-bing-covid-19?tabs=azure-storage).

> [!NOTE]
> [!INCLUDE [fabric-dw](includes/fabric-dw.md)] also enables you to use [BULK INSERT](/sql/t-sql/statements/bulk-insert-transact-sql?view=fabric&preserve-view=true) statement for data ingestion. The `COPY INTO` statement is the recommended statement for the new ingestion code, while the `BULK INSERT` statement enables you to reuse the code that you are using in SQL Server or Azure SQL Database.
> 
> To learn more about the T-SQL `COPY` statement including more examples and the full syntax, see [COPY (Transact-SQL)](/sql/t-sql/statements/copy-into-transact-sql?view=fabric&preserve-view=true).

## Create a table

Before you use the COPY statement, the destination table needs to be created. To create the destination table for this sample, use the following steps: 

1. In your [!INCLUDE [product-name](../includes/product-name.md)] workspace, find and open your warehouse.

1. Switch to the **Home** tab and select **New SQL query**.

    :::image type="content" source="media/ingest-data-copy/new-sql-query.png" alt-text="Screenshot of the top section of the user's workspace showing the New SQL query button." lightbox="media/ingest-data-copy/new-sql-query.png":::

1. To create the table used as the destination in this tutorial, run the following code:
    
    ```sql
        CREATE TABLE dbo.TaxiTrips
        (
            doLocationId            varchar(MAX)      NULL,
            endLat                  float             NULL,
            endLon                  float             NULL,
            extra                   float             NULL,
            fareAmount              float             NULL,
            improvementSurcharge    varchar(MAX)      NULL,
            mtaTax                  float             NULL,
            passengerCount          int               NULL,
            paymentType             varchar(MAX)      NULL,
            puLocationId            varchar(MAX)      NULL,
            puMonth                 int               NULL,
            puYear                  int               NULL,
            rateCodeId              int               NULL,
            startLat                float             NULL,
            startLon                float             NULL,
            storeAndFwdFlag         varchar(1)        NULL,
            tipAmount               float             NULL,
            tollsAmount             float             NULL,
            totalAmount             float             NULL,
            tpepDropoffDateTime     datetime2(6)      NULL,
            tpepPickupDateTime      datetime2(6)      NULL,
            tripDistance            float             NULL,
            vendorId_str            varchar(MAX)      NULL,
            vendorId_lpep           int               NULL
        );
    ```

## Ingest Parquet data using the COPY statement

In this example, we load data using a Parquet source. Since this data is publicly available and doesn't require authentication, you can easily copy this data by specifying the source and the destination. No authentication details are needed. You'll only need to specify the `FILE_TYPE` argument.

Use the following code to run the COPY statement with a Parquet source:

```sql
COPY INTO dbo.TaxiTrips
FROM 'https://azureopendatastorage.blob.core.windows.net/nyctlc/yellow'
WITH (
    FILE_TYPE = 'PARQUET'
)
```

<a id="checking-the-results"></a>

## Check the results

The COPY statement completes by ingesting 1,571,671,152 rows into your new table. You can confirm the operation ran successfully by running a query that returns the total number of rows in your table:

```sql
SELECT COUNT_BIG(*) FROM dbo.TaxiTrips;
```

## Data ingestion options

Other ways to ingest data into your warehouse include:

- [Ingest data using pipelines](ingest-data-pipelines.md)
- [Ingest data using Transact-SQL](ingest-data-tsql.md)
- [Ingest data using a dataflow](../data-factory/create-first-dataflow-gen2.md)

## Related content

- [Ingesting data into the Warehouse](ingest-data.md)
- [Troubleshoot ingestion errors](troubleshoot-ingestion-errors.md)
