---
title: Workspace monitoring overview
description: Understand what is workspace monitoring in Microsoft Fabric and how it can help you to gain insights into the usage and performance of your workspace.
author: KesemSharabi
ms.author: kesharab
ms.topic: overview
ms.custom:
ms.date: 03/23/2025
#customer intent: As a workspace admin I want to monitor my workspace to gain insights into the usage and performance of my workspace so that I can optimize my workspace and improve the user experience.
---

# What is workspace monitoring (preview)?

Workspace monitoring is a Microsoft Fabric database that collects and organizes logs and metrics from a range of Fabric items in your workspace. Workspace monitoring lets workspace users access and analyze logs and metrics related to Fabric items in the workspace. You can query the database to gain insights into the usage and performance of your workspace.

## Monitoring

Workspace monitoring creates an [Eventhouse](../real-time-intelligence/eventhouse.md) database in your workspace that collects and organizes logs and metrics from the Fabric items in the workspace. Workspace contributors can query the database to learn more about the performance of their Fabric items.

* **Security** - Workspace monitoring is a secure read-only database that is accessible only to workspace users with at least a contributor role.

* **Data collection** - The monitoring Eventhouse collects diagnostic logs and metrics from Fabric items in the workspace. The data is aggregated and stored in the monitoring database, where it can be queried using KQL or SQL. The database supports both historical log analysis and real-time data streaming.

* **Access** - Access the monitoring database from the workspace. You can build and save query sets and dashboards to simplify data exploration.

## Operation logs

After you install [workspace monitoring](enable-workspace-monitoring.md), you can query the following logs:

* Data engineering (GraphQL)
    * [GraphQL operations](../data-engineering/graphql-operations.md)

* Eventhouse monitoring in Real-Time Intelligence
    * [Command logs](../real-time-intelligence/monitor-logs-command.md)
    * [Data operation logs](../real-time-intelligence/monitor-logs-data-operation.md)
    * [Ingestion results logs](../real-time-intelligence/monitor-logs-ingestion-results.md)
    * [Metrics](../real-time-intelligence/monitor-metrics.md)
    * [Query logs](../real-time-intelligence/monitor-logs-query.md)

* Mirrored database
    * [Mirrored database logs](../database/mirrored-database/monitor-logs.md)

* Power BI
    * [Semantic models](/power-bi/enterprise/semantic-model-operations)

## Sample queries

Workload monitoring sample queries are available from [workspace-monitoring](https://github.com/microsoft/fabric-samples/tree/main/workspace-monitoring) in the Fabric samples GitHub repository.

## Templates

You can explore workspace monitoring using Power BI reports and Real-time dashboard templates available from [workspace-monitoring-dashboards](https://github.com/microsoft/fabric-toolbox/tree/main/monitoring/workspace-monitoring-dashboards).

## Considerations and limitations

* You can only enable either workspace monitoring or [log analytics](/power-bi/transform-model/log-analytics/desktop-log-analytics-configure) in a workspace. You can't enable both at the same time. To enable workspace monitoring in a workspace that workspace that already has log analytics enabled, delete the log analytics configuration and wait for a few hours before enabling workspace monitoring.

* The workspace monitoring Eventhouse is a read-only item.
    * To delete the database, use the workspace settings. Before recreating a deleted database, wait about 15 minutes.
    * To share the database, grant users a workspace *member* or *admin* [role](../fundamentals/roles-workspaces.md).

* The retention period for monitoring data is 30 days.

* You can't configure ingestion to filter for specific log type or category such as *error* or *workload type*.

* User data operation logs aren't available even though the table is available in the monitoring database.

* Workspace monitoring is billed based on the capacity consumed by the monitoring items. For more details, see [Eventhouse and KQL Database consumption](../real-time-intelligence/real-time-intelligence-consumption.md) and [Microsoft Fabric event streams capacity consumption](../real-time-intelligence/event-streams/monitor-capacity-consumption.md).

## Related content

* [Enable monitoring in your workspace](enable-workspace-monitoring.md)
