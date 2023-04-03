---
title: Read and write data with Pandas
description: Learn how to read and write data with Pandas from Lakehouse.
<<<<<<< HEAD
=======
ms.reviewer: franksolomon
>>>>>>> f2af6f7998e5909a708aacd23081f43d29a43477
ms.author: negust
author: nelgson
ms.reviewer: franksolomon
ms.topic: how-to
ms.date: 03/30/2023
ms.search.form: Read and Write Pandas
---

# How-to read and write data with Pandas

[!INCLUDE [preview-note](../includes/preview-note.md)]

Pandas became the most popular Python library for data exploration and processing. This guide shows examples that explain how to read and write data in a Notebook, from a Lakehouse, using the Pandas library.

## Convert a Spark dataframe to Pandas

<<<<<<< HEAD
First, this code sample shows how to convert a Spark dataframe to a pandas dataframe:
=======
Before we list the various ways, you can leverage Pandas to read and write different file types, let's first look at how you can convert a Spark dataframe to a pandas dataframe:
>>>>>>> f2af6f7998e5909a708aacd23081f43d29a43477

```Python
pandas_df = spark_df.toPandas() 
```

These examples show how Pandas can read and write various file formats from Lakehouse / One Lake.

> [!NOTE]
> You need to replace the file names and file paths in these examples.

> [!NOTE]
> Pandas support both abfss and relative paths.  

## Load data into Pandas from the UI

<<<<<<< HEAD
Once you attach a Lakehouse to your Notebook, you can explore the data in that Lakehouse. This way, you can select a file in your Lakehouse - for example, a CSV file - and choose to “Load data” into a Pandas dataframe.
=======
Once you've attached a Lakehouse to your Notebook, you can explore the data in the Lakehouse. This allows you to select a file in your Lakehouse, for example a CSV file, and choose to "Load data" into a Pandas dataframe.
>>>>>>> f2af6f7998e5909a708aacd23081f43d29a43477

:::image type="content" source="media/read-write-pandas/load-data-pandas-dataframe.png" alt-text="Screenshot showing where to select options to load data into a Pandas dataframe." lightbox="media/read-write-pandas/load-data-pandas-dataframe.png":::

This image shows a code cell added to the Notebook with generated Python code, to load the data from the file into a Pandas dataframe:

:::image type="content" source="media/read-write-pandas/code-cell-load-data-pandas-dataframe.png" alt-text="Screenshot of the code cell added to the Notebook." lightbox="media/read-write-pandas/code-cell-load-data-pandas-dataframe.png":::

## Read a CSV file from Lakehouse with Pandas

```Python
Import pandas as pd 
# Load data into pandas DataFrame from CSV 
df = pd.read_csv("/<Lakehouse path>/filename.csv") 
display(df) 
```

## Write a CSV file to Lakehouse with Pandas

```Python
Import pandas as pd 
# Write CSV file from Pandas dataframe 
df.to_csv("/<Lakehouse path>/filename.csv") 
```

## Read a Parquet file from Lakehouse with Pandas

```Python
Import pandas as pd 
 
# Load data into pandas DataFrame from Parquet 
df = pandas.read_parquet("/<Lakehouse path>/filename.parquet") 
display(df) 
```

## Write a Parquet file to Lakehouse with Pandas

```Python
Import pandas as pd 
 
# Write Parquet 
df.to_parquet("/<Lakehouse path>/filename.parquet") 
```

## Read an Excel file from Lakehouse with Pandas

```Python
Import pandas as pd 
 
# Load data into pandas DataFrame from Excel 
df = pandas.read_excel("/<Lakehouse path>/filename.xlsx") 
display(df) 
```

## Write an Excel file to Lakehouse with Pandas

```Python
Import pandas as pd 
# Write Excel file from Pandas Dataframe  
df.to_excel("/<Lakehouse path>/filename.xlsx") 
```

## Read a Json file from Lakehouse with Pandas

```Python
Import pandas as pd 
 
# Load data into pandas DataFrame from json 
df = pandas.read_json("/<Lakehouse path>/filename.json") 
 
display(df) 
```

## Write a Json file to Lakehouse with Pandas

```Python
Import pandas as pd 
 
# Write json file from Pandas Dataframe  
df.to_json("/<Lakehouse path>/filename.xlsx") 
```

## Next steps

- Use Data Wrangler to clean and prepare your data (See the [Data Wrangler section](data-wrangler.md))
- Start training ML models (See How-to Train models section)