---
title: 'Tutorial: Analyze functional dependencies in a Power BI semantic model (preview)'
description: This article shows how to analyze functional dependencies that exist in columns of a DataFrame.
ms.reviewer: mopeakande
reviewer: msakande
ms.author: alsavelv
author: alsavelv
ms.topic: tutorial
ms.custom:
  - ignite-2023
ms.date: 09/27/2023
---

<!-- nbstart https://raw.githubusercontent.com/microsoft/fabric-samples/main/docs-samples/data-science/semantic-link-samples/powerbi_dependencies_tutorial.ipynb -->

# Tutorial: Analyze functional dependencies in a semantic model (preview)

In this tutorial, you build upon prior work done by a Power BI analyst and stored in the form of semantic models (Power BI datasets). By using SemPy (preview) in the Synapse Data Science experience within Microsoft Fabric, you analyze functional dependencies that exist in columns of a DataFrame. This analysis helps to discover nontrivial data quality issues in order to gain more accurate insights.

[!INCLUDE [feature-preview](../includes/feature-preview-note.md)]

In this tutorial, you learn how to:

- Apply domain knowledge to formulate hypotheses about functional dependencies in a semantic model.
- Get familiarized with components of semantic link's Python library ([SemPy](/python/api/semantic-link-sempy)) that support integration with Power BI and help to automate data quality analysis. These components include:
    - FabricDataFrame - a pandas-like structure enhanced with additional semantic information.
    - Useful functions for pulling semantic models from a Fabric workspace into your notebook.
    - Useful functions that automate the evaluation of hypotheses about functional dependencies and that identify violations of relationships in your semantic models.

## Prerequisites

[!INCLUDE [prerequisites](./includes/prerequisites.md)]
* Select **Workspaces** from the left navigation pane to find and select your workspace. This workspace becomes your current workspace.

