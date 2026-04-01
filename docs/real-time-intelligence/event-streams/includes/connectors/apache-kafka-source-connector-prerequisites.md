---
title: Apache Kafka connector - Prerequisites
description: This file contains prerequisites for configuring Apache Kafka connector for Fabric event streams and Real-Time hub. 
ms.reviewer: xujiang1
ms.topic: include
ms.date: 03/31/2026
---

## Prerequisites 

- Access to the Fabric workspace with Contributor or above permissions.
- An Apache Kafka cluster running. 
- Your Apache Kafka must be publicly accessible and not be behind a firewall or secured in a virtual network. If it resides in a protected network, connect to it by using [Eventstream connector virtual network injection](../../streaming-connector-private-network-support-guide.md).
- If you plan to use **TLS/mTLS settings**, make sure the required certificates are available in an **Azure Key Vault**:

    - Import the required certificates into Azure Key Vault in **.pem** format.
    - The user who configures the source and previews data must have permission to access the certificates in the Key Vault (for example, **Key Vault Certificate User** or **Key Vault Administrator**).  
    - If the current user doesn’t have the required permissions, data can’t be previewed from this source in Eventstream.