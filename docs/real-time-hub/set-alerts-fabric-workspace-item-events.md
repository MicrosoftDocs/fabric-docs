---
title: Set alerts on Fabric workspace item events in Real-Time hub
description: This article describes how to set alerts on Fabric workspace item events in Real-Time hub.
author: ajetasin
ms.author: ajetasi
ms.topic: how-to
ms.date: 05/21/2024
---

# Set alerts on Fabric workspace item events in Real-Time hub
This article describes how to set alerts on Fabric workspace item events in Real-Time hub.

[!INCLUDE [preview-note](./includes/preview-note.md)]

## Launch the Set alert page 

Do steps from one of the following sections, which opens a side panel where you can configure the following options:

- Events you want to monitor.
- Conditions you want to look for in the events.
- Action you want Data Activator to take. 

### From the events list

1. In Real-Time hub, switch to the **Fabric events** tab. 
1. Move the mouse over **Fabric workspace item events**, and do one of the following steps: 
    - Select the **Alert** button 
    - Select **ellipsis (...)**, and select **Set alert**.

### From the event detail page

1. Select **Fabric workspace item events** from the list see the detail page. 
1. On the detail page, select **Create alert** button at the top of page. 

## Set alert for Fabric workspace item events

On the **Set alert** page, follow these steps:

1. In the **Monitor** section, choose **Select events**.
1. In the **Get events** wizard, do these steps:
    1. For **Event types**, select event types that you want to monitor.
    
        :::image type="content" source="./media/set-alerts-fabric-workspace-item-events/event-types.png" alt-text="Screenshot that shows the event types for Fabric workspace item events.":::
    1. For **Workspaces**, select the Fabric workspace.
    
        :::image type="content" source="./media/set-alerts-fabric-workspace-item-events/select-workspace.png" alt-text="Screenshot that shows the Connect page for Fabric workspace item events with a Fabric workspace selected." lightbox="./media/set-alerts-fabric-workspace-item-events/select-workspace.png":::
    1. In the **Set filters** section, select **+ Filter** to a filter based on a field.
    1. Select **Next**. 
    1. On the **Review and create** page, review the settings, and select **Save**. 
    
        :::image type="content" source="./media/set-alerts-fabric-workspace-item-events/review-create-page.png" alt-text="Screenshot that shows the Review and create page in the Get events wizard for Fabric workspace item events.":::        
1. For **Condition**, select one of the following options:
    1. If you want to monitor each event with no condition, select **On each event**. 
1. For **Action**, select one of the following options:
    1. To receive an email when the event occurs and the condition is met, select **Send me an email**. 
    1. To receive notification via Teams, select **Message me in Teams**.
    1. To run a Fabric item, select **Run a Fabric item**. 
1. In the **Save location** section, do these steps: 
    1. For **Workspace**, select the workspace where you want to save the alert. 
    1. For **Reflex item**, select an existing Reflex item or create a Reflex item for this alert. 
1. Select **Create** at the bottom of the page to create the alert. 

    :::image type="content" source="./media/set-alerts-fabric-workspace-item-events/create-alert.png" alt-text="Screenshot that shows the Set alert page with all fields selected.":::        
## Related content

- [Set alerts on Azure blob storage events](set-alerts-azure-blob-storage-events.md)