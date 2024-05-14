---
title: Understand the metrics app compute page
description: Learn how to read the Microsoft Fabric Capacity metrics app's compute page.
author: KesemSharabi
ms.author: kesharab
ms.topic: how to
ms.custom:
  - build-2023
  - ignite-2023
ms.date: 02/21/2024
no-loc: [Copilot]
---

# Understand the metrics app compute page

The Microsoft Fabric Capacity Metrics app's compute page provides an overview of your capacity's performance. It's divided into the three visuals listed in the following sections. The top two visuals include a ribbon chart and a line and stacked column chart, and the bottom visual is a matrix table.

At the top of each page, the **Capacity Name** field allows you to select the capacity the app shows results for.

## Multi metric ribbon chart

The multi metric ribbon chart provides an hourly view of your capacity's usage. To identify daily patterns, drill down to a specific day. Selecting each stacked column filters the main matrix and the other visuals according to your selection.

The multi metric column ribbon displays the following four values. You'll see the top results for these values per item during the past two weeks.

* **CU** - Capacity Units (CU) processing time in seconds.

* **Duration** - Processing time in seconds.

* **Operations** - The number of operations that took place.

* **Users** - The number of users that performed operations.

## Capacity utilization and throttling

Displays usage and throttling for the selected capacity. Use the tabs at the top of the visual to toggle how the visual is displayed.

### Utilization  

Displays CU usage over time.

:::image type="content" source="media/fabric-cross-filter.gif" alt-text="Animation that shows cross-filtered data in the multi metric ribbon chart." lightbox="media/fabric-cross-filter.gif":::

Use the tabs at the top right corner of the visual to toggle how the visual is displayed.

* **Linear** - Display the information using a linear scale that starts at 0 percent.

* **Logarithmic** - Display the information using a logarithmic scale that depends on your CUs consumption.

The utilization chart displays the following elements:

