---
title: Validate functional dependencies in data with semantic link
description: Explore and validate functional dependencies in data with semantic link and Microsoft Fabric.
ms.reviewer: mopeakande
reviewer: msakande
ms.author: romanbat
author: RomanBat
ms.topic: how-to
ms.custom:
  - ignite-2023
ms.date: 11/15/2023
ms.search.form: semantic link
---

# Detect, explore, and validate functional dependencies in your data, using semantic link

Functional dependencies are relationships between columns in a table, where the values in one column are used to determine the values in another column.
An understanding of these dependencies can help you uncover patterns and relationships in your data, which can be useful for feature engineering, data cleaning, and model building.
Functional dependencies act as an effective invariant that allows you to find and fix data quality issues that might be hard to detect otherwise.

In this article, you'll use semantic link to:

> [!div class="checklist"]
> * Find dependencies between columns of a FabricDataFrame
> * Visualize dependencies
> * Identify data quality issues
> * Visualize data quality issues
> * Enforce functional constraints between columns in a dataset

## Prerequisites

[!INCLUDE [prerequisites](includes/prerequisites.md)]
- Go to the Data Science experience in [!INCLUDE [product-name](../includes/product-name.md)].
- Create [a new notebook](../data-engineering/how-to-use-notebook.md#create-notebooks) to copy/paste code into cells.
- [!INCLUDE [sempy-notebook-installation](includes/sempy-notebook-installation.md)]
- [Add a Lakehouse to your notebook](../data-engineering/how-to-use-notebook.md#connect-lakehouses-and-notebooks).

## Find functional dependencies in data

The `find_dependencies` function in SemPy detects functional dependencies between the columns of a FabricDataFrame.
The function uses a threshold on conditional entropy to discover approximate functional dependencies, where low conditional entropy indicates strong dependence between columns.
To make the `find_dependencies` function more selective, you can set a lower threshold on conditional entropy. The lower threshold means that only stronger dependencies will be detected.

The following Python code snippet demonstrates how to use `find_dependencies`.

```python
from sempy.fabric import FabricDataFrame
from sempy.dependencies import plot_dependency_metadata
import pandas as pd


df = FabricDataFrame(pd.read_csv("your_data.csv"))

deps = df.find_dependencies()
```

The `find_dependencies` function returns a FabricDataFrame with detected dependencies between columns.
Columns that have a 1:1 mapping will be represented as a list.
The function also tries to prune the potential dependencies by removing [transitive edges](https://en.wikipedia.org/wiki/Transitive_dependency).

When you specify the `dropna=True` option, rows that have a NaN value in either column are eliminated from evaluation.
This can result in dependencies being nontransitive, as in the following example:

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

After finding functional dependencies in a dataset (using `find_dependencies`), you can visualize the dependencies, using the `plot_dependency_metadata` function.
This function takes the resulting FabricDataFrame from `find_dependencies` and creates a visual representation of the dependencies between columns and groups of columns.

The following Python code snippet demonstrates how to use `plot_dependencies`.

```python
from sempy.fabric import FabricDataFrame
from sempy.dependencies import plot_dependency_metadata
from sempy.samples import download_synthea

download_synthea(which='small')

df = FabricDataFrame(pd.read_csv("synthea/csv/providers.csv"))

deps = df.find_dependencies()
plot_dependency_metadata(deps)
```

The `plot_dependency_metadata` function generates a visualization that shows the 1:1 groupings of columns.
Columns that belong to a single group are put into a single cell. If no suitable candidates are found, an empty FabricDataFrame is returned.

:::image type="content" source="media/semantic-link-validate-data/plot-dependencies.png" alt-text="Screenshot showing the output of the plot_dependencies function." lightbox="media/semantic-link-validate-data/plot-dependencies.png":::

## Identify data quality issues

Data quality issues can arise in various forms, such as missing values, inconsistencies, or inaccuracies.
Identifying and addressing these issues is crucial for ensuring the reliability and validity of any analysis or model built on the data.
One way to detect data quality issues is by examining violations of functional dependencies between columns in a dataset.

The `list_dependency_violations` function can help you identify violations of functional dependencies between columns in a dataset.
Given a determinant column and a dependent column, this function shows values that violate the functional dependency, along with the count of their respective occurrences.
This can be useful for inspecting approximate dependencies and identifying data quality issues.

The following code shows an example of how to use the `list_dependency_violations` function:

```python
from sempy.fabric import FabricDataFrame
from sempy.samples import download_synthea

download_synthea(which='small')

df = FabricDataFrame(pd.read_csv("synthea/csv/providers.csv"))

violations = df.list_dependency_violations(determinant_col="ZIP", dependent_col="CITY")
```

In this example, the function assumes that there exists a functional dependency between the ZIP (determinant) and CITY (dependent) columns.
If the dataset has data quality issues, such as the same ZIP Code being assigned to multiple cities, the function outputs the violating values:

| ZIP   | CITY      | count |
|-------|-----------|-------|
| 12345 | Boston    | 2     |
| 12345 | Seattle   | 1     |

This output indicates that the same ZIP Code (12345) is attached to two different cities (Boston and Seattle), suggesting a data quality issue within the dataset.

The `list_dependency_violations` function provides more options for handling missing values, showing values mapped to violating values, limiting the number of violations returned, and sorting the results by count or determinant column. (TODO: Link to API doc)

The output of `list_dependency_violations` can help identify data quality issues in your dataset.
However, it's essential to carefully examine the results and consider the context of your data to determine the most appropriate course of action for addressing the identified issues.
This course of action might involve further data cleaning, validation, or exploration to ensure the reliability and validity of your analysis or model.

## Visualize data quality issues

Data quality issues can negatively impact the reliability and validity of any analysis or model built on the data.
Identifying and addressing these issues is crucial for ensuring the accuracy of your results.
One way to detect data quality issues is by examining violations of functional dependencies between columns in a dataset.
Visualizing these violations can provide a better understanding of the issues and help you address them more effectively.

The `plot_dependency_violations` function can help visualize violations of functional dependencies between columns in a dataset.
Given a determinant column and a dependent column, this function shows the violating values in a graphical format, making it easier to understand the nature and extent of the data quality issues.

The following code shows an example of how to use the `plot_dependency_violations` function:

```python
from sempy.fabric import FabricDataFrame
from sempy.dependencies import plot_dependency_violations
from sempy.samples import download_synthea

download_synthea(which='small')

df = FabricDataFrame(pd.read_csv("synthea/csv/providers.csv"))

df.plot_dependency_violations(determinant_col="ZIP", dependent_col="CITY")
```

In this example, the function assumes that a functional dependency exists between the ZIP (determinant) and CITY (dependent) columns.
If the dataset has data quality issues, such as the same ZIP code being assigned to multiple cities, the function generates a graph of the violating values.

The `plot_dependency_violations` function provides more options for handling missing values, showing values mapped to violating values, limiting the number of violations returned, and sorting the results by count or determinant column. (TODO: Link to API doc)

The visualization generated by `plot_dependency_violations` can help you identify data quality issues in your dataset and understand their nature and extent.
By examining the graph, you can gain insights into the relationships between determinant and dependent columns and identify potential errors or inconsistencies in your data.

:::image type="content" source="media/semantic-link-validate-data/plot-dependency-violations.png" alt-text="Screenshot showing the output of the plot_dependency_violations function." lightbox="media/semantic-link-validate-data/plot-dependency-violations.png":::

## Enforce functional constraints

Data quality is crucial for ensuring the reliability and validity of any analysis or model built on a dataset.
One way to improve data quality is by enforcing functional constraints between columns in a dataset.
Functional constraints can help ensure that the relationships between columns are consistent and accurate, which can lead to more accurate results in your analysis or model.

The `drop_dependency_violations` function can help enforce functional constraints between columns in a dataset by dropping rows that violate a given constraint.
Given a determinant column and a dependent column, this function removes rows with values that don't adhere to the functional constraint between the two columns.

The following code shows an example of how to use the `drop_dependency_violations` function:

```python
from sempy.fabric import FabricDataFrame
from sempy.samples import download_synthea

download_synthea(which='small')

df = FabricDataFrame(pd.read_csv("synthea/csv/providers.csv"))

cleaned_df = df.drop_dependency_violations(determinant_col="ZIP", dependent_col="CITY")
```

In this example, the function enforces a functional constraint between the ZIP (determinant) and CITY (dependent) columns.
For each value of the determinant, the most common value of the dependent is picked, and all rows with other values are dropped.
For example, given the following dataset:

| ZIP   | CITY          |
|-------|---------------|
| 12345 | Seattle       |
| 12345 | Boston        |
| 12345 | Boston        |
| 98765 | Baltimore     |
| 00000 | San Francisco |

The row with CITY=Seattle would be dropped, and the functional dependency ZIP -> CITY holds in the output.

The `drop_dependency_violations` function provides the `verbose` option for controlling the verbosity of the output. By setting `verbose=1`, you can see the number of dropped rows, and `verbose=2` lets you see the entire row content of the dropped rows.

By using the `drop_dependency_violations` function, you can enforce functional constraints between columns in your dataset, which can help improve data quality and lead to more accurate results in your analysis or model.
However, it's essential to carefully consider the context of your data and the functional constraints you choose to enforce to ensure that you aren't inadvertently removing valuable information from your dataset.

## Related content

- [See the SemPy reference documentation for the `FabricDataFrame` class](/python/api/semantic-link-sempy/sempy.fabric.fabricdataframe)
- [Tutorial: Clean data with functional dependencies](tutorial-data-cleaning-functional-dependencies.md)
- [Explore and validate relationships in semantic models](semantic-link-validate-relationship.md)
- [Accelerate data science using semantic functions](semantic-link-semantic-functions.md)
