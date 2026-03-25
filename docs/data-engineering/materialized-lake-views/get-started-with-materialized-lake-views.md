---
title: Get Started with Materialized Lake Views in a Microsoft Fabric Lakehouse
description: Learn how to create your first materialized lake view in a Microsoft Fabric lakehouse.
ms.topic: quickstart
ms.reviewer: abhishjain
ms.date: 03/18/2026
#customer intent: As a data engineer, I want to create materialized lake views in a Microsoft Fabric lakehouse so that I can optimize query performance and manage data quality.
---

# Get started with materialized lake views

In this quickstart, you create source tables in a Microsoft Fabric lakehouse, define materialized lake views that transform the data, and schedule automatic refresh. By the end, you have a working bronze-to-gold pipeline with lineage tracking.

## Prerequisites

* A [workspace](../../fundamentals/create-workspaces.md) with a Microsoft Fabric-enabled [capacity](../../enterprise/licenses.md#capacity).
* A lakehouse with [lakehouse schemas](../lakehouse-schemas.md) enabled and [Fabric Runtime 1.3](../runtime-1-3.md). 

## Create your first materialized lake view

1. Go to the [Fabric portal](https://app.fabric.microsoft.com/) and navigate to your workspace.

1. Open your lakehouse and select **Materialized lake views**.

   :::image type="content" source="./media/get-started-with-materialized-lake-views/manage-materialized-lake-views.png" alt-text="Screenshot that shows the menu item for managing materialized lake views." border="true" lightbox="./media/get-started-with-materialized-lake-views/manage-materialized-lake-views.png":::

1. Select **New** > **New notebook** > **Create with Spark SQL**. Alternatively, you can select **Open notebook** from the main canvas. 

   :::image type="content" source="./media/get-started-with-materialized-lake-views/new-materialized-lake-view.png" alt-text="Screenshot of selections for opening a new notebook to create a materialized lake view." border="true" lightbox="./media/get-started-with-materialized-lake-views/new-materialized-lake-view.png":::

   A new notebook opens with a template to create a materialized lake view.

   > [!NOTE]
   > If you are using a Fabric Data Warehouse table as source for materialized lake view, you are required to create a table shortcut in your Lakehouse.

1. Create the source tables `products` and `orders`. Enter the following SQL command into the existing notebook cell and run it:

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

   CREATE TABLE IF NOT EXISTS bronze.orders (
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

1. Refresh the lakehouse explorer to view the newly created `products` and `orders` tables under the `bronze` schema. Select **+ Code** to add a new cell below the existing one.

   :::image type="content" source="./media/get-started-with-materialized-lake-views/source-tables-created.png" alt-text="Screenshot that shows source tables created in a lakehouse." border="true" lightbox="./media/get-started-with-materialized-lake-views/source-tables-created.png":::

1. Enable change data feed (CDF) on the source tables so that [optimal refresh can use incremental processing](./refresh-materialized-lake-view.md). Copy the following SQL command into the new cell and run it:

   ```sql
   ALTER TABLE bronze.products SET TBLPROPERTIES (delta.enableChangeDataFeed = true);
   ALTER TABLE bronze.orders SET TBLPROPERTIES (delta.enableChangeDataFeed = true);
   ```

   Select **+ Code** to add another new cell.

1. Create materialized lake views from the source tables. Copy the following SQL command into the new cell and run it:

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

1. Refresh the lakehouse explorer to view the newly created materialized lake views `cleaned_order_data` and `product_sales_summary` under the `silver` and `gold` schemas, respectively.

   :::image type="content" source="./media/get-started-with-materialized-lake-views/materialized-lake-views-created.png" alt-text="Screenshot that shows materialized lake views created in a lakehouse." border="true" lightbox="./media/get-started-with-materialized-lake-views/materialized-lake-views-created.png":::

1. You can further verify the results by querying the gold materialized lake view. Copy the following SQL command into a new cell and run it:

   ```sql
   SELECT * FROM gold.product_sales_summary;
   ```

   The output shows three rows — one for each product — with the total quantity sold, total revenue, and average order value calculated from the source orders data.

1. Close the notebook and go back to your lakehouse. Select **Materialized lake views**. You might need to select the refresh icon to view the autogenerated lineage.

   :::image type="content" source="./media/get-started-with-materialized-lake-views/sample-lineage.png" alt-text="Screenshot that shows lineage." border="true" lightbox="./media/get-started-with-materialized-lake-views/sample-lineage.png":::
  
1. Schedule the lineage execution. Select **Schedules** from the ribbon. In the **Schedules** pane, select the **On** radio button for **Schedule refresh**. 

   :::image type="content" source="./media/get-started-with-materialized-lake-views/schedule-lineage-run.png" alt-text="Screenshot of the pane for scheduling lineage." border="true" lightbox="./media/get-started-with-materialized-lake-views/schedule-lineage-run.png":::

1. Select the desired frequency from the **Repeat** drop-down (by the minute, hourly, daily, weekly, or monthly) and specify the recurring interval. Select **Apply**.

   :::image type="content" source="./media/get-started-with-materialized-lake-views/schedule-lineage-run-extended-screen.png" alt-text="Screenshot of the pane for scheduling lineage with more options." border="true" lightbox="./media/get-started-with-materialized-lake-views/schedule-lineage-run-extended-screen.png":::

1. Wait for the next scheduled run time and then select **Recent run(s)** to see the progress of the lineage execution.

   :::image type="content" source="./media/get-started-with-materialized-lake-views/ongoing-run-progress.png" alt-text="Screenshot that shows the recent run." border="true" lightbox="./media/get-started-with-materialized-lake-views/ongoing-run-progress.png":::

1. Select the ongoing run to monitor progress.

   :::image type="content" source="./media/get-started-with-materialized-lake-views/ongoing-run-progress-extended-screen.png" alt-text="Screenshot that shows the progress of an ongoing run." border="true" lightbox="./media/get-started-with-materialized-lake-views/ongoing-run-progress-extended-screen.png":::

1. After the run succeeds, the lineage status shows **Completed**.

   :::image type="content" source="./media/get-started-with-materialized-lake-views/completed-lineage-run.png" alt-text="Screenshot that shows a completed lineage run." border="true" lightbox="./media/get-started-with-materialized-lake-views/completed-lineage-run.png":::


## What happens next

Now that you have a scheduled lineage refresh, Fabric automatically keeps your materialized lake views up to date as source data changes. When new rows are inserted into the `bronze.orders` or `bronze.products` tables, the next scheduled run detects the changes, refreshes the `silver.cleaned_order_data` view first (because the gold view depends on it), and then refreshes `gold.product_sales_summary` with the updated totals. You don't need to manage refresh order or write orchestration logic — Fabric handles it based on the lineage graph.

To learn more about refresh behavior and how Fabric determines the optimal strategy (incremental, full, or skip), see [Optimal refresh for materialized lake views in a lakehouse](./refresh-materialized-lake-view.md). For a complete end-to-end walkthrough that demonstrates these concepts with a larger dataset, see [Tutorial: Implement medallion architecture with materialized lake views](./tutorial.md).

## Related content

* [What are materialized lake views in Microsoft Fabric?](./overview-materialized-lake-view.md)
* [Spark SQL reference for materialized lake views](./create-materialized-lake-view.md)
* [Optimal refresh for materialized lake views](./refresh-materialized-lake-view.md)
