---
title: Real-Time Intelligence tutorial part 3- Get historical data
description: Learn how to get historical data into your KQL database in Real-Time Intelligence.
ms.reviewer: tzgitlin
ms.author: yaschust
author: YaelSchuster
ms.topic: tutorial
ms.custom:
  - build-2023
  - ignite-2023
ms.date: 04/21/2024
ms.search.form: Get started
---
# Real-Time Intelligence tutorial part 3: Get historical data

> [!NOTE]
> This tutorial is part of a series. For the previous section, see: [Tutorial part 2: Get data with Eventstream](tutorial-2-event-streams.md).

One-time data loading is often needed for historical data, or for adding dimension tables. Recall that the dataset you ingested with Eventstream doesn't contain latitude and longitude data. In this section, you're going to load additional information on the pick-up and drop-off locations.

## Get dimension data from blob storage

1. Open the Fabric samples repository on GitHub to download the [Locations data](https://github.com/microsoft/fabric-samples/blob/main/docs-samples/real-time-analytics/ny-yellow-taxi-location-info.csv)

    :::image type="content" source="media/real-time-intelligence-tutorial/github-data.png" alt-text="Screenshot of the Fabric samples repository showing the dimensions data file.":::

1. Save the file locally.

    > [!NOTE]
    > The data must be saved in the `.csv` file format.

1. Browse to your KQL database named *NycTaxiDB*.
1. Select **Get data**.

    In the **Get data** window, the **Source** tab is selected.

    :::image type="content" source="media/real-time-intelligence-tutorial/select-data-source.png" alt-text="Screenshot of the get data window showing the data sources available for ingestion.":::
1. Select **Local file**.

### Configure

1. Select **+ New table**, and enter *Locations* as the table name.
1. Either drag the *Locations data* file into the window, or select **Browse for files** and then select the file.
1. Select **Next**.

   :::image type="content" source="media/real-time-intelligence-tutorial/configure-source.png" alt-text="Screenshot of the destination window showing the data source connection string." lightbox="media/real-time-intelligence-tutorial/configure-source.png":::

### Inspect

The inspect tab opens with a preview of the data. The tool automatically infers the schema based on your data. No changes are necessary.

:::image type="content" source="media/real-time-intelligence-tutorial/inspect-source.png" alt-text="Screenshot of the inspection window showing the Location data schema.":::

Select **Finish** to complete the ingestion process.

### Summary

In the **Data preparation** window, all three steps are marked with green check marks when the data ingestion finishes.

:::image type="content" source="media/real-time-intelligence-tutorial/summary.png" alt-text="Screenshot of summary page with data ingestion completed."  lightbox="media/real-time-intelligence-tutorial/summary.png":::

Select **Close** to return to the main page of your database.

## Related content

For more information about tasks performed in this tutorial, see:

* [Get data from file](get-data-local-file.md)

## Next step

> [!div class="nextstepaction"]
> [Tutorial part 4: Explore your data with KQL and SQL](tutorial-4-explore.md)
