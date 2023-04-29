---
title: Bring real-time events to Microsoft Fabric to build near real-time report
description: This tutorial provides an end-to-end demonstration of how to use event streams feature to bring your real-time events to Fabric Lakehouse from Azure Event Hubs to build near real-time report.
ms.reviewer: spelluru
ms.author: xujiang1
author: xujxu
ms.topic: tutorial
ms.date: 04/28/2023
ms.search.form: product-kusto
---

# Bring real-time events to Microsoft Fabric to build near real-time report

This tutorial shows you how to use Microsoft Fabric event streams to bring your real-time events to lakehouse from your Azure event hub, then build near real-time report to monitor your business events data.

In this tutorial, you learn how to:

> [!div class="checklist"]
> * Create an Eventstream item and Lakehouse item in Microsoft Fabric
> * Add an Azure Event Hubs source to the Eventstream item
> * Create an event hub cloud connection
> * Add an Lakehouse destination to the Eventstream item
> * Define real-time events processing logic with event processor
> * Verify the data in lakehouse
> * Build near real-time Power BI report with the data in lakehouse

## Prerequisites

To get started, you must complete the following prerequisites:

- Get access to a **premium workspace** with **Contributor** or above permissions where your Eventstream and Lakehouse item are located in.
- An Azure event hub with event data exists and appropriate permission available to access the policy keys.

## Create Eventstream and Lakehouse item

Eventstream and Lakehouse item can be created in **Workspace** or **Create hub**. Here are the steps to create them.

1. Select your Fabric experience to **Real-time Analytics** and select **Eventstream** and **Lakehouse** to create them in workspace or create hub. 

   In **Workspace**, select **New** and then **Eventstream**, **Lakehouse**:

   :::image type="content" source="./media/bring-events-to-fabric-from-event-hub/two-items-creation-in-workspace.png" alt-text="Screenshot showing the eventstream and lakehouse creation in workspace." lightbox="./media/bring-events-to-fabric-from-event-hub/two-items-creation-in-workspace.png" :::

   In **Create hub**, select **Eventstream** and **Lakehouse**: 

   :::image type="content" source="./media/bring-events-to-fabric-from-event-hub/eventstream-creation-in-hub.png" alt-text="Screenshot showing the eventstream item creation in create hub." lightbox="./media/bring-events-to-fabric-from-event-hub/eventstream-creation-in-hub.png" :::
   :::image type="content" source="./media/bring-events-to-fabric-from-event-hub/lakehouse-creation-in-hub.png" alt-text="Screenshot showing the lakehouse item creation in create hub." lightbox="./media/bring-events-to-fabric-from-event-hub/lakehouse-creation-in-hub.png" :::

2. Give the name for the new Eventstream and Lakehouse items and select **Create**. Here, **citypwr-es** eventstream and **citypwrdata** lakehouse are created.

   :::image type="content" source="./media/bring-events-to-fabric-from-event-hub/creating-dialog.png" alt-text="Screenshot showing the eventstream item creation dialog." lightbox="./media/bring-events-to-fabric-from-event-hub/creating-dialog.png" :::

3. After they're created successfully, four items are added into your workspace:
   - **citypwr-es**: an Eventstream item
   - **citypwrdata**: a Lakehouse item, a Dataset (default) item, and a SQL endpoint item.

   :::image type="content" source="./media/bring-events-to-fabric-from-event-hub/four-items-list.png" alt-text="Screenshot showing the four items list." lightbox="./media/bring-events-to-fabric-from-event-hub/four-items-list.png" :::

## Add an Azure Event Hubs source to the Eventstream item

After the Lakehouse and Eventstream items are created, do the following steps to add an Azure event hub as your eventstream source.

1. Select **New source** on the ribbon or "**+**" in the main editor canvas and then Azure Event Hubs.

2. Enter a source name for the new source and select **Create new connection** to your Azure event hub.

   :::image type="content" source="./media/bring-events-to-fabric-from-event-hub/azure-event-hub-connection.png" alt-text="Screenshot showing the event hub creation." lightbox="./media/bring-events-to-fabric-from-event-hub/azure-event-hub-connection.png" :::

