---
title: Real-Time Analytics tutorial part 3- Get historical data
description: Learn how to get historical data into your KQL database in Real-Time Analytics.
ms.reviewer: tzgitlin
ms.author: yaschust
author: YaelSchuster
ms.topic: tutorial
ms.custom: build-2023
ms.date: 09/28/2023
ms.search.form: Get started
---
# Real-Time Analytics tutorial part 3: Get historical data

[!INCLUDE [preview-note](../includes/preview-note.md)]

> [!NOTE]
> This tutorial is part of a series. For the previous section, see: [Tutorial part 2: Get data with Eventstream](tutorial-2-event-streams.md).

One-time data loading is often needed for historical data, or for adding dimension tables. Recall that the dataset you've ingested with Eventstream doesn't contain latitude and longitude data. In this section, you're going to load additional information on the pick-up locations and drop-off from a blob storage container.

## Get dimension data from blob storage

1. Browse to your KQL database named *NycTaxiDB*.
1. Select **Get data**.

    In the **Get data** window, the **Source** tab is selected.

    :::image type="content" source="media/realtime-analytics-tutorial/select-data-source.png" alt-text="Screenshot of the get data window showing the data sources available for ingestion.":::
1. Select **Azure storage**.

### Configure

1. Select **+ New table**, and enter *Locations* as the table name.
1. In the **URI** field, paste the following storage connection string to the blob container where the files are located, and then select **+**.

    > *https://azuresynapsestorage.blob.core.windows.net/sampledata/NYCTaxiLocations/*

1. Select **Next**.

   :::image type="content" source="media/realtime-analytics-tutorial/configure-source.png" alt-text="Screenshot of the destination window showing the data source connection string." lightbox="media/realtime-analytics-tutorial/configure-source.png":::

### Inspect

1. Select **Format** and then **CSV** to change the schema data format.
1. From the **Schema  definition file** dropdown, select the first file. The tool automatically infers the schema based on your data. No changes are necessary.
1. Select **Finish**.

1. Select **Next: Schema**.

### Summary

In the **Data preparation** window, all three steps are marked with green check marks when data ingestion finishes successfully.
loaded.

:::image type="content" source="media/realtime-analytics-tutorial/data-ingestion-complete.png" alt-text="Screenshot of summary page with data ingestion completed." lightbox="media/realtime-analytics-tutorial/data-ingestion-complete.png":::

Select **Close** to return to your database landing page.

## Related content

For more information about tasks performed in this tutorial, see:

* [Get data from Azure storage](get-data-azure-storage.md)

## Next steps

> [!div class="nextstepaction"]
> [Tutorial part 4: Explore your data with KQL and SQL](tutorial-4-explore.md)
