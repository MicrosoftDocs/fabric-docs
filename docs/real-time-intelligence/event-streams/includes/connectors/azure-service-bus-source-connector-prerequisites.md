---
title: Azure Service Bus connector - Prerequisites
description: This file has the common prerequisites for configuring an Azure Service Bus connector for Fabric event
ms.reviewer: xujiang1
ms.topic: include
ms.date: 04/01/2026
---


## Prerequisites

- Access to a workspace in the Fabric capacity license mode or trial license mode with Contributor or higher permissions.  
- Appropriate permission to get access keys for the Service Bus namespace, queues, or topics. The Service Bus namespace should be publicly accessible and not behind a firewall or secured in a virtual network. If it resides in a protected network, connect to it by using [Eventstream connector virtual network injection](../../streaming-connector-private-network-support-guide.md).
