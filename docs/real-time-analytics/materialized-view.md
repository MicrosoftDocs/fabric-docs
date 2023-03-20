---
title: Materialized views in Real-Time Analytics
description: Learn how to run an aggregation query over a source table using materialized views.
ms.reviewer: tzgitlin
ms.author: yaschust
author: YaelSchuster
ms.topic: how-to
ms.date: 03/20/2023
ms.search.form: product-kusto
---
# Materialized views

A materialized view is an aggregation query over a source table, or over another materialized view. It represents a single `summarize` statement. There are two types of materialized views:

* Empty materialized view: it includes records ingested after view creation. A creation of this kind returns immediately, with the view instantly being available for query.
* Materialized view based on existing records in the source table: Creation might take a long while to complete, depending on the number of records in the source table.

For more information on materialized views, see [Materialized view overview](/azure/data-explorer/kusto/management/materialized-views/materialized-view-overview?context=/fabric/context/context)

In this article, you'll learn how to create materialized views using the `.create materialized-view` command.

## Prerequisites

* Power BI Premium subscription. For more information, see [How to purchase Power BI Premium](/power-bi/enterprise/service-admin-premium-purchase).
* A Workspace
* A [KQL database](create-database.md)

## Materialized view

1. Select **New** > **Materialized view**.

    :::image type="content" source="media/materialized-view/materialized-view.png" alt-text="Screenshot of the New option dropdown menu. The option titled Materialized view is highlighted.":::

    The materialized view command is automatically populated in the **Check your data** window.

    :::image type="content" source="media/materialized-view/mv-command.png" alt-text="Screenshot of Check your data window showing the Materialized view command.":::

1. Enter the parameters of your materialized view, and then select **Run**.

    :::image type="content" source="media/materialized-view/mv-example.png" alt-text="Screenshot of Check your data window showing an example of a materialized view command.":::

    Materialized views appear under **Materialized views** in the **Object tree**

    :::image type="content" source="media/materialized-view/mv-object-tree.png" alt-text="Screenshot of Object tree showing the database entities. The dropdown list of Materialized view is highlighted.":::

## Next steps

[Query data in the KQL Queryset](kusto-query-set.md)
