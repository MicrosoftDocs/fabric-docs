---
title: Stream Azure Event Hubs Data to Real-Time Hub
description: Stream events from Azure Event Hubs into Fabric Real-Time hub with ease. Discover how to set up the connector, configure your event hub, and verify your data stream.
ms.reviewer: anboisve
ms.topic: how-to
ms.custom: sfi-image-nochange
ms.date: 04/01/2026
author: spelluru
ms.author: spelluru
zone_pivot_group_filename: real-time-intelligence/event-streams/zone-pivot-groups.json
zone_pivot_groups: event-hubs-capabilities
---

# Get events from Azure Event Hubs into Real-Time hub

This article describes how to get events from an Azure event hub into Real-Time hub.

[!INCLUDE [azure-event-hubs-source-connector-prerequisites](../real-time-intelligence/event-streams/includes/connectors/azure-event-hubs-source-connector-prerequisites.md)]

## Navigate to Add data page

[!INCLUDE [launch-get-events-experience](./includes/launch-get-events-experience.md)]

On the **Add data**, you can connect to an Azure event hub using the **All sources** tab or the **Azure** tab (recommended). This article covers both ways to connect to an Azure event hub.

## Use the Azure tab to connect to an event hub (recommended)


::: zone pivot="basic-features"  

1. On the **Add data** page, switch to the **Azure** tab. 

    :::image type="content" source="./media/switch-to-azure-tab-add-data/switch-to-azure-tab.png" alt-text="Screenshot that shows how to switch to the Azure tab on the Add data page.":::
1. Hover the mouse over your Azure Event Hubs namespace in the list, and select the **Connect** button that appears. Alternatively, you can select **...** and then **Connect** from the dropdown menu. 

    Use the search bar to quickly find your Event Hubs namespace if you have many Azure resources (or) use filters to filter the list by source type (Azure Event Hubs namespace), subscription, resource group, or region.

    :::image type="content" source="./media/add-source-azure-event-hubs/connect-button.png" alt-text="Screenshot that shows how to connect to an Azure Event Hubs namespace from the Add data page." lightbox="./media/add-source-azure-event-hubs/connect-button.png":::

1. In the **Connect data source** wizard, on the **Configure** page, follow these steps:
    1. Select an event hub from the dropdown list. The dropdown is populated with event hubs from the selected Azure Event Hubs namespace.
    1. Select the key name from the dropdown list. The dropdown is populated with key names from the selected event hub.

        :::image type="content" source="./media/add-source-azure-event-hubs/select-event-hub.png" alt-text="Screenshot that shows how to select an event hub from the dropdown in the Connect data source wizard." lightbox="./media/add-source-azure-event-hubs/select-event-hub.png":::    
    1. For **Consumer group**, select **$Default** or enter the name of a custom consumer group that you have set up for this event hub.
    1. For **Data format**, select the format of the events in your event hub (for example, JSON, Avro, etc.). 
    1. In the **Stream details** section to the right, follow these steps:
        1. Select the **Fabric workspace** where you want to create the eventstream.         
        1. For **Eventstream name**, select the **Pencil** button, and enter a name for the eventstream.         
        1. The **Stream name** value is automatically generated for you by appending **-stream** to the name of the eventstream. This stream appears on the real-time hub's **All data streams** page when the wizard finishes.  
        
            :::image type="content" source="./media/add-source-azure-event-hubs/stream-details.png" alt-text="Screenshot that shows the Stream details section." lightbox="./media/add-source-azure-event-hubs/stream-details.png":::        
        
1. Select **Review and connect** at the bottom of the **Configure** page.
1. Review the details on the **Review + connect** page, and then select **Connect**.

    :::image type="content" source="./media/add-source-azure-event-hubs/review-connect.png" alt-text="Screenshot that shows the Review + connect page." lightbox="./media/add-source-azure-event-hubs/review-connect.png":::     

::: zone-end
        
::: zone pivot="extended-features"

1. On the **Add data** page, switch to the **Azure** tab. 

    :::image type="content" source="./media/switch-to-azure-tab-add-data/switch-to-azure-tab.png" alt-text="Screenshot that shows how to switch to the Azure tab on the Add data page.":::
