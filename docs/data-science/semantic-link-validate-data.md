---
title: Validate data with Semantic Link
description: Validate data with Semantic Link
ms.reviewer: mopeakande
ms.author: romanbat
author: RomanBat
ms.topic: overview 
ms.date: 06/06/2023
ms.search.form: Semantic Link
---

# Data validation with Semantic Link and Microsoft Fabric
# Validate relationships between tables
PowerBI and Microsoft Fabric provide rich set of data modelling capabilities, including ability to detect, define and manage foreign key relationships between tables and their cardinalities [link](https://learn.microsoft.com/en-us/power-bi/transform-model/desktop-create-and-manage-relationships).
As referential integrity is not automatically enforced for Lakehouse datasets, this may lead to hard to find data quality problems, which can affect the quality of BI reports and ML models.
Semantic Link provides tools to validate referential integrity based on the relationships defined by the data model and find violations.

# Use functional dependencies to find and fix data quality issues

Data dependencies are relationships between columns in a dataset, where the values in one column can be determined by the values in another column.
Understanding these dependencies can help you uncover patterns and relationships in your data, which can be useful for feature engineering, data cleaning, and model building.

## Finding dependencies

The `find_dependencies` function is used to detect functional dependencies between the columns of a dataframe.
It uses a threshold on conditional entropy to discover approximate functional dependencies, where low conditional entropy means strong dependence.
A lower threshold is more selective, meaning that only stronger dependencies will be detected.

Here's a Python code snippet that demonstrates how to use `find_dependencies`:

```python
from sempy.fabric import FabricDataFrame
from sempy.dependencies import plot_dependencies

df = FabricDataFrame(pd.read_csv("your_data.csv"))

deps = df.find_dependencies()
```

The `find_dependencies` function returns a dataframe with detected dependencies between columns.
Columns that map One:One will be represented as a list.
The function tries to prune the potential dependencies by removing transitive edges.

When the `dropna=True` option is specified, rows that have a NaN value in either column are eliminated from evaluation.
This may result in dependencies being non-transitive, as in the following example:

| A | B | C |
|---|---|---|
| 1 | 1 | 1 |
| 1 | 1 | 1 |
| 1 | NaN | 9 |
| 2 | NaN | 2 |
| 2 | 2 | 2 |

In some cases, the dependency chain can form cycles when `dropna=True` is used, as shown in the following example:

| A | B | C |
|---|---|---|
| 1 | 1 | NaN |
| 2 | 1 | NaN |
| NaN | 1 | 1 |
| NaN | 2 | 1 |
| 1 | NaN | 1 |
| 1 | NaN | 2 |

## Visualizing dependencies

After finding the dependencies using `find_dependencies`, you can visualize them using the `plot_dependencies` function.
This function takes the resulting dataframe from `find_dependencies` and creates a visual representation of the dependencies between columns and groups of columns.

Here's a Python code snippet that demonstrates how to use `plot_dependencies`:

```python
from sempy.fabric import FabricDataFrame
from sempy.dependencies import plot_dependencies

df = FabricDataFrame(pd.read_csv("your_data.csv"))

deps = df.find_dependencies()
plot_dependencies(deps)
```

The `plot_dependencies` function generates a visualization that shows the One:One groupings of columns.
Columns that belong to a single group are put into a single cell. If no suitable candidates are found, an empty DataFrame is returned.

:::image type="content" source="media/semantic-link-validate-data/plot_dependencies.png" alt-text="Screenshot of plot_dependency output." lightbox="media/semantic-link-validate-data/plot_dependencies.png":::

## Identifying Data Quality Issues with `list_dependency_violations`

Data quality issues can arise in various forms, such as missing values, inconsistencies, or inaccuracies.
Identifying and addressing these issues is crucial for ensuring the reliability and validity of any analysis or model built on the data.
One way to detect data quality issues is by examining violations of functional dependencies between columns in a dataset.

The `list_dependency_violations` function can help identify violations of functional dependencies between columns in a dataset.
Given a determinant column and a dependent column, this function shows values that violate the functional dependency, along with the count of their respective occurrences.
This can be useful for inspecting approximate dependencies and identifying data quality issues.

Here's an example of how to use `list_dependency_violations`:

```python
from sempy.fabric import FabricDataFrame

df = FabricDataFrame(pd.read_csv("your_data.csv"))

violations = df.list_dependency_violations(determinant_col="ZIP", dependent_col="CITY")
```

In this example, the function assumes a functional dependency between the ZIP (determinant) and CITY (dependent) columns.
If the dataset has data quality issues, such as the same ZIP code being assigned to multiple cities, the function will output the violating values:

| ZIP   | CITY      | count |
|-------|-----------|-------|
| 12345 | Boston    | 2     |
| 12345 | Seattle   | 1     |

This output indicates that the same ZIP code (12345) is attached to two different cities (Boston and Seattle), suggesting a data quality issue within the dataset.

The `list_dependency_violations` function provides additional options for handling missing values, showing values mapped to violating values, limiting the number of violations returned, and sorting the results by count or determinant column.

The output of `list_dependency_violations` can help identify data quality issues in your dataset.
However, it's essential to carefully examine the results and consider the context of your data to determine the most appropriate course of action for addressing the identified issues.
This may involve further data cleaning, validation, or exploration to ensure the reliability and validity of your analysis or model.

## Visualizing Data Quality Issues with `plot_dependency_violations`

Data quality issues can negatively impact the reliability and validity of any analysis or model built on the data.
Identifying and addressing these issues is crucial for ensuring the accuracy of your results.
One way to detect data quality issues is by examining violations of functional dependencies between columns in a dataset.
Visualizing these violations can provide a better understanding of the issues and help you address them more effectively.

The `plot_dependency_violations` function can help visualize violations of functional dependencies between columns in a dataset.
Given a determinant column and a dependent column, this function shows the violating values in a graphical format, making it easier to understand the nature and extent of the data quality issues.

Here's an example of how to use `plot_dependency_violations`:

```python
from sempy.fabric import FabricDataFrame
from sempy.dependencies import plot_dependency_violations

df = FabricDataFrame(pd.read_csv("your_data.csv"))

df.plot_dependency_violations(determinant_col="ZIP", dependent_col="CITY")
```

In this example, the function assumes a functional dependency between the ZIP (determinant) and CITY (dependent) columns.
If the dataset has data quality issues, such as the same ZIP code being assigned to multiple cities, the function will generate a graph of the violating values.

The `plot_dependency_violations` function provides additional options for handling missing values, showing values mapped to violating values, limiting the number of violations returned, and sorting the results by count or determinant column.

The visualization generated by `plot_dependency_violations` can help you identify data quality issues in your dataset and understand their nature and extent.
By examining the graph, you can gain insights into the relationships between determinant and dependent columns and identify potential errors or inconsistencies in your data.

:::image type="content" source="media/semantic-link-validate-data/plot_dependency_violations.png" alt-text="Screenshot of plot_dependency_violations output." lightbox="media/semantic-link-validate-data/plot_dependency_violations.png":::

## Enforcing Functional Constraints with `drop_dependency_violations`

Data quality is crucial for ensuring the reliability and validity of any analysis or model built on a dataset.
One way to improve data quality is by enforcing functional constraints between columns in a dataset.
Functional constraints can help ensure that the relationships between columns are consistent and accurate, which can lead to more accurate results in your analysis or model.

The `drop_dependency_violations` function can help enforce functional constraints between columns in a dataset by dropping rows that violate a given constraint.
Given a determinant column and a dependent column, this function removes rows with values that do not adhere to the functional constraint between the two columns.

Here's an example of how to use `drop_dependency_violations`:

```python
from sempy.fabric import FabricDataFrame

df = FabricDataFrame(pd.read_csv("your_data.csv"))

cleaned_df = df.drop_dependency_violations(determinant_col="ZIP", dependent_col="CITY")
```

In this example, the function enforces a functional constraint between the ZIP (determinant) and CITY (dependent) columns.
For each value of the determinant, the most common value of the dependent is picked, and all rows with other values are dropped.
For example, given the following dataset:

| ZIP   | CITY        |
|-------|-------------|
| 12345 | Seattle     |
| 12345 | Boston      |
| 12345 | Boston      |
| 98765 | Baltimore   |
| 00000 | San Francisco |

The row with CITY=Seattle would be dropped, and the functional dependency ZIP -> CITY holds in the output.

The `drop_dependency_violations` function provides an option for controlling the verbosity of the output, allowing you to see the number of dropped rows or the entire row content of dropped rows.

By using the `drop_dependency_violations` function, you can enforce functional constraints between columns in your dataset, which can help improve data quality and lead to more accurate results in your analysis or model.
However, it's essential to carefully consider the context of your data and the functional constraints you choose to enforce to ensure that you are not inadvertently removing valuable information from your dataset.

