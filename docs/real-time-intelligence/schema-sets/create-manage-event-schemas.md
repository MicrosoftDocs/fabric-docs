---
title: Create and manage event schemas
description: Learn about how to create and manage event schemas in a schema set. 
ms.author: spelluru
author: spelluru
ms.topic: how-to
ms.custom:
ms.date: 07/02/2025
ms.search.form: Schema set
#customer intent: As a user, I want to learn how to add a schema to a schema set. 
---
# Create and manage event schemas in an event schema set
In this article, you lean how to add a schema to a schema set in Fabric. 

## Prerequisites
If you haven't created an event schema set already, create one by following instructions from [Create an event schema set](create-event-schema-set.md).

## Add a schema

1. If you are on the schema set page already, navigate to the Fabric workspace, and select the event schema set. 

    :::image type="content" source="./media/create-manage-event-schemas/select-schema-set.png" alt-text="Screenshot that shows My Workspace with an event schema set selected." lightbox="./media/create-manage-event-schemas/select-schema-set.png":::
1. Select **+ New event schema**. 

    If you are trying to add the first schema to the schema set, you see the following screen: 

    :::image type="content" source="./media/create-manage-event-schemas/new-event-schema-button.png" alt-text="Screenshot that shows the New event schema button." lightbox="./media/create-manage-event-schemas/new-event-schema-button.png":::    

    If you are trying to add a schema to a schema set that has at least one schema in it, you see the following screen:
    
    :::image type="content" source="./media/create-manage-event-schemas/new-event-schema-button-2.png" alt-text="Screenshot that shows the New event schema button for a schema set with at least one schema." lightbox="./media/create-manage-event-schemas/new-event-schema-button-2.png":::    
1. On the **New event schema** page, follow these instructions:
    1. Specify a **name** for the event schema set. 
    1. Optionally, enter a description for the event schema set. 
1. Use one of the following options to create a schema. 
    - If you have a schema JSON file, select **Upload** to upload the file. For a sample file, see the [Sample schema file](#download-an-event-schema) section. 

        :::image type="content" source="./media/create-manage-event-schemas/upload-button.png" alt-text="Screenshot that shows the upload option to create a schema." lightbox="./media/create-manage-event-schemas/upload-button.png" :::
    - Start building a schema manually by selecting **Add row**. For each row, select the **field type**, **field name**, and optionally enter a **desciption**. 
    
        :::image type="content" source="./media/create-manage-event-schemas/build-schema.png" alt-text="Screenshot that shows the schema that's built manually." lightbox="./media/create-manage-event-schemas/build-schema.png":::            
    
    - To build a schema by entering JSON code, select **Code editor** option as shown in the following image. If you see the message: **If you choose to use the code editor to create your schema, note that you won’t be able to switch back to the UI builder**, select **Edit**. 

        :::image type="content" source="./media/create-manage-event-schemas/code-editor-schema.png" alt-text="Screenshot that shows the code editor to build a schema." lightbox="./media/create-manage-event-schemas/code-editor-schema.png":::   

        Enter the JSON code into the editor. 

        :::image type="content" source="./media/create-manage-event-schemas/code-editor-schema-json.png" alt-text="Screenshot that shows the JSON code in the code editor to build a schema." lightbox="./media/create-manage-event-schemas/code-editor-schema-json.png":::                    
1. Select **Finish** to start creating the schema. 
1. You see the editor for the event schema set as shown in the following image: 

    :::image type="content" source="./media/create-manage-event-schemas/editor.png" alt-text="Screenshot that shows the editor for the event schema." lightbox="./media/create-manage-event-schemas/editor.png":::       

    To add more schemas to the schema set, select **+ New event schema** at the top of the page.
    
    :::image type="content" source="./media/create-manage-event-schemas/new-event-schema-button.png" alt-text="Screenshot that shows the New event schema button." lightbox="./media/create-manage-event-schemas/new-event-schema-button.png":::      

### Download an event schema

You can download a schema file of an existing schema in the schema set to your computer by using the **Download** button on the ribbon. 

:::image type="content" source="./media/create-manage-event-schemas/download-button.png" alt-text="Screenshot that shows the Download button on the ribbon in an event schema editor." lightbox="./media/create-manage-event-schemas/download-button.png"::: 

Here's a sample file that you can upload to add an event schema to a schema set. 

```json
{
    "fields": [
        {
            "name": "ponumber",
            "type": "long",
            "doc": "Purchase order number"
        },
        {
            "name": "podate",
            "type": "string",
            "doc": "Purchase order date"
        },
        {
            "name": "item",
            "type": "string",
            "doc": "The item that was purchased"
        },
        {
            "name": "quantity",
            "type": "int",
            "doc": "Number of items purchased"
        },
        {
            "name": "unitprice",
            "type": "float",
            "doc": "Unit price of the item"
        }
    ],
    "type": "record",
    "name": "ContosoPurchaseOrderSchema"
}
```

## Delete an event schema
To delete an event schema, select the **Trash** icon next to the event schema in the **Event schemas** pane. 

:::image type="content" source="./media/create-manage-event-schemas/delete-schema-button.png" alt-text="Screenshot that shows the Trash button next to an event schema in the Event schemas pane." lightbox="./media/create-manage-event-schemas/delete-schema-button.png":::   

## Find an event schema
To find an event schema, you can enter text in the **Search** box in the **Event schemas** pane.

## Update event schema

1. To update an event schema and create a new version of the schema, select **Update**. 

    :::image type="content" source="./media/create-manage-event-schemas/update-button.png" alt-text="Screenshot that shows the Update button on the ribbon in an event schema editor." lightbox="./media/create-manage-event-schemas/update-button.png"::: 
1. In the **Update event schema** window, update the schema, and select **Finish**. 

    :::image type="content" source="./media/create-manage-event-schemas/update-event-schema.png" alt-text="Screenshot that shows the Update event schema window." lightbox="./media/create-manage-event-schemas/update-event-schema.png"::: 

    You notice that a new version of the schema is created in the schema set. 

    :::image type="content" source="./media/create-manage-event-schemas/version-2.png" alt-text="Screenshot that shows v2 of the schema." lightbox="./media/create-manage-event-schemas/version-2.png"::: 

## View schema versions
Use the **version** drop-down list to select the version of the schema you want to view.

:::image type="content" source="./media/create-manage-event-schemas/version-drop-down-list.png" alt-text="Screenshot that shows versions of the schema." lightbox="./media/create-manage-event-schemas/version-drop-down-list.png"::: 

## View history
You can see the history of creation and update of the schema in the **History** section of **Details** pane to the right. 

:::image type="content" source="./media/create-manage-event-schemas/history-pane.png" alt-text="Screenshot that shows History section of the Details pane to the right." lightbox="./media/create-manage-event-schemas/history-pane.png"::: 


## Related content

