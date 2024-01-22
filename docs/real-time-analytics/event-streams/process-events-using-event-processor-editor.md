---
title: Process event data with the event processor editor
description: Learn how to use the event processor editor to define the event processing logic.
ms.reviewer: spelluru
ms.author: xujiang1
author: xujxu
ms.topic: how-to
ms.custom:
  - build-2023
  - build-2023-dataai
  - build-2023-fabric
  - ignite-2023
ms.date: 11/15/2023
ms.search.form: Event Processor
---

# Process event data with event processor editor

The event processor in a Lakehouse destination allows you to process your data before it's ingested into your lakehouse. The event processor editor is a no-code experience that allows you to drag and drop to design the event data processing logic. This article describes how to use the editor to design your processing logic.

## Prerequisites

Before you start, you must complete the following prerequisites:

- Get access to a **premium workspace** with **Contributor** or above permissions where your eventstream is located.
- Get access to a **premium workspace** with **Contributor** or above permissions where your lakehouse is located.

## Design the event processing with the editor

To design your event processing with the event processor editor:

1. Add a **Lakehouse** destination and enter the necessary parameters in the right pane. (See [Add and manage a destination in an eventstream](./add-manage-eventstream-destinations.md) for detailed instructions. )

1. Select **Open event processor**. The **Event processing editor** screen appears.

   :::image type="content" source="./media/process-events-using-event-processor-editor/event-processor-editor-entrypoint.png" alt-text="Screenshot showing where to select Open event processor in the Lakehouse destination configuration screen.":::

1. In the Event processing editor canvas, select the eventstream node. You can preview the data schema or change the data type in the right **Eventstream** pane.

   :::image type="content" source="./media/process-events-using-event-processor-editor/event-processor-editor-schema.png" alt-text="Screenshot showing the data schema in the right pane of the Event processing editor screen." lightbox="./media/process-events-using-event-processor-editor/event-processor-editor-schema.png" :::

1. To insert an event processing operator between this eventstream and destination in the event processor editor, you can use one of the following two methods:

   1. Insert the operator directly from the connection line. Hover on the connection line and then select the "+" button. A drop-down menu appears on the connection line, and you can select an operator from this menu.

      :::image type="content" source="./media/process-events-using-event-processor-editor/event-processor-editor-insert-node-1.png" alt-text="Screenshot showing where to hover on connection line to insert a node." :::

   1. Insert the operator from ribbon menu or canvas.
      1. You can select an operator from the **Operations** menu in the ribbon. Alternatively, you can hover on one of the nodes and then select the "+" button if you have deleted the connection line. A drop-down menu appears next to that node, and you can select an operator from this menu.

         :::image type="content" source="./media/process-events-using-event-processor-editor/event-processor-editor-manage-field.png" alt-text="Screenshot showing where to select an operator from the Operations menu." :::

         :::image type="content" source="./media/process-events-using-event-processor-editor/event-processor-editor-insert-node-2.png" alt-text="Screenshot showing where to hover on nodes to insert a node." :::

      2. Finally, you need to reconnect these nodes. Hover on the left edge of the event stream node, and then select and drag the green circle to connect it to the **Manage fields** operator node. Follow the same process to connect the **Manage fields** operator node to the lakehouse node.

          :::image type="content" source="./media/process-events-using-event-processor-editor/event-processor-editor-connecting.png" alt-text="Screenshot showing where to connect the nodes." lightbox="./media/process-events-using-event-processor-editor/event-processor-editor-connecting.png" :::

1. Select the **Manage fields** operator node. In the **Manage fields** configuration panel, select the fields you want to output. If you want to add all fields, select **Add all fields**. You can also add a new field with the built-in functions to aggregate the data from upstream. (Currently, the built-in functions we support are some functions in **String Functions**, **Date and Time Functions**, **Mathematical Functions**. To find them, search on "built-in.")

   :::image type="content" source="./media/process-events-using-event-processor-editor/event-processor-editor-configure-operator.png" alt-text="Screenshot showing how to configure the operator.":::

1. After you have configured the **Manage fields** operator, select **Refresh static preview** to preview the data this operator produces.

   :::image type="content" source="./media/process-events-using-event-processor-editor/event-processor-editor-preview.png" alt-text="Screenshot showing how to preview data in the event processor editor." lightbox="./media/process-events-using-event-processor-editor/event-processor-editor-preview.png" :::

