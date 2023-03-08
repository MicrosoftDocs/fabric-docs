---
title: SemPy column groups
description: Learn how to create SDFs and different types of column groups with SemPy.
ms.reviewer: mopeakande
ms.author: narsam
author: narmeens
ms.subservice: data-science
ms.topic: how-to
ms.date: 02/10/2023
---

# Column groups

> [!IMPORTANT]
> [!INCLUDE [product-name](../includes/product-name.md)] is currently in PREVIEW. This information relates to a prerelease product that may be substantially modified before it's released. Microsoft makes no warranties, expressed or implied, with respect to the information provided here.

In this article, you'll learn to create column groups for a dataframe.

## Creating SDFs and column groups

Column groups are the underlying data structure that stores the stypes associated with the columns in a SemanticDataFrame. In many cases, the user doesn't directly interact with it. Let's look at an example with built-in `ColumnSType`s. We take a "top-down" approach and specify the `CompoundSType` of a dataframe of interest:

```python
import sempy
from sempy.model import stypes
from sempy.objects import SemanticDataFrame
import pandas as pd

kb = sempy.KB()

# my sdf will have two columns, corresponding to two components of my CompoundSType
# the two components are Street and City, which are both of the built-in ColumnSType Str
sdf_stype = kb.add_compound_stype("my_sdf_type", components={'Street': stypes.Str, 'City': stypes.Str})

# Declare a pandas dataframe. Note that the column names don't need to match the component names
df = pd.DataFrame({'my_home_street': ['as', 'df'], 'my_home_city': ['a', 'b']})
```

Now we can create a new semantic dataframe using this dataframe, by associating it with the `CompoundSType` we've defined. Here, we need to specify the dataframe, stype and how the columns map to the components of the `CompoundSType`.

```python
sdf = SemanticDataFrame(df, sdf_stype, component_columns={'City': 'my_home_city', 'Street': 'my_home_street'})
```

The mapping of columns to the components is internally stored in `sdf.column_group`, which is a `ColumnGroup`:

```python
sdf.column_group
```

The column group of the SDF has two components, which are also ColumnGroups. These components in turn are associated with one column each, `'my_home_city'` and `'my_home_address'` and don't contain further components.

```python
sdf.column_group.components
```

We can access components of a column group with square brackets:

```python
sdf.column_group['City']
```

```python
sdf.column_group['City'].components
```

There are two convenient ways to display a `ColumnGroup`, using graphviz in Jupyter with `render` and on the console using `pprint`:

```python
sdf.column_group.render()
```

```python
sdf.column_group.pprint()
```

We could have also explicitly created the `ColumnGroup` first from the `component_columns` and `Stype`:

```python
from sempy.objects.column_group import ColumnGroup

column_group = ColumnGroup(component_columns={'City': 'my_home_city', 'Street': 'my_home_street'}, stype=sdf_stype)
column_group.pprint()
```

We can then create an SDF from this column group and the original dataframe.

```python
sdf2 = SemanticDataFrame.create_from_column_group(column_group, df, stype=column_group.get_stype())
sdf2
```

However, usually it's more convenient to just pass the column mapping and stype to the SemanticDataFrame as shown previously.

## Nesting column groups

Now look at a more complex example of nesting ColumnGroups. There's always a ColumnGroup that spans the whole SDF, but we can also have components within that ColumnGroup that span multiple Columns.

```python
# Define an Address type (identical to the sdf type above, but called Address)
address_type = kb.add_compound_stype("Address", components={'Street': stypes.Str, 'City': stypes.Str})
# Define another CompoundSType that contains two addresses and another component, 'Name' which has a ColumnSType
person_type = kb.add_compound_stype("Person", components={'Name': stypes.Str, 'HomeAddress': address_type, 'WorkAddress': address_type})
```

```python
# Create a pandas dataframe with five columns, containing two addresses and a name
df = pd.DataFrame({
    'my_home_street': ['as', 'df'],
    'my_home_city': ['a', 'b'],
    'my_work_street': ['as', 'df'],
    'my_work_city': ['a', 'b'],
    'my_name': ['Max', 'Alex']
})

df
```

Mapping the columns to the components of `person_type` is now a bit trickier, since it's a nested type. Here, we need to use a nested dict. The keys are always the component names, and the values are either columns or dictionaries again.

```python
sdf = SemanticDataFrame(df,
                        person_type,
                        component_columns={
                            'HomeAddress': {
                                'Street': 'my_home_street',
                                'City': 'my_home_city'
                            },
                            'WorkAddress': {
                                'City': 'my_work_city',
                                'Street': 'my_work_street'
                            },
                            'Name': 'my_name'
                        })
sdf
```

Now looking at the `column_group` is a bit more interesting:

```python
sdf.column_group
```

```python
sdf.column_group.render()
```

```python
sdf.column_group.pprint()
```

We can see that the `Person` column group has a component `HomeAddress` corresponding to the `HomeAddress` component of the `Person` CompoundSType.
The `HomeAddress` component has CompoundSType `Address`, with two components, `Street`, which maps to the `my_home_street` column, and `City`, which maps to the `my_home_city` column. We can use the column groups using square brackets to select a subset of columns:

```python
sdf['HomeAddress']
```

## Convenient SemanticDataFrame creation with make_sdf

The previous approaches correspond to a "top-down" view of the world, where we first fully specify the types of our data before working with it. Often, we don't care about all the types, and just want to annotate some columns. This is easily done with the `make_sdf` convenience function. The `make_sdf` function takes a dataframe, and a dictionary of column types and automatically creates the appropriate CompoundSType for the semantic dataframe and the ColumnGroups:

```python
df = pd.DataFrame({
    'my_home_street': ['as', 'df'],
    'my_home_city': ['a', 'b'],
    'my_work_street': ['as', 'df'],
    'my_work_city': ['a', 'b'],
    'my_name': ['Max', 'Alex']
})

df
```

```python
sdf = kb.make_sdf(df, column_types={'my_home_street': sempy.stypes.Str, 'my_name': sempy.stypes.Str})
sdf
```

```python
# Since we didn't define a CompoundSType for the SDF, one is generated, including a random name
```

```python
sdf.column_group
```

```python
# Only annotated columns are shown as components, the remaining ones are not part of the ColumnGroup.
sdf.column_group.pprint()
```

We can also use CompoundSTypes using `make_sdf`. For example, we might want to specify that `my_home_street` and `my_home_city` together make an address, without annotating anything else in the SDF. In this case, we actually need to directly create a `ColumnGroup`:

```python
home_address_group = ColumnGroup(name="home_address", component_columns={'Street': 'my_home_street', 'City': 'my_home_city'}, stype=address_type)
home_address_group.pprint()
```

```python
# Add the home_address group to the sdf, and specify the type of the my_name column
sdf = kb.make_sdf(df, column_types={'my_name': sempy.stypes.Str}, column_groups=[home_address_group])
sdf
```

The `make_sdf` function generated a CompoundSType and column_group to contain the provided information.

```python
sdf.column_group.pprint()
```
