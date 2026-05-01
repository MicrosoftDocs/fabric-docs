---
title: Understand the metrics app compute page
description: Learn how to read the Microsoft Fabric Capacity metrics app's compute page.
author: dknappettmsft
ms.author: daknappe
ms.topic: how-to
ms.custom: sfi-image-nochange
ms.date: 07/10/2025
ms.update-cycle: 180-days
no-loc: [Copilot]
ms.collection: ce-skilling-ai-copilot
---

# Understand the metrics app compute page

The Microsoft Fabric Capacity Metrics app's compute page provides an overview of your capacity's performance, showing data for the last 14 days. It's divided into the three visuals listed in the following sections. The top two visuals include a ribbon chart and a line and stacked column chart, and the bottom visual is a matrix table.

At the top of each page, the **Capacity Name** field allows you to select the capacity the app shows results for.

## Cards

In this page, there are three cards present to provide specific information of SKU, Average utilization % and Peak utilization %. The information on the cards is filtered according to your capacity and date range selection.

* **SKU** - Latest SKU of the capacity. Shows most recent SKU for active state if capacity is paused, and shows blank if capacity is active but not reporting usage.
   
* **Average utilization %** - Average utilization percentage of the capacity. Utilization is calculated with respect to base capacity units of the capacity and does not consider autoscale capacity units. This excludes timepoint when the capacity was not active (e.g., paused) and the timepoints where capacity was active but not reporting usage.

* **Peak utilization %** - Peak utilization percentage of the capacity. Utilization is calculated with respect to base capacity units of the capacity and does not consider autoscale capacity units. User can filter out peak utilization reported for pause events using "_Filter paused events_" in the visual-level filter pane. Paused events are included by default.

## Multimetric ribbon chart


The multimetric ribbon chart provides an hourly view of your capacity's usage. To identify daily patterns, drill down to a specific day. Selecting each stacked column filters the main matrix and the other visuals according to your selection.

The multimetric column ribbon displays the following four values. You see the top results for these values per item during the past two weeks.

* **CU** - Capacity Units (CU) processing time in seconds.
* **Duration** - Processing time in seconds.
* **Operations** - The number of operations that took place.
* **Users** - The number of unique users that performed operations, including service principals

## Capacity utilization and throttling

Displays usage and throttling for the selected capacity. To toggle how the visual is displayed, use the tabs at the top of the visual.

> [!TIP]
> The matrix table at the bottom of the page includes a helpful tooltip feature. When you hover over rows in the details table, a tooltip appears showing the breakdown of consumption by operation type (such as query or refresh). This tooltip is one of the only places in the app where you can see this granular breakdown, making it valuable for understanding what types of operations are consuming your capacity resources.

### Utilization  

Displays CU usage over time.

:::image type="content" source="media/fabric-cross-filter.gif" alt-text="Animation that shows cross-filtered data in the multimetric ribbon chart." lightbox="media/fabric-cross-filter.gif":::

To toggle how the visual is displayed, use the tabs at the top right corner of the visual.

* **Linear** - Display the information using a linear scale that starts at 0 percent.
* **Logarithmic** - Display the information using a logarithmic scale that depends on your CUs consumption.

The utilization chart displays the following elements:

