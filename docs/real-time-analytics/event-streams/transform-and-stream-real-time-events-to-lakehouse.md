---
title: Ingest, filter, and transform real-time events and send them in Delta Lake format to Microsoft Fabric Lakehouse
description: This tutorial provides an end-to-end demonstration of how to use event streams feature to ingest, filter, and transform real-time events and send them in Delta Lake format to Microsoft Fabric Lakehouse from Azure Event Hubs.
ms.reviewer: spelluru
ms.author: xujiang1
author: xujxu
ms.topic: tutorial
ms.custom: build-2023
ms.date: 05/23/2023
ms.search.form: product-kusto
---

# Ingest, filter, and transform real-time events and send them in Delta Lake format to Microsoft Fabric Lakehouse

This tutorial shows you how to use Microsoft Fabric event streams to ingest, filter, and transform real-time events and send them in Delta Lake format to Microsoft Fabric Lakehouse from your Azure event hub, then build a Power BI report to visualize your business insights in these events data.

[!INCLUDE [preview-note](../../includes/preview-note.md)]

In this tutorial, you learn how to:

> [!div class="checklist"]
> * Create Eventstream and Lakehouse items in Microsoft Fabric
> * Add an Azure Event Hubs source to the eventstream
> * Create an event hub cloud connection
> * Add a Lakehouse destination to the eventstream
> * Define real-time events processing logic with event processor
> * Verify the data in lakehouse
> * Build Power BI report with the event data ingested in the lakehouse

## Prerequisites

To get started, you must complete the following prerequisites:

- Get access to a **premium workspace** with **Contributor** or above permissions where your eventstream and lakehouse item are located in.
- An Azure event hub with event data and appropriate permission available to access the policy keys. And it must be publicly accessible and not be behind a firewall or secured in a virtual network.

## Create a lakehouse and an eventstream

You can create an Eventstream item (eventstream) or a Lakehouse item (lakehouse) on the **Workspace** page or the **Create hub** page. Here are the steps:

1. Select your Fabric experience to **Real-time Analytics** and select **Lakehouse** and **Eventstream** to create them in workspace or create hub. Suggest creating the Lakehouse first and the Eventstream later, as you will initially be working with the Eventstream item later on.

   - In **Workspace**, select **New** and then **Lakehouse**, **Eventstream**:

       :::image type="content" source="./media/transform-and-stream-real-time-events-to-lakehouse/two-items-creation-in-workspace.png" alt-text="Screenshot showing the eventstream and lakehouse creation in workspace." lightbox="./media/transform-and-stream-real-time-events-to-lakehouse/two-items-creation-in-workspace.png" :::

   - In **Create hub**, select **Lakehouse** and **Eventstream**: 

       :::image type="content" source="./media/transform-and-stream-real-time-events-to-lakehouse/eventstream-creation-in-hub.png" alt-text="Screenshot showing the eventstream item creation in create hub." lightbox="./media/transform-and-stream-real-time-events-to-lakehouse/eventstream-creation-in-hub.png" :::
   
        :::image type="content" source="./media/transform-and-stream-real-time-events-to-lakehouse/lakehouse-creation-in-hub.png" alt-text="Screenshot showing the lakehouse item creation in create hub." lightbox="./media/transform-and-stream-real-time-events-to-lakehouse/lakehouse-creation-in-hub.png" :::

2. Give the names for the new eventstream and lakehouse items, and select **Create**. For example, **citypwr-es** for the eventstream and **citypwrdata** for the lakehouse.

   :::image type="content" source="./media/transform-and-stream-real-time-events-to-lakehouse/creating-dialog.png" alt-text="Screenshot showing the eventstream item creation dialog." lightbox="./media/transform-and-stream-real-time-events-to-lakehouse/creating-dialog.png" :::

3. After they're created successfully, four items are added into your workspace:
   - **citypwr-es**: an Eventstream item
   - **citypwrdata**: a Lakehouse item, a Dataset (default) item, and a SQL endpoint item.

       :::image type="content" source="./media/transform-and-stream-real-time-events-to-lakehouse/four-items-list.png" alt-text="Screenshot showing the four items list." lightbox="./media/transform-and-stream-real-time-events-to-lakehouse/four-items-list.png" :::

## Add an Azure Event Hubs source to the eventstream

After the lakehouse and eventstream are created, do the following steps to add an Azure event hub as your eventstream source.

1. Select **New source** on the ribbon or "**+**" in the main editor canvas and then Azure Event Hubs.

2. Enter a source name for the new source and select **Create new connection** to your Azure event hub.

   :::image type="content" source="./media/transform-and-stream-real-time-events-to-lakehouse/azure-event-hub-connection.png" alt-text="Screenshot showing the event hub creation." lightbox="./media/transform-and-stream-real-time-events-to-lakehouse/azure-event-hub-connection.png" :::

