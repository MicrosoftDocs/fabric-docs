---
title: Process Event Data with the Event Processing Editor
description: Learn how to use the event processing editor to define event processing logic.
ms.reviewer: spelluru
ms.author: xujiang1
author: xujxu
ms.topic: how-to
ms.custom: sfi-image-nochange
ms.date: 11/21/2024
ms.search.form: Event Processor
zone_pivot_group_filename: real-time-intelligence/event-streams/zone-pivot-groups.json
zone_pivot_groups: event-streams-standard-enhanced
---

# Process event data by using the event processing editor

The event processing editor is a no-code experience in which you drag items to design processing logic for event data. This article describes how to use the editor to design your processing logic.

[!INCLUDE [select-view](./includes/select-view.md)]

::: zone pivot="enhanced-capabilities"

## Prerequisites

- Access to a workspace in the Microsoft Fabric capacity license mode or the trial license mode with Contributor or higher permissions.

## Design event processing by using the editor

To perform processing operations on your data streams by using a no-code editor, follow these steps:

1. Select **Edit** on the ribbon if you aren't already in **Edit** mode. Ensure that the upstream node for the connected operations has a schema.

    :::image type="content" source="./media/process-events-using-event-processor-editor/enhanced-edit-mode.png" alt-text="Screenshot that shows the event processing editor in Edit mode." lightbox="./media/process-events-using-event-processor-editor/enhanced-edit-mode.png":::
1. To insert an event processing operator between the stream node and the destination in **Edit** mode, you can use one of the following two methods:
    - Insert the operator directly from the connection line. Hover over the connection line and then select the **+** button. A dropdown menu appears on the connection line, and you can select an operator from this menu.

        :::image type="content" source="./media/process-events-using-event-processor-editor/select-add.png" alt-text="Screenshot that shows the selection of the plus button on the connection line." lightbox="./media/process-events-using-event-processor-editor/select-add.png":::
    - Insert the operator:
        1. On the ribbon, select an operator from the **Transform events** menu.

            :::image type="content" source="./media/process-events-using-event-processor-editor/select-manage-fields.png" alt-text="Screenshot that shows the selection of a Manage fields operator on the ribbon.":::

            Alternatively, you can hover over one of the nodes and then select the **+** button if you deleted the connection line. A dropdown menu appears next to that node, and you can select an operator from this menu.

            :::image type="content" source="./media/process-events-using-event-processor-editor/connection-line-plus.png" alt-text="Screenshot that shows the selection of the plus button on the connection line." lightbox="./media/process-events-using-event-processor-editor/connection-line-plus.png":::
        1. After you insert the operator, you need to reconnect these nodes. Hover over the left edge of the stream node, and then drag the green circle to connect it to the **Manage fields** operator node. Follow the same process to connect the **Manage fields** operator node to your destination.

            :::image type="content" source="./media/process-events-using-event-processor-editor/connect-manage-fields.png" alt-text="Screenshot that shows how to connect the stream node to the operator node." lightbox="./media/process-events-using-event-processor-editor/connect-manage-fields.png":::
1. Select the **Manage fields** operator node. On the **Manage fields** configuration panel, select the fields that you want to use for output. If you want to add all fields, select **Add all fields**.

   You can also add a new field by using the built-in functions to aggregate the data from upstream. (Currently, the supported built-in functions are string functions, date and time functions, and mathematical functions. To find them, search for **built-in**.)

   :::image type="content" source="./media/process-events-using-event-processor-editor/manage-fields-configuration.png" alt-text="Screenshot that shows how to select fields for output." lightbox="./media/process-events-using-event-processor-editor/manage-fields-configuration.png":::
1. After you configure the **Manage fields** operator, select **Refresh** to validate the test result that this operator produces.

   :::image type="content" source="./media/process-events-using-event-processor-editor/refresh.png" alt-text="Screenshot that shows the refreshed page." lightbox="./media/process-events-using-event-processor-editor/refresh.png":::
1. If you have any configuration errors, they appear on the **Authoring errors** tab on the lower pane.

   :::image type="content" source="./media/process-events-using-event-processor-editor/authoring-errors.png" alt-text="Screenshot that shows the tab for authoring errors." lightbox="./media/process-events-using-event-processor-editor/authoring-errors.png":::
