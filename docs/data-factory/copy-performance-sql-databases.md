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

