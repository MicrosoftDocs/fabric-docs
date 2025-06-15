---
title: Create an empty table
description: Learn how to create an empty table in Real-Time Intelligence.
ms.reviewer: tzgitlin
ms.author: spelluru
author: spelluru
ms.topic: how-to
ms.custom:
ms.date: 04/29/2025
ms.search.form: Create a table
---
# Create an empty table

Tables are named entities that hold data. A table has an ordered set of columns, and zero or more rows of data. Each row holds one data value for each column of the table.

In this article, you learn how to create an empty table within the context of a KQL database.

## Prerequisites

* A [workspace](../fundamentals/create-workspaces.md) with a Microsoft Fabric-enabled [capacity](../enterprise/licenses.md#capacity)
* A [KQL database](create-database.md) with editing permissions

## Create an empty table in your KQL database

You can create an empty table without a data source to use as a testing environment, or for ingesting data in a later stage.

If you have a data source or a sample file prepared, you can use **Get data** to ingest data directly into a new table. For more information, see [Get data overview](get-data-overview.md).

1. Browse to your desired KQL database.

1. Select **+New** > **Table**.

    :::image type="content" source="media/empty-table/new-table.png" alt-text="Screenshot of lower ribbon that shows the dropdown menu of the New button in Real-Time Intelligence. The dropdown option titled Table is highlighted.":::

1. Enter a **Table name** and **Add a table description (optional)**.

    > [!NOTE]
    > Table names can be up to 1,024 characters including alphanumeric, hyphens, and underscores. Special characters aren't supported.

     :::image type="content" source="media/empty-table/table-name.png" alt-text="Screenshot of the new table wizard in Real-Time Intelligence. The table name and description is highlighted.":::

1. Start the table schema by entering a **Column name**, and a description (optional).

    > [!NOTE]
    > * The column name must start with a letter, and can contain numbers, periods, hyphens, or underscores.
    > * You need to create at least one column.

1. Select a data **Type** for your column. The default column type is `string` but can be altered in the dropdown menu of the type field.

1. You can continue to build the new table's schema. The options are:

    * Select **+ Add column** to add more columns.
    * Select the delete icon to remove a column you just added.
    * To see a read-only view of the commands that will run to create the table, you can open the  [Command viewer](#command-viewer).

    :::image type="content" source="media/empty-table/table-columns.png" alt-text="Screenshot of the new empty table wizard in Real-Time Intelligence. The Add column, delete, and command viewer options are highlighted.":::

1. Select **Create**.

1. In the success message you can select to add data now or later:

   * Select **Close** to return to the Eventhouse and [Edit a table schema](edit-table-schema.md) later.
   * Select **Get Data** to start the ingestion process. For more information, see [Get data overview](get-data-overview.md).

    :::image type="content" source="media/empty-table/table-success.png" alt-text="Screenshot of the success message.":::

## Command viewer

The command viewer shows the commands for creating tables, mapping, and ingesting data in tables.

To open the command viewer, select the **</>** button on the right side of the command viewer. In the command viewer, you can view and copy the automatic commands generated from your inputs.

:::image type="content" source="media/empty-table/empty-command-viewer.png" alt-text="Screenshot of the Command viewer. The Expand button is highlighted." lightbox="media/empty-table/empty-command-viewer.png":::

## Related content

* [Edit a table schema](edit-table-schema.md)
* [Get data from Azure storage](get-data-azure-storage.md)
* [Get data from Amazon S3](get-data-amazon-s3.md)
* [Get data from Azure Event Hubs](get-data-event-hub.md)
* [Get data from OneLake](get-data-onelake.md)
