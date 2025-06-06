---
title: "Best practices for getting the best performance with Dataflows Gen2 in Fabric Data Factory"
description: "This article provides best practices for optimizing the performance of Dataflows Gen2 in Fabric Data Factory. By following these guidelines, you can enhance the efficiency and speed of your data integration processes."
author: luitwieler
ms.author: jeluitwi
ms.reviewer: dougklo
ms.topic: concept-article
ms.date: 06/06/2025
ms.custom: dataflows
---

# Best practices for getting the best performance with Dataflows Gen2

This article provides best practices for optimizing the performance of Dataflows Gen2 in Fabric Data Factory. By following these guidelines, you can enhance the efficiency and speed of your data integration processes.

## Query optimization

To achieve optimal performance in Dataflows Gen2, it's essential to design your queries with efficiency in mind. Here are some key practices

### Filter early and often

Apply filters as early as possible in your dataflow to reduce the amount of data processed downstream. This minimizes the workload on subsequent transformations and speeds up the overall execution time. For example, if you're working with a large dataset, filter out unnecessary rows before performing any aggregations or joins.

### Take advantage of pushdown and folding capabilities

When working with data sources that support query folding, such as SQL databases, leverage the pushdown capabilities to filter and transform data at the source. This reduces the amount of data transferred over the network and minimizes processing time in Dataflows Gen2. For instance, if you're using a SQL database, keep an eye on the query folding indicators in the dataflow designer to ensure that your transformations are being pushed down to the source. If you see that a transformation is not folding, consider splitting the query into two and using a staging Lakehouse or Warehouse to perform the transformation before the final output.

### Use parameterization to optimize design-time experience

Large data previews during design-time can slow down authoring and increase resource usage. Use parameterization to limit the size of data previews (for example, by filtering on a date or ID parameter). This approach helps keep the design environment responsive and efficient.

### Avoid unnecessary transformations

Minimize the number of transformations in your dataflow. Each transformation adds processing overhead, so only include those that are necessary for your final output. For example, if you can achieve the same result with a single transformation instead of multiple steps, opt for the simpler approach.

## Dataflow optimization

To optimize the performance of your dataflows, consider the following best practices.

### Staging data

Staging is a powerful technique that can significantly improve performance, especially for large datasets or complex transformations. By staging data you can leverage compute resources of the staging Lakehouse and staging warehouse to perform transformations more efficiently. This approach allows you to break down complex dataflows into manageable steps, reducing the overall processing time. However, be mindful that staging introduces additional steps and storage operations, which can increase overall refresh time and costs. Use staging judiciously.

### Fast Copy

When moving data without non folding transformations, use Fast Copy to optimize data transfer. Fast Copy is designed for high-throughput data movement and can significantly reduce runtime. However, be cautious: if you add transformations in the same query as a Fast Copy operation, it can disable Fast Copy if the transformations do not fold to the source system. In such cases, consider separating the query into two steps: one for the Fast Copy operation and another for the transformations using the staging Lakehouse or Warehouse compute.

### Understand output formats and their impact

Dataflow Gen2 emits data in Delta Parquet format, which is different from Gen1's CSV output. While Delta Parquet may result in longer ETL runtimes compared to CSV, it enables powerful downstream capabilities such as Direct Lake, Lakehouses, and Warehouses, allowing these services to consume data efficiently without additional processing or cost.

### Incremental refresh

When working with large datasets, consider using incremental refresh to process only the new or changed data since the last refresh. This approach reduces the amount of data processed and speeds up the overall execution time. Incremental refresh is particularly useful for scenarios where data is updated frequently, such as in transactional systems.
