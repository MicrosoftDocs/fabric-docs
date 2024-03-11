---
title: 'Tutorial: Clean data with functional dependencies (preview)'
description: This article shows how to use information about functional dependencies in data for data cleaning.
ms.reviewer: mopeakande
reviewer: msakande
ms.author: alsavelv
author: alsavelv
ms.topic: tutorial
ms.custom:
  - ignite-2023
ms.date: 09/27/2023
---


<!-- nbstart https://raw.githubusercontent.com/microsoft/fabric-samples/main/docs-samples/data-science/semantic-link-samples/data_cleaning_functional_dependencies_tutorial.ipynb -->

# Tutorial: Clean data with functional dependencies (preview)

In this tutorial, you use functional dependencies for data cleaning. A functional dependency exists when one column in a semantic model (a Power BI dataset) is a function of another column. For example, a _zip code_ column might determine the values in a _city_ column. A functional dependency manifests itself as a one-to-many relationship between the values in two or more columns within a DataFrame. This tutorial uses the _Synthea_ dataset to show how functional relationships can help to detect data quality problems.

[!INCLUDE [feature-preview](../includes/feature-preview-note.md)]

In this tutorial, you learn how to:

- Apply domain knowledge to formulate hypotheses about functional dependencies in a semantic model.
- Get familiarized with components of semantic link's Python library ([SemPy](/python/api/semantic-link-sempy)) that help to automate data quality analysis. These components include:
    - FabricDataFrame - a pandas-like structure enhanced with additional semantic information.
    - Useful functions that automate the evaluation of hypotheses about functional dependencies and that identify violations of relationships in your semantic models.

## Prerequisites

[!INCLUDE [prerequisites](./includes/prerequisites.md)]
* Select **Workspaces** from the left navigation pane to find and select your workspace. This workspace becomes your current workspace.

### Follow along in the notebook

