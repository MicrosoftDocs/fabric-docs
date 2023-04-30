---
title: Process event data with event processor editor
description: This article describes how to use the event processor editor in an Eventstream item to define the event processing logic.
ms.reviewer: spelluru
ms.author: xujiang1
author: xujxu
ms.topic: how-to
ms.date: 05/23/2023
ms.search.form: product-kusto
---

# Process event data with event processor editor

[!INCLUDE [preview-note](../../includes/preview-note.md)]

Event processor in the Lakehouse destination allows you to process your data before it's ingested into Lakehouse destination. The event processor editor is a no-code experience that provides you with the drag and drop experience to design the event data processing logic. This article describes how to use the event processor editor to design the processing logic.

## Prerequisites 

To get started, you must complete the following prerequisites:

- Get access to a **premium workspace** with **Contributor** or above permissions where your Eventstream item is located in.
- Get access to a **premium workspace** with **Contributor** or above permissions where your lakehouse is located in.

## Design the event processing with the editor 

Following the steps to open the event processor editor and use it to design your event processing. 

1. Create a **Lakehouse** destination and input the necessary parameters in the right pane. 
2. Select **Open event processor** to open the event processor editor in the right pane.

   :::image type="content" source="./media/process-events-using-event-processor-editor/event-processor-editor-entrypoint.png" alt-text="Screenshot showing the entrypoint of event processor editor." lightbox="./media/process-events-using-event-processor-editor/event-processor-editor-entrypoint.png" :::

3. In the event processor editor, you can select the eventstream node to preview its data schema, rename the column, or change the data type in the right pane.

   :::image type="content" source="./media/process-events-using-event-processor-editor/event-processor-editor-schema.png" alt-text="Screenshot showing the data schema in event processor editor." lightbox="./media/process-events-using-event-processor-editor/event-processor-editor-schema.png" :::

4. Select the operator from **Operations** menu in the ribbon to add the event processing logic. For example, **Manage fields**.

   :::image type="content" source="./media/process-events-using-event-processor-editor/event-processor-editor-manage-field.png" alt-text="Screenshot showing the operator in event processor editor." lightbox="./media/process-events-using-event-processor-editor/event-processor-editor-manage-field.png" :::

5. Select the line between eventstream and lakehouse and hit the **delete** key to delete the connection between them in order to insert the Manage fields operator between them. 

   :::image type="content" source="./media/process-events-using-event-processor-editor/event-processor-editor-delete-connection.png" alt-text="Screenshot showing how to delete the connection." lightbox="./media/process-events-using-event-processor-editor/event-processor-editor-delete-connection.png" :::

6. Select the green circle on the left edge of the eventstream node and hold and move your mouse to connect it to Manage fields operator node. Similarly connect Manage fields operator node to Lakehouse node.

   :::image type="content" source="./media/process-events-using-event-processor-editor/event-processor-editor-connecting.png" alt-text="Screenshot showing how to connect the two nodes." lightbox="./media/process-events-using-event-processor-editor/event-processor-editor-connecting.png" :::

7. Select the **Manage fields** operator node. In the **Manage fields** configuration panel, choose the fields you want to output. If you want to add all the fields, select **Add all fields**. You can also add new field with the **Build-in Functions** to aggregate the data from upstream. Currently, the build-in functions we support are some functions in **String Functions**, **Date and Time Functions**, **Mathematical Functions**.

   :::image type="content" source="./media/process-events-using-event-processor-editor/event-processor-editor-configure-operator.png" alt-text="Screenshot showing how to configure the operator." lightbox="./media/process-events-using-event-processor-editor/event-processor-editor-configure-operator.png" :::

8. After the Manage fields is configured, you can preview the data that will be produced with this operator by clicking **Refresh static preview**.

   :::image type="content" source="./media/process-events-using-event-processor-editor/event-processor-editor-preview.png" alt-text="Screenshot showing how to preview the data in event processor editor." lightbox="./media/process-events-using-event-processor-editor/event-processor-editor-preview.png" :::

9. If there's any configuration error, you're notified by **Authoring error** tab in the bottom pane.

   :::image type="content" source="./media/process-events-using-event-processor-editor/event-processor-editor-authoring-error.png" alt-text="Screenshot showing the authoring error tab in event processor editor." lightbox="./media/process-events-using-event-processor-editor/event-processor-editor-authoring-error.png" :::

10. If everything is as you expected after previewing the data, you can select **Done** to complete your event processing design and return to the Lakehouse destination configuration pane to get your Lakehouse destination created.

