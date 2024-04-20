---
title: Read and write data with Pandas
description: Learn how to read and write lakehouse data in a notebook using Pandas, a popular Python library for data exploration and processing.
ms.author: erenorbey
author: orbey
ms.reviewer: franksolomon
ms.topic: how-to
ms.custom:
  - build-2023
  - ignite-2023
ms.date: 04/19/2024
ms.search.form: Read and Write Pandas
---

# How to read and write data with Pandas in Microsoft Fabric

[!INCLUDE [product-name](../includes/product-name.md)] notebooks support seamless interaction with Lakehouse data using Pandas, the most popular Python library for data exploration and processing. Within a notebook, you can quickly read data from, and write data back to, their Lakehouse resources in various file formats. This guide provides code samples to help you get started in your own notebook.

## Prerequisites

[!INCLUDE [prerequisites](includes/prerequisites.md)]

## Load Lakehouse data into a notebook

Once you attach a Lakehouse to your [!INCLUDE [product-name](../includes/product-name.md)] notebook, you can explore stored data without leaving the page, and read it into your notebook, all with a few steps. Selection of any Lakehouse file surfaces options to "Load data" into a Spark or a Pandas DataFrame. You can also copy the file's full ABFS path or a friendly relative path.

:::image type="content" source="media/read-write-pandas/load-data-pandas-dataframe.png" alt-text="Screenshot that shows the options to load data into a Pandas DataFrame." lightbox="media/read-write-pandas/load-data-pandas-dataframe.png":::

Selection of one of the "Load data" prompts generates a code cell to load that file into a DataFrame in your notebook.

:::image type="content" source="media/read-write-pandas/code-cell-load-data-pandas-dataframe.png" alt-text="Screenshot that shows a code cell added to the notebook." lightbox="media/read-write-pandas/code-cell-load-data-pandas-dataframe.png":::

### Converting a Spark DataFrame into a Pandas DataFrame

For reference, this command shows how to convert a Spark DataFrame into a Pandas DataFrame:

```Python
# Replace "spark_df" with the name of your own Spark DataFrame
pandas_df = spark_df.toPandas() 
```

## Reading and writing various file formats

These code samples describe the Pandas operations to read and write various file formats.

> [!NOTE]
> You must replace the file paths in these code samples. Pandas supports both relative paths, as shown here, and full ABFS paths. Paths of either type can be retrieved and copied from the interface according to the previous step.

### Read data from a CSV file

```Python
import pandas as pd

# Read a CSV file from your Lakehouse into a Pandas DataFrame
# Replace LAKEHOUSE_PATH and FILENAME with your own values
df = pd.read_csv("/LAKEHOUSE_PATH/Files/FILENAME.csv")
display(df)
```

### Write data as a CSV file

```Python
import pandas as pd 

# Write a Pandas DataFrame into a CSV file in your Lakehouse
# Replace LAKEHOUSE_PATH and FILENAME with your own values
df.to_csv("/LAKEHOUSE_PATH/Files/FILENAME.csv") 
```

### Read data from a Parquet file

```Python
import pandas as pd 
 
# Read a Parquet file from your Lakehouse into a Pandas DataFrame
# Replace LAKEHOUSE_PATH and FILENAME with your own values
df = pandas.read_parquet("/LAKEHOUSE_PATH/Files/FILENAME.parquet") 
display(df)
```

### Write data as a Parquet file

```Python
import pandas as pd 
 
# Write a Pandas DataFrame into a Parquet file in your Lakehouse
# Replace LAKEHOUSE_PATH and FILENAME with your own values
df.to_parquet("/LAKEHOUSE_PATH/Files/FILENAME.parquet") 
```

### Read data from an Excel file

```Python
import pandas as pd 
 
# Read an Excel file from your Lakehouse into a Pandas DataFrame
# Replace LAKEHOUSE_PATH and FILENAME with your own values
df = pandas.read_excel("/LAKEHOUSE_PATH/Files/FILENAME.xlsx") 
display(df) 
```

### Write data as an Excel file

```Python
import pandas as pd 

# Write a Pandas DataFrame into an Excel file in your Lakehouse
# Replace LAKEHOUSE_PATH and FILENAME with your own values
df.to_excel("/LAKEHOUSE_PATH/Files/FILENAME.xlsx") 
```

### Read data from a JSON file

```Python
import pandas as pd 
 
# Read a JSON file from your Lakehouse into a Pandas DataFrame
# Replace LAKEHOUSE_PATH and FILENAME with your own values
df = pandas.read_json("/LAKEHOUSE_PATH/Files/FILENAME.json") 
display(df) 
```

### Write data as a JSON file

```Python
import pandas as pd 
 
# Write a Pandas DataFrame into a JSON file in your Lakehouse
# Replace LAKEHOUSE_PATH and FILENAME with your own values
df.to_json("/LAKEHOUSE_PATH/Files/FILENAME.json") 
```

## Related content

- Use Data Wrangler to [clean and prepare your data](data-wrangler.md)
- Start [training ML models](model-training-overview.md)