---
title: Read and write data to and from Power BI
description: Learn how to use read and write data from and to Power BI in the Data Science workload.
ms.reviewer: larryfr
ms.author: marcozo
author: eisber
ms.topic: how-to
ms.date: 05/04/2023
ms.search.form: Read write powerbi
---

# How to read and write data from and to Power BI Datasets

[!INCLUDE [preview-note](../includes/preview-note.md)]

Learn how to read data in tables and calculate measure in Power BI datasets in the Data Science workload.

## Read using Python

The Python API can retrieve metadata, data and execute queries from Power BI datasets. The workspace defaults to

- the workspace of the attached lakehouse or
- the workspace of the notebook if no lakehouse is attached

Retrieve metadata for datasets, tables and measures from Power BI.

```python
import sempy.powerbi as pbi

df_dataset  = pbi.list_datasets()
df_tables   = pbi.list_tables("Sales Dataset", include_columns=True)
df_measures = pbi.list_measures("Inventory Dataset", workspace="Logistics Workspace")
```

Read data from a table, read a measure and execute a DAX query.

```python
df_table   = pbi.read_table("Sales Dataset", "Customer")

df_measure = pbi.read_measure("Sales Dataset",
                              "Total Revenue",
                              [("Customer", "State"), ("Calendar", "Date")]

df_dax     = pbi.read_dax("Sales Dataset",
                          """
                          EVALUATE SUMMARIZECOLUMNS(
                              'State'[Region],
                              'Calendar'[Date].[Year],
                              'Calendar'[Date].[Month],
                              "Total Revenue",
                              CALCULATE([Total Revenue]))
                          """)
```

TODO: include limitations

## Read using Spark

All tables from all Power BI datasets in the workspace of the attached lakehouse or the notebook if no lakehouse is attached are exposed as Spark tables. All Spark SQL commands can be executed in Python, R and Scala.
The PowerBI/Spark connector supports to push-down of Spark predicates to the Power BI engine.

> [!TIP]
> Since PowerBI tables and measures are exposed as regular Spark tables, they can be joined with other Spark datasources in a single query.

A list of tables of all Power BI datasets can be shown in PySpark using

```sql
df = spark.sql("SHOW TABLES FROM pbi")
df
```

To retrieve the data from the *Customer* table in the *Sales Dataset* using SparkR:

```R
df = sql("SELECT * FROM pbi.`Sales Dataset`.Customer")
```

Power BI measures are available through the virtual table *_Metrics*. The following query computes the *total revenue* and *revenue budget* by *region* and *industry*.

```sql
SELECT
    `Customer[Country/Region]`,
    `Industry[Industry]`,
    AVG(`Total Revenue`),
    AVG(`Revenue Budget`)
FROM
    pbi.`Sales Dataset`.`_Metrics`
WHERE
    `Customer[State]` in ('CA', 'WA')
GROUP BY
    `Customer[Country/Region]`,
    `Industry[Industry]`
    """)
```

Available measures and dimensions can be inspected using Spark schema.

```python
spark.table("pbi.`Sales Dataset`._Metrics").printSchema()
```

## Read Limitations

The read access APIs have the following limitations:

- SemPy read_table, SemPy read_dax and Power BI table access using Spark SQL are subject to [Power BI backend limitations](https://learn.microsoft.com/en-us/rest/api/power-bi/datasets/execute-queries#limitations).
- Predicate pushdown for Spark *_Metrics* queries is limited to a single [IN](https://spark.apache.org/docs/3.3.0/api/sql/index.html#in) expression. Extra [IN](https://spark.apache.org/docs/3.3.0/api/sql/index.html#in) expressions and unsupported predicates are evaluated in Spark after data transfer.
- Predicate pushdown for Power BI tables accessed using Spark SQL doesn't support
  - [ISNULL](https://spark.apache.org/docs/3.3.0/api/sql/#isnull)
  - [IS_NOT_NULL](https://spark.apache.org/docs/3.3.0/api/sql/#isnotnull)
  - [STARTS_WITH](https://spark.apache.org/docs/3.3.0/api/sql/#startswith)
  - [ENDS_WITH](https://spark.apache.org/docs/3.3.0/api/sql/#endswith)
  - [CONTAINS](https://spark.apache.org/docs/3.3.0/api/sql/#contains).
- Spark session must be restarted to make new Power BI datasets accessible in Spark SQL.

## How to write data consumable by Power BI Datasets

Spark tables added to a Lakehouse are automatically added to corresponding default Power BI dataset.
This example demonstrates how to convert a Pandas dataframe to a Spark dataframe and write it to the attached Lakehouse.

```python
import pandas as pd

df_pandas = pd.DataFrame({'a': [1, 2, 3]})
df_spark  = spark.createDataFrame(df_pandas)

df_spark.write.format("delta").saveAsTable("ForecastTable")
```

Using Power BI the table *ForecastTable* can be added to a composite dataset using the Lakehouse dataset.

