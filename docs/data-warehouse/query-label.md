---
title: "Query labels"
description: This tutorial explains how to query labels for diagnostics and query tuning in Fabric Data Warehouse.
ms.reviewer: periclesrocha
ms.date: 11/11/2025
ms.topic: how-to
---
# Use query labels in Fabric Data Warehouse

**Applies to:** [!INCLUDE [fabric-se-and-dw](includes/applies-to-version/fabric-se-and-dw.md)]

Query labels provide a mechanism for locating queries in [query insights](query-insights.md) views or source control.

> [!TIP]
> Good naming conventions are helpful. For example, starting the label with `PROJECT`, `PROCEDURE`, `STATEMENT`, or `COMMENT` helps identify queries among the many in your warehouse.

## LABEL syntax

```syntaxsql
SELECT ...
FROM ...
OPTION (LABEL = '<label text>');
```

## Examples

> [!NOTE]
> Completed queries can take up to 15 minutes to appear in query insights views depending on the concurrent workload being executed. 

### A. Track important query performance in Query Insights

Place a unique label in a high-cost query you want to track the performance of over time. 

```sql
SELECT FinanceKey, DateKey, OrganizationKey, DepartmentGroupKey, SUM(AMOUNT)
FROM dbo.FactFinance
WHERE OrganizationKey = 123
AND DepartmentGroupKey = 123
GROUP BY FinanceKey, DateKey, OrganizationKey, DepartmentGroupKey
OPTION (LABEL = 'SALES DASHBOARD');
```

You can then find the performance of that query in [Query insights](query-insights.md) views, for example:

```sql
SELECT * 
FROM 
    queryinsights.long_running_queries
WHERE 
    last_run_command LIKE '%SALES DASHBOARD%'
ORDER BY 
    median_total_elapsed_time_ms DESC;
```

```sql
SELECT *
FROM 
    queryinsights.exec_requests_history 
WHERE 
    label IN ('SALES DASHBOARD')
ORDER BY 
    submit_time DESC;
```

## B. Track query performance of multiple labels

You can review and compare multiple query labels, for example:

```sql
SELECT *
FROM 
    queryinsights.exec_requests_history 
WHERE 
    label IN ('Regular','Clustered')
ORDER BY 
    submit_time DESC;
```

## Related content

- [Query insights in Fabric Data Warehouse](query-insights.md)
