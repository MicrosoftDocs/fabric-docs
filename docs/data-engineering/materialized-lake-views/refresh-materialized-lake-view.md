---
title: Refresh Materialized Lake Views in a Lakehouse
description: Learn how to refresh a materialized lake view in a lakehouse in Microsoft Fabric.
author: eric-urban
ms.author: eur
ms.reviewer: abhishjain
ms.topic: how-to
ms.date: 10/28/2025
# customer intent: As a data engineer, I want to refresh materialized lake views in a lakehouse so that I can ensure that the data is up to date and optimize query performance.
---

# Optimal refresh for materialized lake views in a lakehouse

This article describes the semantic aspects to consider when using optimal refresh for materialized lake views and outlines the available modes of refresh for materialized lake views.

**Refresh modes for materialized lake views**

  * **Optimal refresh**: This mode automatically chooses the best refresh strategy for maximum performance for your materialized lake views – incremental, full, or no refresh.
    
  * **Full refresh**: This mode enforces the full recompute for the materialized lake view.

## Optimal refresh  

Optimal refresh is engineered to improve data management efficiency, speed, and cost-effectiveness on the Microsoft Fabric platform. It automatically selects the most appropriate refresh strategy to maximize refresh performance. The following refresh policies are supported under optimal refresh:

|Refresh Policy | Description |
|---------------|-------------|
|Incremental refresh| An incremental refresh only processes the changed data in the sources referenced in the materialized lake views definition.|
|No refresh | If the source remains unchanged, i.e., if no change detected in delta commits, the service skips the refresh. This behavior saves unnecessary processing.|
|Full refresh |A full refresh involves assessing the entire dataset of dependent sources whenever any modification is made to the source.|

> [!Important]
> For incremental refresh to take effect, it is required to set delta CDF property to `delta.enableChangeDataFeed=true` for the sources referenced in the materialized lake views definition.

### Benefits of optimal refresh 

* Lower Cost: Less compute and storage are used, especially when data changes are minimal and No refresh bypasses the data refresh when no delta commit change is detected.

* Improved Efficiency: Faster refresh cycles help you deliver fresher insights and keep up with rapidly changing data. 

* Time Savings: Only changed data is processed, resulting in reduced refresh duration. 

### Supported expression in optimal refresh for incremental refresh strategy 

When a materialized lake view is created using supported expressions, Fabric can perform incremental refreshes. If unsupported expressions are used in queries, either a full refresh or no refresh is performed depending on the change.

The following table outlines the supported expressions:

|SQL Construct |  Remark|
|--------------| -------|
|SELECT expression | Support expressions having deterministic functions (inbuilt). Non-deterministic and window functions lead to full refresh strategy.|
|FROM||
|WHERE| Only deterministic inbuilt functions are supported.|
|INNER JOIN || 
|UNION ALL|| 
|Data quality constraints| Only deterministic inbuilt functions are supported in constraints.|

> [!Note]
> For the better incremental refresh experience, use supported clauses as much as possible. If a query uses unsupported patterns, the refresh automatically fall back to a full refresh strategy.

### Key points for optimal refresh

* To optimize outcome, use supported expressions in your queries so that incremental refresh strategy can be applied.
* Incremental refresh is supported for append-only data. If the data includes deletions or updates, Fabric will perform a full refresh.
* If you define data quality constraints in materialized lake view definition, incremental refresh respect and enforce those constraints during updates.
* No additional charges apply specifically for using optimal refresh. You are billed based on compute usage during refresh operations.
* In cases such as small source datasets, Fabric might choose full over incremental refresh given the performance yield.

### How to enable optimal refresh mode 

By default, optimal refresh mode is enabled for the lineage. If not, follow the steps below:

1. Navigate to the manage materialized lake view option and enable the toggle `Optimal refresh`.
   
   :::image type="content" source="./media/refresh-materialized-lake-view/enable-optimal-refresh-option.png" alt-text="Screenshot that shows toggle to enable optimal refresh mode." border="true" lightbox="./media/refresh-materialized-lake-view/enable-optimal-refresh-option.png":::

## Full refresh 

A full refresh performs the full recompute of materialized lake view based on the source data.

If it's necessary to reprocess the entire data in materialized lake views, you can disable the optimal refresh toggle to switch to full refresh mode.

:::image type="content" source="./media/refresh-materialized-lake-view/full-refresh-option.png" alt-text="Screenshot that shows toggle to switch to full refresh mode." border="true" lightbox="./media/refresh-materialized-lake-view/full-refresh-option.png":::

Or

To perform a full refresh of a materialized lake view, you can use the following command:

```sql
REFRESH MATERIALIZED LAKE VIEW [workspace.lakehouse.schema].MLV_Identifier FULL
```
  
> [!NOTE]
> Refreshing a materialized lake view that uses non-delta tables as its source initiates a full refresh.

### Determine the refresh policy 

To determine the refresh policy under optimal refresh mode, you can query the sys_dq_metrics table:

```sql
SELECT 
    MLVName,
    refreshPolicy 
FROM  
    dbo.sys_dq_metrics 
WHERE
    MLVName = '<materialized_lake_view_name>' 
```

## Related articles

* [Implement a medallion architecture with materialized lake views](./tutorial.md)
* [Data quality in materialized lake views](./data-quality.md)
