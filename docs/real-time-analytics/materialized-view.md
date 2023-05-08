---
title: Create materialized views in Real-Time Analytics
description: Learn how to run an aggregation query over a source table using materialized views in Real-Time Analytics.
ms.reviewer: tzgitlin
ms.author: yaschust
author: YaelSchuster
ms.topic: how-to
ms.date: 05/23/2023
ms.search.form: product-kusto
---
# Create materialized views

A materialized view is an aggregation query over a source table, or over another materialized view. It represents a single `summarize` statement. There are two types of materialized views:

* Empty materialized view: it includes records ingested after view creation. A creation of this kind returns immediately, with the view instantly being available for query.
* Materialized view based on existing records in the source table: Creation might take a long while to complete, depending on the number of records in the source table.

For more information on materialized views, see [Materialized view overview](/azure/data-explorer/kusto/management/materialized-views/materialized-view-overview?context=/fabric/context/context)

In this article, you'll learn how to create materialized views using the `.create materialized-view` command.

For more information on the `.create materialized-view` command, see [.create materialized-view](/azure/data-explorer/kusto/management/materialized-views/materialized-view-create?context=/fabric/context/context)

[!INCLUDE [preview-note](../includes/preview-note.md)]

## Prerequisites

* A [workspace](../get-started/create-workspaces.md) with a Microsoft Fabric-enabled [capacity](../enterprise/licenses.md#capacity)
* A [KQL database](create-database.md)

## Materialized view

1. Select **New** > **Materialized view**.

    :::image type="content" source="media/materialized-view/materialized-view.png" alt-text="Screenshot of the New option dropdown menu in Real-Time Analytics. The option titled Materialized view is highlighted.":::

    The materialized view command is automatically populated in the **Explore your data** window.

1. Enter the parameters of your materialized view, and then select **Run**.

    :::image type="content" source="media/materialized-view/mv-example.png" alt-text="Screenshot of Check your data window showing an example of a materialized view command.":::

    Materialized views appear under **Materialized views** in the **Data tree**

    :::image type="content" source="media/materialized-view/mv-object-tree.png" alt-text="Screenshot of Data tree showing the database entities in Real-Time Analytics. The dropdown list of materialized views is highlighted.":::

## Next steps

* [Materialized views limitations](/azure/data-explorer/kusto/management/materialized-views/materialized-views-limitations?context=/fabric/context/context)
* [Query data in the KQL Queryset](kusto-query-set.md)
* [Create stored functions](create-functions.md)
