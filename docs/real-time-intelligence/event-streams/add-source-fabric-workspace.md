---
title: Add Fabric workspace item event source to an eventstream
description: Learn how to add Fabric workspace item event source to an eventstream. This feature is currently in preview.
ms.reviewer: zhenxilin
ms.topic: how-to
ms.date: 03/18/2025
ms.search.form: Source and Destination
---

# Add Fabric workspace item events to an eventstream 

This article shows you how to add Fabric workspace item event source to an eventstream.


[!INCLUDE [fabric-workspace-source-connector-prerequisites](./includes/connectors/fabric-workspace-source-connector-prerequisites.md)]
- If you don't have an eventstream, [create an eventstream](create-manage-an-eventstream.md). 

## Add Fabric Workspace Item events as source

[!INCLUDE [launch-connect-external-source](./includes/launch-connect-external-source.md)]

On the **Select a data source** page, search for and select **Connect** on the **Fabric Workspace item events** tile.

:::image type="content" source="./media/add-source-fabric-workspace/select-fabric-workspace-item-events.png" alt-text="Screenshot that shows the selection of Fabric Workspace item events as the source type in the Select a data source window.":::


## Configure and connect to Fabric Workspace Item events

[!INCLUDE [fabric-workspace-source-connector-configuration](./includes/connectors/fabric-workspace-source-connector-configuration.md)]


## View updated eventstream

1. Once the connection is created, you can see the Fabric workspace item events source added to your eventstream in **Edit mode**. Select **Publish** to publish the eventstream and capture the workspace events.

    :::image type="content" source="media/add-source-fabric-workspace/fabric-workspace-item-events-edit.png" alt-text="A screenshot of the Fabric workspace item events source added to the eventstream." lightbox="media/add-source-fabric-workspace/fabric-workspace-item-events-edit.png":::

    > [!NOTE]
    > Before proceeding with event transformation or routing, ensure that workspace events were triggered and successfully sent to the eventstream.
1. If you want to transform the Fabric workspace events, open your eventstream and select **Edit** to enter **Edit mode**. Then you can add operations to transform the Fabric workspace events or route them to a destination such as Lakehouse.

    :::image type="content" source="media/add-source-fabric-workspace/fabric-workspace-item-events-live.png" alt-text="A screenshot of the Fabric workspace item events in Live view, where you can select Edit.":::

[!INCLUDE [known-issues-discrete-events](./includes/known-issues-discrete-events.md)]




## Related content

- [Azure Blob Storage events](add-source-azure-blob-storage.md)
- [Create eventstreams for discrete events](create-eventstreams-discrete-events.md)


