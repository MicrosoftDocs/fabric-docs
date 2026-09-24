---
title: Add an Azure Data Explorer Database as a Source
description: Learn how to add an Azure Data Explorer database as a source to a Microsoft Fabric eventstream.
ms.reviewer: xujiang1
ms.topic: how-to
ms.date: 04/01/2026
---

# Add an Azure Data Explorer database source to an eventstream (preview)

This article shows you how to add an Azure Data Explorer database (DB) source to a Microsoft Fabric eventstream.  

[!INCLUDE [azure-data-explorer-description-prerequisites](./includes/connectors/azure-data-explorer-description-prerequisites.md)]

## Add an Azure Data Explorer DB as a source

[!INCLUDE [launch-connect-external-source](./includes/launch-connect-external-source.md)]

On the **Select a data source** page, search for **Azure Data Explorer DB**. On the **Azure Data Explorer DB** tile, select **Connect**.

:::image type="content" source="./media/add-source-azure-data-explorer/select-azure-data-explorer.png" alt-text="Screenshot that shows the selection of Azure Data Explorer as the source type in the wizard for getting events.":::

## Configure and connect to an Azure Data Explorer DB

[!INCLUDE [azure-data-explorer-connector](./includes/connectors/azure-data-explorer-connector-configuration.md)]

## View an updated eventstream

1. Confirm that the Azure Data Explorer DB source is added to your eventstream on the canvas in the **Edit** mode. To implement this newly added Azure Data Explorer DB source, select **Publish**.  

    :::image type="content" source="./media/add-source-azure-data-explorer/edit-mode.png" alt-text="Screenshot that shows the editor with the Publish button selected.":::

1. Your Azure Data Explorer DB source is available for visualization in the **Live** view.  

    :::image type="content" source="./media/add-source-azure-data-explorer/live-view.png" alt-text="Screenshot that shows the editor in the live view.":::

    > [!NOTE]
    > When the Azure Data Explorer DB streaming connector starts, it captures only new table changes. Historical table data isn't streamed into the eventstream.

## Related content

- To learn how to add other sources to an eventstream, see [Add and manage an event source in an eventstream](add-manage-eventstream-sources.md).
