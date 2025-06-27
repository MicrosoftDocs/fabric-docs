---
title: "Get strated with materialized lake views in a Lakehouse"
description: Learn how to get started with materialized lake view and create your first MLV.
ms.topic: quickstart
author: abhishjain002 
ms.author: abhishjain
ms.reviewer: nijelsf
ms.date: 06/26/2025
#customer intent: As a data engineer, I want to create materialized lake views in lakehouse so that I can optimize query performance and manage data quality.
---

# Get started with materialized lake view

In this article, you learn how to get started and create your first materialized lake view (mlv) in a lakehouse in Microsoft Fabric. 

## Prerequisites

* A [workspace](../../fundamentals/create-workspaces.md) with a Microsoft Fabric-enabled [capacity](../../enterprise/licenses.md#capacity).
* A lakehouse with [Lakehouse schemas](../lakehouse-schemas.md) enabled.
* Materialized lake views are compatible with Fabric [Runtime 1.3](../runtime-1-3.md).

## Create your first materialized lake view

1. Go to your lakehouse, select **Manage materialized lake views**.

   :::image type="content" source="./media/create-materialized-lake-view/manage-materialized-lake-views.png" alt-text="Screenshot showing materialized lake view." border="true" lightbox="./media/create-materialized-lake-view/manage-materialized-lake-views.png":::

1. Select **New materialized lake view**, which allows you to use an existing notebook or create a new notebook.

   :::image type="content" source="./media/create-materialized-lake-view/new-materialized-lake-view.png" alt-text="Screenshot showing how to create new materialized lake view." border="true" lightbox="./media/create-materialized-lake-view/new-materialized-lake-view.png":::

   :::image type="content" source="./media/create-materialized-lake-view/materialized-lake-view-notebook.png" alt-text="Screenshot showing how to new materialized lake view." border="true" lightbox="./media/create-materialized-lake-view/materialized-lake-view-notebook.png":::

1. Run the following command in the notebook to create a sample source table for MLV

   ```sql
         CREATE SCHEMA IF NOT EXISTS bronze;
   
         CREATE TABLE IF NOT EXISTS bronze.products (
          product_id INT,
          product_name STRING,
          price DOUBLE
         );
   
         INSERT INTO bronze.products VALUES
         (101, 'Laptop', 1200.50),
         (102, 'Smartphone', 699.99),
         (103, 'Tablet', 450.00),
         (104, 'Monitor', 300.00),
         (105, 'Keyboard', 49.99)
         (106, 'Mouse', 0);
   ```

1. Create your first MLV

   ```sql

         CREATE SCHEMA IF NOT EXISTS SILVER;
   
         CREATE MATERIALIZED LAKE VIEW IF NOT EXISTS silver.products_enriched AS
         SELECT
             product_id,
             product_name,
             price,
             CASE 
                 WHEN price > 0 THEN TRUE 
                 ELSE FALSE 
             END AS is_in_stock
         FROM bronze.products;
   ```

## Next steps

* [Create materialized lake view - Spark SQL reference](./create-materialized-lake-view.md)
* [Refresh materialized lake views](./refresh-materialized-lake-view.md)
   
