---
title: Use sparklyr
description: How to use sparklyr, an R interface to Apache Spark.
ms.reviewer: sgilley
ms.author: ruxu
author: ruixinxu
ms.topic: how-to
ms.custom:
  - build-2023
  - ignite-2023
ms.date: 11/15/2023
ms.search.form: R Language
---

# Use sparklyr

[sparklyr](https://spark.rstudio.com/) is an R interface to Apache Spark. It provides a mechanism to interact with Spark using familiar R interfaces. You can use sparklyr through Spark batch job definitions or with interactive [!INCLUDE [product-name](../includes/product-name.md)]  notebooks.



`sparklyr` is used along with other [tidyverse](https://www.tidyverse.org/) packages such as [dplyr](https://cran.rstudio.com/web/packages/dplyr/vignettes/dplyr.html). [!INCLUDE [product-name](../includes/product-name.md)] distributes the latest stable version of sparklyr and tidyverse with every runtime release. You can import them and start using the API.

## Prerequisites

[!INCLUDE [prerequisites](./includes/prerequisites.md)]

[!INCLUDE [r-prerequisites](./includes/r-notebook-prerequisites.md)]



## Connect sparklyr to Synapse Spark cluster

Use the following connection method in `spark_connect()` to establish a `sparklyr` connection. We support a new connection method called `synapse`, which allows you to connect to an existing Spark session. It dramatically reduces the `sparklyr` session start time. Additionally, we contributed this connection method to the [open sourced sparklyr project](https://github.com/sparklyr/sparklyr/pull/3336). With `method = "synapse"`, you can use both `sparklyr` and `SparkR` in the same session and easily [share data between them](#share-data-between-sparklyr-and-sparkr). 

```R
# connect sparklyr to your spark cluster
spark_version <- sparkR.version()
config <- spark_config()
sc <- spark_connect(master = "yarn", version = spark_version, spark_home = "/opt/spark", method = "synapse", config = config)
```

## Use sparklyr to read data

A new Spark session contains no data. The first step is to either load data into your Spark session's memory, or point Spark to the location of the data so it can access the data on-demand.

```R
# load the sparklyr package
library(sparklyr)

# copy data from R environment to the Spark session's memory
mtcars_tbl <- copy_to(sc, mtcars, "spark_mtcars", overwrite = TRUE)

head(mtcars_tbl)
```

Using `sparklyr`, you can also `write` and `read` data from a Lakehouse file using ABFS path. To read and write to a Lakehouse, first add it to your session. On the left side of the notebook, select **Add** to add an existing Lakehouse or create a Lakehouse.

To find your ABFS path, right click on the **Files** folder in your Lakehouse, then select **Copy ABFS path**.  Paste your path to replace `abfss://xxxx@onelake.dfs.fabric.microsoft.com/xxxx/Files` in this code:

```R
temp_csv = "abfss://xxxx@onelake.dfs.fabric.microsoft.com/xxxx/Files/data/mtcars.csv"

# write the table to your lakehouse using the ABFS path
spark_write_csv(mtcars_tbl, temp_csv, header = TRUE, mode = 'overwrite')

# read the data as CSV from lakehouse using the ABFS path
mtcarsDF <- spark_read_csv(sc, temp_csv) 
head(mtcarsDF)
```

## Use sparklyr to manipulate data

`sparklyr` provides multiple methods to process data inside Spark using:

- `dplyr` commands
- SparkSQL
- Spark's feature transformers

### Use `dplyr`

You can use familiar `dplyr` commands to prepare data inside Spark. The commands run inside Spark, so there are no unnecessary data transfers between R and Spark. 

Click the [Manipulating Data with `dplyr`](https://spark.rstudio.com/guides/dplyr.html) to see extra documentation on using dplyr with Spark. 

```R
# count cars by the number of cylinders the engine contains (cyl), order the results descendingly
library(dplyr)

cargroup <- group_by(mtcars_tbl, cyl) %>%
  count() %>%
  arrange(desc(n))

cargroup
```

`sparklyr` and `dplyr` translate the R commands into Spark SQL for us. To see the resulting query use `show_query()`:

```R
# show the dplyr commands that are to run against the Spark connection
dplyr::show_query(cargroup)
```

### Use SQL

It's also possible to execute SQL queries directly against tables within a Spark cluster. The `spark_connection() `object implements a [DBI](https://dbi.r-dbi.org/) interface for Spark, so you can use `dbGetQuery()` to execute SQL and return the result as an R data frame:

```R
library(DBI)
dbGetQuery(sc, "select cyl, count(*) as n from spark_mtcars
GROUP BY cyl
ORDER BY n DESC")
```

### Use Feature Transformers

Both of the previous methods rely on SQL statements. Spark provides commands that make some data transformation more convenient, and without the use of SQL.

For example, the `ft_binarizer()` command simplifies the creation of a new column that indicates if the value of another column is above a certain threshold.

You can find the full list of the Spark Feature Transformers available through `sparklyr` from [Reference -FT](https://spark.rstudio.com/packages/sparklyr/latest/reference/#spark-feature-transformers).

```R
mtcars_tbl %>% 
  ft_binarizer("mpg", "over_20", threshold = 20) %>% 
  select(mpg, over_20) %>% 
  head(5)
```

## Share data between `sparklyr` and `SparkR`

When you [connect `sparklyr` to synapse spark cluster with `method = "synapse"`](#connect-sparklyr-to-synapse-spark-cluster), you can use both `sparklyr` and `SparkR` in the same session and easily share data between them. You can create a spark table in `sparklyr` and read it from `SparkR`.

```R
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

Here's an example where we use `ml_linear_regression()` to fit a linear regression model. We use the built-in `mtcars` dataset, and see if we can predict a car's fuel consumption (`mpg`) based on its weight (`wt`), and the number of cylinders the engine contains (`cyl`). We assume in each case that the relationship between `mpg` and each of our features is linear.

### Generate testing and training data sets

Use a split, 70% for training and 30% for testing the model. Playing with this ratio results in different models.

```R
# split the dataframe into test and training dataframes

partitions <- mtcars_tbl %>%
  select(mpg, wt, cyl) %>% 
  sdf_random_split(training = 0.7, test = 0.3, seed = 2023)
```

### Train the model

Train the Logistic Regression model.

```R
fit <- partitions$training %>%
  ml_linear_regression(mpg ~ .)

fit
```

Now use `summary() `to learn a bit more about the quality of our model, and the statistical significance of each of our predictors.

```R
summary(fit)
```

### Use the model

You can apply the model on the testing dataset by calling `ml_predict()`.

```R
pred <- ml_predict(fit, partitions$test)

head(pred)
```

For a list of Spark ML models available through sparklyr visit [Reference - ML](https://spark.rstudio.com/packages/sparklyr/latest/reference/#spark-machine-learning)

## Disconnect from Spark cluster

You can call `spark_disconnect()` to or select the **Stop session** button on top of the notebook ribbon end your Spark session.

```R
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
