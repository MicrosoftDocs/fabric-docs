---
title: Ingest, filter, and transform real-time events and send them to a Microsoft Fabric lakehouse
description: Learn how to use event streams to ingest, filter, and transform data from Azure Event Hubs, and stream it into a lakehouse.
ms.reviewer: spelluru
ms.author: xujiang1
author: xujxu
ms.topic: tutorial
ms.custom:
  - build-2023
  - ignite-2023
ms.date: 11/15/2023
ms.search.form: Event Streams Tutorials
---

# Ingest, filter, and transform real-time events and send them to a Microsoft Fabric lakehouse

This tutorial shows you how to use the Microsoft Fabric event streams feature to ingest, filter, and transform real-time events and send them in Delta Lake format from your Azure event hub to a lakehouse. You also learn how to build a Power BI report to visualize business insights in your events data.

In this tutorial, you learn how to:

> [!div class="checklist"]
>
> - Create Eventstream and Lakehouse items in Microsoft Fabric
> - Add an Azure Event Hubs source to the eventstream
> - Create an event hub cloud connection
> - Add a Lakehouse destination to the eventstream
> - Define real-time events processing logic with event processor
> - Verify the data in lakehouse
> - Build Power BI report with the event data ingested in the lakehouse

## Prerequisites

Before you start, you must have:

- Access to a **premium workspace** with **Contributor** or above permissions where your Eventstream and Lakehouse items are located.
- An Azure event hub with event data and appropriate permission available to access the policy keys. The event hub must be publicly accessible and not be behind a firewall or secured in a virtual network. To create an event hub, see [Quickstart: Create an event hub using Azure portal](/azure/event-hubs/event-hubs-create).

## Create a lakehouse and an eventstream

You can create an eventstream and a lakehouse from the **Workspace** page or the **Create hub** page. Follow these steps to create a lakehouse, and then again to create an eventstream:

1. Change your Fabric experience to **Real-Time Intelligence** and select **Lakehouse** or **Eventstream** to create these items in your workspace or the Create hub. (For best results, create the Lakehouse item first and the Eventstream item second.)

   - In the **Workspace** screen, select **New** and then **Lakehouse** or **Eventstream**:

       :::image type="content" source="./media/transform-and-stream-real-time-events-to-lakehouse/two-items-creation-in-workspace.png" alt-text="Screenshot showing where to select Eventstream and Lakehouse in the workspace New menu.":::

   - In the **Create hub**, select **Lakehouse** or **Eventstream**:

       :::image type="content" source="./media/transform-and-stream-real-time-events-to-lakehouse/eventstream-creation-in-hub.png" alt-text="Screenshot showing where to select the Eventstream tile in the Create hub." lightbox="./media/transform-and-stream-real-time-events-to-lakehouse/eventstream-creation-in-hub.png" :::

        :::image type="content" source="./media/transform-and-stream-real-time-events-to-lakehouse/lakehouse-creation-in-hub.png" alt-text="Screenshot showing where to select the Lakehouse tile in the Create hub." lightbox="./media/transform-and-stream-real-time-events-to-lakehouse/lakehouse-creation-in-hub.png" :::

1. Enter the name for the new eventstream or lakehouse and select **Create**. For the examples in this article, we use **citypwr-es** for the eventstream and **citypwrdata** for the lakehouse.

   :::image type="content" source="./media/transform-and-stream-real-time-events-to-lakehouse/creating-dialog.png" alt-text="Screenshot showing where to enter a name in the New Eventstream dialog box.":::

After you create both your new eventstream and lakehouse successfully, these items appear in your workspace:

- **citypwr-es**: an Eventstream item
- **citypwrdata**: a Lakehouse item, a semantic model (default) item, and a SQL endpoint item.

   :::image type="content" source="./media/transform-and-stream-real-time-events-to-lakehouse/four-items-list.png" alt-text="Screenshot showing the list of four items added to your workspace.":::

## Add an Azure Event Hubs source to the eventstream

After you create the lakehouse and eventstream, follow these steps to add an Azure event hub as your eventstream source.

1. Select **New source** on the ribbon or "**+**" in the main editor canvas and then select **Azure Event Hubs**.

1. Enter a source name for the new source and select **Create new connection** to your Azure event hub.

   :::image type="content" source="./media/transform-and-stream-real-time-events-to-lakehouse/azure-event-hub-connection.png" alt-text="Screenshot showing where to select Create new connection on the Azure Event Hubs source configuration screen." lightbox="./media/transform-and-stream-real-time-events-to-lakehouse/azure-event-hub-connection.png":::

