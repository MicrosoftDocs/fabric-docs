---
title: Connect to Streaming Sources in Virtual Network or On-Premises with Eventstream
description: Learn how to connect to streaming sources in virtual network or on-premises with Eventstream
ms.reviewer: spelluru
ms.author: xujiang1
author: xujxu
ms.topic: tutorial
ms.custom:
ms.date: 03/21/2025
ms.search.form: Eventstreams Tutorials
---

# Connect to Streaming Sources in Virtual Network or On-Premises with Eventstream

Eventstream’s streaming connector enables seamless connection of external real-time data streams to Fabric, allowing for an optimal out-of-the-box experience and more choices for real-time insights from a variety of sources. It supports well-known cloud services like Google Cloud and Amazon Kinesis, as well as database change data capture (CDC) streams through our new messaging connectors.

## The Challenge

Due to data protection requirements, the streaming source may be in a private network, such as cloud virtual networks or on-premises networks. At present, Eventstream’s streaming connector cannot directly access sources within these network environments. While Eventstream plans to support private connectivity in the future, the following workarounds can help bring real-time data from the private network to Fabric to unblock your streaming and real-time needs now.

## Workarounds

There are three approaches that can help with this purpose.

### IP Whitelist

Eventstream's streaming connector in each region has a single outbound IP address. If your company’s network policy permits whitelisting this IP address, Eventstream’s connector can bring real-time data into Fabric, though the transmission occurs over a public network.

This solution is applicable to all streaming connector sources. If you are interested in implementing this solution, kindly reach out to the product team by completing the following form: [https://aka.ms/EventStreamsConnIPWhitelistRequest](https://aka.ms/EventStreamsConnIPWhitelistRequest)

### Mirroring Kafka Topics to Eventstream or Azure Event Hubs

The Fabric event streams feature is Apache Kafka-compatible and offers an Apache Kafka topic on the Eventstream item. If your real-time data resides in a Kafka cluster within on-premises networks or third-party cloud virtual networks, you can utilize Kafka MirrorMaker to replicate your data to the Kafka endpoint in [Eventstream’s source custom endpoint](https://learn.microsoft.com/fabric/real-time-intelligence/event-streams/add-source-custom-app?pivots=standard-capabilities#kafka-1). 

Currently, one Eventstream offers one Kafka topic inside. If you have multiple topics in your cluster, you may replicate them to Azure Event Hubs, which is also Apache Kafka-compatible. Once the data arrives at Azure Event Hubs, it can be securely transferred into Eventstream through the Managed Private Endpoint (MPE) over the private network integrated with Eventstream’s Azure Event Hubs source.

Learn more about the MPE, see [Connect to Azure resources securely using managed private endpoints](https://learn.microsoft.com/fabric/real-time-intelligence/event-streams/set-up-private-endpoint). 

### Leveraging Azure Stream Analytics

Azure Stream Analytics is a fully managed engine for processing large volumes of streaming data. It supports reading data from a Kafka topic using [Kafka input](https://learn.microsoft.com/azure/stream-analytics/stream-analytics-define-kafka-input) and can output data to an Azure event hub with the [Azure Event Hubs output](https://learn.microsoft.com/en-us/azure/stream-analytics/event-hubs-output). The job can run in an Azure virtual network to access your resources privately within the virtual network. If your Kafka clusters reside within on-premises networks or third-party cloud virtual networks, you may create an Azure virtual network to connect your private network and then run an Azure Stream Analytics job in your Azure virtual network to read the data from your Kafka and output the data to the [Eventhub endpoint](https://learn.microsoft.com/fabric/real-time-intelligence/event-streams/add-source-custom-app?pivots=standard-capabilities#event-hub-1) offered by Eventstream’s source custom endpoint.

### Leveraging Kafka Sink Connector

Kafka sink connector is a Kafka Connect connector that reads data from Apache Kafka and sends it to another Kafka topic. Fabric Eventstream provides an [Apache Kafka endpoint](https://learn.microsoft.com/fabric/real-time-intelligence/event-streams/overview?tabs=enhancedcapabilities#apache-kafka-on-fabric-event-streams) for receiving data via the Kafka protocol. By deploying a Kafka sink connector in the Kafka cluster and pointing it to [Eventstream’s source custom endpoint](https://learn.microsoft.com/fabric/real-time-intelligence/event-streams/add-source-custom-app?pivots=standard-capabilities#kafka-1), data can be read from the Kafka cluster and written to the Eventstream endpoint. It is necessary to ensure that outbound communication is allowed in your private network for the data to be written to Eventstream.

### Leveraging Azure Functions

Azure Functions is a serverless service that allows you to run small pieces of code (functions) without managing infrastructure. It provides events trigger and binding that can [replicate events](https://learn.microsoft.com/azure/event-hubs/event-hubs-federation-replicator-functions#replication-applications-and-tasks-in-azure-functions) from Apache Kafka, Azure Service Bus, RabbitMQ to Azure Event Hubs (i.e., Eventstream) using Apache Kafka trigger, Azure Service Bus trigger, or RabbitMQ trigger, along with Azure Event Hubs output bindings.

Azure Functions supports virtual networks for the outbound network, enabling your function app access to resources in your virtual network or on-premises through a virtual network (via Azure ExpressRoute or VPN Gateway). If the event sources are Apache Kafka, Azure Service Bus, or RabbitMQ in a restricted network, Azure Functions can be used to replicate events to Eventstream.

## Additional Resources

Eventstream in Real-Time Intelligence will support connectivity to streaming sources behind private networks in the future. Keep an eye on [https://aka.ms/fabricroadmap](https://aka.ms/fabricroadmap) for updates on this.

In some cases, if a feature is planned to be released in the near term, waiting for the feature may make more sense than implementing a workaround and undoing the work later after the feature is released. It may also be acceptable to use a workaround to move a POC forward, but you want to deploy production after the feature is released. This allows us to move forward proving the power of Fabric without being slowed down by a missing feature.
