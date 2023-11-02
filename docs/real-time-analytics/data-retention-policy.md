---
title: Change the data retention policy in Real-Time Analytics
description: Learn how to create a data retention policy in Real-Time Analytics.
ms.reviewer: tzgitlin
ms.author: yaschust
author: YaelSchuster
ms.topic: how-to
ms.custom: build-2023
ms.date: 05/23/2023
ms.search.form: product-kusto
---
# Change the data retention policy

The retention policy controls the mechanism that automatically removes data from tables or [materialized views](/azure/data-explorer/kusto/management/materialized-views/materialized-view-overview?context=/fabric/context/context&pivots=fabric). It's useful to remove data that continuously flows into a table, and whose relevance is age-based. For example, the policy can be used for a table that holds diagnostics events that may become uninteresting after two weeks. The default data retention policy is 36,500 days.

For more information, see [Retention policy](/azure/data-explorer/kusto/management/retentionpolicy?context=/fabric/context/context).  

## Prerequisites

* A [workspace](../get-started/create-workspaces.md) with a Microsoft Fabric-enabled [capacity](../enterprise/licenses.md#capacity)
* A [KQL database](create-database.md)

## Change data retention policy

1. Browse to your KQL database and select the **Manage** > **Data retention policy**

    :::image type="content" source="media/data-management/manage-retention-policy.png" alt-text="Screenshot showing the manage tab in a KQL database."  lightbox="media/data-management/manage-retention-policy.png":::

1. Enter a time period and select **Done**. By default, your data is stored for 36,500 days.

    :::image type="content" source="media/data-management/retention-policy.png" alt-text="Screenshot of data retention policy pane with default value.":::

## Related content

* [Get data from a blob](get-data-blob.md)
* [Create materialized views](materialized-view.md)
* [Create a table update policy](table-update-policy.md)
