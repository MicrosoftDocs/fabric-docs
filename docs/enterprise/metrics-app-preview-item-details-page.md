---
title: Item Details Page in Fabric Capacity Metrics app preview
description: Learn how to investigate the consumption and operation history of an item in the Fabric Capacity Metrics app preview report.
author: dknappettmsft
ms.author: daknappe
ms.reviewer: atishghosh
ms.topic: concept-article
ms.date: 08/25/2026
ai-usage: ai-assisted
#customer intent: As a Fabric capacity administrator, I want to understand what the Item details page shows so that I can investigate an item's consumption and operations.
---

# Understand the Item details page in Fabric Capacity Metrics app preview

[!INCLUDE [feature-preview](../includes/feature-preview-note.md)]

The **Item details** page is a drill-through page in the **Fabric Capacity Metrics app preview** report that provides up to 14 days of detailed history for a single item, including its capacity unit (CU) consumption, operations, duration, status, and users. This page belongs to the [Preview report](metrics-app.md#fabric-capacity-metrics-app-preview-report), the redesigned monitoring experience, not the default **Microsoft Fabric Capacity Metrics** report.

When an item drives high consumption or fails, use this page to investigate how it behaved over time and identify the operations and users responsible.

This article explains what each part of the page shows so you can trace an item's consumption and pinpoint the operations behind unexpected usage or failures.

The following video walks you through the Item details page and how to use it to investigate an item's consumption and operations.

> [!VIDEO https://learn-video.azurefd.net/vod/player?id=e4e716b6-ccc6-4164-8c6a-33949295d258]

## Page access and time filters

To open the **Item details** page, you drill through from an item on the **Compute** page. The page inherits the time filters applied on the Compute page, including any selections made in the heat map. Because of these retained filters, the page might initially show less than 14 days of data. To view a different period, clear the retained date filters in the filter pane and select a period manually with the date range filter.

## Item summary

The item summary page header identifies the workspace, item type, and total CU-second consumption for the selected item.

## Item trends graphs

Use the graph bookmarks to switch between these views:

- **Smoothed CU(s)**: Shows the average CU seconds consumed per second at hour-level granularity. The graph compares the selected item's consumption with all other smoothed usage on the capacity and plots consumption against the capacity CU limit. Select **Selected Item** to hide usage from other items.
- **Unsmoothed CU(s)**: Shows unsmoothed CU consumption by operation and day. For example, semantic model operations can include visual queries, data refreshes, and Excel queries through the XMLA endpoint. Drill down to review hourly consumption. Because this view shows consumption when it was reported, usage from a background operation can appear concentrated in its reporting hour.
- **Duration**: Shows how long operations ran. Use this view to identify duration trends across days or hours.
- **Status**: Shows successful and failed operation counts for the item.

When you drill down on a date in one graph, the selection also filters the other graphs.

## Consumption breakdown by operation, status, and user

Use the aggregated table to review CU consumption by:

- Operation.
- Status.
- User.

## Operation details and operation IDs

The detailed operations table shows:

- CU consumption.
- Operation duration.
- Operation ID.

An operation ID uniquely identifies an operation. In some scenarios, you can use the ID to correlate the operation with telemetry. For instance, map operation IDs to individual Power BI visual query IDs by using workspace monitoring.

## Considerations and limitations

- The page provides a maximum of 14 days of item history.
- Retained drill-through filters can reduce the initial period shown.
- Unsmoothed CU consumption appears when an operation reports its usage rather than when smoothing attributes the usage to the capacity.

## Related content

- [Capacity Metrics app preview report](metrics-app.md#fabric-capacity-metrics-app-preview-report)
- [Monitor capacity and throttling in the Capacity Metrics app preview](metrics-app-monitor-capacity-throttling.md)
- [Understand the Health page](metrics-app-preview-health-page.md)
- [Understand the Compute page](metrics-app-preview-compute-page.md)
- [Understand the Storage page](metrics-app-preview-storage-page.md).
- [Understand Fabric capacity throttling](throttling.md)
