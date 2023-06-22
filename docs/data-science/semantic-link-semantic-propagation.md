---
title: Semantic propagation with Sempy python library
description: Learn how Sempy library supports propagation of metadata that is attached to Power BI datasets on which you're operating.
ms.reviewer: mopeakande
reviewer: msakande
ms.author: marcozo
author: eisber
ms.topic: conceptual
ms.date: 06/06/2023
ms.search.form: Semantic Link
---

# Propagation of semantic data with Power BI datasets in Microsoft Fabric

Semantic information such as metadata and annotations are automatically attached to a [FabricDataFrame](__TODO API link__) when you read data from Power BI. In this article, you'll learn how the SemPy python library preserves annotations that are attached to tables and columns in your [Power BI datasets](/power-bi/connect-data/service-datasets-understand).

[!INCLUDE [preview-note](../includes/preview-note.md)]

## Semantic propagation for Pandas users

The SemPy python library is part of the Semantic Link feature and serves [pandas](https://pandas.pydata.org/) users. SemPy supports the operations that pandas allows you to perform on your data. Furthermore, Sempy allows you to propagate semantic data in Power BI datasets on which you're operating.

Semantic data propagation enables you to preserve annotations that are attached to tables and columns in the dataset when you're applying operations such as slicing, merges, and concatenation.
Semantic information in [FabricDataFrames](TODO link to API) is automatically populated when reading tables or measures from Power BI datasets.
Alternatively, FabricDataFrames can be constructed from in-memory data just like Pandas dataframes.
To enable metadata population you need to supply the Power BI dataset name.
__@Mope, does that help?__

How semantic data is preserved varies depending on factors such as the operations that you're performing and the order of the dataframes on which you're operating.

- When you **merge two dataframes**:
    - If both dataframes are annotated, then the table-level metadata of the left dataframe takes precedence. The same rule applies to individual columns; the column annotations present in the left dataframe take precedence over the column annotations in the right dataframe.
    - If only one dataframe is annotated, its metadata is used. The same rule applies to individual columns; the column annotations present in the annotated dataframe is used.
- When you perform **row-wise concatenation on multiple dataframes**, the metadata of the first dataframe is used.


<!-- ### What happens when dataframes are stacked and unstacked?

Unstack operation in pandas is used to move a level of index from row to column. Just like its counterpart stack, it is a useful operation to reshape the datacube. Multi-level indexes on rows and columns in pandas can be visualized as the dimensions of a datacube. Each level of the index corresponds to one dimension, and the dataframe itself is just a projection of this higher-dimensional cube onto two dimensions, with some dimensions being projected to the rows, and some dimensions being projected to the columns. The "unstack" operation moves a level from the rows to columns, while the "stack" operation does the opposite. Both operations just change the shape of the dataframe, but neither changes the nature of the underlying datacube -->

## Semantic propagation for Spark users
The Semantic Link Spark native connector hydrates the [metadata](https://spark.apache.org/docs/3.3.2/api/python/reference/pyspark.sql/api/pyspark.sql.types.StructField.html#pyspark.sql.types.StructField) dictionary of a Spark column.
Currently, support for semantic propagation is limited and subject to Spark's internal implementation on how schema information is propagated. For example, column aggregation strips the metadata.

## Next steps
- [How to explore data with Semantic Link](semantic-link-explore-data.md)
- [How to validate data with Semantic Link](semantic-link-validate-data.md)