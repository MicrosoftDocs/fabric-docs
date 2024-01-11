---
title: Create an Apache Spark job definition
description: Learn how to create a Spark job definition for different languages from the Data Engineering homepage, the Workspace view, or the Create hub.
ms.reviewer: snehagunda
ms.author: qixwang
author: qixwang
ms.topic: how-to
ms.custom:
  - build-2023
  - ignite-2023
ms.date: 10/20/2023
ms.search.form: Create Spark Job Definition,spark_job_definition
---

# How to create an Apache Spark job definition in Fabric

In this tutorial, learn how to create a Spark job definition in Microsoft Fabric.

## Prerequisites

Before you get started, you need:

- A Fabric tenant account with an active subscription. [Create an account for free](../get-started/fabric-trial.md).

> [!TIP]
> To run the Spark job definition item, you must have a main definition file and default lakehouse context. If you don't have a lakehouse, you can create one by following the steps in [Create a lakehouse](../data-engineering/create-lakehouse.md).

## Create a Spark job definition

The Spark job definition creation process is quick and simple; there are several ways to get started.

### Options to create a Spark job definition

There are a few ways you can get started with the creation process:

- **Data engineering homepage**: You can easily create a Spark job definition through the **Spark Job Definition** card under the **New** section in the homepage.

  :::image type="content" source="media\create-spark-job-definition\spark-job-definition-card.png" alt-text="Screenshot showing where to select the Spark job definition card.":::

- **Workspace view**: You can also create a Spark job definition through the **Workspace** view when you are in the **Data Engineering** experience by using the **New** dropdown menu.

  :::image type="content" source="media\create-spark-job-definition\data-engineering-new.png" alt-text="Screenshot showing where to select Spark job definition in the New menu.":::

- **Create view**: Another entry point to create a Spark job definition is the **Create** page under **Data Engineering**.

  :::image type="content" source="media\create-spark-job-definition\create-hub-data-engineering.png" alt-text="Screenshot showing where to select Spark job definition on the Create Hub.":::

You need to give your Spark job definition a name when you create it. The name must be unique within the current workspace. The new Spark job definition is created in your current workspace.

### Create a Spark job definition for PySpark (Python)

To create a Spark job definition for PySpark:

1. Create a new Spark job definition.

1. Select **PySpark (Python)** from the **Language** dropdown.

1. Upload the main definition file as a *.py* file. The main definition file (*job.Main*) is the file that contains the application logic and is mandatory to run a Spark job. For each Spark job definition, you can only upload one main definition file.

   You can upload the file from your local desktop, or you can upload from an existing Azure Data Lake Storage (ADLS) Gen2 by providing the full ABFSS path of the file. For example, `abfss://your-storage-account-name.dfs.core.windows.net/your-file-path`.

1. Upload reference files as *.py* files. The reference files are the python modules that are imported by the main definition file. Just like the main definition file, you can upload from your desktop or an existing ADLS Gen2. Multiple reference files are supported.

   > [!TIP]
   > If you use an ADLS Gen2 path, to make sure the file is accessible, you must give the user account that runs the job the proper permission to the storage account. We suggest two different ways to do this:
   >
   >- Assign the user account a Contributor role for the storage account.
   >- Grant Read and Execution permission to the user account for the file via the ADLS Gen2 Access Control List (ACL).
   >  
   > For a manual run, the account of the current login user is used to run the job.

1. Provide command line arguments for the job, if needed. Use a space as a splitter to separate the arguments.

1. Add the lakehouse reference to the job. You must have at least one lakehouse reference added to the job. This lakehouse is the default lakehouse context for the job.

   Multiple lakehouse references are supported. Find the non-default lakehouse name and full OneLake URL in the **Spark Settings** page.

   :::image type="content" source="media\create-spark-job-definition\main-definition-file-example.png" alt-text="Screenshot showing an example of a populated main definition file screen.":::

### Create a Spark job definition for Scala/Java

To create a Spark job definition for Scala/Java:

1. Create a new Spark job definition.

1. Select **Spark(Scala/Java)** from the **Language** dropdown.

1. Upload the main definition file as a *.jar* file. The main definition file is the file that contains the application logic of this job and is mandatory to run a Spark job. For each Spark job definition, you can only upload one main definition file. Provide the Main class name.

1. Upload reference files as *.jar* files. The reference files are the files that are referenced/imported by the main definition file.

1. Provide command line arguments for the job, if needed.

1. Add the lakehouse reference to the job. You must have at least one lakehouse reference added to the job. This lakehouse is the default lakehouse context for the job.

### Create a Spark job definition for R

To create a Spark job definition for SparkR(R):

1. Create a new Spark job definition.

1. Select **SparkR(R)** from the **Language** dropdown.

1. Upload the main definition file as an *.R* file. The main definition file is the file that contains the application logic of this job and is mandatory to run a Spark job. For each Spark job definition, you can only upload one main definition file.

1. Upload reference files as *.R* files. The reference files are the files that are referenced/imported by the main definition file.

1. Provide command line arguments for the job, if needed.

1. Add the lakehouse reference to the job. You must have at least one lakehouse reference added to the job. This lakehouse is the default lakehouse context for the job.

> [!NOTE]
> The Spark job definition will be created in your current workspace.

### Options to customize Spark job definitions

There are a few options to further customize the execution of Spark job definitions.

- **Spark Compute**: Within the **Spark Compute** tab, you can see [the Runtime Version](./runtime.md) which is the version of Spark that will be used to run the job. You can also see the Spark configuration settings that will be used to run the job. You can customize the Spark configuration settings by clicking on the **Add** button.

<!--
   :::image type="content" source="media\create-spark-job-definition\spark-compute.png" alt-text="Screenshot showing where to edit Spark configuration." lightbox="media\create-spark-job-definition\spark-compute.png"::: -->

- **Optimization**: On the **Optimization** tab, you can enable and set up the **Retry Policy** for the job. When enabled, the job is retried if it fails. You can also set the maximum number of retries and the interval between retries. For each retry attempt, the job is restarted. Make sure the job is **idempotent**.

   :::image type="content" source="media\create-spark-job-definition\retry-policy.png" alt-text="Screenshot showing where to set up retry policy.":::

## Related content

- [Run an Apache Spark job definition](run-spark-job-definition.md)
