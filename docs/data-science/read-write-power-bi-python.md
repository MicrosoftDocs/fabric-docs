---
title: Read data from semantic models and write data that semantic models can consume using python
description: Learn how to read from semantic models and write data that can be used in semantic models.
ms.reviewer: mopeakande
reviewer: msakande
ms.author: marcozo, ruxu
author: eisber, ruixinxu
ms.topic: how-to
ms.custom:
  - ignite-2023
ms.date: 11/15/2023
ms.search.form: Read write powerbi
---

# Read from semantic models and write data consumable by Power BI using python

In this article, you'll learn how to read data and metadata and evaluate measures in semantic models using the SemPy python library in Microsoft Fabric.
You'll also learn how to write data that semantic models can consume.

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
    import sempy.fabric as fabric
    
    df_datasets = fabric.list_datasets()
    df_datasets
    ```

1. List the tables available in the _Customer Profitability Sample_ semantic model.

    ```python
    df_tables = fabric.list_tables("Customer Profitability Sample", include_columns=True)
    df_tables
    ```

1. List the measures defined in the _Customer Profitability Sample_ semantic model.
   > [!TIP]
   > In the following code, we've specified the workspace for SemPy to use for accessing the semantic model. You can replace `Your Workspace` with the name of the workspace where you uploaded the semantic model (from the [Upload the semantic model into your workspace](#upload-the-semantic-model-into-your-workspace) section).

    ```python
    df_measures = fabric.list_measures("Customer Profitability Sample", workspace="Your Workspace")
    df_measures
    ```

    Now we've determined that the _Customer_ table is the table of interest.

1. Read the _Customer_ table from the _Customer Profitability Sample_ semantic model.

    ```python
    df_table = fabric.read_table("Customer Profitability Sample", "Customer")
    df_table
    ```

    > [!NOTE]
    >- Data is retrieved using XMLA and therefore requires at least [XMLA read-only](/power-bi/enterprise/service-premium-connect-tools) to be enabled.
    >- The amount of data that's retrievable is limited by the [maximum memory per query](/power-bi/enterprise/service-premium-what-is#capacities-and-skus) of the capacity SKU hosting the semantic model and by the Spark driver node (see [node sizes](../data-engineering/spark-compute.md#node-sizes)) that's running the notebook.
    >- All requests use low priority to minimize the impact on Microsoft Azure Analysis Services performance and are billed as [interactive requests](/power-bi/enterprise/service-premium-interactive-background-operations).

2. Evaluate the _Total Revenue_ measure per customer's state and date.

    ```python
    df_measure = fabric.evaluate_measure(
        "Customer Profitability Sample",
        "Total Revenue",
        ["'Customer'[State]", "Calendar[Date]"])
    df_measure
    ```

    > [!NOTE]
    >- By default, data is **not** retrieved using XMLA and therefore doesn't require XMLA read-only to be enabled.
    >- Furthermore, the data is **not** subject to [Power BI backend limitations](/rest/api/power-bi/datasets/execute-queries#limitations).
    >- The amount of data that's retrievable is limited by the [maximum memory per query](/power-bi/enterprise/service-premium-what-is#capacities-and-skus) of the capacity SKU hosting the semantic model and by the Spark driver node (see [node sizes](../data-engineering/spark-compute.md#node-sizes)) that's running the notebook.
    >- All requests are billed as [interactive requests](/power-bi/enterprise/service-premium-interactive-background-operations).

3. You can add filters to the measure calculation by specifying a list of values that can be in a particular column.

    ```python
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
    >- Data is retrieved using XMLA and therefore requires at least [XMLA read-only](/power-bi/enterprise/service-premium-connect-tools) to be enabled.
    >- The amount of data retrievable is limited by the available memory in Microsoft Azure Analysis Services and the Spark driver node (see [node sizes](/power-bi/enterprise/service-premium-connect-tools)).
    >- All requests use low priority to minimize the impact on Analysis Services performance and are billed as interactive requests.
    
2. You can evaluate the same DAX query without the need to import the library, by using the `%%dax` cell magic. Let's run the cell below to load `%%dax` cell magic.

   ```
   %load_ext sempy
   ```

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
    from sempy.fabric import FabricDataFrame
    
    df = FabricDataFrame({
            "Sales Agent": ["Agent 1", "Agent 1", "Agent 2"],
            "Customer[Country/Region]": ["US", "GB", "US"],
            "Industry[Industry]": ["Services", "CPG", "Manufacturing"],
        }
    )
    
    joined_df = df.add_measure("Total Revenue", dataset="Customer Profitability Sample")
    joined_df
    ``````

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
- [Tutorial: Extract and calculate Power BI measures from a Jupyter notebook](tutorial-power-bi-measures.md)
- [Explore and validate relationships in semantic models](semantic-link-validate-relationship.md)
- [How to validate data with semantic link](semantic-link-validate-data.md)
