---
title: Add an Eventhouse destination to an eventstream
description: Learn how to add an Eventhouse destination to an eventstream in Microsoft Fabric event streams.
ms.reviewer: spelluru
ms.author: xujiang1
author: xujxu
ms.topic: how-to
ms.custom:
ms.date: 05/05/2025
ms.search.form: Source and Destination
zone_pivot_group_filename: real-time-intelligence/event-streams/zone-pivot-groups.json
zone_pivot_groups: event-streams-standard-enhanced
---

# Add an Eventhouse destination to an eventstream

This article shows you how to add an Eventhouse as a destination to an eventstream in Microsoft Fabric event streams.

[!INCLUDE [select-view](./includes/select-view.md)]

::: zone pivot="enhanced-capabilities"  

## Prerequisites

- Access to a workspace in the Fabric capacity license mode (or) the Trial license mode with Contributor or higher permissions. 
- Access to an Eventhouse created in a Fabric workspace where you have Contributor or higher permissions.

[!INCLUDE [sources-destinations-note](./includes/sources-destinations-note.md)]

##  Add an Eventhouse as a destination

To add an Eventhouse as a destination, you can choose between two ingestion modes: **Direct ingestion** or **Event processing before ingestion**.

### Direct ingestion mode

Direct ingestion mode ingests your event data directly into the Eventhouse without any processing. You can use direct ingestion mode to add an Eventhouse destination to your default stream or a dervived stream. 

1. In **Edit mode** for your eventstream, select **Add destination** on the ribbon or select the **Transform events or add destination** card on the canvas, and then select **Eventhouse**. 

   :::image type="content" source="media/add-destination-kql-database/add-eventhouse-destination.png" alt-text="A screenshot of selecting Eventhouse in the Added destination dropdown list." lightbox="media/add-destination-kql-database/add-eventhouse-destination.png"::: 
   
1. On the Eventhouse screen, select **Direct ingestion**.

1. Enter a **Destination name**, a **Workspace**, and an **Eventhouse** from the selected workspace.

1. Select **Save**.

   :::image type="content" border="true" source="media/add-destination-kql-database/eventhouse-direct-ingestion.png" alt-text="A screenshot of the Eventhouse configuration screen.":::

1. Connect the new Eventhouse destination card to the output of your eventstream if not already connected, and then select **Publish**.

   :::image type="content" source="media/add-destination-kql-database/edit-mode.png" alt-text="A screenshot of the eventstream with the Publish button highlighted." lightbox="media/add-destination-kql-database/edit-mode.png":::

1. In **Live view**, select **Configure** in the Eventhouse destination node.

   :::image type="content" source="media/add-destination-kql-database/live-view.png" alt-text="A screenshot of the published eventstream with the Configure button in the KQL Database destination highlighted." lightbox="media/add-destination-kql-database/live-view.png":::

1. Your Eventhouse opens in the **Get data** screen. Select an existing table of the KQL database, or select **New table** to create a new one to route and ingest the data.

1. Provide a **Data connection name** or keep the name provided, and then select **Next**. It can take a few minutes to pull data from the eventstream.

   :::image type="content" border="true" source="media/add-destination-kql-database/select-table.png" alt-text="A screenshot of the Get data screen for the KQL Database destination, with the Next button highlighted.":::

1. On the **Inspect the data** screen, you can:

   - Select a **Format** to preview how the data is sent to your Eventhouse.
   - Select **Edit columns** to configure the columns for your data.
   - Select **Advanced** to select events to include or to choose mapping options.

   :::image type="content" source="media/add-destination-kql-database/select-format.png" alt-text="A screenshot showing the data formats and Advanced options on the Inspect the data screen." lightbox="media/add-destination-kql-database/select-format.png":::

1. If you select **Edit columns**, on the **Edit columns** screen you can:

   - Select **Add column** to add a column.
   - Select **Source** columns to map.
   - Apply **Mapping transformation** to columns.
   - Change **Sample data** values.

   Then select **Apply**.

   :::image type="content" source="media/add-destination-kql-database/edit-columns.png" alt-text="A screenshot of the Edit columns screen." lightbox="media/add-destination-kql-database/edit-columns.png":::

