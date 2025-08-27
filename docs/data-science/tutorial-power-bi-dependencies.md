---
title: 'Tutorial: Analyze functional dependencies in a Power BI semantic model'
description: This article shows how to analyze functional dependencies that exist in columns of a DataFrame.
ms.author: jburchel
author: jonburchel
ms.reviewer: alsavelv
reviewer: alsavelv
ms.topic: tutorial
ms.custom: 
ms.date: 08/26/2025
ai.usage: ai-assisted
---

<!-- nbstart https://raw.githubusercontent.com/microsoft/fabric-samples/main/docs-samples/data-science/semantic-link-samples/powerbi_dependencies_tutorial.ipynb -->

# Tutorial: Analyze functional dependencies in a semantic model

In this tutorial, you build on work by a Power BI analyst that's stored as semantic models (Power BI datasets). By using SemPy (preview) in the Synapse Data Science experience in Microsoft Fabric, you analyze functional dependencies in DataFrame columns. This analysis helps you discover subtle data quality issues to get more accurate insights.

In this tutorial, you learn how to:

- Apply domain knowledge to formulate hypotheses about functional dependencies in a semantic model.
- Get familiar with components of Semantic Link's Python library ([SemPy](/python/api/semantic-link-sempy)) that integrate with Power BI and help automate data quality analysis. These components include:
    - FabricDataFrame—pandas-like structure enhanced with additional semantic information
    - Functions that pull semantic models from a Fabric workspace into your notebook
    - Functions that evaluate functional dependency hypotheses and identify relationship violations in your semantic models


## Prerequisites

[!INCLUDE [prerequisites](./includes/prerequisites.md)]
1. Select **Workspaces** from the navigation pane to find and select your workspace. This workspace becomes your current workspace.

