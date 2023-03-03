---
title: SemPy semantic propagation
description: Learn about semantic propagation in SemPy.
ms.reviewer: mopeakande
ms.author: narsam
author: narmeens
ms.subservice: data-science
ms.topic: conceptual
ms.date: 02/10/2023
---

# SemPy semantic propagation

> [!IMPORTANT]
> [!INCLUDE [product-name](../includes/product-name.md)] is currently in PREVIEW. This information relates to a prerelease product that may be substantially modified before it's released. Microsoft makes no warranties, expressed or implied, with respect to the information provided here.

This article covers how SemPy preserves annotations that are attached to tables and columns in datasets that you're manipulating.

## How do I reshape tables?

Whatever can be done with pandas, is supported in SemPy, and more. Semantic propagation enables preserving annotations that are attached to tables and columns in the dataset when you're manipulating them, such as stacking/unstacking, merging,  etc. Check out the [Semantic propagation for unstack](sempy-unstack-semantic-propagation.md) notebook for more details.

## What happens to semantic annotations when I derive new columns from existing columns?

Semantic propagation enables preserving annotations that are attached to tables and columns in the dataset when you're manipulating them, such as stacking/unstacking, merging, etc. Check out the [Semantic propagation for unstack](sempy-unstack-semantic-propagation.md) notebook.

## How to combine data from multiple tables?

As a key value add, SemPy allows you to automate the process of, first, discovering relationships between tables in a dataset and, second, simplifies merging data over the APIs provided by pandas.

Assuming we have two entities `Orders` and `Item`, we can get the associated dataframes using `get_data`:

```
>>> orders_sdf = kb.get_data("Orders")
>>> items_sdf = kb.get_data("Item")
```

If we want to join these two dataframes, and a relationship is registered, we can call `merge` without providing a merge key, it's automatically inferred from the `KB`. If the relationship is:

```
>>> Relationship(from_stype="Orders", from_component="ProductIdAt", to_stype="Item", to_component="ProductIdAt")
```

Then instead of writing:

```
>>> orders_sdf.merge(items_sdf, left_on="ProductId", right_on="ProductId")
```

We can write:

```
>>> orders_sdf.merge(items_sdf)
```

We can also specify the SemanticDataFrame on the right by the entity name, instead of providing the SemanticDataFrame:

```
>>> orders_sdf.merge("Items")
```

You can check out [Relationship Detection](sempy-relationship-detection.md) for more details on how to detect primary and foreign keys of tables in the dataset and denormalize tables.
