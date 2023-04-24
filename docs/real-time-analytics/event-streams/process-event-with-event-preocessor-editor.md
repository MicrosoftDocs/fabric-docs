---
title: Process event data with event processor editor
description: This article describes how to use the event processor editor in an Eventstream item to define the event processing logic.
ms.reviewer: spelluru
ms.author: xujiang1
author: xujxu
ms.topic: how-to
ms.date: 04/23/2023
ms.search.form: product-kusto
---

# Process event data with event processor editor

Event processor in the Lakehouse destination allows you to process your data before it's ingested into Lakehouse destination. The event processor editor is a no-code experience that provides you with the drag and drop experience to design the event data processing logic. This article describes how to use the event processor editor to design the processing logic.

## Prerequisites 

To get started, you must complete the following prerequisites:

- Get access to a **premium workspace** with **Contributor** or above permissions where your Eventstream item is located in.
- Get access to a **premium workspace** with **Contributor** or above permissions where your lakehouse is located in.

## Design the event processing with the editor 

Following the steps to open the event processor editor and use it to design your event processing:
1. Create a **Lakehouse** destination and input the necessary parameters in the right pane. 
2. Select **Open event processor** to open the event processor editor in the right pane.

   :::image type="content" source="./media/process-event-with-event-processor-editor/event-processor-editor-entrypoint.png" alt-text="Screenshot showing the entrypoint of event processor editor." lightbox="./media/process-event-with-event-processor-editor/event-processor-editor-entrypoint.png" :::

3. In the event processor editor, you can select the eventstream node to preview its data schema, rename the column, or change the data type in the right pane.

   :::image type="content" source="./media/process-event-with-event-processor-editor/event-processor-editor-schema.png" alt-text="Screenshot showing the data schema in event processor editor." lightbox="./media/process-event-with-event-processor-editor/event-processor-editor-schema.png" :::

4. Select the operator from **Operations** menu in the ribbon to add the event processing logic. For example, **Manage fields**.

   :::image type="content" source="./media/process-event-with-event-processor-editor/event-processor-editor-manage-field.png" alt-text="Screenshot showing the operator in event processor editor." lightbox="./media/process-event-with-event-processor-editor/event-processor-editor-manage-field.png" :::

5. Select the line between eventstream and lakehouse and hit the delete key to delete the connection between them in order to insert the Manage fields operator between them. 

   :::image type="content" source="./media/process-event-with-event-processor-editor/event-processor-editor-delete-connection.png" alt-text="Screenshot showing how to delete the connection." lightbox="./media/process-event-with-event-processor-editor/event-processor-editor-delete-connection.png" :::

6. Select the green circle on the left edge of the eventstream node and hold and move your mouse to connect it to Manage fields operator node. Similarly connect Manage fields operator node to Lakehouse node.

   :::image type="content" source="./media/process-event-with-event-processor-editor/event-processor-editor-connecting.png" alt-text="Screenshot showing how to connect the two nodes." lightbox="./media/process-event-with-event-processor-editor/event-processor-editor-connecting.png" :::

7. Select the **Manage fields** operator node. In the **Manage fields** configuration panel, choose the fields you want to output. If you want to add all the fields, select Add all fields. You can also add new field with the **Build-in Functions** to aggregate the data from upstream. Currently, the build-in functions we support are some functions in **String Functions**, **Date and Time Functions**, **Mathematical Functions**.

   :::image type="content" source="./media/process-event-with-event-processor-editor/event-processor-editor-configure-operator.png" alt-text="Screenshot showing how to configure the operator." lightbox="./media/process-event-with-event-processor-editor/event-processor-editor-configure-operator.png" :::

8. After the Manage fields is configured, you can preview the data that will be produced with this operator by clicking **Refresh static preview**.

   :::image type="content" source="./media/process-event-with-event-processor-editor/event-processor-editor-preview.png" alt-text="Screenshot showing how to preview the data in event processor editor." lightbox="./media/process-event-with-event-processor-editor/event-processor-editor-preview.png" :::

9. If there's any configuration error, you're notified by **Authoring error** tab in the bottom pane.


   :::image type="content" source="./media/process-event-with-event-processor-editor/event-processor-editor-authoring-error.png" alt-text="Screenshot showing the authoring error tab in event processor editor." lightbox="./media/process-event-with-event-processor-editor/event-processor-editor-authoring-error.png" :::

10. If everything is as you expected after previewing the data, you can select Done to complete your event processing design and return to the Lakehouse destination configuration pane to get your Lakehouse destination created.


## Next steps

- [Event processor editor](./event-processor-editor.md)
- [Event streams destination](./event-streams-destination.md) 
- [Add and manage eventstream destinations](./add-manage-eventstream-destinations.md)
