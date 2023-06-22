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

When you read a Power BI dataset into a [FabricDataFrame](__TODO API link__), semantic information such as metadata and annotations from the dataset are automatically attached to the FabricDataFrame. In this article, you'll learn how the SemPy python library preserves annotations that are attached to your [Power BI dataset's](/power-bi/connect-data/service-datasets-understand) tables and columns.

[!INCLUDE [preview-note](../includes/preview-note.md)]

## Semantic propagation for Pandas users

The **SemPy python library** is part of the Semantic Link feature and serves [pandas](https://pandas.pydata.org/) users. SemPy supports the operations that pandas allows you to perform on your data. Furthermore, SemPy allows you to propagate semantic data from Power BI datasets on which you're operating. By propagating semantic data, you can preserve annotations that are attached to tables and columns in the Power BI dataset when you perform operations such as slicing, merges, and concatenation.

You can create a FabricDataFrame by reading a Power BI dataset into the DataFrame, or by creating the DataFrame from in-memory data, just like you do for Pandas DataFrames. When you read a Power BI dataset into a FabricDataFrame, the metadata from Power BI automatically hydrates the FabricDataFrame. That is, the semantic information from the Power BI dataset's tables or measures are preserved in the FabricDataFrame. However, when you create a FabricDataFrame from in-memory data, you need to supply the name of a Power BI dataset from which the FabricDataFrame can pull metadata information.

How semantic data is preserved varies depending on factors such as the operations that you're performing and the order of the FabricDataFrames on which you're operating.

### Semantic propagation with merge operation

When you merge two FabricDataFrames, the order of the DataFrames determines how semantic information is propagated.

   - If **both DataFrames are annotated**, then the table-level metadata of the left DataFrame takes precedence. The same rule applies to individual columns; the column annotations present in the left DataFrame take precedence over the column annotations in the right DataFrame.
   - If **only one DataFrame is annotated**, its metadata is used. The same rule applies to individual columns; the column annotations present in the annotated DataFrame is used.

### Semantic propagation with row-wise concatenation

When you perform row-wise concatenation on multiple FabricDataFrames, the metadata of the first DataFrame is used.


<!-- ### Semantic propagation with stack and unstack operations

Unstack operation in pandas is used to move a level of index from row to column. Just like its counterpart stack, it is a useful operation to reshape the datacube. Multi-level indexes on rows and columns in pandas can be visualized as the dimensions of a datacube. Each level of the index corresponds to one dimension, and the dataframe itself is just a projection of this higher-dimensional cube onto two dimensions, with some dimensions being projected to the rows, and some dimensions being projected to the columns. The "unstack" operation moves a level from the rows to columns, while the "stack" operation does the opposite. Both operations just change the shape of the dataframe, but neither changes the nature of the underlying datacube -->

## Semantic propagation for Spark users
The Semantic Link Spark native connector hydrates (or populates) the [metadata](https://spark.apache.org/docs/3.3.2/api/python/reference/pyspark.sql/api/pyspark.sql.types.StructField.html#pyspark.sql.types.StructField) dictionary of a Spark column.
Currently, support for semantic propagation is limited and subject to Spark's internal implementation on how schema information is propagated. For example, column aggregation strips the metadata.

## Next steps
- [How to explore data with Semantic Link](semantic-link-explore-data.md)
- [How to validate data with Semantic Link](semantic-link-validate-data.md)