---
title: What is OneLake?
description: OneLake is included with every Microsoft Fabric tenant and is designed to be the single place for all your analytics data. Learn more.
ms.reviewer: eloldag
ms.author: eloldag
author: eloldag
ms.topic: overview
ms.custom: build-2023, build-2023-dataai, build-2023-fabric
ms.date: 05/23/2023
---

# OneLake, the OneDrive for data

OneLake is a single, unified, logical data lake for the whole organization. Like OneDrive, OneLake comes automatically with every Microsoft Fabric tenant and is designed to be the single place for all your analytics data. OneLake brings customers:
- **One data lake** for the entire organization
- **One copy of data** for use with multiple analytical engines

[!INCLUDE [preview-note](../includes/preview-note.md)]

## One data lake for the entire organization

Prior to OneLake, it was easier for customers to create multiple lakes for different business groups rather than collaborating on a single lake, even with the extra overhead of managing multiple resources. OneLake focuses on removing these challenges by improving collaboration. Every customer tenant has exactly one OneLake. There can never be more than one and if you have Fabric, there can never be zero. OneLake is provisioned automatically with every Fabric tenant with no extra resources to set up or manage.

### Governed by default with distributed ownership for collaboration

The concept of a tenant is a unique benefit of a SaaS service. Knowing where a customer’s organization begins and ends, provides a natural governance and compliance boundary, which is ultimately under the control of a tenant admin. Any data that lands in OneLake is governed by default. While all data is within the boundaries set by the tenant admin, it's important that this admin doesn't become a central gatekeeper preventing other parts of the organization from contributing to OneLake.
Within a tenant, you can create any number of workspaces. Workspaces enable different parts of the organization to distribute ownership and access policies. Each workspace is part of a capacity that is tied to a specific region and is billed separately.

:::image type="content" source="media\onelake-overview\onelake-foundation-for-fabric.png" alt-text="Diagram showing the function and structure of OneLake." lightbox="media\onelake-overview\onelake-foundation-for-fabric.png":::

Within a workspace, you can create data items and all data in OneLake is accessed through data items. Similar to how Office stores Word, Excel, and PowerPoint files in OneDrive, Fabric stores lakehouses, warehouses, and other items in OneLake. Items can give tailored experiences for each persona such the Spark developer experience in a lakehouse.
For more information on how to get started using OneLake, see [Creating a lakehouse with OneLake](create-lakehouse-onelake.md).

### Open at every level

OneLake is open at every level. Built on top of Azure Data Lake Storage Gen2, OneLake can support any type of file, structured or unstructured. All Fabric data items like data warehouses and lakehouses store their data automatically in OneLake in delta parquet format. This means when a data engineer loads data into a lakehouse using Spark and a SQL developer in a fully transactional data warehouse uses T-SQL to load data, everyone is still contributing to building the same data lake. All tabular data is stored in OneLake in delta parquet format.
OneLake supports the same ADLS Gen2 APIs and SDKs to be compatible with existing ADLS Gen2 applications including Azure Databricks. Data in OneLake can be addressed as if it were one big ADLS storage account for the entire organization. Every workspace appears as a container within that storage account. Different data items appear as folders under those containers.

:::image type="content" source="media\onelake-overview\access-onelake-data-other-tools.png" alt-text="Diagram showing how you can access OneLake data with APIs and SDKs." lightbox="media\onelake-overview\access-onelake-data-other-tools.png":::

For more information on APIs and endpoints, see [OneLake access and APIs](onelake-access-api.md). For examples of OneLake integrations with Azure, see [Azure Synapse Analytics](onelake-azure-synapse-analytics.md), [Azure storage explorer](onelake-azure-storage-explorer.md), [Azure Databricks](onelake-azure-databricks.md), and [Azure HDInsight](onelake-azure-hdinsight.md) articles.

### OneLake file explorer for Windows

OneLake is the OneDrive for data. Just like OneDrive, OneLake data can be easily explored from Windows using the OneLake file explorer for Windows. Directly in Windows, you can navigate all your workspaces, data items, easily uploading, downloading or modifying files just like you can do in office. The OneLake file explorer simplifies data lakes putting them into the hands of even nontechnical business users.
For more information, see [OneLake file explorer](onelake-file-explorer.md).

## One copy of data

OneLake aims to give you the most value possible out of a single copy of data without data movement or duplication. You'll no longer need to copy data just to use it with another engine or to break down silos so that data can be analyzed with other data.

### Shortcuts let you connect data across business domains without data movement

Shortcuts allow your organization to easily share data between users and applications without having to move and duplicate information unnecessarily. When teams work independently in separate workspaces, shortcuts enable you to combine data across different business groups and domains into a virtual data product to fit a user’s specific needs.
A shortcut is a reference to data stored in other file locations. These file locations can be within the same workspace or across different workspaces, within OneLake or external to OneLake in ADLS or S3. No matter the location, the reference makes it appear as though the files and folders are stored locally.

:::image type="content" source="media\onelake-overview\fabric-shortcuts-structure-onelake.png" alt-text="Diagram showing how shortcuts connect data across workspaces and items." lightbox="media\onelake-overview\fabric-shortcuts-structure-onelake.png":::

For more information on how to use shortcuts, see [OneLake shortcuts](onelake-shortcuts.md).

### One copy of data with multiple analytical engines

While applications may have separation of storage and computing, the data is often optimized for a single engine, which makes it difficult to reuse the same data for multiple applications. With Fabric, the different analytical engines (T-SQL, Spark, Analysis Services, etc.) store data in the open delta parquet format to allow you to use the same data across multiple engines.
There's no longer a need to copy data just to use it with another engine. You're always able to choose the best engine for the job that you're trying to do.
For example, imagine you have a team of SQL engineers building a fully transaction data warehouse. They can use the T-SQL engine and all the power of T-SQL to create tables, transform, and load data to tables. If a data scientist wants to make use of this data, they no longer need to go through a special Spark/SQL driver. All data is stored in OneLake in delta parquet format. Data scientists can use the full power of the Spark engine and its open-source libraries directly over the data.

Business users can build Power BI reports directly on top of OneLake using the new direct lake mode in the Analysis Services engine. The Analysis Services engine is what powers Power BI Datasets and has always offered two modes of accessing data, import and direct query. Direct lake mode gives users all the speed of import without needing to copy the data, combining the best of import and direct query. Learn more about direct lake: https://aka.ms/DirectLake.

:::image type="content" source="media\onelake-overview\use-same-copy-of-data.png" alt-text="Diagram showing how multiple items and engines use the same copy of data." lightbox="media\onelake-overview\use-same-copy-of-data.png":::

*Example diagram showing loading data using Spark, querying using T-SQL and viewing the data in a Power BI report.*

## Next steps

- [Creating a lakehouse with OneLake](create-lakehouse-onelake.md)
