---
title: Read data from semantic models and write data that semantic models can consume using python
description: Learn how to read data, metadata, and evaluate measures from semantic models using Python's SemPy library in Microsoft Fabric. 
#customer intent: As a data scientist, I want to read data from semantic models using Python so that I can analyze and manipulate the data programmatically.
ms.author: scottpolly
author: s-polly
ms.reviewer: marcozo
reviewer: eisber
ms.topic: how-to
ms.custom:
ms.date: 09/25/2025
ms.search.form: Read write powerbi
---


# Read from semantic models and write data consumable by Power BI using Python

In this article, you learn to read data, metadata, and evaluate measures in semantic models using the SemPy Python library in Microsoft Fabric. You also learn to write data that semantic models can consume.

## Prerequisites

[!INCLUDE [prerequisites](includes/prerequisites.md)]
- Go to the Data Science experience in [!INCLUDE [product-name](../includes/product-name.md)].
- Create [a new notebook](../data-engineering/how-to-use-notebook.md#create-notebooks) to copy and paste code into cells.
- [!INCLUDE [sempy-notebook-installation](includes/sempy-notebook-installation.md)]
- [Add a Lakehouse to your notebook](../data-engineering/how-to-use-notebook.md#connect-lakehouses-and-notebooks)
- Download the _Customer Profitability Sample.pbix_ semantic model from the [datasets folder](https://github.com/microsoft/fabric-samples/tree/main/docs-samples/data-science/datasets) of the fabric-samples repository and save it locally.

## Upload the semantic model into your workspace

This article uses the _Customer Profitability Sample.pbix_ semantic model. The semantic model references a company that manufactures marketing materials. It includes product, customer, and revenue data for different business units.

1. Open your [workspace](../fundamentals/workspaces.md) in Fabric Data Science.
1. Select **Import > Report, Paginated Report, or Workbook > From this computer**, and select the _Customer Profitability Sample.pbix_ semantic model.

:::image type="content" source="media/read-write-power-bi-python/upload-power-bi-data-to-workspace.png" alt-text="Screenshot of the interface for uploading a semantic model into the workspace." lightbox="media/read-write-power-bi-python/upload-power-bi-data-to-workspace.png":::

After the upload is complete, your workspace includes three new artifacts: a Power BI report, a dashboard, and a semantic model named _Customer Profitability Sample_. The steps in this article rely on this semantic model.

:::image type="content" source="media/read-write-power-bi-python/uploaded-artifacts-in-workspace.png" alt-text="Screenshot of the items from the Power BI file uploaded into the workspace." lightbox="media/read-write-power-bi-python/uploaded-artifacts-in-workspace.png":::

## Use Python to read data from semantic models

The SemPy Python API can retrieve data and metadata from semantic models located in a Microsoft Fabric workspace. The API can also execute queries on them.

[!INCLUDE [sempy-default-workspace](includes/sempy-default-workspace.md)]

To read data from semantic models, follow these steps:

1. List the available semantic models in your workspace.

    ```python
    import sempy.fabric as fabric
    
    df_datasets = fabric.list_datasets()
    df_datasets
    ```

1. List the tables available in the *Customer Profitability Sample* semantic model.

    ```python
    df_tables = fabric.list_tables("Customer Profitability Sample", include_columns=True)
    df_tables
    ```

1. List the measures defined in the *Customer Profitability Sample* semantic model.

   > [!TIP]
   > In the following code sample, we specified the workspace for SemPy to use for accessing the semantic model. You can replace `<Your Workspace>` with the name of the workspace where you uploaded the semantic model (from the [Upload the semantic model into your workspace](#upload-the-semantic-model-into-your-workspace) section).

    ```python
    df_measures = fabric.list_measures("Customer Profitability Sample", workspace="<Your Workspace>")
    df_measures
    ```

    Here, we determined that the _Customer_ table is the table of interest.

1. Read the _Customer_ table from the _Customer Profitability Sample_ semantic model.

    ```python
    df_table = fabric.read_table("Customer Profitability Sample", "Customer")
    df_table
    ```

    > [!NOTE]
    >- Data is retrieved using XMLA, which requires at least [XMLA read-only](/power-bi/enterprise/service-premium-connect-tools) to be enabled.
    >- The amount of retrievable data is limited by:
       - The [maximum memory per query](/power-bi/enterprise/service-premium-what-is#capacities-and-skus) of the capacity SKU that hosts the semantic model.
       - The Spark driver node (visit [node sizes](../data-engineering/spark-compute.md#node-sizes) for more information) that runs the notebook.
    >- All requests use low priority to minimize the impact on Microsoft Azure Analysis Services performance and are billed as [interactive requests](../enterprise/fabric-operations.md#interactive-operations).

1. Evaluate the *Total Revenue* measure for the state and date of each customer.

    ```python
    df_measure = fabric.evaluate_measure(
        "Customer Profitability Sample",
        "Total Revenue",
        ["'Customer'[State]", "Calendar[Date]"])
    df_measure
    ```

    > [!NOTE]
    >- By default, data is **not** retrieved using XMLA, so XMLA read-only doesn't need to be enabled.
    >- The data isn't subject to [Power BI backend limitations](/rest/api/power-bi/datasets/execute-queries#limitations).
    >- The amount of retrievable data is limited by:
       - The [maximum memory per query](/power-bi/enterprise/service-premium-what-is#capacities-and-skus) of the capacity SKU hosting the semantic model.
       - The Spark driver node (visit [node sizes](../data-engineering/spark-compute.md#node-sizes) for more information) that runs the notebook.
    >- All requests are billed as [interactive requests](../enterprise/fabric-operations.md#interactive-operations).
    >- The `evaluate_dax` function doesn't auto-refresh the semantic model. Visit [this page](/power-bi/connect-data/refresh-data) for more details.

1. To add filters to the measure calculation, specify a list of permissible values for a particular column.

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

1. Evaluate the *Total Revenue* measure per customer's state and date with a [DAX query](/dax/dax-queries).

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
    >- Data is retrieved using XMLA and therefore requires at least [XMLA read-only](/power-bi/enterprise/service-premium-connect-tools) to be enabled
    >- The amount of retrievable data is limited by the available memory in Microsoft Azure Analysis Services and the Spark driver node (visit [node sizes](/power-bi/enterprise/service-premium-connect-tools) for more information)
    >- All requests use low priority to minimize the impact on Analysis Services performance and are billed as interactive requests
    
1. Use the `%%dax` cell magic to evaluate the same DAX query, without the need to import the library. Run this cell to load `%%dax` cell magic:

   ```
   %load_ext sempy
   ```

   The workspace parameter is optional. It follows the same rules as the workspace parameter of the `evaluate_dax` function.

   The cell magic also supports access of Python variables with the `{variable_name}` syntax.
   To use a curly brace in the DAX query, escape it with another curly brace (example: `EVALUATE {{1}}`).

    ```dax
    %%dax "Customer Profitability Sample" -w "<Your Workspace>"
    EVALUATE SUMMARIZECOLUMNS(
        'State'[Region],
        'Calendar'[Date].[Year],
        'Calendar'[Date].[Month],
        "Total Revenue",
        CALCULATE([Total Revenue]))
    ```

    The resulting FabricDataFrame is available via the `_` variable. That variable captures the output of the last executed cell.

    ```python
    df_dax = _

    df_dax.head()
    ``````

1. You can add measures to data retrieved from external sources. This approach combines three tasks:
   - It resolves column names to Power BI dimensions
   - It defines group by columns
   - It filters the measure
   Any column names that can't be resolved within the given semantic model are ignored (visit the supported [DAX syntax](/dax/dax-syntax-reference) resource for more information).

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

- `pandas_convert_dtypes`: If set to `True`, pandas casts the resulting DataFrame columns to the best possible _dtype_. Learn more in [convert_dtypes](https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.DataFrame.convert_dtypes.html).
If this parameter is turned off, type incompatibility issues between columns of related tables might occur. The Power BI model might not detect these issues due to [DAX implicit type conversion](/power-bi/connect-data/desktop-data-types#implicit-and-explicit-data-type-conversion).

SemPy `read_table` also uses the model information that Power BI provides.

- `multiindex_hierarchies`: If set to `True`, it converts [Power BI hierarchies](/power-bi/create-reports/service-metrics-get-started-hierarchies) to a pandas MultiIndex structure.

## Write data consumable by semantic models

Spark tables added to a Lakehouse are automatically added to the corresponding [default semantic model](../data-warehouse/semantic-models.md). This article demonstrates how to write data to the attached Lakehouse. The `FabricDataFrame` accepts the same input data as Pandas dataframes.

```python
from sempy.fabric import FabricDataFrame

df_forecast = FabricDataFrame({'ForecastedRevenue': [1, 2, 3]})

df_forecast.to_lakehouse_table("ForecastTable")
```

With Power BI, the *ForecastTable* table can be added to a composite semantic model that includes the Lakehouse semantic model.

## Related content

- [See `sempy.functions` to learn about usage of semantic functions](/python/api/semantic-link-sempy/sempy.functions)
- [Tutorial: extract and calculate Power BI measures from a Jupyter notebook](tutorial-power-bi-measures.md)
- [Explore and validate relationships in semantic models](semantic-link-validate-relationship.md)
- [How to validate data with semantic link](semantic-link-validate-data.md)
