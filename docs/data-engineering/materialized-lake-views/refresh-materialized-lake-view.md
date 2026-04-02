---
title: Refresh Materialized Lake Views in a Lakehouse
description: Learn how to refresh a materialized lake view in a lakehouse in Microsoft Fabric.
ms.reviewer: abhishjain
ms.topic: how-to
ms.date: 03/18/2026
# customer intent: As a data engineer, I want to refresh materialized lake views in a lakehouse so that I can ensure that the data is up to date and optimize query performance.
---

# Optimal refresh for materialized lake views in a lakehouse

Each time a scheduled refresh runs for your materialized lake views, Fabric determines the best strategy to use—no refresh, incremental, or full—based on what changed in the source data. This behavior is called *optimal refresh*, and it helps you keep your materialized lake views up to date while minimizing compute costs and refresh time.

This article explains how optimal refresh works, what each strategy does, and how to switch to full refresh mode when needed.

> [!NOTE]
> Optimal refresh isn't supported in the following scenarios:
> - **PySpark definitions**: Optimal refresh applies only to MLVs defined with Spark SQL. PySpark-defined MLVs always use full refresh.
> - **Non-Delta source tables**: Materialized lake views that use non-Delta tables as a source always perform a full refresh. Incremental and no-refresh strategies require Delta table sources.

## Benefits of optimal refresh

By analyzing delta commits on source tables, optimal refresh can make smart decisions about how to process your data. Where possible, this can result in:

- **Lower cost**: Less compute and storage are used when Fabric detects that source data didn't change and skips the refresh entirely. No extra fees apply for optimal refresh—you're billed based on compute usage during refresh operations.
- **Improved efficiency**: Faster refresh cycles when only changed data needs to be processed, helping you deliver fresher insights.
- **Time savings**: Reduced refresh duration when incremental processing is applied instead of recomputing the full dataset.

## Optimal refresh strategies

The following table describes the refresh strategies that optimal refresh can select:

|Refresh Policy | Description |
|---------------|-------------|
|No refresh | If no new delta commits are detected on the source tables, Fabric skips the refresh entirely, avoiding unnecessary compute.|
|Incremental refresh| Processes only the changed data when new delta commits are detected on the source tables.|
|Full refresh | Recomputes the entire materialized lake view from the full source dataset. This strategy is used when unsupported expressions are detected, when changes can't be processed incrementally, or when the source dataset is small enough that a full recompute is faster than incremental processing.|

