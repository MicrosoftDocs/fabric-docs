---
title: Create a Table App using PowerTable by Importing Excel or CSV Files
description: Learn how to create a no-code table app with PowerTable sheets, by importing Excel sheets to build collaborative data apps with live synchronization.
ms.date: 06/28/2026
ms.topic: how-to
ms.search.form: Getting Started with PowerTable Sheet
#customer intent: As a user, I want step-by-step instructions to build my first PowerTable data app by importing an Excel or CSV file.
---

# Build a table app using PowerTable by importing an Excel file

To create a table app using PowerTable, use one of these four approaches:

* Upload Excel or CSV file to import data
* Connect to an existing database table
* Enter data directly into the table app
* Connect to a semantic model

In this article, you learn how to create a table app by importing an Excel or CSV file.

[!INCLUDE [Fabric feature-preview-note](../../includes/feature-preview-note.md)]

## Prerequisites

Before you begin, make sure that you have the following prerequisites in place:

* Connections established to the [Fabric SQL database](planning-how-to-create-database-connection.md) and/or [semantic model](planning-how-to-create-semantic-model-connection.md) that contain the data for your PowerTable.
* [A plan item](planning-how-to-get-started.md#create-plan-item) created in your Fabric workspace.

[!INCLUDE [new PowerTable sheet](includes/create-powertable.md)]

## Create a table

Select a table for the data to be stored in. There are two options:

* Select **Existing Table** to connect to an existing table in the Fabric SQL database, OR
* Select **New Table** to create a new table in the database. This option is shown in the next steps.

To create a new table and import the Excel or CSV data, follow these steps:

1. Select **New Table**.
1. Choose the database schema.
1. Enter a **Table Name**.
1. Select **Upload File** in the **Import Data** section.
1. Select the space to upload the CSV or Excel file from your local system.

    :::image type="content" source="media/powertable-how-to-create-table-app/upload-file.png" alt-text="Screenshot of uploading an Excel or CSV  file to PowerTable." lightbox="media/powertable-how-to-create-table-app/upload-file.png":::

1. Select the sheet that contains the data you want to import.

    * Enter a name for the table.
    * Review and, if necessary, modify the start and end cell ranges that contain the data to import.
    * Preview the imported data, and then select **Next**.

    :::image type="content" source="media/powertable-how-to-create-table-app/preview-data.png" alt-text="Screenshot of previewing data." lightbox="media/powertable-how-to-create-table-app/preview-data.png":::

   > [!NOTE]
   > To import only the headers, toggle on **Import header only**.

### Configure table

PowerTable sheets automatically detect column properties and rename any unsupported column names to match the supported format. You can review and modify them as needed.

:::image type="content" source="media/powertable-how-to-create-table-app/table-configuration.png" alt-text="Screenshot of the table configuration window with field names to configure their properties." lightbox="media/powertable-how-to-create-table-app/table-configuration.png":::

[!INCLUDE [Configure PowerTable columns](includes/configure-columns.md)]

:::image type="content" source="media/powertable-how-to-create-table-app/unique-combination.png" alt-text="Screenshot of selecting unique combination and choosing two fields." lightbox="media/powertable-how-to-create-table-app/unique-combination.png":::

> [!NOTE]
> In this step, you can **enable Slowly Changing Dimensions (SCDs)** by turning the toggle.
> For a table, this setting is a one-time configuration that you can't change later.

Select **Finish**.

:::image type="content" source="media/powertable-how-to-create-table-app/finish-table.png" alt-text="Screenshot of selecting Finish to save table configuration." lightbox="media/powertable-how-to-create-table-app/finish-table.png":::

The table app is created successfully in PowerTable with the configured columns and values. Select **Save** to save your table.

:::image type="content" source="media/powertable-how-to-create-table-app/save-table.png" alt-text="Screenshot of saving the new table app." lightbox="media/powertable-how-to-create-table-app/save-table.png":::

### Write back changes to source

You can update your data table and sync changes with the source database.

1. To edit a cell in the table, double-click it, enter the value, and select **Enter**.
1. With **Preview Changes**, you can preview the changes.
1. Select **Save to Database**, then **Proceed** to save the changes instantly (unless an [approval workflow](powertable-how-to-configure-approval-workflow.md) is enabled).

    :::image type="content" source="media/powertable-how-to-create-table-app/save-to-database.png" alt-text="Screenshot of saving the table to database." lightbox="media/powertable-how-to-create-table-app/save-to-database.png":::
    
    The source database is updated.
    
1. Select **PowerTable > Audit**. The audit trail records all changes in detail, including the Row ID, action type, modified columns, previous values, new values, user name, and timestamp.

    :::image type="content" source="media/powertable-how-to-create-table-app/audit.png" alt-text="Screenshot of audit log." lightbox="media/powertable-how-to-create-table-app/audit.png":::

## Next steps

After creating your first PowerTable application, explore these other features:

* **Reference data management**: Manage master and reference data centrally while maintaining synchronization with enterprise data platforms. PowerTable sheets provide support for bulk insert/update, lookups, formulas, cascading updates, audit tracking, CRUD permissions, SCD support, and native Microsoft Fabric SQL DB integration.
* **Project management**: PowerTable sheets provide Gantt layouts and timeline views to manage project schedules, track progress, and monitor dependencies.
* **Workflow management**: Approval workflows enable governance over sensitive data updates by routing change requests through designated approvers.
* **Operational automation**: Event‑driven automation enables teams to automate repetitive processes such as record updates and notify them via email/Teams notifications.
* **Collaborative data management**: Comments, threaded discussions, mentions, and notifications allow teams to collaborate directly within the data application.
* **Productivity**: Use forms for structured data collection and insertion without coding. Use the master-detail view, cross-tab view, and resource layout for time management, task management, tracking, and resource planning.
* **Connected planning**: Link PowerTable tables to plans so updates in PowerTable sheets become inputs for a plan. This process allows a change in your revenue forecast to automatically flow into headcount, cash flow, and operational plans.

## Related content
Other ways to create a table:
* [Connect to a semantic model](./powertable-how-to-connect-semantic-model.md)
* [Connect to a database table](./powertable-how-to-connect-existing-database.md)
* [Enter data manually](./powertable-how-to-enter-table-data-manually.md)
