---
title: Add an Eventhouse destination to an eventstream
description: Learn how to add an Eventhouse destination to an eventstream in Microsoft Fabric event streams.
ms.reviewer: spelluru
ms.author: xujiang1
author: xujxu
ms.topic: how-to
ms.custom: sfi-image-nochange
ms.date: 05/05/2025
ms.search.form: Source and Destination
---

# Add an Eventhouse destination to an eventstream

This article shows you how to add an Eventhouse as a destination to an eventstream in Microsoft Fabric event streams.


## Prerequisites

- Access to a workspace in the Fabric capacity license mode (or) the Trial license mode with Contributor or higher permissions. 
- Access to an Eventhouse created in a Fabric workspace where you have Contributor or higher permissions.

[!INCLUDE [sources-destinations-note](./includes/sources-destinations-note.md)]

## Add an Eventhouse destination to a default stream

To add an Eventhouse as a destination, you can choose between two ingestion modes: **Direct ingestion** or **Event processing before ingestion**.

### Direct ingestion mode

Direct ingestion mode ingests your event data directly into the Eventhouse without any processing. You can use direct ingestion mode to add an Eventhouse destination to your default stream or a derived stream. 

1. In **Edit mode** for your eventstream, select **Add destination** on the ribbon or select the **Transform events or add destination** card on the canvas, and then select **Eventhouse**. 

   :::image type="content" source="media/add-destination-kql-database/add-eventhouse-destination.png" alt-text="A screenshot of selecting Eventhouse in the Added destination dropdown list." lightbox="media/add-destination-kql-database/add-eventhouse-destination.png"::: 
   
1. On the Eventhouse screen, select **Direct ingestion**.
1. Enter a **Destination name**, a **Workspace**, and an **Eventhouse** from the selected workspace.
1. If you are using schemas at the source, see [Configure Eventhouse destination to use schemas](#configure-schemas-for-an-eventhouse-destination).

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

    If you are using schemas at the source, see [Configure Eventhouse destination to use schemas](#configure-schemas-for-an-eventhouse-destination).

   :::image type="content" border="true" source="media/add-destination-kql-database/eventhouse-event-processing.png" alt-text="A screenshot of the KQL Database configuration screen for Event processing before ingestion.":::

1. To implement the newly added Eventhouse destination, select **Publish**.

   :::image type="content" source="media/add-destination-kql-database/edit-mode-processed.png" alt-text="A screenshot of the eventstream in Edit mode with the KQL Database destination added." lightbox="media/add-destination-kql-database/edit-mode-processed.png":::

Once you complete these steps, the eventstream with Eventhouse destination is available for visualization in **Live view**.

:::image type="content" source="media/add-destination-kql-database/live-view-processed-eventhouse.png" alt-text="A screenshot of the configured KQL Database event processing flow in Live view." lightbox="media/add-destination-kql-database/live-view-processed-eventhouse.png":::

## Add an Eventhouse destination to a derived stream
You can now seamlessly add an Eventhouse as a destination to a derived stream.This enhancement gives you more flexibility in routing the data as is or transformed into Eventhouse for real-time analytics and storage.

A derived stream refers to a logical stream of data. This stream is created by applying transformations or filters to the default stream. Derived streams enhance data management and analytics by providing a curated subset of data tailored to specific needs.
With this update, you can now:
- Route the derived stream data into Eventhouse for advanced querying and visualization.
- Choose your preferred ingestion mode—either **Direct Ingestion** or **Event processing before ingestion**.
- Maintain a consistent setup experience: The configuration process mirrors what you’re already familiar with for default streams, so there’s no learning curve.

1.  In Edit mode for your eventstream, follow these steps to add Eventhouse destination to the derived stream: 
* From the derived stream select Eventhouse destination.
   
   :::image type="content" source="media/add-destination-kql-database/select-eventhouse-destination.png" alt-text="Screenshot showing how to add Eventhouse destination from derived stream." lightbox="./media/add-destination-kql-database/select-eventhouse-destination.png":::

* Complete the configuration for the preferred ingestion modes. Setup process remains the same as explained above for the default stream.
   
   :::image type="content" source="media/add-destination-kql-database/add-eventhouse-destination-configuration.png" alt-text="Screenshot showing configurations for Eventhouse destination." lightbox="./media/add-destination-kql-database/add-eventhouse-destination-configuration.png":::



> [!NOTE]  
> When configuring an Eventstream, the source, transformation logic, and destination are typically added together. By default, when publishing the Eventstream, the backend services for both data ingestion and data routing start with **Now** respectively. However, data ingestion might begin faster than data routing, causing some data to be ingested into Eventstream before routing is fully initialized. As a result, this data might not be routed to the destination.  
>  
> A common example is a database Change Data Capture (CDC) source, where some initial snapshot data could remain in Eventstream without being routed to the destination.  
>  
> To mitigate this, follow these steps:  
> 1. When configuring an **Eventhouse (Event processing before ingestion)** or **Lakehouse** destination, uncheck **Activate ingestion** after adding the data source. 
>
>    :::image type="content" source="media/add-destination-kql-database/untick-activate.png" alt-text="A screenshot of the KQL Database without selecting Activate ingesting after adding the data source." lightbox="media/add-destination-kql-database/untick-activate.png":::
> 1. Manually activate ingestion after the Eventstream is published.  
> 1. Use the **Custom time** option to select an earlier timestamp, ensuring initial data is properly processed and routed.  
> 
>    :::image type="content" source="media/add-destination-kql-database/resume-kusto.png" alt-text="A screenshot of resuming the KQL Database." lightbox="media/add-destination-kql-database/resume-kusto.png":::
> For more information, see [Pause, and resume data streams](pause-resume-data-streams.md)

[!INCLUDE [configure-eventhouse-destination-schema](./includes/configure-eventhouse-destination-schema.md)]


## Related content

To learn how to add other destinations to an eventstream, see the following article: [Route events to destinations](add-manage-eventstream-destinations.md)
