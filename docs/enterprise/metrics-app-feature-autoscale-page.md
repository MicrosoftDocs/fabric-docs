---
title: Understand the metrics app autoscale compute for Spark page
description: Learn how to read the Microsoft Fabric Capacity metrics app's Autoscale compute for Spark page.
author: JulCsc
ms.author: juliacawthra
ms.topic: how-to
ms.custom:
ms.date: 03/24/2025

# Customer intent: As a Fabric admin, I want to understand how to read the Microsoft Fabric Capacity Metrics app's Autoscale compute for Spark page.
---
 
# Understand the metrics app Autoscale compute for Spark page

The Microsoft Fabric Capacity Metrics app's Autoscale Compute for Spark page provides an overview of capacities that have autoscale billing for Apache Spark enabled. Operations that aren't billed using Apache Spark autoscale, are displayed on the [compute](./metrics-app-compute-page.md) page. If there are no operations that used Spark autoscale in the selected capacity, there's a note in the Matrix by item visual, and no data is displayed.

The page is divided into three visuals: the top two include a ribbon chart and a line and stacked column chart, and the bottom visual features a matrix table.

>[!NOTE]
>Spark autoscale data isn't smoothed.

At the top of each page, the **Capacity Name** field allows you to select the capacity the app shows results for.

## CU metric ribbon chart

The CU metric ribbon chart provides an hourly view of your capacity's usage. To identify daily patterns, drill down to a specific day. Selecting each stacked column filters the main matrix and the other visuals according to your selection.

The CU metric column ribbon displays the Capacity Units (CU) processing time in seconds. You see the top results for these values per item during the past two weeks.

## CU (s) usage over time

This visual displays CU usage over time. Hovering over a timepoint shows a tooltip with additional details about the Autoscale CU usage percentage for that specific time.

To toggle how the visual is displayed, use the tabs at the top right corner of the visual.

* **Linear** - Display the information using a linear scale that starts at 0 percent.

* **Logarithmic** - Display the information using a logarithmic scale that depends on your CUs consumption.

The CU (s) usage over time chart displays the following elements:

* **Billable** - Blue columns represent the CU consumption used during billable operations in a one-minute period.

* **Non-Billable** - Red columns represent the CU consumption used during non-billable operations in a one-minute period.

* **Max CU Limit 1 Minute** - A grey dotted line that shows the threshold of the allowed CU consumption for the selected capacity.

Filters applied to the page in the [CU metric ribbon chart](#cu-metric-ribbon-chart), affect this chart's display as follows:

* *No filters applied* - Columns display the peak timepoint every six minutes.

* *Filters are applied* - The visuals displays every one-minute timepoint. To view granular data, select a date from the CU metric ribbon chart's x axis.

## Matrix by item and operation

A matrix table that displays metrics for each item on the capacity. To gain a better understanding of your capacity's performance, you can sort this table according to the parameters listed in this section.

You can hover over any value in the visual to see operation level data. You can also filter the visual with the item kind slicer and add or remove columns using the optional columns slicer.

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

The table in this section lists the optional fields. You can add or remove optional fields from the table using the *Select optional column(s)* dropdown menu.

|**Name**  |**Description**  |
|----------|-----------------|
|Successful count |The total number of successful operations for an item           |
|Failed count     |The total number of failed operations for an item               |
|Invalid count    |The total number of invalid operations for an item              |

## Related content

* [Understand the metrics app compute page](metrics-app-compute-page.md)

* [Understand the metrics app storage page](metrics-app-storage-page.md)

* [Understand the metrics app timepoint page](metrics-app-timepoint-page.md)

* [KQL Database consumption](../real-time-intelligence/kql-database-consumption.md)

* [Monitor Spark capacity consumption](../data-engineering/monitor-spark-capacity-consumption.md)

* [Data Factory pricing](../data-factory/pricing-overview.md)