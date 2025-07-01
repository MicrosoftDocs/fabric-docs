---
title: Add Fabric workspace item event source to an eventstream
description: Learn how to add Fabric workspace item event source to an eventstream. This feature is currently in preview.
ms.reviewer: spelluru
ms.author: zhenxilin
author: alexlzx
ms.topic: how-to
ms.custom:
ms.date: 03/18/2025
ms.search.form: Source and Destination
---

# Add Fabric workspace item events to an eventstream 

This article shows you how to add Fabric workspace item event source to an eventstream.



[!INCLUDE [consume-fabric-events-regions](../../real-time-hub/includes/consume-fabric-events-regions.md)]
[!INCLUDE [deprecated-fabric-workspace-events](../../real-time-hub/includes/deprecated-fabric-workspace-events.md)]

Fabric workspace item events are discrete Fabric events that occur when contents of your Fabric Workspace is changed. These changes include creating, updating, or deleting of Fabric items except for the item types listed in the note.
[!INCLUDE [unsupported-itemtypes-in-workspaceevents](../../real-time-hub/includes/unsupported-itemtypes-in-workspaceevents.md)]

With Fabric event streams, you can capture these Fabric workspace events, transform them, and route them to various destinations in Fabric for further analysis. This seamless integration of Fabric workspace events within Fabric event streams gives you greater flexibility for monitoring and analyzing activities in your Fabric workspace.

Fabric event streams support the following Fabric workspace events:

- Microsoft.Fabric.ItemCreateSucceeded
- Microsoft.Fabric.ItemCreateFailed
- Microsoft.Fabric.ItemUpdateSucceeded
- Microsoft.Fabric.ItemUpdateFailed
- Microsoft.Fabric.ItemDeleteSucceeded
- Microsoft.Fabric.ItemDeleteFailed


## Prerequisites

- Access to a workspace in the Fabric capacity license mode (or) the Trial license mode with Contributor or higher permissions. 
- A Fabric workspace with events you want to track.
- If you don't have an eventstream, [create an eventstream](create-manage-an-eventstream.md). 


## Add Fabric Workspace Item events as source

[!INCLUDE [launch-connect-external-source](./includes/launch-connect-external-source.md)]

On the **Select a data source** page, search for and select **Connect** on the **Fabric Workspace item events** tile.

:::image type="content" source="./media/add-source-fabric-workspace/select-fabric-workspace-item-events.png" alt-text="Screenshot that shows the selection of Fabric Workspace item events as the source type in the Select a data source window.":::


## Configure and connect to Fabric Workspace Item events
[!INCLUDE [fabric-workspace-source-connector](includes/fabric-workspace-source-connector.md)]


## View updated eventstream

1. Once the connection is created, you can see the Fabric workspace item events source added to your eventstream in **Edit mode**. Select **Publish** to publish the eventstream and capture the workspace events.

    :::image type="content" source="media/add-source-fabric-workspace/fabric-workspace-item-events-edit.png" alt-text="A screenshot of the Fabric workspace item events source added to the eventstream." lightbox="media/add-source-fabric-workspace/fabric-workspace-item-events-edit.png":::

    > [!NOTE]
    > Before proceeding with event transformation or routing, ensure that workspace events have been triggered and successfully sent to the eventstream.
1. If you want to transform the Fabric workspace events, open your eventstream and select **Edit** to enter **Edit mode**. Then you can add operations to transform the Fabric workspace events or route them to a destination such as Lakehouse.

    :::image type="content" source="media/add-source-fabric-workspace/fabric-workspace-item-events-live.png" alt-text="A screenshot of the Fabric workspace item events in Live view, where you can select Edit.":::

[!INCLUDE [known-issues-discrete-events](./includes/known-issues-discrete-events.md)]




## Related content

- [Azure Blob Storage events](add-source-azure-blob-storage.md)
- [Create eventstreams for discrete events](create-eventstreams-discrete-events.md)
