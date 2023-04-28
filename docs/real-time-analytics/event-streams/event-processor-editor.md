---
title: Event processor editor for Microsoft Fabric event streams
description: This article describes the event processor editor that is used to transform your event data in Microsoft Fabric event streams feature.
ms.reviewer: spelluru
ms.author: xujiang1
author: xujxu
ms.topic: concept
ms.date: 04/23/2023
ms.search.form: product-kusto
---

# Event processor editor for Microsoft Fabric event streams

Event processor enables you to transform the data that is being ingested into the destination. It's available for the Lakehouse type of destination. When you configure your Lakehouse destination, you can find the “Event processing” section in the middle of the right panel. From there, you can open the event processor editor to define your data transformation logic with drag and drop experience.

:::image type="content" source="./media/event-processor-editor/event-processor-editor-entrypoint.png" alt-text="Screenshot showing the entrypoint of the event processor editor." lightbox="./media/event-processor-editor/event-processor-editor-entrypoint.png" :::

## Event processor editor overview

The event processor editor provides a canvas and bottom pane to enable you to: 

- Build the event data transformation logic with drag and drop experience. 
- Preview the data in each of the processing nodes from the beginning to the end. 
- Discover the authoring errors within these processing nodes. 

:::image type="content" source="./media/event-processor-editor/event-processor-editor-overview.png" alt-text="Screenshot showing the overview of the event processor editor." lightbox="./media/event-processor-editor/event-processor-editor-overview.png" :::

The whole view layout is like the main editor. It consists of:

1. **Canvas with diagram view**: it's the place where you can design your data transformation logic with selecting the operator from the “Operations” menu in ribbon. Then you can connect the eventsteam node, operator nodes, and the destination node by dragging the line. If you want to delete the connection between two nodes, you can select the line between the two nodes, and hit the delete key.  
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

Use the **Filter** transformation to filter events based on the value of a field in the input. Depending on the data type (number or text), the transformation will keep the values that match the selected condition. 

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

- [Process event data with event processor editor](./process-events-using-event-processor-editor.md)
- [Event streams destination](./event-streams-destination.md)
- [Add and manage eventstream destinations](./add-manage-eventstream-destinations.md)