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

* Connections established to [the Fabric SQL database](../plan/planning-how-to-get-started.md#create-a-database-connection) and [the semantic model](../plan/planning-how-to-get-started.md#create-a-connection-for-the-semantic-model).
* [A plan item](../plan/planning-how-to-get-started.md#create-planning-sheet) created in your Fabric workspace.

[!INCLUDE [new PowerTable sheet](includes/create-powertable.md)]

## Create a table

1. Select **New Table**.
1. Choose the database schema.
1. Enter a **Table Name**.
1. Choose **Connect To Semantic Model** in **Import Data**.
1. Select your **Connection** and the required **Semantic Model**.
1. Select **Next**.

    :::image type="content" source="media/powertable-how-to-connect-semantic-model/new-table.png" alt-text="Screenshot of connecting to semantic model." lightbox="media/powertable-how-to-connect-semantic-model/new-table.png":::
    
    >[!NOTE]
    >Capacity workspaces with Pro licenses are not supported. Make sure to select a workspace of premium capacity.

1. Map and assign your data to the table by selecting the required fields and corresponding values.

    :::image type="content" source="media/powertable-how-to-connect-semantic-model/assign-fields.png" alt-text="Screenshot of assigning fields and values." lightbox="media/powertable-how-to-connect-semantic-model/assign-fields.png":::

1. Set the primary key fields by selecting the three dots and selecting primary keys.

    :::image type="content" source="media/powertable-how-to-connect-semantic-model/set-primary-key.png" alt-text="Screenshot of setting primary keys." lightbox="media/powertable-how-to-connect-semantic-model/set-primary-key.png":::

1. If needed, you can use filters to include only specific field values from the table.

    :::image type="content" source="media/powertable-how-to-connect-semantic-model/using-filters.png" alt-text="Screenshot of using filters." lightbox="media/powertable-how-to-connect-semantic-model/using-filters.png":::

1. Select **Next**.

    :::image type="content" source="media/powertable-how-to-connect-semantic-model/configured-semantic-model.png" alt-text="Screenshot of configured semantic model for the new table." lightbox="media/powertable-how-to-connect-semantic-model/configured-semantic-model.png":::

[!INCLUDE [Configure PowerTable columns](includes/configure-columns.md)]

## Next steps

Configure [access control](powertable-how-to-set-up-access-control.md) and [automated workflows and approvals](powertable-how-to-configure-approval-workflow.md) for your new app.