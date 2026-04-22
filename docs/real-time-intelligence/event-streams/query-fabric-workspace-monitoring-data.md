---
title: Query Eventstream Monitoring Data with KQL
description: Query Eventstream monitoring data using KQL in your monitoring Eventhouse. Check node status, track messages, and find errors with ready-to-use query examples.
#customer intent: As a data engineer, I want to query Eventstream monitoring data using KQL so that I can analyze the performance of my event streams
author: spelluru
ms.author: spelluru
ms.reviewer: spelluru
ms.date: 04/21/2026
ms.topic: how-to
---

# Query Eventstream monitoring data (preview)

Eventstream monitoring uses Fabric workspace monitoring. When you enable workspace monitoring in your workspace, the process creates Eventstream tables in the monitoring database. You don't need to configure anything specific for event streams. For concepts related to workspace monitoring, see [Eventstream workspace monitoring overview](fabric-workspace-monitoring.md).

**Eventstream monitoring tables** are a set of three tables created in your workspace monitoring database that capture different aspects of your eventstream's behavior. All tables share common columns (base dimensions) and include table-specific columns for the data they track. For more information about the tables and the data they contain, see [Eventstream monitoring tables overview](fabric-workspace-monitoring-tables.md).

You can query your Eventstream monitoring data using KQL (Kusto Query Language) directly in the monitoring Eventhouse. Open the monitoring database and use the query editor to run queries against the Eventstream tables.

> [!NOTE]
> Eventstream workspace monitoring is currently in preview. 

## Check the status of all nodes

This query returns the most recent status of each node in a specific Eventstream.

```kql
EventStreamNodeStatus
| where ArtifactId == "<your-artifact-id>"
| summarize arg_max(Timestamp, *) by NodeId
| project Timestamp, NodeName, NodeDirection, NodeType, NodeStatus
| order by NodeDirection asc
```


## View incoming and outgoing messages over time

This query shows how many messages entered and exited your Eventstream in 5-minute windows.

```kql
EventStreamMetrics
| where ArtifactId == "<your-artifact-id>"
| where MetricsName in ("Incoming Messages", "Outgoing Messages")
| summarize TotalMessages = sum(Value) by
    TimeWindow = bin(Timestamp, 5m), MetricsName
| order by TimeWindow asc
```

## Find recent errors

This query shows errors from the last 24 hours, grouped by error type and time window.

```kql
EventStreamErrorMetrics
| where ArtifactId == "<your-artifact-id>"
| where Timestamp > ago(24h)
| where Value > 0
| summarize TotalErrors = sum(Value) by
    TimeWindow = bin(Timestamp, 5m), MetricsName, NodeDirection
| order by TimeWindow desc
```

## Related content

- To learn about Eventstream monitoring, see [Eventstream workspace monitoring overview](fabric-workspace-monitoring.md).
- To learn how to enable Eventstream workspace monitoring for your workspace, see [Enable workspace monitoring](enable-fabric-workspace-monitoring.md).
- To learn how to query your Eventstream monitoring data with KQL, see [Query Eventstream monitoring data with KQL](query-fabric-workspace-monitoring-data.md).
