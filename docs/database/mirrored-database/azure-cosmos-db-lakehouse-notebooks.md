---
title: |
  How to: Access mirrored Azure Cosmos DB data in Lakehouse and notebooks from Microsoft Fabric (Preview)
description: Access mirrored Azure Cosmos DB data in Lakehouse and notebooks from Microsoft Fabric (Preview).
author: seesharprun
ms.author: sidandrews
ms.reviewer: anithaa
ms.date: 03/15/2024
ms.service: fabric
ms.topic: how-to
---

# How to: Access mirrored Azure Cosmos DB data in Lakehouse and notebooks from Microsoft Fabric (Preview)

In this guide, you learn how to Access mirrored Azure Cosmos DB data in Lakehouse and notebooks from Microsoft Fabric (Preview).

> [!IMPORTANT]
> Mirroring for Azure Cosmos DB is currently in [preview](../../get-started/preview.md). Production workloads aren't supported during preview. Currently, only Azure Cosmos DB for NoSQL accounts are supported.

## Prerequisites

- An existing Azure Cosmos DB for NoSQL account.
  - If you don't have an Azure subscription, [Try Azure Cosmos DB for NoSQL free](https://cosmos.azure.com/try/).
  - If you have an existing Azure subscription, [create a new Azure Cosmos DB for NoSQL account](/azure/cosmos-db/nosql/quickstart-portal).
- An existing Fabric capacity. If you don't have an existing capacity, [start a Fabric trial](../../get-started/fabric-trial.md).
- Enable Mirroring in your Fabric tenant or workspace. If the feature isn't already enabled, [enable mirroring in your Fabric tenant](enable-mirroring.md).
- The Azure Cosmos DB for NoSQL account must be configured for Fabric mirroring. For more information, see [account requirements](azure-cosmos-db-limitations.md#account-and-database-limitations).

> [!TIP]
> During the public preview, it's recommended to use a test or development copy of your existing Azure Cosmos DB data that can be recovered quickly from a backup.

## Setup mirroring and prerequisites

Configure mirroring for the Azure Cosmos DB for NoSQL database. If you're unsure how to configure mirroring, refer to the [configure mirrored database tutorial](azure-cosmos-db-tutorial.md#create-a-mirrored-database).

1. Navigate to the [Fabric portal](https://fabric.microsoft.com/).

1. Create a new connection and mirrored database using your Azure Cosmos DB account's credentials.

1. Wait for replication to finish the initial snapshot of data.

## Access mirrored data in Lakehouse and notebooks

Use Lakehouse to further extend the number of tools you can use to analyze your Azure Cosmos DB for NoSQL mirrored data. Here, you use Lakehouse to build a Spark notebook to query your data.

1. Navigate to the Fabric portal home again.

1. In the navigation menu, select **Create**.

1. Select **Create**, locate the **Data Engineering** section, and then select **Lakehouse**.

1. Provide a name for the Lakehouse and then select **Create**.

1. Now select **Get Data**, and then **New shortcut**. From the list of shortcut options, select **Microsoft OneLake**.

1. Select the mirrored Azure Cosmos DB for NoSQL database from the list of mirrored databases in your Fabric workspace. Select the tables to use with Lakehouse, select **Next**, and then select **Create**.

1. Open the context menu for the table in Lakehouse and select **New or existing notebook**.

1. A new notebook automatically opens and loads a dataframe using `SELECT LIMIT 1000`.

1. Run queries like `SELECT *` using Spark.

    ```python
    df = spark.sql("SELECT * FROM Lakehouse.OrdersDB_customers LIMIT 1000")
    display(df)
    ```

    :::image type="content" source="media/azure-cosmos-db-tutorial/lakehouse-notebook.png" alt-text="Screenshot of a Lakehouse notebook with data pre-loaded from the mirrored database." lightbox="media/azure-cosmos-db-tutorial/lakehouse-notebook.png":::

    > [!NOTE]
    > This example assumes the name of your table. Use your own table when writing your Spark query.

## Write back using Spark

Finally, you can use Spark and Python code to write data back to your source Azure Cosmos DB account from notebooks in Fabric. You may want to do this to write back analytical results to Cosmos DB, which can then be using as serving plane for OLTP applications.  

1. Create four code cells within your notebook.

1. First, query your mirrored data.

    ```python
    fMirror = spark.sql("SELECT * FROM Lakehouse1.OrdersDB_ordercatalog")
    ```

    > [!TIP]
    > The table names in these sample code blocks assume a certain data schema. Feel free to replace this with your own table and column names.

1. Now transform and aggregate the data.

    ```python
    dfCDB = dfMirror.filter(dfMirror.categoryId.isNotNull()).groupBy("categoryId").agg(max("price").alias("max_price"), max("id").alias("id"))
    ```

1. Next, configure Spark to write back to your Azure Cosmos DB for NoSQL account using your credentials, database name, and container name.

    ```python
    writeConfig = {
      "spark.cosmos.accountEndpoint" : "https://xxxx.documents.azure.com:443/",
      "spark.cosmos.accountKey" : "xxxx",
      "spark.cosmos.database" : "xxxx",
      "spark.cosmos.container" : "xxxx"
    }
    ```

1. Finally, use Spark to write back to the source database.

    ```python
    dfCDB.write.mode("APPEND").format("cosmos.oltp").options(**writeConfig).save()
    ```

1. Run all of the code cells.

    > [!IMPORTANT]
    > Write operations to Azure Cosmos DB will consume request units (RUs).

## Related content

- [FAQ: Microsoft Fabric mirrored databases from Azure Cosmos DB](azure-cosmos-db-faq.yml)
- [Troubleshooting: Microsoft Fabric mirrored databases from Azure Cosmos DB](azure-cosmos-db-troubleshooting.yml)
- [Limitations: Microsoft Fabric mirrored databases from Azure Cosmos DB](azure-cosmos-db-limitations.md)
