---
title: Billing and Utilization Data For Cosmos DB Database
titleSuffix: Microsoft Fabric
description: Learn about billing concepts for compute and storage and how to monitor usage for Cosmos DB in Microsoft Fabric.
author: seesharprun
ms.author: sidandrews
ms.topic: concept-article
ms.date: 07/16/2025
show_latex: true
appliesto:
- ✅ Cosmos DB in Fabric
---

# Billing and utilization data for Cosmos DB in Microsoft Fabric

Cosmos DB in Microsoft Fabric compute usage is encapsulated within your Fabric capacity. You can review and understand your utilization using similar tools to other Fabric workloads.

When you use a Fabric capacity, your usage charges appear in the Azure portal within your subscription's context. For more information, see [Microsoft Cost Management](/azure/cost-management-billing/cost-management-billing-overview). For more information on Fabric billing, see [understand your Azure bill on a Fabric capacity](../../enterprise/azure-billing.md).

At this time, compute and data storage for Cosmos DB do not incur charges against your Fabric capacity.

## Capacity units

In Fabric you're entitled to a set of **capacity units** (CUs) that are shared across all Fabric workloads based on the capacity purchased. For more information on licenses supported, see [Microsoft Fabric concepts and licenses](../../enterprise/licenses.md).

Capacity is a dedicated set of resources that are available at a given time to be used. Capacity defines the ability of a resource to perform an activity or to produce output. Different resources consume CUs at different times.

## Request units

Cosmos DB normalizes the cost of all database operations using **request units** (RUs) and measures cost based on throughput referred to as **request units per second** (RU/s). For more information about throughput, see [request units](request-units.md)

## Conversion

Cosmos DB aims to make the most of the purchased capacity and provides visibility into usage using a capacity-based software-as-a-service (SaaS) model.

In straightforward terms, $100 RU/s = 0.067 CUs/hr$ or $1 RU/s = 0.00067 CUs/hr$. Put another way, `1` CU/h is equivalent to approximately `1,500` RU/s, meaning that $100 RU/s = 1/15 CU/hr$.

This ratio aligns the cost structure between Microsoft Azure and Microsoft Fabric if you're already familiar with throughput-based pricing for services like [Azure Cosmos DB for NoSQL](/azure/cosmos-db/nosql) maintaining price parity.

For example, a workload that typically requires `10,000` RU/s in Azure Cosmos DB for NoSQL would need `670` CUs per hour (CUs/hr) in Fabric using this formula:

$10000 RU/s * 0.00067 = 670 CUs/hr$

## Examples

Reference this example table for sizing estimations for Cosmos DB in Fabric based on commonly used capacity unit (CU) allocations:

| Capacity units per hour | Request units per second equivalent |
| --- | --- |
| `2` | `2,985.07` |
| `4` | `5,970.15` |
| `8` | `11,940.30` |
| `16` | `23,880.60` |
| `32` | `47,761.19` |
| `64` | `95,522.39` |
| `128` | `191,044.78` |
| `256` | `382,089.55` |
| `512` | `764,179.10` |
| `1024` | `1,528,358.21` |
| `2048` | `3,056,716.42` |

For more information about Fabric capacity planning, see [plan your capacity size in Microsoft Fabric](../../enterprise/plan-capacity.md).

## Autoscale

Consider an example where you manually set the autoscale throughput to `1000` RU/s. This means that throughput scales between `100` and `1000` RU/s. Consumption is scaled in increments of `100` RU/s equivalent to `0.067` CU/hr.

In an autoscale setup, the current throughput (`T`) automatically adjusts between 10% and 100% of the maximum throughput (`Tmax`), following the formula $0.1*T_{max} \leq T \leq T_{max}$. You can set the autoscale maximum throughput for each container as needed.

Cosmos DB in Fabric uses autoscale throughput with a default autoscale maximum of `5000` RU/s if deployed using the Fabric portal. If you deploy using the SDK, you can set the autoscale limit up to `10000` RU/s. For more information, see [throughput limitations](limitations.md#quotas-and-limits).

## Reporting

The Microsoft Fabric Capacity Metrics app offers a centralized view of capacity consumption across all Fabric workloads. It enables administrators to track usage trends, monitor workload performance, and ensure consumption aligns with the purchased capacity.

To get started, a capacity admin must install the app. After installation, access can be granted to others in the organization for broader visibility. For more information, see [Microsoft Fabric Capacity Metrics app?](../../enterprise/metrics-app.md) 

The app has the ability to filter usage to Cosmos DB databases in Fabric. Once a filter is applied, the visualizations in the app now selectively include activity relative to Cosmos DB.

## Related content

* [Monitor Cosmos DB in Microsoft Fabric](how-to-monitor.md)
