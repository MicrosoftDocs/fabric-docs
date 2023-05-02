---
title: Data science tutorial - ingest data into a lakehouse
description: In this first module, learn how to ingest a dataset into a Fabric lakehouse in delta lake format and how to preview the data you ingested.
ms.reviewer: mopeakande
ms.author: mopeakande
author: msakande
ms.topic: tutorial
ms.date: 5/4/2023
---

# Module 1: Ingest data into a Microsoft Fabric lakehouse using Apache Spark

In this module, we ingest the NYC Taxi & Limousine Commission - yellow taxi trip dataset to demonstrate data ingestion into Fabric lakehouses in delta lake format.

**Lakehouse**: A lakehouse is a collection of files, folders, and tables that represents a database over a data lake used by the Spark engine and SQL engine for big data processing, and that includes enhanced capabilities for ACID transactions when using the open-source Delta formatted tables.

**Delta Lake**: Delta Lake is an open-source storage layer that brings ACID transactions, scalable metadata management, and batch and streaming data processing to Apache Spark. A Delta Lake table is a data table format that extends Parquet data files with a file-based transaction log for ACID transactions and scalable metadata management.

In the following steps, you use the Apache spark to read data from Azure Open Datasets containers and write data into a Fabric lakehouse delta table.[Azure Open Datasets](/azure/open-datasets/overview-what-are-open-datasets) are curated public datasets that you can use to add scenario-specific features to machine learning solutions for more accurate models. Open Datasets are in the cloud on Microsoft Azure Storage and can be accessed by various methods including Apache Spark, REST API, Data factory, and other tools.

> [!NOTE]
> The python commands/script used in each step of this tutorial can be found in the accompanying notebook: **01 Ingest data into trident lakehouse using Apache Spark**.

## Ingest the data

1. In the first step of this module, we read data from “azureopendatastorage” storage container using anonymous since the container has public access. We load yellow cab data by specifying the directory and filter the data by year (puYear) and month (puMonth). In this tutorial, we try to minimize the amount of data ingested and processed to speed up the execution.

   :::image type="content" source="media\tutorial-data-science-ingest-data\filter-by-year-month.png" alt-text="Screenshot of code sample for filtering data ingestion by month and year." lightbox="media\tutorial-data-science-ingest-data\filter-by-year-month.png":::
filter-by-year-month

1. Next, we set spark configurations to enable Verti-Parquet engine and Optimize delta writes.

   - **VOrder** - Fabric includes Microsoft’s VertiParquet engine. VertiParquet writer optimizes the Delta Lake parquet files resulting in 3x-4x compression improvement and up to 10x performance acceleration over Delta Lake files not optimized using VertiParquet while still maintaining full Delta Lake and PARQUET format compliance.
   - **Optimize write** - Spark in Trident includes an Optimize write feature that reduces the number of files written and targets to increase individual file size of the written data. It dynamically optimizes files during write operations generating files with a default 128-MB size. The target file size may be changed per workload requirements using configurations.

      These configs can be applied at a session level (as spark.conf.set in a notebook cell) as demonstrated in the following code cell, or at workspace level, which is applied automatically to all spark sessions created in the workspace. In this tutorial, we set these configurations using the code cell.

      :::image type="content" source="media\tutorial-data-science-ingest-data\session-level-config.png" alt-text="Screenshot of code sample for setting session-level configurations." lightbox="media\tutorial-data-science-ingest-data\session-level-config.png":::

      > [!TIP]
      > The workspace level Apache Spark configurations can be set at: **Workspace settings**, **Data Engineering/Science**, **Spark Compute**, **Spark Properties**, **Add**.

1. In the next step, perform a spark dataframe write operation to save data into a lakehouse table named *nyctaxi_raw*.

   :::image type="content" source="media\tutorial-data-science-ingest-data\save-data-new-table.png" alt-text="Screenshot of code sample for saving data into a new lakehouse table." lightbox="media\tutorial-data-science-ingest-data\save-data-new-table.png":::

   Once the dataframe has been saved, you can navigate to the attached lakehouse artifact in your workspace and open the lakehouse UI to preview data in the **nyctaxi_raw** table created in the previous steps.

   :::image type="content" source="media\tutorial-data-science-ingest-data\preview-data-new-table.png" alt-text="Screenshot showing where to preview a list of data in a table in the lakehouse view." lightbox="media\tutorial-data-science-ingest-data\preview-data-new-table.png":::

## Next steps

- [Module 2: Explore and visualize data using notebooks](tutorial-data-science-explore-notebook.md)
