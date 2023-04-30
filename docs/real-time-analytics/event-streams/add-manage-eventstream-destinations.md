---
title: Add and manage eventstream destinations
description: This article describes how to add and manage an event destination in an Eventstream item with Microsoft Fabric event streams feature.
ms.reviewer: spelluru
ms.author: xujiang1
author: xujxu
ms.topic: how-to
ms.date: 05/23/2023
ms.search.form: product-kusto
---

# Add and manage an event destination in Eventstream item

[!INCLUDE [preview-note](../../includes/preview-note.md)]

Once you have created an eventstream, you can route data to different destinations. The types of data destinations that can be added to your eventstream include KQL Database, Lakehouse and Custom App.

## Prerequisites

To get started, complete the following prerequisites:
- Get access to a **premium workspace** with **Contributor** or above permissions where your Eventstream item is located in.
- For KQL database destination, get access to a **premium workspace** with **Contributor** or above permissions where your KQL database is located in.
- For Lakehouse destination, get access to a **premium workspace** with **Contributor**  or above permissions where your lakehouse is located in.

## Add a KQL database as a destination

If you have a KQL database created in the workspace, do the following steps to add a KQL database as eventstream destination:

1. Select **New destination** on the ribbon or "**+**" in the main editor canvas and then **KQL Database**.  

2. Enter a destination name, select a KQL database from your workspace and then **Create and configure**.

   :::image type="content" source="./media/event-streams-destination/eventstream-destinations-kql-database.png" alt-text="Screenshot showing the kql database destination type." lightbox="./media/event-streams-destination/eventstream-destinations-kql-database.png" :::

3. On the Ingest data window, follow the steps to complete the configuration:
   1. **Destination**: use an existing table of your KQL database or create a new one to route and ingest the data.
   
       :::image type="content" source="./media/add-manage-eventstream-destinations/eventstream-destination-kql-wizard-1.png" alt-text="Screenshot showing the ingestion wizard step#1 in kql database destination type." lightbox="./media/add-manage-eventstream-destinations/eventstream-destination-kql-wizard-1.png" :::

   2. **Source**: it helps you to verify the real-time data source for creating a data connection to ingest data from your eventstream.

       :::image type="content" source="./media/add-manage-eventstream-destinations/eventstream-destination-kql-wizard-2.png" alt-text="Screenshot showing the ingestion wizard step#2 in kql database destination type." lightbox="./media/add-manage-eventstream-destinations/eventstream-destination-kql-wizard-2.png" :::

   3. **Schema**: select a compression type and data format and preview how the data is sent to your KQL database. You can also change the column name, data type, or update column by clicking arrow in the table header.

       :::image type="content" source="./media/add-manage-eventstream-destinations/eventstream-destination-kql-wizard-3.png" alt-text="Screenshot showing the ingestion wizard step#3 in kql database destination type." lightbox="./media/add-manage-eventstream-destinations/eventstream-destination-kql-wizard-3.png" :::

   4. **Summary**: shows the status of the table creating with the schema and connection establishing of your eventstream and KQL database.

       :::image type="content" source="./media/add-manage-eventstream-destinations/eventstream-destination-kql-wizard-4.png" alt-text="Screenshot showing the ingestion wizard step#4 in kql database destination type." lightbox="./media/add-manage-eventstream-destinations/eventstream-destination-kql-wizard-4.png" :::

After everything is configured and you've selected **Done**, you see a KQL database destination added to your eventstream on the canvas.

:::image type="content" source="./media/add-manage-eventstream-destinations/eventstream-destination-kql-database.png" alt-text="Screenshot showing the kql database destination." lightbox="./media/add-manage-eventstream-destinations/eventstream-destination-kql-database.png" :::

## Add a lakehouse as a destination 

If you have a lakehouse created in your workspace, follow these steps to add this lakehouse to your eventstream as a destination:  

1. Select **New destination** on the ribbon or "**+**" in the main editor canvas and then select **Lakehouse**.  

