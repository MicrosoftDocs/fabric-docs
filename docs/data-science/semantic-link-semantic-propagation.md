---
title: Semantic Propagation
description: Overview of semantic metadata propagation.
ms.reviewer: mopeakande
ms.author: marcozo
author: eisber
ms.topic: overview 
ms.date: 06/06/2023
ms.search.form: Semantic Link
---

# Semantic Propagation

This article covers how SemPy preserves annotations that are attached to tables and columns in [Power BI datasets](/power-bi/connect-data/service-datasets-understand) that you're manipulating.

[!INCLUDE [preview-note](../includes/preview-note.md)]

Semantic information gets automatically attached to [FabricDataFrame](TODO API link) when reading data from Power BI.

## Semantic Propagation for Pandas users

The SemPy python library is part of the Semantic Link feature and serves Pandas users. SemPy has the most advanced support for semantic propagation.
In terms of operations, whatever can be done with pandas, is supported in by SemPy, and more.
Semantic propagation enables preserving annotations that are attached to tables and columns in the dataset when you're manipulating them using slicing, merge and concat.
Apart from direct hydration of metadata from Power BI, it can be automatically resolved when manually constructing a FabricDataFrame and supplying a Power BI datasets name.

### What happens when two dataframes are merged?

If both dataframes are annotated, table-level metadata of the left one takes precedence.
The same rule applies to individual columns, column annotations present in the left dataframe take precedence over the right one.
If only one dataframe is annotated, the respective metadata is used. Again, same rules apply to individual columns.

### What happens when two ore more dataframes are row-wise concatenated?

Metadata of the first dataframe is used.

<!-- ### What happens when dataframes are stacked and unstacked?

Unstack operation in pandas is used to move a level of index from row to column. Just like its counterpart stack, it is a useful operation to reshape the datacube. Multi-level indexes on rows and columns in pandas can be visualized as the dimensions of a datacube. Each level of the index corresponds to one dimension, and the dataframe itself is just a projection of this higher-dimensional cube onto two dimensions, with some dimensions being projected to the rows, and some dimensions being projected to the columns. The “unstack” operation moves a level from the rows to columns, while the “stack” operation does the opposite. Both operations just change the shape of the dataframe, but neither changes the nature of the underlying datacube -->

## Semantic Propagation for Spark users
The Semantic Link Spark native connector hydrates the [metadata](https://spark.apache.org/docs/3.3.2/api/python/reference/pyspark.sql/api/pyspark.sql.types.StructField.html#pyspark.sql.types.StructField) dictionary of Spark column.
Support for semantic propagation is limited at this point and subject to Spark's internal implementation on how schema information is propagated.
For example, aggregation of columns strips the metadata.

## Next steps
Follow these links to see how semantic information can be used.

- [How to explore data with Semantic Link](semantic-link-explore-data.md)
- [How to validate data with Semantic Link](semantic-link-validate-data.md)