---
title: "Data Quality in Materialized Lake Views in a Lakehouse in Microsoft Fabric"
description: Learn about data quality in materialized lake view in a lakehouse in Microsoft Fabric
author: eric-urban
ms.author: eur
ms.reviewer: abhishjain
ms.topic: concept-article
ms.date: 06/19/2025
#customer intent: As a data engineer, I want to implement data quality in materialized lake views in a lakehouse so that I can ensure the integrity and reliability of my data.
---

# Data quality in materialized lake views

In the era of big data, the medallion architecture gained prominence as a robust framework for managing and processing data across different stages of refinement, from raw data to highly curated datasets. This structured approach not only enhances data manageability but also ensures that data quality is maintained throughout the data lifecycle.

Ensuring data quality is essential at every stage of the medallion architecture, which is critical for making informed business decisions. Poor data quality can lead to incorrect insights and operational inefficiencies.

This article explains how to implement data quality in materialized lake views (MLVs) in Microsoft Fabric.

## Implement data quality

When you transform data, it becomes important to compose precise queries to exclude poor quality data from the source tables, which increases processing time and occasionally causes the whole pipeline to fail because of minor data issues.

Data quality is maintained by setting constraints when defining the MLVs. The materialized views within Fabric provide an approach to implement checks for data quality management efficiently.

The following actions can be implemented when constraints are specified.

**FAIL** – This action stops refreshing an MLV if any constraint is violated, halting at the first instance. It's the default behavior, even without specifying the FAIL keyword.

**DROP** – This action processes the MLV and removes records that don't meet the specified constraint. It also provides the count of removed records in the lineage view.

> [!NOTE]
> If both DROP and FAIL actions are defined in an MLV, the FAIL action takes precedence.

### Defining the data quality checks in a materialized lake view

The following example defines the constraint `cust_blank`, which checks if the `customerName` field isn't null. Rows with a null `customerName` are excluded from processing.

```SQL
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

* Updating data quality constraints after creating an MLV isn't supported. To update the data quality constraints, you must recreate the MLV.
* Use of functions and pattern search with operators such as LIKE or regex in constraint condition is restricted.

## Known issues

* The creation and refresh of an MLV with a FAIL action in constraint may result in a "delta table not found" issue. In such cases, it is recommended to recreate the MLV and avoid using the FAIL action.

## Related content

* [Refresh materialized lake views](./refresh-materialized-lake-view.md)
