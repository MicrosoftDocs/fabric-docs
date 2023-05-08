---
title: author notebook in VS Code
description: VS Code extesion for Synapse supports pro-dev authoring experience of Notebook, inlcuding run and debug notebook
ms.reviewer: snehagunda
ms.author: qixwang
author: qixwang
ms.topic: overview
ms.date: 05/08/2023
ms.search.form: VSCodeExtension
---

# What is an Apache Spark job definition?

An Apache Spark Job Definition is a Microsoft Fabric code item that allows you to submit batch/streaming job to Spark cluster. By uploading the binary files from compilation output of different languages, .jar from Java for example, you can apply different transformation logic to the data hosted on lakehouse. Besides the binary file, you can further customize the behavior of the job by uploading additional libraries and command line arguments.

[!INCLUDE [preview-note](../includes/preview-note.md)]

To run a Spark job definition, you must have at least one lakehouse associated with it. This default lakehouse context serves as the default file system for Spark runtime. For any Spark code using relative path to read/write data, the data is served from the default lakehouse.

> [!TIP]
> To run the Spark job definition item, main definition file and default lakehouse context are required. If you don't have a lakehouse, you can create one by following the steps in [Create a lakehouse](../data-engineering/create-lakehouse.md).

> [!IMPORTANT]
> The Spark job definition item is currently in PREVIEW.

## Next steps

In this overview, you get a basic understanding of a Spark job definition. Advance to the next article to learn how to create and get started with your own Spark job definition:

- To get started with [!INCLUDE [product-name](../includes/product-name.md)], see [Creating an Apache Spark job definition](create-spark-job-definition.md).