3. Fill in the information of your Azure event hub on the **New connection** page.

   :::image type="content" source="./media/add-manage-eventstream-sources/eventstream-eventhub-source-cloud-connection.png" alt-text="Screenshot showing the cloud connection in event hub source." lightbox="./media/add-manage-eventstream-sources/eventstream-eventhub-source-cloud-connection.png" :::

   - **Connection name**: Enter a name for the cloud connection. 
   - **Connection type**: Default value is `EventHub`. 
   - **Event Hub namespace**: Enter the name of your Azure event hub namespace. 
   - **Authentication username and password**: Go to your Azure event hub and create a policy under **Share access policies**. Then use **policy name** and **primary key** as the username and password. 
   
       :::image type="content" source="./media/add-manage-eventstream-sources/azure-event-hub-policy-key.png" alt-text="Screenshot showing the Azure event hub policy key." lightbox="./media/add-manage-eventstream-sources/azure-event-hub-policy-key.png" :::
   
   - **Privacy level**: choose a privacy level for the cloud connection.

4. Select a **Data format** of the incoming real-time events that you want to get from your Azure event hub.

5. Select a **Consumer group** that is used for reading the event data from your Azure event hub and then **Create**. 

6. You see the new source node appears in the canvas after the event hub source is created successfully. You can select the event hub node in the canvas, then the **Data preview** tab in the bottom pane to view the data inside the event hub.

   :::image type="content" source="./media/bring-events-to-fabric-from-event-hub/event-hub-source-preview.png" alt-text="Screenshot showing the event hub source preview." lightbox="./media/bring-events-to-fabric-from-event-hub/event-hub-source-preview.png" :::

7. You can also select the eventstream node in the canvas, then the **Data preview** tab in the bottom pane to view the data inside the eventstream.

   :::image type="content" source="./media/bring-events-to-fabric-from-event-hub/eventstream-data-preview.png" alt-text="Screenshot showing the data preview in eventstream." lightbox="./media/bring-events-to-fabric-from-event-hub/eventstream-data-preview.png" :::

8. Similarly, you can check the **Data insights** for the event hub source node and the eventstream node.

## Add a Lakehouse destination to the Eventstream item

After your event hub events have been ingested into your eventstream, you can add the **Lakehouse** destination to receive the events from your eventstream. Follow these steps below to add the **Lakehouse** destination.

1. Select **New destination** on the ribbon or "**+**" in the main editor canvas and then select **Lakehouse**.  

2. Enter a name for the eventstream destination, fill in the information about your lakehouse.

   :::image type="content" source="./media/bring-events-to-fabric-from-event-hub/lakehouse-destination-adding.png" alt-text="Screenshot showing the lakehouse destination configuration." lightbox="./media/bring-events-to-fabric-from-event-hub/lakehouse-destination-adding.png" :::

   1. **Lakehouse**: Select an existing lakehouse item from the workspace you specified. The newly created lakehouse **citypwrdata** is selected.
   2. **Delta table**: Select an existing delta table or create a new one to receive data. Here a new delta table **citypwrtbl** is given.
   3. **Data format**: Select the data format for the data that is sent to your lakehouse.

3. Select **Create** if you don't want to process your events while ingesting them to your lakehouse.
## Define real-time events processing logic with event processor

If the event processing is needed, select **Open event processor** before selecting **Create**. The event processor editor is open.

   :::image type="content" source="./media/bring-events-to-fabric-from-event-hub/event-processor-editor.png" alt-text="Screenshot showing the event processor editor." lightbox="./media/bring-events-to-fabric-from-event-hub/event-processor-editor.png" :::

In this case, the sensor IDs data isn't necessary to store in lakehouse. We can use event processor to remove these columns. 

1. Select **Manage fields** operator from **Operations** menu in the ribbon to add the event processing logic. 

   :::image type="content" source="./media/bring-events-to-fabric-from-event-hub/manage-fields-operator.png" alt-text="Screenshot showing the manage field operator." lightbox="./media/bring-events-to-fabric-from-event-hub/manage-fields-operator.png" :::

2. Select the line between eventstream and lakehouse and hit the **delete** key to delete the connection between them in order to insert the Manage fields operator between them. 

   :::image type="content" source="./media/bring-events-to-fabric-from-event-hub/delete-connection.png" alt-text="Screenshot showing the operator connection deletion." lightbox="./media/bring-events-to-fabric-from-event-hub/delete-connection.png" :::

3. Select the green circle on the left edge of the eventstream node, **hold and move** your mouse to connect it to Manage fields operator node. Similarly connect Manage fields operator node to Lakehouse node.

   :::image type="content" source="./media/bring-events-to-fabric-from-event-hub/setup-connection.png" alt-text="Screenshot showing the operator connection setup." lightbox="./media/bring-events-to-fabric-from-event-hub/setup-connection.png" :::