3. Fill in the information of your Azure event hub on the **New connection** page.

   :::image type="content" source="./media/transform-and-stream-real-time-events-to-lakehouse/eventstream-eventhub-source-cloud-connection.png" alt-text="Screenshot showing the cloud connection in event hub source." lightbox="./media/transform-and-stream-real-time-events-to-lakehouse/eventstream-eventhub-source-cloud-connection.png" :::

   - **Connection name**: Enter a name for the cloud connection. 
   - **Connection type**: Default value is `EventHub`. 
   - **Event Hub namespace**: Enter the name of your Azure event hub namespace. 
   - **Authentication**: Go to your Azure event hub and create a policy with `Manage` or `Listen` permission under **Share access policies**. Then use **policy name** and **primary key** as the **Shared Access Key Name** and **Shared Access Key**. 
   
       :::image type="content" source="./media/transform-and-stream-real-time-events-to-lakehouse/azure-event-hub-policy-key.png" alt-text="Screenshot showing the Azure event hub policy key." lightbox="./media/transform-and-stream-real-time-events-to-lakehouse/azure-event-hub-policy-key.png" :::
   
   - **Privacy level**: choose a privacy level for the cloud connection.

4. Select a **Data format** of the incoming real-time events that you want to get from your Azure event hub.

5. Select a **Consumer group** that is used for reading the event data from your Azure event hub and then **Add**. 

6. You see the new source node appears in the canvas after the event hub source is created successfully. You can select the event hub node in the canvas, then the **Data preview** tab in the bottom pane to view the data inside the event hub.

   :::image type="content" source="./media/transform-and-stream-real-time-events-to-lakehouse/event-hub-source-preview.png" alt-text="Screenshot showing the event hub source preview." lightbox="./media/transform-and-stream-real-time-events-to-lakehouse/event-hub-source-preview.png" :::

7. You can also select the eventstream node in the canvas, then the **Data preview** tab in the bottom pane to view the data inside the eventstream.

   :::image type="content" source="./media/transform-and-stream-real-time-events-to-lakehouse/eventstream-data-preview.png" alt-text="Screenshot showing the data preview in eventstream." lightbox="./media/transform-and-stream-real-time-events-to-lakehouse/eventstream-data-preview.png" :::

8. Similarly, you can check the **Data insights** for the event hub source node and the eventstream node.

## Add a lakehouse destination to the eventstream

After your event hub events have been ingested into your eventstream, you can add the **Lakehouse** destination to receive the events from your eventstream. Follow these steps to add the **Lakehouse** destination.

1. Select **New destination** on the ribbon or "**+**" in the main editor canvas and then select **Lakehouse**.  

2. Enter a name for the eventstream destination, fill in the information about your lakehouse.

   :::image type="content" source="./media/transform-and-stream-real-time-events-to-lakehouse/lakehouse-destination-adding.png" alt-text="Screenshot showing the lakehouse destination configuration." lightbox="./media/transform-and-stream-real-time-events-to-lakehouse/lakehouse-destination-adding.png" :::

   1. **Lakehouse**: Select an existing lakehouse item from the workspace you specified. The newly created lakehouse **citypwrdata** is selected.
   2. **Delta table**: Select an existing delta table or create a new one to receive data. Here a new delta table **citypwrtbl** is given.
   3. **Input data format**: Select the data format for the data that is sent to your lakehouse.

3. Select **Add** if you don't want to process your events while ingesting them to your lakehouse.
## Define real-time events processing logic with event processor

If the event processing is needed, select **Open event processor** before selecting **Create**. The event processor editor is open.

   :::image type="content" source="./media/transform-and-stream-real-time-events-to-lakehouse/event-processor-editor.png" alt-text="Screenshot showing the event processor editor." lightbox="./media/transform-and-stream-real-time-events-to-lakehouse/event-processor-editor.png" :::

In this case, the sensor IDs data isn't necessary to store in lakehouse. We can use event processor to remove these columns. 

1. Select **Manage fields** operator from **Operations** menu in the ribbon to add the event processing logic. 

   :::image type="content" source="./media/transform-and-stream-real-time-events-to-lakehouse/manage-fields-operator.png" alt-text="Screenshot showing the manage field operator." lightbox="./media/transform-and-stream-real-time-events-to-lakehouse/manage-fields-operator.png" :::

2. Select the line between eventstream and lakehouse and hit the **delete** key to delete the connection between them in order to insert the Manage fields operator between them. 

   :::image type="content" source="./media/transform-and-stream-real-time-events-to-lakehouse/delete-connection.png" alt-text="Screenshot showing the operator connection deletion." lightbox="./media/transform-and-stream-real-time-events-to-lakehouse/delete-connection.png" :::

3. Select the green circle on the left edge of the eventstream node, **hold and move** your mouse to connect it to Manage fields operator node. Similarly connect Manage fields operator node to Lakehouse node.

   :::image type="content" source="./media/transform-and-stream-real-time-events-to-lakehouse/setup-connection.png" alt-text="Screenshot showing the operator connection setup." lightbox="./media/transform-and-stream-real-time-events-to-lakehouse/setup-connection.png" :::

