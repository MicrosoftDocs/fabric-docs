---
title: Create a KQL database
description: Learn how to create a KQL database in Real-Time Intelligence.
ms.reviewer: tzgitlin
ms.topic: how-to
ms.subservice: rti-eventhouse
ms.date: 02/24/2026
ms.search.form: KQL Database
---
# Create a KQL database

In Real-Time Intelligence, you interact with your data in the context of [eventhouses](eventhouse.md), databases, and tables. A single workspace can hold multiple Eventhouses, an eventhouse can hold multiple databases, and each database can hold multiple tables.

In this article, you learn how to create a new KQL database. Once your KQL database has data, you can proceed to query your data using Kusto Query Language in a KQL queryset.

## Prerequisites

* A [workspace](../fundamentals/create-workspaces.md) with a Microsoft Fabric-enabled [capacity](../enterprise/licenses.md#capacity)

## Create a new KQL database

1. To create a new KQL database, in the Eventhouse explorer either:

    * Select **Eventhouse** then **New database +**
    * Under **KQL Databases** select **+**  

      :::image type="content" source="media/create-database/create-database.png" alt-text="Screenshot showing the eventhouse KQL Databases section.":::

1. Enter your database name, select your database type, either **New database (default)** or **New shortcut database (follower)**, then select **Create**. For information about follower databases, see [Create a database shortcut](database-shortcut.md).

    > [!NOTE]
    > The database name can contain alphanumeric characters, underscores, periods, and hyphens. Special characters aren't supported.

    :::image type="content" source="media/create-database/new-database.png" alt-text="Screenshot of the New KQL Database window showing the database name. The Create button is highlighted.":::

The KQL database is created within the context of the selected eventhouse. You can also [Create an empty table](create-empty-table.md).

### Explore your KQL database with the embedded KQL queryset

When you create a new KQL database, an attached environment is automatically created to explore and manage the KQL database using [KQL queries](/kusto/query/).

1. To access the embedded KQL queryset, select the *KQLdatabasename_queryset* item from your KQL database object tree.

    :::image type="content" source="media/create-database/attached-queryset.png" alt-text="Screenshot of the new embedded KQL queryset item within the database explorer pane." lightbox="media/create-database/attached-queryset.png":::

1. To rename the query environment, select the **Pencil icon** next to its name, and enter a new name.

    :::image type="content" source="media/create-database/rename-queryset.png" alt-text="Screenshot of the Rename queryset window showing the queryset name and the Pencil icon.":::

> [!TIP]
> You can also [analyze data with](eventhouse-analyze-data-with.md) an SQL analytics endpoint or notebook, or create a standalone [KQL queryset](create-query-set.md).

## Related content

* [Manage and monitor a database](manage-monitor-database.md)
* [Get data overview](get-data-overview.md)
* [KQL queries](/kusto/query/)
