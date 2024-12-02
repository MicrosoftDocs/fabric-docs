---
title: Real-Time Intelligence tutorial part 4 - Query streaming data in a KQL queryset
description: Learn how to query your streaming data in a KQL queryset Real-Time Intelligence.
ms.reviewer: tzgitlin
ms.author: yaschust
author: YaelSchuster
ms.topic: tutorial
ms.custom:
  - build-2024
  - ignite-2024
ms.date: 11/19/2024
ms.subservice: rti-core
ms.collection: ce-skilling-ai-copilot
ms.search.form: Get started
#customer intent: I want to learn how to query my streaming data in a KQL queryset in Real-Time Intelligence.
---
# Real-Time Intelligence tutorial part 4: Query streaming data in a KQL queryset

> [!NOTE]
> This tutorial is part of a series. For the previous section, see: [Real-Time Intelligence tutorial part 3: Transform data in a KQL database](tutorial-3-transform-kql-database.md).

In this part of the tutorial, you learn how to query your streaming data in a [KQL queryset](create-query-set.md). You create a KQL queryset, write a KQL query, and visualize the data in a time chart.

## Create a KQL queryset

1. From the navigation bar, select the KQL database you created in a previous step, named *Tutorial*.
1. From the menu ribbon, select **New related item** and choose **KQL Queryset**.

    :::image type="content" source="media/tutorial/new-queryset.png" alt-text="Screenshot of Tutorial database showing adding a new related item that is a KQL queryset.":::

1. Enter the name for the KQL Queryset: *TutorialQueryset* and select **Create**.
1. Select the *Tutorial* database as the data source for the KQL queryset, then select **Connect**.
1. Select **Create**.
    A new KQL queryset is created and opens in the KQL Queryset editor. It's connected to the *Tutorial* database as a data source, and is pre-populated with several general queries.

## Write a KQL query

The name of the table you created from the update policy in a previous step is *BikesDataTransformed*. Use this (case-sensitive) name as the data source for your query.

> [!TIP]
> If you have a sufficient subscription, you can use the Copilot feature to help you write queries. Copilot provides queries based on data in your table and natural language prompts. For more information, see [Copilot for Real-Time Intelligence (preview)](../get-started/copilot-real-time-analytics.md)

1. In the query editor of your KQL queryset, enter the following query. Then press **Shift + Enter** to run the query.

    ```kusto
    BikesDataTransformed
    | take 10
    ```

    This query returns 10 arbitrary records from the table. What information about the data can you see at a glance? Notice that one of the columns is named *No_Bikes*. This column contains the number of bikes at a bike station. This is a field you may be concerned with if you're tracking the availability of bikes at a station.

1. To see the data in a more visual way, use the **render** operator. Run the following query:

    ```kusto
    BikesDataTransformed
    | where Neighbourhood == "Chelsea"
    | project Timestamp, No_Bikes
    | render timechart
    ```

    This query creates a time chart that shows the number of bikes in the Chelsea neighborhood as a time chart.

    :::image type="content" source="media/tutorial/bikes-timechart.png" alt-text="Screenshot of bikes timechart in Real-Time Intelligence." lightbox="media/tutorial/bikes-timechart.png":::

## Set an alert on a KQL query

In this step, you set an alert on a KQL query to be notified when the number of bikes at a bike station is less than 20. You use the data transformed using the update policy in a previous step.

1. Copy/paste and run the following query:

    ```kusto
    BikesDataTransformed
    | where Action != "NA" and toint(Action) > 20
    ```

1. From the menu ribbon, select **Set alert**.
1. In the **Set alert** pane, enter the following information: 

    | Field | Value |
    | --- | --- |
    | Run query every | *5 minutes* |
    | Check | *On each event* |
    | Action | *Send me an email* |
    | Workspace | *Your workspace* |
    | Item | *Create a new item*
    | New item name | *KQL alert* |

1. Select **Create**.

    You will receive an email alert whenever the query returns a non-null response, meaning the number of bikes at a bike station is greater than 20.

## Query the aggregated bike data

In this step, you query the data that was aggregated in the Eventstream. 

> [!NOTE]
> TODO: Yael's note: I think we can remove this entire sequence of in Eventstream and this query.

1. Copy/paste and run the following query:
    
    ```kusto
    AggregatedBikesData
    | Bike
    | summarize sum(toint(Total_No_Bikes)) by Street
    | top 5 by sum_Total_No_Bikes desc  
    ```
 
    This query returns the top 5 streets with the highest number of bikes from the past 5 minutes.

## Create a materialized view

In this step, you create a materialized view, which returns an up-to-date result of the aggregation query (always fresh). Querying a materialized view is more performant than running the aggregation directly over the source table.

1. Copy/paste and run the following command to create a materialized view that shows the most recent number of bikes at each bike station:

    ``` kusto
    .create materialized-view LatestNumberOfBikesCount_MV on table BikesDataTransformed
    {
        BikesDataTransformed
        | summarize arg_max(Timestamp,No_Bikes) by BikepointID
    }
    ```

1. Copy/paste and run the following query to see the data in the materialized view visualized as a column chart:

    ```kusto
    LatestNumberOfBikesCount_MV
    | sort by BikepointID
    | render columnchart with (ycolumns=No_Bikes,xcolumn=BikepointID)
    ```

You will use this query in the next step to create a Real-Time dashboard.

## Related content

For more information about tasks performed in this tutorial, see:

* [Create a KQL queryset](create-query-set.md)
* [Write a query](kusto-query-set.md#write-a-query)
* [render operator](/azure/data-explorer/kusto/query/renderoperator?pivots=azuredataexplorer?context=/fabric/context/context&pivots=fabric)
* [Materialized views overview](/kusto/management/materialized-views/materialized-view-overview?view=microsoft-fabric&preserve-view=true)
* [Create materialized views](materialized-view.md)

## Next step

> [!div class="nextstepaction"]
> [Tutorial part 5: Create a Real-Time dashboard](tutorial-5-create-dashboard.md)
