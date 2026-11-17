---
title: Approve and manage Event Hubs shortcuts (preview)
description: Review, approve, reject, and remove Azure Event Hubs shortcuts to Microsoft Fabric eventstreams, and understand the effects of resource deletion.
ms.topic: how-to
ms.date: 11/06/2026
ai-usage: ai-generated
---

# Approve and manage Azure Event Hubs shortcuts (preview)

An Azure Event Hubs administrator can review shortcut requests in the Azure portal. The request identifies the event hub and the Fabric eventstream that uses it as its default stream.

> [!IMPORTANT]
> This feature is in preview. Approval grants Fabric access through the shortcut. Review the target event hub, workspace, and eventstream before approving.

## Prerequisites

- A [shortcut request](create-event-hubs-shortcut.md) for the target event hub.
- Public network access enabled on the Event Hubs namespace.
- Effective permission for the control-plane action `Microsoft.EventHub/namespaces/eventHubs/fabricShortcuts/approve/action` at the target event hub or namespace scope to approve a request. **Azure Event Hubs Data Owner** is sufficient because it includes this action; no separate grant of the approval action is needed.
- Permission for the management action you're performing at the target Azure resource. Approval permission doesn't by itself establish permission to remove a shortcut.
- Access to the Fabric eventstream, or coordination with its owner, to verify the result.

An Azure-only approver doesn't need a Fabric workspace role just to perform Azure-side approval. Creating or editing the eventstream requires the corresponding Fabric permissions.

Requesting and approving a shortcut require different permissions. A requester with **Azure Event Hubs Data Receiver** plus `Microsoft.EventHub/namespaces/eventHubs/fabricShortcuts/write` still needs an approver unless they also have the approval action. If the requester has **Azure Event Hubs Data Owner**, or equivalent or broader effective permissions that include data-read access and both shortcut actions, the request is automatically approved at creation. No separate administrator approval is needed. For the full model, see [Permissions and approval](event-hubs-shortcuts-overview.md#permissions-and-approval).

> [!NOTE]
> The screenshots use fictional Contoso resource names and example identifiers in place of the original values. Compare your own resource details when reviewing a request.

## Approve a pending request

1. Sign in to the [Azure portal](https://portal.azure.com).
1. Open the target Event Hubs namespace, then the event hub.
1. Select **Shortcut to Fabric (preview)**, then the **Event Hub shortcuts** tab.
1. Find the pending request. Verify the event hub, eventstream, Fabric workspace, requester, and request time. If the portal displays IDs rather than names, compare them with the requester's resource details.
1. Review the shortcut request. If the UI doesn't expose enough information to identify the intended relationship, resolve that ambiguity with the requester before proceeding.

   :::image type="content" source="./media/event-hubs-shortcuts/azure-pending-request.png" alt-text="Screenshot of the example contoso-orders pending request in Azure, with sample Fabric IDs and row-specific Approve and Reject actions." lightbox="./media/event-hubs-shortcuts/azure-pending-request.png":::

1. Select **Approve** for the intended row and review any confirmation. Avoid bulk approval when you intend to approve only one request.
1. Refresh the tab and confirm that the intended relationship appears in the approved list with **Active** status.

   :::image type="content" source="./media/event-hubs-shortcuts/azure-active-shortcut.png" alt-text="Screenshot of the example contoso-orders approved shortcut in Azure with sample Fabric IDs and Active status." lightbox="./media/event-hubs-shortcuts/azure-active-shortcut.png":::

1. Ask the eventstream owner to refresh Fabric and [verify that events reach the destination](create-event-hubs-shortcut.md#add-a-destination-and-verify-data).

Only one approved shortcut can exist for an event hub. Approving a request cleans up other unapproved requests for that event hub. Coordinate with other requesters before choosing the relationship to approve.

If the shortcut remains **Pending**, confirm that the administrator approved the intended request and refresh Azure and Fabric. For further checks, see [The request is successful but still pending](troubleshoot-event-hubs-shortcuts.md#the-request-is-successful-but-still-pending).

## Reject a pending request

1. Open **Shortcut to Fabric (preview)** > **Event Hub shortcuts** on the target event hub.
1. Identify the pending request you want to reject and select the row-specific **Reject** action.
1. Review any confirmation prompt.
1. Refresh Azure and Fabric. Confirm that the rejected request doesn't become an active relationship and that it doesn't deliver events.
1. Tell the requester why you didn't approve access. The requester can remove or replace the unsuccessful request after addressing the reason.

Don't depend on a status named **Rejected**. The supported shortcut status model is **Pending**, **Active**, and **Error**; the post-rejection experience can indicate the outcome without persisting a separate rejected state.

## Remove a shortcut

> [!WARNING]
> Removing an active shortcut stops delivery through that relationship. Coordinate with the eventstream owner and downstream consumers before you remove it. Don't delete the backing event hub to remove a shortcut.

1. Open **Shortcut to Fabric (preview)** > **Event Hub shortcuts** on the target event hub.
1. Confirm the eventstream and workspace for the relationship you intend to remove.
1. Select the relationship in the approved list, and then select **Remove shortcut**.
1. Review and accept the confirmation only after checking the affected resources.
1. Refresh the Azure list and the Fabric eventstream.
1. Confirm that the relationship is removed, delivery through it has stopped, and the eventstream's transformations, operations, and destinations remain.

Removal cleans up the relationship metadata and shortcut-owned consumer groups. It doesn't delete the customer-owned event hub or previously ingested destination data. Don't manually delete consumer groups to complete cleanup.

If the relationship remains visible or a replacement request fails after removal, capture the error and request ID and follow [Troubleshoot shortcuts](troubleshoot-event-hubs-shortcuts.md). Don't repeatedly delete and recreate resources.

## Understand resource deletion

| Action | Effect |
|---|---|
| Remove the shortcut | Delivery through the shortcut stops. Azure cleans up relationship metadata and shortcut-owned consumer groups. Eventstream transformations, operations, and destinations remain. |
| Delete the eventstream | The eventstream is deleted. Azure cleans up relationship metadata and shortcut-owned consumer groups. |
| Delete the backing event hub | Delivery stops and the shortcut enters **Error**. The eventstream configuration remains. |

For eventstream deletion instructions, see [Delete an eventstream](manage-eventstream.md#delete-an-eventstream).

## Related content

- [Event Hubs shortcut permissions and approval](event-hubs-shortcuts-overview.md#permissions-and-approval)
- [Create a shortcut](create-event-hubs-shortcut.md)
- [Troubleshoot shortcuts](troubleshoot-event-hubs-shortcuts.md)
