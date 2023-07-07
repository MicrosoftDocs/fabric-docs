---
title: Read data from Power BI datasets and write data that Power BI datasets can consume
description: Learn how to read from Power BI datasets and write data that can be used in Power BI datasets.
ms.reviewer: mopeakande
reviewer: msakande
ms.author: marcozo
author: eisber
ms.topic: how-to
ms.date: 06/06/2023
ms.search.form: Read write powerbi
---

# Read from Power BI datasets and write data consumable by Power BI

In this article, you'll learn how to read data and metadata and evaluate measures in Power BI datasets using the SemPy python library in Microsoft Fabric.
You'll also learn how to write data that Power BI datasets can consume.

[!INCLUDE [preview-note](../includes/preview-note.md)]

## Prerequisites

[!INCLUDE [prerequisites](includes/prerequisites.md)]
- Go to the Data Science experience in [!INCLUDE [product-name](../includes/product-name.md)].
- Create [a new notebook](../data-engineering/how-to-use-notebook.md#create-notebooks) to copy/paste code into cells.
- [Add a Lakehouse to your notebook](../data-engineering/how-to-use-notebook.md#connect-lakehouses-and-notebooks).

## Use python to read data from Power BI datasets

The SemPy Python API can retrieve data and metadata from Power BI datasets located in a Microsoft Fabric workspace and execute queries on them.
By default, the workspace used to access Power BI datasets is:

- the workspace of the attached [Lakehouse](/fabric/data-engineering/lakehouse-overview) or
- the workspace of the notebook, if no Lakehouse is attached.

To read data from Power BI datasets:

1. List the available Power BI datasets in the attached Lakehouse.

    ```python
    import sempy.fabric as fabric
    
    df_datasets = fabric.list_datasets()
    df_datasets
    ```

1. List the tables available in the _Customer Profitability Sample_ Power BI dataset.

    ```python
    df_tables = fabric.list_tables("Customer Profitability Sample", include_columns=True)
    df_tables
    ```

1. List the measures defined in the _Inventory Dataset_ Power BI dataset.
   > [!TIP]
   > In the following code, you can specify your workspace by replacing the workspace name `Logistics Workspace` with yours.

    ```python
    df_measures = fabric.list_measures("Customer Profitability Sample", workspace="Logistics Workspace")
    ```

    Now we've determined that the _Customer_ table is the table of interest.

1. Read the _Customer_ table from the _Customer Profitability Sample_ Power BI dataset.

    ```python
    df_table = fabric.read_table("Customer Profitability Sample", "Customer")
    df_table
    ```

1. Evaluate the _Total Revenue_ measure per customer's state and date.

    ```python
    df_measure = fabric.read_measure("Customer Profitability Sample",
                                     "Total Revenue",
                                     [("Customer", "State"), ("Calendar", "Date")])
    df_measure
    ```

1. You can also evaluate the _Total Revenue_ measure per customer's state and date by using a [DAX query](/dax/dax-queries).

    > [!NOTE]
    > Using the `read_dax` API is subject to more limitations (see [Read Limitations](#read-access-limitations)). For standard measure calculations, consider using the `read_measure` function and only revert to `read_dax` for advanced use cases.

    ```python
    df_dax = fabric.read_dax("Customer Profitability Sample",
                             """
                             EVALUATE SUMMARIZECOLUMNS(
                                 'State'[Region],
                                 'Calendar'[Date].[Year],
                                 'Calendar'[Date].[Month],
                                 "Total Revenue",
                                 CALCULATE([Total Revenue]))
                             """)
    ```

1. Alternatively, you can add measures to data retrieved from external sources. This approach combines three tasks: it resolves column names to Power BI dimensions, defines group by columns and filters the measure. Any column names that can't be resolved within the given dataset are ignored (see the supported [DAX syntax](/dax/dax-syntax-reference)).

    ```python
    df = FabricDataFrame({
            "Sales Agent": ["Agent 1", "Agent 1", "Agent 2"],
            "Customer[Country/Region]": ["US", "GB", "US"],
            "Industry[Industry]": ["Services", "CPG", "Manufacturing"],
        }
    )
    
    joined_df = df.add_measure("Total Revenue", dataset="Customer Profitability Sample")
    ```

## Read data, using Spark in Python, R, SQL, and Scala

As with the SemPy python API, by default, the workspace used to access Power BI datasets is:

- the workspace of the attached [Lakehouse](/fabric/data-engineering/lakehouse-overview) or
- the workspace of the notebook, if no Lakehouse is attached.

Microsoft Fabric exposes all tables from all Power BI datasets in the workspace as Spark tables.
All Spark SQL commands can be executed in Python, R and Scala. The Semantic Link Spark native connector supports push-down of Spark predicates to the Power BI engine.

> [!TIP]
> Since Power BI tables and measures are exposed as regular Spark tables, they can be joined with other Spark data sources in a single query.

1. List tables of all Power BI datasets in the workspace, using PySpark.

    ```sql
    df = spark.sql("SHOW TABLES FROM pbi")
    df
    ```

1. Retrieve the data from the *Customer* table in the *Customer Profitability Sample* Power BI dataset, using SparkR.

    > [!NOTE]
    > Retrieving tables is subject to strict limitations (see [Read Limitations](#read-access-limitations)) and the results might be incomplete.
    > Use aggregate pushdown to reduce the amount of data transferred. The supported aggregates are: COUNT, SUM, AVG, MIN, and MAX.

    ```R
    df = sql("SELECT * FROM pbi.`Customer Profitability Sample`.Customer")
    df
    ```

1. Power BI measures are available through the virtual table *_Metrics*. The following query computes the *total revenue* and *revenue budget* by *region* and *industry*.

    ```sql
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

## Read-access limitations

The read access APIs have the following limitations:

- SemPy `read_table`, SemPy `read_dax`, and Power BI table access using Spark SQL are subject to [Power BI backend limitations](/rest/api/power-bi/datasets/execute-queries#limitations).
- Predicate pushdown for Spark *_Metrics* queries is limited to a single [IN](https://spark.apache.org/docs/3.3.0/api/sql/index.html#in) expression. Extra IN expressions and unsupported predicates are evaluated in Spark after data transfer.
- Predicate pushdown for Power BI tables accessed using Spark SQL doesn't support the following expressions:
  - [ISNULL](https://spark.apache.org/docs/3.3.0/api/sql/#isnull)
  - [IS_NOT_NULL](https://spark.apache.org/docs/3.3.0/api/sql/#isnotnull)
  - [STARTS_WITH](https://spark.apache.org/docs/3.3.0/api/sql/#startswith)
  - [ENDS_WITH](https://spark.apache.org/docs/3.3.0/api/sql/#endswith)
  - [CONTAINS](https://spark.apache.org/docs/3.3.0/api/sql/#contains).
- The Spark session must be restarted to make new Power BI datasets accessible in Spark SQL.

## Write data consumable by Power BI datasets

Spark tables added to a Lakehouse are automatically added to the corresponding [default Power BI dataset](/fabric/data-warehouse/datasets).
This example demonstrates how to write data to the attached Lakehouse. The FabricDataFrame excepts the same input data as Pandas dataframes.

```python
from sempy.fabric import FabricDataFrame

df_forecast = FabricDataFrame({'ForecastedRevenue': [1, 2, 3]})

df_forecast.to_onelake("ForecastTable")
```

By using Power BI, the *ForecastTable* table can be added to a composite dataset using the Lakehouse dataset.


## Next steps
Learn how to use semantic information

- [Explore and validate relationships in Power BI datasets](semantic-link-validate-relationship.md)
- [How to validate data with Semantic Link](semantic-link-validate-data.md)