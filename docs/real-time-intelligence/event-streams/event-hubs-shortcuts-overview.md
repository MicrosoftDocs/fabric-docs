---
title: Azure Event Hubs shortcuts to eventstreams (preview)
description: Learn how Azure Event Hubs shortcuts use a customer-owned event hub as an eventstream's default stream, including approval, topology, and preview limitations.
ms.topic: concept-article
ms.date: 11/06/2026
ai-usage: ai-generated
---

# Azure Event Hubs shortcuts to eventstreams (preview)

An Azure Event Hubs shortcut connects a customer-owned event hub to a Microsoft Fabric eventstream. The event hub becomes the eventstream's default stream, without copying its data into Eventstreams. You continue to own and manage the event hub in Azure.

Use a shortcut when you want to process and route events from an existing event hub in Fabric while retaining control of the source resource in Azure.

> [!IMPORTANT]
> Azure Event Hubs shortcuts to eventstreams are in preview. Review the [requirements and limitations](#requirements-and-limitations) before you create a shortcut.

## How a shortcut works

You request a shortcut from Real-Time hub or from a new eventstream. If you have permission to request but not approve the shortcut, an authorized Event Hubs administrator approves the relationship. If you have Azure Event Hubs Data Owner or equivalent or broader effective permissions at the target scope, the request is automatically approved when you create it.

After the shortcut is approved and access checks pass, it becomes **Active**. You can use the eventstream to apply transformations and route events to a destination, such as an eventhouse.

:::image type="content" source="./media/event-hubs-shortcuts/shortcut-architecture.svg" alt-text="Screenshot of a diagram showing a customer-owned Azure event hub acting as a Fabric eventstream's default stream through an approved shortcut, with optional transformations and an eventhouse destination.":::

The shortcut avoids a copy into Eventstreams for the default stream. It doesn't mean that events are never transmitted, processed, or stored elsewhere. A destination can ingest and store the events that you route to it.

Creating a shortcut doesn't transfer ownership of the event hub. You continue to manage the Azure resource and its access controls.

## Shortcut or Azure Event Hubs source connector?

The shortcut is a separate experience from the existing [Azure Event Hubs source connector](add-source-azure-event-hubs.md). It doesn't replace that connector.

| Consideration | Event Hubs shortcut | Existing Event Hubs source connector |
|---|---|---|
| Relationship to the default stream | The customer-owned event hub is the default stream. | The connector ingests events from an event hub into the eventstream. |
| Setup | Request a shortcut and have it approved. | Configure the source connection by following the connector instructions. |
| Other sources | You can't add another source while the shortcut exists. | Follow the connector's source-combination rules and eventstream limits. |
| Networking | Supports only event hubs in namespaces with public network access enabled. | Follow the connector's networking requirements; don't apply them to shortcuts. |
| Source ownership | Remains with the Azure resource owner. | Remains with the Azure resource owner. |

A shortcut doesn't increase Eventstream volume limits or guarantee latency equivalent to consuming directly from Event Hubs.

## Resource relationships

Plan the workspace and eventstream before requesting a shortcut:

- One Event Hubs namespace maps to one Fabric workspace.
- Each approved shortcut maps one event hub to one eventstream in that workspace. The same event hub backs that eventstream's default stream.
- Multiple event hubs in the same namespace can connect to different eventstreams in the same mapped workspace.
- An event hub can have multiple unapproved requests, but only one approved shortcut at a time. Approving one request cleans up the other unapproved requests.
- An eventstream can't have another source while its Event Hubs shortcut exists.

For example, event hubs `orders` and `shipments` in the same namespace can connect to two eventstreams in the same workspace. They can't connect through shortcuts to two different workspaces.

## Permissions and approval

Creating an eventstream requires **Contributor** or higher permissions in the Fabric workspace. Azure permissions separately control whether you can read event data, request a shortcut, and approve it.

| Task | Required access |
|---|---|
| Request a shortcut | **Azure Event Hubs Data Receiver** for data-read access, plus the control-plane action `Microsoft.EventHub/namespaces/eventHubs/fabricShortcuts/write`. Data Receiver alone isn't sufficient. |
| Approve a shortcut | The control-plane action `Microsoft.EventHub/namespaces/eventHubs/fabricShortcuts/approve/action`. **Azure Event Hubs Data Owner** is sufficient because it includes this action; no separate grant of the approval action is needed. Permission to request a shortcut doesn't by itself grant permission to approve it. |
| Request a shortcut with automatic approval | **Azure Event Hubs Data Owner**, or equivalent or broader effective permissions that include data-read access and both the request and approval actions. The request is automatically approved when you create it; no separate administrator approval is needed. |

These Azure permissions must apply to the target event hub, either directly or through an inherited assignment, such as at the namespace scope. For the built-in role definitions, see [Azure Event Hubs Data Receiver](/azure/role-based-access-control/built-in-roles/analytics#azure-event-hubs-data-receiver) and [Azure Event Hubs Data Owner](/azure/role-based-access-control/built-in-roles/analytics#azure-event-hubs-data-owner).

Azure Event Hubs Data Owner includes data-read access and both shortcut actions, so it doesn't require a separate Data Receiver assignment or a separate grant of the request action. "Equivalent or broader" refers to effective permissions at the target scope, not a hierarchy of role names. Azure **Reader** is a control-plane role and doesn't grant permission to receive Event Hubs data.

Automatic approval means that no separate administrator approval is needed. You still need **Contributor** or higher permissions in the Fabric workspace to create the eventstream and must meet the other [shortcut prerequisites](create-event-hubs-shortcut.md#prerequisites). Confirm that the shortcut shows **Active** before verifying data flow.

Use least-privilege assignments approved by your Azure administrator. Don't grant a requester broad administrative access just to avoid the approval workflow.

## Shortcut status

| Status | Meaning | Next step |
|---|---|---|
| **Pending** | Shortcut approval isn't complete. | Ask an authorized administrator to review the request. |
| **Active** | The shortcut is approved and access checks passed; it can carry data. | Verify that new events reach the configured destination. |
| **Error** | Required access or connectivity is invalid, or the backing resource is unavailable. | Check the source resource, permissions, and network configuration. |

**Successful** on a request-creation step means that the request was submitted successfully. It isn't proof that the shortcut was approved or that events reached a destination.

## Requirements and limitations

| Area | Preview behavior |
|---|---|
| Namespace tier | Supports Basic, Standard, Premium, and Dedicated. |
| Tenant | The Azure resources and Fabric workspace must be in the same Microsoft Entra tenant. Doesn't support cross-tenant shortcuts. |
| Networking | Supports only event hubs in namespaces with public network access enabled. |
| Disaster recovery | Doesn't support Event Hubs metadata disaster recovery with the shortcut. |
| Schema Registry | Event Hubs Schema Registry metadata doesn't automatically transfer. Schematized payloads arrive as bytes. Plan how to interpret the payload at the destination. |
| Partitions | Eventstream-controlled default-stream partition sizing doesn't apply to the shortcut event hub. |
| Workspace-managed certificates | Workspace-managed certificates don't apply to the customer-owned event hub. |
| Capacity and latency | Existing Eventstream volume limits still apply. Event Hubs-equivalent latency isn't guaranteed. |

Don't enable public access merely to work around an organizational network restriction. If your source must remain private, evaluate a supported alternative instead of using a shortcut.

## Lifecycle

Removing a shortcut removes its relationship metadata and shortcut-owned consumer groups. The eventstream's transformations, operations, and destinations remain, but they no longer receive events through that shortcut.

Deleting the eventstream also cleans up the Azure relationship metadata and shortcut-owned consumer groups. Deleting the backing event hub stops the flow and puts the shortcut in **Error**; it doesn't delete the eventstream configuration.

## Related content

- [Create an Azure Event Hubs shortcut](create-event-hubs-shortcut.md)
- [Approve and manage an Azure Event Hubs shortcut](manage-event-hubs-shortcuts.md)
- [Troubleshoot Azure Event Hubs shortcuts](troubleshoot-event-hubs-shortcuts.md)
