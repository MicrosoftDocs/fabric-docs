---
title: Get Azure Blob Storage events in Real-time hub
description: This article describes how to get Azure Blob Storage events as an eventstream in Fabric Real-time hub.
author: ahartoon
ms.author: anboisve
ms.topic: how-to
ms.date: 05/21/2024
---

# Get Azure Blob Storage events in Real-time hub
This article describes how to get Azure Blob Storage events as an eventstream in Fabric Real-time hub.

[!INCLUDE [preview-note](./includes/preview-note.md)]

## Prerequisites 

- Get access to the Fabric **premium** workspace with **Contributor** or above permissions. 
- An Azure Blob Storage account of kind **StorageV2** (general purpose v2), Block Blob Storage, or Blob Storage. General purpose v1 storage accounts aren't supported. 

## Create streams for Azure Blob Storage events
You can create streams for Azure Blob Storage events in Real-time hub using one of the ways:

- Using the **Get events** experience
- Using the **Fabric events** tab

[!INCLUDE [launch-get-events-experience](./includes/launch-get-events-experience.md)]

Use instructions from the [Configure and create an eventstream](#configure-and-create-an-eventstream) section after you do the following step:

On the **Get events** page, select **Azure Blob Storage events**.

:::image type="content" source="./media/get-azure-blob-storage-events/select-azure-blob-storage-events.png" alt-text="Screenshot that shows the Get events page with Azure Blob Storage events selected.":::


## Fabric events tab

1. In Real-time hub, switch to the **Fabric events** tab. 
1. Move the mouse over **Azure Blob Storage**, and select the **Create stream** link or select ... (ellipsis) and then select **Create stream**. 

    :::image type="content" source="./media/get-azure-blob-storage-events/fabric-events-tab.png" alt-text="Screenshot that shows the Fabric events tab of the Real-time hub.":::

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

1. In **Real-time hub**, switch to the **Data streams** tab. 
1. Confirm that you see the stream you created. 

    :::image type="content" source="./media/get-azure-blob-storage-events/verify-data-stream.png" alt-text="Screenshot that shows the Data streams tab with the generated stream." lightbox="./media/get-azure-blob-storage-events/verify-data-stream.png":::


## Related content

- [Set alerts on Azure Blob Storage events in Real-time hub](set-alerts-azure-blob-storage-events.md)
- - [Set alerts on Fabric Workspace item events in Real-time hub](set-alerts-fabric-workspace-item-events.md)
- [Create streams for Fabric workspace item events](create-streams-fabric-workspace-item-events.md)