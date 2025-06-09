---
title: Real-Time Intelligence tutorial part 4 - Query streaming data using KQL
description: Learn how to query your streaming data in a KQL queryset Real-Time Intelligence.
ms.reviewer: tzgitlin
ms.author: shsagir
author: shsagir
ms.topic: tutorial
ms.custom:
ms.date: 06/08/2025
ms.subservice: rti-core
ms.collection: ce-skilling-ai-copilot
ms.search.form: Get started
#customer intent: I want to learn how to query my streaming data in a KQL queryset in Real-Time Intelligence.
---
# Real-Time Intelligence tutorial part 4: Query streaming data using KQL

> [!NOTE]
> This tutorial is part of a series. For the previous section, see: [Real-Time Intelligence tutorial part 3: Transform data in a KQL database](tutorial-3-transform-kql-database.md).

In this part of the tutorial, you query your streaming data. You use a few different methods to query- using T-SQL, by using `explain` to convert SQL to KQL. You use the Copilot to generate a KQL query, and also write KQL queries. You also use KQL queries to visualize the data in a time chart.
    

## Write a KQL query

The name of the table you created from the update policy in a previous step is *TransformedData*. Use this table name (case-sensitive) as the data source for your query.

- Enter the following query. Then press **Shift + Enter** to run the query.

    ```kusto
    TransformedData
    | where BikepointID > 100 and Neighbourhood == "Chelsea"
    | project Timestamp, No_Bikes
    | render timechart
    ```

    This query creates a time chart that shows the number of bikes in the Chelsea neighborhood as a time chart.

    :::image type="content" source="media/tutorial/bikes-timechart.png" alt-text="Screenshot of bikes timechart in Real-Time Intelligence." lightbox="media/tutorial/bikes-timechart.png":::

## Create a materialized view

In this step, you create a materialized view, which returns an up-to-date result of the aggregation query (always fresh). Querying a materialized view is more performant than running the aggregation directly over the source table.

1. Copy/paste and run the following command to create a materialized view that shows the most recent number of bikes at each bike station:

    ``` kusto
    .create-or-alter materialized-view with (folder="Gold") AggregatedData on table TransformedData
    {
       TransformedData
       | summarize arg_max(Timestamp,No_Bikes) by BikepointID
    }
    ```

1. Copy/paste and run the following query to see the data in the materialized view visualized as a column chart:

    ```kusto
    AggregatedData
    | sort by BikepointID
    | render columnchart with (ycolumns=No_Bikes,xcolumn=BikepointID)
    ```

You'll use this query in a later step to create a Real-Time dashboard.

> [!IMPORTANT]
> If you missed any of the steps used to create the tables, update policy, function, or materialized views, use this script to create all required resources: [Tutorial commands script](https://github.com/microsoft/fabric-samples/blob/main/docs-samples/real-time-intelligence/tutorial-commands-script.kql).


## Query using T-SQL

The query editor supports the use of T-SQL. 

- Enter the following query. Then press **Shift + Enter** to run the query.
    
    ```kusto
    SELECT top(10) *
    FROM AggregatedData
    ORDER BY No_Bikes DESC
    ```

This query returns the top 10 bike stations with the most bikes, sorted in descending order.

## Convert a SQL query to KQL

To get the equivalent KQL for a T-SQL SELECT statement, add the keyword `explain` before the query. The output will be the KQL version of the query, which can then be copied and run in the KQL query editor.

- Enter the following query. Then press **Shift + Enter** to run the query.

    ```kusto
    explain
    SELECT top(10) *
    FROM AggregatedData
    ORDER BY No_Bikes DESC
    ```

This query returns a KQL equivalent of the T-SQL query you entered. The KQL query is displayed in the output pane. Try copy/pasting the output and running the query. Note that this query may not be written in optimized KQL.
    
## Use Copilot to generate a KQL query

If you're new to writing KQL, you can ask a question in natural language and Copilot will generate the KQL query for you.

1. In the KQL queryset, select the **Copilot** icon from the menu bar.
1. Enter a question in natural language. For example, "Which station has the most bikes right now. Use the materialized view for the most updated data." It can help to include the name of the materialized view in your question.

    The copilot will suggest a query based on your question.
1. Select the **Insert** button to insert the query into the KQL editor.

    :::image type="content" source="media/tutorial/copilot.png" alt-text="Screenshot of copilot dialog.":::

1. Select **Run** to run the query.

You can ask follow-up questions or change the scope of your query. Use this feature to help you learn KQL and to generate queries quickly.

## Related content

For more information about tasks performed in this tutorial, see:

* [Write a query](kusto-query-set.md#write-a-query)
* [render operator](/azure/data-explorer/kusto/query/renderoperator?pivots=azuredataexplorer?context=/fabric/context/context&pivots=fabric)
* [Materialized views overview](/kusto/management/materialized-views/materialized-view-overview?view=microsoft-fabric&preserve-view=true)
* [Create materialized views](materialized-view.md)
* [Query data using T-SQL](/kusto/query/t-sql?view=microsoft-fabric&preserve-view=true)
* [Copilot for Real-Time Intelligence](../fundamentals/copilot-real-time-intelligence.md)

## Next step

> [!div class="nextstepaction"]
> [Tutorial part 5: Create a Real-Time dashboard](tutorial-5-create-dashboard.md)
