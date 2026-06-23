---
title: Add a lakehouse destination to an eventstream
description: Learn how to add a lakehouse destination to an eventstream in Microsoft Fabric to persist streaming data in Delta tables for analytics.
ms.reviewer: xujiang1
ms.topic: how-to
ms.custom: sfi-image-nochange
ms.date: 06/15/2026
ms.search.form: Source and Destination

#customer intent: As a data engineer, I want to add a lakehouse destination to an eventstream so that I can persist streaming data in Delta tables for analytics.

---

# Add a lakehouse destination to an eventstream

This article shows you how to add a lakehouse as a destination to an eventstream in Microsoft Fabric. Sending streaming data to a lakehouse allows you to persist real-time events in Delta tables for batch analytics and long-term storage.

For optimized streaming performance and real-time querying, consider [adding an eventhouse destination](add-destination-kql-database.md) and enabling [Eventhouse OneLake Availability](../event-house-onelake-availability.md).

[!INCLUDE [select-view](./includes/select-view.md)]

> [!IMPORTANT]
> There's *schema enforcement* for writing data into a lakehouse destination table. All new writes to the table must be compatible with the target table's schema at write time, ensuring data quality.
> 
> When output is written to a new delta table, the table schema is created based on the first record. All records of the output data are projected onto the schema of the existing table.
> 
> If the incoming data has columns that aren't in the existing table schema, the extra columns aren't included in the data written to the table. Likewise, if the incoming data is missing columns that are in the existing table schema, the missing columns are written to the table with the values set to null.
>
> If the schema of a Delta table and an incoming record have no intersection, it results in a schema conversion failure. However, this isn't the only scenario that can cause such a failure.
>
> **If the schema of incoming data changes (that is, the new data record's schema doesn't align with the first record), certain columns or entire records might be lost when writing to the lakehouse**. Therefore, using a lakehouse to receive such streaming data, such as database CDC data, isn't recommended.



## Prerequisites

- Access to a workspace in the Fabric capacity license mode or the Trial license mode with Contributor or higher permissions
- Access to the workspace where your lakehouse is located with Contributor or higher permissions

## Add a lakehouse as a destination

To add a lakehouse destination to a default or derived eventstream, follow these steps.

1. In **Edit mode** for your eventstream, select **Add destination** on the ribbon and select **Lakehouse** from the dropdown list.

   :::image type="content" source="media/add-destination-lakehouse/add-destination.png" alt-text="A screenshot of the Add destination dropdown list with Lakehouse highlighted." lightbox="media/add-destination-lakehouse/add-destination.png":::

1. Connect the lakehouse node to your stream node or operator.

1. On the **Lakehouse** configuration screen, complete the following information:

   1. Enter a **Destination name**.
   1. Select the **Workspace** that contains your lakehouse.
   1. Select an existing **Lakehouse** from the workspace you specified.
   1. Select an existing **Delta table**, or create a new one to receive data.
   1. Select the **Input data format** that is sent to your lakehouse. The supported data formats are JSON, Avro, and CSV.

   :::image type="content" border="true" source="media/add-destination-lakehouse/lakehouse-screen.png" alt-text="A screenshot of the top part of the Lakehouse configuration screen.":::

1. Select **Advanced**.

1. Two ingestion modes are available for a lakehouse destination. Based on your scenario, configure these modes to optimize how Fabric event streams write to the lakehouse.

   - **Minimum rows** is the minimum number of rows that the lakehouse ingests in a single file. The minimum is 1 row, and the maximum is 2 million rows per file. The smaller the minimum number of rows, the more files the lakehouse creates during ingestion.

   - **Maximum duration** is the maximum duration that the lakehouse takes to ingest a single file. The minimum is 1 minute and maximum is 2 hours. The longer the duration, the more rows are ingested in a file.

   :::image type="content" border="true" source="media/add-destination-lakehouse/advanced-screen.png" alt-text="A screenshot of the Advanced section of the Lakehouse configuration screen.":::

1. Select **Save**.

1. To implement the newly added lakehouse destination, select **Publish**.

   :::image type="content" source="media/add-destination-lakehouse/edit-mode.png" alt-text="A screenshot of the stream and lakehouse destination in Edit mode with the Publish button highlighted." lightbox="media/add-destination-lakehouse/edit-mode.png":::

After you complete these steps, the lakehouse destination is available for visualization in **Live view**. In the **Details** pane, select the **Optimize table in notebook** shortcut to launch an Apache Spark job within a Notebook, which consolidates the small streaming files within the target lakehouse table.

:::image type="content" source="media/add-destination-lakehouse/live-view.png" alt-text="A screenshot of the lakehouse destination and the table optimization button in Live view." lightbox="media/add-destination-lakehouse/live-view.png":::

> [!NOTE]
> When configuring an eventstream, the source, transformation logic, and destination are typically added together. By default, when publishing the eventstream, the backend services for both data ingestion and data routing start with **Now** respectively. However, data ingestion might begin faster than data routing, causing some data to be ingested into the eventstream before routing is fully initialized. As a result, this data might not be routed to the destination.
>
> To mitigate this, follow these steps:
>
> 1. When configuring an **Eventhouse (Event processing before ingestion)** or **Lakehouse** destination, uncheck **Activate ingestion** after adding the data source.
>
>    :::image type="content" source="media/add-destination-kql-database/untick-activate.png" alt-text="A screenshot of the KQL Database without selecting Activate ingesting after adding the data source." lightbox="media/add-destination-kql-database/untick-activate.png":::
>
> 1. Manually activate ingestion after the eventstream is published.
> 1. Use the **Custom time** option to select an earlier timestamp, ensuring initial data is properly processed and routed.
>
> :::image type="content" source="media/add-destination-lakehouse/resume-lakehouse.png" alt-text="A screenshot of resuming Lakehouse destination." lightbox="media/add-destination-lakehouse/resume-lakehouse.png":::
>
> For more information, see [Pause and resume data streams](pause-resume-data-streams.md).

## Related content

To learn how to add other destinations to an eventstream, see the following articles:

- [Route events to destinations](add-manage-eventstream-destinations.md)
- [Custom app](add-destination-custom-app.md)
- [Derived stream](add-destination-derived-stream.md)
- [Eventhouse](add-destination-kql-database.md)
- [Fabric [!INCLUDE [fabric-activator](../includes/fabric-activator.md)]](add-destination-activator.md)
- [Create an eventstream](create-manage-an-eventstream.md)
