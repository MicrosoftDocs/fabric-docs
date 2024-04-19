---
title: Add Confluent Kafka source to an eventstream
description: Learn how to add Confluent Kafka source to an eventstream.
ms.reviewer: spelluru
ms.author: zhenxilin
author: alexlzx
ms.topic: how-to
ms.date: 04/03/2024
ms.search.form: Source and Destination
---

# Add Confluent Kafka source to an eventstream
This article shows you how to add Confluent Kafka source to an eventstream. 

Confluent Cloud Kafka is a streaming platform offering powerful data streaming and processing functionalities using Apache Kafka. By integrating Confluent Cloud Kafka as a source within your eventstream, you can seamlessly process real-time data streams before routing them to multiple destinations within Fabric. 

## Prerequisites 

- Get access to the Fabric premium workspace with Contributor or above permissions. 
- A Confluent Cloud Kafka cluster and an API Key. 

## Add Confluent Cloud Kafka as a source 

1. Create an eventstream with selecting the preview toggle.
1. Click on the Add source and select Get event option or the “Get events” card on the eventstream homepage.

## Configure and connect to Confluent Kafka

[!INCLUDE [confluent-kafka-connector](./includes/confluent-kafka-source-connector.md)]

## Related content
