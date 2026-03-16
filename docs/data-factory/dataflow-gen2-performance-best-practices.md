---
title: "Best practices for getting the best performance with Dataflow Gen2 in Fabric Data Factory"
description: "This article provides best practices for optimizing the performance of Dataflow Gen2 in Fabric Data Factory. By following these guidelines, you can enhance the efficiency and speed of your data integration processes."
ms.reviewer: dougklo, jeluitwi
ms.topic: concept-article
ms.date: 07/29/2025
ms.custom: dataflow
---

# Best practices for getting the best performance with Dataflow Gen2

This article provides best practices for optimizing the performance of Dataflow Gen2 in Fabric Data Factory. By following these guidelines, you can enhance the efficiency and speed of your data integration processes.

## What you'll learn

In this article, you'll discover:

- **Key performance optimization areas**: Understanding the three critical components (data source, dataflow engine, and data destination) that impact your dataflow performance
- **Core optimization techniques**: How to leverage Fast Copy, query folding, and staging to maximize efficiency
- **Real-world scenarios**: Common performance challenges and their specific solutions
- **Best practices**: Actionable guidance for different data integration patterns and use cases

## What are the key areas to focus on for performance optimization?

Within the dataflow end to end experience, there are several key areas to focus on for performance optimization. These areas include the data movement, the dataflow engine, and the data transformations. Each of these components and the paths in between play a crucial role in the overall performance of your dataflow, and optimizing them can lead to significant improvements in execution time and resource utilization.

:::image type="content" source="media/dataflow-gen2-performance-best-practices/dataflow-backend-overview.png" alt-text="Diagram of the Dataflow Gen2 backend overview.":::

### Data movement

Data movement is a critical aspect of dataflow performance. It involves the transfer of data between various components, such as data sources, staging areas, and final destinations. Efficient data movement can significantly reduce execution time and resource consumption. In Dataflow Gen2, data movement is optimized through techniques like Fast Copy, which allows for high-throughput data transfer without the overhead of transformations that don't fold to the source system. Learn more about [Fast Copy](./dataflows-gen2-fast-copy.md).

### Data transformation

Data transformation is the process of converting data from one structure to another, often involving operations like filtering, aggregating, and joining. In Dataflow Gen2, transformations are designed to be efficient and apply query folding capabilities whenever possible. Query folding allows transformations to be pushed down to the source system, reducing the amount of data transferred and processed in Dataflow Gen2. This reduction is particularly important for large datasets, as it minimizes the workload on the dataflow engine and speeds up execution time. To learn more about query folding, go to [Query folding](/power-query/query-folding-basics). Also follow other best practices for query optimization, such as filtering early and often, using parameterization to limit data previews, and avoiding unnecessary transformations in your dataflow. To learn more about query optimization, go to [Query optimization](/power-query/best-practices).

### Staging data and warehouse compute

Staging data is a technique used to improve performance by temporarily storing intermediate results in a staging area. Dataflow Gen2 comes with a staging Lakehouse and a staging Warehouse, which can be used to perform transformations more efficiently. By staging data, you can use the compute resources of these staging areas to break down complex dataflows into manageable steps, reducing overall processing time. This break down is particularly useful for large datasets or complex transformations that would otherwise take a long time to execute in a single step. You can consider staging locations as a temporary storage area that allows you to fold transformations. This approach is especially beneficial when working with data sources that don't support query folding or when transformations are too complex to be pushed down to the source system. To apply staging effectively, you can keep an eye on the folding indicators in the dataflow editor to ensure that your transformations are being pushed down to the source. If you notice that a transformation isn't folding, consider splitting the query into two queries and apply the transformation in the second query. Enable staging on the first query to perform the transformation in the staging Lakehouse or Warehouse compute. This approach allows you to take advantage of the compute resources available in the staging areas while ensuring that your dataflow remains efficient and responsive.

:::image type="content" source="media/dataflow-gen2-performance-best-practices/enable-staging.png" alt-text="Screenshot showing how to enable staging in Dataflow Gen2.":::

When you have data that's already staged in the Lakehouse or Warehouse and you apply more transformations that fully fold in following queries, then the dataflow will write the output to the staging Warehouse. This can be faster than writing to the staging Lakehouse because the dataset can be written in parallel by DW and will undergo fewer network hops with their corresponding serialization steps.

## Scenarios and what optimizations to consider

