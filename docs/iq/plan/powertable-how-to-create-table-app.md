---
title: Create a table app with PowerTable sheets
description: Learn how to create a no-code table app with PowerTable sheets, by importing Excel sheets or connecting to database tables and semantic models to build collaborative data apps with live synchronization.
ms.date: 03/11/2026
ms.topic: how-to
#customer intent: As a user, I want step-by-step instructions to build my first PowerTable data app.
---

# Build a no-code table app with PowerTable sheets

In this article, you learn how to create a table app with PowerTable sheets.

[!INCLUDE [Fabric feature-preview-note](../../includes/feature-preview-note.md)]

## Ways to create a table

You can use one of these four approaches to create a table:

* Upload Excel or CSV file to import data
* Connect to an existing database table
* Enter data directly into the table app
* Connect to a semantic model

>[!IMPORTANT]
> In the first three methods listed here, the **source** and **destination** are the same underlying database table.
>
>The fourth method uses a semantic model as the source, and a database table as the destination. This method allows for writeback scenarios. You can also schedule automatic refreshes from the semantic model.

## Prerequisites

Before you begin, make sure that you have the following prerequisites in place:

* A Fabric SQL database to store the app metadata.
* [Connections or data sources](../../data-factory/data-source-management.md) established to the Fabric SQL database and the semantic model.
* A Plan item created in your Fabric workspace.

[!INCLUDE [new PowerTable sheet](includes/create-powertable.md)]

[!INCLUDE [SQL database connection](includes/connect-sql-database.md)]

## Create a table

Select a table for the data to be stored in. There are two options:

* Select **Existing Table** to connect to an existing table in the Fabric SQL database, OR
* Select **New Table** to create a new table in the database. This option is shown in the next steps.

To create a new table and import the CSV data, follow these steps:

1. Select **New Table**.
1. Choose the database schema.
1. Enter a **Table Name**.
1. Select **Upload File** in the **Import Data** section.
1. Select the space to upload the CSV or Excel file from your local system.

    :::image type="content" source="media/powertable-how-to-create-table-app/upload-file.png" alt-text="Screenshot of the new table configuration." lightbox="media/powertable-how-to-create-table-app/upload-file.png":::

    There are also [other ways to create a new table.](#ways-to-create-a-table)

1. Preview the data and select **Next**.

    :::image type="content" source="media/powertable-how-to-create-table-app/preview-data.png" alt-text="Screenshot of previewing the selected data." lightbox="media/powertable-how-to-create-table-app/preview-data.png":::

>[!NOTE]
> Select **Exclude records and import table structure only** to import only the table structure.

### Configure columns

PowerTable sheets automatically detect column properties and rename any unsupported column names to match the supported format. You can review and modify them as needed.

1. Review the detected column settings.
1. Select the **primary key** if unselected.
1. You can modify column properties, such as the data type, input type, and display name, if you want to.
1. Enter default values wherever required.
1. You can optionally add columns using **Add column**.
1. Select **Finish**.

    >[!NOTE]
    >In this step, you can **enable Slowly Changing Dimensions (SCDs)** by turning the toggle.
    >
    >For a table, this is a one-time configuration that cannot be modified later.
    
    :::image type="content" source="media/powertable-how-to-create-table-app/slowly-changing-dimensions.png" alt-text="Screenshot of the column configuration options." lightbox="media/powertable-how-to-create-table-app/slowly-changing-dimensions.png":::

Now you have your first PowerTable sheet. Select **Save** to save your table.

:::image type="content" source="media/powertable-how-to-create-table-app/save-table.png" alt-text="Screenshot of the completed powertable sheet." lightbox="media/powertable-how-to-create-table-app/save-table.png":::

### Write back changes to source

You can update your data table and sync changes with the source database.

1. To edit a cell in the table, double-click it, type the value, and press **Enter**.
1. With **Preview Changes**, you can preview the changes.
1. Select **Save to Database**, then **Proceed** to save the changes instantly (considering the approval workflow isn't enabled).

    :::image type="content" source="media/powertable-how-to-create-table-app/save-to-database.png" alt-text="Screenshot of the Save to Database button.":::

    The source database is updated.

1. Select **PowerTable > Audit**. The audit trail records all changes in detail, including the Row ID, action type, modified columns, previous values, new values, user name, and timestamp.

    :::image type="content" source="media/powertable-how-to-create-table-app/audit.png" alt-text="Screenshot of an update change recorded in the audit." lightbox="media/powertable-how-to-create-table-app/audit.png":::

## Next steps

After creating your first PowerTable application, explore these other features:

* **Reference data management**: Manage master and reference data centrally while maintaining synchronization with enterprise data platforms. PowerTable sheets provide support for bulk insert/update, lookups, formulas, cascading updates, audit tracking, CRUD permissions, SCD support, and native Microsoft Fabric SQL DB integration.
* **Project management**: PowerTable sheets provide Gantt layouts and timeline views to manage project schedules, track progress, and monitor dependencies.
* **Workflow management**: Approval workflows enable governance over sensitive data updates by routing change requests through designated approvers.
* **Operational automation**: Event‑driven automation enables teams to automate repetitive processes such as record updates and notify them via email/Teams notifications.
* **Collaborative data management**: Comments, threaded discussions, mentions, and notifications allow teams to collaborate directly within the data application.
* **Productivity**: Use forms for structured data collection and insertion without coding. Use the master-detail view, cross-tab view, and resource layout for time management, task management, tracking, and resource planning.
* **Connected planning**: Link PowerTable tables to plans so updates in PowerTable sheets become inputs for a plan. This process allows a change in your revenue forecast to automatically flow into headcount, cash flow, and operational plans.