2. Enter a name for the eventstream destination, fill in the information about your lakehouse.

   :::image type="content" source="./media/event-streams-destination/eventstream-destinations-lakehouse.png" alt-text="Screenshot showing the lakehouse destination type." lightbox="./media/event-streams-destination/eventstream-destinations-lakehouse.png" :::
 
   1. **Lakehouse**: Select an existing lakehouse item from the workspace you specified.
   2. **Delta table**: Select an existing delta table or create a new one to receive data.
   3. **Data format**: Select the data format for the data that is sent to your lakehouse.
   4. **Event processing**: You can use our event processor to specify how the data should be processed before it's sent to your lakehouse. Select **Open event processor** to open the event processing editor. To learn more about real-time processing using the event processor, see [Use event processor editor to define the data transformation logic](./process-events-using-event-processor-editor.md).
   
      :::image type="content" source="./media/add-manage-eventstream-destinations/eventstream-destination-lakehouse-event-processor-editor.png" alt-text="Screenshot showing the event processor editor." lightbox="./media/add-manage-eventstream-destinations/eventstream-destination-lakehouse-event-processor-editor.png" :::

3. Select **Create** to add the lakehouse destination.

You see a lakehouse destination is added to your eventstream on the canvas. It will be in ingestion mode after one or two minutes.

:::image type="content" source="./media/add-manage-eventstream-destinations/eventstream-destination-lakehouse.png" alt-text="Screenshot showing the lakehouse destination." lightbox="./media/add-manage-eventstream-destinations/eventstream-destination-lakehouse.png" :::

## Add custom application as a destination

If you want to route the event data to your application, you can add a custom app as your eventstream destination. Follow these steps to create a custom app destination:  

1. Select **New destination** on the ribbon or "**+**" in the main editor canvas and then select **Custom App**.

2. Enter a destination name for the custom app and select **Create**. 

   :::image type="content" source="./media/add-manage-eventstream-destinations/eventstream-destination-custom-app-configuration.png" alt-text="Screenshot showing the custom app configuration." lightbox="./media/add-manage-eventstream-destinations/eventstream-destination-custom-app-configuration.png" :::

Once the custom app is created successfully, you can view the information such as **connection string** on the bottom pane and use it in your application.

:::image type="content" source="./media/add-manage-eventstream-destinations/eventstream-destination-custom-app.png" alt-text="Screenshot showing the custom app destination." lightbox="./media/add-manage-eventstream-destinations/eventstream-destination-custom-app.png" :::


## Manage destination 

**Edit/remove**: You can edit or remove an eventstream destination either through the navigation pane or canvas.

After selecting **Edit**, the edit pane will be open in the right of the main editor. You can modify the configuration as you wish, including the event transformation logic through the event processor editor.

:::image type="content" source="./media/add-manage-eventstream-destinations/eventstream-destination-edit-deletion.png" alt-text="Screenshot showing destination modification and deletion." lightbox="./media/add-manage-eventstream-destinations/eventstream-destination-edit-deletion.png" :::


## Supported destinations
With the eventstream destinations, you can route their real-time events to a custom app, KQL database, or lakehouse in Microsoft Fabric without writing a single line of code. 

:::image type="content" source="./media/event-streams-destination/eventstream-destinations.png" alt-text="Screenshot showing the overview of the event streams destination types." lightbox="./media/event-streams-destination/eventstream-destinations.png" :::

The following destinations are currently available.

## Custom application

With this destination, you can easily route your real-time events to a custom application. With this option, a consumer group is created, allowing custom applications to connect to your eventstream and consume the event data in real-time. It's useful for applications outside of Microsoft Fabric that need to consume the event data to respond to events as they occur. 

- **Destination name** – Meaningful destination name that appears in your eventstream.

:::image type="content" source="./media/event-streams-destination/eventstream-destinations-custom-app.png" alt-text="Screenshot showing the custom app destination type." lightbox="./media/event-streams-destination/eventstream-destinations-custom-app.png" :::

## KQL Database 

This destination provides a direct ingestion of your real-time event data into a KQL database, allowing for seamless querying of the data once it has been successfully loaded. With the data in the KQL database, you can then perform more queries and analysis to gain deeper insights into your event data. 

