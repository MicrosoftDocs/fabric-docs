---
title: Microsoft Fabric event streams overview
description: Learn about event streams and its capability of capturing, transforming, and routing real-time events to various destinations in Microsoft Fabric.
ms.reviewer: spelluru
ms.author: xujiang1
author: xujxu
ms.topic: overview
ms.custom: build-2023, build-2023-dataai, build-2023-fabric
ms.date: 05/23/2023
ms.search.form: Event streams
---

# Microsoft Fabric event streams - overview

The event streams feature in Microsoft Fabric gives you a centralized place in the Fabric platform to capture, transform, and route real-time events to various destinations with a no-code experience. It's part of the **Real-time analytics** experience. The **eventstream** item you create in the portal is an instance of Fabric event streams. When you create an eventstream, you add event data sources, routing destinations, and the event processor when you need the transformation.

[!INCLUDE [preview-note](../../includes/preview-note.md)]

## Centralized place for event data

Everything in Fabric event streams focuses on event data. Capturing, transforming, and routing event data are the essential capabilities of eventstreams. The feature has a scalable infrastructure that the Fabric platform manages on your behalf.

## Various source connectors

The event streams feature provides you with various source connectors to fetch event data from diverse sources, such as **Sample data** and **Azure Event Hubs**. It also offers **Custom App**, the connection endpoint that enables you to develop your own applications to push event data into your eventstreams.

## No-code experience

The drag and drop experience gives you an intuitive and easy way to create your event data processing, transforming, and routing logic without writing any code. An end-to-end data flow diagram in an eventstream can provide you with a comprehensive understanding of the data flow and organization.

## Multiple destinations

The Fabric event streams feature supports sending data to diverse destinations, such as **Lakehouse**, **KQL database**, and **Custom App**. You can attach multiple destinations in an eventstream to simultaneously receive data from your eventstreams without interfering with each other.

:::image type="content" source="./media/overview/eventstream-overview.png" alt-text="Screenshot showing an Eventstream item overview." lightbox="./media/overview/eventstream-overview.png" :::

## Next steps

See [Create and manage an eventstream in Microsoft Fabric](./create-manage-an-eventstream.md)
