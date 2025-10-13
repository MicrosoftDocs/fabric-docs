---
title: Set alerts on Azure Blob Storage events in Real-Time hub
description: This article describes how to set alerts on Azure Blob Storage events in Real-Time hub.
author: mystina
ms.author: majia
ms.topic: how-to
ms.custom:
ms.date: 10/13/2025
---

# Set alerts on Azure Blob Storage events in Real-Time hub

This article describes how to set alerts on Azure Blob Storage events in Real-Time hub.

[!INCLUDE [consume-fabric-events-regions](./includes/consume-fabric-events-regions.md)]

## Navigate to Real-Time hub

[!INCLUDE [navigate-to-real-time-hub](./includes/navigate-to-real-time-hub.md)]

## Launch the Set alert page

Do steps from one of the following sections, which opens a side panel where you can configure the following options:

- Events you want to monitor.
- Conditions you want to look for in the events.
- Action you want Fabric [!INCLUDE [fabric-activator](../real-time-intelligence/includes/fabric-activator.md)] to take.

### From the events list

1. In Real-Time hub, select **Azure events** under **Subscribe to** category.
1. Move the mouse over **Azure blob storage events**, and do one of the following steps:
    - Select the **Alert** button
    - Select **ellipsis (...)**, and select **Set alert**.
    
    :::image type="content" source="./media/set-alerts-azure-blob-storage-events/set-alert-from-list.png" alt-text="Screenshot that shows the Azure events page with Set alert pages for Azure blob storage events." lightbox="./media/set-alerts-azure-blob-storage-events/set-alert-from-list.png":::

### From the event detail page

1. Select either **Azure blob storage events** from the list see the detail page.
1. On the detail page, select **Set alert** button at the top of page.

    :::image type="content" source="./media/set-alerts-azure-blob-storage-events/set-alert-from-detail-page.png" alt-text="Screenshot that shows the Azure blob storage events detail page with Set alert button selected." lightbox="./media/set-alerts-azure-blob-storage-events/set-alert-from-detail-page.png":::

## Monitor for Azure Blob Storage events

1. In the **Monitor** section of the **Add rule** pange to the right, for **Source**, select **Source source events**.

    :::image type="content" source="./media/set-alerts-azure-blob-storage-events/select-source-events.png" alt-text="Screenshot that shows the Add rule pane." lightbox="./media/set-alerts-azure-blob-storage-events/select-source-events.png":::        
1. On the **Configure** page of the **Connect data source** wizard, select **Connect to existing Azure Blob Storage account** if you haven't connected this storage account before. If you had already connected the storage account, chose **Select a connected Azure Blob Storage account**, and then select the storage account from the drop-down list. 
1. Select the **Azure subscription** that has the Azure storage account.
1. Select the **Azure storage account**.
1. In the **Stream details** section to the right, select the **Workspace** where you want to save the alert, and enter a name for the **eventstream**.
1. Select **Next**.
        
    :::image type="content" source="./media/set-alerts-azure-blob-storage-events/connect-azure-storage-account.png" alt-text="Screenshot that shows the Add source wizard Connect page for an Azure storage account." lightbox="./media/set-alerts-azure-blob-storage-events/connect-azure-storage-account.png"::: 
1. On the **Configure event types and source** page, follow these steps: 
    1. For **Event types**, select the events that you want to monitor.

        :::image type="content" source="./media/set-alerts-azure-blob-storage-events/select-event-types.png" alt-text="Screenshot that shows the available event types for an Azure storage account." lightbox="./media/set-alerts-azure-blob-storage-events/select-event-types.png":::        
    1. In the **Set filters** section, select **+ Filter** to a filter based on a field.
    
        :::image type="content" source="./media/set-alerts-azure-blob-storage-events/add-filter.png" alt-text="Screenshot that shows a sample filter for Azure blob storage events." lightbox="./media/set-alerts-azure-blob-storage-events/add-filter.png":::        
    1. Select **Next**.
1. On the **Review + connect** page, review the settings, and select **Connect** or **Create source**.
    
    :::image type="content" source="./media/set-alerts-azure-blob-storage-events/review-create.png" alt-text="Screenshot that shows the Add source wizard Review + connect page for Azure blob storage events." lightbox="./media/set-alerts-azure-blob-storage-events/review-create.png":::                
1. Once it's successful, select **Save** at the bottom of the wizard. You can also select **Open Eventstream** to view the eventstream that's created by the wizard. 

    :::image type="content" source="./media/set-alerts-azure-blob-storage-events/save-eventstream.png" alt-text="Screenshot that shows the review + connect page after the eventstream is successfully created." lightbox="./media/set-alerts-azure-blob-storage-events/save-eventstream.png":::                    


[!INCLUDE [set-details-conditions-actions-rule](./includes/set-details-conditions-actions-rule.md)]

## Create the alert

Select **Create** at the bottom of the page to create the alert.

:::image type="content" source="./media/set-alerts-azure-blob-storage-events/set-alert.png" alt-text="Screenshot that shows the Set alert page for Azure blob storage events." lightbox="./media/set-alerts-azure-blob-storage-events/set-alert.png":::                

## Related content

- [Set alerts on Fabric workspace item events](set-alerts-fabric-workspace-item-events.md)
- [Set alerts on data streams](set-alerts-data-streams.md)
