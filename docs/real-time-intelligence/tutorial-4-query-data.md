---
title: Real-Time Intelligence tutorial part 4 - Query streaming data in a KQL queryset
description: Learn how to query your streaming data in a KQL queryset Real-Time Intelligence.
ms.reviewer: tzgitlin
ms.author: yaschust
author: YaelSchuster
ms.topic: tutorial
ms.custom:
  - build-2024
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

## Write a KQL query

The name of the table you created from the update policy in a previous step is *BikesDataTransformed*. Use this (case-sensitive) name as the data source for your query.

> [!TIP]
> If you have a sufficient subscription, you can use the Copilot feature to help you write queries. Copilot provides queries based on data in your table and natural language prompts. For more information, see [Copilot for Real-Time Intelligence (preview)](../get-started/copilot-real-time-analytics.md)

1. In the query editor, enter the following query. Then press **Shift + Enter** to run the query.

    ```kusto
    BikesDataTransformed
    | take 10
    ```

    This query returns 10 arbitrary records from the table. What information about the data can you see at a glance? Notice that one of the columns is named *No_Bikes*. This column contains the number of empty docks at a bike station. This is a field you may be concerned with if you're tracking the availability of bikes at a station.

1. To see the data in a more visual way, use the **render** operator. Run the following query:

    ```kusto
    BikesDataTransformed
    | where Neighbourhood == "Chelsea"
    | project Timestamp, No_Bikes
    | render timechart
    ```

    This query creates a time chart that shows the number of bikes in the Chelsea neighborhood as a time chart.

    :::image type="content" source="media/tutorial/empty-docks-timechart.png" alt-text="Screenshot of empty docks timechart in Real-Time Intelligence." lightbox="media/tutorial/empty-docks-timechart.png":::

## Create a materialized view

In this step, you create a materialized view, which returns an up-to-date result of the aggregation query (always fresh). Querying a materialized view is more performant than running the aggregation directly over the source table.

1. Copy/paste and run the following command to create a materialized view that shows the most recent number of empty docks at each bike station:

    ``` kusto
    .create materialized-view LatestEmptyDocksCount_MV on table BikesDataTransformed
    {
        BikesDataTransformed
        | summarize arg_max(Timestamp,No_Bikes) by BikepointID
    }
    ```

1. Copy/paste and run the following query to see the data in the materialized view visualized as a column chart:

    ```kusto
    LatestEmptyDocksCount_MV
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
