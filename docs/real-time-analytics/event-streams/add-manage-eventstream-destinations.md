---
title: Add and manage eventstream destinations
description: Learn how to add and manage an event destination in an Eventstream item with the Microsoft Fabric event streams feature.
ms.reviewer: spelluru
ms.author: xujiang1
author: xujxu
ms.topic: how-to
ms.custom: build-2023
ms.date: 05/23/2023
ms.search.form: product-kusto
---

# Add and manage a destination in an eventstream

Once you have created an eventstream in Microsoft Fabric, you can route data to different destinations. The types of destinations that you can add to your eventstream are KQL Database, Lakehouse, Custom App and Reflex. See the [Supported destinations](#supported-destinations) section for details.

[!INCLUDE [preview-note](../../includes/preview-note.md)]

## Prerequisites

Before you start, you must complete the following prerequisites:

- Get access to a **premium workspace** with **Contributor** or above permissions where your eventstream is located.
- For a KQL database destination, get access to a **premium workspace** with **Contributor** or above permissions where your KQL database is located.
- For a lakehouse destination, get access to a **premium workspace** with **Contributor** or above permissions where your lakehouse is located.
- For a Reflex destination, get access to a **premium workspace** with **Contributor** or above permissions where your Reflex is located.

## Supported destinations

The following destinations are supported by Fabric Eventstream:

| Destinations          | Description |
| --------------- | ---------- |
| Custom app | With this destination, you can easily route your real-time events to a custom application. It allows you to connect your own applications to the eventstream and consume the event data in real time. It's useful when you want to ingest data from external system into Microsoft Fabric.  |
| KQL database | This destination provides direct ingestion of your real-time event data into a KQL database, allowing for seamless querying of the data once it has successfully loaded. With the data in the KQL database, you can perform queries and analysis to gain deeper insights into your event data.  |
| Lakehouse | This destination provides you with the ability to transform your real-time events prior to ingestion into your lakehouse. Real-time events convert into Delta Lake format and then stored in the designated lakehouse tables. It helps with your data warehousing scenario. To learn more about how to use the event processor for real-time data processing, see [Process event data with event processor editor](./process-events-using-event-processor-editor.md).|
| Reflex |This destination allows you to directly connect your real-time event data to a Reflex, which holds all the information necessary to connect to data, monitor for conditions, and act. It is suitable for scenarios where you want to monitor your business process or area.|

> [!NOTE]
> The maximum number of sources and destinations for one eventstream is **11**.

## Add a KQL database as a destination

If you have a KQL database created in the workspace, follow these steps to add the KQL database as eventstream destination:

1. Select **New destination** on the ribbon or "**+**" in the main editor canvas and then select **KQL Database**. The **KQL Database** destination configuration screen appears.

1. Enter a destination name, select a workspace, choose a KQL database from the selected workspace, and then select **Add and configure**.

   > [!NOTE]
   > You can only select workspaces that have the same region Fabric capacity as the eventstream.

   :::image type="content" source="./media/event-streams-destination/eventstream-destinations-kql-database.png" alt-text="Screenshot of the KQL Database destination configuration screen.":::

1. On the **Ingest data** page, navigate through the tabs to complete the configuration:
   1. **Destination**: Use an existing table of your KQL database or create a new one to route and ingest the data. Complete the required fields and select **Next: Source**.

       :::image type="content" source="./media/add-manage-eventstream-destinations/eventstream-destination-kql-wizard-1.png" alt-text="Screenshot showing the Destination tab of the Ingest data screen for creating a KQL database destination." lightbox="./media/add-manage-eventstream-destinations/eventstream-destination-kql-wizard-1.png" :::

   1. **Source**: Verify the real-time data source for creating a data connection to ingest data from your eventstream. Complete the required fields and select **Next: Schema**.

       :::image type="content" source="./media/add-manage-eventstream-destinations/eventstream-destination-kql-wizard-2.png" alt-text="Screenshot showing the Source tab of the Ingest data screen for creating a KQL database destination." lightbox="./media/add-manage-eventstream-destinations/eventstream-destination-kql-wizard-2.png" :::

   1. **Schema**: Select a compression type and data format, and preview how the data is sent to your KQL database. You can also change the column name, data type, or update column by clicking the arrow in the table header. Complete the required fields and select **Next: Summary**.

       > [!NOTE]
       > The KQL database does not support the Avro data format.

       :::image type="content" source="./media/add-manage-eventstream-destinations/eventstream-destination-kql-wizard-3.png" alt-text="Screenshot showing the Schema tab of the Ingest data screen for creating a KQL database destination." lightbox="./media/add-manage-eventstream-destinations/eventstream-destination-kql-wizard-3.png" :::

   1. **Summary**: Review the status of your data ingestion, including the table created with the schema you defined, and connection between the eventstream and the KQL database.

       :::image type="content" source="./media/add-manage-eventstream-destinations/eventstream-destination-kql-wizard-4.png" alt-text="Screenshot showing the Summary tab of the Ingest data screen for creating a KQL database destination." lightbox="./media/add-manage-eventstream-destinations/eventstream-destination-kql-wizard-4.png" :::

1. After you configure everything and select **Done**, a KQL database destination appears on the canvas, connected to your eventstream.

   :::image type="content" source="./media/add-manage-eventstream-destinations/eventstream-destination-kql-database.png" alt-text="Screenshot showing the new KQL database destination." lightbox="./media/add-manage-eventstream-destinations/eventstream-destination-kql-database.png" :::

## Add a lakehouse as a destination

If you have a lakehouse created in your workspace, follow these steps to add the lakehouse to your eventstream as a destination:

1. Select **New destination** on the ribbon or "**+**" in the main editor canvas and then select **Lakehouse**. The **Lakehouse** destination configuration screen appears.

1. Enter a name for the eventstream destination and complete the information about your lakehouse.

   :::image type="content" source="./media/event-streams-destination/eventstream-destinations-lakehouse.png" alt-text="Screenshot of the Lakehouse destination configuration screen.":::

   1. **Lakehouse**: Select an existing lakehouse from the workspace you specified.
   1. **Delta table**: Select an existing delta table or create a new one to receive data.

      > [!NOTE]
      > When writing data into the lakehouse table, there is **Schema enforcement**. This means all new writes to a table must be compatible with the target table's schema at write time, ensuring data quality.
      >
      > All records of the output data are projected onto the schema of the existing table. When writing the output to a new delta table, the table schema is created based on the first record. If the incoming data has an additional column compared to the existing table schema, it writes to the table without including the extra column. Conversely, if the incoming data is missing a column compared to the existing table schema, it writes to the table with the column's value set to null.

   1. **Input data format**: Select the format for the data (input data) that is sent to your lakehouse.

      > [!NOTE]
      > The supported input event data formats are JSON, Avro, and CSV (with header).

   1. **Event processing**: You can use the event processing editor to specify how the data should be processed before it's sent to your lakehouse. Select **Open event processor** to open the event processing editor. To learn more about real-time processing using the event processor, see [Process event data with event processor editor](./process-events-using-event-processor-editor.md). When you're done with the editor, select **Done** to return to the **Lakehouse** destination configuration screen.

      :::image type="content" source="./media/add-manage-eventstream-destinations/eventstream-destination-lakehouse-event-processor-editor.png" alt-text="Screenshot showing the event processor editor." lightbox="./media/add-manage-eventstream-destinations/eventstream-destination-lakehouse-event-processor-editor.png" :::

1. Select **Add** to add the lakehouse destination.

1. A lakehouse destination appears on the canvas, with a spinning status indicator. The system takes a few minutes to change the status to **Ingesting**.

   :::image type="content" source="./media/add-manage-eventstream-destinations/eventstream-destination-lakehouse.png" alt-text="Screenshot showing the lakehouse destination." lightbox="./media/add-manage-eventstream-destinations/eventstream-destination-lakehouse.png" :::

## Add a custom application as a destination

If you want to route event data to your application, you can add a custom app as your eventstream destination. Follow these steps to add a custom app destination:

1. Select **New destination** on the ribbon or "**+**" in the main editor canvas and then select **Custom App**. The **Custom App** destination configuration screen appears.

1. Enter a destination name for the custom app and select **Add**.

   :::image type="content" source="./media/add-manage-eventstream-destinations/eventstream-destination-custom-app-configuration.png" alt-text="Screenshot of the Custom App destination configuration screen.":::

After you have successfully created the custom application destination, you can view details like **connection string** on the **Information** tab in the lower pane.

The connection string is an **event hub compatible connection string** and you can use it in your application to receive events from your eventstream. The following example shows what the connection string looks like:

`Endpoint=sb://eventstream-xxxxxxxx.servicebus.windows.net/;SharedAccessKeyName=key_xxxxxxxx;SharedAccessKey=xxxxxxxx;EntityPath=es_xxxxxxxx`

   :::image type="content" source="./media/add-manage-eventstream-destinations/eventstream-destination-custom-app.png" alt-text="Screenshot showing the custom app destination." lightbox="./media/add-manage-eventstream-destinations/eventstream-destination-custom-app.png":::

## Add a Reflex as a destination

To add a Reflex from the workspace as an eventstream destination, do the following steps:

1. Select **New destination** on the ribbon or "**+**" in the main editor canvas and then select **Reflex**. The **Reflex** destination configuration screen appears.

1. Enter a name for the eventstream destination and complete the information about your Relex.

   :::image type="content" source="./media/add-manage-eventstream-destinations/eventstream-destination-Relex-configuration.png" alt-text="Screenshot showing the Reflex configuration." lightbox="./media/add-manage-eventstream-destinations/eventstream-destination-Relex-configuration.png" :::

   **Reflex**: Select an existing Reflex or create a new one to receive data.

1. After setting up everything and selecting Add, you will see a Reflex destination on the canvas that connects to your eventstream.

   :::image type="content" source="./media/add-manage-eventstream-destinations/eventstream-destination-Reflex.png" alt-text="Screenshot showing the new Reflex destination." lightbox="./media/add-manage-eventstream-destinations/eeventstream-destination-Reflex.png" :::

## Manage a destination

**Edit/remove**: You can edit or remove an eventstream destination either through the navigation pane or canvas.

When you select **Edit**, the edit pane opens in the right side of the main editor. You can modify the configuration as you wish, including the event transformation logic through the event processor editor.

   :::image type="content" source="./media/add-manage-eventstream-destinations/eventstream-destination-edit-deletion.png" alt-text="Screenshot showing where to select the modify and delete options for destinations on the canvas." lightbox="./media/add-manage-eventstream-destinations/eventstream-destination-edit-deletion.png" :::

## Next steps

- [Create and manage an eventstream](./create-manage-an-eventstream.md)
- [Add and manage a source in an eventstream](./add-manage-eventstream-sources.md)
- [Process event data with event processor editor](./process-events-using-event-processor-editor.md)