- **Destination name** – Meaningful destination name that appears in your eventstream. 
- **Workspace** – The workspace name where your KQL Database is located. 
- **KQL Database** – The KQL Database where you want to route the event data.

:::image type="content" source="./media/event-streams-destination/eventstream-destinations-kql-database.png" alt-text="Screenshot showing the kql database destination type." lightbox="./media/event-streams-destination/eventstream-destinations-kql-database.png" :::

**Ingest data wizard** will be popping up after clicking **Create and configure**:

:::image type="content" source="./media/event-streams-destination/eventstream-destinations-kql-database-ingestion-wizard.png" alt-text="Screenshot showing the ingestion wizard in kql database destination type." lightbox="./media/event-streams-destination/eventstream-destinations-kql-database-ingestion-wizard.png" :::

- **Destination** – With the step, you can either create a new table or choose an existing one from your KQL database to route and ingest your real-time data. 
- **Source** – It helps you to verify the source of your real-time data for creating a data connection to ingest the data. 
- **Schema** - It enables you to confirm or change the data format and verify the schema of incoming real-time data. By performing this step, you can ensure that the data is properly formatted and adheres to the expected schema, which helps prevent data loss or inaccuracies during ingestion.
- **Summary** – It shows the status of the table creating with the schema and connection establishing of your eventstream and KQL database. 

Upon completion of the wizard, real-time event data begin ingesting into the selected KQL table.

## Lakehouse

This destination provides you with the ability to transform your real-time events prior to ingestion into your lakehouse. Real-time events are converted into Delta Lake format and then stored in the designated lakehouse tables. It helps with your data warehousing scenario. 

- **Name** - Meaningful destination name that appears in your eventstream. 
- **Workspace** - The workspace name where your lakehouse is located. 
- **Lakehouse** – The lakehouse where transformed data needs to be routed for data analysis/warehousing. 
- **Delta table** – Destination table within the lakehouse. 
- **Data format** – The format of real-time events that is sent to your lakehouse. 
- **Open event processor** – It's where event transformation is defined. 

:::image type="content" source="./media/event-streams-destination/eventstream-destinations-lakehouse.png" alt-text="Screenshot showing the lakehouse destination type." lightbox="./media/event-streams-destination/eventstream-destinations-lakehouse.png" :::

The **Event processor editor** will be popping up after clicking **Open event processor**:

:::image type="content" source="./media/event-streams-destination/eventstream-destinations-lakehouse-event-processor-overview.png" alt-text="Screenshot showing the event processor in lakehouse destination type." lightbox="./media/event-streams-destination/eventstream-destinations-lakehouse-event-processor-overview.png" :::

- **Schema columns** – It shows all the columns in the event data in the selected node in the right panel. You can modify any column by removing/renaming or changing its data type when the eventstream node is selected.
- **Operations** - To add a transformation operation to your real-time event data, select the transformation under Operations. The respective transformation is created on the event data. For example, in the example, ‘Filter’ is applied.  

  :::image type="content" source="./media/event-streams-destination/eventstream-destinations-lakehouse-event-processor-operator.png" alt-text="Screenshot showing the event processor operator in lakehouse destination type." lightbox="./media/event-streams-destination/eventstream-destinations-lakehouse-event-processor-operator.png" :::

- **Data preview** – It shows a live preview of data coming in the selected node in the bottom pane. You can pause/resume the preview. You can also see the details of a specific record, a cell in the table, by selecting it and then selecting Show/Hide details.  


To learn more about the event processor editor, see [Event processor editor](./event-processor-editor.md).

To learn more about how to use the event processor editor define your data transformation logic, see [Process event data with event processor editor](./process-events-using-event-processor-editor.md).

Upon completion of the event processor wizard, real-time event data begin ingesting into the selected Delta table.

## Next steps

- [Create and manage an Eventstream item](./create-manage-an-eventstream.md)
- [Add and manage an event source in Eventstream item](./add-manage-eventstream-sources.md)
- [Use event processor editor to define the data transformation logic](./process-events-using-event-processor-editor.md)