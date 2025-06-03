---
title: "Create materialized lake views in lakehouse"
description: Learn how to create a materialized lake view in lakehouse in Microsoft Fabric.
ms.topic: how-to
author: abhishjain002 
ms.author: abhishjain
ms.reviewer: nijelsf
ms.date: 06/02/2025
---

# Create materialized lake views in lakehouse 

In this article, you learn how to create materialized lake views in lakehouse in Microsoft Fabric. For more information about materialized lake views, see [overview of materialized lake views](./overview-materialized-lake-view.md).

## Prerequisites

* A [workspace](../../fundamentals/create-workspaces.md) with a Microsoft Fabric-enabled [capacity](../../enterprise/licenses.md#capacity).
* A lakehouse with [Lakehouse Schemas](../lakehouse-schemas.md) enabled.
* Materialized lake views are compatible with Fabric [Runtime 1.3](../runtime-1-3.md).

## Get started with materialized lake views

There are two ways to get started with materialized lake views creation in lakehouse.

**Option 1**: Create materialized lake view from **Manage materialized lake views** option in the lakehouse explorer.

1. Go to your lakehouse, select **Manage materialized lake views**.

   :::image type="content" source="./media/create-materialized-lake-view/manage-materialized-lake-views.png" alt-text="Screenshot showing materialized lake view." border="true" lightbox="./media/create-materialized-lake-view/manage-materialized-lake-views.png":::

1. Select **New materialized lake view**, which allows you to use an existing notebook or create a new notebook.

   :::image type="content" source="./media/create-materialized-lake-view/new-materialized-lake-view.png" alt-text="Screenshot showing how to create new materialized lake view." border="true" lightbox="./media/create-materialized-lake-view/new-materialized-lake-view.png":::

   :::image type="content" source="./media/create-materialized-lake-view/materialized-lake-view-notebook.png" alt-text="Screenshot showing how to new materialized lake view." border="true" lightbox="./media/create-materialized-lake-view/materialized-lake-view-notebook.png":::

**Option 2**: Create a materialized lake view directly from the notebook attached to your lakehouse. 

* Go to your lakehouse, select **Open notebook** to create a new notebook.

   :::image type="content" source="./media/create-materialized-lake-view/open-notebook.png" alt-text="Screenshot showing how to open notebook." border="true" lightbox="./media/create-materialized-lake-view/open-notebook.png":::

## Materialized lake view Spark SQL syntax

A materialized lake view can be defined from any table or another materialized lake view within the lakehouse. The following outlines the syntax for declaring a materialized lake view using Spark SQL. 

```sql
    CREATE MATERIALIZED LAKE VIEW [IF NOT EXISTS][workspace.lakehouse.schema].MLV_Identifier 
    [( 
        CONSTRAINT constraint_name1 CHECK (condition expression1)[ON MISMATCH DROP | FAIL],  
        CONSTRAINT constraint_name2 CHECK (condition expression2)[ON MISMATCH DROP | FAIL] 
    )] 
    [PARTITIONED BY (col1, col2, ... )] 
    [COMMENT “description or comment”] 
    [TBLPROPERTIES (“key1”=”val1”, “key2”=”val2”, ... )] 
    AS select_statement 
```
 **Arguments**

   |Parameter|Description|	
   |-|-|
   | MLV_Identifier | Name of the materialized lake view.|
   | CONSTRAINT | Keyword to define a data quality constraint, followed by a user-defined name. The constraint applies at the materialized lake view level.|
   | CHECK | Use to enforce the condition defined based on certain column values. Mandatory to use when defining constraint.|
   | ON MISMATCH | Specify the action to be taken if the given constraint is violated. Possible actions are DROP and FAIL. By default, without this clause, the action is FAIL.|
   | PARTITIONED BY | To create partitions based on the column specified.|
   | TBLPROPERTIES | A list of key-value pairs that is used to tag the materialized lake view definition.|	
   | COMMENT | A statement to describe the materialized lake view.|
   | AS select_statement | A query to populate the data in the materialized lake view using select statement.| 

 The following example illustrates the definition of a materialized lake view named “customers_enriched” by joining the **customers** table with the **orders** table.
 
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

The following example defines a materialized lake view called "customers_enriched," partitioned by the "city" column.

```sql
    CREATE MATERIALIZED LAKE VIEW IF NOT EXISTS silver.customers_enriched 
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
## Get the list of materialized lake views 

To obtain the list of all materialized lake views in the lakehouse, use the following command. 

Syntax:
```sql
    SHOW MATERIALIZED LAKE VIEWS <IN/FROM> Schema_Name;
```
Example: 
```sql
    SHOW MATERIALIZED LAKE VIEWS IN silver;
```
## Retrieve the CREATE statement of a materialized lake view 

To get the statement that created a materialized lake view, use this following command: 

Syntax: 
```sql
    SHOW CREATE MATERIALIZED LAKE VIEW MLV_Identifier;
```
Example:
```sql
    SHOW CREATE MATERIALIZED LAKE VIEW customers_enriched;
```

## Update a materialized lake view
 
To update the definition of a materialized lake view, it must be dropped and recreated. Alter statement is only supported for renaming a materialized lake view. 

Syntax: 
```sql
    ALTER MATERIALIZED LAKE VIEW MLV_Identifier RENAME TO MLV_Identifier_New;
```
Example: 
```sql
    ALTER MATERIALIZED LAKE VIEW customers_enriched RENAME TO customers_enriched_new;
```

## Drop a materialized lake view 

The materialized lake view can be dropped using the lakehouse object explorer delete option or by executing the following command in the notebook. 

Syntax: 
```sql
    DROP MATERIALIZED LAKE VIEW MLV_Identifier;
```
Example:
```sql
    DROP MATERIALIZED LAKE VIEW customers_enriched;
```

>[!Note]
> Dropping or renaming a materialized lake view affects the lineage view and scheduled refresh. Ensure you update the reference in all dependent materialized lake views.

## Limitation

* Spark properties set at the session level aren't applied during scheduled lineage refresh.
* The creation of materialized lake view with delta time-travel isn't supported.
* DML statements aren't supported with materialized lake views.
* User-defined functions in CTAS aren't supported.
* Temporary views can't be used to define materialized lake views.

## Next steps

* [Data quality in materialized lake views](./data-quality.md)
* [Refresh materialized lake views](./refresh-materialized-lake-view.md)
