---
title: Paused event configurations in Real-Time hub
description: Learn about the paused state for Azure and Fabric event configurations in Real-Time hub, including common reasons, how to discover paused configurations, and mitigation steps.
ms.reviewer: geguirgu
ms.topic: concept-article
ms.date: 04/06/2026
ai-usage: ai-assisted
---

# Paused event configurations in Real-Time hub

When you configure a consumer (such as an Activator alert or eventstream) to receive Azure or Fabric events through Real-Time hub, the configuration can enter a **Paused** state if the system detects a condition that prevents event delivery. While the configuration is paused, events are retained for up to 7 days. If the condition is resolved within that period, event delivery resumes automatically. If the condition isn't resolved within 7 days, the retained events are dropped.

## Discovering paused configurations

To check the status of event configurations:

1. In Microsoft Fabric, select **Real-Time** on the left navigation bar.
1. Select the **Fabric events** page or the **Azure events** page.
1. Select the event group that you're interested in to see all the consumers for that event group.
1. The **Status** column shows **Active** or **Paused** for each consumer.
1. To see the specific reason for a paused state, select the ellipsis (**...**) on the line item to open the list of actions, and then select **View details**. The details pane shows a **Reason** field that explains exactly why the configuration is paused.

## Reasons and mitigation

The following table lists the reasons a configuration can be paused and the steps to resolve each one.

| Reason | Description | Mitigation |
|--------|-------------|------------|
| Event ingestion is paused because the owner doesn't have sufficient permissions. | The owner of the event configuration has lost the subscribe permission on the source item. Permissions are assessed both during creation and for the lifetime of the event configuration. | Delete and recreate the configuration with a user that has sufficient subscribe permissions. For details on required permissions per event type, see [Subscribe permissions for Azure and Fabric events](fabric-events-subscribe-permission.md). |
| Event ingestion is paused because the network configuration for source workspace blocks events to destination workspace. | The source workspace (the workspace where the events originate) has [workspace-level private links](/fabric/security/security-workspace-level-private-links-overview) configured to block public access, and there's no private link established from the consumer's network to the source workspace. | Allow public access on the source workspace, or establish a private link from the consumer's network to the source workspace. For more information, see [Private links for Azure and Fabric Events](private-links-real-time-events.md). |
| The owner of the event configuration is no longer available. | The user account that owns the event configuration has been deleted or disabled. | Delete and recreate the configuration with an active user that has sufficient permissions. |
| The capacity is paused. | The Fabric capacity hosting the workspace has been paused by an administrator. | Resume the capacity from the Azure portal. Event delivery resumes automatically once the capacity is active. |
| The capacity is throttled. | The Fabric capacity hosting the workspace is being throttled due to high resource consumption. | Wait for throttling to subside, or scale up the capacity. Event delivery resumes automatically once the capacity is no longer throttled. |

> [!NOTE]
> For tenant-level private links, when the **Block Public Internet Access** setting is enabled, Azure events (such as Azure Blob Storage events) aren't paused — the events are dropped at the Azure source and never reach Fabric. To discover dropped events in this scenario, investigate the metrics and logs for the Azure resource (such as the Azure Storage account) in the Azure portal. For more information, see [Private links for Azure and Fabric Events](private-links-real-time-events.md).

## Related content

- [Subscribe permissions for Azure and Fabric events](fabric-events-subscribe-permission.md)
- [Private links for Azure and Fabric Events](private-links-real-time-events.md)
- [Introduction to Azure and Fabric events](fabric-events-overview.md)
