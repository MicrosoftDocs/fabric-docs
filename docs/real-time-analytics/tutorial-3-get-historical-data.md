---
title: Real-Time Analytics tutorial part 3- Get historical data
description: Learn how to get historical data into your KQL database in Real-Time Analytics.
ms.reviewer: tzgitlin
ms.author: yaschust
author: YaelSchuster
ms.topic: tutorial
ms.custom:
  - build-2023
  - ignite-2023
ms.date: 09/28/2023
ms.search.form: Get started
---
# Real-Time Analytics tutorial part 3: Get historical data

> [!NOTE]
> This tutorial is part of a series. For the previous section, see: [Tutorial part 2: Get data with Eventstream](tutorial-2-event-streams.md).

One-time data loading is often needed for historical data, or for adding dimension tables. Recall that the dataset you've ingested with Eventstream doesn't contain latitude and longitude data. In this section, you're going to load additional information on the pick-up locations and drop-off from a blob storage container.

## Get dimension data from blob storage

1. Browse to your KQL database named *NycTaxiDB*.
1. Select **Get data** > **Blob container**.

    :::image type="content" source="media/realtime-analytics-tutorial/get-data-blob-container.png" alt-text="Screenshot of get data from blob container.":::

    An **Ingest data** window opens with the **Destination** tab selected.

### Destination tab

1. Under **Table**, make sure that **New table** is selected, and enter *Locations* as the table name.
1. Select **Next: Source**.

    :::image type="content" source="media/realtime-analytics-tutorial/destination-tab.png" alt-text="Screenshot of destination tab showing the table name. The Next:Source button is highlighted.":::

### Source tab

In the **Source** tab, **Source type** is auto populated with *Blob container*.

:::image type="content" source="media/realtime-analytics-tutorial/source-tab-filled-out.png" alt-text="Screenshot of source tab with blob container filled out." lightbox="media/realtime-analytics-tutorial/source-tab-filled-out.png":::

1. Fill out the remaining fields according to the following table:

    |  **Setting**  | **Suggested value**  | **Field description**
    |-------|---|------
    | Ingestion  |   *One-time*         |The type of data ingestion type.
    | Link to source |  *https://azuresynapsestorage.blob.core.windows.net/sampledata/NYCTaxiLocations/* | URI to the blob container where the files are located |
    | Sample size |  *Blank*
    | Folder path |  *Blank*
    | Schema  defining file |  Choose the first file

1. Select **Next: Schema**.

### Schema tab

The tool automatically infers the schema based on your data. No changes are necessary.

:::image type="content" source="media/realtime-analytics-tutorial/schema-tab.png" alt-text="Screenshot of schema tab." lightbox="media/realtime-analytics-tutorial/schema-tab.png":::

Select **Next: Summary**.

### Summary tab

In the **Data ingestion completed** window, all steps are marked with green check marks when the data has been successfully
loaded.

:::image type="content" source="media/realtime-analytics-tutorial/data-ingestion-complete.png" alt-text="Screenshot of summary page with data ingestion completed." lightbox="media/realtime-analytics-tutorial/data-ingestion-complete.png":::

Select **Close** to return to your database landing page.

## Related content

For more information about tasks performed in this tutorial, see:

* [Get data from Azure storage](get-data-azure-storage.md)

## Next steps

> [!div class="nextstepaction"]
> [Tutorial part 4: Explore your data with KQL and SQL](tutorial-4-explore.md)
