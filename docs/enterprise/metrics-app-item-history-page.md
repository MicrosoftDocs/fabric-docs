---
title: Understand the metrics app item history page (preview)
description: Learn how to read the Microsoft Fabric Capacity metrics app's item history page.
author: JulCsc
ms.author: juliacawthra
ms.topic: how-to
ms.date: 07/21/2025
---

# Understand the metrics app item history page (preview)

[!INCLUDE [feature-preview](../includes/feature-preview-note.md)]

The **Item history** page in the Microsoft Fabric Capacity Metrics app provides compute usage analysis through slicers and dynamic visuals for the last 30 days. It presents high-level consumption trends alongside detailed item-level metrics, enabling users to explore and monitor operational and billing data effectively.

## Slicers

- **Capacity name**: Select a capacity. The app displays information related to the selected capacity.
- **Workspace**: Select one or more workspace names to filter data specific to the selected workspaces.
- **Experience**: Select the Fabric experience you want to see results for.
- **Operation**: Select the operation name you want to see results for. 
- **Run by**: Select the username you want to see results for.
- **Billing type**: Select Billable or Non-billable to filter activities accordingly in the app.

> [!NOTE]
> This page has Start Date and End Date filters in the filter pane, enabling users to select a specific time period for which they want to analyze the data. Additionally, when users select a Start Date and End Date with only a one-day difference, the trends visuals on the page allow users to drill down into the data at an hourly level for the selected day.

The page is divided into two sections:

- [Aggregate compute consumption](#aggregate-compute-consumption)
- [Item history](#item-history)

## Aggregate compute consumption

This view shows the aggregated usage for selected fields from slicers.

- **CU(s) by workspace**: Displays the names of workspaces along with their corresponding Capacity Units(CUs). The values shown are based on the slicer selections at the top of the page.
- **CU(s) by item**: Displays the names of items along with their corresponding CUs. The values shown are based on the slicer selections at the top of the page.

### CU % over time

- **Background %**: Blue columns represent the percent of CU consumption used during background operations in a 30-second period. This column refers to billable operations.
  - Background operations cover backend processes that aren't directly triggered by users, such as data refreshes.
- **Interactive %**: Red columns represent the percent of CU consumption used during interactive operations in a 30-second period. This column refers to billable operations.
  - Interactive operations cover a wide range of resources triggered by users. These operations are associated with interactive page loads.
- **CU % Limit**: A grey dotted line that shows the threshold of the allowed percent of CU consumption for the selected capacity. Columns that stretch above this line represent timepoints where the capacity is overloaded.

### Workspace details

This visual shows the aggregated workspace-level usage metrics; more optional fields can be added for deeper insights.

- **Pass rate**: Operations with a status of success divided by those operations with a status other than success (excluding InProgress operations).
- **Views**: Number of operations.
- **% Compute**: Percentage of capacity units consumed by a Workspace, Item, Operation relative to all capacities the user is an admin of, based on applied filter context.

## Item history

This section offers a detailed evaluation of usage metrics for the slicer-selected fields.

- **Status trends vs throttling**: This chart displays the number of operations by status and a horizontal Throttling (s) line with data points plotted by date.
- **Scheduling frequency**: This chart displays the number of operations by date.
- **% breakdown by status**: This visual presents the percentage distribution of operations based on their completion status. Statuses include invalid, canceled, inprogress, success, and failure.
- **CU(s) by date**: This visual displays CUs by date.
- **Duration (s) by date**: This visual displays Duration by date.
- **CU(s) by operation and date**: This visual displays CUs by operation and date.
- **CU(s) by item kind and date**: This visual displays CUs by item kind and date.
- **CU(s) by experience and date**: This visual displays CUs by experience and date.

### Item details

This view outlines detailed item-level usage data; more optional fields can be added for deeper insights.

- **% Compute**: Percentage of capacity units consumed by an item, operation, status, date scheduled relative to all items the user is an admin of, based on applied filter context.
- **Date scheduled**: Datetime when the operation was triggered.
- **Status**: Shows different statuses (invalid, canceled, inprogress, success, failure).
- **Throttling (s)**:  The number of seconds of throttling applied due to capacity overload.

## View Copilot compute usage

To view compute consumed by Copilot in Fabric, use the slicers at the top of the page:

- **Operation**: Select **Copilot in Fabric** to isolate all compute usage generated by Copilot requests across Fabric workloads. All Copilot activities appear under this operation name, representing generative AI operations billed against capacity. When selected, the report shows CU seconds consumed by Copilot processing.
- **Experience**: Filter by a specific Fabric experience to break down Copilot usage. This breakdown helps you understand which workloads are driving Copilot-related compute consumption.

### Copilot compute and billing notes

- **Copilot compute runs as background operations.** All Copilot CU consumption is processed as background capacity operations. This design smooths demand and prevents sudden compute spikes, helping ensure a more consistent experience across the capacity.
- **Copilot billing is based solely on token usage.** Billing for Copilot in Fabric is driven only by token consumption. Any downstream actions that Copilot triggers, such as DAX queries, data refreshes, or email subscriptions, are billed separately through their standard Fabric pathways.
