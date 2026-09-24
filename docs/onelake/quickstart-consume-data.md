---
title: "Quickstart: Query and consume OneLake data"
description: Learn how to query a OneLake table with the SQL analytics endpoint and build a Power BI report in Direct Lake mode over the same underlying data.
ms.topic: quickstart
ms.date: 07/17/2026
ai-usage: ai-assisted
#customer intent: As a data analyst, I want to query and visualize data stored in OneLake so that I can use the same data across multiple engines without moving it.
---

# Quickstart: Query and consume OneLake data across Microsoft Fabric

In this quickstart, you use three Fabric engines to interact with the same lakehouse table. First, you query the table by using the SQL analytics endpoint. Then, you build a Power BI report in Direct Lake mode over that same table. Finally, you read the same table from a Spark notebook. Together, these steps show the core OneLake pattern: one copy of data, multiple engines.

OneLake stores tabular data in open Delta Parquet format on top of Azure Data Lake Storage (ADLS) Gen2. That shared foundation lets different Fabric engines work with the same data without having to move it or reformat it for each experience. Tools and services that support ADLS Gen2, such as Azure Databricks, Azure Synapse Analytics, and custom applications, can also reach the same data from outside Fabric.

## Prerequisites

- A [Fabric license](../enterprise/licenses.md). Or, sign up for a free [Fabric trial](../fundamentals/fabric-trial.md).
- A [Fabric workspace](../fundamentals/create-workspaces.md) with a capacity assigned.
- A lakehouse that contains the `dim_products` table from the previous quickstart, [Quickstart: Get data into OneLake](quickstart-get-data.md).

## Query the table by using the SQL analytics endpoint

Every lakehouse automatically gets a SQL analytics endpoint. The endpoint reads directly from the Delta tables in OneLake, so you can run T-SQL queries against your lakehouse data without copying it into a separate SQL store.

1. In the [Fabric portal](https://app.fabric.microsoft.com), open the workspace that contains your lakehouse and select the lakehouse.
1. In the upper-right corner of the lakehouse, select **Analyze data with** > **SQL analytics endpoint** from the dropdown to switch to the SQL analytics endpoint of the same item.

   :::image type="content" source="./media/quickstart-consume-data/sql-analytics-endpoint.png" alt-text="A screenshot of the Fabric portal that shows switching to the SQL analytics endpoint.":::

1. On the SQL analytics endpoint menu, select **New SQL query**.
1. In the query editor, run the following query against the `dim_products` table:

   This query groups by category and subcategory to show product counts and average price.

   ```sql
   SELECT
      category,
      subcategory,
      COUNT(*) AS products,
      ROUND(AVG(standard_price), 2) AS avg_price
   FROM (
      SELECT
         product_id,
         category,
         subcategory,
         standard_price,
         ROW_NUMBER() OVER (
            PARTITION BY product_id
            ORDER BY from_date DESC
         ) AS rn
      FROM dbo.dim_products
   ) latest
   WHERE rn = 1
   GROUP BY category, subcategory
   ORDER BY avg_price DESC;
   ```

1. Review the results in the query output pane.

   :::image type="content" source="./media/quickstart-consume-data/query-results.png" alt-text="A screenshot of the Fabric portal that shows the output of a SQL query.":::

You queried the table without moving or duplicating it. The SQL analytics endpoint read the same Delta files in OneLake that the lakehouse uses.

## Build a Power BI report in Direct Lake mode

Direct Lake is a Power BI storage mode that reads Delta tables from OneLake, so a semantic model can serve reports without importing or duplicating the data. Direct Lake has two modes that both read data from OneLake: **Direct Lake on OneLake** and **Direct Lake on SQL**. They differ in how the semantic model discovers tables and enforces permissions. Because this quickstart starts from the SQL analytics endpoint, the flow creates a *Direct Lake on SQL* semantic model.

In this section, you build a semantic model and a simple report over the same `dim_products` table.

The report view shows average product price by `category`, with each bar split by `subcategory`.

1. From the SQL analytics endpoint menu, select **New semantic model**.

   :::image type="content" source="./media/quickstart-consume-data/new-semantic-model.png" alt-text="A screenshot of the Fabric portal that shows creating a semantic model from the SQL analytics endpoint.":::

1. Enter a name for the semantic model, like `dim_products_model`. Select the `dim_products` table, and then select **Confirm**.
1. From the semantic model menu, select **New report**.

   :::image type="content" source="./media/quickstart-consume-data/new-report.png" alt-text="A screenshot of the Fabric portal that shows creating a report from the semantic model.":::

1. In the report authoring experience, expand the `dim_products` table in the **Data** pane.
1. In the **Visualizations** pane, select **Stacked column chart**.

   :::image type="content" source="./media/quickstart-consume-data/stacked-column-chart.png" alt-text="A screenshot of the Fabric portal that shows selecting the stacked column chart visual.":::

1. Drag `category` to **X-axis**.
1. Drag `standard_price` to **Y-axis**, then set the aggregation to **Average**.
1. Drag `subcategory` to **Legend** to split each category into subcategories.

   :::image type="content" source="./media/quickstart-consume-data/report-results.png" alt-text="A screenshot of the Fabric portal that shows the results of the report building steps.":::

1. On the ribbon, select **File** > **Save** and save the report to your workspace.

The report reads from the same Delta table in OneLake that you just queried with T-SQL. You didn't create a second copy of the data to power the report.

## Read the same table from a Spark notebook

Fabric notebooks give you a third engine over the same data. Spark reads the `dim_products` Delta table directly from OneLake, without going through the SQL analytics endpoint or the semantic model. This step shows that an engine with a completely different query stack works from the same underlying files.

1. Go back to the lakehouse that contains `dim_products`.
1. On the lakehouse menu, select **Analyze data with** > **Notebook** > **New notebook**. The notebook opens with your lakehouse already attached as the default lakehouse.
1. In the first code cell, paste the following PySpark code:

   This code uses `from_date` as a time dimension and summarizes product count and average price by period and category.

   ```python
   from pyspark.sql import functions as F

   df = spark.read.table("dim_products")

   summary = (
      df.groupBy("from_date", "category")
      .agg(
         F.count("*").alias("products"),
         F.round(F.avg("standard_price"), 2).alias("avg_price"),
      )
      .orderBy(F.col("from_date"), F.col("avg_price").desc())
   )

   display(summary)
   ```

1. Select **Run cell** (or press **Shift+Enter**) to run the cell. The output shows how average prices differ by category across effective dates.

   :::image type="content" source="./media/quickstart-consume-data/notebook-results.png" alt-text="A screenshot of the Fabric portal that shows the results of the notebook code.":::

Spark reads the Delta files in OneLake directly. No data is copied into a Spark-specific store, and the table you queried is the same one that backs your semantic model. You now have one copy of data in OneLake that three engines—the SQL analytics endpoint, Power BI Direct Lake, and Spark—use through open storage and an open table format, without moving or reformatting the data.

## Clean up resources

If you don't plan to continue using the semantic model, report, and notebook, delete them from your workspace:

1. In your workspace, hover over the semantic model that you created and select the more options (**...**) menu, then select **Delete**.
1. Repeat for the report and the notebook in your workspace.

Deleting the report, semantic model, or notebook doesn't affect the underlying lakehouse and `dim_products` table.

## Related content

- [What is OneLake?](onelake-overview.md)
- [How do I connect to OneLake?](onelake-access-api.md)
- [Quickstart: Get data into OneLake](quickstart-get-data.md)
- [Use Azure Databricks to access OneLake data](onelake-open-access-quickstart.md)