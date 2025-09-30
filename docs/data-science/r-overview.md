---
title: Use R for Apache Spark
description: Overview of developing Spark applications using the R language.
ms.reviewer: None
author: lgayhardt
ms.author: lagayhar
ms.topic: overview
ms.custom: 
ms.date: 08/26/2025
ms.search.form: R Language
reviewer: sdgilley
ai.usage: ai-assisted
---

# Use R for Apache Spark

[!INCLUDE [product-name](../includes/product-name.md)] provides built-in R support for Apache Spark. It supports [SparkR](https://spark.apache.org/docs/latest/sparkr.html) and [sparklyr](https://spark.rstudio.com/), which let you use familiar Spark or R interfaces to work with Spark. Analyze data using R through Spark batch job definitions or with interactive [!INCLUDE [product-name](../includes/product-name.md)] notebooks. 



This document gives an overview of developing Spark applications in [!INCLUDE [product-name](../includes/product-name.md)] by using R. 

## Prerequisites

[!INCLUDE [prerequisites](./includes/prerequisites.md)]


## Create and run notebook sessions

[!INCLUDE [product-name](../includes/product-name.md)] notebook is a web interface to create files with live code, visualizations, and narrative text. Use notebooks to validate ideas, run quick experiments, and get insights from your data. Use notebooks for data preparation, data visualization, machine learning, and other big data scenarios.

To get started with R in [!INCLUDE [product-name](../includes/product-name.md)] notebooks, change the primary **language** at the top of your notebook to _SparkR (R)_.

Also, use multiple languages in one notebook by adding a language magic command at the start of a cell.

```R
%%sparkr
# Enter your R code here
```

To learn more about notebooks in [!INCLUDE [product-name](../includes/product-name.md)] Analytics, see [How to use notebooks](../data-engineering/how-to-use-notebook.md).

## Install packages

Packages provide reusable code that you add to your projects. To use third-party or local packages in your projects, install them in a workspace or a notebook session.

Learn more in [R library management](./r-library-management.md).

## Notebook utilities

Microsoft Spark Utilities (MSSparkUtils) is a built-in package that helps you perform common tasks. Use MSSparkUtils to work with file systems, get environment variables, chain notebooks together, and work with secrets. MSSparkUtils supports R notebooks.

To get started, run the following commands:

```r
library(notebookutils)
mssparkutils.fs.help()
```

Learn more in [Use Microsoft Spark Utilities](../data-engineering/microsoft-spark-utilities.md).

## Use SparkR

[SparkR](https://spark.apache.org/docs/latest/sparkr.html) is an R package that provides a lightweight front end for using Apache Spark from R. SparkR provides a distributed DataFrame implementation that supports operations such as selection, filtering, and aggregation. SparkR also supports distributed machine learning with MLlib.

Learn more in [How to use SparkR](./r-use-sparkr.md).

## Use sparklyr

[sparklyr](https://spark.rstudio.com/) is an R interface to Apache Spark. Use familiar R interfaces to interact with Spark. Use sparklyr in Spark batch job definitions or interactive [!INCLUDE [product-name](../includes/product-name.md)] notebooks.

Learn more in [How to use sparklyr](./r-use-sparklyr.md).


## Use Tidyverse

[Tidyverse](https://www.tidyverse.org/packages/) is a collection of R packages that data scientists use for everyday data analysis. It includes packages for data import (`readr`), data visualization (`ggplot2`), data manipulation (`dplyr`, `tidyr`), and functional programming (`purrr`). Tidyverse packages work together and follow consistent design principles. [!INCLUDE [product-name](../includes/product-name.md)] distributes the latest stable version of `tidyverse` with every runtime release. 

Learn more in [How to use Tidyverse](./r-use-tidyverse.md).

## R visualization

The R ecosystem includes many graphing libraries. By default, each Spark instance in [!INCLUDE [product-name](../includes/product-name.md)] includes curated open source libraries. Use the [!INCLUDE [product-name](../includes/product-name.md)] [library management capabilities](./r-library-management.md) to add or manage libraries and versions.

Learn how to create R visualizations in [R visualization](./r-visualization.md).

## Related content

- [How to use SparkR](./r-use-sparkr.md)
- [How to use sparklyr](./r-use-sparklyr.md)
- [How to use tidyverse](./r-use-tidyverse.md)
- [R library management](./r-library-management.md)
- [Visualize data in R](./r-visualization.md)
- [Tutorial: avocado price prediction](./r-avocado.md)
- [Tutorial: flight delay prediction](./r-flight-delay.md)
