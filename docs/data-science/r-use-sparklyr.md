---
title: Use sparklyr
description: How to use sparklyr, an R interface to Apache Spark.
ms.reviewer: None
ms.author: scottpolly
author: s-polly
ms.topic: how-to
ms.custom:
ms.date: 04/16/2025
ms.search.form: R Language
---

# Use sparklyr

The R language [sparklyr](https://spark.rstudio.com/) resource serves as an interface to Apache Spark. The sparklr resource provides a mechanism to interact with Spark with familiar R interfaces. Use sparklyr through Spark batch job definitions or with interactive [!INCLUDE [product-name](../includes/product-name.md)] notebooks.

`sparklyr` is used with other [tidyverse](https://www.tidyverse.org/) packages - for example, [dplyr](https://cran.rstudio.com/web/packages/dplyr/vignettes/dplyr.html). [!INCLUDE [product-name](../includes/product-name.md)] distributes the latest stable version of both sparklyr and tidyverse with every runtime release. You can import these resources and start using the API.

## Prerequisites

[!INCLUDE [prerequisites](./includes/prerequisites.md)]
[!INCLUDE [r-prerequisites](./includes/r-notebook-prerequisites.md)]

## Connect sparklyr to Synapse Spark cluster

The `spark_connect()` function connection method establishes a `sparklyr` connection. The function builds a new connection method named `synapse`, which connects to an existing Spark session. It dramatically reduces the `sparklyr` session start time. This connection method is available in the [open sourced sparklyr project](https://github.com/sparklyr/sparklyr/pull/3336). With `method = "synapse"`, you can use both `sparklyr` and `SparkR` in the same session, and easily [share data between them](#share-data-between-sparklyr-and-sparkr). The following notebook cell code sample uses the `spark_connect()` function:

```r
# connect sparklyr to your spark cluster
spark_version <- sparkR.version()
config <- spark_config()
sc <- spark_connect(master = "yarn", version = spark_version, spark_home = "/opt/spark", method = "synapse", config = config)
```

## Use sparklyr to read data

A new Spark session contains no data. You must then either load data into your Spark session's memory, or point Spark to the location of the data so that the session can access the data on-demand:

```r
# load the sparklyr package
library(sparklyr)

# copy data from R environment to the Spark session's memory
mtcars_tbl <- copy_to(sc, mtcars, "spark_mtcars", overwrite = TRUE)

head(mtcars_tbl)
```

With `sparklyr`, you can also `write` and `read` data from a Lakehouse file using an ABFS path value. To read and write to a Lakehouse, first add the Lakehouse to your session. On the left side of the notebook, select **Add** to add an existing Lakehouse. Additionally, you can create a Lakehouse.

To find your ABFS path, right-select the **Files** folder in your Lakehouse, and select **Copy ABFS path**. Paste your path to replace `abfss://xxxx@onelake.dfs.fabric.microsoft.com/xxxx/Files` in the following code sample:

```r
temp_csv = "abfss://xxxx@onelake.dfs.fabric.microsoft.com/xxxx/Files/data/mtcars.csv"

# write the table to your lakehouse using the ABFS path
spark_write_csv(mtcars_tbl, temp_csv, header = TRUE, mode = 'overwrite')

# read the data as CSV from lakehouse using the ABFS path
mtcarsDF <- spark_read_csv(sc, temp_csv) 
head(mtcarsDF)
```

## Use sparklyr to manipulate data

`sparklyr` provides different ways to process data inside Spark, with:

- `dplyr` commands
- SparkSQL
- Spark's feature transformers

### Use `dplyr`

You can use familiar `dplyr` commands to prepare data inside Spark. The commands run inside Spark, preventing unnecessary data transfers between R and Spark.

```r
# count cars by the number of cylinders the engine contains (cyl), order the results descendingly
library(dplyr)

cargroup <- group_by(mtcars_tbl, cyl) %>%
  count() %>%
  arrange(desc(n))

cargroup
```

The [Manipulating Data with `dplyr`](https://spark.rstudio.com/guides/dplyr.html) resource offers more information about use of dplyr with Spark. `sparklyr` and `dplyr` translate the R commands into Spark SQL. Use `show_query()` to show the resulting query:

```r
# show the dplyr commands that are to run against the Spark connection
dplyr::show_query(cargroup)
```

### Use SQL

You can also execute SQL queries directly against tables within a Spark cluster. The `spark_connection() `object implements a [DBI](https://dbi.r-dbi.org/) interface for Spark, so you can use `dbGetQuery()` to execute SQL and return the result as an R data frame:

```r
library(DBI)
dbGetQuery(sc, "select cyl, count(*) as n from spark_mtcars
GROUP BY cyl
ORDER BY n DESC")
```

### Use Feature Transformers

Both of the previous methods rely on SQL statements. Spark provides commands that make some data transformations more convenient, without the use of SQL. For example, the `ft_binarizer()` command simplifies the creation of a new column that indicates whether or not a value in another column exceeds a certain threshold:

```r
mtcars_tbl %>% 
  ft_binarizer("mpg", "over_20", threshold = 20) %>% 
  select(mpg, over_20) %>% 
  head(5)
```

The [Reference -FT](https://spark.rstudio.com/packages/sparklyr/latest/reference/#spark-feature-transformers) resource offers a full list of the Spark Feature Transformers available through `sparklyr`.

## Share data between `sparklyr` and `SparkR`

When you [connect `sparklyr` to synapse spark cluster with `method = "synapse"`](#connect-sparklyr-to-synapse-spark-cluster), both `sparklyr` and `SparkR` become available in the same session and can easily share data between themselves. You can create a spark table in `sparklyr`, and read it from `SparkR`:

```r
# load the sparklyr package
library(sparklyr)

# Create table in `sparklyr`
mtcars_sparklyr <- copy_to(sc, df = mtcars, name = "mtcars_tbl", overwrite = TRUE, repartition = 3L)

# Read table from `SparkR`
mtcars_sparklr <- SparkR::sql("select cyl, count(*) as n
from mtcars_tbl
GROUP BY cyl
ORDER BY n DESC")

head(mtcars_sparklr)
```

## Machine learning

The following example uses `ml_linear_regression()` to fit a linear regression model. The model uses the built-in `mtcars` dataset to try to predict the fuel consumption (`mpg`) of a car based on the weight (`wt`) of the car and the number of cylinders (`cyl`) of the car engine. All cases here assume a linear relationship between `mpg` and each of our features.

### Generate testing and training data sets

Use a split - 70% for training and 30% - to test the model. Changes to this ratio lead to different models:

```r
# split the dataframe into test and training dataframes

partitions <- mtcars_tbl %>%
  select(mpg, wt, cyl) %>% 
  sdf_random_split(training = 0.7, test = 0.3, seed = 2023)
```

### Train the model

Train the Logistic Regression model.

```r
fit <- partitions$training %>%
  ml_linear_regression(mpg ~ .)

fit
```

Use `summary() ` to learn more about the quality of our model, and the statistical significance of each of our predictors:

```r
summary(fit)
```

### Use the model

Call `ml_predict()` to apply the model to the test dataset:

```r
pred <- ml_predict(fit, partitions$test)

head(pred)
```

Visit [Reference - ML](https://spark.rstudio.com/packages/sparklyr/latest/reference/#spark-machine-learning) for a list of Spark ML models available through sparklyr.

## Disconnect from Spark cluster

Call `spark_disconnect()`, or select the **Stop session** button on top of the notebook ribbon, to end your Spark session:

```r
spark_disconnect(sc)
```

## Related content

Learn more about the R functionalities:

- [How to use SparkR](./r-use-sparkr.md)
- [How to use Tidyverse](./r-use-tidyverse.md)
- [R library management](./r-library-management.md)
- [Create R visualization](./r-visualization.md)
- [Tutorial: avocado price prediction](./r-avocado.md)
- [Tutorial: flight delay prediction](./r-flight-delay.md)
