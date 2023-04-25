---
title: What is a lakehouse?
description: A lakehouse is a collection of files, folders, and tables that represent a database over a data lake used by  Apache Spark and SQL for big data processing.
ms.reviewer: snehagunda
ms.author: avinandac
author: avinandaMS
ms.topic: overview
ms.date: 05/23/2023
ms.search.form: Lakehouse Overview
---

# What is a lakehouse in Microsoft Fabric?

[!INCLUDE [preview-note](../includes/preview-note.md)]

A lakehouse is a collection of files, folders, and tables that represent a database over a data lake used by the Apache Spark engine and SQL engine for big data processing. A lakehouse includes enhanced capabilities for ACID transactions when using the open-source Delta formatted tables. The lakehouse item is hosted within a unique workspace folder in the [!INCLUDE [product-name](../includes/product-name.md)] lake. It contains files in various formats (structured and unstructured) organized in folders and subfolder structures.

## Lakehouse structure

The overall structure of a lakehouse is easy to understand. Here's a logical view of how files, folders, and tables are displayed and handled within the lakehouse.

:::image type="content" source="media\lakehouse-overview\lakehouse-structure.png" alt-text="Screenshot showing the lakehouse screen with Lake view and Table view." lightbox="media\lakehouse-overview\lakehouse-structure.png":::

| **Object** | **Structure overview** |
|---|---|
| **Lakehouse** | A lakehouse name must be unique within the workspace. |
| **Lake view** | The **Lake** view contains all folders and files in the lakehouse. It's divided into two sections: the **Table** section, which is the managed area and the **Files** section, which is the unmanaged area. |
| **Table view** | The **Table** view contains tables registered in the metastore from your lake. |
| **Table** | This is a virtual view of the managed area in your lake and is the main container to host tables of all types (CSV, Parquet, Delta, Managed tables, and External tables). All tables, whether automatically or explicitly created, show up as a table under the managed area of the lakehouse. This area can also include any types of files or folder/subfolder organizations. |
| **Files** | This is a virtual view of the unmanaged area in your lake; it can contain any files and folders/subfolder’s structure. The main distinction between the managed area and the unmanaged area is the automatic delta table detection process, which runs over any folders created in the managed area. Any delta format files (parquet + transaction log) will be automatically registered as a table and also be available from the serving layer (T-SQL). Learn more about the scanning process in the following section: [Automatic table discovery and registration](#automatic-table-discovery-and-registration). |
| **CSV and Parquet Tables** | You must explicitly create any csv or parquet tables so that an entry is stored in the metastore. |
| **Folders and subfolders** | You can continue to use folders and subfolders in the managed and unmanaged area for organization of files. |
| **Delta Tables** | Delta folders in the unmanaged area aren't recognized as tables. Automatic scanning doesn't pick up any folders in the unmanaged area. If you want to create a table over a delta folder in the unmanaged area, you have to explicitly create an external table with the location pointer to the unmanaged folder containing the delta files. |

## Automatic table discovery and registration

Lakehouse Table Automatic discovery and registration is a feature of the lakehouse that provides a fully managed file to table experience for data engineers and data scientists. You can drop a file into the managed area of the lakehouse and the file is automatically validated for supported structured formats, which is currently only Delta tables, and registered into the metastore with the necessary metadata such as column names, formats, compression and more. You can then reference the file as a table and use SparkSQL syntax to interact with the data.

## Interacting with the lakehouse item

A data engineer can interact with the lakehouse and the data within the lakehouse in several ways:

1. **The lakehouse explorer**: The explorer is the main lakehouse interaction page. You can load data in your lakehouse, explore data in the lakehouse using the object explorer, set MIP labels & various other things. Learn more about the explorer experience: [Navigating the lakehouse explorer](navigate-lakehouse-explorer.md).
1. **Notebooks**: Data engineers can use the notebook to write code to read, transform and write directly to the lakehouse as tables and/or folders. You can learn more about how to leverage notebooks for lakehouse: [Explore the data in your lakehouse with a notebook](lakehouse-notebook-explore.md) and [How to use a notebook to load data into your lakehouse](lakehouse-notebook-load-data.md).
1. **Pipelines**: Data engineers can use data integration tools such as pipeline copy tool to pull data from other sources and land into the lakehouse. Find more information on how to use the copy activity: [How to copy data using copy activity](../data-factory/copy-data-activity.md).
1. **Apache Spark job definitions**: Data engineers can develop robust applications and orchestrate the execution of compiled Spark jobs in Java, Scala, and Python. Learn more about Spark jobs: [What is an Apache Spark job definition?](spark-job-definition.md).

## Different ways to load data into a lakehouse

There are several ways to load data into your lakehouse:

1. **Local file upload**: Uploading data directly from a local machine through the lakehouse explorer.

1. **Notebook code**: Using available spark libraries to connect to a data source directly and then loading data to dataframe and saving it in a lakehouse.

1. **Copy tool in pipelines**: Connect to different data sources and land the data either in original format or convert it to a delta table.

Learn more about the different use cases: [Get data experience for lakehouse](load-data-lakehouse.md).

## Next steps

In this overview, you get a basic understanding of a lakehouse. Advance to the next article to learn how to create and get started with your own lakehouse:

- To get started with lakehouse, see [Creating a lakehouse](create-lakehouse.md).