The [data_cleaning_functional_dependencies_tutorial.ipynb](https://github.com/microsoft/fabric-samples/blob/main/docs-samples/data-science/semantic-link-samples/data_cleaning_functional_dependencies_tutorial.ipynb) notebook accompanies this tutorial.

[!INCLUDE [follow-along-github-notebook](./includes/follow-along-github-notebook.md)]

## Set up the notebook

In this section, you set up a notebook environment with the necessary modules and data.

1. Install `SemPy` from PyPI, using the `%pip` in-line installation capability within the notebook:

    ```python
    %pip install semantic-link
    ```

1. Perform necessary imports of modules that you'll need later:

    ```python
    import pandas as pd
    import sempy.fabric as fabric
    from sempy.fabric import FabricDataFrame
    from sempy.dependencies import plot_dependency_metadata
    from sempy.samples import download_synthea
    ```

1. Pull the sample data. For this tutorial, you use the _Synthea_ dataset of synthetic medical records (small version for simplicity):

    ```python
    download_synthea(which='small')
    ```

## Explore the data

1. Initialize a ``FabricDataFrame`` with the content of the _providers.csv_ file:

    ```python
    providers = FabricDataFrame(pd.read_csv("synthea/csv/providers.csv"))
    providers.head()
    ```

1. Check for data quality issues with SemPy's `find_dependencies` function by plotting a graph of autodetected functional dependencies:

    ```python
    deps = providers.find_dependencies()
    plot_dependency_metadata(deps)
    ```

    :::image type="content" source="media/tutorial-data-cleaning-functional-dependencies/graph-of-functional-dependencies.png" alt-text="Screenshot showing the graph of functional dependencies." lightbox="media/tutorial-data-cleaning-functional-dependencies/graph-of-functional-dependencies.png":::

    The graph of functional dependencies shows that `Id` determines `NAME` and  `ORGANIZATION` (indicated by the solid arrows), which is expected, since `Id` is unique:

1. Confirm that `Id` is unique:

    ```python
    providers.Id.is_unique
    ```

    The code returns `True` to confirm that `Id` is unique.

## Analyze functional dependencies in depth

The functional dependencies graph also shows that `ORGANIZATION` determines `ADDRESS` and `ZIP`, as expected. However, you might expect `ZIP` to also determine `CITY`, but the dashed arrow indicates that the dependency is only approximate, pointing towards a data quality issue.

There are other peculiarities in the graph. For example, `NAME` doesn't determine `GENDER`, `Id`, `SPECIALITY`, or `ORGANIZATION`. Each of these peculiarities might be worth investigating.

1. Take a deeper look at the approximate relationship between `ZIP` and `CITY`, by using SemPy's `list_dependency_violations` function to see a tabular list of violations:

    ```python
    providers.list_dependency_violations('ZIP', 'CITY')
    ```

1. Draw a graph with SemPy's `plot_dependency_violations` visualization function. This graph is helpful if the number of violations is small:

    ```python
    providers.plot_dependency_violations('ZIP', 'CITY')
    ```

    :::image type="content" source="media/tutorial-data-cleaning-functional-dependencies/plot-of-dependency-violations.png" alt-text="Screenshot showing the plot of dependency violations.":::

    The plot of dependency violations shows values for `ZIP` on the left hand side, and values for `CITY` on the right hand side. An edge connects a zip code on the left hand side of the plot with a city on the right hand side if there's a row that contains these two values. The edges are annotated with the count of such rows. For example, there are two rows with zip code 02747-1242, one row with city "NORTH DARTHMOUTH" and the other with city "DARTHMOUTH", as shown in the previous plot and the following code:

1. Confirm the previous observations you made with the plot of dependency violations by running the following code:

    ```python
    providers[providers.ZIP == '02747-1242'].CITY.value_counts()
    ```

1. The plot also shows that among the rows that have `CITY` as "DARTHMOUTH", nine rows have a `ZIP` of 02747-1262; one row has a `ZIP` of 02747-1242; and one row has a `ZIP` of 02747-2537. Confirms these observations with the following code:

    ```python
    providers[providers.CITY == 'DARTMOUTH'].ZIP.value_counts()
    ```

1. There are other zip codes associated with "DARTMOUTH", but these zip codes aren't shown in the graph of dependency violations, as they don't hint at data quality issues. For example, the zip code "02747-4302" is uniquely associated to "DARTMOUTH" and doesn't show up in the graph of dependency violations. Confirm by running the following code:

    ```python
    providers[providers.ZIP == '02747-4302'].CITY.value_counts()
    ```

## Summarize data quality issues detected with SemPy

Going back to the graph of dependency violations, you can see that there are several interesting data quality issues present in this semantic model:

- Some city names are all uppercase. This issue is easy to fix using string methods.
- Some city names have qualifiers (or prefixes), such as "North" and "East". For example, the zip code "2128" maps to "EAST BOSTON" once and to "BOSTON" once. A similar issue occurs between "NORTH DARTHMOUTH" and "DARTHMOUTH". You could try to drop these qualifiers or map the zip codes to the city with the most common occurrence.
- There are typos in some cities, such as "PITTSFIELD" vs. "PITTSFILED" and "NEWBURGPORT vs. "NEWBURYPORT". For "NEWBURGPORT" this typo could be fixed by using the most common occurrence. For "PITTSFIELD", having only one occurrence each makes it much harder for automatic disambiguation without external knowledge or the use of a language model.
- Sometimes, prefixes like "West" are abbreviated to a single letter "W". This issue could potentially be fixed with a simple replace, if all occurrences of "W" stand for "West".
- The zip code "02130" maps to "BOSTON" once and "Jamaica Plain" once. This issue isn't easy to fix, but if there was more data, mapping to the most common occurrence could be a potential solution.

## Clean the data

1. Fix the capitalization issues by changing all capitalization to title case:

    ```python
    providers['CITY'] = providers.CITY.str.title()
    ```

1. Run the violation detection again to see that some of the ambiguities are gone (the number of violations is smaller):

    ```python
    providers.list_dependency_violations('ZIP', 'CITY')
    ```

    At this point, you could refine your data more manually, but one potential data cleanup task is to drop rows that violate functional constraints between columns in the data, by using SemPy's `drop_dependency_violations` function.

    For each value of the determinant variable, `drop_dependency_violations` works by picking the most common value of the dependent variable and dropping all rows with other values. You should apply this operation only if you're confident that this statistical heuristic would lead to the correct results for your data. Otherwise you should write your own code to handle the detected violations as needed.

1. Run the `drop_dependency_violations` function on the `ZIP` and `CITY` columns:

    ```python
    providers_clean = providers.drop_dependency_violations('ZIP', 'CITY')
    ```

1. List any dependency violations between `ZIP` and `CITY`:

    ```python
    providers_clean.list_dependency_violations('ZIP', 'CITY')
    ```

    The code returns an empty list to indicate that there are no more violations of the functional constraint **CITY -> ZIP**.

## Related content

Check out other tutorials for semantic link / SemPy:

- [Tutorial: Analyze functional dependencies in a sample semantic model (preview)](tutorial-power-bi-dependencies.md)
- [Tutorial: Extract and calculate Power BI measures from a Jupyter notebook (preview)](tutorial-power-bi-measures.md)
- [Tutorial: Discover relationships in a semantic model, using semantic link (preview)](tutorial-power-bi-relationships.md)
- [Tutorial: Discover relationships in the _Synthea_ dataset, using semantic link (preview)](tutorial-relationships-detection.md)
- [Tutorial: Validate data using SemPy and Great Expectations (GX) (preview)](tutorial-great-expectations.md)

<!-- nbend -->
