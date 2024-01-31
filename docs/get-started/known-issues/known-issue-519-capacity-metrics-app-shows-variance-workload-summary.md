---
title: Known issue - Capacity Metrics app shows variance between workload summary and operations
description: A known issue is posted where the Capacity Metrics app shows variance between workload summary and operations
author: mihart
ms.author: jessicamo
ms.topic: troubleshooting 
ms.date: 12/14/2023
ms.custom: known-issue-519
---

# Known issue - Capacity Metrics app shows variance between workload summary and operations

Fabric capacities support a breakdown of the capacity usage by workload meter. The meter usage is derived from the workload summary usage, which contains smoothed data over multiple time periods. Due to a rounding issue with this summary usage, it appears lower than the usage from the workload operations in the Capacity Metrics app. Until this issue is fixed, you can't correlate your operation level usage to your Azure bill breakdown. While the difference doesn't change the total Fabric capacity bill, the usage attributed to Fabric workloads might be under-reported.

**Status:** Fixed: December 13, 2023

**Product Experience:** Administration & Management

## Symptoms

A customer can uses the Capacity Metrics app to look at their workload usage for any item such as a Data warehouse or a Lakehouse.  In a 14-day period on the Capacity Metrics app, the usage appears to be lower than the bill for that workload meter. Note: Due to this issue, the available capacity meter shows higher usage, giving the erroneous impression that the capacity is underutilized more than it actually is.

## Solutions and workarounds

No workarounds at this time. This article will be updated when the fix is released.

## Related content

- [About known issues](https://support.fabric.microsoft.com/known-issues)
