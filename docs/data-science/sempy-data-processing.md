---
title: SemPy data processing
description: Learn how SemPy works with data.
ms.reviewer: mopeakande
ms.author: narsam
author: narmeens
ms.topic: conceptual
ms.date: 02/10/2023
---

# SemPy data processing

> [!IMPORTANT]
> [!INCLUDE [product-name](../includes/product-name.md)] is currently in PREVIEW. This information relates to a prerelease product that may be substantially modified before it's released. Microsoft makes no warranties, expressed or implied, with respect to the information provided here.

This article covers how to explore and process data in SemPy.

## How do I read and write tabular data with SemPy?

SemPy supports the integration with the file formats or data sources as pandas out of the box (csv, excel, sql, json, parquet, etc.). Importing data from each of these data sources is provided by function with the prefix read_\*. Similarly, the to_\* methods are used to store data.  

## Which data sources can I use to fetch data from?

Any data source that Azure Synapse vNext supports in the notebooks! You can find code samples in the following list:

- The [E2E Power BI Example](https://enyaprod.azurewebsites.net/notebooks/synapse/e2e_powerbi_example.html) notebook shows how to fetch data from a PBIX file using a "connector".
- The [Knowledge Base Hydration from a Lakehouse](https://enyaprod.azurewebsites.net/notebooks/synapse/knowledge_base_hydration_from_a_lakehouse.html) notebook shows how to fetch data from Azure Lakehouse.
- The [Built-in Visualizations](https://enyaprod.azurewebsites.net/notebooks/built_in_visualization.html) notebook shows how you can fetch external sklearn datasets.

## How do I populate a semantic data frame via initialized KB?

To get the data for an entity (in the form of a pandas dataframe), call `kb.get_data`:

```
>>> order_sdf = kb1.get_data("Order")
```

```
SemanticDataFrame
        OrderId     OrderDate       ShipmentToAddress           ProductId       NoAttribute
0       1           2010-01-01      Somewhere in Sunnyvale      404             a
1       2           2022-02-02      Woodinville or something    123             b
2       3           2021-03-04      Medina, WA                  1337            c
3       4           2134-11-12      The building next door      1337            x
4       5           2020-01-30      City A                      0               y
5       6           2120-03-04      district 10                 1               z
6       7           1950-04-04      district 12                 31337           w
```

## How to create a semantic data frame for data without defining its CompoundSType in KB?

You can use dataframes, or data files, and add annotation later. Here's an example that shows how you can create semantic dataframes from pandas dataframes.

```
>>> import sempy
>>> kb = sempy.KB()       # Create an empty kb
>>> import pandas as pd
```

```
>>> df = pd.read_csv("tests/resources/orders/order1.csv")
```

With the code provided below you can create a semantic dataframe with no annotation at all:

```
>>> sdf = kb.make_sdf(df)
```

```
SemanticDataFrame
   OrderId  OrderDate   ShipmentToAddress        ProductId
0        1  01/01/2010  Somewhere in Sunnyvale         404
1        2  02/02/2022  Woodinville or something       123
2        3  03/04/2021  Medina, WA                    1337
```

## How do I select a subset of a table?

SemPy is compatible with all APIs that pandas provides. You can use it as a drop-in replacement.

## Do you support spark for scaling to big data?

Yes, SemPy supports *pyspark.pandas* mode for semantic dataframes. To configure it, add the following line of code in the beginning of your notebook:

```
from sempy.utils.backend import set_backend
set_backend('pyspark.pandas')
```

By default, backend is set to *pandas*.

## How to create plots in SemPy?

You may do it in the same way as in pandas. But SemPy greatly simplifies the process, when semantic annotations are available. It creates prompts of auto-generated code with suggestions of the best ways to plot values in different columns. Plotting functions are specific to the logical types of the attributes that are being plotted. For example, a time series attribute has a different visualization than a categorical attribute. Dataframes can automatically show available plotting options using the `plot` accessor. Similarly to `auto`, only methods that are relevant to the current annotation are displayed as defined by the tags of an attribute's logical type.

:::image type="content" source="media\sempy-data-processing\plot-complete.png" alt-text="screenshot of list showing available plotting options." lightbox="media\sempy-data-processing\plot-complete.png":::

Check out the [Built-in Visualizations](https://enyaprod.azurewebsites.net/notebooks/built_in_visualization.html) notebook to see how you can get visualizations of data for EDA and enjoy bypassing figuring out parameters in plotting functions. If you deal with categorical data, you can take advantage of rich auto-generated visualizations including Principal Component Analysis and Linear Discriminant Analysis provided by \<semantic data frame>.plot.classification(target_column=\<column of interest>). An example of leveraging this functionality is available in [E2E Power BI Example](https://enyaprod.azurewebsites.net/notebooks/synapse/e2e_powerbi_example.html) Part 3 "Data Exploration and Cleaning".

## How to calculate summary statistics?

Firstly, with SemPy you can do all you can do with pandas. On top of that, there are some new advanced features designed to handle certain types of data better. For example, if you deal with categorical data, you can take advantage of rich auto-generated visualizations including Principal Component Analysis and Linear Discriminant Analysis provided by \<semantic data frame>.plot.classification(target_column=\<column of interest>). Check out [E2E Power BI Example](https://enyaprod.azurewebsites.net/notebooks/synapse/e2e_powerbi_example.html) Part 3 "Data Exploration and Cleaning".

## How to handle time series data?

SemPy inherits all the great functionality of pandas for time series with an extensive set of tools for working with dates, times, and time-indexed data. It also supports rich visualization for semantic data frames allowing to render time series, saving a lot of effort for data scientist on parameterizing the plots. Check out [Built-in Visualizations](https://enyaprod.azurewebsites.net/notebooks/built_in_visualization.html) "A more complex dataset now" for an example.
