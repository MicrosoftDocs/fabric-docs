---
title: Supported sources for Fabric Real-Time hub  
description: Learn about the supported sources, including Azure Event Hubs and Azure IoT Hub, for creating data streams in Fabric Real-Time hub.
author: ahartoon
ms.author: anboisve
ms.topic: how-to
ms.custom:
ms.date: 07/16/2025
ai-usage: ai-assisted
---

# Supported sources for Fabric Real-Time hub
This article explains the supported sources for Fabric Real-Time hub, enabling you to create data streams from Microsoft and external sources. Learn how to leverage these sources to set alerts and take actions based on events.

## Azure sources

[!INCLUDE [microsoft-sources](./includes/microsoft-sources.md)]

## External sources

[!INCLUDE [external-sources](./includes/external-sources.md)]

## Discrete events
**Discrete events**, often referred to as notification events, are individual occurrences that happen at specific points in time. Each event is independent of others and has a clear start and end point. Examples of discrete events include users placing orders on a website or making changes to a database.

Real-Time hub supports the following types of discrete events:

[!INCLUDE [discrete-event-sources](./includes/discrete-event-sources.md)]

## Sample data
You can also use [Sample data sources](add-source-sample-data.md) available in Real-Time hub.

## Related content
Real-Time hub also allows you to set alerts based on events and specify actions to take when the events happen. 

- [Set alerts on data streams](set-alerts-data-streams.md): Learn how to configure alerts for real-time data streams.  
- [Set alerts on Azure Blob Storage events](set-alerts-azure-blob-storage-events.md): Discover how to monitor and respond to Azure Blob Storage events.  
- [Set alerts on Fabric workspace item events](set-alerts-fabric-workspace-item-events.md): Explore ways to track changes in Fabric workspace items.
