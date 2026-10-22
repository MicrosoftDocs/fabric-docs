---
title: What is the Microsoft Fabric Capacity Metrics app?
description: Learn how to evaluate your Microsoft Fabric capacity's health, by reading the metrics app.
author: dknappettmsft
ms.author: daknappe
ms.topic: concept-article
ms.date: 08/28/2026
ai-usage: ai-assisted
---

# What is the Microsoft Fabric Capacity Metrics app?

Fabric resides on a capacity, which is a pool of resources allocated to your platform. Each capacity has its own number of [capacity units (CUs)](licenses.md). You use CUs to measure the compute power available for your capacity.

The Microsoft Fabric Capacity Metrics app provides monitoring capabilities for Microsoft Fabric capacities. Use the app to monitor your capacity consumption and make informed decisions on how to use your capacity resources. For example, the app can help identify when to scale up your capacity or when to turn on autoscale. For more information about autoscale, see [Autoscale your Fabric capacity](/power-bi/enterprise/service-premium-auto-scale).

The app is updated often with new features and functionalities. It provides the most in-depth information into how your capacities are performing.

> [!NOTE]
> The Microsoft Fabric Capacity Metrics app supports both EM/A and P SKUs.

## Report experiences

With version 3.0, the Fabric Capacity Metrics app currently provides two report experiences. After you install or upgrade the app, the navigation pane shows both reports:

