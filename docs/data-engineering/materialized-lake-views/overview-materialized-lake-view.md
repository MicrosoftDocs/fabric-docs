---
title: Overview of Materialized Lake Views
description: Learn about the features, availability, and limitations of materialized lake views in Microsoft Fabric.
ms.reviewer: nijelsf
ms.topic: overview
ms.date: 11/02/2025
#customer intent: As a data engineer, I want to understand what materialized lake views are in Microsoft Fabric so that I can use them for building a medallion architecture.
---

# What are materialized lake views in Microsoft Fabric?

[!INCLUDE [preview-note](./includes/materialized-lake-views-preview-note.md)]

Materialized lake views are precomputed, stored results of SQL queries that can be refreshed on demand or on a schedule. Think of them as "smart tables" that contain the results of complex transformations, aggregations, or joins - with intelligent refresh strategies to keep data current.

## Why use materialized lake views?

Materialized lake views solve common data engineering challenges:

- **Performance**: Instead of running expensive queries repeatedly, results are precomputed and stored
- **Consistency**: Everyone accesses the same transformed data, reducing discrepancies 
- **Efficiency**: Only refresh when source data actually changes, saving compute resources
- **Simplicity**: Define transformations once using familiar SQL syntax

## When should you use materialized lake views?

Consider materialized lake views when you have:

- **Frequently accessed aggregations** (daily sales totals, monthly metrics)
- **Complex joins** across multiple large tables that are queried often
- **Data quality transformations** that need to be applied consistently
- **Reporting datasets** that combine data from multiple sources
- **Medallion architecture** where you need bronze → silver → gold transformations

**Don't use them for:**
- One-time or rarely accessed queries
- Simple transformations that run quickly
- High-frequency streaming data (consider Real-Time Intelligence for sub-second updates)

## How do materialized lake views work?

Materialized lake views use a declarative approach - you define WHAT you want, not HOW to build it:

1. **Create**: Write SQL defining your transformation
2. **Refresh**: Fabric determines the optimal refresh strategy (incremental, full, or skip)
3. **Query**: Applications query the materialized view like any table
4. **Monitor**: Track data quality, lineage, and refresh status

## Key capabilities

### Automatic refresh optimization
Fabric automatically determines when and how to refresh your views:
- **Incremental refresh**: Only processes new or changed data
- **Full refresh**: Rebuilds the entire view when needed  
- **Skip refresh**: No refresh needed when source data hasn't changed

### Built-in data quality
Define rules directly in your SQL and specify how to handle violations:
```sql
CONSTRAINT valid_sales CHECK (sales_amount > 0) ON MISMATCH DROP
```

### Dependency management
- Visualize how your views depend on each other
- Automatic refresh ordering based on dependencies
- Processing follows dependency chain to ensure data consistency

### Monitoring and insights
- Track refresh performance and execution status
- View data quality metrics and violation counts in lineage
- Monitor job instances and refresh history

## Common use cases

### Sales reporting dashboard
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

> [!NOTE]
> This feature is currently not available in South Central US region.

## Current limitations

The following features are currently not available for materialized lake views in Microsoft Fabric:

* Declarative syntax support for PySpark. You can use Spark SQL syntax to create and refresh materialized lake views.
* Cross-lakehouse lineage and execution features.

## Related content

* [Spark SQL reference for materialized lake views](create-materialized-lake-view.md)
* [Monitor materialized lake views](monitor-materialized-lake-views.md)
