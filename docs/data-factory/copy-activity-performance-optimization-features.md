---
title: Copy activity performance optimization features
description: Learn about features that optimize the performance of data movement in Microsoft Fabric when you use the copy activity.
ms.reviewer: jianleishen
ms.author: jianleishen
author: jianleishen
ms.topic: how-to
ms.custom: build-2023
ms.date: 10/24/2023
---

# Copy activity performance optimization features

This article outlines the copy activity performance optimization features that you can leverage in Data Factory pipelines.

## Intelligent throughput optimization

Intelligent throughput optimization allows the service to optimize the throughput intelligently by combining the factors of CPU, memory, and network resource allocation and expected cost of running a single copy activity.  The allowed options to empower a copy activity run intelligently are **Auto, Standard, Balanced, Maximum**. You can also specify the value **between 2 and 256**.

If not specified or you choose "Auto" on the UI, the service dynamically applies the optimal DIU setting based on your source-sink pair and data pattern. The following table lists the supported DIU ranges and default behavior in different copy scenarios:

A Data Integration Unit is a measure that represents the power (a combination of CPU, memory, and network resource allocation) of a single unit within the service. Data Integration Unit only applies to Azure integration runtime, but not self-hosted integration runtime.

Throughput. When you choose "Auto", the optimal setting is dynamically applied based on your source-destination pair and data pattern. Custom value can be 2-256 while higher value implies more gains on throughput.

Represents the preference of the power (a combination of CPU, memory, and network resource allocation) of a single unit within the copy activity.

The allowed DIUs to empower a copy activity run is **between 2 and 256**. If not specified or you choose "Auto" on the UI, the service dynamically applies the optimal DIU setting based on your source-sink pair and data pattern. The following table lists the supported DIU ranges and default behavior in different copy scenarios:

|Copy scenario|Supported DIU range|Default DIUs determined by service|
|:---|:---|:---|
|Between file stores|- **Copy from or to single file**: 2-4<br>- **Copy from and to multiple files**: 2-256 depending on the number and size of the files<br><br>For example, if you copy data from a folder with 4 large files and choose to preserve hierarchy, the max effective DIU is 16; when you choose to merge file, the max effective DIU is 4.|Between 4 and 32 depending on the number and size of the files|
|From file store to non-file store|- **Copy from single file**: 2-4<br>- **Copy from multiple files**: 2-256 depending on the number and size of the files<br><br>For example, if you copy data from a folder with 4 large files, the max effective DIU is 16.|- **Copy into Azure SQL Database or Azure Cosmos DB**: between 4 and 16 depending on the sink tier (DTUs/RUs) and source file pattern<br>- **Copy into Azure Synapse Analytics** using PolyBase or COPY statement: 2<br>Other scenario: 4|
|From non-file store to file store|- **Copy from partition-option-enabled data stores** (including Azure Database for PostgreSQL, [Azure SQL Database](connector-azure-sql-database-copy-activity.md), Azure SQL Managed Instance, [Azure Synapse Analytics](connector-azure-synapse-analytics-copy-activity.md), Oracle, Netezza, SQL Server, and Teradata): 2-256 when writing to a folder, and 2-4 when writing to one single file. Note per source data partition can use up to 4 DIUs.<br>- **Other scenarios**: 2-4|- **Copy from REST or HTTP**: 1<br>- **Copy from Amazon Redshift** using UNLOAD: 2<br>- **Other scenario**: 4|
|Between non-file stores|- **Copy from partition-option-enabled data stores** (including Azure Database for PostgreSQL, [Azure SQL Database](connector-azure-sql-database-copy-activity.md), Azure SQL Managed Instance, [Azure Synapse Analytics](connector-azure-synapse-analytics-copy-activity.md), Oracle, Netezza, SQL Server, and Teradata): 2-256 when writing to a folder, and 2-4 when writing to one single file. Note per source data partition can use up to 4 DIUs.<br>- **Other scenarios**: 2-4|- **Copy from REST or HTTP**: 1<br>- **Other scenario**: 4|

You  can see the DIUs used for each copy run in the copy activity monitoring view or activity output. For more information, see [Copy activity monitoring](monitor-pipeline-runs.md). To override this default, specify a value for the `Intelligent throughput optimization` property as follows. The *actual number of DIUs* that the copy operation uses at run time is equal to or less than the configured value, depending on your data pattern.

You will be charged **# of used DIUs * copy duration * unit price/DIU-hour**. See the current prices here. Local currency and separate discounting may apply per subscription type.

## Parallel copy

You can set parallel copy (`parallelCopies` property in the JSON definition of the Copy activity, or Degree of parallelism setting in the **Settings** tab of the Copy activity properties in the user interface) on copy activity to indicate the parallelism that you want the copy activity to use. You can think of this property as the maximum number of threads within the copy activity that read from your source or write to your sink data stores in parallel.

