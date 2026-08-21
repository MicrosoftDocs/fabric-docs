---
title: Enable Workspace Monitoring for Eventstreams
description: Enable workspace monitoring for Eventstreams in Microsoft Fabric. Learn how to set up an Eventhouse and access Eventstream monitoring tables in your workspace.
#customer intent: As a Fabric workspace admin, I want to enable workspace monitoring for my Eventstreams so that I can track their performance and health.
author: spelluru
ms.author: spelluru
ms.reviewer: spelluru
ms.date: 07/27/2026
ms.topic: how-to
---

# Enable workspace monitoring for eventstreams (preview)

Eventstream monitoring uses [Fabric workspace monitoring](/fabric/fundamentals/workspace-monitoring-overview). To enable workspace monitoring for eventstreams, complete the following steps:

1. Enable workspace monitoring at the workspace level and create an Eventhouse in your workspace. The Eventhouse is a monitoring database that contains tables for monitoring data from all supported items in the workspace, including eventstreams.
2. Enable workspace monitoring at the eventstream level.

This article provides instructions for enabling workspace monitoring for eventstreams. For more information about workspace monitoring, see [Eventstream workspace monitoring overview](fabric-workspace-monitoring.md).


[!INCLUDE [Workspace monitoring prerequisites](includes/workspace-monitoring-prerequisites.md)]

## Enable monitoring at workspace level

Go to your workspace settings and enable monitoring by creating an eventhouse.

1. Go to the workspace where your eventstreams are located.
1. Select **Workspace settings**.

    :::image type="content" source="media/enable-fabric-workspace-monitoring/workspace-settings-button.png" alt-text="Screenshot that shows the Fabric workspace page with Workspace settings button highlighted." lightbox="media/enable-fabric-workspace-monitoring/workspace-settings-button.png":::
1. In the left navigation of Workspace settings, select **Monitoring**.
1. Select **+ Eventhouse** and wait for the monitoring database to be created.

    :::image type="content" source="media/enable-fabric-workspace-monitoring/workspace-settings-monitor-eventhouse-button.png" alt-text="Workspace settings panel with the Monitoring section selected in the left navigation. The + Eventhouse button is visible in the Monitoring pane.":::

    After the eventhouse is created, Fabric begins collecting monitoring data from all supported items in the workspace, including your eventstreams.

    :::image type="content" source="media/enable-fabric-workspace-monitoring/monitoring-database-created.png" alt-text="Screenshot that shows the Fabric workspace settings with the monitoring database created." lightbox="media/enable-fabric-workspace-monitoring/monitoring-database-created.png":::

## Enable workspace monitoring for Eventstreams

To enable workspace monitoring for an eventstream, follow these steps:

1. Go to the eventstream you want to monitor.
1. Select **Settings**.

    :::image type="content" source="media/enable-fabric-workspace-monitoring/event-stream-settings-button.png" alt-text="Screenshot that shows the Eventstream page with the Settings button highlighted." lightbox="media/enable-fabric-workspace-monitoring/event-stream-settings-button.png":::
1. Select **Monitoring**.
1. Toggle the **Log Eventstream activity** option to **On**.

    :::image type="content" source="media/enable-fabric-workspace-monitoring/event-stream-monitoring-settings.png" alt-text="Screenshot that shows the Eventstream settings page with Monitoring section highlighted and Enable workspace monitoring option toggled on." lightbox="media/enable-fabric-workspace-monitoring/event-stream-monitoring-settings.png":::

## Open the monitoring database

Locate and explore the monitoring eventhouse to verify the Eventstream tables are available.

1. In your workspace, locate the monitoring eventhouse that was created (it appears as an Eventhouse item).
1. Open the eventhouse and expand the database to see the available tables.
1. Look for the three Eventstream tables: **EventStreamNodeStatus**, **EventStreamMetrics**, and **EventStreamErrorMetrics**.

    :::image type="content" source="media/enable-fabric-workspace-monitoring/monitor-eventhouse-event-stream-tables.png" alt-text="Screenshot of Eventhouse database explorer showing three Eventstream monitoring tables highlighted in red." lightbox="media/enable-fabric-workspace-monitoring/monitor-eventhouse-event-stream-tables.png":::

    > [!NOTE]
    > It might take a few minutes after enabling monitoring for data to start appearing in the tables. Node status data is emitted periodically (approximately every six hours), so the EventStreamNodeStatus table might take longer to populate than the metrics tables.


## Related content

- [Eventstream workspace monitoring overview](fabric-workspace-monitoring.md)
- [Query Eventstream monitoring data with KQL](query-fabric-workspace-monitoring-data.md)
