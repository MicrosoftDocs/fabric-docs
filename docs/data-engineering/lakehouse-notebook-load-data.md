---
title: Load data into your Lakehouse with a notebook
description: Learn how to use a notebook to load data into your Lakehouse.
ms.reviewer: snehagunda
ms.author: qixwang
author: qixwang
ms.topic: how-to
ms.date: 02/24/2023
---

# How to use a notebook to load data into your Lakehouse

> [!IMPORTANT]
> [!INCLUDE [product-name](../includes/product-name.md)] is currently in PREVIEW. This information relates to a prerelease product that may be substantially modified before it's released. Microsoft makes no warranties, expressed or implied, with respect to the information provided here.

In this tutorial, learn how to load data into your Lakehouse with a notebook.

## Load data with an Apache Spark notebook

To load data into a Lakehouse, you can write Spark code either in an existing notebook or create a new notebook. In the code cell of the notebook, use the following code example to read data from the source and load it into **Files**, **Tables**, or both sections of your Lakehouse.

```python
df = spark.read.parquet("location to read from") 

# Keep it if you want to save dataframe as CSV files

df.write.mode("overwrite").format("csv").save("Files/ " + csvtableName)

# Keep it if you want to save dataframe as Parquet files

df.write.mode("overwrite").format("parquet").save("Files/" + parquettableName)

# Keep it if you want to save dataframe as a delta lake, parquet table

df.write.mode("overwrite").format("delta").save("Tables/" + deltatableName)
```