When working with Dataflow Gen2, it's essential to understand the various scenarios you might encounter and how to optimize performance in each case. The following considerations provide practical guidance on how to apply the best practices to real-world situations. By tailoring your approach based on the specific characteristics of your data and transformations, you can achieve optimal performance in your data integration workflows. Here are some common scenarios you might encounter when working with Dataflow Gen2, along with recommended actions to optimize performance. Be aware that performance optimization is an ongoing process and very specific to your scenario. You might need to adjust your approach based on the specific characteristics of your own data and transformations.

### Consideration 1: Improve data movement with Fast Copy

In this scenario, you notice that data movement between your data source and the staging area or to your final destination is taking longer than expected. Several factors could be involved, such as network latency, large dataset sizes, or inefficient data transfer methods.

In this case, consider evaluating the data movement path and optimizing it for better performance. One approach is to use Fast Copy for high-throughput data transfer, which can significantly reduce runtime. Fast Copy is designed to handle large volumes of data efficiently, minimizing the overhead associated with traditional data transfer methods. However, be cautious: if you add transformations in the same query as a Fast Copy operation, it can disable Fast Copy if the transformations don't fold to the source system. In such cases, consider separating the query into two steps: one for the Fast Copy operation and another for the transformations using the staging Lakehouse or Warehouse compute. This approach allows you to take advantage of Fast Copy for high-throughput data movement while performing the necessary transformations in a separate step. Learn more about [Fast Copy](./dataflows-gen2-fast-copy.md).

:::image type="content" source="media/dataflow-gen2-performance-best-practices/settings-fast-copy.png" alt-text="Screenshot of the Options dialog showing the location to enable Fast Copy in Dataflow Gen2.":::

You can enable Fast Copy in the dataflow settings. This setting is by default enabled, but you can also require Fast Copy to be used for a specific query in your dataflow. To do this, select the **Require Fast Copy** option in the query settings. This action ensures that Fast Copy is used for the selected query and that it ignores the minimum size threshold for Fast Copy. This setting is particularly useful when you want to ensure that Fast Copy is used for specific queries, regardless of the data size or other conditions. If you require Fast Copy, make sure that the data source is compatible with Fast Copy and that the transformations in the query can be pushed down to the source system. If you require Fast Copy on a query that is not compatible with Fast Copy, the dataflow will fail. If you don't require Fast Copy, the dataflow still runs, but it can fall back to the default data movement method, which might not be as efficient as Fast Copy. This flexibility allows you to optimize your dataflow based on the specific requirements of your data integration processes.

:::image type="content" source="media/dataflow-gen2-performance-best-practices/require-fast-copy.png" alt-text="Screenshot showing the location of the Require Fast Copy option for Dataflow Gen2.":::

### Consideration 2: Improve execution time for complex transformations using staging

In this scenario, you have a dataflow with multiple complex transformations, such as joins, aggregations, and filtering. The execution time is longer than desired, and you want to optimize the performance of these transformations.

In this case, consider breaking down the dataflow into smaller, more manageable steps. Instead of performing all transformations in a single query, you can stage the data in a staging Lakehouse or Warehouse and then apply the transformations in subsequent queries. This approach allows you to apply the compute resources of the staging area for complex transformations, reducing the overall execution time. Additionally, ensure that your transformations are designed to fold to the source system whenever possible, as this can significantly improve performance by reducing the amount of data transferred and processed in Dataflow Gen2. If you notice that certain transformations don't fold, consider splitting them into separate queries and applying them after staging the data.

In the following image, notice how the folding indicators in the dataflow editor can help you identify which transformations are being pushed down to the source system.

:::image type="content" source="media/dataflow-gen2-performance-best-practices/folding-indicators-non-folding.png" alt-text="Screenshot emphasizing the folding indicators in the Applied Steps pane.":::

To implement staging effectively, you can split the dataflow into two queries. You do this by right-clicking on the first step that doesn't fold to the source system and selecting the **Extract previous** option. This action creates a new query that stages the data in the staging Lakehouse or Warehouse compute, allowing you to perform the transformation in a separate step. This approach helps you take advantage of the compute resources available in the staging areas while ensuring that your dataflow remains efficient and responsive.

:::image type="content" source="media/dataflow-gen2-performance-best-practices/folding-indicators-extract-previous.png" alt-text="Screenshot of the step's context menu with the Extract previous option emphasized.":::

Then provide a name for the new query and select "OK".

:::image type="content" source="media/dataflow-gen2-performance-best-practices/extract-previous-query-name.png" alt-text="Screenshot of the Extract steps dialog with the new name inserted.":::

Now with the new query created, you can check if staging is enabled for the first query. If staging isn't enabled, you can enable it by selecting the **Enable staging** option in the query settings. This action allows you to perform transformations in the staging Lakehouse or Warehouse compute, optimizing the performance of your dataflow. Staging the second query is optional, but it can further improve performance by allowing you to perform additional transformations in the staging area before writing the final output to the destination.

