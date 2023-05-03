---
title: "Synapse Real-Time Analytics tutorial part 4: Explore your data with KQL and SQL"
description: Part 4 of the Real-Time Analytics tutorial in Microsoft Fabric
ms.reviewer: tzgitlin
ms.author: yaschust
author: YaelSchuster
ms.topic: tutorial
ms.date: 05/23/2023
ms.search.form: product-kusto
---
# Real-Time Analytics tutorial part 4: Explore your data with KQL and SQL

> [!NOTE]
> This tutorial is part of a series. For the previous section, see: [Tutorial part 3: Get historical data](tutorial-3-get-historical-data.md)

The first step in data analysis is often to take a look at a subset of the data itself. A query is a read-only request to process data and return results. The request is stated in plain text, using a data-flow model that is easy to read, author, and automate. Queries always run in the context of a particular table or database. At a minimum, a query consists of a source data reference and one or more query operators applied in sequence, indicated visually by the use of a pipe character (|) to delimit operators. For more information on the Kusto Query Language, see [Kusto Query Language (KQL) Overview](/azure/data-explorer/kusto/query/index?context=/fabric/context/context).

There are several sample queries available to you in both SQL and KQL to help you get familiar with the query languages and assist with initial data exploration.

## Sample KQL queries

1. In the **Object tree**, select the **more menu** [...] on the **nyctaxitrips** table > **Query table** > **Show any 100 records**. The sample query opens in the **Check your data** pane with the table context already populated. 

    :::image type="content" source="media/realtime-analytics-tutorial/kql-sample-queries.png" alt-text="Screenshot of Object tree showing the More menu of a table. The option titled Query table is highlighted.":::

1. This query uses the [take operator](/azure/data-explorer/kusto/query/takeoperator?context=/fabric/context/context&pivots=fabric) to return a sample number of records, and is useful to get a first look at the data structure and possible values. Place your cursor somewhere within the query and select  **Run** or press **Shift + Enter**.

    :::image type="content" source="media/realtime-analytics-tutorial/take-100.png" alt-text="Screenshot of first sample query result in Synapse Real-Time Analytics in Microsoft Fabric.":::

1. Return to the object tree to paste the next query, which uses the [where operator](/azure/data-explorer/kusto/query/whereoperator?context=/fabric/context/context&pivots=fabric) and [between operator](/azure/data-explorer/kusto/query/betweenoperator?context=/fabric/context/context&pivots=fabric) to return records ingested in the last 24 hours.

    :::image type="content" source="media/realtime-analytics-tutorial/sample-last-24-h.png" alt-text="Screenshot of sample query to return records ingested in the last 24 hours.":::

    Notice that the volumes of the streaming data exceed the query limits. This behavior may vary depending on the amount of data streamed into your database.

1. The next query in the list of sample queries uses the [getschema operator](/azure/data-explorer/kusto/query/getschemaoperator?context=/fabric/context/context&pivots=fabric) to retrieve the table schema. 

    :::image type="content" source="media/realtime-analytics-tutorial/sample-query-schema.png" alt-text="Screenshot returing sample query results of getschema operator. ":::

1. The next query in the list of sample queries uses the [summarize operator](/azure/data-explorer/kusto/query/summarizeoperator?context=/fabric/context/context&pivots=fabric) to check when the last record was ingested.

    :::image type="content" source="media/realtime-analytics-tutorial/most-recent-record.png" alt-text="Screenshot showing results of most recent record query.":::

## Sample SQL queries 

## Next steps

> [!div class="nextstepaction"]
> [Real-Time Analytics tutorial part 5: Use advanced KQL queries](tutorial-5-advanced-kql-query.md)