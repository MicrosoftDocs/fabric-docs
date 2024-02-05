---
title: Semantic propagation with Sempy python library (preview)
description: Learn how Sempy library supports propagation of metadata attached to semantic models on which you're operating.
ms.reviewer: mopeakande
reviewer: msakande
ms.author: marcozo
author: eisber
ms.topic: conceptual
ms.custom:
  - ignite-2023
ms.date: 06/06/2023
ms.search.form: semantic link
---

# Semantic data propagation from semantic models (preview)

When you read a semantic model into a [FabricDataFrame](semantic-link-overview.md#fabricdataframe-data-structure), semantic information such as metadata and annotations from the semantic model are automatically attached to the FabricDataFrame.
In this article, you'll learn how the SemPy python library preserves annotations that are attached to your [semantic model's](/power-bi/connect-data/service-datasets-understand) tables and columns.

[!INCLUDE [feature-preview](../includes/feature-preview-note.md)]

## Semantic propagation for pandas users

The [SemPy Python library](/python/api/semantic-link-sempy) is part of the semantic link feature and serves [pandas](https://pandas.pydata.org/) users.
SemPy supports the operations that pandas allows you to perform on your data.
Furthermore, SemPy allows you to propagate semantic data from semantic models on which you're operating.
By propagating semantic data, you can preserve annotations that are attached to tables and columns in the semantic model when you perform operations such as slicing, merges, and concatenation.

You can create a [FabricDataFrame data structure](semantic-link-overview.md#fabricdataframe-data-structure) one of two ways: you can read a table or the output of a [measure](/power-bi/transform-model/desktop-measures) from a semantic model into a FabricDataFrame.
Alternatively, you can use in-memory data to create the FabricDataFrame, just like you do for pandas DataFrames.

- When you read from a semantic model into a FabricDataFrame, the metadata from Power BI automatically hydrates the FabricDataFrame. In other words, the semantic information from the semantic model's tables or measures are preserved in the FabricDataFrame.
- When you create a FabricDataFrame from in-memory data, you need to supply the name of a semantic model from which the FabricDataFrame can pull metadata information.

How semantic data is preserved varies depending on factors such as the operations that you're performing and the order of the FabricDataFrames on which you're operating.

### Semantic propagation with merge operation

When you merge two FabricDataFrames, the order of the DataFrames determines how semantic information is propagated.

- If **both FabricDataFrames are annotated**, then the table-level metadata of the left FabricDataFrame takes precedence. The same rule applies to individual columns; the column annotations present in the left FabricDataFrame take precedence over the column annotations in the right one.
- If **only one FabricDataFrame is annotated**, its metadata is used. The same rule applies to individual columns; the column annotations present in the annotated FabricDataFrame is used.

### Semantic propagation with concatenation

When you perform concatenation on multiple FabricDataFrames, for each column, SemPy copies the metadata from the first FabricDataFrame that matches the column name. If there are multiple matches and the metadata is not the same, a warning will be issued.

You can also propagate concatenations of FabricDataFrames with regular pandas DataFrames by placing the FabricDataFrame first.

## Semantic propagation for Spark users

The semantic link Spark native connector hydrates (or populates) the [metadata](https://spark.apache.org/docs/3.3.2/api/python/reference/pyspark.sql/api/pyspark.sql.types.StructField.html#pyspark.sql.types.StructField) dictionary of a Spark column.
Currently, support for semantic propagation is limited and subject to Spark's internal implementation of how schema information is propagated.
For example, column aggregation strips the metadata.

## Related content

- [Deepen your expertise of SemPy through the SemPy reference documentation](/python/api/semantic-link/overview-semantic-link)
- [See the SemPy reference documentation for the `FabricDataFrame` class](/python/api/semantic-link-sempy/sempy.fabric.fabricdataframe)
- [Tutorial: Analyze functional dependencies in a sample semantic model (preview)](tutorial-power-bi-dependencies.md)
- [How to validate data with semantic link (preview)](semantic-link-validate-data.md)
- [Explore and validate relationships in semantic models (preview)](semantic-link-validate-relationship.md)