1. When you're finished configuring the data, select **Finish** on the **Inspect the data** screen.

1. On the **Summary** screen, review the details and status of your data ingestion, including the table with the schema you defined and the connection between the eventstream and the Eventhouse. Select **Close** to finalize the Eventhouse setup.

   :::image type="content" source="media/add-destination-kql-database/summary.png" alt-text="A screenshot of the Summary screen with the Close button highlighted." lightbox="media/add-destination-kql-database/summary.png":::

You can now see the Eventhouse destination on the canvas in **Live view**.

:::image type="content" source="media/add-destination-kql-database/live-view-finished.png" alt-text="A screenshot of the configured KQL Database destination in Live view." lightbox="media/add-destination-kql-database/live-view-finished.png"::: 

### Event processing before ingestion

The event processing before ingestion mode processes your event data before ingesting it into the Eventhouse. Use this mode if you apply operators such as filtering or aggregation to process the data before ingestion, or after a derived stream.

1. In **Edit mode** for your eventstream, hover over an operator or derived stream, select **+**, and then select **Eventhouse**.

   :::image type="content" source="media/add-destination-kql-database/select-eventhouse.png" alt-text="A screenshot of selecting the + symbol for the operator output and selecting KQL Database." lightbox="media/add-destination-kql-database/select-eventhouse.png":::

1. On the **Eventhouse** screen, **Event processing before ingestion** should already be selected. Complete the rest of the information about your Eventhouse, and then select **Save**.

   :::image type="content" border="true" source="media/add-destination-kql-database/eventhouse-event-processing.png" alt-text="A screenshot of the KQL Database configuration screen for Event processing before ingestion.":::

1. To implement the newly added Eventhouse destination, select **Publish**.

   :::image type="content" source="media/add-destination-kql-database/edit-mode-processed.png" alt-text="A screenshot of the eventstream in Edit mode with the KQL Database destination added." lightbox="media/add-destination-kql-database/edit-mode-processed.png":::

Once you complete these steps, the eventstream with Eventhouse destination is available for visualization in **Live view**.

:::image type="content" source="media/add-destination-kql-database/live-view-processed-eventhouse.png" alt-text="A screenshot of the configured KQL Database event processing flow in Live view." lightbox="media/add-destination-kql-database/live-view-processed-eventhouse.png":::

> [!NOTE]  
> When configuring an Eventstream, the source, transformation logic, and destination are typically added together. By default, when publishing the Eventstream, the backend services for both data ingestion and data routing start with **Now** respectively. However, data ingestion may begin faster than data routing, causing some data to be ingested into Eventstream before routing is fully initialized. As a result, this data may not be routed to the destination.  
>  
> A common example is a database CDC source, where some initial snapshot data could remain in Eventstream without being routed to the destination.  
>  
> To mitigate this, follow these steps:  
> 1. When configuring an **Eventhouse (Event processing before ingestion)** or **Lakehouse** destination, uncheck **Activate ingestion** after adding the data source. 
>
>    :::image type="content" source="media/add-destination-kql-database/untick-activate.png" alt-text="A screenshot of the KQL Database without selecting Activate ingesting after adding the data source." lightbox="media/add-destination-kql-database/untick-activate.png":::
> 1. Manually activate ingestion after the Eventstream is published.  
> 1. Use the **Custom time** option to select an earlier timestamp, ensuring initial data is properly processed and routed.  
> 
>    :::image type="content" source="media/add-destination-kql-database/resume-kusto.png" alt-text="A screenshot of resuming the KQL Database." lightbox="media/add-destination-kql-database/resume-kusto.png":::
> For more information, see [Pause and resume data streams](pause-resume-data-streams.md)

## Related content

To learn how to add other destinations to an eventstream, see the following articles:

