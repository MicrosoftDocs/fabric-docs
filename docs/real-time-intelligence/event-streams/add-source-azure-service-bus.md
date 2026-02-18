---
title: Add an Azure Service Bus Source to an Eventstream
description: Learn how to add an Azure Service Bus source to an eventstream. This feature is currently in preview.
ms.reviewer: zhenxilin
ms.topic: how-to
ms.date: 11/18/2024
ms.search.form: Source and Destination
ms.custom: reference_regions
---

# Add an Azure Service Bus source to an eventstream (preview)

Azure Service Bus is a fully managed enterprise message broker with message queues and publish/subscribe topics. You can use Microsoft Fabric eventstreams to connect to Service Bus. Messages in Service Bus can be fetched into a Fabric eventstream and routed to various destinations within Fabric.

This article shows you how to add a Service Bus source to an eventstream.

## Prerequisites

- Access to a workspace in the Fabric capacity license mode or trial license mode with Contributor or higher permissions.  
- Appropriate permission to get access keys for the Service Bus namespace, queues, or topics. The Service Bus namespace must be publicly accessible and not behind a firewall or secured in a virtual network.
- An eventstream. If you don't have an eventstream, [create one](create-manage-an-eventstream.md).

## Start the wizard for selecting a data source

[!INCLUDE [launch-connect-external-source](./includes/launch-connect-external-source.md)]

On the **Select a data source** page, search for **Azure Service Bus**. On the **Azure Service Bus** tile, select **Connect**.

:::image type="content" source="./media/add-source-azure-service-bus/select-azure-service-bus.png" alt-text="Screenshot that shows the selection of Azure Service Bus as the source type in the wizard for getting events." lightbox="./media/add-source-azure-service-bus/select-azure-service-bus.png":::

## Configure a Service Bus connector

[!INCLUDE [azure-service-bus-connector](./includes/azure-service-bus-source-connector.md)]

## View an updated eventstream

1. Confirm that the Service Bus source is added to your eventstream on the canvas in the **Edit** mode. To publish it, select **Publish** on the ribbon.

    :::image type="content" source="./media/add-source-azure-service-bus/event-stream-publish.png" alt-text="Screenshot that shows the editor with the Publish button selected." lightbox="./media/add-source-azure-service-bus/event-stream-publish.png":::

1. The Service Bus source is available for visualization in the **Live** view. Select the **Service Bus** tile in the diagram to open a page similar to the following example.

    :::image type="content" source="./media/add-source-azure-service-bus/live-view.png" alt-text="Screenshot that shows the editor in the live view.":::

## Limitation
* The Azure Service Bus source currently doesn't support CI/CD features, including **Git Integration** and **Deployment Pipeline**. Attempting to export or import an Eventstream item with this source to a Git repository may result in errors.

## Related content

- For a list of all supported sources, see [Add and manage an event source in an eventstream](add-manage-eventstream-sources.md).


