---
title: Create a table update policy in Real-Time Intelligence
description: Learn how to create a table update policy using the `.alter update policy` command.
ms.reviewer: tzgitlin
ms.author: yaschust
author: YaelSchuster
ms.topic: how-to
ms.custom:
  - build-2023
  - ignite-2023
ms.date: 04/21/2024
ms.search.form: product-kusto
---
# Create a table update policy

When you trigger an update policy with a command that adds data to a source table, data also appends to a target table. The target table can have a different schema, retention policy, and other policies from the source table. For example, a high-rate trace source table can contain data formatted as a free-text column. The target table can include specific trace lines, with a well-structured schema generated from a transformation of the source table's free-text data using the [parse operator](/azure/data-explorer/kusto/query/parseoperator?context=/fabric/context/context&pivots=fabric).

For more information, see [update policy](/azure/data-explorer/kusto/management/updatepolicy?context=/fabric/context/context&pivots=fabric).

This article describes how to create an update policy on a table in Real-Time Intelligence using the [.alter table update policy](/azure/data-explorer/kusto/management/alter-table-update-policy-command?context=/fabric/context/context&pivots=fabric) command.

## Prerequisites

* A [workspace](../get-started/create-workspaces.md) with a Microsoft Fabric-enabled [capacity](../enterprise/licenses.md#capacity)
* A [KQL database](create-database.md) with editing permissions

## Table update policy

1. Browse to the main page of your KQL database.
1. Select **New** > **Table update policy**.

    :::image type="content" source="media/table-update-policy/new-policy.png" alt-text="Screenshot of the KQL Database home tab showing the dropdown menu for creating new entities. The dropdown option for creating a table update policy in Real-Time Intelligence is highlighted."  lightbox="media/table-update-policy/new-policy.png":::

    The `.alter update policy` command is automatically populated in the **Explore your data** window.

    :::image type="content" source="media/table-update-policy/policy-in-window.png" alt-text="Screenshot of the Update table policy command in the Explore your data window in Real-Time Intelligence in Microsoft Fabric."  lightbox="media/table-update-policy/policy-in-window.png":::

1. Enter the parameters of your table update policy, and then select **Run**. For more information on these parameters, see [.alter table update policy](/azure/data-explorer/kusto/management/alter-table-update-policy-command?context=/fabric/context/context&pivots=fabric).

## Related content

* [`.show table update policy`](/azure/data-explorer/kusto/management/show-table-update-policy-command?context=/fabric/context/context&pivots=fabric)
* [Query data in a KQL queryset](kusto-query-set.md)
