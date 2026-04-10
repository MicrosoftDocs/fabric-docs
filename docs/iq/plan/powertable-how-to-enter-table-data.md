---
title: Build a table app using PowerTable by entering data manually
description: Learn how to use PowerTable to create a collaborative table app with live synchronization by entering data manually.
ms.date: 04/10/2026
ms.topic: how-to
#customer intent: As a user, I want step-by-step instructions to create a table app using PowerTable by entering data manually.
---

# Create table app by entering data manually

This article explains how to create a table app using PowerTable by entering the data manually from scratch. You'll enter data to create a table in a database, then write back any subsequent changes to the same database using the PowerTable sheet.

[!INCLUDE [Fabric feature-preview-note](../../includes/feature-preview-note.md)]

## Prerequisites

Before you begin, make sure that you have the following prerequisites in place:

* Connections established to the [Fabric SQL database](planning-how-to-create-database-connection.md) and the [semantic model](planning-how-to-create-semantic-model-connection.md) that contain the data for your PowerTable.
* [A plan item](planning-how-to-get-started.md#create-plan-item) created in your Fabric workspace.

[!INCLUDE [new PowerTable sheet](includes/create-powertable.md)]

## Create a table

To create a new table in the database and enter the data manually, follow these steps:

1. Select **New Table**.
1. Choose the database schema and enter a name for the table.
1. Select **Enter Data Manually** in the **Import Data** section.
1. Select **Next.**

    :::image type="content" source="media/powertable-how-to-enter-data-manually/select-database.png" alt-text="Screenshot of selecting the schema and entering the table name." lightbox="media/powertable-how-to-enter-data-manually/select-database.jpg":::

1. Configure your table by adding the column name, primary key, and other relevant details like length, precision, scale, etc., wherever applicable.

    :::image type="content" source="media/powertable-how-to-enter-data-manually/enter-column-name.png" alt-text="Screenshot of entering the first column name." lightbox="media/powertable-how-to-enter-data-manually/enter-column-name.png":::

1. Select **Add Column** to add a new column. Use the bin icon to delete a column.
1. Select **Finish** after entering all the column details.

    :::image type="content" source="media/powertable-how-to-enter-data-manually/finish-table.png" alt-text="Screenshot of selecting Finish after configuring all the column names for the new table." lightbox="media/powertable-how-to-enter-data-manually/finish-table.png":::

1. An empty table is successfully created using PowerTable, with the configured columns.

    :::image type="content" source="media/powertable-how-to-enter-data-manually/empty-table.png" alt-text="Screenshot of the new empty table with configured columns." lightbox="media/powertable-how-to-enter-data-manually/empty-table.png":::

1. You can now insert rows into this table using the **Insert Row** option.

    :::image type="content" source="media/powertable-how-to-enter-data-manually/insert-rows.png" alt-text="Screenshot of inserting rows to the empty table." lightbox="media/powertable-how-to-enter-data-manually/insert-rows.png":::

1. Select **Preview Changes** to preview the added rows and changes.

    :::image type="content" source="media/powertable-how-to-enter-data-manually/preview-changes.png" alt-text="Screenshot of preview with added rows and changes." lightbox="media/powertable-how-to-enter-data-manually/preview-changes.png":::

1. To discard the changes, select **Discard Changes.**
1. After previewing, select **Save to Database** and **Proceed** to save the rows to the table in the database.
1. Finally, select **Save** at the top right corner to save the PowerTable sheet.

    :::image type="content" source="media/powertable-how-to-enter-data-manually/save-table.png" alt-text="Screenshot of saving the new table." lightbox="media/powertable-how-to-enter-data-manually/save-table.png":::

## Related Content

* [Create a table app with PowerTable by importing an Excel or a CSV file](powertable-how-to-create-table-app.md)
* [Connect PowerTable sheet to a semantic model](powertable-how-to-connect-semantic-model.md)
* [Connect to an existing database](powertable-how-to-connect-existing-database.md)

## Next steps

Configure [access control](powertable-how-to-set-up-access-control.md) and [automated workflows and approvals](powertable-how-to-configure-approval-workflow.md) for your new app.
