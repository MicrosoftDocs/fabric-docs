---
title: Workload Management
description: Learn how Microsoft manages data warehouse compute resources to service workloads.
ms.reviewer: brmyers, sosivara
ms.date: 03/11/2026
ms.topic: concept-article
ms.search.form: Optimization # This article's title should not change. If so, contact engineering.
---
# Workload management

**Applies to:** [!INCLUDE [fabric-se-and-dw](includes/applies-to-version/fabric-se-and-dw.md)]

This article describes the architecture and workload management in Fabric Data Warehouse.

## Data processing

The [!INCLUDE [fabric-dw](includes/fabric-dw.md)] and [!INCLUDE [fabric-se](includes/fabric-se.md)] share the same underlying processing architecture. As Fabric retrieves or ingests data, a distributed engine handles both small and large-scale data and computational functions.

The processing system is serverless in that backend compute capacity scales up and down autonomously to meet workload demands.

:::image type="content" source="media/workload-management/sql-engine-diagram.svg" alt-text="Diagram of the SQL engine.":::

When a query is submitted, the SQL frontend (FE) performs query optimization to determine the best plan based on the data size and complexity. Once the plan is generated, it's given to the Distributed Query Processing (DQP) engine. The DQP orchestrates distributed execution of the query by splitting it into smaller queries that are executed on backend compute nodes. Each small query is a **task** and represents a distributed execution unit. It reads files from [OneLake](../onelake/onelake-overview.md), joins results from other tasks, groups, or orders data retrieved from other tasks. For ingestion jobs, it also writes data to the proper destination tables.

When data is processed, results are returned to the SQL frontend for serving back to the user or calling application.

## Elasticity and resiliency

Backend compute capacity benefits from a fast provisioning architecture. Although there's no SLA on resource assignment, typically new nodes are acquired within a few seconds. As resource demand increases, new workloads use the scaled-out capacity. Scaling is an online operation and query processing goes uninterrupted.

:::image type="content" source="media/workload-management/scaling-diagram.svg" alt-text="Diagram that shows fast provisioning of resources.":::

The system is fault tolerant and if a node becomes unhealthy, operations executing on the node are redistributed to healthy nodes for completion.

[!INCLUDE [fabric-dw](includes/fabric-dw.md)] and [!INCLUDE [fabric-se](includes/fabric-se.md)] provide [burstable capacity](burstable-capacity.md) that allows workloads to use more resources to achieve better performance, and use [smoothing](compute-capacity-smoothing-throttling.md) to offer relief for customers who create sudden spikes during their peak times and have idle capacity left unused at other times. Smoothing simplifies capacity management by spreading the evaluation of compute to ensure that customer jobs run smoothly and efficiently.

## Scheduling and resourcing

The distributed query processing scheduler operates at a **task** level. Queries are represented to the scheduler as a directed acyclic graph (DAG) of tasks. This concept is familiar to Spark users. A DAG allows for parallelism and concurrency as tasks that don't depend on each other can be executed simultaneously or out of order.

As queries arrive, their tasks are scheduled based on first-in-first-out (FIFO) principles. If there's idle capacity, the scheduler might use a "best fit" approach to optimize concurrency.

When the scheduler identifies resourcing pressure, it invokes a scale operation. Scaling is managed autonomously and backend topology grows as concurrency increases. As it takes a few seconds to acquire nodes, the system is not optimized for consistent subsecond performance of queries that require distributed processing.

When pressure subsides, backend topology scales back down and releases resource back to the region.

<a id="ingestion-isolation"></a>

## Compute pool isolation

**Applies to:** [!INCLUDE [fabric-dw](includes/applies-to-version/fabric-dw.md)]

The [capacity SKU assigned](burstable-capacity.md#sku-guardrails) to a workspace determines the total compute available for its SQL analytics endpoint. This compute is split evenly (50/50) into two isolated resource pools for user queries to utilize:

* **SELECT Pool** - Handles all `SELECT` queries.
* **Non-SELECT Pool** - Handles all non-`SELECT` queries, such as ETL or ingestion operations.

Each pool scales independently based on query demand but never exceeds 50% of the total compute for the SQL analytics endpoint. This separation prevents resource contention, ensuring ingestion workloads run on dedicated compute optimized for ETL without impacting read queries. The result is improved performance and reliability for both query types.

:::image type="content" source="media/workload-management/etl-isolation.svg" alt-text="Diagram that shows isolation of ingestion activities.":::

> [!NOTE]
> The `SELECT` and non-`SELECT` pool isolation is the default autonomous workload management applied to every workspace. However, workspace administrators can customize this by using [custom SQL pools](custom-sql-pools.md).

## Sessions

The [!INCLUDE [fabric-dw](includes/fabric-dw.md)] and [!INCLUDE [fabric-se](includes/fabric-se.md)] have a user session limit of 724 per workspace. When this limit is reached an error will be returned: `The user session limit for the workspace is 724 and has been reached`.

> [!NOTE]
> As Microsoft Fabric is a SaaS platform, there are many system connections that run to continuously optimize the environment. DMVs show both system and user sessions. For more information, see [Monitor connections, sessions, and requests using DMVs](monitor-using-dmv.md).

## Best practices

The [!INCLUDE [product-name](../includes/product-name.md)] workspace provides a natural isolation boundary of the distributed compute system. Workloads can take advantage of this boundary to manage both cost and performance.

[OneLake shortcuts](../onelake/onelake-shortcuts.md) can be used to create read-only replicas of tables in other workspaces to distribute load across multiple SQL engines, creating an isolation boundary. This can effectively increase the maximum number of sessions performing read-only queries.

:::image type="content" source="media/workload-management/workspace-isolation.svg" alt-text="Diagram that shows isolation of two workspaces, for example, the Finance and the Marketing workspace.":::

## Related content

- [OneLake, the OneDrive for data](../onelake/onelake-overview.md)
- [What is Fabric Data Warehouse?](data-warehousing.md)
- [Better together: the lakehouse and warehouse](get-started-lakehouse-sql-analytics-endpoint.md)
- [Burstable capacity in Fabric Data Warehouse](burstable-capacity.md)
- [Smoothing and throttling in Fabric Data Warehouse](compute-capacity-smoothing-throttling.md)
