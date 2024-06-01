---
title: Semantic propagation with SemPy Python library
description: Learn how SemPy library supports propagation of metadata attached to semantic models you're operating on.
ms.reviewer: mopeakande
reviewer: msakande
ms.author: marcozo
author: eisber
ms.topic: conceptual
ms.custom:
  - ignite-2023
ms.date: 05/31/2024
ms.search.form: semantic link
---

# Semantic data propagation with SemPy

When you read a [semantic model](/power-bi/connect-data/service-datasets-understand) into a [FabricDataFrame](semantic-link-overview.md#fabricdataframe-data-structure), semantic information such as metadata and annotations from the semantic model are automatically attached to the FabricDataFrame structure. In this article, you learn how the SemPy Python library preserves and propagates annotations that are attached to a semantic model's tables and columns.

## Semantic propagation for pandas users

The [SemPy Python library](/python/api/semantic-link-sempy) is part of the semantic link feature and serves [pandas](https://pandas.pydata.org/) users. SemPy supports all pandas data operations.

SemPy also lets you propagate semantic data from semantic models that you're using. By propagating semantic data, you can preserve annotations that are attached to tables and columns in the semantic model when you do operations like slicing, merges, and concatenation.

You can create a [FabricDataFrame data structure](semantic-link-overview.md#fabricdataframe-data-structure) in either of two ways:

- You can read a table or the output of a [measure](/power-bi/transform-model/desktop-measures) from a semantic model into a FabricDataFrame.

  When you read from a semantic model into a FabricDataFrame, the metadata from Power BI automatically *hydrates*, or populates, the FabricDataFrame. The semantic information from the model's tables or measures is preserved in the FabricDataFrame.

- You can use in-memory data to create the FabricDataFrame, just as you do for pandas DataFrames.

  When you create a FabricDataFrame from in-memory data, you need to supply the name of the semantic model that the FabricDataFrame can pull metadata information from.

How semantic data is preserved varies, depending on factors like the operations you're doing and the order of the FabricDataFrames you're operating on.

### Semantic propagation with merge

When you merge two FabricDataFrames, the order of the DataFrames determines how SemPy propagates semantic information.

- If both FabricDataFrames are annotated, the table-level metadata of the left FabricDataFrame takes precedence. The same rule applies to individual columns. The column annotations in the left FabricDataFrame take precedence over the column annotations in the right DataFrame.

- If only one FabricDataFrame is annotated, SemPy uses its metadata. The same rule applies to individual columns. SemPy uses the column annotations present in the annotated FabricDataFrame.

### Semantic propagation with concatenation

When you concatenate multiple FabricDataFrames, SemPy copies the metadata from the first FabricDataFrame that matches each column name. If there are multiple matches and the metadata isn't the same, SemPy issues a warning.

You can also propagate concatenations of FabricDataFrames with regular pandas DataFrames by placing the FabricDataFrame first.

## Semantic propagation for Spark users

The semantic link Spark native connector hydrates the [metadata](https://spark.apache.org/docs/3.3.2/api/python/reference/pyspark.sql/api/pyspark.sql.types.StructField.html#pyspark.sql.types.StructField) dictionary of a Spark column. Currently, support for semantic propagation is limited by Spark's internal implementation of schema information propagation. For example, column aggregation strips the metadata.

## Related content

- [Get started with Python semantic link (SemPy)](/python/api/semantic-link/overview-semantic-link)
- [SemPy FabricDataFrame class reference documentation](/python/api/semantic-link-sempy/sempy.fabric.fabricdataframe)
- [Tutorial: Analyze functional dependencies in a sample semantic model](tutorial-power-bi-dependencies.md)
- [Explore and validate data by using semantic link](semantic-link-validate-data.md)
- [Explore and validate relationships in semantic models](semantic-link-validate-relationship.md)
