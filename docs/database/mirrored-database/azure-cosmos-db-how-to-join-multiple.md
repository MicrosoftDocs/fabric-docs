---
title: |
  How to: Join mirrored Azure Cosmos DB data with other mirrored databases in Microsoft Fabric (Preview)
description: Join multiple Azure Cosmos DB databases together using mirrored databases in Microsoft Fabric.
author: seesharprun
ms.author: sidandrews
ms.reviewer: anithaa, wiassaf
ms.date: 04/24/2024
ms.service: fabric
ms.topic: how-to
---

# How to: Join mirrored Azure Cosmos DB data with other mirrored databases in Microsoft Fabric (Preview)

In this guide, join two Azure Cosmos DB for NoSQL containers from separate databases using Fabric mirroring.

You can join data from Cosmos DB with any other mirrored databases, warehouses, or lakehouses within same Fabric workspace.

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

1. Create a new connection using your Azure Cosmos DB account's credentials.

1. Mirror the first database using the connection you configured.

1. Now, mirror the second database.

1. Wait for replication to finish the initial snapshot of data for both mirrors.

## Create a query that joins databases

Now, use the SQL analytics endpoint to create a query across two mirrored database items, without the need for data movement. Both items should be in the same workspace.

1. Navigate to one of the mirrored databases in the Fabric portal.

1. Switch from **Mirrored Azure Cosmos DB** to **SQL analytics endpoint**.

    :::image type="content" source="media/azure-cosmos-db-how-to-join-multiple/switch-experience.png" alt-text="Screenshot of the selector to switch between items in the Fabric portal." lightbox="media/azure-cosmos-db-how-to-join-multiple/switch-experience.png":::

1. In the menu, select **+ Warehouses**. Select the SQL analytics endpoint item for the other mirrored database.

    :::image type="content" source="media/azure-cosmos-db-how-to-join-multiple/multiple-endpoints.png" alt-text="Screenshot of the OneLake data hub with multiple mirrored database endpoints.":::

1. Open the context menu for the table and select **New SQL Query**. Write an example query that combines both databases.

    :::image type="content" source="media/azure-cosmos-db-how-to-join-multiple/multiple-databases.png" alt-text="Screenshot of the query editor with multiple mirrored databases available.":::

    For example, this query would execute across multiple containers and databases, without any data movement. This example assumes the name of your table and columns. Use your own table and columns when writing your SQL query.

    ```sql
    SELECT
        product_category_count = COUNT (product_category),
        product_category 
    FROM
        [StoreSalesDB].[dbo].[storeorders_Sql] as StoreSales 
    INNER JOIN
        [dbo].[OrdersDB_order_status] as OrderStatus 
            ON StoreSales.order_id = OrderStatus.order_id 
    WHERE
        order_status='delivered' 
        AND OrderStatus.order_month_year > '6/1/2022' 
    GROUP BY
        product_category 
    ORDER BY
        product_category_count desc 
    ```

    You can add data from more sources and query them seamlessly. Fabric simplifies and eases bringing your organizational data together.

## Related content

- [FAQ: Microsoft Fabric mirrored databases from Azure Cosmos DB](azure-cosmos-db-faq.yml)
- [Troubleshooting: Microsoft Fabric mirrored databases from Azure Cosmos DB](azure-cosmos-db-troubleshooting.yml)
- [Limitations: Microsoft Fabric mirrored databases from Azure Cosmos DB](azure-cosmos-db-limitations.md)
