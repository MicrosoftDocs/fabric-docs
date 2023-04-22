---
title: Read and write data with Pandas
description: Learn how to read and write lakehouse data in a notebook using Pandas, a popular Python library for data exploration and processing.
ms.author: erenorbey
author: orbey
ms.reviewer: franksolomon
ms.topic: how-to
ms.date: 04/03/2023
ms.search.form: Read and Write Pandas
---

# How to read and write data with Pandas in Microsoft Fabric

> [!IMPORTANT]
> [!INCLUDE [product-name](../includes/product-name.md)] is currently in PREVIEW. This information relates to a prerelease product that may be substantially modified before it's released. Microsoft makes no warranties, expressed or implied, with respect to the information provided here.

Pandas became the most popular Python library for data exploration and processing. In this guide, we walk through examples that show how to read and write data in a Notebook, from a Lakehouse, using the Pandas library.

## Convert Spark dataframe to Pandas

First, this code sample shows how to convert a Spark dataframe to a pandas dataframe:

```Python
pandas_df = spark_df.toPandas() 
```

These examples show how Pandas can read and write various file formats from Lakehouse / One Lake.

> [!NOTE]
> You need to replace the file names and file paths in these examples.

> [!NOTE]
> Pandas support both abfss and relative paths.  

## Load data into Pandas from UI

Once you attach a Lakehouse to your Notebook, you can explore the data in that Lakehouse. This way, you can select a file in your Lakehouse - for example, a CSV file - and choose to “Load data” into a Pandas dataframe.

:::image type="content" source="media/read-write-pandas/load-data-pandas-dataframe.png" alt-text="Screenshot showing where to select options to load data into a Pandas dataframe." lightbox="media/read-write-pandas/load-data-pandas-dataframe.png":::

This adds a code cell to the Notebook with generated Python code, to load the data from the file into a Pandas dataframe:

:::image type="content" source="media/read-write-pandas/code-cell-load-data-pandas-dataframe.png" alt-text="Screenshot of the code cell added to the Notebook." lightbox="media/read-write-pandas/code-cell-load-data-pandas-dataframe.png":::

## Read CSV file from Lakehouse with Pandas

```Python
Import pandas as pd 
# Load data into pandas DataFrame from CSV 
df = pd.read_csv("/<Lakehouse path>/filename.csv") 
display(df) 
```

## Write CSV file to Lakehouse with Pandas

```Python
Import pandas as pd 
# Write CSV file from Pandas dataframe 
df.to_csv("/<Lakehouse path>/filename.csv") 
```

## Read Parquet file from Lakehouse with Pandas

```Python
Import pandas as pd 
 
# Load data into pandas DataFrame from Parquet 
df = pandas.read_parquet(“/<Lakehouse path>/filename.parquet") 
display(df) 
```

## Write Parquet file to Lakehouse with Pandas

```Python
Import pandas as pd 
 
# Write Parquet 
df.to_parquet("/<Lakehouse path>/filename.parquet") 
```

## Read Excel file from Lakehouse with Pandas

```Python
Import pandas as pd 
 
# Load data into pandas DataFrame from Excel 
df = pandas.read_excel(“/<Lakehouse path>/filename.xlsx") 
display(df) 
```

## Write Excel file to Lakehouse with Pandas

```Python
Import pandas as pd 
# Write Excel file from Pandas Dataframe  
df.to_excel("/<Lakehouse path>/filename.xlsx") 
```

## Read Json file from Lakehouse with Pandas

```Python
Import pandas as pd 
 
# Load data into pandas DataFrame from json 
df = pandas.read_json(“/<Lakehouse path>/filename.json") 
 
display(df) 
```

## Write Json file to Lakehouse with Pandas

```Python
Import pandas as pd 
 
# Write json file from Pandas Dataframe  
df.to_json("/<Lakehouse path>/filename.xlsx") 
```

## Next steps

- Use Data Wrangler to clean and prepare your data (See the [Data Wrangler section](data-wrangler.md))
- Start training ML models (See How-to Train models section)