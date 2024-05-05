---
title: Supported sources in to Real-Time hub
description: This article describes supported sources such as Azure Event Hubs and Azure IoT Hub in Fabric Real-Time hub.
author: ahartoon
ms.author: anboisve
ms.topic: how-to
ms.date: 04/03/2024
---

# Supported sources for Fabric Real-Time hub
This article provides a list of sources that Real-Time hub supports. The Real-Time hub enables you to get events from these sources and create data streams in Fabric. 

[!INCLUDE [preview-note](./includes/preview-note.md)]

## Microsoft sources

[!INCLUDE [microsoft-sources](./includes/microsoft-sources.md)]

## External sources

[!INCLUDE [external-sources](./includes/external-sources.md)]

## Discrete events
**Discrete events**, often referred to as notification events, are individual occurrences that happen at specific points in time. Each event is independent of others and has a clear start and end point. Examples of discrete events include users placing orders on a website or making changes to a database.

Real-Time hub supports the following types of discrete events:

[!INCLUDE [discrete-event-sources](./includes/discrete-event-sources.md)]

## Related content
Real-Time hub also allows you to set alerts based on events and specify actions to take when the events happen. 

- [Set alerts on data streams](set-alerts-data-streams.md)
- [Set alerts on Azure Blob Storage events](set-alerts-azure-blob-storage-events.md)
- [Set alerts on Fabric workspace item events](set-alerts-fabric-workspace-item-events.md)