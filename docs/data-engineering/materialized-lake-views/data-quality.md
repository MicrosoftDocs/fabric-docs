---
title: "Data Quality in Materialized Lake Views in a Lakehouse in Microsoft Fabric"
description: Learn about data quality in materialized lake views in a lakehouse in Microsoft Fabric
ms.reviewer: abhishjain
ms.topic: concept-article
ms.date: 02/27/2026
ai-usage: ai-assisted
#customer intent: As a data engineer, I want to implement data quality in materialized lake views in a lakehouse so that I can ensure the integrity and reliability of my data.
---

# Data quality in materialized lake views

In medallion architectures, you must enforce data quality at every stage. Poor data quality can lead to incorrect insights and operational inefficiencies.

This article explains how to implement data quality checks in materialized lake views (MLVs) in Microsoft Fabric.

## Implement data quality

In materialized lake views (MLVs) in Microsoft Fabric, you maintain data quality by defining constraints on your views. Without explicit checks, minor data issues can increase processing time or fail the pipeline.

When a row violates a constraint, you can use one of these actions:

- **FAIL**: Stops MLV refresh at the first constraint violation. This is the default behavior, even when you don't specify `FAIL`.

  > [!CAUTION]
  > Creating or refreshing an MLV with a `FAIL` action can result in a "delta table not found" error. If this occurs, recreate the MLV and avoid the `FAIL` action.

- **DROP**: Continues processing and removes records that violate the constraint. The lineage view shows the count of dropped records.

> [!NOTE]
> If you define both DROP and FAIL actions in an MLV, the FAIL action takes precedence.

### Define data quality checks in a materialized lake view

The following example defines the constraint `cust_blank`, which checks if the `customerName` field isn't null. The constraint excludes rows with a null `customerName` from processing.

```sql
CREATE MATERIALIZED LAKE VIEW IF NOT EXISTS silver.customers_enriched  
(CONSTRAINT cust_blank CHECK (customerName is not null) on MISMATCH DROP)
AS
SELECT
    c.customerID,
    c.customerName,
    c.contact, 
    CASE  
       WHEN COUNT(o.orderID) OVER (PARTITION BY c.customerID) > 0 THEN TRUE  
       ELSE FALSE  
    END AS has_orders 
FROM bronze.customers c LEFT JOIN bronze.orders o 
ON c.customerID = o.customerID; 
```

## Current limitations

Data quality constraints in materialized lake views have the following limitations:

- You can't update data quality constraints after creating an MLV. To change constraints, recreate the MLV.
- You can't use functions or pattern matching operators such as `LIKE` or regex in constraint conditions.

## Related content

- [Refresh materialized lake views](./refresh-materialized-lake-view.md)
- [Power BI reports for data quality](./data-quality-reports.md)
