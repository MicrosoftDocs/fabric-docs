---
title: Eventstream Workspace Monitoring Limits
description: Eventstream monitoring known issues include periodic node updates, outdated artifact names, and missing diagnostic logs. Find workarounds to keep your data flowing.
#customer intent: As a Fabric admin, I want to understand the known limitations of Eventstream workspace monitoring so that I can set expectations for my team
author: spelluru
ms.author: spelluru
ms.reviewer: spelluru
ms.date: 04/21/2026
ms.topic: article
---

# Known limitations

**Eventstream workspace monitoring** is in preview and has a few known limitations that affect how monitoring data is collected, displayed, and queried.

## Node status updates are periodic, not real-time

The EventStreamNodeStatus table is updated approximately every six hours. If a node changes status (for example, from Running to Failed), it can take up to six hours for the change to appear in the monitoring table. For immediate status checks, use the Eventstream editor, which shows the current status in real time.

## New tables might not appear automatically after enabling monitoring

After you enable workspace monitoring, the Eventstream tables (EventStreamNodeStatus, EventStreamMetrics, EventStreamErrorMetrics) might not appear in the monitoring database right away. If you don't see the tables:

1. Go to **Workspace settings** > **Monitoring**.
1. Turn monitoring off, and then turn it back on.

The tables will appear after the monitoring database is refreshed.

## Existing Eventstreams require republishing

Eventstreams that you published before enabling workspace monitoring don't automatically emit monitoring data. You need to republish each existing Eventstream for it to start sending data to the monitoring tables.

## Artifact and workspace names might show outdated values

If you rename an Eventstream or move it to a different workspace, the **ArtifactName** and **WorkspaceName** columns in the monitoring tables might continue to show the old name for a period of time. The **ArtifactId** and **WorkspaceId** columns always contain the correct, current identifiers. When writing queries, use **ArtifactId** and **WorkspaceId** for reliable filtering instead of names.

## Metrics identify underlying services, not individual nodes

The EventStreamMetrics and EventStreamErrorMetrics tables use a **CorrelationId** column to identify the underlying service resource (such as a processing job or event hub entity) rather than the individual Eventstream node name. In most cases, there's a one-to-one relationship between a CorrelationId and a node. However, when an Eventstream uses advanced processing (such as the SQL operator with multiple destinations), a single CorrelationId might map to multiple nodes. Use the **NodeDirection** and **NodeType** columns together with the **CorrelationId** to distinguish between nodes.

## Diagnostic logs aren't yet available

During public preview, the monitoring tables show metrics and error counts, but not detailed diagnostic log messages. This limitation means you can see that errors occurred, but not the specific error messages. Detailed diagnostic logs are planned for a future release.

## Related content

- To learn about Fabric workspace monitoring and the monitoring Eventhouse, see [What is workspace monitoring?](/fabric/fundamentals/workspace-monitoring-overview).
- For step-by-step instructions to enable monitoring in your workspace, see[Enable workspace monitoring](/fabric/fundamentals/enable-workspace-monitoring).
- To learn Kusto Query Language (KQL) syntax for querying your monitoring data, see [Kusto Query Language (KQL) overview](/kusto/query/).