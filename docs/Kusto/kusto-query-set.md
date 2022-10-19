---
title: 
description: 
ms.reviewer: 
ms.topic: how-to
ms.date: 10/02/2022
---
## Query data in the KQL Query set

The KQL Query set is the item you'll use to run queries, and view and manipulate query results. Use the KQL Query set to save, export, and share queries with others.

In this article, you'll learn how to create and use a new KQL Query set.

For more information about Kusto Query Language, see [Kusto Query Language overview](/azure/data-explorer/kusto/query/).

## Prerequisites

* Something about a PowerBI type of premium subscription
* Workspace
* Kusto database XXX IS THIS TRULY A PREREQ?

> [!NOTE]
> The query set not the same as the query window within a database. The following image shows the query window within a database:
> :::image type="content" source="media/kusto-query-set/query-window-databases.png" alt-text="Screenshot of query window within a database item.":::

## Create a new query set

A query set exists within the context of a workspace. A new KQL Query set is associated with whichever workspace is open at the time of creation.

1. Browse to the workspace you'll use as context for the query set. Notice the icon on the left menu representing this workspace.
1. Select **+New** > **KQL Query set**

    :::image type="content" source="media/kusto-query-set/create-query-set.png" alt-text="Screenshot of creating new query set.":::

1. Enter a unique name.

### Open an existing query set

To access an existing query set, browse to your workspace and select the desired query set from the list of items. You can also find recent items in the **Quick access** section of the **Home** page.

:::image type="content" source="media/kusto-query-set/open-existing-query-set.png" alt-text="Screenshot of opening an existing query set.":::

## Connect to a database

## Write a query



## Export query data

## Recall

## Share

## Delete query set

1. Select the workspace to which your query set is associated.
1. Hover over the query set you wish to delete. Select **More [...]**, then select **Delete**.

:::image type="content" source="media/kusto-query-set/clean-up-query-set.png" alt-text="Screenshot of how to delete a query set.":::

## Next steps