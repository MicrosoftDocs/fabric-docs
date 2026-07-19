---
title: Workspace outbound access protection for Azure and Fabric events
description: Learn how workspace outbound access protection works with Azure and Fabric events in Microsoft Fabric, including how to allow cross-workspace event consumption using data connection rules.
author: george-guirguis
ms.author: geguirgu
ms.topic: how-to
ms.date: 04/02/2026
ai-usage: ai-assisted

#customer intent: As a workspace admin, I want to understand how outbound access protection affects Azure and Fabric event consumption so that I can securely configure cross-workspace event-driven workflows.

---

# Workspace outbound access protection for Azure and Fabric events (preview)

Workspace outbound access protection helps safeguard your data by controlling outbound connections from event consumers in your workspace. When you enable this feature, consumers such as Activator and Eventstream can't consume events that originate outside the workspace unless you explicitly grant access through approved data connection rules.

[!INCLUDE [feature-preview-note](../includes/feature-preview-note.md)]

> [!NOTE]
> It might take up to 30 minutes for changes to the workspace networking configuration to take effect.

## Understanding outbound access protection with Azure and Fabric events

When a workspace admin enables the **block outbound public access** setting, all cross-workspace event consumption is blocked by default. For example, if a consumer in Workspace B tries to consume Job events from an item in Workspace A, the configuration fails. Outbound access protection is enforced on the **consumer's workspace** only. The source workspace's outbound access protection configuration doesn't impact the events flow.

To allow cross-workspace event consumption, the workspace admin configures a data connection rule for the **Real-Time Events** connector. Once this rule is in place, consumers in the workspace can consume events from items in other workspaces. Event consumption within the same workspace is always allowed, regardless of outbound access protection settings.

## Configuring outbound access protection for Azure and Fabric events

You can only create an allow list by using data connection rules; managed private endpoints aren't supported for Azure and Fabric events. To configure outbound access protection for Azure and Fabric events:

1. Follow the steps to [enable outbound access protection](workspace-outbound-access-protection-set-up.md).

1. After enabling outbound access protection, [add a data connection rule](workspace-outbound-access-protection-allow-list-connector.md) for the **Real-Time Events** cloud connection to allow cross-workspace event consumption.

When you configure these settings, consumers can consume events from other workspaces through the allowed Real-Time Events connector, while all other outbound connections remain blocked.

## Common scenarios

Workspace outbound access protection affects how event consumers connect to event sources in other workspaces. This section describes common scenarios.

### Cross-workspace event consumption

The following table summarizes how outbound access protection applies to cross-workspace event consumption.

| Consumer workspace OAP | Source workspace OAP | Real-Time Events connector on consumer workspace | Result |
|----|----|----|-----|
| A (enabled) | A (enabled) | Not required | Consumption succeeds because source and consumer are in the same workspace. |
| A (enabled) | B | Not configured | Consumption is blocked. Consumer creation fails with an error. |
| A (enabled) | B | Allowed on consumer workspace | Consumption succeeds because the Real-Time Events connector is allowed on the consumer workspace. |
| A | B (enabled) | Not required | Consumption succeeds because the source workspace's outbound access protection configuration doesn't impact the events flow. |

### Examples

**OneLake events**: Suppose you create an Activator alert in Workspace A to monitor OneLake events from a lakehouse in Workspace B. In this scenario:

- **Workspace A** is the consumer workspace.
- **Workspace B** is the source workspace where the lakehouse resides.

If the **block outbound public access** setting is enabled on Workspace A, the configuration fails unless the **Real-Time Events** connector is added to the allow list on Workspace A. The source workspace's (Workspace B) outbound access protection configuration doesn't impact the events flow.

**Azure Blob Storage events**: When you configure a consumer to receive Azure Blob Storage events, an Eventstream item is automatically created in a Fabric workspace to represent the Azure source. This workspace acts as the source workspace for the events flow.

For example, suppose you create an Activator alert in Workspace A to react to Azure Blob Storage events, and the Eventstream representing the Azure Blob Storage source is in Workspace B. In this scenario:

- **Workspace A** is the consumer workspace.
- **Workspace B** is the source workspace that contains the Eventstream item representing the Azure Blob Storage source.

If the **block outbound public access** setting is enabled on Workspace A, the configuration fails unless the **Real-Time Events** connector is added to the allow list on Workspace A. The source workspace's (Workspace B) outbound access protection configuration doesn't impact the events flow.

### Configuration changes after consumer creation

If you change outbound access protection settings after you configure a consumer, the system detects the change and pauses the configuration. To restore event delivery, delete and recreate the consumer configuration. For example:

- You configure a consumer in Workspace A to consume Job events from Workspace B while the Real-Time Events connector is allowed.
- A workspace admin later removes the Real-Time Events connector from the allow list or enables outbound access protection without adding the connector.
- The system detects the policy change and pauses event delivery to the consumer.

To restore event delivery, ensure the Real-Time Events connector is in the allow list, then delete and recreate the consumer configuration.

For details on how to discover and troubleshoot paused configurations, see [Paused event configurations in Real-Time hub](/fabric/real-time-hub/fabric-events-paused-state).

## Related content

- [Workspace outbound access protection overview](workspace-outbound-access-protection-overview.md)
