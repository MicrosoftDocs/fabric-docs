---
title: Result Set Caching
description: Learn more about result set caching, a performance optimization for the Fabric Data Warehouse and Lakehouse SQL analytics endpoint.
author: WilliamDAssafMSFT
ms.author: wiassaf
ms.reviewer: emtehran, fipopovi
ms.date: 09/15/2025
ms.topic: concept-article
ms.search.form: Optimization # This article's title should not change. If so, contact engineering.
---
# Result set caching (preview)

**Applies to:** [!INCLUDE [fabric-se-and-dw](includes/applies-to-version/fabric-se-and-dw.md)]

Result set caching (preview) is a built-in performance optimization for Fabric Data Warehouse and Lakehouse SQL analytics endpoints that improves read latency. 

Result set caching works by persisting the final result sets for applicable `SELECT` T-SQL queries, so that subsequent runs that "hit" cache will process just the final result set. This can bypass complex compilation and data processing of the original query and return subsequent queries faster.

Data warehousing scenarios typically involve analytical queries that process large amounts of data to produce a relatively small result. For example, a `SELECT` query that contains multiple joins and performs reads and shuffles on millions of rows of data might result in an aggregation that is only a few rows long. For workloads like reports or dashboards that tend to trigger the same analytical queries repeatedly, the same heavy computation can be triggered multiple times, even though the final result remains the same. Result set caching improves performance in this and similar scenarios for roughly the same cost.

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

- `2`: the query used the result set cache (_cache hit_)
- `1`: the query created the result set cache
- `0`: the query wasn't applicable for the result set cache creation or usage

For example:

```sql
SELECT result_cache_hit, command, *
FROM queryinsights.exec_requests_history
ORDER BY submit_time DESC;
```

:::image type="content" source="media/result-set-caching/queryinsights.png" alt-text="Screenshot from the Fabric query editor showing a query on the queryinsights.exec_requests_history view." lightbox="media/result-set-caching/queryinsights.png":::

## Qualify for result set caching

When a `SELECT` query is issued, it's assessed for result set caching. Various requirements must be met to be eligible for creating and using result set cache. Some of these help keep cache storage under internal limits, some help reserve caching for complex queries, and others help maintain result-correctness upon repetitive "hits". An obvious example is restricting `SELECT` queries with `GETDATE()` from having their result cached, but there are other nuanced cases as well where Fabric decides not to cache results. 

The following list contains common disqualifications for result set caching in Fabric Data Warehouse. If you find a query wasn't applicable for creating result set cache, it could be due to one or more of these reasons:

- Result set caching isn't enabled on the currently connected item, or it's enabled on the item but the query included the `DISABLE_RESULT_SET_CACHE` hint
- Query isn't a pure `SELECT`, for example, `CREATE TABLE AS SELECT` (CTAS), `SELECT-INTO`, other Data Modification Language
- Query references a system object, a temporary table, a metadata function, or doesn't reference any distributed objects
- Query doesn't reference at least one table of at least 100,000 rows
- Query references an object outside the currently connected Fabric item (for example, cross-database query)
- Query is within an explicit transaction or a `WHILE` loop
- Query output contains an unsupported data type and/or the `VARCHAR(MAX)` data type and/or the `VARBINARY(MAX)` data type. For supported data types, see [Data types in Fabric Data Warehouse](data-types.md)
- Query contains a `CAST` or `CONVERT` that has some reference to **date** or **sql_variant** data type
- Query contains runtime constants (such as `CURRENT_USER` or `GETDATE()`)
- Query result is estimated to be > 10,000 rows
- Query contains non-deterministic built-in functions, window aggregate functions, or ordered functions like `PARTITION BY … ORDER BY`. See [Deterministic and Nondeterministic Functions](/sql/relational-databases/user-defined-functions/deterministic-and-nondeterministic-functions?view=fabric&preserve-view=true).
- Query uses dynamic data masking, row level security, or other [security features](security.md)
- Query uses [time travel](time-travel.md)
- Query applies ORDER BY on a column or expression that is not included in the query's output
- Query is in a session that has session-level `SET` statements with non-default values (for example, setting `QUOTED_IDENTIFIER` to `OFF`)
- The system reached internal limits for cache. Background cache eviction processes will free up space before new cache is created.

These rules also apply to reusing cache on subsequent runs of the same query. In addition, a cache might not be used in the following scenarios:

- Any change to the referenced tables since the cache was created
- The workspace has gone offline since the creation of a cache, similar to [in-memory and disk caching](caching.md)
- The user doesn't have sufficient permissions to the objects in the query
- The query is being called from a different lakehouse or warehouse connection than where the original query was issued. (Cross-database queries aren't eligible for result set caching.)
- The query uses different output columns, column ordering, or aliases than the original query
- The cached query hasn't been used in 24 hours

> [!NOTE]
> As these qualifications are internally assessed for the best application of result set caching, it's important to keep in mind that they could be updated in the future.

## Related content

- [In-memory and disk caching](caching.md)
- [Performance guidelines in Fabric Data Warehouse](guidelines-warehouse-performance.md)