1. If your test result looks correct, select **Publish** to save the event processing logic and return to **Live** view.

   :::image type="content" source="./media/process-events-using-event-processor-editor/publish.png" alt-text="Screenshot that shows the Publish button on the ribbon selected." lightbox="./media/process-events-using-event-processor-editor/publish.png":::
1. After you complete these steps, you can visualize how your eventstream starts streaming and processing data in **Live** view.

   :::image type="content" source="./media/process-events-using-event-processor-editor/live-view.png" alt-text="Screenshot that shows the live view." lightbox="./media/process-events-using-event-processor-editor/live-view.png":::

## Transform data by using the editor

You can use the event processing editor (the canvas in **Edit** mode) to transform data into various destinations. Enter **Edit** mode to design stream processing operations for your data streams.

:::image type="content" source="./media/process-events-using-event-processor-editor/event-processor-editor-enhanced.png" alt-text="Screenshot that shows the event processing editor for an eventstream with enhanced capabilities." lightbox="./media/process-events-using-event-processor-editor/event-processor-editor-enhanced.png":::

**Edit** mode includes a canvas and lower pane where you can:

- Build the transformation logic for event data by dragging.
- Preview the test result in each of the processing nodes from beginning to end.
- Discover any authoring errors within the processing nodes.

### Editor layout

:::image type="content" source="./media/process-events-using-event-processor-editor/layout-enhanced.png" alt-text="Screenshot that shows the layout of the event processing editor for an eventstream with enhanced capabilities." lightbox="./media/process-events-using-event-processor-editor/layout-enhanced.png":::

1. On the pane that contains the ribbon menu and canvas, you design your data transformation logic by selecting an operator (from the **Transform events** menu) and connecting the stream and the destination nodes via the newly created operator node. You can drag connecting lines or select and delete connections.

2. On the right editing pane, you configure the selected node or view the stream name.

3. On the lower pane, you preview the test result in a selected node by using the **Test result** tab. The **Authoring errors** tab lists any incomplete or incorrect configuration in the operation nodes.

### Supported node types and examples

Here are the destination types that support adding operators before ingestion:

- Lakehouse
- Eventhouse (event processing before ingestion)
- Derived stream
- Activator

> [!NOTE]
> For destinations that don't support a pre-ingestion operator addition, you can first add a derived stream as the output of your operator. Then, append your intended destination to this derived stream.

:::image type="content" source="./media/process-events-using-event-processor-editor/unsupported-destination.png" alt-text="Screenshot that shows the layout of the event processing editor with a filter sending output to an unsupported destination." lightbox="./media/process-events-using-event-processor-editor/unsupported-destination.png":::

::: zone-end

::: zone pivot="standard-capabilities"

The event processor in a lakehouse and KQL database (event processing before ingestion) allows you to process your data before it's ingested into your destination.

## Prerequisites

- Access to a workspace in the Microsoft Fabric capacity license mode or the trial license mode with Contributor or higher permissions.
- Access to a workspace with Contributor or higher permissions where your lakehouse or KQL database is located.

## Design event processing by using the editor

1. On the right pane, add a **Lakehouse** destination and enter the necessary parameters. For detailed instructions, see [Add and manage a destination in an eventstream](./add-manage-eventstream-destinations.md) for detailed instructions.

1. Select **Open event processor**.

   :::image type="content" source="./media/process-events-using-event-processor-editor/event-processor-editor-entrypoint.png" alt-text="Screenshot that shows the button for opening the event processor on the pane for adding details for a lakehouse destination.":::

1. On the canvas of the event processing editor, select the eventstream node. You can preview the data schema or change the data type on the **Eventstream** pane.

   :::image type="content" source="./media/process-events-using-event-processor-editor/event-processor-editor-schema.png" alt-text="Screenshot that shows the data schema on the right pane of the event processing editor." lightbox="./media/process-events-using-event-processor-editor/event-processor-editor-schema.png" :::

