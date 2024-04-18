---
title: Use example queries in Real-Time Analytics
description: Learn how to use example queries to get an initial look at your data in Real-Time Analytics.
ms.reviewer: tzgitlin
ms.author: yaschust
author: YaelSchuster
ms.topic: how-to
ms.custom:
  - build-2023
  - ignite-2023
ms.date: 08/13/2023
ms.search.form: product-kusto
---
# Use example queries

In this article, you learn how to use example KQL queries to get an initial look at your data.

A query is a read-only request to process data and return results. The request is stated in plain text, using a data-flow model that is easy to read, author, and automate. Queries always run in the context of a particular table or database. At a minimum, a query consists of a source data reference and one or more query operators applied in sequence, indicated visually by the use of a pipe character (|) to delimit operators.

For more information on the Kusto Query Language, see [Kusto Query Language (KQL) Overview](/azure/data-explorer/kusto/query/index?context=/fabric/context/context).

To learn how to use example SQL queries, see [Example SQL queries](tutorial-4-explore.md#example-sql-queries).

## Prerequisites

* A [workspace](../get-started/create-workspaces.md) with a Microsoft Fabric-enabled [capacity](../enterprise/licenses.md#capacity)
* A [KQL database](create-database.md) with data

## Query table

1. In the **Explorer** pane, select the **More menu** [...] on a desired table > **Query table**. Example queries run in the context of a selected table.

    :::image type="content" source="media/query-table/query-table.png" alt-text="Screenshot of Explorer pane showing the More menu of a table. The Query table option is highlighted."  lightbox="media/query-table/query-table.png":::

1. Select a single query to populate the **Explore your data** window. The query will automatically run and display results.

    :::image type="content" source="media/query-table/run-query.png" alt-text="Screenshot of the Explore your data window showing query results of example queries in Real-Time Analytics."  lightbox="media/query-table/run-query.png":::

## Related content

* [Query data in a KQL queryset](kusto-query-set.md)
* [Create stored functions](create-functions.md)
