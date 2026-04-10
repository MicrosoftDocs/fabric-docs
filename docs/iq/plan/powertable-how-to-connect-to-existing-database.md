---
title: Connect PowerTable sheet to a database
description: Learn how to connect PowerTable sheet to database tables to build collaborative data apps with live synchronization.
ms.date: 04/10/2026
ms.topic: how-to
#customer intent: As a user, I want step-by-step instructions to connect PowerTable sheet to an existing database table.
---

# Connect to a database

Connect your existing database tables to PowerTable to manage both transactional and master data in one place. After establishing the connection, you can edit data, insert rows and columns, set up workflows, and write back changes directly to the connected database.

The following steps explain the process.

[!INCLUDE [Fabric feature-preview-note](../../includes/feature-preview-note.md)]

## Prerequisites

Before you begin, make sure that you have the following prerequisites in place:

* Connections established to the [Fabric SQL database](planning-how-to-create-database-connection.md) and the [semantic model](planning-how-to-create-semantic-model-connection.md) that contain the data for your PowerTable.
* [A plan item](planning-how-to-get-started.md#create-plan-item) created in your Fabric workspace.

[!INCLUDE [new PowerTable sheet](includes/create-powertable.md)]

## Create a table

1. Select **Existing Table** to connect to an existing Fabric SQL database.
1. Choose the database schema and the table name to connect to.
1. Select **Next**.

    :::image type="content" source="media/powertable-how-to-connect-to-a-database/select-existing-database.png" alt-text="Screenshot of selecting an existing database." lightbox="media/powertable-how-to-connect-to-a-database/select-existing-database.png":::

1. PowerTable sheets automatically detect column properties. Review the table configuration. You can modify the input type and/or the primary key if required.
1. Select **Finish.**

    :::image type="content" source="media/powertable-how-to-connect-to-a-database/finish-table.png" alt-text="Screenshot of selecting Finish after configuring the table." lightbox="media/powertable-how-to-connect-to-a-database/finish-table.png":::

You have now successfully connected to a database and created a table app using PowerTable. Click **Save** to save your table.

   :::image type="content" source="media/powertable-how-to-connect-to-a-database/save-table.png" alt-text="Screenshot of saving the new table." lightbox="media/powertable-how-to-connect-to-a-database/save-table.png":::

## Next steps

Configure [access control](powertable-how-to-set-up-access-control.md) and [automated workflows and approvals](powertable-how-to-configure-approval-workflow.md) for your new app.
