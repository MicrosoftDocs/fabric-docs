---
title: 'Tutorial: Discover relationships in a Power BI semantic model using semantic link'
description: This article shows how to interact with Power BI from a Jupyter notebook with the help of the SemPy library.
ms.reviewer: mopeakande
reviewer: msakande
ms.author: alsavelv
author: alsavelv
ms.topic: tutorial
ms.custom:
  - ignite-2023
ms.date: 09/27/2023
---

<!-- nbstart https://raw.githubusercontent.com/microsoft/fabric-samples/main/docs-samples/data-science/semantic-link-samples/powerbi_relationships_tutorial.ipynb -->

# Tutorial: Discover relationships in a semantic model, using semantic link

This tutorial illustrates how to interact with Power BI from a Jupyter notebook and detect relationships between tables with the help of the SemPy library.

In this tutorial, you learn how to:

- Discover relationships in a semantic model (Power BI dataset), using semantic link's Python library ([SemPy](/python/api/semantic-link-sempy)).
- Use components of SemPy that support integration with Power BI and help to automate data quality analysis. These components include:
    - FabricDataFrame - a pandas-like structure enhanced with additional semantic information.
    - Functions for pulling semantic models from a Fabric workspace into your notebook.
    - Functions that automate the evaluation of hypotheses about functional dependencies and that identify violations of relationships in your semantic models.

## Prerequisites

[!INCLUDE [prerequisites](./includes/prerequisites.md)]
* Select **Workspaces** from the left navigation pane to find and select your workspace. This workspace becomes your current workspace.

