---
title: Understand the metrics app timepoint summary page (preview)
description: Learn how to read the Microsoft Fabric Capacity Metrics app's Timepoint Summary page.
author: JulCsc
ms.author: juliacawthra
ms.topic: how-to
ms.custom:
ms.date: 06/06/2025
no-loc: [Copilot]
---

# Understand the metrics app timepoint summary page (preview)

[!INCLUDE [feature-preview](../includes/feature-preview-note.md)]

This page provides a summary view of **operation types** (not individual operations) in items that contribute to capacity usage in the 30-seconds time window, ranked by their compute impact measured in **Capacity Units (CUs)**. Use it to identify which [*interactive* and *background*](fabric-operations.md#interactive-and-background-operations) operation types had the highest impact on your capacity. Note that the capacity consumption of scheduled and background jobs is distributed evenly over a 24-hour period.

When the total combined smoothed CUs for *interactive* and *background* operation types exceed the 30 seconds timepoint allowance, the capacity is overloaded and depending on whether autoscale is enabled or not, throttling is  applied based on overage protection policy. For more  information see the [Fabric throttling policy](throttling.md).

## Top row visuals

This section describes the visuals displayed in the top row of the Timepoint Summary page:

* **Start/end card** – Displays the start and end date and time (timepoint) used to drill through to this page.
* **Heartbeat line chart** – Shows a 60-minute window of CU activity. Use this visual to establish the duration of peaks and troughs.
  * *Vertical light green line* – The timepoint you currently viewed. The visual shows the 30 minutes of CU activity leading to the selected timepoint, as well as the 30 minutes of CU activity after the selected timepoint.
  * *CU % Limit* – The capacity allowance.
  * *CU %* – The capacity usage.

  There are also three colors describing the capacity usage:

  * *Green* – The percent of CU consumption.
  * *Red* – The percent of CU consumption limit.
  * *Yellow* – The percent of CU consumption that's autoscaled.
* **Interactive operations card** – Displays the total number of interactive operations that contributed to the CU's activity during this timepoint. The background color of the card changes if data is sampled in this page.
* **Background operations card** – Displays the total number of background operations that contributed to the CU's activity during this timepoint. The background color of the card changes if data is sampled in this page.
* **SKU card** – Displays the current SKU of the Capacity.
* **Capacity CU card** – Displays the total number of CU seconds allowed for this capacity for the 30 second timepoint window. User can hover over card to see bifurcation of Base CUs and Autoscale CUs. When autoscale is enabled, the card will change its color to yellow.

## Filters

* **Workspace name** – Select a workspace to filter the visuals on this page.
* **Item name** – Select an item to filter the visuals on this page.
* **Operation name** – Select an operation to filter the visuals on this page.

> [!NOTE]
> The Workspace name, Item name, and Operation name slicers on this page help improve accuracy if sampling is occurring; otherwise, they are optional.

Use these below filters available in the filter pane to further narrow down the visuals:

* **Billing type** – Select a Billing type to filter the visuals on this page.
* **Item kind** – Select the Item kind to filter the visuals on this page.

## KPIs

* **Utilization %** – Displays the total percentage of Interactive and background utilization that contributed to the Capacity's activity during selected timepoint.
* **Interactive utilization %** – Displays the total percentage of Interactive utilization that contributed to the Capacity's activity during selected timepoint.
* **Background utilization %** – Displays the total percentage of Background utilization that contributed to the Capacity's activity during selected timepoint.
* **Burndown %** – The percentage of carryforward burndown compared to the capacity, for a 30 second window.

## Interactive and background summary for time range

Use the toggle on the left to switch between **Interactive** and **Background** views. Based on your selection, the visuals in this section display usage for the corresponding operation types. These visuals are subject to sampling. If a timepoint contains more than 200,000 records, the table visual’s title updates to indicate that sampling has occurred. To help reduce or avoid sampling, you can use the workspace name, item name, and operation name slicers to filter data for visuals in this section.

### Horizontal bar chart

The top row contains three horizontal bar charts. Users can choose which metric to display: **% of Base**, **Operation Count**, or **Duration (s)**. The **% of Base** is calculated as smoothed CUs divided by base CUs.

* **Workspace** – Displays workspaces ordered by percentage of base capacity utilization, operation count, or duration, according to the selected toggle value.
* **Item** – Displays items ordered by percentage of base capacity utilization, operation count, or duration, according to the selected toggle value.
* **Operation** – Displays operations ordered by percentage of base capacity utilization, operation count, or duration, according to the selected toggle value.

### Interactive and background records for time range

This visual displays the top 200,000 records (operation types in items) contributing to CU usage during the timepoint used for drill-through to this page. Once an operation begins smoothing within the timepoint window, its CUs are attributed to that same window. Users can select a row in this visual to drill through to the **Timepoint Item Detail** page for detailed data on a specific operation within an item.

If the selected capacity is not undergoing any interactive or background operations at the selected time range, then a banner is displayed over the table visual saying there are no interactive/background operations.

#### Default fields

This section lists the default fields displayed in the table visual. These default fields cannot be removed from the visual.

* **Workspace** - The name of the workspace.
* **Item** - The name of the item.
* **Operation type** - The type of operation.
* **Duration (s)** -The number of seconds the operation took to complete or consumed up to that timepoint. This column may not be applicable for few workloads like Eventstream in overall consideration.
* **Operations** - The count of operations.
* **Total CU (s)** - The number of CU seconds used by the interactive or background operations.
* **Timepoint CU (s)** - The number of CU seconds assigned to the interactive or background operation in the current timepoint. This metric contributes to determine if the capacity exceeds the total number of CU seconds allowed for the capacity.
* **Throttling (s)** - The number of seconds of throttling applied to this interactive or background operation because of the capacity being overloaded in the previous timepoint.
* **% of base capacity** - Interactive or background timepoint CU operations as a proportion of the base capacity allowance.

#### Optional fields

This section lists the optional fields you can add to the table visual. Use the **Select optional columns** dropdown menu to add or remove these fields from the table.

* **Billing type** - Displays information if the operation type in that specific item is billable or not.
  * **Billable** - Indicates that operations for this item are billable.
  * **Nonbillable** - Indicates that operations for this item are nonbillable.
* **Virtualized item** * Displays one of the following values:
  * **True** - Virtual items that consume CUs, for example virtual items used by Copilot.
  * **False** - Items that aren't virtual.
* **Virtualized workspace** * Displays one of the following values:
  * **True** - Virtual workspaces that consume CUs, for example a virtual workspace used by a virtual network.
  * **False** - Workspaces that aren't virtual.

## Related content

* [Understand the metrics app compute page?](metrics-app-compute-page.md)
* [Understand the metrics app timepoint page](metrics-app-timepoint-page.md)
