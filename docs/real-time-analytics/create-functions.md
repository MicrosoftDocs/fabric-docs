---
title: Create stored functions in Real-Time Analytics
description: "Learn how to use the `.create-or-alter function` command to create stored functions in Real-Time Analytics."
ms.reviewer: tzgitlin
ms.author: yaschust
author: YaelSchuster
ms.topic: how-to
ms.custom:
  - build-2023
  - ignite-2023
ms.date: 09/10/2023
ms.search.form: product-kusto
---

# Create stored functions

Functions are reusable queries or query parts. Real-Time Analytics supports two kinds of functions:

* Built-in functions, which are hard-coded functions that can't be modified by users.
* User-defined functions, which are divided into two types:

  * Stored functions: are user-defined functions that are stored and managed database schema entities (such as tables). For more information on how to create and manage stored functions, see [Stored functions management overview](/azure/data-explorer/kusto/management/functions?context=/fabric/context/context).
  * Query-defined functions: are user-defined functions that are defined and used within the scope of a single query. The definition of such functions is done through a let statement. For more information on how to create query-defined functions, see [Create a user defined function](/azure/data-explorer/kusto/query/letstatement?context=/fabric/context/context).

In this article, you learn how to create or alter an existing stored function using the `.create-or-alter` `function`.

For more information on the `.create-or-alter` `function` command, see [`.create-or-alter function`](/azure/data-explorer/kusto/management/create-alter-function?context=/fabric/context/context)

## Prerequisites

* A [workspace](../get-started/create-workspaces.md) with a Microsoft Fabric-enabled [capacity](../enterprise/licenses.md#capacity)
* A [KQL database](create-database.md) with editing permissions

## Functions

This feature allows you to create or alter an existing function using the `.create-or-alter` `function` command, which stores it in the database metadata. If the function with the provided *functionName* doesn't exist in the database metadata, the command creates a new function. Otherwise, the named function is changed.

1. Browse to your KQL database, and select **New** > **Function**. The `.create-or-alter` command is automatically populated in the **Explore your data** window.

    :::image type="content" source="media/create-functions/function-command.png" alt-text="Screenshot of a KQL database landing page showing the New option dropdown menu. The option titled Function is highlighted."  lightbox="media/create-functions/function-command-extended.png":::

1. Enter the function name and query parameters of your function instead of the placeholder text, and then select **Run**.

    :::image type="content" source="media/create-functions/create-function.png" alt-text="Screenshot of the Explore your data window showing the newly created function in Real-Time Analytics." lightbox="media/create-functions/create-function.png":::

    Stored functions appear under **Functions** in the **Explorer** pane.

    :::image type="content" source="media/create-functions/functions-object-tree.png" alt-text="Screenshot of Explorer pane showing the list of stored user-defined functions.":::

1. In the **Explore your data** window, run a query to check that you have successfully created or altered your function.

    :::image type="content" source="media/create-functions/function-example.png" alt-text="Screenshot of the Explore your data window showing query results of a stored function in Real-Time Analytics." lightbox="media/create-functions/function-example.png":::

## Related content

* [Query data in a KQL queryset](kusto-query-set.md)
* [Change data policies](data-policies.md)
* [Create a table update policy](table-update-policy.md)
