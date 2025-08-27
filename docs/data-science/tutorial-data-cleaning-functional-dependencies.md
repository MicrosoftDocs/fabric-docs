---
title: 'Tutorial: Clean data with functional dependencies'
description: This article shows how to use information about functional dependencies in data for data cleaning.
ms.author: jburchel
author: jonburchel
ms.reviewer: alsavelv
reviewer: alsavelv
ms.topic: tutorial
ms.custom: 
ms.date: 08/26/2025
ai.usage: ai-assisted
---


<!-- nbstart https://raw.githubusercontent.com/microsoft/fabric-samples/main/docs-samples/data-science/semantic-link-samples/data_cleaning_functional_dependencies_tutorial.ipynb -->

# Tutorial: Clean data with functional dependencies

Use functional dependencies to clean data. A functional dependency exists when one column in a semantic model (a Power BI dataset) depends on another column. For example, a `ZIP code` column can determine the value in a `city` column. A functional dependency appears as a one-to-many relationship between values in two or more columns in a `DataFrame`. This tutorial uses the Synthea dataset to show how functional dependencies help detect data quality problems.

In this tutorial, you learn how to:

- Apply domain knowledge to form hypotheses about functional dependencies in a semantic model.
- Get familiar with components of the Semantic Link Python library ([SemPy](/python/api/semantic-link-sempy)) that automate data quality analysis. These components include:
    - `FabricDataFrame`—a pandas-like structure with additional semantic information.
    - Functions that automate evaluating hypotheses about functional dependencies and identify violations in your semantic models.

## Prerequisites

[!INCLUDE [prerequisites](./includes/prerequisites.md)]
* Select **Workspaces** in the navigation pane, then select your workspace to set it as the current workspace.

### Follow along in the notebook

