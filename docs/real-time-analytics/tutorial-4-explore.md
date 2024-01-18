---
title: Real-Time Analytics tutorial part 4- Explore your data with KQL and SQL
description: Learn how to explore your data using example KQL and SQL queries.
ms.reviewer: tzgitlin
ms.author: yaschust
author: YaelSchuster
ms.topic: tutorial
ms.custom:
  - build-2023
  - ignite-2023
ms.date: 09/28/2023
ms.search.form: Get started
---
# Real-Time Analytics tutorial part 4: Explore your data with KQL and SQL

> [!NOTE]
> This tutorial is part of a series. For the previous section, see: [Tutorial part 3: Get historical data](tutorial-3-get-historical-data.md).

The first step in data analysis is often to take a look at a subset of the data itself. There are several example queries available to you in both SQL and KQL to help you get familiar with the query languages and assist with initial data exploration.

## Sample KQL queries

 A Kusto Query Language (KQL) query is a read-only request to process data and return results. The request is stated in plain text, using a data-flow model that is easy to read, author, and automate. Queries always run in the context of a particular table or database. At a minimum, a query consists of a source data reference and one or more query operators applied in sequence, indicated visually by the use of a pipe character (|) to delimit operators. For more information on the Kusto Query Language, see [Kusto Query Language (KQL) Overview](/azure/data-explorer/kusto/query/index?context=/fabric/context/context).

> [!NOTE]
> The query editor comes with syntax highlighting and IntelliSense, so you can quickly ramp-up your knowledge of the Kusto Query Language.

1. Browse to your KQL database named *NycTaxiDB*.
1. In the **Explorer** pane, select the **More menu** [...] on the **nyctaxitrips** table. Then select **Query table** > **Show any 100 records**.

    :::image type="content" source="media/realtime-analytics-tutorial/kql-sample-queries.png" alt-text="Screenshot of Explorer pane showing the More menu of a table. The option titled Query table is highlighted." lightbox="media/realtime-analytics-tutorial/kql-sample-queries.png":::

    The example opens in the **Explore your data** pane with the table context already populated. This first query uses the [take operator](/azure/data-explorer/kusto/query/takeoperator?context=/fabric/context/context&pivots=fabric) to return a sample number of records, and is useful to get a first look at the data structure and possible values. The autopopulated example queries are automatically run. You can see the query results in the results pane.

    :::image type="content" source="media/realtime-analytics-tutorial/take-100.png" alt-text="Screenshot of first example query result in Synapse Real-Time Analytics in Microsoft Fabric." lightbox="media/realtime-analytics-tutorial/take-100.png":::

1. Return to the Explorer pane to select the next query, which uses the [where operator](/azure/data-explorer/kusto/query/whereoperator?context=/fabric/context/context&pivots=fabric) and [between operator](/azure/data-explorer/kusto/query/betweenoperator?context=/fabric/context/context&pivots=fabric) to return records ingested in the last 24 hours.

    :::image type="content" source="media/realtime-analytics-tutorial/sample-last-24-h.png" alt-text="Screenshot of example query to return records ingested in the last 24 hours." lightbox="media/realtime-analytics-tutorial/sample-last-24-h.png":::

    Notice that the volumes of the streaming data exceed the query limits. This behavior may vary depending on the amount of data streamed into your database.

1. Select the next query in the list of example queries, which uses the [getschema operator](/azure/data-explorer/kusto/query/getschemaoperator?context=/fabric/context/context&pivots=fabric) to retrieve the table schema.

    :::image type="content" source="media/realtime-analytics-tutorial/sample-query-schema.png" alt-text="Screenshot returning example query results of getschema operator." lightbox="media/realtime-analytics-tutorial/sample-query-schema.png":::

1. Select the next query in the list of example queries, which uses the [summarize operator](/azure/data-explorer/kusto/query/summarizeoperator?context=/fabric/context/context&pivots=fabric) to check when the last record was ingested.

    :::image type="content" source="media/realtime-analytics-tutorial/most-recent-record.png" alt-text="Screenshot showing results of most recent record query." lightbox="media/realtime-analytics-tutorial/most-recent-record.png":::

1. Select the next query in the list of example queries, which uses the [count operator](/azure/data-explorer/kusto/query/countoperator?context=/fabric/context/context&pivots=fabric) to return the number of records in the table.

    :::image type="content" source="media/realtime-analytics-tutorial/count-results.png" alt-text="Screenshot of results of count operator." lightbox="media/realtime-analytics-tutorial/count-results.png":::

1. Select the final query in the list of example queries, which uses the [summarize operator](/azure/data-explorer/kusto/query/summarizeoperator?context=/fabric/context/context&pivots=fabric), [count operator](/azure/data-explorer/kusto/query/countoperator?context=/fabric/context/context&pivots=fabric), and [bin function](/azure/data-explorer/kusto/query/binfunction?context=/fabric/context/context&pivots=fabric) to return the number of ingestions per hour.

    :::image type="content" source="media/realtime-analytics-tutorial/summarize-by-ingestion-time.png" alt-text="Screenshot of summarizing by ingestion time in Real-Time Analytics in Microsoft Fabric." lightbox="media/realtime-analytics-tutorial/summarize-by-ingestion-time.png":::

## Example SQL queries

The query editor supports the use of T-SQL in addition to its primary query language, Kusto query language (KQL). While KQL is the recommended query language, T-SQL can be useful for tools that are unable to use KQL. For more information, see [Query data using T-SQL](/azure/data-explorer/t-sql)

1. In the **Explorer** pane, select the **More menu** [**...**] on the **nyctaxitrips** table. Select **Query table** > **SQL** > **Show any 100 records**.

    :::image type="content" source="media/realtime-analytics-tutorial/sql-queries.png" alt-text="Screenshot of example SQL queries." lightbox="media/realtime-analytics-tutorial/sql-queries.png":::

    The query returns a sample number of records.

    :::image type="content" source="media/realtime-analytics-tutorial/sql-top-100.png" alt-text="Screenshot of using a SQL query to take top 100 results." lightbox="media/realtime-analytics-tutorial/sql-top-100.png":::

1. Select the next SQL query to return a count of the total number of records in the table.

    :::image type="content" source="media/realtime-analytics-tutorial/sql-count.png" alt-text="Screenshot of using the count SQL operator in a KQL quick query.":::

## Related content

For more information about tasks performed in this tutorial, see:

* [Syntax conventions](/azure/data-explorer/kusto/query/syntax-conventions?context=/fabric/context/context&pivots=fabric)

## Next step

> [!div class="nextstepaction"]
> [Tutorial part 5: Use advanced KQL queries](tutorial-5-advanced-kql-query.md)
