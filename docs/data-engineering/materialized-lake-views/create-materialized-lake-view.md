---
title: Spark SQL Reference for Materialized Lake Views
description: Learn about the Spark SQL syntax for activities related to materialized lake views in Microsoft Fabric.
ms.topic: concept-article
author: eric-urban
ms.author: eur
ms.reviewer: abhishjain
ms.date: 12/22/2025
#customer intent: As a data engineer, I want to create materialized lake views in a lakehouse so that I can optimize query performance and manage data quality.
---

# Spark SQL reference for materialized lake views

In this article, you learn about the Spark SQL syntax for activities related to materialized lake views in Microsoft Fabric.

## Create a materialized lake view

You can define a materialized lake view from any table or from another materialized lake view within a lakehouse. The following code outlines the syntax for declaring a materialized lake view by using Spark SQL:

```sql
CREATE [OR REPLACE] MATERIALIZED LAKE VIEW [IF NOT EXISTS][workspace.lakehouse.schema].MLV_Identifier 
[( 
    CONSTRAINT constraint_name1 CHECK (condition expression1)[ON MISMATCH DROP | FAIL],  
    CONSTRAINT constraint_name2 CHECK (condition expression2)[ON MISMATCH DROP | FAIL] 
)] 
[PARTITIONED BY (col1, col2, ... )] 
[COMMENT "description or comment"] 
[TBLPROPERTIES ("key1"="val1", "key2"="val2", ... )] 
AS select_statement 
```

### Arguments

|Parameter|Description|  
|-|-|
| `MLV_Identifier` | Name of the materialized lake view.|
| `CONSTRAINT` | Keyword to define a data quality constraint, followed by a user-defined name. The constraint applies at the level of the materialized lake view.|
| `CHECK` | Parameter for enforcing a condition based on certain column values. Mandatory to use when you're defining constraint.|
| `ON MISMATCH` | Parameter for specifying the action to take if the constraint is violated. Possible actions are `DROP` and `FAIL`. By default, without this clause, the action is `FAIL`.|
| `PARTITIONED BY` | Parameter for creating partitions based on the specified column.|
| `TBLPROPERTIES` | List of key/value pairs for tagging the definition of the materialized lake view.|  
| `COMMENT` | Statement to describe the materialized lake view.|
| `AS select_statement` | Query to populate the data in the materialized lake view by using a `SELECT` statement.|

### Examples

The following example illustrates the definition of a materialized lake view using replace syntax:

```sql
CREATE OR REPLACE MATERIALIZED LAKE VIEW silver.customer_orders AS
SELECT 
    c.customerID,
    c.customerName,
    c.region,
    o.orderDate,
    o.orderAmount
FROM bronze.customers c INNER JOIN bronze.orders o
ON c.customerID = o.customerID
```

The following example illustrates the definition of a materialized lake view named `customers_enriched` by joining a `customers` table with an `orders` table:

```sql
CREATE MATERIALIZED LAKE VIEW IF NOT EXISTS silver.customers_enriched AS 
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

> [!NOTE]
> - If your workspace name contains spaces, enclose it in backticks: `` `My Workspace`.lakehouse.schema.view_name ``
> - Materialized lake view names are case-insensitive and converted to lowercase (e.g., `MyTestView` becomes `mytestview`)

The following example defines a materialized lake view called `customers_enriched`, partitioned by the `city` column:

```sql
CREATE MATERIALIZED LAKE VIEW IF NOT EXISTS silver.customers_enriched 
COMMENT "This is a sample materialized lake view" 
PARTITIONED BY (city)
AS SELECT 
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

## Get a list of materialized lake views

To obtain the list of all materialized lake views in a lakehouse, use the following command:

```sql
SHOW MATERIALIZED LAKE VIEWS <IN/FROM> Schema_Name;
```

Here's an example:

```sql
SHOW MATERIALIZED LAKE VIEWS IN silver;
```

## Retrieve the statement that created a materialized lake view

To get the `CREATE` statement for a materialized lake view, use the following command:

```sql
SHOW CREATE MATERIALIZED LAKE VIEW MLV_Identifier;
```

Here's an example:

```sql
SHOW CREATE MATERIALIZED LAKE VIEW customers_enriched;
```

## Update a materialized lake view

To update the definition of a materialized lake view, you must drop it and re-create it. The `ALTER` statement is supported only for renaming a materialized lake view.

```sql
ALTER MATERIALIZED LAKE VIEW MLV_Identifier RENAME TO MLV_Identifier_New;
```

Here's an example:

```sql
ALTER MATERIALIZED LAKE VIEW customers_enriched RENAME TO customers_enriched_new;
```

## Drop a materialized lake view

You can drop a materialized lake view by using the **Delete** option in the lakehouse object explorer or by running the following command in the notebook:

```sql
DROP MATERIALIZED LAKE VIEW MLV_Identifier;
```

Here's an example:

```sql
DROP MATERIALIZED LAKE VIEW customers_enriched;
```

> [!NOTE]
> Dropping or renaming a materialized lake view affects the lineage view and scheduled refresh. Be sure to update the reference in all dependent materialized lake views.

## Current limitations

* Schema names with all capital letters aren't supported. You can continue to create materialized lake views without using all capital letters in the schema name.
* Spark properties set at the session level aren't applied during a scheduled lineage refresh.
* The creation of a materialized lake view with delta time travel isn't supported.
* Data Manipulation Language (DML) statements aren't supported with materialized lake views.
* User-defined functions in `CREATE TABLE AS SELECT` (CTAS) statements aren't supported.
* You can't use temporary views to define materialized lake views.

## Related content

* [What are materialized lake views in Microsoft Fabric?](./overview-materialized-lake-view.md)
* [Data quality in materialized lake views](./data-quality.md)
* [Refresh materialized lake views in a lakehouse](./refresh-materialized-lake-view.md)
