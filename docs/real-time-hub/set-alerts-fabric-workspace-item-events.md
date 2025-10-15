---
title: Set alerts on Fabric workspace item events in Real-Time hub
description: This article describes how to set alerts on Fabric workspace item events in Real-Time hub.
author: mystina
ms.author: majia
ms.topic: how-to
ms.custom:
ms.date: 10/13/2025
---

# Set alerts on Fabric workspace item events in Real-Time hub
This article describes how to set alerts on Fabric workspace item events in Real-Time hub.

[!INCLUDE [consume-fabric-events-regions](./includes/consume-fabric-events-regions.md)]

[!INCLUDE [deprecated-fabric-workspace-events](./includes/deprecated-fabric-workspace-events.md)]

## Navigate to Real-Time hub

[!INCLUDE [navigate-to-real-time-hub](./includes/navigate-to-real-time-hub.md)]

## Launch the Set alert page

Do steps from one of the following sections, which opens a side panel where you can configure the following options:

- Events you want to monitor.
- Conditions you want to look for in the events.
- Action you want Fabric [!INCLUDE [fabric-activator](../real-time-intelligence/includes/fabric-activator.md)] to take.

### Use events list

1. In Real-Time hub, select **Fabric events** under **Subscribe to** category.
1. Move the mouse over **Fabric workspace item events**, and do one of the following steps:
    - Select the **Alert** button.
    - Select **ellipsis (...)**, and select **Set alert**.

    :::image type="content" source="./media/set-alerts-fabric-workspace-item-events/set-alert-from-list.png" alt-text="Screenshot that shows the Azure events page with Set alert pages for Azure blob storage events." lightbox="./media/set-alerts-fabric-workspace-item-events/set-alert-from-list.png":::    

### Use the event detail page

1. Select **Workspace item events** from the list see the detail page.
1. On the detail page, select **Set alert** button at the top of page.

    :::image type="content" source="./media/set-alerts-fabric-workspace-item-events/set-alert-from-detail-page.png" alt-text="Screenshot that shows the Azure blob storage events detail page with Set alert button selected." lightbox="./media/set-alerts-fabric-workspace-item-events/set-alert-from-detail-page.png":::

[!INCLUDE [rule-details](./includes/rule-details.md)]

## Monitor section


1. In the **Monitor** section, for **Source**, choose **Select source events**.

    :::image type="content" source="./media/set-alerts-fabric-workspace-item-events/set-alert-page.png" alt-text="Screenshot that shows the Set alert page." lightbox="./media/set-alerts-fabric-workspace-item-events/set-alert-page.png":::   
1. In the **Connect data source** wizard, do these steps:
    1. For **Event types**, select event types that you want to monitor.
    
        :::image type="content" source="./media/set-alerts-fabric-workspace-item-events/event-types.png" alt-text="Screenshot that shows the event types for Fabric workspace item events.":::
    1. For **Workspaces**, select the Fabric workspace.
    
        :::image type="content" source="./media/set-alerts-fabric-workspace-item-events/select-workspace.png" alt-text="Screenshot that shows the Connect page for Fabric workspace item events with a Fabric workspace selected." lightbox="./media/set-alerts-fabric-workspace-item-events/select-workspace.png":::
    1. In the **Set filters** section, select **+ Filter** to a filter based on a field.

        :::image type="content" source="./media/set-alerts-fabric-workspace-item-events/set-filter.png" alt-text="Screenshot that shows setting of a filter in the Add source wizard for Fabric workspace item events." lightbox="./media/set-alerts-fabric-workspace-item-events/set-filter.png":::        
    1. Select **Next**.
    1. On the **Review + connect** page, review the settings, and select **Save**.
    
        :::image type="content" source="./media/set-alerts-fabric-workspace-item-events/review-create-page.png" alt-text="Screenshot that shows the Add source wizard Review + connect page for Fabric workspace item events."::: 

[!INCLUDE [rule-condition-events](./includes/rule-condition-events.md)]

[!INCLUDE [rule-action](./includes/rule-action.md)]

[!INCLUDE [rule-save-location](./includes/rule-save-location.md)]
       

## Create alert
1. Select **Create** at the bottom of the page to create the alert.

    :::image type="content" source="./media/set-alerts-fabric-workspace-item-events/create-alert.png" alt-text="Screenshot that shows the Set alert page with all fields selected.":::        
1. You see the **Alert created** page with a link to **open** the rule in the Fabric activator user interface in a separate tab. Select **Done** to close the **Alert created** page. 

    :::image type="content" source="./media/set-alerts-fabric-workspace-item-events/alert-created-page.png" alt-text="Screenshot that shows the Alert created page for Fabric workspace item events." lightbox="./media/set-alerts-fabric-workspace-item-events/alert-created-page.png":::
1. You see a page with the activator item created by the **Add rule** wizard. If you are on the **Fabric events** page, select **Workspace item events** to see this page. 

    :::image type="content" source="./media/set-alerts-fabric-workspace-item-events/items-created-wizard.png" alt-text="Screenshot that shows the Fabric Workspace items events page with the activator items created." lightbox="./media/set-alerts-fabric-workspace-item-events/items-created-wizard.png":::      
1. Move the mouse over the **Activator** item, and select **Open**. 

    :::image type="content" source="./media/set-alerts-fabric-workspace-item-events/activator-menu.png" alt-text="Screenshot that shows the activator menu." lightbox="./media/set-alerts-fabric-workspace-item-events/activator-menu.png"::: 
1. You see the Activator item in the Fabric Activator editor user interface. Select the rule if it's not already selected. You can update the rule in this user interface. For example, update the subject, headline, or change the action from email to Teams message. 

    :::image type="content" source="./media/set-alerts-fabric-workspace-item-events/activator-editor.png" alt-text="Screenshot that shows the activator in an editor." lightbox="./media/set-alerts-fabric-workspace-item-events/activator-editor.png"::: 

## Related content

- [Set alerts on Azure blob storage events](set-alerts-azure-blob-storage-events.md)
- [Set alerts on Fabric workspace item events](set-alerts-fabric-workspace-item-events.md)
