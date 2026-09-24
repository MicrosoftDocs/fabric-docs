---
title: Oracle Database CDC connector - prerequisites
description: This include file has the prerequisites for using an Oracle Database Change Data Capture (CDC) connector for Fabric event streams and Real-Time hub.
ms.reviewer: zhenxilin
ms.topic: include
ms.custom: sfi-image-nochange
ms.date: 05/25/2026
---

## Prerequisites

- Access to a workspace in the Fabric capacity license mode or the Trial license mode with Contributor or higher permissions.
- A running Oracle database server (on-premises or cloud-hosted).
- Your Oracle database should be publicly accessible and not behind a firewall or secured in a virtual network. If it resides in a protected network, connect to it by using [Eventstream connector virtual network injection](../../streaming-connector-private-network-support-guide.md).
- Oracle LogMiner enabled on your database for CDC capture.
- A database user with the required permissions for CDC operations.

