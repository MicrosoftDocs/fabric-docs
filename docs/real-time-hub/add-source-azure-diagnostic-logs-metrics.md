---
title: Stream Azure Diagnostics to Fabric
description: This article describes how to stream Azure diagnostic logs and metrics into Microsoft Fabric. 
author: spelluru
ms.author: spelluru
ms.reviewer: raan
ms.topic: how-to
ms.date: 01/14/2026
---

# Stream Azure diagnostic logs and metrics data into Microsoft Fabric
This article describes how to pull diagnostic logs and metrics data from your Azure resources and stream into Microsoft Fabric. 

## Prerequisites

- Access to a workspace in the Fabric capacity license mode (or) the Trial license mode with Contributor or higher permissions. 

## Data sources page

[!INCLUDE [launch-get-events-experience](./includes/launch-get-events-experience.md)]

## Add Azure diagnostics source

1. On the **Data sources** page, select **Connect** on the **Azure Diagnostics** tile. If you don't see the tile, use the search box at the top to search for **Azure Diagnostics**. 

    :::image type="content" source="./media/add-source-azure-diagnostic-logs-metrics/select-azure-diagnostics.png" alt-text="Screenshot of the Data sources page with Connect button on the Azure Diagnostics tile selected." lightbox="./media/add-source-azure-diagnostic-logs-metrics/select-azure-diagnostics.png":::
1. Use the filter drop-down lists at the top to filter the resource list on the **source type**, **Azure subscription**, **Azure resource group**, and **region**. In the following example, **Azure Service Bus** is selected for the **Source**. You can see the types of Azure sources supported in the **Source** drop-down list. 

    :::image type="content" source="./media/add-source-azure-diagnostic-logs-metrics/filters.png" alt-text="Screenshot of the Diagnostic logs page." lightbox="./media/add-source-azure-diagnostic-logs-metrics/filters.png":::    
    You can use the **search** box at the top to search for an Azure resource with or without filters. 
1. Move the mouse over the Azure resource and select the **Connect** button (or) select **... (ellipsis)** and then select **Connect** from the menu. 

    :::image type="content" source="./media/add-source-azure-diagnostic-logs-metrics/get-diagnostic-logs-menu.png" alt-text="Screenshot of the Diagnostic logs menu." lightbox="./media/add-source-azure-diagnostic-logs-metrics/get-diagnostic-logs-menu.png":::        
1. On the **Get diagnostic settings** page of the **Get diagnostics logs** wizard, select the **logs** and **metrics** you want to stream into Fabric, and then select **Next**. In the following example, all logs and all metrics are selected. These settings are different for each type of Azure resource.

    :::image type="content" source="./media/add-source-azure-diagnostic-logs-metrics/create-diagnostic-settings-page.png" alt-text="Screenshot of the Create diagnostic settings page." lightbox="./media/add-source-azure-diagnostic-logs-metrics/create-diagnostic-settings-page.png":::        
1. To stream your diagnostic data into Fabric, a new Event Hubs namespace and a new event hub are automatically created in the same region as the selected resource. The diagnostic information from the source resource is sent to the event hub, which in turn is used to stream data into Fabric. On the **Create Azure event hub** page:
    1. Review the names of Event Hubs namespace and event hub to be created. 

        :::image type="content" source="./media/add-source-azure-diagnostic-logs-metrics/create-azure-event-hub.png" alt-text="Screenshot of the Create Azure event hub page." lightbox="./media/add-source-azure-diagnostic-logs-metrics/create-azure-event-hub.png":::     
    1. In the right pane, you can use the pencil button to change the name of the eventstream that's being created. 
    1. Select **Next** at the bottom of the page. 
1. This step is optional. On the **Add destination** page, do these actions: 
    1. Select a **Fabric workspace** that has the target KQL database where you want to store the diagnostic information for the selected resource. 
    1. Select the **eventhouse** in the workspace. 
    1. Select the **KQL database** in the eventhouse.
    1. Select an existing **table** or create a new table in the KQL database. 
    1. Select **Activate ingestion immediately after adding the data source** if you want to stream the data from the select source resource immediately. 
    1. Select **Next**. 
    
        :::image type="content" source="./media/add-source-azure-diagnostic-logs-metrics/add-destination.png" alt-text="Screenshot of the Add destination page." lightbox="./media/add-source-azure-diagnostic-logs-metrics/add-destination.png":::        
1. On the **Review + connect** page, review all the settings, and select **Connect**. 
    
    :::image type="content" source="./media/add-source-azure-diagnostic-logs-metrics/review-connect.png" alt-text="Screenshot of the Review + connect page." lightbox="./media/add-source-azure-diagnostic-logs-metrics/review-connect.png"::: 

    You see the status of each task performed by the wizard: 
    
    1. Creates an Azure Event Hubs namespace. 
    1. Creates an event hub in the Event Hubs namespace. This event hub stores the diagnostic information emitted by the selected source resource. 
    1. Creates a diagnostic setting on the selected source resource. 
    1. Configures the diagnostic setting to send information to the event hub. 
    1. Creates an eventstream. 
    1. Adds the event hub with the diagnostic information as the source for the eventstream. 
    1. Transforms the incoming data such that array of rows are split into separate records, and sets KQL table as the destination to store the result data. 

        :::image type="content" source="./media/add-source-azure-diagnostic-logs-metrics/finish-page.png" alt-text="Screenshot of the Review + connect page after resources are created." lightbox="./media/add-source-azure-diagnostic-logs-metrics/finish-page.png"::: 


## View data stream details

1. On the **Review + connect** page, if you select **Open eventstream**, the wizard opens the eventstream that it created for you with the selected sample data source. Scroll in the status pane to see the **Open eventstream** link. To close the wizard without opening the eventstream, select **Finish** at the bottom of the page. 

    :::image type="content" source="./media/add-source-azure-diagnostic-logs-metrics/eventstream.png" alt-text="Screenshot of the eventstream." lightbox="./media/add-source-azure-diagnostic-logs-metrics/eventstream.png":::                  
1. Confirm that you see the newly created data stream on the **My workspace** page. 

    :::image type="content" source="./media/add-source-azure-diagnostic-logs-metrics/workspace.png" alt-text="Screenshot of the My workspace page." lightbox="./media/add-source-azure-diagnostic-logs-metrics/workspace.png"::: 

## Related content

To learn about consuming data streams, see the following articles:

- [Process data streams](process-data-streams-using-transformations.md)
- [Analyze data streams](analyze-data-streams-using-kql-table-queries.md)
- [Set alerts on data streams](set-alerts-data-streams.md)
