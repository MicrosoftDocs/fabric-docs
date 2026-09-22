---
title: Explore Fabric workspace item events in Fabric Real-Time hub
description: This article shows how to explore Fabric workspace item events in Fabric Real-Time hub.
ms.reviewer: majia
ms.topic: how-to
ms.date: 12/11/2025
---

# Explore Fabric workspace item events in Fabric Real-Time hub

Fabric workspace item events notify you when certain actions occur on your workspace items, such as when you create a new artifact or delete an existing artifact. Use these events to alert on other actions or workflows in Fabric, such as running a pipeline or sending an email notification by using Fabric [!INCLUDE [fabric-activator](../real-time-intelligence/includes/fabric-activator.md)] alerting capabilities. This article explains how to explore Fabric workspace item events in Real-Time hub.

[!INCLUDE [consume-fabric-events-regions](../real-time-intelligence/event-streams/includes/connectors/consume-fabric-events-regions.md)]

[!INCLUDE [deprecated-fabric-workspace-events](../real-time-intelligence/event-streams/includes/connectors/deprecated-fabric-workspace-events.md)]

## View Fabric workspace item events detail page

1. In **Real-Time hub**, select **Fabric events**.
1. Select **Fabric workspace item events** from the list.

    :::image type="content" source="./media/explore-fabric-workspace-item-events/workspace-events.png" alt-text="Screenshot that shows the selection of Fabric workspace item events in the Fabric events page." lightbox="./media/explore-fabric-workspace-item-events/workspace-events.png":::
1. You see the detail view for Fabric workspace item events.

    :::image type="content" source="./media/explore-fabric-workspace-item-events/detail-page.png" alt-text="Screenshot that shows the detail page for Fabric workspace item events." lightbox="./media/explore-fabric-workspace-item-events/detail-page.png":::

## Actions

At the top of the detail page, you see the following two actions.

- **Create eventstream** - create an eventstream based on events from the selected Fabric workspace item.
- **Set alert** - set an alert when an operation is done for a Fabric workspace item, such as a new artifact is created.

    :::image type="content" source="./media/explore-fabric-workspace-item-events/actions.png" alt-text="Screenshot that shows actions on the Fabric workspace item events detail page." lightbox="./media/explore-fabric-workspace-item-events/actions.png":::

## See what's using this category

This section shows the artifacts that use Fabric workspace item events. The following table lists the columns and their descriptions.

| Column | Description |
| ------ | ------------ |
| Name | Name of the artifact that uses Fabric workspace item events. |
| Type | Artifact type – Activator or Eventstream |
| Workspace | Workspace where the artifact resides. |
| Source | Name of the workspace that is the source of the events. |

:::image type="content" source="./media/explore-fabric-workspace-item-events/see-what-is-using.png" alt-text="Screenshot that shows the See what's using this category section on the Fabric workspace item events detail page." lightbox="./media/explore-fabric-workspace-item-events/see-what-is-using.png":::


## Fabric workspace item events profile

:::image type="content" source="./media/explore-fabric-workspace-item-events/profile.png" alt-text="Screenshot that shows the Profile section of the Fabric workspace item events detail page." lightbox="./media/explore-fabric-workspace-item-events/profile.png":::


### Event types

| Event type name | Description |
| --------------- | ----------- |
| Microsoft.Fabric.ItemCreateSucceeded | Fabric raises this event when a create operation on a resource succeeds. For example, an event produced when a new artifact is created successfully. |
| Microsoft.Fabric.ItemCreateFailed | Fabric raises this event when a create operation on a resource fails. For example, an event produced when a new artifact fails during creation. |
| Microsoft.Fabric.ItemUpdateSucceeded | Fabric raises this event when an update operation on a resource succeeds. For example, an event produced when a dataflow is updated successfully. |
| Microsoft.Fabric.ItemUpdateFailed | Fabric raises this event when an update operation on a resource fails. For example, an event produced when a dataflow fails during the update. |
| Microsoft.Fabric.ItemDeleteSucceeded | Fabric raises this event when a delete operation on a resource succeeds. For example, an event produced when a dataflow is deleted successfully. |
| Microsoft.Fabric.ItemDeleteFailed | Fabric raises this event when a delete operation on a resource fails. For example, an event produced when a dataflow fails during deletion. |
| Microsoft.Fabric.ItemSoftDeleteSucceeded | Fabric raises this event when a soft delete operation on a resource succeeds. For example, an event produced when a dataflow is soft deleted successfully. |
| Microsoft.Fabric.ItemSoftDeleteFailed | Fabric raises this event when a soft delete operation on a resource fails. For example, an event produced when a dataflow soft delete fails. |
| Microsoft.Fabric.ItemRecoverSucceeded | Fabric raises this event when a recover operation on a resource succeeds. For example, an event produced when a dataflow is recovered successfully. |
| Microsoft.Fabric.ItemRecoverFailed | Fabric raises this event when a recover operation on a resource fails. For example, an event produced when a dataflow recovery fails. |

### Schemas
An event has the following top-level data:

| Property | Type | Description | Example |
| -------- | ---- | ----------- | ----- |
| `source` | string | Identifies the context in which an event happened.  | `00000000-0000-0000-0000-000000000000` |
| `subject` | string | Identifies the subject of the event in the context of the event producer. |  `/workspaces/00000000-0000-0000-0000-000000000000/items/00000000-0000-0000-0000-000000000000` |
| `type` | string | Contains a value describing the type of event related to the originating occurrence. | `Microsoft.Fabric.ItemCreateSucceeded` |
| `time` | timestamp | Timestamp of when the occurrence happened. | `2024-04-23T21:17:32.6029537+00:00` |
| `id` | string | Unique identifier for the event. | `00000000-0000-0000-0000-000000000000` |
| `specversion` | string | The version of the Cloud Event spec. | `1.0` |
| `dataschemaversion` | String | The version of the data schema. | `1.0` |
| `datacontenttype` | string | Content type of data value. | `application/json` |

The `data` object has the following properties: 

| Property | Type | Description | Example |
| -------- | ---- | ----------- | ------- |
| `itemId` | guid | Unique identifier for the item/artifact. | `00000000-0000-0000-0000-000000000000` |
| `itemKind` | string | The kind of item/artifact. | Item type such as `Notebook, Lakehouse, etc.` See the next section for a list of item types that workspace item events don't support. |
| `itemName` | string | The item/artifact name. | `Test Notebook` |
| `workspaceId` | guid | Unique identifier for the workspace. | `00000000-0000-0000-0000-000000000000` |
| `workspaceName` | string | The name of the workspace. | `Test Workspace` |
| `executingPrincipalId` | guid | Unique identifier for the user. | `00000000-0000-0000-0000-000000000000` |
| `executingPrincipalType` | string | The kind of user. | `User` |

[!INCLUDE [unsupported-itemtypes-in-workspaceevents](../real-time-intelligence/event-streams/includes/connectors/unsupported-itemtypes-in-workspaceevents.md)]

## Subscribe permission
For more information, see [subscribe permission for Fabric events](fabric-events-subscribe-permission.md).

## Related content

- [Explore Azure blob storage events](explore-azure-blob-storage-events.md)
