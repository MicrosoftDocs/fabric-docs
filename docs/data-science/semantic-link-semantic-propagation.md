---
title: Semantic propagation with Sempy python library
description: Learn how Sempy library supports propagation of metadata attached to Power BI datasets on which you're operating.
ms.reviewer: mopeakande
reviewer: msakande
ms.author: marcozo
author: eisber
ms.topic: conceptual
ms.date: 06/06/2023
ms.search.form: Semantic Link
---

# Semantic data propagation from Power BI datasets

When you read a Power BI dataset into a [FabricDataFrame](data-science-overview.md), semantic information such as metadata and annotations from the dataset are automatically attached to the FabricDataFrame.
In this article, you'll learn how the SemPy python library preserves annotations that are attached to your [Power BI dataset's](/power-bi/connect-data/service-datasets-understand) tables and columns.

[!INCLUDE [preview-note](../includes/preview-note.md)]

## Semantic propagation for pandas users

The **SemPy Python library** is part of the Semantic Link feature and serves [pandas](https://pandas.pydata.org/) users.
SemPy supports the operations that pandas allows you to perform on your data.
Furthermore, SemPy allows you to propagate semantic data from Power BI datasets on which you're operating.
By propagating semantic data, you can preserve annotations that are attached to tables and columns in the Power BI dataset when you perform operations such as slicing, merges, and concatenation.

You can create a FabricDataFrame one of two ways: you can read a table or the output of a [measure](/power-bi/transform-model/desktop-measures) from a Power BI dataset into a FabricDataFrame.
Alternatively, you can use in-memory data to create the FabricDataFrame, just like you do for pandas DataFrames.

- When you read from a Power BI dataset into a FabricDataFrame, the metadata from Power BI automatically hydrates the FabricDataFrame. In other words, the semantic information from the Power BI dataset's tables or measures are preserved in the FabricDataFrame.
- When you create a FabricDataFrame from in-memory data, you need to supply the name of a Power BI dataset from which the FabricDataFrame can pull metadata information.

How semantic data is preserved varies depending on factors such as the operations that you're performing and the order of the FabricDataFrames on which you're operating.

### Semantic propagation with merge operation

When you merge two FabricDataFrames, the order of the DataFrames determines how semantic information is propagated.

   - If **both FabricDataFrames are annotated**, then the table-level metadata of the left FabricDataFrame takes precedence. The same rule applies to individual columns; the column annotations present in the left FabricDataFrame take precedence over the column annotations in the right one.
   - If **only one FabricDataFrame is annotated**, its metadata is used. The same rule applies to individual columns; the column annotations present in the annotated FabricDataFrame is used.

### Semantic propagation with concatenation

When you perform concatenation on multiple FabricDataFrames, for each column, SemPy copies the metadata from the first FabricDataFrame that matches the column name. If there are multiple matches and the metadata is not the same, a warning will be issued. 

You can also propagate concatenations of FabricDataFrames with regular pandas DataFrames by placing the FabricDataFrame first.


<!-- ### Semantic propagation with stack and unstack operations
Unstack operation in pandas is used to move a level of index from row to column. Just like its counterpart stack, it is a useful operation to reshape the datacube. Multi-level indexes on rows and columns in pandas can be visualized as the dimensions of a datacube. Each level of the index corresponds to one dimension, and the dataframe itself is just a projection of this higher-dimensional cube onto two dimensions, with some dimensions being projected to the rows, and some dimensions being projected to the columns. The "unstack" operation moves a level from the rows to columns, while the "stack" operation does the opposite. Both operations just change the shape of the dataframe, but neither changes the nature of the underlying datacube -->

## Semantic propagation for Spark users
The Semantic Link Spark native connector hydrates (or populates) the [metadata](https://spark.apache.org/docs/3.3.2/api/python/reference/pyspark.sql/api/pyspark.sql.types.StructField.html#pyspark.sql.types.StructField) dictionary of a Spark column.
Currently, support for semantic propagation is limited and subject to Spark's internal implementation of how schema information is propagated.
For example, column aggregation strips the metadata.

## Next steps
- [How to validate data with Semantic Link](semantic-link-validate-data.md)
- [Explore and validate relationships in Power BI datasets](semantic-link-validate-relationship.md)