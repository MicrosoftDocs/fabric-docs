---
title: Read data from semantic models and write data that semantic models can consume
description: Learn how to read from semantic models and write data that can be used in semantic models.
ms.reviewer: mopeakande
reviewer: msakande
ms.author: marcozo
author: eisber
ms.topic: how-to
ms.custom:
  - ignite-2023
ms.date: 11/15/2023
ms.search.form: Read write powerbi
---

# Read from semantic models and write data consumable by Power BI

In this article, you'll learn how to read data and metadata and evaluate measures in semantic models using the SemPy python library in Microsoft Fabric.
You'll also learn how to write data that semantic models can consume.

[!INCLUDE [feature-preview](../includes/feature-preview-note.md)]

## Prerequisites

[!INCLUDE [prerequisites](includes/prerequisites.md)]
- Go to the Data Science experience in [!INCLUDE [product-name](../includes/product-name.md)].
- Create [a new notebook](../data-engineering/how-to-use-notebook.md#create-notebooks) to copy/paste code into cells.
- [!INCLUDE [sempy-notebook-installation](includes/sempy-notebook-installation.md)]
- [Add a Lakehouse to your notebook](../data-engineering/how-to-use-notebook.md#connect-lakehouses-and-notebooks).
- Download the _Customer Profitability Sample.pbix_ semantic model from the [datasets folder](https://github.com/microsoft/fabric-samples/tree/main/docs-samples/data-science/datasets) of the fabric-samples repository, and save the semantic model locally.

## Upload the semantic model into your workspace

In this article, we use the _Customer Profitability Sample.pbix_ semantic model. This semantic model references a company manufacturing marketing materials and contains data about products, customers, and corresponding revenue for various business units.

1. Open your [workspace](../get-started/workspaces.md) in Fabric Data Science.
1. Select **Upload > Browse** and select the _Customer Profitability Sample.pbix_ semantic model.

:::image type="content" source="media/read-write-power-bi/upload-power-bi-data-to workspace.png" alt-text="Screenshot showing the interface for uploading a semantic model into the workspace." lightbox="media/read-write-power-bi/upload-power-bi-data-to workspace.png":::

Once the upload is done, your workspace will have three new artifacts: a Power BI report, a dashboard, and a semantic model named _Customer Profitability Sample_. You'll use this semantic model for the steps in this article.

:::image type="content" source="media/read-write-power-bi/uploaded-artifacts-in-workspace.png" alt-text="Screenshot showing the items from the Power BI file uploaded into the workspace." lightbox="media/read-write-power-bi/uploaded-artifacts-in-workspace.png":::

## Use Python to read data from semantic models

The SemPy Python API can retrieve data and metadata from semantic models located in a Microsoft Fabric workspace and execute queries on them.

[!INCLUDE [sempy-default-workspace](includes/sempy-default-workspace.md)]

To read data from semantic models:

1. List the available semantic models in your workspace.

    ```python
    # %pip and import only needs to be done once per notebook
    %pip install semantic-link
    import sempy.fabric as fabric
    
    df_datasets = fabric.list_datasets()
    df_datasets
    ```

1. List the tables available in the _Customer Profitability Sample_ semantic model.

    ```python
    # %pip and import only needs to be done once per notebook
    %pip install semantic-link
    import sempy.fabric as fabric

    df_tables = fabric.list_tables("Customer Profitability Sample", include_columns=True)
    df_tables
    ```

1. List the measures defined in the _Customer Profitability Sample_ semantic model.
   > [!TIP]
   > In the following code, we've specified the workspace for SemPy to use for accessing the semantic model. You can replace `Your Workspace` with the name of the workspace where you uploaded the semantic model (from the [Upload the semantic model into your workspace](#upload-the-semantic model-into-your-workspace) section).

    ```python
    # %pip and import only needs to be done once per notebook
    %pip install semantic-link
    import sempy.fabric as fabric

    df_measures = fabric.list_measures("Customer Profitability Sample", workspace="Your Workspace")
    ```

    Now we've determined that the _Customer_ table is the table of interest.

1. Read the _Customer_ table from the _Customer Profitability Sample_ semantic model.

    ```python
    # %pip and import only needs to be done once per notebook
    %pip install semantic-link
    import sempy.fabric as fabric

    df_table = fabric.read_table("Customer Profitability Sample", "Customer")
    df_table
    ```

    > [!NOTE]
    > Data is retrieved using XMLA and therefore requires at least [XMLA read-only](/power-bi/enterprise/service-premium-connect-tools) to be enabled.
    > The amount of data that's retrievable is limited by the [maximum memory per query](/power-bi/enterprise/service-premium-what-is#capacities-and-skus) of the capacity SKU hosting the semantic model and by the Spark driver node (see [node sizes](../data-engineering/spark-compute.md#node-sizes)) that's running the notebook.
    > All requests use low priority to minimize the impact on Microsoft Azure Analysis Services performance and are billed as [interactive requests](/power-bi/enterprise/service-premium-interactive-background-operations).

2. Evaluate the _Total Revenue_ measure per customer's state and date.

    ```python
    # %pip and import only needs to be done once per notebook
    %pip install semantic-link
    import sempy.fabric as fabric

    df_measure = fabric.evaluate_measure(
        "Customer Profitability Sample",
        "Total Revenue",
        ["'Customer'[State]", "Calendar[Date]"])
    df_measure
    ```

    > [!NOTE]
    > By default, data is **not** retrieved using XMLA and therefore doesn't require XMLA read-only to be enabled.
    >Furthermore, the data is **not** subject to [Power BI backend limitations](/rest/api/power-bi/datasets/execute-queries#limitations).
    > The amount of data that's retrievable is limited by the [maximum memory per query](/power-bi/enterprise/service-premium-what-is#capacities-and-skus) of the capacity SKU hosting the semantic model and by the Spark driver node (see [node sizes](../data-engineering/spark-compute.md#node-sizes)) that's running the notebook.
    > All requests are billed as [interactive requests](/power-bi/enterprise/service-premium-interactive-background-operations).

3. You can add filters to the measure calculation by specifying a list of values that can be in a particular column.

    ```python
    # %pip and import only needs to be done once per notebook
    %pip install semantic-link
    import sempy.fabric as fabric

    filters = {
        "State[Region]": ["East", "Central"],
        "State[State]": ["FLORIDA", "NEW YORK"]
    }
    df_measure = fabric.evaluate_measure(
        "Customer Profitability Sample",
        "Total Revenue",
        ["Customer[State]", "Calendar[Date]"],
        filters=filters)
    df_measure
    ```

4. You can also evaluate the _Total Revenue_ measure per customer's state and date by using a [DAX query](/dax/dax-queries).

    ```python
    # %pip and import only needs to be done once per notebook
    %pip install semantic-link
    import sempy.fabric as fabric

    df_dax = fabric.evaluate_dax(
        "Customer Profitability Sample",
        """
        EVALUATE SUMMARIZECOLUMNS(
            'State'[Region],
            'Calendar'[Date].[Year],
            'Calendar'[Date].[Month],
            "Total Revenue",
            CALCULATE([Total Revenue]))
        """)
    ```

    > [!NOTE]
    > Data is retrieved using XMLA and therefore requires at least [XMLA read-only](/power-bi/enterprise/service-premium-connect-tools) to be enabled.
    > The amount of data retrievable is limited by the available memory in Microsoft Azure Analysis Services and the Spark driver node (see [node sizes](/power-bi/enterprise/service-premium-connect-tools)).
    > All requests use low priority to minimize the impact on Analysis Services performance and are billed as interactive requests.
    
2. You can evaluate the same DAX query without the need to import the library, by using the `%%dax` cell magic.
   The workspace parameter is optional and follows the same rules as the workspace parameter of the `evaluate_dax` function.
   The cell magic also supports accessing Python variables using the `{variable_name}` syntax.
   To use a curly brace in the DAX query, escape it with another curly brace (e.g. `EVALUATE {{1}}`).

    ```dax
    %%dax "Customer Profitability Sample" -w "Your Workspace"
    EVALUATE SUMMARIZECOLUMNS(
        'State'[Region],
        'Calendar'[Date].[Year],
        'Calendar'[Date].[Month],
        "Total Revenue",
        CALCULATE([Total Revenue]))
    ```

    The resulting FabricDataFrame is available via the `_` variable, which captures the output of the last executed cell.

    ```python
    df_dax = _

    df_dax.head()
    ``````

1. Alternatively, you can add measures to data retrieved from external sources. This approach combines three tasks: it resolves column names to Power BI dimensions, defines group by columns and filters the measure. Any column names that can't be resolved within the given semantic model are ignored (see the supported [DAX syntax](/dax/dax-syntax-reference)).

    ```python
    # %pip and import only needs to be done once per notebook
    %pip install semantic-link
    from sempy.fabric import FabricDataFrame
    
    df = FabricDataFrame({
            "Sales Agent": ["Agent 1", "Agent 1", "Agent 2"],
            "Customer[Country/Region]": ["US", "GB", "US"],
            "Industry[Industry]": ["Services", "CPG", "Manufacturing"],
        }
    )
    
    joined_df = df.add_measure("Total Revenue", dataset="Customer Profitability Sample")
    ```

## Read data, using Spark in Python, R, SQL, and Scala

As with the SemPy python API, by default, the workspace used to access semantic models is:

- the workspace of the attached [Lakehouse](../data-engineering/lakehouse-overview.md) or
- the workspace of the notebook, if no Lakehouse is attached.

Microsoft Fabric exposes all tables from all semantic models in the workspace as Spark tables.
All Spark SQL commands can be executed in Python, R, and Scala. The semantic link (preview) Spark native connector supports push-down of Spark predicates to the Power BI engine.

> [!TIP]
> Since Power BI tables and measures are exposed as regular Spark tables, they can be joined with other Spark data sources in a single query.

1. Configure Spark to use the Power BI Spark native connector:

    ```Python
    spark.conf.set("spark.sql.catalog.pbi", "com.microsoft.azure.synapse.ml.powerbi.PowerBICatalog")

    # Optionally, configure the workspace ID for the Power BI catalog
    # spark.conf.set("spark.sql.catalog.pbi.workspace", "212598c9-a3bf-441e-a6f2-2034281e7f18")
    ```

   > [!TIP]
   > The semantic link (preview) Spark native connector is pre-installed on Fabric and does **not** require that you install the `SemPy` Python library.
   > You can configure multiple Power BI workspaces by adding multiple catalog entries (e.g. spark.sql.catalog.my_pbi).

1. List tables of all semantic models in the workspace, using PySpark.

    ```python
    df = spark.sql("SHOW TABLES FROM pbi")
    df
    ```

1. Retrieve the data from the *Customer* table in the *Customer Profitability Sample* semantic model, using SparkR.

    > [!NOTE]
    > Retrieving tables is subject to strict limitations (see [Read Limitations](#read-access-limitations)) and the results might be incomplete.
    > Use aggregate pushdown to reduce the amount of data transferred. The supported aggregates are: COUNT, SUM, AVG, MIN, and MAX.

    ```R
    %%sparkr
    
    df = sql("SELECT * FROM pbi.`Customer Profitability Sample`.Customer")
    df
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

## Special parameters

The SemPy `read_table` and `evaluate_measure` methods have more parameters that are useful for manipulating the output. These parameters include:

- `fully_qualified_columns`: If the value is "True", the methods return columns names in the form `TableName[ColumnName]`.
- `num_rows`: Number of rows to output in the result.
- `pandas_convert_dtypes`: If the value is "True", the resulting DataFrame's columns are cast to the best possible _dtype_, using pandas
[convert_dtypes](https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.DataFrame.convert_dtypes.html).
If this parameter is turned off, type incompatibility issues can result between columns of related tables that might not have been detected in the Power BI model due to
[DAX implicit type conversion](/power-bi/connect-data/desktop-data-types#implicit-and-explicit-data-type-conversion).

SemPy `read_table` also uses the model information provided by Power BI.

- `multiindex_hierarchies`: If True, converts [Power BI Hierarchies](/power-bi/create-reports/service-metrics-get-started-hierarchies) to pandas MultiIndex structure.

## Read-access limitations

The read access APIs have the following limitations:

- Power BI table access using Spark SQL is subject to [Power BI backend limitations](/rest/api/power-bi/datasets/execute-queries#limitations).
- Predicate pushdown for Spark *_Metrics* queries is limited to a single [IN](https://spark.apache.org/docs/3.3.0/api/sql/index.html#in) expression. Extra IN expressions and unsupported predicates are evaluated in Spark after data transfer.
- Predicate pushdown for Power BI tables accessed using Spark SQL doesn't support the following expressions:
  - [ISNULL](https://spark.apache.org/docs/3.3.0/api/sql/#isnull)
  - [IS_NOT_NULL](https://spark.apache.org/docs/3.3.0/api/sql/#isnotnull)
  - [STARTS_WITH](https://spark.apache.org/docs/3.3.0/api/sql/#startswith)
  - [ENDS_WITH](https://spark.apache.org/docs/3.3.0/api/sql/#endswith)
  - [CONTAINS](https://spark.apache.org/docs/3.3.0/api/sql/#contains).
- The Spark session must be restarted to make new semantic models accessible in Spark SQL.

## Write data consumable by semantic models

Spark tables added to a Lakehouse are automatically added to the corresponding [default semantic model](../data-warehouse/semantic-models.md).
This example demonstrates how to write data to the attached Lakehouse. The FabricDataFrame accepts the same input data as Pandas dataframes.

```python
from sempy.fabric import FabricDataFrame

df_forecast = FabricDataFrame({'ForecastedRevenue': [1, 2, 3]})

df_forecast.to_lakehouse_table("ForecastTable")
```

By using Power BI, the *ForecastTable* table can be added to a composite semantic model using the Lakehouse semantic model.

## Related content

- [See `sempy.functions` to learn about usage of semantic functions](/python/api/semantic-link-sempy/sempy.functions)
- [Tutorial: Extract and calculate Power BI measures from a Jupyter notebook (preview)](tutorial-power-bi-measures.md)
- [Explore and validate relationships in semantic models (preview)](semantic-link-validate-relationship.md)
- [How to validate data with semantic link (preview)](semantic-link-validate-data.md)
