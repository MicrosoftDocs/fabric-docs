---
title: Warehouse Consumption and Utilization in Microsoft Fabric
description: Learn how vNode allocation, compute usage, and capacity metrics determine consumption and utilization for Fabric Data Warehouse.
ms.reviewer: brmyers, sosivara
ms.date: 08/11/2026
ms.topic: concept-article
ms.search.form: Warehouse billing and utilization
ms.custom: sfi-image-nochange
---

# Warehouse consumption and utilization in Microsoft Fabric

**Applies to:** [!INCLUDE [fabric-se-and-dw](includes/applies-to-version/fabric-se-and-dw.md)]

Fabric Data Warehouse uses a consumption-based model that measures the compute resources allocated to warehouse workloads over time.

This article explains how warehouse consumption is measured and how billing is calculated. For more information on monitoring utilization, see [How to: Observe Fabric Data Warehouse utilization trends](how-to-observe-utilization.md).

## How warehouse consumption is measured

In the capacity-based SaaS model, Fabric Data Warehouse consumption is measured based on the compute resources allocated to support workload activity.

Fabric allocates compute resources to the workload during read and write activity against a warehouse, and read activity against the [!INCLUDE [fabric-se](includes/fabric-se.md)] of a lakehouse.

Fabric Data Warehouse measures consumption using vNodes (virtual nodes). A vNode is a collection of four vCores and serves as the unit of resource allocation and consumption measurement. For information about the CU consumption rate associated with warehouse compute resources, see [Fabric Operations](../enterprise/fabric-operations.md). As workload demand changes, Fabric dynamically allocates and releases vNodes.

Compute resources are allocated using a one-minute baseline allocation window. Consumption is then measured and reported per second based on the number of allocated vNodes. As workload demand increases or decreases, vNode allocations adjust accordingly.

<a id="billing-rules"></a>

## Understand the billing model

Conceptually, you can understand warehouse consumption as: **Consumption = Active vNodes × Active Time**.

This simplified model helps explain consumption behavior. Actual reporting reflects the compute resources allocated over time across warehouse operations.

Warehouse automatically scales compute resources in response to workload demand. The Fabric capacity SKU determines the [burstable vNode resources available to warehouse workloads](burstable-capacity.md).

### Warehouse operation categories

You can analyze universal compute capacity usage by workload category, across the tenant. Fabric tracks usage by total Capacity Unit Seconds (CUs). The table displayed shows aggregated usage across the last 14 days.

