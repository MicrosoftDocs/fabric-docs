---
title: Custom SQL Pools
description: Learn more about how custom SQL pools relate to workload management in Fabric data warehousing.
ms.reviewer: brmyers, sosivara
ms.date: 03/11/2026
ms.topic: concept-article
ms.search.form: Optimization # This article's title should not change. If so, contact engineering.
---

# Custom SQL pools

**Applies to:** [!INCLUDE [fabric-se-and-dw](includes/applies-to-version/fabric-se-and-dw.md)]

[!INCLUDE [feature-preview-note](../includes/feature-preview-note.md)]

Custom SQL pools allow administrators to have more control over how backend compute resources are allocated to their warehouse and SQL analytics endpoint in a workspace.

:::image type="content" source="media/custom-sql-pools/custom-sql-pools.svg" alt-text="Diagram of the SQL engine with custom SQL pools.":::

Fabric Data Warehouse provides autonomous workload management that segregates compute resources into internal "SQL pools" that scale independently based on demand. 

By default, the isolation boundaries are ingestion (non-`SELECT` statement types) and query processing (`SELECT` statements). With custom SQL pools, administrators can:

- Change the number of isolation boundaries (add more custom SQL pools).
- Create application name-specific custom workload classifications.
- Control resource allocation of each pool, via a max resource percentage.

## Custom SQL pools use cases

Custom SQL pools have two primary use cases: protecting workloads from resource competition, and protecting from Fabric capacity throttling from high consumption.

### Competing workloads with the autonomous workload pools

This scenario applies when distinct workloads compete for resources, causing critical workloads to miss performance goals.

**Example scenario**

- An enterprise reporting workload performs sub-optimally when adhoc user queries are run from the SQL query editor in the Fabric portal.

**Recommended approach**

- Split these workloads across two separate custom SQL pools.
- Allocate a larger percentage of resources to the pool serving the enterprise reporting application, ensuring more resources are available to the business critical application.

### Capacity throttling due to high consumption

This scenario applies when high Fabric capacity consumption causes throttling that impacts overall warehouse performance.

**Example scenario**

- Multiple analytics workloads are consuming a high number of [Fabric capacity units (CUs)](../enterprise/plan-capacity.md).

**Recommended approach**

- Reduce the total resource percentage allocated to the affected warehouse.
- Monitor whether this change reduces query throttling and improves overall performance.

## Differences between autonomous workload management and custom SQL pools

| Topic           | Autonomous workload management | Custom SQL pools |
|---------------------|----------------------------|------------------------------|
| Configuration       | None (out of the box)      | - Web UI<br> - APIs  |
| Permissions         | N/A                        | Workspace administrator  |
| Scope               | Workspace - includes both warehouse and SQL analytics endpoint | Workspace - includes both warehouse and SQL analytics endpoint |
| Classification method | Statement type (`SELECT` or other) | - Application name<br> - Application name regular expression |
| Unit of Measure | N/A | Percentage of the total backend nodes |
| SQL pools | `SELECT` or other | User-defined allocation |
| Burstable capacity | Managed by Fabric (up to 12x per SQL pool, 24x total) | User defined based on percentage of backend nodes allocated. The total amount of resources is still 24x. |

## Burstable capacity

Custom SQL pools allow for an administrator to configure the maximum resource percentage as the amount of compute resources that can be allocated. The bursting factor of the capacity SKU size will be applied and used by the percentage given for each pool. 

## Classifiers

A classifier is an attribute of a SQL request that informs the system how to route to the appropriate SQL pool. 

Fabric Data Warehouse provides three ways to classify requests:

| Classifier type | Description | Configuration |
| --------------- | ----------- | ------------------------ |
| Statement type  | Classifies requests into either `SELECT` (query) or non-`SELECT` (all DML, DDL statements) | Autonomous workload management only |
| Application name |  - App (or program name) used in the connection string when connecting to the Fabric Warehouse or SQL Analytics Endpoint.<br> - Supports multiple application names per custom SQL pool<br> - 128 characters or less <BR> - Mutually exclusive between custom SQL pools | Custom SQL pools only |
| Application name regex | -  Regular expression used to match value for the application name.<br> -  Only first value in the list is evaluated for regular expression| Custom SQL pools only |

