---
title: Set alerts on OneLake events in Real-Time hub
description: This article describes how to set alerts on OneLake events in Real-Time hub.
author: robece
ms.author: robece
ms.topic: how-to
ms.date: 10/13/2025
---

# Set alerts on OneLake events in Real-Time hub

This article describes how to set alerts on OneLake events in Real-Time hub.

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
1. Move the mouse over **OneLake events**, and do one of the following steps:
    - Select the **Alert** button.
    - Select **ellipsis (...)**, and select **Set alert**.

        :::image type="content" source="./media/set-alerts-fabric-onelake-events/list-page.png" alt-text="Screenshot that shows the Fabric events list page." lightbox="./media/set-alerts-fabric-onelake-events/list-page.png":::
    

### Using the event detail page

1. Select **OneLake events** from the list see the detail page.
1. On the detail page, select **Set alert** button at the top of page.

    :::image type="content" source="./media/set-alerts-fabric-onelake-events/detail-view.png" alt-text="Screenshot that shows the OneLake events detail page with Set alert button selected." lightbox="./media/set-alerts-fabric-onelake-events/detail-view.png":::

[!INCLUDE [rule-details](./includes/rule-details.md)]

## Monitor section

1. In the **Monitor** section, for **Source**, choose **Select source events**.

    :::image type="content" source="./media/set-alerts-fabric-onelake-events/select-events-link.png" alt-text="Screenshot that shows the Set alert page." lightbox="./media/set-alerts-fabric-onelake-events/select-events-link.png":::    
1. In the **Connect data source** wizard, do these steps:
    1. For **Event types**, select event types that you want to monitor.
    
        :::image type="content" source="./media/set-alerts-fabric-onelake-events/select-events.png" alt-text="Screenshot that shows the Connect data source wizard with events selected." lightbox="./media/set-alerts-fabric-onelake-events/select-events.png":::    
    1. Select **Add a OneLake source** button in the **Select data source for events** section. 
    
        :::image type="content" source="./media/set-alerts-fabric-onelake-events/add-onelake-source-button.png" alt-text="Screenshot that shows the Connect data source wizard with the Add a OneLake source button selected." lightbox="./media/set-alerts-fabric-onelake-events/add-onelake-source-button.png":::      
    1. On the **Choose the data you want to connect** page:
        1. View all available data sources or only your data sources (My data) or your favorite data sources by using the category buttons at the top. You can use the **Filter by keyword** text box to search for a specific source. You can also use the **Filter** button to filter based on the type of the resource (KQL Database, Lakehouse, SQL Database, Warehouse). The following example uses the **My data** option.  
        1. Select the data source from the list. 
        1. Select **Next** at the bottom of the page. 
    
            :::image type="content" source="./media/create-streams-onelake-events/select-data-source.png" alt-text="Screenshot that shows the selection of a specific OneLake data source." lightbox="./media/create-streams-onelake-events/select-data-source.png":::       
        1. Select all tables or a specific table that you're interested in, and then select **Add**. 

            :::image type="content" source="./media/create-streams-onelake-events/select-tables.png" alt-text="Screenshot that shows the selection of all tables." lightbox="./media/create-streams-onelake-events/select-tables.png":::       

        > [!NOTE]
        > OneLake events are supported for data in OneLake. However, events for data in OneLake via shortcuts aren't yet available.
    
    1. Now, on the **Configure connection settings** page, you can add filters to set the filter conditions by selecting fields to watch and the alert value. To add a filter:
        1. Select **+ Filter**. 
        1. Select a field.
        1. Select an operator.
        1. Select one or more values to match. 
 
            :::image type="content" source="./media/set-alerts-fabric-onelake-events/set-filters.png" alt-text="Screenshot that shows the addition of a filter." lightbox="./media/set-alerts-fabric-onelake-events/set-filters.png":::                 
    1. Select **Next** at the bottom of the page. 
    1. On the **Review + connect** page, review the settings, and select **Save**.
    
        :::image type="content" source="./media/set-alerts-fabric-onelake-events/review-create-page.png" alt-text="Screenshot that shows the Add source wizard Review and create page for OneLake events.":::        

[!INCLUDE [rule-condition-events](./includes/rule-condition-events.md)]

[!INCLUDE [rule-action](./includes/rule-action.md)]

[!INCLUDE [rule-save-location](./includes/rule-save-location.md)]

## Create alert

1. Select **Create** at the bottom of the page to create the alert.

    :::image type="content" source="./media/set-alerts-fabric-onelake-events/create-alert.png" alt-text="Screenshot that shows the Set alert page with all fields selected.":::        
1. You see the **Alert created** page with a link to **open** the rule in the Fabric activator user interface in a separate tab. Select **Done** to close the **Alert created** page. 

    :::image type="content" source="./media/set-alerts-fabric-onelake-events/alert-created-page.png" alt-text="Screenshot that shows the Alert created page for Fabric OneLake item events." lightbox="./media/set-alerts-fabric-onelake-events/alert-created-page.png":::
1. You see a page with the activator item created by the **Add rule** wizard. If you are on the **Fabric events** page, select **Job events** to see this page. 

    :::image type="content" source="./media/set-alerts-fabric-onelake-events/items-created-wizard.png" alt-text="Screenshot that shows the Fabric OneLake items events page with the activator items created." lightbox="./media/set-alerts-fabric-onelake-events/items-created-wizard.png":::      
1. Move the mouse over the **Activator** item, and select **Open**. 

    :::image type="content" source="./media/set-alerts-fabric-onelake-events/activator-menu.png" alt-text="Screenshot that shows the activator menu." lightbox="./media/set-alerts-fabric-onelake-events/activator-menu.png"::: 
1. You see the Activator item in the Fabric Activator editor user interface. Select the rule if it's not already selected. You can update the activator item in this user interface. For example, update the subject, headline, or change the action from email to Teams message. 

    :::image type="content" source="./media/set-alerts-fabric-onelake-events/activator-editor.png" alt-text="Screenshot that shows the activator in an editor." lightbox="./media/set-alerts-fabric-onelake-events/activator-editor.png"::: 

## Related content

- [Set alerts on Azure blob storage events](set-alerts-azure-blob-storage-events.md)
- [Set alerts on Fabric workspace item events](set-alerts-fabric-workspace-item-events.md)
