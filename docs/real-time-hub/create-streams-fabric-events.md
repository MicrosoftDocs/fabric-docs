---
title: Create streams for Fabric events in Real-Time hub
description: This article describes how to create streams for Fabric events in Real-Time hub.
author: ahartoon
ms.author: anboisve
ms.topic: how-to
ms.date: 05/21/2024
---

# Create streams for Fabric events in Real-Time hub
This article describes how to create streams for Fabric events in Real-Time hub. 

[!INCLUDE [preview-note](./includes/preview-note.md)]

When you develop applications for real-time analytics, you commonly encounter two types of events: discrete events and continuous events or streams. Microsoft Fabric event streams can ingest and process both discrete and continuous events.

## Understand discrete and continuous events

To build an efficient and scalable stream in Fabric, it's important to understand the distinction between discrete events and continuous events or streams.

- **Discrete events**, often referred to as notification events, are individual occurrences that happen at specific points in time. Each event is independent of others and has a clear start and end point. Examples of discrete events include users placing orders on a website or making changes to a database.

- **Continuous events** or streams represent a continuous flow or stream of data over time. Unlike discrete events, continuous events don't have distinct start or end points. Instead, they represent a steady and ongoing stream of data, often with no predefined boundaries. Examples include sensor data from IoT devices, stock market ticker data, or social media posts in a real-time feed.

>[!NOTE]
>It's recommended to have either discrete event sources or continuous event (stream) sources, not a mix of both, in one stream.

## Supported discrete events

This feature enables you to build event-driven solutions for capturing system state changes or events in your Fabric data source. Real-Time hub supports the following types of discrete events:

|Discrete events|Description|
|----|---------|
|[Azure Blob Storage events](get-azure-blob-storage-events.md)|Generated upon any change made to Azure Blob Storage, such as creation, modification, or deletion of records or files.|
|[Fabric Workspace Item events](create-streams-fabric-workspace-item-events.md)|Generated upon any change made to a Fabric workspace, including creation, update, or deletion of items.|

Select links in the table to navigate to articles that provide detailed information on creating streams based on these events. 