1. If you have any configuration errors, they appear in the **Authoring error** tab in the bottom pane.

   :::image type="content" source="./media/process-events-using-event-processor-editor/event-processor-editor-authoring-error.png" alt-text="Screenshot showing the authoring error tab in event processor editor." lightbox="./media/process-events-using-event-processor-editor/event-processor-editor-authoring-error.png" :::

1. If your previewed data looks correct, select **Done** to save the event processing logic and return to the Lakehouse destination configuration screen.

1. Select **Add** to complete the creation of your lakehouse destination.

## Event processor editor

The Event processor enables you to transform the data that you're ingesting into a lakehouse destination. When you configure your lakehouse destination, you find the **Open event processor** option in the middle of the **Lakehouse** destination configuration screen.

:::image type="content" source="./media/process-events-using-event-processor-editor/event-processor-editor-entrypoint.png" alt-text="Screenshot showing where to open the event processor editor." lightbox="./media/event-processor-editor/event-processor-editor-entrypoint.png" :::

Selecting **Open event processor** launches the **Event processing editor** screen, where you can define your data transformation logic.

The event processor editor includes a canvas and lower pane where you can:

- Build the event data transformation logic with drag and drop.
- Preview the data in each of the processing nodes from beginning to end.
- Discover any authoring errors within the processing nodes.

The screen layout is like the main editor. It consists of three sections, shown in the following image:

:::image type="content" source="./media/event-processor-editor/event-processor-editor-overview.png" alt-text="Screenshot of the Event processing editor screen, indicating the three main sections." lightbox="./media/event-processor-editor/event-processor-editor-overview.png":::

1. **Canvas with diagram view**: In this pane, you can design your data transformation logic by selecting an operator (from the **Operations** menu) and connecting the eventstream and the destination nodes via the newly created operator node. You can drag and drop connecting lines or select and delete connections.

1. **Right editing pane**: This pane allows you to configure the selected operation node or view the schema of the eventstream and destination.

1. **Bottom pane with data preview and authoring error tabs**: In this pane, preview the data in a selected node with **Data preview** tab. The **Authoring errors** tab lists any incomplete or incorrect configuration in the operation nodes.

## Transformation operators

The event processor provides six operators, which you can use to transform your event data according to your business needs.

:::image type="content" source="./media/event-processor-editor/event-processor-editor-operators.png" alt-text="Screenshot showing the operators available to in the Operations menu.":::

### Aggregate

Use the **Aggregate** transformation to calculate an aggregation (**Sum**, **Minimum**, **Maximum**, or **Average**) every time a new event occurs over a period of time. This operation also allows you to filter or slice the aggregation based on other dimensions in your data. You can have one or more aggregations in the same transformation.

### Expand

Use the **Expand** array transformation to create a new row for each value within an array.

### Filter

Use the **Filter** transformation to filter events based on the value of a field in the input. Depending on the data type (number or text), the transformation keeps the values that match the selected condition.

### Group by

Use the **Group by** transformation to calculate aggregations across all events within a certain time window. You can group by the values in one or more fields. It's like the **Aggregate** transformation but provides more options for aggregation and includes more complex options for time windows. Like **Aggregate**, you can add more than one aggregation per transformation.

The aggregations available in the transformation are:

- Average
- Count
- Maximum
- Minimum
- Percentile (continuous and discrete)
- Standard Deviation
- Sum
- Variance

In time-streaming scenarios, performing operations on the data contained in temporal windows is a common pattern. The event processor supports **windowing functions**, which is integrated with the **Group by** operator. You can define it in the setting of this operator.

:::image type="content" source="./media/event-processor-editor/event-processor-editor-operators-group-by.png" alt-text="Screenshot showing the Group by operator available in the event processor editor." lightbox="./media/event-processor-editor/event-processor-editor-operators-group-by.png" :::

### Manage fields

The **Manage fields** transformation allows you to add, remove, or rename fields coming in from an input or another transformation. The side pane settings give you the option of adding a new field by selecting **Add field** or adding all fields at once.

You can also add a new field with the built-in functions to aggregate the data from upstream. (Currently, the built-in functions we support are some functions in **String Functions**, **Date and Time Functions**, and **Mathematical Functions**. To find them, search on "built-in.")

:::image type="content" source="./media/event-processor-editor/event-processor-editor-manage-field.png" alt-text="Screenshot showing the Manage field operator available in the event processor editor." :::

### Union

Use the Union transformation to connect two or more nodes and add events that have shared fields (with the same name and data type) into one table. Fields that don't match are dropped and not included in the output.

## Related content

- [Add and manage destinations in an eventstream](./add-manage-eventstream-destinations.md).
