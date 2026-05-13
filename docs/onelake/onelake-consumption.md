---
title: OneLake consumption
description: Information on how OneLake consumes Fabric capacity units including how consumption is calculated, billed, and reported.
ms.reviewer: eloldag # Product team ms alias(es)
# author: Do not use - assigned by folder in docfx file
# ms.author: Do not use - assigned by folder in docfx file
ms.topic: how-to
ms.date: 02/11/2026
#customer intent: As a capacity admin, I want to understand how OneLake usage is billed and reported, including consumption of storage and transactions, so that I can effectively manage and optimize my costs and resources.
---

# OneLake compute and storage consumption

OneLake usage is defined by data stored and the number of transactions. For OneLake security, capacity usage is based on the number of rows in the table being secured. This page contains information on how all of OneLake usage is billed and reported.

## Storage

OneLake storage is billed at a pay-as-you-go rate per GB of data used and doesn't consume Fabric Capacity Units (CUs). Fabric items like lakehouses and warehouses consume OneLake storage. For Mirroring storage, data up to a certain limit is free based on the purchased compute capacity SKU you provision. For more information about pricing, see [Fabric pricing](https://azure.microsoft.com/pricing/details/microsoft-fabric/). For native mirrored storage, OneLake storage isn't billed as it's included in the cost of items like [Power BI import semantic models](/power-bi/enterprise/onelake-integration-overview) and [Fabric SQL database](/fabric/database/sql/mirroring-overview). 

