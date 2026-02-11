---
title: What is the Microsoft Fabric Capacity Metrics app?
description: Learn how to evaluate your Microsoft Fabric capacity's health, by reading the metrics app.
author: julcsc
ms.author: juliacawthra
ms.topic: concept-article
ms.custom:
ms.date: 01/14/2026
---

# What is the Microsoft Fabric Capacity Metrics app?

Fabric resides on a capacity, which is a pool of resources allocated to your platform. Each capacity has its own number of [Capacity Units (CUs)](licenses.md). You use CUs to measure the compute power available for your capacity.

The Microsoft Fabric Capacity Metrics app provides monitoring capabilities for Microsoft Fabric capacities. Use the app to monitor your capacity consumption and make informed decisions on how to use your capacity resources. For example, the app can help identify when to scale up your capacity or when to turn on autoscale. For more information about autoscale, see [Autoscale your Fabric capacity](/power-bi/enterprise/service-premium-auto-scale).

The app is updated often with new features and functionalities. It provides the most in-depth information into how your capacities are performing.

> [!NOTE]
> The Microsoft Fabric Capacity Metrics app supports both EM/A and P SKUs.

## Install the app

You must be a capacity admin to install and view the Microsoft Fabric Capacity Metrics app.

To install the app, follow the instructions in [Install the Microsoft Fabric Capacity Metrics app](metrics-app-install.md).

## Features and functionalities

The Microsoft Fabric Capacity Metrics app provides various features and functionalities to help you monitor and manage your capacities effectively. The app includes the following pages:

- **Health** page (preview): Get a high-level overview for all capacities you're admin of, and identify those capacities consuming the most compute or experiencing issues like throttling or query rejections. For more information, see [Understand the metrics app Health page](metrics-app-health-page.md).

- **Compute** page: Get a 14-day view of your capacity’s compute performance. Visuals include ribbon charts, utilization trends, and a matrix of operations, helping you analyze usage patterns, peak loads, and throttling events. For more information, see [Understand the metrics app compute page](metrics-app-compute-page.md).

- **Storage** page: Monitor storage usage over the past 30 days. View current and billable storage by workspace, track soft-deleted data, and explore trends through column charts and detailed tables. For more information, see [Understand the metrics app storage page](metrics-app-storage-page.md).

- **Timepoint** page: Drill into a specific 30-second timepoint to see which operations - interactive or background - consumed the most compute. Use this page to diagnose overloads and understand autoscale or throttling behavior. For more information, see [Understand the metrics app timepoint page](metrics-app-timepoint-page.md).

- **Timepoint summary** page (preview): Summarizes operation types (not individual operations) that contributed to capacity usage during a selected timepoint. Ideal for identifying high-impact workloads and understanding autoscale thresholds. For more information, see [Understand the metrics app timepoint summary page](metrics-app-timepoint-summary-page.md).

- **Timepoint item detail** page (preview): Provides granular detail on operations within a specific item at a timepoint. Includes filters for operation ID, user, and CU thresholds that are useful for root-cause analysis and performance tuning. For more information, see [Understand the metrics app timepoint item detail page](metrics-app-timepoint-item-detail-page.md).

- **Autoscale compute for Spark** page: This page provides insights into the autoscaling behavior of Spark workloads, helping you optimize performance and resource allocation. For more information, see [Understand the metrics app Autoscale compute for Spark page](metrics-app-feature-autoscale-page.md).

- **Autoscale compute for Spark detail** page: Dive deeper into autoscale operations to understand which workloads triggered scaling and how they contributed to overall capacity usage. For more information, see [Understand Autoscale compute for Spark detail page](metrics-app-feature-autoscale-detail-page.md).

- **Plan capacity**: Learn how to estimate the right capacity SKU for your workloads using the metrics app and the Fabric SKU Estimator. Helps avoid over- or underprovisioning. For more information, see [Plan your capacity size](plan-capacity.md).

- **Monitor paused capacity**: Track when a capacity was paused or resumed, and understand why utilization spikes may appear during pauses. Includes guidance on interpreting `carryforward` operations. To learn more, see [Monitor a paused capacity](monitor-paused-capacity.md).

- **Calculations**: Understand how the app computes key metrics like CU usage, throttling, and autoscale impact. Useful for interpreting visuals and validating internal reporting. For more information, see [Metrics app calculations](metrics-app-calculations.md).

## Data latency

Data in the Microsoft Fabric Capacity Metrics app is subject to processing and refresh latency. In general, usage data becomes available within 10 to 15 minutes after the activity occurs. For example, at 5:15 PM (local time), charts such as the utilization chart might display data up to approximately 5:00 PM.

