---
title: What is an Apache Spark job definition
description: Learn about Apache Spark job definitions.
ms.reviewer: snehagunda
ms.author: qixwang
author: qixwang
ms.subservice: data-engineering
ms.topic: overview
ms.date: 02/24/2023
---

# What is an Apache Spark job definition?

> [!IMPORTANT]
> [!INCLUDE [product-name](../includes/product-name.md)] is currently in PREVIEW. This information relates to a prerelease product that may be substantially modified before it's released. Microsoft makes no warranties, expressed or implied, with respect to the information provided here.

An Apache Spark job definition is a Trident code artifact that allows you to submit batch/streaming job to Spark cluster. By uploading the binary files from compilation output of different languages, .jar from Java for example, you can apply different transformation logic to the data hosted on Lakehouse. Besides the binary file, you can further customize the behavior of the job by uploading additional libraries and command line arguments.

To run a Spark job definition, you must have at least one Lakehouse associated with it. This default Lakehouse context serves as the default file system for Spark runtime. For any Spark code using relative path to read/write data, the data is served from the default Lakehouse.

> [!TIP]
> For the following scenarios, main definition file and default Lakehouse context are required:
>
> 1. Save the Spark job definition artifact.
> 1. Run the Spark job definition artifact.
> 1. Clone the Spark job definition artifact.
> 1. Edit settings of the Spark job definition artifact.

> [!IMPORTANT]
> The Spark job definition artifact is currently in PREVIEW.

## Next steps

In this overview, you get a basic understanding of a Spark job definition. Advance to the next article to learn how to create and get started with your own Spark job definition:

- To get started with [!INCLUDE [product-name](../includes/product-name.md)], see [Creating an Apache Spark job definition](create-spark-job-definition.md).
