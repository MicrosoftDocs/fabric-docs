---
title: 'Tutorial: Discover relationships in a Power BI semantic model using semantic link'
description: This article shows how to interact with Power BI from a Jupyter notebook with the help of the SemPy library.
ms.author: jburchel
author: jonburchel
ms.reviewer: alsavelv
reviewer: alsavelv
ms.topic: tutorial
ms.custom: 
ms.date: 08/26/2025
ai.usage: ai-assisted
---

<!-- nbstart https://raw.githubusercontent.com/microsoft/fabric-samples/main/docs-samples/data-science/semantic-link-samples/powerbi_relationships_tutorial.ipynb -->

# Discover relationships in a semantic model using semantic link

This tutorial shows how to use a Jupyter notebook to interact with Power BI and detect relationships between tables with the SemPy library.

In this tutorial, you learn how to:

- Discover relationships in a semantic model (Power BI dataset) using semantic link's Python library ([SemPy](/python/api/semantic-link-sempy)).
- Use SemPy components that integrate with Power BI and automate data quality analysis. These components include:
    - `FabricDataFrame` - a pandas-like structure enhanced with semantic information
    - Functions that pull semantic models from a Fabric workspace into your notebook
    - Functions that test functional dependencies and identify relationship violations in your semantic models

## Prerequisites

[!INCLUDE [prerequisites](./includes/prerequisites.md)]
* Go to **Workspaces** in the navigation pane, and then select your workspace to set it as the current workspace.

