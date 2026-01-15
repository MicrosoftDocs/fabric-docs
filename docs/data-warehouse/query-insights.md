---
title: Query Insights
description: Query Insights makes past query execution data and aggregated insights built on top of this data available to you via simple views.
author: WilliamDAssafMSFT
ms.author: wiassaf
ms.reviewer: mariyaali
ms.date: 11/18/2025
ms.topic: concept-article
ms.search.form: Monitoring # This article's title should not change. If so, contact engineering.
---

# Query Insights in Fabric Data Warehouse

**Applies to:** [!INCLUDE [fabric-se-and-dw](includes/applies-to-version/fabric-se-and-dw.md)]

In [!INCLUDE [product-name](../includes/product-name.md)], the query insights feature is a scalable, sustainable, and extendable solution to enhance the SQL analytics experience. With historical query data, aggregated insights, and access to actual query text, you can analyze and tune your query performance. QI provides information on queries run in a user's context only, system queries aren't considered.

The query insights feature provides a central location for historic query data and actionable insights for 30 days, helping you to make informed decisions to enhance the performance of your [!INCLUDE [fabric-dw](includes/fabric-dw.md)] or [!INCLUDE [fabric-se](includes/fabric-se.md)]. When a SQL query runs in [!INCLUDE [product-name](../includes/product-name.md)], the query insights feature collect and consolidates its execution data, providing you with valuable information. You can view complete query text for Admin, Member, and Contributor roles.

