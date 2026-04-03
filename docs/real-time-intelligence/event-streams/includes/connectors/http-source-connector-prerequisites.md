---
title: HTTP connector - prerequisites
description: This file has the prerequisites for configuring an HTTP connector for Fabric event streams and Real-Time hub. 
ms.reviewer: zhenxilin
ms.topic: include
ms.date: 04/02/2026
---

The HTTP connector provides a no-code, configurable way to stream data from any REST API directly into Eventstream for real-time processing. It allows you to continuously pull data from SaaS platforms and public data feeds and automatically parse JSON responses into structured events. It also offers example public feeds to help you get started quickly, select an example API, enter your API key, and let Eventstream prefill the required headers and parameters.

## Prerequisites

- A workspace with **Fabric** capacity or **Fabric Trial** workspace type.
- Access to the workspace with **Contributor** or higher workspace roles.
- An HTTP endpoint that is publicly accessible. If it resides in a protected network, connect to it by using [Eventstream connector virtual network injection](../../streaming-connector-private-network-support-guide.md).