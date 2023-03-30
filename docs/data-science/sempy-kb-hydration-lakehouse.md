---
title: SemPy knowledge base hydration from a Lakehouse
description: Learn how to populate a knowledge base with a dataset uploaded to a Lakehouse.
ms.reviewer: mopeakande
ms.author: narsam
author: narmeens
ms.topic: how-to 
ms.date: 02/10/2023
---

# Knowledge base hydration from a Lakehouse

[!INCLUDE [preview-note](../includes/preview-note.md)]

In this notebook, we illustrate how you can populate Knowledge Base with information about semantic model of [Synthea](https://synthetichealth.github.io/synthea/) dataset, which we preemptively uploaded to **SemPyLake** Lakehouse in *csv* file format.

## Simple baseline example

```python
import sempy

import pandas as pd
import pyspark.pandas as ppd

from sempy.connectors.dataframe import load_df
from sempy.connectors.file import load_files, load_file
from sempy.model import  Relationship
```

Next we load data from the lake. In order to do so, we use the relative path to them in the lake. To run this notebook, a prerequisite is the setup that looks as follows:

:::image type="content" source="media\sempy-kb-hydration-lakehouse\lakehouse-synthea-files.png" alt-text="Screenshot showing the csv file list under synthea in a file explorer view." lightbox="media\sempy-kb-hydration-lakehouse\lakehouse-synthea-files.png":::

You can use it as a reference and replace with file names and paths with what you have created in your settings.

Select three tables from a larger set. The practical meaning of these tables is that 'encounters' (e.g. a medical appointment, procedure) specifies the 'patients' that these encounters were for, which includes 'immunizations' received by patients. In other words, 'encounters' resolves a many-to-many relationship between 'patients' and 'immunizations' and can be thought of as an [Associative Entity](https://en.wikipedia.org/wiki/Associative_entity):

We can use `load_file` utility as a fast shortcut to populate the Knowledge Base with selected tables.

```python
kb = sempy.KB()
load_file(kb, 'patients', file_path="/lakehouse/default/Files/synthea/csv/patients.csv")
load_file(kb, 'immunizations',file_path="/lakehouse/default/Files/synthea/csv/immunizations.csv")
load_file(kb, 'encounters', file_path="/lakehouse/default/Files/synthea/csv/encounters.csv")
kb.get_compound_stypes()
```

KB was populated with three types. Let's see if we can automatically detect and add relationships between them.

```python
suggested_relationships = kb.find_relationships()
suggested_relationships
```

Now we can add the discovered relationships to our knowledge base and visualize them:

```python
kb.add_relationships(suggested_relationships)
kb.plot_relationships()
```

## Complex schema example

In practice, the dataset you start from may be a lot larger. Let's see what that is going to look like. First we reset KB. Then `load_files` populates the Knowledge Base with all files from the 'synthea/csv' directory in the lakehouse. Note that we're using a different format of relative path here:

```python
kb = sempy.KB()
load_files(kb, 'file:///lakehouse/default/Files/synthea/csv')
```

Let's see which relationships get discovered on the extended dataset:

```python
suggested_relationships = kb.find_relationships(max_pairs=1023) 
suggested_relationships
```

Let's again add the discovered relationships on the larger dataset to the Knowledge Base and visualize them:

```python
kb.add_relationships(suggested_relationships)
kb.plot_relationships()
```

## Pyspark backend example

Sempy supports pyspark.pandas backend. For enabling it, we set backend to "pyspark.pandas" and make sure to import corresponding module as follows:

```python
from sempy.utils.backend import set_backend

set_backend('pyspark.pandas')
```

The rest of the code is similar to what we did with pandas backend:

```python
kb = sempy.KB()
load_files(kb, 'file:///lakehouse/default/Files/synthea/csv')
kb.get_compound_stypes()
```

```python
suggested_relationships = kb.find_relationships(max_pairs=1023)
kb.add_relationships(suggested_relationships)
kb.plot_relationships()
```

## One more way: from pandas dataframes

You may also populate KB from dataframes, either pandas or pyspark pandas works. Here we're going with pyspark pandas dataframes:

```python
pdf_patients = ppd.read_csv("file:///lakehouse/default/Files/synthea/csv/patients.csv")
pdf_encounters = ppd.read_csv("file:///lakehouse/default/Files/synthea/csv/encounters.csv")
pdf_immunizations = ppd.read_csv("file:///lakehouse/default/Files/synthea/csv/immunizations.csv")
pdf_encounters.head()
```

Now populating KB with *load_df* function:

```python
kb = sempy.KB()
load_df(kb, 'patients', pdf_patients)
load_df(kb, 'encounters', pdf_encounters)
load_df(kb, 'immunizations', pdf_immunizations)
kb.get_compound_stypes()
```

The following is an example of using pandas dataframes for hydration:

```python
df_patients = pd.read_csv("/lakehouse/default/Files/synthea/csv/patients.csv")
df_encounters = pd.read_csv("/lakehouse/default/Files/synthea/csv/encounters.csv")
df_immunizations = pd.read_csv("/lakehouse/default/Files/synthea/csv/immunizations.csv")
df_encounters.head()
```

```python
kb = sempy.KB()
load_df(kb, 'patients', df_patients)
load_df(kb, 'encounters', df_encounters)
load_df(kb, 'immunizations', df_immunizations)
kb.get_compound_stypes()
```

Here's a more detailed view of metadata that we got into the Knowledge Base by loading frames:

```python
cptypes=kb.get_compound_stypes()
["Entity: "+str(i)+" "+str(kb.get_stype(i).get_components()) for i in cptypes]
```

To summarize, in this notebook we reviewed various ways in which you can populate Knowledge Base from files in your lakehouse. You can choose the most convenient one, depending on your goals and scenarios; you can now use your own data to experiment!