Both the [!INCLUDE [fabric-dw](includes/fabric-dw.md)] and [!INCLUDE [fabric-se](includes/fabric-se.md)] roll up under **Warehouse** in [the Metrics app](../enterprise/metrics-app.md#install-the-app), as they both use SQL compute. The operation categories you see in this view are:

- **Warehouse Query**: Compute charge for all user-generated and system-generated T-SQL statements within a warehouse.
- **SQL Endpoint Query**: Compute charge for all user-generated and system-generated T-SQL statements within a [!INCLUDE [fabric-se](includes/fabric-se.md)].
- **Warehouse Snapshot Query**: Compute charge for all user generated and system generated T-SQL statements on a warehouse snapshot.

For example:

:::image type="content" source="media/usage-reporting/warehouse-operations.png" alt-text="Screenshot of the Data warehouse operation categories in the Microsoft Fabric Capacity Metrics app.":::

### Timepoint explore graph

This graph in the Microsoft Fabric Capacity Metrics app shows utilization of resources compared to capacity purchased. 100% of utilization represents the full throughput of a capacity SKU and is shared by all Fabric workloads. This value is represented by the yellow dotted line. Selecting a specific timepoint in the graph enables the **Explore - TimePoint Detail** button, which opens a detailed drill-through page.

:::image type="content" source="media/usage-reporting/throttling-explore.png" alt-text="Screenshot of the explore button in the Microsoft Fabric Capacity Metrics app." lightbox="media/usage-reporting/throttling-explore.png":::

In general, similar to Power BI, [operations are classified either as interactive or background](../enterprise/fabric-operations.md#interactive-and-background-operations), and denoted by color. Most operations in the **Warehouse** category are reported as *background* to take advantage of 24-hour smoothing of activity to allow for the most flexible usage patterns. Classifying warehouse activity as background reduces the frequency of peaks of CU utilization from triggering [throttling](compute-capacity-smoothing-throttling.md).

### Timepoint drill-through graph

The timepoint drill-through table in the Microsoft Fabric Capacity Metrics app provides a detailed view of utilization at specific timepoints. It shows the amount of capacity that the given SKU provides for each 30-second period, along with a breakdown of interactive and background operations. The interactive operations table lists the operations that run at that timepoint.

The **Background operations** table might appear to display operations that ran much earlier than the selected timepoint. This discrepancy occurs because background operations in a shared capacity (F SKU) undergo 24-hour [smoothing](compute-capacity-smoothing-throttling.md). For example, the table displays all operations that ran and are still smoothing at the selected timepoint.

Top use cases for this view include:

- **Determine whether consumption is driven by user-initiated or system-initiated workloads.**
    - Examples of user-initiated workloads include running T-SQL queries or interacting with the Fabric portal, such as using the SQL Query Editor or Visual Query Editor.
    - Examples of system-initiated workloads include data compaction and other background tasks that run automatically to optimize performance and improve query execution.
- **Identify the time periods that consumed the most resources.**
    - Sort the table by Total CU(s) in descending order to identify the most expensive time periods. Capture the corresponding Start and End timestamps.
    - To identify queries that ran during the selected interval, use T-SQL queries on Query Insights views, specifically [query insights.exec_requests_history](/sql/relational-databases/system-views/queryinsights-exec-requests-history-transact-sql?view=fabric&preserve-view=true). For example, to identify queries that were running during a specific interval:

    ```sql
    DECLARE @Start_Time DATETIME2(0) = '2026-08-10 8:00:00'
            ,@End_Time DATETIME2(0) = '2026-08-10 9:00:00'

    SELECT
            [database_name],
            sql_pool_name,
            distributed_statement_id,
            login_name,
            allocated_cpu_time_ms / 1000.0 AS vcore_seconds
    FROM queryinsights.exec_requests_history
    WHERE start_time < @End_Time
    AND end_time > @Start_Time;
    ```

## Monitor warehouse consumption

You can analyze warehouse consumption by using both the [Fabric Capacity Metrics app](../enterprise/metrics-app.md) and [Query Insights](query-insights.md). These tools answer different but complementary questions.

### Fabric Capacity Metrics app

Use Capacity Metrics to understand:

- Warehouse consumption trends.
- Periods of high utilization.
- Consumption across workspaces and items.
- Consumption relative to other Fabric workloads on the same capacity.
- Time windows that might require investigation.

Capacity Metrics is the primary tool for determining **when** consumption occurred and **how much** consumption was reported during a given period.

### Query Insights

Use Query Insights to understand:

- Which queries were active during periods of consumption.
- Which usage patterns were associated with activity.
- Query execution characteristics that might explain increased utilization.
- Potential workload optimization opportunities.

Query Insights helps explain **what was running** while Capacity Metrics helps identify **when consumption occurred**. Together, they provide a more complete picture of warehouse utilization.

### Considerations

Consider the following usage reporting nuances:

- Cross database reporting: When a T-SQL query joins across multiple warehouses (or across a [!INCLUDE [fabric-dw](includes/fabric-dw.md)] and a [!INCLUDE [fabric-se](includes/fabric-se.md)]), usage is reported against the originating resource.
- Queries on system catalog views and dynamic management views are billable queries.

## Investigate unexpected consumption

To investigate a period of unexpected warehouse consumption:

1. Identify the time window in [Capacity Metrics](../enterprise/metrics-app.md).
2. Review warehouse utilization during that period.
3. Use T-SQL queries on [Query Insights](query-insights.md) and [warehouse dynamic management views (DMVs)](monitor-using-dmv.md) to evaluate the associated activity.
4. Determine whether utilization was related to user workloads, concurrency, or system-generated operations.
5. Identify opportunities to optimize workload patterns or query performance. 
    - Consider features like [warehouse workload management](workload-management.md) and [data clustering](data-clustering.md). 
    - Review [Performance guidelines in Fabric Data Warehouse](guidelines-warehouse-performance.md).

## Frequently asked questions

### What is a vNode?

A virtual node (vNode) is the unit of warehouse compute used for resource allocation and consumption measurement.

### Does background activity consume capacity?

Yes. Consumption can include both user-generated activity and system-generated operations such as maintenance and optimization tasks.

### How does concurrency affect consumption?

As concurrent workload demand increases, Fabric might allocate extra vNodes. Increased allocation can result in higher consumption.

### Where can I monitor warehouse consumption?

Use the [Fabric Capacity Metrics app](../enterprise/metrics-app.md) to understand consumption and utilization trends. Use [Query Insights](query-insights.md) and [T-SQL queries on DMVs](monitor-using-dmv.md) to analyze the activity associated with those periods.

## Next step

> [!div class="nextstepaction"]
> [How to: Observe Fabric Data Warehouse utilization trends](how-to-observe-utilization.md)

## Related content

- [Monitor connections, sessions, and requests using DMVs](monitor-using-dmv.md)
- [Fabric Data Warehouse performance guidelines](guidelines-warehouse-performance.md)
- [Understand your Azure bill on a Fabric capacity](../enterprise/azure-billing.md)