You can visualize your OneLake storage usage in the Fabric Capacity Metrics app in the Storage tab. Also note that [soft-deleted data](/fabric/onelake/onelake-disaster-recovery#soft-delete-for-onelake-files) is billed at the same rate as active data. For more information about monitoring usage, see the [Metrics app Storage page](../enterprise/metrics-app-storage-page.md). To understand OneLake consumption more, see the [OneLake Capacity Consumption page](../onelake/onelake-capacity-consumption.md).

## Transactions

Requests to OneLake, such as reading or writing data, consume Fabric Capacity Units. The rates in this page define how much capacity units are consumed for a given type of operation. 


### Operation types
OneLake uses the same [mappings](/azure/storage/blobs/map-rest-apis-transaction-categories) as Azure Data Lake Storage (ADLS) to classify the operation to the category.

The following table defines CU consumption for OneLake data operations. Prior to May 2026, these operations were reported separately as "via Proxy" and "via Redirect." Because the consumption rates are the same, they are now consolidated under a single operation name that includes the storage tier. For example, “OneLake Read via Proxy” becomes “OneLake Read (Hot).”

| **Operation in Metrics App** | **New operation name** | **Operation Unit of Measure** | **Hot Consumption rate** | **Cool Consumption Rate** | **Cold Consumption Rate** |
|---| -------- |---|---|---|---|
| **OneLake Read via Redirect** |OneLake Read | Every 4 MB, per 10,000* | 104 CU seconds | 260 CU seconds  | 2,600 CU seconds |
| **OneLake Write via Redirect** |OneLake Write| Every 4 MB, per 10,000* | 1626 CU seconds | 2,600 CU seconds | 5,200 CU seconds |
| **OneLake Other Operations via Redirect** |OneLake Other Operations| Per 10,000 | 104 CU seconds | 104 CU seconds | 104 CU seconds |
| **OneLake Iterative Read via Redirect** |OneLake Iterative Read| Per 10,000 | 1626 CU seconds | 1,626 CU seconds | 1,626 CU seconds |
| **OneLake Iterative Write via Redirect** |OneLake Iterative Write| Per 100 | 1300 CU seconds | 1,300 CU seconds | 1,300 CU seconds |

*For files > 4 MB in size, OneLake counts a transaction for every 4 MB block of data read or written. For files < 4 MB, a full transaction is counted. For example, if you do 10,000 read operations via Redirect and each file read is 16 MB in size, your capacity consumption is 40,000 transactions or 416 CU seconds.

## Shortcuts

When you access data via OneLake shortcuts, the transaction usage counts against the capacity tied to the workspace where the shortcut is created. The capacity where the data is ultimately stored (that the shortcut points to) is billed for the data stored. 

When you access data via a shortcut to a source external to OneLake, such as to ADLS, OneLake does not count the CU usage for that external request. The transactions would be charged directly to you by the external service such as ADLS.

## Paused Capacity

When a capacity is paused, the data stored continues to be billed using the pay-as-you-go rate per GB. All transactions to that capacity are rejected when it is paused, so no Fabric CUs are consumed due to OneLake transactions. To access your data or delete a Fabric item, the capacity needs to be resumed. You can delete the workspace while a capacity is paused.

The consumption of the data via shortcuts is always counted against the consumer’s capacity, so the capacity where the data is stored can be paused without disrupting downstream consumers in other capacities. See an example on the [OneLake Capacity Consumption page](../onelake/onelake-capacity-consumption.md#onelake-compute)

## Disaster recovery

OneLake usage when disaster recovery is enabled is also defined by the amount of data stored and the number of transactions.  

## Disaster recovery storage

When disaster recovery is enabled, the data in OneLake gets geo-replicated. Thus, the storage is billed as Business Continuity and Disaster Recovery (BCDR) Storage. For more information about pricing, see [Fabric pricing](https://azure.microsoft.com/pricing/details/microsoft-fabric/).

## Disaster recovery transactions

When disaster recovery is enabled for a given capacity, write operations consume higher capacity units.

### Disaster recovery operation types

The following table defines CU consumption when disaster recovery is enabled. Prior to May 2026, these operations were reported separately as "via Proxy" and "via Redirect." They are now consolidated under a single operation name that includes the storage tier. For example, “OneLake BCDR Read via Proxy” becomes “OneLake BCDR Read (Hot).”

| **Operation in Metrics App** | **New operation name** | **Operation Unit of Measure** | **Hot Consumption rate** | **Cool Consumption Rate** | **Cold Consumption Rate** |
|---| -------- |---|---|---|---|
| **OneLake BCDR Read via Redirect** |OneLake BCDR Read | Every 4 MB, per 10,000 | 104 CU seconds | 260 CU seconds  | 2,600 CU seconds |
| **OneLake BCDR Write via Redirect** |OneLake BCDR Write|Every 4 MB, per 10,000 | 3056 CU seconds | 5,200 CU seconds | 9,880 CU seconds |
| **OneLake BCDR Other Operations Via Redirect** |OneLake BCDR Other| Per 10,000 | 104 CU seconds | 104 CU seconds | 104 CU seconds |
| **OneLake BCDR Iterative Read via Redirect** |OneLake BCDR Iterative Read | Per 10,000 | 1626 CU seconds | 1,626 CU seconds | 1,626 CU seconds |
| **OneLake BCDR Iterative Write via Redirect** |OneLake BCDR Iterative Write |  Per 100 | 2730 CU seconds | 2730 CU seconds | 2730 CU seconds |

## OneLake storage tiers
The cool and cold tiers introduce a per-GB data retrieval fee, which will consume CUs based on the amount of data read. 

| **Operation** | **Description** | **Operation Unit of Measure** | **Hot consumption rate** | **Cool Consumption Rate** | **Cold Consumption Rate** |
|---|---|---|---|---|---|
| **OneLake Data Retrieval** | OneLake data retrieval | Per GB | N/A | 200 CU seconds | 600 CU seconds|

## OneLake security

OneLake security consumes capacity for row level security (RLS) transactions based on the number of rows in the table secured by RLS. When you access a table secured with RLS, the capacity consumption applies to the Fabric item used to execute the query according to the table below. 

| **Operation** | **Description** | **Operation Unit of Measure** | **Capacity Units** |
|---|---|---|---|
| **OneLake security RLS** | OneLake security RLS | Million rows in the table | 0.1 CU seconds |

## OneLake diagnostics
OneLake diagnostics consumes capacity when diagnostic events are captured and written to a destination Lakehouse according to the table below.

| **Operation** | **Description** | **Operation Unit of Measure** | **Capacity Units** |
|---|---|---|---|
| **OneLake Diagnostics Event Operation** | OneLake diagnostic write operations | Every 4 MB, per 10,000 | 1626 CU seconds |
| **OneLake BCDR Diagnostics Event Operation** | OneLake diagnostic write operations when BCDR is enabled | Every 4 MB, per 10,000 | 3056 CU seconds |
| **OneLake Diagnostics Data Transfer** | OneLake diagnostic data transfer | Per GB | 1.389 CU Hours |

## Changes to Microsoft Fabric workload consumption rate

Consumption rates are subject to change at any time. Microsoft will use reasonable efforts to provide notice via email or through in-product notification. Changes shall be effective on the date stated in Microsoft's Release Notes or Microsoft Fabric Blog. If any change to a Microsoft Fabric Workload Consumption Rate materially increases the Capacity Units (CU) required to use a particular workload, customers may use the cancellation options available for the chosen payment method.

## Related content

- [Disaster recovery guidance for OneLake](onelake-disaster-recovery.md)

