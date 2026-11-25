---
title: Storage Page in Fabric Capacity Metrics app preview
description: Learn how to use the Storage page in the Fabric Capacity Metrics app preview report to analyze storage consumption by workspace and operation.
author: dknappettmsft
ms.author: daknappe
ms.reviewer: atishghosh
ms.topic: concept-article
ms.date: 08/28/2026
ai-usage: ai-assisted
#customer intent: As a Fabric capacity administrator, I want to understand what the Storage page shows so that I can analyze storage consumption for a capacity.
---

# Understand the Storage page in Fabric Capacity Metrics app preview

[!INCLUDE [feature-preview](../includes/feature-preview-note.md)]

The **Storage** page is a monitoring view in the Fabric Capacity Metrics app preview report that shows storage consumption for a selected capacity. This page belongs to the [Preview report](metrics-app.md#fabric-capacity-metrics-app-preview-report), the redesigned monitoring experience, not the default **Microsoft Fabric Capacity Metrics** report. For the storage page in the generally available report, see [the metrics app storage page](metrics-app-storage-page.md).

The **Storage** page shows storage consumption for a selected capacity. Use this page to compare current and average storage, distinguish chargeable storage from included storage, and identify the workspaces and operations contributing to consumption.

## Storage page filters

The filters at the top of the page refine the storage data:

- **Capacity name**: Select the capacity you want to analyze.
- **Billing type**: Filter by billable or nonbillable storage.

## Storage summary cards

The cards at the top of the page summarize storage for the selected capacity:

- **Current SKU**: The SKU assigned to the capacity.
- **Workspaces**: The number of workspaces represented by the current filters.
- **Current storage in (GB)**: The latest reported storage consumption.
- **Current Chargeable Storage in (GB)**: Storage that contributes to billing.
- **Current Included Storage in (GB)**: Storage included with the capacity and not charged separately.

## Storage trends

Switch between two storage metrics:

- **Current**: Shows the latest reported storage value. In the daily trend, each value represents the last reported value for that day. Drill down on a day to view hourly values.
- **Average**: Shows average storage consumption for each day in the reporting period. Drill down on a day to view hourly values.

The date chart shows current or average storage in GB by day. Use the range selector below the chart to focus on a shorter period. The legend separates billable, chargeable storage from nonbillable, included storage.

## Storage by operation

The operation chart breaks down current or average storage by operation name. Operations can include **OneLake Storage**, **Allocated SQL Storage**, **Eventhouse Standard Storage**, **Eventhouse Cache Storage**, and **Data Activator Storage**.

In the **Current** storage view, use the options above the chart to switch between:

- **Operation**: Compares storage consumption by operation name.
- **Mirroring Limit**: Opens the mirroring visual.

The mirroring visual compares mirrored storage usage with the storage allocation included with the capacity SKU.

- **Mirrored storage usage**: Shows the current mirrored storage consumption.
- **SKU limit**: The vertical line marks the included mirroring storage limit for the selected capacity SKU.

Use the visual to determine whether mirrored storage usage is approaching or exceeding the included SKU limit. If there's no mirrored storage usage for the selected capacity and filters, the usage portion of the visual is blank, but the SKU limit line appears.

## Workspace-level storage details

By default, the table shows the top five workspaces. Use the filter pane to display more workspaces.

The table provides workspace-level storage details. Use it to identify the workspaces contributing most to capacity storage. The table includes:

- **Workspace name** and **Workspace ID**.
- **Operation name**.
- **Deletion status**.
- **Billing type**.
- **Current storage (GB)**.
- **Avg Storage** and **Avg storage %**.

## Considerations and limitations

- Storage consumption is available at the workspace level. Item-level storage consumption isn't available because the source data doesn't provide that level of detail.
- The mirroring visual doesn't show a value if a capacity has no mirrored storage. The SKU limit line appears.

## Related content

- [Capacity Metrics app preview report](metrics-app.md#fabric-capacity-metrics-app-preview-report)
- [Monitor capacity and throttling in the Capacity Metrics app preview](metrics-app-monitor-capacity-throttling.md)
- [Understand the Health page](metrics-app-preview-health-page.md)
- [Understand the Compute page](metrics-app-preview-compute-page.md)
- [Understand the Item details page](metrics-app-preview-item-details-page.md)
- [Install the Microsoft Fabric Capacity Metrics app](metrics-app-install.md)
- [OneLake consumption](../onelake/onelake-consumption.md)
