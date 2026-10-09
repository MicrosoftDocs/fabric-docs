---
title: Edit table schema
description: Learn how to edit the table schema in Real-Time Intelligence.
ms.reviewer: tzgitlin
ms.topic: how-to
ms.date: 08/19/2026
ms.subservice: rti-eventhouse
ms.search.form: Edit the table schema
ai-usage: ai-assisted
---
# Edit a table schema

In this article, you learn how to rename tables and edit the schema of a table by adding, renaming, and removing columns. It outlines the implications and dependencies of table schema changes on referenced objects and mappings.

> [!CAUTION]
>
> * Existing ingestions, ingestion mappings, update policies, functions, exports, materialized views, and other related operations might fail after editing the table schema. See [Dependencies](#dependencies) and make sure you edit the implementation of the ingestion mappings, update policies, functions, export, and materialized views accordingly.

## Dependencies

Editing the table schema can cause ingestion and query failures due to dependencies that reference the table name or the table columns. The following matrix indicates the implications of schema edits.

| Schema edit | Dependency |
|--|--|
| **Renaming tables** | **Materialized views**: </br> * By default, all materialized views that directly reference the old table name are updated to point to the new name, in a transactional way.</br>* If the table name is referenced from a stored function invoked by the view query, you need to update the materialized view reference manually by using [.alter materialized-view](/kusto/management/materialized-views/materialized-view-alter?view=microsoft-fabric&preserve-view=true). |
| **Renaming columns** | * Renaming a column automatically updates all references to it in ingestion mappings.</br>* Renaming a column preserves any existing transformations in your mappings. |
| **Adding columns** | * Adding a new column doesn't automatically update ingestion mappings. If you want the new column to be included, you must manually update the mappings. </br>* Editing the schema doesn't update the mapping of incoming data to table columns during ingestion. </br>* After adding columns, ensure you update the [mapping](/kusto/management/mappings?view=microsoft-fabric&preserve-view=true) so data is ingested correctly.</br> For more information about updating ingestion mapping, see [.alter ingestion mapping command](/kusto/management/alter-ingestion-mapping-command?view=microsoft-fabric&preserve-view=true) |
| **Column type** | Editing a column type isn't supported by using the Edit table schema option, as changing a column type would lead to data loss. |
| **Removing columns** | * Deleting a column removes the column from all ingestion mappings.</br>* Deleting a column is irreversible and causes data loss. You can't query data in the removed column.</br> * **Caution** If you delete a column, save, and then add it again, the data isn't restored. It behaves as a new column and ingestion mappings aren't updated. You need to manually update the ingestion mappings. |

## Prerequisites

* A [workspace](../fundamentals/create-workspaces.md) with a Microsoft Fabric-enabled [capacity](../enterprise/licenses.md#capacity).
* A [KQL database](create-database.md) with editing permissions
* Table schema edits aren't supported when there's an active OneLake connection. [Disable OneLake availability](event-house-onelake-availability.md) before [renaming a table](#rename-a-table) or [editing table columns](#edit-table-columns). You can enable it later, and a new copy is saved in OneLake.

## Rename a table

When you rename a table, all references to that table in your ingestion mappings automatically update. In some cases, you need to manually update table mappings and references. Before renaming a table, review [Dependencies](#dependencies).

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

When you rename or add columns to a table, all references to that table in your ingestion mappings automatically update. In some cases, you need to manually update table mappings and references. Before you edit the table columns, review [Dependencies](#dependencies).

1. Browse to your desired KQL database. In the explorer pane, expand **Tables**.

1. Select a table from the list, and open the **More menu** [**...**].

    :::image type="content" source="media/empty-table/edit-schema.png" alt-text="Screenshot of the table more menu with Edit schema highlighted.":::

1. To add a new column, enter a column name at the bottom of the list of columns. The column name must start with a letter, and can contain numbers, periods, hyphens, or underscores.

1. Select a data type for your column. The default column type is `string` but you can change it in the dropdown menu of the **Column type** field.

1. Select **Add column** to add more columns.

1. In the **Dependencies** section, review the referenced objects.

    * By default, **Auto update Mappings** is enabled. You can view the updates to the ingestion mapping command in the [Command viewer](create-empty-table.md#command-viewer).

    * If necessary, disable **Auto update Mappings**. Make sure you review the implications in [Dependencies](#dependencies) and manually update the table ingestion mapping if necessary.

    :::image type="content" source="media/empty-table/added-columns-mappings-command-viewer.png" alt-text="Screenshot of the command viewer with auto update mappings enabled in the dependencies section.":::

1. If necessary, update the data ingestion [mapping](/kusto/management/mappings?view=microsoft-fabric&preserve-view=true).

## Allow large values for a column

If you expect to ingest large values in a column, you can enable large value support for that column. The system automatically enables large value support for `string` and `dynamic` columns when the schema inference process identifies values larger than 1 MB.

If the schema inference process doesn't identify a large value, you can manually turn on large value support for an existing `string` or `dynamic` column. For more information, see [Large message support (preview)](get-data-overview.md#large-message-support-preview).

> [!NOTE]
> This setting only applies to new data ingested going forward. Previously ingested `string` values are truncated to the limit (the `MaxValueSize` property of the default policy is 1 MB), and `dynamic` values are replaced with null.
> Large Message Support isn't supported for shortcuts (external tables), tables with Query acceleration over OneLake shortcuts. 
> OneLake data availability for tables with large value columns depends on the target size limits.

1. Browse to your desired KQL database. In the explorer pane, expand **Tables**.

1. Select a table from the list, and in the **More menu** [**...**] select **Edit schema**.

1. In the **Edit table schema** window, select the column that holds large values, and turn on **Enable large values**.

:::image type="content" source="media/empty-table/ingest-large-data.png" alt-text="Screenshot of the edit table schema window with the enable large values option highlighted." lightbox="media/empty-table/ingest-large-data.png":::

## Related content

* [Create an empty table](create-empty-table.md)
* Data ingestion [mapping](/kusto/management/mappings?view=microsoft-fabric&preserve-view=true)
