---
title: Private links for Azure and Fabric Events
description: Learn how tenant-level and workspace-level private links affect Azure and Fabric event consumption in Microsoft Fabric Real-Time hub.
author: msmimart
ms.author: mimart
ms.topic: how-to
ms.date: 04/03/2026
ai-usage: ai-assisted

#customer intent: As an admin, I want to understand how private link configurations affect Real-Time event consumption so that I can securely configure event-driven workflows while maintaining private network access.

---

# Private links for Azure and Fabric Events (preview)

Private links in Microsoft Fabric can affect how events are consumed through Real-Time hub. Both [tenant-level private links](/fabric/security/security-private-links-overview) and [workspace-level private links](/fabric/security/security-workspace-level-private-links-overview) enforce network restrictions that can block event creation and delivery depending on the event source and network configuration.

[!INCLUDE [feature-preview-note](../includes/feature-preview-note.md)]

## Tenant-level private links and Azure events

When the **Block Public Internet Access** tenant setting is enabled as part of [tenant-level private link configuration](/fabric/security/security-private-links-use), Azure event sources outside the tenant are blocked from delivering events into Fabric. This restriction applies because Azure events (such as Azure Blob Storage events) originate from outside the Fabric tenant and require public network access to deliver events.

### Impact on Azure event consumption

When **Block Public Internet Access** is enabled:

| Scenario | Result |
|----------|--------|
| Creating a new Azure event consumer (for example, configuring an Activator alert to monitor blob uploads from an Azure Storage account) | Configuration is blocked. Consumer creation fails. |
| Existing Azure event consumer (for example, an eventstream that was already receiving Azure Blob Storage events) | Events are dropped at the Azure source and never reach Fabric. The configuration doesn't enter a paused state. To discover dropped events, investigate the metrics and logs for the Azure resource (such as the Azure Storage account) in the Azure portal. |

### Fabric events are not affected by tenant-level private links

Fabric events (such as Job events, Workspace item events, and OneLake events) aren't affected by tenant-level private link configuration because they originate from within the Fabric tenant.

## Workspace-level private links and cross-workspace events

When [workspace-level private links](/fabric/security/security-workspace-level-private-links-overview) are configured on a workspace to block public access, event consumers (such as Activator alerts or eventstreams) in other workspaces can't consume events from items in that workspace unless a private link is established from the consumer's network to the source workspace.

In Azure and Fabric Events, the **source workspace** is the workspace where the events originate from, and the **consumer workspace** is the workspace where the Activator alert, eventstream, or other consumer item is created.

> [!NOTE]
> Workspace-level private links are enforced on the **source workspace** (the workspace where events originate).

### How workspace-level private links affect event consumption

The following table summarizes how workspace-level private link settings on the source workspace affect cross-workspace event consumption.

| Source workspace | Consumer workspace | Private link to source | Result |
|---|---|---|---|
| Public access blocked | Different workspace | Established | Consumption succeeds because the consumer connects via a private link. |
| Public access blocked | Different workspace | Not established | Consumption is blocked. Consumer creation fails with an error. |
| Public access blocked | Same workspace | Not required | Consumption succeeds because source and consumer are in the same workspace. |
| Public access allowed | Any workspace | Not required | Consumption succeeds because public access is allowed. |

### Supported event types

Workspace-level private links affect cross-workspace consumption of all Azure and Fabric event types available in Real-Time hub.

> [!IMPORTANT]
> Event consumption within the same workspace is always allowed, regardless of private link settings.

### Examples

The following examples illustrate how workspace-level private links affect different event types.

#### Fabric events: OneLake events

Suppose you configure an Activator alert in **Workspace A** to monitor OneLake events from a lakehouse in **Workspace B**. In this case, Workspace B is the source workspace (where the events originate) and Workspace A is the consumer workspace (where the Activator alert is created). If Workspace B blocks public network access, this configuration fails unless a private link is established from Workspace A's network to Workspace B.

#### Fabric events: Job events

Suppose you create an eventstream in **Workspace A** to capture job events emitted by a pipeline in **Workspace B**. Workspace B is the source workspace because the pipeline job runs there, and Workspace A is the consumer workspace because the eventstream is created there. If Workspace B blocks public network access, the eventstream can't receive events from the pipeline unless a private link is established from Workspace A's network to Workspace B.

#### Azure events: Azure Blob Storage events

When you configure a consumer to receive Azure Blob Storage events, an eventstream item is created in a Fabric workspace to represent the Azure source. This eventstream item acts as the bridge between the Azure source and Fabric consumers.

For example, suppose an eventstream item for Azure Blob Storage events is created in **Workspace A**, and an Activator alert in **Workspace B** consumes those events. Workspace A is the source workspace (because it contains the eventstream item that represents the Azure source) and Workspace B is the consumer workspace (because the Activator alert is created there). If Workspace A blocks public network access, the Activator alert in Workspace B can't consume those events unless a private link is established from Workspace B's network to Workspace A.

> [!NOTE]
> Azure events are also subject to tenant-level private link restrictions. Even if workspace-level private links allow the connection, Azure event delivery is still blocked if the **Block Public Internet Access** tenant setting is enabled. See [Tenant-level private links and Azure events](#tenant-level-private-links-and-azure-events) for details.

## Configuration changes after consumer creation

If workspace-level private link settings change after a consumer is already configured, the system detects the change and pauses the configuration. While paused, events are retained for up to 7 days. If the condition is resolved within that period, event delivery resumes automatically.

### Workspace-level private link changes

For example, suppose an Activator alert in Workspace A is configured to consume Job events from a pipeline in Workspace B while public access is allowed on Workspace B. If a workspace admin later enables workspace-level private links on Workspace B and blocks public access, the system detects the network policy change and pauses the configuration. To restore delivery, allow public access on the source workspace (the workspace where the events originate), or establish a private link from the consumer's network to the source workspace.

For details on how to discover and troubleshoot paused configurations, see [Paused event configurations in Real-Time hub](fabric-events-paused-state.md).

### Tenant-level private link changes

For tenant-level private links, the behavior is different. If a tenant admin enables **Block Public Internet Access** after Azure event consumers are already configured, the events are dropped at the Azure source and never reach Fabric. The configuration doesn't enter a paused state in Real-Time hub. To discover dropped events, investigate the metrics and logs for the Azure resource (such as the Azure Storage account) in the Azure portal.

To restore event delivery, disable the **Block Public Internet Access** tenant setting, or remove the Azure Private Link configuration.

## Considerations and limitations

- Tenant-level private links only affect Azure event sources (events originating from outside the Fabric tenant). Fabric events aren't affected by tenant-level private links because they originate from within the tenant.

- Workspace-level private links are enforced on the source workspace (the workspace where events originate, or the workspace that contains the eventstream item representing the Azure source). No workspace-level private link configuration is required on the consumer workspace for this feature.

- For other private link limitations, see [About tenant-level private links](/fabric/security/security-private-links-overview#other-considerations-and-limitations) and [Supported scenarios and limitations for workspace-level private links](/fabric/security/security-workspace-level-private-links-support).