* Download the [_Customer Profitability Sample.pbix_](https://github.com/microsoft/fabric-samples/blob/main/docs-samples/data-science/datasets/Customer%20Profitability%20Sample.pbix) semantic model from the [fabric-samples GitHub repository](https://github.com/microsoft/fabric-samples/blob/main/docs-samples/data-science/datasets) and upload it to your workspace.

### Follow along in the notebook

The [powerbi_dependencies_tutorial.ipynb](https://github.com/microsoft/fabric-samples/blob/main/docs-samples/data-science/semantic-link-samples/powerbi_dependencies_tutorial.ipynb) notebook accompanies this tutorial.

[!INCLUDE [follow-along-github-notebook](./includes/follow-along-github-notebook.md)]

## Set up the notebook

In this section, you set up a notebook environment with the necessary modules and data.

1. Install `SemPy` from PyPI using the `%pip` in-line installation capability within the notebook:

    ```python
    %pip install semantic-link
    ```

1. Perform necessary imports of modules that you'll need later:

    ```python
    import sempy.fabric as fabric
    from sempy.dependencies import plot_dependency_metadata
    ```

## Load and preprocess the data

This tutorial uses a standard sample semantic model [Customer Profitability Sample.pbix](https://github.com/microsoft/fabric-samples/tree/main/docs-samples/data-science/datasets). For a description of the semantic model, see [Customer Profitability sample for Power BI](/power-bi/create-reports/sample-customer-profitability).

1. Load the Power BI data into FabricDataFrames, using SemPy's `read_table` function:

    ```python
    dataset = "Customer Profitability Sample"
    customer = fabric.read_table(dataset, "Customer")
    customer.head()
    ```

1. Load the `State` table into a FabricDataFrame:

    ```python
    state = fabric.read_table(dataset, "State")
    state.head()
    ```

    While the output of this code looks like a pandas DataFrame, you've actually initialized a data structure called a ``FabricDataFrame`` that supports some useful operations on top of pandas.

1. Check the data type of `customer`:

    ```python
    type(customer)
    ```

    The output confirms that `customer` is of type `sempy.fabric._dataframe._fabric_dataframe.FabricDataFrame`.`

1. Join the `customer` and `state` DataFrames:

    ```python
    customer_state_df = customer.merge(state, left_on="State", right_on="StateCode",  how='left')
    customer_state_df.head()
    ```

## Identify functional dependencies

A functional dependency manifests itself as a one-to-many relationship between the values in two (or more) columns within a DataFrame. These relationships can be used to automatically detect data quality problems.

1. Run SemPy's `find_dependencies` function on the merged DataFrame to identify any existing functional dependencies between values in the columns:

    ```python
    dependencies = customer_state_df.find_dependencies()
    dependencies
    ```

1. Visualize the identified dependencies by using SemPy's ``plot_dependency_metadata`` function:

    ```python
    plot_dependency_metadata(dependencies)
    ```

    :::image type="content" source="media/tutorial-power-bi-dependencies/plot-of-dependency-metadata.png" alt-text="Screenshot showing the plot of dependency metadata." lightbox="media/tutorial-power-bi-dependencies/plot-of-dependency-metadata.png":::

    As expected, the functional dependencies graph shows that the `Customer` column determines some columns like `City`, `Postal Code`, and `Name`.

    Surprisingly, the graph doesn't show a functional dependency between `City` and `Postal Code`, probably because there are many violations in the relationships between the columns. You can use SemPy's ``plot_dependency_violations`` function to visualize violations of dependencies between specific columns.

## Explore the data for quality issues

1. Draw a graph with SemPy's `plot_dependency_violations` visualization function.

    ```python
    customer_state_df.plot_dependency_violations('Postal Code', 'City')
    ```

    :::image type="content" source="media/tutorial-power-bi-dependencies/plot-of-dependency-violations.png" alt-text="Screenshot showing the plot of dependency violations.":::

    The plot of dependency violations shows values for `Postal Code` on the left hand side, and values for `City` on the right hand side. An edge connects a `Postal Code` on the left hand side with a `City` on the right hand side if there's a row that contains these two values. The edges are annotated with the count of such rows. For example, there are two rows with postal code 20004, one with city "North Tower" and the other with city "Washington".

    Moreover, the plot shows a few violations and many empty values.

1. Confirm the number of empty values for `Postal Code`:

    ```python
    customer_state_df['Postal Code'].isna().sum()
    ```

    50 rows have NA for postal code.

1. Drop rows with empty values. Then, find dependencies using the `find_dependencies` function. Notice the extra parameter `verbose=1` that offers a glimpse into the internal workings of SemPy:

    ```python
    customer_state_df2=customer_state_df.dropna()
    customer_state_df2.find_dependencies(verbose=1)
    ```

    The conditional entropy for `Postal Code` and `City` is 0.049. This value indicates that there are functional dependency violations. Before you fix the violations, raise the threshold on conditional entropy from the default value of `0.01` to `0.05`, just to see the dependencies. Lower thresholds result in fewer dependencies (or higher selectivity).

1. Raise the threshold on conditional entropy from the default value of `0.01` to `0.05`:

    ```python
    plot_dependency_metadata(customer_state_df2.find_dependencies(threshold=0.05))
    ```

    :::image type="content" source="media/tutorial-power-bi-dependencies/plot-of-dependency-metadata-for-higher-entropy-threshold.png" alt-text="Plot of the dependency metadata with a higher threshold for entropy." lightbox="media/tutorial-power-bi-dependencies/plot-of-dependency-metadata-for-higher-entropy-threshold.png":::

    If you apply domain knowledge of which entity determines values of other entities, this dependencies graph seems accurate.

1. Explore more data quality issues that were detected. For example, a dashed arrow joins `City` and `Region`, which indicates that the dependency is only approximate. This approximate relationship could imply that there's a partial functional dependency.

    ```python
    customer_state_df.list_dependency_violations('City', 'Region')
    ```

1. Take a closer look at each of the cases where a nonempty `Region` value causes a violation:

    ```python
    customer_state_df[customer_state_df.City=='Downers Grove']
    ```

    The result shows Downers Grove city occurring in Illinois and Nebraska. However, Downer's Grove is a [city in Illinois](https://en.wikipedia.org/wiki/Downers_Grove,_Illinois), not Nebraska.

1. Take a look at the city of _Fremont_:

    ```python
    customer_state_df[customer_state_df.City=='Fremont']
    ```

    There's a city called [Fremont in California](https://en.wikipedia.org/wiki/Fremont,_California). However, for Texas, the search engine returns [Premont](https://en.wikipedia.org/wiki/Premont,_Texas), not Fremont.

1. It's also suspicious to see violations of the dependency between `Name` and `Country/Region`, as signified by the dotted line in the original graph of dependency violations (before dropping the rows with empty values).

    ```python
    customer_state_df.list_dependency_violations('Name', 'Country/Region')
    ```

    It appears that one customer, _SDI Design_ is present in two regions - United States and Canada. This occurrence may not be a semantic violation, but may just be an uncommon case. Still, it's worth taking a close look:

1. Take a closer look at the customer _SDI Design_:

    ```python
    customer_state_df[customer_state_df.Name=='SDI Design']
    ```

    Further inspection shows that it's actually two different customers (from different industries) with the same name.

Exploratory data analysis is an exciting process, and so is data cleaning. There's always something that the data is hiding, depending on how you look at it, what you want to ask, and so on. Semantic link provides you with new tools that you can use to achieve more with your data.

## Related content

Check out other tutorials for semantic link / SemPy:

- [Tutorial: Clean data with functional dependencies (preview)](tutorial-data-cleaning-functional-dependencies.md)
- [Tutorial: Extract and calculate Power BI measures from a Jupyter notebook (preview)](tutorial-power-bi-measures.md)
- [Tutorial: Discover relationships in a semantic model, using semantic link (preview)](tutorial-power-bi-relationships.md)
- [Tutorial: Discover relationships in the _Synthea_ dataset, using semantic link (preview)](tutorial-relationships-detection.md)
- [Tutorial: Validate data using SemPy and Great Expectations (GX) (preview)](tutorial-great-expectations.md)

<!-- nbend -->
