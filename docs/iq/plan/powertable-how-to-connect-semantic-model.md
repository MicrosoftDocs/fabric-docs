---
title: Create a Table App by Connecting PowerTable Sheet to a Semantic Model
description: Learn how to connect a PowerTable sheet to a semantic model and build collaborative table apps with live data synchronization.
ms.date: 06/28/2026
ms.topic: how-to
#customer intent: As a user, I want to connect PowerTable sheets to a semantic model so that I can build a collaborative table app using governed data from my existing Power BI or Fabric semantic model.
---

# Create table app by connecting to a semantic model

This article describes how to create a table app by connecting the PowerTable sheet to a semantic model. You can save the data table, along with any changes or updates, to your preferred destination database. You can also write back subsequent changes to the same database table.

> [!NOTE]
> You can also create a table by uploading data from an Excel or CSV file. For more information, see [Create a table app with PowerTable sheets](powertable-how-to-create-table-app.md).
> To connect an existing database table to a PowerTable sheet and create a table app, see [Connect to a database](./powertable-how-to-connect-existing-database.md).

## Prerequisites

Before you begin, make sure that you have the following prerequisites in place:

* Connections established to the [Fabric SQL database](planning-how-to-create-database-connection.md) and/or [semantic model](planning-how-to-create-semantic-model-connection.md) that contain the data for your PowerTable.
* [A Plan item](planning-how-to-get-started.md#create-plan-item) created in your Fabric workspace.

[!INCLUDE [new PowerTable sheet](includes/create-powertable.md)]

## Create a table

1. Select **New Table**.
1. Choose the database schema.
1. Enter a **Table Name**.
1. Choose **Connect To Semantic Model** in **Import Data**.
1. Select your **Connection** and the required **Semantic Model**.
1. Select **Next**.

    :::image type="content" source="media/powertable-how-to-connect-semantic-model/new-table.png" alt-text="Screenshot of connecting to semantic model." lightbox="media/powertable-how-to-connect-semantic-model/new-table.png":::
    
   > [!NOTE]
   > Capacity workspaces with Pro licenses are not supported. Make sure to select a workspace of premium capacity.

### Map data

1. Map and assign your data to the table by selecting the required fields and corresponding values.

    :::image type="content" source="media/powertable-how-to-connect-semantic-model/assign-fields.png" alt-text="Screenshot of assigning fields and values." lightbox="media/powertable-how-to-connect-semantic-model/assign-fields.png":::

1. Set the primary key fields by selecting the three dots and selecting primary keys.

    :::image type="content" source="media/powertable-how-to-connect-semantic-model/set-primary-key.png" alt-text="Screenshot of setting primary keys." lightbox="media/powertable-how-to-connect-semantic-model/set-primary-key.png":::

1. If needed, you can use filters to include only specific field values from the table.

    :::image type="content" source="media/powertable-how-to-connect-semantic-model/using-filters.png" alt-text="Screenshot of using filters." lightbox="media/powertable-how-to-connect-semantic-model/using-filters.png":::

1. Select **Next**.

    :::image type="content" source="media/powertable-how-to-connect-semantic-model/configured-semantic-model.png" alt-text="Screenshot of configured semantic model for the new table." lightbox="media/powertable-how-to-connect-semantic-model/configured-semantic-model.png":::

### Configure table

PowerTable sheets automatically detect column properties and rename any unsupported column names to match the supported format. You can review and modify them as needed.

:::image type="content" source="media/powertable-how-to-connect-semantic-model/finish-table-from-model.jpg" alt-text="Screenshot of table configuration window after configuring the fields." lightbox="media/powertable-how-to-connect-semantic-model/finish-table-from-model.jpg":::

[!INCLUDE [Configure PowerTable columns](includes/configure-columns.md)]

> [!NOTE]
> In this step, you can **enable Slowly Changing Dimensions (SCDs)** by turning the toggle.
> For a table, this is a one-time configuration that you can't modify later.

### Finish

Select **Finish**.

The table app is created successfully in PowerTable with the configured columns and values. Select **Save** to save your table.

:::image type="content" source="media/powertable-how-to-connect-semantic-model/save-table-from-model.png" alt-text="Screenshot of saving the new table app." lightbox="media/powertable-how-to-connect-semantic-model/save-table-from-model.png":::

## FAQ

### Do changes made in PowerTable update the semantic model or its underlying data source?

No. PowerTable uses the semantic model only to **seed** the destination table. It doesn't update the semantic model or its underlying data source.

When you create a PowerTable app from a semantic model, PowerTable reads the semantic model and copies its data into the selected **Fabric SQL database** destination table.

After the initial load:

* PowerTable writes all changes directly to the **Fabric SQL database destination table**.
* Changes made in PowerTable don't update the semantic model or its underlying data source.

### Are there any exceptions to this behavior based on the underlying data source (Lakehouse, Warehouse, or external database) or on the semantic model storage mode?


No. The **Save to Database** option always writes data to the configured **Fabric SQL database destination table**, regardless of the semantic model's underlying data source or storage mode.

When you create a PowerTable app from a semantic model:

* The semantic model only seeds the PowerTable with initial data. The underlying data source, whether a **Lakehouse, Warehouse, or external database**, doesn't receive any data.
* The semantic model's storage mode, whether **Import, DirectQuery, or Direct Lake**, doesn't affect the write path. It only determines how PowerTable reads the seed data.
* After the initial load, PowerTable writes all changes directly to the configured **Fabric SQL database destination table**.

### When do newly added members in PowerTable appear on a planning sheet? Is this scenario supported?


Yes. PowerTable supports this scenario. Newly added members appear in the planning sheet in two ways:

* **Direct connection:** When PowerTable writes to a Fabric SQL database table, the table appears in the planning sheet's data pane under **Data > From Sheets**, where you can assign its columns directly as dimensions and measures. There's no replication or intermediate semantic model. Newly added members are available in the planning sheet as soon as you commit the changes.
* **Direct Lake connection:** When the planning sheet uses a **Direct Lake semantic model**, PowerTable writes the data to the Fabric SQL database table, which is automatically replicated to **OneLake**. The Direct Lake semantic model reads the replicated data from OneLake. When automatic updates are enabled, newly added members automatically appear in the planning sheet after the changes reach OneLake, although a short delay might occur because replication has near-real-time latency.


> [!NOTE]
> Schema changes, such as adding or modifying columns, might require a semantic model refresh.

## Next steps

Configure [access control](powertable-how-to-set-up-access-control.md) and [automated workflows and approvals](powertable-how-to-configure-approval-workflow.md) for your new app.
