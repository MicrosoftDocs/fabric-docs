---
title: On-Demand Compute Page in Fabric Capacity Metrics app
description: Learn how to read the Microsoft Fabric Capacity metrics app's on-demand compute page.
author: dknappettmsft
ms.author: daknappe
ms.reviewer: sruikar
ms.topic: concept-article
ms.date: 10/26/2026
ai-usage: ai-assisted
---

# Understand the metrics app on-demand compute page

The Microsoft Fabric Capacity Metrics app's **On-Demand Compute** page provides an overview of on-demand workload consumption for your capacity, showing data for the last 14 days. On-demand workloads consume capacity units (CU) independently of the standard compute model.

This page helps capacity administrators monitor CU consumption, track 24-hour rolling cumulative usage against configured billing limits, and identify time periods where on-demand workloads are at risk of rejection due to exceeding their billing limits.

At the top of the page, the **Capacity Name** field allows you to select the capacity the app shows results for.

## Cards

There are three cards at the top of the page that provide key metrics for the selected capacity. The information on the cards is filtered according to your capacity, region, and on-demand category selection.

- **SKU** - Latest SKU of the capacity (for example, F2).

- **% of time at risk** - Percentage of time windows in which the 24-hour cumulative usage for the on-demand category was between 80% (inclusive) and less than 100% of the configured 24-hour cumulative billing limit. This indicates the on-demand workload is at risk of rejection if usage increases by another 20%.

- **% of time at limit** - Percentage of time windows in which the 24-hour cumulative usage for the on-demand category was 100% or higher than the configured 24-hour cumulative billing limit. This indicates that new operations are rejected for such time windows.

## Slicers

The page includes four slicers to filter the data displayed across all visuals:

| Slicer | Type | Description |
|---|---|---|
| **Capacity name** | Single-select dropdown | Selects the capacity to display results for. |
| **Region** | Single-select dropdown (default: *Default*) | Filters by the region of the capacity. |
| **On-Demand Category** | Multi-select dropdown | Filters all visuals by one or more on-demand workload categories (for example, *RealTimeIntelligence-EventHouse*, *DataWarehouse*). |
| **CU Unit** | Single-select dropdown (default: *Hour*) | Toggles the CU unit used across all visuals. Available values: *Hour* and *Second*. |

## CU consumption by On-Demand Category

A ribbon chart that displays CU consumption over time, broken down by on-demand category. Each colored band in the chart represents a different on-demand category (for example, DataWarehouse and RealTimeIntelligence-EventHouse).

- **X-axis** - Date hierarchy. By default, shows data aggregated at the date level. You can drill down or expand to view data at the hour level.
- **Y-axis** - CU consumed. The unit displayed corresponds to the value selected in the **CU Unit** slicer.
- **Legend** - On-Demand Category name.

**Available actions:**

- Select a date or hour in the chart to cross-filter the rest of the visuals on the page by that time period.

## CU consumption by Item Kind and Cumulative CU

The right side of the page contains a panel with tab buttons that toggle between two views: **CU by Item Kind** and **Cumulative CU**.

### CU by Item Kind

A ribbon chart that displays CU consumption over time, broken down by item kind (for example, *KustoEventHouse*, *Warehouse*, *SQLDbNative*).

- **X-axis** - Date and hour.
- **Y-axis** - CU consumed. The unit displayed corresponds to the value selected in the **CU Unit** slicer.
- **Legend** - Item kind.

**Available actions:**

- Select a date or hour to cross-filter the other visuals on the page.

### Cumulative CU

Displays the 24-hour rolling cumulative CU usage against the configured billing limit for an on-demand category. This view has two sub-tabs that toggle between **CU** and **CU %** modes.

> [!NOTE]
> You must select a single on-demand category from the **On-Demand Category** slicer to view data in this visual. If no single category is selected, the visual displays the message: *"Select a single on-demand category to view data"*.

#### CU (absolute)

A line chart that shows the absolute 24-hour rolling cumulative CU consumption compared to the billing limit.

- **24h rolling cumulative CU** - A line representing the cumulative CU consumed over the rolling 24-hour window at each timepoint.
- **24h rolling CU limit** - A line representing the configured 24-hour cumulative billing limit for the selected on-demand category.

#### CU % (percentage)

A line chart that shows the 24-hour rolling cumulative CU consumption as a percentage of the billing limit.

- **24h rolling cumulative CU %** - A line representing the cumulative CU consumed as a percentage of the billing limit at each timepoint.
- **24h rolling CU limit** - A reference line at 100%, representing the billing limit threshold.

## On-demand category details

A table that displays CU usage details for each on-demand category in the selected capacity.

