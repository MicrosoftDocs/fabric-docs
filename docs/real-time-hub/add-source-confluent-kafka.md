---
title: Add Confluent Kafka as source in Real-Time hub
description: This article describes how to add Confluent Kafka as an event source in Fabric Real-Time hub. 
author: ahartoon
ms.author: anboisve
ms.topic: how-to
ms.date: 04/03/2024
---

# Add Confluent Kafka as source in Real-Time hub
This article describes how to add Confluent Kafka as an event source in Fabric Real-Time hub. 

Confluent Cloud Kafka is a streaming platform offering powerful data streaming and processing functionalities using Apache Kafka. By integrating Confluent Cloud Kafka as a source within your Real-Time hub, you can create and process real-time data streams before routing them to multiple destinations within Fabric. 

## Prerequisites 

- Get access to the Fabric premium workspace with Contributor or above permissions. 
- A Confluent Cloud Kafka cluster and an API Key. 

## Launch the Get events experience
In Fabric Real-Time hub, select **Get events** button in the top-right corner. 

## Configure and connect to Confluent Kafka

[!INCLUDE [confluent-kafka-source-connector](../real-time-intelligence/event-streams/includes/confluent-kafka-source-connector.md)]