---
title: Real-Time Intelligence tutorial user flow 2- Get and transform events from streaming sources
description: Learn about Real-Time Intelligence tutorial user flow 1- Transform events from streaming sources in Microsoft Fabric.
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
# User flow 2: Get and transform events from streaming sources

The Real-time hub is used to discover and manage your streaming data in Fabric. Ingesting streaming data with the Real-time hub is the first step in seamlessly integrating your data in Fabric, which, in turn, empowers analysts to extract real-time insights from the data. The rich set of available connectors ensures that regardless of your streaming source, you can effortlessly import data into Fabric. 

This user flow shows how a data engineer can load and transform events from a wide variety of streaming sources into the Real-time hub. 

:::image type="content" source="media/user-flows/user-flow-2.png" alt-text="Schematic image showing the steps in user flow 2."  border="false" lightbox="media/user-flows/user-flow-2.png":::

## Steps

1. Browse to the Real-time hub and select **Get Events**.
1. The supported connectors are shown. Choose a connector based on where your streaming source is located.
1. Provide connections to the source, including credentials.
1. Name the stream. A new eventstream  is created and data starts to flow in.
1. Open the newly created eventstream.
1. Define data processing operations that transform the streaming data.
1. Add a destination to the stream.

## Potential use cases

My streaming data source is in a Confluent Kafka cluster, and I want to
bring it to Fabric. 'GetEvents' experience in Real-time hub enables me
to easily ingest data from my Confluent Kafka cluster into Fabric.
