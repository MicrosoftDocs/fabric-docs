---
title: Description and prerequisites for Azure Data Explorer connector
description: The include file provides description, a note, and prerequisites for using an Azure Data Explorer connector.
ms.reviewer: xujiang1
ms.topic: include
ms.date: 03/21/2025
---


Azure Data Explorer is a fully managed, high-performance platform that delivers real-time insights from massive streaming data. You can use Microsoft Fabric eventstreams to connect to an Azure Data Explorer database, stream the data from its tables, and route them to various destinations within Fabric.

## Prerequisites

- Access to the Fabric premium workspace with Contributor or higher permissions.
- An active Azure subscription.
- An Azure Data Explorer cluster with at least one database deployed. Ensure that the cluster is publicly accessible and not restricted by a firewall or a virtual network. If it resides in a protected network, connect to it by using [Eventstream connector vNet injection](../streaming-connector-private-network-support-guide.md).
- The required permissions to access the Azure Data Explorer cluster.


