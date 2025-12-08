---
title: Set alerts on Job events in Real-Time hub
description: This article describes how to set alerts on Job events in Real-Time hub.
author: robece
ms.author: robece
ms.topic: how-to
ms.date: 10/14/2025
---

# Set alerts on Job events in Real-Time hub

This article describes how to set alerts on Job events in Real-Time hub.

[!INCLUDE [consume-fabric-events-regions](./includes/consume-fabric-events-regions.md)]

## Navigate to Real-Time hub

[!INCLUDE [navigate-to-real-time-hub](./includes/navigate-to-real-time-hub.md)]


## Launch the Set alert page

Do steps from one of the following sections, which opens a side panel where you can configure the following options:

- Events you want to monitor.
- Conditions you want to look for in the events.
- Action you want Activator to take.

### Using the events list

1. In Real-Time hub, select **Fabric events**.
1. Move the mouse over **Job events**, and do one of the following steps:
    - Select the **Alert** button.
    - Select **ellipsis (...)**, and select **Set alert**.

        :::image type="content" source="./media/set-alerts-fabric-job-events/list-page.png" alt-text="Screenshot that shows the Fabric events list page." lightbox="./media/set-alerts-fabric-job-events/list-page.png":::
    

### Using the event detail page

1. Select **Job events** from the list see the detail page.
1. On the detail page, select **Set alert** button at the top of page.

    :::image type="content" source="./media/set-alerts-fabric-job-events/detail-view.png" alt-text="Screenshot that shows the Job events detail page with Set alert button selected." lightbox="./media/set-alerts-fabric-job-events/detail-view.png":::

[!INCLUDE [rule-details](./includes/rule-details.md)]

## Monitor section

On the **Set alert** page, follow these steps:

1. In the **Monitor** section, for **Source**, choose **Select source events**.

    :::image type="content" source="./media/set-alerts-fabric-job-events/select-events-link.png" alt-text="Screenshot that shows the Set alert page." lightbox="./media/set-alerts-fabric-job-events/select-events-link.png":::    
1. In the **Connect data source** wizard, do these steps:
    1. For **Event types**, select event types that you want to monitor.
    
        :::image type="content" source="./media/set-alerts-fabric-job-events/select-events.png" alt-text="Screenshot that shows the Connect data source wizard with events selected." lightbox="./media/set-alerts-fabric-job-events/select-events.png":::    
    1. This step is optional. To see the schemas for event types,  select **View selected event type schemas**. If you select it, browse through schemas for the events, and then navigate back to previous page by selecting the backward arrow button at the top. 
    1. For **Event source**, confirm that **By item** is selected. 
    1. For **Workspace**, select a workspace where the Fabric item is. 
    1. For **Item**, select the Fabric item. 
    
        :::image type="content" source="./media/set-alerts-fabric-job-events/source-workspace-item.png" alt-text="Screenshot that shows the source, workspace, and item selected." lightbox="./media/set-alerts-fabric-job-events/source-workspace-item.png":::            
    1. Now, on the **Configure connection settings** page, you can add filters to set the filter conditions by selecting fields to watch and the alert value. To add a filter:
        1. Select **+ Filter**. 
        1. Select a field.
        1. Select an operator.
        1. Select one or more values to match. 
 
            :::image type="content" source="./media/set-alerts-fabric-job-events/set-filters.png" alt-text="Screenshot that shows the addition of a filter." lightbox="./media/set-alerts-fabric-job-events/set-filters.png":::                 
    1. Select **Next** at the bottom of the page. 
    1. On the **Review + connect** page, review the settings, and select **Save**.
    
        :::image type="content" source="./media/set-alerts-fabric-job-events/review-create-page.png" alt-text="Screenshot that shows the Add source wizard Review and create page for Job events.":::        

[!INCLUDE [rule-condition-events](./includes/rule-condition-events.md)]

[!INCLUDE [rule-action](./includes/rule-action.md)]

[!INCLUDE [rule-save-location](./includes/rule-save-location.md)]


## Create alert

1. Select **Create** at the bottom of the page to create the alert.

    :::image type="content" source="./media/set-alerts-fabric-job-events/create-alert.png" alt-text="Screenshot that shows the Set alert page with all fields selected.":::        
1. You see the **Alert created** page with a link to **open** the rule in the Fabric activator user interface in a separate tab. Select **Done** to close the **Alert created** page. 

    :::image type="content" source="./media/set-alerts-fabric-job-events/alert-created.png" alt-text="Screenshot that shows Alert created page.":::        
1. You see a page with the activator item created by the **Add rule** wizard. If you are on the **Fabric events** page, select **Job events** to see this page. 

    :::image type="content" source="./media/set-alerts-fabric-job-events/items-created-wizard.png" alt-text="Screenshot that shows the Fabric Job items events page with the activator item created." lightbox="./media/set-alerts-fabric-job-events/items-created-wizard.png":::      
1. Move the mouse over the **Activator** item, and select **Open**. 

    :::image type="content" source="./media/set-alerts-fabric-job-events/activator-menu.png" alt-text="Screenshot that shows the activator menu." lightbox="./media/set-alerts-fabric-job-events/activator-menu.png"::: 
1. You see the Activator item in the Fabric Activator editor user interface. Select the rule if it's not already selected. You can update the rule in this user interface. For example, update the subject, headline, or change the action from email to Teams message. 

    :::image type="content" source="./media/set-alerts-fabric-job-events/activator-editor.png" alt-text="Screenshot that shows the activator in an editor." lightbox="./media/set-alerts-fabric-job-events/activator-editor.png"::: 

## Related content

- [Set alerts on Azure blob storage events](set-alerts-azure-blob-storage-events.md)
- [Set alerts on Fabric workspace item events](set-alerts-fabric-workspace-item-events.md)
