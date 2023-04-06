---
title: Load data into your lakehouse with a notebook
description: Learn how to use a notebook to load data into your lakehouse.
ms.reviewer: snehagunda
ms.author: qixwang
author: qixwang
ms.topic: how-to
ms.date: 02/24/2023
---

# How to use a notebook to load data into your lakehouse

[!INCLUDE [preview-note](../includes/preview-note.md)]

In this tutorial, learn how to load data into your lakehouse with a notebook.

## Load data with an Apache Spark notebook

To load data into a lakehouse, you can write Spark code either in an existing notebook or create a new notebook. In the code cell of the notebook, use the following code example to read data from the source and load it into **Files**, **Tables**, or both sections of your lakehouse.

```python
df = spark.read.parquet("location to read from") 

# Keep it if you want to save dataframe as CSV files

df.write.mode("overwrite").format("csv").save("Files/ " + csvtableName)

# Keep it if you want to save dataframe as Parquet files

df.write.mode("overwrite").format("parquet").save("Files/" + parquettableName)

# Keep it if you want to save dataframe as a delta lake, parquet table

df.write.mode("overwrite").format("delta").save("Tables/" + deltatableName)
```

## Next steps

- [Explore the data in your lakehouse with a notebook](lakehouse-notebook-explore.md)
