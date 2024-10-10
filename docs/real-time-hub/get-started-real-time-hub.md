---
title: Get started with Fabric Real-Time hub
description: This article shows how to get started with Fabric Real-Time hub.
author: mystina
ms.author: majia
ms.topic: quickstart
ms.custom:
  - build-2024
ms.date: 08/25/2024
---

# Get started with Fabric Real-Time hub (preview)

Real-Time hub is the single estate for all data-in-motion across your entire organization. Every Microsoft Fabric tenant is automatically provisioned with Real-Time hub, with no extra steps needed to set up or manages it. For detailed overview, see [Real-Time hub overview](real-time-hub-overview.md).

This article provides guidance on getting started with Fabric Real-Time hub.

[!INCLUDE [preview-note](./includes/preview-note.md)]

## Navigate to Real-Time hub

[!INCLUDE [navigate-to-real-time-hub](./includes/navigate-to-real-time-hub.md)]

## All data streams page

On the **All data streams** page, you see all the streams and tables you can access. Streams are the outputs from [Fabric eventstreams](../real-time-intelligence/event-streams/overview.md) and tables are from Kusto Query Language (KQL) databases that you can access.

1. To **explore** streams and tables that you can access, use instructions from [Explore All data streams in Fabric Real-Time hub](explore-all-data-streams.md).
1. To **view details** for a stream or a table, see [View data stream details](view-data-stream-details.md).
1. To **preview data** in a data stream, see [Preview data streams](preview-data-streams.md).
1. To **endorse** data streams for others to use, see [Endorse streams](endorse-data-streams.md)
1. You can also open an eventstream that's the parent of a data stream (or) open KQL database that's the parent of a KQL table.

    :::image type="content" source="./media/get-started-real-time-hub/data-streams-actions.png" alt-text="Screenshot that shows the actions available on a data stream." lightbox="./media/get-started-real-time-hub/data-streams-actions.png":::

## My streams page

The **My streams** page shows all the streams you brought into Fabric.

1. To **explore** your streams and tables, use instructions from [Explore My streams in Fabric Real-Time hub](explore-my-data-streams.md).
1. To **view details** for a stream or a table, see [View data stream details](view-data-stream-details.md).
1. To **preview data** in a data stream, see [Preview data streams](preview-data-streams.md).
1. To **endorse** one of your streams for others to use, see [Endorse streams](endorse-data-streams.md).

    :::image type="content" source="media/get-started-real-time-hub/hub-my-streams-menu.png" alt-text="Screenshot that shows the actions available for a stream from the My streams page." lightbox="./media/get-started-real-time-hub/hub-my-streams-menu.png":::

## Microsoft sources page

From the **Microsoft sources** page, you see Microsoft data sources that you can access. They include sources of the following types.

[!INCLUDE [microsoft-sources](./includes/microsoft-sources.md)]

You can connect to these resources and create eventstreams that show up on the **All data streams** page. Select a link for a source in the list to learn how to create an event stream for that source.

:::image type="content" source="./media/get-started-real-time-hub/microsoft-sources-menu.png" alt-text="Screenshot that shows the Microsoft sources page in Real-Time hub." lightbox="./media/get-started-real-time-hub/microsoft-sources-menu.png":::

<!--should this be reversed per interface?-->
## Fabric events page

On the **Fabric events** tab, you see the following types of events.
[!INCLUDE [discrete-event-sources](./includes/discrete-event-sources.md)]

To **explore Fabric events**, see [Explore Fabric events in Real-Time hub](explore-fabric-events.md).

You can **create eventstreams** for events from your Azure Blob Storage accounts or Fabric Workspaces. You can also set up an alert to send notifications via email, Teams etc. when an event occurs. Use links from the list to navigate to articles that show you how to create eventstreams for Azure Blob Storage events and Fabric workspace item events.

See following articles to learn how to **setup alerts** on Fabric events:

- [Set alerts on Azure Blob Storage events](set-alerts-azure-blob-storage-events.md)
- [Set alerts on Fabric workspace item events](set-alerts-fabric-workspace-item-events.md)

## Get events

You can connect to data from both inside and outside of Fabric in a mere few steps using the **Add source experience** within Fabric, including Real-Time hub. Whether data is coming from new or existing sources, streams, or available events, the Add source experience allows you to connect to a wide range of event sources directly from Real-Time hub.

It allows for easy connectivity to external data streams including Kafka connectors powered by Kafka Connect and Debezium connectors for fetching the Change Data Capture (CDC) streams. Connectivity to notification sources and discrete events is also included within Get events, this enables access to notification events from Azure and other clouds solutions including Amazon Web Services and Google Cloud Platform.  

Select **Add source** from the Real-Time hub and follow the prompts to complete the flow. Here's a full list of built-in sources inside Get events.

[!INCLUDE [supported-sources](./includes/supported-sources.md)]

You can connect to these services and create eventstreams that show up on the **All data streams** page. Select a link for a source in the list to learn how to create an event stream for that source.