* **Background %** - Blue columns represent the percent of CU consumption used during background operations in a 30-second period. This column refers to billable operations.

    [*Background*](fabric-operations.md#background-operations) operations cover backend processes that aren't directly triggered by users, such as data refreshes.

* **Interactive %** - Red columns represent the percent of CU consumption used during interactive operations in a 30-second period. This column refers to billable operations.

    [*Interactive*](fabric-operations.md#interactive-operations) operations cover a wide range of resources triggered by users. These operations are associated with interactive page loads.

* **Background nonbillable %** - Baby blue columns represent the percent of CU consumption used during preview background operations in a 30-second period.
* **Interactive nonbillable %** - Green columns represent the percent of CU consumption used during preview interactive operations in a 30-second period.
* **Autoscale CU % Limit** - An orange dotted line that shows the percent of CU consumption for autoscaled capacities. The line represents timepoints where the capacity is overloaded.
* **CU % Limit** - A grey dotted line that shows the threshold of the allowed percent of CU consumption for the selected capacity. Columns that stretch above this line, represent timepoints where the capacity is overloaded.

Filters applied to the page in the [Multimetric ribbon chart](#multimetric-ribbon-chart), affect this chart's display as follows:

* *No filters applied* - Columns display the peak timepoint every six minutes.
* *Filters are applied* - The visuals displays every 30-second timepoint. To view granular data, select a date from the multimetric ribbon chart's x-axis.

### Throttling

Displays delay and rejection over time.

:::image type="content" source="media/fabric-drill-through.gif" alt-text="Animation that shows the drill through option for a selected time point." lightbox="media/fabric-drill-through.gif":::

Throttling is based on the amount of future capacity consumption resulting from the following smoothing policies.

| Policy | Consumption |Impact |
|--|--|--|
| Overage protection |Usage <= 10 minutes |Jobs can consume 10 minutes of future capacity use without throttling. |
| Interactive delay |10 minutes < usage <= 60 minutes |User requested interactive jobs are throttled. |
| Interactive rejection |60 minutes < usage <= 24 hours |User requested interactive jobs are rejected. |
| Background rejection |Usage > 24 hours |User scheduled background jobs are rejected and not executed. |

To toggle how the visual is displayed, use the tabs at the top right corner of the visual.

* **Linear** - Display the information using a linear scale that starts at 0 percent.
* **Logarithmic** - Display the information using a logarithmic scale that depends on your CUs consumption.

To toggle between interactive delay, interactive rejection, and background rejection, use the tabs at the top of the visual. Timepoints with a value that's above 100% are rendered with a darker color.

Each visual is rendered according to static legends displayed on it. For example, the Interactive delay tab shows legends for **Interactive delay**, **No Interactive delay**, and **No interactive delay (capacity overage billed)**.

The interactive and background rejection tabs work in the same way. If you see that you utilized 75% of the future capacity consumption for a specific timepoint, you have 15 minutes remaining before the start of interactive or background rejection, which causes user requested jobs to be rejected.

The throttling chart displays the following elements:

  * **Interactive delay** - Interactive operations get delayed when *10 min Interactive %* smoothing crosses the *Interactive delay* threshold.
  * **Interactive rejection** - Interactive operations get rejected when *60 min Interactive %* smoothing crosses the *Interactive rejection* threshold.
  * **Background rejection** - Background operations get rejected when *24 hours Background %* smoothing crosses the *Background rejection* threshold.

> [!NOTE]
> When capacity overage is enabled for the capacity, the capacity doesn't enter the throttling state until the capacity overage limit is exceeded. This state is represented as **No interactive delay (capacity overage billed)**, **No interactive rejection (capacity overage billed)** and **No background rejection (capacity overage billed)** in the throttling charts. For more information, see [Capacity overage overview](capacity-overage-overview.md).
Filters applied to the page in the [Multimetric ribbon chart](#multimetric-ribbon-chart), affect this chart's display as follows:

* *No filters applied* - Columns display the peak timepoint every six minutes.
* *Filters are applied* - The visuals displays every 30-second timepoint. To view granular data, select a date from the multimetric ribbon chart's x-axis.

### Overages

The **Overages** tab has two views: **Overage (Carryforward)** and **Overage (Billed)**, as shown in the following image:

:::image type="content" source="media/fabric-cross-filter-overages.gif" alt-text="Animation that shows overage over time." lightbox="media/fabric-cross-filter-overages.gif":::

#### Overage (Carryforward)

**Overage (Carryforward)** displays the add, burndown, and cumulative carryforward over time. Carryforward only takes into account billable operations.

The overages carryforward chart displays the following elements:

  * **Add %** - Green columns represent the carryforward percent added during the current 30-second period.
  * **Burndown %** - Blue columns represent the carryforward percent burned down for the current 30-second period.
  * **Cumulative %** - Red line represent the cumulative carryforward percent for the current 30-second period. Cumulative percent is displayed on the secondary axis located on the right side of the visual.

#### Overage (Billed)

**Overage (Billed)** shows the overage usage that is billed for the capacity. These visuals are only populated when capacity overage is enabled and the capacity has incurred overages and has overages that would have resulted in throttling.

This view displays the following visuals:

- **Table** - shows details of billed overages for the capacity at a point in time.
  - **Rolling cumulative 24 hour billed overage CU (hr)** - Max of rolling cumulative 24 hours billed overage in capacity unit hours.
  - **Overage billing limit CU (hr)** - Max of overage billing limit in capacity units hours.
  - **Overage (Billed) CUs (s)** - Sum of billed overages in capacity units seconds.

- **Timepoint visual** - shows billed overage capacity unit seconds over time.
  - **Overage (Billed) CUs (s)** - Amount of overage capacity unit seconds billed for the current 30-second window.

- **Cumulative visual** - shows the cumulative overages billed over the past 24 hours for each window.
  - **Rolling cumulative 24 hour billed overage CU (hr)** - Amount of overage capacity unit hours billed for the past 24 hours from the current window.
  - **Overage billing limit CU (hr)** - 24-hour limit for billed overage set at the capacity level in capacity unit hours.
  
Once you select a column in the chart, you can use the *Explore* buttons to drill through to the [timepoint summary](metrics-app-timepoint-summary-page.md) or [timepoint detail](metrics-app-timepoint-page.md) pages.

Filters applied to the page in the [Multimetric ribbon chart](#multimetric-ribbon-chart), affect the Timepoint and Cumulative visuals as follows:

* *No filters applied* - Columns display the peak timepoint every 20 minutes.
* *Filters are applied* - The visuals displays every 30-second timepoint. To view granular data, select a date from the multimetric ribbon chart's x-axis.

>[!NOTE]
>Peak is calculated as the highest number of seconds from both [*interactive* and *background*](fabric-operations.md#interactive-and-background-operations) operations.

>[!NOTE]
>Nonbillable usage doesn't drain capacity or lead to throttling or auto scale.

## System Events

Displays capacity events. When the state of the capacity has remained unchanged for last 14 days, the table doesn't display any information.

The system events table displays the following elements:

  * **Time** - The time the capacity was paused or resumed.
  * **State** - The state of the capacity. 
  * **State Change Reason** - Displays the event trigger.

This table lists system events for capacities.

|Capacity State|Capacity state change reason|When shown|
| -------- | -------- | -------- |
|Active|Created|Indicates the capacity was created.|
|Active|ManuallyResumed|Indicates the capacity is active. Occurs when a paused capacity is resumed.|
|Active|NotOverloaded|Indicates the capacity is active and is below all throttling and surge protection thresholds.|
|Deleted|Deleted|Indicates the capacity was deleted.|
|Overloaded|AllRejected|Indicates the capacity exceeded the background rejection limit. The capacity rejects background and interactive operations.|
|Overloaded|InteractiveDelay|Indicates the capacity exceeded the interactive delay throttling limit. The capacity delays interactive operations.|
|Overloaded|InteractiveDelayAndSurgeProtectionActive|Indicates the capacity exceeded the interactive delay throttling limit and the configured surge protection threshold. The capacity is above the configured recovery threshold. The capacity rejects background operations and delays interactive operations.|
|Overloaded|InteractiveRejected|Indicates the capacity exceeded the interactive rejection throttling limit. The capacity rejects interactive operations.|
|Overloaded|InteractiveRejectedAndSurgeProtectionActive|Indicates the capacity exceeded the interactive rejection throttling limit and the configured surge protection threshold. The capacity is above the configured recovery threshold. The capacity rejects background and interactive operations.|
|Overloaded|SurgeProtectionActive|Indicates the capacity exceeded the configured surge protection threshold. The capacity is above the configured recovery threshold. The capacity rejects background operations.|
|Suspended|ManuallyPaused|Indicates the capacity is paused.|

For more information on pause and resume, see [Monitor a paused capacity](monitor-paused-capacity.md). 
For more information on surge protection, see [Surge Protection](surge-protection.md).
## Matrix by item and operation

A matrix table that displays metrics for each item on the capacity. To gain a better understanding of your capacity's performance, you can sort this table according to the parameters listed in this section. The colors in the table represent your *performance delta*.

You can hover over any value in the visual to see operation level data. You can also filter the visual with the item kind slicer and add or remove columns using the optional columns slicer.

The colors in the matrix represent your [performance delta](metrics-app-calculations.md#performance-delta):
* *No color* - A value higher than -10.
* *Orange* - A value between -10 and -25.
* *Red* - A value lower than -25.

### Default fields

The table in this section lists the default fields that are displayed in the matrix by item and operation visual. You can't remove default fields from the table.

|Name      |Description  |
|----------|--------------|
|Workspace |The workspace the item belongs to |
|Item kind |The item type |
|Item name |The item name |
|CU (s)    |Capacity Units (CU) processing time in seconds. Sort to view the top CUs that processed items over the past two weeks   |
|Duration (s) |Processing time in seconds. Sort to view the items that needed the longest processing time during the past two weeks |
|Users     |The number of users that used the item                                 |
|<sup>*</sup>Billing type |Displays information if the item is billable or not     |

<sup>*</sup> The billing type column displays the following values:

* *Billable* - Indicates that operations for this item are billable.
* *Nonbillable*  - Indicates that operations for this item are nonbillable.
* *Both* - There are two scenarios when an item can have both as billable type:
  - If the item has both billable and nonbillable operations.
  - If the item has operations that are in transition period from nonbillable to billable.

### Optional fields

The table in this section lists the optional fields that you can add to the matrix by item and operation visual. You can add or remove optional fields from the table using the *Select optional column(s)* dropdown menu.

|Name  |Description  |
|----------|-----------------|
|Rejected count   |The total number of rejected operations for an item             |
|Failed count     |The total number of failed operations for an item               |
|Invalid count    |The total number of invalid operations for an item              |
|InProgress count |The total number of operations that are in progress for an item |
|Successful count |The total number of successful operations for an item           |
|Virtualized item      |Displays one of the following values:<li>*True* - Virtual items that consume CUs, for example virtual items used by Copilot</li><li>*False* - Items that aren't virtual</li> |
|Virtualized workspace |Displays one of the following values:<li>*True* - Virtual workspaces that consume CUs, for example a virtual workspace used by a virtual network</li><li>*False* - Workspaces that aren't virtual</li> |
|Item Size (GB) |The amount of memory an item needs measured in gigabytes (GB) |
|Overloaded minutes |Displays a sum of 30 seconds increments where overloading occurred at least once. Sort to view the items that were affected the most due to overload penalty |
|Performance delta |Displays the performance effect on the items. The number represents the percent of change from seven days ago. For example, 20 suggests that there's a 20% improvement today, compared with the same metric taken a week ago |

## Considerations and Limitations
The following considerations apply to the compute page:
- Throttling charts aren't populated in sovereign clouds. In these clouds, throttling occurs when utilization exceeds 100%. Use the utilization chart on the compute page to observe when throttling occurs. 

## Related content

* [Understand the metrics app storage page](metrics-app-storage-page.md)
* [Understand the metrics app timepoint page](metrics-app-timepoint-page.md)
* [KQL Database consumption](../real-time-intelligence/kql-database-consumption.md)
* [Monitor Spark capacity consumption](../data-engineering/monitor-spark-capacity-consumption.md)
* [Data Factory pricing](../data-factory/pricing-overview.md)