1. To insert an event processing operator between this eventstream and the destination in the event processing editor, you can use one of the following two methods:

   1. Insert the operator directly from the connection line. Hover over the connection line and then select the **+** button. A dropdown menu appears on the connection line, and you can select an operator from this menu.

      :::image type="content" source="./media/process-events-using-event-processor-editor/event-processor-editor-insert-node-1.png" alt-text="Screenshot that shows where to hover over the connection line to insert a node." :::

   1. Insert the operator from ribbon menu or canvas.
      1. You can select an operator from the **Operations** menu on the ribbon.

         :::image type="content" source="./media/process-events-using-event-processor-editor/event-processor-editor-manage-field.png" alt-text="Screenshot that shows where to select an operator from the Operations menu." :::

         Alternatively, you can hover over one of the nodes and then select the **+** button if you deleted the connection line. A dropdown menu appears next to that node, and you can select an operator from this menu.

         :::image type="content" source="./media/process-events-using-event-processor-editor/event-processor-editor-insert-node-2.png" alt-text="Screenshot that shows where to hover over nodes to insert a node." :::

      2. You need to reconnect the nodes. Hover over the left edge of the eventstream node, and then drag the green circle to connect it to the **Manage fields** operator node. Follow the same process to connect the **Manage fields** operator node to the **Lakehouse** node.

          :::image type="content" source="./media/process-events-using-event-processor-editor/event-processor-editor-connecting.png" alt-text="Screenshot that shows where to connect the nodes." lightbox="./media/process-events-using-event-processor-editor/event-processor-editor-connecting.png" :::

1. Select the **Manage fields** operator node. On the **Manage fields** configuration panel, select the fields that you want to use for output. If you want to add all fields, select **Add all fields**.

   You can also add a new field by using the built-in functions to aggregate the data from upstream. (Currently, the supported built-in functions are string functions, date and time functions, and mathematical functions. To find them, search for **built-in**.)

   :::image type="content" source="./media/process-events-using-event-processor-editor/event-processor-editor-configure-operator.png" alt-text="Screenshot that shows how to select fields to configure the operator.":::

1. After you configure the **Manage fields** operator, select **Refresh static preview** to preview the data that this operator produces.

   :::image type="content" source="./media/process-events-using-event-processor-editor/event-processor-editor-preview.png" alt-text="Screenshot that shows how to preview data in the event processing editor." lightbox="./media/process-events-using-event-processor-editor/event-processor-editor-preview.png" :::

1. If you have any configuration errors, they appear on the **Authoring errors** tab on the lower pane.

   :::image type="content" source="./media/process-events-using-event-processor-editor/event-processor-editor-authoring-error.png" alt-text="Screenshot that shows the tab for authoring errors in the event processing editor." lightbox="./media/process-events-using-event-processor-editor/event-processor-editor-authoring-error.png" :::

1. If your previewed data looks correct, select **Done** to save the event processing logic and return to the configuration details for the lakehouse destination.

1. Select **Add** to complete the creation of your lakehouse destination.

## Transform data by using the editor

You can use the event processing editor to transform the data that you're ingesting into a lakehouse destination. When you configure your lakehouse destination, you find the **Open event processor** option in the middle of the **Lakehouse** destination configuration screen.

:::image type="content" source="./media/process-events-using-event-processor-editor/event-processor-editor-entrypoint.png" alt-text="Screenshot that shows where to open the event processing editor." lightbox="./media/event-processor-editor/event-processor-editor-entrypoint.png" :::

Selecting **Open event processor** opens the **Event processing editor** screen, where you can define your data transformation logic.

The event processing editor includes a canvas and lower pane where you can:

- Build the event data transformation logic by dragging.
- Preview the data in each of the processing nodes from beginning to end.
- Discover any authoring errors within the processing nodes.

The screen layout is like the main editor. It consists of the three sections, shown in the following image.

:::image type="content" source="./media/event-processor-editor/event-processor-editor-overview.png" alt-text="Screenshot of the Event processing editor screen, indicating the three main sections." lightbox="./media/event-processor-editor/event-processor-editor-overview.png":::

1. On the pane that contains the canvas with diagram view, you can design your data transformation logic by selecting an operator (from the **Operations** menu) and connecting the eventstream and the destination nodes via the newly created operator node. You can drag connecting lines or select and delete connections.

1. On the right editing pane, you configure the selected operation node or view the schema of the eventstream and destination.

1. On the lower pane, you preview the data in a selected node by using the **Data preview** tab. The **Authoring errors** tab lists any incomplete or incorrect configuration in the operation nodes.

::: zone-end

### Authoring errors

Authoring errors are errors that occur in the event processing editor due to incomplete or incorrect configuration of the operation nodes, helping you find and fix potential problems in your event processor.