* **Background %** - Blue columns represent the percent of CU consumption used during background operations in a 30-second period. This column refers to billable operations.

    [*Background*](/power-bi/enterprise/service-premium-interactive-background-operations#background-operations) operations cover backend processes that aren't directly triggered by users, such as data refreshes.

* **Interactive %** - Red columns represent the percent of CU consumption used during interactive operations in a 30-second period. This column refers to billable operations.

    [*Interactive*](/power-bi/enterprise/service-premium-interactive-background-operations#interactive-operations) operations cover a wide range of resources triggered by users. These operations are associated with interactive page loads.

* **Background non-billable %** - Baby blue columns represent the percent of CU consumption used during preview background operations in a 30-second period.

* **Interactive non-billable %** - Green columns represent the percent of CU consumption used during preview interactive operations in a 30-second period.

* **Autoscale CU % Limit** - An orange dotted line that shows the percent of CU consumption for autoscaled capacities. The line represents timepoints where the capacity is overloaded.

* **CU % Limit** - A grey dotted line that shows the threshold of the allowed percent of CU consumption for the selected capacity. Columns that stretch above this line, represent timepoints where the capacity is overloaded.

Filters applied to the page in the [Multi metric ribbon chart](#multi-metric-ribbon-chart), affect this chart's display as follows:

* *No filters applied* - Columns display the peak timepoint every six minutes.

* *Filters are applied* - The visuals displays every 30-second timepoint. To view granular data, select a date from the multi metric ribbon chart's x-axis.

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

Use the tabs at the top right corner of the visual to toggle how the visual is displayed.

* **Linear** - Display the information using a linear scale that starts at 0 percent.

* **Logarithmic** - Display the information using a logarithmic scale that depends on your CUs consumption.

Use the tabs at the top of the visual to toggle between interactive delay, interactive rejection, and background rejection. Timepoints with a value that's above 100% are rendered with darker color.

The interactive and background rejection tabs work in the same way. If you see that you utilized 75% of the future capacity consumption for a specific timepoint, you have 15 minutes remaining before the start of interactive or background rejection, which causes user requested jobs to be rejected.

The throttling chart displays the following elements:

  * **Interactive delay** - Interactive operations get delayed when *10 min Interactive %* smoothing crosses the *Interactive delay* threshold.
  
  * **Interactive rejection** - Interactive operations get rejected when *60 min Interactive %* smoothing crosses the *Interactive rejection* threshold.

  * **Background rejection** - Background operations get rejected when *24 hours Background %* smoothing crosses the *Background rejection* threshold.

Filters applied to the page in the [Multi metric ribbon chart](#multi-metric-ribbon-chart), affect this chart's display as follows:

* *No filters applied* - Columns display the peak timepoint every six minutes.

* *Filters are applied* - The visuals displays every 30-second timepoint. To view granular data, select a date from the multi metric ribbon chart's x-axis.

### Overages
  
Displays the *add*, *burndown*, and *cumulative* carryforward over time. Carryforward only takes into account billable operations.

:::image type="content" source="media/fabric-cross-filter-overages.gif" alt-text="Animation that shows overage over time." lightbox="media/fabric-cross-filter-overages.gif":::

The overages chart displays the following elements:

  * **Add %** - Green columns represent the carryforward percent added during the current 30-second period.
  
  * **Burndown %** - Blue columns represent the carryforward percent burned down for the current 30-second period.
  
  * **Cumulative %** - Red line represent the cumulative carryforward percent for the current 30-second period. Cumulative percent is displayed on the secondary axis located on the right side of the visual.
  
Once you select a column in the chart, you can use the *Explore* button to drill through to the [timepoint](metrics-app-timepoint-page.md) page.

Filters applied to the page in the [Multi metric ribbon chart](#multi-metric-ribbon-chart), affect this chart's display as follows:

* *No filters applied* - Columns display the peak timepoint every 20 minutes.

* *Filters are applied* - The visuals displays every 30-second timepoint. To view granular data, select a date from the multi metric ribbon chart's x-axis.

>[!NOTE]
>Peak is calculated as the highest number of seconds from both [*interactive* and *background*](/power-bi/enterprise/service-premium-interactive-background-operations) operations.

To access the [Timepoint](metrics-app-timepoint-page.md) page from this visual, select a timepoint you want to explore and then select **Explore**.

>[!NOTE]
>Non billable usage does not drain capacity or lead to throttling or auto scale.

## System Events

Displays pause and resume capacity events. For more information see [Monitor a paused capacity](monitor-paused-capacity.md). When the state of the capacity has remained unchanged for last 14 days, the table doesn't display any information.

The system events table displays the following elements:

  * **Time** - The time the capacity was paused or resumed.
  
  * **State** - The state of the capacity. *Suspended* indicates that the capacity was paused. *Active* indicates that the capacity was resumed.
  
  * **State Change Reason** - Displays the event trigger.

## Matrix by item and operation

A matrix table that displays metrics for each item on the capacity. To gain a better understanding of your capacity's performance, you can sort this table according to the parameters listed in this section. The colors in the table represent your *performance delta*.

You can hover over any value in the visual to see operation level data. You can also filter the visual with the item kind slicer and add or remove columns using the optional columns slicer.

The colors in the matrix represent your *performance delta*:
* *No color* - A value higher than -10.
* *Orange* - A value between -10 and -25.
* *Red* - A value lower than -25.

To create the *performance delta*, Microsoft Fabric calculates an hourly average for all the fast operations that take under 200 milliseconds to complete. The hourly value is used as a slow moving average over the last seven days (168 hours). The slow moving average is then compared to the average between the most recent data point, and a data point from seven days ago. The *performance delta* indicates the difference between these two averages.

You can use the *performance delta* value to assess whether the average performance of your items improved or worsened over the past week. The higher the value is, the better the performance is likely to be. A value close to zero indicates that not much has changed, and a negative value suggests that the average performance of your items got worse over the past week.

Sorting the matrix by the *performance delta* column helps identify semantic models that have the biggest change in their performance. During your investigation, don't forget to consider the *CU (s)* and number of *Users*. The *performance delta* value is a good indicator when it comes to Microsoft Fabric items that have a high CU utilization because they're heavily used or run many operations. However, small semantic models with little CU activity might not reflect a true picture, as they can easily show large positive or negative values.

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

* *Non-Billable*  - Indicates that operations for this item are non-billable.

* *Both* - There are two scenarios when an item can have both as billable type:
        - If the item has both billable and non-billable operations.
        - If the item has operations that are in transition period from non-billable to billable.

### Optional fields

The table in this section lists the optional fields that you can add to the matrix by item and operation visual. You can add or remove optional fields from the table using the *Select optional column(s)* dropdown menu.

|**Name**  |**Description**  |
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

## Related content

* [Understand the metrics app storage page](metrics-app-storage-page.md)
* [Understand the metrics app timepoint page](metrics-app-timepoint-page.md)
* [KQL Database consumption](../real-time-intelligence/kql-database-consumption.md)
* [Monitor Spark capacity consumption](../data-engineering/monitor-spark-capacity-consumption.md)
* [Data Factory pricing](../data-factory/pricing-overview.md)
