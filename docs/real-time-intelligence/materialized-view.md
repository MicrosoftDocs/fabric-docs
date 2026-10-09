---
title: Create and edit materialized views
description: Learn how to run an aggregation query over a source table using materialized views in Real-Time Intelligence.
ms.reviewer: tzgitlin
ms.topic: how-to
ms.subservice: rti-eventhouse
ms.date: 06/15/2026
ms.search.form: Data management
---

# Create and edit materialized views

A materialized view is an aggregation query over a source table, or over another materialized view. It represents a single `summarize` statement. There are two types of materialized views:

* Empty materialized view: it includes records ingested after view creation. Creation of this kind returns immediately, with the view instantly available for query.
* Materialized view based on existing records in the source table: creation might take a long while to complete, depending on the number of records in the source table.

For more information on materialized views, see [Materialized view overview](/azure/data-explorer/kusto/management/materialized-views/materialized-view-overview?context=/fabric/context/context).

In this article, you learn how to create materialized views by using the `.create materialized-view` command.

For more information on the `.create materialized-view` command, see [.create materialized-view](/azure/data-explorer/kusto/management/materialized-views/materialized-view-create?context=/fabric/context/context).

## Prerequisites

* A [workspace](../fundamentals/create-workspaces.md) with a Microsoft Fabric-enabled [capacity](../enterprise/licenses.md#capacity).
* A [KQL database](create-database.md) with editing permissions.

## Materialized view

1. Browse to your KQL database, and select **+ New** > **Materialized view**.

    :::image type="content" source="media/materialized-view/materialized-view.png" alt-text="Screenshot of a KQL database landing page showing the New option dropdown menu, with the option titled Materialized view highlighted."  lightbox="media/materialized-view/materialized-view-extended.png":::

    The materialized view command is populated in the **Explore your data** window.

1. Enter the table name and query statement of your materialized view instead of the placeholder text, and then select **Run**.

    :::image type="content" source="media/materialized-view/materialized-example.png" alt-text="Screenshot of Explore your data window showing an example of a materialized view command." lightbox="media/materialized-view/materialized-example.png":::

    Materialized views appear under **Materialized views** in the **Explorer** pane. See how to organize materialized views in folders in the [Organize materialized views in folders](#organize-materialized-views-in-folders) section below.

    :::image type="content" source="media/materialized-view/materialized-object-tree.png" alt-text="Screenshot of Explorer pane showing the database entities in Real-Time Intelligence. The dropdown list of materialized views is highlighted.":::

## View, edit, or delete a materialized view

To view, edit, or delete an existing materialized view, follow these steps:
1. In the **Explorer** pane, expand the **Materialized views** section, and select the three dots next to the desired materialized view.
1. From the dropdown menu, choose either:
   - **Show materialized view script** to view the materialized view script.
   - **Edit with code** to edit the materialized view script in the **Explore your data** window.
   - **Delete**.

    :::image type="content" source="media/materialized-view/drop-down-menu-materialized.png" alt-text="Screenshot of dropdown menu." lightbox="media/materialized-view/drop-down-menu-materialized.png":::

1. If you modified the materialized view script, select **Run** to apply the changes.

## Organize materialized views in folders

To organize materialized views in folders, follow these steps:

1. In the explorer pane, either:
    * Right-click on the materialized view and select **Move to folder** > **+ New folder**.    
    :::image type="content" source="media/materialized-view/create-materialized-folder.png" alt-text="Screenshot of the pop-up menu showing the option to create a new folder for the materialized view.":::
    * Or, select the ellipsis (...) next to the specific materialized view and select **Move to folder** > **+ New folder** or choose an existing folder.
    :::image type="content" source="media/materialized-view/create-specific-materialized-folder.png" alt-text="Screenshot of the pop-up menu showing the option to move the materialized view to an existing folder or create a new one.":::
1. To create a folder, enter a name for the folder and select **Create**. The materialized view is moved to the new folder.    
    :::image type="content" source="media/materialized-view/materialized-folder-pop-up.png" alt-text="Screenshot of the new folder being created.":::
1. To move more than one materialized view, either enter another folder name or select the dropdown menu and check the boxes next to the materialized views you want to move to the same folder.    
    :::image type="content" source="media/materialized-view/materialized-list.png" alt-text="Screenshot of the pop-up menu showing the option to move multiple materialized views to the same folder.":::
1. You can also move materialized views to an existing folder. To do so, select **Move to folder** and then select the folder you want to move the materialized view to, or drag and drop the materialized view into the folder.

> [!NOTE]
>
> * If you delete a subfolder, the materialized views within the folder aren't deleted but are moved back to the parent folder.
> * A subfolder is automatically deleted when there are no materialized views within the folder.
> * Folders can be created per asset type and the name must be unique per asset type. For example, you can have a table folder and a materialized view folder with the same name, but you can't have two materialized view folders with the same name.

## Related content

* [Materialized views limitations](/azure/data-explorer/kusto/management/materialized-views/materialized-views-limitations?context=/fabric/context/context)
* [Query data in a KQL queryset](kusto-query-set.md)
* [Create stored functions](create-functions.md)
