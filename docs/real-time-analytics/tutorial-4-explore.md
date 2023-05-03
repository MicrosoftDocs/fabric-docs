---
title: "Synapse Real-Time Analytics tutorial part 4: Explore your data with KQL and SQL"
description: Part 3 of the Real-Time Analytics tutorial in Microsoft Fabric
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

1. In the **Object tree**, select the **more menu** on the **nyctaxitrips** table > **Query table**. Sample queries run in the context of a selected table.

    :::image type="content" source="media/query-table/query-table.png" alt-text="Screenshot of Object tree showing the More menu of a table. The option titled Query table is highlighted.":::

1. Select **Paste all query templates** to autopopulate all of the listed queries into the **Check your data** window.

    :::image type="content" source="media/query-table/run-query.png" alt-text="Screenshot of the Check your data window showing query results.":::

1. Run each query sequentially by pressing **Run** or **Shift + Enter**. 


## Sample SQL queries 

## Next steps

> [!div class="nextstepaction"]
> [Real-Time Analytics tutorial part 5: Use advanced KQL queries](tutorial-5-advanced-kql-query.md)