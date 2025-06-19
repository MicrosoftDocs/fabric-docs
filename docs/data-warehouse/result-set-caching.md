---
title: Result Set Caching
description: Learn more about result set caching, a performance optimization for the Fabric Data Warehouse and Lakehouse SQL analytics endpoint.
author: WilliamDAssafMSFT
ms.author: wiassaf
ms.reviewer: emtehran, fipopovi
ms.date: 06/12/2025
ms.topic: conceptual
ms.search.form: Optimization # This article's title should not change. If so, contact engineering.
---
# Result set caching (preview)

**Applies to:** [!INCLUDE [fabric-se-and-dw](includes/applies-to-version/fabric-se-and-dw.md)]

Result set caching (preview) is a built-in performance optimization for Fabric Data Warehouse and Lakehouse SQL analytics endpoints that improves read latency. 

Result set caching works by persisting the final result sets for applicable `SELECT` T-SQL queries, so that subsequent runs that "hit" cache will process just the final result set. This can bypass complex compilation and data processing of the original query and return subsequent queries faster.

Data warehousing scenarios typically involve analytical queries that process large amounts of data to produce a relatively small result. For example, a `SELECT` query that contains multiple joins and performs reads and shuffles on millions of rows of data might result in an aggregation that is only a few rows long. For workloads like reports or dashboards that tend to trigger the same analytical queries repeatedly, the same heavy computation can be triggered multiple times, even though the final result remains the same. Result set caching improves performance in this and similar scenarios.

[!INCLUDE [feature-preview-note](../includes/feature-preview-note.md)]

## Automatic management of cache

Result set cache works transparently. Once it's enabled, the cache creation and reuse is applied opportunistically for queries. 

Result set caching applies to `SELECT` T-SQL queries on warehouse tables, shortcuts to OneLake sources, and shortcuts to non-Azure sources. The management of cache is handled automatically, regularly evicting cache as needed. 

In addition, as your data changes, result consistency is ensured by invalidating cache created earlier.

## Configure result set caching

Result set caching is configurable at the item level. 

Once enabled, it can then be disabled at the item level or for individual queries, if needed. 

During the preview, result set caching is off by default for all items.

### Item-level configuration

Use the [ALTER DATABASE SET](/sql/t-sql/statements/alter-database-transact-sql-set-options?view=fabric&preserve-view=true) T-SQL command to enable result set caching for a lakehouse or warehouse. Use the SQL analytics endpoint of a Lakehouse to connect and run T-SQL queries.

```sql
ALTER DATABASE <Fabric_item_name>
SET RESULT_SET_CACHING ON;
```

The setting value can be checked in [sys.databases](/sql/relational-databases/system-catalog-views/sys-databases-transact-sql?view=fabric&preserve-view=true), for example to see the value for the current context in Fabric Warehouse or Lakehouse SQL analytics endpoint:

```sql
SELECT name, is_result_set_caching_on 
FROM sys.databases
WHERE database_id = db_id();
```

To disable result set caching:

```sql
ALTER DATABASE <Fabric_item_name>
SET RESULT_SET_CACHING OFF;
```

### Query-level configuration

Once result set caching is enabled on an item, it can be disabled for an individual query. 

This can be useful for debugging or A/B testing a query. Disable result set caching for a query by attaching this hint at the end of the `SELECT`:

```sql
OPTION ( USE HINT ('DISABLE_RESULT_SET_CACHE') );
```

<a id="checking-result-set-cache-usage"></a>

## Check result set cache usage

Result set cache usage can be checked in two locations: Message Output and the [queryinsights.exec_requests_history](/sql/relational-databases/system-views/queryinsights-exec-requests-history-transact-sql?view=fabric&preserve-view=true) system view.

In the message output of a query (visible in the Fabric Query editor or [SQL Server Management Studio](https://aka.ms/ssms)), the statement "Result set cache was used" will be displayed after query execution if the query was able to use an existing result set cache.

:::image type="content" source="media/result-set-caching/result-set-cache-was-used.png" alt-text="Screenshot from the results of a query showing that result set caching was used." lightbox="media/result-set-caching/result-set-cache-was-used.png":::

In [queryinsights.exec_requests_history](/sql/relational-databases/system-views/queryinsights-exec-requests-history-transact-sql?view=fabric&preserve-view=true), the column `result_cache_hit` displays a value indicating result set cache usage for each query execution:

- `2`: the query used result set cache (_cache hit_)
- `1`: the query created result set cache
- `0`: the query wasn't applicable for result set cache creation or usage

For example:

```sql
SELECT result_cache_hit, command, *
FROM queryinsights.exec_requests_history
ORDER BY submit_time DESC;
```

:::image type="content" source="media/result-set-caching/queryinsights.png" alt-text="Screenshot from the Fabric query editor showing a query on the queryinsights.exec_requests_history view." lightbox="media/result-set-caching/queryinsights.png":::

There are various reasons the system can determine that a query isn't eligible for result set cache. Some of the reasons could include:
 
 - The cache no longer exists or was invalidated by a data change, disqualifying it for reuse.
 - Query isn't deterministic, and isn't eligible for cache creation.
 - Query isn't a `SELECT` statement.

## Related content

- [In-memory and disk caching](caching.md)
- [Performance guidelines in Fabric Data Warehouse](guidelines-warehouse-performance.md)
