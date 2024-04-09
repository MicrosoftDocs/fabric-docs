---
title: Use Python for Apache Spark
description: Learn about developing Spark applications in Synapse using Python to analyze data through Spark batch job definitions or with interactive Fabric notebooks.
ms.reviewer: mopeakande
author: midesa
ms.author: midesa
ms.topic: overview
ms.custom:
  - build-2023
  - ignite-2023
ms.date: 04/09/2024
ms.search.form: Python Language
#customer intent: As a data analyst, I want to understand how Spark applications in Synapse can analyze data.
---

# Use Python for Apache Spark

Microsoft Fabric provides built-in Python support for Apache Spark. Support includes [PySpark](https://spark.apache.org/docs/latest/api/python/index.html), which allows users to interact with Spark using familiar Spark or Python interfaces.

You can analyze data using Python through Spark batch job definitions or with interactive Fabric notebooks. This article provides an overview of developing Spark applications in Synapse using the Python language.

## Create and run notebook sessions

[!INCLUDE [product-name](../../includes/product-name.md)] notebook is a web interface for you to create files that contain live code, visualizations, and narrative text. Notebooks are a good place to validate ideas and use quick experiments to get insights from your data. Notebooks are also widely used in data preparation, data visualization, machine learning, and other big data scenarios.

To get started with Python in [!INCLUDE [product-name](../../includes/product-name.md)] notebooks, change the primary **Language** at the top of your notebook by setting the language option to _PySpark (Python)_.

```Python
%%pyspark
# Enter your Python code here
```

You can use multiple languages in one notebook by specifying the language magic command at the beginning of a cell.

To learn more about notebooks in [!INCLUDE [product-name](../../includes/product-name.md)] Analytics, see [How to use notebooks](../../data-engineering/how-to-use-notebook.md).

## Install packages

Libraries provide reusable code that you can include in your programs or projects. To make partner code or locally built code available to your applications, install a library in-line into your notebook session. Alternatively, your workspace administrator can create an environment, install the library in it, and attach the environment as the workspace default in the workspace setting.

To learn more about library management in Microsoft Fabric, see [Manage Apache Spark libraries](../../data-engineering/library-management.md).

## Notebook utilities

Microsoft Spark Utilities (MSSparkUtils) is a built-in package to help you easily perform common tasks. You can use MSSparkUtils to work with file systems, to get environment variables, to chain notebooks together, and to work with secrets. MSSparkUtils is supported for PySpark notebooks.

To get started, run the following commands:

```python
from notebookutils import mssparkutils
mssparkutils.notebook.help()

```

For more information about the supported MSSparkUtils commands, see [Use Microsoft Spark Utilities](../../data-engineering/microsoft-spark-utilities.md).

## Use Pandas on Spark

The [Pandas API on Spark](https://spark.apache.org/docs/3.3.0/api/python/getting_started/quickstart_ps.html) allows you to scale your Pandas workload to any size by running it distributed across multiple nodes. If you're already familiar with pandas and want to use Spark for big data, pandas API on Spark makes you immediately productive.

You can migrate your applications without modifying the code. You can have a single codebase that works both with pandas, for tests and smaller datasets, and with Spark, for production and distributed datasets. You can switch between the pandas API and the Pandas API on Spark easily and without overhead.

## Python runtime

The [!INCLUDE [product-name](../../includes/product-name.md)] [Runtime](../../data-engineering/runtime.md) is a curated environment optimized for data science and machine learning. The [!INCLUDE [product-name](../../includes/product-name.md)] runtime offers a range of popular, Python open-source libraries, including libraries like Pandas, PyTorch, Scikit-Learn, and XGBoost.

## Python visualization

The Python ecosystem offers multiple graphing libraries that come with many different features. By default, every Spark instance in [!INCLUDE [product-name](../../includes/product-name.md)] contains a set of curated and popular open-source libraries. You can also add or manage other libraries or versions. For more information on library management, see [Summary of library management best practices](../../data-engineering/library-management.md#summary-of-library-management-best-practices).

To learn more about how to create Python visualizations, see [Python visualization](../python-guide/python-visualizations.md).

## Related content

- Learn how to use the Pandas API on Apache Spark: [Pandas API on Apache Spark](https://spark.apache.org/docs/3.3.0/api/python/getting_started/quickstart_ps.html)
- [Manage Apache Spark libraries in Microsoft Fabric](../../data-engineering/library-management.md)
- Visualize data in Python: [Visualize data in Python](./python-visualizations.md)
