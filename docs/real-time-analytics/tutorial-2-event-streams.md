---
title: "Synapse Real-Time Analytics tutorial part 2: Get data with Event streams"
description: Part 2 of the Real-Time Analytics tutorial in Microsoft Fabric
ms.reviewer: tzgitlin
ms.author: yaschust
author: YaelSchuster
ms.topic: tutorial
ms.date: 05/23/2023
ms.search.form: product-kusto
---
# Real-Time Analytics tutorial part 2: Get data with Event streams

 This tutorial is part of a series. For the previous section, see:
 
>[!div class="nextstepaction"]
> [Tutorial part 1: Create resources](tutorial-1-resources.md)

## Create an Eventstream

1.  Return to the Fabric home page.

    :::image type="icon" source="media/realtime-analytics-tutorial/home-icon.png" border="false":::

1.  Select **New > Eventstream (Preview)**

    :::image type="content" source="media/realtime-analytics-tutorial/new-eventstream.png" alt-text="Screenshot of new eventstream button.":::

1.  Enter *NyTaxiTripsEventstream* as the Eventstream name and select  **Create**.

    When provisioning is complete, the Eventstream landing page will be shown.

    :::image type="content" source="media/realtime-analytics-tutorial/new-eventstream-created.png" alt-text="Screenshot of Eventstream landing page after provisioning." lightbox="media/realtime-analytics-tutorial/new-eventstream-created.png":::

## Stream data from Eventstream to your KQL database

1.  In the Eventstream authoring area, select **New source** > **Sample data**.

    :::image type="content" source="media/realtime-analytics-tutorial/new-sample-data.png" alt-text="Screenshot of new source - sample data.":::

1.  Enter **nytaxitripsdatasource** as the Source Name, choose **Yellow
    Taxi** from Sample data dropdown.
1.  Select **Create**.
1.  In the Eventstream authoring area, select **New destination** > **KQL Database**.
1.  In the **KQL Database** pane, fill out the fields as follows:

    
    |Field  | Suggested value  |
    |---------|---------|
    | **Destination name**     |  *nytaxidatabase* |
    | **Workspace**     |   The workspace in which you [created a database](tutorial-1-resources.md#create-a-kql-database).      |
    | **KQL Database**     | *NycTaxiDB* |
    
1.  Select **Create and configure.**

    A data ingestion pane opens with the **Destination** tab selected.

## Configure data loading to the KQL database

1.  Select **New table**,  and enter *nyctaxitrips* as the table name.
1.  Select **Next: Source**.
    The **Source** tab opens.
1.  Review the default values. Notice that the data connection name is made from the database name and the Event stream name.

    :::image type="content" source="media/realtime-analytics-tutorial/source-tab.png" alt-text="Screenshot of source tab for event stream.":::

1. Select **Next: Schema.**
    The **Schema** tab opens.

## Schema mapping

1. The incoming data source is uncompressed, so don't change thee **Compression type**.
1. In the **Data format** dropdown, select **JSON**.
     
    :::image type="content" source="media/realtime-analytics-tutorial/data-format-json.png" alt-text="Screenshot of Schema tab with data format JSON selected.":::

    Notice that the data preview will refresh and show the data in columns with the data types automatically identified. Some of these data types will need to be changed for later queries. The columns that appear in the preview can be manipulated by selecting the **down arrow** to the right of the column name.

### Change data types

1. Change the following columns to the target types by selecting the **down arrow**> **Change data type**. Verify that the following columns reflect the correct data type:

    :::image type="content" source="media/realtime-analytics-tutorial/change-data-type.png" alt-text="Screenshot of changing data type in data preview.":::
    
    | Column name | Target data type|
    |--|--|
    | VendorID | *int* |
    | passenger_count | *long*
    | trip_distance | *real*
    | PULocationID | *long*
    | DOLocationID | *long*
    | payment_type | *real*
    | fare_amount | *real*
    | extra | *real*
    | mta_tax | *real*
    | tip_amount | *real*
    | tolls_amount | *real*
    | improvement_surcharge | *real*
    | total_amount | *real*
    | congestion_charge | *real*
    | airport_fee | *real*

1. Select **Next: Summary**.

 In the **Continuous ingestion from Event Stream established** window, all steps will be marked with green check marks when the data connection is successfully created. The data from Eventstream will begin streaming automatically into your table.

## Next steps

> [!div class="nextstepaction"]
> [Tutorial part 3: Explore data and build report](tutorial-3-explore.md)