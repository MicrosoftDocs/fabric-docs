---
title: "Synapse Real-Time Analytics tutorial part 3: Get historical data"
description: Part 3 of the Real-Time Analytics tutorial in Microsoft Fabric
ms.reviewer: tzgitlin
ms.author: yaschust
author: YaelSchuster
ms.topic: tutorial
ms.date: 05/23/2023
ms.search.form: product-kusto
---
# Real-Time Analytics tutorial part 3: Get historical data

[!INCLUDE [preview-note](../includes/preview-note.md)]

> [!NOTE]
> This tutorial is part of a series. For the previous section, see: [Tutorial part 2: Get data with Eventstream](tutorial-2-event-streams.md)

One-time data loading is often needed for historical data, or to add dimension tables. Recall that the dataset you have ingested with Eventstream does not contain latitude and longitude data. In this section, you are going to load additional information on the pick-up locations and drop-off. This data is available in a blob storage container.

## Get dimension data from blob storage

1. Navigate to your KQL database named **NycTaxiDB**.
1.  Select **Get data** > **Blob container**.

    :::image type="content" source="media/realtime-analytics-tutorial/get-data-blob-container.png" alt-text="Screenshot of get data from blob container.":::

    An **Ingest data** window opens with the **Destination** tab selected. 

### Destination tab

In the **Destination** tab, **Database** is auto populated with the name
of the selected database.

1. Under **Table**, make sure that **New table** is selected, and enter *locations* as the table name.
1. Select **Next: Source**.

    :::image type="content" source="media/realtime-analytics-tutorial/destination-tab.png" alt-text="Screenshot of destination tab.":::

### Source tab

In the **Source** tab, **Source type** is auto populated with *Blob container*.

:::image type="content" source="media/realtime-analytics-tutorial/source-tab-filled-out.png" alt-text="Screenshot of source tab with blob container filled out.":::

1.  Fill out the remaining fields according to the following table:

    |  **Setting**  | **Suggested value**  | **Field description**
    |-------|---|------
    |  Ingestion  |   *One-time*         |The type of data ingestion type.
    | Link to source |  *https://azuresynapsestorage.blob.core.windows.net/sampledata/NYCTaxiLocations/* | URI to the blob container where the files are located |
    |  Sample size |  *Blank* 
    | Folder path |  *Blank* 
    | Schema  defining file |  Choose the first file 

1.  Select **Next: Schema**.

### Schema tab

The tool automatically infers the schema based on your data. No changes are necessary.

:::image type="content" source="media/realtime-analytics-tutorial/schema-tab.png" alt-text="Screenshot of schema tab.":::

Select **Next: Summary**.

### Summary tab

In the **Data ingestion is in progress** window, all steps will be
marked with green check marks when the data has been successfully
loaded. 

:::image type="content" source="media/realtime-analytics-tutorial/data-ingestion-complete.png" alt-text="Screenshot of summary page with data ingestion completed.":::

Select **Close** to return to your database landing page.

## Next steps

> [!div class="nextstepaction"]
> [Tutorial part 4: Explore your data with KQL and SQL](tutorial-4-explore.md)