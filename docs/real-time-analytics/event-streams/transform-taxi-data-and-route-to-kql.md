---
title: Explore and Transform Sample Taxi Data in Eventstream for KQL Database Integration
description: This article provides instruction on how to explore and transform sample taxi data in Fabric Eventstream and then route them to KQL database. 
ms.reviewer: spelluru
ms.author: zhenxilin
author: alexlzx
ms.topic: tutorial
ms.custom: 
ms.date: 10/31/2023
ms.search.form: Event Streams Tutorials

---

# Tutorial: Explore and Transform Sample Taxi Data in Eventstream for KQL Database Integration

Eventstream is a streaming platform enabling you to ingest, transform, and route data streams to various Fabric destinations such as KQL database. In this tutorial, we work with sample taxi data streams and find out how much money taxi vendors (or drivers) make in the past hour. You learn to use Eventstream’s event processor for real-time data transformations and route the data to your KQL database.

## Prerequisites

* Access to a premium workspace where your Eventstream and KQL Database are located.

## Create an eventstream and add sample taxi data

Follow these steps to create an eventstream in your workspace:

1. Switch your Power BI experience to **Real-time Analytics** and select the **Eventstream** button to create a new one.
2. Name your Eventstream "eventstream-1" and select **Create**.

    :::image type="content" source="./media/transform-taxi-data-and-to-kql/create-eventstream.png" alt-text="Screenshot that shows where to add new eventstream.":::

3. In the Eventstream canvas, expand **New source** and select **Sample data**. Give a name to the source, select **Taxi** as the sample data.

    :::image type="content" source="./media/transform-taxi-data-and-to-kql/add-taxi-sample.png" alt-text="Screenshot that shows where to add sample data in eventstream.":::

4. You can preview the data in eventstream to verify if the sample taxi data is added successfully.

    :::image type="content" source="./media/transform-taxi-data-and-to-kql/preview-eventstream.png" alt-text="Screenshot that shows where to preview data in eventstream.":::

    Here's a description of the key columns for sample taxi data:
    | Column | Description |
    | ------ | ------------ |
    |VendorID| Each ID stands for one vendor or driver |
    |tpep_pickup_datetime| Taxi pickup time |
    |tpep_dropoff_datetime| Taxi dropoff time |
    |passenger_count| Number of passengers on the trip |
    |trip_distance| Distance traveled |
    |fare_amount| Taxi fare for the trip |
    |total_amount| Total taxi fares |

## Add a KQL destination with event processor

1. In the Eventstream editor, expand the **New destination** drop-down menu and choose **KQL Database**. Enter the details for your Kusto database.

    :::image type="content" source="./media/transform-taxi-data-and-to-kql/add-kql-db.png" alt-text="Screenshot that shows where add KQL database in eventstream.":::

    * **Data ingestion mode**: We support two ways of ingesting data into KQL database:
        * **Direct ingestion**. Ingest Eventstream data to a KQL table directly.
        * **Event processing before ingestion**. Allow you transform the data streams using Event Processor before ingesting to KQL database.
        > [!NOTE]
        > You CANNOT edit the ingestion mode once the KQL database is added to the eventstream.
    * **Destination name**: Enter a name for this new destination, such as "kql-destination."
    * **Workspace**: Select the workspace associated with your KQL database.
    * **KQL database**: Select your KQL database.
    * **Destination table**: Select a KQL table and enter a name to create a new one.
    * **Input data format**: Choose **JSON** as the data format for your KQL table.

2. Scroll down the configuration pane and select **Event processor**, which opens a new window allowing you add real-time operations to your data streams using a no-code editor.

    :::image type="content" source="./media/transform-taxi-data-and-to-kql/open-event-processor.png" alt-text="Screenshot that shows where to open event processor in Eventstream.":::

3. Select the eventstream in the canvas and edit the data type for your data schema. To find out how much money taxi drivers make in the past hour, we need to make sure the **fare_amount** and **passenger_count** are in proper data type for any calculations.

    :::image type="content" source="./media/transform-taxi-data-and-to-kql/change-data-type.png" alt-text="Screenshot that shows where to change data type in Eventstream.":::

    | Schema | Data type |
    | ------ | --------- |
    | fare_amount | float |
    | passenger_count | int |
    | EventEnqueuedUtcTime | event time |

4. Select the line between Eventstream and KQL database and add a **Group by** operation. On the right pane, select **Add aggregation function** to add a new field for the sum of taxi fares and another one for the number of passengers.

    :::image type="content" source="./media/transform-taxi-data-and-to-kql/configure-group-by.png" alt-text="Screenshot that shows where to group by operation in Eventstream.":::

    Scroll down to the **Settings** section, select **VendorID** for Group by and **Tumbling** for Time window. Choose 1 hour for the duration.

5. You can see a **Group by** operation between the Eventstream and the KQL database in the canvas. Select **Preview** to view the computed result. Select "Done" to close the Event processor.

    :::image type="content" source="./media/transform-taxi-data-and-to-kql/preview-group-by.png" alt-text="Screenshot that shows where to preview group by data in Eventstream.":::

## View result in the KQL table

You successfully added sample taxi data to your Eventstream and used the **Event Processor** to calculate the total taxi fares and passenger counts. The results show that vendor 1 earned $3,741.20 in the past hour with 361 passengers, while vendor 2 earned $12,113.40 with 1,035 passengers. Your results might differ from this example.

|VendorID | SUM_passenger_count | SUM_fare_amount |
| --- | --- | --- |
|1 | 361 | 3741.2 |
|2 |1035 | 12113.4 |

To check if your results are stored in the intended KQL table, you can access your KQL database by selecting the KQL destination on the canvas and clicking **Open** to view your KQL database.

:::image type="content" source="./media/transform-taxi-data-and-to-kql/open-kql-db.png" alt-text="Screenshot that shows where to KQL database in Eventstream.":::

## Next steps

If you want to learn more about ingesting and processing data streams using Eventstream, check out the following resources:

- [Introduction to Microsoft Fabric Eventstream](./overview.md)
- [Ingest, filter, and transform real-time events and send them to a Microsoft Fabric lakehouse](./transform-and-stream-real-time-events-to-lakehouse.md)
- [Stream real-time events from a custom app to a Microsoft Fabric KQL database](./stream-real-time-events-from-custom-app-to-kusto.md)
