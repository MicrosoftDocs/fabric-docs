---
title: Data science tutorial - ingest data into a lakehouse
description: In this first part of the tutorial series, learn how to ingest a dataset into a Fabric lakehouse in delta lake format and how to preview the data you ingested.
ms.reviewer: sgilley
ms.author: amjafari
author: amhjf
ms.topic: tutorial
ms.custom: build-2023
ms.date: 5/4/2023
---

# Part 1: Ingest data into a Microsoft Fabric lakehouse using Apache Spark

In this tutorial, we ingest the [NYC Taxi & Limousine Commission - yellow taxi trip dataset](/azure/open-datasets/dataset-taxi-yellow) to demonstrate data ingestion into Fabric lakehouses in delta lake format.

[!INCLUDE [preview-note](../includes/preview-note.md)]

**Lakehouse**: A lakehouse is a collection of files, folders, and tables that represents a database over a data lake used by the Spark engine and SQL engine for big data processing, and that includes enhanced capabilities for ACID transactions when using the open-source Delta formatted tables.

**Delta Lake**: Delta Lake is an open-source storage layer that brings ACID transactions, scalable metadata management, and batch and streaming data processing to Apache Spark. A Delta Lake table is a data table format that extends Parquet data files with a file-based transaction log for ACID transactions and scalable metadata management.

In the following steps, you use the Apache spark to read data from Azure Open Datasets containers and write data into a Fabric lakehouse delta table. [Azure Open Datasets](/azure/open-datasets/overview-what-are-open-datasets) are curated public datasets that you can use to add scenario-specific features to machine learning solutions for more accurate models. Open Datasets are in the cloud on Microsoft Azure Storage and can be accessed by various methods including Apache Spark, REST API, Data factory, and other tools.

## Prerequisites

[!INCLUDE [prerequisites](./includes/prerequisites.md)]


## Follow along in notebook

 [01-ingest-data-into-fabric-lakehouse-using-apache-spark.ipynb](https://github.com/microsoft/fabric-samples/blob/main/docs-samples/data-science/data-science-tutorial/01-ingest-data-into-fabric-lakehouse-using-apache-spark.ipynb) is the notebook that accompanies this tutorial.

[!INCLUDE [follow-along](./includes/follow-along.md)]

## Sample dataset

In this tutorial, we use the [NYC Taxi and Limousine yellow dataset](/azure/open-datasets/dataset-taxi-yellow?tabs=pyspark), which is a large-scale dataset containing taxi trips in the city from 2009 to 2018. The dataset includes various features such as pick-up and drop-off dates, times, locations, fares, payment types, and passenger counts. The dataset can be used for various purposes such as analyzing traffic patterns, demand trends, pricing strategies, and driver behavior.

## Ingest the data

1. In the first step of this part, we read data from "azureopendatastorage" storage container using anonymous since the container has public access. We load [yellow cab data](https://www.nyc.gov/site/tlc/about/tlc-trip-record-data.page) by specifying the directory and filter the data by year (puYear) and month (puMonth). In this tutorial, we try to minimize the amount of data ingested and processed to speed up the execution. To learn more about the data, see [NYC Taxi & Limousine Commission - yellow taxi trip dataset](/azure/open-datasets/dataset-taxi-yellow).

   ```python
   # Azure storage access info for open datasets yellow cab
   storage_account = "azureopendatastorage"
   container = "nyctlc"

   sas_token = r"" # Blank since container is Anonymous access

   # Set Spark config to access  blob storage
   spark.conf.set("fs.azure.sas.%s.%s.blob.core.windows.net" % (container, storage_account),sas_token)

   dir = "yellow"
   year = 2016
   months = "1,2,3,4"
   wasbs_path = f"wasbs://{container}@{storage_account}.blob.core.windows.net/{dir}"
   df = spark.read.parquet(wasbs_path)

   # Filter data by year and months
   filtered_df = df.filter(f"puYear = {year} AND puMonth IN ({months})")
   ```

1. Next, we set spark configurations to enable VOrder engine and Optimize delta writes.

   - **VOrder** - Fabric includes Microsoft's VOrder engine. VOrder writer optimizes the Delta Lake parquet files resulting in 3x-4x compression improvement and up to 10x performance acceleration over Delta Lake files not optimized using VOrder while still maintaining full Delta Lake and PARQUET format compliance.
   - **Optimize write** - Spark in Microsoft Fabric includes an Optimize write feature that reduces the number of files written and targets to increase individual file size of the written data. It dynamically optimizes files during write operations generating files with a default 128-MB size. The target file size may be changed per workload requirements using configurations.

      These configs can be applied at a session level (as spark.conf.set in a notebook cell) as demonstrated in the following code cell, or at workspace level, which is applied automatically to all spark sessions created in the workspace. In this tutorial, we set these configurations using the code cell.

      ```python
      spark.conf.set("sprk.sql.parquet.vorder.enabled", "true") # Enable VOrder write
      spark.conf.set("spark.microsoft.delta.optimizeWrite.enabled", "true") # Enable automatic delta optimized write
      ```

      > [!TIP]
      > The workspace level Apache Spark configurations can be set at: **Workspace settings**, **Data Engineering/Science**, **Spark Compute**, **Spark Properties**, **Add**.

1. In the next step, perform a spark dataframe write operation to save data into a lakehouse table named *nyctaxi_raw*.

   ```python
   table_name = "nyctaxi_raw"
   filtered_df.write.mode("overwrite").format("delta").save(f"Tables/{table_name}")
   print(f"Spark dataframe saved to delta table: {table_name}")
   ```

   Once the dataframe has been saved, you can navigate to the attached lakehouse item in your workspace and open the lakehouse UI to preview data in the **nyctaxi_raw** table created in the previous steps.

   :::image type="content" source="media\tutorial-data-science-ingest-data\preview-data-new-table.png" alt-text="Screenshot showing where to preview a list of data in a table in the lakehouse view." lightbox="media\tutorial-data-science-ingest-data\preview-data-new-table.png":::

## Next steps

- [Part 2: Explore and visualize data using notebooks](tutorial-data-science-explore-notebook.md)
