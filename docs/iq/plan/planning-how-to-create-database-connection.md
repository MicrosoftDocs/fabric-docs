---
title: Create a database connection in plan (preview)
description: "Learn how to create a database connection in plan (preview)."
ms.date: 04/02/2026
ms.topic: how-to
---

# Create a database connection

This article explains how to create a database connection from a plan (preview) item.

This is a one-time action performed during the initial creation of a Planning sheet, and can be reused later.

## Prerequisites

Before you can create the database connection, make sure you have the following prerequisite in place:

* Data in a [Fabric SQL database](../../database/sql/overview.md)

## Create a database connection

1. In your Fabric toolbar, select the **Settings** icon. Select **Manage connections and gateways**.

    :::image type="content" source="media/planning-how-to-create-semantic-model-connection/manage-connection-gateways.png" alt-text="Screenshot of opening the manage connection gateways settings.":::

1. Select **New**.
1. Select **Cloud**.
1. Enter a **Database Connection name**.
1. For **Connection type**, select *SQL database in Fabric*.
1. Set the **Authentication method** to *OAuth 2.0*.
1. Select **Edit credentials**, then sign in with your Microsoft account.
1. Select **Create**.

:::image type="content" source="media/planning-how-to-create-database-connection/new-connection-database.png" alt-text="Screenshot of creating a new database connection.":::

## Share the database connection 

You can share the created connection and manage the user permissions. 

1. Next to the name of the connection in your Fabric workspace, select **...** and **Manage users**.

    :::image type="content" source="media/planning-how-to-create-database-connection/manage-users-1.png" alt-text="Screenshot of managing the users for a SQL database resource.":::

1. Edit the permissions and share as needed. 

    :::image type="content" source="media/planning-how-to-create-database-connection/manage-users-2.png" alt-text="Screenshot of editing permissions in the Manage users pane." lightbox="media/planning-how-to-create-database-connection/manage-users-2.png":::

## Next steps

Now that your database connection is created, you can create a Planning sheet that uses this connection: [Create a Planning sheet](planning-how-to-get-started.md).