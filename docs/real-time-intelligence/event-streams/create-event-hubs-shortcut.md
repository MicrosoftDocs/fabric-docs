---
title: Create an Azure Event Hubs shortcut (preview)
description: Create an Azure Event Hubs shortcut from Real-Time hub or a new eventstream, complete approval, and verify that events reach an eventhouse.
ms.topic: how-to
ms.date: 11/06/2026
ai-usage: ai-generated
---

# Create an Azure Event Hubs shortcut (preview)

This article shows you how to use an Azure event hub as the default stream of a Microsoft Fabric eventstream. You can start from Real-Time hub or from a new eventstream.

> [!IMPORTANT]
> This feature is in preview. Before you start, review [Event Hubs shortcut requirements and limitations](event-hubs-shortcuts-overview.md#requirements-and-limitations).

## Prerequisites

- Access to a Fabric capacity or trial workspace with **Contributor** or higher permissions.
- Availability of the shortcut preview in your Azure region and Fabric environment.
- An Azure Event Hubs namespace in the **Basic**, **Standard**, **Premium**, or **Dedicated** tier, and an event hub in that namespace.
- Azure resources and a Fabric workspace in the same Microsoft Entra tenant.
- Public network access enabled on the Event Hubs namespace, in accordance with your organization's network policy.
- **Azure Event Hubs Data Receiver** for data-read access, plus the control-plane action `Microsoft.EventHub/namespaces/eventHubs/fabricShortcuts/write` at the target event hub or namespace scope. **Azure Event Hubs Data Owner** includes both permissions, so a separate Data Receiver assignment isn't required.
- An approver with `Microsoft.EventHub/namespaces/eventHubs/fabricShortcuts/approve/action` at the target scope if you don't have that permission yourself. With **Azure Event Hubs Data Owner**, or equivalent or broader effective permissions that include data-read access and both shortcut actions, your request is automatically approved. See [Permissions and approval](event-hubs-shortcuts-overview.md#permissions-and-approval).
- An event producer and non-sensitive test events for validation.
- For the optional eventhouse verification, an eventhouse and permission to configure its destination and query its KQL database.

Choose the destination workspace before you start. All event hub shortcuts from a namespace must map to the same workspace, and an event hub can have only one approved shortcut.

> [!NOTE]
> The following screenshots show the preview experience with fictional Contoso resource names and example identifiers substituted for the original values. Use your own resources. The screenshots illustrate individual steps, not a single verified end-to-end run.

## Open the shortcut wizard

Choose either entry point; you don't need to complete both. Each path opens the same shortcut wizard, followed by the shared configuration, approval, and validation steps in the following sections.

| Start from Real-Time hub | Start from a new eventstream |
|---|---|
| Discover the shortcut scenario in **Add data**, then specify the target workspace and eventstream in the wizard. | Create an eventstream in your chosen workspace, then add the shortcut from its canvas. |
| **Real-Time hub** > **Add data** > **Create a shortcut to an Event hub** | **Workspace** > **New item** > **Eventstream** > **Create a shortcut to an Event hub** |

Select a tab for the steps and screenshot for your preferred path.

# [Real-Time hub](#tab/real-time-hub)

1. Sign in to [Microsoft Fabric](https://app.fabric.microsoft.com).
1. Open **Real-Time hub** and select **Add data**.
1. Under **Popular scenarios**, select **Create a shortcut to an Event hub**. Don't select the separate **Azure Event Hubs** connector tile.

   :::image type="content" source="./media/event-hubs-shortcuts/real-time-hub-entry.png" alt-text="Screenshot of Real-Time hub showing Add data and the Create a shortcut to an Event hub Scenario.":::

1. Continue to [Select the event hub](#select-the-event-hub).

# [New eventstream](#tab/new-eventstream)

1. Sign in to [Microsoft Fabric](https://app.fabric.microsoft.com) and open the workspace where you want the eventstream.
1. Select **New item**, and then select **Eventstream**.
1. Enter a unique eventstream name, such as `contoso-orders-stream`, and select **Create**.
1. On the new canvas, under **Scenarios**, select **Create a shortcut to an Event hub**.

   :::image type="content" source="./media/event-hubs-shortcuts/new-eventstream-entry.png" alt-text="Screenshot of a new eventstream showing the Create a shortcut to an Event hub scenario next to the source options." lightbox="./media/event-hubs-shortcuts/new-eventstream-entry.png":::

1. Continue to [Select the event hub](#select-the-event-hub).

---

## Select the event hub

1. On **Configure connection settings**, select the **Subscription** and **Event Hub namespace**. The example uses **Contoso Production** and `contoso-events`.

   :::image type="content" source="./media/event-hubs-shortcuts/select-event-hub.png" alt-text="Screenshot of the example Contoso Production subscription and contoso-events namespace selections.":::

1. Select the **Event Hub**, such as `contoso-orders`.
1. Review the permission message:
   - If you have Data Receiver and the shortcut request action but not the approval action, continue and ask an administrator with the approval action to approve the request.
   - If you have Azure Event Hubs Data Owner or equivalent or broader effective permissions at the target scope, the request is automatically approved.

1. Review **Stream details**. When starting from Real-Time hub, confirm the target **Workspace**, **Eventstream name**, and **Stream name**. When starting from a new eventstream, confirm that the displayed eventstream is the one you created.
1. Select **Create**.

## Complete the request

1. On **Review + create shortcut**, verify that **Request shortcut** is **Successful**.
1. Check whether approval is still required:
   - **Pending approval**: The request exists, but the shortcut isn't ready to carry data. Select **Open Event Hub instance** to open the Azure resource, then follow [Approve and activate the shortcut](#approve-and-activate-the-shortcut).
   - No pending approval: Continue and check the shortcut's status on the canvas. A successful request alone doesn't establish that the shortcut is active.

   :::image type="content" source="./media/event-hubs-shortcuts/request-pending.png" alt-text="Screenshot of a successful shortcut request with Pending approval and an Open Event Hub instance button." lightbox="./media/event-hubs-shortcuts/request-pending.png":::

1. Select **Finish**.

## Approve and activate the shortcut

Creating the request in Fabric and approving access in Azure are separate actions:

- **Request:** Data-read access through Azure Event Hubs Data Receiver, plus `Microsoft.EventHub/namespaces/eventHubs/fabricShortcuts/write`.
- **Approve:** `Microsoft.EventHub/namespaces/eventHubs/fabricShortcuts/approve/action`. **Azure Event Hubs Data Owner** is sufficient because it includes this action; no separate grant of the approval action is needed.
- **Automatic approval:** If you create the request with Azure Event Hubs Data Owner, or equivalent or broader effective permissions that include data-read access and both actions, the request is automatically approved. Otherwise, an authorized approver must approve it.

The shortcut must be approved and access checks must pass before it becomes **Active**. Automatic approval doesn't prove that events reached a destination.

| Request outcome | Next action |
|---|---|
| **Pending approval** | Have the authorized Azure administrator complete the approval steps in the following section. Share the event hub resource details and the Fabric workspace and eventstream IDs so the administrator can identify your request. |
| Automatically approved | Check the relationship in Azure and refresh Fabric to confirm **Active** status. Don't treat **Request shortcut: Successful** as proof of activation. |

To approve a pending request:

1. In the [Azure portal](https://portal.azure.com), open the target Event Hubs namespace and event hub. The **Open Event Hub instance** link on the request page opens this resource.
1. Select **Shortcut to Fabric (preview)** > **Event Hub shortcuts**.
1. Find the intended pending request and verify its event hub, Fabric workspace, eventstream, requester, and request time. If the portal shows IDs, compare them with the details from the requester.

   :::image type="content" source="./media/event-hubs-shortcuts/azure-pending-request.png" alt-text="Screenshot of the example contoso-orders pending request in Azure, with sample Fabric IDs and row-specific Approve and Reject actions." lightbox="./media/event-hubs-shortcuts/azure-pending-request.png":::

1. Select the row-specific **Approve** action and review any confirmation. For permission requirements and the detailed administrator procedure, see [Approve a pending request](manage-event-hubs-shortcuts.md#approve-a-pending-request).
1. Refresh Azure and confirm that the intended relationship is approved and **Active**.
1. Return to the Fabric eventstream and refresh it. Confirm that the shortcut and default stream show **Active**.

   :::image type="content" source="./media/event-hubs-shortcuts/active-canvas.png" alt-text="Screenshot of the example contoso-orders shortcut connected to the contoso-orders-stream default stream with Active status.":::

Only one shortcut can be approved for an event hub. Approving one request cleans up other unapproved requests for that event hub, so coordinate with other requesters before approving.

If approval remains pending or Azure and Fabric disagree, follow [Troubleshoot shortcuts](troubleshoot-event-hubs-shortcuts.md). If the administrator rejects the request, resolve the reason before removing or replacing it; see [Reject a pending request](manage-event-hubs-shortcuts.md#reject-a-pending-request).

## Add a destination and verify data

An **Active** status confirms that the shortcut can carry data. Validate the complete path to a destination before relying on the flow.

1. In the eventstream, switch to **Edit** mode.
1. Add an **Eventhouse** destination connected to the default stream. Follow [Add an eventhouse destination](add-destination-kql-database.md) to configure the ingestion mode, target database, table, and data mapping, and publish the changes.
1. For this test, use a JSON-compatible path without filtering or aggregation. Map `runId` and `eventId` to string columns in a table named `ShortcutEvents`. If you choose different names, update the query below.
1. Use a new run identifier for each test. With your existing Event Hubs producer, send each object in the following array as a **separate event** to the source event hub. Don't send the array as a single event.

   ```json
   [
     {"runId": "shortcut-check-001", "eventId": "001"},
     {"runId": "shortcut-check-001", "eventId": "002"},
     {"runId": "shortcut-check-001", "eventId": "003"}
   ]
   ```

1. Select the default stream on the canvas and refresh **Data preview** to check for the new events.
1. In the destination KQL database, run the following query. Replace the run identifier if you changed it.

   ```kusto
   let expected = datatable(eventId:string) ["001", "002", "003"];
   let actual =
       ShortcutEvents
       | where runId == "shortcut-check-001"
       | summarize occurrences = count() by eventId;
   expected
   | join kind=fullouter actual on eventId
   | extend isExpected = isnotempty(eventId)
   | project
       eventId = coalesce(eventId, eventId1),
       expected = isExpected,
       occurrences = coalesce(occurrences, 0)
   | order by eventId asc
   ```

   For this three-event test, expect three rows with `expected` set to `true` and `occurrences` equal to `1`. A zero identifies an event not yet observed; a value greater than one identifies duplicate observations. A row with `expected` set to `false` identifies an unexpected event ID for that run. This test checks observed results; it isn't an exactly-once delivery guarantee.

1. Compare payloads as well as counts. Stop and restart the test producer, use a new run identifier, and confirm that new events reach the destination.

If data doesn't appear, follow [Troubleshoot Azure Event Hubs shortcuts](troubleshoot-event-hubs-shortcuts.md). Don't treat a data preview sample as a complete event count.

## Clean up

If you created resources only for this exercise, stop the test producer. [Remove the shortcut](manage-event-hubs-shortcuts.md#remove-a-shortcut) when it is no longer needed. Delete an eventstream or Azure resource only if you created it for the exercise and no other workload depends on it.

Removing the shortcut doesn't remove events already ingested by a destination. Manage destination data according to its retention policy.

## Related content

- [Understand Event Hubs shortcuts](event-hubs-shortcuts-overview.md)
- [Approve and manage shortcuts](manage-event-hubs-shortcuts.md)
- [Troubleshoot shortcuts](troubleshoot-event-hubs-shortcuts.md)
