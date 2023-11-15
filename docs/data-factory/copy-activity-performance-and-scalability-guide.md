---
title: Copy activity performance and scalability guide
description: Learn about key factors that affect the performance of data movement in Microsoft Fabric when you use the copy activity.
ms.reviewer: jianleishen
ms.author: jianleishen
author: jianleishen
ms.topic: how-to
ms.custom:
  - build-2023
  - ignite-2023
ms.date: 11/15/2023
---

# Copy activity performance and scalability guide

Sometimes you want to perform a large-scale data migration from data lake or enterprise data warehouse (EDW), to Fabric OneLake. Other times you want to ingest large amounts of data, from different sources into Fabric OneLake, for big data analytics. In each case, it is critical to achieve optimal performance and scalability.

Data Factory pipelines provide a mechanism to ingest data, with the following advantages:

- Handles large amounts of data
- Is highly performant
- Is cost-effective

These advantages are an excellent fit for data engineers who want to build scalable data ingestion pipelines that are highly performant.

After reading this article, you will be able to answer the following questions:

- What level of performance and scalability can I achieve using copy activity for data migration and data ingestion scenarios?
- What steps should I take to tune the performance of the copy activity?
- What performance optimizations can I utilize for a single copy activity run?
- What other external factors to consider when optimizing copy performance?

## Copy performance and scalability achievable using Data Factory pipelines

Data Factory pipelines offer a serverless architecture that allows parallelism at different levels.

This architecture allows you to develop pipelines that maximize data movement throughput for your environment. These pipelines fully utilize the following resources:

- Network bandwidth between the source and destination data stores
- Source or destination data store input/output operations per second (IOPS) and bandwidth

This full utilization means you can estimate the overall throughput by measuring the minimum throughput available with the following resources:

- Source data store
- Destination data store
- Network bandwidth in between the source and destination data stores

Copy is scalable at different levels:

- **Control flow** can start multiple copy activities in parallel, for example using [For Each loop](foreach-activity.md).
- A single copy activity can take advantage of **scalable compute resources**.
    - You can specify the Intelligent throughput optimization to maximum for each copy activity, in a serverless manner.
- A single copy activity reads from and writes to the data store **using multiple threads** [in parallel](copy-activity-performance-and-scalability-guide.md#parallel-copy).

## Copy performance optimization features

The service provides the following performance optimization features:

- [Intelligent throughput optimization](copy-activity-performance-and-scalability-guide.md#intelligent-throughput-optimization)
- [Parallel copy](copy-activity-performance-and-scalability-guide.md#parallel-copy)

### *Intelligent throughput optimization*

Intelligent throughput optimization allows the service to optimize the throughput intelligently by combining the factors of CPU, memory, and network resource allocation and expected cost of running a single copy activity.  The allowed options to empower a copy activity run intelligently are **Auto, Standard, Balanced, Maximum**. You can also specify the value **between 4 and 256**.

The following table lists the recommended value in different copy scenarios:

| Value | Description |
| :-|:-|
| **Auto** | Allow the service to dynamically apply the optimal throughput optimization based on your source-destination pair and data pattern. |
| **Standard** | Allow the service to dynamically apply the throughput optimization under standard compute resources based on your source-destination pair and data pattern. |
| **Balanced** | Allow the service to dynamically apply throughput optimization which balances the throughput and available compute resources based on your source-destination pair and data pattern. |
|  **Maximum** | Allow the service to dynamically apply the throughput optimization by utilizing the maximum available compute resources based on your source-destination pair and data pattern. |

### *Parallel copy*

You can set the 'Degree of copy parallelism' setting in the Settings tab of the Copy activity  to indicate the parallelism you want the copy activity to use. Think of this property as the maximum number of threads within the copy activity. The threads operate in parallel. The threads either read from your source or write to your destination data stores.

The parallel copy is orthogonal to the intelligent throughput optimization setting.  For each copy activity run, by default the service dynamically applies the optimal parallel copy setting based on your source-destination pair and data pattern.

To control the load on machines that host your data stores, or to tune copy performance, you can override the default value and specify a value for the Degree of copy parallelism. The value must be an integer greater than or equal to 1. At run time, for the best performance, the copy activity uses a value that is less than or equal to the value that you set.
