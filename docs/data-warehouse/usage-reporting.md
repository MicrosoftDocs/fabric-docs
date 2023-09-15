---
title: Data warehouse billing and utilization reporting
description: Learn more about utilization reporting for the data warehouse, including capacity and compute usage reporting.
author: sowmi93 
ms.author: sosivara
ms.reviewer: wiassaf
ms.topic: conceptual
ms.date: 09/18/2023
---

# Billing and utilization reporting

**Applies to:** [!INCLUDE[fabric-se-and-dw](includes/applies-to-version/fabric-se-and-dw.md)]

The article explains compute usage reporting of the Synapse Data Warehouse in [!INCLUDE [product-name](../includes/product-name.md)], which includes read and write activity against the Warehouse, and read activity on the SQL Endpoint of the Lakehouse.

## Capacity

In Fabric, based on the Capacity SKU purchased, you're entitled to a set of Capacity Units (CUs) that are shared across all Fabric workloads. For more information on licenses supported, see [Microsoft Fabric licenses](/fabric/enterprise/licenses).

Capacity is a dedicated set of resources that is available at a given time to be used. Capacity defines the ability of a resource to perform an activity or to produce output. Different resources consume CUs at different times.

CUs consumed by data warehousing include read and write activity against the Warehouse, and read activity on the SQL Endpoint of the Lakehouse.

## Compute usage reporting

In the capacity-based SaaS model, Fabric data warehousing aims to make the most of the purchased capacity and provide visibility into usage.

The "CPU time" metric captures usage of compute resources when requests are executed.

"CPU time" is not the same as elapsed time, it's the time spent by compute cores in execution of a request. Similar to how Windows accounts for Processor Time, multi-threaded workloads record more than one second of "CPU time" per second.

Like other Fabric workloads, data warehousing workloads report CPU consumption periodically, and Fabric platform consolidates usage and produce a per-second Billing report (with a 60-second minimum).

### Billing principles

This table provides information on the types of billable events.

| Category                                       | Description                                                                             | Example                 | Billed |
|------------------------------------------------|-----------------------------------------------------------------------------------------|-------------------------|--------|
| User-initiated operations                      | Operations triggered by customers like user queries or scheduled jobs.                  | `SELECT * FROM nyctaxi` | Yes    |
| Metadata operations                            | Operations that send requests to Dynamic management views (DMVs), system catalog views. | `SELECT * FROM sys.dm_exec_requests` | Yes    |
| System-initiated operations (via user trigger) | System background operations that get triggered because of user actions.                | User drops a table, and garbage collector performs cleanup activity, automatic creation of statistics | Yes  |
| Purely system-initiated operations             | Regular system maintenance class of operations. | Software maintenance upgrades, regular scans looking for work to do | No     |

#### Billing example

Consider the following query:

```sql
SELECT * FROM Nyctaxi;
```

For demonstration purposes, assume the billing metric accumulates 100 CPU seconds.

The cost of this query is **CPU time times the price per CU**. Assume in this example that the price per CU is $0.18/hour. The cost would be (100 x 0.18)/3600 = $0.005.

The numbers used in this example are for demonstration purposes only and not actual billing metrics.

### Cost monitoring

The [Microsoft Fabric Capacity Metrics app](../enterprise/metrics-app.md) provides visibility into capacity usage for all Fabric workloads in one place. It's mostly used by administrators to monitor the performance of workloads and their usage, compared to purchased capacity.  

Select the **Warehouse** from the **Select item kind:** dropdown. The **Multi metric ribbon chart** chart and the **Items (14 days)** data table will show only Warehouse activity.

:::image type="content" source="media/usage-reporting/fabric-capacity-metrics-app.gif" alt-text="An animated gif of the Fabric Capacity Metrics Overview page in the Microsoft Fabric Capacity Metrics app." lightbox="media/usage-reporting/fabric-capacity-metrics-app.gif":::

#### Warehouse operation categories

You can analyze universal compute capacity usage by workload category, across the tenant. Usage is tracked by total Capacity Unit Seconds (CU(s)). The table displayed shows aggregated usage across the last 14 days.

