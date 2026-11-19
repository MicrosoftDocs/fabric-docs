---
title: Enable Workspace Monitoring for Eventstreams (preview)
description: Enable workspace monitoring for Eventstreams in Microsoft Fabric. Learn how to set up an Eventhouse and access Eventstream monitoring tables in your workspace.
#customer intent: As a Fabric workspace admin, I want to enable workspace monitoring for my Eventstreams so that I can track their performance and health.
author: spelluru
ms.author: spelluru
ms.reviewer: spelluru
ms.date: 08/24/2026
ms.topic: how-to
ai-usage: ai-assisted
---

# Enable workspace monitoring for eventstreams (preview)

Eventstream workspace monitoring (preview) uses [Fabric workspace monitoring](/fabric/fundamentals/workspace-monitoring-overview). To enable workspace monitoring for eventstreams, complete the following steps:

1. Enable workspace monitoring at the workspace level and create an Eventhouse in your workspace. The Eventhouse is a monitoring database that contains tables for monitoring data from all supported items in the workspace, including eventstreams.
2. Enable monitoring at the eventstream level for existing eventstreams in your workspace. Eventstreams you create after you enable workspace monitoring have monitoring on by default.

This article provides instructions for enabling workspace monitoring for eventstreams. For more information about workspace monitoring, see [Eventstream workspace monitoring overview](fabric-workspace-monitoring.md).

[!INCLUDE [Eventstream workspace monitoring preview notice](includes/eventstream-workspace-monitoring-preview.md)]

[!INCLUDE [Workspace monitoring prerequisites](includes/workspace-monitoring-prerequisites.md)]

## Enable monitoring at workspace level


1. Open the workspace, and select Workspace settings.
2. Select Monitoring.
3. Choose whether to send data to the Eventhouse in this Monitoring Item or to the Eventhouse in another Monitoring Item.
4. If you send data to another Monitoring Item, select the destination Monitoring Item.
5. Optionally, enable a destination Custom Endpoint in the Eventstream.
6. Optionally, enable agentic investigation capabilities to add an Operations Agent.
7. Complete the configuration to create the Monitoring Item.
8. Turn on data collection.

For more information on configuring workspace monitoring, see [Configure workspace monitoring](../../fundamentals/enable-workspace-monitoring.md).

## Enable workspace monitoring for Eventstreams

Eventstreams you create after you turn on workspace monitoring have Log Eventstream activity on by default. Existing eventstreams need to be turned on individually.
To turn on monitoring for an existing eventstream, or to check or change the setting for any eventstream, follow these steps:

1. Go to the eventstream you want to monitor.
1. Select **Settings**.

    :::image type="content" source="media/enable-fabric-workspace-monitoring/event-stream-settings-button.png" alt-text="Screenshot that shows the Eventstream page with the Settings button highlighted." lightbox="media/enable-fabric-workspace-monitoring/event-stream-settings-button.png":::
1. Select **Monitoring**.
1. Toggle the **Log Eventstream activity** option to **On**.

    :::image type="content" source="media/enable-fabric-workspace-monitoring/event-stream-monitoring-settings.png" alt-text="Screenshot of Eventstream settings with Monitoring selected and Log Eventstream activity turned on." lightbox="media/enable-fabric-workspace-monitoring/event-stream-monitoring-settings.png":::

## Open the monitoring database

Locate and explore the monitoring eventhouse to verify the Eventstream tables are available.

1. In your workspace, locate the monitoring eventhouse that was created (it appears as an Eventhouse item).
1. Open the eventhouse and expand the database to see the available tables.
1. Look for the four Eventstream tables: **EventStreamNodeStatus**, **EventStreamMetrics**,**EventStreamErrorMetrics**, and **EventStreamDiagnosticLogs**.

    :::image type="content" source="media/enable-fabric-workspace-monitoring/monitor-eventhouse-event-stream-tables.png" alt-text="Screenshot of Eventhouse database explorer showing three Eventstream monitoring tables highlighted in red." lightbox="media/enable-fabric-workspace-monitoring/monitor-eventhouse-event-stream-tables.png":::

    > [!NOTE]
    > It might take a few minutes after enabling monitoring for data to start appearing in the tables. Node status data is emitted periodically (approximately every six hours), so the EventStreamNodeStatus table might take longer to populate than the metrics tables.


## Related content

- [Eventstream workspace monitoring overview](fabric-workspace-monitoring.md)
- [Query Eventstream monitoring data with KQL](query-fabric-workspace-monitoring-data.md)
- [Eventstream workspace monitoring known limitations](fabric-workspace-monitoring-known-limitations.md)
