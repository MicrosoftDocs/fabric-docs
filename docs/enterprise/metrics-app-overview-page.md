---
title: Understand the metrics app overview page
description: Learn how to read the Microsoft Fabric utilization and metrics app's overview page.
author: KesemSharabi
ms.author: kesharab
ms.topic: how to
ms.date: 12/27/2022
---

# Understand the metrics app overview page

The Microsoft Fabric utilization and metrics app's overview page provides an overview of your capacity's performance. It's divided into the three sections listed below.

At the top of each page, the **CapacityID** field allows you to select the capacity the app shows results for.

## Items

The items section is made up of two visuals, one on top of the other, in the left side of the page. The top visual is a stacked column table, and below it is a matrix table.

### Multi metric column chart

A stacked column table that provides an hourly view of your capacity's usage. Drill down to a specific day to identify daily patterns. Selecting each stacked column will filter the main matrix and the other visuals according to your selection.

The Multi metric column chart displays the four values listed below. It shows the top results for these values per item during the past two weeks.

* **CPU** - CPU processing time in seconds.

* **Duration** - Processing time in seconds.

* **Operations** - The number of operations that took place.

* **Users** - The number of users that performed operations.

### Matrix by item and operation

A matrix table that displays metrics for each item on the capacity. To gain a better understanding of your capacity's performance, you can sort this table according to the parameters listed below. The colors in the table represent your *performance delta*.

* **Items** - A list of items active during the selected period of time. The item name is a string with the syntax: `item name \ item type \ workspace name`. You can expand each entry to show the various operations (such as queries and refreshes) the item performed.

* **CPU (s)** - CPU processing time in seconds. Sort to view the top CPUs that consumed items over the past two weeks.

* **Duration (s)** - Processing time in seconds. Sort to view the items that needed the longest processing time during the past two weeks.

* **Users** - The number of users that used the item.

* **Item Size** - The amount of memory an item needs. Sort to view the items that have the largest memory footprint.

* **Overloaded minutes** - Displays a sum of 30 seconds increments where overloading occurred at least once. Sort to view the items that were affected the most due to overload penalty.

* **Performance delta** - Displays the performance effect on the items. The number represents the percent of change from seven days ago. For example, 20 suggests that there's a 20% improvement today, compared with the same metric taken a week ago.

    The colors in the matrix represent your *performance delta*:
    * *No color* - A value higher than -10
    * *Orange* - A value between -10 and -25
    * *Red* - A value lower than -25

    To create the *performance delta* Microsoft Fabric calculates an hourly average for all the fast operations that take under 200 milliseconds to complete. The hourly value is used as a slow moving average over the last seven days (168 hours). The slow moving average is then compared to the average between the most recent data point, and a data point from seven days ago. The *performance delta* indicates the difference between these two averages.

    You can use the *performance delta* value to assess whether the average performance of your items improved or worsened over the past week. The higher the value is, the better the performance is likely to be. A value close to zero indicates that not much has changed, and a negative value suggests that the average performance of your items got worse over the past week.

    Sorting the matrix by the *performance delta* column helps identify datasets that have had the biggest change in their performance. During your investigation, don't forget to consider the *CPU (s)* and number of *Users*. The *performance delta* value is a good indicator when it comes to Microsoft Fabric items that have a high CPU utilization because they're heavily used or run many operations. However, small datasets with little CPU activity may not reflect a true picture, as they can easily show large positive or negative values.

[!INCLUDE [product-name](../includes/metrics-app-preview-status.md)]

## Performance

The performance section is made up of four visuals, one on top of the other, in the middle of the page.

### CPU over time

Displays the CPU usage of the selected capacity over time. Filters applied to the page in the [Multi metric column chart](#multi-metric-column-chart), affect this chart's display as follows:

* *No filters applied* - Columns display the peak timepoint per hour.

* *Filters are applied* -  The visuals displays every 30 second timepoint.

>[!NOTE]
>Peak is calculated as the highest number of seconds from both [*interactive* and *background*](service-premium-interactive-background-operations.md) operations.

To access the [Timepoint](#metrics-app-timepiont-page) page from this visual, select a timepoint you want to explore and then select **Explore**.

The CPU over time chart displays the following elements:

* **Interactive CPU** - Red columns represent the number of CPU seconds used during interactive operations in a 30 second period.

    [*Interactive*](service-premium-interactive-background-operations.md#interactive-operations) operations cover a wide range of resources triggered by users. These operations are associated with interactive page loads.

* **Background** - Blue columns represent the number of CPU seconds used during background operations in a 30 second period.

    [*Background*](service-premium-interactive-background-operations.md#background-operations) operations cover backend processes that are not directly triggered by users, such as data refreshes.

* **CPU Limit** - A yellow dotted line that shows the threshold of the allowed number of CPU seconds for the selected capacity. Columns that stretch above this line, represent timepoints where the capacity is overloaded.

### Overloaded minutes per hour

Displays a score that represents the severity that overload had on the performance of an item. If no item is filtered, this chart shows the maximum value seen from all items at each load evaluation interval (30 seconds) in the past two weeks.

### Item size

Displays the memory footprint recorded for Microsoft Fabric items over time. If no item is filtered this chart shows the maximum value seen from all items at each ten minute time sample in the past two weeks.

### Performance profile

Displays an aggregate of report performance across three operation categories:

* **Fast** - The moving average of fast operations as a percentage of all the operations over time. A fast operation takes less than 100 milliseconds.

* **Moderate** - The moving average of moderate operations as a percentage of all the operations over time. A moderate operation takes between 100 milliseconds to two seconds.

* **Slow** - The moving average of slow operations as a percentage of all the operations over time. A slow operation takes over two seconds.

The aggregate is taken from the total number of operations performed on an item, over the past two weeks. If no item is filtered, this chart shows the performance profile for datasets on the entire capacity.

## Weekly trendlines

The weekly trendlines section is made up of four visuals, one on top of the other, in the right side of the report. These visuals summarize the capacity's behavior over the past four weeks. This section is designed to provide a snapshot of your capacity, highlighting trends for the past four weeks.

### CPU

Displays the total CPU power your capacity consumed over the past four weeks. Each data point is the aggregated sum of CPU used for the past seven days.

### Active Items

Displays the number of items (such as reports, dashboards, and datasets) that used CPU during the past four weeks.

### Active Users

Displays the number of users that used the capacity during the past four weeks.

### Cores

Displays the number of cores used by the capacity in the past four weeks. Each data point is the maximum capacity size reported during that week. If your capacity used autoscaling or scaled up to a bigger size, the visual will show the increase.

## Next steps

>[!div class="nextstepaction"]
>[Understand the metrics app explore page?](metrics-app-explore-page.md)