Both the Warehouse and SQL Endpoint roll up under **Warehouse** in the Metrics app, as they both use SQL compute. The operation categories seen in this view are:

- **Warehouse Query**: Compute charge for all user generated and system generated T-SQL statements within a warehouse.
- **SQL Endpoint Query**: Compute charge for all user generated and system generated T-SQL statements within a SQL Endpoint.
- **OneLake Compute**: Compute charge for all reads and writes for data stored in OneLake.

For example:

:::image type="content" source="media/usage-reporting/warehouse-operations.png" alt-text="A screenshot of the Data warehouse operation categories in the Microsoft Fabric Capacity Metrics app." lightbox="media/usage-reporting/warehouse-operations.png":::

- Examples of user generated statements include running SELECT, CTAS, or COPY INTO, from any tool or application.  
- Examples of system generated statements include metadata synchronous activities and other system background tasks that are run to enable faster query execution.  

#### Timepoint explore graph

This graph in the Microsoft Fabric Capacity Metrics app shows utilization of resources compared to capacity purchased. 100% of utilization represents the full throughput of a capacity SKU and is shared by all Fabric experiences. This is represented by the yellow dotted line. The **Logarithmic** scale option enables the **Explore** button, which opens a detailed drill through page.

In general, similar to Power BI, [operations are classified either as *interactive* or *background*](/power-bi/enterprise/service-premium-interactive-background-operations#operation-list), and denoted by color. All operations in **Warehouse** category are reported as *background* to take advantage of 24 hour smoothing of activity to allow for the most flexible usage patterns.

:::image type="content" source="media/usage-reporting/explore.png" alt-text="A screenshot of the explore button in the Microsoft Fabric Capacity Metrics app." lightbox="media/usage-reporting/explore.png":::

#### Timepoint drill through graph

This table in the Microsoft Fabric Capacity Metrics app provides a detailed view of utilization at specific timepoints. The amount of capacity provided by the given SKU per 30-second period is shown, along with the breakdown of interactive and background operations.

:::image type="content" source="media/usage-reporting/drill-through.png" alt-text="A screenshot of the Timepoint drill through graph in the Microsoft Fabric Capacity Metrics app." lightbox="media/usage-reporting/drill-through.png":::

Top use cases for this view include:

- Identification of a user who scheduled or ran an operation: values can be either "User@domain.com", "System", or "Power BI Service".
- Identification of an operation status: values can be either "Success", "InProgress", "Cancelled", "Failure", "Invalid", or "Rejected".
    - The "Rejected" status can occur because of resource limitations.
- Identification of an operation that consumed many resources: sort the table by **Total CU(s)** descending to find the most expensive queries, then use **Operation Id** to uniquely identify an operation. This is the distributed statement ID, which can be used in other monitoring tools like dynamic management views (DMVs) for end-to-end traceability, such as in `dist_statement_id` in [sys.dm_exec_requests](/sql/relational-databases/system-dynamic-management-views/sys-dm-exec-requests-transact-sql?view=fabric&preserve-view=true).

## Considerations

Consider the following usage reporting nuances:

- Caching: Usage numbers reported for the same queries could seem inconsistent. This can happen due to cold vs warm runs, and whether queries hit the cache.
- System tasks: T-SQL statements executed as part of a system task have the user value `System`.
- Cross database reporting: When a T-SQL query joins across multiple warehouses (or across the Warehouse and SQL Endpoint), usage is reported against the originating resource.
- Cancelled queries: Queries that are cancelled before completing have the status "Cancelled".

### Limitations

- Due to the distributed nature of Warehouse compute, some user activity may be reported as "System".

## Next steps

- [Monitor connections, sessions, and requests using DMVs](monitor-using-dmv.md)
- [Workload management](workload-management.md)
- [Synapse Data Warehouse in Microsoft Fabric performance guidelines](guidelines-warehouse-performance.md)
- [What is the Microsoft Fabric Capacity Metrics app?](../enterprise/metrics-app.md)
