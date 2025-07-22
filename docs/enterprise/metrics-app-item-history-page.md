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

The **Item history** page in the Microsoft Fabric Capacity Metrics app provides compute usage analysis through slicers and dynamic visuals for last 30 days. It presents high-level consumption trends alongside detailed item-level metrics, enabling users to explore and monitor operational and billing data effectively.

## Slicers

- **Capacity name**: Select a capacity. The app displays information related to the selected capacity.
- **Workspace**: Select one or more workspace names to filter data specific to selected workspaces.
- **Experience**: Select the Fabric experience you want to see results for.
- **Operation**: Select the operation name you want to see results for. 
- **Run by**: Select the username you want to see results for.
- **Billing type**: Select Billable or Non-billable to filter activities accordingly in the app.

> [!NOTE]
> This page has Start Date and End Date filters in the filter pane, enabling users to select a specific time period for which they want to analyze the data. Additionally, when users select a Start Date and End Date with only a one-day difference, the trends visuals on the page allows users to drill down into the data at an hourly level for the selected day.

The page is divided into two sections:

- [Aggregate compute consumption](#aggregate-compute-consumption)
- [Item history](#item-history)

## Aggregate compute consumption

This view shows the aggregated usage for selected fields from slicers.

- **CU (s) by workspace**: Displays the names of workspaces along with their corresponding CU (s). The values shown are based on the slicer selections at the top of the page.
- **CU (s) by item**: Displays the names of items along with their corresponding CU (s). The values shown are based on the slicer selections at the top of the page.


### CU % over time

- **Background %**: Blue columns represent the percent of CU consumption used during background operations in a 30-second period. This column refers to billable operations.
  - Background operations cover backend processes that aren't directly triggered by users, such as data refreshes.
- **Interactive %**: Red columns represent the percent of CU consumption used during interactive operations in a 30-second period. This column refers to billable operations.
  - Interactive operations cover a wide range of resources triggered by users. These operations are associated with interactive page loads.
- **CU % Limit**: A grey dotted line that shows the threshold of the allowed percent of CU consumption for the selected capacity. Columns that stretch above this line, represent timepoints where the capacity is overloaded.

###*Workspace details

This visual shows the aggregated workspace level usage metrics, more fields from the optional columns can be added for deeper insights:

- **Pass rate**: Operations having status as success divided by operations having status other then success (excluding InProgress operations).
- **Views**: Number of operation counts.
- **% Compute**: Percentage of capacity units consumed by a Workspace, Item, Operation relative to all capacities the user is an admin of, based on applied filter context.

## Item history

This section offers a detailed evaluation of usage metrics for the slicer-selected fields.

- **Status trends vs throttling**: This chart displays to number of operations by status and a horizontal Throttling (s) line with data points plotted by date.
- **Scheduling frequency**: This chart displays the number of operations by date.
- **% breakdown by status**: This visual presents the percentage distribution of operations based on their completion status. Statuses include Invalid, Cancelled, InProgress, Success, and Failure.
- **CU (s) by date**: This visual displays CU (s) by date.
- **Duration (s) by date**: This visual displays Duration (s) by date.
- **CU (s) by operation and date**: This visual displays CU (s) by oepration and date.
- **CU (s) by item kind and date**: This visual displays CU (s) by item kind and date.
- **CU (s) by experience and date**: This visual displays CU (s) by experience and date.

### Operation details

This view outlines detailed item-level usage data, more fields from the optional columns can be added for deeper insights.

- **% Compute**: Percentage of capacity units consumed by a Item, Operation, Status, Date scheduled relative to all capacities the user is an admin of, based on applied filter context.
- **Date scheduled**: Datetime when the operation triggered.
- **Status**: Shows different status (Invalid, Cancelled, InProgress, Success, Failure).
- **Throttling (s)**:  The number of seconds of throttling applied due to capacity overload.
