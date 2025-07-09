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

## 