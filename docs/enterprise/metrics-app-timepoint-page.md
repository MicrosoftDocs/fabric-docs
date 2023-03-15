---
title: Understand the metrics app timepoint page
description: Learn how to read the Microsoft Fabric utilization and metrics app's explore page.
author: KesemSharabi
ms.author: kesharab
ms.topic: how to
ms.date: 12/27/2022
---

# Understand the metrics app timepoint page

All the activities in the capacity are ranked according to their compute impact. The timepoint page shows the top 100,000 impactful activities in the capacity. Use this page to understand which [*interactive* and *background*](service-premium-interactive-background-operations.md) operations contributed the most to CPU usage.

>[!NOTE]
>Start and end times may occur before or after the displayed time period, due to [background](service-premium-interactive-background-operations.md#background-operations) [smoothing](service-premium-smoothing.md) operations.  

>[!IMPORTANT]
>You can only get to this page by using the drill through feature in an overloaded timepoint in one of these visuals:
>
> * [CPU over time](#cpu-over-time) in the *Overview* page
>
> * [Overloading windows](#overloading-windows) in the *Evidence* page

When the total combined CPU for *interactive* and *background* operations exceeds the 30 second timepoint allowance, the capacity is overloaded and depending on whether autoscale is enabled or not, throttling is applied.

* **Autoscale is enabled** - If the capacity has autoscale enabled, a new v-core will get added for the next 24 hours and will be shown as an increased value in the *CPU Limit* line in the [CPU over time](#cpu-over-time) chart.

    >[!NOTE]
    >When autoscale is enabled, if the capacity reaches the maximum number of v-cores allowed by the autoscale operation, throttling is applied.

* **Autoscale isn't enabled** - If autoscale isn't enabled, throttling gets applied to every interactive operation in the subsequent timepoint.

## Top row visuals

This section describes the operations of the visuals in the top row of the timepoint page.

* **Top left card** - Displays the timepoint used to drill through to this page.

* **Heartbeat line chart** - Shows a 60 minute window of CPU activity. Use this visual to establish the duration of peaks and troughs.

    * *Vertical red line* - The timepoint you currently drilled to view. The visual shows the 30 minutes of CPU activity leading to the selected timepoint, as well as the 30 minutes of CPU activity after the selected timepoint.

    * *Blue line* - Total CPUs.

    * *Yellow line* - The capacity allowance.

    >[!NOTE]
    >If the blue line is above the yellow line the capacity is overloaded.

* **Interactive operations card** - Displays the total number of interactive operations that contributed to the CPU's activity during this timepoint.

* **Background operations card** - Displays the total number of background operations that contributed to the CPU's activity during this timepoint.

* **SKU card** - Displays the current SKU.

* **Capacity CPU card** - Displays the total number of CPU seconds allowed for this capacity, for a given 30 second timepoint window.

## Interactive Operations

A table showing every [interactive operation](service-premium-interactive-background-operations.md) that contributed CPU usage in the timepoint used to drill through to this page. Once an interactive operation completes, all of the CPU seconds used by it get attributed to the timepoint window.

* **Items** - The name of the item, its type, and its workspace details.

* **Operation** - The type of interactive operation.

* **Start** - The time the interactive operation began.

* **End** - The time the interactive operation finished.

* **Status** - An indication showing if the operation succeeded or failed. Cancelled operations are reported as failed operations.

    >[!NOTE]
    >CPU usage for failed operations is counted when determining if the capacity is in overload.

* **User** - The name of the user that triggered the interactive operation.

* **Duration** - The number of seconds the interactive operation took to complete.

* **Total CPU** - The number of CPU seconds used by the interactive operation. This metric contributes to determine if the capacity exceeds the total number of CPU seconds allowed for the capacity.

* **Timepoint CPU** - The number of CPU seconds assigned to the interactive operation in the current timepoint.

* **Throttling** - The number of seconds of throttling applied to this interactive operation because of the capacity being overloaded in the previous timepoint.

* **% Of Capacity** - Interactive CPU operations as a proportion of the overall capacity allowance.

[!INCLUDE [product-name](../includes/metrics-app-preview-status.md)]

## Background Operations

A table showing every background operation that contributed CPU usage to the timepoint window used to drill through to this page. Every background operation that completed in the prior 24 hours (defined as a 2,880 x 30 second timepoint window), contributes a small portion of its total usage to the CPU value. This means that a background operation that completed the previous day can contribute some CPU activity to determine if the capacity is in overload. For more information see [performance smoothing](service-premium-smoothing.md).

All the columns in the background operations table are similar to the ones in the [interactive operations](#interactive-operations) table. However, the background operations table doesn't have a *users* column.

## Next steps

>[!div class="nextstepaction"]
>[Understand the metrics app overview page?](metrics-app-overview-page.md)
