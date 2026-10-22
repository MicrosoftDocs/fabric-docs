---
title: Workspace Detail Page in Fabric Capacity Metrics app preview
description: Learn how to investigate the items and consumption of a single workspace in the Fabric Capacity Metrics app preview report.
author: dknappettmsft
ms.author: daknappe
ms.reviewer: sruikar
ms.topic: concept-article
ms.date: 10/26/2026
ai-usage: ai-assisted
#customer intent: As a Fabric capacity administrator, I want to understand what the Workspace Detail page shows so that I can investigate a workspace's items, operations, and consumption.
---

# Understand the Workspace Detail page in Fabric Capacity Metrics app preview

[!INCLUDE [feature-preview](../includes/feature-preview-note.md)]

The **Workspace Detail** page provides a detailed view of the items in a single workspace, along with their capacity unit (CU) consumption, operations, duration, and users. This page is part of the [Preview report](metrics-app.md#fabric-capacity-metrics-app-preview-report), the redesigned monitoring experience, not the default **Microsoft Fabric Capacity Metrics** report.

When a workspace drives high consumption, use this page to review which items are responsible and to break down that consumption by item kind, item, and operation.

The **Workspace Detail** page only shows consumption from the period when the workspace resided on the selected capacity. If the workspace moved between capacities, take this limitation into account when you analyze its consumption.

This article explains what each part of the page shows so you can trace a workspace's consumption and pinpoint the items and operations behind unexpected usage.

## Page access and filters

To open the **Workspace Detail** page, select **Workspace Detail** from the navigation buttons at the top of the report.

The **Workspace Detail** page is designed for a single selected workspace. Use the filter controls at the top of the page to scope the data that appears:

- **Capacity name**: Select a single capacity from the dropdown.
- **Workspace**: Select a single workspace from the dropdown. The page shows data for one workspace at a time.
- **Item**: Filter to one or more items in the workspace.
- **User**: Filter to one or more users.
- **Operation**: Filter to one or more operation types.
- **Date Range**: Select the period to analyze with the date range filter.

## Workspace summary

The summary cards at the top of the page report the totals for the selected workspace and filters:

- **Items**: The number of active items in the workspace.
- **CU (s)**: The total CU-second consumption.
- **Duration**: The total operation duration.
- **Users**: The number of distinct users.

## Consumption trend graphs

Use the graph bookmarks in the left chart area to switch between these views. Each graph shows consumption by item kind over time, and you can drill down from day to hour:

- **Unsmoothed CU (s)**: Shows unsmoothed CU consumption by item kind and day. Because this view shows consumption when it was reported, usage from a background operation can appear concentrated in its reporting hour.
- **Duration**: Shows how long operations ran across days or hours.
- **Operations**: Shows the number of operations performed.
- **Users**: Shows user activity across days or hours.

When you drill down on a date in one graph, the selection also filters the other views.

## Consumption breakdown tables

Use the bookmarks in the right table area to review CU consumption by different groupings. Each table shows the CU (s) value and its percentage of the total:

- **CU (s) by Item Kind**: Breaks down consumption by item kind (for example, semantic model, notebook, or pipeline).
- **CU (s) by Item**: Breaks down consumption by individual item.
- **CU (s) by Operation**: Breaks down consumption by operation.

## Item Details table

The **Item Details** table at the bottom of the page lists each item in the workspace with the following columns:

- **Item name**.
- **Item kind**.
- **CU (s)**.
- **Duration (s)**.
- **Users**.
- **Billing type**.

Select an item in this table to enable drill through, then select **Item Detail** to open the [Item details](metrics-app-preview-item-details-page.md) page for the selected item.

## Considerations and limitations

- The page is designed for a single selected workspace. Select one workspace from the **Workspace** dropdown to view its data.
- Retained filters from a prior selection can narrow the period or scope of data initially shown.
- Unsmoothed CU consumption appears when an operation reports its usage rather than when smoothing attributes the usage to the capacity.

## Related content

- [Capacity Metrics app preview report](metrics-app.md#fabric-capacity-metrics-app-preview-report)
- [Monitor capacity and throttling in the Capacity Metrics app preview](metrics-app-monitor-capacity-throttling.md)
- [Understand the Health page](metrics-app-preview-health-page.md)
- [Understand the Compute page](metrics-app-preview-compute-page.md)
- [Understand the Storage page](metrics-app-preview-storage-page.md)
- [Understand the Item details page](metrics-app-preview-item-details-page.md)
- [Understand Fabric capacity throttling](throttling.md)
