---
title: "Data quality in Fabric Materialized View"
description: Learn about Data quality in Fabric Materialized View
author: abhishjain002 
ms.author: abhishjain 
ms.topic: conceptual
ms.date: 03/06/2025
---

# Data quality in Fabric Materialized View

In the era of big data, the Medallion Architecture has gained prominence as a robust framework for managing and processing data across different stages of refinement, from raw data to highly curated datasets. This structured approach not only enhances data manageability but also ensures that data quality is maintained throughout the data lifecycle.

Ensuring data quality is essential at every stage of the Medallion Architecture, which is critical for making informed business decisions. Poor data quality can lead to incorrect insights and operational inefficiencies.
 
This article explains how to implement data quality in Fabric Materialized Views.

## Implement data quality

When you transform data, it becomes important to compose precise queries to exclude poor quality data from the source tables, which increases processing time and occasionally causes the whole pipeline to fail because of minor data issues.
 
Data quality is achieved by defining the constraints while defining the materialized views. MV within Fabric aims to offer a swift and action-oriented approach to implement checks that ensure data quality management.
 
The following actions can be taken when constraints are defined.

**FAIL** – This action fails the MV execution upon any constraint violation, stopping at the first instance. It's the default action even if the user doesn't specify the FAIL keyword.
 

**DROP** – This action processes the materialized view (MV) and excludes records that don't meet the specified constraint. It also provides the count of excluded records in the Directed Acyclic Graph (DAG).

> [!NOTE]
> If DROP and FAIL both actions are defined in the same MV then, FAIL action takes the precedence.


### Defining the Data quality checks in Materialized View

The following example defines the constraint `cust_blank`, which verifies if the `customerName` field isn't blank. If it's blank, MV excludes those rows from processing. 

```
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

## Limitations

To update the Data quality constraints, you need to recreate the MV.
 
## Related content

* [Create materiazed view](./create-materialized-view.md)
