---
title: What's Microsoft Fabric event streams?
description: Introduces you to the Event streams feature in Microsoft Fabric.
ms.reviewer: spelluru
ms.author: xujiang1
author: xujxu
ms.topic: overview
ms.date: 05/23/2023
ms.search.form: product-kusto
---

# Microsoft Fabric event streams - overview

[!INCLUDE [preview-note](../includes/preview-note.md)]

Event streams feature in Microsoft Fabric is a centralized place in the Fabric platform to capture, transform, and route real-time events to various destinations with a no-code experience. It's part of the **Real-time analytics** experience. The **Eventstream** item is an instance of Fabric event streams. It consists of various event data sources, routing destinations, and the event processor when the transformation is needed.  

## Centralized place for event data
Everything in Fabric event streams is designed for event data. Event data capturing, transforming, and routing are the essential capabilities. It has a scalable infrastructure that is managed by the Fabric platform on behalf of you.

## Various source connectors
The event streams feature provides you with various source connectors to fetch the event data from diverse sources, such as **Sample data**, **Azure Event Hubs**, and more to come. It also offers **Custom App**, the connection endpoint that enables you to develop your own applications to push the event data into your eventstreams.

## No-code experience
Drag and drop experience gives you an intuitive and easy way to create your event data processing, transforming, and routing logic without needing any coding experience. An end-to-end data flow diagram in an eventstream can provide you with a comprehensive understanding of the data flow and organization. 

## Multiple destinations
Multiple destinations, such as **Lakehouse**, **KQL database**, **Custom App**, and more to come can be attached simultaneously to receive the event data from your eventstreams without interfering with each other. 

:::image type="content" source="./media/overview/eventstream-overview.png" alt-text="Screenshot showing an Eventstream item overview." lightbox="./media/overview/eventstream-overview.png" :::


## Next steps

- [Create and manage an eventstream in Microsoft Fabric](./create-manage-an-eventstream.md)
- [Event streams main editor - Microsoft Fabric](./main-editor.md)