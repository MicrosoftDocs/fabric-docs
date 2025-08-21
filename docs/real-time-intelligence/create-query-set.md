---
title: Create a KQL queryset
description: Learn how to create a KQL queryset to query the data in your KQL database in Real-Time Intelligence.
ms.reviewer: tzgitlin
author: spelluru
ms.author: spelluru
ms.topic: how-to
ms.custom:
ms.date: 08/21/2025
ms.search.form: KQL Queryset
---
# Create a KQL queryset

In this article, you learn how to create a new KQL queryset. The KQL Queryset is the item used to run queries, view, and customize query results on data from different data sources, such as Eventhouse, KQL database, and more.

## Prerequisites

* A [workspace](../fundamentals/create-workspaces.md) with a Microsoft Fabric-enabled [capacity](../enterprise/licenses.md#capacity)
* A [KQL database](create-database.md) with editing permissions and data

## Create a KQL queryset

The KQL Queryset exists within the context of a workspace. A new KQL queryset is always associated with the workspace you're using when you create it.

1. Go to the desired workspace.
1. Select **+New item**.

    :::image type="content" source="media/kusto-query-set/new-queryset.png" alt-text="Screenshot of adding a new KQL queryset from workspace homepage.":::

    Select **KQL Queryset**. Use the search bar to filter by item type.

    :::image type="content" source="media/kusto-query-set/new-queryset-box.png" alt-text="Screenshot of adding a new KQL queryset in the New item box.":::

1. In the **New KQL Queryset** window, enter a unique name. You can use alphanumeric characters, underscores, periods, and hyphens. Special characters aren't supported.

    > [!NOTE]
    > You can create multiple KQL Querysets in a single workspace.

1. Select **Create**.
1. In the **Get started...** window, add a data source to the KQL Queryset. You can add a data source from the following options:

    Select one of the options to add a data source to the KQL Queryset. For connection details for each option, see [Select a data source](kusto-query-set.md#select-a-data-source).

    - **Eventhouse / KQL Database**: See the list of databases in the OneLake catalog.
    - **Azure Data Explorer**: Connect to Azure Data Explorer (ADX) clusters to query data.
    - **Azure Application Insights**: Run direct or cross-service queries.
    - **Azure Log Analytics**: Connect to Log Analytics workspaces to query direct or cross-service data.

    :::image type="content" source="media/kusto-query-set/new-queryset-add-data-source.png" alt-text="Screenshot of get started page whith add data sources highlighted.":::

## Open an existing KQL queryset

1. To access an existing KQL queryset, go to your workspace.

1. Optionally, you can reduce the number of items displayed by filtering on the item type. Select **Filter** > **KQL Queryset**.

    :::image type="content" source="media/kusto-query-set/filter-queryset.png" alt-text="Screenshot of filtering types of items in workspace.":::

1. Select the KQL queryset from the list of items that appear in the workspace.

## Next step

> [!div class="nextstepaction"]
> [Query data in a KQL queryset](kusto-query-set.md)
