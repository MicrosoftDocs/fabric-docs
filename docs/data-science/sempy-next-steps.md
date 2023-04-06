---
title: SemPy next steps
description: Find resources for learning more about SemPy.
ms.reviewer: mopeakande
ms.author: narsam
author: narmeens
ms.topic: conceptual
ms.date: 02/10/2023
---

# SemPy next steps

[!INCLUDE [preview-note](../includes/preview-note.md)]

This article provides pointers for doing more with SemPy.

## I want to dive deeper. Any pointers to help in my journey?

Sure, our collection of feature-specific notebooks can help you get more thorough understanding of the concepts of SemPy and the capabilities that it enables:

- The [Knowledge Base Hydration from a Lakehouse](sempy-kb-hydration-lakehouse.md) notebook shows how to populate KB for data fetched from Azure Lakehouse.
- Check out the [Column groups](sempy-column-groups.md) and [Semantic propagation for unstack](sempy-unstack-semantic-propagation.md) notebooks for a better understanding of [SType](sempy-glossary.md#stype), [ColumnSType](sempy-glossary.md#columnstype), and [CompoundSType](sempy-glossary.md#compoundstype) concepts and implementation.
- The [Built-in Visualizations](sempy-built-in-visualizations.md) notebook shows how you can get visualizations of data for EDA and enjoy bypassing figuring out parameters in plotting functions.
- The [Relationship Detection](sempy-relationship-detection.md) notebook demonstrates how relationships can be added to the [Knowledge Base](sempy-glossary.md#knowledge-base) manually if they're known in advance or discovered automatically.
- The [Autojoin](sempy-autojoin.md) notebook shows how to detect primary and foreign keys of tables in the dataset and denormalize tables.
- The [Data Cleaning with Functional Dependencies](sempy-data-cleaning.md) notebook demonstrates how we can use approximate functional dependencies for data quality analysis.
- The [Power BI metrics integration](sempy-powerbi-metrics.md) notebook shows how we can access Power BI metrics from Synapse notebooks.
  
## How do I discover capabilities of SemPy?

There are two main ways: firstly, you can learn  on concrete examples from notebook tutorials provided here. Secondly, you can use API documentation. Last but not least, SemPy can suggest potential join candidates for you, using the `auto` accessor. In a notebook, this provides auto-complete with suggested operations, such as merges if there are relationships present.

You can also print the suggestions by calling `dir`:

```
>>> dir(sdf.auto)
['merge("Item")']
```

Currently suggestions include merges with any entities for which a relationship is defined, and pivots if the data is annotated with appropriate logical types. Here's an example from the more complex synthea dataset:

:::image type="content" source="media\sempy-next-steps\pivot-suggestion.png" alt-text="Screenshot showing a list of pivot suggestions." lightbox="media\sempy-next-steps\pivot-suggestion.png":::

## I'm excited, this is cool stuff! Can I contribute?

Not yet, but let us know if you're interested in helping us prioritize open sourcing SemPy!

## How to manipulate textual or image data?

There's a wide range of functions to handle textual and data in pandas and other open source libraries. SemPy currently supports geo-specific data types as first-class citizen. Stay tuned for new functions that allow more advanced and meaningful ways of handling other textual and image data out-of-box.
