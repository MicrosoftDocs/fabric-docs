---
title: Fabric Capacity Operation Source in Fabric Eventstream
description: Fabric capacity operation events can be added as a source to your eventstream in Microsoft Fabric. Follow these steps to configure, connect, and publish your eventstream.
ms.reviewer: sruikar
ms.topic: how-to
ms.date: 08/21/2026
author: sruikar
ms.author: sruikar
ms.search.form: Source and Destination
---

# Add Fabric capacity operation events to an eventstream (preview)

This article shows you how to add Fabric capacity operation event source to an eventstream.

[!INCLUDE [fabric-capacity-operation-connector-prerequisites](./includes/connectors/fabric-capacity-operation-connector-prerequisites.md)]

## Add Fabric capacity operation events as a source

[!INCLUDE [launch-connect-external-source](./includes/launch-connect-external-source.md)]

On **Select a data source**, search for and select **Connect** on the **Fabric capacity operation events** tile.

:::image type="content" source="./media/add-source-fabric-capacity-operation-events/select-fabric-capacity-operation-events.png" alt-text="Screenshot that shows the selection of Fabric capacity operation events as the source type.":::


## Configure and connect to Fabric capacity operation events

[!INCLUDE [fabric-capacity-operation-connector-configuration](./includes/connectors/fabric-capacity-operation-connector-configuration.md)]


## View updated eventstream

1. Once the connection is created, you can see the Fabric capacity operation events source added to your eventstream in **Edit mode**. Select **Publish** to publish the eventstream and capture capacity operation events.

    :::image type="content" source="media/add-source-fabric-capacity-operation-events/publish.png" alt-text="A screenshot of the Fabric capacity operation events source added to the eventstream." lightbox="media/add-source-fabric-capacity-operation-events/publish.png":::
1. If you want to transform the Fabric capacity operation events, open your eventstream and select **Edit** to enter **Edit mode**. Then you can add operations to transform the Fabric capacity operation events or route them to a destination such as Lakehouse.

    :::image type="content" source="media/add-source-fabric-capacity-operation-events/edit.png" alt-text="A screenshot of the Fabric capacity operation events in Live view, where you can select Edit." lightbox="media/add-source-fabric-capacity-operation-events/edit.png" :::


## Limitation
* The Fabric capacity operation events source currently doesn't support CI/CD features, including **Git Integration** and **Deployment Pipeline**. Attempting to export or import an Eventstream item with this source to a Git repository might result in errors. 


## Related content

- [Fabric capacity overview events](add-source-fabric-capacity-overview-events.md)
- [Create eventstreams for discrete events](create-eventstreams-discrete-events.md)
