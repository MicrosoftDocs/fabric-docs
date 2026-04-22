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

# Query Eventstream monitoring data

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