- **Default report**: The established monitoring experience and generally available report that opens by default when you launch the app. The default report includes the pages described in [Features and functionalities](#features-and-functionalities).

- **Fabric Capacity Metrics app preview report**: A redesigned monitoring experience that's currently in preview. The preview report reorganizes health, compute, storage, and item-level insights into a streamlined layout. For more information, see [Fabric Capacity Metrics app preview report](#fabric-capacity-metrics-app-preview-report).

The default report remains the default when you open the app. You can switch to the preview report at any time from the navigation pane.

## Features and functionalities

The default report provides various features and functionalities to help you monitor and manage your capacities effectively. The default report includes the following pages:

- **Health** page: Get a high-level overview for all capacities you're admin of, and identify those capacities consuming the most compute or experiencing issues like throttling or query rejections. For more information, see [Understand the metrics app Health page](metrics-app-health-page.md).

- **Compute** page: Get a 14-day view of your capacity’s compute performance. Visuals include ribbon charts, utilization trends, and a matrix of operations, helping you analyze usage patterns, peak loads, and throttling events. AI Functions appears as a distinct operation category in ribbon charts, utilization trends, and the matrix of operations, tracked separately from Spark and Dataflows Gen2. For more information, see [Understand the metrics app compute page](metrics-app-compute-page.md).

- **Storage** page: Monitor storage usage over the past 30 days. View current and billable storage by workspace, track soft-deleted data, and explore trends through column charts and detailed tables. For more information, see [Understand the metrics app storage page](metrics-app-storage-page.md).

- **Timepoint** page: Drill into a specific 30-second timepoint to see which operations (interactive or background) consumed the most compute. The operation breakdown includes a dedicated AI Functions operation group, so you can see AI Functions usage at a given 30-second interval. Use this page to diagnose overloads and understand autoscale or throttling behavior. For more information, see [Understand the metrics app timepoint page](metrics-app-timepoint-page.md).

- **Timepoint summary** page: Summarizes operation types (not individual operations) that contributed to capacity usage during a selected timepoint. Summary visuals include AI Functions as an operation type, helping identify when AI Functions contributes materially to capacity usage and autoscale thresholds. For more information, see [Understand the metrics app timepoint summary page](metrics-app-timepoint-summary-page.md).

- **Timepoint item detail** page: Provides granular detail on operations within a specific item at a timepoint. Includes filters for operation ID, user, and CU thresholds that are useful for root-cause analysis and performance tuning. For more information, see [Understand the metrics app timepoint item detail page](metrics-app-timepoint-item-detail-page.md).

- **Autoscale compute for Spark** page: This page provides insights into the autoscaling behavior of Spark workloads, helping you optimize performance and resource allocation. For more information, see [Understand the metrics app Autoscale compute for Spark page](metrics-app-feature-autoscale-page.md).

- **Autoscale compute for Spark detail** page: Dive deeper into autoscale operations to understand which workloads triggered scaling and how they contributed to overall capacity usage. For more information, see [Understand Autoscale compute for Spark detail page](metrics-app-feature-autoscale-detail-page.md).

- **Plan capacity**: Learn how to estimate the right capacity SKU for your workloads by using the metrics app and the Fabric SKU Estimator. Helps avoid over- or underprovisioning. For more information, see [Plan your capacity size](plan-capacity.md).

- **Monitor paused capacity**: Track when a capacity was paused or resumed, and understand why utilization spikes may appear during pauses. Includes guidance on interpreting `carryforward` operations. To learn more, see [Monitor a paused capacity](monitor-paused-capacity.md).

- **Calculations**: Understand how the app computes key metrics like CU usage, throttling, and autoscale impact. The operation taxonomy and CU calculations include AI Functions as a separate operation type, with its CU usage attributed independently from Spark and Dataflows Gen2 in all visuals. Useful for interpreting visuals and validating internal reporting. For more information, see [Metrics app calculations](metrics-app-calculations.md).

## Fabric Capacity Metrics app preview report

> [!NOTE]
> The Fabric Capacity Metrics preview report is in preview. The default report remains available and continues to be the default experience when you open the app.

The Fabric Capacity Metrics preview report offers a redesigned monitoring experience in the app. After you install or upgrade the app, the preview report appears in the navigation pane alongside the default report. The preview report includes the following pages:

- **Health**: Review capacity health and throttling states in near real time and across historical periods. For more information, see [Understand the Health Preview page](metrics-app-preview-health-page.md).

- **Compute**: Analyze capacity utilization and capacity unit (CU) consumption at the capacity, workspace, item-kind, and item levels. Drill through from an item to review its operation history on the Item details page. For more information, see [Understand the Compute Preview page](metrics-app-preview-compute-page.md) and [Understand the Item details Preview page](metrics-app-preview-item-details-page.md).

- **Workspace Detail**: Investigate the items in a selected workspace and review their CU consumption, operations, duration, and users. For more information, see [Understand the Workspace Detail page](metrics-app-preview-workspace-detail-page.md).

- **Storage**: Review current and average storage consumption by storage type and workspace. For more information, see [Understand the Storage Preview page](metrics-app-preview-storage-page.md).

- **Autoscale for Spark**: Review Autoscale for Spark usage.

- **Help**: Access contextual guidance for report visuals, columns, icons, and thresholds.

For end-to-end monitoring and investigation scenarios, see [Monitor capacity and throttling in the Fabric Capacity Metrics app preview](metrics-app-monitor-capacity-throttling.md).

## Data latency

Data in the Microsoft Fabric Capacity Metrics app is subject to processing and refresh latency. In general, usage data becomes available within 10 to 15 minutes after the activity occurs. For example, at 5:15 PM (local time), charts such as the utilization chart might show data up to approximately 5:00 PM.

Some dimensions, including **capacities**, **workspaces**, and **items**, refresh as part of a scheduled semantic model refresh at midnight (local time). As a result, changes such as creating a new capacity, workspace, or item, or moving a workspace between capacities, appear in the app after the next refresh.

## Considerations and limitations

When you use the Microsoft Fabric Capacity Metrics app, consider the following considerations and limitations:

- Update the parameters and refresh the semantic model whenever your available capacities change. For example, if you get just-in-time (JIT) tenant admin access, update the *RegionName* parameter in the semantic model settings (as described in the installation guidance) and then refresh the model after access is granted.

- The Microsoft Fabric Capacity Metrics app doesn't support alerts or notifications. To set up alerts on your capacity health, use [Fabric capacity overview events](../real-time-hub/explore-fabric-capacity-overview-events.md). To monitor or set alerts on individual operations, use [Fabric capacity operation events](../real-time-hub/explore-fabric-capacity-operation-events.md).

- Data for new capacities isn't visible in the metrics app until the next scheduled refresh. Data for new items and workspaces isn't visible until the next scheduled refresh after their first operation consuming CUs within the past 14 days. To view the data before the next scheduled refresh, initiate a manual refresh of the semantic model.

- To hide user emails in the app, disable the [Show user data in the Fabric Capacity Metrics app and reports](../admin/service-admin-portal-audit-usage.md#show-user-data-in-the-microsoft-fabric-capacity-metrics-app-and-reports) setting in the Admin portal.

- Billable items and operations consume CUs from your capacity and are paid for by your organization. Non-billable items and operations reflect preview features that don't count towards your capacity limit and aren't paid for. They provide an indication of possible future impact on your capacity. When preview features become generally available, your organization starts paying for them and their impact on your capacity is taken into account.

- In the [Capacity utilization and throttling](metrics-app-compute-page.md#capacity-utilization-and-throttling) visual logarithmic's view, the primary axis seen on the left of the visual, isn't aligned with the secondary axis seen on the right of the visual.

- In the [interactive](metrics-app-timepoint-page.md#interactive-operations-for-timerange) and [background](metrics-app-timepoint-page.md#background-operations-for-timerange) operation tables, the *Throttling(s)* column shows zero when throttling is disabled, even when the capacity is overloaded.

- There's a difference of 0.01-0.05 percent between the *CU %* value in the [Top row visuals](metrics-app-timepoint-page.md#top-row-visuals) *Heartbeat line chart*, and the [interactive](metrics-app-timepoint-page.md#interactive-operations-for-timerange) and [background](metrics-app-timepoint-page.md#background-operations-for-timerange) operations tables *Total CU* values.

- When the capacity state remains unchanged during the selected dates or the past 14 days, it doesn't appear in the System Event table.

- Sampling might occur while exporting data from the Export Data page. See second and third bullet in [Considerations and limitations](/power-bi/visuals/power-bi-visualization-export-data?tabs=powerbi-desktop#considerations-and-limitations).

- The semantic model used by the Microsoft Fabric Capacity Metrics app is only supported for use by the reports provided in the app. Any consumption from, usage of, or modification of the semantic model isn't supported.

- The *CU (s)* column of the [matrix by item and operation](metrics-app-compute-page.md#matrix-by-item-and-operation) table shows the cumulative consumption of CU seconds for a specific item over the past 14 days. If you move the item from another workspace to the current workspace in the last 14 days, the *CU (s)* column includes the cumulative consumption of CU seconds for the item in the previous workspace.

- The Fabric Capacity Metrics app supports environments that use [tenant-level private links](../security/security-private-links-overview.md), but workspace‑level private links aren’t supported on workspaces where the app is installed.

- The threshold values on throttling visuals don't reflect applied surge protection settings. To view the actual [surge protection](surge-protection.md) thresholds, refer to the Admin portal in the Power BI service.

## Next step

> [!div class="nextstepaction"]
> [Install the Fabric Capacity Metrics app](metrics-app-install.md)

## Related content

- [Explore Fabric capacity overview events](../real-time-hub/explore-fabric-capacity-overview-events.md)
- [Explore Fabric capacity operation events](../real-time-hub/explore-fabric-capacity-operation-events.md)
