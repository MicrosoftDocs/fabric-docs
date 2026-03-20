---
title: Connect PowerTable sheet to a semantic model
description: Learn how to connect a PowerTable sheet to a semantic model and build collaborative table apps with live data synchronization.
ms.date: 03/11/2026
ms.topic: how-to
#customer intent: As a user, I want to connect PowerTable sheets to a semantic model so that I can build a collaborative table app using governed data from my existing Power BI or Fabric semantic model.
---

# Connect PowerTable sheet to a semantic model

In this article, you look at the steps to connect to a semantic model from a PowerTable sheet. Connect to an existing semantic model and create a table app. The data table, along with any changes or updates, is saved to your preferred destination database.

[!INCLUDE [Fabric feature-preview-note](../../includes/feature-preview-note.md)]

>[!NOTE]
> You can also create a table by uploading data from an Excel or CSV file. For more information, see [Create a table app with PowerTable sheets](powertable-how-to-create-table-app.md).

## Prerequisites

Before you begin, make sure you have the following prerequisites in place:

* A Fabric SQL database to store your app's metadata.
* [Connections or data sources](../../data-factory/data-source-management.md) to the Fabric SQL database and semantic model.
* A Plan item in your Fabric workspace.

[!INCLUDE [new PowerTable sheet](includes/create-powertable.md)]

[!INCLUDE [SQL database connection](includes/connect-sql-database.md)]

## Create a table

1. Select **New Table**.
1. Choose the database schema.
1. Enter a **Table Name**.
1. Choose **Connect To Semantic Model** in **Import Data**.
1. Select your **Connection** and the required **Semantic Model**.
1. Select **Next**.

    :::image type="content" source="media/powertable-how-to-connect-semantic-model/new-table.png" alt-text="Screenshot of filling in the table details described in this section.":::