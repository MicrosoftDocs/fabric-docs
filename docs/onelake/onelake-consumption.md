---
title: OneLake consumption
description: Information on how OneLake usage affects your CU consumption.
ms.author: eloldag
author: eloldag
ms.topic: how-to
ms.custom:
  - build-2023
  - ignite-2023
  - ignite-2023-fabric
ms.date: 01/25/2024
---

# OneLake compute and storage consumption

OneLake usage is defined by data stored and the number of transactions. This page contains information on how all of OneLake usage is billed and reported.

## Storage

OneLake storage is billed at a pay-as-you-go rate per GB of data used. Static Storage does NOT consume Fabric Capacity Units (CUs). Fabric items like Lakehouse and Datawarehouse  consume OneLake Storage. Data stored in OneLake for Power BI import Semantic models are FREE. Power BI data not in OneLake continues to be FREE as stated in the [premium per user page](/power-bi/enterprise/service-premium-per-user-faq#considerations-and-limitations). For Mirrored data, data up to the included capacity is FREE, and beyond that is charged. For more information about pricing, see the [Fabric pricing](https://azure.microsoft.com/pricing/details/microsoft-fabric/).

You may visualize your OneLake storage usage in the Fabric Capacity Metrics app in the Storage tab. For more information about monitoring usage, see the [Metrics app Storage page](../enterprise/metrics-app-storage-page.md). To understand OneLake consumption more, see the [OneLake Capacity Consumption page](../onelake/onelake-capacity-consumption.md)

## Transactions

Requests to OneLake, such as reading or writing data, consume Fabric Capacity Units. The rates in this page define how much capacity units are consumed for a given type of operation. OneLake uses the same mappings as ADLS to classify the operation to the category as [here](/azure/storage/blobs/map-rest-apis-transaction-categories).

### Operation types

This table defines CU consumption when OneLake data is accessed using applications that redirect certain requests. Redirection is an implementation that reduces consumption of OneLake compute.

| **Operation in Metrics App** | **Description** | **Operation Unit of Measure** | **Consumption rate** |
|---|---|---|---|
| **OneLake Read via Redirect** | OneLake Read via Redirect | Every 4 MB, per 10,000 | 104 CU seconds |
| **OneLake Write via Redirect** | OneLake Write via Redirect | Every 4 MB, per 10,000 | 1626 CU seconds |
| **OneLake Iterative Read via Redirect** | OneLake Iterative Read via Redirect | Per 10,000 | 1626 CU seconds |
| **OneLake Iterative Write via Redirect** | OneLake Iterative Write via Redirect | Per 100 | 1300 CU seconds |
| **OneLake Other Operations via Redirect** | OneLake Other Operations via Redirect | Per 10,000 | 104 CU seconds |

This table defines CU consumption when OneLake data is accessed using applications that proxy requests.

| **Operation in Metrics App** | **Description** | **Operation Unit of Measure** | **Consumption rate** |
|---|---|---|---|
| **OneLake Read via Proxy** | OneLake Read via Proxy | Every 4 MB, per 10,000 | 306 CU seconds |
| **OneLake Write via Proxy** | OneLake Write via Proxy | Every 4 MB, per 10,000 | 2650 CU seconds |
| **OneLake Iterative Read via Proxy** | OneLake Iterative Read via Proxy | Per 10,000 | 4798 CU seconds |
| **OneLake Iterative Write via Proxy** | OneLake Iterative Write via Proxy | Per 100 | 2117.95 CU seconds |
| **OneLake Other Operations** | OneLake Other Operations | Per 10,000 | 306 CU seconds |

## Shortcuts
When accessing data using OneLake shortcuts, the transaction usage counts against the capacity tied to the workspace where the shortcut is created. The capacity where the data is ultimately stored (that the shortcut points to) will be billed for the data stored.

## Paused Capacity
When a capacity is paused, the data stored will continue to be billed using the pay-as-you-go rate per GB. All transactions are rejected when a capacity is paused, so no Fabric CUs are consumed due to OneLake transactions. To access your data or delete a Fabric item, the capacity needs to be resumed. You can delete the workspace while a capacity is paused.

## Disaster recovery

OneLake usage when disaster recovery is enabled is also defined by the amount of data stored and the number of transactions.  

## Disaster recovery storage

When disaster recovery is enabled, the data in OneLake gets geo-replicated. Thus, the storage is billed as Business Continuity and Disaster Recovery (BCDR) Storage. For more information about pricing, see [Fabric pricing](https://azure.microsoft.com/pricing/details/microsoft-fabric/).

## Disaster recovery transactions

When disaster recovery is enabled for a given capacity, write operations consume higher capacity units.

### Disaster recovery operation types

This table defines CU consumption when disaster recovery is enabled and OneLake data is accessed using applications that redirect certain requests.  Redirection is an implementation that reduces consumption of OneLake compute.

| **Operation** | **Description** | **Operation Unit of Measure** | **Capacity Units** |
|---|---|---|---|
| **OneLake BCDR Read via Redirect** | OneLake BCDR Read via Redirect | Every 4MB, per 10,000 | 104 CU seconds |
| **OneLake BCDR Write via Redirect** | OneLake BCDR Write via Redirect | Every 4MB, per 10,000 | 3056 CU seconds |
| **OneLake BCDR Iterative Read via Redirect** | OneLake BCDR Iterative Read via Redirect | Per 10,000 | 1626 CU seconds |
| **OneLake BCDR Iterative Write via Redirect** | OneLake BCDR Iterative Write via Redirect | Per 100 | 2730 CU seconds |
| **OneLake BCDR Other Operations Via Redirect** | OneLake BCDR Other Operations Via Redirect | Per 10,000 | 104 CU seconds |

This table defines CU consumption when disaster recovery is enabled and OneLake data is accessed using applications that proxy requests.

| **Operation** | **Description** | **Operation Unit of Measure** | **Capacity Units** |
|---|---|---|---|
| **OneLake BCDR Read via Proxy** | OneLake BCDR Read via Proxy | Every 4MB, per 10,000 | 306 CU seconds |
| **OneLake BCDR Write via Proxy** | OneLake BCDR Write via Proxy | Every 4MB, per 10,000 | 3870 CU seconds |
| **OneLake BCDR Iterative Read via Proxy** | OneLake BCDR Iterative Read via Proxy | Per 10,000 | 4798 CU seconds |
| **OneLake BCDR Iterative Write via Proxy** | OneLake BCDR Iterative Write via Proxy | Per 100 | 3415.5 CU seconds |
| **OneLake BCDR Other Operations** | OneLake BCDR Other Operations | Per 10,000 | 306 CU seconds |

## Changes to Microsoft Fabric workload consumption rate

Consumption rates are subject to change at any time. Microsoft will use reasonable efforts to provide notice via email or through in-product notification. Changes shall be effective on the date stated in Microsoft's Release Notes or Microsoft Fabric Blog. If any change to a Microsoft Fabric Workload Consumption Rate materially increases the Capacity Units (CU) required to use a particular workload, customers may use the cancellation options available for the chosen payment method.

## Related content

- [Disaster recovery guidance for OneLake](onelake-disaster-recovery.md)
