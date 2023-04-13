---
title: Create an Apache Spark job definition
description: Learn how to create a Spark job definition for different languages from the Data Engineering homepage, the Workspace view, or the Create hub.
ms.reviewer: snehagunda
ms.author: qixwang
author: qixwang
ms.topic: how-to
ms.date: 02/24/2023
ms.search.form: Create Spark Job Definition,spark_job_definition
---

# How to create an Apache Spark job definition in Fabric

[!INCLUDE [preview-note](../includes/preview-note.md)]

In this tutorial, learn how to create a Spark job definition in [!INCLUDE [product-name](../includes/product-name.md)].

## Prerequisites

To get started, you need the following prerequisites:

- A [!INCLUDE [product-name](../includes/product-name.md)] tenant account with an active subscription. [Create an account for free](../placeholder.md).
- Access to the Data Engineering Workload. [Onboard onto the data engineering workload](../placeholder.md).

> [!TIP]
> To run the Spark job definition item, main definition file and default lakehouse context are required. If you don't have a lakehouse, you can create one by following the steps in [Create a lakehouse](../data-engineering/lakehouse.md#create-a-lakehouse).


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

1. Create a new Spark job definition.

1. Select **PySpark (Python)** from the **Language** dropdown.

1. Upload the main definition file as *.py* file. The main definition file is the file that contains the application logic of this *job.Main* definition file is mandatory to run a Spark job.

1. Upload Reference files as *.py*/*.whl* file. the Reference files are the files that are referenced/imported by the main definition file.

1. Provide command line arguments to the job if needed.

1. Add the lakehouse reference to the job. You must have at least one lakehouse reference added to the job. This lakehouse is the default lakehouse context for the job.

:::image type="content" source="media\create-spark-job-definition\main-definition-file-example.png" alt-text="Screenshot showing an example of a populated main definition file screen." lightbox="media\create-spark-job-definition\main-definition-file-example.png":::

In this example, we've done the following:

- Created a Spark job definition named **sjd005** for PySpark
- Uploaded the *createTablefromCSVwithdependency.py* file as the main definition file
- Uploaded the *Constant.py* file as the reference file
- Added the lakehouse references *LH001* and *LH002* to the job
- Made *LH001* the default lakehouse context

### Create a Spark job definition for Scala/Java

To create a Spark job definition for Scala/Java, follow these steps:

1. Select **Spark(Scala/Java)** from the **Language** dropdown.

1. Upload the main definition file as .jar file. The main definition file is the file that contains the application logic of this job. A main definition file is mandatory to run a Spark Job. Provide the Main class name.

1. Upload Reference files as .jar file. the Reference files are the files that are referenced/imported by the main definition file.

1. Provides command line arguments to the job if needed.

1. Add the lakehouse reference to the job. You must have at least one lakehouse reference added to the job. This lakehouse is the default lakehouse context for the job.

> [!NOTE]
> The Spark job definition will be created under the current workspace you are in.

## Next steps

- [Run an Apache Spark job definition](run-spark-job-definition.md)
