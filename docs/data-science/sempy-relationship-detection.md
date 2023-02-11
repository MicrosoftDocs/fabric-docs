---
title: SemPy relationship detection
description: Learn about relationship detection in SemPy.
ms.reviewer: mopeakande
ms.author: narsam
author: narmeens
ms.topic: how-to 
ms.date: 02/10/2023
---

# Relationship detection

> [!IMPORTANT]
> [!INCLUDE [product-name](../includes/product-name.md)] is currently in PREVIEW. This information relates to a prerelease product that may be substantially modified before it's released. Microsoft makes no warranties, expressed or implied, with respect to the information provided here.

Relationships are frequently known in advance from the analysis of the ER model, and can be added to the Knowledge Base manually. When starting without an existing model or dealing with new data for the first time, it can be helpful to discover relationships automatically and set the stage for:

- Understanding the model at high level and further Exploratory Data Analysis
- Autojoin on relationship keys
- Validation of updated data or new incoming data
- Data cleaning

In this notebook, we illustrate relationship detection using public Synthea datasets. We'll start from a simple baseline example where we experiment with only three tables so that connections between them are easy to follow.

Then we'll show a more complex example with a larger table set.

## Simple baseline example

```python
import sempy
import pandas as pd
from sempy.connectors.dataframe import load_df
from sempy.connectors.file import load_files
from sempy.model import  Relationship
```

```python
from sempy.utils.datasets import download_synthea

download_synthea(which='small')
```

