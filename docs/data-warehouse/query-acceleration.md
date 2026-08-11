---
title: Query Acceleration in Fabric Data Warehouse (Preview)
description: Fabric Data Warehouse Query acceleration is a GPU-accelerated execution capability designed to improve the performance and efficiency of analytical SQL workloads in Microsoft Fabric Data Warehouse.
ms.reviewer: nnikolic, marakiketema
ms.date: 08/11/2026
ms.topic: concept-article
---

# Query acceleration in Fabric Data Warehouse (preview)

Fabric Data Warehouse query acceleration is a GPU-accelerated capability designed to improve the performance and efficiency of analytical SQL workloads in Microsoft Fabric Data Warehouse.

Query acceleration intelligently accelerates eligible SQL operations by offloading compute-intensive work to a specialized, GPU-accelerated execution engine. Operations such as joins, aggregations, and scans can be processed more efficiently and at greater scale, delivering faster and more predictable performance while remaining fully compatible with existing T-SQL workloads. 

> [!NOTE]
> This feature is in limited preview. To request access on a first-come, first-served basis, complete the [Query Acceleration Registration Form](https://aka.ms/GPU-FabricDW).

## Why enable query acceleration?

Modern and AI-driven analytical workloads place increasing pressure on data warehouse engines. As data volumes, query complexity, and concurrency grow, operations such as joins and aggregations can become performance bottlenecks. 

Query acceleration addresses these challenges by:

- Reducing query execution time for compute-intensive operations.
- Increasing throughput for analytical workloads.
- Improving performance consistency under concurrent demand.
- Enabling faster analytics for reporting, applications, and AI-driven scenarios.

Query acceleration creates no extra work for developers or administrators:

- No query rewrites
- No schema changes
- No reformatting
- No data movement
- No additional infrastructure to manage

## Use cases for query acceleration in Fabric Data Warehouse

Query acceleration is designed for analytical workloads where performance, scale, and concurrency are critical. Customers running business intelligence, application analytics, and AI-driven analytical workloads typically see the greatest benefit, particularly as data volumes and concurrent query activity increase.

Query acceleration is particularly well suited for workloads that:

- Scan and process large volumes of data.
- Perform complex joins across large datasets.
- Execute aggregations and analytical calculations over large result sets.
- Support high-concurrency environments with many users, applications, or AI agents issuing queries simultaneously.
- Power interactive analytics, dashboards, reporting, and operational applications where low latency is important.

## How query acceleration works

Query acceleration automatically improves the execution of eligible analytical workloads in Fabric Data Warehouse. 

When you submit a query: 

1. Fabric Data Warehouse analyzes the query plan and identifies operations that can benefit from accelerated execution. 
1. The warehouse offloads eligible operations to a GPU-accelerated execution engine, which acts as a co-processor alongside the CPUs in the same compute node.  
1. Together, the GPUs and CPUs execute the query plan and return results through the same T-SQL interface and user experience. 

This approach delivers faster, more predictable query performance without requiring changes to existing queries, applications, or data models.

## Performance expectations

The actual performance improvement depends on workload characteristics, query shape, data distribution, and operator eligibility. Query acceleration doesn't guarantee identical performance gains across workloads. Factors that influence acceleration include:

| Factor | Impact |
|----------|----------|
| Data Volume | Queries that process larger datasets, typically up to 1 TB of data, are most likely to benefit from acceleration. |
| Query Shape | Query acceleration is designed for read-intensive analytical workloads. Operations such as scans, joins, and aggregations can benefit from acceleration, while write operations don't. |
| Concurrency | Workloads with many concurrent queries can benefit from improved throughput and more predictable performance. |

### Query eligibility for query acceleration

Not every query or operator is eligible for acceleration. Query eligibility depends on the characteristics of the query and the data being processed.

The most common reasons a query might not qualify for query acceleration are:

- **nvarchar** data type usage
  - Query acceleration currently provides limited support for **nvarchar**. Where possible, use **varchar(8000)** instead of **nvarchar** to maximize query eligibility.

- Case-insensitive collations
  - Query acceleration currently provides limited support for [case-insensitive collations](collation.md). Where possible, use a **case-sensitive collation** to maximize query eligibility.

## How to join the query acceleration preview

To ensure a high-quality preview experience, Microsoft is gradually rolling out query acceleration. Customers who request access are onboarded on a first-come, first-served basis.

Customers can request access by completing the registration form: [Query Acceleration Registration Form](https://aka.ms/GPU-FabricDW).

After Microsoft approves your access request, you receive an email confirming that query acceleration is available for your tenant.

To enable query acceleration:

1. Ensure your Fabric capacity is located in a [supported region](#regional-support).
1. Go to your workspace.
1. Open **Workspace settings**.
1. Under **Fabric Warehouse**, select **Query Acceleration**.
1. Turn on the **Query Acceleration** toggle.

> [!IMPORTANT]
> Enabling or disabling query acceleration cancels any queries currently running in the workspace. Make this change during periods of low activity.

When you enable query acceleration, it automatically applies to eligible T-SQL queries across all Fabric Data Warehouses and SQL analytics endpoints in the workspace. Existing queries, applications, reports, and data models continue to work without modification.

### Regional support

During the current preview, query acceleration for Fabric Data Warehouse is available inside capacities in the following regions only:

- United States: East US, East US 2, and South Central US
- South East Asia
- Germany West Central
 
Customers outside supported regions need to create a Fabric capacity in a supported region.

## Monitoring and observability of query acceleration

Use the following monitoring experiences to determine whether query acceleration applied to a query.

### Monitor query acceleration in the Fabric portal

- In the Fabric portal's [Monitor](monitor.md) page, go to **Query history**, and review the **Query Acceleration** column. This column shows whether acceleration was applied to a specific query. If acceleration wasn't applied, either query acceleration is disabled or the query isn't eligible for acceleration.
- In **Long running queries**, review the **Count of accelerated runs** metric. This metric shows how many times acceleration was applied to the query.
- In **Frequently run queries**, review the **Count of accelerated runs** metric. This metric shows the total number of accelerated executions for the query over time.

### Monitor query acceleration by using query insights views

You can write T-SQL queries on [query insights views](query-insights.md) to determine whether query acceleration was enabled when a query was executed and whether acceleration was applied to that query. Inside your warehouse, find query insights views under **Schemas**, **queryinsights**, **Views**.

The following Query Insights views contain query acceleration information:

- `queryinsights.exec_requests_history`
  - Review the `is_accelerated` column.
  - `1` indicates query acceleration was applied to the query.
    - `0` indicates query acceleration wasn't applied. If acceleration wasn't applied, either query acceleration was disabled or the query wasn't eligible for acceleration.

- `queryinsights.long_running_queries`
  - Review the `number_of_accelerated_runs` column.
  - This value indicates the total number of executions for which query acceleration was applied.

- `queryinsights.frequently_run_queries`
  - Review the `number_of_accelerated_runs` column.
  - This value indicates the total number of executions for which query acceleration was applied.

Use these views to verify that query acceleration is being applied and to understand acceleration patterns across your warehouse over time.

### View query acceleration in execution plan

You can use SQL Server Management Studio (SSMS) to inspect query execution plans, including query acceleration operators and execution details. Graphical query plans can help you understand how a query was executed and identify which portions of the query plan were accelerated.

When query acceleration is enabled and active on an eligible query, accelerated queries display a special **Query Acceleration** operator within the plan.

:::image type="content" source="media/query-acceleration/graphical-execution-plan-operator.png" alt-text="Screenshot of a sample query using the Query Accleration operator.":::

To view the graphical execution plans, see:

- In [SQL Server Management Studio (SSMS)](/sql/ssms/download-sql-server-management-studio-ssms), see [Display an Actual Execution Plan](/sql/relational-databases/performance/display-an-actual-execution-plan?view=fabric&preserve-view=true).
- In the [MSSQL extension](https://aka.ms/mssql-marketplace) for [Visual Studio Code](https://code.visualstudio.com/docs), see [Query Plan Visualizer](/sql/tools/visual-studio-code-extensions/mssql/mssql-extension-visual-studio-code?view=fabric&preserve-view=true#query-plan-visualizer).

## How is query acceleration billed?

Query acceleration uses the same business model as the rest of Fabric and is billed using **Capacity Units (CU)**.

Query acceleration uses a separate meter. This meter consumes CUs at a higher rate than baseline Fabric Data Warehouse workloads. You pay this charge only when you enable query acceleration. Once enabled, all queries are billed through the query acceleration meter. For more information, see [Billing and utilization reporting in Fabric Data Warehouse](usage-reporting.md) and [How to: Observe Fabric Data Warehouse utilization trends](how-to-observe-utilization.md).

## Related content

- [Performance guidelines in Fabric Data Warehouse](guidelines-warehouse-performance.md)
- [Query acceleration in Fabric Data Warehouse Frequently Asked Questions](query-acceleration-faq.yml)
