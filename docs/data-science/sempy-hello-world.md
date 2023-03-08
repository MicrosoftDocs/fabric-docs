---
title: SemPy hello world
description: Get started learning about SemPy with a small example.
ms.reviewer: mopeakande
ms.author: narsam
author: narmeens
ms.subservice: data-science
ms.topic: quickstart
ms.date: 02/10/2023
---

# Hello world

> [!IMPORTANT]
> [!INCLUDE [product-name](../includes/product-name.md)] is currently in PREVIEW. This information relates to a prerelease product that may be substantially modified before it's released. Microsoft makes no warranties, expressed or implied, with respect to the information provided here.

You can start learning about SemPy with a small self-contained example.

```python
# Part 1 - initializing pandas dataframes. In real-life examples, you'll be pulling it from some source, like Lakehouse or PowerBI
import pandas as pd
  
shopper = [['Tom', 30,  98052], ['Nick', 25,  98004], ['Juli', 29, 97756]]
geo = [['Redmond', 'WA', 98052], ['Bellevue', 'WA', 98004], ['Redmond', 'OR', 97756]]

df_shopper= pd.DataFrame(shopper, columns=['Name', 'Age', 'PostalCode'])
df_geo = pd.DataFrame(geo, columns=['City', 'State', 'PostalCode'])   

# Part 2 - populate SemPy knowledge base with metadata of the dataframes to start creating a semantic model for the dataset.
import sempy
from sempy.connectors.dataframe import load_df

kb = sempy.KB() 
load_df(kb, 'Shopper', df_shopper)
load_df(kb, 'Location', df_geo)
kb.get_compound_stypes()
```

The cell output will show that "Shopper" and "Location" entity types ([CompoundSType](sempy-glossary.md#compoundstype) in SemPy terminology) have been added to Knowledge Base:

```
['Shopper', 'Location']
```

We can take a peek at inner structure of the types, for example, *Shopper*, with a "pretty print":

```
kb.get_stype('Shopper').pprint()
```

This example shows us that SemPy generated a semantic type for each column  ([ColumnSType](sempy-glossary.md#columnstype)) by appending a suffix *_st*. The types are created as extensions of built-in types, such as *Categorical*, *Time*, and *Numeric* in the example:

```
Shopper
|---id: id_st
|---Name: Name_st[SemPy.Categorical]
|---Age: Age_st[SemPy.Numeric]
|---PostalCode: PostalCode_st[SemPy.Numeric]
|---RecentPurchaseDate: RecentPurchaseDate_st[SemPy.Time]
```

Both [ColumnSType](sempy-glossary.md#columnstype) and [CompoundSType](sempy-glossary.md#compoundstype) extend [SType](sempy-glossary.md#stype) - a basic semantic unit in SemPy. While the above example is simple and has flat structure, * [Column groups notebook](sempy-column-groups.md) demonstrates how to describe and visualize more complex nested data types with SemPy.

Now you can start exploring SemPy's capabilities - for example, automatically discover relationship between two tables that we loaded:

```python
# Part 3 - automatically discover relationships between the dataframes with he help of SemPy
suggested_relationships = kb.find_relationships()
kb.add_relationships(suggested_relationships)
kb.plot_relationships()
```

The cell output will show the following image:

:::image type="content" source="media\sempy-hello-world\hello-world.png" alt-text="Screenshot of visual representation of the relationship between two tables." lightbox="media\sempy-hello-world\hello-world.png":::
