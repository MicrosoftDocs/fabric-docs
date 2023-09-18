---
title: "Real-Time Analytics tutorial part 2: Get data with Eventstream"
description: Part 2 of the Real-Time Analytics tutorial in Microsoft Fabric.
ms.reviewer: tzgitlin
ms.author: yaschust
author: YaelSchuster
ms.topic: tutorial
ms.custom: build-2023
ms.date: 05/23/2023
ms.search.form: product-kusto
---
# Real-Time Analytics tutorial part 2: Get data with Eventstream

[!INCLUDE [preview-note](../includes/preview-note.md)]

> [!NOTE]
> This tutorial is part of a series. For the previous section, see:  [Tutorial part 1: Create resources](tutorial-1-resources.md).

## Create an eventstream

1. Return to the Real-Time Analytics home page. The **Home** icon directs you to the home page of the experience you're currently using.

    :::image type="icon" source="media/realtime-analytics-tutorial/home-icon.png" border="false":::

1. Under **New**, select **Eventstream (Preview)**.

    :::image type="content" source="media/realtime-analytics-tutorial/new-eventstream.png" alt-text="Screenshot of new eventstream button in Real-Time Analytics in Microsoft Fabric.":::

1. Enter *NyTaxiTripsEventstream* as the eventstream name and select  **Create**.

    When provisioning is complete, the Eventstream landing page is shown.

    :::image type="content" source="media/realtime-analytics-tutorial/new-eventstream-created.png" alt-text="Screenshot of Eventstream landing page after provisioning." lightbox="media/realtime-analytics-tutorial/new-eventstream-created.png":::

## Stream data from Eventstream to your KQL database

1. In the Eventstream authoring area, select **New source** > **Sample data**.
1. Enter **nytaxitripsdatasource** as the Source Name, and then select **Yellow
    Taxi** from the dropdown of **Sample data**.
1. Select **Add**.
1. In the Eventstream authoring area, select **New destination** > **KQL Database**.
1. In the **KQL Database** pane, fill out the fields as follows:

    |Field  | Suggested value  |
    |---------|---------|
    | **Destination name**     |  *nytaxidatabase* |
    | **Workspace**     |   The workspace in which you [created a database](tutorial-1-resources.md#create-a-kql-database).      |
    | **KQL Database**     | *NycTaxiDB* |

1. Select **Add and configure.**

    A data ingestion pane opens with the **Destination** tab selected.

## Configure data loading to the KQL database

1. Select **New table**,  and enter *nyctaxitrips* as the table name.
1. Select **Next: Source** to open the **Source tab**.
1. Review the default values. The data connection name is made from the database name and the eventstream name.

    :::image type="content" source="media/realtime-analytics-tutorial/source-tab.png" alt-text="Screenshot of source tab for event stream in Real-Time Analytics in Microsoft Fabric.":::

1. Select **Next: Schema** to open the **Schema** tab.

## Schema mapping

1. The incoming data source is uncompressed, so keep the **Compression type** as *uncompressed*.
1. From the **Data format** dropdown, select **JSON**.

    :::image type="content" source="media/realtime-analytics-tutorial/data-format-json.png" alt-text="Screenshot of Schema tab with data format JSON selected in Real-Time Analytics in Microsoft Fabric." lightbox="media/realtime-analytics-tutorial/data-format-json.png":::

    Notice that the data preview refreshes and shows the data in columns with the data types automatically identified. Some of these data types need to be changed for later queries. The columns that appear in the preview can be manipulated by selecting the **down arrow** to the right of the column name.

### Change data types

1. Change the following columns to the target types by selecting the **down arrow**> **Change data type**. Verify that the following columns reflect the correct data type:

    :::image type="content" source="media/realtime-analytics-tutorial/change-data-type.png" alt-text="Screenshot of changing data type in data preview in Real-Time Analytics in Microsoft Fabric." lightbox="media/realtime-analytics-tutorial/change-data-type.png":::

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
    | congestion_surcharge | *real*
    | airport_fee | *real*

1. Select **Next: Summary**.

     In the **Continuous ingestion from Eventstream established** window, all steps are marked with green check marks when the data connection is successfully created. The data from Eventstream begins streaming automatically into your table.

> [!NOTE]
> You may need to refresh the page to view your table after the Eventstream connection has been established.

## Related content

For more information about tasks performed in this tutorial, see:

* [Create and manage an eventstream](event-streams/create-manage-an-eventstream.md)
* [Add a sample data as a source](event-streams/add-manage-eventstream-sources.md#add-a-sample-data-as-a-source)
* [Add a KQL database as a destination](event-streams/add-manage-eventstream-destinations.md#add-a-kql-database-as-a-destination)

## Next steps

> [!div class="nextstepaction"]
> [Tutorial part 3: Get historical data](tutorial-3-get-historical-data.md)
