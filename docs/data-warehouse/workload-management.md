---
title: Workload Management
description: Learn how Microsoft manages data warehouse compute resources to service workloads.
ms.reviewer: wiassaf
ms.author: stevehow
author: realAngryAnalytics
ms.topic: conceptual
ms.date: 04/12/2023
ms.search.form: Information
---

# Workload Management

[!INCLUDE [preview-note](../includes/preview-note.md)]

**Applies to:** [!INCLUDE [fabric-se-and-dw](includes/applies-to-version/fabric-se-and-dw.md)]

The [!INCLUDE [fabric-dw](includes/fabric-dw.md)] and [!INCLUDE [fabric-dw](includes/fabric-se.md)] share the same underlying processing architecture. As data is retrieved or ingested, it leverages a distributed engine built for both small and large-scale data and computational functions.

The processing system is serverless in that backend compute capacity scales up and down autonomously to meet workload demands.

:::image type="content" source="media\workload-management\sql-engine-diagram.png" alt-text="Diagram of the sql engine." lightbox="media\workload-management\sql-engine-diagram.png":::

When a query is submitted, the SQL frontend (FE) performs query optimization to determine the best plan based on the data size and complexity. Once the plan is generated, it is given to the Distributed Query Processing (DQP) engine to  orchestrate distributed execution of the query by splitting it into smaller queries that will be executed on backend compute nodes. Each small query is called a **task** and represents a distributed execution unit. It reads file(s) from OneLake, joins results from other tasks, groups, or orders data retrieved from other tasks. For ingestion jobs, it also writes data to the proper destination tables.

When data is processed, results are returned to the SQL frontend for serving back to the user or calling application.

## Elasticity and Resiliency
Backend compute capacity benefits from a fast provisioning architecture. Although there is no SLA on resource assignment, typically, new nodes are acquired within a few seconds. As resource demand increases new workloads will leverage the scaled out capacity. Scaling is an online operation and query processing goes uninterrupted.

:::image type="content" source="media\workload-management\scaling-diagram.png" alt-text="Diagram that shows fast provisioning of resources." lightbox="media\workload-management\scaling-diagram.png":::

The system is fault tolerant and if a node becomes unhealthy, operations executing on the node will be redistributed to healthy nodes for completion.

## Scheduling and Resourcing
The distributed query processing scheduler operates at a **task** level. Queries are represented to the scheduler as a directed acyclic graph (DAG) of tasks. This concept is familiar to Spark users. A DAG allows for parallelism and concurrency as tasks that do not depend on each other can be executed simultaneously or out of order.

As queries arrive, their tasks are scheduled based on first-in-first-out principles (FIFO), however if there is idle capacity the scheduler may use a "best fit" approach to optimize concurrency.

When the scheduler identifies resourcing pressure, it will invoke a scale operation. This is managed autonomously and backend topology will grow as concurrency increases. As it takes a few seconds to acquire nodes, the system is not optimized for consistent sub-second performance of queries that require distributed processing.
 
When pressure subsides, backend topology will scale back down and release resource back to the region.

## Ingestion Isolation
**Applies to:** [!INCLUDE [fabric-dw](includes/applies-to-version/fabric-dw.md)]

In the backend compute pool, loading activities are provided resource isolation from analytical workloads. This improves performance and reliability, as ingestion jobs can run on dedicated nodes that are optimized for ETL and do not compete with other queries or applications for resources.

:::image type="content" source="media\workload-management\ETL-isolation.png" alt-text="Diagram that shows isolation of ingestion activities." lightbox="media\workload-management\ETL-isolation.png":::

## Best Practices
The [!INCLUDE [product-name](../includes/product-name.md)] workspace provides a natural isolation boundary of the distributed compute system. Workloads can take advantage of this boundary to manage both cost and performance.

During PREVIEW [!INCLUDE [fabric-dw](includes/fabric-dw.md)] and [!INCLUDE [fabric-dw](includes/fabric-se.md)] are not optimized for high-concurrency.

[OneLake shorcuts](../onelake/onelake-shortcuts.md) can be leveraged to create read-only replicas of tables in other workspaces to distribute load across multiple sql engines creating an isolation boundary.



