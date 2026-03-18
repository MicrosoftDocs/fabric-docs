---
title: Add Business Event Destination in Eventstream
description: Learn how to add a business event destination to your Fabric eventstream. Follow step-by-step instructions to configure, publish, and manage rules effectively.
#customer intent: As a data engineer, I want to configure a business event destination in an eventstream so that I can automate workflows based on real-time events.
ms.reviewer: xujiang1
ms.topic: how-to
ms.date: 03/12/2026
ms.search.form: Source and Destination
---

# Add a business events destination to an eventstream 

Business events in Fabric empower organizations to define, explore, and consume events from business applications. By using this capability, you can develop event-driven applications that deliver real-time notifications, trigger alerts, and automate downstream workflows. 

This article shows you how to add a business event as a destination to an eventstream in Microsoft Fabric.  

## Prerequisites

- Access to a workspace in the Fabric capacity license mode or the Trial license mode with Contributor or higher permissions. 
- If you plan to use an existing business event type, access to the workspace where the Event schema set with the Business event type is located, with Viewer or higher permissions. 

## Add business event as destination 

To add a business event as a destination to your eventstream, follow these steps:

1. Open your eventstream, and switch to **Edit** mode. Select **Add destination** on the ribbon and select **Business events** from the dropdown list. 

    :::image type="content" source="./media/add-destination-business-events/add-destination-business-event-ribbon.png" alt-text="Screenshot of the Eventstream edition with Add destination and Business events on the ribbon selected." lightbox="./media/add-destination-business-events/add-destination-business-event-ribbon.png":::

    You can also select **Transform events or add destination** tile on the canvas and select **Business events** from the dropdown list. 

    :::image type="content" source="./media/add-destination-business-events/transform-business-events-menu.png" alt-text="Screenshot of the Eventstream edition with Transform events or Add destination tile selected." lightbox="./media/add-destination-business-events/transform-business-events-menu.png":::
1. For **Destination name**, enter a name for the Business Events destination.      
1. For **Business events type**, choose one of the following options:  
    - Select an existing business event type. Choose **Select**, and follow these steps:
    
        :::image type="content" source="./media/add-destination-business-events/destination-name.png" alt-text="Screenshot of the Business Events pane with Destination name and Business events type fields." lightbox="./media/add-destination-business-events/destination-name.png":::

        On the **Select a business event** page, select a business event type from the list. You can use the search box to find the business event type you want to use. After selecting a specific business event, review the **Event Schema** selection, and then select **Choose** to continue. 

        :::image type="content" source="./media/add-destination-business-events/select-business-event.png" alt-text="Screenshot of the Select a business event page with a business event type selected." lightbox="./media/add-destination-business-events/select-business-event.png":::
        
    - To create a new business event type, select **Create a new**:
   
        :::image type="content" source="./media/add-destination-business-events/select-create-new.png" alt-text="Screenshot of the Select a business event page with Select new selected." lightbox="./media/add-destination-business-events/select-create-new.png"::: 
    
        Select a **workspace** to host the event schema set with the business event type, select an **existing event schema set** or create a new one, and then specify the **name** and **description** of the event schema. Define the schema by adding fields or uploading a schema, review the configuration, and confirm your selections:  

        :::image type="content" source="./media/add-destination-business-events/new-schema-definition.png" alt-text="Screenshot of the new event schema definition." lightbox="./media/add-destination-business-events/new-schema-definition.png":::     
1. For **Input data format**, confirm that **JSON** is selected. Currently, only JSON is supported for business event destinations. 
1. Select **Save** to add the business event destination to your eventstream.

      :::image type="content" source="./media/add-destination-business-events/save-destination-settings.png" alt-text="Screenshot of the Business Events page with all fields filled in." lightbox="./media/add-destination-business-events/save-destination-settings.png":::     
1. If the eventstream schema doesn't match the selected business event schema, configure schema mapping before publishing the eventstream. Select **Add** on your business events node or select **Insert a mapper** in the Authoring errors pane. If the event schema produced by your eventstream already matches the selected business event schema, you don't need to configure the schema mapping. 

      :::image type="content" source="./media/add-destination-business-events/insert-mapper.png" alt-text="Screenshot of the Eventstream editor with Add button and Insert a mapper link highlighted." lightbox="./media/add-destination-business-events/insert-mapper.png":::  

1. In the **Map schema** page, map the fields from your eventstream schema to the business event schema. Ensure that the data types are compatible between the source and destination fields. For example, you can map the `BikepointID` field, which is of type `String`, to a `String` field in the destination schema.

    :::image type="content" source="./media/add-destination-business-events/schema-mapping.png" alt-text="Screenshot of the Map schema page with fields mapped." lightbox="./media/add-destination-business-events/schema-mapping.png":::
1. After completing the schema mapping, select **Finish** to return to the eventstream editor. You see the **Mapper** node added to the canvas indicating that the schema mapping is configured.

    :::image type="content" source="./media/add-destination-business-events/mapper-added.png" alt-text="Screenshot of the Eventstream editor with Mapper node added to the canvas." lightbox="./media/add-destination-business-events/mapper-added.png":::
1. To implement the changes, select **Publish**. 

    :::image type="content" source="./media/add-destination-business-events/publish-event-stream.png" alt-text="Screenshot of the Eventstream editor with Publish button highlighted." lightbox="./media/add-destination-business-events/publish-event-stream.png":::
1. After the eventstream is published, the business event destination is available for visualization in **Live view**. Select **Edit** in the upper-right corner to switch to the Edit mode to make more changes to the eventstream.

    
## Related content
You can set an alert on the business event by using Eventstream or Real-Time hub. To learn more, see the following article: [Set alert on a business event in Real-Time hub](../../real-time-hub/set-alerts-data-streams.md)