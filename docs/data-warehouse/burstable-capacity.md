---
title: Burstable capacity
description: Learn more about how burstable capacity is used and limited with SKU guardrails in Fabric data warehousing.
author: realAngryAnalytics
ms.author: stevehow
ms.reviewer: wiassaf
ms.date: 02/14/2024
ms.topic: conceptual
ms.custom:
  - ignite-2023
ms.search.form: Optimization # This article's title should not change. If so, contact engineering.
---

# Burstable capacity in Fabric data warehousing

**Applies to:** [!INCLUDE [fabric-se-and-dw](includes/applies-to-version/fabric-se-and-dw.md)]

A Fabric capacity is a distinct pool of resources that's size (or SKU) determines the amount of computational power available. [!INCLUDE [fabric-dw](includes/fabric-dw.md)] and [!INCLUDE [fabric-se](includes/fabric-se.md)] provide burstable capacity that allows workloads to use more resources to achieve better performance.

## Burstable capacity

Burstable capacity has a direct correlation to the SKU that has been assigned to the Fabric capacity of the workspace. It also is a function of the workload. A non-demanding workload might never use burstable capacity units. The workload could achieve optimal performance within the baseline capacity that has been purchased. 

To determine if your workload is using burstable capacity, the following formula can be used to calculate the scale factor for your workload: `Capacity Units (CU) / duration / Baseline CU = Scale factor` 

As an illustration of this formula, if your capacity is an F8, and your workload takes 100 seconds to complete, and it uses 1500 CU, the scale factor would be calculated as follows: `1500 / 100 / 8 = 1.875`

CU can be determined by using the [Microsoft Fabric Capacity Metrics app](usage-reporting.md). 

When a scale factor is over 1, it means that burstable capacity is being used to meet the demands of the workload. It also means that your workload is borrowing capacity units from a future time interval. This is a fundamental concept of Microsoft Fabric called [smoothing](compute-capacity-smoothing-throttling.md#smoothing).

Smoothing offers relief for customers who create sudden spikes during their peak times, while they have a lot of idle capacity that is unused. Smoothing simplifies capacity management by spreading the evaluation of compute to ensure that customer jobs run smoothly and efficiently.

## SKU guardrails

Burstable capacity is finite. There's a limit applied to the backend compute resources to greatly reduce the risk of [!INCLUDE [fabric-dw](includes/fabric-dw.md)] and [!INCLUDE [fabric-se](includes/fabric-se.md)] workloads causing [throttling](compute-capacity-smoothing-throttling.md#throttling).

The limit (or guardrail) is a scale factor directly correlated to the Fabric Capacity SKU size that is assigned to the workspace.

| Fabric SKU | Equivalent Premium SKU | Baseline Capacity Units (CU) | Burstable Scale Factor |
|------------|-----------------------|------------------------------|------------------------|
| F2         |                       | 2                            | 1x - 32x               |
| F4         |                       | 4                            | 1x - 16x               |
| F8         |                       | 8                            | 1x - 12x               |
| F16        |                       | 16                           | 1x - 12x               |
| F32        |                       | 32                           | 1x - 12x               |
| F64        | P1                    | 64                           | 1x - 12x               |
| F128       | P2                    | 128                          | 1x - 12x               |
| F256       | P3                    | 256                          | 1x - 12x               |
| F512       | P4                    | 512                          | 1x - 12x               |
| F1024      | P5                    | 1024                         | 1x - 12x               |
| F2048      |                       | 2048                         | 1x - 12x               |

Smaller SKU sizes are often used for Dev/Test scenarios or ad hoc workloads. The larger scale factor shown in the table gives more processing power that aligns with lower overall utilization typically found in those environments.

Larger SKU sizes have access to more total capacity units, allowing more complex workloads to run optimally and with more concurrency. Therefore, if desired performance of a workload is not being achieved, [increasing the capacity SKU size](../enterprise/scale-capacity.md) might be beneficial.

> [!NOTE]
> The maximum Burstable Scale Factor might only be observed for extremely small time intervals, often within a single query for seconds or even milliseconds. When using the Microsoft Fabric Capacity Metrics app to observe burstable capacity, the scale factor over longer durations will be lower.

## Isolation boundaries

[!INCLUDE [fabric-dw](includes/fabric-dw.md)] fully isolates ingestion from query processing, as described in [Workload management](workload-management.md#ingestion-isolation). 

The burstable scale factor can be achieved independently for ingestion at the same time the burstable scale factor is achieved for query processing. These scale factors encapsulate all processes within a single workspace. However, capacity can be assigned to multiple workspaces. Therefore, the aggregate max scale factor across a capacity would be represented in the following formula: `([Query burstable scale factor] + [Ingestion burstable scale factor]) * [number of Fabric workspaces] = [aggregate burstable scale factor]`

## Considerations

- Typically, a complex query running in a workspace assigned to a small capacity SKU size should run to completion. However, if the data retrieval or intermediate data processing physically can't run within the burstable scale factor, it results in the following error message: `This query was rejected due to current capacity constraints.` Review the [performance guidelines](guidelines-warehouse-performance.md) to ensure data and query optimization prior to increasing SKU size. To increase the SKU size, contact your capacity administrator.

- After the [capacity is resized](../enterprise/scale-capacity.md), new guardrails will be applied when the next query is run. Performance should stabilize to the new capacity SKU size within a few seconds of the first query submission.

- A workload running on a nonoptimal capacity size can be subject to resource contention (such as spilling) that can increase the CU usage of the workload.

## Related content

- [Workload management](workload-management.md)
- [Scale your capacity](../enterprise/scale-capacity.md)
- [Smoothing and throttling in Fabric Data Warehousing](compute-capacity-smoothing-throttling.md)
- [Manage capacity settings](../admin/service-admin-portal-capacity-settings.md)
