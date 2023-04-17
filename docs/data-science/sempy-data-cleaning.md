---
title: SemPy data cleaning with functional dependencies
description: Learn how to use functional dependencies for data cleaning. A functional dependency is where one column is a function of another.
ms.reviewer: mopeakande
ms.author: narsam
author: narmeens
ms.topic: how-to 
ms.date: 02/10/2023
---

# Data cleaning with functional dependencies in Microsoft Fabric

[!INCLUDE [preview-note](../includes/preview-note.md)]

In this notebook, we show how we can use (approximate) functional dependencies for data cleaning. The idea of functional dependencies is that one column is a function of another, say when dealing with customers, the Zip code might determine the City they live in. So a functional relationship is a one-to-many relationship between the values in two (or more) columns within a dataframe (which doesn't occur if the dataset adheres to third normal form).

We can use these relationships to measure and improve data quality. Let's check out a concrete example of the Synthea dataset. We start by loading the data and generating a knowledge base.

```python
from sempy.utils.datasets import download_synthea
from sempy.connectors.file import load_files
import sempy

kb = sempy.KB()
```

```python
download_synthea(which='small')
load_files(kb, 'synthea/csv')
```

We get the dataframe corresponding to 'providers' to check for any data quality issues in that particular dataframe:

```python
providers = kb.get_data("providers")
providers
```

The auto-complete for `.plot` suggests `dependencies` as one of the options, since there are multiple categorical columns.

```python
providers.plot.dependencies()
```

We can see that `Id` determines `Organization` and `Name` (solid arrows), which makes sense since `Id` is unique:

```python
providers.Id.is_unique
```

We can also see that `Organization` determines `Address` and `ZIP`, which makes sense. However, we would expect `ZIP` to also determine `CITY` as mentioned previously, but the dashed arrow indicates that the dependency is only approximate, pointing towards a data quality issue.

There are other peculiarities, for example NAME not determining GENDER, and NAME not determining Id, SPECIALITY or ORGANIZATION. Each of these might be worth investigating. Given the structure of the dependencies, it's not entirely clear what the rows in this dataset are corresponding to.

Let's focus on the approximate relationship between ZIP and CITY. We could either see more details by calling `list_dependency_violations` to see a tabular list of violations:

```python
providers.list_dependency_violations('ZIP', 'CITY')
```

If the number of violations is small, it may be helpful to draw a graph with `plot_dependency_violations`:

```python
providers.plot_dependency_violations('ZIP', 'CITY')
```

The plot above shows on the left hand side values for ZIP, and on the right hand side values for CITY, with an edge connecting a ZIP on the right with a CITY on the left if there's a row that contains these two respective values. The edges are annotated with the count of such rows, so we can see that there are two rows with ZIP code 02747-1242, one with CITY "NORTH DARTMOUTH" and one with CITY "DARTMOUTH":

```python
providers[providers.ZIP == '02747-1242'].CITY.value_counts()
```

We can also see that of the rows having CITY as "DARTMOUTH", there are 9 with a ZIP of 02747-1262, one with a ZIP of 02747-1242 and one with a ZIP of 02747-1242:

```python
providers[providers.CITY == 'DARTMOUTH'].ZIP.value_counts()
```

We can see that there are other ZIP codes associated with DARTMOUTH that aren't shown in the graph, such as "02747-4302" as they're uniquely associated to DARTMOUTH, and so don't hint at data quality issues:

```python
providers[providers.ZIP == '02747-4302'].CITY.value_counts()
```

Going back to the original graph, we can see that there are several interesting data quality issues present in this dataset:

- Some city names are all-caps. This problem is easy to fix using string methods.
- Some city names have qualifiers, with 2128 mapping to "EAST BOSTON" once and to "BOSTON" once. A similar issue happens between "NORTH DARTMOUTH" and "DARTMOUTH". We could try to drop these qualifiers, or map to the most common occurrence.
- There are typos in some cities, such as "PITTSFIELD" vs "PITTSFILED" and "NEWBURGPORT vs "NEWBURYPORT". For "NEWBURGPORT", this issue could be fixed by using the most common occurrence. For PITTSFIELD, having only one occurrence each makes automatic disambiguation without external knowledge or a language model harder.
- Sometimes prefixes like "West" are abbreviated to a single letter "W". This can potentially be fixed with a simple replace, if all occurrences of "W" stand for "West".
- 02130 maps to "BOSTON" once and "Jamaica Plain" once. This one isn't easy to fix, but if there was more data, mapping to the most common occurrence might be useful.

Let's fix the capitalization by changing all capitalization to "title":

```python
providers['CITY'] = providers.CITY.str.title()
```

Now, running the violation detection again removed some of the ambiguities (the number of violations is smaller):

```python
providers.list_dependency_violations('ZIP', 'CITY')
```

We could refine more manually from here, but one potential short-cut is to disambiguate the remaining cases by replacing the CITY in ambiguous cases always by the most common CITY for each ZIP:

```python
providers_clean = providers.drop_dependency_violations('ZIP', 'CITY')
```

After this operation, there are no more violations of the functional constraint `CITY -> ZIP`.

```python
providers_clean.list_dependency_violations('ZIP', 'CITY')
```
