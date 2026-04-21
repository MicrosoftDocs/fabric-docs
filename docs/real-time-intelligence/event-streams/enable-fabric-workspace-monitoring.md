---
title: Enable Workspace Monitoring for Eventstreams
description: Enable workspace monitoring for Eventstreams in Microsoft Fabric. Learn how to set up an Eventhouse and access Eventstream monitoring tables in your workspace.
#customer intent: As a Fabric workspace admin, I want to enable workspace monitoring for my Eventstreams so that I can track their performance and health.
author: spelluru
ms.author: spelluru
ms.reviewer: spelluru
ms.date: 04/21/2026
ms.topic: how-to
---

# Enable workspace monitoring for Eventstreams

Eventstream monitoring uses Fabric workspace monitoring. Once you enable workspace monitoring in your workspace, Eventstream tables are created in the monitoring database. You don't need to configure anything specific for Eventstreams.

## Enable workspace monitoring

Go to your workspace settings and enable monitoring by creating an Eventhouse.

1. Go to the workspace where your Eventstreams are located.
1. Select **Workspace settings**.
1. In the left navigation of Workspace settings, select **Monitoring**.
1. Select **+ Eventhouse** and wait for the monitoring database to be created.

:::image type="content" source="media/enable-fabric-workspace-monitoring/workspace-settings-monitor-eventhouse-button.png" alt-text="Workspace settings panel with the Monitoring section selected in the left navigation. The + Eventhouse button is visible in the Monitoring pane.":::

After the Eventhouse is created, Fabric begins collecting monitoring data from all supported items in the workspace, including your Eventstreams.

## Open the monitoring database

Locate and explore the monitoring Eventhouse to verify the Eventstream tables are available.

1. In your workspace, locate the monitoring Eventhouse that was created (it appears as an Eventhouse item).
1. Open the Eventhouse and expand the database to see the available tables.
1. Look for the three Eventstream tables: **EventStreamNodeStatus**, **EventStreamMetrics**, and **EventStreamErrorMetrics**.

:::image type="content" source="media/enable-fabric-workspace-monitoring/monitor-eventhouse-event-stream-tables.png" alt-text="The monitoring Eventhouse database expanded in the database explorer, showing the three Eventstream tables: EventStreamErrorMetrics, EventStreamMetrics, and EventStreamNodeStatus.":::

> [!NOTE]
> It may take a few minutes after enabling monitoring for data to start appearing in the tables. Node status data is emitted periodically (approximately every 6 hours), so the EventStreamNodeStatus table may take longer to populate than the metrics tables.

## Enable monitoring for existing Eventstreams

If you enable workspace monitoring in a workspace that already contains Eventstreams, those existing Eventstreams need to be republished before monitoring data appears for them.

> [!IMPORTANT]
> This only applies to Eventstreams that were created or last published before workspace monitoring was enabled. Any new Eventstreams you create after enabling monitoring are automatically configured and don't require republishing.

### Republish an existing Eventstream

To enable monitoring for a preexisting Eventstream, republish it through the Eventstream editor.

1. Open the existing Eventstream in the Eventstream editor.
1. Make any pending changes or simply add and delete a node.
1. Select **Publish** on the toolbar to republish the Eventstream.
1. After republishing, monitoring data will begin appearing in the monitoring tables within a few minutes (metrics and errors) or up to 6 hours (node status).