### Column definitions

| Column | Description |
|---|---|
| **On-demand category** | Name of the on-demand category. |
| **Current % of limit** | The percentage of the 24-hour cumulative billing limit consumed by the on-demand category for the most recent timestamp. |
| **Current limit CU** | The most recent value for the 24-hour cumulative billing limit for the on-demand category. This value does not interact with time-based filters. |
| **CU consumed** | Amount of capacity units consumed by the on-demand category. |
| **% of time at risk** | Percentage of time windows in which the 24-hour cumulative usage for the on-demand category was between 80% (inclusive) and less than 100% of the configured 24-hour cumulative billing limit. Indicates the on-demand workload is at risk of rejection if usage increases by another 20%. |
| **% of time at limit** | Percentage of time windows in which the 24-hour cumulative usage for the on-demand category was 100% or higher than the configured 24-hour cumulative billing limit. Indicates that new operations are rejected for such time windows. |

### Conditional formatting

The table uses the following conditional formatting rules to highlight values that need attention:

| Column | Yellow | Red |
|---|---|---|
| **Current % of limit** | Value is between 60% and 80% | Value is equal to or greater than 80% |
| **% of time at risk** | Value is greater than 0% and less than 15% | Value is greater than 15% |
| **% of time at limit** | — | Value is greater than 0% |

### Available actions

- Select an on-demand category row to cross-filter the rest of the visuals on the page. Use this cross-filter to:
  - View which days and hours the on-demand category is at risk or at limit in the **Risk status by date and hour** visual.
  - View details of items running under this on-demand category in the **CU consumption by items** visual.
  - View the trend of usage in the **CU by Item Kind** or **CU by On-Demand Category** visuals.
  - View the trend of 24-hour cumulative CU usage against the limit in the **Cumulative CU** visual.

## Risk status by date and hour

A matrix visual that displays the risk and limit status for on-demand workloads over time.

### Column definitions

| Column | Description |
|---|---|
| **Date** | Date hierarchy with drill-down capability to hour level. Sorted in descending order (most recent dates first). |
| **% of time at risk** | Percentage of time windows in which the 24-hour cumulative usage for the on-demand category was between 80% (inclusive) and less than 100% of the configured 24-hour cumulative billing limit. When no on-demand category is selected, the capacity is considered at risk if any of the on-demand workloads are at risk. |
| **% of time at limit** | Percentage of time windows in which the 24-hour cumulative usage for the on-demand category was 100% or higher than the configured 24-hour cumulative billing limit. When no on-demand category is selected, the capacity is considered at limit if any of the on-demand workloads are at limit. |

### Conditional formatting

The matrix uses the same conditional formatting rules as the **On-demand category details** table:

| Column | Yellow | Red |
|---|---|---|
| **% of time at risk** | Value is greater than 0% and less than 15% | Value is greater than 15% |
| **% of time at limit** | — | Value is greater than 0% |

### Available actions

- Select a date or hour to cross-filter the rest of the visuals on the page by that time period.

## CU consumption by items

A table that shows CU usage of all items for enabled on-demand workloads in the capacity.

### Column definitions

| Column | Description |
|---|---|
| **On-Demand Category** | Name of the on-demand category the item belongs to. |
| **Workspace name** | The workspace in which the item exists. |
| **Item name** | Name of the item. |
| **Item kind** | Type of the item (for example, *KustoEventHouse*, *Warehouse*). |
| **CU consumed** | Amount of capacity units consumed by the item. The CU unit is based on the selection in the **CU Unit** slicer. Sorted in descending order by default. |

### Available actions

- Select an item row to cross-filter the **CU by Item Kind** or **CU by On-Demand Category** visuals to view the usage trend for that specific item.

## Tooltips

The data tables on this page include a tooltip feature. When you hover over rows in the **CU consumption by items** table, a tooltip appears showing the breakdown of consumption by operation type. The tooltip displays:

| Column | Description |
|---|---|
| **Operation name** | The name of the operation performed by the item. |
| **CU consumed** | Amount of capacity units consumed by the operation. |
| **Billing type** | Indicates whether the operation is billable or nonbillable. |

This tooltip provides granular visibility into what types of operations are driving CU consumption for each item.

## Related content

- [Understand the metrics app compute page](https://learn.microsoft.com/en-us/fabric/enterprise/metrics-app-compute-page)
- [Understand the metrics app storage page](https://learn.microsoft.com/en-us/fabric/enterprise/metrics-app-storage-page)
- [KQL Database consumption](https://learn.microsoft.com/en-us/fabric/real-time-intelligence/kql-database-consumption)
