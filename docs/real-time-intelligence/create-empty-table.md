---
title: Create an empty table
description: Learn how to create an empty table and edit the table schema in Real-Time Intelligence.
ms.reviewer: tzgitlin
ms.author: shsagir
author: shsagir
ms.topic: how-to
ms.custom:
ms.date: 04/24/2025
ms.search.form: Create a table and edit the table schema
---
# Create and edit a table schema

Tables are named entities that hold data. A table has an ordered set of columns, and zero or more rows of data. Each row holds one data value for each of the columns of the table. The order of rows in the table is unknown, and doesn't in general affect queries, except for some tabular operators (such as the top operator) that are inherently undetermined.

You can create an empty table without a data source to use as a testing environment, or for ingesting data in a later stage. In this article, you learn how to create an empty table within the context of a KQL database.

## Prerequisites

* A [workspace](../fundamentals/create-workspaces.md) with a Microsoft Fabric-enabled [capacity](../enterprise/licenses.md#capacity)
* A [KQL database](create-database.md) with editing permissions

## Create an empty table in your KQL database

1. Browse to your desired KQL database.
1. Select **+New** > **Table**.

    :::image type="content" source="media/empty-table/new-table.png" alt-text="Screenshot of lower ribbon that shows the dropdown menu of the New button in Real-Time Intelligence. The dropdown option titled Table is highlighted.":::

1. Enter a name and description for your table.

    > [!NOTE]
    > Table names can be up to 1024 characters including alphanumeric, hyphens, and underscores. Special characters aren't supported.
    > There are no known [dependencies](#dependencies) until a table with references is created.

     :::image type="content" source="media/empty-table/table-name.png" alt-text="Screenshot of the new table wizard in Real-Time Intelligence. The table name is highlighted.":::

1. Enter a column name. The column name should start with a letter, and can contain numbers, periods, hyphens, or underscores.

1. Select a data type for your column. The default column type is `string` but can be altered in the dropdown menu of the **Column type** field.

1. You can manage the columns of the new table in this window. The options are:

    * Select **Add column** to add more columns.
    * Select the delete icon to delete a column.
    * Toggle betwen the [Command viewer](#command-viewer) and the Add column view.

    :::image type="content" source="media/empty-table/table-columns.png" alt-text="Screenshot of the new empty table wizard in Real-Time Intelligence. The Add column, delete, and command viewer options are highlighted.":::

1. Select **Create**.

1. In the success message you see you can **Close** the wizard and return to the event house and [Edit the table schema](#edit-the-table-schema) later, or you can select **Get Data** to start the ingestion process. For more information, see [Get data overview](get-data-overview.md).

    :::image type="content" source="media/empty-table/table-success.png" alt-text="Screenshot of the success meassage.":::

## Edit the table schema

You can manually define or edit the table schema a table.  When editing the schema you can:

* Edit the table name
* Edit the table descrption
* Edit column names
* Add columns and define their type
* Remove columns

> [!IMPORTANT]
> Editing the schema does not change any data that is in the table.
> Table schema edit is not supported when there is an active OneLake connection. Disable OneLake availability before editing the schema. You can enable it later.
> You can't edit a column's type, as this would lead to data loss.
> Table mappings and reference may need manual updating. Review [dependencies](#dependencies).

1. Browse to your desired KQL database, and in the Explorer pane, expand **Tables**.

1. Select a table from the list, and open the More menu* [...].

    :::image type="content" source="media/empty-table/edit-schema.png" alt-text="Screenshot of the table more menu with Edit schema highlighted.":::

1. In the **Edit table schema** window, you can edit the table name, edit the table decscription, and delete columns.

1. To add a new column, enter a column name at the bottom of the list of columns. The column name should start with a letter, and can contain numbers, periods, hyphens, or underscores.

1. Select a data type for your column. The default column type is `string` but can be altered in the dropdown menu of the **Column type** field.

1. Select **Add column** to add more columns.

1. Manually update any [Dependencies](#dependencies).

### Dependencies

**Related mappings**

Editing the schema does not update the mapping of incoming data to table columns during ingestion. After adding columns, ensure you update the [mapping](kusto/management/mappings) so data is ingested correctly.

**Update materialized views**

If the table being renamed is the source table of a [materialized view](materialized-view.md), you can use the toggle in the dependencies section. The table will be renamed and all materialized views referencing OldName will be updated to point to NewName, in a transactional way.

> [!NOTE]
> The command only works if the source table is referenced directly in the materialized view query. If the source table is referenced from a stored function invoked by the view query, you need to update the [materialized view](materialized-view.md) manually.

#### Command viewer

The command viewer shows the commands for creating tables, mapping, and ingesting data in tables.

To open the command viewer, select the **v** button on the right side of the command viewer. In the command viewer, you can view and copy the automatic commands generated from your inputs.

:::image type="content" source="media/empty-table/empty-command-viewer.png" alt-text="Screenshot of the Command viewer. The Expand button is highlighted." lightbox="media/empty-table/empty-command-viewer.png":::

##### Edit columns

1. Enter a column name. The column name should start with a letter, and can contain numbers, periods, hyphens, or underscores.
1. Select a data type for your column. The default column type is `string` but can be altered in the dropdown menu of the **Column type** field.
1. Select **Add column** to add more columns.

1. Select **Save** to add the columns to your table.

    :::image type="content" source="media/empty-table/edit-columns.png" alt-text="Screenshot of  the Edit columns window showing filled column names and their data type in the new table wizard in Real-Time Intelligence." lightbox="media/empty-table/edit-columns.png":::

    The Partial data preview  reflects the added columns:

    :::image type="content" source="media/empty-table/added-columns.png" alt-text="Screenshot of Schema tab showing the added columns under the Partial data preview. The column names are highlighted." lightbox="media/empty-table/added-columns.png":::

    > [!NOTE]
    > Optionally, you can edit existing columns and  add new columns by selecting **Edit columns** or the **+** button on the right-hand column under **Partial data preview**.

1. Select **Next: Summary** to create the table mapping.

### Summary tab

In the **Create table completed** window, the empty table is marked with a green check mark to indicate that it was created successfully.

:::image type="content" source="media/empty-table/table-summary.png" alt-text="Screenshot of the Summary tab that shows that the table was created successfully in Real-Time Intelligence.":::

## Related content

* [Get data from Azure storage](get-data-azure-storage.md)
* [Get data from Amazon S3](get-data-amazon-s3.md)
* [Get data from Azure Event Hubs](get-data-event-hub.md)
* [Get data from OneLake](get-data-onelake.md)
