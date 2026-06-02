---
title: Overview of Materialized Lake Views
description: Learn about the features, availability, and limitations of materialized lake views in Microsoft Fabric.
ms.reviewer: bsankaran, sairamyeturi, nijelsf, hgowrisankar
ms.topic: overview
ms.date: 05/26/2026
ai-usage: ai-assisted
# customer intent: As a data engineer, I want to understand what materialized lake views are in Microsoft Fabric so that I can use them for building a medallion architecture.
---

# What are materialized lake views in Microsoft Fabric?

A materialized lake view in Fabric is a persisted, automatically refreshed view defined in Spark SQL or PySpark. It simplifies multi-stage Lakehouse transformations — typically the bronze-to-silver-to-gold medallion architecture — by expressing them as declarative statements rather than custom Spark jobs. Once materialized, an MLV behaves like a standard Lakehouse table in terms of storage, access patterns, and security — can be queried through any Fabric engine with the same permissions and governance model. Fabric tracks dependencies between MLVs, orchestrates refreshes in the correct order, and enforces data quality constraints at every stage. This enables data engineers to build reliable, maintainable pipelines with less code and operational overhead.

## When to use materialized lake views

Materialized lake views are a good fit when you have:

- **Frequently accessed aggregations** (daily sales totals, monthly metrics) where precomputed results improve performance over running expensive queries repeatedly
- **Complex joins** across multiple large tables that are queried often and need consistent results for all consumers
- **Data quality transformations** that need to be applied uniformly, with rules defined declaratively rather than in custom code
- **Reporting datasets** that combine data from multiple sources and benefit from automatic refresh when source data changes
- **Medallion architecture** where you need bronze → silver → gold transformations defined in SQL

Materialized lake views aren't the right choice for every scenario. Consider alternatives when you have:

- **One-time or rarely accessed queries** that don't benefit from precomputed results
- **Non-SQL logic** such as ML inference, API calls, or complex Python processing — use Spark notebooks instead
- **High-frequency streaming data** that requires subsecond updates — consider [Real-Time Intelligence](../../real-time-intelligence/overview.md) instead

> [!NOTE]
> This feature is currently not available in South Central US region.

## Get started with materialized lake views

To create materialized lake view in Microsoft Fabric, see [Get started with materialized lake views](get-started-with-materialized-lake-views.md). For a complete walkthrough that builds a medallion architecture, see [Tutorial: Build a medallion architecture with materialized lake views](tutorial.md).

## How do materialized lake views work?

Materialized lake views use declarative approach: Write a SQL query to define the transformation, and let Fabric handle execution, storage, and refresh. The result is persisted as a Delta table in your lakehouse, so that the downstream consumers can query it directly without running the transformation again.

The lifecycle of a materialized lake view follows four stages:

- **Create**: Write a SQL query that defines your transformation. Fabric stores the definition and materializes the results as a Delta table.
- **Refresh**: When source data changes, Fabric determines the optimal refresh strategy — incremental (process only new or changed data), full (rebuild entirely), or skip (no changes detected).
- **Query**: Applications and reports query the materialized lake view like any other Delta table, with no awareness of the underlying transformation logic.
- **Monitor**: Track refresh history, execution status, data quality metrics, and dependency lineage through built-in Fabric tools.

### Authoring options

Materialized lake views support two authoring approaches:

- **SQL authoring**: Define views using standard SQL CREATE MATERIALIZED LAKE VIEW statements directly in the Fabric lakehouse editor.
- **PySpark authoring (Preview)**: Create, refresh, and replace views from Fabric notebooks using DataFrameWriter. PySpark-authored views support:
  - Data quality constraints
  - Table properties
  - Scheduled refreshes

  > [!NOTE]
  > PySpark-authored views currently perform full refresh only.

## Key capabilities

Materialized lake views include built-in features that handle the operational complexity you'd otherwise manage yourself in notebooks and pipelines.

### Automatic refresh optimization

Fabric automatically determines when and how to refresh your materialized lake views. A decision engine selects the most efficient refresh strategy, and source data changes are detected by default through Change Data Feed:

- **Incremental refresh**: Only processes new or changed data
- **Full refresh**: Rebuilds the entire materialized lake view when needed  
- **Skip refresh**: No refresh needed when source data hasn't changed

Optimal refresh supports a range of common query patterns, including:

- Aggregations with GROUP BY
- Left outer and semi joins
- Common table expressions (CTEs)

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

### Security

Fabric materialized lake views follows all security and governance measures of Lakehouse tables. You can also use MLVs in private link enabled lakehouses. Read more about private link in Fabric at [Security](../../security/security-inbound-overview.md).

## Related content

* [Get started with materialized lake views](get-started-with-materialized-lake-views.md)
* [Spark SQL reference for materialized lake views](create-materialized-lake-view.md)
* [Monitor materialized lake views](monitor-materialized-lake-views.md)
* [Materialized lake views public API](materialized-lake-views-public-api.md)
