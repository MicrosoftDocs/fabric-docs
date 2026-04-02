---
title: Create an Apache Spark job definition
description: Learn how to create a Spark job definition for different languages from the Fabric portal.
ms.reviewer: qixwang
ms.topic: how-to
ms.date: 11/07/2025
ms.search.form: Create Spark Job Definition,spark_job_definition
---

# How to create an Apache Spark job definition in Fabric

In this tutorial, learn how to create a Spark job definition in Microsoft Fabric.

The Spark job definition creation process is quick and simple; there are several ways to get started. 

You can create a Spark job definition from the Fabric portal or by using the Microsoft Fabric REST API. This article focuses on creating a Spark job definition from the Fabric portal. For information about creating a Spark job definition using the REST API, see [Apache Spark job definition API v1](spark-job-definition-api.md) and [Apache Spark job definition API v2](spark-job-definition-api-v2.md).

## Prerequisites

Before you get started, you need:

- A Fabric tenant account with an active subscription. [Create an account for free](../fundamentals/fabric-trial.md).
- A workspace in Microsoft Fabric. For more information, see [Create and manage workspaces in Microsoft Fabric](../fundamentals/create-workspaces.md).
- At least one lakehouse in the workspace. The lakehouse serves as the default file system for the Spark job definition. For more information, see [Create a lakehouse](../data-engineering/create-lakehouse.md).
- A main definition file for the Spark job. This file contains the application logic and is mandatory to run a Spark job. Each Spark job definition can have only one main definition file.

You need to give your Spark job definition a name when you create it. The name must be unique within the current workspace. The new Spark job definition is created in your current workspace.

## Create a Spark job definition in the Fabric portal

To create a Spark job definition in the Fabric portal, follow these steps:
1. Sign in to the [Microsoft Fabric portal](https://fabric.microsoft.com/).
1. Navigate to the desired workspace where you want to create the Spark job definition.
1. Select **New item** > **Spark Job Definition**.
1. In the **New Spark Job Definition** pane, provide the following information:
   - **Name**: Enter a unique name for the Spark job definition.
   - **Location**: Select the workspace location.
1. Select **Create** to create the Spark job definition.

An alternate entry point to create a Spark job definition is the **Data analytics using a SQL ...** tile on the Fabric home page. You can find the same option by selecting the **General** tile.

:::image type="content" source="media\create-spark-job-definition\create-hub-data-engineering.png" alt-text="Screenshot showing where to select Spark job definition on the Create Hub." lightbox="media\create-spark-job-definition\create-hub-data-engineering.png":::

When you select the tile, you're prompted to create a new workspace or select an existing one. After you select the workspace, the Spark job definition creation page opens.


## Customize a Spark job definition for PySpark (Python)

Before you create a Spark job definition for PySpark, you need a sample Parquet file uploaded to the lakehouse.
1. Download the sample Parquet file [yellow_tripdata_2022-01.parquet](https://www.nyc.gov/site/tlc/about/tlc-trip-record-data.page).
1. Go to the lakehouse where you want to upload the file.
1. Upload it to the "Files" section of the lakehouse.

To create a Spark job definition for PySpark:

1. [Create a new Spark job definition.](#create-a-spark-job-definition-in-the-fabric-portal)

1. Select **PySpark (Python)** from the **Language** dropdown.

1. Download the [createTablefromParquet.py](https://github.com/microsoft/fabric-samples/blob/main/docs-samples/data-engineering/createTablefromParquet.py) sample definition file. Upload it as the main definition file. The main definition file (*job.Main*) is the file that contains the application logic and is mandatory to run a Spark job. For each Spark job definition, you can only upload one main definition file.

    > [!NOTE]
    > You can upload the main definition file from your local desktop, or you can upload from an existing Azure Data Lake Storage (ADLS) Gen2 by providing the full ABFSS path of the file. For example, `abfss://your-storage-account-name.dfs.core.windows.net/your-file-path`.

1. Optionally upload reference files as `.py` (Python) files. The reference files are the python modules that the main definition file imports. Just like the main definition file, you can upload from your desktop or an existing ADLS Gen2. Multiple reference files are supported.

   > [!TIP]
   > If you use an ADLS Gen2 path, make sure that the file is accessible. You must give the user account that runs the job the proper permission to the storage account. Here are two different ways that you can grant the permission:
   >
   >- Assign the user account a Contributor role for the storage account.
   >- Grant Read and Execution permission to the user account for the file via the ADLS Gen2 Access Control List (ACL).
   >
   > For a manual run, the account of the current signed-in user is used to run the job.

1. Provide command line arguments for the job, if needed. Use a space as a splitter to separate the arguments.

1. Add the lakehouse reference to the job. You must have at least one lakehouse reference added to the job. This lakehouse is the default lakehouse context for the job.

   Multiple lakehouse references are supported. Find the non-default lakehouse name and full OneLake URL in the **Spark Settings** page.

   :::image type="content" source="media\create-spark-job-definition\main-definition-file-example.png" alt-text="Screenshot showing an example of a populated main definition file screen." lightbox="media/create-spark-job-definition/main-definition-file-example.png":::

## Customize a Spark job definition for Scala/Java

To create a Spark job definition for Scala/Java:

1. [Create a new Spark job definition.](#create-a-spark-job-definition-in-the-fabric-portal)

1. Select **Spark(Scala/Java)** from the **Language** dropdown.

1. Upload the main definition file as a `.jar` (Java) file. The main definition file is the file that contains the application logic of this job and is mandatory to run a Spark job. For each Spark job definition, you can only upload one main definition file. Provide the Main class name.

1. Optionally upload reference files as `.jar` (Java) files. The reference files are the files that the main definition file references/imports.

1. Provide command line arguments for the job, if needed.

1. Add the lakehouse reference to the job. You must have at least one lakehouse reference added to the job. This lakehouse is the default lakehouse context for the job.

## Customize a Spark job definition for R

To create a Spark job definition for SparkR(R):

1. [Create a new Spark job definition.](#create-a-spark-job-definition-in-the-fabric-portal)

1. Select **SparkR(R)** from the **Language** dropdown.

1. Upload the main definition file as a `.r` (R) file. The main definition file is the file that contains the application logic of this job and is mandatory to run a Spark job. For each Spark job definition, you can only upload one main definition file.

1. Optionally upload reference files as `.r` (R) files. The reference files are the files that are referenced/imported by the main definition file.

1. Provide command line arguments for the job, if needed.

1. Add the lakehouse reference to the job. You must have at least one lakehouse reference added to the job. This lakehouse is the default lakehouse context for the job.

> [!NOTE]
> The Spark job definition is created in your current workspace.

### Options to customize Spark job definitions

There are a few options to further customize the execution of Spark job definitions.

- **Spark Compute**: Within the **Spark Compute** tab, you can see [the Fabric runtime version](./runtime.md) that's used to run the Spark job. You can also see the Spark configuration settings that are used to run the job. You can customize the Spark configuration settings by selecting the **Add** button.

- **Optimization**: On the **Optimization** tab, you can enable and set up the **Retry Policy** for the job. When enabled, the job is retried if it fails. You can also set the maximum number of retries and the interval between retries. For each retry attempt, the job is restarted. Make sure the job is **idempotent**.

   :::image type="content" source="media\create-spark-job-definition\retry-policy.png" alt-text="Screenshot showing where to set up retry policy." lightbox="media/create-spark-job-definition/retry-policy.png":::

## Related content

- [Run an Apache Spark job definition](run-spark-job-definition.md)
