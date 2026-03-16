---
title: Add an Azure Data Explorer Database as a Source
description: Learn how to add an Azure Data Explorer database as a source to a Microsoft Fabric eventstream.
ms.topic: how-to
ms.date: 03/19/2025
---

# Add an Azure Data Explorer database source to an eventstream (preview)

This article shows you how to add an Azure Data Explorer database (DB) source to a Microsoft Fabric eventstream.  

[!INCLUDE [azure-data-explorer-description-prerequisites](./includes/azure-data-explorer-description-prerequisites.md)]

## Add an Azure Data Explorer DB as a source

[!INCLUDE [launch-connect-external-source](./includes/launch-connect-external-source.md)]

On the **Select a data source** page, search for **Azure Data Explorer DB**. On the **Azure Data Explorer DB** tile, select **Connect**.

:::image type="content" source="./media/add-source-azure-data-explorer/select-azure-data-explorer.png" alt-text="Screenshot that shows the selection of Azure Data Explorer as the source type in the wizard for getting events.":::

## Configure and connect to an Azure Data Explorer DB

[!INCLUDE [azure-data-explorer-connector](./includes/azure-data-explorer-connector.md)]

## View an updated eventstream

1. Confirm that the Azure Data Explorer DB source is added to your eventstream on the canvas in the **Edit** mode. To implement this newly added Azure Data Explorer DB source, select **Publish**.  

    :::image type="content" source="./media/add-source-azure-data-explorer/edit-mode.png" alt-text="Screenshot that shows the editor with the Publish button selected.":::

1. Your Azure Data Explorer DB source is available for visualization in the **Live** view.  

    :::image type="content" source="./media/add-source-azure-data-explorer/live-view.png" alt-text="Screenshot that shows the editor in the live view.":::

    > [!NOTE]
    > When the Azure Data Explorer DB streaming connector starts, it captures only new table changes. Historical table data isn't streamed into the eventstream.

## Limitations

The Azure Data Explorer streaming connector captures table changes by using a database cursor to query the differences between two ingestion times. However, each query result is limited to a maximum of 64 MB or 500,000 records. For details, see the [Azure Data Explorer query limits](/kusto/concepts/query-limits#limit-on-result-set-size-result-truncation). If your Azure Data Explorer database has a high ingestion rate that exceeds this limit, the connector might fail.

## Related content

- To learn how to add other sources to an eventstream, see [Add and manage an event source in an eventstream](add-manage-eventstream-sources.md).
