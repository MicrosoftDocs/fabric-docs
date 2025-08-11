---
title: Edit table schema
description: Learn how to edit the table schema in Real-Time Intelligence.
ms.reviewer: tzgitlin
ms.author: spelluru
author: spelluru
ms.topic: how-to
ms.custom:
ms.date: 04/29/2025
ms.search.form: Edit the table schema
---
# Edit a table schema

In this article, you learn how to rename tables and edit the schema of a table by adding, renaming, and removing columns. The implications and dependencies of table schema changes on referenced objects and mappings are outlined.

> [!CAUTION]
>
> * Existing ingestions, ingestion mappings, update polices, functions, exports, materialized views, and other related operations might fail after editing the table schema. See [Dependencies](#dependencies) and make sure you edit the implementation of the ingestion mappings, update polices, functions, export, and materialized views accordingly.

## Dependencies

Editing the table schema can cause ingestion and query failures due to dependencies that reference the table name or the table columns. The implications of schema edits are indicated in the following matrix.

| Schema edit | Dependency |
|--|--|
| **Renaming tables** | **Materialized views**: </br> * By default, all materialized views referencing the old table name directly are updated to point to the new name, in a transactional way.</br>* If the table name is referenced from a stored function invoked by the view query, you need to update the materialized view reference manually using [.alter materialized-view](/kusto/management/materialized-views/materialized-view-alter?view=microsoft-fabric&preserve-view=true). |
| **Renaming columns** | * Renaming a column automatically updates all references to it in ingestion mappings.</br>* Renaming a column preserves any existing transformations in your mappings. |
| **Adding columns** | * Adding a new column doesn't update ingestion mappings automatically. If you want the new column to be included, you must manually update the mappings. </br>* Editing the schema doesn't update the mapping of incoming data to table columns during ingestion. </br>* After adding columns, ensure you update the [mapping](/kusto/management/mappings?view=microsoft-fabric&preserve-view=true) so data is ingested correctly.</br> For more information about updating ingestion mapping, see [.alter ingestion mapping command](/kusto/management/alter-ingestion-mapping-command?view=microsoft-fabric&preserve-view=true) |
| **Column type** | Editing a column type isn't supported using the Edit table schema option, as changing a column type would lead to data loss. |
| **Removing columns** | * Deleting a column removes the column from all ingestion mappings.</br>* Deleting a column is irreversible and causes data loss. You can't query data in the removed column.</br> * **Caution** If you delete a column, save, and then add it again, the data isn't restored. It behaves as a new column and ingestion mappings aren't updated. You’ll need to manually update the ingestion mappings. |

## Prerequisites

* A [workspace](../fundamentals/create-workspaces.md) with a Microsoft Fabric-enabled [capacity](../enterprise/licenses.md#capacity)
* A [KQL database](create-database.md) with editing permissions
* Table schema edits aren't supported when there's an active OneLake connection. [Disable OneLake availability](event-house-onelake-availability.md) before [renaming a table](#rename-a-table) or [editing table columns](#edit-table-columns). You can enable it later, and a new copy is saved in OneLake.

## Rename a table

Renaming a table automatically updates all references to it in your ingestion mappings. In some cases, table mappings and references need manual updating. Review [Dependencies](#dependencies) before renaming a table.

1. Browse to your desired KQL database, and in the Explorer pane, expand **Tables**.

1. Select a table from the list, and open the **More menu** [**...**].

    :::image type="content" source="media/empty-table/edit-schema.png" alt-text="Screenshot of the table more menu with Edit schema highlighted.":::

1. In the **Edit table schema** window, edit the table name. Optionally, edit the table description.

    :::image type="content" source="media/empty-table/table-edit-schema-2.png" alt-text="Screenshot of the edit table schema with the table name field highlighted.":::

1. In the **Dependencies** section, review the referenced objects.

    * By default, **Auto update Materialized views** is enabled. You can view the updates to the command in the [Command viewer](create-empty-table.md#command-viewer).

    * If necessary, disable **Auto update Materialized views**. Make sure you review the implications in [Dependencies](#dependencies) and manually update the table ingestion mapping if necessary.

    :::image type="content" source="media/empty-table/table-name-update.png" alt-text="Screenshot of Command viewer and the dependencies section with the Auto update Materialized views toggle highlighted.":::

1. Select **Update**, and in the confirmation window, enter the table name again, and select **Edit table schema**.

    :::image type="content" source="media/empty-table/table-name-update-confirm.png" alt-text="Screenshot of the confirmation window with the table name field highlighted.":::

## Edit table columns

Renaming and adding columns to a table automatically updates all references to it in your ingestion mappings. In some cases, table mappings and references need manual updating. Review [Dependencies](#dependencies) before editing the table columns.

1. Browse to your desired KQL database, and in the explorer pane, expand **Tables**.

1. Select a table from the list, and open the **More menu** [**...**].

    :::image type="content" source="media/empty-table/edit-schema.png" alt-text="Screenshot of the table more menu with Edit schema highlighted.":::

1. To add a new column, enter a column name at the bottom of the list of columns. The column name must start with a letter, and can contain numbers, periods, hyphens, or underscores.

1. Select a data type for your column. The default column type is `string` but can be altered in the dropdown menu of the **Column type** field.

1. Select **Add column** to add more columns.

1. In the **Dependencies** section, review the referenced objects.

    * By default, **Auto update Mappings** is enabled. You can view the updates to the ingestion mapping command in the [Command viewer](create-empty-table.md#command-viewer).

    * If necessary, disable **Auto update Mappings**. Make sure you review the implications in [Dependencies](#dependencies) and manually update the table ingestion mapping if necessary.

    :::image type="content" source="media/empty-table/added-columns-mappings-command-viewer.png" alt-text="Screenshot of the command viewer with auto update mappings enabled in the dependencies section.":::

1. If necessary, update the data ingestion [mapping](/kusto/management/mappings?view=microsoft-fabric&preserve-view=true).

## Related content

* [Create an empty table](create-empty-table.md)
* Data ingestion [mapping](/kusto/management/mappings?view=microsoft-fabric&preserve-view=true)
