---
title: Create an empty table
description: Learn how to create an empty table and edit the table schema in Real-Time Intelligence.
ms.reviewer: tzgitlin
ms.author: shsagir
author: shsagir
ms.topic: how-to
ms.custom:
ms.date: 04/29/2025
ms.search.form: Create a table and edit the table schema
---
# Create and edit a table schema

Tables are named entities that hold data. A table has an ordered set of columns, and zero or more rows of data. Each row holds one data value for each column of the table.

In this article, you learn how to create an empty table within the context of a KQL database, and how to edit the schema of an existing table.

## Prerequisites

* A [workspace](../fundamentals/create-workspaces.md) with a Microsoft Fabric-enabled [capacity](../enterprise/licenses.md#capacity)
* A [KQL database](create-database.md) with editing permissions
* Table schema edits aren't supported when there's an active OneLake connection. [Disable OneLake availability](event-house-onelake-availability.md) before [renaming a table](#rename-a-table) or [editing table columns](#edit-table-columns). You can enable it later, and a new copy is saved in OneLake.

## Create an empty table in your KQL database

You can create an empty table without a data source to use as a testing environment, or for ingesting data in a later stage.

If you have a data source or a sample file prepared, you can use Get data to ingest data directly into a new table. For more information, see [Get data overview](get-data-overview.md).

1. Browse to your desired KQL database.

1. Select **+New** > **Table**.

    :::image type="content" source="media/empty-table/new-table.png" alt-text="Screenshot of lower ribbon that shows the dropdown menu of the New button in Real-Time Intelligence. The dropdown option titled Table is highlighted.":::

1. Enter a **Table name** and **Add a table description (optional)**.

    > [!NOTE]
    > Table names can be up to 1,024 characters including alphanumeric, hyphens, and underscores. Special characters aren't supported.
    > There are no known dependencies until a references to the table are created.

     :::image type="content" source="media/empty-table/table-name.png" alt-text="Screenshot of the new table wizard in Real-Time Intelligence. The table name and description is highlighted.":::

1. Start the table schema by entering a **Column name**, and a description (optional).

    > [!NOTE]
    > * The column name should start with a letter, and can contain numbers, periods, hyphens, or underscores.
    > * You need to create at least one column.

1. Select a data **Type** for your column. The default column type is `string` but can be altered in the dropdown menu of the type field.

1. You can continue to build the new table's schema. The options are:

    * Select **+ Add column** to add more columns.
    * Select the delete icon to remove a column you just added.
    * To see a read-only view of the commands that will run to create the table, you can open the  [Command viewer](#command-viewer).

    :::image type="content" source="media/empty-table/table-columns.png" alt-text="Screenshot of the new empty table wizard in Real-Time Intelligence. The Add column, delete, and command viewer options are highlighted.":::

1. Select **Create**.

1. In the success message you can select to add data now or later:

   * Select **Close** to return to the Eventhouse and [Edit the table schema](#edit-table-columns) later.
   * Select **Get Data** to start the ingestion process. For more information, see [Get data overview](get-data-overview.md).

    :::image type="content" source="media/empty-table/table-success.png" alt-text="Screenshot of the success meassage.":::

## Table schema edits and dependencies

Editing the table schema can case ingestion and query failures due to dependencies that reference the table name or the table columns. The implications of schema edits include the following considerations:

> [!CAUTION]
>
> * Existing ingestion update polices, functions, exports, materialized views, and other related operations can also fail.
> * Make sure you also edit the implementation of the update polices, functions, export, and materialized views accordingly.

**Renaming tables and Materialized views**

* By default, all materialized views referencing the old table name directly are updated to point to the new name, in a transactional way.

* If the table name is referenced from a stored function invoked by the view query, you need to update the materialized view reference manually using [.alter materialized-view](/kusto/management/materialized-view-alter?view=microsoft-fabric).

**Renaming columns**

* Renaming a column automatically updates all references to it in ingestion mappings.

* Renaming a column preserves any existing transformations in your mappings.

**Adding columns**

* Adding a new column doesn't update ingestion mappings automatically. If you want the new column to be included, you have to manually update the mappings.

* Editing the schema doesn't update the mapping of incoming data to table columns during ingestion. After adding columns, ensure you update the [mapping](kusto/management/mappings) so data is ingested correctly.

  For more information about updating ingestion mapping, see [.alter ingestion mapping command](/kusto/management/alter-ingestion-mapping-command?view=microsoft-fabric)

**Column type**

Editing a column type isn't supported using the edit table scheme interface, as changing a column type would lead to data loss.

**Removing columns**

* Deleting a column removes the column from all ingestion mappings.

* Deleting a column is irreversible and causes data loss. You won't be able to query data in the removed column.

* If you delete a column, save, and then add it again doesn't restore the data. It behaves as a new column and ingestion mappings aren't updated. You’ll need to manually update the ingestion mappings.

## Rename a table

Renaming a table automatically updates all references to it in your ingestion mappings. In some cases, table mappings and references need manual updating. Review [Table schema edits and dependencies](#table-schema-edits-and-dependencies) before renaming a table.

1. Browse to your desired KQL database, and in the Explorer pane, expand **Tables**.

1. Select a table from the list, and open the More menu* [...].

    :::image type="content" source="media/empty-table/edit-schema.png" alt-text="Screenshot of the table more menu with Edit schema highlighted.":::

1. In the **Edit table schema** window, edit the table name and description (optional).

1. In the **Dependencies** section, review the referenced objects.

    * By default, **Auto update Materialized views** is enabled. You can view the updates to the command in the [Command viewer](#command-viewer).

    * If necessary, disable **Auto update Materialized views**. Ensure you review the implications in [Table schema edits and dependencies](#table-schema-edits-and-dependencies) and manually update the table ingestion mapping if necessary.

    :::image type="content" source="media/empty-table/table-name-update.png" alt-text="Screenshot of Command viewer and the dependencies section with the Auto update Materialized views toggle highlighted.":::

1. Select **Update**, and in the confirmation dialogue, enter the table name again, and select **Edit table schema**.

    :::image type="content" source="media/empty-table/table-name-update-confirm.png" alt-text="Screenshot of the confirmation dialogue with the table name field highlighted.":::

    A table rename success message appears in the main Eventhouse window.

## Edit table columns

Renaming and adding columns to a table automatically updates all references to it in your ingestion mappings. In some cases, table mappings and references need manual updating. Review [Table schema edits and dependencies](#table-schema-edits-and-dependencies) before editing the table columns.

1. Browse to your desired KQL database, and in the Explorer pane, expand **Tables**.

1. Select a table from the list, and open the More menu* [...].

    :::image type="content" source="media/empty-table/edit-schema.png" alt-text="Screenshot of the table more menu with Edit schema highlighted.":::

1. To add a new column, enter a column name at the bottom of the list of columns. The column name should start with a letter, and can contain numbers, periods, hyphens, or underscores.

1. Select a data type for your column. The default column type is `string` but can be altered in the dropdown menu of the **Column type** field.

1. Select **Add column** to add more columns.

1. In the **Dependencies** section, review the referenced objects.

    * By defaut, **Auto update Mappings** is enabled. You can view the updates to the ingestion mapping command in the [Command viewer](#command-viewer).

    * If required, disable **Auto update Mappings**. Ensure you review the implications in [Table schema edits and dependencies](#table-schema-edits-and-dependencies) and manually update the table ingestion mapping if necessary.

    :::image type="content" source="media/empty-table/added-columns-mappings-command-viewer.png" alt-text="Screenshot of the command viewer with auto update mappings enabled in the dependencies section.":::

1. If required, update the data ingestion [mapping](kusto/management/mappings).

## Command viewer

The command viewer shows the commands for creating tables, mapping, and ingesting data in tables.

To open the command viewer, select the **</>** button on the right side of the command viewer. In the command viewer, you can view and copy the automatic commands generated from your inputs.

:::image type="content" source="media/empty-table/empty-command-viewer.png" alt-text="Screenshot of the Command viewer. The Expand button is highlighted." lightbox="media/empty-table/empty-command-viewer.png":::

## Related content

* [Get data from Azure storage](get-data-azure-storage.md)
* [Get data from Amazon S3](get-data-amazon-s3.md)
* [Get data from Azure Event Hubs](get-data-event-hub.md)
* [Get data from OneLake](get-data-onelake.md)
