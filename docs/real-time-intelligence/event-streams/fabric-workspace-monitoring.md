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

# Eventstream workspace monitoring overview

**Eventstream workspace monitoring** is a feature that lets you track the health, performance, and errors of your Eventstreams using Fabric workspace monitoring. When you enable workspace monitoring, Fabric automatically creates an Eventhouse database in your workspace that collects metrics, node status, and error data from your Eventstreams. You can then query this data using KQL (Kusto Query Language) to troubleshoot issues, analyze trends, and build custom dashboards.

## Prerequisites

- A Power BI Premium or a Fabric capacity.
- The **Workspace admins can turn on monitoring for their workspaces** tenant setting is enabled. To enable the setting, you need to be a Fabric administrator. If you're not a Fabric administrator, ask the Fabric administrator in your organization to enable the setting.
- You have the admin role in the workspace.
- At least one Eventstream in the workspace. The Eventstream must be published for monitoring data to appear.

## Monitoring tables

Eventstream monitoring provides three tables in the workspace monitoring database:

| Table | What it tells you |
|---|---|
| EventStreamNodeStatus | Whether each node in your Eventstream is running, paused, failed, or in another state. |
| EventStreamMetrics | Data flow metrics like incoming/outgoing message counts, byte volumes, watermark delay, and backlogged events. |
| EventStreamErrorMetrics | Error counts by type, including runtime errors, deserialization errors, and data conversion errors. |

## Questions you can answer

Together, these tables let you answer questions like:

- How many events entered and exited my Eventstream in the last hour?
- Is my Eventstream healthy? Are all nodes running?
- Where are events being dropped or delayed?
- What types of errors are occurring and how frequently?
- Is my processing keeping up with the incoming data volume?

## Related content

- [What is workspace monitoring?](/fabric/admin/workspace-monitoring-overview) — Learn about Fabric workspace monitoring and the monitoring Eventhouse.
- [Enable workspace monitoring](/fabric/admin/workspace-monitoring-enable) — Step-by-step guide to enable monitoring in your workspace.
- [Overview of Fabric Eventstreams](/fabric/real-time-intelligence/event-streams/overview) — Learn about Eventstreams and how to bring real-time events into Fabric.
- [Create and manage an Eventstream](/fabric/real-time-intelligence/event-streams/create-manage-an-eventstream) — Learn how to create, configure, and publish an Eventstream.
- [Kusto Query Language (KQL) overview](/kusto/query/) — Learn KQL syntax for querying your monitoring data.