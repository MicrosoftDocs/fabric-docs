---
title: Configure workspace monitoring
description: Configure workspace monitoring in Microsoft Fabric and start collecting workspace logs and metrics.
author: SnehaGunda
ms.author: sngun
ms.topic: how-to
ms.date: 09/04/2026
ai-usage: ai-assisted
#customer intent: As a workspace admin I want to enable the workspace monitoring feature in my workspace
---

# Configure workspace monitoring

This article explains how to configure a [workspace Monitoring Item](workspace-monitoring-overview.md) from workspace settings. Configuring workspace monitoring provisions the monitoring environment. Data collection begins only after you turn it on and doesn't include earlier workspace activity.

## Prerequisites

To enable workspace monitoring, meet all the following conditions:

* The workspace is assigned to a Power BI Premium or a Fabric capacity.

- The [Workspace admins can turn on monitoring for their workspaces](../admin/service-admin-portal-audit-usage.md#workspace-admins-can-turn-on-monitoring-for-their-workspaces) tenant setting is enabled. A Fabric administrator manages this setting.

* The [Users can create Fabric items](../admin/fabric-switch.md) tenant setting is enabled for you. If this setting is disabled at the tenant level, workspace admins can't enable workspace monitoring. The **Monitoring** option appears unavailable in **Workspace settings**. You won't see any error, but as the prerequisites aren't met, the monitoring eventhouse database isn't created, and monitoring remains inactive.

* You're an admin for the workspace.

## Choose where to send monitoring data

When you configure workspace monitoring, choose one of the following destinations:

- **Send data to Eventhouse in this Monitoring Item** provisions an Eventhouse with a read-only KQL Database, an Eventstream, and an Activator in the current workspace.
- **Send data to Eventhouse in another Monitoring Item** sends workspace telemetry to the monitoring environment owned by an existing Monitoring Item. Use this option to centralize monitoring for multiple workspaces. Both workspaces must be in the same Azure region.

You can't change the destination after you configure workspace monitoring.

## Configure monitoring and start collection

1. Open the workspace, and select **Workspace settings**.
1. Select **Monitoring**.
1. Choose whether to send data to the Eventhouse in this Monitoring Item or to the Eventhouse in another Monitoring Item.
1. If you send data to another Monitoring Item, select the destination Monitoring Item.
1. Optionally, enable a destination Custom Endpoint in the Eventstream.
1. Optionally, enable agentic investigation capabilities to add an Operations Agent.
1. Complete the configuration to create the Monitoring Item.
1. Turn on data collection.


:::image type="content" source="media/sample-gallery-workspace-monitoring/workspace-monitoring-settings.png" alt-text="Screenshot of the Workspace Monitoring configuration screen, invoked from Workspace Settings.":::

:::image type="content" source="media/sample-gallery-workspace-monitoring/monitoring-item.png" alt-text="Screenshot of the Monitoring Item collecting telemetry for three workspaces.":::

Supported Fabric items begin sending telemetry after you turn on collection. The time before the first records appear depends on item activity and ingestion latency.

## Query monitoring data

Open the Monitoring Item, open its monitoring KQL Database, select a table, and use **Query data** to create a KQL query. For example, the following query returns the most recent item job events:

```kusto
ItemJobEventLogs
| top 100 by Timestamp desc
```

Only tables for supported telemetry are populated. For table descriptions and workload-specific examples, see [Supported telemetry](workspace-monitoring-overview.md#supported-telemetry).

## Manage retention and caching

The monitoring KQL database supports Eventhouse retention and caching policies. Monitoring data is retained for 30 days by default. To change how long data is retained or cached, open the monitoring KQL database and select **Manage** > **Data policies**. The caching period must be less than or equal to the retention period.

- The **retention policy** controls how long data remains available before it's automatically removed.
- The **caching policy** controls how long data remains in local SSD storage. Cached data provides faster query performance.

For policy behavior, requirements, and configuration steps, see [Change data policies](../real-time-intelligence/data-policies.md).

## Share the Monitoring Item

You can share the Monitoring Item with people who don't have a role in the workspace. In the list of workspace items or in the open Monitoring Item, select **Share** on the appropriate KQL Database, choose the audience and permissions, and then send or copy the sharing link. For more information, see [Share items in Microsoft Fabric](share-items.md).

## Send monitoring data to a custom endpoint

You can configure the Monitoring Item's Eventstream with a custom endpoint destination. The destination lets an external application consume monitoring events by using the Event Hubs, Kafka, or AMQP protocol.

Before configuring the endpoint, you must enable it from the Workspace Settings. Through the preview period, this setting can only be enabled at creation time. 

If enabled, use the normal Eventstream configuration process. Open the Eventstream from the Monitoring Item, select **Edit**, add a **Custom endpoint** destination, connect it to the stream, and publish the eventstream. Then, use the destination's **Details** pane to get authentication and connection information for your application. For prerequisites and detailed steps, see [Add a custom endpoint or custom app destination to an eventstream](../real-time-intelligence/event-streams/add-destination-custom-app.md).

## Stop or resume collection

Use the data collection control in the Monitoring Item to stop or resume collection. Stopping collection prevents new telemetry from arriving but preserves the Monitoring Item, supporting items, and previously collected data.

Deleting a Monitoring Item that sends data to another Monitoring Item doesn't delete the destination monitoring environment or the data already sent to it.

> [!IMPORTANT]
> If you enable the Operations Agent, you can't disable it later.

## Recommended architecture

Consolidate to as few Eventhouses as possible. In particular, isolate a workspace on its own Capacity to host a central monitoring Eventhouse. While this architecture isn't always possible - see the limitations section for valid reasons such as monitoring across more than 1,000 workspaces or across different regions - centralize to as few as possible. This approach enables simpler analysis across workspaces and better cost management through resource reuse. Isolating monitoring onto its own capacity shields monitoring from capacity-related conditions such as throttling. It also shields production workloads from excessive capacity usage by monitoring workloads. 

A sample implementation of the preceding architecture is as follows. Capacity A contains the central monitoring Eventhouse. The Monitoring Items in workspaces 2 and 3, both hosted on a different Capacity (Capacity B), send their telemetry to this central Eventhouse. 

:::image type="content" source="media/sample-gallery-workspace-monitoring/recommended-workspace-monitoring-topology.png" alt-text="Architecture diagram of a recommended Monitoring Item topology, monitoring isolated onto its own capacity, and other workspaces data into this central Monitoring Item." border="false":::

## Item naming
When you turn on Workspace Monitoring, Fabric creates a Monitoring item and several other entities under it. One of these entities is a KQL database to store your monitoring data. Fabric automatically names this KQL database by using the pattern: `workspace name + monitoring item name + _Database`. For example, a workspace called Sales with a Monitoring item called Telemetry gets a database called Sales_Telemetry_Database.

### Why the name is sometimes adjusted
Workspace names allow more characters than KQL database names do. If your workspace or item name contains a character that a KQL database doesn't accept, Fabric replaces it with an underscore.
- Fabric keeps exactly as they are: letters in any language (including accented and non-Latin characters), numbers, spaces, hyphens, periods, and underscores.
- Fabric replaces with an underscore: brackets and parentheses, quotes, and other symbols such as `& % $ # @ * ? / \ | < > : ;`.

## Limitations

- Only one Monitoring Item can collect telemetry for a workspace at a time.
- You can't change the Eventhouse destination after configuration.
- To send data to the Eventhouse in another Monitoring Item, both workspaces must be in the same Azure region.
- [Monitoring Item names](enable-workspace-monitoring.md#item-naming) can contain up to 128 characters. If an automatically generated KQL Database name would exceed 256 characters, Fabric truncates parts of the name and adds a hash to keep the name unique.
- A workspace can contain a maximum of [1,000 Fabric and Power BI items](../admin/portal-workspaces.md#workspace-item-limits), including child items. Each workspace that sends data to a destination Eventhouse gets its own KQL Database in the destination workspace, and each database counts toward that workspace's item limit.

## Troubleshooting

- If **Monitoring** isn't available in **Workspace settings**, verify the tenant setting, workspace role, and capacity prerequisites.
- If provisioning doesn't finish, refresh the page and reopen the Monitoring Item to check its status.
- If a supported table is empty, generate the corresponding item activity and allow time for ingestion.
- If you send data to the Eventhouse in another Monitoring Item, verify that the destination Monitoring Item still exists and both workspaces are in the same Azure region.

## Legacy workspace monitoring

### Migrate from legacy workspace monitoring

Migration isn't automatic. To move a workspace from legacy Workspace Monitoring to the updated version:

1. Open the workspace, and select **Workspace settings** > **Monitoring**.
1. Turn off **Log workspace activity** to pause legacy data collection. You can't migrate while legacy data collection is running.
1. Select the option in the migration banner to move to the updated monitoring experience.
1. [Configure the Monitoring Item and turn on data collection](#configure-monitoring-and-start-collection).

Previously collected data remains in the legacy Eventhouse and isn't transferred to the updated monitoring database. After you turn on updated data collection, telemetry can take up to one hour to begin flowing to the new database. This delay occurs while cached settings for the legacy destination expire; no action is required.

### Enable legacy workspace monitoring

You can only enable the legacy Workspace Monitoring feature if you didn't already enroll in the updated version as described in the rest of the document. If you need to revert from the updated version to the legacy one, you must delete the Monitoring Item from the workspace. The option to onboard through the legacy path becomes available.

Follow these steps to enable legacy Workspace Monitoring in your workspace:

1. Go to the workspace you want to enable monitoring for, and select **Workspace settings** (&#9881;).

2. In **Workspace settings**, select **Monitoring**.

3. Select **+Eventhouse** and wait for Fabric to create the database.

## Related content

- [Workspace monitoring overview](workspace-monitoring-overview.md)
- [Monitor Fabric items with item job event logs](item-job-event-logs.md)
- [Visualize workspace monitoring](sample-gallery-workspace-monitoring.md)
