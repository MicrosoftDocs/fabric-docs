---
title: Set alerts on business events in Real-Time hub
description: This article describes how to set alerts on business events in Real-Time hub.
ms.reviewer: majia
ms.topic: how-to
ms.date: 12/14/2025
---

# Set alerts on business events in Real-Time hub

This article describes how to set alerts on business events in Real-Time hub.

## Navigate to Real-Time hub

[!INCLUDE [navigate-to-real-time-hub](./includes/navigate-to-real-time-hub.md)]

## Launch the Set alert page

Do steps from one of the following sections, which opens a side panel where you can configure the following options:

- Events you want to monitor.
- Conditions you want to look for in the events.
- Action you want Fabric Activator to take.

### Launch from the events list

1. In Real-Time hub, select **Business events** under **Subscribe to** category.

1. Move the mouse over your business event, and do one of the following steps:

    - Select the **Set alert** button

    - Select **ellipsis (...)**, and select **Set alert**.
    
        :::image type="content" source="./media/set-alerts-business-events/set-alert-menu.png" alt-text="Screenshot that shows the Business events page with Set alert menu for your business events." lightbox="./media/set-alerts-business-events/set-alert-menu.png":::

### Launch from the event detail page

1. Select your business event from the list see the detail page.

1. On the detail page, select **Set alert** button at the top of page.

    :::image type="content" source="./media/set-alerts-business-events/set-alert-from-detail-page.png" alt-text="Screenshot that shows the Azure blob storage events detail page with Set alert button selected." lightbox="./media/set-alerts-business-events/set-alert-from-detail-page.png":::


[!INCLUDE [rule-details](./includes/rule-details.md)]

## Monitor section

1. In the **Monitor** section of the **Add rule** pane, for **Source**, select **Business events**.

    :::image type="content" source="./media/set-alerts-business-events/select-source-events.png" alt-text="Screenshot that shows the Add rule pane." lightbox="./media/set-alerts-business-events/select-source-events.png":::  
      
1. On the **Configure** page of the **Connect data source** wizard, confirm that your business event is selected under **Business events**.

    :::image type="content" source="./media/set-alerts-business-events/confirm-event.png" alt-text="Screenshot that shows Configure page of the Connect data source wizard." lightbox="./media/set-alerts-business-events/confirm-event.png":::  

1. Select **View schemas** to see the event schema of your business event. 

    :::image type="content" source="./media/set-alerts-business-events/view-schema.png" alt-text="Screenshot that shows the View schema button on Configure page of the Connect data source wizard." lightbox="./media/set-alerts-business-events/view-schema.png"::: 

1. Review the event schema, and select **Back to configure** to get back to the configuration page.

    :::image type="content" source="./media/set-alerts-business-events/review-schema-page.png" alt-text="Screenshot that shows the event schema." lightbox="./media/set-alerts-business-events/review-schema-page.png":::

1. Choose **Select business events** to change the business event you want to monitor or  monitor multiple business events in the same rule. When you select multiple business events, they must be associated with schemas in a single schema set. If you make changes, select **Save selection** at the bottom of the page. If you don't make any change, select **Cancel** to close the business event selection page.

    :::image type="content" source="./media/set-alerts-business-events/select-business-events.png" alt-text="Screenshot that shows the Select business events page." lightbox="./media/set-alerts-business-events/select-business-events.png":::

1. On the **Configure** page, select **+ Filter** to add filters to the events. You can add multiple filters to filter the events based on your needs. 

    :::image type="content" source="./media/set-alerts-business-events/add-filter.png" alt-text="Screenshot that shows the Configure page with a filter added." lightbox="./media/set-alerts-business-events/add-filter.png":::

1. Select the **field** you want to filter on, choose the **operator**, and enter the **value** for the filter. 

    :::image type="content" source="./media/set-alerts-business-events/configure-filter.png" alt-text="Screenshot that shows the Configure page with filter configuration." lightbox="./media/set-alerts-business-events/configure-filter.png":::

1. Select **Next** at the bottom of the page. 

    :::image type="content" source="./media/set-alerts-business-events/next-button.png" alt-text="Screenshot that shows the Configure page with Next selected." lightbox="./media/set-alerts-business-events/next-button.png":::    

1. On the **Review + connect** page, review the settings, and select **Save**.
    
    :::image type="content" source="./media/set-alerts-business-events/review-connect.png" alt-text="Screenshot that shows the Review + connect page of the Connect data source wizard." lightbox="./media/set-alerts-business-events/review-connect.png":::    

[!INCLUDE [rule-condition-events](./includes/rule-condition-events.md)]

[!INCLUDE [rule-action](./includes/rule-action.md)]

[!INCLUDE [rule-save-location](./includes/rule-save-location.md)]

## Create alert

1. In the **Add rule** pane, select **Create** at the bottom of the page to create the alert.

    :::image type="content" source="./media/set-alerts-business-events/set-alert.png" alt-text="Screenshot that shows the Set alert page for Azure blob storage events." lightbox="./media/set-alerts-business-events/set-alert.png":::                
1. You see the **Alert created** page. 
    
    :::image type="content" source="./media/set-alerts-business-events/alert-created-page.png" alt-text="Screenshot that shows the Alert created page for Azure blob storage events." lightbox="./media/set-alerts-business-events/alert-created-page.png"::: 

1. On the **Alert created** page, select either **Open** to open the rule in the Fabric activator user interface in a separate tab or **Done** to close the page.

    :::image type="content" source="./media/set-alerts-business-events/activator-editor.png" alt-text="Screenshot that shows the Open link on the Alert created page." lightbox="./media/set-alerts-business-events/activator-editor.png":::


## Related content

- [Set alerts on Fabric workspace item events](set-alerts-fabric-workspace-item-events.md)
- [Set alerts on data streams](set-alerts-data-streams.md)

