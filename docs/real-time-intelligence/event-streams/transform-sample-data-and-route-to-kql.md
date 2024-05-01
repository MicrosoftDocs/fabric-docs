---
title: Explore and transform sample bike-sharing data with Eventstream for KQL Database integration
description: This article provides instruction on how to explore and transform sample bike-sharing data in Fabric Eventstream and then route the data to KQL Database.
ms.reviewer: spelluru
ms.author: zhenxilin
author: alexlzx
ms.topic: tutorial
ms.custom:
  - ignite-2023
  - ignite-2023-fabric
ms.date: 11/17/2023
ms.search.form: Eventstreams Tutorials
---

# Tutorial: Explore and transform sample bike-sharing data with Eventstream for KQL Database integration

Eventstream is a streaming platform that allows you to ingest, transform, and route data streams to KQL Database using a no-code editor. In this tutorial, we explore sample bike-sharing data to determine the minute-by-minute count of bikes rented on the streets. You learn to use Eventstream's event processor for real-time data transformations and seamlessly directing the processed data to your KQL Database.

## Prerequisites

* Access to a premium workspace with **Contributor** or above permissions where your Eventstream and KQL Database are located.
* A KQL Database created in your workspace.

## Create an eventstream and add sample bike data

Follow these steps to create an eventstream in your workspace:

1. Switch your Power BI experience to **Real-Time Intelligence** and select the **Eventstream** button to create a new one.
2. Name your Eventstream "eventstream-1" and select **Create**.

    :::image type="content" source="./media/transform-sample-data-and-to-kql/create-eventstream.png" alt-text="Screenshot that shows where to add new eventstream." lightbox="./media/transform-sample-data-and-to-kql/create-eventstream.png":::

3. On the Eventstream canvas, expand **New source** and select **Sample data**. Give a name to the source and select **Bicycles** as the sample data.

    :::image type="content" source="./media/transform-sample-data-and-to-kql/add-bike-data.png" alt-text="Screenshot that shows where to add sample data in eventstream." lightbox="./media/transform-sample-data-and-to-kql/add-bike-data.png":::

4. You can preview the data in eventstream to verify if the sample bike data is added successfully.

    :::image type="content" source="./media/transform-sample-data-and-to-kql/preview-eventstream.png" alt-text="Screenshot that shows where to preview data in eventstream." lightbox="./media/transform-sample-data-and-to-kql/preview-eventstream.png":::

    Here's the description of the columns:

    | Column          | Description                               |
    | --------------- | ----------------------------------------- |
    | BikepointID     | ID for the bike docking point       |
    | Street          | Name of the street where the dock is located|
    | Neighbourhood   | Neighbourhood where the dock is located|
    | Latitude        | Latitude of the docking point   |
    | Longitude       | Longitude of the docking point  |
    | No_Bikes        | Number of bikes currently rented            |
    | No_Empty_Docks  | Number of available empty docks at the docking point|

## Add a KQL destination with event processor

1. On the Eventstream canvas, expand the **New destination** drop-down menu and choose **KQL Database**. Enter the necessary details of your KQL Database.

    :::image type="content" source="./media/transform-sample-data-and-to-kql/add-kql-db.png" alt-text="Screenshot that shows where add KQL Database in eventstream." lightbox="./media/transform-sample-data-and-to-kql/add-kql-db.png":::

    * **Data ingestion mode**. There are two ways of ingesting data into KQL Database:
        * **Direct ingestion**: Ingest data directly to a KQL table without any transformation.
        * **Event processing before ingestion**: Transform the data with Event Processor before sending to a KQL table.
        > [!NOTE]
        > You CANNOT edit the ingestion mode once the KQL database destination is added to the eventstream.
    * **Destination name**: Enter a name for this Eventstream destination, such as "kql-dest."
    * **Workspace**: Where your KQL database is located.
    * **KQL database**: Name of your KQL Database.
    * **Destination table**: Name of your KQL table. You can also enter a name to create a new table for example "bike-count."
    * **Input data format**: Choose **JSON** as the data format for your KQL table.

2. In the right pane, scroll down and select **Open event processor**. This action opens a new frame allowing you to add real-time operations to your data streams using a no-code editor.

    :::image type="content" source="./media/transform-sample-data-and-to-kql/open-event-processor.png" alt-text="Screenshot that shows where to open event processor in Eventstream." lightbox="./media/transform-sample-data-and-to-kql/open-event-processor.png":::

3. On the **Event processing editor**, select the line between Eventstream and the KQL Database, and add a **Group by** operation. Our goal is to calculate the number of bikes rented every minute on the street. Under **Aggregation**, select **SUM** for the aggregation and **No_Bikes** for the field.

    :::image type="content" source="./media/transform-sample-data-and-to-kql/configure-group-by.png" alt-text="Screenshot that shows where to group by operation in Eventstream." lightbox="./media/transform-sample-data-and-to-kql/configure-group-by.png":::

    Further down in the **Settings** section, enter the following information and select **Save** to complete the Group by configuration.
    * **Group aggregation by**: Street
    * **Time window**: Tumbling
    * **Duration**: 1 Minute

4. Select the **Group by** operation on the editor and preview the processing result. Then select **Save** to close the Event processor.

    :::image type="content" source="./media/transform-sample-data-and-to-kql/preview-group-by.png" alt-text="Screenshot that shows where to preview group by data in Eventstream." lightbox="./media/transform-sample-data-and-to-kql/preview-group-by.png":::

5. Finally, select **Add** to finish the configuration for KQL database destination.

## View result in the KQL table

Now the KQL Database destination is added to your Eventstream. Let's ensure that the processing results are appropriately stored in the designated KQL table. Follow these steps:

1. On the canvas, select the KQL destination, and select **Open item** to access your KQL Database.

    :::image type="content" source="./media/transform-sample-data-and-to-kql/open-kql-db.png" alt-text="Screenshot that shows where to open KQL Database in Eventstream." lightbox="./media/transform-sample-data-and-to-kql/open-kql-db.png":::

2. Within the KQL database interface, locate the **bike-count** table. Select on **Query table** and choose **Show any 100 records**. This action opens the right pane, allowing you to examine the last 100 records of the table. Here, you can observe the detailed count of bikes rented on each street, minute-by-minute.

    :::image type="content" source="./media/transform-sample-data-and-to-kql/kql-table-result.png" alt-text="Screenshot that shows where to view the table results in KQL Database." lightbox="./media/transform-sample-data-and-to-kql/kql-table-result.png":::

Congratulations!

You successfully completed the tutorial on exploring and transforming bike-sharing data using Eventstream. Keep exploring Eventstream's capabilities and continue your journey with real-time data processing.

## Related content

If you want to learn more about ingesting and processing data streams using Eventstream, check out the following resources:

- [Introduction to Microsoft Fabric eventstreams](./overview.md)
- [Ingest, filter, and transform real-time events and send them to a Microsoft Fabric lakehouse](./transform-and-stream-real-time-events-to-lakehouse.md)
- [Stream real-time events from a custom app to a Microsoft Fabric KQL database](./stream-real-time-events-from-custom-app-to-kusto.md)
