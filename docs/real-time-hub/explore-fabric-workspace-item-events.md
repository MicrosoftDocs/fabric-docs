---
title: Explore Fabric workspace item events in Fabric Real-Time hub
description: This article shows how to explore Fabric workspace item events in Fabric Real-Time hub. 
author: ajetasin
ms.author: ajetasi
ms.topic: how-to
ms.date: 05/21/2024
---

# Explore Fabric workspace item events in Fabric Real-Time hub
Real-Time hub expands Fabric with event-driven capabilities to support real-time data processing and analysis. This feature enables event-driven scenarios for various system events, including Fabric workspace item events and Azure blob storage events. By using System events in Fabric, you can gain access to real-time data streams that enable them to monitor and react to changes and events as they occur. 

Fabric workspace item events allow you to receive notification when certain actions occur on your workspace items, such as when a new artifact is created, or an existing artifact is deleted. These events can be used to alert on other actions or workflows in Fabric, such as running a data pipeline or sending an email notification using Data Activator alerting capabilities. This article explains how to explore Fabric workspace item events in Real-Time hub.

## View Azure blob storage events detail page

1. In **Real-Time hub**, switch to the **Fabric events** tab. 
1. Select **Fabric workspace item events** in the list. You should see the detail view for Fabric workspace item events. 

## Actions
At the top of the detail page, you see the following two actions.

- **Create eventstream** - lets you create an eventstream based on events from the selected Fabric workspace item. 
- **Set alert** - lets you set an alert when an operation is done for a Fabric workspace item, such as a new artifact is created.

## See what's using this category

This section shows subscriptions using the event category. Here are the columns and their descriptions shown in the list. 

| Column | Description |
| ------ | ------------ | 
| Name | Name of the artifact/subscriber that subscribes to the event type group. |
| Type | Artifact type – Reflex or eventstream |
| Workspace | Workspace where the artifact lives. |
| Source | Name of the source (Azure blob storage account) that the user subscribed to. |

## Fabric workspace item events profile

### Event types

| Event type name | Description |
| --------------- | ----------- |
| Microsoft.Fabric.ItemCreateSucceeded | This event is activated when a create operation on resource succeeds. For example, an event produced when a new artifact is created successfully. |
| Microsoft.Fabric.ItemCreateFailed | This event is activated when a create operation on resource fails. For example, an event produced when a new artifact failed during creation. |
| Microsoft.Fabric.ItemUpdateSucceeded | This event is activated when an update operation on resource succeeds. For example, an event produced when a dataflow is updated successfully. |
| Microsoft.Fabric.ItemUpdateFailed | This event is activated when an update operation on resource fails. For example, an event produced when a dataflow failed during the update. |
| Microsoft.Fabric.ItemDeleteSucceeded | This event is activated when a delete operation on resource succeeds. For example, an event produced when a dataflow is deleted successfully. |
| Microsoft.Fabric.ItemDeleteFailed | This event is activated when a delete operation on resource fails. For example, an event produced when a dataflow failed during deletion. |
| Microsoft.Fabric.ItemReadSucceeded | This event is activated when a read operation on resource succeeds. For example, an event produced when an artifact is read successfully. |
| Microsoft.Fabric.ItemReadFailed | This event is activated when a read operation on resource fails. For example, an event produced when an artifact failed during the read. |

### Schemas
An event has the following top-level data:

| Property | Type | Description |
| -------- | ---- | ----------- |
| `source` | string | Identifies the context in which an event happened.  |
| `subject` | string | Identifies the subject of the event in the context of the event producer. |
| `type` | string | Contains a value describing the type of event related to the originating occurrence. |
| `time` | timestamp | Timestamp of when the occurrence happened. |
| `id` | string | Unique identifier for the event. |
| `specversion` | string | The version of the Cloud Event spec. |
| `dataschemaversion` | String | The version of the data schema. |
| `capacityId` | string | Unique identifier for the capacity. |
| `domainId` | string | Unique identifier for the domain. |

The `data` object has the following properties: 

| Property | Type | Description |
| -------- | ---- | ----------- |
| `itemId` | guid | Unique identifier for the item/artifact. |
| `itemKind` | string | The kind of item/artifact. |
| `itemName` | string | The item/artifact name. |
| `workspaceId` | guid | Unique identifier for the workspace. |
| `workspaceName` | string | The name of the workspace. |
| `principalId` | guid | Unique identifier for the user. |
| `executingPrincipalType` | string | The kind of user. |


## Related articles

- [Explore Azure blob storage events](explore-azure-blob-storage-events.md)


