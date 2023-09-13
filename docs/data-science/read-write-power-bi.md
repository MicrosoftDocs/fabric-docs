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
- [!INCLUDE [sempy-notebook-installation](includes/sempy-notebook-installation.md)]
- [Add a Lakehouse to your notebook](../data-engineering/how-to-use-notebook.md#connect-lakehouses-and-notebooks).
- Download the _Customer Profitability Sample.pbix_ Power BI dataset from the [datasets folder](https://github.com/microsoft/fabric-samples/tree/main/docs-samples/data-science/datasets) of the fabric-samples repository, and save the dataset locally.

## Upload the dataset into your workspace

In this article, we use the _Customer Profitability Sample.pbix_ Power BI dataset. This dataset references a company manufacturing marketing materials and contains data about products, customers, and corresponding revenue for various business units.

1. Open your [workspace](/fabric/get-started/workspaces) in Fabric Data Science.
1. Select **Upload > Browse** and select the _Customer Profitability Sample.pbix_ dataset.

:::image type="content" source="media/read-write-power-bi/upload-power-bi-data-to workspace.png" alt-text="Screenshot showing the interface for uploading a dataset into the workspace." lightbox="media/read-write-power-bi/upload-power-bi-data-to workspace.png":::

Once the upload is done, your workspace will have three new artifacts: a Power BI report, a dashboard, and a dataset named _Customer Profitability Sample_. You'll use this dataset for the steps in this article.

:::image type="content" source="media/read-write-power-bi/uploaded-artifacts-in-workspace.png" alt-text="Screenshot showing the items from the Power BI file uploaded into the workspace." lightbox="media/read-write-power-bi/uploaded-artifacts-in-workspace.png":::

## Use Python to read data from Power BI datasets

The SemPy Python API can retrieve data and metadata from Power BI datasets located in a Microsoft Fabric workspace and execute queries on them.

[!INCLUDE [sempy-default-workspace](includes/sempy-default-workspace.md)]

To read data from Power BI datasets:

1. List the available Power BI datasets in your workspace.

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

1. List the measures defined in the _Customer Profitability Sample_ Power BI dataset.
   > [!TIP]
   > In the following code, we've specified the workspace for SemPy to use for accessing the dataset. You can replace `Your Workspace` with the name of the workspace where you uploaded the dataset (from the [Upload the dataset into your workspace](#upload-the-dataset-into-your-workspace) section).

    ```python
    df_measures = fabric.list_measures("Customer Profitability Sample", workspace="Your Workspace")
    ```

    Now we've determined that the _Customer_ table is the table of interest.

1. Read the _Customer_ table from the _Customer Profitability Sample_ Power BI dataset.

    ```python
    df_table = fabric.read_table("Customer Profitability Sample", "Customer")
    df_table
    ```

1. Evaluate the _Total Revenue_ measure per customer's state and date.

    ```python
    df_measure = fabric.evaluate_measure(
        "Customer Profitability Sample",
        "Total Revenue",
        [("Customer", "State"), ("Calendar", "Date")])
    df_measure
    ```

1. You can also add filters to the measure calculation by specifying a list of values that a certain column should be in. 

    ```python
    filters = {
        ('State', 'Region'):    ["East", "Central"],
        ('State', 'State'):     ["FLORIDA", "NEW YORK"]
    }
    df_measure = fabric.evaluate_measure(
        "Customer Profitability Sample",
        "Total Revenue",
        [("Customer", "State"), ("Calendar", "Date")],
        filters=filters)
    df_measure
    ```

1. You can also evaluate the _Total Revenue_ measure per customer's state and date by using a [DAX query](/dax/dax-queries).

    ```python
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

1. Alternatively, you can add measures to data retrieved from external sources. This approach combines three tasks: it resolves column names to Power BI dimensions, defines group by columns and filters the measure. Any column names that can't be resolved within the given dataset are ignored (see the supported [DAX syntax](/dax/dax-syntax-reference)).

    ```python
    from sempy.fabric import FabricDataFrame
    
    df = FabricDataFrame({
            "Sales Agent": ["Agent 1", "Agent 1", "Agent 2"],
            "Customer[Country/Region]": ["US", "GB", "US"],
            "Industry[Industry]": ["Services", "CPG", "Manufacturing"],
        }
    )
    
    joined_df = df.add_measure("Total Revenue", dataset="Customer Profitability Sample")
    ```

## Special parameters

The SemPy `read_table` and `evaluate_measure` methods have more parameters that are useful for manipulating the output. These parameters include:

- `fully_qualified_columns`: If the value is "True", the methods return columns names in the form `TableName[ColumnName]`.
- `num_rows`: Number of rows to output in the result.
- `pandas_convert_dtypes`: If the value is "True", the resulting DataFrame's columns are cast to the best possible _dtype_, using pandas
[convert_dtypes](https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.DataFrame.convert_dtypes.html).
If this parameter is turned off, type incompatibility issues may result between columns of related tables that may not have been detected in the Power BI model due to
[DAX implicit type conversion](/power-bi/connect-data/desktop-data-types#implicit-and-explicit-data-type-conversion).

SemPy `read_table` also leverages the model information provided by Power BI.

 - `multiindex_hierarchies`: If True, converts [Power BI Hierarchies](/power-bi/create-reports/service-metrics-get-started-hierarchies) to pandas MultiIndex structure.


## Write data consumable by Power BI datasets

Spark tables added to a Lakehouse are automatically added to the corresponding [default Power BI dataset](/fabric/data-warehouse/datasets).
This example demonstrates how to write data to the attached Lakehouse. The FabricDataFrame accepts the same input data as Pandas dataframes.

```python
from sempy.fabric import FabricDataFrame

df_forecast = FabricDataFrame({'ForecastedRevenue': [1, 2, 3]})

df_forecast.to_onelake("ForecastTable")
```

By using Power BI, the *ForecastTable* table can be added to a composite dataset using the Lakehouse dataset.


## Next steps

- [See `sempy.functions` to learn about usage of semantic functions](/python/api/semantic-link-sempy/sempy.functions)
- [Explore and validate relationships in Power BI datasets](semantic-link-validate-relationship.md)
- [How to validate data with Semantic Link](semantic-link-validate-data.md)