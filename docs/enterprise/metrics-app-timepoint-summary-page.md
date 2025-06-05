---
title: Understand the metrics app timepoint summary page (preview)
description: Learn how to read the Microsoft Fabric Capacity Metrics app's Timepoint Summary page.
author: JulCsc
ms.author: juliacawthra
ms.topic: how-to
ms.custom:
ms.date: 05/06/2025
no-loc: [Copilot]
---

# Understand the metrics app timepoint summary page (preview)

[!INCLUDE [feature-preview](../includes/feature-preview-note.md)]

All the operations in your capacity are ranked according to their compute impact. The compute impact of all your capacity operations is what we call capacity usage, and it's measured using capacity units (CUs). Use this page to understand which [*interactive* and *background*](fabric-operations.md#interactive-and-background-operations) operations contributed the most to your capacity's usage. Scheduled and background jobs capacity consumption is spread over 24 hours.

Scheduled and manual refresh workflows can trigger multiple internal operations in the backend service. For example, refreshes sometimes perform automatic retries if a temporary error occurred. These operations might be recorded in the app using different activity IDs. Each activity ID is represented as a row in the table. When reviewing the table, take into consideration that several rows may indicate a single action that triggers multiple operations, each with its own activity ID.

When the total combined CUs for *interactive* and *background* operations exceed the 30 second timepoint allowance, the capacity is overloaded and depending on whether autoscale is enabled or not, throttling is applied.For more  information see the [Fabric throttling policy](https://learn.microsoft.com/en-us/fabric/enterprise/throttling)

* **Autoscale is enabled** - If the capacity has autoscale enabled, a new CU will get added for the next 24 hours and will be shown as an increased value in the *CU Limit* line in the [Capacity utilization and throttling](metrics-app-compute-page.md#capacity-utilization-and-throttling) chart and the *CU (s)* card will change its color to yellow.

    When autoscale is enabled, if the capacity reaches the maximum number of CUs allowed by the autoscale operation, throttling is applied.

* **Autoscale isn't enabled** - If autoscale isn't enabled, throttling gets applied to every interactive operation in the subsequent timepoint.

## Top row visuals

This section describes the operations of the visuals in the top row of the timepoint summary page.

* **Start/end card** – Displays the start and end date and time (timepoint) used to get to this page.
  
* **Heartbeat line chart** – Shows a 60*minute window of CU activity. Use this visual to establish the duration of peaks and troughs.
  * *Vertical light green line* – The timepoint you currently viewed. The visual shows the 30 minutes of CU activity leading to the selected timepoint, as well as the 30*minutes of CU activity after the selected timepoint.
  * *CU % Limit* – The capacity allowance.
  * *CU %* – The capacity usage.

There are also three colors describing the capacity usage:
  * *Green* – The percent of CU consumption.
  
  * *Red* – The percent of CU consumption limit.
  
  * *Yellow* – The percent of CU consumption that's autoscaled.

* **Interactive operations card** – Displays the total number of interactive operations that contributed to the CU's activity during this timepoint. The background color of the card changes if data is sampled in Top 200,000 Interactive records for time range table visual.
  
* **Background operations card** – Displays the total number of background operations that contributed to the CU's activity during this timepoint. The background color of the card changes if data is sampled in Top 200,000 Background records for time range table visual.
  
* **SKU card** – Displays the current SKU.
  
* **Capacity CU card** – Displays the total number of CU seconds allowed for this capacity, for a given 30 second timepoint window. User can hover over card to see bifurcation of Base CU(s) and Autoscale CU(s). When autoscale is enabled, the card will change its color to yellow.

## Filters

Use these slicers to enhance data accuracy when sampling occurs.

* **Workspace name** – Select a workspace. The app displays information related to the selected workspace.
  
* **Item name** – Select an Item. The app displays information related to the selected Item.
  
* **Operation name** – Select an operation. The app displays information related to the selected operation.

    >[!NOTE]
    >Workspace name, Item name and Operation names slicers on this page are passed through to data source. Using these slicers can help narrow down the returned data and help increase accuracy.

Use these below filters available in the filter pane to further narrow down the visuals

* **Billing type** – Select a Billing type. The app displays information related to selected types.
  
* **Date** – Select the date. The app displays information related to selected dates.
  
* **Item kind** – Select the Item kind. The app displays information related to selected Item kind.

## KPIs

* **Utilization %** – Displays the total percentage of Interactive and background utilization that contributed to the Capacity's activity during selected timepoint.
  
* **Interactive utilization %** – Displays the total percentage of Interactive utilization that contributed to the Capacity's activity during selected timepoint.
  
* **Background utilization %** – Displays the total percentage of Background utilization that contributed to the Capacity's activity during selected timepoint.
  
* **Burndown %** – The percentage of carryforward burndown compared to the capacity, for a 30 second window.

## Interactive and Background Summary for time range

Use the toggle situated on the left side to switch between **Interactive** and **Background** view.

### Horizontal Bar Chart

In the first layer, there are three horizontal bar chart present. Users have option to choose the metric they want to display: **% of Base**, **Operation Count**, or **Duration (s)**.  

* **Workspace** – Displays workspaces based on their percentage of base capacity utilization, operation count or duration based on the value selected in toggle.
  
* **Item** – Displays items based on their percentage of base capacity utilization, operation count or duration based on the value selected in toggle.
  
* **Operation** – Displays operation based on their percentage of base capacity utilization, operation count or duration based on the value selected in toggle.

### Top 200,000 Interactive and Background records for time range

This visual shows top 200,000 operations that contributed CU(s) usage in the timepoint used to drill through to this page. Once the operation is complete, CU(s) smoothed within the timepoint window are attributed to it. If a timepoint window has more than 200,000 records, we sample the data to display only the top 200,000 based on CU(s). The text of the table will change to indicate this. User can select a row in this visual to drill-through to timepoint item detail page.

### Default fields:

In this section lists the default fields that are displayed in the table visual. You can't remove default fields from the table.

* **Workspace** - The workspace the item belongs to.
  
* **Item** - The name of the item.
  
* **Operation type** - The type of operation.
  
* **Duration (s)** - The number of seconds the operation took to complete. This column may not be applicable for few workloads like Event*Stream in overall consideration.
  
* **Operations** - The count of operations.
  
* **Total CU (s)** - The number of CU seconds used by the interactive operation. This metric contributes to determine if the capacity exceeds the total number of CU seconds allowed for the capacity.
  
* **Timepoint CU (s)** - The number of CU seconds assigned to the interactive operation in the current timepoint.
  
* **Throttling (s)** - The number of seconds of throttling applied to this interactive operation because of the capacity being overloaded in the previous timepoint.
  
* **% Of Base Capacity** - Interactive CU operations as a proportion of the base capacity allowance.

### Optional fields:

In this section lists the optional fields that you can add to the table visual. You can add or remove optional fields from the table using the Select optional column(s) dropdown menu.

* **Billing type** - Displays information if the item is billable or not.
  
    * **Billable** - Indicates that operations for this item are billable.
  
    * **Non-Billable** - Indicates that operations for this item are non-billable.
  
* **Virtualized item** * Displays one of the following values:
  
    * **True** * Virtual items that consume CUs, for example virtual items used by Copilot.
  
    * **False** * Items that aren't virtual.
  
* **Virtualized workspace** * Displays one of the following values:

    * **True** * Virtual workspaces that consume CUs, for example a virtual workspace used by a virtual network.
  
    * **False** * Workspaces that aren't virtual.

If the selected capacity is not undergoing any Interactive or Background operations at the selected time range, then a banner will be displayed over the table visual saying there are no interactive/background operations.

## Related content

* [Understand the metrics app compute page?](metrics-app-compute-page.md)
