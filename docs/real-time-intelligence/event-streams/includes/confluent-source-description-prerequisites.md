---
title: Description and prerequisites for Confluent Cloud source
description: The include file provides description, a note, and prerequisites for using a Confluent Cloud for Apache Kafka source in an eventstream or in Real-Time hub. 
ms.reviewer: zhenxilin
ms.topic: include
ms.date: 03/13/2026
---

Confluent Cloud for Apache Kafka is a streaming platform offering powerful data streaming and processing functionalities using Apache Kafka. By integrating Confluent Cloud for Apache Kafka as a source within your eventstream, you can seamlessly process real-time data streams before routing them to multiple destinations within Fabric. 

## Prerequisites 

- Access to a workspace in the Fabric capacity license mode (or) the Trial license mode with Contributor or higher permissions. 
- A Confluent Cloud for Apache Kafka cluster and an API Key. 
- Your Confluent Cloud for Apache Kafka cluster should be publicly accessible and not be behind a firewall or secured in a virtual network. If it resides in a protected network, connect to it by using [Eventstream connector vNet injection](./streaming-connector-private-network-support-guide.md).
