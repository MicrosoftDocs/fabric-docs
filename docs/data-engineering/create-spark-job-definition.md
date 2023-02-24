---
title: How to create an Apache Spark job definition
description: Learn how to create an Apache Spark job definition in your workspace.
ms.reviewer: snehagunda
ms.author: qixwang
author: qixwang
ms.topic: how-to
ms.date: 02/24/2023
---

# How to create an Apache Spark job definition

> [!IMPORTANT]
> [!INCLUDE [product-name](../includes/product-name.md)] is currently in PREVIEW. This information relates to a prerelease product that may be substantially modified before it's released. Microsoft makes no warranties, expressed or implied, with respect to the information provided here.

In this tutorial, learn how to create a Spark job definition in [!INCLUDE [product-name](../includes/product-name.md)].

## Prerequisites

To get started, you need the following prerequisites:

- A [!INCLUDE [product-name](../includes/product-name.md)] tenant account with an active subscription. [Create an account for free](../placeholder.md).
- Access to the Data Engineering Workload. [Onboard onto the data engineering workload](../placeholder.md).

> [!TIP]
> For the following scenarios, main definition file and default Lakehouse context are required:
>
> - Save the Spark job definition artifact.
> - Run the Spark job definition artifact.
> - Clone the Spark job definition artifact.
> - Edit settings of the Spark job definition artifact.

## Create a Spark job definition

The Spark job definition creation process is quick and simple and there are several ways to get started.

### Options to create a Spark job definition

There are a few ways you can get started with the creation process:

- **Data engineering homepage**: You can easily create a Spark job definition through the **Spark job definition** card under the **New** section in the homepage.

:::image type="content" source="media\create-spark-job-definition\spark-job-definition-card.png" alt-text="Screenshot showing where to select the Spark job definition card." lightbox="media\create-spark-job-definition\spark-job-definition-card.png":::

- **Workspace view**: You can also create a Spark job definition through the **Workspace** view when you are on the **Data Engineering** workload by using the **New** dropdown.

:::image type="content" source="media\create-spark-job-definition\data-engineering-new.png" alt-text="Screenshot showing where to select Spark job definition in the New menu." lightbox="media\create-spark-job-definition\data-engineering-new.png":::

- **Create Hub**: Another entry point to create a Spark job definition is in the **Create Hub** page under **Data Engineering**.

:::image type="content" source="media\create-spark-job-definition\create-hub-data-engineering.png" alt-text="Screenshot showing where to select Spark job definition on the Create Hub." lightbox="media\create-spark-job-definition\create-hub-data-engineering.png":::

### Create a Spark job definition for PySpark (Python)

To create a Spark job definition for PySpark, follow these steps:

1. Select **PySpark (Python)** from the **Language** dropdown.

1. Upload the main definition file as *.py* file. The main definition file is the file that contains the application logic of this *job.Main* definition file is mandatory to run a Spark job.

1. Upload Reference files as .py/.whl file. the Reference files are the files that are referenced/imported by the main definition file.

1. Provide command line arguments to the job if needed.

1. Add the Lakehouse reference to the job. You must have at least one Lakehouse reference added to the job. This Lakehouse is the default Lakehouse context for the job.

:::image type="content" source="media\create-spark-job-definition\main-definition-file-example.png" alt-text="Screenshot showing an example of a populated main definition file screen." lightbox="media\create-spark-job-definition\main-definition-file-example.png":::

In this example, we've created a Spark job definition named **sjd005** for PySpark.  Uploaded the *createTablefromCSVwithdependency.py* file as the main definition file, the *Constant.py* file as the reference file, and added the Lakehouse references *LH001* and *LH002* to the job. *LH001* is the default Lakehouse context.

### Create a Spark job definition for Scala/Java

To create a Spark job definition for Scala/Java, follow these steps:

1. Select **Spark(Scala/Java)** from the **Language** dropdown.

1. Upload the main definition file as .jar file. The main definition file is the file that contains the application logic of this job. A main definition file is mandatory to run a Spark Job. Provide the Main class name.

1. Upload Reference files as .jar file. the Reference files are the files that are referenced/imported by the main definition file.

1. Provides command line arguments to the job if needed.

1. Add the Lakehouse reference to the job. You must have at least one Lakehouse reference added to the job. This Lakehouse is the default Lakehouse context for the job.

> [!NOTE]
> The Spark job definition will be created under the current workspace you are in.
