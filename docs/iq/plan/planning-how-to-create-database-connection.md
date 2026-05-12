---
title: Create a Database Connection for Collaboration in a Plan
description: Learn how to create and share database connections in a plan (preview) for multi-user collaboration.
ms.date: 04/30/2026
ms.topic: how-to
---

# Create a database connection for collaboration in a plan

This article explains how to create a database connection to enable multi-user collaboration on plan items.

This connection is optional and allows other users to comment and collaborate on a plan that you create.

[!INCLUDE [Fabric feature-preview-note](../../includes/feature-preview-note.md)]

## Prerequisites

* You have a plan item created.
* You have access to planning sheets.
* You have permission in the plan item to create and manage connections.

## Create a database connection for collaboration

1. Inside a plan item, select **Set up connection**.

    :::image type="content" source="media/planning-how-to-create-database-connection/connection-setup.png" alt-text="Screenshot of database connection setup option for collaboration." lightbox="media/planning-how-to-create-database-connection/connection-setup.png":::

1. On **Select Fabric SQL Connection**, select **Create Connection**. Alternatively, you can select an existing connection and skip the creation steps.

    :::image type="content" source="media/planning-how-to-create-database-connection/create-connection.jpg" alt-text="Screenshot of creation of database connection option for collaboration." lightbox="media/planning-how-to-create-database-connection/create-connection.jpg":::

1. From the **Connections credentials** dropdown menu, select **Create new connection**, and then select **Create**.

    :::image type="content" source="media/planning-how-to-create-database-connection/new-connection.png" alt-text="Screenshot of adding a new database connection option for collaboration." lightbox="media/planning-how-to-create-database-connection/new-connection.png":::

1. Enter a connection name.

1. For **Authentication kind**, select **Organizational account**.

    :::image type="content" source="media/planning-how-to-create-database-connection/connection-credentials.png" alt-text="Screenshot of adding credentials for the new database connection collaboration." lightbox="media/planning-how-to-create-database-connection/connection-credentials.png":::

1. Select **Create**.

Now you have a database connection to store collaboration data.

## Share the database connection

You can share the created connection and manage the user permissions.

1. Next to the name of the connection in your Microsoft Fabric workspace, select **...**, and then select **Manage users**.

    :::image type="content" source="media/planning-how-to-create-database-connection/manage-users-1.png" alt-text="Screenshot of managing the users for a SQL database resource.":::

1. Edit the permissions and share as needed.

    :::image type="content" source="media/planning-how-to-create-database-connection/manage-users-2.png" alt-text="Screenshot of editing permissions in the Manage users pane." lightbox="media/planning-how-to-create-database-connection/manage-users-2.png":::

## Related content

* [Create a planning sheet](planning-how-to-get-started.md).