* Download the _Customer Profitability Sample.pbix_ and _Customer Profitability Sample (auto).pbix_ semantic models from the [fabric-samples GitHub repository](https://github.com/microsoft/fabric-samples/tree/main/docs-samples/data-science/datasets) and upload them to your workspace.

### Follow along in the notebook

The [powerbi_relationships_tutorial.ipynb](https://github.com/microsoft/fabric-samples/blob/main/docs-samples/data-science/semantic-link-samples/powerbi_relationships_tutorial.ipynb) notebook accompanies this tutorial.

[!INCLUDE [follow-along-github-notebook](./includes/follow-along-github-notebook.md)]

## Set up the notebook

In this section, you set up a notebook environment with the necessary modules and data.

1. Install `SemPy` from PyPI using the `%pip` in-line installation capability within the notebook:

    ```python
    %pip install semantic-link
    ```

1. Perform necessary imports of SemPy modules that you'll need later:

    ```python
    import sempy.fabric as fabric
    
    from sempy.relationships import plot_relationship_metadata
    from sempy.relationships import find_relationships
    from sempy.fabric import list_relationship_violations
    ```

1. Import pandas for enforcing a configuration option that helps with output formatting:

    ```python
    import pandas as pd
    pd.set_option('display.max_colwidth', None)
    ```

## Explore semantic models

This tutorial uses a standard sample semantic model [_Customer Profitability Sample.pbix_](https://github.com/microsoft/fabric-samples/blob/main/docs-samples/data-science/datasets/Customer%20Profitability%20Sample.pbix). For a description of the semantic model, see [Customer Profitability sample for Power BI](/power-bi/create-reports/sample-customer-profitability).

- Use SemPy's `list_datasets` function to explore semantic models in your current workspace:

    ```python
    fabric.list_datasets()
    ```

For the rest of this notebook you use two versions of the Customer Profitability Sample semantic model:

- *Customer Profitability Sample*: the semantic model as it comes from Power BI samples with predefined table relationships
- *Customer Profitability Sample (auto)*: the same data, but relationships are limited to those ones that Power BI would autodetect.

## Extract a sample semantic model with its predefined semantic model

1. Load relationships that are predefined and stored within the _Customer Profitability Sample_ semantic model, using SemPy's `list_relationships` function. This function lists from the Tabular Object Model:

    ```python
    dataset = "Customer Profitability Sample"
    relationships = fabric.list_relationships(dataset)
    relationships
    ```

1. Visualize the `relationships` DataFrame as a graph, using SemPy's `plot_relationship_metadata` function:

    ```python
    plot_relationship_metadata(relationships)
    ```

    :::image type="content" source="media/tutorial-power-bi-relationships/plot-of-relationship-metadata.png" alt-text="Screenshot showing a plot of the relationships between tables in the semantic model." lightbox="media/tutorial-power-bi-relationships/plot-of-relationship-metadata.png":::

This graph shows the "ground truth" for relationships between tables in this semantic model, as it reflects how they were defined in Power BI by a subject matter expert.

## Complement relationships discovery

If you started with relationships that Power BI autodetected, you'd have a smaller set.

1. Visualize the relationships that Power BI autodetected in the semantic model:

    ```python
    dataset = "Customer Profitability Sample (auto)"
    autodetected = fabric.list_relationships(dataset)
    plot_relationship_metadata(autodetected)
    ```

    :::image type="content" source="media/tutorial-power-bi-relationships/plot-metadata-for-autodetected-relationships.png" alt-text="Screenshot showing the relationships that Power BI autodetected in the semantic model." lightbox="media/tutorial-power-bi-relationships/plot-metadata-for-autodetected-relationships.png":::

    Power BI's autodetection missed many relationships. Moreover, two of the autodetected relationships are semantically incorrect:

    - `Executive[ID]` -> `Industry[ID]`
    - `BU[Executive_id]` -> `Industry[ID]`

1. Print the relationships as a table:

    ```python
    autodetected
    ```

    Incorrect relationships to the `Industry` table appear in rows with index 3 and 4. Use this information to remove these rows.

1. Discard the incorrectly identified relationships.

    ```python
    autodetected.drop(index=[3,4], inplace=True)
    autodetected
    ```

    Now you have correct, but incomplete relationships.

1. Visualize these incomplete relationships, using `plot_relationship_metadata`:

    ```python
    plot_relationship_metadata(autodetected)
    ```

    :::image type="content" source="media/tutorial-power-bi-relationships/plot-metadata-for-incomplete-relationships.png" alt-text="Screenshot that shows a visualization of relationships after removing incorrect ones." lightbox="media/tutorial-power-bi-relationships/plot-metadata-for-incomplete-relationships.png":::

1. Load all the tables from the semantic model, using SemPy's `list_tables` and `read_table` functions:

    ```python
    tables = {table: fabric.read_table(dataset, table) for table in fabric.list_tables(dataset)['Name']}
    
    tables.keys()
    ```

1. Find relationships between tables, using `find_relationships`, and review the log output to get some insights into how this function works:

    ```python
    suggested_relationships_all = find_relationships(
        tables,
        name_similarity_threshold=0.7,
        coverage_threshold=0.7,
        verbose=2
    )
    ```

1. Visualize newly discovered relationships:

    ```python
    plot_relationship_metadata(suggested_relationships_all)
    ```

    :::image type="content" source="media/tutorial-power-bi-relationships/plot-metadata-for-newly-discovered-relationships.png" alt-text="Screenshot that shows visualization of newly discovered relationships." lightbox="media/tutorial-power-bi-relationships/plot-metadata-for-newly-discovered-relationships.png":::

    SemPy was able to detect all relationships.

1. Use the `exclude` parameter to limit the search to additional relationships that weren't identified previously:

    ```python
    additional_relationships = find_relationships(
        tables,
        exclude=autodetected,
        name_similarity_threshold=0.7,
        coverage_threshold=0.7
    )
    
    additional_relationships
    ```

## Validate the relationships

1. First, load the data from the _Customer Profitability Sample_ semantic model:

    ```python
    dataset = "Customer Profitability Sample"
    tables = {table: fabric.read_table(dataset, table) for table in fabric.list_tables(dataset)['Name']}
    
    tables.keys()
    ```

1. Check for overlap of primary and foreign key values by using the `list_relationship_violations` function. Supply the output of the `list_relationships` function as input to `list_relationship_violations`:

    ```python
    list_relationship_violations(tables, fabric.list_relationships(dataset))
    ```

    The relationship violations provide some interesting insights. For example, one out of seven values in `Fact[Product Key]` isn't present in `Product[Product Key]`, and this missing key is `50`.

Exploratory data analysis is an exciting process, and so is data cleaning. There's always something that the data is hiding, depending on how you look at it, what you want to ask, and so on. Semantic link provides you with new tools that you can use to achieve more with your data.

## Related content

Check out other tutorials for semantic link / SemPy:

- [Tutorial: Clean data with functional dependencies](tutorial-data-cleaning-functional-dependencies.md)
- [Tutorial: Analyze functional dependencies in a sample semantic model](tutorial-power-bi-dependencies.md)
- [Tutorial: Extract and calculate Power BI measures from a Jupyter notebook](tutorial-power-bi-measures.md)
- [Tutorial: Discover relationships in the _Synthea_ dataset, using semantic link](tutorial-relationships-detection.md)
- [Tutorial: Validate data using SemPy and Great Expectations (GX) (preview)](tutorial-great-expectations.md)
<!-- nbend -->
