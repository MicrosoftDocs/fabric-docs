---
title: "Monitor Mirrored Database Replication"
description: Learn about monitoring mirrored database replication in Microsoft Fabric.
author: whhender
ms.author: whhender
ms.reviewer: imotiwala, maprycem, cynotebo
ms.date: 09/05/2025
ms.topic: concept-article
ms.custom: sfi-image-nochange
---
# Monitor Fabric mirrored database replication

This article outlines various methods for monitoring your mirrored database after it's set up, including using the Fabric portal, programmatic monitoring, and leveraging workspace monitoring.

## Monitor from the Fabric portal

Once the mirrored database is configured, you can monitor the current state of replication. The **Monitor replication** section shows you the database level status, and a list of tables under replication along with the corresponding status, total rows replicated, and the last completed time.

:::image type="content" source="media/monitor/monitor-mirrored-database.png" alt-text="Screenshot from the Fabric portal of the Monitor mirror database pane. The status of the source replication and all tables show Running." lightbox="media/monitor/monitor-mirrored-database.png":::

> [!TIP]
> If you observe a delay in the appearance of mirrored data, follow the [troubleshooting guide](troubleshooting.md#data-doesnt-appear-to-be-replicating) to debug the potential issue.

The following are the details about the monitoring view:

| **Monitor** | **Description** |
|:--|:--|
| Database level status | The possible statuses include:<br>- **Running**: Replication is currently running bringing snapshot and change data into OneLake.<br/>- **Running with warning**: Replication is running, with transient errors.<br/>- **Stopping/Stopped**: Replication has stopped.<br/>- **Failed**: Fatal error in replication that can't be recovered.<br/>- **Paused**: Replication is paused. It happens when you pause and resume the Fabric capacity. Learn more from [Changes to Fabric capacity](troubleshooting.md#changes-to-fabric-capacity). |
| Name | The name of the source table in `[schema_name].[table_name]` or `[table_Name]` format. |
| Table level status | The possible statuses include:<br>- **Running**: Data is replicating.<br/>- **Running with warning**: Warning of nonfatal error with replication of the data from the table.<br/>- **Stopping/Stopped**: Replication has stopped.<br/>- **Failed**: Fatal error in replication for that table. |
| Rows replicated | The cumulative count of replicated rows, including all inserts, updates, and deletes applied to the target table. |
| Last completed | The last completed time to refresh mirrored table from source. |

## Monitor programmatically

You can monitor the mirrored databases programmatically by using the REST APIs or SDK. Learn more from [Microsoft Fabric mirroring public REST API](../mirroring/mirrored-database-rest-api.md) on how to get mirroring status for the mirrored database or specific tables.

## Use workspace monitoring

[Workspace monitoring](../fundamentals/workspace-monitoring-overview.md) is an observability feature in Microsoft Fabric that enables developers and admins to access detailed logs and performance metrics of their workspaces.

Mirroring in Fabric supports operation logs in workspace monitoring to provide a more comprehensive monitoring experience for your mirrored databases. You can use these logs to monitor execution and performance of your mirrored database, including data replication, table changes, mirroring status, failures, and replication latency.

To get started, [enable monitoring in your workspace](../fundamentals/enable-workspace-monitoring.md). Once the monitoring of your workspace is enabled, the mirrored database execution logs are automatically ingested into the `MirroredDatabaseTableExecution` table in the monitoring KQL database. Learn more about the available logs and the structure from [Mirrored database operation logs](../mirroring/monitor-logs.md).

:::image type="content" source="media/monitor/enable-workspace-monitoring.png" alt-text="Screenshot from the Fabric portal of monitoring enablement in workspace settings." lightbox="media/monitor/enable-workspace-monitoring.png":::

Then you have full access to an advanced monitoring experience for mirrored database:

- **Derive insights on-demand:** Query the granular operation logs directly using KQL in the monitoring database to get instant access to the information you need.

  :::image type="content" source="media/monitor/monitor-query-mirrored-database-logs.png" alt-text="Screenshot from the Fabric portal of querying the monitor database." lightbox="media/monitor/monitor-query-mirrored-database-logs.png":::

- **Build customized monitoring dashboards:** With the monitoring database, you can integrate data into your preferred tools like Power BI and [Real-Time Dashboards](../real-time-intelligence/dashboard-real-time-create.md) to create dashboards tailored to your needs.

  :::image type="content" source="media/monitor/monitor-dashboard.png" alt-text="Screenshot from the Fabric portal of building dashboard to monitor mirrored database." lightbox="media/monitor/monitor-dashboard.png":::

- **Set up alerting:** [Set up alerts](../real-time-intelligence/user-flow-6.md) based on the logs and metrics you’re tracking.

## Related content

- [Troubleshoot Fabric mirrored databases](../mirroring/troubleshooting.md)
- [What is Mirroring in Fabric?](../mirroring/overview.md)