* Download the _Customer Profitability Sample.pbix_ and _Customer Profitability Sample (auto).pbix_ semantic models from the [fabric-samples GitHub repository](https://github.com/microsoft/fabric-samples/tree/main/docs-samples/data-science/datasets), and then upload them to your workspace.

### Follow along in the notebook

Use the [powerbi_relationships_tutorial.ipynb](https://github.com/microsoft/fabric-samples/blob/main/docs-samples/data-science/semantic-link-samples/powerbi_relationships_tutorial.ipynb) notebook to follow along.

[!INCLUDE [follow-along-github-notebook](./includes/follow-along-github-notebook.md)]

## Set up the notebook

Set up a notebook environment with the modules and data you need.

1. Install the `semantic-link` package from PyPI by using the `%pip` inline command in the notebook.

```python
%pip install semantic-link
```

1. Import the `sempy` modules you'll use later.

```python
import sempy.fabric as fabric

from sempy.relationships import plot_relationship_metadata
from sempy.relationships import find_relationships
from sempy.fabric import list_relationship_violations
```

1. Import the `pandas` library and set a display option for output formatting.

```python
import pandas as pd
pd.set_option('display.max_colwidth', None)
```

## Explore semantic models

This tutorial uses the Customer Profitability Sample semantic model [_Customer Profitability Sample.pbix_](https://github.com/microsoft/fabric-samples/blob/main/docs-samples/data-science/datasets/Customer%20Profitability%20Sample.pbix). Learn about the semantic model in [Customer Profitability sample for Power BI](/power-bi/create-reports/sample-customer-profitability).

- Use SemPy's `list_datasets` function to explore semantic models in your current workspace:

```python
fabric.list_datasets()
```

For the rest of this notebook, use two versions of the Customer Profitability Sample semantic model:

- *Customer Profitability Sample*: the semantic model as provided in the Power BI samples, with predefined table relationships
- *Customer Profitability Sample (auto)*: the same data, but relationships are limited to those that Power BI autodetects

## Extract predefined relationships from the sample semantic model

1. Load the predefined relationships in the Customer Profitability Sample semantic model by using SemPy's `list_relationships` function. The function lists relationships from the Tabular Object Model (TOM).

```python
dataset = "Customer Profitability Sample"
relationships = fabric.list_relationships(dataset)
relationships
```

1. Visualize the `relationships` DataFrame as a graph by using SemPy's `plot_relationship_metadata` function.

```python
plot_relationship_metadata(relationships)
```

    :::image type="content" source="media/tutorial-power-bi-relationships/plot-of-relationship-metadata.png" alt-text="Screenshot of the relationships graph between tables in the semantic model." lightbox="media/tutorial-power-bi-relationships/plot-of-relationship-metadata.png":::

This graph shows the relationships between tables in this semantic model as defined in Power BI by a subject matter expert.

## Discover additional relationships

If you start with relationships that Power BI autodetects, you have a smaller set.

1. Visualize the relationships that Power BI autodetected in the semantic model:

```python
dataset = "Customer Profitability Sample (auto)"
autodetected = fabric.list_relationships(dataset)
plot_relationship_metadata(autodetected)
```

    :::image type="content" source="media/tutorial-power-bi-relationships/plot-metadata-for-autodetected-relationships.png" alt-text="Screenshot of relationships that Power BI autodetected in the semantic model." lightbox="media/tutorial-power-bi-relationships/plot-metadata-for-autodetected-relationships.png":::

    Power BI's autodetection misses many relationships. Also, two of the autodetected relationships are semantically incorrect:

    - `Executive[ID]` -> `Industry[ID]`
    - `BU[Executive_id]` -> `Industry[ID]`

1. Print the relationships as a table:

```python
autodetected
```

    Rows 3 and 4 show incorrect relationships to the `Industry` table. Remove these rows.

1. Discard the incorrectly identified relationships.

```python
# Remove rows 3 and 4 which point incorrectly to Industry[ID]
autodetected = autodetected[~autodetected.index.isin([3, 4])]
```

    Now you have correct but incomplete relationships. Visualize these incomplete relationships using `plot_relationship_metadata`:

```python
plot_relationship_metadata(autodetected)
```

        :::image type="content" source="media/tutorial-power-bi-relationships/plot-metadata-for-incomplete-relationships.png" alt-text="Screenshot of a visualization of relationships after removing incorrect ones." lightbox="media/tutorial-power-bi-relationships/plot-metadata-for-incomplete-relationships.png":::

1. Load all the tables from the semantic model, using SemPy's `list_tables` and `read_table` functions, then find relationships between tables using `find_relationships`. Review the log output to get insights into how this function works:

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

    :::image type="content" source="media/tutorial-power-bi-relationships/plot-metadata-for-newly-discovered-relationships.png" alt-text="Screenshot of a visualization of newly discovered relationships." lightbox="media/tutorial-power-bi-relationships/plot-metadata-for-newly-discovered-relationships.png":::

    SemPy detects all relationships.

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

## Validate relationships

1. First, load data from the _Customer Profitability Sample_ semantic model.

```python
dataset = "Customer Profitability Sample"
tables = {table: fabric.read_table(dataset, table) for table in fabric.list_tables(dataset)['Name']}

tables.keys()
```

1. Check primary and foreign key overlap with the `list_relationship_violations` function. Pass the output of the `list_relationships` function to `list_relationship_violations`.

```python
list_relationship_violations(tables, fabric.list_relationships(dataset))
```

    The results reveal useful insights. For example, one of seven values in `Fact[Product Key]` isn't present in `Product[Product Key]`, and the missing key is `50`.

Exploratory data analysis and data cleaning are iterative. What you learn depends on your questions and how you explore the data. Semantic link adds tools that help you do more with your data.


## Related content

Explore other tutorials for semantic link and SemPy:

- [Tutorial: Clean data with functional dependencies](tutorial-data-cleaning-functional-dependencies.md)
- [Tutorial: Analyze functional dependencies in a sample semantic model](tutorial-power-bi-dependencies.md)
- [Tutorial: Extract and calculate Power BI measures from a Jupyter notebook](tutorial-power-bi-measures.md)
- [Tutorial: Discover relationships in the Synthea dataset, using semantic link](tutorial-relationships-detection.md)
- [Tutorial: Validate data using SemPy and Great Expectations (GX)](tutorial-great-expectations.md)
<!-- nbend -->\n\n
