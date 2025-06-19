---
title: "Best practices for getting the best performance with Dataflow Gen2 in Fabric Data Factory"
description: "This article provides best practices for optimizing the performance of Dataflow Gen2 in Fabric Data Factory. By following these guidelines, you can enhance the efficiency and speed of your data integration processes."
author: luitwieler
ms.author: jeluitwi
ms.reviewer: dougklo
ms.topic: concept-article
ms.date: 06/19/2025
ms.custom: dataflow
---

# Best practices for getting the best performance with Dataflow Gen2

This article provides best practices for optimizing the performance of Dataflow Gen2 in Fabric Data Factory. By following these guidelines, you can enhance the efficiency and speed of your data integration processes.

## What are the key areas to focus on for performance optimization?

Within the dataflow end to end experience, there are several key areas to focus on for performance optimization. These include the datasource, the dataflow engine and the data destination. Each of these components and the paths in between play a crucial role in the overall performance of your dataflow, and optimizing them can lead to significant improvements in execution time and resource utilization.

:::image type="content" source="media/dataflow-gen2-performance-best-practices/dataflow-backend-overview.png" alt-text="Dataflow Gen2 backend overview":::

### Data movement

Data movement is a critical aspect of dataflow performance. It involves the transfer of data between various components, such as data sources, staging areas, and final destinations. Efficient data movement can significantly reduce execution time and resource consumption. In Dataflow Gen2, data movement is optimized through techniques like Fast Copy, which allows for high-throughput data transfer without the overhead of transformations that do not fold to the source system. Learn more about [Fast Copy](./dataflows-gen2-fast-copy.md).

### Data transformation