- **Historical Query Data:** Query Insights stores historical data about query executions, enabling you to track performance changes over time. System queries aren't stored in query insights.
- **Aggregated Insights:** Query Insights aggregates query execution data into insights that are more actionable, such as identifying long-running queries or most active users. These aggregations are based on the query shape. For more information, see [How are similar queries aggregated to generate insights?](#how-are-similar-queries-aggregated-to-generate-insights)
- **Warehouse Insights:** To understand the overall health of your warehouse, use the `sql_pool_insights` view. This view provides pool-level metrics and pressure indicators, helping you monitor resource allocation and diagnose performance issues across pools.

## Before you begin

You should have access to a [[!INCLUDE [fabric-se](includes/fabric-se.md)]](data-warehousing.md#sql-analytics-endpoint-of-the-lakehouse) or [[!INCLUDE [fabric-dw](includes/fabric-dw.md)]](data-warehousing.md#fabric-data-warehouse) within a [Premium capacity](/power-bi/enterprise/service-premium-what-is) workspace with contributor or higher permissions.

## When do you need query insights?

The query insights feature addresses several questions and concerns related to query performance and database optimization, including:

**Query performance analysis**

- What is the historical performance of our queries?
- Are there any long-running queries that need attention?
- Can we identify the queries causing performance bottlenecks?
- Was cache utilized for my queries?
- Which queries are consuming the most CPU?

**Query optimization and tuning**

- Which queries are frequently run, and can their performance be improved?
- Can we identify queries that failed or were canceled?
- Can we track changes in query performance over time?
- Are there any queries that consistently perform poorly?

**User activity monitoring**

- Who submitted a particular query?
- Who are the most active users or the users with the most long-running queries?

**SQL pool and resource monitoring**

- Was my SQL pool under pressure during query execution?
- How often has the pool experienced pressure in the last 24 hours?
- Have there been any recent changes to workspace capacity or pool configuration?
- Which pools are consuming the highest percentage of resources?
- Can I correlate pressure events with slow-running queries?
- How can I identify trends in pool pressure over time?

The following system views provide answers to these questions:

- [queryinsights.exec_requests_history](/sql/relational-databases/system-views/queryinsights-exec-requests-history-transact-sql?view=fabric&preserve-view=true)
  - Returns information about each completed SQL request/query.
 
- [queryinsights.exec_sessions_history](/sql/relational-databases/system-views/queryinsights-exec-sessions-history-transact-sql?view=fabric&preserve-view=true)
  - Returns information about completed sessions.

- [queryinsights.long_running_queries](/sql/relational-databases/system-views/queryinsights-long-running-queries-transact-sql?view=fabric&preserve-view=true)
  - Returns the information about queries by query execution time.

- [queryinsights.frequently_run_queries](/sql/relational-databases/system-views/queryinsights-frequently-run-queries-transact-sql?view=fabric&preserve-view=true)
  - Returns information about frequently run queries.
 
- [queryinsights.sql_pool_insights](/sql/relational-databases/system-views/queryinsights-sql-pool-insights-transact-sql?view=fabric&preserve-view=true)
  - Returns information about warehouse resource allocation, configuration changes, and pressure.

## Where can you see query insights?

Autogenerated views are under the `queryinsights` schema in [[!INCLUDE [fabric-se](includes/fabric-se.md)]](data-warehousing.md#sql-analytics-endpoint-of-the-lakehouse) and [[!INCLUDE [fabric-dw](includes/fabric-dw.md)]](data-warehousing.md#fabric-data-warehouse). In the Fabric Explorer of a Warehouse for example, find query insights views under **Schemas**, **queryinsights**, **Views**.

:::image type="content" source="media/query-insights/queryinsights-explorer-views-exec-requests-history.png" alt-text="Screenshot from the Fabric Explorer showing where to find query insights views under Schemas, queryinsights, Views.":::

After your query completes execution, you see its execution data in the `queryinsights` views of the [!INCLUDE [fabric-dw](includes/fabric-dw.md)] or [!INCLUDE [fabric-se](includes/fabric-se.md)] you were connected to. If you run a [cross-database query](tutorial-sql-cross-warehouse-query-editor.md) while in the context of `WH_2`, your query appears in the query insights of `WH_2`. Completed queries can take up to 15 minutes to appear in query insights depending on the concurrent workload being executed. The time taken for queries to appear in query insights increases with increase in concurrent queries being executed.

## How are similar queries aggregated to generate insights?

Queries are considered the same by the Query Insights if the queries have the same shape, even if the predicates might be different.

You can utilize the `query hash` column in the views to analyze similar queries and drill down to each execution.

For example, the following queries are considered the same after their predicates are parameterized:

```sql
SELECT * FROM Orders
WHERE OrderDate BETWEEN '1996-07-01' AND '1996-07-31';
```

and

```sql
SELECT * FROM Orders
WHERE OrderDate BETWEEN '2000-07-01' AND '2006-07-31';
```

## Examples

### Identify queries run by you in the last 30 minutes

The following query uses `queryinsights.exec_requests_history` and the built-in `USER_NAME()` function, which returns your current session user name.

```sql
SELECT * FROM queryinsights.exec_requests_history 
WHERE start_time >= DATEADD(MINUTE, -30, GETUTCDATE())
AND login_name = USER_NAME();
```

### Identify top CPU consuming queries by CPU time
The following query returns the top 100 queries by allocated CPU time.

```sql
SELECT TOP 100 distributed_statement_id, query_hash, allocated_cpu_time_ms, label, command
FROM queryinsights.exec_requests_history
ORDER BY allocated_cpu_time_ms DESC;
```

### Identify which queries are scanning most data from remote rather than cache

You can determine if the large data scanning during query execution is slowing down your query and make decisions to tweak your query code accordingly. This analysis allows you to compare different query executions and identify if the variance in the amount of data scanned is the reason for performance changes.

Furthermore, you can assess the use of cache by examining the sum of `data_scanned_memory_mb` and `data_scanned_disk_mb`, and comparing it to the `data_scanned_remote_storage_mb` for past executions.

> [!NOTE]
> The data scanned values might not account the data moved during the intermediate stages of query execution. In some cases, the size of the data moved and CPU required to process can be larger than the data scanned value indicates.
>
> Data scanned values appear as `0` for `COPY INTO` statements.

```sql
SELECT distributed_statement_id, query_hash, data_scanned_remote_storage_mb, data_scanned_memory_mb, data_scanned_disk_mb, label, command
FROM queryinsights.exec_requests_history
ORDER BY data_scanned_remote_storage_mb DESC;
```

### Identify the most frequently run queries using a substring in the query text

The following query returns the most recent queries that match a certain string, ordered by the number of successful executions descending.

``` sql
SELECT * FROM queryinsights.frequently_run_queries
WHERE last_run_command LIKE '%<some_label>%'
ORDER BY number_of_successful_runs DESC;
```

### Identify long-running queries using a substring in the query text

The following query returns the queries that match a certain string, ordered by the median query execution time descending.

```sql
SELECT * FROM queryinsights.long_running_queries
WHERE last_run_command LIKE '%<some_label>%'
ORDER BY median_total_elapsed_time_ms DESC;
```

## Query insights views

- [queryinsights.exec_requests_history](/sql/relational-databases/system-views/queryinsights-exec-requests-history-transact-sql?view=fabric&preserve-view=true)
- [queryinsights.exec_sessions_history](/sql/relational-databases/system-views/queryinsights-exec-sessions-history-transact-sql?view=fabric&preserve-view=true)
- [queryinsights.long_running_queries](/sql/relational-databases/system-views/queryinsights-long-running-queries-transact-sql?view=fabric&preserve-view=true)
- [queryinsights.frequently_run_queries](/sql/relational-databases/system-views/queryinsights-frequently-run-queries-transact-sql?view=fabric&preserve-view=true)
- [queryinsights.sql_pool_insights](/sql/relational-databases/system-views/queryinsights-sql-pool-insights-transact-sql?view=fabric&preserve-view=true)

## Related content

- [Monitoring connections, sessions, and requests using DMVs](monitor-using-dmv.md)
- [Use query labels in Fabric Data Warehouse](query-label.md)
- [Data clustering in Fabric Data Warehouse](data-clustering.md)