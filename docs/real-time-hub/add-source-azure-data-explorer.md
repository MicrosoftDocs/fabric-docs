---
title: Create database shortcut for Azure Data Explorer database
description: This article describes how to create a database shortcut for an Azure Data Explorer database.
author: ahartoon
ms.author: anboisve
ms.topic: how-to
ms.custom:
  - ignite-2024
ms.date: 11/18/2024
---

# Create database shortcut for Azure Data Explorer database
This article describes how to create a database shortcut for an Azure Data Explorer Database. 

## Prerequisites

- Access to a workspace in the Fabric capacity license mode (or) the Trial license mode with Contributor or higher permissions. 
- You need to have a **contributor** role or higher to the Azure Data Explorer cluster.  

## Navigate to Real-Time hub
[!INCLUDE [navigate-to-real-time-hub](./includes/navigate-to-real-time-hub.md)]

## Launch Create Database Shortcut experience 

1. In the left pane, select **Microsoft sources**.
1. From the **Source** drop-down menu, choose **Azure Data Explorer**. 

    :::image type="content" source="./media/add-source-azure-data-explorer/select-azure-data-explorer.png" alt-text="Screenshot that shows the selection of Azure Data Explorer on the Microsoft sources page." lightbox="./media/add-source-azure-data-explorer/select-azure-data-explorer.png":::
1. For **Subscription**, select an **Azure subscription** that contains the resource group with your Azure Data Explorer. 
1. For **Resource group**, select a resource group that has your Azure Data Explorer. 
1. For **Region**, select a location where your Azure Data Explorer is located. 
1. Hover over the name of the Azure Data Explorer you want to create a database shortcut for, and select the **Create database** shortcut button, or select the **ellipsis (...)**, and then select **Create database shortcut**.

    :::image type="content" source="./media/add-source-azure-data-explorer/create-database-shortcut-menu.png" alt-text="Screenshot that shows the Create database shortcut menu." lightbox="./media/add-source-azure-data-explorer/create-database-shortcut-menu.png":::


## Configure the new database shortcut 

1. Enter a **name** for your database shortcut. 
1. Choose an existing **eventhouse** or create a new one. 
1. If you create a new Eventhouse, select the **workspace** where you want the Eventhouse to be saved. 
1. The **Source cluster URI** is prepopulated based on the Azure Data Explorer you selected. 
1. Modify the default **Cache policy**. This step is optional.
1. Select **Create**. 

    :::image type="content" source="./media/add-source-azure-data-explorer/new-database-shortcut.png" alt-text="Screenshot that shows the Create database shortcut window.":::   

    > [!NOTE]
    > The region of the selected source cluster and the workspace region must be the same. Additionally, ensure that the Azure Data Explorer cluster is running. 

     Once the shortcut is created, you're taken to the [Database details](/fabric/real-time-intelligence/create-database#database-details) view of the new database shortcut. 

    :::image type="content" source="./media/add-source-azure-data-explorer/database-details.png" alt-text="Screenshot that shows the Database details page." lightbox="./media/add-source-azure-data-explorer/database-details.png":::   

 
