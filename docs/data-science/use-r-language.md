---
title: How to use the R language
description: Learn how to use the R language in Fabric, which provides built-in R support for Apache Spark. You can use notebooks to write and run your R code.
ms.reviewer: sgilley
ms.author: ruxu
author: ruixinxu
ms.topic: how-to
ms.date: 03/24/2023
ms.search.form: R Language
---

# How to use the R language in Microsoft Fabric

[!INCLUDE [preview-note](../includes/preview-note.md)]

[!INCLUDE [product-name](../includes/product-name.md)] provides built-in R support for Apache Spark. As part of this support, data scientists can use [!INCLUDE [product-name](../includes/product-name.md)] notebooks to write and run their R code. Support for SparkR and SparklyR is also included, which allows you to interact with Spark using familiar Spark or R interfaces.

In this article, you'll learn how to use R for Apache Spark with [!INCLUDE [product-name](../includes/product-name.md)].

## R runtime

[!INCLUDE [product-name](../includes/product-name.md)] supports an R runtime which features many popular open-source R packages, including TidyVerse.  

To learn more about the libraries installed on each runtime, you can visit the following page: [!INCLUDE [product-name](../includes/product-name.md)] Runtimes.

## Create and run notebook sessions

A [!INCLUDE [product-name](../includes/product-name.md)] notebook is a web interface for you to create files that contain live code, visualizations, and narrative text. Notebooks are a good place to validate ideas and use quick experiments to get insights from your data. Notebooks are also widely used in data preparation, data visualization, machine learning, and other big data scenarios.

To get started with R in [!INCLUDE [product-name](../includes/product-name.md)] notebooks, change the primary language by setting the **language option** to **SparkR (R)**.

In addition, use multiple languages in one notebook by specifying the language magic command at the beginning of a cell.

```r
%%sparkr

# Enter your R code here
```

## Install packages

When doing interactive data analysis or machine learning, you might try newer packages or need packages that are currently unavailable on your Apache Spark pool. Instead of updating the pool configuration, you can use session-scoped packages to add, manage, and update session dependencies.

- When you install session-scoped libraries, only the current notebook has access to the specified libraries.
- These libraries won't affect other sessions or jobs using the same Spark pool.
- These libraries are installed on top of the base runtime and pool level libraries.
- Notebook libraries take the highest precedence.
- Session-scoped R libraries don't persist across sessions. These libraries are installed at the start of each session when the related installation commands are executed.
- Session-scoped R libraries are automatically installed across both the driver and worker nodes.

For example, you can install an R library from CRAN and CRAN snapshots. In the following example, `Highcharter` is a popular package for R visualizations. Install this package on all nodes within your Apache Spark pool using the following command:

```r
install.packages("highcharter", repos = "https://cran.microsoft.com/snapshot/2021-07-16/")
```

## Notebook utilities

Microsoft Spark Utilities (MSSparkUtils) is a built-in package to help you easily perform common tasks. You can use MSSparkUtils to work with file systems, to get environment variables, to chain notebooks together, and to work with secrets. MSSparkUtils is supported for R notebooks.

To get started, run the following commands:

```r
library(notebookutils)
mssparkutils.fs.help()
```

## Use SparkR

[SparkR](https://spark.apache.org/docs/latest/sparkr.html) is an R package that provides a light-weight frontend to use Apache Spark from R. SparkR provides a distributed data frame implementation that supports operations like selection, filtering, aggregation etc. SparkR also supports distributed machine learning using MLlib.

### Create a SparkR dataframe from a local R data.frame

The simplest way to create a DataFrame is to convert a local R data.frame into a SparkDataFrame. In this example, use `as.DataFrame` and pass in the local R dataframe to create the SparkDataFrame.

```r
df <- as.DataFrame(faithful)

# Displays the first part of the SparkDataFrame
head(df)
##  eruptions waiting
##1     3.600      79
##2     1.800      54
```

### Create a SparkR dataframe using the Spark data source API

SparkR supports operating on various data sources through the SparkDataFrame interface. The general method for creating a DataFrame from a data source is `read.df`. This method takes the path for the file to load and the type of data source. SparkR supports reading CSV, JSON, text, and Parquet files natively.

```r
df <- read.df('Files/<file name>.csv', 'csv', header="true")
head(df)
```

### Create a SparkR dataframe using Spark SQL

You can also create SparkR DataFrames using Spark SQL queries.

```r
# Register this SparkDataFrame as a temporary view.
createOrReplaceTempView(df, "eruptions")

# SQL statements can be run by using the sql method
sql_df <- sql("SELECT * FROM eruptions")
head(sql_df)
```

### Machine learning

SparkR exposes most of MLLib algorithms. Under the hood, SparkR uses MLlib to train the model. To learn more about which machine learning algorithms are supported, visit the [documentation for SparkR and MLlib](https://spark.apache.org/docs/latest/sparkr.html).

```r
# Create the DataFrame
cars <- cbind(model = rownames(mtcars), mtcars)
carsDF <- createDataFrame(cars)

# Fit a linear model over the dataset.
model <- spark.glm(carsDF, mpg ~ wt + cyl)

# Model coefficients are returned in a similar format to R's native glm().
summary(model)
```

## Use SparklyR

[SparklyR](https://spark.rstudio.com/) is an R interface to Apache Spark. It provides a mechanism to interact with Spark using familiar R interfaces.

To establish a `sparklyr` connection, use the following connection method in `spark_connect()`.

```r
conf <- spark_config()
hConf = SparkR:::sparkR.callJMethod(sc, "hadoopConfiguration")
conf$'trident.lakehouse.name' <- SparkR:::sparkR.callJMethod(hConf, "get", "trident.lakehouse.name")
conf$'trident.workspace.id' <- SparkR:::sparkR.callJMethod(hConf, "get", "trident.worksace.id")
conf$'trident.lakehouse.id' <- SparkR:::sparkR.callJMethod(hConf, "get", "trident.lakehouse.id")
conf$'spark.cluster.type' <- SparkR:::sparkR.conf("spark.cluster.type")[[1]]
conf$'spark.synapse.clusteridentifier' <- SparkR:::sparkR.conf("spark.synapse.clusteridentifier")[[1]]
spark_version <- "3.2"
sc <- spark_connect(master = "yarn",
            spark_home = "/opt/spark",
            version = spark_version,
            config = conf)
```

## Next steps

- [Create R Visualizations](/azure/synapse-analytics/spark/apache-spark-data-visualization)