> [!IMPORTANT]
> Incremental refresh requires the delta change data feed (CDF) property (`delta.enableChangeDataFeed=true`) on all source tables referenced in the materialized lake view definition. Without CDF enabled, optimal refresh can only choose between no refresh and full refresh. For more information, see [Enable incremental refresh](#enable-incremental-refresh).

## Set up optimal refresh

The optimal refresh toggle gives you no-refresh and full-refresh strategies without any extra setup. To unlock incremental refresh strategy, you also need to enable change data feed on your source tables.

### Turn on optimal refresh mode

By default, optimal refresh mode is enabled for a materialized lake view lineage. If it's not enabled, follow these steps to turn it on:

1. Go to your lakehouse and select **Materialized lake views**.
1. Select **Manage**, and then select the **Optimal refresh** toggle to turn it on.
   
   :::image type="content" source="./media/refresh-materialized-lake-view/enable-optimal-refresh-option.png" alt-text="Screenshot that shows toggle to enable optimal refresh mode." border="true" lightbox="./media/refresh-materialized-lake-view/enable-optimal-refresh-option.png":::

### Enable incremental refresh

To use incremental refresh, you need to enable the delta change data feed (CDF) property on all source tables or materialized lake views referenced in the materialized lake view definition. CDF lets Fabric read only the rows that changed since the last refresh, instead of reprocessing the full dataset.

Without CDF enabled, optimal refresh can only choose between no refresh and full refresh.

Incremental refresh is supported for append-only data. If the source data includes deletions or updates, Fabric performs a full refresh.

> [!NOTE]
> Enabling CDF on your source tables has no measurable storage or performance effect for append-only workloads, which is the scenario that incremental refresh supports. CDF is a standard Delta Lake table property that other Fabric features can also benefit from. For more information about how CDF works, see [Use Delta Lake change data feed](/azure/databricks/delta/delta-change-data-feed).

You can enable CDF at creation time by including `TBLPROPERTIES` in the `CREATE` statement:

```sql
CREATE OR REPLACE MATERIALIZED LAKE VIEW silver.cleaned_order_data
TBLPROPERTIES (delta.enableChangeDataFeed=true)
AS
SELECT 
    o.order_id,
    o.order_date,
    o.product_id,
    p.product_name,
    o.quantity,
    p.price,
    o.quantity * p.price AS revenue
FROM bronze.orders o
INNER JOIN bronze.products p
ON o.product_id = p.product_id
```

For existing source tables, use `ALTER TABLE` to enable CDF:

```sql
ALTER TABLE <table-name> SET TBLPROPERTIES (delta.enableChangeDataFeed = true);
```

For example, to enable CDF on both source tables from the [get started guide](./get-started-with-materialized-lake-views.md):

```sql
ALTER TABLE bronze.products SET TBLPROPERTIES (delta.enableChangeDataFeed = true);
ALTER TABLE bronze.orders SET TBLPROPERTIES (delta.enableChangeDataFeed = true);
```

## SQL constructs supported by incremental refresh

Incremental refresh works when your materialized lake view definition uses only the SQL constructs described here. If your query includes constructs not in this table—such as `LEFT JOIN` or nondeterministic functions—Fabric still refreshes your data, but falls back to a full refresh instead.

| SQL Construct | Remark |
|---|---|
| SELECT expression | Supports expressions with deterministic built-in functions. The following constructs lead to full refresh (do not support incremental refresh): **aggregate functions** (`SUM()`, `COUNT()`, `AVG()`, `MIN()`, `MAX()`, `STDDEV()`, etc.), **`GROUP BY`**, **`DISTINCT`**, **window functions** (`ROW_NUMBER()`, `RANK()`, `LAG()`, `LEAD()`, etc.), and **non-deterministic functions** (`rand()`, `uuid()`, `current_timestamp()`, `current_date()`, etc.). |
| FROM | |
| WHERE | Only deterministic built-in functions are supported. |
| INNER JOIN | |
| UNION ALL | |
| Data quality constraints | Only deterministic built-in functions are supported in constraints. |
| Subquery | Subqueries in expressions (SELECT, WHERE) lead to full refresh. | 
| WITH | Common table expressions are supported. |


> [!NOTE]
> Using unsupported constructs doesn't prevent you from creating a materialized lake view. It only means that Fabric uses a full refresh instead of an incremental refresh.

## Full refresh

Optimal refresh automatically falls back to full refresh when needed, so you don't normally need to force it. However, there are cases where you might want to trigger a full refresh manually—for example, to troubleshoot unexpected results or to reprocess data after a correction.

### Run a one-time full refresh with SQL

To force a full refresh of a specific materialized lake view, run the following command:

```sql
REFRESH MATERIALIZED LAKE VIEW [workspace.lakehouse.schema].MLV_Identifier FULL
```

> [!NOTE]
> If your workspace name contains spaces, enclose it in backticks: `` `My Workspace`.lakehouse.schema.view_name ``

### Turn off optimal refresh

If you want every scheduled run to perform a full refresh, you can turn off the optimal refresh toggle. This disables both the no-refresh and incremental strategies—every run recomputes the full dataset, even if no source data changed.

1. Go to your lakehouse and select **Materialized lake views**.
1. Click on  **Manage** and turn off the **Optimal refresh** toggle.

   :::image type="content" source="./media/refresh-materialized-lake-view/full-refresh-option.png" alt-text="Screenshot that shows toggle to switch to full refresh mode." border="true" lightbox="./media/refresh-materialized-lake-view/full-refresh-option.png":::

## Related content

* [Implement a medallion architecture with materialized lake views](./tutorial.md)
* [Data quality in materialized lake views](./data-quality.md)
