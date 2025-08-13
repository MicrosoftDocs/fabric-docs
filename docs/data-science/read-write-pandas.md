---
title: Read and write data with Pandas
description: Learn how to read and write lakehouse data in a notebook using Pandas, a popular Python library for data exploration and processing.
ms.author: scottpolly
author: s-polly
ms.reviewer: vimeland
reviewer: s-polly
ms.topic: how-to
ms.custom:
ms.date: 08/06/2025
ms.search.form: Read and Write Pandas
ai-usage: ai-assisted
---

# How to read and write data with Pandas in Microsoft Fabric

[!INCLUDE [product-name](../includes/product-name.md)] notebooks support seamless interaction with Lakehouse data using Pandas, the most popular Python library for data exploration and processing. Within a notebook, you can quickly read data from and write data back to your Lakehouse resources in various file formats. This guide provides code samples to help you get started in your own notebook.

## Prerequisites

[!INCLUDE [prerequisites](includes/prerequisites.md)]

- Complete the steps in [Prepare your system for data science tutorials](tutorial-data-science-prepare-system.md) to create a new notebook and attach a Lakehouse to it. For this article, follow the steps to create a new notebook rather than importing an existing one.

## Load Lakehouse data into a notebook

> [!NOTE]
> You need some data in your Lakehouse to follow the steps in this section. If you don't have any data, follow the steps in [Download dataset and upload to lakehouse](tutorial-data-science-ingest-data.md#download-dataset-and-upload-to-lakehouse) to add the **churn.csv** file to your Lakehouse.

Once you attach a Lakehouse to your [!INCLUDE [product-name](../includes/product-name.md)] notebook, you can explore stored data without leaving the page and read it into your notebook with just a few steps. Selecting any Lakehouse file displays options to "Load data" into a Spark or Pandas DataFrame. You can also copy the file's full ABFS path or a friendly relative path.

:::image type="content" source="media/read-write-pandas/load-data-pandas-dataframe.png" alt-text="Screenshot that shows the options to load data into a Pandas DataFrame." lightbox="media/read-write-pandas/load-data-pandas-dataframe.png":::

Selecting one of the "Load data" prompts generates a code cell that loads the file into a DataFrame in your notebook.

:::image type="content" source="media/read-write-pandas/code-cell-load-data-pandas-dataframe.png" alt-text="Screenshot that shows a code cell added to the notebook." lightbox="media/read-write-pandas/code-cell-load-data-pandas-dataframe.png":::

### Converting a Spark DataFrame into a Pandas DataFrame

For reference, this command shows how to convert a Spark DataFrame into a Pandas DataFrame:

```Python
# Replace "spark_df" with the name of your own Spark DataFrame
pandas_df = spark_df.toPandas() 
```

## Reading and writing various file formats
> [!NOTE]
> Modifying the version of a specific package could potentially break other packages that depend on it. For instance, downgrading `azure-storage-blob` might cause problems with `Pandas` and various other libraries that rely on `Pandas`, including `mssparkutils`, `fsspec_wrapper`, and `notebookutils`.
> You can view the list of preinstalled packages and their versions for each runtime [here](../data-engineering/runtime.md).

These code samples demonstrate Pandas operations to read and write various file formats. These samples aren't intended to be run sequentially as in a tutorial, but rather to be copied and pasted into your own notebook as needed.

> [!NOTE]
> You must replace the file paths in these code samples. Pandas supports both relative paths, as shown here, and full ABFS paths. You can retrieve and copy paths of either type from the interface using the previous steps.

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
df = pd.read_parquet("/LAKEHOUSE_PATH/Files/FILENAME.parquet") 
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
# If the file is in a subfolder, add the correct file path after Files/
# For the default lakehouse attached to the notebook, use: df = pd.read_excel("/lakehouse/default/Files/FILENAME.xlsx") 
df = pd.read_excel("/LAKEHOUSE_PATH/Files/FILENAME.xlsx") 
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
df = pd.read_json("/LAKEHOUSE_PATH/Files/FILENAME.json") 
display(df) 
```

### Write data as a JSON file

```Python
import pandas as pd 
 
# Write a Pandas DataFrame into a JSON file in your Lakehouse
# Replace LAKEHOUSE_PATH and FILENAME with your own values
df.to_json("/LAKEHOUSE_PATH/Files/FILENAME.json") 
```

## Working with Delta tables

Delta tables are the default table format in Microsoft Fabric and are stored in the **Tables** section of your Lakehouse. Unlike files, Delta tables require a two-step process to work with pandas: first read the table into a Spark DataFrame, then convert it to a pandas DataFrame.

> [!NOTE]
> To follow the steps in this section, you need a Delta table in your Lakehouse. Follow the steps in [Download dataset and upload to lakehouse](tutorial-data-science-ingest-data.md#download-dataset-and-upload-to-lakehouse) to add the **churn.csv** file to your Lakehouse, then create a test table from the **churn.csv** file by running this code in your notebook:

### Create a test Delta table

```python
import pandas as pd
# Create a test Delta table from the churn.csv file

df = pd.read_csv("/lakehouse/default/Files/churn/raw/churn.csv")
spark_df = spark.createDataFrame(df)
spark_df.write.format("delta").mode("overwrite").saveAsTable("churn_table")
```

 This creates a Delta table named **churn_table** that you can use for testing the examples below.

### Read data from a Delta table

```Python
# Read a Delta table from your Lakehouse into a pandas DataFrame
# This example uses the churn_table created above
spark_df = spark.read.format("delta").load("Tables/churn_table")
pandas_df = spark_df.toPandas()
display(pandas_df)
```

You can also read Delta tables using Spark SQL syntax:

```Python
# Alternative method using Spark SQL
spark_df = spark.sql("SELECT * FROM churn_table")
pandas_df = spark_df.toPandas()
display(pandas_df)
```

### Write pandas DataFrame to a Delta table

```Python
# Convert pandas DataFrame to Spark DataFrame, then save as Delta table
# Replace TABLE_NAME with your desired table name
spark_df = spark.createDataFrame(pandas_df)
spark_df.write.format("delta").mode("overwrite").saveAsTable("TABLE_NAME")
```

You can also save to a specific path in the Tables section:

```Python
# Save to a specific path in the Tables section
spark_df = spark.createDataFrame(pandas_df)
spark_df.write.format("delta").mode("overwrite").save("Tables/TABLE_NAME")
```

### Write modes for Delta tables

When writing to Delta tables, you can specify different modes:

```Python
# Overwrite the entire table
spark_df.write.format("delta").mode("overwrite").saveAsTable("TABLE_NAME")

# Append new data to existing table
spark_df.write.format("delta").mode("append").saveAsTable("TABLE_NAME")
```

> [!NOTE]
> Delta tables created in the **Tables** section of your Lakehouse are automatically discoverable without requiring any additional registration or configuration steps, and can be queried using Spark SQL. They also appear in the Lakehouse explorer interface (you may need to refresh the Lakehouse explorer to see recent changes).

## Related content

- Use Data Wrangler to [clean and prepare your data](data-wrangler.md)
- Start [training ML models](model-training-overview.md)
