---
title: Set alerts on Azure Blob Storage events in Real-Time hub
description: This article describes how to set alerts on Azure Blob Storage events in Real-Time hub.
author: ajetasin
ms.author: ajetasi
ms.topic: how-to
ms.date: 05/21/2024
---

# Set alerts on Azure Blob Storage events in Real-Time hub
This article describes how to set alerts on Azure Blob Storage events in Real-Time hub.

[!INCLUDE [preview-note](./includes/preview-note.md)]

## Launch the Set alert page 

Do steps from one of the following sections, which opens a side panel where you can configure the following options:

- Events you want to monitor.
- Conditions you want to look for in the events.
- Action you want Data Activator to take. 

### From the events list

1. In Real-Time hub, switch to the **Fabric events** tab. 
1. Move the mouse over **Azure blob storage events**, and do one of the following steps: 
    - Select the **Alert** button 
    - Select **ellipsis (...)**, and select **Set alert**.
    
    :::image type="content" source="./media/set-alerts-azure-blob-storage-events/set-alert-from-list.png" alt-text="Screenshot that shows the Fabric events tab with Set alert menus for Azure blob storage events." lightbox="./media/set-alerts-azure-blob-storage-events/set-alert-from-list.png":::

### From the event detail page

1. Select either **Azure blob storage events** from the list see the detail page. 
1. On the detail page, select **Set alert** button at the top of page. 

    :::image type="content" source="./media/set-alerts-azure-blob-storage-events/set-alert-from-detail-page.png" alt-text="Screenshot that shows the Azure blob storage events detail page with Set alert button selected." lightbox="./media/set-alerts-azure-blob-storage-events/set-alert-from-detail-page.png":::

## Set alert for Azure blob storage events

On the **Set alert** page, follow these steps:

1. In the **Monitor** section, choose **Select events**.
1. In the **Get events** wizard, do these steps:
    1. On the **Connect** page, if you're connecting to the Azure storage account for the first time, do these steps: 
        1. Select the **Azure subscription** that has the Azure storage account.
        1. Select the **Azure storage account**.
        1. In the **Stream details** section, select the **Workspace** where you want to save the alert, and enter a name for the **eventstream**.
        1. Select **Next**.
        
            :::image type="content" source="./media/set-alerts-azure-blob-storage-events/connect-azure-storage-account.png" alt-text="Screenshot that shows the Connect page of the Get events wizard for an Azure storage account." lightbox="./media/set-alerts-azure-blob-storage-events/connect-azure-storage-account.png":::
    1. On the **Configure event types and source** page, do these steps:
        1. For **Event types**, select the events that you want to monitor.

            :::image type="content" source="./media/set-alerts-azure-blob-storage-events/select-event-types.png" alt-text="Screenshot that shows the available event types for an Azure storage account." lightbox="./media/set-alerts-azure-blob-storage-events/select-event-types.png":::        
        1. In the **Set filters** section, select **+ Filter** to a filter based on a field.
        
            :::image type="content" source="./media/set-alerts-azure-blob-storage-events/add-filter.png" alt-text="Screenshot that shows a sample filter for Azure blob storage events." lightbox="./media/set-alerts-azure-blob-storage-events/add-filter.png":::        
        1. Select **Next**. 
    1. On the **Review and create** page, review the settings, and select **Create source**. 
    
        :::image type="content" source="./media/set-alerts-azure-blob-storage-events/review-create.png" alt-text="Screenshot that shows Review and create page of the Get events wizard for Azure blob storage events." lightbox="./media/set-alerts-azure-blob-storage-events/review-create.png":::                
1. For **Condition**, confirm that **On each event** is selected. 
1. For **Action**, select one of the following options:
    1. To receive an email when the event occurs and the condition is met, select **Send me an email**. 
    1. To receive notification via Teams, select **Message me in Teams**.
    1. To run a Fabric item, select **Run a Fabric item**. 
1. In the **Save location** section, do these steps: 
    1. For **Workspace**, select the workspace where you want to save the alert. 
    1. For **Reflex item**, select an existing Reflex item or create a Reflex item for this alert. 
1. Select **Create** at the bottom of the page to create the alert. 

    :::image type="content" source="./media/set-alerts-azure-blob-storage-events/set-alert.png" alt-text="Screenshot that shows the Set alert page for Azure blob storage events." lightbox="./media/set-alerts-azure-blob-storage-events/set-alert.png":::                

## Related content

- [Set alerts on Fabric workspace item events](set-alerts-fabric-workspace-item-events.md)
- [Set alerts on data streams](set-alerts-data-streams.md)
