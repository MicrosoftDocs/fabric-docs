---
title: Understand the metrics app timepoint item detail page (preview)
description: Learn how to read the Microsoft Fabric Capacity Metrics app's Timepoint Item Detail page.
author: JulCsc
ms.author: juliacawthra
ms.topic: how-to
ms.custom:
ms.date: 05/06/2025
no-loc: [Copilot]
---

# Understand the metrics app timepoint item detail page (preview)

[!INCLUDE [feature-preview](../includes/feature-preview-note.md)]

This page provides a detailed analysis of the operation in a specific item. used to drill through to this view. If the selected workspace, item and operation in that timepoint window contains more than 100,000 records for Interactive/Background operations, sampling may occur. To improve data accuracy, use the filter pane to filter records by Bucket Start and End time, or exclude low-usage records using the CU threshold.

Scheduled and manual refresh workflows can trigger multiple internal operations in the backend service. For example, refreshes sometimes perform automatic retries if a temporary error occurs. These operations might be recorded in the app using different activity IDs. Each activity ID is represented as a row in the table. When reviewing the table, take into consideration that several rows may indicate a single action that triggers multiple operations, each with its own activity ID. Some operations may be grouped together, which should be reflected in the Operations Count column.

Drill-through to the Timepoint Item Detail page opens the Background operations view by default. Use the bookmark in the top right corner to switch to the Interactive view.

## Top row visuals

This section describes the operations of the visuals in the top row of the timepoint item detail page.

* **Start/end card** - Displays the start and end date and time (timepoint) used to get to this page.
  
* **Item name** - Displays the item to which the operation belongs that is used for drill-through.
  
* **Item kind** - Displays the item kind to which the operation belongs that is used for drill-through.
  
* **Workspace name** - Displays the workspace to which the operation belongs that is used for drill-through.
  
* **Operation** - Displays the name of operation used to drill thought to this page.

## Filters

Use these slicers to enhance data accuracy when sampling occurs.

* **Operation Id** - Select a Operation Id. The app displays information related to the selected Operation Id.
  
* **User** - Select a User. The app displays information related to the selected User.
  
* **Status** - Select a Status. The app displays information related to the selected Status.

Use these below filters available in the filter pane to further narrow down the visuals

* **Billing type** - Select a Billing type. The app displays information related to selected type.
  
* **CU(s) threshold** - Select a CU(s) value in the filter pane. The app will aggregate CU usage records lower than the selected value. This is only applicable for background detail visual.
  
* **Bucket Start Time** - Select the bucket start time in the filter pane. The app displays information related to selected bucket start time which is based on smoothing start time.
  
* **Bucket End Time** - Select the bucket end time in the filter pane. The app displays information related to selected bucket end time which is based on smoothing start time.

    >[!IMPORTANT]
    >Users can filter data or aggregate low usage records to address sampling by using the options below:
    >* Use the **Bucket Start** and **End Time** filters to limit the time range.
    >* Apply the **OperationId** and **User** slicers to focus on specific subsets.
    >* Adjust the **CU (s) threshold** filter in the filter pane to group records with lower CU usage.
    >
    >Using these slicers helps narrow down the returned data and improve overall accuracy.
    >
    >When the number of returned records drops below **100,000** after applying these filters, the conditional formatting that indicates sampling will be automatically removed. If sampling still occurs, consider increasing the CU threshold or applying additional filters to further reduce the dataset size.

### KPIs

* **Interactive utilization %** - Displays the total percentage of Interactive utilization of selected operation within a specific item that contributed to the Capacity's activity during selected timepoint.

* **Background utilization %** - Displays the total percentage of Background utilization of selected operation within a specific item that contributed to the Capacity's activity during selected timepoint.

* **Interactive operations** - Displays the total number of Interactive operations that contributed to the Capacity's activity by selected operation within a specific item during this timepoint. The background color of the card changes if data is sampled in Top 100,000 Interactive records for time range table.

* **Background operations** - Displays the total number of Background operations that contributed to the Capacity's activity by selected operation within a specific item during this timepoint.   The background color of the card changes if data is sampled in Top 100,000 Background records for time range table.

## Top 100,000 Interactive and Background records for time range

A table visual will display the data based on selection of utilization type: Interactive and Background. A table showing every operations that contributed capacity units (CUs) usage in the viewed timepoint. It fetches the top 100,000 records based on capacity units. If the selected item and operation is not undergoing any Interactive or Background operations at selected time range, then banner will be displayed over table visual saying there are no interactive/background operations.

### Default fields:

In this section lists the default fields that are displayed in the table visual. You can't remove default fields from
the table.

* **Start** - The time the interactive or background operation began.
  
* **End** - The time the interactive or background operation finished.
  
* **Status** - An indication showing if the operation succeeded or failed.
  
* **User** - The name of the user that triggered the interactive or background operation.
  
* **Duration (s)** - The number of seconds the interactive or background operation took to complete.
  
* **Throttling (s)** - The number of seconds of throttling applied to this interactive or background operation because of the capacity being overloaded in the previous timepoint.
  
* **Total CU(s)** - The number of CU(s) used by interactive or background operation.
  
* **Timepoint CU(s)** - The number of CU(s) assigned to the interactive or background operation in the current timepoint. The metric can be used to determine if the capacity exceeds the total number of CU(s) allowed for the capacity.
  
* **% Of Base capacity** - Interactive or background CU operations as a proportion of the base capacity allowance.
  
* **Operations** - Count of operations.

### Optional fields:

In this section lists the optional fields that you can add to the table visual. You can add or remove optional fields from the table using the Select optional column(s) dropdown menu.

* **Billing type** - Displays information if the item is billable or not.
  
    * **Billable** - Indicates that operations for this item are billable.
  
    * **Non-Billable** - Indicates that operations for this item are non-billable.
  
* **Operation Id** - Displays information regarding Operation Id.
  
* **Smoothing start** - The time the interactive operation began smoothing.
  
* **Smoothing end** - The time the interactive operation finished smoothing.

## Related content

* [Understand the metrics app compute page?](metrics-app-compute-page.md)
