---
title: Lakehouse overview
description: Learn about Lakehouses.
ms.reviewer: snehagunda
ms.author: snehagunda
author: snehagunda
ms.topic: overview
ms.date: 02/24/2023
---

# What is a Lakehouse?

> [!IMPORTANT]
> [!INCLUDE [product-name](../includes/product-name.md)] is currently in PREVIEW. This information relates to a prerelease product that may be substantially modified before it's released. Microsoft makes no warranties, expressed or implied, with respect to the information provided here.

A Lakehouse is a collection of files/folders/tables that represent a database over a data lake used by the Spark engine and SQL engine for big data processing and that includes enhanced capabilities for ACID transactions when using the open-source Delta formatted tables. The Lakehouse artifact is hosted within a unique workspace folder in the [!INCLUDE [product-name](../includes/product-name.md)] lake. It contains files in various formats (structured and unstructured) organized in folders and subfolder structures.

## Lakehouse structure

The overall structure of a Lakehouse is easy to understand. Here's a logical view of how files, folders, and tables are displayed and handled within the Lakehouse.

![Graphical user interface, application  Description automatically generated](media/image1.png)
:::image type="content" source="" alt-text="" lightbox="":::

| **Object** | **Structure overview** |
|---|---|
| **Lakehouse** | A Lakehouse name must be unique within the workspace. |
| **Lake view** | The Lake view contains all folders and files in the lakehouse. It's divided into two sections: the Table section, which is the managed area and the Files section, which is the unmanaged area. |
| **Table view** | The Table view contains tables registered in the metastore from your lake. |
| **Table** | This is a virtual view of the managed area in your lake. This is the main container to host tables of all types (CSV, Parquet, Delta, Managed tables and External tables). All tables, whether automatically or explicitly created, show up as a table under the managed area of the Lakehouse. This area can also include any types of files or folder/subfolder organizations. |
| **Files** | This is a virtual view of the unmanaged area in your lake. It can contain any files and folders/subfolder’s structure. The main distinction between the managed area and the unmanaged area is the automatic delta table detection process, which runs over any folders created in the managed area. Any delta format files (parquet + transaction log) will be automatically registered as a table and also be available from the serving layer (T-SQL). The scanning process is discussed in a later [section](#automatic-table-discovery-and-registration). |
| **CSV and Parquet Tables** | Any csv or parquet tables must explicitly be created so that an entry is stored in the metastore. |
| **Folders and subfolders** | Users can continue to use folders and subfolders in the managed and unmanaged area for organization of files. |
| **Delta Tables** | Delta folders in the unmanaged area aren't recognized as tables. Automatic scanning won't pick up any folders in the unmanaged area. If a user wants to create a table over a delta folder in the unmanaged area, they'll have to explicitly create an external table with the location pointer to the unmanaged folder containing the delta files. |

## Automatic table discovery and registration

Lakehouse Table Automatic discovery and registration is a feature of the lakehouse that provides a fully managed file to table experience for data engineers and data scientists. Users can drop a file into the managed area of the lakehouse and the file will be automatically validated for supported structured formats, which is currently only Delta tables, and registered into the metastore with the necessary metadata such as column names, formats, compression and more. Users can then reference the file as a table and use SparkSQL syntax to interact with the data.

## Interacting with the Lakehouse artifact

A data engineer can interact with the lakehouse and the data within the lakehouse in several ways:

1. The lakehouse explorer
    - This is the main lakehouse interaction page. You can load data in your lakehouse, explore data in the lakehouse using the object explorer, set MIP labels & various other things. You can learn more about the explorer experience [here](#).
1. Notebooks
    - Data engineers can use the notebook to write code to read, transform and write directly to the lakehouse as tables and/or folders. You can learn more about how to leverage notebooks for lakehouses [here](#).
1. Pipelines
    - Data engineers can use data integration tools such as pipeline copy tool to pull data from other sources and land into the lakehouse. You can find more information on how to use the copy activity [here](https://microsofteur.sharepoint.com/teams/TridentPrivatePreview/Shared%20Documents/Documentation/Private%20Preview%20Documentation/Data%20Integration/Data%20Integration%20Consolidated%20Documentation.pdf).
1. Spark Job Definitions
    - Data engineers can develop robust applications and orchestrate the execution of compiled Spark jobs in Java, Scala, and Python. Learn more on how to do this [here](#).

## Different ways to load data into a Lakehouse

There are several ways to load data into your lakehouse:

1. **Local file upload**: Uploading data directly from a local machine through the Lakehouse explorer.
1. **Notebook code**: Using available spark libraries to connect to a data source directly and then loading data to dataframe and saving it in a lakehouse.
1. **Copy tool in pipelines**: Connect to different data sources and land the data either in original format or convert it to a delta table.

Learn more about the different use cases [here](#).

## Next steps

In this overview, you get a basic understanding of a lakehouse. Advance to the next article to learn how to create and get started with your own lakehouse:

To get started with Lakehouse, see [How to: Create a lakehouse](#).
