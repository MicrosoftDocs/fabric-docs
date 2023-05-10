---
title: Read and write data with Pandas
description: Learn how to read and write lakehouse data in a notebook using Pandas, a popular Python library for data exploration and processing.
ms.author: erenorbey
author: orbey
ms.reviewer: franksolomon
ms.topic: how-to
ms.date: 05/23/2023
ms.search.form: Read and Write Pandas
---

# How to read and write data with Pandas in Microsoft Fabric

[!INCLUDE [product-name](../includes/product-name.md)] notebooks provide built-in support for interacting with Lakehouse data using Pandas, the most popular Python library for data exploration and processing. Within a notebook, users can quickly read data from—and write data back to—their Lakehouses in a variety of file formats. This guide provides code samples to help you get started in your own notebook.

[!INCLUDE [preview-note](../includes/preview-note.md)]

## Prerequisites

[!INCLUDE [prerequisites](includes/prerequisites.md)]

## Load Lakehouse data into your notebook in a matter of clicks

Once you attach a Lakehouse to your [!INCLUDE [product-name](../includes/product-name.md)] notebook, you can explore stored data without leaving the page and read it into your notebook in a matter of clicks. Selecting any file provides options to "Load data" into a Spark or Pandas DataFrame. (You can also copy the file's full ABFS path or friendly relative path.)

:::image type="content" source="media/read-write-pandas/load-data-pandas-dataframe.png" alt-text="Screenshot showing where to select options to load data into a Pandas DataFrame." lightbox="media/read-write-pandas/load-data-pandas-dataframe.png":::

Clicking on one of the "Load data" prompts will generate a code cell to load the data from the file into a DataFrame in your notebook.

:::image type="content" source="media/read-write-pandas/code-cell-load-data-pandas-dataframe.png" alt-text="Screenshot of the code cell added to the notebook." lightbox="media/read-write-pandas/code-cell-load-data-pandas-dataframe.png":::

### Convert a Spark DataFrame to Pandas

For reference, the following code sample shows how to convert a Spark DataFrame into a Pandas DataFrame.

```Python
# Replace "spark_df" with the name of your own Spark DataFrame
pandas_df = spark_df.toPandas() 
```

## Read and write various filetypes

The code samples below document the Pandas operations for reading and writing various file formats.

> [!NOTE]
> Please replace the file paths in the following samples. Pandas supports both relative paths, as shown in these examples, and full ABFS paths. Either can be retrieved and copied from the interface according to the previous step.

## Read data from a CSV file

```Python
import pandas as pd

# Read a CSV file from your Lakehouse into a Pandas DataFrame
# Replace LAKEHOUSE_PATH and FILENAME with your own values
df = pd.read_csv("/LAKEHOUSE_PATH/Files/FILENAME.csv")
display(df)
```

## Write data to a CSV file

```Python
import pandas as pd 

# Write a Pandas DataFrame into a CSV file in your Lakehouse
# Replace LAKEHOUSE_PATH and FILENAME with your own values
df.to_csv("/LAKEHOUSE_PATH/Files/FILENAME.csv") 
```

## Read data from a Parquet file

```Python
import pandas as pd 
 
# Read a Parquet file from your Lakehouse into a Pandas DataFrame
# Replace LAKEHOUSE_PATH and FILENAME with your own values
df = pandas.read_parquet("/LAKEHOUSE_PATH/Files/FILENAME.parquet") 
display(df)
```

## Write data to a Parquet file

```Python
import pandas as pd 
 
# Write a Pandas DataFrame into a Parquet file in your Lakehouse
# Replace LAKEHOUSE_PATH and FILENAME with your own values
df.to_parquet("/LAKEHOUSE_PATH/Files/FILENAME.parquet") 
```

## Read data from an Excel file

```Python
import pandas as pd 
 
# Read an Excel file from your Lakehouse into a Pandas DataFrame
# Replace LAKEHOUSE_PATH and FILENAME with your own values
df = pandas.read_excel("/LAKEHOUSE_PATH/Files/FILENAME.xlsx") 
display(df) 
```

## Write data to an Excel file

```Python
import pandas as pd 

# Write a Pandas DataFrame into an Excel file in your Lakehouse
# Replace LAKEHOUSE_PATH and FILENAME with your own values
df.to_excel("/LAKEHOUSE_PATH/Files/FILENAME.xlsx") 
```

## Read data from a JSON file

```Python
import pandas as pd 
 
# Read a JSON file from your Lakehouse into a Pandas DataFrame
# Replace LAKEHOUSE_PATH and FILENAME with your own values
df = pandas.read_json("/LAKEHOUSE_PATH/Files/FILENAME.json") 
display(df) 
```

## Write data to a JSON file

```Python
import pandas as pd 
 
# Write a Pandas DataFrame into a JSON file in your Lakehouse
# Replace LAKEHOUSE_PATH and FILENAME with your own values
df.to_json("/LAKEHOUSE_PATH/Files/FILENAME.json") 
```

## Next steps

- Use Data Wrangler to [clean and prepare your data](data-wrangler.md)
- Start [training ML models](./model-training/model-training-overview.md)