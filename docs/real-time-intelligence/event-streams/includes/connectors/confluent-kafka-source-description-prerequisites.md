---
title: Description and prerequisites for Confluent Cloud source
description: The include file provides description and prerequisites for using a Confluent Cloud for Apache Kafka source in an eventstream or in Real-Time hub. 
ms.reviewer: zhenxilin
ms.topic: include
ms.date: 04/02/2026
---

Confluent Cloud for Apache Kafka is a streaming platform offering powerful data streaming and processing functionalities using Apache Kafka. By integrating Confluent Cloud for Apache Kafka as a source within your eventstream, you can seamlessly process real-time data streams before routing them to multiple destinations within Fabric. 

## Prerequisites 

- Access to a workspace in the Fabric capacity license mode (or) the Trial license mode with Contributor or higher permissions. 
- A Confluent Cloud for Apache Kafka cluster and an API Key. 
- Your Confluent Cloud for Apache Kafka cluster should be publicly accessible and not be behind a firewall or secured in a virtual network. If it resides in a protected network, connect to it by using [Eventstream connector vNet injection](../../streaming-connector-private-network-support-guide.md). 
- If you plan to use **TLS/mTLS settings**, make sure the required certificates are available in an **Azure Key Vault**:

    - Import the required certificates into Azure Key Vault in **.pem** format.
    - The user who configures the source and previews data must have permission to access the certificates in the Key Vault (for example, **Key Vault Certificate User** or **Key Vault Administrator**).  
    - If the current user doesn’t have the required permissions, data can’t be previewed from this source in Eventstream.
