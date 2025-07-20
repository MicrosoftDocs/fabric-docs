---
title: Read data from semantic models and write data that semantic models can consume using Spark
description: Learn how to read from semantic models and write data that can be used in semantic models using Spark.
ms.author: scottpolly
author: s-polly
ms.reviewer: marcozo
reviewer: eisber
ms.topic: how-to
ms.custom:
ms.date: 03/22/2025
ms.search.form: Read write powerbi
---

# Read from semantic models and write data consumable by Power BI using Spark

In this article, you can learn how to read data and metadata and evaluate measures in semantic models using the semantic link Spark native connector in Microsoft Fabric.
You will also learn how to write data that semantic models can consume.

## Prerequisites

[!INCLUDE [prerequisites](includes/prerequisites.md)]
- Go to the Data Science experience in [!INCLUDE [product-name](../includes/product-name.md)].

    - From the left pane, select __Workloads__.
    - Select __Data Science__.

- Create [a new notebook](../data-engineering/how-to-use-notebook.md#create-notebooks) to copy/paste code into cells.
- [!INCLUDE [sempy-notebook-installation](includes/sempy-notebook-installation.md)]
- [Add a Lakehouse to your notebook](../data-engineering/how-to-use-notebook.md#connect-lakehouses-and-notebooks).
- Download the _Customer Profitability Sample.pbix_ semantic model from the [datasets folder](https://github.com/microsoft/fabric-samples/tree/main/docs-samples/data-science/datasets) of the fabric-samples repository, and save the semantic model locally.

## Upload the semantic model into your workspace

In this article, we use the _Customer Profitability Sample.pbix_ semantic model. This semantic model references a company manufacturing marketing materials and contains data about products, customers, and corresponding revenue for various business units.

1. From the left pane, select __Workspaces__ and then select the name of your [workspace](../fundamentals/workspaces.md) to open it.
1. Select __Import__ > __Report or Paginated Report__ > __From this computer__ and select the _Customer Profitability Sample.pbix_ semantic model.

:::image type="content" source="media/read-write-power-bi-spark/upload-power-bi-data-to-workspace.png" alt-text="Screenshot showing the interface for uploading a semantic model into the workspace." lightbox="media/read-write-power-bi-spark/upload-power-bi-data-to-workspace.png":::

Once the upload is done, your workspace has three new artifacts: a Power BI report, a dashboard, and a semantic model named _Customer Profitability Sample_. You use this semantic model for the steps in this article.

:::image type="content" source="media/read-write-power-bi-spark/uploaded-artifacts-in-workspace.png" alt-text="Screenshot showing the items from the Power BI file uploaded into the workspace." lightbox="media/read-write-power-bi-spark/uploaded-artifacts-in-workspace.png":::

## Read and write data, using Spark in Python, R, SQL, and Scala

By default, the workspace used to access semantic models is:

- the workspace of the attached [Lakehouse](../data-engineering/lakehouse-overview.md) or
- the workspace of the notebook, if no Lakehouse is attached.

Microsoft Fabric exposes all tables from all semantic models in the workspace as Spark tables.
All Spark SQL commands can be executed in Python, R, and Scala. The semantic link Spark native connector supports push-down of Spark predicates to the Power BI engine.

> [!TIP]
> Since Power BI tables and measures are exposed as regular Spark tables, they can be joined with other Spark data sources in a single query.

1. List tables of all semantic models in the workspace, using PySpark.

    ```python
    df = spark.sql("SHOW TABLES FROM pbi")
    display(df)
    ```

1. Retrieve the data from the *Customer* table in the *Customer Profitability Sample* semantic model, using SparkR.

    > [!NOTE]
    > Retrieving tables is subject to strict limitations (see [Read Limitations](#read-access-limitations)) and the results might be incomplete.
    > Use aggregate pushdown to reduce the amount of data transferred. The supported aggregates are: COUNT, SUM, AVG, MIN, and MAX.

    ```R
    %%sparkr
    
    df = sql("SELECT * FROM pbi.`Customer Profitability Sample`.Customer")
    display(df)
    ```

1. Power BI measures are available through the virtual table *_Metrics*. The following query computes the *total revenue* and *revenue budget* by *region* and *industry*.

    ```sql
    %%sql

    SELECT
        `Customer[Country/Region]`,
        `Industry[Industry]`,
        AVG(`Total Revenue`),
        AVG(`Revenue Budget`)
    FROM
        pbi.`Customer Profitability Sample`.`_Metrics`
    WHERE
        `Customer[State]` in ('CA', 'WA')
    GROUP BY
        `Customer[Country/Region]`,
        `Industry[Industry]`
    ```

1. Inspect available measures and dimensions, using Spark schema.

    ```python
    spark.table("pbi.`Customer Profitability Sample`._Metrics").printSchema()
    ```

1. Save the data as a delta table to your Lakehouse.

    ```python
    delta_table_path = "<your delta table path>" #fill in your delta table path 
    df.write.format("delta").mode("overwrite").save(delta_table_path)
    ```

## Read-access limitations

The read access APIs have the following limitations:
- Queries running longer than 10s in Analysis Service are not supported (Indication inside Spark: "java.net.SocketTimeoutException: PowerBI service comm failed ")
- Power BI table access using Spark SQL is subject to [Power BI backend limitations](/rest/api/power-bi/datasets/execute-queries#limitations).
- Predicate pushdown for Spark *_Metrics* queries is limited to a single [IN](https://spark.apache.org/docs/latest/api/sql/index.html#in) expression and requires at least two elements. Extra IN expressions and unsupported predicates are evaluated in Spark after data transfer.
- Predicate pushdown for Power BI tables accessed using Spark SQL doesn't support the following expressions:
  - [ISNULL](https://spark.apache.org/docs/latest/api/sql/index.html#isnull)
  - [IS_NOT_NULL](https://spark.apache.org/docs/latest/api/sql/index.html#isnotnull)
  - [STARTS_WITH](https://spark.apache.org/docs/latest/api/sql/index.html#startswith)
  - [ENDS_WITH](https://spark.apache.org/docs/latest/api/sql/index.html#endswith)
  - [CONTAINS](https://spark.apache.org/docs/latest/api/sql/index.html#contains).
- The Spark session must be restarted to make new semantic models accessible in Spark SQL.

## Related content

- [See `sempy.functions` to learn about usage of semantic functions](/python/api/semantic-link-sempy/sempy.functions)
- [Tutorial: Extract and calculate Power BI measures from a Jupyter notebook](tutorial-power-bi-measures.md)
- [Explore and validate relationships in semantic models](semantic-link-validate-relationship.md)
- [How to validate data with semantic link](semantic-link-validate-data.md)