## Event processor editor 
Event processor enables you to transform the data that is being ingested into the destination. It's available for the Lakehouse type of destination. When you configure your Lakehouse destination, you can find the “Event processing” section in the middle of the right panel. From there, you can open the event processor editor to define your data transformation logic with drag and drop experience.

:::image type="content" source="./media/event-processor-editor/event-processor-editor-entrypoint.png" alt-text="Screenshot showing the entrypoint of the event processor editor." lightbox="./media/event-processor-editor/event-processor-editor-entrypoint.png" :::

The event processor editor provides a canvas and bottom pane to enable you to: 

- Build the event data transformation logic with drag and drop experience. 
- Preview the data in each of the processing nodes from the beginning to the end. 
- Discover the authoring errors within these processing nodes. 

:::image type="content" source="./media/event-processor-editor/event-processor-editor-overview.png" alt-text="Screenshot showing the overview of the event processor editor." lightbox="./media/event-processor-editor/event-processor-editor-overview.png" :::

The whole view layout is like the main editor. It consists of:

1. **Canvas with diagram view**: it's the place where you can design your data transformation logic with selecting the operator from the “Operations” menu in ribbon. Then you can connect the eventstream node, operator nodes, and the destination node by dragging the line. If you want to delete the connection between two nodes, you can select the line between the two nodes, and hit the delete key.  
2. **Right editing pane**: it's the place where you can configure the selected operation node or view the schema of the eventstream and destination. 
3. **Bottom pane with data preview and authoring error tabs**: it's the place where you can preview the data in the selected node with “Data preview” tab. It provides you with the experience of “what you see is what you get”. You can also discover the authoring errors when there's something not configured correctly or completely in the operation nodes. 

To learn more about how to use event processor editor to define your data transformation logic, see [Process event data with event processor editor](./process-events-using-event-processor-editor.md).

## Transformation operators 

The event processor provides six operators, which you can use to transform your event data according to your business needs. 

:::image type="content" source="./media/event-processor-editor/event-processor-editor-operators.png" alt-text="Screenshot showing the operators of the event processor editor." lightbox="./media/event-processor-editor/event-processor-editor-operators.png" :::

### Aggregate 

You can use the **Aggregate** transformation to calculate an aggregation (**Sum**, **Minimum**, **Maximum**, or **Average**) every time a new event occurs over a period of time. This operation also allows you to filter or slice the aggregation based on other dimensions in your data. You can have one or more aggregations in the same transformation. 

### Expand 

Use the **Expand** array transformation to create a new row for each value within an array. 

### Filter 

Use the **Filter** transformation to filter events based on the value of a field in the input. Depending on the data type (number or text), the transformation keeps the values that match the selected condition. 

### Group by 

Use the **Group by** transformation to calculate aggregations across all events within a certain time window. You can group by the values in one or more fields. It's like the **Aggregate** transformation but provides more options for aggregation. It also includes more complex options for time windows. Also like Aggregate, you can add more than one aggregation per transformation. 

The aggregations available in the transformation are: 
- Average 
- Count 
- Maximum 
- Minimum 
- Percentile (continuous and discrete) 
- Standard Deviation 
- Sum 
- Variance 

In time-streaming scenarios, performing operations on the data contained in temporal windows is a common pattern. The **windowing functions** are supported in event processor and integrated with **Group by** operator. You can define it in the setting of this operator.

:::image type="content" source="./media/event-processor-editor/event-processor-editor-operators-group-by.png" alt-text="Screenshot showing the group by operator of the event processor editor." lightbox="./media/event-processor-editor/event-processor-editor-operators-group-by.png" :::

### Manage fields 

The **Manage fields** transformation allows you to add, remove, or rename fields coming in from an input or another transformation. The settings on the side pane give you the option of adding a new one by selecting **Add field** or adding all fields at once. 

You can also add new field with the **Build-in Functions** to aggregate the data from upstream. Currently, the build-in functions we support are some functions in **String Functions**, **Date and Time Functions**, and **Mathematical Functions**.

:::image type="content" source="./media/event-processor-editor/event-processor-editor-manage-field.png" alt-text="Screenshot showing the manage field operator of the event processor editor." lightbox="./media/event-processor-editor/event-processor-editor-manage-field.png" :::

### Union 

Use the Union transformation to connect two or more nodes to add events that have shared fields (with the same name and data type) into one table. Fields that don't match are dropped and not included in the output.

## Next steps
See [Add and manage eventstream destinations](./add-manage-eventstream-destinations.md).
