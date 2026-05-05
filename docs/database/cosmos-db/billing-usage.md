---
title: Billing and Utilization Data For Cosmos DB Database
description: Learn about billing concepts for compute and storage and how to monitor usage for Cosmos DB in Microsoft Fabric.
ms.reviewer: mjbrown
ms.topic: concept-article
ms.date: 10/28/2025
show_latex: true
---

# Billing and utilization data for Cosmos DB in Microsoft Fabric

Cosmos DB in Microsoft Fabric compute and storage usage is encapsulated within your Fabric capacity. You can review and understand your utilization using similar tools to other Fabric workloads.

When you use a Fabric capacity, your usage charges appear in the Azure portal within your subscription's context. For more information, see [Microsoft Cost Management](/azure/cost-management-billing/cost-management-billing-overview). For more information on Fabric billing, see [understand your Azure bill on a Fabric capacity](../../enterprise/azure-billing.md).

## Capacity units

In Fabric you're entitled to a set of **capacity units** (CUs) that are shared across all Fabric workloads based on the capacity purchased. For more information on licenses supported, see [Microsoft Fabric concepts and licenses](../../enterprise/licenses.md).

Capacity is a dedicated set of resources that are available at a given time to be used. Capacity defines the ability of a resource to perform an activity or to produce output. Different resources consume CUs at different times.

## Request units

Cosmos DB normalizes the cost of all database operations using **request units** (RUs) and measures cost based on throughput referred to as **request units per second** (RU/s). For more information about throughput, see [request units](request-units.md).

If using Cosmos DB SDK's users provision and manage request units. Within Microsoft Fabric, consumed request units for Cosmos DB are converted into equivalent Fabric capacity units for usage and billing reporting.

## Autoscale

All containers for Cosmos DB in Fabric are provisioned for autoscale. With autoscale in Cosmos DB, users provision the maximum throughput for a container. When a container is unused it scales down to 10% of the maximum throughput. For a container with autoscale throughput of `1000` RU/s, the container will scale between `100` and `1000` RU/s. Consumption is scaled in increments of `100` RU/s or the equivalent to `0.067` CU/hr, see [Conversion](#conversion) below.

New Cosmos DB containers in the Fabric portal are created with a default autoscale maximum of `5000` RU/s. This can be scaled from `1000` to `50000` RU/s using the Cosmos DB SDK. New containers created using the SDK can be created with the same limits. For examples on how to create new containers or modify existing container throughput see, [Management Operations for Cosmos DB in Fabric](https://github.com/AzureCosmosDB/cosmos-fabric-samples/tree/main/management)

Users requiring additional throughput can make a quota request via support. For more information, see [throughput limitations](limitations.md#quotas-and-limits).

> [!Note]
> Cosmos DB bills the highest autoscale throughput consumed per hour. Because of this, Cosmos is configured as a background service within Fabric. This is unlike other services and is done to ensure smooth Fabric capacity utilization such that no single hour of usage can trigger throttling on the Fabric capacity.

## Conversion

The formula for the conversion between Cosmos DB request units per second and Microsoft Fabric capacity units per hour.

 $100 RU/s = 0.067 CUs/hr$ or $1 RU/s = 0.00067 CUs/hr$. Put another way, `1` CU/h is equivalent to approximately `1,500` RU/s.

This ratio aligns the cost structure and maintaining price parity between Microsoft Azure and Microsoft Fabric. Users pay the same for Cosmos DB whether using RU/s in Azure or CUs/hr in Fabric.

## Fabric capacity SKU examples

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

## Reporting

The Microsoft Fabric Capacity Metrics app offers a centralized view of capacity consumption across all Fabric workloads. It enables administrators to track usage trends, monitor workload performance, and ensure consumption aligns with the purchased capacity.

To get started, a capacity admin must install the app. After installation, access can be granted to others in the organization for broader visibility. For more information, see [Microsoft Fabric Capacity Metrics app?](../../enterprise/metrics-app.md) 

The app has the ability to filter usage to Cosmos DB databases in Fabric. Once a filter is applied, the visualizations in the app now selectively include activity relative to Cosmos DB.

## Related content

* [Monitor Cosmos DB in Microsoft Fabric](how-to-monitor.md)

