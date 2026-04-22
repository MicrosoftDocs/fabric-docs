---
title: Eventstream Workspace Monitoring Overview
description: Eventstream workspace monitoring lets you track health, performance, and errors in Fabric. Learn how to query metrics and troubleshoot issues with KQL.
#customer intent: As a Fabric workspace admin, I want to understand what Eventstream workspace monitoring is so that I can decide whether to enable it for my workspace
author: spelluru
ms.author: spelluru
ms.reviewer: spelluru
ms.date: 04/21/2026
ms.topic: concept-article
---

# Eventstream workspace monitoring overview (preview)

**Eventstream workspace monitoring** is a feature that lets you track the health, performance, and errors of your eventstreams by using Fabric workspace monitoring. When you enable workspace monitoring, Fabric automatically creates an Eventhouse database in your workspace that collects metrics, node status, and error data from your eventstreams. You can then query this data by using KQL (Kusto Query Language) to troubleshoot issues, analyze trends, and build custom dashboards.

> [!NOTE]
> Eventstream workspace monitoring is currently in preview. 

## Prerequisites

- A Power BI Premium or a Fabric capacity.
- The **Workspace admins can turn on monitoring for their workspaces** tenant setting is enabled. To enable the setting, you need to be a Fabric administrator. If you're not a Fabric administrator, ask the Fabric administrator in your organization to enable the setting.
- You have the admin role in the workspace.
- At least one eventstream in the workspace. The eventstream must be published for monitoring data to appear.

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

- To learn about Fabric workspace monitoring and the monitoring Eventhouse, see [What is workspace monitoring?](/fabric/fundamentals/workspace-monitoring-overview).
- For step-by-step instructions to enable monitoring in your workspace, see[Enable workspace monitoring](/fabric/fundamentals/enable-workspace-monitoring).
- To learn about Eventstreams and how to bring real-time events into Fabric, see [Overview of Fabric Eventstreams](overview.md).
- To learn about creating and managing eventstreams, see [Create and manage an Eventstream](create-manage-an-eventstream.md).
- To learn Kusto Query Language (KQL) syntax for querying your monitoring data, see [Kusto Query Language (KQL) overview](/kusto/query/).