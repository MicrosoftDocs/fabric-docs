---
title: Understand the metrics app overview page
description: Learn how to read the Microsoft Fabric utilization and metrics app's overview page.
author: KesemSharabi
ms.author: kesharab
ms.topic: how to
ms.date: 05/23/2023
---

# Understand the metrics app overview page

The Microsoft Fabric utilization and metrics app's overview page provides an overview of your capacity's performance. It's divided into the three visuals listed below. The top two visuals include a ribbon chart and a line chart, and the bottom visual is a matrix table.

At the top of each page, the **CapacityID** field allows you to select the capacity the app shows results for.

## Multi metric ribbon chart

A ribbon chart that provides an hourly view of your capacity's usage. Drill down to a specific day to identify daily patterns. Selecting each stacked column will filter the main matrix and the other visuals according to your selection.

The Multi metric column ribbon displays the four values listed below. It shows the top results for these values per item during the past two weeks.

* **CU** - Capacity Units (CU) processing time in seconds.

* **Duration** - Processing time in seconds.

* **Operations** - The number of operations that took place.

* **Users** - The number of users that performed operations.

## CU over time

Displays the CU usage of the selected capacity over time. Use the tabs at the top of the visual to toggle how the visual is displayed:

* **Linear** - Display the information using a linear scale that starts at 0 percent.

* **Logarithmic** - Display the information using a logarithmic scale that depends on your CUs consumption.

Once you select a column in the chart, you can use the *Explore* button to drill through to the [timepoint](metrics-app-timepoint-page.md) page.

Filters applied to the page in the [Multi metric ribbon chart](#multi-metric-ribbon-chart), affect this chart's display as follows:

* *No filters applied* - Columns display the peak timepoint per hour.

* *Filters are applied* -  The visuals displays every 30 second timepoint.

>[!NOTE]
>Peak is calculated as the highest number of seconds from both [*interactive* and *background*](/power-bi/enterprise/service-premium-interactive-background-operations) operations.

To access the [Timepoint](metrics-app-timepoint-page.md) page from this visual, select a timepoint you want to explore and then select **Explore**.

The CU over time chart displays the following elements:

* **Background %** - Blue columns represent the percent of CU consumption used during background operations in a 30 second period. This column refers to operations that are performed in non-preview workloads.

    [*Background*](/power-bi/enterprise/service-premium-interactive-background-operations#background-operations) operations cover backend processes that are not directly triggered by users, such as data refreshes.

* **Interactive %** - Red columns represent the percent of CU consumption used during interactive operations in a 30 second period. This column refers to operations that are performed in non-preview workloads.

    [*Interactive*](/power-bi/enterprise/service-premium-interactive-background-operations#interactive-operations) operations cover a wide range of resources triggered by users. These operations are associated with interactive page loads.

* **Background Preview %** - Baby blue columns represent the percent of CU consumption used during preview workloads background operations in a 30 second period.

* **Interactive Preview %** - Green columns represent the percent of CU consumption used during preview workloads interactive operations in a 30 second period. This column refers to operations that are performed in non-preview workloads.

* **Autoscale CU % Limit** - An orange dotted line that shows the percent of CU consumption for autoscaled capacities. The line represents timepoints where the capacity is overloaded.

* **CU % Limit** - A grey dotted line that shows the threshold of the allowed percent of CU consumption for the selected capacity. Columns that stretch above this line, represent timepoints where the capacity is overloaded.

## Matrix by item and operation

A matrix table that displays metrics for each item on the capacity. To gain a better understanding of your capacity's performance, you can sort this table according to the parameters listed below. The colors in the table represent your *performance delta*.

* **Items** - A list of items active during the selected period of time. The item name is a string with the syntax: `item name \ item type \ workspace name`. You can expand each entry to show the various operations (such as queries and refreshes) the item performed.

* **CU (s)** - Capacity Units (CU) processing time in seconds. Sort to view the top CUs that consumed items over the past two weeks.

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

    Sorting the matrix by the *performance delta* column helps identify datasets that have had the biggest change in their performance. During your investigation, don't forget to consider the *CU (s)* and number of *Users*. The *performance delta* value is a good indicator when it comes to Microsoft Fabric items that have a high CU utilization because they're heavily used or run many operations. However, small datasets with little CU activity may not reflect a true picture, as they can easily show large positive or negative values.

[!INCLUDE [product-name](../includes/metrics-app-preview-status.md)]

## Next steps

>[!div class="nextstepaction"]
>[Understand the metrics app timepoint page](metrics-app-timepoint-page.md)
