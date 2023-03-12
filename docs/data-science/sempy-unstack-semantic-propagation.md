---
title: Sempy semantic propagation for unstack
description: Learn about the unstack operation in pandas.
ms.reviewer: mopeakande
ms.author: narsam
author: narmeens
ms.topic: how-to 
ms.date: 02/10/2023
---

# Semantic propagation for unstack

> [!IMPORTANT]
> [!INCLUDE [product-name](../includes/product-name.md)] is currently in PREVIEW. This information relates to a prerelease product that may be substantially modified before it's released. Microsoft makes no warranties, expressed or implied, with respect to the information provided here.

Unstack operation in pandas is used to move a level of index from row to column. Just like its counterpart stack, it's a useful operation to reshape the datacube. Multi-level indexes on rows and columns in pandas can be visualized as the dimensions of a datacube. Each level of the index corresponds to one dimension, and the dataframe itself is just a projection of this higher-dimensional cube onto two dimensions, with some dimensions being projected to the rows, and some dimensions being projected to the columns. The "unstack" operation moves a level from the rows to columns, while the "stack" operation does the opposite. Both operations just change the shape of the dataframe, but neither changes the nature of the underlying datacube. Let's look at an example of how we perform semantic propagation for unstack. As a prerequisite, we recommend the reader to check out `stack_semantic_propagation` notebook. Consider the dataframe constructed in the next example.

```python
import sempy
from sempy.objects import SemanticDataFrame
import pandas as pd
import numpy as np

kb = sempy.KB()

df = pd.DataFrame(data={
    'year': [1990, 1990, 1990, 1990, 1991, 1991, 1991, 1991, 1992, 1992, 1992, 1992],
    'month': ['Jan', 'Jan', 'Feb', 'Feb', 'Jan', 'Jan', 'Feb', 'Feb', 'Jan', 'Jan', 'Feb', 'Feb'],
    'week': ['first', 'second', 'first', 'second', 'first', 'second', 'first', 'second', 'first', 'second', 'first', 'second'],
    'avg_rain': np.random.randint(0, 5, size=12),
    'avg_snow': np.random.randint(0, 5, size=12)
})

df
```

The dataframe describes the average rainfall and snow over different years and months in Chuckland. The dataframe has five columns: year, month, week, avg_rain, and avg_snow. Let us rearrange the dataframe and assign semantics to the columns and indexes.

```python
df = df.set_index(['year', 'month', 'week']).unstack(["week","month"])
df.columns.set_names(names=['weather', 'week', 'month'], inplace=True)
df.columns = df.columns.reorder_levels(order=['week', 'weather', 'month'])
avg_rain = kb.add_column_stype("avg_rain")
avg_snow = kb.add_column_stype("avg_snow")
ent = kb.add_compound_stype("ent", {
    'rain_first_feb': avg_rain,
    'rain_first_jan': avg_rain,
    'rain_second_feb': avg_rain,
    'rain_second_jan': avg_rain,
    'snow_first_feb': avg_snow,
    'snow_first_jan': avg_snow,
    'snow_second_feb': avg_snow,
    'snow_second_jan': avg_snow
})

df
```

After the rearrangement, the dataframe now has column index with three levels: week, weather, and month. It has one row index: year. Note that the first four columns describe average rainfall for each combination of week, month, and year. Similarly, the last four columns describe average snowfall. Let us now associate semantics to the dataframe. One could also visualize this dataframe as datacube where year, month, week form the axis of the datacube (dimensions) and each cell contains average rain and average snow (measures). The `component_columns` maps the components of the entity `ent` to the tuples of the dataframe that contain all level values in the column index.

```python
sdf = SemanticDataFrame(df, ent, component_columns={
    'rain_first_feb': ('first', 'avg_rain',  'Feb'),
    'rain_first_jan': ('first', 'avg_rain',  'Jan'),
    'rain_second_feb': ('second', 'avg_rain',  'Feb'),
    'rain_second_jan': ('second', 'avg_rain',  'Jan'),
    'snow_first_feb': ('first', 'avg_snow',  'Feb'),
    'snow_first_jan': ('first', 'avg_snow',  'Jan'),
    'snow_second_feb': ('second', 'avg_snow',  'Feb'),
    'snow_second_jan': ('second', 'avg_snow',  'Jan')
})

sdf
```

In the next example, we can see the different types mapped to each column of the dataframe. Since the first four columns describe average rain, they're assigned the type `avg_rain` and the last four columns are assigned the type `avg_snow`.

```python
sdf.column_group.pprint()
```

Next, suppose we do `sdf.stack()`. This operation brings month index from column to row (also known as wide to tall). Observe that the output dataframe still describes average rainfall for the first two columns and last two columns are still average snow. Therefore, the type information of the dataframe should remain the same. However, the ColumnGroup of the new dataframe does change slightly since the multiindex on columns now only has two levels instead of three.

```python
stacked_1 = sdf.stack()
stacked_1
```

The ColumnGroup of the dataframe now is mapped to columns that have length two and the types `avg_rain` and `avg_snow` have been reused. A new top-level entity has been associated with the new dataframe that has four components, one for each column.

```python
stacked_1.column_group.pprint()
```

Suppose we do `stacked_1.unstack()` next. Let us look at what happens to the types of the resulting dataframe.

```python
unstacked_1 = stacked_1.unstack()
unstacked_1
```

```python
unstacked_1.column_group.pprint()
```

Observe that the types assigned to the columns with weather as avg_rain in `sdf`, `stacked_1` , and `unstacked_1` have `avg_rain` as the stype (and same for avg_snow). This result is expected; both before and after the unstack, all columns of the dataframe either describe the average or average snow for every (week, month) combination. Therefore, unstacking any index doesn't create new stypes.

Let us now turn our attention to the scenario where we move the move the column level index `weather` around.

```python
stacked_2 = sdf.stack(level=1)
stacked_2
```

Let's see what is the stype for the columns in this dataframe.

```python
stacked_2.column_group.pprint()
```

Since we stacked the heterogenous level, all columns in `stacked_2` get a new stype called "UNION weather values". Next, we want to see that when we `unstack` the (now row level) 'weather' index, we recover the types of the original dataframe used to create `stacked_2` (i.e. `sdf`)

```python
unstacked_2 = stacked_2.unstack(level='weather')
unstacked_2
```

```python
unstacked_2.column_group.pprint()
```

Indeed, the unstack of the level `weather` restores the types of the dataframe to what it was before in `sdf`. Internally, we use the `values_stypes` field of the stype associated with level `weather`. We refer the reader to the notebook for `stack` operation to learn more about `values_stypes`.
