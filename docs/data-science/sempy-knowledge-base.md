---
title: SemPy Knowledge Base
description: Learn about SemPy Knowledge Base.
ms.reviewer: mopeakande
ms.author: narsam
author: narmeens
ms.topic: conceptual 
ms.date: 02/10/2023
---

# SemPy Knowledge Base

[!INCLUDE [preview-note](../includes/preview-note.md)]

This article covers the SemPy knowledge base and how to leverage it.

## What is "Knowledge Base" and where can I initialize it from?

The [Knowledge Base](sempy-glossary.md#knowledge-base) (KB) is a central component of Enya as it captures the semantic model and enables better collaboration between data scientists. Internally, the KB consists of in-memory registries that capture different aspects of the semantic model (for example, type registry, relationship registry, semantic function and grounding  registry). SemPy provides APIs to add and retrieve components of the semantic model and to visualize it within a Python notebook. The KB can be serialized to disk as a JSON file capturing the various components of the semantic model. There are two ways to populate KB, which you can use separately or in combination: manually (annotating each column, table, and relationship) and automatically (by either pulling predefined model from Power BI or using SemPy's automatic capabilities to infer semantic information about the data).

## How can I initialize KB from different data sources?

All semantic information in `sempy` is stored in a `KB` object. Therefore, starts by declaring the current `KB` object.

In this example, we start by declaring the current `KB` object and populating it from csv files pulled from Azure Lakehouse.

```python
import sempy
kb = sempy.KB()

load_file(kb, 'patients', file_path='/lakehouse/default/Files/synthea/csv/patients.csv')
load_file(kb, 'immunizations',file_path='/lakehouse/default/Files/synthea/csv/immunizations.csv')
load_file(kb, 'encounters', file_path='/lakehouse/default/Files/synthea/csv/encounters.csv')
```

A good way to list the content of the knowledge base is to call:

```python
>>> kb1.get_compound_stypes()
```

```python
['patients', 'immunizations', 'encounters']
```

If you have a Power BI dataset with a predefined model, you can use it too to prepopulate your knowledge base with information about data types and relationships. Below we show how to access "Customer Profitability Sample PBIX" file after uploading it into the same workspace in Azure Synapse where the notebook is running:

```python
from sempy.connectors.powerbi import PowerBIConnector
conn = PowerBIConnector()
conn.get_datasets()
kb1 = conn.load_dataset("Customer Profitability Sample PBIX")
kb1.get_compound_stypes()
```

Expected output of executing this code block looks as follows:

```python
['Item', 'Product', 'Order']
```

See the [E2E Power BI example](e2e-powerbi-example.md) and [Knowledge Base Hydration from a Lakehouse](sempy-kb-hydration-lakehouse.md) notebooks for more details on the scenarios discussed in the previous sections. Also, check out the [Built-in Visualizations](sempy-built-in-visualizations.md) notebook to see how you can populate KB for data fetched from an external source, with sklearn datasets used as examples.

## How many Knowledge Base instances can I create?

You can have as many Knowledge Bases as it makes sense for you! For example, when you pull datasets from two different sources (for example, one from Power BI file and another from a set of tsv's) and SemPy auto-populates them for you based on PBIX data model and the files structure respectively.

## How do I store and share my Knowledge Base?

SemPy allows you to export a [Knowledge Base](sempy-glossary.md#knowledge-base) in JSON format, which you can then check in a repository, for example in GitHub or Visual Studio Codespaces.

## Do you have examples of how KB helps with data processing further down the line?

Yes, a great example is the way that it helps with understanding the data by visualizing relationships.

The following case is a small example with only three entities.

To see the relationships between entities, you can call:

```
>>> kb1.plot_relationships()
```

:::image type="content" source="media\sempy-knowledge-base\relationships.png" alt-text="Screenshot of a visual representation of the relationship between entities." lightbox="media\sempy-knowledge-base\relationships.png":::

By default, `plot_relationships` only shows the attributes that are part of a relationship, to show all attributes, you can pass `include_attributes=True`:

```
>>> kb1.plot_relationships(include_attributes=True)
```

:::image type="content" source="media\sempy-knowledge-base\relationships-attributes.png" alt-text="Screenshot of a visual representation of entity relationships including all attributes." lightbox="media\sempy-knowledge-base\relationships-attributes.png":::

Each of the entities has multiple attributes, and they join on the `ProductId` attribute.

## Next steps

For more details, check out the following materials and other notebook-based tutorial provided in the documentation:

- See the [E2E Power BI Example](e2e-powerbi-example.md) notebook for how to populate KB from a PBIX file.
- See the [Knowledge Base Hydration from a Lakehouse](sempy-kb-hydration-lakehouse.md) notebook for how to populate KB for data fetched from Azure Lakehouse.
- See the [Built-in Visualizations](sempy-built-in-visualizations.md) notebook to see how you can populate KB for data fetched from an external source, with sklearn datasets used as examples.
