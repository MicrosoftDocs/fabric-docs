---
title: Create and edit materialized views
description: Learn how to run an aggregation query over a source table using materialized views in Real-Time Intelligence.
ms.reviewer: tzgitlin
ms.author: spelluru
author: spelluru
ms.topic: how-to
ms.custom:
ms.date: 11/19/2024
ms.search.form: Data management
---
# Create and edit materialized views

A materialized view is an aggregation query over a source table, or over another materialized view. It represents a single `summarize` statement. There are two types of materialized views:

* Empty materialized view: it includes records ingested after view creation. A creation of this kind returns immediately, with the view instantly being available for query.
* Materialized view based on existing records in the source table: Creation might take a long while to complete, depending on the number of records in the source table.

For more information on materialized views, see [Materialized view overview](/azure/data-explorer/kusto/management/materialized-views/materialized-view-overview?context=/fabric/context/context).

In this article, you learn how to create materialized views using the `.create materialized-view` command.

For more information on the `.create materialized-view` command, see [.create materialized-view](/azure/data-explorer/kusto/management/materialized-views/materialized-view-create?context=/fabric/context/context).

## Prerequisites

* A [workspace](../fundamentals/create-workspaces.md) with a Microsoft Fabric-enabled [capacity](../enterprise/licenses.md#capacity)
* A [KQL database](create-database.md) with editing permissions

## Materialized view

1. Browse to your KQL database, and select **+New** > **Materialized view**.

    :::image type="content" source="media/materialized-view/materialized-view.png" alt-text="Screenshot of a KQL database landing page showing the New option dropdown menu, with the option titled Materialized view highlighted."  lightbox="media/materialized-view/materialized-view-extended.png":::

    The materialized view command is populated in the **Explore your data** window.

1. Enter the table name and query statement of your materialized view instead of the placeholder text, and then select **Run**.

    :::image type="content" source="media/materialized-view/mv-example.png" alt-text="Screenshot of Explore your data window showing an example of a materialized view command." lightbox="media/materialized-view/mv-example.png":::

    Materialized views appear under **Materialized views** in the **Explorer** pane.

    :::image type="content" source="media/materialized-view/mv-object-tree.png" alt-text="Screenshot of Explorer pane showing the database entities in Real-Time Intelligence. The dropdown list of materialized views is highlighted.":::

## View, edit, or delete a materialized view

To view, edit, or delete an existing materialized view, follow these steps:
1. In the **Explorer** pane, expand the **Materialized views** section, and click on the three dots next to the desired materialized view.
1. From the dropdown menu, choose either:
   1. **Show materialized view script** to view the materialized view script.
   1. **Edit with code** to edit the materialized view script in the **Explore your data** window.
   1. **Delete**
    :::image type="content" source="media/materialized-view/drop-down-menu-materialized.png" alt-text="Screenshot of dropdown menu." lightbox="media/materialized-view/drop-down-menu-materialized.png":::
1. If you modified the materialized view script, select **Run** to apply the changes.

## Related content

* [Materialized views limitations](/azure/data-explorer/kusto/management/materialized-views/materialized-views-limitations?context=/fabric/context/context)
* [Query data in a KQL queryset](kusto-query-set.md)
* [Create stored functions](create-functions.md)
