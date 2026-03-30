---
title: Connect PowerTable sheet to a semantic model
description: Learn how to connect a PowerTable sheet to a semantic model and build collaborative table apps with live data synchronization.
ms.date: 03/27/2026
ms.topic: how-to
#customer intent: As a user, I want to connect PowerTable sheets to a semantic model so that I can build a collaborative table app using governed data from my existing Power BI or Fabric semantic model.
---

# Connect PowerTable sheet to a semantic model

In this article, you look at the steps to connect to a semantic model from a PowerTable sheet. Connect to an existing semantic model and create a table app. The data table, along with any changes or updates, is saved to your preferred destination database.

[!INCLUDE [Fabric feature-preview-note](../../includes/feature-preview-note.md)]

>[!NOTE]
> You can also create a table by uploading data from an Excel or CSV file. For more information, see [Create a table app with PowerTable sheets](powertable-how-to-create-table-app.md).

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

1. Select **New Table**.
2. Choose the database schema.
3. Enter a **Table Name**.
4. Choose **Connect To Semantic Model** in **Import Data**.
5. Select your **DMTS Connection** and the required **Semantic Model**.
6. Select **Next**.

:::image type="content" source="media/powertable-how-to-connect-semantic-model/new-table.png" alt-text="Screenshot of connecting to semantic model.":::

>[!NOTE]
>Capacity workspaces with Pro licences are not supported. Please make sure to select a workspace of premium capacity.

7. Map and assign your data to the table by selecting the required fields and corresponding values.

:::image type="content" source="media/powertable-how-to-connect-semantic-model/assign-fields.png" alt-text="Screenshot of assigning fields and values.":::

8. Set the primary key fields by clicking the three dots and selecting primary keys.

:::image type="content" source="media/powertable-how-to-connect-semantic-model/set-primary-key.png" alt-text="Screenshot of setting primary keys.":::

9. You can use filters to include only specific field values from the table if needed.

:::image type="content" source="media/powertable-how-to-connect-semantic-model/using-filters.png" alt-text="Screenshot of using filters.":::

10. Click **Next** after mapping the required fields and values.

:::image type="content" source="media/powertable-how-to-connect-semantic-model/configured-semantic-model.png" alt-text="Screenshot of configured semantic model for the new table.":::

### Configure columns

PowerTable sheets automatically detect column properties and rename any unsupported column names to match the supported format. You can review and modify them as needed.

1. Review the detected column settings.
2. You can modify column properties, such as the data type, input type, and display name, if you want to.
3. You can optionally add columns using **Add column**.
4. Select **Finish**.

>[!NOTE]
>In this step, you can **enable Slowly Changing Dimensions (SCDs)** by turning the toggle.
>For a table, this is a one-time configuration that cannot be modified later.

:::image type="content" source="media/powertable-how-to-connect-semantic-model/finish-table-config.png" alt-text="Screenshot of configured table.":::

The table app is created successfully in PowerTable with the configured columns and values. Select **Save** to save your table.

:::image type="content" source="media/powertable-how-to-connect-semantic-model/save-table.png" alt-text="Screenshot of saving the new table app.":::

You can start working with this data and make changes as needed. The changes are written back to the configured database destination.

You can configure access control, workflows, approvals, automation and other features for your new app. These are covered in different sections.
