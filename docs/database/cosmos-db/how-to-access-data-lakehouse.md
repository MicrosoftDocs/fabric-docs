---
title: Access Mirrored Cosmos DB Database Data From Lakehouse (Preview)
titleSuffix: Microsoft Fabric
description: TODO
author: seesharprun
ms.author: sidandrews
ms.topic: how-to
ms.date: 07/09/2025
---

# Access mirrored Cosmos DB data from Lakehouse in Microsoft Fabric

Microsoft Fabric Lakehouse is a data architecture platform for storing, managing, and analyzing structured and unstructured data in a single location. In this guide, you access your mirrored Cosmos DB in Microsoft Fabric data in a lakehouse. You then use a notebook to perform a basic query of that date.

## Prerequisites

[!INCLUDE[Prerequisites - Existing database](includes/prerequisite-existing-database.md)]

[!INCLUDE[Prerequisites - Existing container](includes/prerequisite-existing-container.md)]

## Open the SQL analytics endpoint for the database

Start by accessing the SQL analytics endpoint for the Cosmos DB in Fabric database to ensure that mirroring ran successfully at least once.

1. Open the Fabric portal (<https://app.fabric.microsoft.com>).

1. Navigate to your existing Cosmos DB database.

    > [!IMPORTANT]
    > For this guide, the existing Cosmos DB database has the [sample data set](sample-data.md) already loaded. The remaining query examples in this guide assume that you're using the same data set for this database.

1. In the menu bar, select the **Cosmos DB** list and then select **SQL Endpoint**.

    :::image source="media/how-to-access-data-lakehouse/endpoint-selection.png" lightbox="media/how-to-access-data-lakehouse/endpoint-selection-full.png" alt-text="Screenshot of the endpoint selection option in the menu bar for a database in Cosmos DB in Fabric.":::

1. Once you're able to successfully navigate to the SQL analytics endpoint, this navigation step confirms that mirroring ran successfully at least once.

## Connect database to a lakehouse

Next, use Lakehouse to extend the number of tools you can use to analyze your Cosmos DB data. In this step, create a lakehouse and connect it to your mirrored data.

1. Navigate to the Fabric portal home page.

1. Select the **Create** option.

    :::image source="media/how-to-access-data-lakehouse/create-option.png" lightbox="media/how-to-access-data-lakehouse/create-option.png" alt-text="Screenshot of the option to 'Create' a new resource in the Fabric portal.":::

1. If the option to create an **Lakehouse** account isn't initially available, select **See all**.

1. Within the **Data Engineering** category, select **Lakehouse**.

    :::image source="media/how-to-access-data-lakehouse/" lightbox="media/how-to-access-data-lakehouse/-full.png" alt-text="Screenshot of the option to specifically create a lakehouse in the Fabric portal.":::

1. Give the lakehouse a unique name and then select **Create**.

    :::image source="media/how-to-access-data-lakehouse/" lightbox="media/how-to-access-data-lakehouse/-full.png" alt-text="Screenshot of the dialog to name a new lakehouse in the Fabric portal.":::

## Run a Spark query in a notebook

Finally, use Spark within a notebook to write Python queries for your mirrored data that is connected to the lakehouse. For this last step, create a notebook and then run a baseline Spark query using the Transact SQL (T-SQL) language syntax.

1.

## Related content

- [Learn about Cosmos DB in Microsoft Fabric](overview.md)
- [Query data cross-database with Cosmos DB in Microsoft Fabric](how-to-query-cross-database.md)
- [Connect from your local development environment to Cosmos DB in Microsoft Fabric](how-to-connect-development.md)
