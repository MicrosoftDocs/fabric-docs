---
title: Use schemas in eventstreams
description: Learn about how to use schemas in eventstreams
ms.author: spelluru
author: spelluru
ms.topic: how-to
ms.custom:
ms.date: 07/25/2025
ms.search.form: Schema set
#customer intent: As a user, I want to learn how to use event schemas in eventstreams in Real-Time Intelligence.
---

# Use schemas in eventstreams (Fabric Real-Time intelligence)
You can use schema registered with Schema Registy in eventstreams with the following event sources: 

- Custom app or endpoint
- Azure SQL Database (CDC)
- Azure Event Hubs

When you use event schemas in an eventstream, only the following destinations are supported:

- Custom endpoint
- Eventhouse
- Derived stream

> [!IMPORTANT]
> You can't enable schema support for existing eventstreams. You must enable schema support when you create an eventstream. 

## Custom endpoint
Let's see how to associate schemas with a custom endpoing source in an eventstream.  

1. First, when adding a custom endpoint source to an eventstream, enable schema association. 

    :::image type="content" source="./media/use-event-schemas/enable-schema-custom-endpoint.png" alt-text="Screenshot of Custom endpoint source with an option to associated schemas." lightbox="./media/use-event-schemas/enable-schema-custom-endpoint.png":::
1. To associate with a new schema or an existing schema from a schema registy, select **Associate event schema** on the ribbon.

    :::image type="content" source="./media/use-event-schemas/associate-event-schema-button.png" alt-text="Screenshot of eventstream editor with Associate event schema button on the ribbon selected." lightbox="./media/use-event-schemas/associate-event-schema-button.png":::
1. To use an existing schema, select **Choose from event schema registry**, and follow these steps:
    1. On the **Associate an event schema** window, select a schema from the schema registry. You see the event data schema in the right pane. 
    1. Select **Choose** to associate the event schema with the custom endpoint. 
    
        :::image type="content" source="./media/use-event-schemas/associate-event-schema-custom-endpoint.png" alt-text="Screenshot of the Associate event schema window with a schema selected from the schema registry." lightbox="./media/use-event-schemas/associate-event-schema-custom-endpoint.png":::
    1. In the Eventstream editor, select the **eventstream** tile. In the bottom pane, switch to the **Associate schema** tab. Confirm that you see the schema associated with the eventstream.
    
        :::image type="content" source="./media/use-event-schemas/confirm-schema-association-custom-endpoint.png" alt-text="Screenshot of the Eventstream editor with eventstream selected and the Associated schema tab highlighted." lightbox="./media/use-event-schemas/confirm-schema-association-custom-endpoint.png":::        
1. Use one of the following options to create a schema. 
    - If you have a schema JSON file, select **Upload** to upload the file. For a sample file, see the [Sample schema file](create-manage-event-schemas.md#download-an-event-schema) section. 

        :::image type="content" source="./media/create-manage-event-schemas/upload-button.png" alt-text="Screenshot that shows the upload option to create a schema." lightbox="./media/create-manage-event-schemas/upload-button.png" :::
    - Start building a schema manually by selecting **Add row**. For each row, select the **field type**, **field name**, and optionally enter a **description**. 
    
        :::image type="content" source="./media/create-manage-event-schemas/build-schema.png" alt-text="Screenshot that shows the manual way of building a schema." lightbox="./media/create-manage-event-schemas/build-schema.png":::            
    
    - To build a schema by entering JSON code, select **Code editor** option as shown in the following image. If you see the message: **If you choose to use the code editor to create your schema, note that you won’t be able to switch back to the UI builder**, select **Edit**. 

        :::image type="content" source="./media/create-manage-event-schemas/code-editor-schema.png" alt-text="Screenshot that shows the code editor to build a schema." lightbox="./media/create-manage-event-schemas/code-editor-schema.png":::   

        Enter the JSON code into the editor. 

        :::image type="content" source="./media/create-manage-event-schemas/code-editor-schema-json.png" alt-text="Screenshot that shows the JSON code in the code editor to build a schema." lightbox="./media/create-manage-event-schemas/code-editor-schema-json.png":::                    
1. 

## Azure SQL Database (CDC)

## Azure Event Hubs

## Supported destinations
At this stage, schema-validated events can only be sent to: 

- Eventhouse (push mode) 
- Custom app or endpoint
- Another stream (derived stream)

Separsely, you can send validated events to another stream (Derived Streams). 


## Related content

