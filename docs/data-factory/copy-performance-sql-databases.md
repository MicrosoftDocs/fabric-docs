---
title: Copy activity performance with SQL databases
description: Learn about settings and practices to optimize Data pipeline Copy activities for SQL databases in Data Factory for Microsoft Fabric.
ms.reviewer: jonburchel
ms.author: makromer
author: kromerm
ms.topic: best-practice
ms.date: 05/03/2024
---

# Copy activity performance with SQL databases

In this article, we discuss techniques to help you to optimize Copy activity with a SQL database source, using an Azure SQL Database as a reference. We cover different aspects of optimization including data transfer speeds, cost, monitoring, ease of development, and balancing these various considerations for the best outcome.

## Copy activity options

> [!NOTE]
> The metrics included in this article are the results of test cases comparing and contrasting behavior across various capabilities, and are not formal engineering benchmarks. All test cases are moving data from East US 2 to West US 2 regions.  

When starting with a Data pipeline Copy activity, it is important to understand the source and destination systems prior to development, understand what you are optimizing for, and understand how to monitor the source, destination, and Data pipeline for the best resource utilization, performance, and consumption.

When sourcing from an Azure SQL Database, it is important to understand:

- Input/output operations per second (IOPS)
- Data volume
- DDL of the table(s)
- Partitioning schema(s)
- Primary Key or other column with a good distribution of data (skew)
- Compute allocated and associated limitations such as number of concurrent connections

The same applies to your destination. With an understanding of both, you can design a Data pipeline to operate within the bounds and limits of both the source and destination while optimizing for your priorities.  

> [!NOTE]
> Network bandwidth between the source and destination, along with input/output per second (IOPs) of each, can both be a bottleneck to throughput, and it is recommended to understand these boundaries. However, networking is not within the scope of this article.

Once you understand both your source and destination, you can use various options in the Copy activity to improve its performance for your priorities. These options may include: 

- **Source partitioning options** - None, Physical partition, Dynamic range
- **Source isolation level** - None, Read uncommitted, Read committed, Snapshot
- **Intelligent throughput optimization setting** - Auto, Standard, Balanced, Maximum
- **Degree of copy parallelism setting** - Auto, Specified value
- **Logical partitioning** - Pipeline design to generate multiple concurrent Copy activities

## Source details: Azure SQL Database

To provide concrete examples, we tested multiple scenarios, moving data from an Azure SQL Database into both Fabric Lakehouse (tables) and Fabric Warehouse tables. In these examples, we tested four source tables. All have the same schema and record count. One uses a heap, a second uses a clustered index, while the third and fourth use 8 and 85 partitions respectively. This example used a trial capacity (F64) in Microsoft Fabric (West US 2).

- Service Tier: General Purpose
- Compute Teir: Serverless
- Hardware Configuration: Standard-series (Gen5)
  - Max vCores: 80
  - Min vCores 20
- Record Count: 1,500,000,000
- Region: East US 2

## Default Evaluation

Before setting the source **Partition option**, it is important to understand the default behavior of the Copy activity.

The default settings are:

- Source
    - **Partition option** - _None_
    - **Isolation level** - _None_

:::image type="content" source="media/copy-performance-sql-databases/source-settings.png" alt-text="Screenshot showing the data source settings for the Azure SQL database.":::

- Settings:
    - **Intelligent throughput optimization** - _Auto_
    - **Degree of copy parallelism** - _Auto_

:::image type="content" source="media/copy-performance-sql-databases/additional-settings.png" alt-text="Screenshot showing additional settings for the Azure SQL database.":::

Using the default settings, the service took over 2 hours per copy activity to load 1.5 billion records into each destination. These values are the reference point used to measure performance improvements. Before making changes, always evaluate current performance to create a reference point of comparison.

|Destination  |Partition option  |Degree of copy parallelism  |Used parallel copies  |Total duration|
|---------|---------|---------|---------|--------------|
|Fabric Warehouse     |None         |Auto         |1         |02:23:21              |
|Fabric Lakehouse     |None         |Auto         |1         |02:10:37              |

In this article, we will focus on total duration. Total duration encompasses additional stages such as queue, pre-copy script, and transfer duration. For more information on these stages, refer to [Copy activity execution details](copy-activity-performance-troubleshooting.md#understand-copy-activity-execution-details). For an extensive overview of Copy activity properties for Azure SQL Database as the source, refer to [Azure SQL Database source properties](connector-azure-sql-database-copy-activity.md#source) for the Copy activity.

## Settings

### Intelligent throughput optimization (ITO)

ITO determines the maximum amount of CPU, memory, and network resource allocation the activity can consume. If you set ITO to _Maximum_ (or 256), the service will select what it believes will allow for the most optimized throughput. For the purpose of this article, all test cases have ITO set to _Maximum_, although the service uses only what it requires and the actual value is lower than 256. 

For a deeper understanding of ITO, refer to [Intelligent throughput optimization](copy-activity-performance-and-scalability-guide.md#intelligent-throughput-optimization)

> [!NOTE]
> Staging is required when the Copy activity sink is Fabric Warehouse. Options such as **Degree of copy parallelism** and **Intelligent throughput optimization** only apply in that case from Source to Staging. Test cases to Lakehouse did not have staging enabled.

### Partition options

When your source is a relational database like Azure SQL database, in the **Advanced** section, you have the option to specify a **Partition option**. By default, this is set to _None_, with two additional options of _Physical partitions of table_ and _Dynamic Range_.