For each copy activity run, by default the service dynamically applies the optimal parallel copy setting based on your source-sink pair and data pattern.

> [!TIP]
> The default behavior of parallel copy usually gives you the best throughput, which is auto-determined by the service based on your source-sink pair, data pattern and number of DIUs or the Self-hosted IR's CPU/memory/node count. Refer to Troubleshoot copy activity performance on when to tune parallel copy.

The following table lists the parallel copy behavior:

|Copy scenario|Parallel copy behavior|
|:---|:---|
|Between file stores|`parallelCopies` determines the parallelism **at the file level**. The chunking within each file happens underneath automatically and transparently. It's designed to use the best suitable chunk size for a given data store type to load data in parallel.<br><br>The actual number of parallel copies copy activity uses at run time is no more than the number of files you have. If the copy behavior is **mergeFile** into file sink, the copy activity can't take advantage of file-level parallelism.|
|From file store to non-file store|- When copying data into Azure SQL Database or Azure Cosmos DB, default parallel copy also depend on the sink tier (number of DTUs/RUs).<br>- When copying data into Azure Table, default parallel copy is 4.|
|From non-file store to file store|- When copying data from partition-option-enabled data store (including [Azure SQL Database](connector-azure-sql-database-copy-activity.md), Azure SQL Managed Instance, [Azure Synapse Analytics](connector-azure-synapse-analytics-copy-activity.md), Oracle, Amazon RDS for Oracle, Netezza, SAP HANA, SAP Open Hub, SAP Table, SQL Server, Amazon RDS for SQL Server and Teradata), default parallel copy is 4. The actual number of parallel copies copy activity uses at run time is no more than the number of data partitions you have. When use Self-hosted Integration Runtime and copy to Azure Blob/ADLS Gen2, note the max effective parallel copy is 4 or 5 per IR node.<br>- For other scenarios, parallel copy doesn't take effect. Even if parallelism is specified, it's not applied.|
|Between non-file stores|- When copying data into Azure SQL Database or Azure Cosmos DB, default parallel copy also depend on the sink tier (number of DTUs/RUs).<br>- When copying data from partition-option-enabled data store (including [Azure SQL Database](connector-azure-sql-database-copy-activity.md), Azure SQL Managed Instance, [Azure Synapse Analytics](connector-azure-synapse-analytics-copy-activity.md), Oracle, Amazon RDS for Oracle, Netezza, SAP HANA, SAP Open Hub, SAP Table, SQL Server, Amazon RDS for SQL Server and Teradata), default parallel copy is 4.<br>- When copying data into Azure Table, default parallel copy is 4.|

To control the load on machines that host your data stores, or to tune copy performance, you can override the default value and specify a value for the parallelCopies property. The value must be an integer greater than or equal to 1. At run time, for the best performance, the copy activity uses a value that is less than or equal to the value that you set.

When you specify a value fsor the parallelCopies property, take the load increase on your source and sink data stores into account. Also consider the load increase to the self-hosted integration runtime if the copy activity is empowered by it. This load increase happens especially when you have multiple activities or concurrent runs of the same activities that run against the same data store. If you notice that either the data store or the self-hosted integration runtime is overwhelmed with the load, decrease the `parallelCopies` value to relieve the load.

## Staged copy

When you copy data from a source data store to a sink data store, you might choose to use Azure Blob storage or Azure Data Lake Storage Gen2 as an interim staging store. Staging is especially useful in the following cases:

- **You want to ingest data from various data stores into Azure Synapse Analytics via PolyBase, copy data from/to Snowflake, or ingest data from Amazon Redshift/HDFS performantly.** Learn more details from:
    - Use PolyBase to load data into Azure Synapse Analytics.
    - [Snowflake connector](connector-snowflake-copy-activity.md)
    - Amazon Redshift connector
    - HDFS connector
- **You don't want to open ports other than port 80 and port 443 in your firewall because of corporate IT policies.** For example, when you copy data from an on-premises data store to an Azure SQL Database or an Azure Synapse Analytics, you need to activate outbound TCP communication on port 1433 for both the Windows firewall and your corporate firewall. In this scenario, staged copy can take advantage of the self-hosted integration runtime to first copy data to a staging storage over HTTP or HTTPS on port 443, then load the data from staging into SQL Database or Azure Synapse Analytics. In this flow, you don't need to enable port 1433.
- **Sometimes it takes a while to perform a hybrid data movement (that is, to copy from an on-premises data store to a cloud data store) over a slow network connection.** To improve performance, you can use staged copy to compress the data on-premises so that it takes less time to move data to the staging data store in the cloud. Then you can decompress the data in the staging store before you load into the destination data store.
