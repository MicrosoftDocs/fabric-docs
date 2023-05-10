---
title: Better together - the lakehouse and warehouse
description: Learn more about the lakehouse data warehousing experience in Microsoft Fabric.
author: cynotebo
ms.author: cynotebo
ms.reviewer: wiassaf
ms.date: 05/23/2023
ms.topic: conceptual
ms.search.form: SQL Endpoint overview, Warehouse in workspace overview # This article's title should not change. If so, contact engineering.
---
# Better together: the lakehouse and warehouse

**Applies to:** [!INCLUDE[fabric-se-and-dw](includes/applies-to-version/fabric-se-and-dw.md)]

[!INCLUDE [product-name](../includes/product-name.md)] provides an [[!INCLUDE [fabric-se](includes/fabric-se.md)]](data-warehousing.md#sql-endpoint-of-the-lakehouse) for every lakehouse in the workspace. The [!INCLUDE [fabric-se](includes/fabric-se.md)] enables you to query data in the lakehouse using T-SQL language and TDS protocol. Every lakehouse has one [!INCLUDE [fabric-se](includes/fabric-se.md)], and each workspace can have more than one lakehouse.

- The [!INCLUDE [fabric-se](includes/fabric-se.md)] is automatically generated for every lakehouse artifact and exposes Delta tables from the lakehouse as SQL tables that can be queried using the T-SQL language.
- Every delta table from a lakehouse is represented as one table. Data should be in delta format.
- The [default Power BI dataset](datasets.md) is created for every [!INCLUDE [fabric-se](includes/fabric-se.md)] and it follows the naming convention of the lakehouse objects.
 
[OneLake](../onelake/onelake-overview.md) is a single, unified, logical data lake for the whole organization. OneLake is the OneDrive for data. OneLake can contain multiple workspaces, for example, along your organizational divisions. The [!INCLUDE [fabric-se](includes/fabric-se.md)] exposes data in the `/tables` folder within each lakehouse folder in OneLake and enables you to create queries and reports on the OneLake data.

The delta tables in the [lakehouse](../data-engineering/lakehouse-overview.md) are automatically added to the default Power BI dataset. The default Power BI dataset is queried via the [[!INCLUDE [fabric-se](includes/fabric-se.md)]](data-warehousing.md#sql-endpoint-of-the-lakehouse) and updated via changes to the lakehouse. You can also query the default Power BI dataset via [cross-database queries](query-warehouse.md#write-a-cross-database-query) from a [Warehouse](data-warehousing.md#synapse-data-warehouse).

[!INCLUDE [preview-note](../includes/preview-note.md)]

## Create a SQL Endpoint

There's no need to create a [!INCLUDE [fabric-se](includes/fabric-se.md)] in [!INCLUDE [product-name](../includes/product-name.md)]. [!INCLUDE [product-name](../includes/product-name.md)] users can't create [!INCLUDE [fabric-se](includes/fabric-se.md)] in a workspace. A [!INCLUDE [fabric-se](includes/fabric-se.md)] is automatically created for every Lakehouse. If you want to create a [!INCLUDE [fabric-se](includes/fabric-se.md)], [create a lakehouse](../onelake/create-lakehouse-onelake.md), and a [!INCLUDE [fabric-se](includes/fabric-se.md)] will be automatically created with the Lakehouse.

The [!INCLUDE [product-name](../includes/product-name.md)] workspace ensures that lakehouse objects are exposed and available for analysis.

## Analyzing data in the lakehouse

Analyzing data in the [!INCLUDE [product-name](../includes/product-name.md)] lakehouse is one of the main scenarios where you use the [[!INCLUDE [fabric-se](includes/fabric-se.md)]](data-warehousing.md#sql-endpoint-of-the-lakehouse). The main purpose of [!INCLUDE [fabric-se](includes/fabric-se.md)] is to enable analytical and reporting tools to access data in the lakehouse.

The [!INCLUDE [fabric-se](includes/fabric-se.md)] automatically creates SQL tables that are referencing data in the lakehouse and enable reporting tools to access Lakehouse data using T-SQL language.

Data in a [!INCLUDE [product-name](../includes/product-name.md)] Lakehouse is physically stored in OneLake with the following folder structure:

- The `/Files` folder contains raw and unconsolidated (bronze) files that should be processed by data engineers before they're analyzed. The files might be in various formats such as `csv`, `parquet`, different types of images, etc.
- The `/Tables` folder contains refined and consolidated (gold) data that is ready for business analysis. The consolidated data is in Delta Lake format.

The [!INCLUDE [fabric-se](includes/fabric-se.md)] automatically discovers data stored in the `/Tables` folder and exposes Lakehouse data as SQL tables. Every Delta Lake folder in the `/Tables` folder is represented as one SQL table that can be used to read data from the folder using T-SQL language. 

The SQL tables are ready for analytics without the need for explicit setup or table design. The [!INCLUDE [fabric-se](includes/fabric-se.md)] analyzes the Delta Lake schema in the `/Tables` folders and automatically creates SQL tables that can be used to query lake data. The [!INCLUDE [fabric-se](includes/fabric-se.md)] analyzes the schema/columns in the `Delta Lake` and crates matching SQL columns in the generated tables.

The [!INCLUDE [fabric-se](includes/fabric-se.md)] enables you to create SQL objects (views, procedures, functions) and set permissions on these objects.

In addition to SQL tables, the [!INCLUDE [product-name](../includes/product-name.md)] workspace exposes the lakehouse data using a default dataset that can either directly access data in the lake or use SQL tables in the SQL endpoint to read data.

## Analyzing data in external data lakes

A [!INCLUDE [fabric-se](includes/fabric-se.md)] isn't just for data analytics in lakehouse and OneLake. A [!INCLUDE [fabric-se](includes/fabric-se.md)] enables you to analyze lake data in any lakehouse managed by the Synapse Spark, Azure Databricks, or any other lake-centric data engineering engine. If the engine stores data in `Delta Lake` format in Azure Data Lake storage or Amazon S3 accounts, a [!INCLUDE [fabric-se](includes/fabric-se.md)] enables you to analyze data using T-SQL language. 

One of the well-known strategies for lake data organization is a [medallion architecture](/azure/databricks/lakehouse/medallion) where the files are organized in raw (bronze), consolidated (silver), and refined (gold) layers. A [!INCLUDE [fabric-se](includes/fabric-se.md)] can be used to analyze data in the gold layer of medallion architecture if the files are stored in `Delta Lake` format even if they're stored outside the [!INCLUDE [product-name](../includes/product-name.md)] OneLake.

You can use [OneLake shortcuts](../data-engineering/lakehouse-shortcuts.md) to reference gold folders in external Azure Data Lake storage accounts that are managed by Synapse Spark or Azure Databricks engines.
Use the following steps to analyze data in external data lake storage accounts:

1. Create a shortcut that references a folder in [Azure Data Lake storage](../onelake/create-adls-shortcut.md) or [Amazon S3](../onelake/create-s3-shortcut.md) account. Once you enter connection details and credentials, a shortcut is shown in the lakehouse.
2. Switch to the [!INCLUDE [fabric-se](includes/fabric-se.md)] of the lakehouse and find a SQL table that has a name that matches the shortcut name. This SQL table references the folder in ADLS/S3 folder.
3. Query the SQL table that references data in ADLS/S3. The table can be used as any other table in the SQL endpoint (that is, you can join tables that reference data in different storage accounts).

> [!NOTE]
> If the SQL table is not immediately shown in the [!INCLUDE [fabric-se](includes/fabric-se.md)], you might need to wait a few minutes. The SQL table that references data in external storage account is created with a delay.

Any ADLS/S3 data lake folder referenced using a [OneLake shortcut](../data-engineering/lakehouse-shortcuts.md) is analyzed by [!INCLUDE [fabric-se](includes/fabric-se.md)] and a SQL table is created for the referenced data set. The SQL table can be used to expose data in externally managed data lake folders and enable analytics on them.

## Cross-workspace data analytics

A [[!INCLUDE [fabric-se](includes/fabric-se.md)]](data-warehousing.md#sql-endpoint-of-the-lakehouse) enables you to analyze data in [!INCLUDE [fabric-dw](includes/fabric-dw.md)] or lakehouse placed in other [!INCLUDE [product-name](../includes/product-name.md)] workspaces.

- Every [!INCLUDE [product-name](../includes/product-name.md)] lakehouse stores data in OneLake. [Shortcuts](../data-engineering/lakehouse-shortcuts.md) enable you to reference folders in any OneLake location.
- Every [!INCLUDE [product-name](../includes/product-name.md)] warehouse stores table data in OneLake. If a table is append-only, the table data is exposed as `Delta Lake` datasets in OneLake. Shortcuts enable you to reference folders in any OneLake where the warehouse tables are exposed.

Use the following steps to enable cross-workspace data analytics:

1. Create an [OneLake shortcut](../onelake/create-onelake-shortcut.md) that references a table or a folder in a workspace that you can access.
2. Choose a lakehouse or warehouse that contains a table or Delta Lake folder that you want to analyze. Select a table/folder. A shortcut is shown in the lakehouse.
3. Switch to the [!INCLUDE [fabric-se](includes/fabric-se.md)] of the Lakehouse and find a SQL table that has a name that matches the shortcut name. This SQL table references the folder in another workspace. 
4. Query the SQL table that references data in another workspace. The table can be used as any other table in the SQL endpoint (that is, you can join the tables that reference data in different workspaces).

> [!NOTE]
> If the SQL table is not immediately shown in the [!INCLUDE [fabric-se](includes/fabric-se.md)], you might need to wait a few minutes. The SQL table that references data in another workspace is created with a delay.

## Analyzing partitioned data

Data partitioning is a well-known data access optimization technique in data lakes. Partitioned data sets are stored in the hierarchical folders structures in the format `/year=<year>/month=<month>/day=<day>`, where `year`, `month`, and `day` are the partitioning columns. Partitioned data sets enable faster data access if the queries are filtering data using the predicates that filter data by comparing predicate columns with a value.

A [[!INCLUDE [fabric-se](includes/fabric-se.md)]](data-warehousing.md#sql-endpoint-of-the-lakehouse) can represent partitioned Delta Lake data sets as SQL tables and enable you to analyze them.

## Next steps

- [What is a lakehouse?](../data-engineering/lakehouse-overview.md)
- [Create a lakehouse with OneLake](../onelake/create-lakehouse-onelake.md)
- [Understand default Power BI datasets](datasets.md)
- [Load data into the lakehouse](../data-engineering/load-data-lakehouse.md)
- [How to copy data using Copy activity in Data pipeline](../data-factory/copy-data-activity.md)
- [Tutorial: Move data into lakehouse via Copy assistant](../data-factory/tutorial-move-data-lakehouse-copy-assistant.md)
- [Connectivity](connectivity.md)
- [SQL Endpoint of the lakehouse](data-warehousing.md#sql-endpoint-of-the-lakehouse)
- [Query the Warehouse](query-warehouse.md)
