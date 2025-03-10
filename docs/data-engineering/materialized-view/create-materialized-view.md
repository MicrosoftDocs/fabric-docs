---
title: "Create Materialized View"
description: Learn How to create a materialized view.
author: 
ms.author: 
ms.reviewer: 
ms.topic: how-to
ms.date: 03/09/2025
---

# Create Materialized View

A materialized view is a stored result of a query. Unlike a regular view, which dynamically retrieves data from underlying tables, a materialized view physically stores precomputed data. This improves performance for complex queries or large datasets.
For more information on Fabric Materialized Views, see overview of Fabric Materialized View.
In this article, you learn how to create materialized views in Lakehouse in Microsoft Fabric.

## Prerequisites

* A workspace with a Microsoft Fabric-enabled capacity
* A Lakehouse with Lakehouse Schemas enabled

## Create Materialized View

There are two ways to get started with Materialized view creation.

* Create Materialized View from **Manage materialized views** option
* Create a Materialized View directly from the Notebook attached to your Lakehouse.

1. Create Materialized View from **Manage materialized views** option.

    1. Go to your Lakehouse, select **Manage materialized views**.
       
       :::image type="content" source="./media/create-materialized-view/manage-materialized-views.png" alt-text="Screenshot showing how to create materialized view." border="true" lightbox="./media/create-materialized-view/manage-materialized-views.png":::

    1. Select **New materialized view**, which opens a new notebook.
        
       :::image type="content" source="./media/create-materialized-view/new-materialized-view.png" alt-text="Screenshot showing how to create materialized view." border="true" lightbox="./media/create-materialized-view/new-materialized-view.png":::
       
       :::image type="content" source="./media/create-materialized-view/materialized-view.png" alt-text="Screenshot showing how to create materialized view." border="true" lightbox="./media/create-materialized-view/materialized-view.png":::

 
    
1. Create a Materialized View directly from the Notebook attached to your Lakehouse. 

    1. Go to your Lakehouse, select **Open notebook** to create a new notebook.
       
       :::image type="content" source="./media/create-materialized-view/open-netebook.png" alt-text="Screenshot showing how to open netebook." border="true" lightbox="./media/create-materialized-view/open-netebook.png":::
 

## Materialized View with SQL Syntax

The following outlines the syntax for declaring a materialized Lakeview using SQL. 

```
CREATE MATERIALIZED VIEW [IF NOT EXISTS][workspace.lakehouse.schema].MV_Identifier 

[( 

 CONSTRAINT constraint_name1 CHECK (condition expression1)[ON MISMATCH DROP | FAIL], 

CONSTRAINT 2constraint_name2 CHECK (condition expression2)[ON MISMATCH DROP | FAIL] 

)] 

[PARTITIONED BY (col1, col2, ... )] 

[COMMENT “table_comment”] 

[TBLPROPERTIES (“key1”=”val1”, “key2”=”val2”, ... )] 

AS select_statement 
```
 
**Arguments**


## Define a Materialized view  

A materialized view can be defined from any table or another materialized view within the Lakehouse. The following example illustrates the definition of a materialized view named “customers_enriched” by joining the **customers** table with the **orders** table.

```
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

## Define a Materialized view with Partition
 
The example defines a materialized view called "customers_enriched," partitioned by the "city" column.

```
CREATE MATERIALIZED VIEW IF NOT EXISTS silver.customers_enriched 

COMMENT "This is sample materilzied view for testing" 

PARTITIONED BY (city) 

FROM bronze.customers c LEFT JOIN bronze.orders o 

ON c.customerID = o.customerID; 
```

## Alter Materialized View
 
To update the definition of a materialized view (MV), it must be dropped and recreated. Alter statements are only supported for renaming an MV. 
 

Syntax: 

`ALTER MATERIALIZED VIEW MV_Identifier RENAME TO MV_Identifier_New;`

Example: 
 

`ALTER MATERIALIZED VIEW customers_enriched RENAME TO customers_enriched_New;`

## Get the list of Materialized Views 

To obtain the list of all materialized views in the Lakehouse, use the following command. 

Syntax 

`SHOW MATERIALIZED VIEWS;`

## Retrieve the CREATE Statement of a Materialized View 

To get the statement that created a materialized view, use this following command: 

Syntax: 

`SHOW CREATE MATERIALIZED VIEW MV_Identifier;`

Example 

`SHOW CREATE MATERIALIZED VIEW customers_enriched;`

## Drop a Materialized View 

The materialized view can be dropped using the Lakehouse object explorer delete option or by executing the following command in the notebook. 

Syntax: 

`DROP MATERIALIZED VIEW MV_Identifier;`

Example 

`DROP MATERIALIZED VIEW customers_enriched;`

 

## Limitations 

DML statements aren't supported with Materialized Views. 
 



