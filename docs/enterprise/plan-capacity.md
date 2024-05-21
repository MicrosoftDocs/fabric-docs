---
title: Plan your capacity size
description: Learn how to plan your Microsoft Fabric capacity size using the the Microsoft Fabric capacity metrics app.
author: KesemSharabi
ms.author: kesharab
ms.topic: how to
ms.date: 05/21/2024
---

# Plan your capacity size

[Capacity](licenses.md#capacity) planning is the process of estimating the resources needed to run Microsoft Fabric efficiently. Capacity planning helps you avoid performance issues, such as slow queries, timeouts, or throttling, and optimize your spending, by choosing the right [capacity SKU](licenses.md#capacity-license).

## Understand how consumption is calculated

The [capacity SKU](licenses.md#capacity-license) table shows the number of Capacity Units (CUs) per SKU. To understand how the SKU's compute power translates to your usage, use the [capacity metrics app](metrics-app-compute-page.md). The app shows consumption in intervals of 30 seconds. Multiply the number of CUs in the SKU table by 30 to get the number of CUs used in 30 seconds.

| SKU | Capacity Units (CU) | 30 second CU use |
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

Follow these steps to estimate the size of the capacity you need.

1. Create a [trial capacity](../get-started/fabric-trial.md).

2. 

## Purchase considerations

Capacities are [priced hourly or monthly](https://azure.microsoft.com/en-us/pricing/details/microsoft-fabric/).

## Related content

* [Understand the metrics app compute page](metrics-app-compute-page.md)
