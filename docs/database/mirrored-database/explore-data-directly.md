---
title: "Explore data in your mirrored database directly in OneLake"
description: Learn how to access your mirrored database directly from OneLake in Delta format.
author: WilliamDAssafMSFT
ms.author: wiassaf
ms.reviewer: imotiwala, chweb, anithaa
ms.date: 04/24/2024
ms.service: fabric
ms.topic: how-to
---
# Explore data in your mirrored database directly in OneLake

You can access mirrored database table data in Delta format files. This tutorial provides steps to connect to Azure Cosmos DB data directly with [Azure Storage Explorer](../../onelake/onelake-azure-storage-explorer.md).

## Prerequisites

- Complete the tutorial to create a mirrored database from your source database.
    - [Tutorial: Create a mirrored database from Azure Cosmos DB](azure-cosmos-db-tutorial.md)
    - [Tutorial: Create a mirrored database from Azure SQL Database](azure-sql-database-tutorial.md)
    - [Tutorial: Create a mirrored database from Snowflake](snowflake-tutorial.md)

## Access OneLake files

1. Open the **Mirrored Database** item and navigate to the SQL analytics endpoint.
1. Select the `...` dots next to any of the tables.
1. Select **Properties**. Select the copy button next to the **URL**.
    :::image type="content" source="media/explorer-data-directly/table-properties-onelake-url.png" alt-text="Screenshots of the table properties context menu option and the OneLake URL." lightbox="media/explorer-data-directly/table-properties-onelake-url.png":::
1. Open the **Azure Storage Explorer** desktop application. If you don't have it, [download and install Azure Storage Explorer](https://azure.microsoft.com/products/storage/storage-explorer).
1. Connect to Azure Storage.
1. On the **Select Resource** page, select Azure Data Lake Storage (ADLS) Gen2 as the resource.
1. Select **Next**.
1. On the **Select Connection Method** page, **Sign in using OAuth**. If you aren't signed into the subscription, you should do that first with OAuth. And then access ADLS Gen2 resource.
1. Select **Next**.
1. On the **Enter Connection Info** page, provide a **Display name**.
1. Paste the SQL analytics endpoint URL into the box for **Blob container or directory URL**.
1. Select **Next**.
1. You can access delta files directly from Azure Storage Explorer.
    :::image type="content" source="media/explorer-data-directly/azure-storage-explorer.png" alt-text="Screenshot of mirrored database data visible in the OneLake in Azure Storage Explorer." lightbox="media/explorer-data-directly/azure-storage-explorer.png":::

> [!TIP]
> More examples:
>
> - [Integrate OneLake with Azure Databricks](../../onelake/onelake-azure-databricks.md)
> - [Access Fabric data locally with OneLake file explorer](../../onelake/onelake-file-explorer.md)
> - [Use OneLake file explorer to access Fabric data](../../onelake/onelake-file-explorer.md)

## Related content

- [Explore data in your mirrored database using Microsoft Fabric](explore.md)
- [Explore data in your mirrored database with notebooks](explore-onelake-shortcut.md)
- [Connecting to Microsoft OneLake](../../onelake/onelake-access-api.md)