Data transformation is the process of converting data from one structure to another, often involving operations like filtering, aggregating, and joining. In Dataflow Gen2, transformations are designed to be efficient and leverage query folding capabilities whenever possible. Query folding allows transformations to be pushed down to the source system, reducing the amount of data transferred and processed in Dataflow Gen2. This is particularly important for large datasets, as it minimizes the workload on the dataflow engine and speeds up execution time. To lean more about query folding, see [Query folding](.../power-query/query-folding-basics). Also follow other best practices for query optimization, such as filtering early and often, using parameterization to limit data previews, and avoiding unnecessary transformations in your dataflow. To learn more about query optimization, see [Query optimization](#.../power-query/best-practices).


### Staging data and warehouse compute

Staging data is a technique used to improve performance by temporarily storing intermediate results in a staging area. Dataflow gen2 comes with a staging Lakehouse and a staging Warehouse, which can be used to perform transformations more efficiently. By staging data, you can leverage the compute resources of these staging areas to break down complex dataflows into manageable steps, reducing overall processing time. This is particularly useful for large datasets or complex transformations that would otherwise take a long time to execute in a single step. You can consider staging locations as temporary storage area that allows you to fold transformations. This approach is especially beneficial when working with data sources that do not support query folding or when transformations are too complex to be pushed down to the source system. To leverage staging effectively, you can keep an eye on the folding indicators in the dataflow editor to ensure that your transformations are being pushed down to the source. If you notice that a transformation is not folding, consider splitting the query into two queries and apply the transformation in the second query. Endable staging on the first query to perform the transformation in the staging Lakehouse or Warehouse compute. This approach allows you to take advantage of the compute resources available in the staging areas while ensuring that your dataflow remains efficient and responsive.

## Scenarios and what to do

Here are some common scenarios you might encounter when working with Dataflow Gen2, along with recommended actions to optimize performance. These scenarios are examples of how to apply the best practices discussed earlier in this article to real-world situations. Be aware that performance optimization is an ongoing and very specific to your scenario, and you may need to adjust your approach based on the specific characteristics of your own data and transformations.

### Scenario 1: Slow data movement

In this scenario, you notice that data movement between your data source and the staging area or to your final destination is taking longer than expected. This can be due to several factors, such as network latency, large dataset sizes, or inefficient data transfer methods. 




### Scenario 2: Complex transformations and long execution times

In this scenario, you have a dataflow with multiple complex transformations, such as joins, aggregations, and filtering. The execution time is longer than desired, and you want to optimize the performance of these transformations. 


### Scenario 3: Lakehouse destination with staging enabled queries

In this scenario, you are using a Lakehouse destination for your dataflow, and you have enabled staging to perform transformations before writing the final output. However, you notice that the overall refresh time is longer than expected, and you want to optimize the performance of this process.

In this case the data movement from the staging Warehouse to the Lakehouse destination can be a bottleneck. To improve performance, consider changing the destination to a Warehouse instead of a Lakehouse. This allows you to leverage the compute resources of the staging Warehouse for transformations and write the final output directly to the Warehouse destination. The path of data movement becomes more efficient, as it avoids the additional overhead of writing to a Lakehouse. If a Lakehouse destination is necessary, consider using a shortcut to avoid re-egressing data from the staging Warehouse to the Lakehouse. This approach can significantly reduce the overall refresh time and improve performance.


### Scenario 4: Dataflow with non-folding transformations

In this scenario, you have a dataflow that includes transformations that do not fold to the source system, such as certain date or string manipulations. These transformations can lead to longer execution times and increased resource usage. 

In this case, consider separating the query into two steps: one for the Fast Copy operation with query folding and another for the transformations using the staging Lakehouse or Warehouse compute. This approach allows you to take advantage of Fast Copy for high-throughput data movement while performing the necessary transformations in a separate step. By doing so, you can optimize the performance of your dataflow and reduce the overall execution time. 

### Scenario 5: Large data previews during design-time

In this scenario, you are working on a dataflow with large datasets, and the design-time experience is slow due to the size of the data previews. This can make it difficult to author and test your dataflow effectively. 

In this case, consider using parameterization to limit the size of data previews. By applying filters based on parameters, such as a date range or specific IDs, you can reduce the amount of data displayed in the design-time environment. This approach helps keep the design environment responsive and efficient, allowing you to focus on authoring and testing your dataflow without being hindered by large data previews. Additionally, you can adjust the parameters during runtime to retrieve the full dataset when needed.

### Scenario 6: Performance is slower of Dataflow Gen2 compared to Dataflow Gen1

In this scenario, you notice that the performance of Dataflow Gen2 is slower than that of Dataflow Gen1, particularly in terms of execution time and resource usage. This can be due to several factors, including the differences in optimization techniques and output formats used in Dataflow Gen2.

Dataflow Gen2 emits data in Delta Parquet format when you use staging or lakehouse destinations, which is different from Dataflow Gen1's CSV output. While Delta Parquet may result in longer ETL runtimes compared to CSV, it enables powerful downstream capabilities such as Direct Lake, Lakehouses, and Warehouses, allowing these services to consume data efficiently without additional processing or cost. This means that while the initial execution time may be longer, the overall performance and efficiency of downstream processes can be significantly improved and can lead to better long-term performance of your data integration workflows.

### Scenario 7: I am working with a large transactional dataset that is updated frequently and I want to optimize the refresh time

In this scenario, you are dealing with a large transactional dataset that is updated frequently, and you want to optimize the refresh time of your dataflow. This can be challenging due to the volume of data and the need to process only the new or changed records.

In this case, consider using incremental refresh or the pattern to incrementally amass data. Incremental refresh allows you to process only the new or changed data since the last refresh, reducing the amount of data processed and speeding up the overall execution time. This approach is particularly useful for scenarios where data is updated frequently, such as in transactional systems. By implementing incremental refresh, you can optimize the performance of your dataflow and ensure that your data integration processes remain efficient and responsive. Learn more about [Incremental refresh](./dataflow-gen2-incremental-refresh.md) or learn about the [Incremental amassing data pattern](./tutorial-setup-incremental-refresh-with-dataflows-gen2.md).

### Scenario 8: I am having a lot of dataflows in my workspace and I want to optimize the performance of my data integration processes

In this scenario, you have a large number of dataflows in your workspace, and you want to optimize the performance of your data integration processes. This can lead to increased resource usage and longer execution times if not managed effectively. 

In this case, consider consolidating your dataflows where possible or assigning them to different workspaces based on their resource requirements. This approach helps distribute the workload more evenly and reduces the overall resource consumption in a single workspace. The reason for this is that each dataflow relies on the same compute resources in the workspace, and having too many dataflows can lead to contention for those staging resources, resulting in slower execution times. By organizing your dataflows into multiple workspaces, you can improve the performance of your data integration processes and ensure that each dataflow has access to the necessary compute resources without being hindered by resource contention. As a general guideline, aim for a maximum of 50 dataflows per workspace to maintain optimal performance. This number can vary based on the complexity and resource requirements of your dataflows, so monitor performance and adjust as needed.

### Scenario 9: I am using a gateway to connect to my on-premises data source and I want to optimize the performance of my dataflow

In this scenario, you are using a gateway to connect to your on-premises data source, and you want to optimize the performance of your dataflow. Gateways can introduce additional latency and overhead, which can impact the overall performance of your dataflow. 

In this case, consider splitting your dataflow into two separate dataflows: one for data movement from the on-premises data source to a data destination (such as a Lakehouse or Warehouse) and another for transformations and final output. This approach allows you to optimize the data movement step by leveraging Fast Copy for high-throughput data transfer, while keeping the transformation step focused on processing the data efficiently and reducing the overall execution time. By separating the data movement and transformation steps, you can reduce the impact of gateway latency and capacity limitations. The reason for this is that the gateway is running the entire dataflow, and if the dataflow is complex or has many transformations, it can lead to slower performance as the gateway processes all the transformations on the compute hosting the gateway. By splitting the dataflow, you can ensure that the gateway is only responsible for the data movement step, which can significantly improve performance and reduce execution time.














## Query optimization

To achieve optimal performance in Dataflow Gen2, it's essential to design your queries with efficiency in mind. In this 

### Filter early and often

Apply filters as early as possible in your dataflow to reduce the amount of data processed downstream. This minimizes the workload on subsequent transformations and speeds up the overall execution time. For example, if you're working with a large dataset, filter out unnecessary rows before performing any aggregations or joins.

### Take advantage of pushdown and folding capabilities

When working with data sources that support query folding, such as SQL databases, leverage the pushdown capabilities to filter and transform data at the source. This reduces the amount of data transferred over the network and minimizes processing time in Dataflow Gen2. For instance, if you're using a SQL database, keep an eye on the query folding indicators in the dataflow designer to ensure that your transformations are being pushed down to the source. If you see that a transformation is not folding, consider splitting the query into two and using a staging Lakehouse or Warehouse to perform the transformation before the final output.

### Use parameterization to optimize design-time experience

Large data previews during design-time can slow down authoring and increase resource usage. Use parameterization to limit the size of data previews (for example, by filtering on a date or ID parameter). This approach helps keep the design environment responsive and efficient.

### Avoid unnecessary transformations

Minimize the number of transformations in your dataflow. Each transformation adds processing overhead, so only include those that are necessary for your final output. For example, if you can achieve the same result with a single transformation instead of multiple steps, opt for the simpler approach.

## Dataflow optimization

To optimize the performance of your dataflow, consider the following best practices.

### Staging data

Staging is a powerful technique that can significantly improve performance, especially for large datasets or complex transformations. By staging data you can leverage compute resources of the staging Lakehouse and staging warehouse to perform transformations more efficiently. This approach allows you to break down complex dataflow into manageable steps, reducing the overall processing time. However, be mindful that staging introduces additional steps and storage operations, which can increase overall refresh time and costs. Use staging judiciously.

### Fast Copy

When moving data without non folding transformations, use Fast Copy to optimize data transfer. Fast Copy is designed for high-throughput data movement and can significantly reduce runtime. However, be cautious: if you add transformations in the same query as a Fast Copy operation, it can disable Fast Copy if the transformations do not fold to the source system. In such cases, consider separating the query into two steps: one for the Fast Copy operation and another for the transformations using the staging Lakehouse or Warehouse compute.

### Understand output formats and their impact

Dataflow Gen2 emits data in Delta Parquet format, which is different from Gen1's CSV output. While Delta Parquet may result in longer ETL runtimes compared to CSV, it enables powerful downstream capabilities such as Direct Lake, Lakehouses, and Warehouses, allowing these services to consume data efficiently without additional processing or cost.

### Incremental refresh

When working with large datasets, consider using incremental refresh to process only the new or changed data since the last refresh. This approach reduces the amount of data processed and speeds up the overall execution time. Incremental refresh is particularly useful for scenarios where data is updated frequently, such as in transactional systems.


## Scenarios to avoid 


- Clarify "When moving data without non folding transformations" in Fast Copy - double negative
- Mention buffering of tables, lists, records for variables used multiple times in the query
- Avoid expensive whole table operations like sorting, merging
- For merging, try alternate approaches - Table.Join with join algorithms vs. Table.NestedJoin
- Choose columns early too with filtering (so it folds)
- Add ones for number of queries per dataflow and/or number of dataflows per workspace? lower is better 50 for both
- In parameters part, mention using a pipeline with parameters to parallelize (for faster refresh not overall CU)?




### I see an activity that is taking a long time to complete, what could I do? 
[RELEASENOTES LINK](https://roadmap.fabric.microsoft.com/?product=datafactory) 

Where Dataflow Gen2 is slower than Dataflow Gen1, it's often due to the additional time spent emitting Delta Parquet (DF Gen1 emits CSV). While more time is spent on the ETL, downstream capabilities like Direct Lake, Lakehouses, and Warehouses can consume the Delta Parquet without the need for any further processing/cost.

We will be adding options to support CSV as the output format for scenarios where that makes more sense.

 - Lakehouse destination with warehouse staging
 - Fast copy with non folding transformations (split it)
 - Editing is slow use a parameter to limit the data preview size and change it during runtime
 - What perf indicators do I have and how do I interpret them? (with examples)
 - Functions that do not fold in PQ [link for reference](https://itsnotaboutthecell.com/2023/01/27/the-almost-definitive-guide-to-query-folding/)




Write out that performance does affect cost directly, link to billing and business model. 






Check if you are using staging in combnination with lakehouse destination 




Explain that the most common reason for slower runtime in Gen2 (compared to Gen1) is due to the emission of Delta Parquet. Here’s what I posted:

Where Dataflow Gen2 is slower than Dataflow Gen1, it's often due to the additional time spent emitting Delta Parquet (DF Gen1 emits CSV). While more time is spent on the ETL, downstream capabilities like Direct Lake, Lakehouses, and Warehouses can consume the Delta Parquet without the need for any further processing/cost.

We will be adding options to support CSV as the output format for scenarios where that makes more sense.

Illustrate how parameterization can be used to reduce preview sizes at design-time. [We need first class support for this in the product, and Alessandro is working on it.]
 

Leverage Fast Copy up front where possible
 

Avoid the pitfall of defeating Fast Copy with transforms in the same query. [We need to remove this limitation in the product, but for now we can use docs as a crutch.]
 

Leverage Query Folding where possible
 

Leverage Staging up front where possible
 

After leveraging compute for transforms, avoid re-egressing data from the Staging Warehouse to a Lakehouse. Instead load to a Warehouse destination when possible. If a Lakehouse destination is necessary, leverage a shortcut. [We need to have the product do this shortcut creation automatically or we need improved Copy performance for DW -> LH]
 

When leveraging compute for transforms, avoid transforms that don’t fold to SQL. [Curt and others may be able to provide pitfalls; notably some Date/DateTime functions that don’t fold and where we should invest in folding for the medium-term.]
 

Use parallelization. [Greg has a Pipeline.PartitionBy technique that he can share]
 

Double-check that staging is being used only where necessary (Warehouse)