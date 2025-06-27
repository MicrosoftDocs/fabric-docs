---
title: "Get started with materialized lake views in a Lakehouse"
description: Learn how to get started with materialized lake view and create your first MLV.
ms.topic: quickstart
author: abhishjain002 
ms.author: abhishjain
ms.reviewer: nijelsf
ms.date: 06/26/2025
#customer intent: As a data engineer, I want to create materialized lake views in lakehouse so that I can optimize query performance and manage data quality.
---

# Get started with materialized lake views

In this article, you learn how to get started and create materialized lake views(mlv) in a lakehouse in Microsoft Fabric. 

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

1. Run the following command in the notebook to create sample source tables `products` and `orders`.

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
      (103, 'Tablet', 450.00);
   ```
   ```sql

      CREATE TABLE bronze.orders (
        order_id INT,
        product_id INT,
        quantity INT,
        order_date DATE
       );
      INSERT INTO bronze.orders VALUES
       (1001, 101, 2, '2025-06-01'),
       (1002, 103, 1, '2025-06-02'),
       (1003, 102, 3, '2025-06-03');
   ```

1. Create materialized lake views using the source tables. Run the following command.

   ```sql
      CREATE SCHEMA IF NOT EXISTS SILVER;
   
      CREATE MATERIALIZED LAKE VIEW IF NOT EXISTS silver.cleaned_order_data AS
      SELECT 
          o.order_id,
          o.order_date,
          o.product_id,
          p.product_name,
          o.quantity,
          p.price,
          o.quantity * p.price AS revenue
      FROM bronze.orders o
      JOIN bronze.products p
      ON o.product_id = p.product_id;
   ```

   ```sql
      CREATE SCHEMA IF NOT EXISTS GOLD;
   
      CREATE MATERIALIZED LAKE VIEW IF NOT EXISTS gold.product_sales_summary AS
      SELECT
          product_id,
          product_name,
          SUM(quantity) AS total_quantity_sold,
          SUM(revenue) AS total_revenue,
          ROUND(AVG(revenue), 2) AS average_order_value
      FROM
          silver.cleaned_order_data
      GROUP BY
          product_id,
          product_name;
   ```
1. Open Lakehouse explorer to view all created tables and MLVs.

   :::image type="content" source="./media/get-started-with-materialized-lake-views/mlv-created-snapshot.png" alt-text="Screenshot showing materialized lake views created in lakehouse." border="true" lightbox="./media/get-started-with-materialized-lake-views/mlv-created-snapshot.png":::
   
1. Navigate to the **Manage materialized lake views** option in your Lakehouse to view the auto-generated lineage.

   :::image type="content" source="./media/get-started-with-materialized-lake-views/sample-lineage.png" alt-text="Screenshot showing lineage." border="true" lightbox="./media/get-started-with-materialized-lake-views/sample-lineage.png":::
  
1. Schedule the lineage execution.

   :::image type="content" source="./media/get-started-with-materialized-lake-views/schedule_lineage-run.png" alt-text="Screenshot showing how to schedule the lineage." border="true" lightbox="./media/get-started-with-materialized-lake-views/schedule_lineage-run.png":::

1. Click on the ongoing run to monitor progress once the schedule starts.

   :::image type="content" source="./media/get-started-with-materialized-lake-views/on-going-run-progress.png" alt-text="Screenshot showing progress of on-ongoing run." border="true" lightbox="./media/get-started-with-materialized-lake-views/on-going-run-progress.png":::

1. Once the run succeeds, the lineage will display as completed.

   :::image type="content" source="./media/get-started-with-materialized-lake-views/completed-lineage-run.png" alt-text="Screenshot showing completed lineage run." border="true" lightbox="./media/get-started-with-materialized-lake-views/completed-lineage-run.png":::
    
## Next steps

* [Spark SQL reference - materialized lake views](./create-materialized-lake-view.md)
* [Refresh materialized lake views](./refresh-materialized-lake-view.md)
   
