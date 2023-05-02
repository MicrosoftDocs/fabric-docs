---
title: Create a table update policy in Synapse Real-Time Analytics in Microsoft Fabric
description: Learn how to create a table update policy in Synapse Real-Time Analytics in Microsoft Fabric
ms.reviewer: tzgitlin
ms.author: yaschust
author: YaelSchuster
ms.topic: how-to
ms.date: 05/23/2023
ms.search.form: product-kusto
---
# Create a table update policy

[!INCLUDE [preview-note](../includes/preview-note.md)]

When you trigger an update policy with a command that adds data to a source table, data also appends to a target table. The target table can have a different schema, retention policy, and other policies from the source table. For example, a high-rate trace source table can contain data formatted as a free-text column. The target table can include specific trace lines, with a well-structured schema generated from a transformation of the source table's free-text data using the [parse operator](/azure/data-explorer/kusto/query/parseoperator?context=/fabric/context/context&pivots=fabric). For more information, see [update policy](/azure/data-explorer/kusto/management/updatepolicy?context=/fabric/context/context&pivots=fabric).

This article describes how to create an update policy on a table in Synapse Real-Time Analytics using the [.alter table update policy](/azure/data-explorer/kusto/management/alter-table-update-policy-command?context=/fabric/context/context&pivots=fabric) command.

## Prerequisites

* [Power BI Premium](/power-bi/enterprise/service-admin-premium-purchase) enabled [workspace](../get-started/create-workspaces.md)
* [KQL database](create-database.md)

## Table update policy

1. Browse to the main page of your KQL database that holds the table for which you want to create an update policy.
1. Select **New** > **Table update policy**
    
    :::image type="content" source="media/table-update-policy/new-policy.png" alt-text="Screenshot of adding new table update policy in Synapse Real-Time Analytics in Microsoft Fabric.":::
    
    The `.alter update policy` command is automatically populated in the **Check your data** window.
    
    :::image type="content" source="media/table-update-policy/policy-in-window.png" alt-text="Screenshot of update policy in check your data window in Synapse Real-Time Analytics in Microsoft Fabric.":::

1. Enter the parameters of your materialized view, and then select **Run**. For more information on these parameters, see [.alter table update policy](/azure/data-explorer/kusto/management/alter-table-update-policy-command?context=/fabric/context/context&pivots=fabric).

## Next steps

* [`.show table update policy`](/azure/data-explorer/kusto/management/show-table-update-policy-command?context=/fabric/context/context&pivots=fabric)
* [Query data in the KQL Queryset](kusto-query-set.md)