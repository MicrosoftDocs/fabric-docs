---
title: Create database connections in plan (preview)
description: "Learn how to create database connections in plan (preview). Connect to existing data or enable multi-user collaboration."
ms.date: 04/29/2026
ms.topic: how-to
---

# Create database connections

This article explains how to create database connections for use in a plan (preview) item.

There are two main use cases for connecting plan items to databases:
* [**Connect plan to existing data**](#connect-plan-to-existing-data). Create this type of database connection to let plan access your existing business data so that you can use that data in Planning sheets. This connection is required to get data into your plan item.
* [**Create a database connection for collaboration**](#create-a-database-connection-for-collaboration). Create this type of database connection to enable multi-user collaboration on plan items. This connection is optional and allows other users to comment and collaborate on a plan that you create.

## Connect plan to existing data

Create this type of database connection to let plan access your existing business data so that you can use that data in Planning sheets. This connection is required to get data into your plan item. This database connection is created once per plan item, and can be reused later.

### Prerequisites

Start with data in a [Fabric SQL database](../../database/sql/overview.md) that you want to connect to in plan.

### Create a database connection

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

### Share the database connection 

You can share the created connection and manage the user permissions. 

1. Next to the name of the connection in your Fabric workspace, select **...** and **Manage users**.

    :::image type="content" source="media/planning-how-to-create-database-connection/manage-users-1.png" alt-text="Screenshot of managing the users for a SQL database resource.":::

1. Edit the permissions and share as needed. 

    :::image type="content" source="media/planning-how-to-create-database-connection/manage-users-2.png" alt-text="Screenshot of editing permissions in the Manage users pane." lightbox="media/planning-how-to-create-database-connection/manage-users-2.png":::

## Create a database connection for collaboration

Create this type of database connection to enable multi-user collaboration on plan items. This connection is optional and allows other users to comment and collaborate on a plan that you create.

### Prerequisites

* You have a plan (preview) item created.
* You have access to Planning sheets.
* You have permission in the plan item to create and manage connections.

### Create a connection to a database for collaboration

1. Inside a plan (preview) item, select **Set up connection**.

    :::image type="content" source="media/planning-how-to-create-database-connection/connection-setup.png" alt-text="Screenshot of database connection setup option for collaboration." lightbox="media/planning-how-to-create-database-connection/connection-setup.png":::

1. Select **Create Connection** to create a new Fabric SQL connection. Alternatively, you can select an existing connection and skip the creation steps.

    :::image type="content" source="media/planning-how-to-create-database-connection/create-connection.jpg" alt-text="Screenshot of creation of database connection  option for collaboration." lightbox="media/planning-how-to-create-database-connection/create-connection.jpg":::

1. Select **Create new connection** from the Connection credentials dropdown menu and select **Create**.

    :::image type="content" source="media/planning-how-to-create-database-connection/new-connection.png" alt-text="Screenshot of adding a new database connection  option for collaboration." lightbox="media/planning-how-to-create-database-connection/new-connection.png":::

1. Enter a **Connection name**.
1. For **Authentication kind**, select *Organizational account*.

    :::image type="content" source="media/planning-how-to-create-database-connection/connection-credentials.png" alt-text="Screenshot of adding credentials for the new database connection  collaboration." lightbox="media/planning-how-to-create-database-connection/connection-credentials.png":::

1. Select **Create**.

A database connection is created to store collaboration data.

## Next steps

Create a Planning sheet that uses the data connections: [Create a Planning sheet](planning-how-to-get-started.md).