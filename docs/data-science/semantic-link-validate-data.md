---
title: Validate functional dependencies in data with semantic link
description: Explore and validate functional dependencies in data with semantic link and Microsoft Fabric.
ms.author: scottpolly
author: s-polly
ms.reviewer: romanbat
ms.topic: how-to
ms.custom: dev-focus
ms.date: 03/03/2026
ms.search.form: semantic link
ai-usage: ai-assisted
---

# Detect, explore, and validate functional dependencies in your data by using semantic link

Functional dependencies are relationships between columns in a table, where the values in one column determine the values in another column. Understanding these dependencies can help you uncover patterns and relationships in your data. This understanding can help with feature engineering, data cleaning, and model building tasks. Functional dependencies act as an effective invariant that helps you find and fix data quality problems that might be hard to detect otherwise.

In this article, you use semantic link to:

> [!div class="checklist"]
> * Find dependencies between columns of a FabricDataFrame
> * Visualize dependencies
> * Identify data quality problems
> * Visualize data quality problems
> * Enforce functional constraints between columns in a dataset

## Prerequisites

[!INCLUDE [prerequisites](includes/prerequisites.md)]
- Go to the Data Science experience found in [!INCLUDE [product-name](../includes/product-name.md)].
- Create [a new notebook](../data-engineering/how-to-use-notebook.md#create-notebooks) to copy and paste code into cells.
- [!INCLUDE [sempy-notebook-installation](includes/sempy-notebook-installation.md)]
- [Add a Lakehouse to your notebook](../data-engineering/how-to-use-notebook.md#connect-lakehouses-and-notebooks).

Semantic link is available in the default Fabric runtime. To update to the most recent version of semantic link, run this command:

```python
%pip install -U semantic-link
```

## Find functional dependencies in data

The SemPy `find_dependencies` function detects functional dependencies between the columns of a FabricDataFrame. The function uses a threshold on conditional entropy to discover approximate functional dependencies, where low conditional entropy indicates strong dependence between columns. To make the `find_dependencies` function more selective, set a lower threshold on conditional entropy. The lower threshold means that only stronger dependencies are detected.

This Python code snippet demonstrates how to use `find_dependencies`:

```python
from sempy.fabric import FabricDataFrame
from sempy.dependencies import plot_dependency_metadata
import pandas as pd


df = FabricDataFrame(pd.read_csv("your_data.csv"))

deps = df.find_dependencies()
```

The `find_dependencies` function returns a FabricDataFrame with detected dependencies between columns.
A list represents columns that have a 1:1 mapping. The function also removes [transitive edges](https://en.wikipedia.org/wiki/Transitive_dependency), to try to prune the potential dependencies.

When you specify the `dropna=True` option, the function eliminates rows that have a NaN value in either column from evaluation. This elimination can result in nontransitive dependencies, as shown in the following example:

| A | B   | C |
|---|-----|---|
| 1 | 1   | 1 |
| 1 | 1   | 1 |
| 1 | NaN | 9 |
| 2 | NaN | 2 |
| 2 | 2   | 2 |

In some cases, the dependency chain can form cycles when you specify the `dropna=True` option, as shown in the following example:

| A   | B   | C   |
|-----|-----|-----|
| 1   | 1   | NaN |
| 2   | 1   | NaN |
| NaN | 1   | 1   |
| NaN | 2   | 1   |
| 1   | NaN | 1   |
| 1   | NaN | 2   |

## Visualize dependencies in data

After you find functional dependencies in a dataset by using `find_dependencies`, you can visualize the dependencies by using the `plot_dependency_metadata` function. This function takes the resulting FabricDataFrame from `find_dependencies` and creates a visual representation of the dependencies between columns and groups of columns.

This Python code snippet shows how to use `plot_dependencies`:

```python
from sempy.fabric import FabricDataFrame
from sempy.dependencies import plot_dependency_metadata
from sempy.samples import download_synthea
import pandas as pd

download_synthea(which='small')

df = FabricDataFrame(pd.read_csv("synthea/csv/providers.csv"))

deps = df.find_dependencies()
plot_dependency_metadata(deps)
```

The `plot_dependency_metadata` function generates a visualization that shows the 1:1 groupings of columns. Columns that belong to a single group are placed in a single cell. If the function doesn't find any suitable candidates, it returns an empty FabricDataFrame.
:::image type="content" source="media/semantic-link-validate-data/plot-dependencies.png" alt-text="Screenshot showing the output of the plot_dependencies function." lightbox="media/semantic-link-validate-data/plot-dependencies.png"

:::image type="content" source="media/semantic-link-validate-data/plot-dependencies.png" alt-text="Screenshot showing the output of the plot_dependencies function." lightbox="media/semantic-link-validate-data/plot-dependencies.png":::

## Identify data quality problems

Data quality problems can take many forms - for example, missing values, inconsistencies, or inaccuracies. To ensure the reliability and validity of any analysis or model built on the data, it's important to identify and address these problems. One way to detect data quality problems is to examine violations of functional dependencies between columns in a dataset.

The `list_dependency_violations` function can help you find violations of functional dependencies between dataset columns. When you provide a determinant column and a dependent column, the function shows values that violate the functional dependency, along with the count of their respective occurrences. This information can help you inspect approximate dependencies and identify data quality problems.

The following code snippet shows how to use the `list_dependency_violations` function:

```python
from sempy.fabric import FabricDataFrame
from sempy.samples import download_synthea
import pandas as pd

download_synthea(which='small')

df = FabricDataFrame(pd.read_csv("synthea/csv/providers.csv"))

violations = df.list_dependency_violations(determinant_col="ZIP", dependent_col="CITY")
```

In this example, the function assumes a functional dependency between the ZIP (determinant) and CITY (dependent) columns. If the dataset has data quality problems - for example, the same ZIP Code assigned to multiple cities - the function outputs the data with the problems:

| ZIP   | CITY      | count |
|-------|-----------|-------|
| 12345 | Boston    | 2     |
| 12345 | Seattle   | 1     |

This output indicates that two different cities (Boston and Seattle) have the same ZIP Code value (12345). This result suggests a data quality problem within the dataset.

The `list_dependency_violations` function provides more options that can handle missing values, show values mapped to violating values, limit the number of violations returned, and sort the results by count or determinant column.

The `list_dependency_violations` output can help you identify dataset data quality problems. However, you should carefully examine the results and consider the context of your data, to determine the most appropriate course of action to address the identified problems. This approach might involve more data cleaning, validation, or exploration to ensure the reliability and validity of your analysis or model.

## Visualize data quality problems

Data quality problems can damage the reliability and validity of any analysis or model built on that data.
Identifying and addressing these problems is important to ensure the accuracy of your results. To detect data quality problems, examine violations of functional dependencies between columns in a dataset.
Visualizing these violations can show the problems more clearly, and help you address them more effectively.

The `plot_dependency_violations` function can help visualize violations of functional dependencies between columns in a dataset. Given a determinant column and a dependent column, this function shows the violating values in a graphical format, to make it easier to understand the nature and extent of the data quality problems.

This code snippet shows how to use the `plot_dependency_violations` function:

```python
from sempy.fabric import FabricDataFrame
from sempy.samples import download_synthea
import pandas as pd

download_synthea(which='small')

df = FabricDataFrame(pd.read_csv("synthea/csv/providers.csv"))

df.plot_dependency_violations(determinant_col="ZIP", dependent_col="CITY")
```

In this example, the function assumes an existing functional dependency between the ZIP (determinant) and CITY (dependent) columns. If the dataset has data quality problems - for example, the same ZIP code assigned to multiple cities - the function generates a graph of the violating values.

The `plot_dependency_violations` function provides more options that can handle missing values, show values mapped to violating values, limit the number of violations returned, and sort the results by count or determinant column.

The `plot_dependency_violations` function generates a visualization that can help identify dataset data quality problems. However, you should carefully examine the results and consider the context of your data, to determine the most appropriate course of action to address the identified problems. This approach might involve more data cleaning, validation, or exploration to ensure the reliability and validity of your analysis or model.

:::image type="content" source="media/semantic-link-validate-data/plot-dependency-violations.png" alt-text="Screenshot showing the plot_dependency_violations function output." lightbox="media/semantic-link-validate-data/plot-dependency-violations.png":::

## Enforce functional constraints

Data quality is crucial for ensuring the reliability and validity of any analysis or model built on a dataset. Enforcement of functional constraints between columns in a dataset can help improve data quality. Functional constraints ensure that the relationships between columns have accuracy and consistency, which can lead to more accurate analysis or model results.

The `drop_dependency_violations` function enforces functional constraints between columns in a dataset. It removes rows that violate a given constraint. Given a determinant column and a dependent column, this function removes rows with values that don't conform to the functional constraint between the two columns.

This code snippet shows how to use the `drop_dependency_violations` function:

```python
from sempy.fabric import FabricDataFrame
from sempy.samples import download_synthea
import pandas as pd

download_synthea(which='small')

df = FabricDataFrame(pd.read_csv("synthea/csv/providers.csv"))

cleaned_df = df.drop_dependency_violations(determinant_col="ZIP", dependent_col="CITY")
```

In this example, the function enforces a functional constraint between the ZIP (determinant) and CITY (dependent) columns. For each value of the determinant, the function picks the most common value of the dependent column, and drops all rows with other values. For example, given this dataset, the row with **CITY=Seattle** is dropped, and the functional dependency **ZIP -> CITY** holds in the output:

| ZIP   | CITY          |
|-------|---------------|
| 12345 | Seattle       |
| 12345 | Boston        |
| 12345 | Boston        |
| 98765 | Baltimore     |
| 00000 | San Francisco |

The `drop_dependency_violations` function provides the `verbose` option to control the output verbosity. By setting `verbose=1`, you can see the number of dropped rows. A `verbose=2` value shows the entire row content of the dropped rows.

The `drop_dependency_violations` function can enforce functional constraints between columns in your dataset, which can help improve data quality and lead to more accurate results in your analysis or model. However, carefully consider the context of your data and the functional constraints you choose to enforce, to ensure that you don't accidentally remove valuable information from your dataset.

## Related content

- [See the SemPy reference documentation for the `FabricDataFrame` class](/python/api/semantic-link-sempy/sempy.fabric.fabricdataframe)
- [Tutorial: Clean data with functional dependencies](tutorial-data-cleaning-functional-dependencies.md)
- [Explore and validate relationships in semantic models](semantic-link-validate-relationship.md)
- [Accelerate data science using semantic functions](semantic-link-semantic-functions.md)
