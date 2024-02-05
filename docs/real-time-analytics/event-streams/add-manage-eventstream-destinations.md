---
title: Add and manage eventstream destinations
description: Learn how to add and manage an event destination in an Eventstream item with the Microsoft Fabric event streams feature.
ms.reviewer: spelluru
ms.author: xujiang1
author: xujxu
ms.topic: how-to
ms.custom:
  - build-2023
  - ignite-2023
ms.date: 11/15/2023
ms.search.form: Source and Destination
---

# Add and manage a destination in an eventstream

Once you have created an eventstream in Microsoft Fabric, you can route data to different destinations. The types of destinations that you can add to your eventstream are KQL Database, Lakehouse, Custom App and Reflex. See the [Supported destinations](#supported-destinations) section for details.

## Prerequisites

Before you start, you must complete the following prerequisites:

- Get access to a **premium workspace** with **Contributor** or above permissions where your eventstream is located.
- For a destination of type KQL database, lakehouse, or Reflex, get access to a **premium workspace** with **Contributor** or above permissions where your destination is located.

## Supported destinations

The following destinations are supported by Fabric Eventstream:

| Destinations          | Description |
| --------------- | ---------- |
| Custom app | With this destination, you can easily route your real-time events to a custom application. It allows you to connect your own applications to the eventstream and consume the event data in real time. It's useful when you want to egress real-time data to an external system living outside Microsoft Fabric.  |
| KQL database | This destination enables you to ingest your real-time event data into a KQL database, where you can use the powerful Kusto Query Language (KQL) to query and analyze the data. With the data in the Kusto database, you can gain deeper insights into your event data and create rich reports and dashboards. You can choose between two ingestion modes: **Direct ingestion** and **Event processing before ingestion**.|
| Lakehouse | This destination provides you with the ability to transform your real-time events prior to ingestion into your lakehouse. Real-time events convert into Delta Lake format and then stored in the designated lakehouse tables. It helps with your data warehousing scenario. To learn more about how to use the event processor for real-time data processing, see [Process event data with event processor editor](./process-events-using-event-processor-editor.md).|
| Reflex |This destination allows you to directly connect your real-time event data to a Reflex. Reflex is a type of intelligent agent that contains all the information necessary to connect to data, monitor for conditions, and act. When the data reaches certain thresholds or matches other patterns, Reflex automatically takes appropriate action such as alerting users or kicking off Power Automate workflows.|

> [!NOTE]
> The maximum number of sources and destinations for one eventstream is **11**.

## Add a KQL database as a destination

To add a KQL database as a destination, you need to have a KQL database created in the workspace, and choose between two ingestion modes: **Direct ingestion** and **Event processing before ingestion**.

1. **Direct ingestion**
   This mode ingests your event data directly into the KQL database without any processing. You can use this mode if you want to ingest your event data as-is and perform any processing or transformation later in KQL database using KQL queries.
   1. Select **New destination** on the ribbon or "**+**" in the main editor canvas and then select **KQL Database**. The **KQL Database** destination configuration screen appears.

   2. Select **Direct ingestion**, enter a destination name, select a workspace, choose a KQL database from the selected workspace, and then select **Add and configure**.

      > [!NOTE]
      > You can only select workspaces that have the same region Fabric capacity as the eventstream.

      :::image type="content" source="./media/event-streams-destination/eventstream-destinations-kql-database.png" alt-text="Screenshot of the KQL Database pull mode destination configuration screen." lightbox="./media/event-streams-destination/eventstream-destinations-kql-database.png" :::

   3. On the **Get data** page, navigate through the tabs to complete the configuration:
      1. **Configure**: Use an existing table of your KQL database or create a new one to route and ingest the data. Complete the required fields and select **Next**.

         :::image type="content" source="./media/add-manage-eventstream-destinations/eventstream-destination-kql-wizard-1.png" alt-text="Screenshot showing the Destination tab of the Ingest data screen for creating a KQL database destination." lightbox="./media/add-manage-eventstream-destinations/eventstream-destination-kql-wizard-1.png" :::

      2. **Inspect**: Select a data format, and preview how the data is sent to your KQL database.

         :::image type="content" source="./media/add-manage-eventstream-destinations/eventstream-destination-kql-wizard-2.png" alt-text="Screenshot showing the data format of the Ingest data screen for creating a KQL database destination." lightbox="./media/add-manage-eventstream-destinations/eventstream-destination-kql-wizard-2.png" :::

         You can also change the column name, data type, or update column by clicking the arrow in the table header. Complete the required fields and select **Finish**.

         :::image type="content" source="./media/add-manage-eventstream-destinations/eventstream-destination-kql-wizard-3.png" alt-text="Screenshot showing how to change the column of the Ingest data screen for creating a KQL database destination." lightbox="./media/add-manage-eventstream-destinations/eventstream-destination-kql-wizard-3.png":::

         :::image type="content" source="./media/add-manage-eventstream-destinations/eventstream-destination-kql-wizard-4.png" alt-text="Screenshot showing the change the column name, data type of the Ingest data screen for creating a KQL database destination." lightbox="./media/add-manage-eventstream-destinations/eventstream-destination-kql-wizard-4.png" :::

      3. **Summary**: Review the status of your data ingestion, including the table created with the schema you defined, and connection between the eventstream and the KQL database.

          :::image type="content" source="./media/add-manage-eventstream-destinations/eventstream-destination-kql-wizard-5.png" alt-text="Screenshot showing the Summary tab of the Ingest data screen for creating a KQL database destination." lightbox="./media/add-manage-eventstream-destinations/eventstream-destination-kql-wizard-5.png" :::

   4. After you configure everything and select **Close**, a KQL database destination appears on the canvas, connected to your eventstream.

      :::image type="content" source="./media/add-manage-eventstream-destinations/eventstream-destination-kql-database.png" alt-text="Screenshot showing the new KQL database pull mode destination." lightbox="./media/add-manage-eventstream-destinations/eventstream-destination-kql-database.png" :::

2. **Event processing before ingestion**
   This mode processes your event data before ingesting it into the KQL database. You can use this mode if you want to apply some processing or transformation to your event data before ingesting it, such as filtering, aggregating, or expanding. You can design the processing logic using event processor.
   1. Select **Event processing before ingestion**, complete the information about your KQL Database, and then select **Open event processor**.

      :::image type="content" source="./media/event-streams-destination/eventstream-destinations-kql-database-push-mode.png" alt-text="Screenshot of the KQL Database push mode destination configuration screen." lightbox="./media/event-streams-destination/eventstream-destinations-kql-database-push-mode.png":::

   2. Design the event processing with event processor,and then select **Save**

      :::image type="content" source="./media/process-events-using-event-processor-editor/event-processor-editor-preview.png" alt-text="Screenshot of the push mode event processor screen." lightbox="./media/process-events-using-event-processor-editor/event-processor-editor-preview.png":::

   3. When you choose an existing Kusto table, schema validation between the current schema in this eventstream and the target KQL table will be performed. If the two schemas aren't matched, an error message is shown and reminds you to open event processor to adjust the schema in this eventstream accordingly.

      :::image type="content" source="./media/process-events-using-event-processor-editor/event-processor-error.png" alt-text="Screenshot of the push mode event processor error screen." lightbox="./media/process-events-using-event-processor-editor/event-processor-error.png":::

      When open the event processor, the detailed mismatch information will be shown in Authoring error tab.

      :::image type="content" source="./media/process-events-using-event-processor-editor/event-processor-mismatch-information.png" alt-text="Screenshot of the push mode event processor mismatch information screen." lightbox="./media/process-events-using-event-processor-editor/event-processor-mismatch-information.png":::

   4. After you configure everything and select **Save**, a KQL database destination appears on the canvas, connected to your eventstream, and you can check the metrics in the **Data insights** and logs in **Runtime logs**.

      :::image type="content" source="./media/add-manage-eventstream-destinations/eventstream-destination-kql-database-push-mode.png" alt-text="Screenshot showing the new KQL database push mode destination." lightbox="./media/add-manage-eventstream-destinations/eventstream-destination-kql-database-push-mode.png" :::

## Add a lakehouse as a destination

If you have a lakehouse created in your workspace, follow these steps to add the lakehouse to your eventstream as a destination:

1. Select **New destination** on the ribbon or "**+**" in the main editor canvas and then select **Lakehouse**. The **Lakehouse** destination configuration screen appears.

1. Enter a name for the eventstream destination and complete the information about your lakehouse.

   :::image type="content" source="./media/event-streams-destination/eventstream-destinations-lakehouse.png" alt-text="Screenshot of the Lakehouse destination configuration screen."lightbox="./media/event-streams-destination/eventstream-destinations-lakehouse.png":::

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
1. Two ingestion modes are available for a lakehouse destination. Select one of these modes to optimize how the Fabric event streams feature writes to the lakehouse based on your scenario.
    1. **Rows per file** – The minimum number of rows that Lakehouse ingests in a single file. The smaller the minimum number of rows, the more files Lakehouse will create during ingestion. Minimum is 1 row. Maximum is 2M rows per file.
    1. **Duration** – The maximum duration that Lakehouse would take to ingest a single file. The longer the duration, more rows will be ingested in a file. Minimum is 1 minute and maximum is 2 hours.  
      
        :::image type="content" source="./media/add-manage-eventstream-destinations/ingestion-modes.png" alt-text="Screenshot showing the ingestion modes." lightbox="./media/add-manage-eventstream-destinations/ingestion-modes.png" :::
1. Select **Add** to add the lakehouse destination.
1. Table optimization shortcut available inside the lakehouse destination. This solution facilitates you by launching a Spark job within a Notebook, which consolidates these small streaming files within the target Lakehouse table.

    :::image type="content" source="./media/add-manage-eventstream-destinations/table-optimization.png" alt-text="Screenshot showing the table optimization settings." lightbox="./media/add-manage-eventstream-destinations/table-optimization.png" :::
1. A lakehouse destination appears on the canvas, with a spinning status indicator. The system takes a few minutes to change the status to **Ingesting**.

   :::image type="content" source="./media/add-manage-eventstream-destinations/eventstream-destination-lakehouse.png" alt-text="Screenshot showing the lakehouse destination." lightbox="./media/add-manage-eventstream-destinations/eventstream-destination-lakehouse.png" :::

## Add a custom application as a destination

If you want to route event data to your application, you can add a custom app as your eventstream destination. Follow these steps to add a custom app destination:

1. Select **New destination** on the ribbon or "**+**" in the main editor canvas and then select **Custom App**. The **Custom App** destination configuration screen appears.

1. Enter a destination name for the custom app and select **Add**.

   :::image type="content" source="./media/add-manage-eventstream-destinations/eventstream-destination-custom-app-configuration.png" alt-text="Screenshot of the Custom App destination configuration screen." lightbox="./media/add-manage-eventstream-destinations/eventstream-destination-custom-app-configuration.png":::

1. After you have successfully created the custom application destination, you can switch and view the following information in the **Details** tab in the lower pane:

   :::image type="content" source="./media/add-manage-eventstream-destinations/eventstream-destination-custom-app.png" alt-text="Screenshot showing the custom app destination." lightbox="./media/add-manage-eventstream-destinations/eventstream-destination-custom-app.png":::

   - **Basic**: Shows the name, description, type and status of your custom app.
   - **Keys**: Shows the connection string for your custom app, which you can copy and paste into your application.
   - **Sample code**: Shows sample code, which you can refer to or copy to push the event data to this eventstream or pull the event data from this eventstream.

   For each tab (**Basic** / **Keys** / **Sample code**), you can also switch three protocol tabs: **Eventhub**, **AMQP, and **Kafka** to access diverse protocol formats information:

   The connection string is an event hub compatible connection string, and you can use it in your application to receive events from your eventstream. The connection string has multiple protocol formats, which you can switch and select in the Keys tab. The following example shows what the connection string looks like in event hub format:

   *`Endpoint=sb://eventstream-xxxxxxxx.servicebus.windows.net/;SharedAccessKeyName=key_xxxxxxxx;SharedAccessKey=xxxxxxxx;EntityPath=es_xxxxxxxx`*

      The **EventHub** format is the default format for the connection string, and it's compatible with the Azure Event Hubs SDK. You can use this format to connect to eventstream using the Event Hubs protocol.

      :::image type="content" source="./media/add-manage-eventstream-destinations/eventstream-destination-custom-app-detail.png" alt-text="Screenshot showing the custom app details." lightbox="./media/add-manage-eventstream-destinations/eventstream-destination-custom-app-detail.png":::

      The other two protocol formats are **AMQP** and **Kafka**, which you can select by clicking on the corresponding tabs in the Keys tab.

      The **AMQP** format is compatible with the AMQP 1.0 protocol, which is a standard messaging protocol that supports interoperability between different platforms and languages. You can use this format to connect to eventstream using the AMQP protocol.

      The **Kafka** format is compatible with the Apache Kafka protocol, which is a popular distributed streaming platform that supports high-throughput and low-latency data processing. You can use this format to connect to eventstream using the Kafka protocol.

You can choose the protocol format that suits your application needs and preferences, and copy and paste the connection string into your application. You can also refer to or copy the sample code that we provide in the Sample code tab, which shows how to send or receive events using different protocols.

## Add a Reflex as a destination

To add a Reflex from your workspace as an eventstream's destination, do the following steps:

1. Select **New destination** on the ribbon or "**+**" in the main editor canvas and then select **Reflex**. The **Reflex** destination configuration screen appears.

1. Enter a name for the eventstream destination and complete the information about your Reflex.

   **Reflex**: Select an existing Reflex or create a new one to receive data.

   :::image type="content" source="./media/add-manage-eventstream-destinations/eventstream-destination-reflexconfiguration.png" alt-text="Screenshot showing the reflex configuration." lightbox="./media/add-manage-eventstream-destinations/eventstream-destination-reflexconfiguration.png" :::

1. After you select on the Add button, you can see a Reflex destination on the canvas that is linked to your eventstream.

   :::image type="content" source="./media/add-manage-eventstream-destinations/eventstream-destination-add-reflex.png" alt-text="Screenshot showing the new reflex destination." lightbox="./media/add-manage-eventstream-destinations/eventstream-destination-add-reflex.png" :::

## Manage a destination

**Edit/remove**: You can edit or remove an eventstream destination either through the navigation pane or canvas.

When you select **Edit**, the edit pane opens in the right side of the main editor. You can modify the configuration as you wish, including the event transformation logic through the event processor editor.

:::image type="content" source="./media/add-manage-eventstream-destinations/eventstream-destination-edit-deletion.png" alt-text="Screenshot showing where to select the modify and delete options for destinations on the canvas." lightbox="./media/add-manage-eventstream-destinations/eventstream-destination-edit-deletion.png" :::

## Related content

- [Create and manage an eventstream](./create-manage-an-eventstream.md)
- [Add and manage a source in an eventstream](./add-manage-eventstream-sources.md)
- [Process event data with event processor editor](./process-events-using-event-processor-editor.md)
