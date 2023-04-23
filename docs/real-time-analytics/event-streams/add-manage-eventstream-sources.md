---
title: Add and manage eventstream sources
description: This article describes how to add and manage an event source in an Eventstream item with Microsoft Fabric event streams feature.
ms.reviewer: spelluru
ms.author: xujiang1
author: xujxu
ms.topic: how-to
ms.date: 04/23/2023
ms.search.form: product-kusto
---

# Add and manage an event source in Eventstream item

Once you have created an eventstream, you can connect it to various data sources and destinations. The types of event sources that can be added to your eventstream include Azure Event Hubs, Sample data and Custom app. 

## Add an Azure event hub as a source

If you have an Azure event hub created with event data there, do the following steps to add an Azure event hub as your eventstream source:  

1. Select **New source** on the ribbon or "**+**" in the main editor canvas and then Azure Event Hubs.

2. Enter a source name for the new source and select a cloud connection to your Azure event hub.

:::image type="content" source="./media/event-streams-source/eventstream-sources-event-hub.png" alt-text="Screenshot showing the Azure Event Hubs source configuration." lightbox="./media/event-streams-source/eventstream-sources-event-hub.png" :::

3. If you don’t have a cloud connection, select **Create new connection** to create one. To create a new connection, fill in the information of your Azure Event Hubs on the **New connection** blade.

   :::image type="content" source="./media/add-manage-eventstream-sources/eventstream-eventhub-source-cloud-connection.png" alt-text="Screenshot showing the cloud connection in event hub source." lightbox="./media/add-manage-eventstream-sources/eventstream-eventhub-source-cloud-connection.png" :::

   - **Connection name**: Enter a name for the cloud connection. 
   - **Connection type**: Default value is **EventHub**. 
   - **Event Hub namespace**: Enter the name of your Azure event hub namespace. 
   - **Authentication username and password**: Go to your Azure event hub and create a policy under **Share access policies**. Then use policy name and primary key as the username and password. 
   
       :::image type="content" source="./media/add-manage-eventstream-sources/azure-event-hub-policy-key.png" alt-text="Screenshot showing the Azure event hub policy key." lightbox="./media/add-manage-eventstream-sources/azure-event-hub-policy-key.png" :::
   
   - **Privacy level**: choose a privacy level for the cloud connection.

4. After you create a cloud connection, hit the refresh button, and select the cloud connection you created.

   :::image type="content" source="./media/add-manage-eventstream-sources/cloud-connection-refresh.png" alt-text="Screenshot showing the cloud connection refresh." lightbox="./media/add-manage-eventstream-sources/cloud-connection-refresh.png" :::

5. Select a **Data format** of the incoming real-time events that you want to get from your Azure event hub.

6. Select a **Consumer group** that is used for reading the event data from your Azure event hub and then **Create**. 

After the event hub source is created, you see an event hub source added to your eventstream on the canvas.

:::image type="content" source="./media/add-manage-eventstream-sources/event-hub-source-completed.png" alt-text="Screenshot showing the event hub source." lightbox="./media/add-manage-eventstream-sources/event-hub-source-completed.png" :::

## Add a sample data as a source

To get a better understanding of how an eventstream works, you can use the out of box sample data provided and send data to the eventstream. Follow these steps to add a sample data source: 

1. Select **New source** on the ribbon or "**+**" in the main editor canvas and then Sample data. 

2. On the right pane, enter a source name to be displayed on the canvas, select the desired sample data to be added to your eventstream and then Create. 
   - Yellow Taxi: sample taxi data with a preset schema that includes fields such as pickup time, dropoff time, distance, total fee, and more. 
   - Stock Market: sample data of a stock exchange with a preset schema column such as time, symbol, price, volume and more
   :::image type="content" source="./media/event-streams-source/eventstream-sources-sample-data.png" alt-text="Screenshot showing the sample data source configuration." lightbox="./media/event-streams-source/eventstream-sources-sample-data.png" :::

3. When the sample data source is created successfully, you can find it on the canvas and navigation pane.

4. To verify if the sample data is added successfully, select Data preview in the bottom pane.

:::image type="content" source="./media/add-manage-eventstream-sources/sample-data-source-completed.png" alt-text="Screenshot showing the sample data source." lightbox="./media/add-manage-eventstream-sources/sample-data-source-completed.png" :::


## Add custom application as a source

If you want to connect your own application with an eventstream, you can add a custom app source and send data to the eventstream with your own application with the connection endpoint exposed in the custom app. Follow these steps to add a custom app source:  

1. Select **New source** on the ribbon or "**+**" in the main editor canvas and then Custom App. 

2. Enter a **Source name** for the custom app and select Create. 

:::image type="content" source="./media/event-streams-source/eventstream-sources-custom-app.png" alt-text="Screenshot showing the custom app source configuration." lightbox="./media/event-streams-source/eventstream-sources-custom-app.png" :::

3. Once the custom app is created successfully, you can view the information of the custom app such as connection string and use it in your application.

:::image type="content" source="./media/add-manage-eventstream-sources/custom-app-source-completed.png" alt-text="Screenshot showing the custom app source." lightbox="./media/add-manage-eventstream-sources/custom-app-source-completed.png" :::

## Manage source

- **Edit/delete**: You can select an eventstream source to edit or delete either through the navigation pane or canvas.

   :::image type="content" source="./media/add-manage-eventstream-sources/source-modification-deletion.png" alt-text="Screenshot showing the source modification and deletion." lightbox="./media/add-manage-eventstream-sources/source-modification-deletion.png" :::

After selecting **Edit**, the edit pane will be open in the right of the main editor. 

- **Regenerate key for a custom app**: If you want to regenerate a new connection key for your application, select one of your custom app sources on the canvas and select regenerate button to get a new connection key.

   :::image type="content" source="./media/add-manage-eventstream-sources/regenerate-key-in-custom-app.png" alt-text="Screenshot showing how to regenerate a key." lightbox="./media/add-manage-eventstream-sources/regenerate-key-in-custom-app.png" :::

## Next steps

- [Create and manage an Eventstream item](./create-manage-an-eventstream.md)
- [Add and manage an event destination in Eventstream item](./add-manage-eventstream-destinations.md)
- [Event streams source](./event-streams-source.md)