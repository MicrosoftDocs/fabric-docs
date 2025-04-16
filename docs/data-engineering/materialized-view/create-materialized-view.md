---
title: "Create a materialized view in lakehouse in Microsoft Fabric"
description: Learn how to create a materialized view in lakehouse in Microsoft Fabric.
ms.topic: how-to
author: abhishjain002 
ms.author: abhishjain
ms.reviwer: nijelsf
ms.date: 04/15/2025
---

# Create a materialized view in lakehouse in Microsoft Fabric 

In this article, you learn how to create materialized views in lakehouse in Microsoft Fabric. For more information about materialized views in lakehosue, see [overview of materialized views](./overview-materialized-lake-view.md)

## Prerequisites

* A [workspace](../../fundamentals/create-workspaces.md) with a Microsoft Fabric-enabled [capacity](../../enterprise/licenses.md#capacity).
* A lakehouse with [Lakehouse Schemas](../lakehouse-schemas.md) enabled.

## Get started with materialized view

There are two ways to get started with materialized view creation in lakehouse.

**Option 1**: Create materialized view from **Manage materialized views** option in the lakehouse explorer.

1. Go to your lakehouse, select **Manage materialized views**.

   :::image type="content" source="./media/create-materialized-view/manage-materialized-views.png" alt-text="Screenshot showing materialized view." border="true" lightbox="./media/create-materialized-view/manage-materialized-views.png":::

1. Select **New materialized view**, which allows to use an existing or create a new notebook.

   :::image type="content" source="./media/create-materialized-view/new-materialized-view.png" alt-text="Screenshot showing how to create new materialized view." border="true" lightbox="./media/create-materialized-view/new-materialized-view.png":::

   :::image type="content" source="./media/create-materialized-view/materialized-view.png" alt-text="Screenshot showing how to new materialized view." border="true" lightbox="./media/create-materialized-view/materialized-view.png":::


**Option 2**: Create a materialized view directly from the notebook attached to your lakehouse. 

1. Go to your lakehouse, select **Open notebook** to create a new notebook.

   :::image type="content" source="./media/create-materialized-view/open-notebook.png" alt-text="Screenshot showing how to open notebook." border="true" lightbox="./media/create-materialized-view/open-notebook.png":::

>[!Important]
> Materilaized views are compatible with Fabric [Runtime 1.3](../runtime-1-3.md).

## Materialized view Spark SQL syntax

A materialized view can be defined from any table or another materialized view within the lakehouse. The following outlines the syntax for declaring a materialized view using Spark SQL. 

```SQL
    CREATE MATERIALIZED VIEW [IF NOT EXISTS][workspace.lakehouse.schema].MV_Identifier 
    [( 
        CONSTRAINT constraint_name1 CHECK (condition expression1)[ON MISMATCH DROP | FAIL],  
        CONSTRAINT 2constraint_name2 CHECK (condition expression2)[ON MISMATCH DROP | FAIL] 
    )] 
    [PARTITIONED BY (col1, col2, ... )] 
    [COMMENT “description or comment”] 
    [TBLPROPERTIES (“key1”=”val1”, “key2”=”val2”, ... )] 
    AS select_statement 
```
 **Arguments**

   |Parameter|Description|	
   |-|-|
   | MV_Identifier | Name of the materialized view.|
   | CONSTRAINT | Keyword to define the constraint for data quality. Follows with a user defined constraint name. Constraint is at materialized view level.|
   | CHECK | Use to enforce the condition defined based on the certain column values. Mandatory to use when defining constraint.|
   | ON MISMATCH | Keyword to define the action to be taken if the given constraint is violated. Default behavior without this clause is FAIL action.|
   | PARTITIONED BY | To create partitions based on the column specified.|
   | TBLPROPERTIES | A list of key-value pairs that is used to tag the materialized view definition.|	
   | COMMENT | A statement to describe the materialized view.|
   | AS select_statement | A query to populate the data in the materialized view using select statement.| 

 The following example illustrates the definition of a materialized view named “customers_enriched” by joining the **customers** table with the **orders** table.
 
 ```SQL
     CREATE MATERIALIZED VIEW IF NOT EXISTS silver.customers_enriched AS 
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

The following example defines a materialized view called "customers_enriched," partitioned by the "city" column.

```SQL
    CREATE MATERIALIZED VIEW IF NOT EXISTS silver.customers_enriched 
    COMMENT "This is a sample materialzied view" 
    PARTITIONED BY (city)
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

## Update a materialized view
 
To update the definition of a materialized view (MV), it must be dropped and recreated. Alter statement is only supported for renaming a materialized view. 

Syntax: 
```SQL
    ALTER MATERIALIZED VIEW MV_Identifier RENAME TO MV_Identifier_New;
```
Example: 
```SQL
    ALTER MATERIALIZED VIEW customers_enriched RENAME TO customers_enriched_new;
```
## Get the list of materialized views 

To obtain the list of all materialized views in the lakehouse, use the following command. 

Syntax:
```SQL
    SHOW MATERIALIZED VIEWS <IN/FROM> Schema_Name;
```
Example: 
```SQL
    SHOW MATERIALIZED VIEWS IN silver;
```
## Retrieve the CREATE statement of a materialized view 

To get the statement that created a materialized view, use this following command: 

Syntax: 
```SQL
    SHOW CREATE MATERIALIZED VIEW MV_Identifier;
```
Example:
```SQL
    SHOW CREATE MATERIALIZED VIEW customers_enriched;
```
## Drop a materialized view 

The materialized view can be dropped using the lakehouse object explorer delete option or by executing the following command in the notebook. 

Syntax: 
```SQL
    DROP MATERIALIZED VIEW MV_Identifier;
```
Example:
```SQL
    DROP MATERIALIZED VIEW customers_enriched;
```

## What’s Not Supported 

* DML statements aren't supported with materialized views.
* Spark properties set at the session level aren't applied during scheduled DAG refresh.
* The creation of materialized view with delta time-travel isn't supported.

## Next steps

* [Data quality in materialized view](./data-quality.md)
* [Refresh a materialized view](./refresh-materialized-view.md)