1. Download the [_Customer Profitability Sample.pbix_](https://github.com/microsoft/fabric-samples/blob/main/docs-samples/data-science/datasets/Customer%20Profitability%20Sample.pbix) file from the [fabric-samples GitHub repository](https://github.com/microsoft/fabric-samples/blob/main/docs-samples/data-science/datasets).
1. In your workspace, select __Import__ > __Report or Paginated Report__ > __From this computer__ to upload the _Customer Profitability Sample.pbix_ file to your workspace.

### Follow along in the notebook

The [powerbi_dependencies_tutorial.ipynb](https://github.com/microsoft/fabric-samples/blob/main/docs-samples/data-science/semantic-link-samples/powerbi_dependencies_tutorial.ipynb) notebook accompanies this tutorial.

[!INCLUDE [follow-along-github-notebook](./includes/follow-along-github-notebook.md)]

## Set up the notebook

Set up a notebook environment with the modules and data you need.

1. Use `%pip` to install SemPy from PyPI in the notebook.

    ```python
    %pip install semantic-link
    ```

1. Import the modules you need.

    ```python
    import sempy.fabric as fabric
    from sempy.dependencies import plot_dependency_metadata
    ```

## Load and preprocess the data

This tutorial uses a standard sample semantic model [Customer Profitability Sample.pbix](https://github.com/microsoft/fabric-samples/tree/main/docs-samples/data-science/datasets). For a description of the semantic model, see [Customer Profitability sample for Power BI](/power-bi/create-reports/sample-customer-profitability).

1. Load Power BI data into a `FabricDataFrame` by using the `fabric.read_table` function.

    ```python
    dataset = "Customer Profitability Sample"
    customer = fabric.read_table(dataset, "Customer")
    customer.head()
    ```

1. Load the `State` table into a `FabricDataFrame`.

    ```python
    state = fabric.read_table(dataset, "State")
    state.head()
    ```

    Although the output looks like a pandas DataFrame, this code initializes a data structure called a `FabricDataFrame` that adds operations on top of pandas.

1. Check the data type of `customer`.

    ```python
    type(customer)
    ```

    The output shows that `customer` is `sempy.fabric._dataframe._fabric_dataframe.FabricDataFrame`.

1. Join the `customer` and `state` `DataFrame` objects.

    ```python
    customer_state_df = customer.merge(state, left_on="State", right_on="StateCode", how='left')
    customer_state_df.head()
    ```

## Identify functional dependencies

A functional dependency is a one-to-many relationship between values in two or more columns in a `DataFrame`. Use these relationships to automatically detect data quality problems.

1. Run SemPy's `find_dependencies` function on the merged `DataFrame` to identify functional dependencies between column values.

    ```python
    dependencies = customer_state_df.find_dependencies()
    dependencies
    ```

1. Visualize the dependencies by using SemPy's `plot_dependency_metadata` function.

    ```python
    plot_dependency_metadata(dependencies)
    ```

    :::image type="content" source="media/tutorial-power-bi-dependencies/plot-of-dependency-metadata.png" alt-text="Screenshot of the dependency metadata plot." lightbox="media/tutorial-power-bi-dependencies/plot-of-dependency-metadata.png":::

    The functional dependencies graph shows that the `Customer` column determines columns like `City`, `Postal Code`, and `Name`.

    The graph doesn't show a functional dependency between `City` and `Postal Code`, likely because there are many violations in the relationship between the columns. Use SemPy's `plot_dependency_violations` function to visualize dependency violations between specific columns.

## Explore the data for quality issues

1. Draw a graph with SemPy's `plot_dependency_violations` visualization function.

    ```python
    customer_state_df.plot_dependency_violations('Postal Code', 'City')
    ```

    :::image type="content" source="media/tutorial-power-bi-dependencies/plot-of-dependency-violations.png" alt-text="Screenshot of a plot that shows dependency violations.":::

    The plot of dependency violations shows values for `Postal Code` on the left side, and values for `City` on the right side. An edge connects a `Postal Code` on the left hand side with a `City` on the right hand side if there's a row that contains these two values. The edges are annotated with the count of such rows. For example, there are two rows with postal code 20004, one with city "North Tower" and the other with city "Washington".

    The plot also shows a few violations and many empty values.

1. Confirm the number of empty values for `Postal Code`:

    ```python
    customer_state_df['Postal Code'].isna().sum()
    ```

    50 rows have NA for `Postal Code`.

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

    :::image type="content" source="media/tutorial-power-bi-dependencies/plot-of-dependency-metadata-for-higher-entropy-threshold.png" alt-text="Screenshot of the dependency metadata plot with a higher entropy threshold." lightbox="media/tutorial-power-bi-dependencies/plot-of-dependency-metadata-for-higher-entropy-threshold.png":::

    If you apply domain knowledge of which entity determines the values of other entities, this dependency graph seems accurate.

1. Explore more data quality issues that were detected. For example, a dashed arrow joins `City` and `Region`, which indicates that the dependency is only approximate. This approximate relationship could imply that there's a partial functional dependency.

    ```python
    customer_state_df.list_dependency_violations('City', 'Region')
    ```

1. Take a closer look at each of the cases where a nonempty `Region` value causes a violation:

    ```python
    customer_state_df[customer_state_df.City=='Downers Grove']
    ```

    The result shows the city of Downers Grove in Illinois and Nebraska. However, Downers Grove is a [city in Illinois](https://en.wikipedia.org/wiki/Downers_Grove,_Illinois), not Nebraska.

1. Take a look at the city of _Fremont_:

    ```python
    customer_state_df[customer_state_df.City=='Fremont']
    ```

    There's a city called [Fremont in California](https://en.wikipedia.org/wiki/Fremont,_California). However, for Texas, the search engine returns [Premont](https://en.wikipedia.org/wiki/Premont,_Texas), not Fremont.

1. It's also suspicious to see violations of the dependency between `Name` and `Country/Region`, as signified by the dotted line in the original graph of dependency violations (before dropping the rows with empty values).

    ```python
    customer_state_df.list_dependency_violations('Name', 'Country/Region')
    ```

    One customer, SDI Design, appears in two regions—United States and Canada. This case might not be a semantic violation, just uncommon. Still, it's worth a close look:

1. Take a closer look at the customer _SDI Design_:

    ```python
    customer_state_df[customer_state_df.Name=='SDI Design']
    ```

    Further inspection shows two different customers from different industries with the same name.

Exploratory data analysis and data cleaning are iterative. What you find depends on your questions and perspective. Semantic Link gives you new tools to get more from your data.

## Related content

Check out other tutorials for semantic link and SemPy:

- [Tutorial: Clean data with functional dependencies](tutorial-data-cleaning-functional-dependencies.md)
- [Tutorial: Extract and calculate Power BI measures from a Jupyter notebook](tutorial-power-bi-measures.md)
- [Tutorial: Discover relationships in a semantic model, using semantic link](tutorial-power-bi-relationships.md)
- [Tutorial: Discover relationships in the Synthea dataset, using semantic link](tutorial-relationships-detection.md)
- [Tutorial: Validate data using SemPy and Great Expectations (GX)](tutorial-great-expectations.md)

<!-- nbend -->