You can view authoring errors on the lower pane of the event processing editor. The lower pane lists all the authoring errors, each authoring error has four columns:

- **Node ID**: Indicates the ID of the operation node where the authoring error occurred.
- **Node type**: Indicates the type of the operation node where the authoring error occurred.
- **Level**: Indicates the severity of the authoring error, there are two levels, **Fatal** and **Information**. Fatal level authoring error means that your event processor has serious problems and can't be saved or run. Information level authoring error means that your event processor has some tips or suggestions that can help you optimize or improve your event processor.
- **Error**: Indicates the specific information of the authoring error, briefly describing the cause and impact of the authoring error. You can select the **Show details** tab to see details.

Since Eventstream and Eventhouse support different data types, the process of data type conversion might generate authoring errors.

The following table shows the results of data type conversion from Eventstream to Eventhouse. The columns represent the data types supported by Eventstream, and the rows represent the data types supported by Eventhouse. The cells indicate the conversion results, which can be one of the following three:

✔️ Indicates successful conversion, no errors, or warnings are generated.

❌ Indicates impossible conversion, fatal authoring error is generated. The error message is similar to: The data type "{1}" for the column "{0}" doesn't match the expected type "{2}" in the selected KQL table, and can't be autoconverted.

⚠️ Indicates possible but inaccurate conversion, information authoring error is generated. The error message is similar to: The data type "{1}" for the column "{0}" doesn't exactly match the expected type "{2}" in the selected KQL table. It's autoconverted to "{2}".

| | string | bool | datetime | dynamic | guid | int | long | real | timespan | decimal |
|:--------:|:------:|:----:|:--------:|:-------:|:----:|:---:|:----:|:----:|:--------:|:-------:|
| **Int64**      |   ❌    |  ❌   |    ❌     |    ✔️    |  ❌   |  ⚠️  |  ✔️   |  ⚠️   |    ❌     |    ✔️    |
| **Double**    |   ❌    |  ❌   |    ❌     |    ✔️    |  ❌   |  ❌   |  ❌   |  ⚠️   |    ❌     |   ⚠️    |
| **String**   |   ✔️    |  ❌   |    ❌     |    ✔️    |  ❌   |  ❌   |  ❌   |  ❌   |    ❌     |    ❌    |
| **Datetime** |   ⚠️    |  ❌   |    ✔️     |    ✔️    |  ❌   |  ❌   |  ❌   |  ❌   |    ❌     |    ❌    |
| **Record**   |   ⚠️    |  ❌   |    ❌     |    ✔️    |  ❌   |  ❌   |  ❌   |  ❌   |    ❌     |    ❌    |
| **Array**    |   ⚠️    |  ❌   |    ❌     |    ✔️    |  ❌   |  ❌   |  ❌   |  ❌   |    ❌     |    ❌    |

As you can see from the table, some data type conversions are successful, such as string to string. These conversions don't generate any authoring errors, and don't affect the operation of your event processor.

Some data type conversions are impossible, such as int to string. These conversions generate fatal level authoring errors, causing your event processor to fail to save. You need to change your data type either in your Eventstream or in KQL table to avoid these errors.

Some data type conversions are possible, but not precise, such as int to real. These conversions generate information level authoring errors, indicating the mismatch between data types, and the automatic conversion results. These conversions might cause your data to lose precision or structure. You can choose whether to ignore these errors, or modify your data type either in your Eventstream or in KQL table to optimize your event processor.

## Transform event data by using operators

The event processor provides seven operators, which you can use to transform your event data according to your business needs.

:::image type="content" source="./media/event-processor-editor/event-processor-editor-operators.png" alt-text="Screenshot that shows the operators available to in the Operations menu.":::

### Aggregate

Use the **Aggregate** transformation to calculate an aggregation (**Sum**, **Minimum**, **Maximum**, or **Average**) every time a new event occurs over a period of time. This operation also allows for the renaming of these calculated columns, and filtering or slicing the aggregation based on other dimensions in your data. You can have one or more aggregations in the same transformation.

- **Operator name**: Specify the name of the aggregation operation.
- **Add aggregate function**: Add one or more aggregations in aggregate operation.
- **Type**: Choose an aggregation type: **Sum**, **Minimum**, **Maximum**, or **Average**.
- **Field**: Select the column to process.
- **Name**: Define a name for this aggregation function.
- **Partition by**: Select a column to group the aggregation.
- **Aggregate values within the last**: Specify a time window for aggregation (default is 5 seconds).

