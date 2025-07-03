---
title: Add a schema to a schema set
description: Learn about how to add a schema to a schema set.
ms.author: spelluru
author: spelluru
ms.topic: how-to
ms.custom:
ms.date: 07/02/2025
ms.search.form: Schema set
#customer intent: As a user, I want to learn how to add a schema to a schema set. 
---
# Add a schema to a schema set
In this article, you lean how to add a schema to a schema set in Fabric. 

## Prerequisites
If you haven't created an event schema set already, create one by following instructions from [Create an event schema set](create-event-schema-set.md).

## Add a schema

1. If you are on the schema set page already, navigate to the Fabric workspace, and select the event schema set. 

    :::image type="content" source="./media/add-schema-to-schema-set/select-schema-set.png" alt-text="Screenshot that shows My Workspace with an event schema set selected.":::
1. Select **+ New event schema**. 

    If you are trying to add the first schema to the schema set, you see the following screen: 

    :::image type="content" source="./media/add-schema-to-schema-set/new-event-schema-button.png" alt-text="Screenshot that shows the New event schema button.":::    

    If you are trying to add a schema to a schema set that has at least one schema in it, you see the following screen:
    
    :::image type="content" source="./media/add-schema-to-schema-set/new-event-schema-button-2.png" alt-text="Screenshot that shows the New event schema button for a schema set with at least one schema.":::    
1. On the **New event schema** page, follow these instructions:
    1. Specify a **name** for the event schema set. 
    1. Optionally, enter a description for the event schema set. 
    1. If you have a schema JSON file, select **Upload** to upload the file. Otherwise, start building a schema manually by selecting **Add row**. For each row, select the *field type**, **field name**, and optionally enter a **desciption**. 
    
        :::image type="content" source="./media/add-schema-to-schema-set/build-schema.png" alt-text="Screenshot that shows the schema that's built manually.":::            
    1. Now, select **Finish**.
1. You see the editor for the event schema set as shown in the following image: 

    :::image type="content" source="./media/add-schema-to-schema-set/editor.png" alt-text="Screenshot that shows the editor for the event schema.":::            

## Related content
See [Create a new version of a schema](create-new-version-schema.md).
