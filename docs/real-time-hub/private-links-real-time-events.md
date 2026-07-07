---
title: Private links for Azure and Fabric Events
description: Learn how tenant-level and workspace-level private links affect Azure and Fabric event consumption in Microsoft Fabric Real-Time hub.
author: george-guirguis
ms.author: geguirgu
ms.topic: how-to
ms.date: 04/03/2026
ai-usage: ai-assisted

#customer intent: As an admin, I want to understand how private link configurations affect Real-Time event consumption so that I can securely configure event-driven workflows while maintaining private network access.

---

# Private links for Azure and Fabric Events

Private links in Microsoft Fabric can affect how events are consumed through Real-Time hub. Both [tenant-level private links](/fabric/security/security-private-links-overview) and [workspace-level private links](/fabric/security/security-workspace-level-private-links-overview) enforce network restrictions that can block event creation and delivery depending on the event source and network configuration.

> [!NOTE]
> It might take up to 30 minutes for changes to the workspace networking configuration to take effect.

## Tenant-level private links and Azure events

When the **Block Public Internet Access** tenant setting is enabled as part of [tenant-level private link configuration](/fabric/security/security-private-links-use), Azure event sources outside the tenant are blocked from delivering events into Fabric. This restriction applies because Azure events (such as Azure Blob Storage events) originate from outside the Fabric tenant and require public network access to deliver events.