1. Hover the mouse over your Azure Event Hubs namespace in the list, and select the **Connect** button that appears. Alternatively, you can select **...** and then **Connect** from the dropdown menu. 

    Use the search bar to quickly find your Event Hubs namespace if you have many Azure resources (or) use filters to filter the list by source type (Azure Event Hubs namespace), subscription, resource group, or region.

    :::image type="content" source="./media/add-source-azure-event-hubs/connect-button.png" alt-text="Screenshot that shows how to connect to an Azure Event Hubs namespace from the Add data page." lightbox="./media/add-source-azure-event-hubs/connect-button.png":::

1. In the **Connect data source** wizard, on the **Configure** page, follow these steps:
    1. Select an event hub from the dropdown list. The dropdown is populated with event hubs from the selected Azure Event Hubs namespace.
    1. Select the key name from the dropdown list. The dropdown is populated with key names from the selected event hub.

        :::image type="content" source="./media/add-source-azure-event-hubs/select-event-hub.png" alt-text="Screenshot that shows how to select an event hub from the dropdown in the Connect data source wizard." lightbox="./media/add-source-azure-event-hubs/select-event-hub.png":::
    1. For **Feature level**, select **Extended features**.
        1. For **Consumer group**, select a consumer group from the dropdown list. The dropdown is populated with consumer groups from the selected event hub.
        1. For **Starting position**, select the point from which you want to start ingesting events. You can choose to start from the earliest available event, the latest event, or a specific point in time.
    1. In the **Stream details** section to the right, follow these steps:

        1. Select the **Fabric workspace** where you want to create the eventstream.         
        1. For **Eventstream name**, select the **Pencil** button, and enter a name for the eventstream.         
        1. The **Stream name** value is automatically generated for you by appending **-stream** to the name of the eventstream. This stream appears on the real-time hub's **All data streams** page when the wizard finishes.  
        
            :::image type="content" source="./media/add-source-azure-event-hubs/stream-details.png" alt-text="Screenshot that shows the Stream details section." lightbox="./media/add-source-azure-event-hubs/stream-details.png":::        
    1. Select **Next** at the bottom of the **Configure** page.

[!INCLUDE [azure-event-hubs-schema-review-connect](../real-time-intelligence/event-streams/includes/connectors/azure-event-hubs-schema-review-connect.md)]

::: zone-end

## View data stream details
1. On the **Review + connect** page, if you select **Open eventstream**, the wizard opens the eventstream that it created for you with the selected event hub as a source. To close the wizard, select **Finish** at the bottom of the page.

    :::image type="content" source="./media/add-source-azure-event-hubs/review-create-success.png" alt-text="Screenshot that shows the Review + connect page with links to open eventstream and close the wizard." lightbox="./media/add-source-azure-event-hubs/review-create-success.png":::
1. You see the stream in the **Recent streaming data** section of the **Real-Time hub** home page. For detailed steps, see [View details of data streams in Fabric Real-Time hub](view-data-stream-details.md).

    :::image type="content" source="./media/add-source-azure-event-hubs/verify-data-stream.png" alt-text="Screenshot that shows the Real-Time hub All data streams page with the stream you just created." lightbox="./media/add-source-azure-event-hubs/verify-data-stream.png":::

## Use All sources tab to connect to an event hub
You can also use the **All sources** tab on the **Add data** page to connect to an Azure event hub. However, using the **Azure** tab is recommended as it's easier to connect to an event hub.

On the **Add data** page, select the **Microsoft** category at the top, and then select **Azure Event Hubs**. 

:::image type="content" source="./media/add-source-azure-event-hubs/select-azure-event-hubs.png" alt-text="Screenshot that shows the selection of Azure Event Hubs as the source type in the Add data page." lightbox="./media/add-source-azure-event-hubs/select-azure-event-hubs.png":::

Now, follow the instructions in the [Connect to an Azure event hub](#configure-and-connect-to-the-azure-event-hub) section.

### Configure and connect to the Azure event hub

[!INCLUDE [azure-event-hubs-source-connector-configuration](../real-time-intelligence/event-streams/includes/connectors/azure-event-hubs-source-connector-configuration.md)]    



## Related content

To learn about consuming data streams, see the following articles:

- [Process data streams](process-data-streams-using-transformations.md)
- [Analyze data streams](analyze-data-streams-using-kql-table-queries.md)
- [Set alerts on data streams](set-alerts-data-streams.md)