Select three tables from a larger set. The practical meaning of these tables is that 'encounters' (e.g. a medical appointment, procedure) specifies the 'patients' that these encounters were for, as well as the 'providers' who attended the patients. In other words, 'encounters' resolves a many-to-many relationship between 'patients' and 'providers' and can be thought of as an [Associative Entity](https://sempy.wikipedia.org/wiki/Associative_entity):

```python
patients = pd.read_csv('synthea/csv/patients.csv')
providers = pd.read_csv('synthea/csv/providers.csv')
encounters = pd.read_csv('synthea/csv/encounters.csv')
```

We'll use `load_df` utility as a fast shortcut to populate the Knowledge Base with selected tables.

```python
kb = sempy.KB()
```

```python
load_df(kb, 'patients', patients)
load_df(kb, 'providers', providers)
load_df(kb, 'encounters', encounters)

kb.get_compound_stypes()
```

```python
suggested_relationships = kb.find_relationships()
suggested_relationships
```

```python
kb.add_relationships(suggested_relationships)
kb.plot_relationships()
```

By default, relationships are generated as N:1 (not as 1:N) or 1:1. The 1:1 relationships can be generated one or both ways, depending if the ratio of mapped values to all values exceeds coverage_threshold in just one or both directions. Later in this notebook, we'll discuss the less frequent case of N:M relationships.

## Troubleshoot unsuccessful detection

The baseline example shows a successful relationship detection on clean Synthea data. In practice, the data may not be clean, which prevents successful detection. There are several techniques that can help us in this situation. To understand them, let's first create a Knowledge Base that contains invalid data. We need to manipulate the original dataframes to obtain "dirty" data:

```python
print(len(patients))
print(len(providers))
```

```python
# create a dirty 'patients' dataframe by dropping some rows using head() and duplicate some using concat()
patients_dirty = pd.concat([patients.head(1000), patients.head(50)], axis=0)

# create a dirty 'providers' dataframe by dropping some rows using head()
providers_dirty = providers.head(5000)

# the dirty dataframes have less records than the clean ones
print(len(patients_dirty))
print(len(providers_dirty)) 
```

```python
kb = sempy.KB()

load_df(kb, 'patients', patients_dirty);
load_df(kb, 'providers', providers_dirty);
load_df(kb, 'encounters', encounters);
```

```python
kb.find_relationships()
```

As you can see, no relationships have been detected due to the errors that we introduced earlier.

### Using validation

Validation is the best tool for troubleshooting detection failures because:

- Validation clearly reports why a particular relationship doesn't follow the Foreign Key rules and therefore can't be detected
- Validation runs very fast with large datasets because it focuses only on the declared relationships and doesn't perform search

Validation uses relationships defined in the Knowledge Base, so we need to add those expected relationships first:

```python
kb.add_relationship(from_stype="encounters", from_component="PATIENT", to_stype="patients", to_component="Id")
kb.add_relationship(from_stype="encounters", from_component="PROVIDER", to_stype="providers", to_component="Id")

kb.get_relationships()
```

```python
errors = kb.list_relationship_violations()
errors
```

The full message can be quite long but it provides useful details that help with the follow-up:

```python
errors.message[1]
```

### Loosening search criteria

In smaller datasets (e.g. pandas) and more murky scenarios, you can try loosening search criteria. This method naturally increases the risk of false positives.

First, let's try to see how `include_many_to_many=True` can help us:

```python
kb.find_relationships(include_many_to_many=True, coverage_threshold=1)
```

The results detect the relationship between 'encounters' -> 'patients', but there are two problems:

- The relationship has a direction "patients" -> "encounters" which is an inverse of the expected. This is because all 'patients' happened to be covered by 'encounters' (coverage_from is 1.0) while 'encounters' are only partially covered by 'patients' (coverage_to = 0.85), since patients rows are missing.
- There's an accidental match on a low cardinality 'GENDER' column, which happens to match by name and value in both tables, but it isn't an N:1 relationship that we're interested in. The low cardinality is indicated by 'n_unique_from' and 'n_unique_to' columns.

Let's see what happens if we ask for N:1 relationships with a lower `coverage_threshold=0.5`:

```python
kb.find_relationships(include_many_to_many=False, coverage_threshold=0.5)
```

The results at least show the correct direction of the relationships i.e. 'encounters' -> 'providers'.

However, the relationship from 'encounters' to 'patients' isn't detected, because 'patients' isn't unique, so it can't be on the "1" side of "N:1" relationship.

Let's see what happens if we loosen both `include_many_to_many=True` and `coverage_threshold=0.5`.

```python
kb.find_relationships(include_many_to_many=True, coverage_threshold=0.5)
```

Now we're seeing both relationships of interest, but there's a lot more noise:

- The low cardinality match on 'GENDER' is present.
- A higher cardinality "N:M" match on 'ORGANIZATION' appeared. This makes it apparent that the 'ORGANIZATION' is likely a column denormalized to both tables.

### Matching column names

By default, SemPy will consider as matches only attributes that show name similarity, taking advantage of the fact that database designers usually name related columns the same way. This helps to avoid spurious relationships, which occur most frequently with low cardinality integer keys. For example, if there are 1:10 product categories and 1:10 order status codes they'll be confused with each other when only looking at value mappings without taking column names into account. Spurious relationships shouldn't be a problem with GUID like keys.

SemPy looks at a similarity between column names and table names. The matching is approximate and case insensitive. It ignores the most frequently encountered "decorator" substrings such as "id", "code", "name", "key", "pk", "fk". As a result the most typical match cases are:

- an attribute 'column' in entity 'foo' will be matched with an attribute called 'column' (also 'COLUMN' or 'Column') in 'bar'.
- an attribute 'column' in entity 'foo' will be matched with an attribute called 'column_id' in 'bar'.
- an attribute 'bar' in entity 'foo' will be matched with an attribute called 'code' in 'bar'.

As a positive side effect, matching columns name first helps the detection run faster.

To understand which columns are selected for further evaluation, use `verbose=2` option (`verbose=1` lists only the entities being processed).

`attribute_similarity_threshold` determines which columns will be compared. Choosing the threshold of 1 indicates that we are interested in 100% match only:

```python
kb.find_relationships(verbose=2, attribute_similarity_threshold=1.0);
```

Running at 100% similarity sometimes fails to account for small differences between names. In our example, the tables have a plural form with "s" suffix, which results in no exact match. This is handled very well with our default `attribute_similarity_threshold=0.8`. Notice that the Id for plural form 'patients' is now compared to singular 'patient' without adding too many other spurious comparisons to our execution time:

```python
kb.find_relationships(verbose=2, attribute_similarity_threshold=0.8);
```

Changing `attribute_similarity_threshold` to 0 is the other extreme, and it indicates that we want to compare all columns. This is rarely necessary and will result in increased execution time and spurious matches that will need to be reviewed. Observe the amount of comparisons in the verbose output:

```python
kb.find_relationships(verbose=2, attribute_similarity_threshold=0);
```

### Troubleshooting tips

1. Start from exact match for "many to one" relationships (i.e. the default `include_many_to_many=False` and `coverage_threshold=1.0`). This is usually what you want.
1. Use a narrow focus on smaller subsets of tables. Create a small troubleshooting Knowledge Base.
1. Use validation to detect data quality issues.
1. Use `verbose=2` if you want to understand which columns are considered for relationship. This can result in a large amount of output
1. Be aware of tradeoffs of search arguments. `include_many_to_many=True` and `coverage_threshold<1.0` may produce spurious relationships that may be harder to analyze and will need to be filtered.

## Complex schema example

The simple baseline example above serves as a convenient learning and troubleshooting tool.

In practice the dataset you will start from may be a lot larger. Let's see what that is going to look like.

### Load all tables

`load_files` will populate the Knowledge Base with all files from the 'synthea/csv' directory.

```python
kb = sempy.KB()
load_files(kb, 'synthea/csv')
```

```python
suggested_relationships = kb.find_relationships() 
suggested_relationships
```

### Visualize relationships

Relationships are best visualized in a graph form. `plot_relationships` function lays out the hierarchy from left to right, which corresponds to "from" and "to" entities in our detection output (and Relationship definition). In other words, the dependent "from" entities on the left point with their foreign keys to their "to" dependency entities on the right.

Each entity box shows columns that participate on either "from" or "to" side of a relationship.

```python
kb.add_relationships(suggested_relationships)
kb.plot_relationships()
```

Let's see how many new "N:M" relationships we will discover with `include_many_to_many=True`. These will be in addition to the previously shown "N:1" relationships, so we will do filtering on 'multiplicity'.

```python
suggested_relationships = kb.find_relationships(coverage_threshold=1.0, include_many_to_many=True) 
suggested_relationships[suggested_relationships['multiplicity']=='N:M']
```

You can sort the relationship data by various columns to gain a deeper understanding of their nature. For example, you could choose to order the output by 'n_rows_from', 'n_rows_to', which will help identify the largest tables. In a different dataset, maybe it will be important to focus on number of nulls 'n_nulls_from' or 'coverage_to'.

This analysis can help understand if any of the relationships could be invalid, and if you need to remove them from the list of candidates.

```python
suggested_relationships.sort_values(['n_rows_from', 'n_rows_to'], ascending=False)
```
