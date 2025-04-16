---
title: "Data quality in materialized views in lakehouse in Microsoft Fabric"
description: Learn about data quality in materialized view in lakehouse in Microsoft Fabric
author: abhishjain002 
ms.author: abhishjain
ms.reviwer: nijelsf
ms.topic: conceptual
ms.date: 04/16/2025
---

# Data quality in materialized view in Microsoft Fabric

In the era of big data, the medallion architecture has gained prominence as a robust framework for managing and processing data across different stages of refinement, from raw data to highly curated datasets. This structured approach not only enhances data manageability but also ensures that data quality is maintained throughout the data lifecycle.

Ensuring data quality is essential at every stage of the medallion architecture, which is critical for making informed business decisions. Poor data quality can lead to incorrect insights and operational inefficiencies.
 
This article explains how to implement data quality in materialized views in Microsoft Fabric.

## Implement data quality

When you transform data, it becomes important to compose precise queries to exclude poor quality data from the source tables, which increases processing time and occasionally causes the whole pipeline to fail because of minor data issues.
 
Data quality is achieved by defining the constraints while defining the materialized views. MV within Fabric aims to offer a swift and action-oriented approach to implement checks that ensure data quality management.
 
The following actions can be taken when constraints are defined.

**FAIL** – This action stops refreshing a materialized view if any constraint is violated, halting at the first instance. It is the default behavior, even without specifying the FAIL keyword.
 
**DROP** – This action processes the materialized view and removes records that do not meet the specified constraint. It also provides the count of removed records in the Directed Acyclic Graph (DAG).

> [!NOTE]
> If both DROP and FAIL actions are defined in a materialized view, the FAIL action takes precedence.


### Defining the data quality checks in materialized view

The following example defines the constraint `cust_blank`, which checks if the `customerName` field isn't null. Rows with a null `customerName` are excluded from processing.

```SQL
     CREATE MATERIALIZED VIEW IF NOT EXISTS silver.customers_enriched  
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

## What’s not supported

* Updating data quality constraints after creating a materialized view is not supported. To update the data quality constraints, you must recreate the materialized view.
 
## Next step

* [Refresh a materialized view](./refresh-materialized-view.md)
