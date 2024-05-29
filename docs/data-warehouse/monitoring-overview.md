---
title: Monitoring in Fabric Data Warehouse overview
description: Learn about the solutions and methods to monitor query activity in your Fabric warehouse.
author: jacindaeng
ms.author: jacindaeng
ms.reviewer: wiassaf
ms.date: 05/28/2024
ms.topic: conceptual
ms.search.form: Monitoring # This article's title should not change. If so, contact engineering.
---
# Monitor in Fabric Data warehouse overview

**Applies to:** [!INCLUDE [fabric-se-and-dw](includes/applies-to-version/fabric-se-and-dw.md)]

Monitoring the usage and activity is crucial for ensuring that the data warehouse operates efficiently.

Fabric provides a set of tools to help you:

- Optimize query performance
- Gain insights into your Fabric capacity to determine when it's time to scale up or down
- Understand details about running and completed queries

## Microsoft Fabric Capacity Metrics app

The Microsoft Fabric Capacity Metrics app provides visibility into capacity usage of each warehouse allowing you to see the compute charges for all user-generated and system-generated T-SQL statements within a warehouse and SQL analytics endpoint. For more information on monitoring capacity usage, see [Billing and utilization reporting in Synapse Data Warehouse](usage-reporting.md).

## Dynamic management views (DMVs)

Users can get insights about their live connections, sessions, and requests by querying a set of dynamic management views (DMVs) with T-SQL. For more information, see [Monitor connections, sessions, and requests using DMVs](query-activity.md).

## Query insights

Query Insights provides historical query data for completed, failed, canceled queries along with aggregated insights to help you tune your query performance. For more information, see [Query insights in Fabric data warehousing](query-insights.md).

## Query activity

Users are provided a one-stop view of their running and completed queries in an easy-to-use interface, without having to run T-SQL. For more information, see [Monitor your running and completed queries using Query activity](query-activity.md).  


## Related content

- [Billing and utilization reporting in Synapse Data Warehouse](usage-reporting.md)
- [Monitor connections, sessions, and requests using DMVs](query-activity.md)
- [Monitor your running and completed queries using Query activity](query-activity.md)
- [Query insights in Fabric data warehousing](query-insights.md)
