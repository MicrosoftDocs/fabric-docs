---
title: Create an empty table
description: Learn how to create an empty table in Real-Time Analytics.
ms.reviewer: tzgitlin
ms.author: yaschust
author: YaelSchuster
ms.topic: how-to
ms.custom:
  - build-2023
  - ignite-2023
ms.date: 11/06/2023
ms.search.form: Create a table
---
# Create an empty table

Tables are named entities that hold data. A table has an ordered set of columns, and zero or more rows of data. Each row holds one data value for each of the columns of the table. The order of rows in the table is unknown, and doesn't in general affect queries, except for some tabular operators (such as the top operator) that are inherently undetermined.

You can create an empty table without a data source to use as a testing environment, or for ingesting data in a later stage. In this article, you learn how to create an empty table within the context of a KQL database.

## Prerequisites

* A [workspace](../get-started/create-workspaces.md) with a Microsoft Fabric-enabled [capacity](../enterprise/licenses.md#capacity)
* A [KQL database](create-database.md) with editing permissions

## Create an empty table in your KQL database

1. Browse to your desired KQL database.
1. Select **+New** > **Table**.

    :::image type="content" source="media/empty-table/new-table.png" alt-text="Screenshot of lower ribbon that shows the dropdown menu of the New button in Real-Time analytics. The dropdown option titled Table is highlighted.":::

1. Enter a name for your table.

    :::image type="content" source="media/empty-table/table-name.png" alt-text="Screenshot of the Destination tab in the new table wizard in Real-Time Analytics. The table name is highlighted.":::

    > [!NOTE]
    > Table names can be up to 1024 characters including alphanumeric, hyphens, and underscores. Special characters aren't supported.

1. Select **Next: Source**.

### Source

1. By default, the **Source type** is set to **None**. If you select **None**, you can manually define the table schema.
1. Select **Next: Schema**.

:::image type="content" source="media/empty-table/table-source.png" alt-text="Screenshot of the Source tab that shows that the source type is set to None in the new table wizard in Real-Time Analytics.":::

### Schema

The tool automatically infers the schema based on your data. To create a schema without a data source, you need to add columns under [Partial data preview](#partial-data-preview).

#### Command viewer

The command viewer shows the commands for creating tables, mapping, and ingesting data in tables.

To open the command viewer, select the **v** button on the right side of the command viewer. In the command viewer, you can view and copy the automatic commands generated from your inputs.

:::image type="content" source="media/empty-table/empty-command-viewer.png" alt-text="Screenshot of the Command viewer. The Expand button is highlighted." lightbox="media/empty-table/empty-command-viewer.png":::

#### Partial data preview

The partial data preview is automatically inferred based on your data.

To add a new column, select **Add new column** under **Partial data preview**.

:::image type="content" source="media/empty-table/schema-new-column.png" alt-text="Screenshot of the Schema tab in the new table wizard in Real-Time Analytics. The Add new column button is highlighted." lightbox="media/empty-table/schema-new-column.png":::

##### Edit columns

1. Enter a column name. The column name should start with a letter, and can contain numbers, periods, hyphens, or underscores.
1. Select a data type for your column. The default column type is `string` but can be altered in the dropdown menu of the **Column type** field.
1. Select **Add column** to add more columns.

1. Select **Save** to add the columns to your table.

    :::image type="content" source="media/empty-table/edit-columns.png" alt-text="Screenshot of  the Edit columns window showing filled column names and their data type in the new table wizard in Real-Time Analytics." lightbox="media/empty-table/edit-columns.png":::

    The Partial data preview  reflects the added columns:

    :::image type="content" source="media/empty-table/added-columns.png" alt-text="Screenshot of Schema tab showing the added columns under the Partial data preview. The column names are highlighted." lightbox="media/empty-table/added-columns.png":::

    > [!NOTE]
    > Optionally, you can edit existing columns and  add new columns by selecting **Edit columns** or the **+** button on the right-hand column under **Partial data preview**.

1. Select **Next: Summary** to create the table mapping.

### Summary tab

In the **Create table completed** window, the empty table is marked with a green check mark to indicate that it was created successfully.

:::image type="content" source="media/empty-table/table-summary.png" alt-text="Screenshot of the Summary tab that shows that the table was created successfully in Real-Time Analytics.":::

## Related content

* [Get data from Azure storage](get-data-azure-storage.md)
* [Get data from Amazon S3](get-data-amazon-s3.md)
* [Get data from Azure Event Hubs](get-data-event-hub.md)
* [Get data from OneLake](get-data-onelake.md)
