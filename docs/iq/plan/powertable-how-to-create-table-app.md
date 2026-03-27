---
title: Create a table app with PowerTable sheets
description: Learn how to create a no-code table app with PowerTable sheets, by importing Excel sheets or connecting to database tables and semantic models to build collaborative data apps with live synchronization.
ms.date: 03/27/2026
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

## Prerequisites

Before you begin, make sure that you have the following prerequisites in place:

* Connections established to [the Fabric SQL database](<../plan/planning-how-to-get-started.md#create-a-database-connection>) and [the semantic model](<../plan/planning-how-to-get-started.md#create-a-connection-for-the-semantic-model>).
* [A Plan item](<../plan/planning-how-to-get-started.md#create-planning-sheet>) created in your Fabric workspace.

## Create a PowerTable sheet

1. In your Plan, select **New PowerTable Sheet** or select the **PowerTable** icon on the landing page. Enter a name for the sheet and select **Create**.

:::image type="content" source="media/powertable-how-to-create-table-app/create-powertable-sheet.png" alt-text="Screenshot of creating a PowerTable sheet.":::

2. Select **Create a New App** to create your app. You can also select **Explore PowerTable** to experience a sample PowerTable app.

:::image type="content" source="media/powertable-how-to-create-table-app/create-new-app.png" alt-text="Screenshot of creating a new table app.":::

3. **Select a Connection:** Choose a Fabric SQL connection. You can also create a new connection if required.

:::image type="content" source="media/powertable-how-to-create-table-app/select-sql-connection.png" alt-text="Screenshot of selecting a sql connection.":::

4. **Database Name:** Select the Fabric SQL database to store the app metadata. Select **Add**.

:::image type="content" source="media/powertable-how-to-create-table-app/select-database.png" alt-text="Screenshot of selecting the database.":::

>[!NOTE]
>When a new Plan item is created in a workspace, a Fabric SQL database is automatically created for that workspace. This database stores all the plan app metadata for workspace users. You can choose this database.

5. Select **Connect** after choosing the connection and the database.

:::image type="content" source="media/powertable-how-to-create-table-app/connect.png" alt-text="Screenshot of selecting Connect.":::

## Create a table

Select a table for the data to be stored in. There are two options:

* Select **Existing Table** to connect to an existing table in the Fabric SQL database, OR
* Select **New Table** to create a new table in the database. This option is shown in the next steps.

To create a new table and import the CSV data, follow these steps:

1. Select **New Table**.
2. Choose the database schema.
3. Enter a **Table Name**.
4. Select **Upload File** in the **Import Data** section.
5. Select the space to upload the CSV or Excel file from your local system.

There are also [other ways to create a new table](#ways-to-create-a-table).

:::image type="content" source="media/powertable-how-to-create-table-app/upload-file.png" alt-text="Screenshot of uploading an Excel or CSV  file to PowerTable.":::

6. Preview the data and select **Next**.

:::image type="content" source="media/powertable-how-to-create-table-app/preview-data.png" alt-text="Screenshot of previewing data.":::

>[!NOTE]
>Select **Exclude records and import table structure only** to import only the table structure.

### Configure columns

PowerTable sheets automatically detect column properties and rename any unsupported column names to match the supported format. You can review and modify them as needed.

1. Review the detected column settings.
2. Select the **primary key** if unselected.
3. You can modify column properties, such as the data type, input type, and display name, if you want to.
4. Enter default values wherever required.
5. You can optionally add columns using **Add column**.
6. Select **Finish**.

>[!NOTE]
>In this step, you can **enable Slowly Changing Dimensions (SCDs)** by turning the toggle.
>For a table, this is a one-time configuration that cannot be modified later.

:::image type="content" source="media/powertable-how-to-create-table-app/slowly-changing-dimensions.png" alt-text="Screenshot of selecting Finish.":::

Now you have your first PowerTable sheet. Select **Save** to save your table.

:::image type="content" source="media/powertable-how-to-create-table-app/save-table.png" alt-text="Screenshot of saving the table.":::

### Write back changes to source

You can update your data table and sync changes with the source database.

1. To edit a cell in the table, double-click it, type the value, and press **Enter**.
2. With **Preview Changes**, you can preview the changes.
3. Select **Save to Database**, then **Proceed** to save the changes instantly (considering the approval workflow isn't enabled).

:::image type="content" source="media/powertable-how-to-create-table-app/save-to-database.png" alt-text="Screenshot of saving the table to database.":::

The source database is updated.

4. Select **PowerTable > Audit**. The audit trail records all changes in detail, including the Row ID, action type, modified columns, previous values, new values, user name, and timestamp.

:::image type="content" source="media/powertable-how-to-create-table-app/audit.png" alt-text="Screenshot of audit log.":::

## Next steps <a href="#next-steps" id="next-steps"></a>

After creating your first PowerTable application, explore these other features:

* **Reference data management**: Manage master and reference data centrally while maintaining synchronization with enterprise data platforms. PowerTable sheets provide support for bulk insert/update, lookups, formulas, cascading updates, audit tracking, CRUD permissions, SCD support, and native Microsoft Fabric SQL DB integration.
* **Project management**: PowerTable sheets provide Gantt layouts and timeline views to manage project schedules, track progress, and monitor dependencies.
* **Workflow management**: Approval workflows enable governance over sensitive data updates by routing change requests through designated approvers.
* **Operational automation**: Event‑driven automation enables teams to automate repetitive processes such as record updates and notify them via email/Teams notifications.
* **Collaborative data management**: Comments, threaded discussions, mentions, and notifications allow teams to collaborate directly within the data application.
* **Productivity**: Use forms for structured data collection and insertion without coding. Use the master-detail view, cross-tab view, and resource layout for time management, task management, tracking, and resource planning.
* **Connected planning**: Link PowerTable tables to plans so updates in PowerTable sheets become inputs for a plan. This process allows a change in your revenue forecast to automatically flow into headcount, cash flow, and operational plans.
