---
title: Get and transform events from streaming sources
description: Learn about Real-Time Intelligence tutorial user flow 2 - Transform events from streaming sources in Microsoft Fabric.
ms.reviewer: tzgitlin
ms.author: yaschust
author: YaelSchuster
ms.topic: concept-article
ms.custom:
  - build-2024
ms.date: 05/21/2024
ms.search.form: Get started
#customer intent: I want to learn how to transform events from streaming sources in Real-Time Intelligence.
---
# Get and transform events from streaming sources

The Real-Time hub is used to discover and manage your streaming data in Fabric. Ingesting streaming data with the Real-Time hub is the first step in seamlessly integrating your data in Fabric, which, in turn, empowers analysts to extract real-time insights from the data. The rich set of available connectors ensures that regardless of your streaming source, you can effortlessly import data into Fabric.

This user flow shows how a data engineer can load and transform events from a wide variety of streaming sources into the Real-Time hub. 

:::image type="content" source="media/user-flows/user-flow-2.png" alt-text="Schematic image showing the steps in user flow 2." border="false" lightbox="media/user-flows/user-flow-2.png":::

[!INCLUDE [preview-note](../real-time-hub/includes/preview-note.md)]

## Steps

1. Browse to the Real-Time hub and select **Get Events**.
1. The supported connectors are shown. Choose a connector based on where your streaming source is located.
1. Provide connections to the source, including credentials.
1. Name the stream. A new eventstream  is created and data starts to flow in.

    For detailed information and steps, see [Get events from supported sources](../real-time-hub/supported-sources.md).
1. Open the newly created eventstream.
1. Define data processing operations that transform the streaming data.
1. Add a destination to the stream.

    For detailed information and steps, see [Transformation operations](./event-streams/route-events-based-on-content.md#supported-operations) and [Add and manage destination](./event-streams/add-manage-eventstream-destinations.md). 

## Supported connectors

### Microsoft sources

[!INCLUDE [microsoft-sources](../real-time-hub/includes/microsoft-sources.md)]

### External sources

[!INCLUDE [external-sources](../real-time-hub/includes/external-sources.md)]

### Discrete events

[!INCLUDE [discrete-event-sources](../real-time-hub/includes/discrete-event-sources.md)]

## Potential use cases

Your streaming data source is in a Confluent Kafka cluster, and you want to bring it to Fabric. The 'GetEvents' experience in Real-Time hub enables you to easily ingest data from your Confluent Kafka cluster into Fabric.
