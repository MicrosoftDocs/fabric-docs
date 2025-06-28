---
title: Add Azure Data Explorer database as a source
description: Learn how to add an Azure Data Explorer database as a source to a Microsoft Fabric eventstream.
author: spelluru
ms.author: spelluru
ms.topic: how-to
ms.custom:
ms.date: 03/19/2025
---

# Add Azure Data Explorer Database (DB) source to an eventstream (preview)   
This article shows you how to add an Azure Data Explorer DB source to an eventstream.  

[!INCLUDE [azure-data-explorer-description-prerequisites](./includes/azure-data-explorer-description-prerequisites.md)]


## Add Azure Data Explorer DB as a source   
[!INCLUDE [launch-connect-external-source](./includes/launch-connect-external-source.md)]

On the **Select a data source** page, search for and select **Connect** on the **Azure Data Explorer DB** tile.

:::image type="content" source="./media/add-source-azure-data-explorer/select-azure-data-explorer.png" alt-text="Screenshot that shows the selection of Azure Data Explorer as the source type in the Get events wizard.":::

## Configure and connect to Azure Data Explorer DB
[!INCLUDE [azure-data-explorer-connector](./includes/azure-data-explorer-connector.md)]

## View updated eventstream

1. You see that the Azure Data Explorer DB source is added to your eventstream on the canvas in the **Edit** mode.  To implement this newly added Azure Data Explorer DB source, select **Publish**.  

    :::image type="content" source="./media/add-source-azure-data-explorer/edit-mode.png" alt-text="Screenshot that shows the editor with Publish button selected.":::
1. After you complete these steps, your Azure Data Explorer DB source is available for visualization in the **Live view**.  

    :::image type="content" source="./media/add-source-azure-data-explorer/live-view.png" alt-text="Screenshot that shows the editor in the live view.":::

    > [!NOTE] 
    > When the Azure Data Explorer DB streaming connector starts, it captures only new table changes. Historical table data aren't streamed into Eventstream. 

## Related content
To learn how to add other sources to an eventstream, see the following article: [Add and manage an event source in an eventstream](add-manage-eventstream-sources.md).
