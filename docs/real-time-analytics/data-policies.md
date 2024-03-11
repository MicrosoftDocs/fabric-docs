---
title: Change data policies in Real-Time Analytics
description: Learn how to change the retention and caching policies in Real-Time Analytics.
ms.reviewer: tzgitlin
ms.author: yaschust
author: YaelSchuster
ms.topic: how-to
ms.custom:
  - build-2023
  - ignite-2023
  - ignite-2023-fabric
ms.date: 10/22/2023
ms.search.form: product-kusto
---

# Change data policies

In this article, you learn how to change the [Data retention policy](#data-retention-policy) and the [Caching policy](#caching-policy) in your KQL database.

## Prerequisites

* A [workspace](../get-started/create-workspaces.md) with a Microsoft Fabric-enabled [capacity](../enterprise/licenses.md#capacity)
* A [KQL database](create-database.md) with editing permissions

## Data retention policy

The retention policy controls the mechanism that automatically removes data from tables or [materialized views](/azure/data-explorer/kusto/management/materialized-views/materialized-view-overview?context=/fabric/context/context&pivots=fabric). It's useful to remove data that continuously flows into a table, and whose relevance is age-based. For example, the policy can be used for a table that holds diagnostics events that might become uninteresting after two weeks. The default data retention policy is 36,500 days.

For more information, see [Retention policy](/azure/data-explorer/kusto/management/retentionpolicy?context=/fabric/context/context).  

1. To change the data retention policy, browse to your KQL database and select **Manage** > **Data policies**.

    :::image type="content" source="media/data-policies/data-policies.png" alt-text="Screenshot showing the manage tab in a KQL database." :::

1. Under **Retention**, either select the toggle to set the retention period to **Unlimited**, or enter a time period and select **Done**. By default, your data is stored for 3650 days.

    :::image type="content" source="media/data-policies/retention-policy.png" alt-text="Screenshot of data retention policy pane with default value.":::

    > [!NOTE]
    > The minimum retention period is 1 day. The maximum retention period is 36,500 days.

## Caching policy

The caching policy allows to you to choose which data should be cached and kept in local SSD storage. The availability of data in hot cache increases query performance but also storage costs. In Real-Time Analytics, you can enable a caching policy on KQL Databases. After enabling caching, you can set the time span that the data remains in the hot cache.

For more information, see [Caching policy](/azure/data-explorer/kusto/management/cachepolicy?context=/fabric/context/context&pivots=fabric).

1. To change the caching policy, browse to your KQL database and select **Manage** > **Data policies**.

    :::image type="content" source="media/data-policies/data-policies.png" alt-text="Screenshot showing the manage tab in a KQL database." :::

1. Under **Caching**, either select the toggle to set the caching period to **Unlimited**, or enter a time period and select **Done**. By default, your data is cached for 3650 days.

    :::image type="content" source="media/data-policies/caching-policy.png" alt-text="Screenshot of caching policy pane with default value.":::

    > [!NOTE]
    > The time period you set for the caching policy must be lower than or equal to the data retention time period.

## Related content

* [Create materialized views](materialized-view.md)
* [Enable Python plugin](python-plugin.md)
