---
title: Add a lakehouse destination to an eventstream (preview)
description: Learn how to add a lakehouse destination to an evenstream with enhanced capabilities. 
ms.reviewer: spelluru
ms.author: xujiang1
author: xujxu
ms.topic: how-to
ms.date: 04/03/2024
ms.search.form: Source and Destination
---

# Add a lakehouse destination to an eventstream (preview)
This article shows you how to add a lakehouse destination to an evenstream with enhanced capabilities. 

## Prerequisites

Before you start, you must complete the following prerequisites:

- Get access to a **premium workspace** with **Contributor** or above permissions where your eventstream is located.
- Get access to a **premium workspace** with **Contributor** or above permissions where your lakehouse is located.

[!INCLUDE [sources-destinations-note](./includes/sources-destinations-note.md)]

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
    1. **Rows per file** – The minimum number of rows that Lakehouse ingests in a single file. The smaller the minimum number of rows, the more files Lakehouse creates during ingestion. Minimum is 1 row. Maximum is 2M rows per file.
    1. **Duration** – The maximum duration that Lakehouse would take to ingest a single file. The longer the duration, more rows are ingested in a file. Minimum is 1 minute and maximum is 2 hours.  
      
        :::image type="content" source="./media/add-manage-eventstream-destinations/ingestion-modes.png" alt-text="Screenshot showing the ingestion modes." lightbox="./media/add-manage-eventstream-destinations/ingestion-modes.png" :::
1. Select **Add** to add the lakehouse destination.
1. Table optimization shortcut available inside the lakehouse destination. This solution facilitates you by launching a Spark job within a Notebook, which consolidates these small streaming files within the target Lakehouse table.

    :::image type="content" source="./media/add-manage-eventstream-destinations/table-optimization.png" alt-text="Screenshot showing the table optimization settings." lightbox="./media/add-manage-eventstream-destinations/table-optimization.png" :::
1. A lakehouse destination appears on the canvas, with a spinning status indicator. The system takes a few minutes to change the status to **Ingesting**.

   :::image type="content" source="./media/add-manage-eventstream-destinations/eventstream-destination-lakehouse.png" alt-text="Screenshot showing the lakehouse destination." lightbox="./media/add-manage-eventstream-destinations/eventstream-destination-lakehouse.png" :::

## Manage a destination

**Edit/remove**: You can edit or remove an eventstream destination either through the navigation pane or canvas.

When you select **Edit**, the edit pane opens in the right side of the main editor. You can modify the configuration as you wish, including the event transformation logic through the event processor editor.

:::image type="content" source="./media/add-manage-eventstream-destinations/eventstream-destination-edit-deletion.png" alt-text="Screenshot showing where to select the modify and delete options for destinations on the canvas." lightbox="./media/add-manage-eventstream-destinations/eventstream-destination-edit-deletion.png" :::

## Related content

To learn how to add other destinations to an eventstream, see the following articles: 
- [KQL Database](add-destination-kql-database.md)
- [Reflex](add-destination-reflex.md)
- [Custom app](add-destination-custom-app.md)

To add a destination to the eventstream, see the following articles: 
- [Add and manage sources to an eventstream](./add-manage-eventstream-sources.md)
- [Create and manage an eventstream](./create-manage-an-eventstream.md)
