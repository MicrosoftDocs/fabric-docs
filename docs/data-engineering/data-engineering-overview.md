---
title: What is Data engineering in Microsoft Fabric?
description: Learn about Data engineering core concepts in Microsoft Fabric and the analytics functionality it offers.
ms.reviewer: snehagunda
ms.author: avinandac
author: avinandaMS
ms.topic: overview
ms.custom:
  - build-2023
  - build-2023-dataai
  - build-2023-fabric
  - ignite-2023
  - ignite-2023-fabric
ms.date: 04/25/2024
---

# What is Data engineering in Microsoft Fabric?

Data engineering in Microsoft Fabric enables users to design, build, and maintain infrastructures and systems that enable their organizations to collect, store, process, and analyze large volumes of data.

Microsoft Fabric provides various data engineering capabilities to ensure that your data is easily accessible, well-organized, and of high-quality. From the data engineering homepage, you can:

- Create and manage your data using a lakehouse

- Design pipelines to copy data into your lakehouse

- Use Spark job definitions to submit batch/streaming job to Spark cluster

- Use notebooks to write code for data ingestion, preparation, and transformation

  :::image type="content" source="media\data-engineering-overview\data-engineering-artifacts.png" alt-text="Screenshot showing Data Engineering objects.":::

## Lakehouse

Lakehouses are data architectures that allow organizations to store and manage structured and unstructured data in a single location, using various tools and frameworks to process and analyze that data. These tools and frameworks can include SQL-based queries and analytics, as well as machine learning and other advanced analytics techniques.

## Apache Spark job definition

Spark job definitions are set of instructions that define how to execute a job on a Spark cluster. It includes information such as the input and output data sources, the transformations, and the configuration settings for the Spark application. Spark job definition allows you to submit batch/streaming job to Spark cluster, apply different transformation logic to the data hosted on your lakehouse along with many other things.

## Notebook

Notebooks are an interactive computing environment that allows users to create and share documents that contain live code, equations, visualizations, and narrative text. They allow users to write and execute code in various programming languages, including Python, R, and Scala. You can use notebooks for data ingestion, preparation, analysis, and other data-related tasks.

## Data pipeline

Data pipelines are a series of steps that can collect, process, and transform data from its raw form to a format that you can use for analysis and decision-making. They're a critical component of data engineering, as they provide a way to move data from its source to its destination in a reliable, scalable, and efficient way.

You can use Data Engineering in Microsoft Fabric free of charge when you sign up for the [Fabric trial](../get-started/fabric-trial.md). You can also buy a [Microsoft Fabric capacity](../enterprise/buy-subscription.md) or a [Fabric capacity reservation](/azure/cost-management-billing/reservations/fabric-capacity)

## Related content

Get started with the Data Engineering experience:

- To learn more about lakehouses, see [What is a lakehouse in Microsoft Fabric?](lakehouse-overview.md)
- To get started with a lakehouse, see [Create a lakehouse in Microsoft Fabric](create-lakehouse.md).
- To learn more about Apache Spark job definitions, see [What is an Apache Spark job definition?](spark-job-definition.md)
- To get started with an Apache Spark job definition, see [How to create an Apache Spark job definition in Fabric](create-spark-job-definition.md).
- To learn more about notebooks, see [Author and execute the notebook](author-execute-notebook.md).
- To get started with pipeline copy activity, see [How to copy data using copy activity](..\data-factory\copy-data-activity.md).
