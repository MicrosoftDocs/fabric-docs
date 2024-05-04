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

In this article, we discuss techniques to help you to optimize Copy activity with an SQL database source, using an Azure SQL Database as a reference. We cover different aspects of optimization including data transfer speeds, cost, monitoring, ease of development, and balancing these various considerations for the best outcome.

## Copy activity options

> [!NOTE]
> The metrics included in this article are the results of test cases comparing and contrasting behavior across various capabilities, and are not formal engineering benchmarks. All test cases are moving data from East US 2 to West US 2 regions.  

When starting with a Data pipeline Copy activity, it's important to understand the source and destination systems prior to development, understand what you are optimizing for, and understand how to monitor the source, destination, and Data pipeline for the best resource utilization, performance, and consumption.

When sourcing from an Azure SQL Database, it's important to understand:

- Input/output operations per second (IOPS)
- Data volume
- DDL of one or more tables
- Partitioning schemas
- Primary Key or other column with a good distribution of data (skew)
- Compute allocated and associated limitations such as number of concurrent connections

The same applies to your destination. With an understanding of both, you can design a Data pipeline to operate within the bounds and limits of both the source and destination while optimizing for your priorities.  

> [!NOTE]
> Network bandwidth between the source and destination, along with input/output per second (IOPs) of each, can both be a bottleneck to throughput, and it is recommended to understand these boundaries. However, networking is not within the scope of this article.

Once you understand both your source and destination, you can use various options in the Copy activity to improve its performance for your priorities. These options could include: 

- **Source partitioning options** - None, Physical partition, Dynamic range
- **Source isolation level** - None, Read uncommitted, Read committed, Snapshot
- **Intelligent throughput optimization setting** - Auto, Standard, Balanced, Maximum
- **Degree of copy parallelism setting** - Auto, Specified value
- **Logical partitioning** - Pipeline design to generate multiple concurrent Copy activities

## Source details: Azure SQL Database

To provide concrete examples, we tested multiple scenarios, moving data from an Azure SQL Database into both Fabric Lakehouse (tables) and Fabric Warehouse tables. In these examples, we tested four source tables. All have the same schema and record count. One uses a heap, a second uses a clustered index, while the third and fourth use 8 and 85 partitions respectively. This example used a trial capacity (F64) in Microsoft Fabric (West US 2).

- Service Tier: General Purpose
- Compute Tier: Serverless
- Hardware Configuration: Standard-series (Gen5)
  - Max vCores: 80
  - Min vCores 20
- Record Count: 1,500,000,000
- Region: East US 2

## Default Evaluation

Before setting the source **Partition option**, it's important to understand the default behavior of the Copy activity.

The default settings are:

- Source
    - **Partition option** - _None_
    - **Isolation level** - _None_

    :::image type="content" source="media/copy-performance-sql-databases/source-settings.png" alt-text="Screenshot showing the data source settings for the Azure SQL database.":::

- Advanced settings
    - **Intelligent throughput optimization** - _Auto_
    - **Degree of copy parallelism** - _Auto_

    :::image type="content" source="media/copy-performance-sql-databases/additional-settings.png" alt-text="Screenshot showing additional settings for the Azure SQL database.":::

When we tested using the default settings, the service took over 2 hours per copy activity to load 1.5 billion records into each destination. These values form our reference point used to measure performance improvements. Before making changes, always evaluate baseline performance to create a reference point of comparison.

|Destination  |Partition option  |Degree of copy parallelism  |Used parallel copies  |Total duration|
|---------|---------|---------|---------|--------------|
|Fabric Warehouse     |None         |Auto         |1         |02:23:21              |
|Fabric Lakehouse     |None         |Auto         |1         |02:10:37              |

