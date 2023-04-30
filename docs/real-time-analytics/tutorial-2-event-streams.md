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

> [!div class="nextstepaction"]
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

1.  In the Eventstream authoring area, select **New source** and choose
    **Sample data.**

> ![](media/realtime-analytics-tutorial/image17.png)

2.  Enter **nytaxitripsdatasource** as the Source Name, choose **Yellow
    Taxi** from Sample data dropdown.

![](media/realtime-analytics-tutorial/image18.png)

3.  Select **Create**.

4.  In the Eventstream authoring area, select **New destination** and
    choose **KQL Database.**

> ![](media/realtime-analytics-tutorial/image19.png)

5.  Enter **nytaxidatabase** as the destination name, choose your
    Trident workspace from the Workspace dropdown and then choose your
    KQL Database that you created above.

![](media/realtime-analytics-tutorial/image20.png)

6.  Select **Create and configure.**

7.  In the **Destination** tab, select **New table** and enter
    **nyctaxitrips** as the table name.

> ![A screenshot of a computer Description automatically
> generated](media/realtime-analytics-tutorial/image21.png)


8.  Select **Next: Source**.

9.  In the **Source** tab, keep the default values, select **Next:
    Schema.**

![](media/realtime-analytics-tutorial/image22.png)

10. In the **Schema** tab, choose **JSON** as the Data format dropdown.

![](media/realtime-analytics-tutorial/image23.png)

11. After choosing JSON as the Data format, data preview will refresh
    and show the data in strongly typed columns.

![A screenshot of a computer Description automatically
generated](media/realtime-analytics-tutorial/image24.png)

12. In this step, we will change data types of multiple columns.

    a.  Select
        ![](media/realtime-analytics-tutorial/image25.png)

 next to VendorID column name,
        choose **Change data type**, and then choose **int.**

![A screenshot of a computer Description automatically
generated](media/realtime-analytics-tutorial/image26.png)

b.  As shown in the previous step, choose datatype as **long** for the
    columns passenger_count, PULocationID, DOLocationID and
    payment_type.

> ![A screenshot of a computer Description automatically
> generated](media/realtime-analytics-tutorial/image28.png)

c.  As shown in the previous step, choose datatype as **real** for the
    following columns: extra, mta_tax, tolls_amount,
    improvement_surcharge, congestion_charge, airport_fee,
    trip_distance, fare_amount, tip_amount, total_amount

> ![](media/realtime-analytics-tutorial/image29.png)

13. Select **Next: Summary**.

14. In the **Continuous ingestion from Event Stream established**
    window, all steps will be marked with green check marks when the
    data connection is successfully created. The data from Eventstream
    will begin streaming automatically into your table.

![A screenshot of a computer Description automatically generated with
low
confidence](media/realtime-analytics-tutorial/image30.png)


## Next steps

> [!div class="nextstepaction"]
> [Tutorial part 3: Explore data and build report](tutorial-3-explore.md)