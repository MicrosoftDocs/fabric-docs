---
title: Monitoring in Fabric Data Warehouse oveview
description: Learn about how to monitor your Fabric data warehouse
author: jacindaeng
ms.author: jacindaeng
ms.reviewer: wiassaf
ms.date: 05/01/2024
ms.topic: conceptual
ms.search.form: Monitoring # This article's title should not change. If so, contact engineering.
---
# Monitor in Fabric Data warehouse overview

**Applies to:** [!INCLUDE[fabric-se-and-dw](includes/applies-to-version/fabric-se-and-dw.md)]

Monitoring the usage and activity is crucial for ensuring that the data warehouse operates efficiently. Fabric provides a set of tools to help you optimize your query performance, gain insights into your Fabric capacity to determine when it’s time to scale up or down, and understand details about running and completed queries including when it was executed and who is the user running the query.  

## Microsoft Fabric Capacity Metrics app: 
- The Microsoft Fabric Capacity Metrics app provides visibility into capacity usage of each warehouse allowing you to see the compute charges for all user-generated and system-generated T-SQL statements within a Warehouse and SQL Analytics Endpoint. Refer to [Billing and utilization reporting in Synapse Data Warehouse](usage-reporting.md) for more information. 

## DMVs: 
- Users can get insights about their live connections, sessions and requests using a set of Dynamic Management Views (DMVs). Refer to [Monitor connections, sessions, and requests using DMVs](query-activity.md) for more information.

## Query insights: 
- Query Insights provides historical query data for completed, failed, canceled queries along with aggregated insights to help you tune your query performance. Refer to [Query insights in Fabric data warehousing](query-insights.md) for more information.

## Query activity: 
- Users are provided a one-stop view of their running and completed queries in an easy-to-use interface without having to run T-SQL. Refer to [Monitor your running and completed queries using Query activity](query-activity.md) for more information.  


## Next steps
- [Billing and utilization reporting in Synapse Data Warehouse](usage-reporting.md)
- [Monitor connections, sessions, and requests using DMVs](query-activity.md) 
- [Monitor your running and completed queries using Query activity](query-activity.md) 
- [Query insights in Fabric data warehousing](query-insights.md) 
