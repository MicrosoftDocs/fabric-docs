---
title: Understand the metrics app timepoint item detail page (preview)
description: Learn how to read the Microsoft Fabric Capacity Metrics app's Timepoint Item Detail page.
author: JulCsc
ms.author: juliacawthra
ms.topic: how-to
ms.custom:
ms.date: 06/06/2025
no-loc: [Copilot]
---

# Understand the metrics app timepoint item detail page (preview)

[!INCLUDE [feature-preview](../includes/feature-preview-note.md)]

This page provides a detailed analysis of the operation type within a specific item used to drill through to this view. If the selected workspace, item, and operation type contain more than 100,000 records for **Interactive** or **Background** operations within the timepoint window, sampling occurs. To improve data accuracy, use the **Bucket Start** and **End Time** filters to narrow the smoothing time range, or aggregate low-usage records by selecting a **CU threshold** in the filter pane.

Scheduled and manual refresh workflows can trigger multiple internal operations within the backend service. For example, a refresh may perform automatic retries in response to temporary errors. These operations are often logged with different activity IDs, with each activity ID appearing as a separate row in the table. When reviewing the table, keep in mind that multiple rows might represent a single action that initiated several operations, each tracked under a unique activity ID. In some cases, related operations are grouped together, and this grouping is reflected in the **Operations Count** column.

Drill through until the **Timepoint Item Detail** page opens the Background operations view by default. Use the bookmark in the top right corner to switch to the Interactive view.

## Top row visuals

This section describes the visuals displayed in the top row of the **Timepoint Item Detail** page:

* **Start/end card** - Displays the start and end date and time (timepoint) used to drill through to this page.
* **Item name** - Displays the item to which the operation type belongs that is used for drill-through.
* **Item kind** - Displays the type of the item referenced above.
* **Workspace name** - Displays the workspace name to which the item referenced above belongs.
* **Operation** - Displays the name of the operation used to drill through to this page.

## Filters

Use the following slicers to enhance data accuracy when sampling occurs:

* **Operation ID** - Select an Operation ID to filter the visuals on this page.
* **User** - Select a User to filter the visuals on this page.
* **Status** - Select a Status to filter the visuals on this page.

Use the following filters available in the filter pane to further narrow down the visuals:

* **Billing type** - Select a Billing type to filter the visuals on this page.
* **CU threshold** - Select a CU value in the filter pane. This page aggregates CU usage records lower than the selected value. This is only applicable for background detail visual.
* **Bucket Start Time** - Select the bucket start time in the filter pane. This page displays information related to selected bucket start time, which is based on smoothing start time.
* **Bucket End Time** - Select the bucket end time in the filter pane. This page displays information related to selected bucket end time, which is based on smoothing start time.

    > [!IMPORTANT]
    > Users can filter data or aggregate low usage records to address sampling by using the options below:
    > * Use the **Bucket Start** and **End Time** filters to limit the time range.
    > * Apply the **OperationId** and **User** slicers to focus on specific subsets.
    > * Adjust the **CU threshold** filter in the filter pane to group records with lower CU usage.
    >
    > Using these slicers helps narrow down the returned data and improve overall accuracy.
    >
    > When the number of returned records drops below **100,000** after applying these filters, the conditional formatting that indicates sampling is automatically removed. If sampling still occurs, consider increasing the CU threshold or applying additional filters to further reduce the dataset size.

### KPIs

* **Interactive utilization %** - Displays the total interactive utilization percentage of the selected operation type in a specific item, contributing to the capacity’s activity during the selected timepoint.
* **Background utilization %** - Displays the total background utilization percentage of the selected operation type in a specific item, contributing to the capacity’s activity during the selected timepoint.
* **Interactive operations** - Displays the total number of interactive operations for the selected operation type in a specific item that contributed to the capacity’s activity during this timepoint. The card’s background color changes if the data is sampled in the _Top 100,000 interactive records in the time range_ table visual.
* **Background operations** - Displays the total number of background operations for the selected operation type in a specific item that contributed to the capacity’s activity during this timepoint. The card’s background color changes if the data is sampled in the _Top 100,000 background records in the time range_ table visual.

## Interactive and background records for time range

A table visual displays the data based on selection of utilization type: interactive and background. The table shows every operation that contributed to capacity units (CUs) usage in the viewed timepoint. It fetches the top 100,000 records based on CUs. If the selected item and operation is not undergoing any interactive or background operations at selected time range, then a banner is displayed over table visual saying there are no interactive/background operations.

### Default fields

This section lists the default fields that are displayed in the table visual. You can't remove default fields from the table.

* **Start** - The time the interactive or background operation began.
* **End** - The time the interactive or background operation finished.
* **Status** - An indication showing if the operation succeeded or failed.
* **User** - The name of the user that triggered the interactive or background operation.
* **Duration (s)** - The number of seconds the interactive or background operation took to complete.
* **Throttling (s)** - The number of seconds of throttling applied to this interactive or background operation because of the capacity being overloaded in the previous timepoint.
* **Total CUs** - The number of CUs used by interactive or background operation.
* **Timepoint CUs** - The number of CUs assigned to the interactive or background operation in the current timepoint. The metric can be used to determine if the capacity exceeds the total number of CUs allowed for the capacity.
* **% Of Base capacity** - Interactive or background CU operations as a proportion of the base capacity allowance.
* **Operations** - Count of operations.
  
### Optional fields

This section lists the optional fields that you can add to the table visual. You can add or remove optional fields from the table using the **Select optional columns** dropdown menu.

* **Billing type** - Displays information if the operation is billable or not.
  - **Billable** - Indicates that operation is billable.
  - **Nonbillable** - Indicates that operation is nonbillable.
* **Operation ID** - Displays information regarding Operation ID.
* **Smoothing start** - The time the interactive operation began smoothing.
* **Smoothing end** - The time the interactive operation finished smoothing.

## Related content

* [Understand the metrics app compute page?](metrics-app-compute-page.md)
* [Understand the metrics app timepoint page](metrics-app-timepoint-page.md)