:::image type="content" source="media/dataflow-gen2-performance-best-practices/staging-and-fast-copy-enabled.png" alt-text="Screenshot of the query context menu with the Enable staging and Fast copy options emphasized.":::

If you now look at the folding indicators in the dataflow editor, the transformations in the first query are being pushed down to the source system. The second query might not reflect the same folding indicators, as it's only during runtime aware of the staging area and the transformations that can be pushed down to the staging area.

:::image type="content" source="media/dataflow-gen2-performance-best-practices/folding-indicators-to-source.png" alt-text="Screenshot of the Applied steps pane with the folding indicators emphasized and all set to green.":::

To learn more about how to optimize your dataflow transformations and ensure that they are being pushed down to the source system, go to [Query folding](/power-query/query-folding-basics).

### Consideration 3: The impact on staging on data movement when using Lakehouse as a destination

In this scenario, you're using a Lakehouse destination for your dataflow, and you have enabled staging to perform transformations before writing the final output. However, you notice that the overall refresh time is longer than expected, and you want to optimize the performance of this process.

In this case, the data movement from the staging Warehouse to the Lakehouse destination can be a bottleneck. To improve performance, consider changing the destination to a Warehouse instead of a Lakehouse. This change allows you to use the compute resources of the staging Warehouse for transformations and write the final output directly to the Warehouse destination. The path of data movement becomes more efficient, as it avoids the additional overhead of writing to a Lakehouse. If a Lakehouse destination is necessary, consider disabling staging for the query that writes to the Lakehouse. This action allows you to write the final output directly to the Lakehouse without the additional overhead of staging, which can significantly improve performance. However, be aware that disabling staging means that you won't be able to perform transformations in the staging area, so ensure that your transformations are designed to fold to the source system whenever possible. This scenario highlights the importance of understanding the data movement path and optimizing it for better performance. Observe the difference in execution time when using a Warehouse destination compared to a Lakehouse destination with staging disabled. By carefully considering the destination and staging options, you can enhance the efficiency of your dataflow and reduce overall refresh time.

### Consideration 4: Large data previews during design-time

In this scenario, you're working on a dataflow with large datasets, and the design-time experience is slow due to the size of the data previews. This process can make it difficult to author and test your dataflow effectively.

In this case, consider using either schema view or parameterization to limit the size of data previews. By applying filters based on parameters, such as a date range or specific IDs, you can reduce the amount of data displayed in the design-time environment. This approach helps keep the design environment responsive and efficient, allowing you to focus on authoring and testing your dataflow without being hindered by large data previews. Additionally, you can adjust the parameters during runtime to retrieve the full dataset when needed.

For example, if you're working with a large transactional dataset, you can create a parameter that filters the data based on a specific date range. This way, during design-time, you only see a subset of the data that is relevant to your current work. When you're ready to run the dataflow, you can adjust the parameter to include the full dataset, ensuring that your data integration processes remain efficient and responsive. The following example shows how to set up a parameter in Dataflow Gen2:

1. Select the **Manage parameters** option in the dataflow editor.
2. Select the **Add parameter** button to add a new parameter.

    :::image type="content" source="media/dataflow-gen2-performance-best-practices/add-parameter.png" alt-text="Screenshot of the dataflow editor with the Manage parameters selection and the New parameter option emphasized.":::

3. Fill out the parameter details, such as name, type, and value. For example, you can create a parameter named **DesignDateFilter** of type `DateTime` with a default value that limits the data preview to a specific date range.

    :::image type="content" source="media/dataflow-gen2-performance-best-practices/design-date-filter.png" alt-text="Screenshot of the Manage parameters dialog with the Name, Type, and Current value settings emphasized.":::

4. Apply the parameter in your dataflow queries by using it in the filter conditions. For example, you can filter the data based on the **DesignDateFilter** parameter to limit the data preview to a specific date range. In this case we filter the data to only include records where the "Date" column is greater than the **DesignDateFilter** parameter.

    :::image type="content" source="media/dataflow-gen2-performance-best-practices/apply-filter-on-col.png" alt-text="Screenshot of the Date column filter menu with the new filter applied to the column.":::

5. Now you can use the **DesignDateFilter** parameter in your dataflow queries to limit the data preview during design-time. When you're ready to run the dataflow, you can adjust the parameter value to include the full dataset, ensuring that your data integration processes remain efficient and responsive.

    :::image type="content" source="media/dataflow-gen2-performance-best-practices/select-parameter-as-value-for-filtering.png" alt-text="Screenshot of the Filter rows dialog with the DesignDateFilter as the parameter used as a filter.":::

