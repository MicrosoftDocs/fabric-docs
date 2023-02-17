---
title: What is a Spark job definition
description: Learn about Spark job definitions.
ms.reviewer: snehagunda
ms.author: qixwang
author: qixwang
ms.topic: overview
ms.date: 02/24/2023
---

# What is a Spark job definition?

> [!IMPORTANT]
> [!INCLUDE [product-name](../includes/product-name.md)] is currently in PREVIEW. This information relates to a prerelease product that may be substantially modified before it's released. Microsoft makes no warranties, expressed or implied, with respect to the information provided here.

Spark Job Definition is a Trident code artifact that allows a user to submit batch/streaming job to spark cluster. By uploading the binary files from compilation output of different languages, .jar from Java for example, a user could apply different transformation logic to the data hosted on Lakehouse. Besides the binary file, users could further customize the behavior of the job by uploading additional libraries and command line arguments.

To run a spark job definition, there must be at least one Lakehouse associated with it. This default Lakehouse context serves as the default file system for spark runtime. For any spark code using relative path to read/write data, the data would be served from the default Lakehouse

> [!TIP]
> For the following scenarios, main definition file and default Lakehouse context are required:
>
> 1. Save the spark job definition artifact.
> 1. Run the spark job definition artifact.
> 1. Clone the spark job definition artifact.
> 1. Edit settings of the spark job definition artifact.

> [!IMPORTANT]
> The spark job definition artifact is currently in PREVIEW.

## Next steps

In this overview, you get a basic understanding of a spark job definition. Advance to the next article to learn how to create and get started with your own spark job definition:

- To get started with [!INCLUDE [product-name](../includes/product-name.md)], see How to: Create a spark job definition
