---
title: Fabric Capacity Overview Source in Fabric Eventstream
description: Fabric capacity overview events can be added as a source to your eventstream in Microsoft Fabric. Follow these steps to configure, connect, and publish your eventstream.
ms.reviewer: zhenxilin
ms.topic: how-to
ms.date: 04/02/2026
author: spelluru
ms.author: spelluru
ms.search.form: Source and Destination
---

# Add Fabric capacity overview events to an eventstream (preview)

This article shows you how to add Fabric capacity overview event source to an eventstream.

[!INCLUDE [fabric-capacity-overview-connector-prerequisites](./includes/connectors/fabric-capacity-overview-connector-prerequisites.md)]

## Add Fabric capacity overview events as source

[!INCLUDE [launch-connect-external-source](./includes/launch-connect-external-source.md)]

On the **Select a data source** page, search for and select **Connect** on the **Fabric capacity overview events** tile.

:::image type="content" source="./media/add-source-fabric-capacity-overview-events/select-fabric-capacity-overview-events.png" alt-text="Screenshot that shows the selection of Fabric capacity overview events as the source type.":::


## Configure and connect to Fabric capacity overview events

[!INCLUDE [fabric-capacity-overview-connector-configuration](./includes/connectors/fabric-capacity-overview-connector-configuration.md)]


## View updated eventstream

1. Once the connection is created, you can see the Fabric capacity overview events source added to your eventstream in **Edit mode**. Select **Publish** to publish the eventstream and capture capacity overview events.

    :::image type="content" source="media/add-source-fabric-capacity-overview-events/publish.png" alt-text="A screenshot of the Fabric capacity overview events source added to the eventstream." lightbox="media/add-source-fabric-capacity-overview-events/publish.png":::
1. If you want to transform the Fabric capacity overview events, open your eventstream and select **Edit** to enter **Edit mode**. Then you can add operations to transform the Fabric capacity overview events or route them to a destination such as Lakehouse.

    :::image type="content" source="media/add-source-fabric-capacity-overview-events/edit.png" alt-text="A screenshot of the Fabric capacity overview events in Live view, where you can select Edit." lightbox="media/add-source-fabric-capacity-overview-events/edit.png" :::


## Limitation
* The Fabric capacity overview events source currently doesn't support CI/CD features, including **Git Integration** and **Deployment Pipeline**. Attempting to export or import an Eventstream item with this source to a Git repository may result in errors. 


## Related content

- [Azure Blob Storage events](add-source-azure-blob-storage.md)
- [Create eventstreams for discrete events](create-eventstreams-discrete-events.md)


