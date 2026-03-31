---
title: Get started with Planning sheets
description: Learn how to get started with your first Planning sheet in plan (preview). Discover how to create a Planning sheet, connect to your semantic model, and perform planning, budgeting, forecasting, and data analysis.
ms.date: 03/27/2026
ms.topic: how-to
---

# Get started with Planning sheets

This article describes how to get started with your first Planning sheet in plan (preview).

[!INCLUDE [Fabric feature-preview-note](../../includes/feature-preview-note.md)]

## Prerequisites

Before you set up Planning sheets, make sure you have the following prerequisites in place:

* Create your individual [connections or data sources](../../data-factory/data-source-management.md) to connect with a [Fabric SQL database](../../database/sql/overview.md) and [Power BI semantic model](../../data-warehouse/semantic-models.md).
* A Fabric SQL database is auto-created in your workspace. This database stores your plan report's metadata.

> [!NOTE]
> The preview of plan in Fabric IQ is now accessible to organizations worldwide in Microsoft Fabric as part of the Microsoft Fabric SKU, and new meters have been created. Meters are currently available but are not currently billed.

## Create a database connection

1. Go to **Settings > Manage connections and gateways**.
1. Select **New**.
1. Select **Cloud**.
1. Enter a **Database Connection name**.
1. For **Connection type**, select *SQL database in Fabric*.
1. Set the **Authentication method** to *OAuth 2.0*.
1. Select **Edit credentials**, then sign in with your Microsoft account.
1. Select **Create** to create the connection.

:::image type="content" source="media/planning-sheet-how-to-get-started/new-connection-database.png" alt-text="Screenshot of creating a new database connection.":::

You can share the created connection and manage the user permissions.

:::image type="content" source="media/planning-sheet-how-to-get-started/manage-users-1.png" alt-text="Screenshot of managing the users for a SQL database resource.":::

:::image type="content" source="media/planning-sheet-how-to-get-started/manage-users-2.png" alt-text="Screenshot of editing permissions in the Manage users pane." lightbox="media/planning-sheet-how-to-get-started/manage-users-2.png":::

## Create a connection for the semantic model

1. Go to **Settings > Manage connections and gateways**. 
1. Select **New**.
1. Select **Cloud**. 
1. Enter a **Connection name**. 
1. For **Connection type**, select *Power BI Semantic Model*. 
1. Set the **Authentication method** to *OAuth 2.0*.
1. Select **Edit credentials**, then sign in with your Microsoft account. 
1. Select **Create** to create the connection. 

    :::image type="content" source="media/planning-sheet-how-to-get-started/new-connection-semantic-model.png" alt-text="Screenshot of creating a new semantic model connection.":::

This connection is used to connect to your semantic models when you create a plan.

## Create Planning sheet

1. Start in your Fabric workspace.
1. Create a **New folder**.
1. In the new folder, create a **New item > Plan (preview)**.

    :::image type="content" source="media/planning-sheet-how-to-get-started/new-plan-1.png" alt-text="Screenshot of creating a new Plan (preview) item." lightbox="media/planning-sheet-how-to-get-started/new-plan-1.png":::

1. Name your plan, make sure it is located in the new folder, and **Create** it.

    :::image type="content" source="media/planning-sheet-how-to-get-started/new-plan-2.png" alt-text="Screenshot of providing name and location details for a new Plan.":::

1. **Connect** to an existing connection that you created with the previous steps.

    :::image type="content" source="media/planning-sheet-how-to-get-started/new-plan-3.png" alt-text="Screenshot of selecting an existing Fabric SQL Connection.":::

1. **Select** the database to store your items and click **Add**
> [!NOTE]
> The database is automatically created when a Planning item is created.

:::image type="content" source="media/planning-sheet-how-to-get-started/new-plan-4.png" alt-text="Screenshot of choosing the database details.":::

1. Get your data from the semantic model or Excel/CSV, then create a Planning sheet. Or, start with a Planning sheet and then connect to data.

    :::image type="content" source="media/planning-sheet-how-to-get-started/new-plan-5.png" alt-text="Screenshot of the getting started options.":::

## Connect a Planning sheet to a semantic model

1. Click **Add** and **Connect** to your semantic model connection.

    :::image type="content" source="media/planning-sheet-how-to-get-started/new-plan-6.png" alt-text="Screenshot of connecting to a semantic model." lightbox="media/planning-sheet-how-to-get-started/new-plan-6.png":::

1. Select the semantic model and click **Add**.

    :::image type="content" source="media/planning-sheet-how-to-get-started/new-plan-7.png" alt-text="Screenshot of choosing a semantic model.":::

1. **Add** semantic model **data** into your **fields**. Now your first Planning sheet is created.
   
   :::image type="content" source="media/planning-sheet-how-to-get-started/planning-sheet.png" alt-text="Screenshot of the created planning sheet.":::
