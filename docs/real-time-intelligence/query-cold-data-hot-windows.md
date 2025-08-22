---
title: Use hot windows for infrequent queries over cold data in Azure Data Explorer
description: In this article, you learn how to efficiently query cold data in Azure Data Explorer.
ms.reviewer: vplauzon
ms.topic: how-to
ms.date: 10/17/2021
---
# Query cold data with hot windows

Hot windows let you efficiently query cold data without the need to export data or use other tools. Use hot windows when the cold data size is large and the relevant data is from any time in the past. Hot windows are defined in the cache policy.

Eventhouse in Fabric Real-Time intelligence stores its data in reliable long-term storage and caches a portion of this data on the cluster nodes. The [cache policy](/kusto/management/cache-policy?view=microsoft-fabric&preserve-view=true) governs which data is cached. The cached data is considered *hot*, while the rest of the data is considered *cold*.  

To query cold data, Eventhouse processes a loading step that requires accessing a storage tier with much higher latency than the local disk. When the query is limited to a small time window, often called "point-in-time" queries, the amount of data to be retrieved is usually small, and the query completes quickly. For example,  forensic analyses querying telemetry on a given day in the past fall under this category. The impact on the query duration depends on the size of data that is pulled from storage, and can be significant. If you're scanning a **large amount of cold data**, query performance could benefit from using **hot windows**.

This article shows you how to use hot windows to query cold data.

## Prerequisites

* Access to a workspace in the Fabric capacity license mode (or) the Trial license mode with Contributor or higher permissions.
* Create [an eventhouse and a Kusto Query Language (KQL) database](/fabric/real-time-intelligence/create-eventhouse).
* Ingest data in your cluster with one of the methods described in the [Get data into an eventhouse](/fabric/real-time-intelligence/get-data-overview).

[!INCLUDE [set-hot-windows](~/../kusto-repo/data-explorer/includes/cross-repo/set-hot-windows.md)]

## Related content

* [Cache policy (hot and cold cache)](/kusto/management/cache-policy?view=azure-data-explorer&preserve-view=true)

