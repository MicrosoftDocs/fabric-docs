---
title: Real-Time Intelligence tutorial part 3- Query streaming data in a KQL queryset
description: Learn how to query your streaming data in a KQL queryset Real-Time Intelligence.
ms.reviewer: tzgitlin
ms.author: yaschust
author: YaelSchuster
ms.topic: tutorial
ms.custom:
  - build-2024
ms.date: 04/18/2024
ms.search.form: Get started
---
# Real-Time Intelligence tutorial part 3: Query streaming data in a KQL queryset

> [!NOTE]
> This tutorial is part of a series. For the previous section, see: [Tutorial part 2: Get data in the Real-Time Hub](tutorial-2-get-real-time-events.md).

## Create a KQL queryset

1. Browse to the KQL database you have created in a previous step, named *Tutorial*. 
1. Verify that the data is flowing into the database by viewing the **Size** tile in the database details page. The values in this tile should be greater than zero.
1. From the ribbon, select **New related item** and choose **KQL Queryset**.

    :::image type="content" source="media/tutorial/new-queryset.png" alt-text="Screenshot of Tutorial database showing adding a new related item that is a KQL queryset.":::

1. Enter the name for the KQL Queryset: *TutorialQueryset*.
1. Select **Create**.
    A new KQL queryset is created and opens in the KQL Queryset editor. It is connected to the *Tutorial* database as a data source, and is prepopulated with several general queries.

## Write a KQL query

The name of the table you created in a previous step is *TutorialTable*. Use this (case-sensitive) name as the data source for your query.

1. In the query editor, enter the following query. Then press **Shift + Enter** to run the query.

    ```kusto
   TutorialTable
    | take 10
    ```

    This query returns ten arbitrary records from the table. What information about the data can you see at a glance? Notice that one of the columns is named *No_Bikes*. This column contains the number of empty docks at a bike station. This is a field you may be concerned with if you are tracking the availability of bikes at a station.

1. To see the data in a more visual way, use the **render** operator. Run the following query:

    ```kusto
    TutorialTable
    | where Neighbourhood == "Chelsea"
    | project Timestamp, No_Bikes
    | render timechart
    ```

    This query creates a time chart that shows the number of bikes in the Chelsea neighborhood as a time chart.

    :::image type="content" source="media/tutorial/empty-docks-timechart.png" alt-text="Screenshot of empty docks timechart in Real-Time Intelligence.":::

In the next step, you will set an alert on this field to notify you if the number of bikes falls below a certain threshold.

## Related content

For more information about tasks performed in this tutorial, see:

* [Create a KQL queryset](create-query-set.md)
* [Write a query](kusto-query-set.md#write-a-query)
* [render operator](/azure/data-explorer/kusto/query/renderoperator?pivots=azuredataexplorer?context=/fabric/context/context&pivots=fabric)

## Next step

> [!div class="nextstepaction"]
> [Tutorial part 4: Set an alert on your event stream](tutorial-4-set-alert.md)
