---
title: 'Tutorial: Extract and calculate Power BI measures from a Jupyter notebook'
description: This article shows how to use SemPy to calculate measures in Power BI semantic models.
ms.reviewer: alsavelv
reviewer: alsavelv
ms.author: jburchel
author: jonburchel
ms.topic: tutorial
ms.custom:
ms.date: 08/26/2025
ai.usage: ai-assisted
---

<!-- nbstart https://raw.githubusercontent.com/microsoft/fabric-samples/main/docs-samples/data-science/semantic-link-samples/powerbi_measures_tutorial.ipynb -->

# Extract and calculate Power BI measures from a Jupyter notebook

This tutorial shows how to use SemPy (preview) to calculate measures in Power BI semantic models.

In this tutorial, you learn how to:

- Evaluate Power BI measures programmatically by using the Python interface of the Semantic Link library ([SemPy](/python/api/semantic-link-sempy))
- Learn about SemPy components that help bridge AI and BI:
    - FabricDataFrame—pandas-like structure enhanced with semantic information
    - Functions that get semantic models, including raw data, configurations, and measures

## Prerequisites

[!INCLUDE [prerequisites](./includes/prerequisites.md)]
* In the navigation pane, select **Workspaces**, then select your workspace to set it as the current workspace.

* Download the [Retail Analysis Sample PBIX.pbix](https://download.microsoft.com/download/9/6/D/96DDC2FF-2568-491D-AAFA-AFDD6F763AE3/Retail%20Analysis%20Sample%20PBIX.pbix) semantic model and upload it to your workspace.

### Follow along in the notebook

The [powerbi_measures_tutorial.ipynb](https://github.com/microsoft/fabric-samples/blob/main/docs-samples/data-science/semantic-link-samples/powerbi_measures_tutorial.ipynb) notebook accompanies this tutorial.

[!INCLUDE [follow-along-github-notebook](./includes/follow-along-github-notebook.md)]

## Set up the notebook

In this section, you set up a notebook environme1. Install `SemPy` from PyPI by using `%pip` inline in the notebook.

    ```python
    %pip install semantic-link-sempy
    ```
y1. Import the modules you'll use later.

    ```python
    import sempy.fabric as fabric
    ```
`1. Connect to the Power BI workspace, and list the semantic models in the workspace.

    ```python
    fabric.list_datasets()
    ```
a1. Load the semantic model. In this tutorial, you use the Retail Analysis Sample semantic model.

    ```python
    dataset = "Retail Analysis Sample"
    ```
 ```python
    dataset = "Retail Analysis Sample PBIX"
    ```

## List workspace measures

Use SemPy's `list_measures` to list measures in a semantic model:

```python
fabric.list_measures(dataset)
```

## Evaluate measures

Use SemPy's `evaluate_measure` function to evaluate measures in different ways.

### Evaluate a raw measure

Use SemPy's `evaluate_measure` function to calculate the preconfigured measure named "Average Selling Area Size".

```python
fabric.evaluate_measure(dataset, measure="Average Selling Area Size")
```

### Evaluate a measure with `groupby_columns`

Group the result by columns by using the `groupby_columns` parameter:

```python
fabric.evaluate_measure(dataset, measure="Average Selling Area Size", groupby_columns=["Store[Chain]", "Store[DistrictName]"])
```

This code groups by `Store[Chain]` and `Store[DistrictName]`.

### Evaluate a measure with filters

Use the `filters` parameter to limit results to specific column values:

```python
fabric.evaluate_measure(dataset, \
                        measure="Total Units Last Year", \
                        groupby_columns=["Store[Territory]"], \
                        filters={"Store[Territory]": ["PA", "TN", "VA"], "Store[Chain]": ["Lindseys"]})
```

In this example, `Store` is the table, `Territory` is the column, and `PA` is an allowed value.

### Evaluate a measure across multiple tables

Group by columns across multiple tables in the semantic model.

```python
fabric.evaluate_measure(dataset, measure="Total Units Last Year", groupby_columns=["Store[Territory]", "Sales[ItemID]"])
```

### Evaluate multiple measures

The `evaluate_measure` function lets you supply multiple measure identifiers and returns the calculated values in a single `DataFrame`:

```python
fabric.evaluate_measure(dataset, measure=["Average Selling Area Size", "Total Stores"], groupby_columns=["Store[Chain]", "Store[DistrictName]"])
```

## Use Power BI XMLA connector

The default semantic model client uses the Power BI REST APIs. If queries fail with this client, switch to the Power BI XMLA endpoint by setting `use_xmla=True`. SemPy parameters are the same for measure calculations with XMLA.

```python
fabric.evaluate_measure(dataset, \
                        measure=["Average Selling Area Size", "Total Stores"], \
                        groupby_columns=["Store[Chain]", "Store[DistrictName]"], \
                        filters={"Store[Territory]": ["PA", "TN", "VA"], "Store[Chain]": ["Lindseys"]}, \
                        use_xmla=True)
```

## Related content

See other semantic link and SemPy tutorials:

- [Tutorial: Clean data with functional dependencies](tutorial-data-cleaning-functional-dependencies.md)
- [Tutorial: Analyze functional dependencies in a sample semantic model](tutorial-power-bi-dependencies.md)
- [Tutorial: Discover relationships in a semantic model using semantic link](tutorial-power-bi-relationships.md)
- [Tutorial: Discover relationships in the Synthea dataset, using semantic link](tutorial-relationships-detection.md)
- [Tutorial: Validate data using SemPy and Great Expectations (GX)](tutorial-great-expectations.md)

<!-- nbend -->