Some dimensions, including **capacities**, **workspaces**, and **items**, refresh as part of a scheduled semantic model refresh at midnight (local time). As a result, changes such as creating a new capacity, workspace, or item, or moving a workspace between capacities, appear in the app after the next refresh.

## Share the Fabric Capacity Metrics report

When you install the Microsoft Fabric Capacity Metrics app, it creates a workspace in your Microsoft Fabric tenant. To share the report, you must be a capacity admin.

To share the Fabric Capacity Metrics report, follow these steps:

1. Open the Microsoft Fabric Capacity Metrics app.
1. Go to the workspace where you installed the app.
1. Select **Share**.

You can choose to share with *users in your organization* or with *business-to-business (B2B) users from an external organization who are invited into your tenant as guests (via Azure B2B collaboration)*. This option is useful when you want someone outside your organization, like a consultant or partner, to view Fabric Capacity Metrics without moving them into your internal tenant.

> [!NOTE]
> Without sharing, even if you add the B2B user to the tenant, they can't access the report.

## Considerations and limitations

When using the Microsoft Fabric Capacity Metrics app, consider the following considerations and limitations:

- Update the parameters and refresh the semantic model whenever your available capacities change. For example, if you obtain JIT tenant admin access, update the *RegionName* parameter in the semantic model settings (as described in the installation guidance) and then refresh the model after access is granted.

- The Microsoft Fabric Capacity Metrics app doesn't support alerts or notifications. For real-time alerts, see [What is Real-Time hub?](../real-time-hub/real-time-hub-overview.md)

- Data for new capacities isn't visible in the Metrics app until the next scheduled refresh. Data for new items and workspaces isn't visible until the next scheduled refresh after their first operation consuming CUs within the past 14 days. To view the data before the next scheduled refresh, initiate a manual refresh of the semantic model.

- To hide user emails in the app, disable the [Show user data in the Fabric Capacity Metrics app and reports](../admin/service-admin-portal-audit-usage.md#show-user-data-in-the-fabric-capacity-metrics-app-and-reports) setting in the Admin portal.

- Billable items and operations consume CU units from your capacity and are paid for by your organization. Non-billable items and operations reflect preview features that don't count towards your capacity limit and aren't paid for. They provide an indication of possible future impact on your capacity. When preview features become generally available, your organization starts paying for them and their impact on your capacity is taken into account.

- In the [Capacity utilization and throttling](metrics-app-compute-page.md#capacity-utilization-and-throttling) visual logarithmic's view, the primary axis seen on the left of the visual, isn't aligned with the secondary axis seen on the right of the visual.

- In the [interactive](metrics-app-timepoint-page.md#interactive-operations-for-timerange) and [background](metrics-app-timepoint-page.md#background-operations-for-timerange) operation tables, the *Throttling(s)* column displays zero when throttling is disabled, even when the capacity is overloaded.

- There's a difference of 0.01-0.05 percent between the *CU %* value in the [Top row visuals](metrics-app-timepoint-page.md#top-row-visuals) *Heartbeat line chart*, and the [interactive](metrics-app-timepoint-page.md#interactive-operations-for-timerange) and [background](metrics-app-timepoint-page.md#background-operations-for-timerange) operations tables *Total CU* values.

- When the capacity state remains unchanged during the selected dates or the past 14 days, it doesn't appear in the System Event table.

- Sampling might occur while exporting data from the Export Data page. See second and third bullet in [Considerations and limitations](/power-bi/visuals/power-bi-visualization-export-data?tabs=powerbi-desktop#considerations-and-limitations).

- The semantic model used by the Microsoft Fabric Capacity Metrics application is only supported for use by the reports provided in the application. Any consumption from, usage of, or modification of the semantic model isn't supported.

- The *CU (s)* column of the [matrix by item and operation](metrics-app-compute-page.md#matrix-by-item-and-operation) table displays the cumulative consumption of CU seconds for a specific item over the past 14 days. If you move the item from another workspace to the current workspace in the last 14 days, the *CU (s)* column includes the cumulative consumption of CU seconds for the item in the previous workspace.

- The Microsoft Fabric Capacity Metrics app doesn't support environments that use [private links](../security/security-private-links-overview.md).

- The threshold values on throttling visuals don't reflect applied surge protection settings. To view the actual [surge protection](surge-protection.md) thresholds, refer to the Admin Portal in the Power BI service.

## Related content

- [Install the Microsoft Fabric Capacity Metrics app](metrics-app-install.md)
