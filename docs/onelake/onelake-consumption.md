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

OneLake storage is billed at a pay-as-you-go rate per GB of data used. Static Storage does NOT consume Fabric Capacity Units (CUs). Fabric items like Lakehouse and Datawarehouse  consume OneLake Storage. Data stored in OneLake for Power BI import Semantic models are FREE. Power BI data not in OneLake continues to be FREE. For Mirrored data, data up to the included capacity is FREE, and beyond that is charged. For more information about pricing, see the [Fabric pricing](https://azure.microsoft.com/pricing/details/microsoft-fabric/).

You may visualize your OneLake storage usage in the Fabric Capacity Metrics app in the Storage tab. Here, you have two columns called billable storage and current Storage. Billable storage shows the cumulative data over the month. Because the total charge for data stored isn't taken on one day in the month, but on a pro-rated basis throughout the month. You can estimate the monthly price as the billable storage (GB) multiplied by the price per Gb per month. So, if you stored 1 TB of data on day 1 and then deleted it before day 2, you would see on day one the 1 TB/30days = 33 GB. No additional storage is reported and you'll thus see just 33 GB for the month. However, if you stored 1 TB on day 1 and then didn't delete the data, then everyday would add 33 GB until the last day when you'll see 1 TB.

:::image type="content" source="media\onelake-consumption\storage.png" alt-text="Diagram showing how OneLake storage is viewed in Fabric Metrics app." lightbox="media\onelake-consumption\storage.png":::

You can track storage usage in the Fabric Capacity Metrics app. For more information about monitoring usage, see the [Metrics app Storage page](../enterprise/metrics-app-storage-page.md).

## Transactions

Requests to OneLake, such as reading or writing data, consume Fabric Capacity Units. The rates in this page define how much capacity units are consumed for a given type of operation. OneLake data can be accessed from applications running inside of Fabric environments, such as Fabric Spark. OneLake can also be accessed from applications running outside of Fabric environments such as via APIs. How the data in OneLake is accessed has a bearing on how many CUs are consumed.
OneLake uses the same mappings as ADLS to classify the operation to the category as [here](/azure/storage/blobs/map-rest-apis-transaction-categories).

### Operation types

This table defines CU consumption when OneLake data is accessed using most applications running inside of Fabric environments such as Fabric Spark and Fabric pipelines.

| **Operation in Metrics App** | **Description** | **Operation Unit of Measure** | **Consumption rate** |
|---|---|---|---|
| **OneLake Read via Redirect** | OneLake Read via Redirect | Every 4 MB, per 10,000 | 104 CU seconds |
| **OneLake Write via Redirect** | OneLake Write via Redirect | Every 4 MB, per 10,000 | 1626 CU seconds |
| **OneLake Iterative Read via Redirect** | OneLake Iterative Read via Redirect | Per 10,000 | 1626 CU seconds |
| **OneLake Iterative Write via Redirect** | OneLake Iterative Write via Redirect | Per 100 | 1300 CU seconds |
| **OneLake Other Operations via Redirect** | OneLake Other Operations via Redirect | Per 10,000 | 104 CU seconds |

This table defines CU consumption when OneLake data is accessed using applications running outside of Fabric environments. For example, custom applications using Azure Data Lake Storage (ADLS) APIs or OneLake file explorer.

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

When Disaster Recovery option is enabled for a given capacity, write operations consume higher capacity units.

### Disaster recovery operation types

This table defines CU consumption when OneLake data is accessed using most applications running inside of Fabric environments when disaster recovery is enabled. For example, Fabric Spark and Fabric pipelines.

| **Operation** | **Description** | **Operation Unit of Measure** | **Capacity Units** |
|---|---|---|---|
| **OneLake BCDR Read via Redirect** | OneLake BCDR Read via Redirect | Every 4MB, per 10,000 | 104 CU seconds |
| **OneLake BCDR Write via Redirect** | OneLake BCDR Write via Redirect | Every 4MB, per 10,000 | 3056 CU seconds |
| **OneLake BCDR Iterative Read via Redirect** | OneLake BCDR Iterative Read via Redirect | Per 10,000 | 1626 CU seconds |
| **OneLake BCDR Iterative Write via Redirect** | OneLake BCDR Iterative Write via Redirect | Per 100 | 2730 CU seconds |
| **OneLake BCDR Other Operations Via Redirect** | OneLake BCDR Other Operations Via Redirect | Per 10,000 | 104 CU seconds |

This table defines CU consumption when OneLake data is accessed using applications running outside of Fabric environments when disaster recovery is enabled. For example, custom applications using Azure Data Lake Storage (ADLS) APIs or OneLake file explorer.

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
