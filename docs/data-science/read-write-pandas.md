---
title: Read and write data with Pandas
description: Learn how to read and write data with Pandas from Lakehouse.
ms.reviewer: mopeakande
ms.author: negust
author: nelgson
ms.topic: how-to
ms.date: 02/10/2023
---

# How-to read and write data with Pandas

> [!IMPORTANT]
> [!INCLUDE [product-name](../includes/product-name.md)] is currently in PREVIEW. This information relates to a prerelease product that may be substantially modified before it's released. Microsoft makes no warranties, expressed or implied, with respect to the information provided here.

Pandas is the most popular Python library for data exploration and processing. In this guide, we'll walk through a number of examples for how to read and write data in a Notebook from a Lakehouse using the Pandas library.

## Convert Spark dataframe to Pandas

Before we list the various ways, you can leverage Pandas to read and write different file types, let’s first look at how you can convert a Spark dataframe to a pandas dataframe:

```Python
pandas_df = spark_df.toPandas() 
```

The below examples show how you can read and write various file formats with Pandas from Lakehouse/One Lake.

> [!NOTE]
> You need to replace the file names and file paths in the below examples.

> [!NOTE]
> Pandas support both abfss and relative paths.  

## Load data into Pandas from UI

Once you've attached a Lakehouse to your Notebook, you can explore the data in the Lakehouse. This allows you to select a file in your Lakehouse, for example a CSV file, and choose to “Load data” into a Pandas dataframe.

:::image type="content" source="media/read-write-pandas/load-data-pandas-dataframe.png" alt-text="Screenshot showing where to select options to load data into a Pandas dataframe." lightbox="media/read-write-pandas/load-data-pandas-dataframe.png":::

This will add a code cell to the Notebook with generated Python code for loading the data from the file into a Pandas dataframe:

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