Use the [data_cleaning_functional_dependencies_tutorial.ipynb](https://github.com/microsoft/fabric-samples/blob/main/docs-samples/data-science/semantic-link-samples/data_cleaning_functional_dependencies_tutorial.ipynb) notebook to follow this tutorial.

[!INCLUDE [follow-along-github-notebook](./includes/follow-along-github-notebook.md)]

## Set up the notebook

In this section, you set up a notebook environmen1. Check your Spark version. If you're using Spark 3.4 or later in Microsoft Fabric, Semantic Link is included by default, so you don't need to install it. If you're using Spark 3.3 or earlier, or you want to update to the latest Semantic Link, run the following command.

```python
%pip install -U semantic-link
```
p1. Import the modules you use in this notebook.
sary imports of modules that you'll need later:

    ```python
    import pandas as pd
    import sempy.fabric as fabric
    from sempy.fabric import FabricDataFrame
    from sempy.dependencies import plot_dependency_metadata
 1. Download the sample data. In this tutorial, use the Synthea dataset of synthetic medical records (small version for simplicity).
synthetic medical records (small version for simplicity):

    ```python
    download_synthea(which='small')
    ```

## Explore the data

1. Initialize a ``FabricDataFrame`` with the content of the _providers.csv_ file.

    ```python
    providers = FabricDataFrame(pd.read_csv("synthea/csv/providers.csv"))
    providers.head()
    ```

1. Check for data quality issues with SemPy's `find_dependencies` function by plotting a graph of autodetected functional dependencies.

    ```python
    deps = providers.find_dependencies()
    plot_dependency_metadata(deps)
    ```

    :::image type="content" source="media/tutorial-data-cleaning-functional-dependencies/graph-of-functional-dependencies.png" alt-text="Screenshot of a functional dependency graph showing Id determines NAME and ORGANIZATION." lightbox="media/tutorial-data-cleaning-functional-dependencies/graph-of-functional-dependencies.png":::

    The graph shows that `Id` determines `NAME` and `ORGANIZATION`. This result is expected because `Id` is unique.

1. Confirm that `Id` is unique.

    ```python
    providers.Id.is_unique
    ```

    The code returns `True` to confirm that `Id` is unique.

## Analyze functional dependencies in depth

The functional dependencies graph also shows that `ORGANIZATION` determines `ADDRESS` and `ZIP`, as expected. However, you might expect `ZIP` to also determine `CITY`, but the dashed arrow indicates that the dependency is only approximate, pointing towards a data quality issue.

There are other peculiarities in the graph. For example, `NAME` doesn't determine `GENDER`, `Id`, `SPECIALITY`, or `ORGANIZATION`. Each of these peculiarities might be worth investigating.

1. Take a deeper look at the approximate relationship between `ZIP` and `CITY` by using SemPy's `list_dependency_violations` function to list the violations:

    ```python
    providers.list_dependency_violations('ZIP', 'CITY')
    ```

1. Draw a graph with SemPy's `plot_dependency_violations` visualization function. This graph is helpful if the number of violations is small:

    ```python
    providers.plot_dependency_violations('ZIP', 'CITY')
    ```

    :::image type="content" source="media/tutorial-data-cleaning-functional-dependencies/plot-of-dependency-violations.png" alt-text="Screenshot of the plot of dependency violations.":::

    The plot of dependency violations shows values for `ZIP` on the left hand side and values for `CITY` on the right hand side. An edge connects a zip code on the left hand side of the plot with a city on the right hand side if there's a row that contains these two values. The edges are annotated with the count of such rows. For example, there are two rows with zip code 02747-1242, one row with city "NORTH DARTHMOUTH" and the other with city "DARTHMOUTH", as shown in the previous plot and the following code:

1. Confirm the observations from the plot by running the following code:

    ```python
    providers[providers.ZIP == '02747-1242'].CITY.value_counts()
    ```

1. The plot also shows that, among the rows that have `CITY` as "DARTHMOUTH", nine rows have a `ZIP` of 02747-1262. One row has a `ZIP` of 02747-1242. One row has a `ZIP` of 02747-2537. Confirm these observations with the following code:

    ```python
    providers[providers.CITY == 'DARTHMOUTH'].ZIP.value_counts()
    ```

1. There are other zip codes associated with "DARTMOUTH", but these zip codes aren't shown in the graph of dependency violations because they don't hint at data quality issues. For example, the zip code "02747-4302" is uniquely associated with "DARTMOUTH" and doesn't show up in the graph of dependency violations. Confirm by running the following code:

    ```python
    providers[providers.ZIP == '02747-4302'].CITY.value_counts()
    ```

## Summarize data quality issues detected with SemPy

The dependency violations graph shows several data quality issues in this semantic model:

- Some city names are uppercase. Use string methods to fix this issue.
- Some city names have qualifiers (or prefixes), such as "North" and "East". For example, the ZIP Code "2128" maps to "EAST BOSTON" once and to "BOSTON" once. A similar issue occurs between "NORTH DARTMOUTH" and "DARTMOUTH". Drop these qualifiers or map the ZIP Codes to the city with the most common occurrence.
- There are typos in some city names, like "PITTSFIELD" vs. "PITTSFILED" and "NEWBURGPORT" vs. "NEWBURYPORT." For "NEWBURGPORT," fix this typo by using the most common occurrence. For "PITTSFIELD," with only one occurrence each, automatic disambiguation is much harder without external knowledge or a language model.
- Sometimes, prefixes like "West" are abbreviated to the single letter "W." Replace "W" with "West" if all occurrences of "W" stand for "West."
- The ZIP Code "02130" maps to "BOSTON" once and "Jamaica Plain" once. This issue isn't easy to fix. With more data, map to the most common occurrence.

## Clean the data

1. Fix capitalization by changing values to title case.

    ```python
    providers['CITY'] = providers.CITY.str.title()
    ```

1. Run violation detection again to confirm that there are fewer ambiguities.

    ```python
    providers.list_dependency_violations('ZIP', 'CITY')
    ```

    Refine the data manually, or drop rows that violate functional constraints between columns by using SemPy's `drop_dependency_violations` function.

    For each value of the determinant variable, `drop_dependency_violations` picks the most common value of the dependent variable and drops all rows with other values. Apply this operation only if you're confident that this statistical heuristic leads to correct results for your data. Otherwise, write your own code to handle the detected violations.

1. Run the `drop_dependency_violations` function on the `ZIP` and `CITY` columns.

    ```python
    providers_clean = providers.drop_dependency_violations('ZIP', 'CITY')
    ```

1. List any dependency violations between `ZIP` and `CITY`.

    ```python
    providers_clean.list_dependency_violations('ZIP', 'CITY')
    ```

    The code returns an empty list to indicate that there are no more violations of the functional constraint `ZIP -> CITY`.

## Related content

See other tutorials for semantic link or SemPy:

- [Tutorial: Analyze functional dependencies in a sample semantic model](tutorial-power-bi-dependencies.md)
- [Tutorial: Extract and calculate Power BI measures from a Jupyter notebook](tutorial-power-bi-measures.md)
- [Tutorial: Discover relationships in a semantic model using semantic link](tutorial-power-bi-relationships.md)
- [Tutorial: Discover relationships in the Synthea dataset using semantic link](tutorial-relationships-detection.md)
- [Tutorial: Validate data using SemPy and Great Expectations (GX)](tutorial-great-expectations.md)

<!-- nbend -->
