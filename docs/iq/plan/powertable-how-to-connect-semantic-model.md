---
title: Connect PowerTable sheet to a semantic model
description: Learn how to connect a PowerTable sheet to a semantic model and build collaborative table apps with live data synchronization.
ms.date: 03/31/2026
ms.topic: how-to
#customer intent: As a user, I want to connect PowerTable sheets to a semantic model so that I can build a collaborative table app using governed data from my existing Power BI or Fabric semantic model.
---

# Connect PowerTable sheet to a semantic model

In this article, you look at the steps to connect to a semantic model from a PowerTable sheet. Connect to an existing semantic model and create a table app. The data table, along with any changes or updates, is saved to your preferred destination database.

[!INCLUDE [Fabric feature-preview-note](../../includes/feature-preview-note.md)]

>[!NOTE]
> You can also create a table by uploading data from an Excel or CSV file. For more information, see [Create a table app with PowerTable](powertable-how-to-create-table-app.md).


## Prerequisites

Before you begin, make sure that you have the following prerequisites in place:

* Connections established to [the Fabric SQL database](../plan/planning-how-to-get-started.md#create-a-database-connection) and [the semantic model](../plan/planning-how-to-get-started.md#create-a-connection-for-the-semantic-model).
* [A Plan item](../plan/planning-how-to-get-started.md#create-planning-sheet) created in your Fabric workspace.

[!INCLUDE [new PowerTable sheet](includes/create-powertable.md)]

## Create a table

1. Select **New Table**.
1. Choose the database schema.
1. Enter a **Table Name**.
1. Choose **Connect To Semantic Model** in **Import Data**.
1. Select your semantic model connection and the required **Semantic Model**.
1. Select **Next**.

>[!NOTE]
>Capacity workspaces with Pro licences are not supported. Please make sure to select a workspace of premium capacity.

:::image type="content" source="media/powertable-how-to-connect-semantic-model/new-table.png" alt-text="Screenshot of connecting to semantic model to create a powertable sheet.":::

7. Map and assign your data to the table by selecting the required fields and corresponding values.

    :::image type="content" source="media/powertable-how-to-connect-semantic-model/assign-fields.png" alt-text="Screenshot of assigning fields and values.":::

8. Set the primary key fields by selecting the three dots and choosing **Set as Primary Key**.

    :::image type="content" source="media/powertable-how-to-connect-semantic-model/set-primary-key.png" alt-text="Screenshot of setting primary keys.":::

9. You can use filters to include only specific field values from the table if needed.

    :::image type="content" source="media/powertable-how-to-connect-semantic-model/using-filters.png" alt-text="Screenshot of using filters.":::

10. Select **Next** after mapping the required fields and values.

    :::image type="content" source="media/powertable-how-to-connect-semantic-model/configured-semantic-model.png" alt-text="Screenshot of configured semantic model for the new table.":::

### Configure columns

PowerTable sheets automatically detect column properties and rename any unsupported column names to match the supported format. You can review and modify them as needed.

1. Review the detected column settings.
1. You can modify column properties, such as the data type, input type, and display name, if you want to.
1. You can optionally add columns using **Add column**.
1. Select **Finish**.

>[!NOTE]
>In this step, you can **enable Slowly Changing Dimensions (SCDs)** by turning the toggle.
>For a table, this is a one-time configuration that cannot be modified later.

:::image type="content" source="media/powertable-how-to-connect-semantic-model/finish-table-config.png" alt-text="Screenshot of configured table.":::

The table app is created successfully in PowerTable with the configured columns and values. Select **Save** to save your table.

:::image type="content" source="media/powertable-how-to-connect-semantic-model/save-table.png" alt-text="Screenshot of saving the new table app.":::

You can start working with this data and make changes as needed. The changes are written back to the configured database destination.

## Next steps

After creating your first PowerTable application, you can explore these features:
- [Set up row-level and column-level access control](../plan/powertable-how-to-set-up-access-control.md)
- [Approval workflow](../plan/powertable-how-to-configure-approval-workflow.md)
