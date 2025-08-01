---
title: Explore OneLake events in Fabric Real-Time hub
description: This article shows how to explore OneLake events in Fabric Real-Time hub.
author: robece
ms.author: robece
ms.topic: how-to
ms.date: 07/22/2025
---

# Explore OneLake events in Fabric Real-Time hub

OneLake events inform you about changes in your data lake, such as the creation, modification, or deletion of files and folders.

Real-Time Hub enables you to discover and subscribe to these changes within OneLake, allowing you to react instantly. For instance, you can monitor changes in Lakehouse files and folders and utilize Activator's alerting capabilities to set up alerts based on specific conditions and define actions to take when those conditions are met. This article guides you on how to explore OneLake events using the Real-Time Hub

[!INCLUDE [consume-fabric-events-regions](./includes/consume-fabric-events-regions.md)]

## View OneLake events detail page

1. In **Real-Time hub**, select **Fabric events**.
1. Select **OneLake events** from the list.

    :::image type="content" source="./media/explore-fabric-onelake-events/select-from-list.png" alt-text="Screenshot that shows the selection of OneLake events on the Fabric events page." lightbox="./media/explore-fabric-onelake-events/select-from-list.png":::
1. You should see the detail view for OneLake events.

    :::image type="content" source="./media/explore-fabric-onelake-events/detail-page.png" alt-text="Screenshot that shows the detail page for OneLake events." lightbox="./media/explore-fabric-onelake-events/detail-page.png":::

## Actions

At the top of the detail page, you see the following two actions.

- **Create eventstream**, which lets you create an eventstream based on events from the selected OneLake item.
- **Set alert**, which lets you set an alert when an operation is done for a OneLake item, such as a new file is created.

    :::image type="content" source="./media/explore-fabric-onelake-events/actions.png" alt-text="Screenshot that shows actions on the OneLake events detail page.":::

    These actions are also available in the Fabric events list view.

## See what's using this category

This section shows the artifacts using OneLake events. Here are the columns and their descriptions:

| Column | Description |
| ------ | ------------ |
| Name | Name of the artifact that's using OneLake events. |
| Type | Artifact type – Activator or Eventstream |
| Workspace | Workspace where the artifact lives. |
| Source | Name of the workspace that is source of the events. |

## OneLake events profile

:::image type="content" source="./media/explore-fabric-onelake-events/profile.png" alt-text="Screenshot that shows the Profile section of the OneLake events detail page.":::

### Event types
Here are the supported OneLake events:

| Event type name | Description |
| --------------- | ----------- |
| Microsoft.Fabric.OneLake.FileCreated | Raised when a file is created or replaced in OneLake. |
| Microsoft. Fabric.OneLake.FileDeleted | Raised when a file is deleted in OneLake. |
| Microsoft. Fabric.OneLake.FileRenamed | Raised when a file is renamed in OneLake. | 
| Microsoft.Fabric.OneLake.FolderCreated | Raised created when a folder is created in OneLake. | 
| Microsoft. Fabric.OneLake.FolderDeleted | Raised when a folder is deleted in OneLake. | 
| Microsoft. Fabric.OneLake.FolderRenamed | Raised when a folder is renamed in OneLake. | 

### Schemas
An event has the following top-level data:


| Property | Type | Description | Example |
| -------- | ---- | ----------- | ----- |
| `source` | string | Identifies the context in which an event happened.  | `/aaaaaaaa-0000-1111-2222-bbbbbbbbbbbb/workspaces/bbbbbbbb-1111-2222-3333-cccccccccccc/items/cccccccc-2222-3333-4444-dddddddddddd` |
| `subject` | string | Identifies the subject of the event in the context of the event producer. |  `/Files/FolderA/FileName.txt` |
| `type` | string | One of the registered event types for this event source. | `Microsoft.Fabric.OneLake.FileCreated` |
| `time` | timestamp | The time the event is generated based on the provider's UTC time. | `2017-06-26T18:41:00.9584103Z` |
| `id` | string | Unique identifier for the event. | `bbbbbbbb-1111-2222-3333-cccccccccccc` |
| `data` | object | Event data. | See the next table for details. |
| `dataschemaversion` | string | The version of the data schema. | 1.0 | 
| `specversion` | string | The version of the Cloud Event spec. | 1.0 |


The `data` object has the following properties: 

| Property | Type | Description | Example |
| -------- | ---- | ----------- | ------- |
| `eTag` | string | The value that you can use to run operations conditionally. | `"\"0x8D4BCC2E4835CD0\"` |
| `contentLength` | string | Size of the file in bytes. | 0 |
| `contentType` | string | Content type specified for the file. | `text/plain` |
| `blobUrl` | string | Blob URL to the path of the file. | `https://onelake.blob.fabric.microsoft.com/55556666-ffff-7777-aaaa-8888bbbb9999 < 66667777-aaaa-8888-bbbb-9999cccc0000/Files/FolderA/File1.txt` |
| `url` | string | OneLake URL to the path of the file. | `https://onelake.dfs.fabric.microsoft.com/eeeeeeee-4444-5555-6666-ffffffffffff < aaaaaaaa-6666-7777-8888-bbbbbbbbbbbb/Files/FolderA/File1.txt` |
| `api` | string | The operation that triggered the event. | `CreateFile` |
| `clientRequestId` | string | A client-provided request ID for the storage API operation. | `aaaabbbb-0000-cccc-1111-dddd2222eeee` |
| `requestId` | string | Service-generated request ID for the storage API operation. | `aaaabbbb-0000-cccc-1111-dddd2222eeee` |
| `contentOffset` | number | The offset in bytes of a write operation taken at the point where the event-triggering application completed writing to the file. | 0 |
| `sequencer` | string | An opaque string value representing the logical sequence of events. | `00000000000004420000000000028963` |

## Subscribe permission
For more information, see [subscribe permission for Fabric events](fabric-events-subscribe-permission.md).

## Related content

- [Explore Azure blob storage events](explore-azure-blob-storage-events.md)
