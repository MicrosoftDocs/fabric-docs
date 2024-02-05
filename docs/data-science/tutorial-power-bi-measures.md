---
title: 'Tutorial: Extract and calculate Power BI measures from a Jupyter notebook (preview)'
description: This article shows how to use SemPy to calculate measures in Power BI semantic models.
ms.reviewer: mopeakande
reviewer: msakande
ms.author: alsavelv
author: alsavelv
ms.topic: tutorial
ms.custom:
  - ignite-2023
ms.date: 09/27/2023
---

<!-- nbstart https://raw.githubusercontent.com/microsoft/fabric-samples/main/docs-samples/data-science/semantic-link-samples/powerbi_measures_tutorial.ipynb -->

# Tutorial: Extract and calculate Power BI measures from a Jupyter notebook (preview)

This tutorial illustrates how to use SemPy (preview) to calculate measures in semantic models (Power BI datasets).

[!INCLUDE [feature-preview](../includes/feature-preview-note.md)]

In this tutorial, you learn how to:

- Evaluate Power BI measures programmatically via a Python interface of semantic link's Python library ([SemPy](/python/api/semantic-link-sempy)).
- Get familiarized with components of SemPy that help to bridge the gap between AI and BI. These components include:
    - FabricDataFrame - a pandas-like structure enhanced with additional semantic information.
    - Useful functions that allow you to fetch semantic models, including raw data, configurations, and measures.

## Prerequisites

[!INCLUDE [prerequisites](./includes/prerequisites.md)]
* Select **Workspaces** from the left navigation pane to find and select your workspace. This workspace becomes your current workspace.

* Download the [_Retail Analysis Sample PBIX.pbix_](https://download.microsoft.com/download/9/6/D/96DDC2FF-2568-491D-AAFA-AFDD6F763AE3/Retail%20Analysis%20Sample%20PBIX.pbix) semantic model and upload it to your workspace.

### Follow along in the notebook

The [powerbi_measures_tutorial.ipynb](https://github.com/microsoft/fabric-samples/blob/main/docs-samples/data-science/semantic-link-samples/powerbi_measures_tutorial.ipynb) notebook accompanies this tutorial.

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
    ```

1. You can connect to the Power BI workspace. List the semantic models in the workspace:

    ```python
    fabric.list_datasets()
    ```

1. Load the semantic model. In this tutorial, you use the _Retail Analysis Sample PBIX_ semantic model:

    ```python
    dataset = "Retail Analysis Sample PBIX"
    ```

## List workspace measures

List measures in the semantic model, using SemPy's `list_measures` function as follows:

```python
fabric.list_measures(dataset)
```

## Evaluate measures

In this section, you evaluate measures in various ways, using SemPy's `evaluate_measure` function.

### Evaluate a raw measure

In the following code, use SemPy's `evaluate_measure` function to calculate a preconfigured measure that is called "Average Selling Area Size". You can see the underlying formula for this measure in the output of the previous cell.

```python
fabric.evaluate_measure(dataset, measure="Average Selling Area Size")
```

### Evaluate a measure with `groupby_columns`

You can group the measure output by certain columns by supplying the extra parameter `groupby_columns`:

```python
fabric.evaluate_measure(dataset, measure="Average Selling Area Size", groupby_columns=["Store[Chain]", "Store[DistrictName]"])
```

In the previous code, you grouped by the columns `Chain` and `DistrictName` of the `Store` table in the semantic model.

### Evaluate a measure with filters

You can also use the `filters` parameter to specify specific values that the result can contain for particular columns:

```python
fabric.evaluate_measure(dataset, \
                        measure="Total Units Last Year", \
                        groupby_columns=["Store[Territory]"], \
                        filters={"Store[Territory]": ["PA", "TN", "VA"], "Store[Chain]": ["Lindseys"]})
```

In the previous code, `Store` is the name of the table, `Territory` is the name of the column, and `PA` is one of the values that the filter allows.

### Evaluate a measure across multiple tables

You can group the measure by columns that span across multiple tables in the semantic model.

```python
fabric.evaluate_measure(dataset, measure="Total Units Last Year", groupby_columns=["Store[Territory]", "Sales[ItemID]"])
```

### Evaluate multiple measures

The function `evaluate_measure` allows you to supply identifiers of multiple measures and output the calculated values in the same DataFrame:

```python
fabric.evaluate_measure(dataset, measure=["Average Selling Area Size", "Total Stores"], groupby_columns=["Store[Chain]", "Store[DistrictName]"])
```

## Use Power BI XMLA connector

The default semantic model client is backed by Power BI's REST APIs. If there are any issues running queries with this client, it's possible to switch the back end to Power BI's XMLA interface using `use_xmla=True`. The SemPy parameters remain the same for measure calculation with XMLA.

```python
fabric.evaluate_measure(dataset, \
                        measure=["Average Selling Area Size", "Total Stores"], \
                        groupby_columns=["Store[Chain]", "Store[DistrictName]"], \
                        filters={"Store[Territory]": ["PA", "TN", "VA"], "Store[Chain]": ["Lindseys"]}, \
                        use_xmla=True)
```

## Related content

Check out other tutorials for semantic link / SemPy:

- [Tutorial: Clean data with functional dependencies (preview)](tutorial-data-cleaning-functional-dependencies.md)
- [Tutorial: Analyze functional dependencies in a sample semantic model (preview)](tutorial-power-bi-dependencies.md)
- [Tutorial: Discover relationships in a semantic model, using semantic link (preview)](tutorial-power-bi-relationships.md)
- [Tutorial: Discover relationships in the _Synthea_ dataset, using semantic link (preview)](tutorial-relationships-detection.md)
- [Tutorial: Validate data using SemPy and Great Expectations (GX) (preview)](tutorial-great-expectations.md)

<!-- nbend -->
