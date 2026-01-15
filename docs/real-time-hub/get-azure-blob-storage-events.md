---
title: Get Azure Blob Storage events in Real-Time hub
description: This article describes how to get Azure Blob Storage events as an eventstream in Fabric Real-Time hub.
author: ahartoon
ms.author: anboisve
ms.topic: how-to
ms.custom:
ms.date: 12/22/2025
---

# Get Azure Blob Storage events into Real-Time hub

This article describes how to get Azure Blob Storage events into Fabric Real-Time hub.

An event is the smallest amount of information that fully describes that something happened in a system. Azure Blob Storage events are triggered when a client creates, replaces, deletes a blob, etc. By using the Real-Time hub, you can convert these events into continuous data streams and transform them before routing them to various destinations in Fabric.

The following Blob Storage event types are supported:

|Event name|Description|
|-------|------------|
|Microsoft.Storage.BlobCreated|Triggered when a blob is created or updated.|
|Microsoft.Storage.BlobDeleted                    |Triggered when a blob is deleted.|
|Microsoft.Storage.BlobRenamed                    |Triggered when a blob is renamed.|
|Microsoft.Storage.BlobTierChanged                |Triggered when the blob access tier is changed.|
|Microsoft.Storage.DirectoryCreated               |Triggered when a directory is created.|
|Microsoft.Storage.DirectoryRenamed               |Triggered when a directory is renamed.|
|Microsoft.Storage.AsyncOperationInitiated        |Triggered when an operation involving moving or copying data from the archive to hot or cool tiers is initiated.|
|Microsoft.Storage.DirectoryDeleted               |Triggered when a directory is deleted.|
|Microsoft.Storage.BlobInventoryPolicyCompleted   |Triggered when the inventory run completes for a rule that defines an inventory policy.|
|Microsoft.Storage.LifecyclePolicyCompleted       |Triggered when the actions defined by a lifecycle management policy are done.|

For more information about available event types, see [Azure Blob Storage as Event Grid source](/azure/event-grid/event-schema-blob-storage).

[!INCLUDE [consume-fabric-events-regions](./includes/consume-fabric-events-regions.md)]

## Prerequisites

- Access to a workspace in the Fabric capacity license mode (or) the Trial license mode with Contributor or higher permissions. 
- An Azure Blob Storage account of kind **StorageV2** (general purpose v2), Block Blob Storage, or Blob Storage. General purpose v1 storage accounts aren't supported.

## Create streams for Azure Blob Storage events

You can create streams for Azure Blob Storage events in Real-Time hub using one of the ways:

- [Using the **Data sources** page](#data-sources-page)
- [Using the **Azure events** page](#azure-events-page)

## Data sources page

[!INCLUDE [launch-get-events-experience](./includes/launch-get-events-experience.md)]

4. On the **Data sources** page, select **Azure events** category at the top, and then select **Connect** on the **Azure Blob Storage events** tile. 

    :::image type="content" source="./media/get-azure-blob-storage-events/azure-blob-events.png" alt-text="Screenshot that shows the selection of Azure Blob Storage events as the source type in the Data sources page." lightbox="./media/get-azure-blob-storage-events/azure-blob-events.png":::

    Now, use instructions from the [Configure and create an eventstream](#configure-and-create-an-eventstream) section.

## Azure events page

1. In Real-Time hub, select **Azure events** on the left navigation menu.
1. Move the mouse over **Azure Blob Storage**, and select the **+** (plus) link, or select **... (ellipsis)** and then select **Create Eventstream**.

    :::image type="content" source="./media/get-azure-blob-storage-events/azure-events-create.png" alt-text="Screenshot that shows the Real-Time hub Azure events page.":::
    
    Now, use instructions from the [Configure and create an eventstream](#configure-and-create-an-eventstream) section.

## Configure and create an eventstream

1. On the **Connect** page, select the **Azure subscription** that has the storage account.
1. Select the **Azure Blob Storage account** that you want to receive events for.
1. In the **Stream details** section, enter a **name for the eventstream** that the Wizard is going to create, and select the **workspace** where you want to save the eventstream.
1. Then, select **Next** at the bottom of the page.

    :::image type="content" source="./media/get-azure-blob-storage-events/connect-settings.png" alt-text="Screenshot that shows the connection settings for an Azure Blob Storage account.":::
1. On the **Review + connect** page, review settings, and select **Connect**.

    :::image type="content" source="./media/get-azure-blob-storage-events/review-create-page.png" alt-text="Screenshot that shows the Review + connect page." lightbox="./media/get-azure-blob-storage-events/review-create-page.png":::
1. When the wizard succeeds in creating a stream, on the **Review + connect** page, if you select **Open eventstream**, the wizard opens the eventstream that it created for you. To close the wizard, select **Finish** at the bottom of the page.

    :::image type="content" source="./media/get-azure-blob-storage-events/review-create-success.png" alt-text="Screenshot that shows the Review + connect page with links to open the eventstream." lightbox="./media/get-azure-blob-storage-events/review-create-success.png":::

## View stream from the Real-Time hub page
Select **Real-Time hub** on the left navigation menu, and confirm that you see the stream you created. Refresh the page if you don't see it. 

:::image type="content" source="./media/get-azure-blob-storage-events/azure-blob-stream.png" alt-text="Screenshot that shows the All data streams page with the generated stream." lightbox="./media/get-azure-blob-storage-events/azure-blob-stream.png":::

For detailed steps, see [View details of data streams in Fabric Real-Time hub](view-data-stream-details.md).


## Related content

To learn about consuming data streams, see the following articles:

- [Process data streams](process-data-streams-using-transformations.md)
- [Analyze data streams](analyze-data-streams-using-kql-table-queries.md)
- [Set alerts on data streams](set-alerts-data-streams.md)
