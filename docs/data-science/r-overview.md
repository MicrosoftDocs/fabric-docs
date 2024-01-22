---
title: Use R for Apache Spark
description: Overview of developing Spark applications using the R language.
ms.reviewer: sgilley
author: ruixinxu
ms.author: ruxu
ms.topic: overview
ms.custom:
  - build-2023
  - ignite-2023
ms.date: 11/15/2023
ms.search.form: R Language
---

# Use R for Apache Spark

[!INCLUDE [product-name](../includes/product-name.md)] provides built-in R support for Apache Spark. This includes support for [SparkR](https://spark.apache.org/docs/latest/sparkr.html) and [sparklyr](https://spark.rstudio.com/), which allows users to interact with Spark using familiar Spark or R interfaces. You can analyze data using R through Spark batch job definitions or with interactive [!INCLUDE [product-name](../includes/product-name.md)] notebooks. 



This document provides an overview of developing Spark applications in Synapse using the R language. 

## Prerequisites

[!INCLUDE [prerequisites](./includes/prerequisites.md)]


## Create and run notebook sessions

[!INCLUDE [product-name](../includes/product-name.md)] notebook is a web interface for you to create files that contain live code, visualizations, and narrative text. Notebooks are a good place to validate ideas and use quick experiments to get insights from your data. Notebooks are also widely used in data preparation, data visualization, machine learning, and other big data scenarios.

To get started with R in [!INCLUDE [product-name](../includes/product-name.md)] notebooks, change the primary **language** at the top of your notebook by setting the language option to _SparkR (R)_.

In addition, you can use multiple languages in one notebook by specifying the language magic command at the beginning of a cell.

```R
%%sparkr
# Enter your R code here
```

To learn more about notebooks within [!INCLUDE [product-name](../includes/product-name.md)] Analytics, see [How to use notebooks](../data-engineering/how-to-use-notebook.md).

## Install packages

Libraries provide reusable code that you might want to include in your programs or projects. To make third party or locally built code available to your applications, you can install a library onto one of your workspace or notebook session.

To learn more about how to manage R libraries, see [R library management](./r-library-management.md).

## Notebook utilities

Microsoft Spark Utilities (MSSparkUtils) is a built-in package to help you easily perform common tasks. You can use MSSparkUtils to work with file systems, to get environment variables, to chain notebooks together, and to work with secrets. MSSparkUtils is supported for R notebooks.

To get started, you can run the following commands:

```SparkR
library(notebookutils)
mssparkutils.fs.help()
```

Learn more about the supported MSSparkUtils commands at [Use Microsoft Spark Utilities](../data-engineering/microsoft-spark-utilities.md).

## Use SparkR

[SparkR](https://spark.apache.org/docs/latest/sparkr.html) is an R package that provides a light-weight frontend to use Apache Spark from R. SparkR provides a distributed data frame implementation that supports operations like selection, filtering, aggregation etc. SparkR also supports distributed machine learning using MLlib.

You can learn more about how to use SparkR by visiting [How to use SparkR](./r-use-sparkr.md).

## Use sparklyr

[sparklyr](https://spark.rstudio.com/) is an R interface to Apache Spark. It provides a mechanism to interact with Spark using familiar R interfaces. You can use sparklyr through Spark batch job definitions or with interactive [!INCLUDE [product-name](../includes/product-name.md)] notebooks.

To learn more about how to use sparklyr, visit [How to use sparklyr](./r-use-sparklyr.md).


## Use Tidyverse

[Tidyverse](https://www.tidyverse.org/packages/) is a collection of R packages that data scientists commonly use in everyday data analyses. It includes packages for data import (`readr`), data visualization (`ggplot2`), data manipulation (`dplyr`, `tidyr`), functional programming (`purrr`), and model building (`tidymodels`) etc. The packages in `tidyverse` are designed to work together seamlessly and follow a consistent set of design principles. [!INCLUDE [product-name](../includes/product-name.md)] distributes the latest stable version of `tidyverse` with every runtime release. 

To learn more about how to use Tidyverse, visit [How to use Tidyverse](./r-use-tidyverse.md).

## R visualization

The R ecosystem offers multiple graphing libraries that come packed with many different features. By default, every Spark instance in [!INCLUDE [product-name](../includes/product-name.md)] contains a set of curated and popular open-source libraries. You can also add or manage extra libraries or versions by using the [!INCLUDE [product-name](../includes/product-name.md)] [library management capabilities](./r-library-management.md).

Learn more about how to create R visualizations by visiting [R visualization](./r-visualization.md).

## Related content

- [How to use SparkR](./r-use-sparkr.md)
- [How to use sparklyr](./r-use-sparklyr.md)
- [How to use Tidyverse](./r-use-tidyverse.md)
- [R library management](./r-library-management.md)
- [Visualize data in R](./r-visualization.md)
- [Tutorial: avocado price prediction](./r-avocado.md)
- [Tutorial: flight delay prediction](./r-flight-delay.md)
