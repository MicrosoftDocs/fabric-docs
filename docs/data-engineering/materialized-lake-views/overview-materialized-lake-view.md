---
title: Overview of Materialized Lake Views
description: Learn about the features, availability, and limitations of materialized lake views in Microsoft Fabric.
ms.reviewer: nijelsf
ms.topic: overview
ms.date: 02/27/2026
# customer intent: As a data engineer, I want to understand what materialized lake views are in Microsoft Fabric so that I can use them for building a medallion architecture.
---

# What are materialized lake views in Microsoft Fabric?

[!INCLUDE [preview-note](./includes/materialized-lake-views-preview-note.md)]

Materialized lake views are precomputed, stored results of SQL queries in a lakehouse. You define a transformation using SQL, and Fabric stores the results as a Delta table that can be refreshed on demand or on a schedule. Materialized lake views support incremental refresh, built-in data quality rules, and automatic dependency management across views.

## When to use materialized lake views

When you already have a lakehouse and run Spark notebooks to transform data into Delta tables—then schedule those notebooks via pipelines—materialized lake views can simplify that workflow. Instead of managing refresh logic, execution order, and scheduling yourself, you define SQL transformations and let Fabric handle the rest.

Materialized lake views are a good fit when you have:

- **Frequently accessed aggregations** (daily sales totals, monthly metrics) where precomputed results improve performance over running expensive queries repeatedly
- **Complex joins** across multiple large tables that are queried often and need consistent results for all consumers
- **Data quality transformations** that need to be applied uniformly, with rules defined declaratively rather than in custom code
- **Reporting datasets** that combine data from multiple sources and benefit from automatic refresh when source data changes
- **Medallion architecture** where you need bronze → silver → gold transformations defined in SQL

Materialized lake views aren't the right choice for every scenario. Consider alternatives when you have:

- **One-time or rarely accessed queries** that don't benefit from precomputed results
- **Simple transformations** that already run quickly without optimization
- **Non-SQL logic** such as ML inference, API calls, or complex Python processing — use Spark notebooks instead
- **High-frequency streaming data** that requires sub-second updates — consider [Real-Time Intelligence](../../real-time-intelligence/overview.md) instead

## Get started with materialized lake views

To create your first materialized lake view in Microsoft Fabric, see [Get started with materialized lake views](get-started-with-materialized-lake-views.md). For a complete walkthrough that builds a medallion architecture, see [Tutorial: Build a medallion architecture with materialized lake views](tutorial.md).

## How do materialized lake views work?

Materialized lake views use a declarative approach: you write a SQL query that defines the transformation you want, and Fabric handles execution, storage, and refresh. The result is persisted as a Delta table in your lakehouse, so downstream consumers can query it directly without re-running the transformation.

The lifecycle of a materialized lake view follows four stages:

- **Create**: Write a SQL query that defines your transformation. Fabric stores the definition and materializes the results as a Delta table.
- **Refresh**: When source data changes, Fabric determines the optimal refresh strategy — incremental (process only new or changed data), full (rebuild entirely), or skip (no changes detected).
- **Query**: Applications and reports query the materialized view like any other Delta table, with no awareness of the underlying transformation logic.
- **Monitor**: Track refresh history, execution status, data quality metrics, and dependency lineage through built-in Fabric tools.

## Key capabilities

Materialized lake views include built-in features that handle the operational complexity you'd otherwise manage yourself in notebooks and pipelines.

### Automatic refresh optimization

Fabric automatically determines when and how to refresh your materialized lake views:
- **Incremental refresh**: Only processes new or changed data
- **Full refresh**: Rebuilds the entire materialized lake view when needed  
- **Skip refresh**: No refresh needed when source data hasn't changed

### Built-in data quality

Materialized lake views support declarative data quality rules. Define constraints directly in your SQL and specify how to handle violations:

```sql
CONSTRAINT valid_sales CHECK (sales_amount > 0) ON MISMATCH DROP
```

### Dependency management

When materialized lake views reference other materialized lake views or tables, Fabric automatically detects those relationships and manages execution order for you.

- Visualize how your materialized lake views depend on each other
- Automatic refresh ordering based on dependencies
- Processing follows the dependency chain to ensure data consistency

### Monitoring and insights

Fabric provides built-in tools to track the health and performance of your materialized lake views:

- Track refresh performance and execution status for each materialized lake view
- View data quality metrics and violation counts in lineage
- Monitor job instances and refresh history

## Common use cases

The following examples show how materialized lake views simplify common data engineering tasks that would otherwise require notebook code and pipeline orchestration.

### Sales reporting dashboard

Aggregate order data into a daily summary by region. Instead of scheduling a notebook to rebuild this table, the materialized lake view refreshes automatically when the source `orders` table changes.

```sql
-- Daily sales summary that refreshes automatically
CREATE MATERIALIZED LAKE VIEW daily_sales AS
SELECT 
    DATE(order_date) as sale_date,
    region,
    SUM(amount) as total_sales,
    COUNT(*) as order_count
FROM orders 
GROUP BY DATE(order_date), region;
```

### Data quality validation

Clean and normalize customer records while enforcing data quality rules. The `ON MISMATCH DROP` constraint automatically drops rows where the email is null, so downstream consumers only see valid data.

```sql
-- Clean customer data with quality rules
CREATE MATERIALIZED LAKE VIEW clean_customers (
    CONSTRAINT valid_email CHECK (email IS NOT NULL) ON MISMATCH DROP
) AS
SELECT 
    customer_id,
    TRIM(customer_name) as customer_name,
    LOWER(email) as email
FROM raw_customers
WHERE customer_name IS NOT NULL;
```

### Medallion architecture

Transform raw bronze data into a curated silver layer by casting types, filtering invalid records, and selecting relevant columns. Materialized lake views handle dependency ordering automatically, so you can chain bronze → silver → gold views without managing execution sequence.

```sql
-- Bronze → Silver transformation
CREATE MATERIALIZED LAKE VIEW silver_products AS
SELECT 
    product_id,
    product_name,
    category,
    CAST(price as DECIMAL(10,2)) as price
FROM bronze_products
WHERE price > 0;
```

## Current limitations

The following features are currently not available for materialized lake views in Microsoft Fabric:

* Cross-lakehouse lineage and execution features.

## Related content

* [Get started with materialized lake views](get-started-with-materialized-lake-views.md)
* [Spark SQL reference for materialized lake views](create-materialized-lake-view.md)
* [Monitor materialized lake views](monitor-materialized-lake-views.md)
* [Materialized lake views public API](materialized-lake-views-public-api.md)
