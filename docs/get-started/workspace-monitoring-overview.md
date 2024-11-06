---
title: Workspace monitoring overview
description: Understand what is workspace monitoring in Microsoft Fabric and how it can help you to gain insights into the usage and performance of your workspace.
author: KesemSharabi
ms.author: kesharab
ms.topic: overview
ms.date: 11/06/2024

#customer intent: As a workspace admin I want to monitor my workspace to gain insights into the usage and performance of my workspace so that I can optimize my workspace and improve the user experience.
---

# What is workspace monitoring?

Workspace monitoring is a Microsoft Fabric database that collects and organizes logs and metrics from a range of Fabric items in your workspace. Workspace monitoring lets workspace users access and analyze logs and metrics related to Fabric items in the workspace. You can query the database to gain insights into the usage and performance of your workspace.

## Monitoring

Workspace monitoring creates an [Eventhouse](../real-time-intelligence/eventhouse.md) database in your workspace that collects and organizes logs and metrics from the Fabric items in the workspace. Workspace contributors can query the database to learn more about the performance of their Fabric items.

* **Security** - Workspace monitoring is a secure read-only database that is accessible only to workspace users with at least a contributor role.

* **Data collection** - The monitoring Eventhouse collects diagnostic logs and metrics from Fabric items in the workspace. The data is aggregated and stored in the monitoring database, where it can be queried using KQL or SQL. The database supports both historical log analysis and real-time data streaming.

* **Access** - Access the monitoring database from the workspace. You can build and save query sets and dashboards to simplify data exploration.

## Operation logs

After you install [workspace monitoring](enable-workspace-monitoring.md), you can query the following operation logs:

* Real-Time Intelligence
    * [Command operations](../real-time-intelligence/command-operations.md)
    * [Data operation](../real-time-intelligence/data-operations.md)
    * [Ingestion operations](../real-time-intelligence/ingestion-operations.md)
    * [Metric operations](../real-time-intelligence/metric-operations.md)
    * [Query operations](../real-time-intelligence/query-operations.md)

* Data engineering (GraphQL)
    * [GraphQL operations](../data-engineering/graphql-operations.md)

## Sample queries

Workload monitoring sample queries are available from the [fabric-samples](https://github.com/microsoft/fabric-samples) GitHub repository.

## Considerations and limitations

* The capacity the workspace is hosted on must be in the same region as the tenant.

* You can only enable either workspace monitoring or [log analytics](/power-bi/transform-model/log-analytics/desktop-log-analytics-configure) in a workspace. You can't enable both at the same time. To enable workspace monitoring in a workspace that workspace that already has log analytics enabled, delete the log analytics configuration and wait for a few hours before enabling workspace monitoring.

* The workspace monitoring Eventhouse is a read-only item.
    * To delete the database, use the workspace settings.
    * To share the database, grant users a workspace *member* or *admin* [role](roles-workspaces.md).

* The retention period for monitoring data is 30 days.

* All monitoring operations, including ingestion and querying, are charged based on existing consumption rates for Eventstream and the Eventhouse workload.

* You can't configure ingestion to filter for specific log type or category such as *error* or *workload type*.

* User data operation logs aren't available even though the table is available in the monitoring database.

## Related content

* [Enable monitoring in your workspace](enable-workspace-monitoring.md)

* [Enable monitoring in your workspace](enable-workspace-monitoring.md)