:::image type="content" source="./media/event-processor-editor/aggregate-operator.png" alt-text="Screenshot that shows the aggregate operator configuration and test result.":::

### Expand

Use the **Expand** array transformation to create a new row for each value within an array. You can choose **create row for missing/empty array** , or **don't create row for missing/empty array**.

:::image type="content" source="./media/event-processor-editor/array.png" alt-text="Screenshot that shows expand operator's configuration and test result.":::

### Filter

Use the **Filter** transformation to filter events based on the value of a field in the input. Depending on the data type (number or text), the transformation keeps the values that match the selected condition, such as **is null** or **is not null**.

### Group by

Use the **Group by** transformation to calculate aggregations across all events within a certain time window. You can group by the values in one or more fields. It's like the **Aggregate** transformation allows for the renaming of columns, but provides more options for aggregation and includes more complex options for time windows. Like **Aggregate**, you can add more than one aggregation per transformation.

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

:::image type="content" source="./media/event-processor-editor/event-processor-editor-operators-group-by.png" alt-text="Screenshot that shows the Group by operator available in the event processing editor." lightbox="./media/event-processor-editor/event-processor-editor-operators-group-by.png" :::

### Manage fields

The **Manage fields** transformation allows you to add, remove, change data type, or rename fields coming in from an input or another transformation. The side pane settings give you the option of adding a new field by selecting **Add field**, adding multiple fields, or adding all fields at once.

:::image type="content" source="./media/event-processor-editor/event-processor-editor-manage-field.png" alt-text="Screenshot that shows the Manage fields operator available in the event processing editor." :::

Furthermore, you can add a new field with the built-in functions to aggregate the data from upstream. (Currently, the built-in functions we support are some functions in **String Functions**, **Date and Time Functions**, and **Mathematical Functions**. To find them, search on "built-in.")

:::image type="content" source="./media/event-processor-editor/event-processor-editor-manage-field-build-in-functions.png" alt-text="Screenshot that shows the Manage field built-in functions." :::

The following table shows the results of changing the data type using manage fields. The columns represent the original data types, and the rows represent the target data type.

- If there's a ✔️ in the cell, it means that it can be converted directly and the target data type option is shown in the dropdown list.
- If there's a ❌ in the cell, it means that it can't be converted and the target data type option isn't shown in the dropdown list.
- If there's a ⚠️ in the cell, it means that it can be converted, but it needs to meet certain conditions, such as the string format must conform to the requirements of the target data type. For example, when converting from string to int, the string needs to be a valid integer form, such as `123`, not `abc`.

|      | Int64                      | Double                     | String                      | Datetime                    | Record | Array |
|:------:|:-------------------------:|:-------------------------:|:---------------------------:|:---------------------------:|:------:|:-----:|
| **Int64**     | ✔️                         | ✔️                         | ✔️                           | ❌                           | ❌      | ❌     |
| **Double**  | ✔️                         | ✔️                         | ✔️                           | ❌                           | ❌      | ❌     |
| **String** | ⚠️ | ⚠️ | ✔️                           | ⚠️ | ❌      | ❌     |
| **Datetime** | ❌                         | ❌                         | ✔️                           | ✔️                           | ❌      | ❌     |
| **Record** | ❌                         | ❌                         | ✔️                           | ❌                           | ✔️      | ❌     |
| **Array**  | ❌                         | ❌                         | ✔️                           | ❌                           | ❌      | ✔️     |

### Union

Use the Union transformation to connect two or more nodes and add events that shared fields (with the same name and data type) into one table. Fields that don't match are dropped and not included in the output.

### Join

Use the **Join** transformation to combine events from two inputs based on the field pairs that you select. If you don't select a field pair, the join is based on time by default. The default is what makes this transformation different from a batch one.

As with regular joins, you have options for your join logic:

- **Inner join**: Include only records from both tables where the pair matches.
- **Left outer join**: Include all records from the left (first) table and only the records from the second one that match the pair of fields. If there's no match, the fields from the second input are blank.

## Related content

- [Add and manage a destination in an eventstream](./add-manage-eventstream-destinations.md).