However, you can restore Azure event delivery by allowlisting the Azure Event Grid system topic as a trusted resource in the workspace inbound networking settings. For details, see [Allow Azure event sources through inbound trusted resources](#allow-azure-event-sources-through-inbound-trusted-resources).

### Impact on Azure event consumption

When **Block Public Internet Access** is enabled:

| Scenario | Result |
|----------|--------|
| Creating a new Azure event consumer (for example, configuring an Activator alert to monitor blob uploads from an Azure Storage account) | Configuration is blocked. Consumer creation fails. |
| Existing Azure event consumer (for example, an Eventstream that was already receiving Azure Blob Storage events) | Events are dropped at the Azure source and never reach Fabric. The configuration doesn't enter a paused state. To restore delivery, add the Azure Event Grid system topic to the allow list as a trusted resource in the workspace inbound networking settings. To discover dropped events, investigate the [metrics](/azure/event-grid/monitor-event-delivery) and [diagnostic logs](/azure/event-grid/enable-diagnostic-logs-topic) for the Azure resource (such as the Azure Storage account) in the Azure portal. |

### Impact on Fabric event consumption

Fabric events (such as Job events, Workspace item events, and OneLake events) aren't affected by tenant-level private link configuration because they originate from within the Fabric tenant.

## Workspace-level private links and cross-workspace events

When [workspace-level private links](/fabric/security/security-workspace-level-private-links-overview) are configured on a workspace to block public access, event consumers (such as Activator alerts or Eventstreams) in other workspaces can't consume events from items in that workspace unless a private link is established from the consumer's network to the source workspace.

In Azure and Fabric Events, the **source workspace** is the workspace where the events originate from, and the **consumer workspace** is the workspace where the Activator alert, Eventstream, or other consumer item is created. Workspace-level private links are enforced on the **source workspace** only. The consumer workspace's private link configuration doesn't impact the events flow. Event consumption within the same workspace is always allowed, regardless of private link settings.

### How workspace-level private links affect event consumption

The following table summarizes how workspace-level private link settings affect event consumption.

| Source workspace private links | Consumer workspace private links | Private link from consumer to source | Result |
|---|---|---|---|
| A (public access blocked) | A (public access blocked) | Not required | Consumption succeeds because source and consumer are in the same workspace. |
| A (public access blocked) | B | Not established | Consumption is blocked. Consumer creation fails with an error. |
| A (public access blocked) | B | Established | Consumption succeeds because the consumer connects via a private link to the source workspace. |
| A | B (public access blocked) | Not required | Consumption succeeds because the consumer workspace's private link configuration doesn't impact the events flow. |

### Examples

The following examples illustrate how workspace-level private links affect different event types.

#### Fabric events: OneLake events

Suppose you configure an Activator alert in **Workspace A** to monitor OneLake events from a lakehouse in **Workspace B**. In this case, Workspace B is the source workspace (where the events originate) and Workspace A is the consumer workspace (where the Activator alert is created). If Workspace B blocks public network access, this configuration fails unless a private link is established from Workspace A's network to Workspace B.

#### Fabric events: Job events

Suppose you create an Eventstream in **Workspace A** to capture Job events emitted by a pipeline in **Workspace B**. Workspace B is the source workspace because the pipeline job runs there, and Workspace A is the consumer workspace because the Eventstream is created there. If Workspace B blocks public network access, the Eventstream can't receive events from the pipeline unless a private link is established from Workspace A's network to Workspace B.

#### Azure events: Azure Blob Storage events

When you configure a consumer to receive Azure Blob Storage events, an Eventstream item is created in a Fabric workspace to represent the Azure source. This Eventstream item acts as the bridge between the Azure source and Fabric consumers.

For example, suppose an Eventstream item for Azure Blob Storage events is created in **Workspace A**, and an Activator alert in **Workspace B** consumes those events. Workspace A is the source workspace (because it contains the Eventstream item that represents the Azure source) and Workspace B is the consumer workspace (because the Activator alert is created there). If Workspace A blocks public network access, the Activator alert in Workspace B can't consume those events unless a private link is established from Workspace B's network to Workspace A.

> [!NOTE]
> Azure events are also subject to tenant-level private link restrictions. Even if workspace-level private links allow the connection, Azure event delivery is still blocked if the **Block Public Internet Access** tenant setting is enabled. See [Tenant-level private links and Azure events](#tenant-level-private-links-and-azure-events) for details.

## Configuration changes after consumer creation

If workspace-level private link settings change after a consumer is already configured, the system detects the change and pauses the configuration. To restore event delivery, delete and recreate the consumer configuration.

### Workspace-level private link changes

For example, suppose an Activator alert in Workspace A is configured to consume Job events from a pipeline in Workspace B while public access is allowed on Workspace B. If a workspace admin later enables workspace-level private links on Workspace B and blocks public access, the system detects the network policy change and pauses the configuration. To restore delivery, allow public access on the source workspace or establish a private link from the consumer's network to the source workspace, then delete and recreate the consumer configuration.

For details on how to discover and troubleshoot paused configurations, see [Paused event configurations in Real-Time hub](fabric-events-paused-state.md).

### Tenant-level private link changes

If a tenant admin enables **Block Public Internet Access** after Azure event consumers are already configured, the events are dropped at the Azure source and never reach Fabric. The configuration doesn't enter a paused state in Real-Time hub. To discover dropped events, investigate the [metrics](/azure/event-grid/monitor-event-delivery) and [diagnostic logs](/azure/event-grid/enable-diagnostic-logs-topic) for the Azure resource (such as the Azure Storage account) in the Azure portal.

To restore event delivery, you can:
- Add the Azure Event Grid system topic to the allow list as a trusted resource in the workspace inbound networking settings. For details, see [Allow Azure event sources through inbound trusted resources](#allow-azure-event-sources-through-inbound-trusted-resources).
- Disable the **Block Public Internet Access** tenant setting, or remove the Azure Private Link configuration.

## Allow Azure event sources through inbound trusted resources

When the **Block Public Internet Access** tenant setting blocks Azure event delivery, you can restore the flow by allowlisting the Azure Event Grid system topic as a trusted resource in the workspace inbound networking settings. This uses the same [Resource Instance Rules](/fabric/onelake/onelake-manage-inbound-access-trusted-resources) that control inbound access to OneLake.

### Find the Event Grid system topic resource ID

To add the Azure Event Grid system topic to the allow list, you first need its Azure Resource Manager (ARM) resource ID:

1. In the [Azure portal](https://portal.azure.com), open the Azure resource that emits the events (for example, the Azure Storage account).
1. Select the **Events** tab.
1. Select the link to the Event Grid system topic to open it.
1. On the **Overview** page, in the **Essentials** section, select the **JSON View** link.
1. On the **Resource JSON** page, copy the **Resource ID** value. The resource ID is in the following format: `/subscriptions/{subscription-id}/resourceGroups/{resource-group}/providers/Microsoft.EventGrid/systemTopics/{system-topic-name}`.

### Configure the trusted resource

1. In the Fabric portal, go to the workspace **Settings** > **Inbound networking**.
1. Select **Allow connections from selected networks and workspace level private links**.
1. Under the allow list settings, find **Allow inbound trusted resources (preview)** and select **Edit**.
1. Select **Add resource** and provide the following information:
   - **Name**: A friendly name for the Azure event source (for example, `My Storage Account Events`).
   - **Resource identifier**: The ARM resource ID of the Azure Event Grid system topic that you copied from the Azure portal.
1. Save the configuration.

When you add the trusted resource, Azure events from the allowlisted Event Grid system topic can deliver events into Fabric, even when public internet access is blocked at the tenant level. For more information about Resource Instance Rules, see [Manage inbound access to OneLake with trusted resources](/fabric/onelake/onelake-manage-inbound-access-trusted-resources).

## Related content

- [About tenant-level private links](/fabric/security/security-private-links-overview)
- [Supported scenarios and limitations for workspace-level private links](/fabric/security/security-workspace-level-private-links-support)
