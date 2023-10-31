---
title: Change the data retention policy in Real-Time Analytics
description: Learn how to create a data retention policy in Real-Time Analytics.
ms.reviewer: tzgitlin
ms.author: yaschust
author: YaelSchuster
ms.topic: how-to
ms.custom: build-2023
ms.date: 10/22/2023
ms.search.form: product-kusto
---
# Change the data retention policy

[!INCLUDE [preview-note](../includes/preview-note.md)]

The retention policy controls the mechanism that automatically removes data from tables or [materialized views](/azure/data-explorer/kusto/management/materialized-views/materialized-view-overview?context=/fabric/context/context&pivots=fabric). It's useful to remove data that continuously flows into a table, and whose relevance is age-based. For example, the policy can be used for a table that holds diagnostics events that might become uninteresting after two weeks. The default data retention policy is 36,500 days.

For more information, see [Retention policy](/azure/data-explorer/kusto/management/retentionpolicy?context=/fabric/context/context).  

## Prerequisites

* A [workspace](../get-started/create-workspaces.md) with a Microsoft Fabric-enabled [capacity](../enterprise/licenses.md#capacity)
* A [KQL database](create-database.md) with editing permissions

## Change data retention policy

1. To change the data retention policy, browse to your KQL database and select **Manage** > **Data policies**.

    :::image type="content" source="media/data-management/data-policies.png" alt-text="Screenshot showing the manage tab in a KQL database." :::

1. Under **Retention**, either select the toggle to set the retention period to **Unlimited**, or enter a time period and select **Done**. By default, your data is stored for 3650 days.

    :::image type="content" source="media/data-management/retention-policy.png" alt-text="Screenshot of data retention policy pane with default value.":::

> [!NOTE]
> The minimum retention period is 1 day. The maximum retention period is 36,500 days.

## Related content

* [Change the caching policy](cache-policy.md)
* [Create materialized views](materialized-view.md)
* [Enable Python plugin](python-plugin.md)
