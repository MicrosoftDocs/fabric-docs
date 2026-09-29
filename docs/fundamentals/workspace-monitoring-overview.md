---
title: Workspace Monitoring Overview
description: Learn how workspace monitoring in Microsoft Fabric collects logs and metrics for analyzing the usage, health, and performance of items in a workspace.
author: SnehaGunda
ms.author: sngun
ms.topic: overview
ms.date: 08/13/2026
#customer intent: As a workspace admin I want to monitor my workspace to gain insights into the usage and performance of my workspace so that I can optimize my workspace and improve the user experience.
ai-usage: ai-assisted
---

# What is workspace monitoring (preview)?

Workspace monitoring is the primary way to enable optional observability experiences for your Fabric deployment. With workspace monitoring, you can collect and organize logs and metrics from supported Microsoft Fabric items in a workspace, create alerts through activators, use the Operations Agent to automatically investigate issues in the system, and more.


## How workspace monitoring works

You manage workspace monitoring through a **monitoring item**. You can send data to the Eventhouse in this monitoring item, or send data to the Eventhouse in another monitoring item. Sending data to another monitoring item lets you centralize telemetry from multiple workspaces. The monitoring item also contains an activator, Operations Agent, and items related to monitoring for other experiences you opt into.

Data collection is off when you create a monitoring item. After you turn on collection, supported Fabric items send logs and metrics to tables in the monitoring database. Workspace monitoring doesn't backfill earlier activity.


Workspace users with at least the Contributor role can query the monitoring database. Use Kusto Query Language (KQL) to correlate activity across supported items, or connect the database to other Fabric experiences.

You can use the collected data in these ways:

- Query tables with KQL for interactive investigation and historical analysis.
- Save reusable queries in a KQL Queryset.
- Build a real-time dashboard or Power BI report.
- Create alerts based on query results.

:::image type="content" source="media/sample-gallery-workspace-monitoring/monitoring-item.png" alt-text="Screenshot of the monitoring item collecting telemetry for three workspaces.":::

## Supported telemetry

After you [enable workspace monitoring](enable-workspace-monitoring.md), you can query the following publicly documented telemetry. The tables that receive data depend on the supported items and activity in your workspace.

| Workload | Fabric artifact name | Supported events and logs |
|---|---|---|
| Real-Time hub | Job Events | [Job event logs](item-job-event-logs.md) |
| Real-Time hub | Event schema set | [Event schema set operation logs](../real-time-intelligence/schema-sets/event-schema-set-operation-logs.md) |
| Data Engineering | GraphQL API | <ul><li>[Graph QL metrics](../data-engineering/graphql-operations.md)</li><li>[Graph QL operation logs](../data-engineering/graphql-operations.md)</li></ul> |
| Data Factory | Copy job | [Copy job activity run details logs](../data-factory/copy-job-workspace-monitoring.md) |
| Data Factory | Pipeline activity logs | [Pipeline Activity Run Logs](../data-factory/workspace-monitoring.md) |
| Real-Time Intelligence | Activator | [Activator rule notifications](../real-time-intelligence/data-activator/activator-workspace-monitoring.md) |
| Real-Time Intelligence | Eventhouse | <ul><li>[Metric operation logs](../real-time-intelligence/monitor-metrics.md)</li><li>[Command logs](../real-time-intelligence/monitor-logs-command.md)</li><li>[Data operation logs](../real-time-intelligence/monitor-logs-data-operation.md)</li><li>[Query logs](../real-time-intelligence/monitor-logs-query.md)</li><li>[Ingestion results logs](../real-time-intelligence/monitor-logs-ingestion-results.md)</li><li>[Capacity throttling logs](../real-time-intelligence/monitor-logs-capacity-throttling.md)</li><li>[Sub-optimal size logs](../real-time-intelligence/monitor-logs-sub-optimal-size.md)</li><li>[Scale-out event logs](../real-time-intelligence/monitor-logs-scaleout-events.md)</li></ul> |
| Real-Time Intelligence | Eventstream | <ul><li>[Eventstream Node Status](../real-time-intelligence/event-streams/fabric-workspace-monitoring.md)</li><li>[Eventstream Metrics](../real-time-intelligence/event-streams/fabric-workspace-monitoring.md)</li><li>[Eventstream Error Metrics](../real-time-intelligence/event-streams/fabric-workspace-monitoring.md) |
| Mirroring | Mirrored database | [Mirrored database execution logs](../mirroring/monitor-logs.md) |
| Power BI | Semantic models | [Semantic model operation logs](../enterprise/powerbi/semantic-model-operations.md) |
| Mirroring | Mirrored database | [Mirrored database execution logs](../mirroring/monitor-logs.md) |
| Power BI | Semantic model | [Semantic model operation logs](../enterprise/powerbi/semantic-model-operations.md) |

