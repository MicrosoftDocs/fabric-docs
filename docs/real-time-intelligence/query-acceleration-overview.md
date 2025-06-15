---
title: Query acceleration for OneLake shortcuts - overview
description: Overview on learning how to use the query acceleration policy over OneLake shortcuts to improve query performance and reduce latency for external delta tables.
ms.reviewer: sharmaanshul
ms.author: spelluru
author: spelluru
ms.topic: conceptual
ms.custom:
ms.date: 11/19/2024
# Customer intent: Learn how to use the query acceleration policy to accelerate queries over shortcuts and external delta tables.
---
# Query acceleration for OneLake shortcuts - overview

OneLake shortcuts are references from an Eventhouse that point to internal Fabric or external sources. This kind of shortcut is later accessed for query in [KQL querysets](create-query-set.md) by using the [`external_table()` function](/kusto/query/external-table-function). Queries run over OneLake shortcuts can be less performant than on data that is ingested directly to Eventhouses due to various factors such as network calls to fetch data from storage, the absence of indexes, and more. 

Query acceleration allows specifying a policy on top of external delta tables that defines the number of days to cache data for high-performance queries. 

Query acceleration is supported in Eventhouse over delta tables from [OneLake shortcuts](onelake-shortcuts.md), Azure Data Lake Store Gen1, Amazon S3, Google Cloud Services, Azure blob storage external tables, and all destinations supported by OneLake shortcuts.

> [!NOTE]
> * If you have compliance considerations that require you to store data in a specific region, make sure your Eventhouse capacity is in the same region as your external table or shortcut data.
>
> * Accelerated external tables add to the storage COGS and to the SSD storage consumption your Eventhouse, similar to regular tables in your KQL database. You can control the amount of data to cache by defining the *Hot* property in the [query acceleration policy](https://go.microsoft.com/fwlink/?linkid=2296196). Indexing and ingestion activity also contributes to compute resources use.

## When should I use query acceleration for OneLake shortcuts?

Query acceleration caches data as it lands in OneLake, providing performance comparable to ingesting data in Eventhouse. By using this feature, you can accelerate data landing in OneLake, including existing data and any new updates, and expect similar performance. This eliminates the need to manage ingestion pipelines, maintain duplicate copies of data, while ensuring that data remains in sync without additional effort. 

The following scenarios are ideal for using query acceleration over OneLake shortcuts:

* **Query data in OneLake with high performance**: When you have existing workloads that are uploading data and managing it in storage (optionally in a different cloud or region), and you would like to query some or all of the data with high performance. 
* **Combine historical data with real-time streams**:  When you want to seamlessly combine data landing in OneLake directly with real-time streams coming into Eventhouse without compromising on query speeds.  
* **Leverage dimension data managed by other items**: Often high value and small volume data is hosted in SQL servers, Cosmos DB, Snowflake or other systems that can be mirrored into OneLake. Accelerated OneLake shortcuts can make this data easily consumable for joins and enrichment in the Eventhouse query. As dimension data is often significantly smaller than activity data, the additional cost associated with that usage is typically minimal.

## Behavior of accelerated external delta tables

The accelerated OneLake shortcuts behave like [external tables](/kusto/query/schema-entities/external-tables?view=microsoft-fabric&preserve-view=true), with the same limitations and capabilities.
Specifically, features like materialized view and update policies aren't supported.

## Monitor acceleration behavior

The initial process of query acceleration is dependent on the size of the external table. To monitor the progress and settings of an accelerated table, use the [.show external table operations query_acceleration statistics](https://go.microsoft.com/fwlink/?linkid=2295988) command in a [KQL queryset](kusto-query-set.md).

## Limitations

* The number of columns in the external table can't exceed 900.
* Query performance over accelerated external delta tables with more than 2.5 million data files may not be optimal.
* The feature assumes delta tables with static advanced features, for example column mapping doesn't change, partitions don't change, and so on. To change advanced features, first disable the policy, and once the change is made, re-enable the policy.
* Schema changes on the delta table must also be followed with the respective `.alter` external delta table schema, which might result in acceleration starting from scratch if there was breaking schema change.
* Index-based pruning isn't supported for partitions.
* Parquet files with a compressed size higher than 6 GB won't be cached.

## Billing

Accelerated data is charged under OneLake Premium cache meter, similar to native Eventhouse tables. You can control the amount of data that is accelerated by [configuring number of days to cache](query-acceleration.md#set-caching-period). Indexing activity may also count towards CU consumption. For more information, see [Storage billing](real-time-intelligence-consumption.md#storage-billing).

Charges related to query acceleration will appear in the Fabric [metrics app](../enterprise/metrics-app.md) under the Eventhouse where the accelerated shortcut is created.  

## Related content

* [Query acceleration over OneLake shortcuts](query-acceleration.md)
* [OneLake shortcuts](onelake-shortcuts.md)
* [Query acceleration policy](https://go.microsoft.com/fwlink/?linkid=2296196)