1. Fill in the information about your Azure event hub on the **New connection** page.

   :::image type="content" source="./media/add-manage-eventstream-sources/eventstream-eventhub-source-cloud-connection.png" alt-text="Screenshot showing the cloud connection in event hub source." lightbox="./media/add-manage-eventstream-sources/eventstream-eventhub-source-cloud-connection.png":::

   - **Event Hub namespace**: Enter the name of your Azure event hub namespace.
   - **Event Hub**: Enter the name of your Azure event hub in the Azure portal.
   - **Connection name**: Enter a name for the cloud connection.
   - **Shared access key name** and **Shared access key**: Go to your Azure event hub and create a policy with `Manage` or `Listen` permission under **Share access policies**. Then use **policy name** and **primary key** as the **Shared Access Key Name** and **Shared Access Key**.

      :::image type="content" source="./media/transform-and-stream-real-time-events-to-lakehouse/azure-event-hub-policy-key.png" alt-text="Screenshot showing where to select and enter the authentication information for your Azure event hub." lightbox="./media/transform-and-stream-real-time-events-to-lakehouse/azure-event-hub-policy-key.png" :::

1. Select a **Consumer group** that reads the event data from your Azure event hub and then **Add**.

1. Select a **Data format** of the incoming real-time events that you want to get from your Azure event hub.

1. The new source node appears in the canvas after the event hub source is created successfully. Select the event hub node in the canvas, then the **Data preview** tab in the bottom pane to view the data inside the event hub.

   :::image type="content" source="./media/transform-and-stream-real-time-events-to-lakehouse/event-hub-source-preview.png" alt-text="Screenshot showing the event hub source preview." lightbox="./media/transform-and-stream-real-time-events-to-lakehouse/event-hub-source-preview.png" :::

1. Select the eventstream node in the canvas, then the **Data preview** tab in the bottom pane to view the data inside the eventstream.

   :::image type="content" source="./media/transform-and-stream-real-time-events-to-lakehouse/eventstream-data-preview.png" alt-text="Screenshot showing the Data preview tab in the eventstream node." lightbox="./media/transform-and-stream-real-time-events-to-lakehouse/eventstream-data-preview.png" :::

1. To find data insight details, select the **Data insights** tab for the event hub source node and the eventstream node.

## Add a lakehouse destination to the eventstream

After your eventstream ingests your event hub events, you can add a lakehouse destination to receive the events from your eventstream. Follow these steps to add a lakehouse destination.

1. Select **New destination** on the ribbon or "**+**" in the main editor canvas, and then select **Lakehouse**.

1. Enter a name for the eventstream destination and fill in the information about your lakehouse.

   :::image type="content" source="./media/transform-and-stream-real-time-events-to-lakehouse/lakehouse-destination-adding.png" alt-text="Screenshot showing the Lakehouse destination configuration screen.":::

   1. **Lakehouse**: Select an existing lakehouse item from the workspace you specified. We selected the newly created lakehouse **citypwrdata** in our example.
   1. **Delta table**: Select an existing delta table or create a new one to receive data. For this example, we selected the new delta table **citypwrtbl**.
   1. **Input data format**: Select the format for your data.

1. If you don't want to process your events while ingesting them to your lakehouse, select **Add** to complete the configuration of your lakehouse destination. If you would like to process your events, skip to the [next section](#define-real-time-events-processing-logic-with-event-processor).

1. A Lakehouse destination node appears on the canvas with a spinning status indicator. The system takes a few minutes to change the status to **Ingesting**.

   :::image type="content" source="./media/transform-and-stream-real-time-events-to-lakehouse/lakehouse-destination-starting.png" alt-text="Screenshot showing where to find the two lakehouse destination status indicators." lightbox="./media/transform-and-stream-real-time-events-to-lakehouse/lakehouse-destination-starting.png" :::

1. After the destination status changes to **Ingesting**, select the **Data preview** tab in the bottom pane to verify your event data is correctly ingested into the lakehouse.

   :::image type="content" source="./media/transform-and-stream-real-time-events-to-lakehouse/lakehouse-destination-preview.png" alt-text="Screenshot showing the lakehouse destination preview tab." lightbox="./media/transform-and-stream-real-time-events-to-lakehouse/lakehouse-destination-preview.png" :::

## Define real-time events processing logic with event processor

