---
title: Lakehouse tutorial - Prepare and transform data in the lakehouse
description: After ingesting data, transform it using notebooks and Spark runtime.
ms.reviewer: sngun
ms.author: arali
author: ms-arali
ms.topic: tutorial
ms.custom:
  - build-2023
  - ignite-2023
ms.date: 5/23/2023
---

# Lakehouse tutorial: Prepare and transform data in the lakehouse

In this tutorial, you use notebooks with [Spark runtime](./runtime.md) to transform and prepare the data.

## Prerequisites

* [Ingest data into the lakehouse](tutorial-lakehouse-data-ingestion.md)

## Prepare data

From the previous tutorial steps, we have raw data ingested from the source to the **Files** section of the lakehouse. Now you can transform that data and prepare it for creating delta tables.

1. Download the notebooks from the [Lakehouse Tutorial Source Code](https://github.com/microsoft/fabric-samples/tree/main/docs-samples/data-engineering/Lakehouse%20Tutorial%20Source%20Code) folder.

1. From the experience switcher located at the bottom left of the screen, select **Data Engineering**.

   :::image type="content" source="media\tutorial-lakehouse-data-preparation\workload-switcher-data-engineering.png" alt-text="Screenshot showing where to find the experience switcher and select Data Engineering.":::

1. Select **Import notebook** from the **New** section at the top of the landing page.

1. Select **Upload** from the **Import status** pane that opens on the right side of the screen.

1. Select all the notebooks that were downloaded in the step 1 of this section.

   :::image type="content" source="media\tutorial-lakehouse-data-preparation\select-notebooks-open.png" alt-text="Screenshot showing where to find the downloaded notebooks and the Open button.":::

1. Select **Open**. A notification indicating the status of the import appears in the top right corner of the browser window.

1. After the import is successful, you can go to items view of the workspace and see the newly imported notebooks. Select **wwilakehouse** lakehouse to open it.

   :::image type="content" source="media\tutorial-lakehouse-data-preparation\imported-notebooks-lakehouse.png" alt-text="Screenshot showing the list of imported notebooks and where to select the lakehouse.":::

1. Once the **wwilakehouse** lakehouse is opened, select **Open notebook** > **Existing notebook** from the top navigation menu.

   :::image type="content" source="media\tutorial-lakehouse-data-preparation\existing-notebook-ribbon.png" alt-text="Screenshot showing the list of successfully imported notebooks.":::

1. From the list of existing notebooks, select the **01 - Create Delta Tables** notebook and select **Open**.

1. In the open notebook in the lakehouse **Explorer**, you see the notebook is already linked to your opened lakehouse.

   > [!NOTE]
   > Fabric provides the [V-order](delta-optimization-and-v-order.md) capability to write optimized delta lake files. V-order often improves compression by three to four times and up to 10 times performance acceleration over the Delta Lake files that aren't optimized. Spark in Fabric dynamically optimizes partitions while generating files with a default 128 MB size. The target file size may be changed per workload requirements using configurations.
   > With the [optimize write](delta-optimization-and-v-order.md#what-is-optimize-write) capability, the Apache Spark engine that reduces the number of files written and aims to increase individual file size of the written data.

1. Before you write data as delta lake tables in the **Tables** section of the lakehouse, you use two Fabric features (**V-order** and **Optimize Write**) for optimized data writing and for improved reading performance. To enable these features in your session, set these configurations in the first cell of your notebook.

   To start the notebook and execute all the cells in sequence, select **Run all** on the top ribbon (under **Home**). Or, to only execute code from a specific cell, select the **Run** icon that appears to the left of the cell upon hover, or press **SHIFT + ENTER** on your keyboard while control is in the cell.

   :::image type="content" source="media\tutorial-lakehouse-data-preparation\spark-session-run-execution.png" alt-text="Screenshot of a Spark session configuration screen, including a code cell and Run icon.":::

   When running a cell, you didn't have to specify the underlying Spark pool or cluster details because Fabric provides them through Live Pool. Every Fabric workspace comes with a default Spark pool, called Live Pool. This means when you create notebooks, you don't have to worry about specifying any Spark configurations or cluster details. When you execute the first notebook command, the live pool is up and running in a few seconds. And the Spark session is established and it starts executing the code. Subsequent code execution is almost instantaneous in this notebook while the Spark session is active.

1. Next, you read raw data from the **Files** section of the lakehouse, and add more columns for different date parts as part of the transformation. Finally, you use partitionBy Spark API to partition the data before writing it as delta table based on the newly created data part columns (Year and Quarter).

   ```python
   from pyspark.sql.functions import col, year, month, quarter
   
   table_name = 'fact_sale'
   
   df = spark.read.format("parquet").load('Files/wwi-raw-data/full/fact_sale_1y_full')
   df = df.withColumn('Year', year(col("InvoiceDateKey")))
   df = df.withColumn('Quarter', quarter(col("InvoiceDateKey")))
   df = df.withColumn('Month', month(col("InvoiceDateKey")))
   
   df.write.mode("overwrite").format("delta").partitionBy("Year","Quarter").save("Tables/" + table_name)
   ```

1. After the fact tables load, you can move on to loading data for the rest of the dimensions. The following cell creates a function to read raw data from the **Files** section of the lakehouse for each of the table names passed as a parameter. Next, it creates a list of dimension tables. Finally, it loops through the list of tables and creates a delta table for each table name that's read from the input parameter. Note that the script will drop the column named `Photo` in this example since the column is not used.

   ```python
   from pyspark.sql.types import *
   def loadFullDataFromSource(table_name):
       df = spark.read.format("parquet").load('Files/wwi-raw-data/full/' + table_name)
       df = df.drop("Photo")
       df.write.mode("overwrite").format("delta").save("Tables/" + table_name)
    
   full_tables = [
       'dimension_city',
       'dimension_date',
       'dimension_employee',
       'dimension_stock_item'
       ]
  
   for table in full_tables:
       loadFullDataFromSource(table)
   ```

1. To validate the created tables, right click and select refresh on the **wwilakehouse** lakehouse. The tables appear.

   :::image type="content" source="media\tutorial-lakehouse-data-preparation\tutorial-lakehouse-explorer-tables.png" alt-text="Screenshot showing where to find your created tables in the Lakehouse explorer.":::

1. Go the items view of the workspace again and select the **wwilakehouse** lakehouse to open it.

1. Now, open the second notebook. In the lakehouse view, select **Open notebook** > **Existing notebook** from the ribbon.

1. From the list of existing notebooks, select the **02 - Data Transformation - Business** notebook to open it.

   :::image type="content" source="media\tutorial-lakehouse-data-preparation\existing-second-notebook.png" alt-text="Screenshot of the Open existing notebook menu, showing where to select your notebook.":::

1. In the open notebook in the lakehouse **Explorer**, you see the notebook is already linked to your opened lakehouse.

1. An organization might have data engineers working with Scala/Python and other data engineers working with SQL (Spark SQL or T-SQL), all working on the same copy of the data. Fabric makes it possible for these different groups, with varied experience and preference, to work and collaborate. The two different approaches transform and generate business aggregates. You can pick the one suitable for you or mix and match these approaches based on your preference without compromising on the performance:

   * **Approach #1** - Use PySpark to join and aggregates data for generating business aggregates. This approach is preferable to someone with a programming (Python or PySpark) background.

   * **Approach #2** - Use Spark SQL to join and aggregates data for generating business aggregates. This approach is preferable to someone with SQL background, transitioning to Spark.

1. **Approach #1 (sale_by_date_city)** - Use PySpark to join and aggregate data for generating business aggregates. With the following code, you create three different Spark dataframes, each referencing an existing delta table. Then you join these tables using the dataframes, do group by to generate aggregation, rename a few of the columns, and finally write it as a delta table in the **Tables** section of the lakehouse to persist with the data.

   In this cell, you create three different Spark dataframes, each referencing an existing delta table.

   ```python
   df_fact_sale = spark.read.table("wwilakehouse.fact_sale") 
   df_dimension_date = spark.read.table("wwilakehouse.dimension_date")
   df_dimension_city = spark.read.table("wwilakehouse.dimension_city")
   ```

   In this cell, you join these tables using the dataframes created earlier, do group by to generate aggregation, rename a few of the columns, and finally write it as a delta table in the **Tables** section of the lakehouse.
  
   ```python
   sale_by_date_city = df_fact_sale.alias("sale") \
   .join(df_dimension_date.alias("date"), df_fact_sale.InvoiceDateKey == df_dimension_date.Date, "inner") \
   .join(df_dimension_city.alias("city"), df_fact_sale.CityKey == df_dimension_city.CityKey, "inner") \
   .select("date.Date", "date.CalendarMonthLabel", "date.Day", "date.ShortMonth", "date.CalendarYear", "city.City", "city.StateProvince", "city.SalesTerritory", "sale.TotalExcludingTax", "sale.TaxAmount", "sale.TotalIncludingTax", "sale.Profit")\
   .groupBy("date.Date", "date.CalendarMonthLabel", "date.Day", "date.ShortMonth", "date.CalendarYear", "city.City", "city.StateProvince", "city.SalesTerritory")\
   .sum("sale.TotalExcludingTax", "sale.TaxAmount", "sale.TotalIncludingTax", "sale.Profit")\
   .withColumnRenamed("sum(TotalExcludingTax)", "SumOfTotalExcludingTax")\
   .withColumnRenamed("sum(TaxAmount)", "SumOfTaxAmount")\
   .withColumnRenamed("sum(TotalIncludingTax)", "SumOfTotalIncludingTax")\
   .withColumnRenamed("sum(Profit)", "SumOfProfit")\
   .orderBy("date.Date", "city.StateProvince", "city.City")
   
   sale_by_date_city.write.mode("overwrite").format("delta").option("overwriteSchema", "true").save("Tables/aggregate_sale_by_date_city")
   ```

1. **Approach #2 (sale_by_date_employee)** - Use Spark SQL to join and aggregate data for generating business aggregates. With the following code, you create a temporary Spark view by joining three tables, do group by to generate aggregation, and rename a few of the columns. Finally, you read from the temporary Spark view and finally write it as a delta table in the **Tables** section of the lakehouse to persist with the data.

   In this cell, you create a temporary Spark view by joining three tables, do group by to generate aggregation, and rename a few of the columns.

   ```python
   %%sql
   CREATE OR REPLACE TEMPORARY VIEW sale_by_date_employee
   AS
   SELECT
          DD.Date, DD.CalendarMonthLabel
    , DD.Day, DD.ShortMonth Month, CalendarYear Year
         ,DE.PreferredName, DE.Employee
         ,SUM(FS.TotalExcludingTax) SumOfTotalExcludingTax
         ,SUM(FS.TaxAmount) SumOfTaxAmount
         ,SUM(FS.TotalIncludingTax) SumOfTotalIncludingTax
         ,SUM(Profit) SumOfProfit 
   FROM wwilakehouse.fact_sale FS
   INNER JOIN wwilakehouse.dimension_date DD ON FS.InvoiceDateKey = DD.Date
   INNER JOIN wwilakehouse.dimension_Employee DE ON FS.SalespersonKey = DE.EmployeeKey
   GROUP BY DD.Date, DD.CalendarMonthLabel, DD.Day, DD.ShortMonth, DD.CalendarYear, DE.PreferredName, DE.Employee
   ORDER BY DD.Date ASC, DE.PreferredName ASC, DE.Employee ASC
   ```

   In this cell, you read from the temporary Spark view created in the previous cell and finally write it as a delta table in the **Tables** section of the lakehouse.

   ```python
   sale_by_date_employee = spark.sql("SELECT * FROM sale_by_date_employee")
   sale_by_date_employee.write.mode("overwrite").format("delta").option("overwriteSchema", "true").save("Tables/aggregate_sale_by_date_employee")
   ```

1. To validate the created tables, right click and select refresh on the **wwilakehouse** lakehouse. The aggregate tables appear.

   :::image type="content" source="media\tutorial-lakehouse-data-preparation\validate-tables.png" alt-text="Screenshot of the Lakehouse explorer showing where the new tables appear.":::

Both the approaches produce a similar outcome. You can choose based on your background and preference, to minimize the need for you to learn a new technology or compromise on the performance.

Also you may notice that you're writing data as delta lake files. The automatic table discovery and registration feature of Fabric picks up and registers them in the metastore. You don't need to explicitly call `CREATE TABLE` statements to create tables to use with SQL.

## Next step

> [!div class="nextstepaction"]
> [Build reports using Power BI](tutorial-lakehouse-build-report.md)
