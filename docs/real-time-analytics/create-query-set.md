---
title: Create a KQL queryset
description: Learn how to create a KQL queryset to query the data in your KQL database in Real-Time Analytics.
ms.reviewer: tzgitlin
author: YaelSchuster
ms.author: yaschust
ms.topic: how-to
ms.date: 01/25/2024
ms.search.form: KQL Queryset
---
# Create a KQL queryset

In this article, you learn how to create a new KQL queryset. The KQL Queryset is the item used to run queries, view, and customize query results on data from a KQL database.

## Prerequisites

* A [workspace](../get-started/create-workspaces.md) with a Microsoft Fabric-enabled [capacity](../enterprise/licenses.md#capacity)
* A [KQL database](create-database.md) with editing permissions and data

## Create a KQL queryset

The KQL Queryset exists within the context of a workspace. A new KQL queryset is always associated with the workspace you're using when you create it.

1. Browse to the desired workspace.
1. Select **+New** > **KQL Queryset**.

    :::image type="content" source="media/kusto-query-set/new-queryset.png" alt-text="Screenshot of adding a new KQL queryset from workspace homepage.":::

1. Enter a unique name. You can use alphanumeric characters, underscores, periods, and hyphens. Special characters aren't supported.

    :::image type="content" source="media/kusto-query-set/queryset-name.png" alt-text="Screenshot of adding name to queryset.":::

    > [!NOTE]
    > You can create multiple KQL Querysets in a single workspace.

1. Select **Create**.
1. In the **OneLake data hub** window that appears, select a KQL database with which to associate your KQL queryset.
1. Select **Select**.

:::image type="content" source="media/kusto-query-set/select-database.png" alt-text="Screenshot of the OneLake data hub window showing a list of KQL databases.":::

## Open an existing KQL queryset

1. To access an existing KQL queryset, browse to your workspace.

1. Optionally, you can reduce the number of items displayed by filtering on the item type. Select **Filter**>**KQL Queryset**

    :::image type="content" source="media/kusto-query-set/filter-queryset.png" alt-text="Screenshot of filtering types of items in workspace.":::

1. Select the KQL queryset from the list of items that appear in the workspace.

    :::image type="content" source="media/kusto-query-set/open-existing-query-set.png" alt-text="Screenshot of Microsoft Fabric workspace showing KQL Querysets." lightbox="media/kusto-query-set/open-existing-query-set.png":::

## Next step

> [!div class="nextstepaction"]
> [Query data in a KQL queryset](kusto-query-set.md)
