---
title: Semantic link propagation with SemPy
description: Learn how the SemPy Python library supports propagation of metadata attached to semantic models you operate on.
ms.author: jburchel
author: jonburchel
ms.reviewer: ruxu
reviewer: ruixinxu
ms.topic: concept-article
ms.date: 07/15/2025
ms.search.form: semantic link
---

# Semantic data propagation from semantic models

When you read a [semantic model](/power-bi/connect-data/service-datasets-understand) into a [FabricDataFrame](semantic-link-overview.md#fabricdataframe-data-structure), semantic information such as metadata and annotations from the semantic model are automatically attached to the FabricDataFrame.
In this article, you learn how the SemPy Python library preserves annotations that are attached to a semantic model's tables and columns.

## Semantic propagation for pandas users

The [SemPy Python library](/python/api/semantic-link-sempy) is part of the semantic link feature and serves [pandas](https://pandas.pydata.org/) users. SemPy supports the operations that pandas allows you to perform on your data.

SemPy also lets you propagate semantic data from semantic models that you operate upon.
By propagating semantic data, you can preserve annotations that are attached to tables and columns in the semantic model when you perform operations like slicing, merges, and concatenation.

You can create a [FabricDataFrame data structure](semantic-link-overview.md#fabricdataframe-data-structure) in either of two ways:

- You can read a table or the output of a [measure](/power-bi/transform-model/desktop-measures) from a semantic model into a FabricDataFrame.

  When you read from a semantic model into a FabricDataFrame, the metadata from Power BI automatically *hydrates*, or populates, the FabricDataFrame. In other words, the FabricDataFrame preserves the semantic information from the model's tables or measures.

- You can use in-memory data to create the FabricDataFrame, just as you do for pandas DataFrames.

  When you create a FabricDataFrame from in-memory data, you need to supply the name of a semantic model from which the FabricDataFrame can pull metadata information.

The way SemPy preserves semantic data varies depending on factors like the operations you do and the order of the FabricDataFrames you operate on.

### Semantic propagation with merge

When you merge two FabricDataFrames, the order of the DataFrames determines how SemPy propagates semantic information.

- If **both FabricDataFrames are annotated**, the table-level metadata of the left FabricDataFrame takes precedence. The same rule applies to individual columns; the column annotations in the left FabricDataFrame take precedence over the column annotations in the right DataFrame.

- If **only one FabricDataFrame is annotated**, SemPy uses its metadata. The same rule applies to individual columns; SemPy uses the column annotations present in the annotated FabricDataFrame.

### Semantic propagation with concatenation

When you concatenate multiple FabricDataFrame, for each column, SemPy copies the metadata from the first FabricDataFrame that matches the column name. If there are multiple matches and the metadata isn't the same, SemPy issues a warning.

You can also propagate concatenations of FabricDataFrames with regular pandas DataFrames by placing the FabricDataFrame first.

## Semantic propagation for Spark users

The semantic link Spark native connector hydrates (or populates) the [metadata](https://spark.apache.org/docs/latest/api/python/reference/pyspark.sql/api/pyspark.sql.types.StructField.html) dictionary of a Spark column.
Currently, support for semantic propagation is limited and subject to Spark's internal implementation of how schema information is propagated.
For example, column aggregation strips the metadata.

## Related content

- [Reference for SemPy's FabricDataFrame class](/python/api/semantic-link-sempy/sempy.fabric.fabricdataframe)
- [Get started with Python semantic link (SemPy)](/python/api/semantic-link/overview-semantic-link)
- [Tutorial: Analyze functional dependencies in a sample semantic model](tutorial-power-bi-dependencies.md)
- [Explore and validate data by using semantic link](semantic-link-validate-data.md)
- [Explore and validate relationships in semantic models](semantic-link-validate-relationship.md)