In this article, we focus on total duration. Total duration encompasses other stages such as queue, precopy script, and transfer duration. For more information on these stages, see [Copy activity execution details](/azure/data-factory/copy-activity-performance-troubleshooting#understand-copy-activity-execution-details). For an extensive overview of Copy activity properties for Azure SQL Database as the source, refer to [Azure SQL Database source properties](connector-azure-sql-database-copy-activity.md#source) for the Copy activity.

## Settings

### Intelligent throughput optimization (ITO)

ITO determines the maximum amount of CPU, memory, and network resource allocation the activity can consume. If you set ITO to _Maximum_ (or 256), the service selects the highest value that provides the most optimized throughput. In this article, all test cases have ITO set to _Maximum_, although the service uses only what it requires and the actual value is lower than 256. 

For a deeper understanding of ITO, refer to [Intelligent throughput optimization](copy-activity-performance-and-scalability-guide.md#intelligent-throughput-optimization).

> [!NOTE]
> Staging is required when the Copy activity sink is Fabric Warehouse. Options such as **Degree of copy parallelism** and **Intelligent throughput optimization** only apply in that case from Source to Staging. Test cases to Lakehouse did not have staging enabled.

### Partition options

When your source is a relational database like Azure SQL database, in the **Advanced** section, you can specify a **Partition option**. By default, this setting is set to _None_, with two other options of _Physical partitions of table_ and _Dynamic Range_.

#### Dynamic range

##### Heap table
  
Dynamic Range allows the service to intelligently generate queries against the source. The number of queries generated is equal to the number of **Used parallel copies** the service selected at runtime. The **Degree of copy parallelism** and **Used parallel copies** are important to consider when optimizing the use of the **Dynamic range** partition option.

- **Partition bounds**
  The Partition upper and lower bounds are optional fields that allow you to specify the partition stride. In these test cases, we predefined both the upper and lower bounds. If these fields aren't specified, the system incurs extra overhead in querying the source to determine the ranges. For optimal performance, obtain the boundaries beforehand, especially for one-time historical loads. 

  For more information reference the table in, the [Parallel copy from SQL database](/azure/data-factory/connector-azure-sql-database?tabs=data-factory#parallel-copy-from-sql-database) section of the Azure SQL Database connector article.
  
  The following SQL query determines our range min and max:

  :::image type="content" source="media/copy-performance-sql-databases/sql-min-max-keys.png" alt-text="Screenshot of a query to determine the min and max bounds of the table.":::

  Then we provide those details in the **Dynamic range** configuration.

  :::image type="content" source="media/copy-performance-sql-databases/dynamic-range.png" alt-text="Screenshot showing the selection of the Dynamic range Partition option with column, upper, and lower bounds specified.":::

  Here's an example query generated by the Copy activity using _Dynamic range_:

  ```sql
  SELECT * FROM [dbo].[orders] WHERE [o_orderkey] > '4617187501' AND [o_orderkey] <= '4640625001'
  ```

- **Degree of copy parallelism**
  
  By default, _Auto_ is assigned for the **Degree of copy parallelism**. However, _Auto_ might not achieve the optimal number of parallel copies. **Parallel copies** correlates to the number of sessions established on the source database. By specifying too many parallel copies, the source database CPU is at risk of being overtaxed, leading to queries being in a suspended state.

  In the original test case for **Dynamic range** using _Auto_, the service actually generated 251 parallel copies at runtime. By specifying a value in **Degree of copy parallelism**, you set the maximum number of parallel copies. This allows you to limit the number of concurrent sessions made to your source, allowing you to better control your resource management. In these test cases, by specifying 50 as the value, both total duration as well as source resource utilization improved.

  | Destination | Partition Option | Degree of copy parallelism | Used Parallel Copies | Total Duration |
  |-------------|------------------|----------------------------|----------------------|----------------|
  | Warehouse   | None             | Auto                       | 1                    | 02:23:21       |
  | Warehouse   | Dynamic Range    | 50                         | 50                   | 00:13:05       |

  **Dynamic range** with a **Degree of parallel copies** can significantlyt improve performance. However, this requires either predefining the boundaries or allowing the service to determine the values at runtime, which can have a variable impact on total duration, depending on the DDL and data volume of the source table. In addition, this should also be paired with an understanding of how many parallel copies your source can handle. If the value is too high, there can be a negative impact on your source system and copy activity performance.

  For more information on parallel copies refer to [Copy activity performance features: Parallel copy](/azure/data-factory/copy-activity-performance-features#parallel-copy)

- **Fabric Warehouse**

  By default, **Isolation level** is not specified, and **Degree of parallelism** is set to _Auto_.

  | Destination | Partition option | Degree of copy parallelism | Used parallel copies | Total duration |
  |-------------|------------------|----------------------------|----------------------|----------------|
  | Warehouse   | None             | Auto                       | 1                    | 02:23:21       |
  | Warehouse   | Dynamic Range    | Auto                       | 251                  | 00:39:03       |

- **Fabric Lakehouse (Tables)**

  | Destination | Partition option | Degree of copy parallelism | Used parallel copies | Total duration |
  |-------------|------------------|----------------------------|----------------------|----------------|
  | Lakehouse   | None             | Auto                       | 1                    | 02:23:21       |
  | Lakehouse   | Dynamic Range    | Auto                       | 251                  | 00:36:40       |
  | Lakehouse   | Dynamic Range    | 50                         | 50                   | 00:12:01       |

##### Clustered index

Compared to a heap table, a table with a clustered key index on the column selected for the dynamic range’s partition column drastically improved performance and resource utilization, even when degree of copy parallelism was set to auto.

- **Fabric Warehouse**

  | Destination | Partition option | Degree of copy parallelism | Used parallel copies | Total duration |
  |-------------|------------------|----------------------------|----------------------|----------------|
  | Warehouse   | None             | Auto                       | 1                    | 02:23:21       |
  | Warehouse   | Dynamic Range    | Auto                       | 251                  | 00:09:02       |
  | Warehouse   | Dynamic Range    | 50                         | 50                   | 00:08:38       |

- **Fabric Lakehouse (Tables)**

  | Destination | Partition option | Degree of copy parallelism | Used parallel copies | Total duration |
  |-------------|------------------|----------------------------|----------------------|----------------|
  | Lakehouse   | None             | Auto                       | 1                    | 02:23:21       |
  | Lakehouse   | Dynamic Range    | Auto                       | 251                  | 00:06:44       |
  | Lakehouse   | Dynamic Range    | 50                         | 50                   | 00:06:34       |

#### Logical partitioning design

- **Fabric Warehouse**
- **Fabric Lakehouse**

#### Physical partitions of table

- **Fabric Warehouse**
- **Fabric Lakehouse (Tables)**

### Isolation levels

### ITO and capacity consumption

### Summary

#### Guidelines

#### Test cases

- **Fabric Warehouse**
- **Fabric Lakehouse (Tables)**

## Related content

- [How to copy data using copy activity](copy-data-activity.md)
- [Copy activity performance and scalability guide](copy-activity-performance-and-scalability-guide.md)
- [Copy and transform data in Azure SQL Database](/azure/data-factory/connector-azure-sql-database?tabs=data-factory#parallel-copy-from-sql-database)
- [Configure Azure SQL Database in a copy activity](connector-azure-sql-database-copy-activity.md)
- [Create partitioned tables and indexes in Azure SQL Database](/sql/relational-databases/partitions/create-partitioned-tables-and-indexes)
- Microsoft Fabric Blog [Data Pipeline Performance Improvement Part 3 - Gaining more than 50% improvement for Historical Loads](https://blog.fabric.microsoft.com/en-us/blog/data-pipeline-performance-improvement-part-3-gaining-more-than-50-improvement-for-historical-loads)
