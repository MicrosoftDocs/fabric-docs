---
title: Apache Spark job definition
description: An Apache Spark job definition is a Fabric code item that allows you to submit batch or streaming jobs to a Spark cluster.
ms.reviewer: snehagunda
ms.author: qixwang
author: qixwang
ms.topic: overview
ms.custom:
  - build-2023
  - build-2023-dataai
  - build-2023-fabric
  - ignite-2023
ms.date: 10/20/2023
ms.search.form: spark_job_definition
---

# What is an Apache Spark job definition?

An Apache Spark job definition is a Microsoft Fabric code item that allows you to submit batch/streaming jobs to Spark clusters. By uploading the binary files from the compilation output of different languages (for example, .jar from Java), you can apply different transformation logic to the data hosted on a lakehouse. Besides the binary file, you can further customize the behavior of the job by uploading more libraries and command line arguments.

To run a Spark job definition, you must have at least one lakehouse associated with it. This default lakehouse context serves as the default file system for Spark runtime. For any Spark code using a relative path to read/write data, the data is served from the default lakehouse.

> [!TIP]
> To run a Spark job definition item, you must have a main definition file and default lakehouse context. If you don't have a lakehouse, create one by following the steps in [Create a lakehouse](../data-engineering/create-lakehouse.md).

## Related content

- [How to create an Apache Spark job definition in Fabric](create-spark-job-definition.md)