4. Select the **Manage fields** operator node. In the **Manage fields** configuration panel, select **Add all fields**. Then hover your mouse to the sensor column, select **...** and **Remove** to remove the column. 

   :::image type="content" source="./media/transform-and-stream-real-time-events-to-lakehouse/configure-manage-fields.png" alt-text="Screenshot showing manage field operator configuration." lightbox="./media/transform-and-stream-real-time-events-to-lakehouse/configure-manage-fields.png" :::

5. After the Manage fields is configured, you can preview the data that will be produced with this operator by clicking **Refresh static preview**.

   :::image type="content" source="./media/transform-and-stream-real-time-events-to-lakehouse/operator-data-preview.png" alt-text="Screenshot showing data preview in operator." lightbox="./media/transform-and-stream-real-time-events-to-lakehouse/operator-data-preview.png" :::

6. Select **Done** to save the event processing logic and return to the Lakehouse destination configuration pane.

7. Select **Create** in Lakehouse destination configuration pane to get your Lakehouse destination created.

8. You see a Lakehouse destination node is added into canvas. It takes 1 or 3 minutes to get its status to **Ingesting**.

   :::image type="content" source="./media/transform-and-stream-real-time-events-to-lakehouse/lakehouse-destination-starting.png" alt-text="Screenshot showing the lakehouse destination status." lightbox="./media/transform-and-stream-real-time-events-to-lakehouse/lakehouse-destination-starting.png" :::

9. After the destination status becomes **Ingesting**, select **Data preview** tab in the bottom pane to check if the event data is correctly ingested into the lakehouse.

   :::image type="content" source="./media/transform-and-stream-real-time-events-to-lakehouse/lakehouse-destination-preview.png" alt-text="Screenshot showing the lakehouse destination preview." lightbox="./media/transform-and-stream-real-time-events-to-lakehouse/lakehouse-destination-preview.png" :::

## Verify data in the lakehouse

To verify the event data in lakehouse, open **citypwrdata** lakehouse from your workspace, then select table **citypwrtbl** to view its data.

:::image type="content" source="./media/transform-and-stream-real-time-events-to-lakehouse/lakehouse-data-preview.png" alt-text="Screenshot showing the lakehouse data preview." lightbox="./media/transform-and-stream-real-time-events-to-lakehouse/lakehouse-data-preview.png" :::


## Build Power BI report with the events data ingested in the lakehouse

1. Go to your workspace, select **citypwrdata** dataset, which was created automatically together with the Lakehouse creation in the beginning.

2. Select **Auto-create** or **Start from scratch** to create your report.

   :::image type="content" source="./media/transform-and-stream-real-time-events-to-lakehouse/default-dataset-page.png" alt-text="Screenshot showing the default dataset page." lightbox="./media/transform-and-stream-real-time-events-to-lakehouse/default-dataset-page.png" :::

3. Adjust the report by selecting the temperature, humidity, WindSpeed, and three zones' power consumption in order to monitor these data.

   :::image type="content" source="./media/transform-and-stream-real-time-events-to-lakehouse/auto-generated-report.png" alt-text="Screenshot showing the auto generated report." lightbox="./media/transform-and-stream-real-time-events-to-lakehouse/auto-generated-report.png" :::

3. If you want to get the data autorefreshed, select **Edit** button in the autogenerated report. Then navigate to **Format page** under **Visualizations**, select **Page refresh** to set the refresh interval.

   > [!NOTE]
   > - The minimal refresh interval is controlled by admin interval.
   > - The current interval for writing events data to Lakehouse is two minutes.

   :::image type="content" source="./media/transform-and-stream-real-time-events-to-lakehouse/enable-auto-refresh.png" alt-text="Screenshot showing how to enable auto refresh." lightbox="./media/transform-and-stream-real-time-events-to-lakehouse/enable-auto-refresh.png" :::

4. After the report adjustment is done, select **Save** button and give the report a name to save it.

   :::image type="content" source="./media/transform-and-stream-real-time-events-to-lakehouse/final-report.png" alt-text="Screenshot showing the final report." lightbox="./media/transform-and-stream-real-time-events-to-lakehouse/final-report.png" :::

## Next steps

In this tutorial, you learned how to ingest, filter, and transform real-time events and send them in Delta Lake format to Microsoft Fabric Lakehouse from your Azure event hub and use the lakehouse to build Power BI report to visualize the business insights in your events data. If you're interested in discovering more advanced features for working with event streams, you may find the following resources helpful.

- [Introduction to Microsoft Fabric event streams](./overview.md)
- [Create and manage an eventstream in Microsoft Fabric](./create-manage-an-eventstream.md)
- [Add and manage eventstream sources](./add-manage-eventstream-sources.md)
- [Add and manage eventstream destinations](./add-manage-eventstream-destinations.md)
- [Process event data with event processor editor](./process-events-using-event-processor-editor.md)
