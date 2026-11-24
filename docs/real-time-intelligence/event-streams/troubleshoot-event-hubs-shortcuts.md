---
title: Troubleshoot Event Hubs shortcuts (preview)
description: Resolve common discovery, permission, approval, data-flow, and cleanup issues with Azure Event Hubs shortcuts to Microsoft Fabric eventstreams.
ms.topic: troubleshooting
ms.date: 11/06/2026
ai-usage: ai-generated
---

# Troubleshoot Azure Event Hubs shortcuts (preview)

Use this article when you can't create, approve, or use an Azure Event Hubs shortcut in Microsoft Fabric. Start with the shortcut status and identify whether the problem affects the request, approval, source access, or destination.

## Check the configuration first

Confirm that:

- The namespace uses Basic, Standard, Premium, or Dedicated tier.
- The Azure resources and Fabric workspace are in the same tenant.
- The shortcut preview is available in the selected environment and region.
- Public network access is enabled on the Event Hubs namespace. Only event hubs with public network access enabled are supported.
- The namespace isn't already mapped to a different Fabric workspace.
- The event hub doesn't already have a different approved shortcut.

See the complete [requirements and limitations](event-hubs-shortcuts-overview.md#requirements-and-limitations).

## The shortcut option or event hub isn't visible

1. Confirm that you're signed in to the correct tenant and subscription.
1. In Real-Time hub, use **Add data** > **Create a shortcut to an Event hub**, rather than the Azure Event Hubs source connector.
1. Confirm preview availability and your permissions with the Fabric and Azure administrators.
1. Check the namespace tier, tenant, and topology restrictions.
1. If roles were recently assigned, allow for Azure RBAC propagation and refresh the experience. Record when the change was made if the issue persists.

## Creation fails with a permission error

Requesting a shortcut requires data-read access through **Azure Event Hubs Data Receiver**, plus `Microsoft.EventHub/namespaces/eventHubs/fabricShortcuts/write`. Azure Reader alone or Data Receiver alone isn't sufficient. **Azure Event Hubs Data Owner** includes data-read access and the request action, so it doesn't require a separate Data Receiver assignment.

Capture the denied action, resource scope, and full error text. Ask the Azure administrator to verify effective permissions, including inherited assignments, at that scope. Also verify **Contributor** or higher access in the target Fabric workspace.

Approval separately requires `Microsoft.EventHub/namespaces/eventHubs/fabricShortcuts/approve/action`. **Azure Event Hubs Data Owner** includes this action and is sufficient to approve a shortcut without a separate grant of the approval action. If the requester has the request permissions but lacks this action, the request requires administrator approval. Don't resolve this problem by granting broad administrative roles unless your administrator determines they're appropriate.

## The request is successful but still pending

**Successful** describes submission of the request. **Pending** means shortcut approval hasn't completed.

1. Ask an administrator with **Azure Event Hubs Data Owner**, or another role that grants `Microsoft.EventHub/namespaces/eventHubs/fabricShortcuts/approve/action` at the target scope, to open the event hub's **Shortcut to Fabric (preview)** > **Event Hub shortcuts** tab.
1. Match the request to the intended workspace and eventstream.
1. Review and approve the intended [shortcut request](manage-event-hubs-shortcuts.md#approve-a-pending-request).
1. After approval, refresh Azure and Fabric and record the observed states.

If Azure shows **Active** but Fabric still shows **Pending**, record both states and the UTC timestamps. Don't create a duplicate request as a refresh mechanism.

If you expected automatic approval, verify that the identity that created the request had **Azure Event Hubs Data Owner**, or equivalent or broader effective permissions that include data-read access and both shortcut actions, at the target scope when it created the request. Check the assignment scope and whether a recent role assignment had propagated. Data Receiver plus the request action alone doesn't trigger automatic approval. See [Permissions and approval](event-hubs-shortcuts-overview.md#permissions-and-approval).

## A second shortcut or a different workspace is blocked

Only one approved shortcut is allowed per event hub, and one namespace maps to one workspace. Multiple event hubs in that namespace can use separate eventstreams in the same mapped workspace.

Use the existing mapped workspace where appropriate. If you need to change the relationship, coordinate with its owner before removing it. Don't approve a competing request or remove a working relationship solely to test whether it clears the error.

## The shortcut is active but no events arrive

Check each stage independently:

| Stage | What to check |
|---|---|
| Producer and event hub | Confirm successful sends to the correct event hub. Check recent incoming events and bytes in Azure Monitor. |
| Default stream | Select the default stream and refresh Data preview. Use fresh, uniquely identified test events, not only older retained data. |
| Processing | Check whether a filter, transformation, schema interpretation, or error prevents events from reaching the destination. |
| Destination | Confirm that the destination is connected, configured, and published. Check the destination's ingestion errors and query the intended database and table. |

Use the [end-to-end verification procedure](create-event-hubs-shortcut.md#add-a-destination-and-verify-data) to compare event IDs at the destination. A preview is a sample, not an authoritative delivery count. Event Hubs namespace-level outgoing traffic can include other consumers and doesn't prove that this shortcut delivered events.

Event Hubs Schema Registry metadata doesn't automatically transfer. If payloads arrive as bytes, verify the expected format and the destination's parsing configuration rather than assuming automatic schema import.

For Azure metrics, see [Monitoring data reference for Event Hubs](/azure/event-hubs/monitor-event-hubs-reference).

## The shortcut changes to Error or stops delivering

1. Verify that the backing event hub and namespace still exist.
1. Check whether required permissions changed or were revoked.
1. Check whether public network access was disabled on the Event Hubs namespace.
1. Have the authorized resource owner restore the intended, supported configuration if organizational policy permits it.
1. Refresh the shortcut and send a new set of uniquely identified test events. Verify the destination, not only the status.

Don't enable public access against policy, delete a working event hub, or weaken access controls to restore a shortcut. If the intended configuration must remain private, evaluate a supported alternative.

## Removal or deletion leaves a stale relationship

Capture the operation result, request ID, and the state shown in both Azure and Fabric. Confirm which resource you removed: the shortcut, eventstream, or event hub. These actions have different [lifecycle effects](manage-event-hubs-shortcuts.md#understand-resource-deletion).

Don't manually delete consumer groups or repeatedly recreate the relationship. Contact support if cleanup doesn't complete or the result isn't actionable.

## Collect information for support

Include:

- UTC time and timezone of the failure, plus the last known successful operation.
- Entry point: Real-Time hub or new eventstream.
- Namespace tier and region; affected Azure resource ID, Fabric workspace ID, and eventstream ID.
- Request and shortcut approval states in both Azure and Fabric.
- Full error text and request or correlation ID.
- The action performed and whether new events reached the destination.
- Recent role, network, source, or destination changes.
- Redacted screenshots and a minimal reproduction using synthetic events.

Share these details only through your organization's approved support channel. Don't include access tokens, connection strings, keys, or customer event payloads.

## Related content

- [Understand Event Hubs shortcuts](event-hubs-shortcuts-overview.md)
- [Create a shortcut](create-event-hubs-shortcut.md)
- [Approve and manage shortcuts](manage-event-hubs-shortcuts.md)
