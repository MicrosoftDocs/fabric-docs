---
title: Plan your capacity size
description: Learn how to plan your Microsoft Fabric capacity size using the Microsoft Fabric capacity metrics app.
author: KesemSharabi
ms.author: kesharab
ms.topic: how-to
ms.date: 06/10/2024
---

# Plan your capacity size

[Capacity](licenses.md#capacity) planning is the process of estimating the resources needed to run Microsoft Fabric efficiently. Capacity planning helps you avoid performance issues, such as slow queries, timeouts, or throttling. Capacity planning can also help you optimize your spending, by choosing the right [capacity SKU](licenses.md#capacity).

## Understand how consumption is calculated

The [capacity SKU](licenses.md#capacity) table shows the number of Capacity Units (CUs) per SKU. To understand how the SKU's compute power translates to your usage, use the [capacity metrics app](metrics-app-compute-page.md). The app uses the same 30-second evaluation period that's used by the capacity platform when measuring consumption. Multiply the number of CUs in the SKU table by 30 to get the number of CUs used in 30 seconds.

| SKU | Capacity Units (CU) | 30-second CU use |
|--|--|--|
| F2 | 2 | 60 |
| F4 | 4 | 120 |
| F8 | 8 | 240 |
| F16 | 16 | 480 |
| F32 | 32 | 960 |
| F64 | 64 | 1920 |
| F128 | 128 | 3840 |
| F256 | 256 | 7680 |
| F512 | 512 | 15,360 |
| F1024 | 1024 | 30,720 |
| F2048 | 2048 | 61,440 |

## Estimate your capacity size

Follow these steps to estimate the size of the capacity you need. We recommend that you evaluate the use of a specific Fabric workload, such as [Power BI](/power-bi/enterprise/service-premium-what-is), [Spark](../data-engineering/spark-compute.md), or a [Data Warehouse](../data-warehouse/data-warehousing.md).

1. Create a [trial capacity](../fundamentals/fabric-trial.md).

2. In the [capacity metrics app](metrics-app-compute-page.md), review the [utilization](metrics-app-compute-page.md#utilization) visual.

3. Locate the timepoint you'd like to adjust as part of the capacity resize, and drill down to the [timepoint page](metrics-app-timepoint-page.md).

4. To understand which SKU you need, review these [top row visuals](metrics-app-timepoint-page.md#top-row-visuals).
    * **SKU card** - Shows the current SKU you're using.
    * **Capacity CU card** - Shows the number of CUs you're using.

5. [Scale up](scale-capacity.md) your capacity so that it covers your utilization.

6. Review the [utilization](metrics-app-compute-page.md#utilization) visual to ensure that your usage is within the capacity limits.

## Considerations

Capacities are [priced hourly or monthly](https://azure.microsoft.com/pricing/details/microsoft-fabric/).

## Related content

* [Understand the metrics app compute page](metrics-app-compute-page.md)
