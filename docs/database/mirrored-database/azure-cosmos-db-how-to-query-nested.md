---
title: |
  How to: Query nested data in Microsoft Fabric mirrored databases from Azure Cosmos DB (Preview)
description: Query nested Azure Cosmos DB JSON data in a mirrored database within Microsoft Fabric.
author: seesharprun
ms.author: sidandrews
ms.reviewer: anithaa
ms.date: 03/17/2024
ms.service: fabric
ms.topic: how-to
---

# How to: Query nested data in Microsoft Fabric mirrored databases from Azure Cosmos DB (Preview)

Use the mirrored database in Microsoft Fabric to query nested JSON data sourced from Azure Cosmos DB for NoSQL.

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

## Create nested data within the source database

Create JSON items within your Azure Cosmos DB for NoSQL account that contain varying levels of nested JSON data.

1. Navigate to your Azure Cosmos DB account in the [Azure portal](https://portal.azure.com).

1. Select **Data Explorer** from the resource menu.

1. Use **+ New container** to create a new container. For this guide, name the container `TestC`. The corresponding database name is arbitrary.

1. Use the **+ New item** option multiple times to create and **save** these five JSON items.

    ```json
    {
      "id": "123-abc-xyz",
      "name": "A 13",
      "country": "USA",
      "items": [
        {
          "purchased": "11/23/2022",
          "order_id": "3432-2333-2234-3434",
          "item_description": "item1"
        },
        {
          "purchased": "01/20/2023",
          "order_id": "3431-3454-1231-8080",
          "item_description": "item2"
        },
        {
          "purchased": "02/20/2023",
          "order_id": "2322-2435-4354-2324",
          "item_description": "item3"
        }
      ]
    }
    ```

    ```json
    {
      "id": "343-abc-def",
      "name": "B 22",
      "country": "USA",
      "items": [
        {
          "purchased": "01/20/2023",
          "order_id": "2431-2322-1545-2322",
          "item_description": "book1"
        },
        {
          "purchased": "01/21/2023",
          "order_id": "3498-3433-2322-2320",
          "item_description": "book2"
        },
        {
          "purchased": "01/24/2023",
          "order_id": "9794-8858-7578-9899",
          "item_description": "book3"
        }
      ]
    }
    ```

    ```json
    {
      "id": "232-abc-x43",
      "name": "C 13",
      "country": "USA",
      "items": [
        {
          "purchased": "04/03/2023",
          "order_id": "9982-2322-4545-3546",
          "item_description": "clothing1"
        },
        {
          "purchased": "05/20/2023",
          "order_id": "7989-9989-8688-3446",
          "item_description": "clothing2"
        },
        {
          "purchased": "05/27/2023",
          "order_id": "9898-2322-1134-2322",
          "item_description": "clothing3"
        }
      ]
    }
    ```

    ```json
    {
      "id": "677-abc-yuu",
      "name": "D 78",
      "country": "USA"
    }
    ```

    ```json
    {
      "id": "979-abc-dfd",
      "name": "E 45",
      "country": "USA"
    }
    ```

## Setup mirroring and prerequisites

Configure mirroring for the Azure Cosmos DB for NoSQL database. If you're unsure how to configure mirroring, refer to the [configure mirrored database tutorial](azure-cosmos-db-tutorial.md#create-a-mirrored-database).

1. Navigate to the [Fabric portal](https://fabric.microsoft.com/).

1. Create a new connection and mirrored database using your Azure Cosmos DB account's credentials.

1. Wait for replication to finish the initial snapshot of data.

## Query basic nested data

Now, use the SQL analytics endpoint to create a query that can handle simple nested JSON data.

1. Navigate to the mirrored database in the Fabric portal.

1. Switch from **Mirrored Azure Cosmos DB** to **SQL analytics endpoint**.

    :::image type="content" source="media/azure-cosmos-db-how-to-query-nested/switch-experience.png" alt-text="Screenshot of the selector to switch between experiences in the Fabric portal." lightbox="media/azure-cosmos-db-how-to-query-nested/switch-experience.png":::

1. Open the context menu for the **test** table and select **New SQL Query**.

1. Run this query to expand on the `items` array with `OPENJSON`. This query uses `OUTER APPLY` to include extra items that might not have an items array.

    ```sql
    SELECT 
        t.name, 
        t.id, 
        t.country, 
        P.purchased, 
        P.order_id, 
        P.item_description 
    FROM OrdersDB_TestC AS t
    OUTER APPLY OPENJSON(t.items) WITH
    (
        purchased datetime '$.purchased',
        order_id varchar(100) '$.order_id',
        item_description varchar(200) '$.item_description'
    ) as P
    ```

    > [!TIP]
    > When choosing the data types in `OPENJSON`, using `varchar(max)` for string types could worsen query performance. Instead, use `varchar(n)` wher `n` could be any number. The lower `n` is, the more likely you will see better query performance.

1. Use `CROSS APPLY` in the next query to only show items with an `items` array.

    ```sql
    SELECT
        t.name,
        t.id,
        t.country,
        P.purchased,
        P.order_id,
        P.item_description 
    FROM
        OrdersDB_TestC as t CROSS APPLY OPENJSON(t.items) WITH (
            purchased datetime '$.purchased',
            order_id varchar(100) '$.order_id',
            item_description varchar(200) '$.item_description' 
        ) as P 
    ```

## Create deeply nested data

To build on this nested data example, let's add a deeply nested data example.

1. Navigate to your Azure Cosmos DB account in the [Azure portal](https://portal.azure.com).

1. Select **Data Explorer** from the resource menu.

1. Use **+ New container** to create a new container. For this guide, name the container `TestD`. The corresponding database name is arbitrary.

1. Use the **+ New item** option multiple times to create and **Save** this JSON item.

    ```json
    {
      "id": "eadca09b-e618-4090-a25d-b424a26c2361",
      "entityType": "Package",
      "packages": [
        {
          "packageid": "fiwewsb-f342-jofd-a231-c2321",
          "storageTemperature": "69",
          "highValue": true,
          "items": [
            {
              "id": "1",
              "name": "Item1",
              "properties": {
                "weight": "2",
                "isFragile": "no"
              }
            },
            {
              "id": "2",
              "name": "Item2",
              "properties": {
                "weight": "4",
                "isFragile": "yes"
              }
            }
          ]
        },
        {
          "packageid": "d24343-dfdw-retd-x414-f34345",
          "storageTemperature": "78",
          "highValue": false,
          "items": [
            {
              "id": "3",
              "name": "Item3",
              "properties": {
                "weight": "12",
                "isFragile": "no"
              }
            },
            {
              "id": "4",
              "name": "Item4",
              "properties": {
                "weight": "12",
                "isFragile": "no"
              }
            }
          ]
        }
      ],
      "consignment": {
        "consignmentId": "ae21ebc2-8cfc-4566-bf07-b71cdfb37fb2",
        "customer": "Humongous Insurance",
        "deliveryDueDate": "2020-11-08T23:38:50.875258Z"
      }
    }
    ```

## Query deeply nested data

Finally, create a T-SQL query that can find data deeply nested in a JSON string.

1. Open the context menu for the `TestD` table and select **New SQL Query** again.

1. Run this query to expand all levels of nested data using `OUTER APPLY` with consignment.

    ```sql
    SELECT
        P.id,
        R.packageId,
        R.storageTemperature,
        R.highValue,
        G.id,
        G.name,
        H.weight,
        H.isFragile,
        Q.consignmentId,
        Q.customer,
        Q.deliveryDueDate 
    FROM
        OrdersDB_TestD as P CROSS APPLY OPENJSON(P.packages) WITH ( packageId varchar(100) '$.packageid',
        storageTemperature INT '$.storageTemperature',
        highValue varchar(100) '$.highValue',
        items nvarchar(MAX) AS JSON ) as R 
    OUTER APPLY OPENJSON (R.items) WITH (
        id varchar(100) '$.id',
        name varchar(100) '$.name',
        properties nvarchar(MAX) as JSON 
    ) as G OUTER APPLY OPENJSON(G.properties) WITH  (
        weight INT '$.weight',
        isFragile varchar(100) '$.isFragile'
    ) as H OUTER APPLY OPENJSON(P.consignment) WITH  (
        consignmentId varchar(200) '$.consignmentId',
        customer varchar(100) '$.customer',
        deliveryDueDate Date '$.deliveryDueDate'
    ) as Q 
    ```

    > [!NOTE]
    > When expanding `packages`, `items` is represented as JSON, which can optionally expand. The `items` property has sub-properties as JSOn which also can optionally expand.

1. Finally, run a query that chooses when to expand specific levels of nesting.

    ```sql
    SELECT
        P.id,
        R.packageId,
        R.storageTemperature,
        R.highValue,
        R.items,
        Q.consignmentId,
        Q.customer,
        Q.deliveryDueDate 
    FROM
        OrdersDB_TestD as P CROSS APPLY OPENJSON(P.packages) WITH (
            packageId varchar(100) '$.packageid',
            storageTemperature INT '$.storageTemperature',
            highValue varchar(100) '$.highValue',
            items nvarchar(MAX) AS JSON
        ) as R 
    OUTER APPLY OPENJSON(P.consignment) WITH  (
        consignmentId varchar(200) '$.consignmentId',
        customer varchar(100) '$.customer',
        deliveryDueDate Date '$.deliveryDueDate'
    ) as Q 
    ```

    > [!NOTE]
    > Property limits for nested levels are not enforced in this T-SQL query experience.

## Related content

- [FAQ: Microsoft Fabric mirrored databases from Azure Cosmos DB](azure-cosmos-db-faq.yml)
- [Troubleshooting: Microsoft Fabric mirrored databases from Azure Cosmos DB](azure-cosmos-db-troubleshooting.yml)
- [Limitations: Microsoft Fabric mirrored databases from Azure Cosmos DB](azure-cosmos-db-limitations.md)
