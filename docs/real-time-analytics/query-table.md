---
title: Use sample queries to query your table in Real-Time Analytics
description: Learn how to use sample queries to get an initial look at your data.
ms.reviewer: tzgitlin
ms.author: yaschust
author: YaelSchuster
ms.topic: how-to
ms.date: 05/23/2023
ms.search.form: product-kusto
---
# Use sample queries to query your table

In this article, you'll learn how to use sample KQL queries to get an initial look at your data.

A query is a read-only request to process data and return results. The request is stated in plain text, using a data-flow model that is easy to read, author, and automate. Queries always run in the context of a particular table or database. At a minimum, a query consists of a source data reference and one or more query operators applied in sequence, indicated visually by the use of a pipe character (|) to delimit operators.

For more information on the Kusto Query Language, see [Kusto Query Language (KQL) Overview](/azure/data-explorer/kusto/query/index?context=/fabric/context/context).

## Prerequisites

* [Power BI Premium](/power-bi/enterprise/service-admin-premium-purchase) enabled [workspace](../get-started/create-workspaces.md)
* A [KQL database](create-database.md) with data

## Query table

1. In the **Object tree**, select the **more menu** on your table > **Query table**. Sample queries run in the context of a selected table.

    :::image type="content" source="media/query-table/query-table.png" alt-text="Screenshot of Object tree showing the More menu of a table. The option titled Query table is highlighted.":::

1. Select a single query, or select **Paste all query templates** to autopopulate all of the listed queries into the **Check your data** window, and then select **Run**.

    :::image type="content" source="media/query-table/run-query.png" alt-text="Screenshot of the Check your data window showing query results.":::

    > [!NOTE]
    > If you select **Paste all query templates**, you need to run each query individually.

## Next steps

* [Query data in the KQL Queryset](kusto-query-set.md)
* [Create stored functions](create-functions.md)
