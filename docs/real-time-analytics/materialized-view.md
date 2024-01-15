---
title: Create materialized views
description: Learn how to run an aggregation query over a source table using materialized views in Real-Time Analytics.
ms.reviewer: tzgitlin
ms.author: yaschust
author: YaelSchuster
ms.topic: how-to
ms.custom:
  - build-2023
  - ignite-2023
ms.date: 05/23/2023
ms.search.form: Data management
---
# Create materialized views

A materialized view is an aggregation query over a source table, or over another materialized view. It represents a single `summarize` statement. There are two types of materialized views:

* Empty materialized view: it includes records ingested after view creation. A creation of this kind returns immediately, with the view instantly being available for query.
* Materialized view based on existing records in the source table: Creation might take a long while to complete, depending on the number of records in the source table.

For more information on materialized views, see [Materialized view overview](/azure/data-explorer/kusto/management/materialized-views/materialized-view-overview?context=/fabric/context/context).

In this article, you learn how to create materialized views using the `.create materialized-view` command.

For more information on the `.create materialized-view` command, see [.create materialized-view](/azure/data-explorer/kusto/management/materialized-views/materialized-view-create?context=/fabric/context/context).

## Prerequisites

* A [workspace](../get-started/create-workspaces.md) with a Microsoft Fabric-enabled [capacity](../enterprise/licenses.md#capacity)
* A [KQL database](create-database.md) with editing permissions

## Materialized view

1. Browse to your KQL database, and select **+New** > **Materialized view**.

    :::image type="content" source="media/materialized-view/materialized-view.png" alt-text="Screenshot of a KQL database landing page showing the New option dropdown menu, with the option titled Materialized view highlighted."  lightbox="media/materialized-view/materialized-view-extended.png":::

    The materialized view command is populated in the **Explore your data** window.

1. Enter the table name and query statement of your materialized view instead of the placeholder text, and then select **Run**.

    :::image type="content" source="media/materialized-view/mv-example.png" alt-text="Screenshot of Explore your data window showing an example of a materialized view command." lightbox="media/materialized-view/mv-example.png":::

    Materialized views appear under **Materialized views** in the **Explorer** pane.

    :::image type="content" source="media/materialized-view/mv-object-tree.png" alt-text="Screenshot of Explorer pane showing the database entities in Real-Time Analytics. The dropdown list of materialized views is highlighted.":::

## Related content

* [Materialized views limitations](/azure/data-explorer/kusto/management/materialized-views/materialized-views-limitations?context=/fabric/context/context)
* [Query data in a KQL queryset](kusto-query-set.md)
* [Create stored functions](create-functions.md)
