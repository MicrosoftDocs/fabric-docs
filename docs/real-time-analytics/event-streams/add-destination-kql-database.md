---
title: Add KQL Database to an eventstream
description: Learn how to add a KQL Database destination to Eventstream item with the Microsoft Fabric event streams feature.
ms.reviewer: spelluru
ms.author: xujiang1
author: xujxu
ms.topic: how-to
ms.date: 04/03/2024
ms.search.form: Source and Destination
---

# Add KQL Database destination to an eventstream
This article shows you how to add a KQL database as a destination to a Microsoft Fabric eventstream. 

## Prerequisites

Before you start, you must complete the following prerequisites:

- Get access to a **premium workspace** with **Contributor** or above permissions where your eventstream is located.
- Access to a **premium workspace** with **Contributor** or above permissions where your KQL database is located.

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

   2. Design the event processing with event processor, and then select **Save**

      :::image type="content" source="./media/process-events-using-event-processor-editor/event-processor-editor-preview.png" alt-text="Screenshot of the push mode event processor screen." lightbox="./media/process-events-using-event-processor-editor/event-processor-editor-preview.png":::

   3. When you choose an existing Kusto table, schema validation between the current schema in this eventstream and the target KQL table will be performed. If the two schemas aren't matched, an error message is shown and reminds you to open event processor to adjust the schema in this eventstream accordingly.

      :::image type="content" source="./media/process-events-using-event-processor-editor/event-processor-error.png" alt-text="Screenshot of the push mode event processor error screen." lightbox="./media/process-events-using-event-processor-editor/event-processor-error.png":::

      When open the event processor, the detailed mismatch information is shown in Authoring error tab.

      :::image type="content" source="./media/process-events-using-event-processor-editor/event-processor-mismatch-information.png" alt-text="Screenshot of the push mode event processor mismatch information screen." lightbox="./media/process-events-using-event-processor-editor/event-processor-mismatch-information.png":::

   4. After you configure everything and select **Save**, a KQL database destination appears on the canvas, connected to your eventstream, and you can check the metrics in the **Data insights** and logs in **Runtime logs**.

      :::image type="content" source="./media/add-manage-eventstream-destinations/eventstream-destination-kql-database-push-mode.png" alt-text="Screenshot showing the new KQL database push mode destination." lightbox="./media/add-manage-eventstream-destinations/eventstream-destination-kql-database-push-mode.png" :::


## Manage a destination

**Edit/remove**: You can edit or remove an eventstream destination either through the navigation pane or canvas.

When you select **Edit**, the edit pane opens in the right side of the main editor. You can modify the configuration as you wish, including the event transformation logic through the event processor editor.

:::image type="content" source="./media/add-manage-eventstream-destinations/eventstream-destination-edit-deletion.png" alt-text="Screenshot showing where to select the modify and delete options for destinations on the canvas." lightbox="./media/add-manage-eventstream-destinations/eventstream-destination-edit-deletion.png" :::

## Related content

To learn how to add other destinations to an eventstream, see the following articles: 
- [Lakehouse](add-destination-lakehouse.md)
- [Reflex](add-destination-reflex.md)
- [Custom app](add-destination-custom-app.md)

To add a destination to the eventstream, see the following articles: 
- [Add and manage sources to an eventstream](./add-manage-eventstream-sources.md)
- [Create and manage an eventstream](./create-manage-an-eventstream.md)
