---
title: Process Event Data with the Event Processing Editor
description: Learn how to use the event processing editor to define event processing logic.
ms.reviewer: xujiang1
ms.topic: how-to
ms.custom: sfi-image-nochange
ms.date: 11/21/2024
ms.search.form: Event Processor
---

# Process event data by using the event processing editor

The event processing editor is a no-code experience in which you drag items to design processing logic for event data. This article describes how to use the editor to design your processing logic.

[!INCLUDE [select-view](./includes/select-view.md)]


## Prerequisites

- Access to a workspace in the Microsoft Fabric capacity license mode or the trial license mode with Contributor or higher permissions.

## Design event processing by using the editor

To perform processing operations on your data streams by using a no-code editor, follow these steps:

1. Select **Edit** on the ribbon if you aren't already in **Edit** mode. Ensure that the upstream node for the connected operations has a schema.

    :::image type="content" source="./media/process-events-using-event-processor-editor/enhanced-edit-mode.png" alt-text="Screenshot that shows the event processing editor in Edit mode." lightbox="./media/process-events-using-event-processor-editor/enhanced-edit-mode.png":::
1. To insert an event processing operator between the stream node and the destination in **Edit** mode, you can use one of the following two methods:
    - Insert the operator directly from the connection line. Hover over the connection line and then select the **+** button. A dropdown menu appears on the connection line, and you can select an operator from this menu.

        :::image type="content" source="./media/process-events-using-event-processor-editor/select-add.png" alt-text="Screenshot that shows the selection of the plus button on the connection line." lightbox="./media/process-events-using-event-processor-editor/select-add.png":::
    - Insert the operator from the ribbon menu or canvas:
        1. On the ribbon, you can select an operator from the **Transform events** menu.

            :::image type="content" source="./media/process-events-using-event-processor-editor/select-manage-fields.png" alt-text="Screenshot that shows the selection of a Manage fields operator on the ribbon.":::

            Alternatively, you can hover over one of the nodes and then select the **+** button if you deleted the connection line. A dropdown menu appears next to that node, and you can select an operator from this menu.

            :::image type="content" source="./media/process-events-using-event-processor-editor/connection-line-plus.png" alt-text="Screenshot that shows the plus button on the connection line." lightbox="./media/process-events-using-event-processor-editor/connection-line-plus.png":::
        1. After you insert the operator, you need to reconnect these nodes. Hover over the left edge of the stream node, and then drag the green circle to connect it to the **Manage fields** operator node. Follow the same process to connect the **Manage fields** operator node to your destination.

            :::image type="content" source="./media/process-events-using-event-processor-editor/connect-manage-fields.png" alt-text="Screenshot that shows how to connect the stream node to the operator node." lightbox="./media/process-events-using-event-processor-editor/connect-manage-fields.png":::
1. Select the **Manage fields** operator node. On the **Manage fields** configuration pane, select the fields that you want to use for output. If you want to add all fields, select **Add all fields**.

   You can also add a new field by using the built-in functions to aggregate the data from upstream. Currently, the supported built-in functions are string functions, date and time functions, and mathematical functions. To find them, search for **built-in**.

   :::image type="content" source="./media/process-events-using-event-processor-editor/manage-fields-configuration.png" alt-text="Screenshot that shows how to select fields for output." lightbox="./media/process-events-using-event-processor-editor/manage-fields-configuration.png":::
1. After you configure the **Manage fields** operator, select **Refresh** to validate the test result that this operator produces.

   :::image type="content" source="./media/process-events-using-event-processor-editor/refresh.png" alt-text="Screenshot that shows a refreshed page." lightbox="./media/process-events-using-event-processor-editor/refresh.png":::
1. If you have any configuration errors, they appear on the **Authoring errors** tab on the lower pane.

   :::image type="content" source="./media/process-events-using-event-processor-editor/authoring-errors.png" alt-text="Screenshot that shows the tab for authoring errors." lightbox="./media/process-events-using-event-processor-editor/authoring-errors.png":::
1. If your test result looks correct, select **Publish** to save the event processing logic and return to **Live** view.

   :::image type="content" source="./media/process-events-using-event-processor-editor/publish.png" alt-text="Screenshot that shows the Publish button on the ribbon." lightbox="./media/process-events-using-event-processor-editor/publish.png":::
1. After you complete the preceding steps, you can visualize how your eventstream starts streaming and processing data in **Live** view.

   :::image type="content" source="./media/process-events-using-event-processor-editor/live-view.png" alt-text="Screenshot that shows the Live view." lightbox="./media/process-events-using-event-processor-editor/live-view.png":::

## Transform data by using the editor

You can use the event processing editor (the canvas in **Edit** mode) to transform data into various destinations. Enter **Edit** mode to design stream processing operations for your data streams.

:::image type="content" source="./media/process-events-using-event-processor-editor/event-processor-editor-enhanced.png" alt-text="Screenshot that shows the event processing editor for an eventstream with enhanced capabilities." lightbox="./media/process-events-using-event-processor-editor/event-processor-editor-enhanced.png":::

**Edit** mode includes a canvas and lower pane where you can:

- Build the transformation logic for event data by dragging.
- Preview the test result in each of the processing nodes from beginning to end.
- Discover any authoring errors within the processing nodes.

### Editor layout

The event processing editor consists of three sections numbered in the following image.

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
> For destinations that don't support the addition of a pre-ingestion operator, you can first add a derived stream as the output of your operator. Then, append your intended destination to this derived stream.

:::image type="content" source="./media/process-events-using-event-processor-editor/unsupported-destination.png" alt-text="Screenshot that shows the layout of the event processing editor with a filter that sends output to an unsupported destination." lightbox="./media/process-events-using-event-processor-editor/unsupported-destination.png":::



