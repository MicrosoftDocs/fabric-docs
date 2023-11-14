---
title: Explore and transform sample taxi data in Eventstream for KQL Database integration
description: This article provides instruction on how to explore and transform sample taxi data in Fabric Eventstream and then route them to KQL database.
ms.reviewer: spelluru
ms.author: zhenxilin
author: alexlzx
ms.topic: tutorial
ms.custom:
  - ignite-2023
  - ignite-2023-fabric
ms.date: 11/15/2023
ms.search.form: Event Streams Tutorials
---

# Tutorial: Explore and transform sample taxi data in Eventstream for KQL Database integration

Eventstream is a streaming platform that allows you to ingest, transform, and route data streams to various Fabric destinations such as KQL database. In this tutorial, we work with sample taxi data to find out the earnings of each taxi vendor or company over the past hour. You learn to use Eventstream's event processor for real-time data transformations and route the processed data to your KQL database.

## Prerequisites

* Access to a premium workspace where your Eventstream and KQL Database are located.

## Create an eventstream and add sample taxi data

Follow these steps to create an eventstream in your workspace:

1. Switch your Power BI experience to **Real-time Analytics** and select the **Eventstream** button to create a new one.
2. Name your Eventstream "eventstream-1" and select **Create**.

    :::image type="content" source="./media/transform-taxi-data-and-to-kql/create-eventstream.png" alt-text="Screenshot that shows where to add new eventstream.":::

3. On the Eventstream canvas, expand **New source** and select **Sample data**. Give a name to the source and select **Yellow Taxi** as the sample data.

    :::image type="content" source="./media/transform-taxi-data-and-to-kql/add-taxi-sample.png" alt-text="Screenshot that shows where to add sample data in eventstream.":::

4. You can preview the data in eventstream to verify if the sample taxi data is added successfully.

    :::image type="content" source="./media/transform-taxi-data-and-to-kql/preview-eventstream.png" alt-text="Screenshot that shows where to preview data in eventstream.":::

    Here's a description of the key columns for sample taxi data:

    | Column | Description |
    | ------ | ------------ |
    |VendorID| Taxi company |
    |tpep_pickup_datetime| Taxi pickup time |
    |tpep_dropoff_datetime| Taxi dropoff time |
    |passenger_count| Number of passengers on the trip |
    |trip_distance| Distance traveled during the trip |
    |fare_amount| Taxi fare for the trip |

## Add a KQL destination with event processor

1. On the Eventstream canvas, expand the **New destination** drop-down menu and choose **KQL Database**. Enter the details for your Kusto database.

    :::image type="content" source="./media/transform-taxi-data-and-to-kql/add-kql-db.png" alt-text="Screenshot that shows where add KQL database in eventstream.":::

    * **Data ingestion mode**: There are two ways of ingesting data into KQL database:
        * **Direct ingestion**. Ingest data to a KQL table directly from Eventstream.
        * **Event processing before ingestion**. Transform the data streams with Event Processor before ingesting to a KQL table.
        > [!NOTE]
        > You CANNOT edit the ingestion mode once the KQL database destination is added to the eventstream.
    * **Destination name**: Enter a name for this new destination, such as "kql-destination."
    * **Workspace**: The workspace where your KQL database is located.
    * **KQL database**: Your KQL database.
    * **Destination table**: Select your KQL table. You can also enter a name to create a new one.
    * **Input data format**: Choose **JSON** as the data format for your KQL table.

2. Scroll down the right pane and select **Open event processor**. This action opens a new window allowing you add real-time operations to your data streams using a no-code editor.

    :::image type="content" source="./media/transform-taxi-data-and-to-kql/open-event-processor.png" alt-text="Screenshot that shows where to open event processor in Eventstream.":::

3. Select the eventstream and edit the data type of your columns on the right pane. To find out how much money taxi companies make in the past hour, we need to make sure the **fare_amount** and **passenger_count** are in proper data type for any calculations.

    :::image type="content" source="./media/transform-taxi-data-and-to-kql/change-data-type.png" alt-text="Screenshot that shows where to change data type in Eventstream.":::

    Change the following columns to specified data type:

    | Columns | Data type |
    | ------ | --------- |
    | fare_amount | float |
    | passenger_count | int |
    | EventEnqueuedUtcTime | event time |

4. On the canvas, select the line between Eventstream and the KQL database, and add a **Group by** operation. Then, select **Add aggregate function** to add a new field for computing the sum of taxi fares and another one for the number of passengers.

    :::image type="content" source="./media/transform-taxi-data-and-to-kql/configure-group-by.png" alt-text="Screenshot that shows where to group by operation in Eventstream.":::

    Under the **Settings**, select **VendorID** for Group aggregations by and **Tumbling** for Time window. Enter 1 hour for the duration and select **Save** to complete the Group by configuration.

5. Then you see a **Group by** operation inserted between the Eventstream and the KQL database. Select **Preview** to view the processed result. Select **Done** to close the Event processor.

    :::image type="content" source="./media/transform-taxi-data-and-to-kql/preview-group-by.png" alt-text="Screenshot that shows where to preview group by data in Eventstream.":::

## View result in the KQL table

You successfully added sample taxi data to your Eventstream and used the **Event Processor** to calculate the total taxi fares and passenger counts. The results show that vendor 1 earned $3,365.71 in the past hour with 325 passengers, while vendor 2 earned $9,517 with 1,017 passengers. Your results might differ from this example.

|VendorID | SUM_passenger_count | SUM_fare_amount |
| --- | --- | --- |
|1 | 325 | 3365.71 |
|2 | 1017 | 9517 |

To check if your results are stored in the intended KQL table, you can access your KQL database by selecting the KQL destination on the canvas and clicking **Open** to view your KQL database.

:::image type="content" source="./media/transform-taxi-data-and-to-kql/open-kql-db.png" alt-text="Screenshot that shows where to KQL database in Eventstream.":::

Congratulations!

You successfully completed the tutorial on exploring and transforming sample taxi data using Eventstream. Keep exploring Eventstream's capabilities and continue your journey with real-time data processing.

## Next steps

If you want to learn more about ingesting and processing data streams using Eventstream, check out the following resources:

- [Introduction to Microsoft Fabric Eventstream](./overview.md)
- [Ingest, filter, and transform real-time events and send them to a Microsoft Fabric lakehouse](./transform-and-stream-real-time-events-to-lakehouse.md)
- [Stream real-time events from a custom app to a Microsoft Fabric KQL database](./stream-real-time-events-from-custom-app-to-kusto.md)