Guidelines:

- Only one classifier type can be used per workspace. All custom SQL pools in a single workspace must use the same classifier.
- In the case of an application name regular expression classifier, if a request satisfies two or more classifications, selection of custom SQL pool is random and there are no prioritization criteria.

## Permissions

 - Members of the Administrator [workspace role](workspace-roles.md) can enable or disable custom SQL pools for a workspace.
 - Members of the Administrator workspace role can update the custom SQL pool configurations.

## Configure custom SQL pools

You can configure custom SQL pools in Fabric Data Warehouse in the Fabric portal or through API calls.

- For an example of configuring in the Fabric portal, see [Configure custom SQL pools in the Fabric portal](configure-custom-sql-pools-portal.md).
- For an example of using the [SQL Pools REST API](/rest/api/fabric/warehouse/items), see [How to configure custom SQL pools by using the Fabric REST API](configure-custom-sql-pools-api.md).

## Monitor

You can see the application name and SQL pool that were recorded for a query in the `program_name` and `sql_pool_name` fields of the `queryinsights.exec_requests_history` system view. 

You can use the `program_name` as the application name in a classifier, or in a regular expression pattern for an application name classifier.

For example, to find all the `program_name` and the corresponding `sql_pool_name` in recent history:

```sql
SELECT DISTINCT 
         program_name
        ,sql_pool_name
FROM queryinsights.exec_requests_history;
```

You can identify which SQL pools are under pressure by querying the `queryinsights.sql_pool_insights` view.

For example, find periods of time when a pool was under pressure over the past week.

```sql
SELECT [timestamp]
        ,sql_pool_name
        ,max_resource_percentage
        ,is_pool_under_pressure
FROM queryinsights.sql_pool_insights
WHERE is_pool_under_pressure = 1
AND [timestamp] > DATEADD(WEEK, -1, GETDATE())
ORDER BY [timestamp] DESC, sql_pool_name;
```

To aggregate `program_name` values by some query cost metrics, you could use the following query:

```sql
SELECT 
    program_name,
    sql_pool_name,
    [CPU] = SUM(allocated_cpu_time_ms), 
    [Disk] = SUM(data_scanned_disk_mb), 
    [Memory] = SUM(data_scanned_memory_mb), 
    [Remote storage] = SUM(data_scanned_remote_storage_mb)
FROM queryinsights.exec_requests_history
GROUP BY program_name, sql_pool_name
ORDER BY [CPU] desc, [Disk] desc, [Memory] desc, [Remote storage] desc;
```

## Limitations

- A workspace must contain one or more warehouses or SQL analytics endpoints before running the APIs.
- You can create up to eight custom SQL pools per workspace.
- When a custom SQL pool is removed while a query is running on the pool, the query will fail with a message of `Request to perform an external distributed computation has failed with error "Query canceled by user."` Resizing a custom SQL pool does not cause query failure.

## Fabric capacity size changes

Each workspace has a capacity with associated capacity units (CUs), based on the [SKU you purchase](../enterprise/plan-capacity.md). The burstable capacity of custom SQL pools depends on the SKU size. So, when you change the capacity, you affect the maximum amount of resources for each custom SQL pool.

When you change the capacity SKU size or assign a different capacity to a workspace, if custom SQL pools are enabled they automatically scale to the new SKU size.

If downscaling forces a SQL pool to zero nodes assigned, the following error displays at runtime: *"The assigned SQL pool for this query has no resources and must be reconfigured."* An admin must reconfigure custom SQL pools to remove this error.

## Next step

> [!div class="nextstepaction"]
> [Configure custom SQL pools in the Fabric portal](configure-custom-sql-pools-portal.md)

## Related content

- [Workload Management](workload-management.md)
- [Performance guidelines in Fabric Data Warehouse](guidelines-warehouse-performance.md)
- [How to configure custom SQL pools by using the Fabric REST API](configure-custom-sql-pools-api.md)

