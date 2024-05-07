---
title: Microsoft Fabric event streams overview
description: Learn about event streams and its capability of capturing, transforming, and routing real-time events to various destinations in Microsoft Fabric.
ms.reviewer: spelluru
ms.author: xujiang1
author: xujxu
ms.topic: overview
ms.date: 12/05/2023
ms.search.form: Event Streams Overview
---

# Microsoft Fabric event streams - overview
The event streams feature in the Microsoft Fabric **Real-Time Intelligence** experience lets you bring real-time events into Fabric, transform them, and then route them to various destinations without writing any code (no-code). You create an eventstream, which is an instance of the **Eventstream** item in Fabric, add event data sources to the stream, optionally add transformations to transform the event data, and then route the data to supported destinations. 

## Bring events into Fabric
The event streams feature provides you with various source connectors to fetch event data from the various sources. There are more sources available when you enable **Enhanced capabilities** at the time of creating an eventstream. 

# [Enhanced capabilities (Preview)](#tab/enhancedcapabilities)

[!INCLUDE [supported-sources-enhanced](./includes/supported-sources-enhanced.md)]

# [Standard capabilities](#tab/standardcapabilities)

[!INCLUDE [supported-sources](./includes/supported-sources-standard.md)]

---

## Process events using no-code experience
The drag and drop experience gives you an intuitive and easy way to create your event data processing, transforming, and routing logic without writing any code. An end-to-end data flow diagram in an eventstream can provide you with a comprehensive understanding of the data flow and organization. The event processor editor is a no-code experience that allows you to drag and drop to design the event data processing logic. 

[!INCLUDE [supported-transformations-enhanced](./includes/supported-transformations-enhanced.md)]

If you enabled **Enhanced capabilities** while creating an eventstream, the transformation operations are supported for all destinations. If you didn't, the transformation operations are available only for the Lakehouse and KQL Database (event processing before ingestion) destinations. 

## Route events to destinations
The Fabric event streams feature supports sending data to the following supported destinations. 

# [Enhanced capabilities (Preview)](#tab/enhancedcapabilities)

[!INCLUDE [supported-destinations-enhanced](./includes/supported-destinations-enhanced.md)]

# [Standard capabilities](#tab/standardcapabilities)

[!INCLUDE [supported-destinations](./includes/supported-destinations-standard.md)]

---

You can attach multiple destinations in an eventstream to simultaneously receive data from your eventstreams without interfering with each other.

:::image type="content" source="./media/overview/eventstream-overview.png" alt-text="Screenshot showing an Eventstream item overview." lightbox="./media/overview/eventstream-overview.png" :::

> [!NOTE]
> We recommend that you use the Microsoft Fabric event streams feature with at least 4 capacity units ([SKU](../../enterprise/licenses.md#capacity-license): F4)

## Related content

- [Create and manage an eventstream in Microsoft Fabric](./create-manage-an-eventstream.md)
