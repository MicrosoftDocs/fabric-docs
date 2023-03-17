---
title: Auto-generated commands in Real-Time Analytics
description: Learn how to use query data with auto-generated queries and commands.
ms.reviewer: tzgitlin
ms.author: yaschust
author: YaelSchuster
ms.topic: quickstart / get-started
ms.date: 03/17/2023
ms.search.form: product-kusto
---

# <!--Quickstart: Query data with quick queries and commands--> Get started with quick queries and commands

<!-- I think a quickstart is more suitable because it can include prerequisites, and we can have multiple sections with numbered steps-->

Real-time Analytics offers a variety of features that makes it easy to start analyzing your data. You can either do <!-- ABC---> using [Materialized view](#materialized-view), create or alter an existing stored user-defined [function](#function), or use auto-generated queries to [Query your table](#query-table) and get an initial look at your data.

## Prerequisites

* Power BI Premium subscription. For more information, see [How to purchase Power BI Premium](/power-bi/enterprise/service-admin-premium-purchase).
* A Workspace
* A [KQL database](create-database.md)

## Materialized view

Materialized views is an aggregation query over a source table. It represents a single `summarize` statement. <!-- MORE INFO-->

:::image type="content" source="media/auto-generated-cmds/materialized-view.png" alt-text="Screenshot of the New option dropdown menu. The option titled Materialized view is highlighted.":::

1. Select **New** > **Materialized view**.
1. In the **Check your data** window, enter your table name and parameters.
1. Select **Run** to create or alter the materialized view.

## Function

This feature allows you to create or alter an existing stored function using the `.create-or-alter` `function` command. If the function with the provided *functionName* doesn't exist in the database metadata, the command creates a new function. Otherwise, that function will be changed.

:::image type="content" source="media/auto-generated-cmds/function-cmd.png" alt-text="Screenshot of the New option dropdown menu. The option titled Function is highlighted.":::

1. Select **New** > **Function**.
1. In the **Check your data** window, enter the parameters for your function, then select **Run** to run the query.

## Query table

Use the list of auto-generated queries to get an initial look at your data. The source table name is automatically populated according to the selected table in the **Object tree**.

:::image type="content" source="media/auto-generated-cmds/query-table.png" alt-text="Screenshot of Object tree showing the More menu of a table. The option titled Query table is highlighted.":::

1. In the **Object tree**, select the **more menu** on your table.
1. Select **Query table** to open a list of quick queries.
1. Choose a query, or select **Paste all query templates** to paste all of the query table in the **Check your data** window.

## Next steps

[Query data in the KQL Queryset](kusto-query-set.md)