Another option is to use the schema view, which allows you to see the structure of your data without loading the entire dataset. This view provides a high-level overview of the data types and columns in your dataset, enabling you to design and test your dataflow without being affected by large data previews. To switch to schema view, select the **Schema view** option in the dataflow editor.
    :::image type="content" source="media/dataflow-gen2-performance-best-practices/enable-schema-view.png" alt-text="Screenshot of the dataflow editor with the Schema view option emphasized.":::

### Consideration 5: Dataflow gen2 runtime characteristics compared to Dataflow Gen1

In this scenario, you notice that the performance of Dataflow Gen2 is slower than that of Dataflow Gen1, particularly in terms of execution time and resource usage. This performance difference can be due to several factors, including the differences in optimization techniques and output formats used in Dataflow Gen2.

Dataflow Gen2 emits data in Delta Parquet format when you use staging or Lakehouse destinations, which is different from Dataflow Gen1's CSV output. While Delta Parquet might result in longer ETL runtimes compared to CSV, it enables powerful downstream capabilities such as Direct Lake, Lakehouses, and Warehouses, allowing these services to consume data efficiently without additional processing or cost. This difference in storage method means that while the initial execution time might be longer, the overall performance and efficiency of downstream processes can be significantly improved and can lead to better long-term performance of your data integration workflows. Learn more about [Delta Parquet format](/azure/synapse-analytics/spark/apache-spark-what-is-delta-lake).

### Consideration 6: Optimizing refresh time for large transactional datasets using incremental refresh

In this scenario, you're dealing with a large transactional dataset that is updated frequently, and you want to optimize the refresh time of your dataflow. This optimization can be challenging due to the volume of data and the need to process only the new or changed records.

In this case, consider using incremental refresh or the pattern to incrementally amass data. Incremental refresh allows you to process only the new or changed data since the last refresh, reducing the amount of data processed and speeding up the overall execution time. This approach is particularly useful for scenarios where data is updated frequently, such as in transactional systems. By implementing incremental refresh, you can optimize the performance of your dataflow and ensure that your data integration processes remain efficient and responsive. Learn more about [Incremental refresh](./dataflow-gen2-incremental-refresh.md) or learn about the [Incremental amassing data pattern](./tutorial-setup-incremental-refresh-with-dataflows-gen2.md).

### Consideration 7: I'm using a gateway to connect to my on-premises data source and I want to optimize the performance of my dataflow

In this scenario, you're using a gateway to connect to your on-premises data source, and you want to optimize the performance of your dataflow. Gateways can introduce additional latency and overhead, which can impact the overall performance of your dataflow.

In this case, consider splitting your dataflow into two separate dataflows: one for data movement from the on-premises data source to a data destination (such as a Lakehouse or Warehouse) and another for transformations and final output. This approach allows you to optimize the data movement step by leveraging Fast Copy for high-throughput data transfer, while keeping the transformation step focused on processing the data efficiently and reducing the overall execution time. By separating the data movement and transformation steps, you can reduce the impact of gateway latency and capacity limitations. The reason for this is that the gateway is running the entire dataflow, and if the dataflow is complex or has many transformations, it can lead to slower performance as the gateway processes all the transformations on the computer hosting the gateway. By splitting the dataflow, you can ensure that the gateway is only responsible for the data movement step, which can significantly improve performance and reduce execution time.

### Consideration 8: I'm using the dataflow connectors to consume data from the dataflow and want to optimize my data integration processes

In this scenario, you're using dataflow connectors to consume data from your dataflow, and you want to optimize your data integration processes. Dataflow connectors can provide a convenient way to access and consume data.

In this case, consider using data destinations instead of dataflow connectors for consuming data from your dataflow. Data destinations, such as Lakehouses and Warehouses, are designed to efficiently store and serve data, allowing you to apply their capabilities for downstream consumption. A major benefit of using data destinations is that they often serve more generic ways of connecting to data, such as the SQL endpoint or use the Direct Lake capabilities, which can significantly improve performance and reduce resource consumption.

## Conclusion

By following these best practices and considering the specific characteristics of your data and transformations, you can optimize the performance of Dataflow Gen2 in Fabric Data Factory. Whether you're working with large datasets, complex transformations, or specific data integration patterns, these guidelines provide actionable insights to enhance the efficiency and speed of your data integration processes. Remember that performance optimization is an ongoing process, and you may need to adjust your approach based on the evolving needs of your data integration workflows. By continuously monitoring and optimizing your dataflows, you can ensure that they remain efficient and responsive to your business requirements.
