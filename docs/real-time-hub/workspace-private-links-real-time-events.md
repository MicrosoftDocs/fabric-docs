---
title: Workspace private links for Azure and Fabric events
description: Learn how workspace-level private links affect Azure and Fabric event consumption in Microsoft Fabric Real-Time hub.
author: george-guirguis
ms.author: geguirgu
ms.topic: how-to
ms.date: 08/20/2026
ai-usage: ai-assisted

#customer intent: As an admin, I want to understand how workspace-level private link configurations affect Real-Time event consumption so that I can securely configure event-driven workflows while maintaining private network access.

---

# Workspace private links for Azure and Fabric events

When you configure [workspace-level private links](/fabric/security/security-workspace-level-private-links-overview) on a workspace to block public access, event consumers (such as Activator rules or Eventstreams) in other workspaces can't consume events from items in that workspace unless you establish a private link from the consumer's network to the source workspace.

In Azure and Fabric events, the **source workspace** is the workspace where the events originate, and the **consumer workspace** is the workspace where you create the Activator rule, Eventstream, or other consumer item. You enforce workspace-level private links on the **source workspace** only. The consumer workspace's private link configuration doesn't impact the events flow. Event consumption within the same workspace is always allowed, regardless of private link settings.

> [!NOTE]
> It might take up to 30 minutes for changes to the workspace networking configuration to take effect.

## How workspace-level private links affect event consumption

The following table summarizes how workspace-level private link settings affect event consumption.

| Source workspace private links | Consumer workspace private links | Private link from consumer to source | Result |
|---|---|---|---|
| A (public access blocked) | A (public access blocked) | Not required | Consumption succeeds because source and consumer are in the same workspace. |
| A (public access blocked) | B | Not established | Consumption is blocked. Consumer creation fails with an error. |
| A (public access blocked) | B | Established | Consumption succeeds because the consumer connects via a private link to the source workspace. |
| A | B (public access blocked) | Not required | Consumption succeeds because the consumer workspace's private link configuration doesn't impact the events flow. |

## Impact on capacity overview events

Workspace-level private links don't affect capacity overview events. Capacity overview events originate from the capacity itself, which operates at a scope above any individual workspace. Because these events aren't bound to a specific workspace, workspace-level network restrictions don't apply to them.

## Examples

The following examples illustrate how workspace-level private links affect different event types.

### Fabric events: OneLake events

Suppose you configure an Activator rule in **Workspace A** to monitor OneLake events from a lakehouse in **Workspace B**. In this case, Workspace B is the source workspace (where the events originate) and Workspace A is the consumer workspace (where the Activator rule is created). If Workspace B blocks public network access, this configuration fails unless you establish a private link from Workspace A's network to Workspace B.

### Fabric events: Job events

Suppose you create an Eventstream in **Workspace A** to capture Job events emitted by a pipeline in **Workspace B**. Workspace B is the source workspace because the pipeline job runs there, and Workspace A is the consumer workspace because you create the Eventstream there. If Workspace B blocks public network access, the Eventstream can't receive events from the pipeline unless you establish a private link from Workspace A's network to Workspace B.

### Azure events: Azure Blob Storage events

When you configure a consumer to receive Azure Blob Storage events, an Eventstream item is created in a Fabric workspace to represent the Azure source. This Eventstream item acts as the bridge between the Azure source and Fabric consumers.

For example, suppose you create an Eventstream item for Azure Blob Storage events in **Workspace A**, and an Activator rule in **Workspace B** consumes those events. Workspace A is the source workspace because it contains the Eventstream item that represents the Azure source, and Workspace B is the consumer workspace because you create the Activator rule there. If Workspace A blocks public network access, the Activator rule in Workspace B can't consume those events unless you establish a private link from Workspace B's network to Workspace A.

> [!NOTE]
> Azure events are also subject to tenant-level private link restrictions. Even if workspace-level private links allow the connection, Azure event delivery is still blocked if the **Block Public Internet Access** tenant setting is enabled. For more information, see [Tenant private links for Azure and Fabric events](private-links-real-time-events.md).

## Configuration changes after consumer creation

If workspace-level private link settings change after you configure a consumer, the system detects the change and pauses the configuration. To restore event delivery, delete and recreate the consumer configuration.

For example, suppose you configure an Activator rule in Workspace A to consume Job events from a pipeline in Workspace B while public access is allowed on Workspace B. If a workspace admin later enables workspace-level private links on Workspace B and blocks public access, the system detects the network policy change and pauses the configuration. To restore delivery, allow public access on the source workspace or establish a private link from the consumer's network to the source workspace, then delete and recreate the consumer configuration.

For details on how to discover and troubleshoot paused configurations, see [Paused event configurations in Real-Time hub](fabric-events-paused-state.md).

## Related content

- [Supported scenarios and limitations for workspace-level private links](/fabric/security/security-workspace-level-private-links-support)
- [Tenant private links for Azure and Fabric events](private-links-real-time-events.md)
- [Paused event configurations](fabric-events-paused-state.md)
