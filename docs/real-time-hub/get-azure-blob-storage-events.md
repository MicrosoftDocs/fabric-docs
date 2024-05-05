---
title: Get Azure Blob Storage events in Real-Time hub
description: This article describes how to get Azure Blob Storage events as an eventstream in Fabric Real-Time hub.
author: ahartoon
ms.author: anboisve
ms.topic: how-to
ms.date: 05/21/2024
---

# Get Azure Blob Storage events in Real-Time hub
This article describes how to get Azure Blob Storage events as an eventstream in Fabric Real-Time hub.

[!INCLUDE [preview-note](./includes/preview-note.md)]

## Prerequisites 

- Get access to the Fabric **premium** workspace with **Contributor** or above permissions. 
- An Azure Blob Storage account of kind **StorageV2** (general purpose v2), Block Blob Storage, or Blob Storage. General purpose v1 storage accounts aren't supported. 

## Create streams for Azure Blob Storage events
You can create streams for Azure Blob Storage events in Real-Time hub using one of the ways:

- Using the **Get events** experience
- Using the **Fabric events** tab

[!INCLUDE [launch-get-events-experience](./includes/launch-get-events-experience.md)]

Use instructions from the [Configure and create an eventstream](#configure-and-create-an-eventstream) section after you do the following step:

On the **Get events** page, select **Azure Blob Storage events**.

:::image type="content" source="./media/get-azure-blob-storage-events/select-azure-blob-storage-events.png" alt-text="Screenshot that shows the Get events page with Azure Blob Storage events selected.":::


## Fabric events tab

1. In Real-Time hub, switch to the **Fabric events** tab. 
1. Move the mouse over **Azure Blob Storage**, and select the **Create stream** link or select ... (ellipsis) and then select **Create stream**. 

    :::image type="content" source="./media/get-azure-blob-storage-events/fabric-events-tab.png" alt-text="Screenshot that shows the Fabric events tab of the Real-Time hub.":::

## Configure and create an eventstream

1. On the **Connect** page, select the **Azure subscription** that has the storage account
1. Select the **Azure Blob Storage account** that you want to receive events for. 
1. In the **Stream details** section, enter a **name for the eventstream** that the Wizard is going to create, and select the **workspace** where you want to save the eventstream.
1. Then, select **Next** at the bottom of the page.

    :::image type="content" source="./media/get-azure-blob-storage-events/connect-settings.png" alt-text="Screenshot that shows the Connect settings for an Azure Blob Storage account.":::
1. On the **Review and create** page, review settings, and select **Create source**. 

    :::image type="content" source="./media/get-azure-blob-storage-events/review-create-page.png" alt-text="Screenshot that shows the Review and create page." lightbox="./media/get-azure-blob-storage-events/review-create-page.png":::
1. When the wizard succeeds in creating a stream, you see a link to **open the eventstream** and **close** the wizard.

    :::image type="content" source="./media/get-azure-blob-storage-events/review-create-success.png" alt-text="Screenshot that shows the Review and create page with links to open the eventstream." lightbox="./media/get-azure-blob-storage-events/review-create-success.png":::

## View stream on the Data streams tab

1. In **Real-Time hub**, switch to the **Data streams** tab. 
1. Confirm that you see the stream you created. 

    :::image type="content" source="./media/get-azure-blob-storage-events/verify-data-stream.png" alt-text="Screenshot that shows the Data streams tab with the generated stream." lightbox="./media/get-azure-blob-storage-events/verify-data-stream.png":::

## Next step
The eventstream has a stream output on which you can [set alerts](set-alerts-data-streams.md). After you open the eventstream, you can optionally add transformations to [transform the data](../real-time-intelligence/event-streams/route-events-based-on-content.md?branch=release-build-fabric#supported-operations) and [add destinations](../real-time-intelligence/event-streams/add-manage-eventstream-destinations.md) to send the output data to a supported destination. For more information, see [Consume data streams](consume-data-streams.md).

