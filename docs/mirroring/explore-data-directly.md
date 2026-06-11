---
title: "Explore Data in Your Mirrored Database Directly in OneLake"
description: Learn how to access your mirrored database directly from OneLake in Delta format.
ms.reviewer: imotiwala, chweb, anithaa
ms.date: 04/28/2026
ai-usage: ai-assisted
ms.topic: how-to
---
# Explore data in your mirrored database directly in OneLake

You can access mirrored database table data in Delta format files. This tutorial provides steps to connect to Azure Cosmos DB data directly with [Azure Storage Explorer](../onelake/onelake-azure-storage-explorer.md).

## Prerequisites

- Complete the tutorial to create a mirrored database from your source database.
    - [Tutorial: Create a mirrored database from Azure Cosmos DB](../mirroring/azure-cosmos-db-tutorial.md)
    - [Tutorial: Create a mirrored database from Azure Databricks](../mirroring/azure-databricks-tutorial.md)
    - [Tutorial: Create a mirrored database from Azure SQL Database](../mirroring/azure-sql-database-tutorial.md)
    - [Tutorial: Create a mirrored database from Azure SQL Managed Instance](../mirroring/azure-sql-managed-instance-tutorial.md)
    - [Tutorial: Create a mirrored database from Snowflake](../mirroring/snowflake-tutorial.md)
    - [Tutorial: Create a mirrored database from SQL Server](../mirroring/sql-server-tutorial.md)
    - [Tutorial: Create an open mirrored database](../mirroring/open-mirroring-tutorial.md)

> [!NOTE]
> Mirrored database table data is stored as Delta format files in OneLake and can be browsed as read-only via OneLake file explorer or Azure Storage Explorer. Direct modifications to these Delta files are not supported and won't be reflected in the mirrored database. To update data, use the supported data update paths for the source database.

## Access OneLake files with Azure Storage Explorer

1. Open the **Mirrored Database** item and navigate to the SQL analytics endpoint.
1. Select the `...` dots next to any of the tables.
1. Select **Properties**. Select the copy button next to the **URL**.
    :::image type="content" source="media/explore-data-directly/table-properties-onelake-url.png" alt-text="Screenshots of the table properties context menu option and the OneLake URL." lightbox="media/explore-data-directly/table-properties-onelake-url.png":::
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
    :::image type="content" source="media/explore-data-directly/azure-storage-explorer.png" alt-text="Screenshot of mirrored database data visible in the OneLake in Azure Storage Explorer." lightbox="media/explore-data-directly/azure-storage-explorer.png":::

## Access OneLake files with OneLake file explorer

As an alternative to Azure Storage Explorer, you can use OneLake file explorer to browse mirrored database files directly in Windows File Explorer:

1. Install OneLake file explorer if you haven't already. For installation and setup steps, see [Use OneLake file explorer to access Fabric data](../onelake/onelake-file-explorer.md).
1. Sign in with your Microsoft account.
1. In Windows File Explorer, navigate to **OneLake** > your workspace > your mirrored database item.
1. Browse the Delta table files for your mirrored database directly in File Explorer.

## Related content

- [Explore data in your mirrored database using Microsoft Fabric](../mirroring/explore.md)
- [Explore data in your mirrored database with notebooks](../mirroring/explore-onelake-shortcut.md)
- [Connecting to Microsoft OneLake](../onelake/onelake-access-api.md)
