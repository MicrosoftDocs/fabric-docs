---
title: Billing and Utilization Reporting for Cosmos DB Database (Preview)
titleSuffix: Microsoft Fabric
description: Learn about customer billing for compute and storage, and how to monitor usage using the Fabric Capacity Metrics App.
author: jilmal
ms.author: jmaldonado
ms.topic: concept-article
ms.date: 07/10/2025
ai-usage: ai-generated
---

# Billing and utilization reporting for Cosmos DB in Microsoft Fabric (preview)

The article explains compute usage reporting of the Cosmos DB database in Microsoft Fabric. 

When you use a Fabric capacity, your usage charges appear in the Azure portal under your subscription in [Microsoft Cost Management](/azure/cost-management-billing/cost-management-billing-overview). To understand your Fabric billing, see [Understand your Azure bill on a Fabric capacity](../../enterprise/azure-billing.md).

After September 1, 2025, compute and data storage for Cosmos DB are charged to your Fabric capacity.

## Capacity

In Fabric, based on the Capacity SKU purchased, you're entitled to a set of Capacity Units (CUs) that are shared across all Fabric workloads. For more information on licenses supported, see [Microsoft Fabric concepts and licenses](../../enterprise/licenses.md).

Capacity is a dedicated set of resources that are available at a given time to be used. Capacity defines the ability of a resource to perform an activity or to produce output. Different resources consume CUs at different times.

## Compute for Cosmos DB

Cosmos DB normalizes the cost of all database operations using Request Units (or RUs, for short) and measures cost based on throughput (Request Units per second, RU/s). To learn more about Request Units, please visit our documentation [What are Request Units?](overview.md)

## Capacity for Cosmos DB in Microsoft Fabric

In the capacity-based SaaS model, Cosmos DB aims to make the most of the purchased capacity and provide visibility into usage.

In simple terms, **100 RU/second corresponds to 0.067 CUs/hour**. For customers familiar with Azure Cosmos DB pricing, we’ve ensured a seamless experience in Fabric by aligning the cost structure. This means that 100 RU/s in Azure Cosmos DB translates directly to 0.067 CU/h in Fabric, maintaining price parity. Put another way, 1 CU/h is equivalent to approximately 1,500 RU/s, so 100 RU/s is 1/15th of a CU/h.

## Fabric Capacity SKU Selection Based on Cosmos DB Request Units

Reference this for Fabric SKU sizing estimations for Cosmos DB in Fabric.

| SKU   | CU   | RU/s        |
|-------|------|-------------|
| F2    | 2    | 2,985.07    |
| F4    | 4    | 5,970.15    |
| F8    | 8    | 11,940.30   |
| F16   | 16   | 23,880.60   |
| F32   | 32   | 47,761.19   |
| F64   | 64   | 95,522.39   |
| F128  | 128  | 191,044.78  |
| F256  | 256  | 382,089.55  |
| F512  | 512  | 764,179.10  |
| F1024 | 1024 | 1,528,358.21|
| F2048 | 2048 | 3,056,716.42|

For example, a Fabric capacity SKU F64 has 64 capacity units, which is equivalent to approximately 95,500 RU/s.  

To learn more about Fabric capacity planning, see [Microsoft Fabric plan your capacity size](../../enterprise/plan-capacity.md). 

## Autoscale Throughput

Currently, we offer autoscale throughput with a default autoscale maximum of 1,000 RU/s which means throughput will scale between 100 – 1000 RU/s. Consumption will be scaled in increments of 100 RU/s equivalent to 1/15th of a CU/h.

When configuring containers and databases with autoscale, you specify the maximum throughput `Tmax` required. Azure Cosmos DB scales the throughput `T` such `0.1*Tmax <= T <= Tmax`. Autoscale maximum can be configured per container as needed.

## Compute and Storage Costs

The cost for Cosmos DB in Fabric is the summation of compute cost and storage cost. Compute cost is based on RU/s utilized, and storage cost is the total storage required by the data and indexes. The cost for storage for Cosmos DB in Fabric is $0.25 GB/month.

## Usage Reporting

The [Microsoft Fabric Capacity Metrics app](../../enterprise/metrics-app.md) offers a centralized view of capacity consumption across all Fabric workloads. It enables administrators to track usage trends, monitor workload performance, and ensure consumption aligns with the purchased capacity. 

To get started, a capacity admin must install the app. After installation, access can be granted to others in the organization for broader visibility. For more details, refer to [What is the Microsoft Fabric Capacity Metrics app?](../../enterprise/metrics-app.md) 

Once you have installed the app, select **CosmosDB** from the Select item kind dropdown. The **Multi metric ribbon chart** and the **Items (14 days)** data table now only show **Cosmos DB** activity.

## Related content

* [Monitor Cosmos DB in Microsoft Fabric](how-to-monitor.md)
