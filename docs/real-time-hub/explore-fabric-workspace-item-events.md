---
title: Explore Fabric workspace item events in Fabric Real-Time hub
description: This article shows how to explore Fabric workspace item events in Fabric Real-Time hub.
author: mystina
ms.author: majia
ms.topic: how-to
ms.custom:
ms.date: 07/22/2025
---

# Explore Fabric workspace item events in Fabric Real-Time hub

Fabric workspace item events allow you to receive notification when certain actions occur on your workspace items. For instance, when a new artifact is created or an existing artifact is deleted. These events can be used to alert on other actions or workflows in Fabric, such as running a pipeline or sending an email notification using Fabric [!INCLUDE [fabric-activator](../real-time-intelligence/includes/fabric-activator.md)] alerting capabilities. This article explains how to explore Fabric workspace item events in Real-Time hub.

[!INCLUDE [consume-fabric-events-regions](./includes/consume-fabric-events-regions.md)]

[!INCLUDE [deprecated-fabric-workspace-events](./includes/deprecated-fabric-workspace-events.md)]

## View Fabric workspace item events detail page

1. In **Real-Time hub**, select **Fabric events**.
1. Select **Fabric workspace item events** from the list.

    :::image type="content" source="./media/explore-fabric-workspace-item-events/select-from-list.png" alt-text="Screenshot that shows the selection of Fabric workspace item events in the Fabric events page.":::
1. You should see the detail view for Fabric workspace item events.

    :::image type="content" source="./media/explore-fabric-workspace-item-events/detail-page.png" alt-text="Screenshot that shows the detail page for Fabric workspace item events." lightbox="./media/explore-fabric-workspace-item-events/detail-page.png":::

## Actions

At the top of the detail page, you see the following two actions.

- **Create eventstream** - lets you create an eventstream based on events from the selected Fabric workspace item.
- **Set alert** - lets you set an alert when an operation is done for a Fabric workspace item, such as a new artifact is created.

    :::image type="content" source="./media/explore-fabric-workspace-item-events/actions.png" alt-text="Screenshot that shows actions on the Fabric workspace item events detail page.":::

## See what's using this category

This section shows the artifacts using Fabric workspace item events. Here are the columns and their descriptions shown in the list.

| Column | Description |
| ------ | ------------ |
| Name | Name of the artifact that's using Fabric workspace item events. |
| Type | Artifact type – Activator or Eventstream |
| Workspace | Workspace where the artifact lives. |
| Source | Name of the workspace that is source of the events. |

:::image type="content" source="./media/explore-fabric-workspace-item-events/see-what-is-using.png" alt-text="Screenshot that shows the See what's using this category section on the Fabric workspace item events detail page.":::


## Fabric workspace item events profile

:::image type="content" source="./media/explore-fabric-workspace-item-events/profile.png" alt-text="Screenshot that shows the Profile section of the Fabric workspace item events detail page.":::


### Event types

| Event type name | Description |
| --------------- | ----------- |
| Microsoft.Fabric.ItemCreateSucceeded | This event is activated when a create operation on resource succeeds. For example, an event produced when a new artifact is created successfully. |
| Microsoft.Fabric.ItemCreateFailed | This event is activated when a create operation on resource fails. For example, an event produced when a new artifact failed during creation. |
| Microsoft.Fabric.ItemUpdateSucceeded | This event is activated when an update operation on resource succeeds. For example, an event produced when a dataflow is updated successfully. |
| Microsoft.Fabric.ItemUpdateFailed | This event is activated when an update operation on resource fails. For example, an event produced when a dataflow failed during the update. |
| Microsoft.Fabric.ItemDeleteSucceeded | This event is activated when a delete operation on resource succeeds. For example, an event produced when a dataflow is deleted successfully. |
| Microsoft.Fabric.ItemDeleteFailed | This event is activated when a delete operation on resource fails. For example, an event produced when a dataflow failed during deletion. |


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
| `capacityId` | string | Unique identifier for the capacity. | `00000000-0000-0000-0000-000000000000` |
| `domainId` | string | Unique identifier for the domain. | `00000000-0000-0000-0000-000000000000` |

The `data` object has the following properties: 

| Property | Type | Description | Example |
| -------- | ---- | ----------- | ------- |
| `itemId` | guid | Unique identifier for the item/artifact. | `00000000-0000-0000-0000-000000000000` |
| `itemKind` | string | The kind of item/artifact. | Item type such as `Notebook, Lakehouse, etc.` See the next section for a list of item types not supported by workspace item events |
| `itemName` | string | The item/artifact name. | `Test Notebook` |
| `workspaceId` | guid | Unique identifier for the workspace. | `00000000-0000-0000-0000-000000000000` |
| `workspaceName` | string | The name of the workspace. | `Test Workspace` |
| `principalId` | guid | Unique identifier for the user. | `00000000-0000-0000-0000-000000000000` |
| `executingPrincipalType` | string | The kind of user. | `User` |

[!INCLUDE [unsupported-itemtypes-in-workspaceevents](./includes/unsupported-itemtypes-in-workspaceevents.md)]

## Subscribe permission
For more information, see [subscribe permission for Fabric events](fabric-events-subscribe-permission.md).

## Related content

- [Explore Azure blob storage events](explore-azure-blob-storage-events.md)
