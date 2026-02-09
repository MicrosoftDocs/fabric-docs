---
title: Create and Manage Stored Functions in Real-Time Intelligence
description: "Learn how to use the `.create-or-alter function` command to create stored functions in Real-Time Intelligence."
ms.reviewer: guregini
ms.author: spelluru
author: spelluru
ms.topic: how-to
ms.custom:
ms.date: 02/09/2026
ms.subservice: rti-eventhouse
ms.search.form: product-kusto
---

# Create and manage stored functions

Functions are reusable queries or query parts. Real-Time Intelligence supports two kinds of functions:

* Built-in functions, which are hard-coded functions that you can't modify.
* User-defined functions, which are divided into two types:

  * Stored functions: user-defined functions that you store and manage as database schema entities, such as tables. For more information on how to create and manage stored functions, see [Stored functions management overview](/azure/data-explorer/kusto/management/functions?context=/fabric/context/context).
  * Query-defined functions: user-defined functions that you define and use within the scope of a single query. You define these functions through a `let` statement. For more information on how to create query-defined functions, see [Create a user defined function](/azure/data-explorer/kusto/query/letstatement?context=/fabric/context/context).

In this article, you learn how to create or alter an existing stored function by using the `.create-or-alter` `function`.

For more information on the `.create-or-alter` `function` command, see [`.create-or-alter function`](/azure/data-explorer/kusto/management/create-alter-function?context=/fabric/context/context).

## Prerequisites

* A [workspace](../fundamentals/create-workspaces.md) with a Microsoft Fabric-enabled [capacity](../enterprise/licenses.md#capacity)
* A [KQL database](create-database.md) with editing permissions

## Create functions

This feature enables you to create or alter an existing function by using the `.create-or-alter` `function` command. The command stores the function in the database metadata. If the function with the provided *functionName* doesn't exist in the database metadata, the command creates a new function. Otherwise, the command changes the named function.

1. Browse to your KQL database, and select **New** > **Function**. The `.create-or-alter` command automatically appears in the **Explore your data** window.

    :::image type="content" source="media/create-functions/function-command.png" alt-text="Screenshot of a KQL database landing page showing the New option dropdown menu. The option titled Function is highlighted."  lightbox="media/create-functions/function-command-extended.png":::

1. Enter the function name and query parameters for your function instead of the placeholder text, and then select **Run**.

    :::image type="content" source="media/create-functions/create-function.png" alt-text="Screenshot of the Explore your data window showing the newly created function in Real-Time Intelligence." lightbox="media/create-functions/create-function.png":::

    Stored functions appear under **Functions** in the **Explorer** pane.

    :::image type="content" source="media/create-functions/functions-object-tree.png" alt-text="Screenshot of Explorer pane showing the list of stored user-defined functions.":::

1. In the **Explore your data** window, run a query to check that you successfully created or altered your function.

    :::image type="content" source="media/create-functions/function-example.png" alt-text="Screenshot of the Explore your data window showing query results of a stored function in Real-Time Intelligence." lightbox="media/create-functions/function-example.png":::

## View and preview a stored function

To view or preview an existing stored function, follow these steps:

1. In the **Explorer** pane, expand the **Functions** section. Select the desired function or the three dots. Select **show function**.
1. A read-only version of the function script opens in the **Explore your data** window. You can select **Preview results** to preview the function results.

     :::image type="content" source="media/create-functions/view-function.png" alt-text="Screenshot of the Explore your data window showing a stored function script." lightbox="media/create-functions/show-function.png":::

## Edit or delete a stored function

To edit or delete an existing stored function, use the following steps:

1. In the **Explorer** pane, expand the **Functions** section, and select the three dots next to the desired function.

1. From the dropdown menu, choose either:
    * **Edit with code** to edit the function script in the **Explore your data** window.
    * **Delete**

    :::image type="content" source="media/create-functions/drop-down-menu.png" alt-text="Screenshot of the dropdown menu." lightbox="media/create-functions/drop-down-menu.png":::
1. If you modified the function script, select **Run** to save your changes.

## Related content

* [Query data in a KQL queryset](kusto-query-set.md)
* [Change data policies](data-policies.md)
* [Create a table update policy](table-update-policy.md)