- [Custom app](add-destination-custom-app.md)
- [Derived stream](add-destination-derived-stream.md)
- [Lakehouse](add-destination-lakehouse.md)
- [Fabric [!INCLUDE [fabric-activator](../includes/fabric-activator.md)]](add-destination-activator.md)
- [Create an eventstream](create-manage-an-eventstream.md)


::: zone-end

::: zone pivot="standard-capabilities"


## Prerequisites

Before you start, you must complete the following prerequisites:

- Access to a workspace in the Fabric capacity license mode (or) the Trial license mode with Contributor or higher permissions. 
- Access to the workspace with Contributor or above permissions where your KQL database is located.

[!INCLUDE [sources-destinations-note](./includes/sources-destinations-note.md)]

## Add a KQL database as a destination

To add a KQL database as a destination, you need to have a KQL database created in the workspace, and choose between two ingestion modes: **Direct ingestion** and **Event processing before ingestion**.

### Direct ingestion
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

### Event processing before ingestion
   This mode processes your event data before ingesting it into the KQL database. You can use this mode if you want to apply some processing or transformation to your event data before ingesting it, such as filtering, aggregating, or expanding. You can design the processing logic using event processor.
   1. Select **Event processing before ingestion**, complete the information about your KQL Database, and then select **Open event processor**.

      :::image type="content" source="./media/event-streams-destination/eventstream-destinations-kql-database-push-mode.png" alt-text="Screenshot of the KQL Database push mode destination configuration screen." lightbox="./media/event-streams-destination/eventstream-destinations-kql-database-push-mode.png":::

   2. Design the event processing with event processor, and then select **Save**

      :::image type="content" source="./media/process-events-using-event-processor-editor/event-processor-editor-preview.png" alt-text="Screenshot of the push mode event processor screen." lightbox="./media/process-events-using-event-processor-editor/event-processor-editor-preview.png":::

   3. When you choose an existing Kusto table, schema validation between the current schema in this eventstream and the target KQL table is performed. If the two schemas aren't matched, an error message is shown and reminds you to open event processor to adjust the schema in this eventstream accordingly.

      :::image type="content" source="./media/process-events-using-event-processor-editor/event-processor-error.png" alt-text="Screenshot of the push mode event processor error screen." lightbox="./media/process-events-using-event-processor-editor/event-processor-error.png":::

      When you open the event processor, the detailed mismatch information is shown in Authoring error tab.

      :::image type="content" source="./media/process-events-using-event-processor-editor/event-processor-mismatch-information.png" alt-text="Screenshot of the push mode event processor mismatch information screen." lightbox="./media/process-events-using-event-processor-editor/event-processor-mismatch-information.png":::

   4. After you configure everything and select **Save**, a KQL database destination appears on the canvas, connected to your eventstream, and you can check the metrics in the **Data insights** and logs in **Runtime logs**.

      :::image type="content" source="./media/add-manage-eventstream-destinations/eventstream-destination-kql-database-push-mode.png" alt-text="Screenshot showing the new KQL database push mode destination." lightbox="./media/add-manage-eventstream-destinations/eventstream-destination-kql-database-push-mode.png" :::

## Manage a destination

**Edit/remove**: You can edit or remove an eventstream destination either through the navigation pane or canvas.

When you select **Edit**, the edit pane opens in the right side of the main editor. You can modify the configuration as you wish, including the event transformation logic through the event processor editor.

:::image type="content" source="./media/add-manage-eventstream-destinations/eventstream-destination-edit-deletion.png" alt-text="Screenshot showing where to select the modify and delete options for destinations on the canvas." lightbox="./media/add-manage-eventstream-destinations/eventstream-destination-edit-deletion.png" :::

## Related content

To learn how to add other destinations to an eventstream, see the following articles:

- [Route events to destinations](add-manage-eventstream-destinations.md)
- [Custom app destination](add-destination-custom-app.md)
- [Lakehouse destination](add-destination-lakehouse.md)
- [Activator destination](add-destination-activator.md)
- [Create an eventstream](create-manage-an-eventstream.md)

::: zone-end