In this section, after you have started the process of adding a lakehouse destination in the [previous section](#add-a-lakehouse-destination-to-the-eventstream), you'll define event processing logic using the event processor editor. For our example, we don't want to store the sensor IDs data in the lakehouse, so we use the event processor to remove the column.

1. From the completed Lakehouse destination screen (don't select **Add** yet), select **Open event processor** . The **Event processing editor** screen opens.

   :::image type="content" source="./media/transform-and-stream-real-time-events-to-lakehouse/event-processor-editor.png" alt-text="Screenshot showing the Event processing editor screen." lightbox="./media/transform-and-stream-real-time-events-to-lakehouse/event-processor-editor.png" :::

1. To add the event processing logic, select the **Operations** menu in the ribbon, and then select **Manage fields**.

   :::image type="content" source="./media/transform-and-stream-real-time-events-to-lakehouse/manage-fields-operator.png" alt-text="Screenshot showing where to select Manage fields in the Operations menu.":::

1. Hover on the connection line and then select the "+" button. A drop-down menu appears on the connection line, and you can insert the **Manage fields** operator between them.

   :::image type="content" source="./media/transform-and-stream-real-time-events-to-lakehouse/delete-connection.png" alt-text="Screenshot showing where to select and delete the operator connection between the eventstream and the lakehouse." lightbox="./media/transform-and-stream-real-time-events-to-lakehouse/delete-connection.png" :::

1. Select the **Manage fields** operator node. In the **Manage fields** configuration panel, select **Add all fields**. Then hover your mouse over the sensor column, select **...** and **Remove** to remove the column.

   :::image type="content" source="./media/transform-and-stream-real-time-events-to-lakehouse/configure-manage-fields.png" alt-text="Screenshot showing the Manage fields operator configuration." lightbox="./media/transform-and-stream-real-time-events-to-lakehouse/configure-manage-fields.png" :::

1. After you have configured the **Manage fields** operator, preview the data that this operator produces by clicking **Refresh static preview**.

   :::image type="content" source="./media/transform-and-stream-real-time-events-to-lakehouse/operator-data-preview.png" alt-text="Screenshot showing the refreshed data preview for the Manage fields operator." lightbox="./media/transform-and-stream-real-time-events-to-lakehouse/operator-data-preview.png" :::

1. Select **Done** to save the event processing logic and return to the **Lakehouse** destination configuration screen.

1. Select **Add** to complete the configuration of your lakehouse destination.

1. A Lakehouse destination node appears on the canvas with a spinning status indicator. The system takes a few minutes to change the status to **Ingesting**.

   :::image type="content" source="./media/transform-and-stream-real-time-events-to-lakehouse/lakehouse-destination-starting.png" alt-text="Screenshot showing the lakehouse destination status indicators." lightbox="./media/transform-and-stream-real-time-events-to-lakehouse/lakehouse-destination-starting.png" :::

1. After the destination status changes to **Ingesting**, select the **Data preview** tab in the bottom pane to verify your event data is correctly ingested into the lakehouse.

   :::image type="content" source="./media/transform-and-stream-real-time-events-to-lakehouse/lakehouse-destination-preview.png" alt-text="Screenshot showing the lakehouse destination preview." lightbox="./media/transform-and-stream-real-time-events-to-lakehouse/lakehouse-destination-preview.png" :::

## Verify data in the lakehouse

To verify the event data in your new lakehouse, open the **citypwrdata** lakehouse from your workspace, then select the **citypwrtbl** table to view its data.

:::image type="content" source="./media/transform-and-stream-real-time-events-to-lakehouse/lakehouse-data-preview.png" alt-text="Screenshot showing an example of a lakehouse data table." lightbox="./media/transform-and-stream-real-time-events-to-lakehouse/lakehouse-data-preview.png" :::

## Build a Power BI report with the ingested events data

1. Go to your workspace and select the **citypwrdata** semantic model, which the system automatically added when you created the new **citypwrdata** lakehouse.

1. From the **Create a report** menu in the ribbon, select **Auto-create** or **Start from scratch**.

   :::image type="content" source="./media/transform-and-stream-real-time-events-to-lakehouse/default-dataset-page.png" alt-text="Screenshot showing where to make your selection from the Create a report menu." lightbox="./media/transform-and-stream-real-time-events-to-lakehouse/default-dataset-page.png" :::

1. Adjust the report by selecting the temperature, humidity, WindSpeed, and three zones' power consumption so you can monitor these data.

   :::image type="content" source="./media/transform-and-stream-real-time-events-to-lakehouse/auto-generated-report.png" alt-text="Screenshot showing the auto generated report." lightbox="./media/transform-and-stream-real-time-events-to-lakehouse/auto-generated-report.png" :::

1. If you want to automatically refresh the data, select the **Edit** button in the autogenerated report. Then navigate to **Format page** under **Visualizations** and select **Page refresh** to set the refresh interval.

   > [!NOTE]
   > - Admin interval controls the minimum refresh interval.
   > - The current interval for writing events data to the lakehouse is two minutes.

   :::image type="content" source="./media/transform-and-stream-real-time-events-to-lakehouse/enable-auto-refresh.png" alt-text="Screenshot showing how to enable auto refresh." lightbox="./media/transform-and-stream-real-time-events-to-lakehouse/enable-auto-refresh.png" :::

1. When you're done adjusting the report, select the **Save** button and enter a name to save it.

   :::image type="content" source="./media/transform-and-stream-real-time-events-to-lakehouse/final-report.png" alt-text="Screenshot showing the final edited report." lightbox="./media/transform-and-stream-real-time-events-to-lakehouse/final-report.png" :::

## Related content

In this tutorial, you learned how to ingest, filter, and transform real-time events and send them from your Azure event hub to a lakehouse in Delta Lake format. You also learned how to use the lakehouse to build Power BI reports to visualize the business insights in your events data. If you're interested in discovering more advanced features for working with the Fabric event streams feature, you may find the following resources helpful.

- [Introduction to Microsoft Fabric event streams](./overview.md)
- [Create and manage an eventstream in Microsoft Fabric](./create-manage-an-eventstream.md)
- [Add and manage eventstream sources](./add-manage-eventstream-sources.md)
- [Add and manage eventstream destinations](./add-manage-eventstream-destinations.md)
- [Process event data with event processor editor](./process-events-using-event-processor-editor.md)
