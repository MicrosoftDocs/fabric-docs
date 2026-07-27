---
title: Eventstream Workspace Monitoring Overview
description: Eventstream workspace monitoring lets you track health, performance, and errors in Fabric eventstreams. Learn how to query metrics and troubleshoot issues with KQL.
#customer intent: As a Fabric workspace admin, I want to understand what Eventstream workspace monitoring is so that I can decide whether to enable it for my workspace
author: spelluru
ms.author: spelluru
ms.reviewer: spelluru
ms.date: 07/27/2026
ms.topic: concept-article
---

# Eventstream workspace monitoring overview (preview)

**Eventstream workspace monitoring** is a feature that lets you track the health and performance of eventstreams using Fabric workspace monitoring. When you enable workspace monitoring, Fabric automatically creates an eventhouse in your workspace that collects metrics, node status, and error data from your eventstreams. You can then query this data using KQL (Kusto Query Language) to troubleshoot issues, analyze trends, and build custom dashboards.

> [!NOTE]
> Eventstream workspace monitoring is currently in preview.

> [!IMPORTANT]
> Workspace monitoring for eventstreams is temporarily disabled. The product team identified an issue that required disabling the feature. They're implementing a fix with improved controls. For more information, see the [Eventstream workspace monitoring known issue](https://support.fabric.microsoft.com/known-issues/?product=Real-Time%2520Intelligence&active=true&fixed=true&sort=published&issueId=1824).

[!INCLUDE [Workspace monitoring prerequisites](includes/workspace-monitoring-prerequisites.md)]

## Monitoring tables

Eventstream monitoring provides three tables in the workspace monitoring database:

| Table | What it tells you |
|---|---|
| `EventStreamNodeStatus` | Whether each node in your eventstream is running, paused, failed, or in another state. |
| `EventStreamMetrics` | Data flow metrics like incoming and outgoing message counts, byte volumes, watermark delay, and backlogged events. |
| `EventStreamErrorMetrics` | Error counts by type, including runtime errors, deserialization errors, and data conversion errors. |

## Questions you can answer

Together, these tables let you answer questions like:

- How many events entered and exited my eventstream in the last hour?
- Is my eventstream healthy? Are all nodes running?
- Where are events being dropped or delayed?
- What types of errors are occurring and how frequently?
- Does the processing keep up with the incoming data volume?

## Related content

- [Enable workspace monitoring](enable-fabric-workspace-monitoring.md)
- [Query Eventstream monitoring data with KQL](query-fabric-workspace-monitoring-data.md)
- [Eventstream monitoring tables](fabric-workspace-monitoring-tables.md)
