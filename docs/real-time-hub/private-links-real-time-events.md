---
title: Tenant private links for Azure and Fabric events
description: Learn how tenant-level private links affect Azure and Fabric event consumption in Microsoft Fabric Real-Time hub.
author: george-guirguis
ms.author: geguirgu
ms.topic: how-to
ms.date: 08/20/2026
ai-usage: ai-assisted

#customer intent: As an admin, I want to understand how tenant-level private link configurations affect Real-Time event consumption so that I can securely configure event-driven workflows while maintaining private network access.

---

# Tenant private links for Azure and Fabric events

[Tenant-level private links](/fabric/security/security-private-links-overview) in Microsoft Fabric can affect how you consume Azure events through Real-Time hub. When you enable the **Block Public Internet Access** tenant setting as part of [tenant-level private link configuration](/fabric/security/security-private-links-use), Azure event sources outside the tenant can't deliver events into Fabric. This restriction applies because Azure events (such as Azure Blob Storage events) originate from outside the Fabric tenant and require public network access to deliver events.

## Impact on Azure event consumption

When **Block Public Internet Access** is enabled:

| Scenario | Result |
|----------|--------|
| Creating a new Azure event consumer (for example, configuring an Activator rule to monitor blob uploads from an Azure Storage account) | Configuration is blocked. Consumer creation fails. |
| Existing Azure event consumer (for example, an Eventstream that was already receiving Azure Blob Storage events) | Events are dropped at the Azure source and never reach Fabric. The configuration doesn't enter a paused state. To discover dropped events, investigate the [metrics](/azure/event-grid/monitor-event-delivery) and [diagnostic logs](/azure/event-grid/enable-diagnostic-logs-topic) for the Azure resource (such as the Azure Storage account) in the Azure portal. |

## Impact on Fabric event consumption

Fabric events (such as Job events, Workspace item events, and OneLake events) aren't affected by tenant-level private link configuration because they originate from within the Fabric tenant.

## Configuration changes after consumer creation

If a tenant admin enables **Block Public Internet Access** after Azure event consumers are already configured, the events are dropped at the Azure source and never reach Fabric. The configuration doesn't enter a paused state in Real-Time hub. To discover dropped events, investigate the [metrics](/azure/event-grid/monitor-event-delivery) and [diagnostic logs](/azure/event-grid/enable-diagnostic-logs-topic) for the Azure resource (such as the Azure Storage account) in the Azure portal.

To restore event delivery, disable the **Block Public Internet Access** tenant setting, or remove the Azure Private Link configuration.

## Related content

- [About tenant-level private links](/fabric/security/security-private-links-overview)
- [Workspace private links for Azure and Fabric events](workspace-private-links-real-time-events.md)
- [Paused event configurations](fabric-events-paused-state.md)
