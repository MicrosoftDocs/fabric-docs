---
title: Real-Time Intelligence tutorial part 4- Query your streaming data
description: Learn how to Query your streaming data Real-Time Intelligence.
ms.reviewer: tzgitlin
ms.author: yaschust
author: YaelSchuster
ms.topic: tutorial
ms.custom:
  - build-2024
ms.date: 04/18/2024
ms.search.form: Get started
---
# Real-Time Intelligence tutorial part 4: Query your streaming data

> [!NOTE]
> This tutorial is part of a series. For the previous section, see: [Tutorial part 2: Get data in the Real-Time Hub](tutorial-2-get-real-time-events.md).

## Create a KQL queryset

1. Browse to the KQL database you have created in a previous step, named *Tutorial*. 
1. Verify that the data is flowing into the database by viewing the **Size** tile in the database details page. The values in this tile should be greater than zero.
1. From the ribbon, select **New related item** and choose **KQL Queryset**.
1. Enter the name for the KQL Queryset: *TutorialQueryset*.
1. Select **Create**.
    A new KQL queryset is created and opens in the KQL Queryset editor. It is connected to the *Tutorial* database as a data source, and is prepopulated with several general queries.

### Write your first query

The name of the table you created in a previous step is *TutorialTable*. Use this (case-sensitive) name as the data source for your query.

1. In the query editor, enter the following query. Then press **Shift + Enter** to run the query.

    ```kql
   TutorialTable
    | take 10
    ```

    This query returns ten arbitrary records from the table. What information about the data can you see at a glance?
1. Notice that one of the columns is named *No_Empty_Docks*. This column contains the number of empty docks at a bike station. This is a field you may be concerned with if you are tracking the availability of bikes at a station.
1. To see the data in a more visual way, use the **render** operator. Run the following query:

    ```kql
    TutorialTable
    | project Timestamp, No_Empty_Docks
    | render timechart 
    ```

    This query creates a time chart that shows the number of empty docks at each timestamp for any station.
     
    :::image type="content" source="media/tutorial/empty-docks-timechart.png" alt-text="Screenshot of empty docks timechart in Real-Time Intelligence.":::



## Related content

For more information about tasks performed in this tutorial, see:

* [Create a KQL queryset](create-query-set.md)
* [Write a query](kusto-query-set.md#write-a-query)
* [render operator](/azure/data-explorer/kusto/query/renderoperator?pivots=azuredataexplorer?context=/fabric/context/context&pivots=fabric)

## Next step

> [!div class="nextstepaction"]
> 
