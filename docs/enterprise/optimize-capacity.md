---
title: "Evaluate and optimize your Microsoft Fabric capacity"
description: "This article explains how to evaluate and optimize the load on your Microsoft Fabric capacities."
author: peter-myers
ms.author: v-myerspeter
ms.reviewer: kesharab
ms.topic: how-to
ms.custom: fabric-cat
ms.date: 03/23/2024
---

# Evaluate and optimize your Microsoft Fabric capacity

This article explains how to evaluate and optimize the load on your Microsoft Fabric capacities. It also describes strategies to address overload situations, and provides you with guidance to help optimize compute for each of the Fabric experiences.

While the Fabric capacity model simplifies setup and enables collaboration, there's a high chance of depleting the shared compute resources of a capacity. It might also be the case that you're paying for more resources than are necessary. These situations can arise when the design of some Fabric experiences doesn't follow best practices.

It's important to reduce the risk of depleting shared resources, Fabric—as a managed service—automatically addresses such situations in two ways.

- [Bursting and smoothing](https://blog.fabric.microsoft.com/blog/fabric-capacities-everything-you-need-to-know-about-whats-new-and-whats-coming?ft=All#BurstSmooth) ensures that CPU-intensive activities are completed quickly without requiring a higher SKU (and can be run at any time of the day).
- [Throttling](throttling.md) delays or rejects operations when a capacity experiences sustained and high demand for CPU (above the SKU limit).

Smoothing reduces the likelihood of throttling (although throttling can still occur). Smoothing is how usage is allocated against limits, but it's independent of the execution of jobs. Smoothing doesn't change performance, it just spreads the accounting for consumed compute over a longer period, so that a larger SKU isn't needed to handle the peak compute.

To learn more about Fabric capacity, see [Microsoft Fabric concepts and licenses](licenses.md) and [Fabric Capacities – Everything you need to know about what's new and what's coming](https://blog.fabric.microsoft.com/blog/fabric-capacities-everything-you-need-to-know-about-whats-new-and-whats-coming).

## Planning and budgeting tools

Planning the size of a capacity can be a challenge. That's because the required compute can vary widely due to the operations performed, how well they're executed (for example, the efficiency of a DAX query or the Python code in a notebook), or the level of concurrency.

To help you determine the right capacity size, you can provision [trial capacities](../get-started/fabric-trial.md) or [pay-as-you-go F SKUs](buy-subscription.md#azure-skus) to measure the actual capacity size required before purchasing an F SKU reserved instance.

> [!TIP]
> It's always a good strategy to start small and then gradually increase the size as necessary.

## Monitor capacities

You should monitor utilization to get the most out of your capacities. Foremost, it's important to understand that Fabric operations are either _interactive_ or _background_. For example, DAX queries from a Power BI report are on-demand requests that are interactive operations, while semantic model refreshes are background operations. For more information about operations and how they consume resources within Fabric, see [Fabric operations](fabric-operations.md).

Monitoring can reveal to you that throttling is taking place. Throttling can happen when there are numerous or long-running interactive operations. Typically, background operations related to SQL and Spark experiences are smoothed, meaning they're spread out over a 24-hour period.

The [Fabric Capacity Metrics App](metrics-app.md) is the best way to monitor and visualize recent utilization. The app breaks down to item type (semantic model, notebook, pipeline, and others), and helps you to identify items or operations that use high levels of compute (so that they can be [optimized](#compute-optimization-by-fabric-experience)).

Administrators can use the [Admin monitoring workspace](../admin/monitoring-workspace.md) to learn about frequently used items (and overall adoption). They can also use the [Monitoring hub](../admin/monitoring-hub.md) to view current and recent activities in the tenant. More information on some operations might also be available from [Log Analytics](/azure/azure-monitor/logs/log-analytics-overview) or the [on-premises data gateway logs](/data-integration/gateway/service-gateway-tshoot).

## Manage high compute usage

When a capacity is highly utilized and starts to show throttling or rejection, there are three strategies to resolve it: optimize, scale up, and scale out.

It's a good practice to [set up notifications](../admin/service-admin-premium-capacity-notifications.md) to learn when capacity utilization exceeds a set threshold. Also, consider using workload-specific settings to limit the size of operations (for example, [Power BI query timeout or row limits](/power-bi/enterprise/service-admin-premium-workloads#power-bi-settings), or [Spark workspace settings](../data-engineering/workspace-admin-settings.md)).

### Optimize

Content creators should always optimize the design of their Fabric items to ensure that it's efficient and uses the least possible compute resources. Specific guidance for each Fabric experience is provided [later in this article](#compute-optimization-by-fabric-experience).

### Scale up

You _scale up_ a capacity to temporarily or permanently increase the SKU size (with more compute capacity). Scaling up ensures that there's sufficient compute resources available for all items on a capacity and to avoid throttling.

You can also resize, pause, and resume [Fabric F SKUs](scale-capacity.md) to align with consumption patterns.

### Scale out

You _scale out_ by moving some of your workspaces or items to a different Fabric capacity to spread the workload. It can be a good option when different capacity strategies, settings, or administrators are required. Provisioning multiple capacities is also a good strategy to help isolate compute for high-priority items, and also for self-service or development content. For example, the executives in your organization expect highly responsive reports and dashboards. These reports and dashboards can reside in a separate capacity dedicated to executive reporting.

You can also consider moving Power BI workspaces to shared capacity, provided that consumers have [Power BI Pro](/power-bi/fundamentals/service-features-license-type#pro-license) licenses that let them continue to access the content.

## Compute optimization by Fabric experience

The experiences and items in Fabric work differently, so you don't necessarily optimize them in the same way. This section lists Fabric items according to experience, and actions you can take to optimize them.

### Synapse Data Warehouse

Data warehouse uses a serverless architecture and its nodes are automatically managed by the service. Capacity usage is calculated based on active per-query capacity unit seconds rather than the amount of time the frontend and backend nodes are provisioned.

All data warehouse operations are background operations, and they're [smoothed](../data-warehouse/compute-capacity-smoothing-throttling.md#smoothing) over a 24-hour period.

The [SQL analytics endpoint](../data-engineering/lakehouse-sql-analytics-endpoint.md) aims to provide a _performance by default_ experience. To this end, there are fewer query tuning options available compared to SQL Server or Azure Synapse Analytics dedicated SQL pools.

Here are some points to consider to help minimize compute.

- Write queries by using the most optimal T-SQL possible. When possible, limit the number of columns, calculations, aggregations, and other operations that could unnecessarily increase query resource usage.
- Design tables to use the [smallest data types](../data-warehouse/guidelines-warehouse-performance.md#choose-the-best-data-type-for-performance) possible. Your choice of data type can heavily influence the query plans generated by the SQL engine. For example, reducing a `VARCHAR` field from length 500 to 25 or changing `DECIMAL(32, 8)` to `DECIMAL(10, 2)` can result in a significant decrease in resources allocated for a query.
- Use [star schema design](../data-warehouse/guidelines-warehouse-performance.md#utilize-star-schema-data-design) to reduce the number of rows read and to minimize query joins.
- Ensure statistics exist and that they're up to date. Statistics play a vital role in generating the most optimal execution plan. They're [created automatically](../data-warehouse/statistics.md#automatic-statistics-at-query) at runtime but you might need to [manually update](../data-warehouse/statistics.md#manual-statistics-for-all-tables) them, especially after data is loaded or updated. Consider creating statistics by using the `FULLSCAN` option rather than relying on the auto-generated statistics that use sampling.
- Use built-in views to monitor queries and usage, especially when troubleshooting issues.
  - The [sys.dm_exec_requests](/sql/relational-databases/system-dynamic-management-views/sys-dm-exec-requests-transact-sql?view=sql-server-ver16&preserve-view=true) dynamic management view (DMV) provides information about all actively executing queries, but it doesn't store any historical information. The [Fabric Toolbox](https://aka.ms/FabricToolbox) provides a query that uses this DMV and makes the query result user friendly by joining to other views to provide details like the query text.
  - [Query insights](../data-warehouse/query-insights.md), which is a feature of Fabric data warehousing, provides a holistic view of historical query activity on the SQL analytics endpoint. Specifically, the [queryinsights.exec_requests_history](/sql/relational-databases/system-views/queryinsights-exec-requests-history-transact-sql?view=fabric&preserve-view=true) view provides information about each complete SQL request. It presents all the relevant details for each query execution that can be correlated with the operation IDs found in the capacity metrics app. The most important columns for monitoring capacity usage are: **distributed_statement_id**, **command (query text)**, **start_time**, and **end_time**.

### Synapse Data Engineering and Synapse Data Science

The Data Engineering and Data Science experiences use Spark compute to process, analyze, and store data in a Fabric lakehouse. Spark compute is set up and measured in terms of vCores. However, Fabric uses CUs as a measure of compute consumed by various items, including Spark notebooks, Spark job definitions, and lakehouse jobs.

In Spark, one CU translates to two spark vCores of compute. For example, when a customer purchases an F64 SKU, 128 spark v-cores are available for Spark experiences.

All Spark operations are background operations, and they're [smoothed](../data-warehouse/compute-capacity-smoothing-throttling.md#smoothing) over a 24-hour period.

For more information, see [Billing and utilization reporting in Fabric Spark](../data-engineering/billing-capacity-management-for-spark.md#fabric-capacity).

Here are some points to consider to help minimize compute.

- Always strive to write efficient Spark code. For more information, see [Optimize Apache Spark jobs in Azure Synapse Analytics](/azure/synapse-analytics/spark/apache-spark-performance) and [The need for optimize write on Apache Spark](/azure/synapse-analytics/spark/optimize-write-for-apache-spark).
- Reserve required executors for your Spark jobs to free up resources for other Spark jobs or workloads. Otherwise, you increase the chance that Spark jobs fail with an HTTP 430 status, which means too many requests for the capacity. You can view the number of executors allocated to a notebook in the [Fabric monitoring hub](../data-engineering/browse-spark-applications-monitoring-hub.md), where you can also determine the actual number of executors used by the notebook. Spark jobs only reserve the required nodes and allow parallel submissions within SKU limits.
- The Spark pool can only be configured to use the maximum number of vCores supported by the SKU. However, you can scale out data engineering workloads by accepting parallel Spark jobs within SKU limits. This approach is commonly known as _burst factor_, and it's enabled by default for Spark workloads at the capacity level. For more information, see [Concurrency throttling and queueing](../data-engineering/spark-job-concurrency-and-queueing.md#concurrency-throttling-and-queueing).
- Active Spark sessions can accrue CU utilization on a capacity. For this reason, it's important to stop active Spark sessions when not in use. Note that the default Spark session expiration time is set to 20 minutes. Users can change the session timeout in a notebook or the Spark job definition.

### Synapse Real-Time Analytics

KQL database CU consumption is calculated based on the number of seconds the database is active and the number of vCores used. For example, when your database uses four vCores and is active for 10 minutes, you'll consume 2,400 (4 x 10 x 60) seconds of CU.

All KQL database operations are interactive operations.

An autoscale mechanism is utilized to determine the size of your KQL database. It ensures that the most cost-optimized and best performance is achieved based on usage patterns.

To allow data to become available to other Fabric engines, the KQL database syncs with OneLake. Based on the number of reads and write transactions that your KQL database performs, CUs are utilized from your capacity. It utilizes the OneLake Read and Write meters, which are equivalent to read and write operations on Azure Data Lake Storage (ADLS) Gen2 accounts.

### Data Factory

This section is concerned with optimizations for [dataflows](../data-factory/data-factory-overview.md#dataflows) and [data pipelines](../data-factory/data-factory-overview.md#data-pipelines) in Data Factory.

All operations are background operations, and they're [smoothed](../data-warehouse/compute-capacity-smoothing-throttling.md#smoothing) over a 24-hour period.

Here are some points to consider to help minimize compute.

- Avoid inefficient Power Query logic to minimize and optimize expensive data transformations, like merging and sorting.
- Strive to achieve [query folding](/power-query/power-query-folding) whenever possible. It can improve the performance of your dataflows by reducing the amount of data that needs to be transferred between the data source and destination. When query folding doesn't occur, Power Query retrieves all the data from the data source and performs transformations locally, which can be inefficient and slow.
- Disable staging when working with small data volumes and/or performing simple transformations. Staging might be required in some cases, like when you load a data warehouse.
- Avoid refreshing data more frequently than the data source requires. For example, if the data source is only updated once every 24 hours, refreshing the data hourly won't provide any more value. Instead, consider refreshing the data at an appropriate frequency to ensure that it's up-to-date and accurate.

### Power BI

[Power BI operations](fabric-operations.md#power-bi) are either interactive or background.

The following **interactive** operations typically result in high compute usage.

- Semantic models that don't follow best practices. For example, they might not adopt [star schema design](/power-bi/guidance/star-schema) with one-to-many relationships. Or, they might include complex and expensive row-level security (RLS) filters. Consider using Tabular Editor and the [Best Practice Analyzer](https://docs.tabulareditor.com/te2/Best-Practice-Analyzer.html) to determine whether best practices are followed.
- DAX measures are inefficient.
- Report pages contain too many visuals, which can result in slow visual refresh.
- Report visuals display high cardinality results (too many rows or columns), or they contain too many measures.
- The capacity experiences high concurrency because there are too many users for the capacity size. Consider enabling [query scale-out](/power-platform-release-plan/2022wave2/power-bi/query-scale-out) to improve the user experience for high-concurrency semantic models (but it doesn't result in more total compute).

The following **background** operations typically result in high compute usage.

- Inefficient or overly complex data transformations in the Power Query logic.
- Absence of query folding or incremental refresh for large fact tables.
- Report bursting, which is when a high number of Power BI reports or paginated reports are generated at the same time.

## Related content

- [Microsoft Fabric concepts and licenses](licenses.md)
- Blog: [Fabric Capacities – Everything you need to know about what's new and what's coming](https://blog.fabric.microsoft.com/blog/fabric-capacities-everything-you-need-to-know-about-whats-new-and-whats-coming)

More questions? [Try asking the Fabric Community](https://community.fabric.microsoft.com/).
