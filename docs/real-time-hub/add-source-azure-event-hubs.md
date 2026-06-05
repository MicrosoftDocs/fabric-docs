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

1. On the **Add data** page, switch to the **Azure** tab. 

    :::image type="content" source="./media/switch-to-azure-tab-add-data/switch-to-azure-tab.png" alt-text="Screenshot that shows how to switch to the Azure tab on the Add data page.":::
1. Hover the mouse over your Azure Event Hubs namespace in the list, and select the **Connect** button that appears. Alternatively, you can select **...** and then **Connect** from the dropdown menu. 

    Use the search bar to quickly find your Event Hubs namespace if you have many Azure resources (or) use filters to filter the list by source type (Azure Event Hubs namespace), subscription, resource group, or region.

    :::image type="content" source="./media/add-source-azure-event-hubs/connect-button.png" alt-text="Screenshot that shows how to connect to an Azure Event Hubs namespace from the Add data page." lightbox="./media/add-source-azure-event-hubs/connect-button.png":::

::: zone pivot="basic-features"  

1. In the **Connect data source** wizard, on the **Configure** page, follow these steps:
    1. Select an event hub from the dropdown list. The dropdown is populated with event hubs from the selected Azure Event Hubs namespace.
    1. Select they key name from the dropdown list. The dropdown is populated with key names from the selected event hub.

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

1. In the **Connect data source** wizard, on the **Configure** page, follow these steps:
    1. Select an event hub from the dropdown list. The dropdown is populated with event hubs from the selected Azure Event Hubs namespace.
    1. Select they key name from the dropdown list. The dropdown is populated with key names from the selected event hub.

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
    
### Schema handling page

1. On the **Schema handling** page, provide rules to handle events received from the selected event hub, so that the eventstream can apply them correctly. The mapping rules depend on how you model the events.

    If you have one schema that governs all of the events, select **Fixed schema**.

    If you have multiple schemas that represent the various incoming events, define matching rules to apply your schemas. To choose this mode, select **Dynamic schema via headers**. Then, specify the rules by using header/value pairs to select each schema. The header is a custom Kafka header property that's part of the event metadata. The value is the expected value for that property.

    :::image type="content" source="../real-time-intelligence/event-streams/includes/connectors/media/azure-event-hubs-source-connector/extended-schema-handling-page.png" alt-text="Screenshot that shows the page for schema handling, with the option for extended features selected." lightbox="../real-time-intelligence/event-streams/includes/connectors/media/azure-event-hubs-source-connector/extended-schema-handling-page.png":::

1. Choose schemas by selecting the **Add more schema(s)** dropdown menu and then choosing one or more existing schemas from the event schema registry. If you don't have schemas to choose from, you can create new schemas from this view. To learn how to define a new event schema, see [Create and manage event schemas in schema sets](../real-time-intelligence/schema-sets/create-manage-event-schemas.md).

    :::image type="content" source="../real-time-intelligence/event-streams/includes/connectors/media/azure-event-hubs-source-connector/extended-fixed-schema-option.png" alt-text="Screenshot that shows the area for adding schemas, with the fixed schema option selected." lightbox="../real-time-intelligence/event-streams/includes/connectors/media/azure-event-hubs-source-connector/extended-fixed-schema-option.png":::

    If you selected the **Choose from event schema registry** option, the **Associate an event schema** pane appears. Select one or more schemas from the registry, depending on your schema matching mode, and then select **Choose** at the bottom of the pane.

    :::image type="content" source="../real-time-intelligence/event-streams/includes/connectors/media/azure-event-hubs-source-connector/extended-associate-event-schema.png" alt-text="Screenshot that shows the pane for associating an event schema." lightbox="../real-time-intelligence/event-streams/includes/connectors/media/azure-event-hubs-source-connector/extended-associate-event-schema.png":::

1. If you selected the **Fixed schema** option, you don't need to provide any more rules to match the schema. You can continue to the next step.

   If you selected the **Dynamic schema via headers** option, specify the Kafka header property and the expected value that maps to the schema. Add more schemas and specify different header properties and/or different values to map to those schemas.

    > [!NOTE]
    > When you define the mapping rules, each value of the header *must* be unique. If you try to reuse a schema, you see a warning message indicating that you might break existing streams. As long as the mapping rules are the same, you can reuse a schema. If this limitation affects your use, reach out to your Microsoft representative to share your feedback. We're actively working on removing this limitation.

    :::image type="content" source="../real-time-intelligence/event-streams/includes/connectors/media/azure-event-hubs-source-connector/extended-dynamic-schema-property-value.png" alt-text="Screenshot that shows a property and a value mapped to a schema." lightbox="../real-time-intelligence/event-streams/includes/connectors/media/azure-event-hubs-source-connector/extended-dynamic-schema-property-value.png":::

1. After you map schemas for all expected events, select **Next** at the bottom of the **Schema handling** page.

    :::image type="content" source="../real-time-intelligence/event-streams/includes/connectors/media/azure-event-hubs-source-connector/extended-schema-handling.png" alt-text="Screenshot that shows the Next button on the page for schema handling." lightbox="../real-time-intelligence/event-streams/includes/connectors/media/azure-event-hubs-source-connector/extended-schema-handling.png":::
        
1. Select **Review and connect** at the bottom of the **Configure** page.
1. Review the details on the **Review + connect** page, and then select **Connect**.

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