## Sample queries

Workspace monitoring sample queries are available in the [Fabric samples GitHub repository](https://github.com/microsoft/fabric-samples/tree/main/workspace-monitoring).

## Visualize and alert on monitoring data

Use [Real-Time Dashboard and Power BI templates](sample-gallery-workspace-monitoring.md) to visualize workspace monitoring data. You can also start with the [workspace monitoring dashboard templates](https://github.com/microsoft/fabric-toolbox/tree/main/monitoring/workspace-monitoring-dashboards) and customize them for your environment.

To create proactive notifications, save a KQL query that identifies the condition you want to detect, and then create an alert from the query results. Workload-specific articles in the supported telemetry table provide example queries and alert scenarios.

## Manage retention and caching

You can change the data policies for the Eventhouse under the Monitoring Item:

- The **retention policy** controls how long data remains available before it's automatically removed.
- The **caching policy** controls how long data remains in local SSD storage. Cached data provides faster query performance.

To configure these policies, open the monitoring KQL Database in the Eventhouse, and select **Manage** > **Data policies**. The caching period must be less than or equal to the retention period. For full details, see [Change data policies](../real-time-intelligence/data-policies.md).

## Considerations and limitations

- Only one Monitoring Item can collect telemetry for a workspace at a time.

- When you configure workspace monitoring, choose whether to send data to the Eventhouse in this Monitoring Item or to the Eventhouse in another Monitoring Item. You can't change this selection later.

- To send data to the Eventhouse in another Monitoring Item, both workspaces must be in the same Azure region.

- [Monitoring Item names](enable-workspace-monitoring.md#item-naming) can contain up to 128 characters. Supporting items are named automatically. If the generated KQL Database name would exceed its 256-character limit, Fabric truncates parts of the name and adds a hash to keep the name unique.

- A workspace can contain a maximum of [1,000 Fabric and Power BI items](../admin/portal-workspaces.md#workspace-item-limits), including parent and child items. Each workspace that sends data to a destination Eventhouse gets its own KQL Database in the destination workspace. Each database counts toward the destination workspace's item limit.

- The monitoring database is read-only.

- Monitoring data is retained for 30 days by default.

- A supported table might not appear until the corresponding item generates telemetry.

- Workspace monitoring uses Fabric capacity. For details, see [Eventhouse and KQL Database consumption](../real-time-intelligence/real-time-intelligence-consumption.md) and [Eventstream capacity consumption](../real-time-intelligence/event-streams/monitor-capacity-consumption.md).

- Monitoring Eventstream ingestion, monitoring Eventhouse operations, queries on the monitoring Eventhouse, and Real-Time Dashboards that use the monitoring database continue to operate when the capacity is [throttled](../enterprise/throttling.md). Power BI reports and Activator alerts that use the monitoring database respect the capacity state and can be throttled.

- Workspace Monitoring supports Private Links. If you encounter issues, disable Private Links on your workspace, then enable Workspace Monitoring, and finally re-enable Private Links.


## Legacy workspace monitoring

Legacy Workspace Monitoring creates an [Eventhouse](../real-time-intelligence/eventhouse.md) database in your workspace that collects and organizes logs and metrics from the Fabric items in the workspace. Workspace contributors can query the database to learn more about the performance of their Fabric items. Use the updated version as described in the rest of the document going forward.

### Legacy considerations and limitations

* The legacy Workspace Monitoring Eventhouse is a read-only item.
    * To delete the database, use the workspace settings. Before recreating a deleted database, wait about 15 minutes.
    * To share the database, grant users a workspace *member* or *admin* [role](../fundamentals/roles-workspaces.md).

* You can't configure ingestion to filter for specific log type or category such as *error* or *workload type*.

* User data operation logs aren't available even though the table is available in the monitoring database.

* If a supported table is missing from the monitoring Eventhouse, it might be because the Eventhouse was created before the table became available. To resolve this issue, go to the **Monitoring** tab in the workspace settings pane, turn off the **Log workspace activity** setting, and then turn it on again.

* Private links aren't supported for legacy workspace monitoring.

## Related content

- [Enable monitoring in your workspace](enable-workspace-monitoring.md)
- [Visualize workspace monitoring](sample-gallery-workspace-monitoring.md)
- [Manage and monitor an Eventhouse](../real-time-intelligence/manage-monitor-eventhouse.md)
