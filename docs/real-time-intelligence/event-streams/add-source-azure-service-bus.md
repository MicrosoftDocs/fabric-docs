---
title: Add Azure Service Bus source to an eventstream
description: Learn how to add an Azure Service Bus source to an eventstream. This feature is currently in preview.
ms.reviewer: spelluru
ms.author: zhenxilin
author: alexlzx
ms.topic: how-to
ms.date: 11/18/2024
ms.search.form: Source and Destination
ms.custom: reference_regions
---

# Add Azure Service Bus source to an eventstream (preview)
This article shows you how to add an Azure Service Bus source to an eventstream.  

Azure Service Bus is a fully managed enterprise message broker with message queues and publish-subscribe topics. Microsoft Fabric event streams allow you to connect to Azure Service Bus, where messages in the Service Bus can be fetched into Fabric eventstream and routed to various destinations within Fabric. 

> [!NOTE]
> This source is not supported in the following regions of your workspace capacity: West US3, Switzerland West.  

## Prerequisites 
Before you start, you must complete the following prerequisites: 

- Access to a workspace in the Fabric capacity license mode (or) the Trial license mode with Contributor or higher permissions.  
- You need to have appropriate permission to get access keys for Service Bus namespace, queues or topics. The Service Bus namespace must be publicly accessible and not behind a firewall or secured in a virtual network. 
- If you don't have an eventstream, [create an eventstream](create-manage-an-eventstream.md). 

## Launch the Select a data source wizard
[!INCLUDE [launch-connect-external-source](./includes/launch-connect-external-source.md)]

On the **Select a data source** page, search for and select **Connect** on the **Azure Service Bus** tile.

:::image type="content" source="./media/add-source-azure-service-bus/select-azure-service-bus.png" alt-text="Screenshot that shows the selection of Azure Service Bus as the source type in the Get events wizard." lightbox="./media/add-source-azure-service-bus/select-azure-service-bus.png":::


## Configure Azure Service Bus connector
[!INCLUDE [azure-service-bus-connector](./includes/azure-service-bus-source-connector.md)]

## View updated eventstream

1. You see that the Azure Service Bus source is added to your eventstream on the canvas in the **Edit** mode. To publish it to live, select **Publish** on the ribbon.

    :::image type="content" source="./media/add-source-azure-service-bus/event-stream-publish.png" alt-text="Screenshot that shows the editor with Publish button selected." lightbox="./media/add-source-azure-service-bus/event-stream-publish.png":::
1. After you complete these steps, the Azure service bus is available for visualization in the **Live view**. Select the **Service Bus** tile in the diagram to see the page similar to the following one.

    :::image type="content" source="./media/add-source-azure-service-bus/live-view.png" alt-text="Screenshot that shows the editor in the live view.":::



## Related content
For a list of all supported sources, see [Add and manage an event source](add-manage-eventstream-sources.md).
