---
title: Add Fabric capacity overview event source to an eventstream
description: Learn how to add Fabric capacity overview event source to an eventstream. This feature is currently in preview.
ms.reviewer: zhenxilin
ms.topic: how-to
ms.date: 03/18/2025
ms.search.form: Source and Destination
---

# Add Fabric capacity overview events to an eventstream (preview)

This article shows you how to add Fabric capacity overview event source to an eventstream.

[!INCLUDE [consume-fabric-events-regions](../../real-time-hub/includes/consume-fabric-events-regions.md)]

Fabric Capacity Overview Events provide summary level information related to your capacity. These events can be used to create alerts related to your capacity health via Data Activator or can be stored in an Eventhouse for granular or historical analysis.

With Fabric event streams, you can capture these Fabric capacity overview events, transform them, and route them to various destinations in Fabric for further analysis. This seamless integration of Fabric capacity overview events within Fabric event streams gives you greater flexibility for monitoring and analyzing activities in your Fabric workspace.

Fabric event streams support the following Fabric capacity overview events:

| Event type name | Description |
| --------------- | ----------- |
| Microsoft.Fabric.Capacity.Summary | Emitted every 30 seconds to summarize the capacity usage across all operations during that interval. |
| Microsoft.Fabric.Capacity.State | Emitted when a capacity’s state changes. For example, when a capacity is paused or resumed. |


## Prerequisites

- Access to a workspace in the Fabric capacity license mode (or) the Trial license mode with Contributor or higher permissions. 
- If you don't have an eventstream, [create an eventstream](create-manage-an-eventstream.md). 


## Add Fabric capacity overview events as source

[!INCLUDE [launch-connect-external-source](./includes/launch-connect-external-source.md)]

On the **Select a data source** page, search for and select **Connect** on the **Fabric capacity overview events** tile.

:::image type="content" source="./media/add-source-fabric-capacity-overview-events/select-fabric-capacity-overview-events.png" alt-text="Screenshot that shows the selection of Fabric capacity overview events as the source type.":::


## Configure and connect to Fabric capacity overview events
[!INCLUDE [fabric-capacity-overview-connector](includes/fabric-capacity-overview-connector.md)]


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


