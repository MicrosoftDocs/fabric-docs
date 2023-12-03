---
title: Query data in a KQL queryset
description: Learn how to use the KQL queryset to query the data in your KQL database in Real-Time Analytics.
ms.reviewer: tzgitlin
author: YaelSchuster
ms.author: yaschust
ms.topic: how-to
ms.custom:
  - build-2023
  - build-2023-dataai
  - build-2023-fabric
  - ignite-2023
ms.date: 12/03/2023
ms.search.form: KQL Queryset
---
# Query data in a KQL queryset

In this article, you learn how to create and use a new KQL queryset.

The KQL Queryset is the item used to run queries, view, and customize query results on data from a KQL database.  Each tab in the KQL queryset can be associated with a different KQL database, and lets your save queries for later use or share with others to collaborate on data exploration. You can also change the KQL database associated with any tab, allowing you to run the same query on data in different states.

The KQL Queryset uses the Kusto Query language for creating queries, and also supports many SQL functions. For more information about the query language, see [Kusto Query Language overview](/azure/data-explorer/kusto/query/index?context=/fabric/context/context).

## Prerequisites

* A [workspace](../get-started/create-workspaces.md) with a Microsoft Fabric-enabled [capacity](../enterprise/licenses.md#capacity)
* A [KQL database](create-database.md) with editing permissions and data

## Create a KQL queryset

The KQL Queryset exists within the context of a workspace. A new KQL queryset is always associated with the workspace you're using when you create it.

1. Browse to the desired workspace.
1. Select **+New** > **KQL Queryset**

    :::image type="content" source="media/kusto-query-set/new-queryset.png" alt-text="Screenshot of adding a new KQL queryset from workspace homepage.":::

1. Enter a unique name. You can use alphanumeric characters, underscores, periods, and hyphens. Special characters aren't supported.

    :::image type="content" source="media/kusto-query-set/queryset-name.png" alt-text="Screenshot of adding name to queryset.":::

    > [!NOTE]
    > You can create multiple KQL Querysets in a single workspace.

1. Select **Create**

### Open an existing queryset

1. To access an existing queryset, browse to your workspace.
1. Select the desired KQL Queryset from the list of items.
1. Optionally, you can reduce the number of items displayed by filtering on the item type. Select **Filter**>**KQL Queryset**

    :::image type="content" source="media/kusto-query-set/filter-queryset.png" alt-text="Screenshot of filtering types of items in workspace.":::

1. Select the KQL queryset from the list of items that appear in the workspace.

    :::image type="content" source="media/kusto-query-set/open-existing-query-set.png" alt-text="Screenshot of Microsoft Fabric workspace showing KQL Querysets." lightbox="media/kusto-query-set/open-existing-query-set.png":::

## Connect to a database

Queries run in the context of a database. You can change the associated database at any point, and retain the queries saved in the query editor.

1. To connect your KQL queryset to a database, select **Select database**, and then select a database from the data hub that appears.

:::image type="content" source="media/kusto-query-set/select-database.png" alt-text="Screenshot of the KQL queryset database selection pane. The option titled Select  database is highlighted.":::

A list of tables associated with this database will appear below the database name.

## Manage tabs

:::image type="content" source="media/kusto-query-set/manage-tabs.png" alt-text="Screenshot of the options for editing tabs in the KQL Queryset.":::

* **Rename a tab**: Select the **pencil icon** next to the tab name.
* **Add a new tab**: Select the plus **+** to the right of the existing tabs. Different tabs can be connected to different databases.
* **Change the existing database connection**: Under **Database**, select the existing database connection to open the data hub.

## Next step

> [!div class="nextstepaction"]
> [Customize results in the KQL Queryset results grid](customize-results.md)
