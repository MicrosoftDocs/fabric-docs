---
title: Pricing for copy job
description: This article provides details of the pricing model of copy job for Data Factory in Microsoft Fabric.
ms.reviewer: whhender
ms.author: yexu
author: dearandyxu
ms.topic: concept-article
ms.custom: copyjob
ms.date: 06/24/2025
---

# Copy job pricing for Data Factory in Microsoft Fabric

The Copy Job in Data Factory makes it easy to move your data from any source to any destination. With a simple, guided experience, you can set up data transfers using built-in patterns for both full and incremental copy.

When you run a Copy Job with Data Factory in Microsoft Fabric, Fabric Capacity Units (CUs) are consumed based on the following copy patterns:

- Full copy: CUs are charged when you perform a full data load from source to destination using Copy Job. This can be a one-time full copy, a recurring full snapshot reload, or the initial full load before starting incremental sync.
- Incremental copy: CUs are charged when only new or changed data is moved using Copy Job. For databases, this means only new or updated rows are transferred, and if Change Data Capture (CDC) is enabled, inserts, updates, and deletes are also captured. For storage sources, only files with a newer LastModifiedTime are copied.

## Pricing model

The following table shows a breakdown of the pricing model for Copy job within Data Factory in Microsoft Fabric:

|Copy Patterns |Consumption Meters  |Fabric Capacity Units (CU) consumption rate  |Consumption reporting granularity  |
|---------|---------|---------|
| Full copy    | Data movement        | 1.5 CU hours   | Per Copy job item |
| Incremental copy     | Data movement – incremental copy       | 3 CUs hours | Per Copy job item |

Both full copy and incremental copy patterns in Copy Job are billed based on the job’s run duration in hours and the used intelligent optimization throughput resources.

It indicates that for each intelligent optimization throughput resource usage in a Copy job execution, 1.5 CU hours are consumed for full copy, which is same as data movement Copy activities in pipeline. 3 CU hours are consumed for incremental copy, during which only delta data is moved using a more efficient approach that reduces the processing time. 

At the end of each Copy job run, the CU consumption for each consumption meters is summed and is billed as per the translated price of the Fabric Capacity in the region where the capacity is deployed.

## Changes to Microsoft Fabric workload consumption rate

Consumption rates are subject to change at any time. Microsoft uses reasonable efforts to provide notice via email and in-product notification. Changes are effective on the date stated in the [Release Notes](https://aka.ms/fabricrm) and the [Microsoft Fabric Blog](https://blog.fabric.microsoft.com/blog/). If any change to a Microsoft Fabric Workload Consumption Rate materially increases the Capacity Units (CU) required to use a particular workload, customers can use the cancellation options available for the chosen payment method.  

## Compute estimated costs using the Fabric Metrics App

The [Microsoft Fabric Capacity Metrics app](../enterprise/metrics-app.md) provides visibility into capacity usage for all Fabric workspaces tied to a capacity. It's used by capacity administrators to monitor the performance of workloads and their usage compared to purchased capacity. Using the Fabrics Metrics App is the most accurate way to estimate the costs of Copy job executions.

The following table can be used as a template to compute estimated costs using Fabric Metrics app for a Copy job run:

|Metric  | Full copy operation  |Incremental copy operation  |
|---------|---------|---------|
|Total CUs seconds     | x CU seconds    |  y CU seconds       |
|Effective CU-hour     | x CU seconds / (60*60) = X CU-hour    | y CU(s) / (60*60) = Y CU-hour        |

**Total cost**: (X + Y CU-hour) * (Fabric capacity per unit price)

## Related content

- [Pricing example scenarios](pricing-overview.md#pricing-examples)
- [Pricing Dataflow Gen2](pricing-dataflows-gen2.md)