4. Select the **Manage fields** operator node. In the **Manage fields** configuration panel, select **Add all fields**. Then hover your mouse to the sensor column, select **...** and **Remove** to remove the column. 

   :::image type="content" source="./media/bring-events-to-fabric-from-event-hub/configure-manage-fields.png" alt-text="Screenshot showing manage field operator configuration." lightbox="./media/bring-events-to-fabric-from-event-hub/configure-manage-fields.png" :::

5. After the Manage fields is configured, you can preview the data that will be produced with this operator by clicking **Refresh static preview**.

   :::image type="content" source="./media/bring-events-to-fabric-from-event-hub/operator-data-preview.png" alt-text="Screenshot showing data preview in operator." lightbox="./media/bring-events-to-fabric-from-event-hub/operator-data-preview.png" :::

6. Select **Done** to save the event processing logic and return to the Lakehouse destination configuration pane.

7. Select **Create** in Lakehouse destination configuration pane to get your Lakehouse destination created.

8. You see a Lakehouse destination node is added into canvas. It takes 1 or 3 minutes to get its status to **Ingesting**.

   :::image type="content" source="./media/bring-events-to-fabric-from-event-hub/lakehouse-destination-starting.png" alt-text="Screenshot showing the lakehouse destination status." lightbox="./media/bring-events-to-fabric-from-event-hub/lakehouse-destination-starting.png" :::

9. After the destination status becomes **Ingesting**, select **Data preview** tab in the bottom pane to check if the event data is correctly ingested into the lakehouse.

   :::image type="content" source="./media/bring-events-to-fabric-from-event-hub/lakehouse-destination-preview.png" alt-text="Screenshot showing the lakehouse destination preview." lightbox="./media/bring-events-to-fabric-from-event-hub/lakehouse-destination-preview.png" :::

## Verify the data in lakehouse

To verify the event data in lakehouse, open **citypwrdata** lakehouse from your workspace, then select table **citypwrtbl** to view its data.

:::image type="content" source="./media/bring-events-to-fabric-from-event-hub/lakehouse-data-preview.png" alt-text="Screenshot showing the lakehouse data preview." lightbox="./media/bring-events-to-fabric-from-event-hub/lakehouse-data-preview.png" :::


## Build near real-time Power BI report with the data in lakehouse

1. Go to your workspace, select **citypwrdata** dataset, which was created automatically together with the Lakehouse creation in the beginning.

2. Select **Auto-create** or **Start from scratch** to create your report.

   :::image type="content" source="./media/bring-events-to-fabric-from-event-hub/default-dataset-page.png" alt-text="Screenshot showing the default dataset page." lightbox="./media/bring-events-to-fabric-from-event-hub/default-dataset-page.png" :::

3. Adjust the report by selecting the temperature, humidity, WindSpeed, and three zones' power consumption in order to monitor these data.

   :::image type="content" source="./media/bring-events-to-fabric-from-event-hub/auto-generated-report.png" alt-text="Screenshot showing the auto generated report." lightbox="./media/bring-events-to-fabric-from-event-hub/auto-generated-report.png" :::

3. In order to get the data autorefreshed for near real-time monitoring, select **Edit** button in the autogenerated report. Then navigate to **Format page** under **Visualizations**, select **Page refresh** to set the refresh interval.

   > [!NOTE]
   > The minimal refresh interval is controlled by admin interval.

   :::image type="content" source="./media/bring-events-to-fabric-from-event-hub/enable-auto-refresh.png" alt-text="Screenshot showing how to enable auto refresh." lightbox="./media/bring-events-to-fabric-from-event-hub/enable-auto-refresh.png" :::

4. After the report adjustment is done, select **Save** button and give the report a name to save it.

   :::image type="content" source="./media/bring-events-to-fabric-from-event-hub/final-report.png" alt-text="Screenshot showing the final report." lightbox="./media/bring-events-to-fabric-from-event-hub/final-report.png" :::

## Next steps

In this tutorial, you learned how to transfer real-time events from your Azure event hub to a Microsoft Fabric lakehouse and use the lakehouse to build the near real-time report to monitor your business data. If you're interested in discovering more advanced features for working with event streams, you may find the following resources helpful.

- [Introduction to Microsoft Fabric event streams](./overview.md)
- [Create and manage an eventstream in Microsoft Fabric](./create-manage-an-eventstream.md)
- [Add and manage eventstream sources](./add-manage-eventstream-sources.md)
- [Add and manage eventstream destinations](./add-manage-eventstream-destinations.md)
- [Process event data with event processor editor](./process-events-using-event-processor-editor.md)